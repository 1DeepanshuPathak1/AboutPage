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
    <div className="w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-neutral-950 dark:via-blue-950/10 dark:to-purple-950/10 font-sans" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-16 md:py-24 px-6 md:px-12">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Our Journey
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            A timeline of our milestones, achievements, and the evolution of our products.
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Timeline Line */}
          <div
            style={{ height: height + 'px' }}
            className="absolute left-6 md:left-12 top-0 w-[3px] bg-gradient-to-b from-transparent via-neutral-200 dark:via-neutral-800 to-transparent"
          >
            <div
              style={{
                height: heightTransform + 'px',
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-t from-purple-600 via-blue-500 to-cyan-400 rounded-full shadow-lg shadow-blue-500/50"
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-32">
            {data.map((item, index) => (
              <div key={index} className="relative">
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-6 top-8 md:top-0 z-10">
                  <div className="relative">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-purple-500/30 ring-4 ring-white dark:ring-neutral-950">
                      <div className="h-6 w-6 rounded-full bg-white dark:bg-neutral-950 animate-pulse" />
                    </div>
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 blur-xl opacity-40 animate-pulse" />
                  </div>
                </div>

                {/* Content */}
                <div className="ml-24 md:ml-32">
                  {/* Title */}
                  <div className="mb-8">
                    <h3 className="text-3xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      {item.title}
                    </h3>
                    <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                  </div>

                  {/* Content Card */}
                  <div className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-200/50 dark:border-neutral-800/50 p-8 md:p-12 hover:shadow-purple-500/10 hover:shadow-3xl transition-all duration-500">
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TimelineDemo() {
  const ImageCard = ({ src, alt }) => (
    <div className="group relative overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-800 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] cursor-pointer">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-white text-base font-semibold drop-shadow-2xl">
          {alt}
        </p>
      </div>
    </div>
  );

  const data = [
    {
      title: "2024",
      content: (
        <div className="space-y-10">
          {/* Header Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-2xl p-8 border border-blue-200/60 dark:border-blue-800/40 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-4xl">🚀</div>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-blue-900 dark:text-blue-100 mb-3">
                  Major Launch
                </h4>
                <p className="text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                  Built and launched Aceternity UI and Aceternity UI Pro from scratch, bringing modern design components to thousands of developers.
                </p>
              </div>
            </div>
          </div>

          {/* Images Grid */}
          <div>
            <h5 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-6">
              Product Showcase
            </h5>
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
        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div className="space-y-10">
          {/* Text Cards */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950/50 dark:to-green-950/50 rounded-2xl p-8 border border-emerald-200/60 dark:border-emerald-800/40 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-4xl">✨</div>
                <div>
                  <h4 className="text-xl md:text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-3">
                    Design Philosophy
                  </h4>
                  <p className="text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                    I usually run out of copy, but when I see content this big, I try to integrate lorem ipsum.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 dark:bg-neutral-800/90 rounded-2xl p-8 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-700/60 shadow-xl">
              <p className="text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                Lorem ipsum is for people who are too lazy to write copy. But we are not. Here are some more examples of beautiful designs I built.
              </p>
            </div>
          </div>

          {/* Images Grid */}
          <div>
            <h5 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-6">
              Design Gallery
            </h5>
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
        </div>
      ),
    },
    {
      title: "Changelog",
      content: (
        <div className="space-y-10">
          {/* Header Card */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/50 dark:to-pink-950/50 rounded-2xl p-8 border border-purple-200/60 dark:border-purple-800/40 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-4xl">📦</div>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-purple-900 dark:text-purple-100 mb-3">
                  Recent Updates
                </h4>
                <p className="text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                  Deployed 5 new components on Aceternity today
                </p>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div>
            <h5 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-6">
              What's New
            </h5>
            <div className="space-y-4">
              {[
                "Card grid component",
                "Enhanced timeline animations",
                "Interactive image galleries",
                "Dark mode optimizations",
                "Responsive design improvements",
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-4 p-5 bg-white/80 dark:bg-neutral-800/80 rounded-xl backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 hover:bg-white dark:hover:bg-neutral-800 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    ✓
                  </div>
                  <span className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Images Grid */}
          <div>
            <h5 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-6">
              Preview
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                ["https://assets.aceternity.com/pro/hero-sections.png", "Hero Template"],
                ["https://assets.aceternity.com/features-section.png", "Features Template"],
              ].map(([src, alt], i) => (
                <ImageCard key={i} src={src} alt={alt} />
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-neutral-950 dark:to-blue-950/10">
      <Timeline data={data} />
      
      <div className="text-center py-24">
        <p className="text-neutral-500 dark:text-neutral-500 text-base font-medium animate-pulse">
          The journey continues... 🚀
        </p>
      </div>
    </div>
  );
}