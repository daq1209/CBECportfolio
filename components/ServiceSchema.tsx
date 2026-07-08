/**
 * Service Schema - Structured data for service pages
 */
import { escapeJsonLd } from "@/lib/security";
import type { ServiceItem } from "@/lib/services";

interface Props {
  service: ServiceItem;
  lang: string;
  nonce?: string;
}

export default function ServiceSchema({ service, lang, nonce }: Props) {
  const isVi = lang === "vi";
  const SITE_URL = "https://www.cbecsolutions.com";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isVi ? service.name.vi : service.name.en,
    description: isVi ? service.metaDescription.vi : service.metaDescription.en,
    provider: {
      "@type": "Organization",
      name: "CBEC Solutions",
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "72A Lê Thánh Tôn, Floor 17",
        addressLocality: "Ho Chi Minh City",
        addressRegion: "District 1",
        addressCountry: "VN",
      },
    },
    areaServed: {
      "@type": "Country",
      name: isVi ? "Việt Nam" : "Australia",
    },
    serviceType: isVi ? service.name.vi : service.name.en,
    url: `${SITE_URL}/${lang}/services/${service.slug}`,
  };

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isVi ? "Trang chủ" : "Home",
        item: `${SITE_URL}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isVi ? "Dịch vụ" : "Services",
        item: `${SITE_URL}/${lang}#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: isVi ? service.name.vi : service.name.en,
        item: `${SITE_URL}/${lang}/services/${service.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(breadcrumbSchema) }}
      />
    </>
  );
}
