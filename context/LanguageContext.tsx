"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  hasChosen: boolean;
  setHasChosen: (val: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  hasChosen: false,
  setHasChosen: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [hasChosen, setHasChosenState] = useState(true); // Default to true to bypass gate
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
      const saved = localStorage.getItem("cbec-lang") as Language | null;
      if (saved === "en" || saved === "vi") {
        setLanguageState(saved);
      } else {
        setLanguageState("en");
      }
    }, 0);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("cbec-lang", lang);
  };

  const setHasChosen = (val: boolean) => {
    setHasChosenState(val);
  };

  if (!mounted) return null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, hasChosen, setHasChosen }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
