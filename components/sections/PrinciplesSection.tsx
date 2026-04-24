"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const principles = [
  {
    number: "01",
    title: "Revenue First.",
    description:
      "Every project, every decision, every optimization is judged by its impact on the bottom line. If it doesn't drive revenue, it doesn't ship.",
  },
  {
    number: "02",
    title: "Operator Mentality.",
    description:
      "We think like owners, not vendors. Your P&L is our scoreboard. Your margins are our obsession.",
  },
  {
    number: "03",
    title: "Radical Transparency.",
    description:
      "No hiding behind jargon. We communicate performance, challenges, and opportunities with brutal honesty.",
  },
  {
    number: "04",
    title: "Speed of Execution.",
    description:
      "Markets move fast. We move faster. Velocity is not a buzzword here — it's a competitive advantage.",
  },
  {
    number: "05",
    title: "Global Standards.",
    description:
      "Vietnam-based doesn't mean local-thinking. We build for the US and European stage. Every single time.",
  },
  {
    number: "06",
    title: "Continuous Learning.",
    description:
      "eCommerce evolves daily. We stay ahead by learning relentlessly and adapting before the market forces us to.",
  },
];

function PrincipleItem({
  principle,
  index,
}: {
  principle: (typeof principles)[0];
  index: number;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 0.95", "start 0.3"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const titleX = useTransform(scrollYProgress, [0, 1], [40, 0]);

  // Stagger the green line width
  const lineWidth = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "0%", "100%"]);

  return (
    <motion.div
      ref={itemRef}
      style={{ opacity, y }}
      className="relative w-full"
    >
      {/* Top divider line — animated green reveal */}
      <div className="relative w-full h-px mb-10 md:mb-16">
        <div className="absolute inset-0 bg-white/10" />
        <motion.div
          style={{ width: lineWidth }}
          className="absolute inset-0 h-px bg-[#66FF80]/40"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
        {/* Number */}
        <div className="md:col-span-1">
          <span className="text-sm font-mono text-white/25 tracking-widest">
            {principle.number}
          </span>
        </div>

        {/* Title — massive typography */}
        <motion.div
          style={{ x: titleX }}
          className="md:col-span-6"
        >
          <h3
            className="text-[9vw] md:text-[4vw] lg:text-[3.5vw] font-bold leading-[0.95] tracking-tighter uppercase text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {principle.title}
          </h3>
        </motion.div>

        {/* Description — smaller, muted */}
        <div className="md:col-span-5 flex items-start pt-1 md:pt-3">
          <p className="text-base md:text-lg font-light text-white/50 leading-relaxed max-w-md">
            {principle.description}
          </p>
        </div>
      </div>

      {/* Last item gets a closing line */}
      {index === principles.length - 1 && (
        <div className="w-full h-px bg-white/10 mt-10 md:mt-16" />
      )}
    </motion.div>
  );
}

export default function PrinciplesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] text-white overflow-hidden py-32 md:py-48"
    >
      <motion.div
        style={{ y: yParallax }}
        className="max-w-[1400px] mx-auto px-6 md:px-16 w-full"
      >
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-10 md:mb-16">
          <div className="w-2 h-2 rounded-full bg-[#66FF80]" />
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-white/50">
            Our Principles
          </span>
        </div>

        {/* Section Statement */}
        <motion.div
          className="mb-24 md:mb-40 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="text-[8vw] md:text-[4.5vw] font-bold leading-[0.95] tracking-tighter uppercase text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How we
          </h2>
          <h2
            className="text-[8vw] md:text-[4.5vw] font-bold leading-[0.95] tracking-tighter uppercase text-[#66FF80]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            operate.
          </h2>
          <p className="mt-6 md:mt-10 text-lg md:text-xl font-light text-white/50 max-w-2xl leading-relaxed">
            Six non-negotiable principles that define every engagement, every
            decision, and every line of work we deliver.
          </p>
        </motion.div>

        {/* Principles List */}
        <div className="flex flex-col gap-14 md:gap-20">
          {principles.map((principle, index) => (
            <PrincipleItem
              key={principle.number}
              principle={principle}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
