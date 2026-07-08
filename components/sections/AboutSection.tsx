"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { translations } from "@/lib/translations";

export default function AboutSection({ lang }: { lang: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const language = lang === "vi" ? "vi" : "en";
  const t = translations[language].about;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const yContentParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const revealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
    },
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] text-white overflow-hidden py-32 md:py-48 z-20 rounded-t-[40px] md:rounded-t-[60px] -mt-10 md:-mt-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
    >
      <motion.div style={{ y: yContentParallax }} className="max-w-[1600px] mx-auto px-6 md:px-16 w-full relative z-10">
        <div className="flex items-center gap-4 mb-20 md:mb-32">
          <div className="w-2 h-2 rounded-full bg-[#66FF80]" />
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-white/50">
            {t.label}
          </span>
        </div>

        <motion.div
          className="w-full max-w-5xl mb-32 md:mb-48"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="overflow-hidden py-1">
            <motion.h2
              variants={revealVariants}
              className="text-[10vw] md:text-[6vw] leading-[1.1] tracking-tighter uppercase font-bold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t.line1}
            </motion.h2>
          </div>
          <div className="overflow-hidden py-1">
            <motion.h2
              variants={revealVariants}
              className="text-[10vw] md:text-[6vw] leading-[1.1] tracking-tighter uppercase font-bold text-[#66FF80]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t.line2}
            </motion.h2>
          </div>
          <div className="overflow-hidden mt-4 md:mt-8 ml-0 md:ml-32 py-1">
            <motion.h2
              variants={revealVariants}
              className="text-[8vw] md:text-[4vw] leading-[1.15] tracking-tight text-white/60 italic"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
            >
              {t.line3}
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start w-full">
          <motion.div
            className="md:col-span-6 lg:col-span-5 flex flex-col gap-8 md:mt-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed">{t.p1}</p>
            <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed">{t.p2}</p>
          </motion.div>

          <motion.div
            className="md:col-span-6 lg:col-span-7 relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 border border-white/10 flex flex-col justify-end p-8 md:p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#66FF80]/10 to-transparent z-0" />
            <div className="relative z-10">
              <div className="text-[15vw] md:text-[10vw] font-bold leading-none tracking-tighter text-white font-mono opacity-80 mix-blend-overlay">
                100+
              </div>
              <div className="text-white/70 tracking-widest uppercase font-mono text-sm mt-4 pl-2 border-l border-[#66FF80]">
                {t.metric}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.05] mix-blend-screen">
              <svg className="absolute inset-0 w-full h-full">
                <filter id="aboutNoise">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#aboutNoise)" />
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
