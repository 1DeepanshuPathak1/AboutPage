import React, { useEffect, useRef, useState } from 'react';

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const start = rect.top - windowHeight * 0.1;
      const end = rect.bottom - windowHeight * 0.5;
      const total = end - start;
      const progress = Math.max(0, Math.min(1, -start / total));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heightTransform = scrollProgress * height;
  const opacityTransform = Math.min(1, scrollProgress * 10);

  return (
    <div className="w-full bg-gradient-to-br from-neutral-50 via-blue-50/20 to-purple-50/20 dark:from-neutral-900 dark:via-blue-950/20 dark:to-purple-950/20 font-sans md:px-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent max-w-4xl">
          Our Journey
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl max-w-2xl">
          A timeline of our milestones, achievements, and the evolution of our products.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 pl-8 md:pl-0">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="absolute -left-8 md:left-3 h-12 w-12 rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center shadow-xl border-4 border-neutral-100 dark:border-neutral-800">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 animate-pulse" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-12 md:pl-4 pr-4 w-full">
              <h3 className="md:hidden block text-2xl mb-6 text-left font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        
        <div
          style={{ height: height + 'px' }}
          className="absolute left-0 md:left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-neutral-300 dark:via-neutral-700 to-transparent"
        >
          <div
            style={{
              height: heightTransform + 'px',
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent rounded-full transition-all duration-100"
          />
        </div>
      </div>
    </div>
  );
};

export default function TimelineDemo() {
  const ImageCard = ({ src, alt }) => (
    <div className="relative group overflow-hidden rounded-xl shadow-lg bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:scale-105 cursor-pointer">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-white text-sm font-medium drop-shadow-lg">
          {alt}
        </p>
      </div>
    </div>
  );

  const TimelineText = ({ children, className = "" }) => (
    <p className={`text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 ${className}`}>
      {children}
    </p>
  );

  const data = [
    {
      title: "2024",
      content: (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-blue-50/90 to-indigo-50/90 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-xl p-6 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/30 shadow-lg">
            <TimelineText className="border-l-4 border-blue-500/50 pl-4 font-medium">
              <span className="inline-block text-2xl mb-2">🚀</span>{' '}
              Built and launched Aceternity UI and Aceternity UI Pro from scratch
            </TimelineText>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "https://assets.aceternity.com/templates/startup-1.webp",
              "https://assets.aceternity.com/templates/startup-2.webp",
              "https://assets.aceternity.com/templates/startup-3.webp",
              "https://assets.aceternity.com/templates/startup-4.webp",
            ].map((src, i) => (
              <ImageCard key={i} src={src} alt={`Startup Template ${i + 1}`} />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl p-6 border border-green-100 dark:border-green-800/30">
            <TimelineText className="border-l-4 border-green-500 pl-4">
              I usually run out of copy, but when I see content this big, I try to integrate lorem ipsum.
            </TimelineText>
          </div>
          <div className="bg-white/60 dark:bg-neutral-800/60 rounded-2xl p-6 backdrop-blur-md border border-neutral-200/30 dark:border-neutral-700/40">
            <TimelineText>
              Lorem ipsum is for people who are too lazy to write copy. But we are not. Here are some more examples of beautiful designs I built.
            </TimelineText>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              ["https://assets.aceternity.com/pro/hero-sections.png", "Hero Sections"],
              ["https://assets.aceternity.com/features-section.png", "Feature Sections"],
              ["https://assets.aceternity.com/pro/bento-grids.png", "Bento Grids"],
              ["https://assets.aceternity.com/cards.png", "Card Components"],
            ].map(([src, alt], i) => (
              <ImageCard key={i} src={src} alt={alt} />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Changelog",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800/30">
            <TimelineText className="font-semibold">
              📦 Deployed 5 new components on Aceternity today
            </TimelineText>
          </div>

          <div className="space-y-3">
            {[
              "Card grid component",
              "Enhanced timeline animations",
              "Interactive image galleries",
              "Dark mode optimizations",
              "Responsive design improvements",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-white/60 dark:bg-neutral-800/60 rounded-xl backdrop-blur-sm hover:bg-white/80 dark:hover:bg-neutral-800/80 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  ✓
                </div>
                <span className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {[
              ["https://assets.aceternity.com/pro/hero-sections.png", "Hero Template"],
              ["https://assets.aceternity.com/features-section.png", "Features Template"],
            ].map(([src, alt], i) => (
              <ImageCard key={i} src={src} alt={alt} />
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Timeline data={data} />
      
      <div className="text-center py-20">
        <p className="text-neutral-500 dark:text-neutral-500 text-sm animate-pulse">
          The journey continues... 🚀
        </p>
      </div>
    </div>
  );
}