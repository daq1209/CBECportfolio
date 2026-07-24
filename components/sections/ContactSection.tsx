"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { translations } from "@/lib/translations";
import { trackFormSubmit } from "@/lib/analytics";

import { Zap, ShieldCheck, CheckCircle2 } from "lucide-react";

type FormStatus = "idle" | "sending" | "success" | "error";

const schema = (isVi: boolean) =>
  z.object({
    name: z
      .string()
      .min(2, isVi ? "Họ tên phải có ít nhất 2 ký tự" : "Name must be at least 2 characters"),
    email: z
      .string()
      .min(1, isVi ? "Vui lòng nhập email" : "Email is required")
      .email(isVi ? "Vui lòng nhập email hợp lệ" : "Please enter a valid email address"),
    company: z
      .string()
      .min(1, isVi ? "Vui lòng nhập tên doanh nghiệp" : "Company name is required"),
    phone: z.string().optional(),
    service: z
      .string()
      .min(1, isVi ? "Vui lòng chọn dịch vụ" : "Please select a service"),
    budget: z.string().optional(),
    message: z
      .string()
      .min(10, isVi ? "Nội dung tin nhắn phải có ít nhất 10 ký tự" : "Message must be at least 10 characters"),
    currentWebsite: z.string().optional(),
    _gotcha: z.string().optional(),
  });

type FormData = {
  name: string;
  email: string;
  company: string;
  phone?: string;
  service: string;
  budget?: string;
  message: string;
  currentWebsite?: string;
  _gotcha?: string;
};

const inputClass = (hasError: boolean) =>
  `w-full bg-white border ${
    hasError ? "border-red-500" : "border-[#cbd5e1]"
  } rounded-xl px-4 py-3.5 text-sm text-[#0a0a0a] placeholder-gray-400 focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#66FF80]/60 transition-all duration-200`;

const labelClass = "block text-[10px] font-mono tracking-[0.2em] uppercase text-slate-700 font-semibold mb-2";

export default function ContactSection({ lang }: { lang: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const language = lang === "vi" ? "vi" : "en";
  const t = translations[language].contact;

  const addressLines = t.address.split("\n");

  const isVi = language === "vi";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema(isVi)),
  });

  const onSubmit = async (data: FormData) => {
    if (formStatus === "sending") return;
    setFormStatus("sending");

    try {
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: data.name,
          email: data.email,
          company: data.company,
          phone: data.phone,
          service: data.service,
          budget: data.budget,
          message: data.message,
          currentWebsite: data.currentWebsite,
          _gotcha: data._gotcha,
          lang,
        }),
      });

      if (res.ok) {
        setFormStatus("success");
        reset();
        trackFormSubmit("contact", lang);
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const trustItems = isVi
    ? [
        { icon: <Zap className="w-4 h-4 text-[#66FF80]" />, label: "Phản hồi trong 24 giờ" },
        { icon: <ShieldCheck className="w-4 h-4 text-[#66FF80]" />, label: "Bảo mật thông tin" },
        { icon: <CheckCircle2 className="w-4 h-4 text-[#66FF80]" />, label: "Tư vấn miễn phí" },
      ]
    : [
        { icon: <Zap className="w-4 h-4 text-[#66FF80]" />, label: "Reply within 24 hours" },
        { icon: <ShieldCheck className="w-4 h-4 text-[#66FF80]" />, label: "100% confidential" },
        { icon: <CheckCircle2 className="w-4 h-4 text-[#66FF80]" />, label: "Free consultation" },
      ];

  return (
    <section
      id="contact"
      className="relative w-full bg-[#0a0a0a] text-white overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Subtle gradient glow at top */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(102,255,128,0.3), transparent)" }}
      />

      {/* Ambient glow behind form */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 70% 50%, rgba(102,255,128,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="w-full px-6 md:px-16 pt-20 flex-shrink-0 relative z-10">
        <div className="max-w-[1400px] mx-auto w-full h-px bg-white/10" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* ── LEFT: Heading + Contact info ── */}
          <motion.div
            className="lg:col-span-5 lg:sticky lg:top-24"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <span className="inline-block text-[10px] font-mono tracking-[0.25em] uppercase text-[#66FF80]/70 border border-[#66FF80]/20 px-3 py-1.5 mb-8 rounded-full">
              {isVi ? "Liên hệ ngay" : "Get in touch"}
            </span>

            <h2
              className="text-[10vw] sm:text-[7vw] lg:text-[4.5vw] font-bold leading-[1.05] tracking-tighter uppercase text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.line1}
            </h2>
            <h2
              className="text-[10vw] sm:text-[7vw] lg:text-[4.5vw] font-bold leading-[1.05] tracking-tighter uppercase text-[#66FF80] mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.line2}
            </h2>

            <p className="text-base text-white/50 leading-relaxed mb-10 font-light max-w-sm" style={{ fontFamily: "var(--font-body)" }}>
              {isVi
                ? "Chúng tôi hỗ trợ doanh nghiệp xây dựng các sản phẩm công nghệ từ website, phần mềm quản lý đến tích hợp AI tự động hóa."
                : "We help businesses build digital products from websites to custom software and AI automation."}
            </p>

            {/* Trust signals */}
            <div className="flex flex-col gap-3 mb-10">
              {trustItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="text-sm text-white/60 font-light">{item.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Email */}
            <div className="mb-8">
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 mb-2">Email</p>
              <a
                href="mailto:cbecsolutions.vn@gmail.com"
                className="relative inline-block group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="text-sm font-light text-white/70 transition-colors duration-300 group-hover:text-[#66FF80]">
                  cbecsolutions.vn@gmail.com
                </span>
                <motion.div
                  className="absolute -bottom-0.5 left-0 h-px bg-[#66FF80]"
                  initial={{ width: "0%" }}
                  animate={{ width: isHovered ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </a>
            </div>

            {/* Address + Phone */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 mb-2">{t.hq}</p>
                <p className="text-sm font-light text-white/60 leading-relaxed">
                  {addressLines.map((line, i) => (
                    <span key={i}>{line}{i < addressLines.length - 1 && <br />}</span>
                  ))}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 mb-2">{t.directLine}</p>
                <a href="tel:+84703819006" className="text-sm font-light text-white/60 hover:text-[#66FF80] transition-colors duration-300 block">
                  (+84) 703 819 006
                </a>
                <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest">WhatsApp</span>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Form card ── */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {/* Toned-down Platinum Silver Card */}
            <div
              className="relative rounded-3xl overflow-hidden bg-[#dce0e6] text-[#0a0a0a]"
              style={{
                boxShadow: "0 25px 60px -15px rgba(0,0,0,0.7), 0 0 35px rgba(102,255,128,0.15)",
              }}
            >
              {/* Card top accent bar */}
              <div className="h-1.5 w-full bg-[#66FF80]" />

              {/* Card header */}
              <div className="px-6 md:px-10 pt-8 pb-6 border-b border-[#cbd5e1]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className="text-xl font-bold text-[#0a0a0a] mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {isVi ? "Điền form nhận tư vấn miễn phí" : "Get your free consultation"}
                    </h3>
                    <p className="text-xs text-slate-600 font-mono">
                      {isVi ? "Chúng tôi sẽ liên hệ trong vòng 24 giờ" : "We'll respond within 24 hours"}
                    </p>
                  </div>
                  {/* Pulse indicator */}
                  <div className="flex items-center gap-2 bg-[#0a0a0a] px-3 py-1.5 rounded-full">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#66FF80] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#66FF80]" />
                    </span>
                    <span className="text-[10px] font-mono text-[#66FF80] uppercase tracking-widest font-semibold">
                      {isVi ? "Đang nhận" : "Open"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Form body */}
              <div className="px-6 md:px-10 py-8">
                {formStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                    role="status"
                    aria-live="polite"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#66FF80]/20 border border-[#66FF80]"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-[#0a0a0a] mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      {isVi ? "Gửi thành công!" : "Message sent!"}
                    </h4>
                    <p className="text-gray-600 font-light text-sm" style={{ fontFamily: "var(--font-body)" }}>
                      {t.formSuccess}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass} htmlFor="contact-name">{t.formName}</label>
                        <input
                          id="contact-name"
                          type="text"
                          {...register("name")}
                          placeholder={t.formNamePlaceholder}
                          aria-required="true"
                          aria-invalid={errors.name ? "true" : "false"}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          className={inputClass(!!errors.name)}
                          style={{ fontFamily: "var(--font-body)" }}
                        />
                        {errors.name && (
                          <p id="name-error" className="text-red-500 text-xs mt-1.5 ml-1 font-medium" role="alert">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="contact-email">{t.formEmail}</label>
                        <input
                          id="contact-email"
                          type="email"
                          {...register("email")}
                          placeholder={t.formEmailPlaceholder}
                          aria-required="true"
                          aria-invalid={errors.email ? "true" : "false"}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          className={inputClass(!!errors.email)}
                          style={{ fontFamily: "var(--font-body)" }}
                        />
                        {errors.email && (
                          <p id="email-error" className="text-red-500 text-xs mt-1.5 ml-1 font-medium" role="alert">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Company + Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass} htmlFor="contact-company">{t.formCompany}</label>
                        <input
                          id="contact-company"
                          type="text"
                          {...register("company")}
                          placeholder={t.formCompanyPlaceholder}
                          aria-required="true"
                          aria-invalid={errors.company ? "true" : "false"}
                          aria-describedby={errors.company ? "company-error" : undefined}
                          className={inputClass(!!errors.company)}
                          style={{ fontFamily: "var(--font-body)" }}
                        />
                        {errors.company && (
                          <p id="company-error" className="text-red-500 text-xs mt-1.5 ml-1 font-medium" role="alert">
                            {errors.company.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="contact-phone">{t.formPhone}</label>
                        <input
                          id="contact-phone"
                          type="text"
                          {...register("phone")}
                          placeholder={t.formPhonePlaceholder}
                          className={inputClass(false)}
                          style={{ fontFamily: "var(--font-body)" }}
                        />
                      </div>
                    </div>

                    {/* Service + Budget */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass} htmlFor="contact-service">{t.formService}</label>
                        <div className="relative">
                          <select
                            id="contact-service"
                            {...register("service")}
                            aria-required="true"
                            aria-invalid={errors.service ? "true" : "false"}
                            aria-describedby={errors.service ? "service-error" : undefined}
                            className={`${inputClass(!!errors.service)} appearance-none pr-10`}
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            <option value="" disabled className="bg-white text-gray-400">
                              {t.formService}
                            </option>
                            {t.formServiceOptions.map((opt, i) => (
                              <option key={i} value={opt} className="bg-white text-[#0a0a0a]">
                                {opt}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                        {errors.service && (
                          <p id="service-error" className="text-red-500 text-xs mt-1.5 ml-1 font-medium" role="alert">
                            {errors.service.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="contact-budget">{t.formBudget}</label>
                        <input
                          id="contact-budget"
                          type="text"
                          {...register("budget")}
                          placeholder={t.formBudgetPlaceholder}
                          className={inputClass(false)}
                          style={{ fontFamily: "var(--font-body)" }}
                        />
                      </div>
                    </div>

                    {/* Current Website */}
                    <div>
                      <label className={labelClass} htmlFor="contact-currentWebsite">
                        {t.formCurrentWebsite}
                      </label>
                      <input
                        id="contact-currentWebsite"
                        type="text"
                        {...register("currentWebsite")}
                        placeholder={t.formCurrentWebsitePlaceholder || "https://your-website.com"}
                        className={inputClass(false)}
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className={labelClass} htmlFor="contact-message">{t.formMessage}</label>
                      <textarea
                        id="contact-message"
                        {...register("message")}
                        rows={4}
                        placeholder={t.formMessagePlaceholder}
                        aria-required="true"
                        aria-invalid={errors.message ? "true" : "false"}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        className={`${inputClass(!!errors.message)} resize-none`}
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                      {errors.message && (
                        <p id="message-error" className="text-red-500 text-xs mt-1.5 ml-1 font-medium" role="alert">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Honeypot */}
                    <div className="hidden" aria-hidden="true">
                      <input type="text" tabIndex={-1} autoComplete="off" {...register("_gotcha")} />
                    </div>

                    {/* Error state */}
                    {formStatus === "error" && (
                      <p className="text-red-500 text-xs font-mono text-center font-medium" role="alert" aria-live="assertive">
                        {t.formError}
                      </p>
                    )}

                    {/* Submit row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                      <p className="text-[11px] text-slate-600 font-mono leading-relaxed max-w-[220px]">
                        {t.formPrivacy}
                      </p>
                      <button
                        type="submit"
                        disabled={formStatus === "sending"}
                        aria-busy={formStatus === "sending"}
                        className="relative flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold tracking-tight transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-none overflow-hidden group bg-[#0a0a0a] text-white hover:bg-[#66FF80] hover:text-[#0a0a0a] shadow-lg shadow-black/20"
                        style={{
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        <span className="relative z-10">
                          {formStatus === "sending" ? t.formSending : t.formButton}
                        </span>
                        {formStatus !== "sending" && (
                          <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-200 inline-block" aria-hidden="true">
                            →
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        className="relative z-10 w-full px-6 md:px-16 pb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="max-w-[1400px] mx-auto w-full h-px bg-white/10 mb-8" />
        <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          <span className="text-xs font-mono text-white/20 tracking-widest flex-1 text-center md:text-left">
            {t.footer}
          </span>
          <div className="flex items-center gap-8 md:gap-6 flex-1 justify-center">
            <a href="https://facebook.com/cbecsolutions" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-white/40 hover:text-[#66FF80] tracking-widest transition-colors uppercase">
              Facebook
            </a>
            <a href="https://instagram.com/cbecsolutions" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-white/40 hover:text-[#66FF80] tracking-widest transition-colors uppercase">
              Instagram
            </a>
            <a href="https://x.com/cbecsolutions" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-white/40 hover:text-[#66FF80] tracking-widest transition-colors uppercase">
              X
            </a>
          </div>
          <span className="text-[10px] md:text-xs font-mono text-white/20 tracking-widest flex-1 text-center md:text-right">
            MST: 0319431730 · CBEC Solutions
          </span>
        </div>
      </motion.div>
    </section>
  );
}
