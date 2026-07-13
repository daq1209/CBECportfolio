import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/lib/projects";
import ProjectSchema from "@/components/ProjectSchema";
import { headers } from "next/headers";

const SITE_URL = "https://www.cbecsolutions.com";
const LOCALES = ["global", "vi"] as const;
type Locale = (typeof LOCALES)[number];

function isLocale(lang: string): lang is Locale {
  return (LOCALES as readonly string[]).includes(lang);
}

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const project of PROJECTS) {
      params.push({ lang: locale, slug: project.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "global";
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) return { title: "Not Found" };

  const isVi = locale === "vi";
  const title = `${project.title} Case Study | CBEC Solutions`;
  const desc = isVi ? project.outcome.vi : project.outcome.en;

  return {
    title,
    description: desc,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${locale}/work/${slug}`,
      languages: {
        en: `${SITE_URL}/global/work/${slug}`,
        "vi-VN": `${SITE_URL}/vi/work/${slug}`,
        "x-default": `${SITE_URL}/global/work/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      title,
      description: desc,
      url: `${SITE_URL}/${locale}/work/${slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const isVi = lang === "vi";
  const nonce = (await headers()).get("x-nonce") || undefined;

  return (
    <>
      <ProjectSchema project={project} lang={lang} nonce={nonce} />
      <main className="bg-[#0a0a0a] text-white min-h-screen pb-32">
      {/* Navigation Header */}
      <nav className="w-full max-w-[1400px] mx-auto px-6 md:px-16 py-8 flex justify-between items-center border-b border-white/[0.05]">
        <Link
          href={`/${lang}`}
          className="text-xs uppercase tracking-[0.2em] font-mono text-white/50 hover:text-white transition-colors duration-300 flex items-center gap-2"
        >
          <span>←</span> {isVi ? "Về trang chủ" : "Back to Home"}
        </Link>
        <span className="text-xs uppercase tracking-[0.2em] font-mono text-white/30">
          Case Study — 0{PROJECTS.indexOf(project) + 1}
        </span>
      </nav>

      {/* Hero Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-16 pt-16 md:pt-24 pb-12">
        <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#66FF80]">
          {isVi ? "Dự án tiêu biểu" : "Featured Case Study"}
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-4 mb-12">
          <h1
            className="text-[12vw] md:text-[6vw] font-bold uppercase leading-[1.05] tracking-tighter text-white m-0"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.title}
          </h1>
          {project.externalLink && (
            <a 
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 bg-[#66FF80] text-[#0a0a0a] rounded-full text-sm font-semibold tracking-tight hover:bg-white transition-colors duration-300 w-fit"
            >
              {isVi ? "Truy cập Website" : "Visit Website"}
              <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">↗</span>
            </a>
          )}
        </div>

        {/* Project Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-white/[0.08] text-sm font-light">
          <div>
            <span className="block text-[10px] font-mono text-white/35 uppercase tracking-[0.25em] mb-2">
              {isVi ? "Khách hàng" : "Client"}
            </span>
            <span className="text-white/80">{project.client}</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono text-white/35 uppercase tracking-[0.25em] mb-2">
              {isVi ? "Năm thực hiện" : "Year"}
            </span>
            <span className="text-white/80">{project.year}</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono text-white/35 uppercase tracking-[0.25em] mb-2">
              {isVi ? "Vai trò của CBEC" : "Role"}
            </span>
            <span className="text-white/80">{isVi ? project.role.vi : project.role.en}</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono text-white/35 uppercase tracking-[0.25em] mb-2">
              {isVi ? "Kết quả chính" : "Core Outcome"}
            </span>
            <span className="text-[#66FF80] font-medium">
              {isVi ? project.outcome.vi : project.outcome.en}
            </span>
          </div>
        </div>
      </section>

      {/* Hero Showcase Image */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-16 mb-24">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-white/[0.03] border border-white/[0.08]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Left Column: Overview & Stats */}
        <div className="lg:col-span-5 flex flex-col gap-12">
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] font-mono text-white/35 mb-4">
              {isVi ? "Tổng quan dự án" : "Overview"}
            </h2>
            <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed">
              {isVi ? project.overview.vi : project.overview.en}
            </p>
          </div>

          {/* Stats Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 mt-4">
            {project.stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-sm relative overflow-hidden"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#66FF80] mb-2 font-mono">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-[0.1em] text-white/50 leading-snug">
                  {isVi ? stat.label.vi : stat.label.en}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Case Details */}
        <div className="lg:col-span-7 flex flex-col gap-16">
          {/* 1. Challenges */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <h3 className="text-sm uppercase tracking-[0.2em] font-mono text-white/80">
                {isVi ? "Thử thách & Khó khăn" : "The Challenges"}
              </h3>
            </div>
            <ul className="flex flex-col gap-6 pl-4 border-l border-white/[0.08]">
              {project.challenges.map((c, i) => (
                <li key={i} className="text-base text-white/60 font-light leading-relaxed">
                  {isVi ? c.vi : c.en}
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Solutions */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#66FF80]" />
              <h3 className="text-sm uppercase tracking-[0.2em] font-mono text-white/80">
                {isVi ? "Giải pháp của chúng tôi" : "Our Solution"}
              </h3>
            </div>
            <ul className="flex flex-col gap-6 pl-4 border-l border-white/[0.08]">
              {project.solutions.map((s, i) => (
                <li key={i} className="text-base text-white/60 font-light leading-relaxed">
                  {isVi ? s.vi : s.en}
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Results */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <h3 className="text-sm uppercase tracking-[0.2em] font-mono text-white/80">
                {isVi ? "Kết quả thực tế" : "The Results"}
              </h3>
            </div>
            <ul className="flex flex-col gap-6 pl-4 border-l border-white/[0.08]">
              {project.results.map((r, i) => (
                <li key={i} className="text-base text-white/60 font-light leading-relaxed">
                  {isVi ? r.vi : r.en}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery Images Section - Only show if galleryImages exist */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-16 mt-32">
          <h3 className="text-xs uppercase tracking-[0.2em] font-mono text-white/35 mb-8">
            {isVi ? "Hình ảnh dự án" : "Project Gallery"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.galleryImages.map((imgSrc, idx) => (
              <div
                key={idx}
                className="relative w-full aspect-[16/10] overflow-hidden bg-white/[0.02] border border-white/[0.05] rounded-sm group cursor-pointer"
              >
                <Image
                  src={imgSrc}
                  alt={`${project.title} - Gallery image ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white/80 text-xs font-mono uppercase tracking-widest">
                    {isVi ? "Xem chi tiết" : "View Full Size"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-16 mt-32">
        <div className="bg-gradient-to-r from-white/[0.02] to-white/[0.01] border border-white/[0.05] p-8 md:p-16 text-center rounded-sm">
          <h2
            className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {isVi ? "Bạn cũng muốn đạt hiệu quả đột phá?" : "Ready to elevate your project?"}
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-10 text-sm md:text-base font-light leading-relaxed">
            {isVi
              ? "Hãy thảo luận cùng đội ngũ kỹ sư và chuyên gia của chúng tôi để tìm kiếm giải pháp công nghệ tối ưu nhất cho doanh nghiệp bạn."
              : "Let's co-engineer a solution tailored strictly to your business objectives, lead acquisition flows, or operational efficiency."}
          </p>
          <Link
            href={`/${lang}#contact`}
            className="inline-block bg-white text-black text-xs font-mono uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#66FF80] transition-colors duration-300"
          >
            {isVi ? "Liên hệ ngay hôm nay" : "Start your project"}
          </Link>
        </div>
      </section>
    </main>
    </>
  );
}
