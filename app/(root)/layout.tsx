/**
 * Root layout — minimal passthrough.
 *
 * The `<html>` and `<body>` tags, font variables, and per-locale metadata are
 * all defined in `app/[lang]/layout.tsx`.  This file is intentionally thin
 * because Next.js requires a root layout at `app/layout.tsx` even when the
 * real root layout lives under a dynamic segment.
 *
 * Per Next.js 16 docs: "The root layout can be under a dynamic segment, for
 * example when implementing internationalization with `app/[lang]/layout.js`."
 * In that pattern the `app/layout.tsx` file is omitted — HOWEVER to avoid a
 * build error we keep it as a transparent wrapper that does nothing but pass
 * children through.  The `<html>` / `<body>` are provided by `[lang]/layout`.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}