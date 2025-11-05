import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProfileCard from './profilecard.jsx'; // ✅ Import your existing component

// HorizontalTeamScroll Component
const HorizontalTeamScroll = ({ members }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const totalWidth = members.length * 296;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const scrollDistance = totalWidth - viewportWidth + 200;

  const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${scrollDistance}px`]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressPercent = useTransform(scrollYProgress, (v) => Math.round(v * 100));

  return (
    <section ref={targetRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 px-8 md:px-12">
          {members.map((member) => (
            <ProfileCard
              key={member.id}
              avatarUrl={member.avatarUrl}
              name={member.name}
              title={member.title}
              handle={member.handle || member.name.toLowerCase().replace(/\s+/g, '')}
              status={member.status}
              showUserInfo={true}
              enableTilt={true}
              className="min-w-[280px] max-w-[280px]"
              onContactClick={() => window.open(member.contactUrl || '#', '_blank')}
            />
          ))}
        </motion.div>

        {/* Scroll Progress Indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300 z-20">
          <motion.div className="text-[10px] font-medium tracking-wider text-neutral-400 uppercase">
            <motion.span>{progressPercent}</motion.span>%
          </motion.div>
          <div className="h-px w-32 bg-neutral-800 overflow-hidden">
            <motion.div style={{ width: progressWidth }} className="h-full bg-neutral-100" />
          </div>
        </div>

        {/* Top Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-neutral-800 z-20">
          <motion.div style={{ width: progressWidth }} className="h-full bg-neutral-100" />
        </div>
      </div>
    </section>
  );
};

// Demo App
export default function App() {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'Lead Designer',
      handle: 'sarahchen',
      status: 'Online',
    //   avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      title: 'Backend Engineer',
      handle: 'marcusdev',
      status: 'Online',
    //   avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    },
    {
      id: 3,
      name: 'Emily Watson',
      title: 'Product Manager',
      handle: 'emilyw',
    //   status: 'Away',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    },
    {
      id: 4,
      name: 'James Kim',
      title: 'Frontend Developer',
      handle: 'jameskim',
      status: 'Online',
    //   avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    },
    {
      id: 5,
      name: 'Olivia Martinez',
      title: 'UX Researcher',
      handle: 'oliviam',
      status: 'Online',
    //   avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    },
    {
      id: 6,
      name: 'David Thompson',
      title: 'DevOps Engineer',
      handle: 'davidthompson',
      status: 'Online',
    //   avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    },
  ];

  return (
    <div className="">
        <div>
        <HorizontalTeamScroll members={teamMembers} />
      </div>

      

      
    </div>
  );
}
