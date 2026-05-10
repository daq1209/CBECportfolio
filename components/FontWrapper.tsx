"use client";

import { useLanguage } from "@/context/LanguageContext";

/**
 * FontWrapper — overrides the --font-display and --font-body CSS variables
 * based on the active language. All child components automatically pick up
 * the correct font without any per-component changes.
 *
 * EN: Red Hat Display (Latin-optimised, geometric, editorial)
 * VI: Be Vietnam Pro (designed for Vietnamese diacritics, equally modern)
 */
export default function FontWrapper({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();

  const style =
    language === "vi"
      ? ({
          "--font-display": "var(--font-vi-display)",
          "--font-body": "var(--font-vi-body)",
        } as React.CSSProperties)
      : undefined;

  return (
    <div style={style} className="contents">
      {children}
    </div>
  );
}
