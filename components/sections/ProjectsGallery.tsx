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
  "gallery.cat5": { en: "Web Dev", vi: "Lập trình Web" },
  "gallery.cat6": { en: "Branding", vi: "Thương hiệu" },
  "gallery.cat7": { en: "eCommerce · Amazon", vi: "eCommerce · Amazon" },
};

export default function ProjectsGallery({ lang }: { lang: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const language = lang === "vi" ? "vi" : "en";
  const t = translations[language].gallery;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  const imageParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const bgTextX = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);

  return (
    <section id="projects" className="bg-[#0a0a0a] text-white">
      {/* MOBILE */}
      <div className="block md:hidden px-6 pt-24 pb-16">
        <div className="flex justify-between items-center mb-16">
          <span className="flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-[#66FF80] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#66FF80] animate-pulse inline-block" />
            {t.label}
          </span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-white/40 uppercase">
            {t.status}
          </span>
        </div>

        <div className="mb-16">
          <h2
            className="text-[14vw] font-bold leading-[1.05] tracking-tighter uppercase text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.headline1}
            <br />
            <span className="text-white/40">{t.headline2}</span>
          </h2>
          <p className="mt-6 text-sm text-white/50 font-light max-w-[280px] leading-relaxed">
            {t.description}
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {PROJECTS.map((project, i) => {
            return (
              <Link
                key={project.slug}
                href={`/${lang}/work/${project.slug}`}
                className="relative w-full block group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-mono text-[#66FF80] tracking-[0.2em] uppercase">
                      0{i + 1} / 0{PROJECTS.length}
                    </span>
                  </div>

                  <div className="relative w-full aspect-square overflow-hidden bg-[#121212] border border-white/[0.08] group-hover:border-[#66FF80]/40 rounded-sm mb-4 transition-colors duration-500 shadow-2xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="100vw"
                      className={`object-cover ${project.imagePosition || "object-center"}`}
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 pointer-events-none" />
                  </div>

                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3
                        className="text-xl font-bold uppercase tracking-tight text-white mb-1"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-[10px] font-mono tracking-[0.18em] text-[#66FF80] uppercase mb-1.5">
                        {PROJECT_CATEGORIES[project.category][language]}
                      </p>
                      <p className="text-[11px] font-light text-white/50 leading-snug line-clamp-2">
                        {project.outcome[language]}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-[#66FF80] flex items-center gap-1">
                      {t.viewProject} ↗
                    </span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block relative">
        <div ref={containerRef} className="relative h-[500vh] bg-[#0a0a0a]">
          <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a]">
            {/* Background Typography */}
            <motion.div
              style={{ x: bgTextX }}
              className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap opacity-[0.03] pointer-events-none select-none"
            >
              <div className="text-[38vw] font-bold leading-none tracking-tighter uppercase text-white font-mono">
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

            {/* Title Block */}
            <motion.div
              style={{ opacity: headerOpacity, y: headerY }}
              className="absolute top-24 left-16 z-20 pointer-events-none max-w-xl"
            >
              <h2
                className="text-[6.5vw] font-bold leading-[0.98] tracking-tighter uppercase text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.headline1}
                <br />
                <span className="text-white/30">{t.headline2}</span>
              </h2>
              <p className="mt-5 text-sm text-white/60 font-light leading-relaxed">
                {t.description}
              </p>
            </motion.div>

            {/* Uniform Showcase Track */}
            <motion.div style={{ x }} className="absolute top-0 left-0 h-full flex items-center gap-16 xl:gap-20">
              <div className="flex-shrink-0 w-[44vw] h-px" />

              {PROJECTS.map((project, i) => {
                return (
                  <Link
                    key={project.slug}
                    href={`/${lang}/work/${project.slug}`}
                    className="relative flex-shrink-0 w-[36vw] lg:w-[28vw] xl:w-[26vw] block group cursor-none cursor-hover-target transition-transform duration-700 hover:-translate-y-2"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "100px" }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    >
                      {/* Counter Badge */}
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-mono text-[#66FF80] tracking-[0.2em] uppercase">
                          0{i + 1} / 0{PROJECTS.length}
                        </span>
                      </div>

                      {/* UNIFORM Square Image Container (1:1 aspect ratio for ALL cards) */}
                      <div className="relative w-full aspect-square overflow-hidden bg-[#121212] border border-white/[0.08] group-hover:border-[#66FF80]/40 rounded-sm mb-5 transition-colors duration-500 shadow-2xl">
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
                              sizes="(max-width: 1024px) 36vw, 26vw"
                              className={`object-cover ${project.imagePosition || "object-center"}`}
                              quality={95}
                              priority={i === 0}
                            />
                          </motion.div>
                        </motion.div>

                        {/* Gradient Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

                        {/* Hover Overlay Arrow */}
                        <div className="absolute top-4 right-4 bg-[#66FF80] text-black w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-45">
                          ↗
                        </div>
                      </div>

                      {/* Metadata below image */}
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3
                            className="text-xl lg:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[#66FF80] transition-colors duration-300 mb-1"
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

              <div className="flex-shrink-0 w-[20vw] h-px" />
            </motion.div>

            {/* Bottom Progress Bar */}
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
