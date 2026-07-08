/**
 * Project Schema - Structured data for case study pages
 */
import { escapeJsonLd } from "@/lib/security";
import type { ProjectItem } from "@/lib/projects";

interface Props {
  project: ProjectItem;
  lang: string;
  nonce?: string;
}

export default function ProjectSchema({ project, lang, nonce }: Props) {
  const isVi = lang === "vi";
  const SITE_URL = "https://www.cbecsolutions.com";

  // Article schema for case study
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: isVi ? project.outcome.vi : project.outcome.en,
    image: `${SITE_URL}${project.image}`,
    author: {
      "@type": "Organization",
      name: "CBEC Solutions",
    },
    publisher: {
      "@type": "Organization",
      name: "CBEC Solutions",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: `${project.year}-01-01`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${lang}/work/${project.slug}`,
    },
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
        name: isVi ? "Dự án" : "Work",
        item: `${SITE_URL}/${lang}#projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${SITE_URL}/${lang}/work/${project.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(articleSchema) }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(breadcrumbSchema) }}
      />
    </>
  );
}
