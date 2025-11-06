import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProfileCard from './ProfileCard';

const HorizontalTeamScroll = ({ members }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
    smooth: 10,
  });

  // Smoothing configuration for the horizontal movement
  const smoothConfig = {
    damping: 20,
    mass: 0.5,
    stiffness: 100,
  };

  const cardWidth = 400;
  const cardGap = 32;
  const totalWidth = members.length * (cardWidth + cardGap);
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const scrollDistance = Math.max(0, totalWidth - viewportWidth + 200);

  const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${scrollDistance}px`]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={targetRef} className="relative will-change-transform" style={{ height: `${members.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-neutral-950" style={{ willChange: 'transform' }}>
        <motion.div 
          style={{ x }} 
          className="flex gap-8 px-8 md:px-12"
          transition={smoothConfig}
        >
          {members.map((member) => (
            <div 
              key={member.id} 
              className="flex-shrink-0"
              style={{ width: `${cardWidth}px` }}
            >
              <ProfileCard
                avatarUrl={member.avatarUrl}
                name={member.name}
                title={member.title}
                handle={member.handle || member.name.toLowerCase().replace(/\s+/g, '')}
                status={member.status}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={true}
                showBehindGradient={true}
                onContactClick={() => {
                  if (member.contactUrl) {
                    window.open(member.contactUrl, '_blank');
                  }
                }}
                batch={member.batch}
                role={member.role}
              />
            </div>
          ))}
        </motion.div>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300 z-20">
        </div>
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-neutral-800 z-20">
          <motion.div 
            style={{ width: progressWidth }} 
            className="h-full bg-neutral-100"
            transition={smoothConfig}
          />
        </div>
      </div>
    </section>
  );
};

export default HorizontalTeamScroll;