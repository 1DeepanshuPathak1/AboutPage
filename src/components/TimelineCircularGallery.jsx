import React, { useEffect, useRef, useState } from 'react';
import './TimelineCircularGallery.css';

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

export default function TimelineCircularGallery() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateProgress = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;
      const progressPercent = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0;
      setProgress(progressPercent);
    };

    const handleScroll = () => {
      updateProgress();
    };

    container.addEventListener('scroll', handleScroll);
    updateProgress();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseDown = (e) => {
    const container = containerRef.current;
    if (!container) return;

    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
    setVelocity(0);
    setLastX(e.pageX);
    setLastTime(Date.now());

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const container = containerRef.current;
    if (!container) return;

    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;

    const now = Date.now();
    const dt = now - lastTime;
    if (dt > 0) {
      const dx = e.pageX - lastX;
      setVelocity(dx / dt);
    }
    setLastX(e.pageX);
    setLastTime(now);
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    const container = containerRef.current;
    if (!container || Math.abs(velocity) < 0.1) return;

    let currentVelocity = velocity * 30;
    const deceleration = 0.92;

    const animate = () => {
      currentVelocity *= deceleration;

      if (Math.abs(currentVelocity) > 0.5) {
        container.scrollLeft -= currentVelocity;
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  return (
    <div className="timeline-circular-gallery-wrapper">
      <div className="timeline-circular-gallery-background">
        <div className="timeline-circular-gallery-grid"></div>
        <div className="timeline-circular-gallery-orb timeline-circular-gallery-orb-1"></div>
        <div className="timeline-circular-gallery-orb timeline-circular-gallery-orb-2"></div>
        <div className="timeline-circular-gallery-orb timeline-circular-gallery-orb-3"></div>
        <div className="timeline-circular-gallery-logo-pattern">
          <div className="timeline-circular-gallery-logo-item">&lt;/&gt;</div>
          <div className="timeline-circular-gallery-logo-item">&lt;/&gt;</div>
          <div className="timeline-circular-gallery-logo-item">&lt;/&gt;</div>
          <div className="timeline-circular-gallery-logo-item">&lt;/&gt;</div>
          <div className="timeline-circular-gallery-logo-item">&lt;/&gt;</div>
          <div className="timeline-circular-gallery-logo-item">&lt;/&gt;</div>
        </div>
      </div>

      <div className="timeline-circular-gallery-header">
        <h2 className="timeline-circular-gallery-title">Our Journey</h2>
        <p className="timeline-circular-gallery-subtitle">Drag to explore our timeline</p>
      </div>

      <div
        ref={containerRef}
        className={`timeline-circular-gallery-container ${isDragging ? 'timeline-circular-gallery-dragging' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className="timeline-circular-gallery-track">
          {timelineData.map((item, index) => (
            <div key={index} className="timeline-circular-gallery-card">
              <div className="timeline-circular-gallery-card-inner">
                <div className="timeline-circular-gallery-card-glow"></div>
                
                <div className="timeline-circular-gallery-card-header">
                  <div className="timeline-circular-gallery-card-number">
                    <div className="timeline-circular-gallery-card-number-inner">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="timeline-circular-gallery-card-header-text">
                    <p className="timeline-circular-gallery-card-date">{item.date}</p>
                    <h3 className="timeline-circular-gallery-card-title">{item.title}</h3>
                  </div>
                </div>

                <p className="timeline-circular-gallery-card-description">{item.description}</p>

                <div className="timeline-circular-gallery-card-metrics">
                  {item.metrics.map((metric, i) => (
                    <div key={i} className="timeline-circular-gallery-card-metric">
                      <div className="timeline-circular-gallery-card-metric-value">{metric.value}</div>
                      <div className="timeline-circular-gallery-card-metric-label">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className="timeline-circular-gallery-card-tags">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="timeline-circular-gallery-card-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="timeline-circular-gallery-progress-container">
        <div className="timeline-circular-gallery-progress-label">Progress</div>
        <div className="timeline-circular-gallery-progress-bar">
          <div 
            className="timeline-circular-gallery-progress-fill"
            style={{ height: `${progress}%` }}
          ></div>
        </div>
        <div className="timeline-circular-gallery-progress-percentage">{Math.round(progress)}%</div>
      </div>

      <div className="timeline-circular-gallery-footer">
        <p className="timeline-circular-gallery-footer-text">© 2024 CODESHACK. 70 Members Strong.</p>
      </div>
    </div>
  );
}