"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CenterGraphic from "../animations/CenterGraphic";

const EASE_EDITORIAL: [number, number, number, number] = [0.85, 0, 0.15, 1];

const headlineReveal = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 1.2,
      delay: i * 0.15 + 0.2, // Staggered slightly
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

export default function SquareEditorialHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // UI layer dives toward the camera and fades out
  const uiOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const uiScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15]);
  const uiY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-15%"]);

  // Bring CenterGraphic to front when heavily scrolling to engulf the screen
  const graphicZ = useTransform(scrollYProgress, [0, 0.1], [0, 20]);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh]">
      <section 
        id="hero" 
        className="sticky top-0 left-0 w-full h-screen bg-[#0a0a0a] text-white overflow-hidden flex flex-col"
      >
        {/* Interactive Centered Graphic Layer */}
        <motion.div style={{ zIndex: graphicZ }} className="absolute inset-0 pointer-events-auto">
          <CenterGraphic scrollYProgress={scrollYProgress} />
        </motion.div>

      {/* Subtle Artistic Noise / Grain Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[30] opacity-[0.06] mix-blend-screen">
        <svg className="absolute inset-0 w-full h-full">
          <filter id="cbecNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#cbecNoise)" />
        </svg>
      </div>

      {/* Main UI Layer (pointer-events-none overall, children can restore it) */}
      <motion.div 
        style={{ opacity: uiOpacity, y: uiY, scale: uiScale }}
        className="relative z-10 w-full h-full p-6 md:p-12 lg:p-16 flex flex-col justify-between pointer-events-none pb-12 md:pb-24 origin-top"
      >
        
        {/* Top Header Row */}
        <header className="flex justify-between items-start w-full">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xs md:text-sm font-semibold tracking-widest text-[#66FF80]"
            style={{ fontFamily: 'var(--font-display)' }} // Using Red Hat Display for logo feel
          >
            CBEC SOLUTIONS.
          </motion.div>
        </header>

        {/* Editorial Layout: Middle/Bottom section */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
          
          {/* Left Column: Massive Headline */}
          <div className="col-span-1 lg:col-span-7 flex flex-col z-10 pointer-events-auto">
            <div className="overflow-hidden mb-1 pb-2">
              <motion.h1
                custom={0}
                variants={headlineReveal}
                initial="hidden"
                animate="visible"
                className="text-[14vw] lg:text-[6.5vw] leading-[0.9] tracking-[-0.02em] uppercase m-0 whitespace-nowrap"
                style={{ 
                  fontFamily: 'var(--font-display)', // Use primary display font
                  fontWeight: 500 // Medium weight for headline as in screenshot
                }}
              >
                Global
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-1 pb-2">
              <motion.h1
                custom={1}
                variants={headlineReveal}
                initial="hidden"
                animate="visible"
                className="text-[14vw] lg:text-[6.5vw] leading-[0.9] tracking-[-0.02em] uppercase m-0 whitespace-nowrap"
                style={{ 
                  fontFamily: 'var(--font-display)', // Use primary display font
                  fontWeight: 500
                }}
              >
                E-COMMERCE
              </motion.h1>
            </div>
            <div className="overflow-hidden pb-2">
              <motion.h1
                custom={2}
                variants={headlineReveal}
                initial="hidden"
                animate="visible"
                className="text-[14vw] lg:text-[6.5vw] leading-[0.9] tracking-[-0.02em] text-white/70 italic capitalize m-0 whitespace-nowrap"
                style={{ 
                  fontFamily: 'var(--font-display)', // Assuming we want to stick to brand fonts, but styling it to match "Studio" 
                  fontWeight: 300
                }}
              >
                Solutions.
              </motion.h1>
            </div>
          </div>

          {/* Right Column: Refined Description & CTA */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-start items-start lg:items-end lg:pr-0 pointer-events-auto z-10 self-end pb-12 lg:pb-0 lg:self-center lg:translate-x-8 xl:translate-x-12">
            
            <div className="max-w-[420px] flex flex-col items-start lg:items-start text-left w-full lg:ml-auto relative">
                
                <motion.h3
                  variants={fadeSlide}
                  initial="hidden"
                  animate="visible"
                  className="text-[2rem] md:text-[2.5rem] leading-[1.1] text-white font-bold tracking-[-0.02em] mb-4"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                >
                  Build What Sells.
                </motion.h3>

                <motion.p
                  variants={fadeSlide}
                  initial="hidden"
                  animate="visible"
                  className="text-base md:text-lg leading-[1.6] text-white/80 mb-10"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
                >
                  We combine market intelligence, product strategy, and operational excellence to build eCommerce brands that don&apos;t just exist—they sell.
                </motion.p>

                <motion.div
                  variants={fadeSlide}
                  initial="hidden"
                  animate="visible"
                  className="mt-8 flex items-center gap-4 text-white/50"
                >
                  <span className="text-xs tracking-[0.2em] uppercase font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                    Scroll to discover
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
