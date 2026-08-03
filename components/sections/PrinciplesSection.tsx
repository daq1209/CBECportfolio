"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { translations } from "@/lib/translations";

const bgImages = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
];

export default function PrinciplesSection({ lang }: { lang: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const language = lang === "vi" ? "vi" : "en";
  const t = translations[language].principles;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-[#0a0a0a] text-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        
        {/* Header Block */}
        <div className="absolute top-16 md:top-24 left-6 md:left-16 z-20 w-full max-w-4xl pointer-events-none">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#66FF80]" />
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-white/50">{t.label}</span>
          </div>
          
          <div
            className="text-[8vw] md:text-[4vw] font-bold leading-[1.1] tracking-tighter uppercase text-white drop-shadow-lg"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.heading1} <span className="text-[#66FF80]">{t.heading2}</span>
          </div>
        </div>

        {/* Horizontal Track */}
        <motion.div style={{ x }} className="flex items-center h-full pt-48 md:pt-32 pb-10 px-6 md:px-16 gap-8 md:gap-16 w-[max-content]">
          {t.items.map((principle, index) => (
            <div 
              key={principle.number} 
              className="relative w-[85vw] md:w-[45vw] lg:w-[35vw] h-[60vh] md:h-[65vh] rounded-2xl overflow-hidden shrink-0 group flex flex-col justify-end p-6 md:p-10 border border-white/10"
            >
              {/* Background Image Container */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={bgImages[index % bgImages.length]}
                  alt={principle.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-50 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col gap-4">
                <div className="text-[#66FF80] font-mono text-sm tracking-widest font-bold">
                  {principle.number}
                </div>
                <div
                  className="text-[7vw] md:text-[2.5vw] font-bold leading-[1.1] tracking-tighter uppercase text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {principle.title}
                </div>
                <p className="text-base md:text-lg font-light text-white/70 leading-relaxed mt-2 line-clamp-3">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
          {/* Spacer block at the end */}
          <div className="w-[10vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}
