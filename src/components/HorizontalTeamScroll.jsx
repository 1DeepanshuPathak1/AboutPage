import { useRef, useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import ProfileCard from './ProfileCard';
import './HorizontalTeamScroll.css';

const HorizontalTeamScroll = ({ members }) => {
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const cardWidth = 280;
  const cardGap = 50;

  useLayoutEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const totalWidth = members.length * (cardWidth + cardGap) - cardGap;
        setContainerWidth(totalWidth);
        setWindowWidth(window.innerWidth);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [members.length, cardWidth, cardGap]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    mass: 0.5,
    stiffness: 200,
    restDelta: 0.001
  });

  const distance = containerWidth - windowWidth;
  const x = useTransform(smoothProgress, [0, 1], [0, -distance]);
  const springX = useSpring(x, {
    damping: 50,
    mass: 0.5,
    stiffness: 200,
    restDelta: 0.001
  });

  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const smoothConfig = {
    damping: 50,
    mass: 0.5,
    stiffness: 200,
    restDelta: 0.001
  };

  return (
    <section 
      ref={targetRef}
      className="scroll-section" 
      style={{ height: `${members.length * 80}vh` }}
    >
      <div className="scroll-container">
        <motion.div 
          ref={containerRef}
          style={{ 
            x: springX,
            gap: `${cardGap}px`,
            display: 'flex',
            padding: '0 32px'
          }}
          layoutScroll
        >
          {members.map((member) => (
            <motion.div 
              key={member.id} 
              style={{ 
                width: `${cardWidth}px`,
                maxHeight: '75vh',
                flexShrink: 0,
                willChange: 'transform',
                WebkitBackfaceVisibility: 'hidden',
              }}
              layout
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
            </motion.div>
          ))}
        </motion.div>

        <div className="progress-bar">
          <motion.div 
            style={{ width: progressWidth }} 
            className="progress-indicator"
            transition={smoothConfig}
          />
        </div>
      </div>
    </section>
  );
};

export default HorizontalTeamScroll;