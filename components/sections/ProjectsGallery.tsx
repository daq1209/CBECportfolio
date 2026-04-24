"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Oilivia",
    category: "Skin Care · eCommerce",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2670&auto=format&fit=crop",
    year: "2024",
  },
  {
    id: 2,
    title: "The House of Kinos",
    category: "Luxury · Fashion",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop",
    year: "2023",
  },
  {
    id: 3,
    title: "Aura Dynamics",
    category: "Tech · Wearables",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop",
    year: "2025",
  },
  {
    id: 4,
    title: "Scentia",
    category: "Fragrance · Boutique",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2670&auto=format&fit=crop",
    year: "2024",
  },
];

export default function ProjectsGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Desktop horizontal scroll: moves left as user scrolls down
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  // Desktop header fades out
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.25], [0, -30]);

  return (
    <section className="bg-[#f5f4f0]">
      {/* 
        ========================================================
        MOBILE LAYOUT (Vertical Stack) - Shows under 768px
        ========================================================
      */}
      <div className="block md:hidden px-6 pt-24 pb-16">
        {/* Mobile Header */}
        <div className="flex justify-between items-center mb-16">
          <span className="flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-black/70 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
            Selected Works
          </span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-black/50 uppercase">
            {projects.length} Projects
          </span>
        </div>

        <div className="mb-16">
          <h2
            className="text-[14vw] font-bold leading-[0.88] tracking-tighter uppercase text-[#111]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Selected
            <br />
            <span className="text-[#888]">Works.</span>
          </h2>
          <p className="mt-6 text-sm text-[#666] font-light max-w-[280px] leading-relaxed">
            Platforms engineered for high-volume commerce & conversion.
          </p>
        </div>

        {/* Mobile Vertical Cards */}
        <div className="flex flex-col gap-16">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="relative w-full cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Index number */}
              <span className="absolute -top-6 left-0 text-[10px] font-mono text-black/30 tracking-widest">
                0{i + 1}
              </span>

              {/* Image */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#e5e3de] mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  quality={90}
                />
              </div>

              {/* Meta info */}
              <div className="flex justify-between items-end">
                <div>
                  <h3
                    className="text-lg font-bold uppercase tracking-tight text-[#0a0a0a] mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-[10px] font-mono tracking-[0.18em] text-black/40 uppercase">
                    {project.category}
                  </p>
                </div>
                <span className="text-[11px] font-mono text-black/30 tracking-widest">
                  {project.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 
        ========================================================
        DESKTOP LAYOUT (Horizontal Scroll) - Shows >= 768px
        ========================================================
      */}
      <div className="hidden md:block">
        <div
          ref={containerRef}
          className="relative h-[500vh] bg-[#f5f4f0]"
        >
          {/* Sticky viewport */}
          <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#f5f4f0]">
            {/* Top label row */}
            <motion.div
              style={{ opacity: headerOpacity, y: headerY }}
              className="absolute top-10 left-16 right-16 flex justify-between items-center z-20"
            >
              <span className="flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-black/70 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
                Selected Works
              </span>
              <span className="text-[11px] font-mono tracking-[0.2em] text-black/50 uppercase">
                {projects.length} Projects
              </span>
            </motion.div>

            {/* Big headline */}
            <motion.div
              style={{ opacity: headerOpacity, y: headerY }}
              className="absolute top-24 left-16 z-10 pointer-events-none"
            >
              <h2
                className="text-[7vw] font-bold leading-[0.88] tracking-tighter uppercase text-[#111]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Selected
                <br />
                <span className="text-[#888]">Works.</span>
              </h2>
              <p className="mt-4 text-sm text-[#666] font-light max-w-[280px] leading-relaxed">
                Platforms engineered for high-volume commerce & conversion.
              </p>
            </motion.div>

            {/* Horizontal track */}
            <motion.div
              style={{ x }}
              className="absolute top-0 left-0 h-full flex items-center gap-12"
            >
              {/* Leading spacer */}
              <div className="flex-shrink-0 w-[42vw] h-px" />

              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  className="relative flex-shrink-0 w-[36vw] lg:w-[28vw] cursor-pointer group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                >
                  {/* Index number */}
                  <span className="absolute -top-5 left-0 text-[10px] font-mono text-black/20 tracking-widest">
                    0{i + 1}
                  </span>

                  {/* Image */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#e5e3de]">
                    <motion.div
                      className="w-full h-full relative"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 36vw, 28vw"
                        className="object-cover"
                        quality={90}
                      />
                    </motion.div>

                    {/* Hover overlay */}
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
                        View Project
                      </motion.span>
                    </motion.div>
                  </div>

                  {/* Meta info */}
                  <div className="mt-5 flex justify-between items-end">
                    <div>
                      <h3
                        className="text-lg font-bold uppercase tracking-tight text-[#0a0a0a] mb-1"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-[10px] font-mono tracking-[0.18em] text-black/35 uppercase">
                        {project.category}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-black/25 tracking-widest">
                      {project.year}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Trailing spacer */}
              <div className="flex-shrink-0 w-[20vw] h-px" />
            </motion.div>

            {/* Scroll progress bar */}
            <div className="absolute bottom-8 left-16 right-16">
              <div className="w-full h-px bg-black/10">
                <motion.div
                  className="h-full bg-[#0a0a0a] origin-left"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
              <motion.p
                style={{ opacity: headerOpacity }}
                className="mt-3 text-[10px] font-mono tracking-[0.2em] text-black/25 uppercase text-right"
              >
                Scroll to explore →
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
