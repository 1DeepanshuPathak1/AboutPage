import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import ProfileCard from './ProfileCard';
import './HorizontalTeamScroll.css';

const HorizontalTeamScroll = ({ members }) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});

  const cardWidth = 280;
  const cardGap = 50;

  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, {
    damping: 50,
    mass: 0.5,
    stiffness: 200,
    restDelta: 0.001
  });

  useEffect(() => {
    scrollProgress.set(0);
    setFlippedCards({});
  }, [members, scrollProgress]);

  useLayoutEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const totalWidth = members.length * (cardWidth + cardGap) - cardGap + 64;
        setContainerWidth(totalWidth);
        setWindowWidth(window.innerWidth);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [members.length]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e) => {
      if (!isHovered) return;

      const delta = e.deltaY * 0.8;
      const maxScroll = containerWidth - windowWidth;
      const currentScroll = scrollProgress.get();
      
      if (currentScroll >= maxScroll && delta > 0) {
        return;
      }
      
      if (currentScroll <= 0 && delta < 0) {
        return;
      }

      e.preventDefault();
      const newScroll = Math.max(0, Math.min(maxScroll, currentScroll + delta));
      scrollProgress.set(newScroll);
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      section.removeEventListener('wheel', handleWheel);
    };
  }, [isHovered, containerWidth, windowWidth, scrollProgress]);

  const x = useTransform(smoothProgress, (value) => -value);
  const progressWidth = useTransform(smoothProgress, 
    [0, containerWidth - windowWidth], 
    ["0%", "100%"]
  );

  const handleFlip = (memberId) => {
    setFlippedCards(prev => ({
      ...prev,
      [memberId]: !prev[memberId]
    }));
  };

  return (
    <section 
      ref={sectionRef}
      className="scroll-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="scroll-container">
        <motion.div 
          ref={containerRef}
          className="cards-wrapper"
          style={{ x }}
        >
          {members.map((member) => (
            <div 
              key={member.id} 
              className="card-item"
            >
              <ProfileCard
                avatarUrl={member.avatarUrl}
                iconUrl={member.iconUrl}
                name={member.name}
                title={member.title}
                handle={member.handle || member.name.toLowerCase().replace(/\s+/g, '')}
                status={member.status}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={true}
                showBehindGradient={true}
                isFlipped={flippedCards[member.id]}
                onFlipClick={() => handleFlip(member.id)}
                memberDetails={member.memberDetails}
                batch={member.batch}
                role={member.role}
              />
            </div>
          ))}
        </motion.div>

        <div className="progress-bar">
          <motion.div 
            style={{ width: progressWidth }} 
            className="progress-indicator"
          />
        </div>
      </div>
    </section>
  );
};

export default HorizontalTeamScroll;