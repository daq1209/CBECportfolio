"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { translations } from "@/lib/translations";
import { PROJECTS } from "@/lib/projects";
import CustomCursor from "../animations/CustomCursor";

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

  // Outer horizontal scroll for the gallery
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  // Inner parallax for the images (moves opposite to the scroll)
  const imageParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  // Background typography parallax
  const bgTextX = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);
  
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.25], [0, -30]);

  return (
    <section id="projects" className="bg-[#0a0a0a] text-white">
      {/* MOBILE */}
      <div className="block md:hidden px-6 pt-24 pb-16">
        <div className="flex justify-between items-center mb-16">
          <span className="flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-white/70 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#66FF80] inline-block" />
            {t.label}
          </span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-white/50 uppercase">
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
                href={`/${language}/work/${project.slug}`}
                className="relative w-full block group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="absolute -top-6 left-0 text-[10px] font-mono text-white/30 tracking-widest">
                    0{i + 1}
                  </span>
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#111] mb-4">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      quality={90}
                    />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <h3
                        className="text-lg font-bold uppercase tracking-tight text-white mb-1"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-[10px] font-mono tracking-[0.18em] text-[#66FF80] uppercase">
                        {PROJECT_CATEGORIES[project.category][language]}
                      </p>
                      <p className="mt-1.5 text-[11px] font-light text-white/50 leading-snug">
                        {project.outcome[language]}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-white/30 tracking-widest">
                      {t.viewProject}
                    </span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* DESKTOP (Awwwards-tier Horizontal Parallax) */}
      <div className="hidden md:block relative">
        <div ref={containerRef} className="relative h-[500vh] bg-[#0a0a0a]">
          <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a]">
            
            {/* Giant Background Typography */}
            <motion.div 
              style={{ x: bgTextX }}
              className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap opacity-[0.03] pointer-events-none"
            >
              <h2 
                className="text-[40vw] font-bold leading-none tracking-tighter uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                SELECTED WORKS
              </h2>
            </motion.div>

            <motion.div
              style={{ opacity: headerOpacity, y: headerY }}
              className="absolute top-10 left-16 right-16 flex justify-between items-center z-20"
            >
              <span className="flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-white/70 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#66FF80] inline-block" />
                {t.label}
              </span>
              <span className="text-[11px] font-mono tracking-[0.2em] text-white/50 uppercase">
                {t.status}
              </span>
            </motion.div>

            <motion.div
              style={{ opacity: headerOpacity, y: headerY }}
              className="absolute top-24 left-16 z-20 pointer-events-none"
            >
              <h2
                className="text-[7vw] font-bold leading-[1.05] tracking-tighter uppercase text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.headline1}
                <br />
                <span className="text-white/30">{t.headline2}</span>
              </h2>
              <p className="mt-4 text-sm text-white/50 font-light max-w-[280px] leading-relaxed">
                {t.description}
              </p>
            </motion.div>

            <motion.div style={{ x }} className="absolute top-0 left-0 h-full flex items-center gap-16 xl:gap-24">
              <div className="flex-shrink-0 w-[42vw] h-px" />
              {PROJECTS.map((project, i) => {
                // Asymmetrical positioning: alternate margin-top to break the grid
                const mtClasses = ["mt-0", "mt-32", "mt-16", "-mt-20", "mt-24", "-mt-10"];
                const yOffset = mtClasses[i % mtClasses.length];
                
                return (
                  <Link
                    key={project.slug}
                    href={`/${language}/work/${project.slug}`}
                    className={`relative flex-shrink-0 w-[36vw] lg:w-[28vw] xl:w-[24vw] block group cursor-none cursor-hover-target ${yOffset}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "100px" }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    >
                      <span className="absolute -top-6 left-0 text-[10px] font-mono text-white/30 tracking-widest">
                        0{i + 1}
                      </span>
                      
                      {/* Image Mask Container for Inner Parallax */}
                      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#111] mb-6">
                        <motion.div
                          className="w-[120%] h-full relative -left-[10%]"
                          style={{ x: imageParallax }}
                        >
                          <motion.div
                            className="w-full h-full relative"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              sizes="(max-width: 1024px) 36vw, 28vw"
                              className="object-cover"
                              quality={90}
                              loading="lazy"
                            />
                          </motion.div>
                        </motion.div>
                        
                        {/* Overlay Darken on Hover */}
                        <motion.div
                          className="absolute inset-0 bg-black/50 pointer-events-none"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      
                      {/* Typography below image */}
                      <div className="mt-5 flex flex-col gap-1">
                        <div className="flex justify-between items-end">
                          <div>
                            <h3
                              className="text-xl lg:text-2xl font-bold uppercase tracking-tight text-white mb-1 group-hover:text-[#66FF80] transition-colors duration-500"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              {project.title}
                            </h3>
                            <p className="text-[10px] font-mono tracking-[0.18em] text-white/50 uppercase">
                              {PROJECT_CATEGORIES[project.category][language]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
              <div className="flex-shrink-0 w-[20vw] h-px" />
            </motion.div>

            <div className="absolute bottom-8 left-16 right-16">
              <div className="w-full h-px bg-white/10">
                <motion.div className="h-full bg-white origin-left" style={{ scaleX: scrollYProgress }} />
              </div>
              <motion.p
                style={{ opacity: headerOpacity }}
                className="mt-3 text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase text-right"
              >
                {language === "en" ? "Scroll to explore →" : "Cuộn để xem →"}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
