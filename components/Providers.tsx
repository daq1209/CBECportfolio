"use client";

import { ReactLenis } from "lenis/react";
import Navbar from "@/components/Navbar";
import FontWrapper from "@/components/FontWrapper";

interface ProvidersProps {
  children: React.ReactNode;
  /** Current locale passed down from the [lang] layout ("en" | "vi") */
  lang: string;
}

/**
 * Providers — client-side wrapper for scroll, navigation, and font context.
 *
 * The old LanguageGate overlay has been removed.  Language is now determined
 * server-side via the URL segment (`/global` or `/vi`) and reflected through
 * the `lang` prop, which is passed to Navbar for the language switcher.
 */
export default function Providers({ children, lang }: ProvidersProps) {
  return (
    <FontWrapper lang={lang}>
      {/* Persistent top-navigation with locale-aware language switcher */}
      <Navbar lang={lang} />
      <ReactLenis root>{children}</ReactLenis>
    </FontWrapper>
  );
}
