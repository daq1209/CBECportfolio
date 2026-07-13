"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { trackCTAClick } from "@/lib/analytics";
import { 
  Zap, RefreshCw, Shield, Rocket, Palette, Folder, 
  BarChart, Plug, TrendingUp, Lightbulb, Layers, 
  Key, Bot, Settings, FileText, Users, Building, 
  Handshake, Smartphone, Compass, Briefcase, Lock, 
  Target, Phone, Search, Bell, CheckCircle2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ServiceItem } from "@/lib/services";
import Navbar from "@/components/Navbar";
import { SERVICE_ARTICLES } from "@/lib/service-articles";

/* ── Fade-up preset ─────────────────────────────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

function getLucideIcon(emoji: string) {
  const iconProps = { className: "w-8 h-8", strokeWidth: 1.5 };
  if (emoji.includes("⚡")) return <Zap {...iconProps} />;
  if (emoji.includes("🔄")) return <RefreshCw {...iconProps} />;
  if (emoji.includes("🛡️") || emoji.includes("🛡")) return <Shield {...iconProps} />;
  if (emoji.includes("🚀")) return <Rocket {...iconProps} />;
  if (emoji.includes("🎨")) return <Palette {...iconProps} />;
  if (emoji.includes("📂")) return <Folder {...iconProps} />;
  if (emoji.includes("📊")) return <BarChart {...iconProps} />;
  if (emoji.includes("🔌")) return <Plug {...iconProps} />;
  if (emoji.includes("📈")) return <TrendingUp {...iconProps} />;
  if (emoji.includes("💡")) return <Lightbulb {...iconProps} />;
  if (emoji.includes("🧱")) return <Layers {...iconProps} />;
  if (emoji.includes("🔑")) return <Key {...iconProps} />;
  if (emoji.includes("🤖")) return <Bot {...iconProps} />;
  if (emoji.includes("⚙️") || emoji.includes("⚙")) return <Settings {...iconProps} />;
  if (emoji.includes("📝")) return <FileText {...iconProps} />;
  if (emoji.includes("👥")) return <Users {...iconProps} />;
  if (emoji.includes("🏢")) return <Building {...iconProps} />;
  if (emoji.includes("🤝")) return <Handshake {...iconProps} />;
  if (emoji.includes("📱")) return <Smartphone {...iconProps} />;
  if (emoji.includes("🧭")) return <Compass {...iconProps} />;
  if (emoji.includes("💼")) return <Briefcase {...iconProps} />;
  if (emoji.includes("🔐")) return <Lock {...iconProps} />;
  if (emoji.includes("🎯")) return <Target {...iconProps} />;
  if (emoji.includes("📞")) return <Phone {...iconProps} />;
  if (emoji.includes("🔍")) return <Search {...iconProps} />;
  if (emoji.includes("🔔")) return <Bell {...iconProps} />;
  
  return <CheckCircle2 {...iconProps} />;
}

/* ── Interactive FAQ Accordion Item ─────────────────────────────────────── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 py-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none py-2 group"
      >
        <span className="text-base md:text-lg font-medium text-white group-hover:text-[#66FF80] transition-colors duration-300">
          {question}
        </span>
        <span
          className="text-2xl text-[#66FF80] transition-transform duration-300 select-none ml-4"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="text-sm md:text-base font-light text-white/50 leading-relaxed pt-3 pb-5">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

interface Props {
  service: ServiceItem;
  lang: string;
}

export default function ServicePageTemplate({ service, lang }: Props) {
  const isVi = lang === "vi";

  // Force scroll to top on mount to fix Next.js smooth scrolling bug
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const name = isVi ? service.name.vi : service.name.en;
  const tagline = isVi ? service.tagline.vi : service.tagline.en;
  const overview = isVi ? service.overview.vi : service.overview.en;
  const idealFor = isVi ? service.idealFor.vi : service.idealFor.en;
  const ctaText = isVi ? service.cta.vi : service.cta.en;

  const backHref = `/${lang === "vi" ? "vi" : "global"}`;
  const contactHref = `/${lang === "vi" ? "vi" : "global"}#contact`;

  const article = SERVICE_ARTICLES[service.slug];

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Navbar lang={lang} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-36 overflow-hidden border-b border-white/[0.06]">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
            alt="Service Background"
            fill
            className="object-cover opacity-[0.25] mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/60 to-[#0a0a0a]" />
        </div>

        {/* Big number watermark (Removed) */}

        <div className="max-w-[1400px] mx-auto px-6 md:px-16 relative z-10">
          {/* Breadcrumb */}
          <motion.div
            {...fadeUp}
            className="flex items-center gap-3 mb-10 text-[11px] font-mono tracking-[0.2em] uppercase text-white/30"
          >
            <Link href={backHref} className="hover:text-white transition-colors duration-200">
              CBEC Solutions
            </Link>
            <span>/</span>
            <span>{isVi ? "Dịch vụ" : "Services"}</span>
            <span>/</span>
            <span className="text-white/60">{name}</span>
          </motion.div>

          {/* Service number (Removed) */}

          {/* Headline */}
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-[12vw] md:text-[6vw] font-bold uppercase leading-[1.0] tracking-tighter text-white max-w-4xl mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.18 }}
            className="text-xl md:text-2xl font-light text-white/50 max-w-2xl leading-relaxed"
          >
            {tagline}
          </motion.p>

          {/* CTA in hero */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.26 }}
            className="mt-12 flex items-center gap-6"
          >
            <Link
              href={contactHref}
              className="inline-flex items-center gap-3 text-[11px] font-mono tracking-[0.2em] uppercase text-[#0a0a0a] bg-[#66FF80] px-8 py-4 hover:bg-white transition-colors duration-300"
            >
              {ctaText}
              <span className="text-base leading-none">→</span>
            </Link>
            <span className="text-xs font-mono text-white/25 tracking-wider">
              {isVi ? "Phản hồi trong 24h" : "Response within 24h"}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Overview ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <motion.div {...fadeUp} className="order-2 md:order-1">
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#66FF80]/70 mb-8">
              {isVi ? "Tổng quan" : "Overview"}
            </p>
            <p className="text-2xl md:text-3xl font-light text-white/80 leading-relaxed">
              {overview}
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="order-1 md:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.05]">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
              alt="Overview Illustration"
              fill
              className="object-cover opacity-60 mix-blend-luminosity hover:opacity-100 hover:mix-blend-normal transition-all duration-700 hover:scale-105"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Features (Sticky Scroll) ──────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <motion.div {...fadeUp} className="mb-16 md:mb-24">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#66FF80]/70">
              {isVi ? "Bao gồm" : "What's included"}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: Sticky Image Container */}
            <div className="hidden lg:block sticky top-32 aspect-[3/4] rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.05]">
               <Image
                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                 alt="Features showcase"
                 fill
                 className="object-cover opacity-60 mix-blend-luminosity transition-all duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
            </div>
            
            {/* Right: Scrolling Features List */}
            <div className="space-y-6">
              {service.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-[#0a0a0a] p-8 md:p-10 group hover:bg-white/[0.03] border border-white/[0.03] hover:border-[#66FF80]/20 transition-colors duration-500 rounded-2xl"
                >
                  <div className="text-[#66FF80]/60 mb-8 group-hover:text-[#66FF80] transition-colors duration-500">
                    {getLucideIcon(feature.icon)}
                  </div>
                  <h3
                    className="text-2xl font-bold uppercase tracking-tight text-white mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {isVi ? feature.title.vi : feature.title.en}
                  </h3>
                  <p className="text-base font-light text-white/50 leading-relaxed">
                    {isVi ? feature.description.vi : feature.description.en}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Deliverables ──────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          <div className="md:col-span-4">
            <motion.p
              {...fadeUp}
              className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#66FF80]/70 sticky top-32"
            >
              {isVi ? "Bạn nhận được" : "Deliverables"}
            </motion.p>
          </div>
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.deliverables.map((d, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                  className="flex items-center gap-4 p-5 border border-white/[0.06] rounded-2xl group hover:border-[#66FF80]/30 hover:bg-white/[0.02] transition-colors duration-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#66FF80]/50 shrink-0 group-hover:bg-[#66FF80] transition-colors duration-300" />
                  <span className="text-sm font-light text-white/60 group-hover:text-white/80 transition-colors duration-300">
                    {isVi ? d.vi : d.en}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Ideal For ─────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <motion.div {...fadeUp} className="order-2 md:order-2">
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#66FF80]/70 mb-8">
              {isVi ? "Dành cho" : "Ideal for"}
            </p>
            <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed">
              {idealFor}
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="order-1 md:order-1 relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.05]">
            <Image
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
              alt="Ideal For Illustration"
              fill
              className="object-cover opacity-60 mix-blend-luminosity hover:opacity-100 hover:mix-blend-normal transition-all duration-700 hover:scale-105"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Deep Dive Content & FAQs ──────────────────────────────────────── */}
      {article && (
        <section className="py-24 md:py-36 border-b border-white/[0.06] relative" id="deep-dive">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Sticky Table of Contents (3 Cols) */}
            <div className="lg:col-span-3">
              <div className="sticky top-32 space-y-8">
                <div>
                  <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#66FF80] mb-2">
                    {isVi ? "Góc chuyên sâu" : "Deep Dive Insight"}
                  </p>
                  <h3 className="text-xs font-semibold uppercase text-white/70 tracking-wider">
                    {isVi ? "Mục lục chi tiết" : "Table of Contents"}
                  </h3>
                </div>
                <nav className="flex flex-col gap-3 border-l border-white/10 pl-4">
                  <a
                    href="#intro"
                    className="text-xs font-mono text-white/40 hover:text-[#66FF80] hover:border-l hover:border-[#66FF80] pl-1 transition-all duration-200"
                  >
                    01. {isVi ? "Giới thiệu" : "Introduction"}
                  </a>
                  {article.sections.map((section, idx) => (
                    <a
                      key={idx}
                      href={`#section-${idx}`}
                      className="text-xs font-mono text-white/40 hover:text-[#66FF80] hover:border-l hover:border-[#66FF80] pl-1 transition-all duration-200 truncate"
                    >
                      {`0${idx + 2}. `}
                      {section.title}
                    </a>
                  ))}
                  <a
                    href="#faqs"
                    className="text-xs font-mono text-white/40 hover:text-[#66FF80] hover:border-l hover:border-[#66FF80] pl-1 transition-all duration-200"
                  >
                    {`0${article.sections.length + 2}. `}
                    {isVi ? "Câu hỏi thường gặp" : "FAQs"}
                  </a>
                </nav>
              </div>
            </div>

            {/* Content & FAQ Accordion (9 Cols) */}
            <div className="lg:col-span-9 space-y-20">
              {/* Introduction */}
              <div id="intro" className="scroll-mt-32 space-y-6">
                <h4 className="text-xs font-mono tracking-[0.2em] text-[#66FF80]/70 uppercase">
                  01. {isVi ? "Giới thiệu tổng quan" : "Executive Introduction"}
                </h4>
                <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed">
                  {article.intro}
                </p>
              </div>

              {/* Sections */}
              {article.sections.map((section, idx) => (
                <div key={idx} id={`section-${idx}`} className="scroll-mt-32 space-y-6">
                  <h4 className="text-xs font-mono tracking-[0.2em] text-[#66FF80]/70 uppercase">
                    {`0${idx + 2}. `}
                    {section.title}
                  </h4>
                  <div className="space-y-6">
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-base font-light text-white/60 leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {/* FAQs Accordion */}
              <div id="faqs" className="scroll-mt-32 space-y-8 pt-12 border-t border-white/10">
                <div>
                  <h4 className="text-xs font-mono tracking-[0.2em] text-[#66FF80]/70 uppercase mb-2">
                    {`0${article.sections.length + 2}. `}
                    {isVi ? "Câu hỏi thường gặp" : "Frequently Asked Questions"}
                  </h4>
                  <h3
                    className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {isVi ? "Thắc mắc & Giải đáp" : "Q&A Insight"}
                  </h3>
                </div>

                <div className="space-y-2">
                  {article.faqs.map((faq, idx) => (
                    <FaqItem key={idx} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Bottom ────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 text-center">
          <motion.h2
            {...fadeUp}
            className="text-[8vw] md:text-[4vw] font-bold uppercase leading-tight tracking-tighter text-white mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {isVi ? "Sẵn sàng bắt đầu?" : "Ready to start?"}
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-lg font-light text-white/40 mb-12 max-w-lg mx-auto"
          >
            {isVi
              ? "Đặt lịch Discovery Call miễn phí — phản hồi trong 24 giờ."
              : "Book a free Discovery Call — we respond within 24 hours."}
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.18 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href={contactHref}
              onClick={() => trackCTAClick(ctaText, "service_page_footer")}
              className="inline-flex items-center gap-3 text-[11px] font-mono tracking-[0.2em] uppercase text-[#0a0a0a] bg-[#66FF80] px-10 py-5 hover:bg-white transition-colors duration-300"
            >
              {ctaText}
              <span className="text-base leading-none">→</span>
            </Link>
            <Link
              href={backHref}
              className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors duration-300"
            >
              ← {isVi ? "Quay lại trang chủ" : "Back to home"}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
