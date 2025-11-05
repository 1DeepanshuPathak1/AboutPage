import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 800,
  INITIAL_DURATION: 2000,
  BOUNCE_DURATION: 450,
  GLOW_DURATION: 3000,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  TILT_INTENSITY: 15,
  HOVER_SCALE: 1.05,
  DEPTH: 50,
};

const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max);
const round = (value, precision = 3) => parseFloat(value.toFixed(precision));

const adjust = (value, fromMin, fromMax, toMin, toMax) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

// Apple-style easing functions
const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);
const easeOutBack = (x) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

const MinimalProfileCard = ({
  avatarUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  className = '',
  enableTilt = true,
  name = 'Javi A. Torres',
  description = 'Software engineer specializing in modern web technologies. Passionate about creating elegant solutions.',
  contactText = 'Contact',
  onContactClick,
  batch,
  role,
}) => {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null;
    let rafId = null;
    let glowRafId = null;

    const updateCardTransform = (offsetX, offsetY, card, wrap, intensity = 1) => {
      const width = card.clientWidth;
      const height = card.clientHeight;
      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);
      const centerX = percentX - 50;
      const centerY = percentY - 50;
      
      const rotateX = round(-(centerY / ANIMATION_CONFIG.TILT_INTENSITY) * intensity);
      const rotateY = round((centerX / ANIMATION_CONFIG.TILT_INTENSITY) * intensity);
      const scale = 1 + (ANIMATION_CONFIG.HOVER_SCALE - 1) * intensity;
      
      wrap.style.setProperty('--rotate-x', `${rotateX}deg`);
      wrap.style.setProperty('--rotate-y', `${rotateY}deg`);
      wrap.style.setProperty('--scale', scale);
      wrap.style.setProperty('--translate-z', `${ANIMATION_CONFIG.DEPTH * intensity}px`);
    };

    const animateGlow = (wrap, intensity = 1) => {
      const startTime = performance.now();
      
      const glowLoop = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = (elapsed % ANIMATION_CONFIG.GLOW_DURATION) / ANIMATION_CONFIG.GLOW_DURATION;
        const glowOpacity = 0.1 + Math.sin(progress * Math.PI * 2) * 0.05 * intensity;
        
        wrap.style.setProperty('--glow-opacity', glowOpacity);
        glowRafId = requestAnimationFrame(glowLoop);
      };
      
      glowRafId = requestAnimationFrame(glowLoop);
    };

    const createSmoothAnimation = (duration, startX, startY, card, wrap, intensity = 1) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const animationLoop = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeOutQuart(progress);

        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);

        updateCardTransform(currentX, currentY, card, wrap, intensity);

        if (progress < 1) {
          rafId = requestAnimationFrame(animationLoop);
        }
      };

      rafId = requestAnimationFrame(animationLoop);
    };

    const createBounceAnimation = (wrap) => {
      const startTime = performance.now();
      
      const bounceLoop = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / ANIMATION_CONFIG.BOUNCE_DURATION);
        const easedProgress = easeOutBack(progress);
        
        const scale = 0.95 + easedProgress * 0.1;
        wrap.style.setProperty('--bounce-scale', scale);
        
        if (progress < 1) {
          rafId = requestAnimationFrame(bounceLoop);
        }
      };
      
      rafId = requestAnimationFrame(bounceLoop);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      animateGlow,
      createBounceAnimation,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        if (glowRafId) {
          cancelAnimationFrame(glowRafId);
          glowRafId = null;
        }
      },
    };
  }, [enableTilt]);

  const handlePointerMove = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap || !animationHandlers) return;
      
      const rect = card.getBoundingClientRect();
      animationHandlers.updateCardTransform(
        event.clientX - rect.left,
        event.clientY - rect.top,
        card,
        wrap,
        1
      );
    },
    [animationHandlers]
  );

  const handlePointerEnter = useCallback(() => {
    if (!animationHandlers) return;
    setIsHovered(true);
    animationHandlers.cancelAnimation();
    animationHandlers.createBounceAnimation(wrapRef.current);
    animationHandlers.animateGlow(wrapRef.current, 1);
  }, [animationHandlers]);

  const handlePointerLeave = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap || !animationHandlers) return;
      
      setIsHovered(false);
      animationHandlers.createSmoothAnimation(
        ANIMATION_CONFIG.SMOOTH_DURATION,
        event.offsetX,
        event.offsetY,
        card,
        wrap,
        0
      );
      animationHandlers.animateGlow(wrapRef.current, 0);
    },
    [animationHandlers]
  );

  useEffect(() => {
    if (!enableTilt || !animationHandlers) return;
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap) return;

    card.addEventListener('pointerenter', handlePointerEnter);
    card.addEventListener('pointermove', handlePointerMove);
    card.addEventListener('pointerleave', handlePointerLeave);

    const initialX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    
    animationHandlers.updateCardTransform(initialX, initialY, card, wrap, 0.4);
    animationHandlers.createSmoothAnimation(
      ANIMATION_CONFIG.INITIAL_DURATION,
      initialX,
      initialY,
      card,
      wrap,
      0.4
    );
    animationHandlers.animateGlow(wrapRef.current, 0.4);

    return () => {
      card.removeEventListener('pointerenter', handlePointerEnter);
      card.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerleave', handlePointerLeave);
      animationHandlers.cancelAnimation();
    };
  }, [
    enableTilt,
    animationHandlers,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
  ]);

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  return (
    <div
      ref={wrapRef}
      className={`flex items-center justify-center ${className}`.trim()}
      style={{
        perspective: '1500px',
        '--rotate-x': '0deg',
        '--rotate-y': '0deg',
        '--scale': 1,
        '--bounce-scale': 1,
        '--translate-z': '0px',
        '--glow-opacity': 0.1,
      }}
    >
      {/* Subtle Glow Effect */}
      <div
        ref={glowRef}
        className="absolute inset-0 bg-white/10 opacity-10 transition-opacity duration-500"
        style={{
          opacity: 'var(--glow-opacity)',
        }}
      />
      
      <div
        ref={cardRef}
        className="relative w-[340px] bg-black border border-neutral-800 shadow-lg hover:shadow-xl overflow-hidden"
        style={{
          transform: `
            rotateX(var(--rotate-x)) 
            rotateY(var(--rotate-y)) 
            scale(var(--scale)) 
            scale(var(--bounce-scale))
            translateZ(var(--translate-z))
          `,
          transformStyle: 'preserve-3d',
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        {/* Avatar Section */}
        <div className="h-48 overflow-hidden relative">
          <img
            className="w-full h-full object-cover transition-all duration-700 ease-out"
            style={{
              transform: isHovered ? 'scale(1.15) translateZ(25px)' : 'scale(1.05) translateZ(15px)',
              filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)',
            }}
            src={avatarUrl}
            alt={`${name} avatar`}
            loading="lazy"
          />
        </div>

        {/* Content Section */}
        <div 
          className="p-6 relative"
          style={{
            transform: 'translateZ(30px)',
          }}
        >
          {/* Name & Meta Info */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">
              {name}
            </h3>
            {(batch || role) && (
              <div className="flex flex-wrap gap-2 mb-3">
                {batch && (
                  <span className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs font-medium">
                    {batch}
                  </span>
                )}
                {role && (
                  <span className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs font-medium">
                    {role}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-sm text-neutral-400 leading-relaxed tracking-normal">
              {description}
            </p>
          </div>

          {/* Contact Button */}
          <button
            className="w-full px-4 py-3 bg-white text-black text-sm font-medium hover:bg-neutral-100 active:scale-95 transition-all duration-300 overflow-hidden group relative border border-white"
            onClick={handleContactClick}
            type="button"
            style={{
              transform: 'translateZ(25px)',
            }}
          >
            {/* Minimal shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10 tracking-wide">{contactText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Team Section Component that integrates both
const TeamSection = ({ members = [] }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeRole, setActiveRole] = useState('all');
  const [filteredMembers, setFilteredMembers] = useState(members);

  // Extract unique batches and roles from members
  const batches = useMemo(() => {
    const uniqueBatches = [...new Set(members.map(member => member.batch))];
    return ['all', ...uniqueBatches.sort()];
  }, [members]);

  const roles = useMemo(() => {
    const uniqueRoles = [...new Set(members.map(member => member.role))];
    return ['all', ...uniqueRoles.sort()];
  }, [members]);

  // Filter members based on active filters
  useEffect(() => {
    const filtered = members.filter(member => {
      const batchMatch = activeFilter === 'all' || member.batch === activeFilter;
      const roleMatch = activeRole === 'all' || member.role === activeRole;
      return batchMatch && roleMatch;
    });
    setFilteredMembers(filtered);
  }, [members, activeFilter, activeRole]);

  const handleContactClick = (member) => {
    // Handle contact logic here
    console.log('Contacting:', member.name);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Team Filters */}
      <TeamFilters
        batches={batches}
        roles={roles}
        activeFilter={activeFilter}
        activeRole={activeRole}
        setActiveFilter={setActiveFilter}
        setActiveRole={setActiveRole}
        filteredMembersCount={filteredMembers.length}
      />

      {/* Team Grid */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredMembers.map((member, index) => (
                <MinimalProfileCard
                  key={member.id || index}
                  avatarUrl={member.avatarUrl}
                  name={member.name}
                  description={member.description}
                  batch={member.batch}
                  role={member.role}
                  contactText="Contact"
                  onContactClick={() => handleContactClick(member)}
                  enableTilt={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-400 text-lg">No team members found matching the current filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const ProfileCard = React.memo(MinimalProfileCard);
export { ProfileCard, TeamSection };
export default ProfileCard;