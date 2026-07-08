import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* ── Supported locales ───────────────────────────────────────────────────── */
const LOCALES = ["global", "vi"] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = "global";
const COOKIE_NAME = "cbec-language";

/* ── Detect preferred locale ─────────────────────────────────────────────── */
function detectLocale(request: NextRequest): Locale {
  // 1. Check saved cookie preference
  const saved = request.cookies.get(COOKIE_NAME)?.value;
  if (saved === "vi" || saved === "global") return saved as Locale;

  // 2. Infer from Accept-Language header
  const acceptLang = request.headers.get("accept-language") ?? "";
  if (acceptLang.toLowerCase().includes("vi")) return "vi";

  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. API Protection: same-origin check for POST requests
  if (pathname.startsWith("/api/") && request.method === "POST") {
    const origin = request.headers.get("origin");
    const expectedOrigin = request.nextUrl.origin;

    if (origin && origin.toLowerCase() !== expectedOrigin.toLowerCase()) {
      console.warn(`[proxy] Blocked request to ${pathname} from unauthorized origin: ${origin}`);
      return new NextResponse(
        JSON.stringify({ error: "Forbidden: Cross-Origin request blocked" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  // Skip Next.js internals, API routes (GET, etc.), and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files (images, fonts, etc.)
  ) {
    return NextResponse.next();
  }

  // Already under a locale prefix — allow through
  const hasLocale = LOCALES.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // If not under a locale, redirect root "/" or paths to detected locale
  if (!hasLocale) {
    const locale = detectLocale(request);
    const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
    const response = NextResponse.redirect(redirectUrl);

    // Persist the detected choice in a cookie (1 year)
    response.cookies.set(COOKIE_NAME, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return response;
  }

  // 2. Dynamic CSP Nonce Generation for actual page requests (e.g. /vi or /global)
  const nonce = btoa(
    Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((b) => String.fromCharCode(b))
      .join("")
  );

  // Clone request headers to inject x-nonce for downstream Server Components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  // Define Content Security Policy rules
  const isDev = process.env.NODE_ENV === "development";
  const scriptSrcRule = isDev
    ? `'self' 'nonce-${nonce}' 'unsafe-eval'`
    : `'self' 'nonce-${nonce}'`;

  // 'unsafe-inline' style-src is kept as Next.js requires inline stylesheet injection at runtime
  const cspHeaderValue = `
    default-src 'self';
    script-src ${scriptSrcRule};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://images.unsplash.com;
    connect-src 'self';
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim();

  requestHeaders.set("Content-Security-Policy", cspHeaderValue);

  // Create response passing modified request headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Attach Content-Security-Policy to the response headers for browser enforcement
  response.headers.set("Content-Security-Policy", cspHeaderValue);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static assets)
     * - _next/image  (image optimisation)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
