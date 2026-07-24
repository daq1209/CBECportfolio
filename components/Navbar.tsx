"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { translations, Language } from "@/lib/translations";

interface NavbarProps {
  /** Current locale from [lang] segment. "vi" | "en" (maps from "vi" | "global") */
  lang: string;
}

/** Switch between /global ↔ /vi while keeping the rest of the path intact */
function buildLocalePath(pathname: string, targetLocale: "global" | "vi"): string {
  if (pathname.startsWith("/global")) {
    return pathname.replace(/^\/global/, `/${targetLocale}`);
  }
  if (pathname.startsWith("/vi")) {
    return pathname.replace(/^\/vi/, `/${targetLocale}`);
  }
  return `/${targetLocale}`;
}

export default function Navbar({ lang }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const language: Language = lang === "vi" ? "vi" : "en";
  const localePath = lang === "vi" ? "/vi" : "/global";
  const links = translations[language].nav;
  const currentLocale = lang === "vi" ? "vi" : "global";

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setAtTop(latest < 60);
    if (!menuOpen) {
      setHidden(latest > prev && latest > 120);
    }
  });

  const isHome = pathname === "/global" || pathname === "/vi" || pathname === "/";

  const handleAnchor = (href: string) => {
    setMenuOpen(false);
    if (isHome) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      router.push(`${localePath}${href}`);
    }
  };

  /** Switch locale and persist choice in cookie (1 year) */
  const switchLocale = (targetLocale: "global" | "vi") => {
    setMenuOpen(false);
    document.cookie = `cbec-language=${targetLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    router.push(buildLocalePath(pathname, targetLocale));
  };

  return (
    <>
      <motion.nav
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-6 md:px-12 h-14 md:h-16 transition-all duration-300 ${
          atTop || menuOpen
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
            setMenuOpen(false);
            if (isHome) {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              router.push(`${localePath}`);
            }
          }}
          className="text-[11px] font-semibold tracking-widest text-[#66FF80] hover:opacity-80 transition-opacity relative z-[501]"
          style={{ fontFamily: "var(--font-display)" }}
          aria-label="CBEC Solutions back to top"
        >
          CBEC SOLUTIONS.
        </a>

        {/* Desktop nav links + language switcher */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6" role="list">
            {links.map((link) => {
              const isContact = link.href === "#contact";
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleAnchor(link.href)}
                    className={
                      isContact
                        ? "text-[11px] font-semibold tracking-[0.15em] uppercase text-[#0a0a0a] bg-[#66FF80] hover:bg-white px-4 py-2 rounded-full transition-all duration-300 cursor-pointer border-none shadow-[0_0_15px_rgba(102,255,128,0.3)]"
                        : "text-[11px] font-mono tracking-[0.18em] uppercase text-white/40 hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none p-0 min-h-[44px]"
                    }
                    style={{ fontFamily: "var(--font-display)" }}
                    aria-label={`Navigate to ${link.label} section`}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Language switcher — desktop */}
          <div
            className="flex items-center border border-white/[0.12] rounded-full overflow-hidden"
            role="group"
            aria-label="Language switcher"
          >
            <button
              onClick={() => switchLocale("global")}
              className={`text-[10px] font-mono tracking-[0.15em] px-3 py-1.5 transition-all duration-200 border-none cursor-pointer ${
                currentLocale === "global"
                  ? "bg-white/[0.12] text-white"
                  : "text-white/30 hover:text-white/70 bg-transparent"
              }`}
              aria-label="Switch to English"
              aria-pressed={currentLocale === "global"}
            >
              EN
            </button>
            <span className="w-px h-3 bg-white/[0.12]" aria-hidden />
            <button
              onClick={() => switchLocale("vi")}
              className={`text-[10px] font-mono tracking-[0.15em] px-3 py-1.5 transition-all duration-200 border-none cursor-pointer ${
                currentLocale === "vi"
                  ? "bg-white/[0.12] text-white"
                  : "text-white/30 hover:text-white/70 bg-transparent"
              }`}
              aria-label="Chuyển sang tiếng Việt"
              aria-pressed={currentLocale === "vi"}
            >
              VI
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative z-[501] min-h-[44px]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            className="w-6 h-px bg-white block mb-2"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-px bg-white block mb-2"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
            className="w-6 h-px bg-white block"
          />
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[499] bg-[#0a0a0a] flex flex-col items-center justify-center md:hidden"
          >
            <ul className="flex flex-col items-center gap-6">
              {links.map((link) => {
                const isContact = link.href === "#contact";
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => handleAnchor(link.href)}
                      className={
                        isContact
                          ? "text-xl font-bold tracking-widest uppercase bg-[#66FF80] text-[#0a0a0a] rounded-full px-8 py-3 hover:bg-white transition-all shadow-[0_0_20px_rgba(102,255,128,0.3)]"
                          : "text-2xl font-bold tracking-widest uppercase text-white hover:text-[#66FF80] transition-colors p-4 min-w-[200px]"
                      }
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {link.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Language switcher — mobile */}
            <div
              className="flex items-center mt-10 border border-white/[0.15] rounded-full overflow-hidden"
              role="group"
              aria-label="Language switcher"
            >
              <button
                onClick={() => switchLocale("global")}
                className={`text-sm font-mono tracking-[0.2em] px-6 py-2.5 transition-all duration-200 border-none cursor-pointer ${
                  currentLocale === "global"
                    ? "bg-white/[0.12] text-white"
                    : "text-white/30 hover:text-white/70 bg-transparent"
                }`}
                aria-label="Switch to English"
                aria-pressed={currentLocale === "global"}
              >
                EN
              </button>
              <span className="w-px h-4 bg-white/[0.15]" aria-hidden />
              <button
                onClick={() => switchLocale("vi")}
                className={`text-sm font-mono tracking-[0.2em] px-6 py-2.5 transition-all duration-200 border-none cursor-pointer ${
                  currentLocale === "vi"
                    ? "bg-white/[0.12] text-white"
                    : "text-white/30 hover:text-white/70 bg-transparent"
                }`}
                aria-label="Chuyển sang tiếng Việt"
                aria-pressed={currentLocale === "vi"}
              >
                VI
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
