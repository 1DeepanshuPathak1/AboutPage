import React, { useEffect, useRef, useCallback, useMemo } from 'react';

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
};

const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max);

const round = (value, precision = 3) => parseFloat(value.toFixed(precision));

const adjust = (value, fromMin, fromMax, toMin, toMax) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

const easeInOutCubic = (x) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const ProfileCardComponent = ({
  avatarUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  className = '',
  enableTilt = true,
  miniAvatarUrl,
  name = 'Javi A. Torres',
  title = 'Software Engineer',
  handle = 'javicodes',
  status = 'Online',
  contactText = 'Contact',
  showUserInfo = true,
  onContactClick,
}) => {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null;
    let rafId = null;

    const updateCardTransform = (offsetX, offsetY, card, wrap) => {
      const width = card.clientWidth;
      const height = card.clientHeight;
      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);
      const centerX = percentX - 50;
      const centerY = percentY - 50;
      wrap.style.setProperty('--rotate-x', `${round(-(centerX / 15))}deg`);
      wrap.style.setProperty('--rotate-y', `${round(centerY / 15)}deg`);
    };

    const createSmoothAnimation = (duration, startX, startY, card, wrap) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const animationLoop = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeInOutCubic(progress);

        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);

        updateCardTransform(currentX, currentY, card, wrap);

        if (progress < 1) rafId = requestAnimationFrame(animationLoop);
      };

      rafId = requestAnimationFrame(animationLoop);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
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
        wrap
      );
    },
    [animationHandlers]
  );

  const handlePointerEnter = useCallback(() => {
    if (!animationHandlers) return;
    animationHandlers.cancelAnimation();
  }, [animationHandlers]);

  const handlePointerLeave = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap || !animationHandlers) return;
      animationHandlers.createSmoothAnimation(
        ANIMATION_CONFIG.SMOOTH_DURATION,
        event.offsetX,
        event.offsetY,
        card,
        wrap
      );
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
    animationHandlers.updateCardTransform(initialX, initialY, card, wrap);
    animationHandlers.createSmoothAnimation(
      ANIMATION_CONFIG.INITIAL_DURATION,
      initialX,
      initialY,
      card,
      wrap
    );

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
      }}
    >
      <div
        ref={cardRef}
        className="w-[340px] bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-neutral-300/60 dark:hover:border-neutral-700/60 backdrop-blur-sm"
        style={{
          transform: 'rotateX(var(--rotate-x)) rotateY(var(--rotate-y))',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out, border-color 0.3s, box-shadow 0.3s',
        }}
      >
        {/* Avatar */}
        <div className="h-[280px] overflow-hidden rounded-t-2xl">
          <img
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            src={avatarUrl}
            alt={`${name} avatar`}
            loading="lazy"
          />
        </div>

        {/* Content */}
        {showUserInfo && (
          <div className="p-6">
            {/* Name & Title */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {name}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                {title}
              </p>
              <div className="h-0.5 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3" />
            </div>

            {/* User Details */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white dark:border-neutral-800 shadow-sm">
                  <img
                    src={miniAvatarUrl || avatarUrl}
                    alt={`${name} mini avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    @{handle}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-500">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    {status}
                  </div>
                </div>
              </div>

              <button
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
                onClick={handleContactClick}
                type="button"
              >
                {contactText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;