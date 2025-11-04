"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Timeline({ data }) {
  return (
    <div className="relative flex flex-col space-y-16">
      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.2,
            ease: [0.21, 1.11, 0.81, 0.99] 
          }}
          className="relative pl-10 group"
        >
          {/* Timeline line */}
          <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />
          
          {/* Animated dot */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.2 + 0.2,
              type: "spring",
              stiffness: 200
            }}
            className="absolute -left-[8px] top-2 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-purple-500/30 dark:shadow-purple-400/30 flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-white dark:bg-black opacity-25" />
            <div className="absolute inset-[2px] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
          </motion.div>

          {/* Content */}
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.3 + 0.4 }}
            className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400"
          >
            {item.title}
          </motion.h3>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.3 + 0.6 }}
            className="text-neutral-700 dark:text-neutral-300 transition-colors duration-200"
          >
            {item.content}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
