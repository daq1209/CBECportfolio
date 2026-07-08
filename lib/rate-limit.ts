/**
 * In-memory rate limiter for API routes.
 *
 * This is a simple rate limiter suitable for single-instance deployments.
 * For multi-instance/serverless deployments, consider using Vercel KV or Upstash Redis.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class InMemoryRateLimiter {
  private storage = new Map<string, RateLimitEntry>();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Clean up expired entries every 5 minutes
    if (typeof setInterval !== "undefined") {
      this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000);
    }
  }

  /**
   * Check if a request should be rate limited
   * @param identifier - Unique identifier (e.g., IP address)
   * @param limit - Maximum number of requests
   * @param windowMs - Time window in milliseconds
   * @returns Object with success status and remaining requests
   */
  check(
    identifier: string,
    limit: number,
    windowMs: number
  ): { success: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = this.storage.get(identifier);

    // No entry or expired entry - allow request
    if (!entry || now > entry.resetTime) {
      const newEntry: RateLimitEntry = {
        count: 1,
        resetTime: now + windowMs,
      };
      this.storage.set(identifier, newEntry);
      return {
        success: true,
        remaining: limit - 1,
        resetTime: newEntry.resetTime,
      };
    }

    // Entry exists and not expired
    if (entry.count >= limit) {
      // Rate limit exceeded
      return {
        success: false,
        remaining: 0,
        resetTime: entry.resetTime,
      };
    }

    // Increment count
    entry.count += 1;
    this.storage.set(identifier, entry);

    return {
      success: true,
      remaining: limit - entry.count,
      resetTime: entry.resetTime,
    };
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.storage.entries()) {
      if (now > entry.resetTime) {
        this.storage.delete(key);
      }
    }
  }

  /**
   * Clear all entries (useful for testing)
   */
  clear(): void {
    this.storage.clear();
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.clear();
  }
}

// Singleton instance
const rateLimiter = new InMemoryRateLimiter();

export default rateLimiter;

/**
 * Extract client IP from request headers
 */
export function getClientIp(request: Request): string {
  // Check Vercel-specific headers first
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Fallback to a default (not ideal, but prevents crashes)
  return "unknown";
}

/**
 * Rate limit configuration presets
 */
export const RATE_LIMITS = {
  // 5 requests per 15 minutes for contact form
  CONTACT_FORM: {
    limit: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  // 10 requests per hour for lead magnet downloads
  LEAD_MAGNET: {
    limit: 10,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
} as const;
