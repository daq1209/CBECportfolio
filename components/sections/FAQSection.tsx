"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { escapeJsonLd } from "@/lib/security";

const FAQS_EN = [
  {
    q: "What does 'fixed-scope proposal' actually mean?",
    a: "It means we agree on deliverables, timeline, and price upfront — in writing. Zero scope creep, zero surprise invoices. If requirements change materially, we renegotiate transparently before starting new work.",
  },
  {
    q: "Where is your team based and can I meet you in person?",
    a: "Our core team is in Ho Chi Minh City, Vietnam, with strategic oversight from Australia. We run async-first for speed, but we're always available for video calls — and in-person meetings for clients in Vietnam or visiting the region.",
  },
  {
    q: "How do you handle IP and data security for overseas clients?",
    a: "All work is covered under NDA before any brief is shared. Code ownership transfers fully to the client upon final payment. We follow GDPR-compatible data practices for all EU/Australian clients.",
  },
  {
    q: "What's your typical project timeline?",
    a: "Brand + website projects: 4–6 weeks. Custom software / CRM: 8–16 weeks depending on scope. AI automation integrations: 2–4 weeks. We don't pad timelines — these are actual delivery windows.",
  },
  {
    q: "Do you work with early-stage startups or only established businesses?",
    a: "Both. For early-stage startups we offer founder packages focused on brand + MVP web presence. For established businesses, we focus on operational tech, CRM systems, and scaling infrastructure. Budget minimums apply — contact us for details.",
  },
  {
    q: "What does ongoing support look like after launch?",
    a: "We offer monthly retainer partnerships for content, optimisation, and technical maintenance. The first 30 days post-launch always include our launch monitoring package at no extra cost.",
  },
];

const FAQS_VI = [
  {
    q: "\"Fixed-scope proposal\" nghĩa là gì trong thực tế?",
    a: "Deliverable, timeline và chi phí được thống nhất trước bằng văn bản. Không scope creep, không phát sinh hóa đơn bất ngờ. Nếu yêu cầu thay đổi đáng kể, chúng tôi đàm phán lại minh bạch trước khi bắt đầu hạng mục mới.",
  },
  {
    q: "Team của bạn ở đâu và tôi có thể gặp trực tiếp không?",
    a: "Team core ở TP.HCM, với định hướng chiến lược từ Australia. Chúng tôi làm việc async để đảm bảo tốc độ, nhưng luôn sẵn sàng video call — và gặp trực tiếp với khách hàng tại Việt Nam.",
  },
  {
    q: "Chi phí như thế nào? Có phù hợp với SME không?",
    a: "Có các package phù hợp cho SME từ branding cơ bản đến website và phần mềm tùy chỉnh. Ngân sách tối thiểu tuỳ theo hạng mục — liên hệ để được tư vấn cụ thể.",
  },
  {
    q: "Timeline dự án thường là bao lâu?",
    a: "Branding + website: 4–6 tuần. Phần mềm tùy chỉnh / CRM: 8–16 tuần tùy scope. Tích hợp AI automation: 2–4 tuần. Chúng tôi không padding timeline — đây là cửa sổ giao hàng thực tế.",
  },
  {
    q: "CBEC có hỗ trợ sau khi ra mắt không?",
    a: "Có. Chúng tôi cung cấp partnership retainer hàng tháng cho nội dung, tối ưu và bảo trì kỹ thuật. 30 ngày đầu sau launch luôn bao gồm gói monitoring không tính thêm phí.",
  },
  {
    q: "Tôi cần chuẩn bị gì trước khi liên hệ?",
    a: "Không cần nhiều — chỉ cần hiểu mục tiêu kinh doanh của bạn. Brief chi tiết? Tốt hơn. Chỉ có ý tưởng? Vẫn ổn. Discovery call giúp chúng tôi cùng nhau định hình scope phù hợp nhất.",
  },
];

interface FaqItemProps {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FaqItem({ q, a, isOpen, onToggle, index }: FaqItemProps) {
  return (
    <motion.div
      className="border-t border-white/[0.08] group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 py-7 md:py-8 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-5 flex-1">
          <span className="text-[10px] font-mono text-white/20 tracking-widest mt-0.5 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="text-base md:text-lg font-medium text-white/80 group-hover:text-white transition-colors duration-300 leading-snug"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {q}
          </span>
        </div>
        <motion.span
          className="shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/40 mt-0.5"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-8 pl-9 md:pl-11 text-base md:text-lg font-light text-white/45 leading-relaxed max-w-3xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection({ lang, nonce }: { lang: string; nonce?: string }) {
  const isVi = lang === "vi";
  const faqs = isVi ? FAQS_VI : FAQS_EN;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <section className="relative w-full bg-[#0a0a0a] text-white overflow-hidden py-32 md:py-48">
      <script
        type="application/ld+json"
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(faqSchema) }}
      />
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10 md:mb-16">
          <div className="w-2 h-2 rounded-full bg-[#66FF80]" />
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-white/50">
            {isVi ? "Câu hỏi thường gặp" : "FAQ"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          <div className="md:col-span-4">
            <motion.h2
              className="text-[10vw] md:text-[3.5vw] font-bold uppercase leading-[1.1] tracking-tighter text-white sticky top-32"
              style={{ fontFamily: "var(--font-display)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {isVi ? (
                <>Câu hỏi<br /><span className="text-[#66FF80]">thường gặp.</span></>
              ) : (
                <>Got<br /><span className="text-[#66FF80]">Questions.</span></>
              )}
            </motion.h2>
          </div>

          <div className="md:col-span-8">
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                index={i}
              />
            ))}
            <div className="border-t border-white/[0.08]" />
          </div>
        </div>
      </div>
    </section>
  );
}
