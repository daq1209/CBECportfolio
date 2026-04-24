"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Utility for Character/Word Staggered Text Reveal
const revealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Create a parallax effect where the content inside the dark section
  // slides up slightly faster than the background itself, enhancing the "curtain" depth.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yContentParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[#0a0a0a] text-white overflow-hidden py-32 md:py-48 z-20 rounded-t-[40px] md:rounded-t-[60px] -mt-10 md:-mt-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
    >
      <motion.div style={{ y: yContentParallax }} className="max-w-[1600px] mx-auto px-6 md:px-16 w-full relative z-10">
        
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-20 md:mb-32">
          <div className="w-2 h-2 rounded-full bg-[#66FF80]" />
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-white/50">
            About Agency
          </span>
        </div>

        {/* Massive Typography Statement (Triết lý) */}
        <motion.div 
          className="w-full max-w-5xl mb-32 md:mb-48"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="overflow-hidden">
            <motion.h2 
              variants={revealVariants}
              className="text-[10vw] md:text-[6vw] leading-[0.95] tracking-tighter uppercase font-bold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              We Engineer
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2 
              variants={revealVariants}
              className="text-[10vw] md:text-[6vw] leading-[0.95] tracking-tighter uppercase font-bold text-[#66FF80]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Commerce.
            </motion.h2>
          </div>
          <div className="overflow-hidden mt-4 md:mt-8 ml-0 md:ml-32">
            <motion.h2 
              variants={revealVariants}
              className="text-[8vw] md:text-[4vw] leading-[0.95] tracking-tight text-white/60 italic"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
            >
              Not just websites.
            </motion.h2>
          </div>
        </motion.div>

        {/* Story Grid (2 Cột) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start w-full">
          
          {/* Cột trái: Story Text */}
          <motion.div 
            className="md:col-span-6 lg:col-span-5 flex flex-col gap-8 md:mt-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed">
              Based in Vietnam, built for global markets. We operate with an owner&apos;s mentality—your business outcomes are our scoreboard. Every decision we make is reverse-engineered from your bottom line.
            </p>
            <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed">
              From market intelligence to full-stack eCommerce operations, we deliver the insights, infrastructure, and execution speed that turn market opportunities into profitable brands.
            </p>
          </motion.div>

          {/* Cột phải: Geometric / Abstract Aesthetic or Metric */}
          <motion.div 
            className="md:col-span-6 lg:col-span-7 relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 border border-white/10 flex flex-col justify-end p-8 md:p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            {/* We could use an Image here, or a massive Metric like "10x" / "ROI" */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#66FF80]/10 to-transparent z-0" />
            <div className="relative z-10">
              <div className="text-[15vw] md:text-[10vw] font-bold leading-none tracking-tighter text-white font-mono opacity-80 mix-blend-overlay">
                25M+
              </div>
              <div className="text-white/70 tracking-widest uppercase font-mono text-sm mt-4 pl-2 border-l border-[#66FF80]">
                Revenue driven for our clients.
              </div>
            </div>
            
            {/* Visual Noise for texture */}
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
