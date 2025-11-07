import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Sparkles } from 'lucide-react';
import './css/Introduction.css';

export default function Introduction() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 20]);
  const blur = useTransform(scrollYProgress, [0, 0.3], [0, 3]);

  return (
    <div className="intro-wrapper">
      <motion.div 
        ref={containerRef}
        className="intro-container"
        style={{ scale, y, opacity }}
      >
        <motion.div 
          className="intro-background"
          style={{ filter: `blur(${blur}px)` }}
        >
          <div className="grid-pattern"></div>
          <div className="gradient-orb gradient-orb-1"></div>
          <div className="gradient-orb gradient-orb-2"></div>
          <div className="gradient-orb gradient-orb-3"></div>
          <div className="gradient-orb gradient-orb-4"></div>
          <div className="gradient-orb gradient-orb-5"></div>
          <div className="gradient-orb gradient-orb-6"></div>
        </motion.div>

      <motion.div 
        className="intro-content"
        style={{ y }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="intro-badge"
        >
          <Code2 className="badge-icon" size={16} />
          <span>CODESHACK</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="intro-title"
        >
          Where Ideas
          <br />
          <span className="title-gradient">Transform Into Reality</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="intro-description"
        >
          A collective of 70 passionate innovators, designers, and creators
          <br />
          united by curiosity and driven by excellence
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="intro-stats"
        >
          <div className="stat-item">
            <div className="stat-number">70+</div>
            <div className="stat-label">Members</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">7</div>
            <div className="stat-label">Batches</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">4</div>
            <div className="stat-label">Departments</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="scroll-indicator"
        >
          <div className="scroll-line"></div>
          <span className="scroll-text">Scroll to meet our members</span>
        </motion.div>
      </motion.div>
      </motion.div>
    </div>
  );
}