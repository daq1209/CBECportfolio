"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface CustomCursorProps {
  cursorText?: string;
  className?: string;
}

export default function CustomCursor({ cursorText = "VIEW", className }: CustomCursorProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for the cursor to follow the mouse
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 40); // Offset by half the cursor size (80px / 2)
      mouseY.set(e.clientY - 40);
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Check if the hovered element or its parent has the class 'cursor-hover-target'
      const target = e.target as HTMLElement;
      if (target.closest(".cursor-hover-target")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isHovered ? 1 : 0,
        opacity: isHovered ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-[80px] h-[80px] bg-white rounded-full mix-blend-difference z-[100] pointer-events-none flex items-center justify-center ${className || ""}`}
    >
      <span
        className="text-[#0a0a0a] text-[10px] font-mono tracking-widest uppercase font-bold"
        style={{ mixBlendMode: "normal" }}
      >
        {cursorText}
      </span>
    </motion.div>
  );
}
