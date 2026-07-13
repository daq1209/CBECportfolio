"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { trackLanguageSwitch } from "@/lib/analytics";
import { translations, Language } from "@/lib/translations";

interface NavbarProps {
  /** Current locale from [lang] segment. "vi" | "en" (maps from "vi" | "global") */
  lang: string;
}

export default function Navbar({ lang }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const { scrollY } = useScroll();

  const language: Language = lang === "vi" ? "vi" : "en";
  const localePath = lang === "vi" ? "/vi" : "/global";
  const links = translations[language].nav;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setAtTop(latest < 60);
    setHidden(latest > prev && latest > 120);
  });

  const isHome = pathname === "/global" || pathname === "/vi" || pathname === "/";

  const handleAnchor = (href: string) => {
    if (isHome) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      router.push(`${localePath}${href}`);
    }
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
          if (isHome) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            router.push(`${localePath}`);
          }
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

    </motion.nav>
  );
}
