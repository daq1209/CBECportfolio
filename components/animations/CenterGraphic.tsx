"use client";

import { motion, useSpring, useTransform, MotionValue, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

interface CenterGraphicProps {
  scrollYProgress?: MotionValue<number>;
}

export default function CenterGraphic({ scrollYProgress }: CenterGraphicProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Spring animations for ultra-smooth easing
  const springConfig = { damping: 30, stiffness: 100, mass: 1.5 };
  const smoothX = useSpring(0, springConfig);
  const smoothY = useSpring(0, springConfig);

  useEffect(() => {
    smoothX.set(mousePosition.x);
    smoothY.set(mousePosition.y);
  }, [mousePosition, smoothX, smoothY]);

  // Parallax calculations
  const circleX = useTransform(smoothX, [-1, 1], [15, -15]);
  const circleY = useTransform(smoothY, [-1, 1], [15, -15]);

  const squareX = useTransform(smoothX, [-1, 1], [-25, 25]);
  const squareY = useTransform(smoothY, [-1, 1], [-25, 25]);

  const blockX = useTransform(smoothX, [-1, 1], [-50, 50]);
  const blockY = useTransform(smoothY, [-1, 1], [-50, 50]);

  // Deep background grid parallax
  const gridX = useTransform(smoothX, [-1, 1], [60, -60]);
  const gridY = useTransform(smoothY, [-1, 1], [60, -60]);

  // Scroll Progress Integrations
  const fallbackProgress = useMotionValue(0);
  const progress = scrollYProgress || fallbackProgress;
  
  // Scale from 1x to 80x to engulf the screen
  const scrollScale = useTransform(progress, [0, 0.8], [1, 80]); 
  // Transition color to white
  const scrollColor = useTransform(progress, [0, 0.5], ["#66FF80", "#ffffff"]);

  return (
    <div 
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] max-w-[700px] aspect-square flex items-center justify-center"
    >
      {/* Deep Blurred Wireframe Grid Layer */}
      <motion.div 
        className="absolute w-[200vw] h-[200vh] pointer-events-none opacity-40 blur-[5px] -z-10"
        style={{ 
          x: gridX, 
          y: gridY,
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          // Mask to fade out the grid smoothly towards the edges so it doesn't abruptly cut off
          WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 55%)',
          maskImage: 'radial-gradient(circle at center, black 0%, transparent 55%)'
        }}
      />

      {/* Outer Circle Pattern */}
      <motion.div 
        className="absolute w-full h-full rounded-full border border-white/20"
        style={{ x: circleX, y: circleY }}
      />

      {/* Inner Square Pattern (approx 70.7% to touch circle bounds) */}
      <motion.div 
        className="absolute w-[70.7%] h-[70.7%] border border-white/20 flex items-end justify-end"
        style={{ x: squareX, y: squareY }}
      >
        {/* Interactive Solid Green Square at the bottom right */}
        <motion.div 
          className="absolute w-[25%] h-[25%]"
          style={{ 
            x: blockX, 
            y: blockY, 
            scale: scrollScale,
            backgroundColor: scrollColor,
            transformOrigin: 'center center'
          }}
        />
      </motion.div>
    </div>
  );
}
