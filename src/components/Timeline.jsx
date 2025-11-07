import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Timeline = ({ data }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const mainOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} style={{ minHeight: `${data.length * 100}vh` }} className="relative bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: mainOpacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.08),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.12),transparent_50%)]" />
          
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }} />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
            <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }} />
          </div>
        </motion.div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1" />
              <stop offset="33%" stopColor="#6366f1" stopOpacity="1" />
              <stop offset="66%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          
          <motion.path
            d="M 15% 10% Q 35% 25%, 50% 30% T 85% 50% Q 70% 65%, 50% 70% T 15% 90%"
            stroke="url(#trailGradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            opacity="0.3"
          />

          <motion.path
            d="M 15% 10% Q 35% 25%, 50% 30% T 85% 50% Q 70% 65%, 50% 70% T 15% 90%"
            stroke="url(#pathGradient)"
            strokeWidth="4"
            fill="none"
            filter="url(#glow)"
            style={{
              pathLength,
              opacity: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
            }}
            strokeLinecap="round"
            strokeDasharray="0 0"
          />

          {data.map((_, index) => {
            const progress = index / (data.length - 1);
            const positions = [
              { x: 15, y: 10 },
              { x: 65, y: 25 },
              { x: 85, y: 50 },
              { x: 50, y: 70 },
              { x: 15, y: 90 }
            ];
            const pos = positions[index] || positions[0];
            
            const pointOpacity = useTransform(
              scrollYProgress,
              [
                (index / data.length) - 0.05,
                index / data.length,
                (index + 1) / data.length,
                (index + 1) / data.length + 0.05
              ],
              [0, 1, 1, 0.3]
            );

            return (
              <g key={index}>
                <motion.circle
                  cx={`${pos.x}%`}
                  cy={`${pos.y}%`}
                  r="20"
                  fill="url(#pathGradient)"
                  style={{ opacity: pointOpacity }}
                  filter="url(#glow)"
                />
                <motion.circle
                  cx={`${pos.x}%`}
                  cy={`${pos.y}%`}
                  r="12"
                  fill="#000"
                  style={{ opacity: pointOpacity }}
                />
                <motion.circle
                  cx={`${pos.x}%`}
                  cy={`${pos.y}%`}
                  r="6"
                  fill="url(#pathGradient)"
                  style={{ opacity: pointOpacity }}
                />
              </g>
            );
          })}
        </svg>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 w-full">
          {data.map((item, index) => {
            const start = index / data.length;
            const end = (index + 1) / data.length;
            
            const cardOpacity = useTransform(
              scrollYProgress,
              [start - 0.08, start, end, end + 0.08],
              [0, 1, 1, 0]
            );
            
            const cardScale = useTransform(
              scrollYProgress,
              [start - 0.08, start, end, end + 0.08],
              [0.85, 1, 1, 0.85]
            );

            const cardY = useTransform(
              scrollYProgress,
              [start - 0.08, start, end, end + 0.08],
              [60, 0, 0, -60]
            );

            const cardRotate = useTransform(
              scrollYProgress,
              [start - 0.08, start, end, end + 0.08],
              [3, 0, 0, -3]
            );

            return (
              <motion.div
                key={index}
                style={{
                  opacity: cardOpacity,
                  scale: cardScale,
                  y: cardY,
                  rotateX: cardRotate
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="max-w-3xl w-full perspective-1000">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-3xl blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-500" />
                    
                    <div className="relative bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 rounded-2xl border border-gray-800/50 backdrop-blur-xl overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                      
                      <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-6">
                          <div className="relative flex-shrink-0">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-xl shadow-purple-500/30">
                              <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-xl bg-black flex items-center justify-center">
                                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                  {String(index + 1).padStart(2, '0')}
                                </span>
                              </div>
                            </div>
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 animate-pulse opacity-40 blur-xl" />
                          </div>
                          
                          <div className="flex-1">
                            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mb-1 font-medium">
                              {item.date}
                            </p>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                              {item.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                          {item.description}
                        </p>

                        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 p-4 md:p-5 bg-gradient-to-br from-gray-900/80 to-gray-950/80 rounded-xl border border-gray-800/50">
                          {item.metrics.map((metric, i) => (
                            <div key={i} className="text-center">
                              <div className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                                {metric.value}
                              </div>
                              <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-medium">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 rounded-full border border-purple-500/30 hover:border-purple-400/50 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          style={{ opacity: mainOpacity }}
          className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:gap-3"
        >
          <div className="text-[10px] md:text-xs text-gray-600 uppercase tracking-widest font-medium">
            Journey Progress
          </div>
          <div className="w-40 md:w-56 h-1 bg-gray-900 rounded-full overflow-hidden border border-gray-800/50">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 origin-left shadow-lg shadow-purple-500/50"
            />
          </div>
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.85, 1], [1, 0])
            }}
            className="text-[10px] md:text-xs text-gray-700 font-medium animate-pulse"
          >
            Continue scrolling
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Timeline;