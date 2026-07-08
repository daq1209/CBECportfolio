"use client";

import { useEffect } from "react";
import { logClientError } from "@/lib/logger";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error with locale context
    logClientError("LocaleErrorBoundary", error, {
      digest: error.digest,
      path: typeof window !== "undefined" ? window.location.pathname : "unknown",
    });
  }, [error]);

  // Get language from URL path
  const isVietnamese = typeof window !== "undefined" && window.location.pathname.includes("/vi");

  return (
    <div style={{
      backgroundColor: "#0a0a0a",
      color: "#ededed",
      fontFamily: "system-ui, sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "2rem"
    }}>
      <div style={{
        maxWidth: "600px",
        textAlign: "center",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "12px",
        padding: "3rem 2rem"
      }}>
        <h1 style={{
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: "1rem",
          color: "#66FF80"
        }}>
          {isVietnamese ? "Đã xảy ra lỗi" : "Something went wrong"}
        </h1>
        <p style={{
          fontSize: "1rem",
          color: "rgba(255, 255, 255, 0.6)",
          marginBottom: "2rem",
          lineHeight: 1.6
        }}>
          {isVietnamese
            ? "Xin lỗi vì sự bất tiện này. Đội ngũ của chúng tôi đã được thông báo và đang khắc phục."
            : "We apologize for the inconvenience. Our team has been notified and is working to fix the issue."}
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={reset}
            style={{
              backgroundColor: "#66FF80",
              color: "#0a0a0a",
              border: "none",
              padding: "0.75rem 2rem",
              borderRadius: "999px",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "opacity 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = "0.8"}
            onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
          >
            {isVietnamese ? "Thử lại" : "Try again"}
          </button>
          <a
            href={isVietnamese ? "/vi" : "/global"}
            style={{
              backgroundColor: "transparent",
              color: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "0.75rem 2rem",
              borderRadius: "999px",
              fontSize: "0.875rem",
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-block",
              transition: "border-color 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)"}
            onMouseOut={(e) => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)"}
          >
            {isVietnamese ? "Về trang chủ" : "Go home"}
          </a>
        </div>
        {process.env.NODE_ENV === "development" && error.message && (
          <details style={{
            marginTop: "2rem",
            textAlign: "left",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            padding: "1rem",
            borderRadius: "8px",
            fontSize: "0.75rem",
            fontFamily: "monospace"
          }}>
            <summary style={{ cursor: "pointer", marginBottom: "0.5rem", fontWeight: 600 }}>
              {isVietnamese ? "Chi tiết lỗi (chỉ dev)" : "Error details (dev only)"}
            </summary>
            <pre style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              margin: 0,
              color: "#ff6b6b"
            }}>
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
