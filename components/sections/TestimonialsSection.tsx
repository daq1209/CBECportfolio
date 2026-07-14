"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "CBEC delivered our MVP in 8 weeks flat. The codebase is incredibly clean, and the communication was better than local agencies we've worked with in Sydney.",
    author: "David Chen",
    role: "Founder, PropTech Startup (Sydney)",
  },
  {
    quote: "They don't just write code; they actually understand the business goal. The conversion rate on our new platform increased by 140% in the first month.",
    author: "Sarah Jenkins",
    role: "Marketing Director, FinServe Group",
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-32 md:py-48 bg-[#0f0f0f] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-transparent h-32" />
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <div className="w-2 h-2 rounded-full bg-[#66FF80]" />
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-white/50">
            Client Voices
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Giant quote mark */}
              <span className="absolute -top-12 -left-6 text-8xl text-white/5 font-serif select-none" aria-hidden="true">
                &quot;
              </span>
              
              <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed tracking-tight text-white/90 mb-8 relative z-10">
                &quot;{testimonial.quote}&quot;
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-mono text-sm text-[#66FF80]">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {testimonial.author}
                  </h4>
                  <p className="text-xs font-mono text-white/40 mt-1">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
