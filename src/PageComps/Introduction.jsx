import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import AboutSection from '../components/AboutSection';
import './css/Introduction.css';

const FloatingElement = ({ children, delay = 0, duration = 4 }) => {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default function Introduction() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollYProgress } = useScroll();

  const handleMouseMove = (e) => {
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const springConfig = { damping: 25, stiffness: 100 };
  const moveX = useSpring(mouseX, springConfig);
  const moveY = useSpring(mouseY, springConfig);

  const glowX = useTransform(moveX, [0, 1], ["-20%", "120%"]);
  const glowY = useTransform(moveY, [0, 1], ["-20%", "120%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <motion.div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-neutral-950 will-change-transform overflow-hidden"
      style={{ opacity }}
    >
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement delay={0}>
          <div className="absolute top-[15%] left-[10%] w-8 h-8 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 blur-lg" />
        </FloatingElement>
        <FloatingElement delay={1.2} duration={5}>
          <div className="absolute top-[45%] right-[15%] w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-lg" />
        </FloatingElement>
        <FloatingElement delay={0.5} duration={6}>
          <div className="absolute bottom-[20%] left-[20%] w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-lg" />
        </FloatingElement>
      </div>

      {/* Moving Gradient Background */}
      <motion.div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background: "radial-gradient(circle 400px at var(--x) var(--y), rgba(120,100,255,0.1), transparent 80%)",
          "--x": glowX,
          "--y": glowY,
        }}
      />

      {/* Content */}
      <AboutSection />
    </motion.div>
  );
}
