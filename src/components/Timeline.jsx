"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Timeline = ({ data }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(data.length - 1) * 100}%`]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressPercent = useTransform(scrollYProgress, (v) => Math.round(v * 100));

  return (
    <section ref={targetRef} className="relative" style={{ height: `${data.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Timeline Line */}
        <div className="absolute left-0 right-0 top-[45%] h-px bg-neutral-800 mx-8 md:mx-12 z-0">
          <motion.div
            style={{ width: progressWidth }}
            className="absolute left-0 top-0 h-full bg-neutral-100"
          />
        </div>

        {/* Top Loading Bar for Timeline */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-neutral-800 z-20">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-neutral-100"
          />
        </div>

        {/* Timeline Progress Indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300 z-20">
          <motion.div className="text-[10px] font-medium tracking-wider text-neutral-400 uppercase">
            <motion.span>{progressPercent}</motion.span>%
          </motion.div>
          <div className="h-px w-32 bg-neutral-800 overflow-hidden">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-neutral-100"
            />
          </div>
        </div>

        <motion.div style={{ x }} className="flex">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-8 md:px-12"
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="h-3 w-3 rounded-full bg-neutral-100" />
              </div>

              {/* Content */}
              <div className="w-full max-w-3xl">
                <div className="mb-4 text-center">
                  <h3 className="text-xs font-medium tracking-wider text-neutral-500 uppercase">
                    {item.date}
                  </h3>
                </div>

                <div className="mb-6 text-center">
                  <h2 className="text-4xl md:text-5xl font-semibold text-neutral-100 mb-4">
                    {item.title}
                  </h2>
                  <div className="h-px w-24 bg-neutral-100 mx-auto" />
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 md:p-12 shadow-xl">
                  <p className="text-base md:text-lg leading-relaxed text-neutral-300 mb-6">
                    {item.description}
                  </p>
                  
                  {/* Additional Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-neutral-800">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral-100 mb-1">
                        {item.metric1}
                      </div>
                      <div className="text-xs text-neutral-500 uppercase tracking-wider">
                        {item.label1}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral-100 mb-1">
                        {item.metric2}
                      </div>
                      <div className="text-xs text-neutral-500 uppercase tracking-wider">
                        {item.label2}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral-100 mb-1">
                        {item.metric3}
                      </div>
                      <div className="text-xs text-neutral-500 uppercase tracking-wider">
                        {item.label3}
                      </div>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-6 justify-center">
                    {item.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-neutral-800 text-neutral-300 text-xs rounded-full border border-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;