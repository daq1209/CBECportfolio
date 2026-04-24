"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="relative w-full bg-[#0a0a0a] text-white overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Subtle top divider */}
      <div className="w-full px-6 md:px-16 pt-20">
        <div className="max-w-[1400px] mx-auto w-full h-px bg-white/10" />
      </div>

      {/* Main Content — Centered */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 md:px-16">
        {/* Headline */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="text-[12vw] md:text-[8vw] font-bold leading-[0.9] tracking-tighter uppercase text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let&apos;s
          </h2>
          <h2
            className="text-[12vw] md:text-[8vw] font-bold leading-[0.9] tracking-tighter uppercase text-[#66FF80]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Build.
          </h2>
        </motion.div>

        {/* Email Link */}
        <motion.div
          className="relative group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <a
            href="mailto:cbecsolutions.vn@gmail.com"
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Email text */}
            <span
              className="text-[5.5vw] sm:text-[4vw] md:text-[3vw] lg:text-[2.5vw] font-light tracking-tight text-white/70 transition-colors duration-500 hover:text-[#66FF80] break-all sm:break-normal"
              style={{ fontFamily: "var(--font-display)" }}
            >
              cbecsolutions.vn@gmail.com
            </span>

            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-2 left-0 h-[2px] bg-[#66FF80]"
              initial={{ width: "0%" }}
              animate={{ width: isHovered ? "100%" : "0%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </a>
        </motion.div>

        {/* Small prompt */}
        <motion.p
          className="mt-8 md:mt-12 text-sm font-mono text-white/25 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Start a conversation →
        </motion.p>
      </div>

      {/* Footer strip */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs font-mono text-white/20 tracking-widest">
            © 2026 CBEC Solutions. All rights reserved.
          </span>
          <span className="text-xs font-mono text-white/20 tracking-widest">
            Vietnam → Global
          </span>
        </div>
      </motion.div>
    </section>
  );
}
