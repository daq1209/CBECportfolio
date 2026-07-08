import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";
import { PROJECTS } from "@/lib/projects";

const BASE_URL = "https://www.cbecsolutions.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // 1. Root language pages
  entries.push(
    {
      url: `${BASE_URL}/global`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${BASE_URL}/global`,
          "vi-VN": `${BASE_URL}/vi`,
        },
      },
    },
    {
      url: `${BASE_URL}/vi`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${BASE_URL}/global`,
          "vi-VN": `${BASE_URL}/vi`,
        },
      },
    }
  );

  // 2. Localized service pages
  for (const service of SERVICES) {
    if (service.locale === "global" || service.locale === "both") {
      entries.push({
        url: `${BASE_URL}/global/services/${service.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
        ...(service.locale === "both"
          ? {
              alternates: {
                languages: {
                  en: `${BASE_URL}/global/services/${service.slug}`,
                  "vi-VN": `${BASE_URL}/vi/services/${service.slug}`,
                },
              },
            }
          : {}),
      });
    }

    if (service.locale === "vi" || service.locale === "both") {
      entries.push({
        url: `${BASE_URL}/vi/services/${service.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
        ...(service.locale === "both"
          ? {
              alternates: {
                languages: {
                  en: `${BASE_URL}/global/services/${service.slug}`,
                  "vi-VN": `${BASE_URL}/vi/services/${service.slug}`,
                },
              },
            }
          : {}),
      });
    }
  }

  // 3. Case studies (work page slug)
  for (const project of PROJECTS) {
    // Both locales for work details
    entries.push(
      {
        url: `${BASE_URL}/global/work/${project.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            en: `${BASE_URL}/global/work/${project.slug}`,
            "vi-VN": `${BASE_URL}/vi/work/${project.slug}`,
          },
        },
      },
      {
        url: `${BASE_URL}/vi/work/${project.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            en: `${BASE_URL}/global/work/${project.slug}`,
            "vi-VN": `${BASE_URL}/vi/work/${project.slug}`,
          },
        },
      }
    );
  }

  return entries;
}
