"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggle = () => setLanguage(language === "en" ? "vi" : "en");
  const next = language === "en" ? "VI" : "EN";

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      className="fixed top-6 right-6 md:top-10 md:right-10 z-[9998] flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-[#0a0a0a]/80 backdrop-blur-sm text-white/60 hover:text-[#66FF80] hover:border-[#66FF80]/40 transition-all duration-300 cursor-pointer"
      style={{ fontFamily: "var(--font-display)" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={language}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.2 }}
          className="text-[10px] font-mono tracking-[0.2em] uppercase"
        >
          {language.toUpperCase()}
        </motion.span>
      </AnimatePresence>
      <span className="text-white/20 text-xs">·</span>
      <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30">
        {next}
      </span>
    </motion.button>
  );
}
