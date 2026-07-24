"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { translations } from "@/lib/translations";
import { PROJECTS } from "@/lib/projects";

const PROJECT_CATEGORIES: Record<string, { en: string; vi: string }> = {
  "gallery.cat1": { en: "Branding · Web Dev", vi: "Thương hiệu · Web" },
  "gallery.cat2": { en: "SaaS · Enterprise", vi: "SaaS · Doanh nghiệp" },
  "gallery.cat3": { en: "Creative · Campaign", vi: "Sáng tạo · Chiến dịch" },
  "gallery.cat5": { en: "Web Dev · E-Commerce", vi: "Lập trình Web · Thương mại điện tử" },
  "gallery.cat6": { en: "Branding · Next.js", vi: "Thương hiệu · Next.js App" },
  "gallery.cat7": { en: "eCommerce · Amazon", vi: "eCommerce · Amazon" },
};

interface ShowcaseConfig {
  aspect: string;
  width: string;
  offsetY: string;
  mobileAspect: string;
  badge: { en: string; vi: string };
}

const SHOWCASE_LAYOUTS: Record<string, ShowcaseConfig> = {
  // Richmond Smiles: portrait phone mockup ~3:4
  "richmond-smiles": {
    aspect: "aspect-[3/4]",
    width: "w-[28vw] lg:w-[24vw] xl:w-[20vw]",
    offsetY: "translate-y-0",
    mobileAspect: "aspect-[3/4]",
    badge: { en: "+48% Booking Conversion", vi: "Tăng 48% chuyển đổi đặt lịch" },
  },
  // Bánh Mì Ngon: near-square logo artwork ~1:1
  "banh-mi-ngon": {
    aspect: "aspect-[1/1]",
    width: "w-[30vw] lg:w-[26vw] xl:w-[22vw]",
    offsetY: "translate-y-12",
    mobileAspect: "aspect-[1/1]",
    badge: { en: "100% Sustainable Eco Packaging", vi: "100% Bao bì sinh học" },
  },
  // Dentix Consulting: ~4:3 logo on dark background
  "dentix-consulting": {
    aspect: "aspect-[4/3]",
    width: "w-[36vw] lg:w-[32vw] xl:w-[28vw]",
    offsetY: "-translate-y-6",
    mobileAspect: "aspect-[4/3]",
    badge: { en: "Corporate Brand Identity Suite", vi: "Nhận diện tập đoàn y tế" },
  },
  // Lee Concept: tall portrait logo ~2:3
  "lee-concept": {
    aspect: "aspect-[2/3]",
    width: "w-[26vw] lg:w-[22vw] xl:w-[18vw]",
    offsetY: "translate-y-6",
    mobileAspect: "aspect-[2/3]",
    badge: { en: "Autonomous AI Market Scraping Bot", vi: "Bot AI cào dữ liệu 24/7" },
  },
  // Unineon: wide landscape website screenshot ~16:9
  "unineon": {
    aspect: "aspect-[16/9]",
    width: "w-[44vw] lg:w-[40vw] xl:w-[36vw]",
    offsetY: "-translate-y-4",
    mobileAspect: "aspect-[16/9]",
    badge: { en: "Live CSS Neon Light Engine", vi: "Hiệu ứng ánh sáng Neon Live" },
  },
};

export default function ProjectsGallery({ lang }: { lang: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const language = lang === "vi" ? "vi" : "en";
  const routeLang = lang === "vi" ? "vi" : "global";
  const t = translations[language].gallery;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Outer horizontal scroll for the gallery
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);
  // Inner parallax for the images
  const imageParallax = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  // Background typography parallax
  const bgTextX = useTransform(scrollYProgress, [0, 1], ["10%", "-25%"]);

  const headerOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.22], [0, -30]);

  return (
    <section id="projects" className="bg-[#0a0a0a] text-white">
      {/* MOBILE SHOWCASE (Asymmetrical Magazine Grid) */}
      <div className="block md:hidden px-6 pt-24 pb-16">
        <div className="flex justify-between items-center mb-12">
          <span className="flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-[#66FF80] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#66FF80] animate-pulse inline-block" />
            {t.label}
          </span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-white/40 uppercase">
            01 — 0{PROJECTS.length}
          </span>
        </div>

        <div className="mb-16">
          <div
            className="text-[13vw] font-bold leading-[1.02] tracking-tighter uppercase text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.headline1}
            <br />
            <span className="text-white/30">{t.headline2}</span>
          </div>
          <p className="mt-4 text-xs text-white/60 font-light max-w-[300px] leading-relaxed">
            {t.description}
          </p>
        </div>

        <div className="flex flex-col gap-20">
          {PROJECTS.map((project, i) => {
            const config = SHOWCASE_LAYOUTS[project.slug] || {
              aspect: "aspect-[16/10]",
              width: "w-full",
              offsetY: "translate-y-0",
              mobileAspect: "aspect-[16/10]",
              badge: { en: project.industry || "Featured Case Study", vi: project.industry || "Dự án tiêu biểu" },
            };

            return (
              <Link
                key={project.slug}
                href={`/${routeLang}/work/${project.slug}`}
                className="relative w-full block group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Top metadata bar */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-mono text-[#66FF80] tracking-widest uppercase">
                      0{i + 1} / 0{PROJECTS.length}
                    </span>
                  </div>

                  {/* Asymmetrical Showcase Image */}
                  <div className={`relative w-full ${config.mobileAspect} overflow-hidden bg-[#121212] border border-white/[0.08] rounded-sm mb-5 shadow-2xl`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="100vw"
                      className={`object-cover ${project.imagePosition || "object-center"}`}
                      quality={92}
                    />


                  </div>

                  {/* Title & Description */}
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3
                        className="text-xl font-bold uppercase tracking-tight text-white mb-1 group-hover:text-[#66FF80] transition-colors"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-[10px] font-mono tracking-[0.15em] text-white/50 uppercase mb-2">
                        {PROJECT_CATEGORIES[project.category][language]}
                      </p>
                      <p className="text-xs font-light text-white/70 line-clamp-2 leading-relaxed">
                        {project.outcome[language]}
                      </p>
                    </div>

                    <span className="text-[11px] font-mono text-[#66FF80] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {t.viewProject} ↗
                    </span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* DESKTOP (Editorial Showcase Layout with Asymmetrical Ratios & Parallax) */}
      <div className="hidden md:block relative">
        <div ref={containerRef} className="relative h-[550vh] bg-[#0a0a0a]">
          <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a]">
            {/* Giant Background Typography */}
            <motion.div
              style={{ x: bgTextX }}
              className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap opacity-[0.03] pointer-events-none select-none"
            >
              <div
                className="text-[38vw] font-bold leading-none tracking-tighter uppercase text-white font-mono"
              >
                SHOWCASE WORKS
              </div>
            </motion.div>

            {/* Top Bar Header */}
            <motion.div
              style={{ opacity: headerOpacity, y: headerY }}
              className="absolute top-10 left-16 right-16 flex justify-between items-center z-20"
            >
              <span className="flex items-center gap-2.5 text-[11px] font-mono tracking-[0.25em] text-[#66FF80] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#66FF80] animate-pulse inline-block" />
                {t.label}
              </span>
              <span className="text-[11px] font-mono tracking-[0.25em] text-white/40 uppercase">
                {t.status}
              </span>
            </motion.div>

            {/* Editorial Title Block */}
            <motion.div
              style={{ opacity: headerOpacity, y: headerY }}
              className="absolute top-24 left-16 z-20 pointer-events-none max-w-xl"
            >
              <div
                className="text-[6.5vw] font-bold leading-[0.98] tracking-tighter uppercase text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.headline1}
                <br />
                <span className="text-white/30">{t.headline2}</span>
              </div>
              <p className="mt-5 text-sm text-white/60 font-light leading-relaxed">
                {t.description}
              </p>
            </motion.div>

            {/* Dynamic Asymmetrical Showcase Track */}
            <motion.div style={{ x }} className="absolute top-0 left-0 h-full flex items-center gap-16 xl:gap-24">
              <div className="flex-shrink-0 w-[44vw] h-px" />

              {PROJECTS.map((project, i) => {
                const config = SHOWCASE_LAYOUTS[project.slug] || {
                  aspect: "aspect-[16/10]",
                  width: "w-[36vw]",
                  offsetY: "translate-y-0",
                  mobileAspect: "aspect-[16/10]",
                  badge: { en: "Featured Case Study", vi: "Dự án tiêu biểu" },
                };

                return (
                  <Link
                    key={project.slug}
                    href={`/${routeLang}/work/${project.slug}`}
                    className={`relative flex-shrink-0 ${config.width} ${config.offsetY} block group cursor-none cursor-hover-target transition-transform duration-700 hover:-translate-y-2`}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.1 }}
                    >
                      {/* Top Header line of Card */}
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-mono text-[#66FF80] tracking-[0.2em] uppercase">
                          0{i + 1} / 0{PROJECTS.length}
                        </span>
                      </div>

                      {/* Asymmetrical Image Container with Inner Parallax & Vignette */}
                      <div className={`relative w-full ${config.aspect} overflow-hidden bg-[#121212] border border-white/[0.08] group-hover:border-[#66FF80]/40 rounded-sm mb-5 transition-colors duration-500 shadow-2xl`}>
                        <motion.div
                          className="w-[115%] h-full relative -left-[7.5%]"
                          style={{ x: imageParallax }}
                        >
                          <motion.div
                            className="w-full h-full relative"
                            whileHover={{ scale: 1.06 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              sizes="(max-width: 1024px) 45vw, 35vw"
                              className={`object-cover ${project.imagePosition || "object-center"}`}
                              quality={95}
                              priority={i === 0}
                            />
                          </motion.div>
                        </motion.div>

                        {/* Top Gradient Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />



                        {/* Hover Overlay Arrow Text */}
                        <div className="absolute top-4 right-4 bg-[#66FF80] text-black w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-45">
                          ↗
                        </div>
                      </div>

                      {/* Card Content & Metadata */}
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3
                            className="text-2xl xl:text-3xl font-bold uppercase tracking-tight text-white group-hover:text-[#66FF80] transition-colors duration-300 mb-1"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {project.title}
                          </h3>
                          <p className="text-[11px] font-mono tracking-[0.2em] text-[#66FF80] uppercase mb-2">
                            {PROJECT_CATEGORIES[project.category][language]}
                          </p>
                          <p className="text-xs text-white/60 font-light leading-relaxed max-w-md line-clamp-2">
                            {project.outcome[language]}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}

              <div className="flex-shrink-0 w-[24vw] h-px" />
            </motion.div>

            {/* Bottom Progress Bar & Instruction */}
            <div className="absolute bottom-8 left-16 right-16 z-20">
              <div className="w-full h-px bg-white/10">
                <motion.div className="h-full bg-[#66FF80] origin-left" style={{ scaleX: scrollYProgress }} />
              </div>
              <motion.p
                style={{ opacity: headerOpacity }}
                className="mt-3 text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase text-right flex items-center justify-end gap-2"
              >
                <span>{language === "en" ? "Scroll to explore showcase" : "Cuộn để khám phá bộ sưu tập"}</span>
                <span className="text-[#66FF80]">→</span>
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
