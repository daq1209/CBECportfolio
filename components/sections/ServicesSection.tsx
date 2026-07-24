"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { translations } from "@/lib/translations";
import { trackServiceView } from "@/lib/analytics";

const SERVICE_SLUGS_VI = [
  "dich-vu-branding",
  "thiet-ke-website-doanh-nghiep",
  "phan-mem-quan-ly-doanh-nghiep",
  "tu-dong-hoa-ai",
];

const SERVICE_SLUGS_EN = [
  "branding-services",
  "web-development",
  "custom-software",
  "ai-automation",
];

const CARD_COLORS = [
  { colorBg: "bg-[#111111]", colorBorder: "border-[#222222]", colorText: "text-white", isAccent: false },
  { colorBg: "bg-[#1a1a1a]", colorBorder: "border-[#333333]", colorText: "text-white", isAccent: false },
  { colorBg: "bg-[#222222]", colorBorder: "border-[#444444]", colorText: "text-white", isAccent: false },
  { colorBg: "bg-[#1a1a1a]", colorBorder: "border-[#333333]", colorText: "text-white", isAccent: false },
  { colorBg: "bg-[#66FF80]", colorBorder: "border-[#88ff9f]", colorText: "text-[#0a0a0a]", isAccent: true },
];

const TOP_OFFSETS = [
  "top-[8vh]",
  "top-[8vh] md:top-[16vh]",
  "top-[8vh] md:top-[24vh]",
  "top-[8vh] md:top-[32vh]",
];



export default function ServicesSection({ lang }: { lang: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const language = lang === "vi" ? "vi" : "en";
  const t = translations[language].services;
  const localePath = lang === "vi" ? "/vi" : "/global";

  return (
    <section id="services" ref={sectionRef} className="relative w-full bg-[#0a0a0a] pb-32 md:pb-64 pt-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full">
        <div className="mb-20 md:mb-40 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-[#66FF80]" />
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-white/50">
              {t.label}
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[10vw] md:text-[6vw] font-bold leading-[1.1] tracking-tighter text-white uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t.heading}
          </motion.div>
        </div>

        <div className="relative w-full flex flex-col gap-10 md:gap-0 pb-[10vh]">
          {t.items.map((item, index) => (
            <ServiceCard
              key={index}
              item={item}
              index={index}
              colors={CARD_COLORS[index]}
              topOffset={TOP_OFFSETS[index]}
              href={`${localePath}/${(lang === "vi" ? SERVICE_SLUGS_VI : SERVICE_SLUGS_EN)[index]}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  item: { number: string; title: string; description: string; metrics: readonly string[] };
  index: number;
  colors: { colorBg: string; colorBorder: string; colorText: string; isAccent: boolean };
  topOffset: string;
  href: string;
}

function ServiceCard({ item, index, colors, topOffset, href }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });
  const cardOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const { isAccent } = colors;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  return (
    <div
      ref={cardRef}
      className={`sticky ${topOffset} w-full h-auto min-h-[60vh] md:h-[70vh] flex items-center justify-center`}
      style={{ zIndex: index + 10, perspective: "1200px" }}
    >
      <Link 
        href={href} 
        className="block w-full h-full max-h-[800px]"
        onClick={() => trackServiceView(href, item.title)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // For 3D Tilt
          const xPct = x / rect.width - 0.5;
          const yPct = y / rect.height - 0.5;
          mouseX.set(xPct);
          mouseY.set(yPct);

          e.currentTarget.style.setProperty("--x", `${x}px`);
          e.currentTarget.style.setProperty("--y", `${y}px`);
        }}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
      >
        <motion.div
          style={{ opacity: cardOpacity, scale: cardScale, rotateX, rotateY }}
          className={`w-full h-full max-h-[800px] ${colors.colorBg} ${colors.colorText} rounded-3xl md:rounded-[40px] border ${colors.colorBorder} p-6 sm:p-8 md:p-16 flex flex-col justify-between shadow-[0_-20px_50px_rgba(0,0,0,0.4)] overflow-hidden relative group cursor-pointer transition-colors duration-500`}
        >
        {/* Spotlight Effect - Hidden on mobile, visible on md+ */}
        <div className="pointer-events-none absolute -inset-px hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
          background: `radial-gradient(800px circle at var(--x) var(--y), rgba(255,255,255,0.06), transparent 40%)`
        }} />
        
        {isAccent && (
          <div className="absolute inset-0 bg-gradient-to-tr from-[#3de65a] to-[#9effaf] opacity-50 pointer-events-none" />
        )}

        <div className="flex justify-between items-start relative z-10 w-full mb-10">
          <span className={`text-2xl md:text-4xl font-light font-mono ${isAccent ? "text-[#0a0a0a]/80 lg:text-[#0a0a0a]/30" : "text-white/60 lg:text-white/20"} transition-colors duration-500 group-hover:text-current`}>
            0{index + 1}
          </span>
          <div className={`h-12 md:h-16 rounded-full border opacity-100 lg:opacity-40 flex items-center justify-center px-4 lg:px-2 lg:group-hover:opacity-100 lg:group-hover:px-6 transition-all duration-500 ${isAccent ? "bg-[#0a0a0a] text-[#66FF80] border-[#0a0a0a] lg:bg-transparent lg:text-current lg:border-current lg:group-hover:bg-[#0a0a0a] lg:group-hover:text-[#66FF80] lg:group-hover:border-[#0a0a0a]" : "bg-white text-[#0a0a0a] border-white lg:bg-transparent lg:text-current lg:border-current lg:group-hover:bg-white lg:group-hover:text-[#0a0a0a] lg:group-hover:border-white"}`}>
            <span className="text-xs md:text-sm font-semibold tracking-widest uppercase overflow-hidden max-w-[120px] lg:max-w-0 opacity-100 lg:opacity-0 mr-2 lg:mr-0 lg:group-hover:max-w-[120px] lg:group-hover:opacity-100 lg:group-hover:mr-2 transition-all duration-500 whitespace-nowrap" style={{ fontFamily: "var(--font-display)" }}>
              Explore
            </span>
            <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rotate-0 lg:-rotate-45 lg:group-hover:rotate-0 transition-transform duration-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end relative z-10 w-full h-full">
          <div className="lg:col-span-7 flex flex-col justify-end h-full">
            <div
              className="text-[8vw] md:text-[5vw] lg:text-[4vw] font-bold leading-[1.05] tracking-tighter uppercase mb-6 md:mb-12"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {item.title}
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end h-full pb-2 md:pb-6">
            <div className="max-lg:opacity-100 max-lg:translate-y-0 lg:opacity-0 lg:translate-y-8 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <p className={`text-base md:text-lg lg:text-xl font-light leading-relaxed ${isAccent ? "text-[#0a0a0a]/80" : "text-white/70"} mb-10`}>
                {item.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {item.metrics.map((metric, mIndex) => (
                  <div
                    key={mIndex}
                    className={`px-4 py-2 rounded-full text-xs md:text-sm font-mono tracking-widest uppercase border ${isAccent ? "border-[#0a0a0a]/20 text-[#0a0a0a]" : "border-white/20 text-white"}`}
                  >
                    {metric}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </motion.div>
      </Link>
    </div>
  );
}
