"use client";

import { motion } from "framer-motion";

const TECH_STACK = [
  "Next.js", "React", "TypeScript", "Node.js", "Python", 
  "TailwindCSS", "PostgreSQL", "AWS", "Vercel", "OpenAI", 
  "Framer Motion", "Stripe", "Prisma", "Docker", "GraphQL"
];

export default function TechStackMarquee() {
  return (
    <section className="py-12 border-y border-white/5 bg-[#0a0a0a] overflow-hidden flex relative select-none">
      {/* Gradient masks for smooth fade at edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

      <motion.div
        className="flex whitespace-nowrap gap-8 md:gap-24 items-center pl-8 md:pl-24"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30, // Adjust speed here
        }}
      >
        {/* Duplicate the array to create seamless loop. We need enough width to fill the screen twice. */}
        {[...TECH_STACK, ...TECH_STACK].map((tech, index) => (
          <div 
            key={index} 
            className="flex items-center gap-4 text-white/30 hover:text-white/80 transition-colors duration-300"
          >
            <span className="text-lg md:text-2xl font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-display)" }}>
              {tech}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#66FF80]/50" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
