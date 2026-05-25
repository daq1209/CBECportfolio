"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/translations";

export default function LanguageGate() {
  const { hasChosen, setLanguage, setHasChosen } = useLanguage();
  const [choosing, setChoosing] = useState<Language | null>(null);

  const handleSelect = (lang: Language) => {
    setChoosing(lang);
    setLanguage(lang);
    // brief delay so the exit animation plays
    setTimeout(() => {
      setHasChosen(true);
    }, 900);
  };

  return (
    <AnimatePresence>
      {!hasChosen && (
        <motion.div
          key="language-gate"
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Noise overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen">
            <svg className="absolute inset-0 w-full h-full">
              <filter id="gateNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#gateNoise)" />
            </svg>
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="absolute top-8 left-8 md:top-12 md:left-12 text-xs md:text-sm font-semibold tracking-widest text-[#66FF80]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            CBEC SOLUTIONS.
          </motion.div>

          {/* Prompt text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase mb-16 md:mb-20 text-center"
          >
            Select your language / Chọn ngôn ngữ
          </motion.p>

          {/* Language Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row gap-4 md:gap-6 w-[90vw] max-w-3xl"
          >
            {/* English Card */}
            <LangCard
              lang="en"
              label="ENGLISH"
              sub="Continue in English"
              choosing={choosing}
              onSelect={handleSelect}
            />

            {/* Divider */}
            <div className="w-px bg-white/10 self-stretch hidden md:block" />

            {/* Vietnamese Card */}
            <LangCard
              lang="vi"
              label="TIẾNG VIỆT"
              sub="Tiếp tục bằng tiếng Việt"
              choosing={choosing}
              onSelect={handleSelect}
            />
          </motion.div>

          {/* Bottom year stamp */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-[10px] font-mono tracking-[0.2em] text-white/20 uppercase"
          >
            Est. 2024
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Individual Language Card ───────────────────────────────────────────────
function LangCard({
  lang,
  label,
  sub,
  choosing,
  onSelect,
}: {
  lang: Language;
  label: string;
  sub: string;
  choosing: Language | null;
  onSelect: (l: Language) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isChoosing = choosing === lang;
  const otherChoosing = choosing !== null && choosing !== lang;

  return (
    <motion.button
      onClick={() => !choosing && onSelect(lang)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        opacity: otherChoosing ? 0 : 1,
        scale: isChoosing ? 1.02 : 1,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="relative flex-1 flex flex-col items-start justify-between p-8 md:p-12 rounded-2xl border border-white/10 overflow-hidden cursor-pointer group min-h-[180px] md:min-h-[260px]"
      style={{ background: "transparent" }}
    >
      {/* Hover fill background */}
      <motion.div
        className="absolute inset-0 bg-[#66FF80]"
        animate={{ opacity: hovered || isChoosing ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4 w-full h-full justify-between">
        {/* Language tag */}
        <motion.span
          animate={{ color: hovered || isChoosing ? "#0a0a0a" : "rgba(255,255,255,0.2)" }}
          transition={{ duration: 0.3 }}
          className="text-[10px] font-mono tracking-[0.25em] uppercase"
        >
          {lang === "en" ? "EN" : "VI"}
        </motion.span>

        {/* Main label */}
        <motion.h2
          animate={{ color: hovered || isChoosing ? "#0a0a0a" : "#ffffff" }}
          transition={{ duration: 0.3 }}
          className="text-[9vw] md:text-[4vw] font-bold leading-[1.15] tracking-tighter uppercase py-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {label}
        </motion.h2>

        {/* Sub label + arrow */}
        <div className="flex items-center justify-between w-full">
          <motion.span
            animate={{ color: hovered || isChoosing ? "#0a0a0a80" : "rgba(255,255,255,0.3)" }}
            transition={{ duration: 0.3 }}
            className="text-xs font-light tracking-wide"
          >
            {sub}
          </motion.span>
          <motion.span
            animate={{
              x: hovered || isChoosing ? 4 : 0,
              color: hovered || isChoosing ? "#0a0a0a" : "rgba(255,255,255,0.3)",
            }}
            transition={{ duration: 0.3 }}
            className="text-lg"
          >
            →
          </motion.span>
        </div>
      </div>
    </motion.button>
  );
}
