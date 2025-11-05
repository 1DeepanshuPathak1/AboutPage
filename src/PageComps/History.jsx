import React, { useState } from 'react';
import AboutSection from '../components/AboutSection';
import HorizontalTeamScroll from '../components/HorizontalTeamScroll';
import Timeline from '../components/Timeline';
import TeamFilters from '../components/TeamFilters';
import { generateTeamMembers } from '../utils/teamData';

// Timeline data
const timelineData = [
  {
    date: "January 2024",
    title: "Foundation",
    description: "Started our journey with a vision to build a community of passionate innovators. We brought together diverse talents from various disciplines to create something extraordinary. This marked the beginning of an ambitious project that would grow beyond our initial expectations.",
    metric1: "10",
    label1: "Founding Members",
    metric2: "3",
    label2: "Core Teams",
    metric3: "1",
    label3: "Shared Vision",
    tags: ["Launch", "Community", "Innovation"]
  },
  {
    date: "March 2024",
    title: "First Projects",
    description: "Launched our first collaborative projects, establishing workflows and best practices. Our teams worked seamlessly across departments to deliver exceptional results. We learned valuable lessons about collaboration, communication, and the power of diverse perspectives working toward common goals.",
    metric1: "5",
    label1: "Projects Launched",
    metric2: "25",
    label2: "Active Members",
    metric3: "100%",
    label3: "Success Rate",
    tags: ["Development", "Collaboration", "Growth"]
  },
  {
    date: "June 2024",
    title: "Community Growth",
    description: "Expanded to 70 members across 7 batches, creating a thriving ecosystem of creativity and innovation. Each batch brought unique perspectives and skills. We established mentorship programs, knowledge-sharing sessions, and collaborative initiatives that strengthened our community bonds.",
    metric1: "70",
    label1: "Total Members",
    metric2: "7",
    label2: "Active Batches",
    metric3: "4",
    label3: "Departments",
    tags: ["Expansion", "Diversity", "Mentorship"]
  },
  {
    date: "September 2024",
    title: "Recognition",
    description: "Achieved significant milestones and received recognition for our innovative approach to team collaboration and project delivery. Our work garnered attention from industry leaders and fellow innovators. We showcased our projects at major events and received accolades for our commitment to excellence.",
    metric1: "15",
    label1: "Awards",
    metric2: "50K+",
    label2: "Community Reach",
    metric3: "20+",
    label3: "Partnerships",
    tags: ["Achievement", "Recognition", "Impact"]
  },
  {
    date: "November 2024",
    title: "Today",
    description: "Continuing to push boundaries, explore new technologies, and build products that make a difference. Our journey has just begun. We're investing in cutting-edge research, fostering innovation, and creating opportunities for our members to excel. The future holds unlimited potential as we scale our impact.",
    metric1: "30+",
    label1: "Active Projects",
    metric2: "∞",
    label2: "Possibilities",
    metric3: "100%",
    label3: "Commitment",
    tags: ["Future", "Innovation", "Excellence"]
  }
];

const TeamShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeRole, setActiveRole] = useState('all');

  const teamMembers = generateTeamMembers();

  // Filter members
  const filteredMembers = teamMembers.filter(member => {
    const batchMatch = activeFilter === 'all' || member.batch === activeFilter;
    const roleMatch = activeRole === 'all' || member.role === activeRole;
    return batchMatch && roleMatch;
  });

  // Get unique batches and roles
  const batches = ['all', ...Array.from(new Set(teamMembers.map(m => m.batch)))];
  const roles = ['all', 'Media', 'Tech', 'Manager', 'Design'];

  return (
    <div className="min-h-screen bg-neutral-950">
      <AboutSection />
      <TeamFilters 
        batches={batches}
        roles={roles}
        activeFilter={activeFilter}
        activeRole={activeRole}
        setActiveFilter={setActiveFilter}
        setActiveRole={setActiveRole}
        filteredMembersCount={filteredMembers.length}
      />
      <HorizontalTeamScroll members={filteredMembers} />
      <section className="mt-16">
        <div className="text-center mb-8 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-3">
            Our Journey
          </h2>
          <p className="text-neutral-400">
            Scroll down to explore our timeline
          </p>
        </div>
        <Timeline data={timelineData} />
      </section>
      <footer className="py-12 px-4 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-neutral-400">
            © 2024 CODESHACK. 70 Members Strong.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TeamShowcase;