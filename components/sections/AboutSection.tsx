"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { translations } from "@/lib/translations";
import Image from "next/image";

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
              className="text-[12vw] md:text-[8vw] leading-[0.9] tracking-tighter uppercase font-bold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t.line1}
            </motion.h2>
          </div>
          <div className="overflow-hidden py-1">
            <motion.h2
              variants={revealVariants}
              className="text-[12vw] md:text-[8vw] leading-[0.9] tracking-tighter uppercase font-bold text-[#66FF80]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t.line2}
            </motion.h2>
          </div>
          <div className="overflow-hidden py-1">
            <motion.h2
              variants={revealVariants}
              className="text-[12vw] md:text-[8vw] leading-[0.9] tracking-tighter uppercase font-bold text-transparent"
              style={{ 
                fontFamily: 'var(--font-display)', 
                WebkitTextStroke: '2px rgba(255, 255, 255, 0.4)' 
              }}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <motion.div style={{ scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]) }} className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="Our Team"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-80"
              />
            </motion.div>
            <div className="relative z-20">
              <div className="text-[15vw] md:text-[10vw] font-bold leading-none tracking-tighter text-white font-mono opacity-90 drop-shadow-xl">
                100+
              </div>
              <div className="text-white/90 tracking-widest uppercase font-mono text-sm mt-4 pl-2 border-l border-[#66FF80]">
                {t.metric}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
