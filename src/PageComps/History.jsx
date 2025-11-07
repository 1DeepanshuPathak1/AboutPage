import TimelineCircularGallery from '../components/TimelineCircularGallery';
const History = () => {
  return (
    <div className="min-h-screen bg-neutral-950 will-change-transform">
      <section className="pt-16 md:pt-20 will-change-transform">
        <div className="text-center mb-12 md:mb-16 px-4">
          <p className="text-neutral-400 text-base md:text-lg">
            Scroll down to explore our timeline
          </p>
        </div>
        <TimelineCircularGallery />
      </section>
      <footer className="py-12 md:py-16 px-4 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-neutral-500 text-sm md:text-base">
            © 2024 CODESHACK. 70 Members Strong.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default History;