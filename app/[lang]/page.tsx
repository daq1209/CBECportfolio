import dynamic from "next/dynamic";
import { headers } from "next/headers";

/* ── Section imports ─────────────────────────────────────────────────────── */
const SquareEditorialHero = dynamic(
  () => import("@/components/sections/SquareEditorialHero"),
);
const ProjectsGallery = dynamic(
  () => import("@/components/sections/ProjectsGallery"),
);
const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection"),
);
const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection"),
);
const ProcessSection = dynamic(
  () => import("@/components/sections/ProcessSection"),
);
const FAQSection = dynamic(
  () => import("@/components/sections/FAQSection"),
);
const LeadMagnetSection = dynamic(
  () => import("@/components/sections/LeadMagnetSection"),
);
const PrinciplesSection = dynamic(
  () => import("@/components/sections/PrinciplesSection"),
);
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection"),
);

/* ── Page ────────────────────────────────────────────────────────────────── */
export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang === "vi" ? "vi" : "en";
  const nonce = (await headers()).get("x-nonce") || undefined;

  return (
    <main id="main-content" className="bg-[#0a0a0a] min-h-screen">
      {/* 1. Hero — scroll-jacked editorial cinematic */}
      <SquareEditorialHero lang={locale} />

      {/* 2. Work — horizontal-scroll case studies */}
      <ProjectsGallery lang={locale} />

      {/* 3. About — brand manifesto */}
      <AboutSection lang={locale} />

      {/* 4. Services — stacked sticky cards */}
      <ServicesSection lang={locale} />

      {/* 5. Process — 6-step engagement workflow */}
      <ProcessSection lang={locale} />

      {/* 6. Lead Magnet — eCommerce checklist capture */}
      <LeadMagnetSection lang={locale} />

      {/* 7. Principles — brand values list */}
      <PrinciplesSection lang={locale} />

      {/* 8. FAQ — accordion Q&A per market */}
      <FAQSection lang={locale} nonce={nonce} />

      {/* 9. Contact — form + footer */}
      <ContactSection lang={locale} />
    </main>
  );
}
