"use client";

import { Red_Hat_Display, Red_Hat_Text } from "next/font/google";
import { ReactLenis } from "lenis/react";
import "./globals.css";

/* ── Brand Typefaces ── */
const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

const redHatText = Red_Hat_Text({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${redHatDisplay.variable} ${redHatText.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <ReactLenis root>{children}</ReactLenis>
      </body>
    </html>
  );
}