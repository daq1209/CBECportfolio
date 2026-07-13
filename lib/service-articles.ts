/**
 * lib/service-articles.ts
 *
 * Detailed SEO articles and FAQs for the 13 CBEC Solutions services.
 * Loaded dynamically in `components/ServicePageTemplate.tsx`.
 * Refactored to import article contents from standalone JSON files for easier editing.
 */

import customSoftwareSolutions from "@/content/services/custom-software-solutions.json";
import webDevelopment from "@/content/services/web-development.json";
import dedicatedDevelopmentTeam from "@/content/services/dedicated-development-team.json";
import customCrmDevelopment from "@/content/services/custom-crm-development.json";
import mvpDevelopment from "@/content/services/mvp-development.json";
import aiAutomation from "@/content/services/ai-automation.json";
import phanMemQuanLy from "@/content/services/phan-mem-quan-ly-doanh-nghiep.json";
import crmSme from "@/content/services/crm-cho-doanh-nghiep-nho.json";
import heThongQuanLyLead from "@/content/services/he-thong-quan-ly-lead.json";
import thietKeWebsite from "@/content/services/thiet-ke-website-doanh-nghiep.json";
import dichVuBranding from "@/content/services/dich-vu-branding.json";
import brandingAndIdentity from "@/content/services/branding-and-identity.json";
import tuDongHoaAi from "@/content/services/tu-dong-hoa-ai-cho-doanh-nghiep.json";
import thietKeLandingPage from "@/content/services/thiet-ke-landing-page-ban-hang.json";

export interface ArticleSection {
  title: string;
  paragraphs: string[];
}

export interface ServiceArticle {
  intro: string;
  sections: ArticleSection[];
  faqs: { question: string; answer: string }[];
}

export const SERVICE_ARTICLES: Record<string, ServiceArticle> = {
  "custom-software-solutions": customSoftwareSolutions as ServiceArticle,
  "web-development": webDevelopment as ServiceArticle,
  "dedicated-development-team": dedicatedDevelopmentTeam as ServiceArticle,
  "custom-crm-development": customCrmDevelopment as ServiceArticle,
  "mvp-development": mvpDevelopment as ServiceArticle,
  "ai-automation": aiAutomation as ServiceArticle,
  "phan-mem-quan-ly-doanh-nghiep": phanMemQuanLy as ServiceArticle,
  "crm-cho-doanh-nghiep-nho": crmSme as ServiceArticle,
  "he-thong-quan-ly-lead": heThongQuanLyLead as ServiceArticle,
  "thiet-ke-website-doanh-nghiep": thietKeWebsite as ServiceArticle,
  "dich-vu-branding": dichVuBranding as ServiceArticle,
  "branding-and-identity": brandingAndIdentity as ServiceArticle,
  "tu-dong-hoa-ai-cho-doanh-nghiep": tuDongHoaAi as ServiceArticle,
  "thiet-ke-landing-page-ban-hang": thietKeLandingPage as ServiceArticle
};
