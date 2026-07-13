"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { trackCTAClick } from "@/lib/analytics";

const STEPS_EN = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "30-minute strategy session. We map your market, goals, and revenue gaps. No sales pitch — just clarity on whether we're the right fit.",
    tag: "Week 1",
  },
  {
    number: "02",
    title: "Proposal & Scope",
    description:
      "Fixed-scope proposal delivered within 48 hours. Clear deliverables, timeline, and investment. No surprises, ever.",
    tag: "Week 1",
  },
  {
    number: "03",
    title: "Strategy & Architecture",
    description:
      "We define the technical architecture, brand direction, and go-to-market positioning before writing a single line of code.",
    tag: "Week 2",
  },
  {
    number: "04",
    title: "Build & Iterate",
    description:
      "Rapid execution in 2-week sprints with weekly check-ins. You see real progress — not just status updates.",
    tag: "Weeks 3–8",
  },
  {
    number: "05",
    title: "Launch & Optimize",
    description:
      "We don't disappear at launch. The first 30 days post-launch include active monitoring, A/B testing, and conversion optimization.",
    tag: "Launch",
  },
  {
    number: "06",
    title: "Scale Together",
    description:
      "Ongoing retainer partnerships for brands ready to scale. Dedicated capacity, priority support, quarterly strategy reviews.",
    tag: "Ongoing",
  },
];

const STEPS_VI = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "Cuộc gọi chiến lược 30 phút. Chúng tôi phân tích thị trường, mục tiêu và điểm nghẽn doanh thu của bạn. Không bán hàng — chỉ làm rõ xem chúng ta có phù hợp không.",
    tag: "Tuần 1",
  },
  {
    number: "02",
    title: "Đề xuất & Phạm vi",
    description:
      "Báo giá fixed-scope giao trong 48 giờ. Deliverable, timeline và chi phí rõ ràng. Không bao giờ có chi phí phát sinh.",
    tag: "Tuần 1",
  },
  {
    number: "03",
    title: "Chiến lược & Kiến trúc",
    description:
      "Định nghĩa kiến trúc kỹ thuật, định hướng thương hiệu và positioning trước khi viết bất kỳ dòng code nào.",
    tag: "Tuần 2",
  },
  {
    number: "04",
    title: "Build & Cải tiến",
    description:
      "Thực thi nhanh theo sprint 2 tuần với check-in hàng tuần. Bạn thấy tiến độ thực tế — không chỉ là status update.",
    tag: "Tuần 3–8",
  },
  {
    number: "05",
    title: "Ra mắt & Tối ưu",
    description:
      "Chúng tôi không biến mất sau khi launch. 30 ngày đầu sau ra mắt bao gồm monitoring, A/B testing và tối ưu chuyển đổi.",
    tag: "Ra mắt",
  },
  {
    number: "06",
    title: "Scale cùng nhau",
    description:
      "Partnership retainer dài hạn cho các thương hiệu sẵn sàng mở rộng. Năng lực dedicated, hỗ trợ ưu tiên, review chiến lược hàng quý.",
    tag: "Dài hạn",
  },
];

export default function ProcessSection({ lang }: { lang: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVi = lang === "vi";
  const steps = isVi ? STEPS_VI : STEPS_EN;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0f0f0f] text-white overflow-hidden py-32 md:py-48"
    >
      <motion.div
        style={{ y: yParallax }}
        className="max-w-[1400px] mx-auto px-6 md:px-16 w-full"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-10 md:mb-16">
          <div className="w-2 h-2 rounded-full bg-[#66FF80]" />
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-white/50">
            {isVi ? "Quy trình làm việc" : "How We Work"}
          </span>
        </div>

        <motion.div
          className="mb-24 md:mb-40 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="text-[8vw] md:text-[4.5vw] font-bold leading-[1.1] tracking-tighter uppercase text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {isVi ? "Quy trình" : "Execution"}
          </h2>
          <h2
            className="text-[8vw] md:text-[4.5vw] font-bold leading-[1.1] tracking-tighter uppercase text-[#66FF80]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {isVi ? "Chuẩn chỉnh." : "by Design."}
          </h2>
          <p className="mt-6 md:mt-10 text-lg md:text-xl font-light text-white/50 max-w-2xl leading-relaxed">
            {isVi
              ? "Mỗi engagement chạy theo một quy trình cố định — nhanh, minh bạch và không có surprises."
              : "Every engagement runs the same proven playbook — fast, transparent, and ruthlessly outcome-focused."}
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative bg-[#0f0f0f] p-8 md:p-10 group hover:bg-white/[0.03] transition-colors duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: (index % 3) * 0.07,
              }}
            >
              {/* Step accent line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-[#66FF80]"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
              />

              <div className="flex items-start justify-between mb-8">
                <span className="text-3xl md:text-4xl font-bold font-mono text-white/10 group-hover:text-white/20 transition-colors duration-500"
                  style={{ fontFamily: "var(--font-display)" }}>
                  {step.number}
                </span>
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#66FF80]/60 border border-[#66FF80]/20 px-3 py-1 rounded-full">
                  {step.tag}
                </span>
              </div>

              <h3
                className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white mb-4 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.title}
              </h3>
              <p className="text-sm md:text-base font-light text-white/50 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          className="mt-16 md:mt-24 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              trackCTAClick(isVi ? "Đặt lịch Discovery Call" : "Book a Discovery Call", "process_section");
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-3 text-[11px] font-mono tracking-[0.2em] uppercase text-[#0a0a0a] bg-[#66FF80] px-8 py-4 hover:bg-white transition-colors duration-300"
          >
            {isVi ? "Đặt lịch Discovery Call" : "Book a Discovery Call"}
            <span className="text-base leading-none">→</span>
          </a>
          <span className="text-xs font-mono text-white/30 tracking-wider">
            {isVi ? "Phản hồi trong 24 giờ." : "Response within 24 hours."}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
