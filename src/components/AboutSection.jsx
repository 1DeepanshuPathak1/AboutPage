"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Sparkles, Zap, Heart } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="relative py-32 px-4 md:px-8 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 -left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-neutral-300">Building Tomorrow, Today</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-neutral-100 mb-8 leading-tight"
          >
            We Build The{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Future
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 -z-10"
              />
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed"
          >
            A collective of 70 passionate innovators, designers, and creators pushing the boundaries of what's possible.
          </motion.p>
        </div>

        {/* Three Columns - Enhanced */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Users,
              color: "blue",
              title: "Who We Are",
              description: "A diverse community spanning media, technology, design, and management. United by curiosity and driven by innovation, we transform ideas into reality."
            },
            {
              icon: Zap,
              color: "purple",
              title: "What We Do",
              description: "We craft exceptional digital experiences, build cutting-edge applications, and create compelling content that resonates. From concept to launch, we deliver excellence."
            },
            {
              icon: Heart,
              color: "pink",
              title: "Our Mission",
              description: "To empower creators, innovate fearlessly, and build products that make a meaningful impact. We're not just building projects—we're shaping the future."
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/10 to-${item.color}-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100`} />
              <div className={`relative bg-neutral-900/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-800 group-hover:border-${item.color}-500/50 transition-all duration-300`}>
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${item.color}-500/20 to-${item.color}-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-7 h-7 text-${item.color}-400`} />
                </div>
                <h3 className={`text-2xl font-bold text-neutral-100 mb-4 group-hover:text-${item.color}-400 transition-colors`}>
                  {item.title}
                </h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  {item.description}
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  className={`h-0.5 bg-gradient-to-r from-${item.color}-500 to-transparent mt-6`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;