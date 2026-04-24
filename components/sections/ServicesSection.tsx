"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    id: 1,
    number: "01",
    title: "Market Intelligence & Strategy",
    description: "We identify high-potential market opportunities across the US and Europe, then build data-driven go-to-market strategies that give your brand a competitive edge before you spend a single dollar on inventory.",
    colorBg: "bg-[#111111]",
    colorBorder: "border-[#222222]",
    colorText: "text-white",
    metrics: ["Market Research", "GTM Strategy", "Competitive Analysis"],
    topOffset: "top-[10vh]"
  },
  {
    id: 2,
    number: "02",
    title: "eCommerce Operations",
    description: "From supplier sourcing to Amazon account management and listing optimization — we handle the full operational stack so you can focus on scaling, not firefighting.",
    colorBg: "bg-[#1a1a1a]",
    colorBorder: "border-[#333333]",
    colorText: "text-white",
    metrics: ["Amazon FBA", "Supplier Network", "Listing Optimization"],
    topOffset: "top-[15vh]"
  },
  {
    id: 3,
    number: "03",
    title: "Digital Ecosystem",
    description: "Strategic branding, high-performance web development with integrated SEO, and modern social media automation — the complete digital infrastructure your brand needs to compete globally.",
    colorBg: "bg-[#1a1a1a]",
    colorBorder: "border-[#333333]",
    colorText: "text-white",
    metrics: ["Brand Identity", "Web Development", "SEO"],
    topOffset: "top-[20vh]"
  },
  {
    id: 4,
    number: "04",
    title: "Scaling & Investment",
    description: "We help you structure for growth — from LLC formation and legal compliance to strategic investment advisory and automated social media systems that scale without scaling headcount.",
    colorBg: "bg-[#66FF80]",
    colorBorder: "border-[#88ff9f]",
    colorText: "text-[#0a0a0a]",
    metrics: ["LLC Formation", "Investment Strategy", "Social Automation"],
    topOffset: "top-[25vh]"
  }
];

const TOTAL_CARDS = services.length;

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[#0a0a0a] pb-32 md:pb-64 pt-20"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full">
        
        {/* Section Header */}
        <div className="mb-20 md:mb-40 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-[#66FF80]" />
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-white/50">
              Services & Process
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[10vw] md:text-[6vw] font-bold leading-none tracking-tighter text-white uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What we do
          </motion.h2>
        </div>

        {/* Sticky Cards Container */}
        <div className="relative w-full flex flex-col gap-10 md:gap-0 pb-[10vh]">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

interface ServiceItem {
  id: number;
  number: string;
  title: string;
  description: string;
  colorBg: string;
  colorBorder: string;
  colorText: string;
  metrics: string[];
  topOffset: string;
}

function ServiceCard({ service, index }: { service: ServiceItem, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"]
  });

  const cardOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  const isAccent = index === TOTAL_CARDS - 1;
  const cardNumber = `0${service.number.replace(/^0/, '')}`;

  return (
    <div ref={cardRef} className={`sticky ${service.topOffset} w-full h-[70vh] flex items-center justify-center`} style={{ zIndex: index + 10 }}>
      <motion.div 
        style={{ opacity: cardOpacity, scale: cardScale }}
        className={`w-full h-full max-h-[800px] ${service.colorBg} ${service.colorText} rounded-3xl md:rounded-[40px] border ${service.colorBorder} p-8 md:p-16 flex flex-col justify-between shadow-[0_-20px_50px_rgba(0,0,0,0.4)] overflow-hidden relative group`}
      >
        
        {/* Abstract Glow for accent card */}
        {isAccent && (
          <div className="absolute inset-0 bg-gradient-to-tr from-[#3de65a] to-[#9effaf] opacity-50 pointer-events-none" />
        )}
        
        {/* Top Header of Card */}
        <div className="flex justify-between items-start relative z-10 w-full mb-10">
          <div className="text-xl md:text-2xl font-mono tracking-widest opacity-50">
            {service.number} / {String(TOTAL_CARDS).padStart(2, '0')}
          </div>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-current opacity-30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>

        {/* Content of Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end relative z-10 w-full h-full">
          <div className="lg:col-span-7 flex flex-col justify-end h-full">
            <h3 className="text-[8vw] md:text-[5vw] lg:text-[4vw] font-bold leading-[0.9] tracking-tighter uppercase mb-6 md:mb-12" style={{ fontFamily: 'var(--font-display)' }}>
              {service.title}
            </h3>
          </div>
          
          <div className="lg:col-span-5 flex flex-col justify-end h-full pb-2 md:pb-6">
            <p className={`text-base md:text-lg lg:text-xl font-light leading-relaxed ${isAccent ? 'text-[#0a0a0a]/80' : 'text-white/70'} mb-10`}>
              {service.description}
            </p>
            
            <div className="flex flex-wrap gap-3">
              {service.metrics.map((metric: string, mIndex: number) => (
                <div 
                  key={mIndex} 
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-mono tracking-widest uppercase border ${isAccent ? 'border-[#0a0a0a]/20 text-[#0a0a0a]' : 'border-white/20 text-white'}`}
                >
                  {metric}
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
