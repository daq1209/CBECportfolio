/**
 * SchemaMarkup — injects structured data (JSON-LD) into the page head.
 *
 * Renders Organization schema for /global (en) and LocalBusiness schema for
 * /vi, giving Google rich context about the company in both markets.
 *
 * This is a Server Component — no "use client" directive.
 */
import { escapeJsonLd } from "@/lib/security";
import { headers } from "next/headers";

interface Props {
  lang: string;
}

export default async function SchemaMarkup({ lang }: Props) {
  const isVi = lang === "vi";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CBEC Solutions",
    url: "https://www.cbecsolutions.com",
    logo: "https://www.cbecsolutions.com/logo.png",
    description:
      "CBEC Solutions is a creative technology company helping startups and SMEs build brands, websites, custom software, CRM systems, and AI automation.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "72A Lê Thánh Tôn, Floor 17",
      addressLocality: "Ho Chi Minh City",
      addressRegion: "District 1",
      addressCountry: "VN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+84-703-819-006",
      contactType: "customer service",
      availableLanguage: ["English", "Vietnamese"],
    },
    sameAs: [
      "https://www.linkedin.com/company/cbecsolutions",
      "https://www.facebook.com/cbecsolutions",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CBEC Solutions",
    image: "https://www.cbecsolutions.com/og-image.jpg",
    url: "https://www.cbecsolutions.com/vi",
    telephone: "+84-703-819-006",
    address: {
      "@type": "PostalAddress",
      streetAddress: "72A Lê Thánh Tôn, Tầng 17",
      addressLocality: "TP. Hồ Chí Minh",
      addressRegion: "Quận 1",
      postalCode: "700000",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.7769,
      longitude: 106.7009,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "$$",
    description:
      "CBEC Solutions cung cấp dịch vụ thiết kế website, branding, phần mềm doanh nghiệp và AI automation cho SME tại Việt Nam.",
    identifier: {
      "@type": "PropertyValue",
      name: "MST",
      value: "0319431730",
    },
  };

  const schema = isVi ? localBusinessSchema : organizationSchema;
  const nonce = (await headers()).get("x-nonce") || undefined;

  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: escapeJsonLd(schema) }}
    />
  );
}
