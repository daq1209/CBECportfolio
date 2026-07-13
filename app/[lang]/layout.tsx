import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Be_Vietnam_Pro } from "next/font/google";
import Providers from "@/components/Providers";
import SchemaMarkup from "@/components/SchemaMarkup";
import CustomCursor from "@/components/animations/CustomCursor";
import "@/app/globals.css";

/* ── Supported locales ───────────────────────────────────────────────────── */
const LOCALES = ["global", "vi"] as const;
type Locale = (typeof LOCALES)[number];

function isLocale(lang: string): lang is Locale {
  return (LOCALES as readonly string[]).includes(lang);
}

/*
 * ── Font Strategy ─────────────────────────────────────────────────────────
 *
 * Root cause of Vietnamese encoding issues:
 *   Red Hat Display only loads the "latin" subset — it has NO Vietnamese
 *   glyphs. When the browser falls back to system font mid-render the
 *   diacritics appear broken.
 *
 * Solution — single font family for all roles:
 *   Be Vietnam Pro is purpose-built for Vietnamese diacritics AND supports
 *   Latin perfectly. We load ONE instance with both subsets and all weights,
 *   mapping it to BOTH --font-display and --font-body CSS variables.
 *   This eliminates all subset gaps and removes the need for FontWrapper swapping.
 *
 *   The editorial "geometric" feel of Red Hat Display is preserved through
 *   weight + tracking choices in the components, not through a separate typeface.
 */
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  // All weights needed by the design system
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-primary",
  display: "swap",
  preload: true,
  // Preload both subsets so Vietnamese characters are never unstyled
  adjustFontFallback: true,
});

/* ── Per-locale metadata config ──────────────────────────────────────────── */
const SITE_URL = "https://www.cbecsolutions.com";

const META_CONFIG: Record<Locale, { title: string; description: string; htmlLang: string }> = {
  global: {
    htmlLang: "en",
    title: "CBEC Solutions | Software Outsourcing & Web Development in Vietnam",
    description:
      "CBEC Solutions helps startups and SMEs build brands, websites, custom software, CRM systems, and AI automation with an Australia-connected, Vietnam-based delivery team.",
  },
  vi: {
    htmlLang: "vi",
    title: "CBEC Solutions | Thiết Kế Website, Branding & Tự Động Hóa AI Cho Doanh Nghiệp",
    description:
      "CBEC Solutions giúp doanh nghiệp Việt xây dựng thương hiệu, website, phần mềm quản lý, CRM và hệ thống AI automation để tăng lead, tiết kiệm thời gian và vận hành hiệu quả hơn.",
  },
};

/* ── Dynamic metadata (SSR, per locale) ──────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "global";
  const meta = META_CONFIG[locale];

  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/global`,
        "vi-VN": `${SITE_URL}/vi`,
        "x-default": `${SITE_URL}/global`,
      },
    },
    keywords:
      locale === "vi"
        ? [
            "thiết kế website doanh nghiệp",
            "dịch vụ branding",
            "agency marketing SME",
            "phần mềm CRM cho doanh nghiệp nhỏ",
            "AI automation cho sales",
            "công ty thiết kế website TP.HCM",
          ]
        : [
            "software outsourcing Vietnam",
            "web development outsourcing Vietnam",
            "MVP development agency Vietnam",
            "dedicated development team Vietnam",
            "AI automation agency for SMEs",
            "Australian-led software outsourcing Vietnam",
          ],
    authors: [{ name: "CBEC Solutions", url: SITE_URL }],
    creator: "CBEC Solutions",
    openGraph: {
      type: "website",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      alternateLocale: locale === "vi" ? "en_US" : "vi_VN",
      url: `${SITE_URL}/${locale}`,
      siteName: "CBEC Solutions",
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "CBEC Solutions — Creative Agency",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/* ── Static params for build ─────────────────────────────────────────────── */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

/* ── Root layout ─────────────────────────────────────────────────────────── */
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLocale(lang)) notFound();

  const htmlLang = META_CONFIG[lang].htmlLang;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang={htmlLang} className={beVietnamPro.variable}>
      <head>
        {/* Google Analytics 4 */}
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              id="google-analytics"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                    send_page_view: true
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        {/* Skip to main content for keyboard navigation */}
        <a href="#main-content" className="skip-link">
          {lang === "vi" ? "Chuyển đến nội dung chính" : "Skip to main content"}
        </a>
        <CustomCursor />
        <SchemaMarkup lang={lang} />
        <Providers lang={lang}>{children}</Providers>
      </body>
    </html>
  );
}
