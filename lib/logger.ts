/**
 * Lightweight structured logging utility for CBEC Solutions landing page.
 * Logs are captured by Vercel's logging infrastructure automatically.
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogContext {
  [key: string]: unknown;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  stack?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  /**
   * Format log entry with timestamp and level
   */
  private formatLog(level: LogLevel, message: string, context?: LogContext): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(context && { context }),
    };
  }

  /**
   * Log info message
   */
  info(message: string, context?: LogContext): void {
    const entry = this.formatLog("info", message, context);
    console.info(JSON.stringify(entry));
  }

  /**
   * Log warning message
   */
  warn(message: string, context?: LogContext): void {
    const entry = this.formatLog("warn", message, context);
    console.warn(JSON.stringify(entry));
  }

  /**
   * Log error message with optional Error object
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const entry = this.formatLog("error", message, context);

    if (error instanceof Error) {
      entry.stack = error.stack;
      entry.context = {
        ...entry.context,
        errorName: error.name,
        errorMessage: error.message,
      };
    }

    console.error(JSON.stringify(entry));

    // In development, also log the raw error for better DX
    if (this.isDevelopment && error) {
      console.error(error);
    }
  }

  /**
   * Log debug message (only in development)
   */
  debug(message: string, context?: LogContext): void {
    if (!this.isDevelopment) return;

    const entry = this.formatLog("debug", message, context);
    console.debug(JSON.stringify(entry));
  }
}

// Singleton instance
export const logger = new Logger();

/**
 * Helper to log API errors with request context
 */
export function logApiError(
  endpoint: string,
  error: Error | unknown,
  additionalContext?: LogContext
): void {
  logger.error(`API error on ${endpoint}`, error, {
    endpoint,
    ...additionalContext,
  });
}

/**
 * Helper to log client-side errors
 */
export function logClientError(
  component: string,
  error: Error | unknown,
  additionalContext?: LogContext
): void {
  logger.error(`Client error in ${component}`, error, {
    component,
    userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "unknown",
    url: typeof window !== "undefined" ? window.location.href : "unknown",
    ...additionalContext,
  });
}
