import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/services";

const SITE_URL = "https://www.cbecsolutions.com";

const LOCALES = ["global", "vi"] as const;
type Locale = (typeof LOCALES)[number];

function isLocale(lang: string): lang is Locale {
  return (LOCALES as readonly string[]).includes(lang);
}

export async function generateStaticParams() {
  const params: { lang: string; service: string }[] = [];
  for (const locale of LOCALES) {
    for (const service of SERVICES) {
      if (service.locale === "both" || service.locale === locale) {
        params.push({ lang: locale, service: service.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; service: string }>;
}): Promise<Metadata> {
  const { lang, service: slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "global";
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service || (service.locale !== "both" && service.locale !== locale)) {
    return { title: "Not Found" };
  }

  const isVi = locale === "vi";
  const name = isVi ? service.name.vi : service.name.en;
  const desc = isVi ? service.metaDescription.vi : service.metaDescription.en;

  // For alternate links, if the service only exists for one locale, we shouldn't map alternative locales to it
  const alternates: Metadata["alternates"] = {
    canonical: `${SITE_URL}/${locale}/services/${slug}`,
  };

  if (service.locale === "both") {
    alternates.languages = {
      en: `${SITE_URL}/global/services/${slug}`,
      "vi-VN": `${SITE_URL}/vi/services/${slug}`,
      "x-default": `${SITE_URL}/global/services/${slug}`,
    };
  }

  return {
    title: `${name} | CBEC Solutions`,
    description: desc,
    metadataBase: new URL(SITE_URL),
    alternates,
    openGraph: {
      type: "website",
      title: `${name} | CBEC Solutions`,
      description: desc,
      url: `${SITE_URL}/${locale}/services/${slug}`,
    },
  };
}

/* ── Page ─────────────────────────────────────────────────────────────── */
import ServicePageTemplate from "@/components/ServicePageTemplate";
import ServiceSchema from "@/components/ServiceSchema";
import { headers } from "next/headers";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ lang: string; service: string }>;
}) {
  const { lang, service: slug } = await params;
  if (!isLocale(lang)) notFound();

  const service = SERVICES.find((s) => s.slug === slug);
  if (!service || (service.locale !== "both" && service.locale !== lang)) {
    notFound();
  }

  const nonce = (await headers()).get("x-nonce") || undefined;

  return (
    <>
      <ServiceSchema service={service} lang={lang} nonce={nonce} />
      <ServicePageTemplate service={service} lang={lang} />
    </>
  );
}
