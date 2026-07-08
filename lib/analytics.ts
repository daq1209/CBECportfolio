/**
 * Google Analytics 4 event tracking utilities for CBEC Solutions.
 */

// Event types
export type GAEvent =
  | { name: "page_view"; params?: { page_path?: string; page_title?: string } }
  | { name: "form_submit"; params: { form_type: "contact" | "lead_magnet"; language: string } }
  | { name: "service_view"; params: { service_slug: string; service_name: string } }
  | { name: "project_view"; params: { project_slug: string; project_name: string } }
  | { name: "cta_click"; params: { cta_text: string; cta_location: string } }
  | { name: "language_switch"; params: { from_lang: string; to_lang: string } }
  | { name: "download"; params: { file_name: string; file_type: string } };

/**
 * Check if Google Analytics is available
 */
export function isGAAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.gtag !== "undefined";
}

/**
 * Track a custom event in Google Analytics
 */
export function trackEvent(event: GAEvent): void {
  if (!isGAAvailable()) {
    // In development, log events to console
    if (process.env.NODE_ENV === "development") {
      console.log("[GA Event]", event.name, event.params);
    }
    return;
  }

  window.gtag("event", event.name, event.params);
}

/**
 * Track form submission
 */
export function trackFormSubmit(formType: "contact" | "lead_magnet", language: string): void {
  trackEvent({
    name: "form_submit",
    params: { form_type: formType, language },
  });
}

/**
 * Track service page view
 */
export function trackServiceView(slug: string, name: string): void {
  trackEvent({
    name: "service_view",
    params: { service_slug: slug, service_name: name },
  });
}

/**
 * Track project/case study view
 */
export function trackProjectView(slug: string, name: string): void {
  trackEvent({
    name: "project_view",
    params: { project_slug: slug, project_name: name },
  });
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(ctaText: string, location: string): void {
  trackEvent({
    name: "cta_click",
    params: { cta_text: ctaText, cta_location: location },
  });
}

/**
 * Track language switch
 */
export function trackLanguageSwitch(fromLang: string, toLang: string): void {
  trackEvent({
    name: "language_switch",
    params: { from_lang: fromLang, to_lang: toLang },
  });
}

/**
 * Track file downloads
 */
export function trackDownload(fileName: string, fileType: string): void {
  trackEvent({
    name: "download",
    params: { file_name: fileName, file_type: fileType },
  });
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (
      command: "event" | "config" | "set" | "consent",
      targetOrAction: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
