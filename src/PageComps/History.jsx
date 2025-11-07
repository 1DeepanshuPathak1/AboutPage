import React from 'react';
import Timeline from '../components/Timeline';

const timelineData = [
  {
    date: "January 2024",
    title: "Foundation",
    description: "Started our journey with a vision to build a community of passionate innovators. We brought together diverse talents from various disciplines to create something extraordinary. This marked the beginning of an ambitious project that would grow beyond our initial expectations.",
    metrics: [
      { value: "10", label: "Founding Members" },
      { value: "3", label: "Core Teams" },
      { value: "1", label: "Shared Vision" }
    ],
    tags: ["Launch", "Community", "Innovation"]
  },
  {
    date: "March 2024",
    title: "First Projects",
    description: "Launched our first collaborative projects, establishing workflows and best practices. Our teams worked seamlessly across departments to deliver exceptional results. We learned valuable lessons about collaboration, communication, and the power of diverse perspectives working toward common goals.",
    metrics: [
      { value: "5", label: "Projects Launched" },
      { value: "25", label: "Active Members" },
      { value: "100%", label: "Success Rate" }
    ],
    tags: ["Development", "Collaboration", "Growth"]
  },
  {
    date: "June 2024",
    title: "Community Growth",
    description: "Expanded to 70 members across 7 batches, creating a thriving ecosystem of creativity and innovation. Each batch brought unique perspectives and skills. We established mentorship programs, knowledge-sharing sessions, and collaborative initiatives that strengthened our community bonds.",
    metrics: [
      { value: "70", label: "Total Members" },
      { value: "7", label: "Active Batches" },
      { value: "4", label: "Departments" }
    ],
    tags: ["Expansion", "Diversity", "Mentorship"]
  },
  {
    date: "September 2024",
    title: "Recognition",
    description: "Achieved significant milestones and received recognition for our innovative approach to team collaboration and project delivery. Our work garnered attention from industry leaders and fellow innovators. We showcased our projects at major events and received accolades for our commitment to excellence.",
    metrics: [
      { value: "15", label: "Awards" },
      { value: "50K+", label: "Community Reach" },
      { value: "20+", label: "Partnerships" }
    ],
    tags: ["Achievement", "Recognition", "Impact"]
  },
  {
    date: "November 2024",
    title: "Today",
    description: "Continuing to push boundaries, explore new technologies, and build products that make a difference. Our journey has just begun. We're investing in cutting-edge research, fostering innovation, and creating opportunities for our members to excel. The future holds unlimited potential as we scale our impact.",
    metrics: [
      { value: "30+", label: "Active Projects" },
      { value: "∞", label: "Possibilities" },
      { value: "100%", label: "Commitment" }
    ],
    tags: ["Future", "Innovation", "Excellence"]
  }
];

const History = () => {
  return (
    <div className="min-h-screen bg-neutral-950 will-change-transform">
      <section className="pt-16 md:pt-20 will-change-transform">
        <div className="text-center mb-12 md:mb-16 px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-100 mb-4">
            Our Journey
          </h2>
          <p className="text-neutral-400 text-base md:text-lg">
            Scroll down to explore our timeline
          </p>
        </div>
        <Timeline data={timelineData} />
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