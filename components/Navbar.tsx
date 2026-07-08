"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { trackLanguageSwitch } from "@/lib/analytics";

const NAV_LINKS_EN = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const NAV_LINKS_VI = [
  { label: "Dự án", href: "#projects" },
  { label: "Về chúng tôi", href: "#about" },
  { label: "Dịch vụ", href: "#services" },
  { label: "Liên hệ", href: "#contact" },
];

interface NavbarProps {
  /** Current locale from [lang] segment. "vi" | "en" (maps from "vi" | "global") */
  lang: string;
}

export default function Navbar({ lang }: NavbarProps) {
  const router = useRouter();
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const { scrollY } = useScroll();

  const isVi = lang === "vi";
  const links = isVi ? NAV_LINKS_VI : NAV_LINKS_EN;
  const currentLangLabel = isVi ? "VI" : "EN";
  const nextLangLabel = isVi ? "EN" : "VI";

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setAtTop(latest < 60);
    setHidden(latest > prev && latest > 120);
  });

  const handleAnchor = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /**
   * Language toggle:
   * 1. Writes the new locale to the `cbec-language` cookie (1 year).
   * 2. Navigates to the equivalent path on the other locale.
   */
  const handleLangToggle = () => {
    const nextLocale = isVi ? "global" : "vi";

    // Track language switch
    trackLanguageSwitch(isVi ? "vi" : "en", isVi ? "en" : "vi");

    // Set cookie so proxy.ts persists the preference
    document.cookie = `cbec-language=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

    // Navigate to the same section on the other locale
    router.push(`/${nextLocale}`);
  };

  return (
    <motion.nav
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-6 md:px-12 h-14 md:h-16 transition-all duration-300 ${
        atTop
          ? "bg-transparent"
          : "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/[0.06]"
      }`}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="text-[11px] font-semibold tracking-widest text-[#66FF80] hover:opacity-80 transition-opacity"
        style={{ fontFamily: "var(--font-display)" }}
        aria-label="CBEC Solutions — back to top"
      >
        CBEC SOLUTIONS.
      </a>

      {/* Desktop nav links */}
      <ul className="hidden md:flex items-center gap-8" role="list">
        {links.map((link) => (
          <li key={link.href}>
            <button
              onClick={() => handleAnchor(link.href)}
              className="text-[11px] font-mono tracking-[0.18em] uppercase text-white/40 hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
              style={{ fontFamily: "var(--font-display)" }}
              aria-label={`Navigate to ${link.label} section`}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Language toggle */}
      <button
        onClick={handleLangToggle}
        className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 hover:text-[#66FF80] transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
        aria-label={`Switch language to ${nextLangLabel === "EN" ? "English" : "Vietnamese"}`}
        title={`Switch to ${nextLangLabel === "EN" ? "English" : "Vietnamese"}`}
      >
        <span className="text-white/60" aria-current={isVi ? "true" : "false"}>{currentLangLabel}</span>
        <span className="text-white/20" aria-hidden="true">·</span>
        <span>{nextLangLabel}</span>
      </button>
    </motion.nav>
  );
}
