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

        {/* Extra Contact Info */}
        <motion.div
          className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* Address */}
          <div className="flex flex-col items-center">
            <h4 className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase mb-4">
              Headquarters
            </h4>
            <p className="text-sm md:text-base font-light text-white/70 leading-relaxed max-w-[220px]">
              17th Floor, 72A Le Thanh Ton,<br/>
              Ben Nghe Ward, District 1,<br/>
              HCMC
            </p>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center">
            <h4 className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase mb-4">
              Direct Line
            </h4>
            <a 
              href="tel:+84703819006" 
              className="text-sm md:text-base font-light text-white/70 hover:text-[#66FF80] transition-colors duration-300"
            >
              (+84) 703 819 006
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer strip */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          <span className="text-xs font-mono text-white/20 tracking-widest flex-1 text-center md:text-left">
            © 2026 CBEC Solutions. All rights reserved.
          </span>

          <div className="flex items-center gap-8 md:gap-6 flex-1 justify-center">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-white/40 hover:text-[#66FF80] tracking-widest transition-colors uppercase">
              Facebook
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-white/40 hover:text-[#66FF80] tracking-widest transition-colors uppercase">
              Instagram
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-white/40 hover:text-[#66FF80] tracking-widest transition-colors uppercase">
              X
            </a>
          </div>

          <span className="text-xs font-mono text-white/20 tracking-widest flex-1 text-center md:text-right">
            Vietnam → Global
          </span>
        </div>
      </motion.div>
    </section>
  );
}
