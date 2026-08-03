"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const COPY_EN = {
  eyebrow: "Free Resource",
  headline1: "The eCommerce",
  headline2: "Launch Checklist.",
  description:
    "53 tested steps our operators use to take a product from zero to first sale on Amazon and DTC in under 90 days. Used internally, now available for free.",
  bullets: [
    "Market and competition analysis framework",
    "Supplier sourcing and vetting scorecard",
    "Listing optimization and A9 algorithm primer",
    "First 30 day launch spend playbook",
  ],
  placeholder: "your@email.com",
  cta: "Get the Checklist →",
  sending: "Sending...",
  success: "Check your inbox, it is on the way.",
  error: "Something went wrong. Email us at hello@cbecsolutions.com",
  privacy: "No spam. Unsubscribe anytime.",
};

const COPY_VI = {
  eyebrow: "Tài liệu miễn phí",
  headline1: "Checklist Ra Mắt",
  headline2: "eCommerce.",
  description:
    "53 bước kiểm chứng giúp đưa sản phẩm từ zero đến đơn hàng đầu tiên trên Amazon và thương mại điện tử trong 90 ngày.",
  bullets: [
    "Bộ khung phân tích thị trường và đối thủ",
    "Bảng đánh giá chọn lọc nhà cung cấp",
    "Tối ưu trang sản phẩm và thuật toán tìm kiếm",
    "Kế hoạch phân bổ ngân sách 30 ngày đầu",
  ],
  placeholder: "email@cuaban.com",
  cta: "Nhận ngay →",
  sending: "Đang gửi...",
  success: "Kiểm tra hộp thư, tài liệu đang trên đường gửi đến bạn.",
  error: "Có lỗi xảy ra. Vui lòng gửi email trực tiếp cho chúng tôi.",
  privacy: "Không gửi spam. Hủy đăng ký bất kỳ lúc nào.",
};

type Status = "idle" | "sending" | "success" | "error";

const schema = (isVi: boolean) =>
  z.object({
    email: z
      .string()
      .min(1, isVi ? "Vui lòng nhập địa chỉ email" : "Email is required")
      .email(isVi ? "Vui lòng nhập email hợp lệ" : "Please enter a valid email address"),
    website: z.string().optional(),
  });

type FormData = {
  email: string;
  website?: string;
};

export default function LeadMagnetSection({ lang }: { lang: string }) {
  const isVi = lang === "vi";
  const c = isVi ? COPY_VI : COPY_EN;
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema(isVi)),
  });

  const onSubmit = async (data: FormData) => {
    if (status === "sending" || status === "success") return;

    setStatus("sending");
    try {
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "lead-magnet",
          email: data.email,
          website: data.website,
          lang,
          source: "ecommerce-checklist",
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative w-full bg-[#66FF80] overflow-hidden py-24 md:py-36">
      {/* Noise texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <svg className="absolute inset-0 w-full h-full">
          <filter id="leadNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#leadNoise)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">
          {/* Left — copy */}
          <div className="md:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-block text-[10px] font-mono tracking-[0.25em] uppercase text-[#0a0a0a]/50 border border-[#0a0a0a]/20 px-3 py-1.5 mb-8">
                {c.eyebrow}
              </span>

              <h2
                className="text-[11vw] md:text-[5vw] font-bold uppercase leading-[1.05] tracking-tighter text-[#0a0a0a] mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {c.headline1}
                <br />
                {c.headline2}
              </h2>

              <p className="text-base md:text-lg font-light text-[#0a0a0a]/70 leading-relaxed mb-8 max-w-md">
                {c.description}
              </p>

              <ul className="flex flex-col gap-3 mb-10">
                {c.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 text-sm text-[#0a0a0a]/70"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#0a0a0a]/40 shrink-0" />
                    {b}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            className="md:col-span-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <div className="bg-[#0a0a0a] p-8 md:p-12 rounded-2xl">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#66FF80]/20 flex items-center justify-center mx-auto mb-4">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10l4 4 8-8" stroke="#66FF80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-white font-medium text-lg mb-2">{c.success}</p>
                  <p className="text-white/40 text-sm">{c.privacy}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder={c.placeholder}
                      className={`w-full bg-white/5 border rounded-lg px-5 py-4 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#66FF80]/50 transition-colors duration-200 ${
                        errors.email ? "border-red-500/50 focus:border-red-500/50" : "border-white/10"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Honeypot field to prevent automated spam */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register("website")}
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-xs">{c.error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-[#66FF80] text-[#0a0a0a] font-semibold py-4 rounded-lg text-sm tracking-wide hover:bg-white transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {status === "sending" ? c.sending : c.cta}
                  </button>

                  <p className="text-white/25 text-[10px] font-mono tracking-wider text-center">
                    {c.privacy}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
