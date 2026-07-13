"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { translations } from "@/lib/translations";
import { trackFormSubmit } from "@/lib/analytics";

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
        // Track successful form submission
        trackFormSubmit("contact", lang);
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <section id="contact" className="relative w-full bg-[#0a0a0a] text-white overflow-hidden flex flex-col justify-between" style={{ minHeight: "100vh" }}>
      <div className="w-full px-6 md:px-16 pt-20 flex-shrink-0">
        <div className="max-w-[1400px] mx-auto w-full h-px bg-white/10" />
      </div>

      <div className="flex-grow flex flex-col items-center justify-center px-6 md:px-16 py-12 md:py-20">
        {/* Heading */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="text-[12vw] md:text-[8vw] font-bold leading-[1.1] tracking-tighter uppercase text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.line1}
          </h2>
          <h2
            className="text-[12vw] md:text-[8vw] font-bold leading-[1.1] tracking-tighter uppercase text-[#66FF80]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.line2}
          </h2>
        </motion.div>

        {/* Email link */}
        <motion.div
          className="relative group mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <a
            href="mailto:cbecsolutions.vn@gmail.com"
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span
              className="text-[5.5vw] sm:text-[4vw] md:text-[3vw] lg:text-[2.5vw] font-light tracking-tight text-white/70 transition-colors duration-500 hover:text-[#66FF80] break-all sm:break-normal"
              style={{ fontFamily: "var(--font-display)" }}
            >
              cbecsolutions.vn@gmail.com
            </span>
            <motion.div
              className="absolute -bottom-2 left-0 h-[2px] bg-[#66FF80]"
              initial={{ width: "0%" }}
              animate={{ width: isHovered ? "100%" : "0%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </a>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          {formStatus === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 border border-[#66FF80]/30 rounded-2xl"
              role="status"
              aria-live="polite"
            >
              <div className="text-[#66FF80] text-3xl mb-4" aria-hidden="true">✓</div>
              <p className="text-white/70 font-light" style={{ fontFamily: "var(--font-body)" }}>
                {t.formSuccess}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30" htmlFor="contact-name">
                    {t.formName}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    {...register("name")}
                    placeholder={t.formNamePlaceholder}
                    aria-required="true"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`bg-white/5 border rounded-xl px-5 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#66FF80]/50 focus:bg-white/8 transition-all duration-200 ${
                      errors.name ? "border-red-500/50" : "border-white/10"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-400 text-xs mt-1 ml-1" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30" htmlFor="contact-email">
                    {t.formEmail}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    {...register("email")}
                    placeholder={t.formEmailPlaceholder}
                    aria-required="true"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`bg-white/5 border rounded-xl px-5 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#66FF80]/50 focus:bg-white/8 transition-all duration-200 ${
                      errors.email ? "border-red-500/50" : "border-white/10"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-400 text-xs mt-1 ml-1" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Company & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Company */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30" htmlFor="contact-company">
                    {t.formCompany}
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    {...register("company")}
                    placeholder={t.formCompanyPlaceholder}
                    aria-required="true"
                    aria-invalid={errors.company ? "true" : "false"}
                    aria-describedby={errors.company ? "company-error" : undefined}
                    className={`bg-white/5 border rounded-xl px-5 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#66FF80]/50 focus:bg-white/8 transition-all duration-200 ${
                      errors.company ? "border-red-500/50" : "border-white/10"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                  {errors.company && (
                    <p id="company-error" className="text-red-400 text-xs mt-1 ml-1" role="alert">
                      {errors.company.message}
                    </p>
                  )}
                </div>
                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30" htmlFor="contact-phone">
                    {t.formPhone}
                  </label>
                  <input
                    id="contact-phone"
                    type="text"
                    {...register("phone")}
                    placeholder={t.formPhonePlaceholder}
                    className="bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#66FF80]/50 focus:bg-white/8 transition-all duration-200"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>
              </div>

              {/* Current Website */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30" htmlFor="contact-currentWebsite">
                  {/* @ts-ignore */}
                  {t.formCurrentWebsite || "Current Website"}
                </label>
                <input
                  id="contact-currentWebsite"
                  type="text"
                  {...register("currentWebsite")}
                  placeholder={(t as any).formCurrentWebsitePlaceholder || "https://your-website.com"}
                  className="bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#66FF80]/50 focus:bg-white/8 transition-all duration-200"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </div>

              {/* Service & Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Service */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30" htmlFor="contact-service">
                    {t.formService}
                  </label>
                  <div className="relative">
                    <select
                      id="contact-service"
                      {...register("service")}
                      aria-required="true"
                      aria-invalid={errors.service ? "true" : "false"}
                      aria-describedby={errors.service ? "service-error" : undefined}
                      className={`w-full appearance-none bg-white/5 border rounded-xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-[#66FF80]/50 focus:bg-white/8 transition-all duration-200 ${
                        errors.service ? "border-red-500/50" : "border-white/10"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <option value="" disabled className="bg-[#0a0a0a] text-white/50">
                        {t.formService}
                      </option>
                      {t.formServiceOptions.map((opt, i) => (
                        <option key={i} value={opt} className="bg-[#0a0a0a] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                  {errors.service && (
                    <p id="service-error" className="text-red-400 text-xs mt-1 ml-1" role="alert">
                      {errors.service.message}
                    </p>
                  )}
                </div>
                {/* Budget */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30" htmlFor="contact-budget">
                    {t.formBudget}
                  </label>
                  <input
                    id="contact-budget"
                    type="text"
                    {...register("budget")}
                    placeholder={t.formBudgetPlaceholder}
                    className="bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#66FF80]/50 focus:bg-white/8 transition-all duration-200"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30" htmlFor="contact-message">
                  {t.formMessage}
                </label>
                <textarea
                  id="contact-message"
                  {...register("message")}
                  rows={5}
                  placeholder={t.formMessagePlaceholder}
                  aria-required="true"
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`bg-white/5 border rounded-xl px-5 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#66FF80]/50 focus:bg-white/8 transition-all duration-200 resize-none ${
                    errors.message ? "border-red-500/50" : "border-white/10"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                />
                {errors.message && (
                  <p id="message-error" className="text-red-400 text-xs mt-1 ml-1" role="alert">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Honeypot field to prevent automated spam */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("_gotcha")}
                />
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] text-white/20 font-mono">
                  {t.formPrivacy}
                </p>
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  aria-busy={formStatus === "sending"}
                  className="flex items-center gap-3 px-7 py-3.5 bg-[#66FF80] text-[#0a0a0a] rounded-full text-sm font-semibold tracking-tight hover:bg-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {formStatus === "sending" ? t.formSending : t.formButton}
                  {formStatus !== "sending" && <span aria-hidden="true">→</span>}
                </button>
              </div>

              {formStatus === "error" && (
                <p className="text-red-400/70 text-xs font-mono text-center" role="alert" aria-live="assertive">
                  {t.formError}
                </p>
              )}
            </form>
          )}
        </motion.div>


        {/* HQ + Phone */}
        <motion.div
          className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="flex flex-col items-center">
            <h4 className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase mb-4">
              {t.hq}
            </h4>
            <p className="text-sm md:text-base font-light text-white/70 leading-relaxed max-w-[220px]">
              {addressLines.map((line, i) => (
                <span key={i}>{line}{i < addressLines.length - 1 && <br />}</span>
              ))}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase mb-4">
              {t.directLine}
            </h4>
            <a
              href="tel:+84703819006"
              className="text-sm md:text-base font-light text-white/70 hover:text-[#66FF80] transition-colors duration-300"
            >
              (+84) 703 819 006
            </a>
            <span className="text-[10px] font-mono text-white/30 mt-2 uppercase tracking-widest">
              WhatsApp
            </span>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="w-full px-6 md:px-16 pb-8 flex-shrink-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          <span className="text-xs font-mono text-white/20 tracking-widest flex-1 text-center md:text-left">
            {t.footer}
          </span>
          <div className="flex items-center gap-8 md:gap-6 flex-1 justify-center">
            {/* TODO: Replace with actual Facebook page URL */}
            <a href="https://facebook.com/cbecsolutions" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-white/40 hover:text-[#66FF80] tracking-widest transition-colors uppercase">
              Facebook
            </a>
            {/* TODO: Replace with actual Instagram profile URL */}
            <a href="https://instagram.com/cbecsolutions" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-white/40 hover:text-[#66FF80] tracking-widest transition-colors uppercase">
              Instagram
            </a>
            {/* TODO: Replace with actual X/Twitter profile URL */}
            <a href="https://x.com/cbecsolutions" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-white/40 hover:text-[#66FF80] tracking-widest transition-colors uppercase">
              X
            </a>
          </div>
          {/* Legal trust signal — shown globally for transparency */}
          <span className="text-[10px] md:text-xs font-mono text-white/20 tracking-widest flex-1 text-center md:text-right">
            MST: 0319431730 · CBEC Solutions
          </span>
        </div>
      </motion.div>
    </section>
  );
}
