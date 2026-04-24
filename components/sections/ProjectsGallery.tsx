"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Oilivia",
    category: "Skin Care eCommerce",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4a38b0a?q=80&w=2670&auto=format&fit=crop",
    year: "2024",
    align: "start" // CSS alignment trick
  },
  {
    id: 2,
    title: "The House of Kinos",
    category: "Luxury Fashion",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop",
    year: "2023",
    align: "end"
  },
  {
    id: 3,
    title: "Aura Dynamics",
    category: "Tech Wearables",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop",
    year: "2025",
    align: "center"
  },
  {
    id: 4,
    title: "Scentia",
    category: "Fragrance Boutique",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2670&auto=format&fit=crop",
    year: "2024",
    align: "start"
  }
];

export default function ProjectsGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Convert vertical scroll to purely horizontal movement.
  // We use slightly less than -100% to ensure the last item is visible but doesn't overscroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-white">
      {/* Sticky container that holds the gallery view */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-white text-[#0a0a0a]">
        
        {/* Section Intro (Fixed position, fades out or stays behind) */}
        <div className="absolute top-16 md:top-32 left-6 md:left-16 z-10 pointer-events-none">
          <h2 className="text-[12vw] md:text-[6vw] font-bold leading-[0.9] tracking-tighter uppercase mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Selected Works
          </h2>
          <p className="text-base md:text-lg font-light tracking-wide w-[80%] md:w-[400px] text-gray-500">
            A meticulously curated showcase of platforms engineered for high-volume commerce & conversion.
          </p>
        </div>

        {/* The Track: Slides horizontally based on scroll progress */}
        <motion.div style={{ x }} className="flex gap-16 md:gap-32 pl-[100vw] pr-[20vw] h-[60vh] md:h-[70vh] mt-24">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={`relative flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw] flex flex-col justify-${project.align}`}
            >
              {/* Image Container with hover zoom */}
              <motion.div 
                className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-gray-100 group cursor-pointer"
                whileHover="hover"
                initial="rest"
              >
                <motion.div
                  variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.05 }
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // smooth ease out
                  className="w-full h-full relative"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 35vw"
                    className="object-cover"
                    quality={90}
                  />
                </motion.div>
                
                {/* Custom Overlay */}
                <motion.div 
                  variants={{
                    rest: { opacity: 0 },
                    hover: { opacity: 1 }
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none"
                >
                  <motion.div
                    variants={{
                      rest: { y: 20, opacity: 0 },
                      hover: { y: 0, opacity: 1 }
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="bg-[#66FF80] text-black px-8 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase"
                  >
                    View Project
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Text Meta Info */}
              <div className="mt-8 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                    {project.title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium font-mono">
                    {project.category}
                  </p>
                </div>
                <div className="text-sm font-bold opacity-30 font-mono tracking-widest pt-2">
                  {project.year}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
