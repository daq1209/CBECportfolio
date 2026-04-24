"use client";

import dynamic from "next/dynamic";

const SquareEditorialHero = dynamic(
  () => import("@/components/sections/SquareEditorialHero"),
  { ssr: false },
);

const ProjectsGallery = dynamic(
  () => import("@/components/sections/ProjectsGallery"),
  { ssr: false },
);

const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection"),
  { ssr: false },
);

const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection"),
  { ssr: false },
);

const PrinciplesSection = dynamic(
  () => import("@/components/sections/PrinciplesSection"),
  { ssr: false },
);

const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection"),
  { ssr: false },
);

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <SquareEditorialHero />
      <ProjectsGallery />
      <AboutSection />
      <ServicesSection />
      <PrinciplesSection />
      <ContactSection />
    </main>
  );
}

