"use client";

interface FontWrapperProps {
  children: React.ReactNode;
  lang: string; // kept for potential future per-locale overrides
}

/**
 * FontWrapper — previously swapped CSS font variables between EN/VI typefaces.
 *
 * Now simplified: a single Be Vietnam Pro instance (with both latin + vietnamese
 * subsets) is loaded in [lang]/layout.tsx and mapped to --font-display and
 * --font-body globally. No per-locale swap needed — Be Vietnam Pro renders all
 * Vietnamese diacritics correctly without any variable reassignment.
 *
 * The `lang` prop is kept in the interface for future per-locale font weight
 * or size adjustments if needed (Vietnamese text often benefits from slightly
 * higher line-height, which can be added here without touching every component).
 */
export default function FontWrapper({ children, lang: _lang }: FontWrapperProps) {
  // Vietnamese text benefits from slightly more generous line-height
  // Apply a subtle global adjustment on the /vi locale
  const style =
    _lang === "vi"
      ? ({ lineHeight: "1.75" } as React.CSSProperties)
      : undefined;

  return (
    <div style={style} className="contents">
      {children}
    </div>
  );
}
