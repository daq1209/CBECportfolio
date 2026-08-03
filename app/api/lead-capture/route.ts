import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import rateLimiter, { getClientIp, RATE_LIMITS } from "@/lib/rate-limit";
import { logApiError } from "@/lib/logger";

// Validation schemas with honeypot field 'website'
const leadMagnetSchema = z.object({
  type: z.literal("lead-magnet"),
  email: z.string().email("Invalid email address"),
  lang: z.string().optional(),
  source: z.string().optional(),
  _gotcha: z.string().optional(),
});

const contactFormSchema = z.object({
  type: z.literal("contact"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company name is required"),
  phone: z.string().optional(),
  service: z.string().min(1, "Service is required"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  lang: z.string().optional(),
  currentWebsite: z.string().optional(),
  _gotcha: z.string().optional(),
});

const requestSchema = z.discriminatedUnion("type", [leadMagnetSchema, contactFormSchema]);

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIp = getClientIp(request);
    const rateLimitResult = rateLimiter.check(
      `lead-capture:${clientIp}`,
      RATE_LIMITS.CONTACT_FORM.limit,
      RATE_LIMITS.CONTACT_FORM.windowMs
    );

    if (!rateLimitResult.success) {
      const retryAfter = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfter.toString(),
            "X-RateLimit-Limit": RATE_LIMITS.CONTACT_FORM.limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString(),
          },
        }
      );
    }

    // CSRF & Same-Origin Verification
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");
    const host = request.headers.get("host") || "";

    if (origin) {
      try {
        const originUrl = new URL(origin);
        const hostWithoutPort = host.split(":")[0];
        const originHostWithoutPort = originUrl.host.split(":")[0];
        if (hostWithoutPort !== originHostWithoutPort) {
          console.warn(`[lead-capture] Origin mismatch: expected ${hostWithoutPort}, got ${originHostWithoutPort}`);
          return NextResponse.json({ error: "Forbidden: Origin mismatch" }, { status: 403 });
        }
      } catch (_) {
        return NextResponse.json({ error: "Forbidden: Invalid origin header" }, { status: 403 });
      }
    } else if (referer) {
      try {
        const refererUrl = new URL(referer);
        const hostWithoutPort = host.split(":")[0];
        const refererHostWithoutPort = refererUrl.host.split(":")[0];
        if (hostWithoutPort !== refererHostWithoutPort) {
          console.warn(`[lead-capture] Referer mismatch: expected ${hostWithoutPort}, got ${refererHostWithoutPort}`);
          return NextResponse.json({ error: "Forbidden: Referer mismatch" }, { status: 403 });
        }
      } catch (_) {
        return NextResponse.json({ error: "Forbidden: Invalid referer header" }, { status: 403 });
      }
    } else {
      console.warn("[lead-capture] Blocked request missing both Origin and Referer headers.");
      return NextResponse.json({ error: "Forbidden: Same-origin verification failed" }, { status: 403 });
    }

    const body = await request.json();
    const result = requestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const payload = result.data;

    // Honeypot anti-spam check (_gotcha field must remain empty)
    if (payload._gotcha && payload._gotcha.trim().length > 0) {
      console.warn("[lead-capture] Honeypot triggered. Request silently dropped.");
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Forward to Google Apps Script → Google Sheets
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("[lead-capture] Missing GOOGLE_SHEETS_WEBHOOK_URL environment variable.");
      return NextResponse.json(
        { error: "Service Unavailable: configuration missing" },
        { status: 503 }
      );
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      logApiError("/api/lead-capture", new Error("Google Apps Script error"), {
        status: res.status,
        webhookResponse: data,
        submissionType: payload.type,
      });
      return NextResponse.json(
        { error: "Submission failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    logApiError("/api/lead-capture", err, {
      clientIp: getClientIp(request),
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

