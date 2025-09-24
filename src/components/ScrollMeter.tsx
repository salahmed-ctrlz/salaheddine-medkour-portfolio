import React, { useEffect, useState, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

const ScrollMeter: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const rafId = React.useRef<number>();
  const lastUpdateTime = React.useRef(0);
  
  // Smooth out the scroll speed value
  const smoothScrollSpeed = useSpring(0, {
    stiffness: 200,
    damping: 15,
    mass: 0.3
  });

  const handleScroll = useCallback(() => {
    // Throttle scroll updates for better performance
    const now = performance.now();
    if (now - lastUpdateTime.current < 16) return;
    
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const percentage = Math.round((currentScroll / scrollHeight) * 100);
      
      // Update scroll percentage
      setScrollPercentage(percentage);
      
      // Calculate scroll direction
      const direction = currentScroll > lastScrollY ? 'down' : 'up';
      setScrollDirection(direction);
      setLastScrollY(currentScroll);
      
      // Calculate scroll speed
      const speed = Math.abs(currentScroll - lastScrollY);
      setScrollSpeed(speed);
      smoothScrollSpeed.set(speed);
      
      lastUpdateTime.current = now;
    });
  }, [lastScrollY, smoothScrollSpeed]);

  const adjustPosition = (x: number, y: number) => {
    const margin = 40; // pixels from edge
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    let adjustedX = x + 20;
    let adjustedY = y + 20;
    
    // Adjust X if too close to right edge
    if (adjustedX > width - margin) {
      adjustedX = x - 50;
    }
    
    // Adjust Y if too close to bottom or top
    if (adjustedY > height - margin) {
      adjustedY = y - 50;
    } else if (adjustedY < margin) {
      adjustedY = y + 50;
    }
    
    return { x: adjustedX, y: adjustedY };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll]);

  const position = adjustPosition(mousePosition.x, mousePosition.y);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 select-none mix-blend-difference"
      animate={{
        x: position.x,
        y: position.y,
        scale: scrollSpeed > 10 ? 1.2 : 1,
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
        mass: 0.1,
      }}
    >
      <motion.div 
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: scrollPercentage > 0 ? 0.7 : 0,
          scale: scrollPercentage > 0 ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Progress Ring */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          className="absolute -left-4 -top-4"
        >
          {/* Background ring */}
          <circle
            cx="16"
            cy="16"
            r="8"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
          />
          {/* Progress ring */}
          <motion.circle
            cx="16"
            cy="16"
            r="8"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeDasharray={`${(scrollPercentage / 100) * 50.24} 50.24`}
            transform="rotate(-90 16 16)"
          />
          {/* Direction indicator */}
          {scrollDirection && (
            <motion.path
              d={scrollDirection === 'down' 
                ? 'M16 12l3 4h-6l3-4' // Down arrow
                : 'M16 20l3-4h-6l3 4'  // Up arrow
              }
              fill="white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
            />
          )}
        </svg>
        
        {/* Percentage text */}
        <motion.span 
          className="text-[10px] font-mono tracking-wider"
          animate={{
            color: scrollDirection === 'up' ? '#ffffff' : '#ffffff'
          }}
        >
          {scrollPercentage}%
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default ScrollMeter; 