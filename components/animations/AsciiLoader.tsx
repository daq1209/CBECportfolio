"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AsciiLoader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 2.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 16;
    let columns = canvas.width / fontSize;
    let drops: number[] = [];

    // Initialize drops
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * canvas.height; // start at random heights
    }

    const draw = () => {
      // Black background with slight opacity to create fading trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#66FF80"; // Terminal green
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33); // ~30fps

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = canvas.width / fontSize;
      const newDrops = [];
      for (let x = 0; x < columns; x++) {
        newDrops[x] = drops[x] || Math.random() * canvas.height;
      }
      drops = newDrops;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ 
            opacity: 0, 
            filter: "blur(10px)",
            transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden pointer-events-none"
        >
          <canvas ref={canvasRef} className="block absolute inset-0 w-full h-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
