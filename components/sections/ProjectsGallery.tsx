"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const projects = [
  {
    id: 1,
    title: "Richmond Smiles",
    image: "/projects/richmondsmiles.jpg",
    category: "gallery.cat1",
    link: "https://www.richmondsmiles.com.au/",
    isReal: true,
    isLogo: false,
  },
  {
    id: 2,
    title: "Lee Concept",
    image: "/projects/383084327_122117840984033541_1787976392589229528_n.jpg",
    category: "gallery.cat5",
    link: "https://leeconcept.com.vn/",
    isReal: true,
    isLogo: true,
  },
  {
    id: 3,
    title: "BANH MI NGON",
    image: "/projects/5e0d1b7bdd555c0b0544 (1).jpg",
    category: "gallery.cat6",
    link: "https://www.behance.net/gallery/167430343/BANH-MI-NGON",
    isReal: true,
    isLogo: true,
  },
];

const PROJECT_CATEGORIES: Record<string, { en: string; vi: string }> = {
  "gallery.cat1": { en: "Branding · Web Dev", vi: "Thương hiệu · Web" },
  "gallery.cat2": { en: "SaaS · Enterprise", vi: "SaaS · Doanh nghiệp" },
  "gallery.cat3": { en: "Creative · Campaign", vi: "Sáng tạo · Chiến dịch" },
  "gallery.cat5": { en: "Web Dev", vi: "Lập trình Web" },
  "gallery.cat6": { en: "Branding", vi: "Thương hiệu" },
};

export default function ProjectsGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = translations[language].gallery;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.25], [0, -30]);

  return (
    <section className="bg-[#f5f4f0]">
      {/* MOBILE */}
      <div className="block md:hidden px-6 pt-24 pb-16">
        <div className="flex justify-between items-center mb-16">
          <span className="flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-black/70 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
            {t.label}
          </span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-black/50 uppercase">
            {t.status}
          </span>
        </div>

        <div className="mb-16">
          <h2
            className="text-[14vw] font-bold leading-[1.05] tracking-tighter uppercase text-[#111]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.headline1}
            <br />
            <span className="text-[#888]">{t.headline2}</span>
          </h2>
          <p className="mt-6 text-sm text-[#666] font-light max-w-[280px] leading-relaxed">
            {t.description}
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="relative w-full cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                if (project.isReal && project.link) {
                  window.open(project.link, "_blank", "noopener,noreferrer");
                }
              }}
            >
              <span className="absolute -top-6 left-0 text-[10px] font-mono text-black/30 tracking-widest">
                0{i + 1}
              </span>
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#e5e3de] mb-4">
                <Image src={project.image} alt={project.title || t.status} fill sizes="100vw" className={project.isLogo ? "object-contain p-12" : "object-cover"} quality={90} />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-[#0a0a0a] mb-1" style={{ fontFamily: "var(--font-display)" }}>
                    {project.isReal ? project.title : t.status}
                  </h3>
                  <p className="text-[10px] font-mono tracking-[0.18em] text-black/40 uppercase">
                    {PROJECT_CATEGORIES[project.category][language]}
                  </p>
                </div>
                <span className="text-[11px] font-mono text-black/30 tracking-widest">{project.isReal ? t.viewProject : t.comingSoon}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block">
        <div ref={containerRef} className="relative h-[500vh] bg-[#f5f4f0]">
          <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#f5f4f0]">
            <motion.div
              style={{ opacity: headerOpacity, y: headerY }}
              className="absolute top-10 left-16 right-16 flex justify-between items-center z-20"
            >
              <span className="flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-black/70 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
                {t.label}
              </span>
              <span className="text-[11px] font-mono tracking-[0.2em] text-black/50 uppercase">
                {t.status}
              </span>
            </motion.div>

            <motion.div
              style={{ opacity: headerOpacity, y: headerY }}
              className="absolute top-24 left-16 z-10 pointer-events-none"
            >
              <h2
                className="text-[7vw] font-bold leading-[1.05] tracking-tighter uppercase text-[#111]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.headline1}
                <br />
                <span className="text-[#888]">{t.headline2}</span>
              </h2>
              <p className="mt-4 text-sm text-[#666] font-light max-w-[280px] leading-relaxed">
                {t.description}
              </p>
            </motion.div>

            <motion.div style={{ x }} className="absolute top-0 left-0 h-full flex items-center gap-12">
              <div className="flex-shrink-0 w-[42vw] h-px" />
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  className="relative flex-shrink-0 w-[36vw] lg:w-[28vw] cursor-pointer group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                  onClick={() => {
                    if (project.isReal && project.link) {
                      window.open(project.link, "_blank", "noopener,noreferrer");
                    }
                  }}
                >
                  <span className="absolute -top-5 left-0 text-[10px] font-mono text-black/20 tracking-widest">
                    0{i + 1}
                  </span>
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#e5e3de]">
                    <motion.div
                      className="w-full h-full relative"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image src={project.image} alt={project.title || t.status} fill sizes="(max-width: 1024px) 36vw, 28vw" className={project.isLogo ? "object-contain p-16" : "object-cover"} quality={90} />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-black/40 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span
                        className="text-white text-[10px] font-mono tracking-[0.25em] uppercase border border-white/60 px-6 py-3"
                        initial={{ y: 10, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        {project.isReal ? t.viewProject : t.comingSoon}
                      </motion.span>
                    </motion.div>
                  </div>
                  <div className="mt-5 flex justify-between items-end">
                    <div>
                      <h3 className="text-lg font-bold uppercase tracking-tight text-[#0a0a0a] mb-1" style={{ fontFamily: "var(--font-display)" }}>
                        {project.isReal ? project.title : t.status}
                      </h3>
                      <p className="text-[10px] font-mono tracking-[0.18em] text-black/35 uppercase">
                        {PROJECT_CATEGORIES[project.category][language]}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-black/25 tracking-widest">{project.isReal ? t.viewProject : t.comingSoon}</span>
                  </div>
                </motion.div>
              ))}
              <div className="flex-shrink-0 w-[20vw] h-px" />
            </motion.div>

            <div className="absolute bottom-8 left-16 right-16">
              <div className="w-full h-px bg-black/10">
                <motion.div className="h-full bg-[#0a0a0a] origin-left" style={{ scaleX: scrollYProgress }} />
              </div>
              <motion.p
                style={{ opacity: headerOpacity }}
                className="mt-3 text-[10px] font-mono tracking-[0.2em] text-black/25 uppercase text-right"
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
