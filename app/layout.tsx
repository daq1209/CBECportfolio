"use client";

import { Red_Hat_Display, Red_Hat_Text, Be_Vietnam_Pro } from "next/font/google";
import { ReactLenis } from "lenis/react";
import { LanguageProvider } from "@/context/LanguageContext";
import LanguageGate from "@/components/LanguageGate";
// import LanguageSwitcher from "@/components/LanguageSwitcher";
import FontWrapper from "@/components/FontWrapper";
import "./globals.css";

/* ── English Typefaces ── */
const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

const redHatText = Red_Hat_Text({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

/* ── Vietnamese Typefaces ── */
const beVietnamProDisplay = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-vi-display",
  display: "swap",
});

const beVietnamProBody = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500"],
  variable: "--font-vi-body",
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
      className={`${redHatDisplay.variable} ${redHatText.variable} ${beVietnamProDisplay.variable} ${beVietnamProBody.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <LanguageProvider>
          <FontWrapper>
            <LanguageGate />
            {/* <LanguageSwitcher /> */}
            <ReactLenis root>{children}</ReactLenis>
          </FontWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}