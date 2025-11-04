import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Target, Rocket, Sparkles, Zap, Heart } from 'lucide-react';

// ProfileCard Component
const ProfileCard = ({ member, showUserInfo, enableTilt }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 shadow-sm hover:shadow-lg transition-all duration-300"
      style={{ minWidth: '280px', maxWidth: '280px' }}
      whileHover={enableTilt ? { y: -8, scale: 1.02 } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="aspect-square overflow-hidden bg-neutral-800">
        <img 
          src={member.avatarUrl} 
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {showUserInfo && (
        <div className="p-4">
          <h3 className="text-lg font-semibold text-neutral-100 mb-1">
            {member.name}
          </h3>
          <p className="text-sm text-neutral-400 mb-2">
            {member.title}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-500">
              {member.batch}
            </span>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <span className="text-xs text-neutral-500">
                {member.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Horizontal Scroll Team Section
const HorizontalTeamScroll = ({ members }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end end"]
  });

  const totalWidth = members.length * 296; // 280px card + 16px gap
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const scrollDistance = totalWidth - viewportWidth + 200;

  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["0%", `-${scrollDistance}px`]
  );

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressPercent = useTransform(scrollYProgress, (v) => Math.round(v * 100));

  return (
    <section ref={targetRef} className="relative" style={{ height: '250vh' }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 px-8 md:px-12">
          {members.map((member) => (
            <ProfileCard
              key={member.id}
              member={member}
              showUserInfo={true}
              enableTilt={true}
            />
          ))}
        </motion.div>

        {/* Scroll Indicator */}
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

        {/* Top Loading Bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-neutral-800 z-20">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-neutral-100"
          />
        </div>
      </div>
    </section>
  );
};

// Timeline Component
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

// Main Component
export default function TeamShowcase() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeRole, setActiveRole] = useState('all');

  // Generate team members
  const generateTeamMembers = () => {
    const roles = ["Media", "Tech", "Manager", "Design"];
    const titles = {
      Media: ["Content Creator", "Social Media Manager", "Video Editor", "Photographer"],
      Tech: ["Frontend Developer", "Backend Developer", "DevOps Engineer", "Mobile Developer"],
      Manager: ["Project Manager", "Product Manager", "Team Lead", "Operations Manager"],
      Design: ["UI/UX Designer", "Graphic Designer", "Brand Designer", "Motion Designer"]
    };
    
    const firstNames = ["Alex", "Sarah", "Marcus", "Priya", "James", "Emma", "Ryan", "Sophia", "Michael", "Olivia", "Daniel", "Ava", "David", "Mia", "Chris", "Isabella"];
    const lastNames = ["Chen", "Martinez", "Johnson", "Patel", "Brown", "Garcia", "Davis", "Rodriguez", "Wilson", "Lee", "Walker", "Hall", "Allen", "Young", "King", "Wright"];
    
    const members = [];
    
    for (let i = 1; i <= 70; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const role = roles[Math.floor(Math.random() * roles.length)];
      const title = titles[role][Math.floor(Math.random() * titles[role].length)];
      
      members.push({
        id: i,
        name: `${firstName} ${lastName}`,
        title: title,
        role: role,
        handle: `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
        status: Math.random() > 0.2 ? "Active" : "Away",
        avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?w=400&h=400&fit=crop`,
        batch: `Batch ${Math.floor((i - 1) / 10) + 1}`
      });
    }
    
    return members;
  };

  const teamMembers = generateTeamMembers();

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
      {/* About Us Section - Enhanced */}
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
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-neutral-900/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-800 group-hover:border-blue-500/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-100 mb-4 group-hover:text-blue-400 transition-colors">
                  Who We Are
                </h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  A diverse community spanning media, technology, design, and management. United by curiosity and driven by innovation, we transform ideas into reality.
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  className="h-0.5 bg-gradient-to-r from-blue-500 to-transparent mt-6"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-neutral-900/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-800 group-hover:border-purple-500/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-100 mb-4 group-hover:text-purple-400 transition-colors">
                  What We Do
                </h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  We craft exceptional digital experiences, build cutting-edge applications, and create compelling content that resonates. From concept to launch, we deliver excellence.
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  className="h-0.5 bg-gradient-to-r from-purple-500 to-transparent mt-6"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-pink-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-neutral-900/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-800 group-hover:border-pink-500/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-7 h-7 text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-100 mb-4 group-hover:text-pink-400 transition-colors">
                  Our Mission
                </h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  To empower creators, innovate fearlessly, and build products that make a meaningful impact. We're not just building projects—we're shaping the future.
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  className="h-0.5 bg-gradient-to-r from-pink-500 to-transparent mt-6"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section Header with Filters */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-3">
              Meet Our Team
            </h2>
            <p className="text-neutral-400">
              {filteredMembers.length} talented individuals across {batches.length - 1} batches
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            {/* Batch Filter */}
            <div>
              <label className="text-sm font-medium text-neutral-300 mb-2 block">
                Filter by Batch
              </label>
              <div className="flex flex-wrap gap-2">
                {batches.map(batch => (
                  <button
                    key={batch}
                    onClick={() => setActiveFilter(batch)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeFilter === batch
                        ? 'bg-neutral-100 text-neutral-900'
                        : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {batch === 'all' ? 'All Batches' : batch}
                  </button>
                ))}
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <label className="text-sm font-medium text-neutral-300 mb-2 block">
                Filter by Role
              </label>
              <div className="flex flex-wrap gap-2">
                {roles.map(role => (
                  <button
                    key={role}
                    onClick={() => setActiveRole(role)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeRole === role
                        ? 'bg-neutral-100 text-neutral-900'
                        : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {role === 'all' ? 'All Roles' : role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Hint */}
          <div className="text-center mb-4">
            <p className="text-sm text-neutral-500 uppercase tracking-wider">
              Scroll down to explore team members
            </p>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Team Section */}
      <HorizontalTeamScroll members={filteredMembers} />

      {/* Timeline Section */}
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

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-neutral-400">
            © 2024 Tech Innovation Club. 70 Members Strong.
          </p>
        </div>
      </footer>
    </div>
  );
}