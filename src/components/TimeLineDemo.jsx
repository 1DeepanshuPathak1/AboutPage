import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';

export const Timeline = ({ data }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(data.length - 1) * 100}%`]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressPercent = useTransform(scrollYProgress, (v) => Math.round(v * 100));

  return (
    <section ref={targetRef} className="relative bg-neutral-50 dark:bg-neutral-950" style={{ height: `${data.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Timeline Line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-neutral-200 dark:bg-neutral-800 mx-8 md:mx-12 z-0">
          <motion.div
            style={{ width: progressWidth }}
            className="absolute left-0 top-0 h-full bg-neutral-900 dark:bg-neutral-100 transition-all duration-150"
          />
        </div>

        <motion.div style={{ x }} className="flex gap-0">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-8 md:px-12 relative"
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="h-3 w-3 bg-neutral-900 dark:bg-neutral-100" />
              </div>

              {/* Content */}
              <div className="w-full max-w-2xl">
                {/* Date */}
                <div className="mb-6 text-center">
                  <h3 className="text-xs font-medium tracking-wider text-neutral-400 dark:text-neutral-600 uppercase">
                    {item.date}
                  </h3>
                </div>

                {/* Title */}
                <div className="mb-8 text-center">
                  <h2 className="text-3xl md:text-4xl font-medium text-neutral-900 dark:text-neutral-100 mb-4">
                    {item.title}
                  </h2>
                  <div className="h-px w-16 bg-neutral-900 dark:bg-neutral-100 mx-auto" />
                </div>

                {/* Description */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 md:p-12 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 max-w-2xl mx-auto">
                  <p className="text-sm md:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300 z-20">
          <motion.div className="text-[10px] font-medium tracking-wider text-neutral-600 dark:text-neutral-400 uppercase">
            <motion.span>{progressPercent}</motion.span>%
          </motion.div>
          <div className="h-px w-32 bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-neutral-900 dark:bg-neutral-100"
            />
          </div>
        </div>

        {/* Top Loading Bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-neutral-200 dark:bg-neutral-800 z-20">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-neutral-900 dark:bg-neutral-100"
          />
        </div>

        {/* Scroll Hint */}
        <motion.div 
          className="absolute bottom-20 left-1/2 -translate-x-1/2 text-xs text-neutral-400 dark:text-neutral-600 uppercase tracking-wider z-20"
          style={{ opacity: useTransform(scrollYProgress, [0.9, 1], [1, 0]) }}
        >
          Scroll to continue
        </motion.div>
      </div>
    </section>
  );
};

export default function TimelineDemo() {
  const data = [
    {
      date: "January 2024",
      title: "Major Launch",
      description:
        "Built and launched Aceternity UI and Aceternity UI Pro from scratch. A complete design system with over 100 components and templates. This milestone marked the beginning of a new era in modern web design, providing developers with powerful tools to create stunning interfaces with minimal effort.",
    },
    {
      date: "March 2023",
      title: "Design Philosophy",
      description:
        "Created beautiful design systems and component libraries. Focused on modern aesthetics and developer experience. Every component was crafted with attention to detail, ensuring consistency across different projects while maintaining flexibility for customization.",
    },
    {
      date: "July 2023",
      title: "Component Library",
      description:
        "Released the first version of the component library with 50+ reusable components built with React and Tailwind CSS. The library was designed to be lightweight, performant, and easy to integrate into any project, with comprehensive documentation and examples.",
    },
    {
      date: "October 2023",
      title: "Dark Mode",
      description:
        "Introduced comprehensive dark mode support across all components with seamless theme switching. The implementation respects system preferences and allows users to manually toggle themes, providing an optimal viewing experience in any lighting condition.",
    },
    {
      date: "December 2023",
      title: "Pro Templates",
      description:
        "Launched premium templates for SaaS, marketing, and portfolio sites. Production-ready and fully customizable. Each template was built with real-world use cases in mind, incorporating best practices for performance, accessibility, and SEO.",
    },
    {
      date: "February 2024",
      title: "Recent Updates",
      description:
        "Deployed new components including card grids, timeline animations, image galleries, and responsive design improvements. Continued commitment to excellence through regular updates, bug fixes, and feature enhancements based on community feedback.",
    },
  ];

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-950">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-medium text-neutral-900 dark:text-neutral-100 mb-6">
            Our Journey
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
            Scroll down to explore the timeline
          </p>
          <div className="h-px w-24 bg-neutral-900 dark:bg-neutral-100 mx-auto" />
        </div>
      </div>

      {/* Timeline Section */}
      <Timeline data={data} />

      {/* Content After Timeline */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-medium text-neutral-900 dark:text-neutral-100 mb-6">
            What's Next
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
            Continue exploring more content below
          </p>
          <div className="h-px w-24 bg-neutral-900 dark:bg-neutral-100 mx-auto" />
        </div>
      </div>
    </div>
  );
}