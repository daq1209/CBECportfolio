"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CenterGraphic from "../animations/CenterGraphic";
import MagneticButton from "../animations/MagneticButton";
import { translations } from "@/lib/translations";
import { trackCTAClick } from "@/lib/analytics";

const EASE_EDITORIAL: [number, number, number, number] = [0.85, 0, 0.15, 1];

const headlineReveal = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 1.2,
      delay: i * 0.15 + 0.2,
      ease: EASE_EDITORIAL,
    },
  }),
};

const fadeSlide = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      delay: 0.8,
      ease: EASE_EDITORIAL,
    },
  },
};

export default function SquareEditorialHero({ lang }: { lang: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const language = lang === "vi" ? "vi" : "en";
  const t = translations[language].hero;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const uiOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const uiScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15]);
  const uiY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-15%"]);
  const graphicZ = useTransform(scrollYProgress, [0, 0.1], [0, 20]);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh]">
      <section
        id="hero"
        className="sticky top-0 left-0 w-full h-screen bg-[#0a0a0a] text-white overflow-hidden flex flex-col"
      >
        <motion.div style={{ zIndex: graphicZ }} className="absolute inset-0 pointer-events-auto">
          <CenterGraphic scrollYProgress={scrollYProgress} />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-[30] opacity-[0.06] mix-blend-screen">
          <svg className="absolute inset-0 w-full h-full">
            <filter id="cbecNoise">
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#cbecNoise)" />
          </svg>
        </div>

        <motion.div
          style={{ opacity: uiOpacity, y: uiY, scale: uiScale }}
          className="relative z-10 w-full h-full p-6 md:p-12 lg:p-16 flex flex-col justify-between pointer-events-none pb-12 md:pb-24 origin-top"
        >

          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
            <div className="col-span-1 lg:col-span-7 flex flex-col z-10 pointer-events-auto">
              <h1 className="m-0 p-0" aria-label={`${t.line1} ${t.line2} ${t.line3}`}>
                <div className="overflow-hidden mb-1 py-1">
                  <motion.span
                    custom={0}
                    variants={headlineReveal}
                    initial="hidden"
                    animate="visible"
                    className="block text-[12vw] sm:text-[10vw] lg:text-[6.5vw] leading-[1.1] tracking-[-0.02em] uppercase"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
                  >
                    {t.line1}
                  </motion.span>
                </div>
                <div className="overflow-hidden mb-1 py-1">
                  <motion.span
                    custom={1}
                    variants={headlineReveal}
                    initial="hidden"
                    animate="visible"
                    className="block text-[12vw] sm:text-[10vw] lg:text-[6.5vw] leading-[1.1] tracking-[-0.02em] uppercase"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
                  >
                    {t.line2}
                  </motion.span>
                </div>
                <div className="overflow-hidden py-1">
                  <motion.span
                    custom={2}
                    variants={headlineReveal}
                    initial="hidden"
                    animate="visible"
                    className="block text-[12vw] sm:text-[10vw] lg:text-[6.5vw] leading-[1.1] tracking-[-0.02em] text-white/70 italic capitalize"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
                  >
                    {t.line3}
                  </motion.span>
                </div>
              </h1>
            </div>

            <div className="col-span-1 lg:col-span-5 flex flex-col justify-start items-start lg:items-end lg:pr-0 pointer-events-auto z-10 self-end pb-12 lg:pb-0 lg:self-center lg:translate-x-8 xl:translate-x-12">
              <div className="max-w-[420px] flex flex-col items-start lg:items-start text-left w-full lg:ml-auto relative">
                <motion.h3
                  variants={fadeSlide}
                  initial="hidden"
                  animate="visible"
                  className="text-[1.75rem] md:text-[2.5rem] leading-[1.1] text-white font-bold tracking-[-0.02em] mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                >
                  {t.tagline}
                </motion.h3>

                <motion.p
                  variants={fadeSlide}
                  initial="hidden"
                  animate="visible"
                  className="text-base md:text-lg leading-[1.6] text-white/80 mb-10"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
                >
                  {t.description}
                </motion.p>

                <motion.div
                  variants={fadeSlide}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 mb-10 w-full sm:w-auto"
                >
                  {/* Primary CTA */}
                  <MagneticButton>
                    <button
                      onClick={() => {
                        trackCTAClick(t.ctaPrimary, "hero");
                        document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="group flex items-center justify-center gap-3 px-6 py-4 md:px-8 bg-[#66FF80] text-[#0a0a0a] rounded-full text-base font-semibold tracking-tight hover:bg-white transition-colors duration-300 cursor-pointer border-none min-h-[48px] md:min-h-[56px] w-full sm:w-auto"
                      style={{ fontFamily: "var(--font-display)" }}
                      aria-label={t.ctaPrimary}
                    >
                      {t.ctaPrimary}
                      <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
                    </button>
                  </MagneticButton>

                  {/* Secondary CTA */}
                  <MagneticButton>
                    <button
                      onClick={() => {
                        trackCTAClick(t.ctaSecondary, "hero");
                        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="flex items-center justify-center gap-3 px-6 py-4 md:px-8 border border-white/20 text-white/70 rounded-full text-base font-light tracking-tight hover:border-white/50 hover:text-white transition-all duration-300 cursor-pointer bg-transparent min-h-[48px] md:min-h-[56px] w-full sm:w-auto"
                      style={{ fontFamily: "var(--font-display)" }}
                      aria-label={t.ctaSecondary}
                    >
                      {t.ctaSecondary}
                    </button>
                  </MagneticButton>
                </motion.div>

                <motion.div
                  variants={fadeSlide}
                  initial="hidden"
                  animate="visible"
                  className="mt-2 flex items-center gap-4 text-white/50"
                >
                  <span className="text-xs tracking-[0.2em] uppercase font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                    {t.scroll}
                  </span>
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-3 h-3 border-r-[1.5px] border-b-[1.5px] border-white/50 rotate-45 transform origin-center"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
