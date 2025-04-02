import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const isHovering = useRef(false);
  const lastUpdateTime = useRef(0);
  const rafId = useRef<number>();
  
  // Optimized spring configurations for better performance
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  
  // Spring for scale to avoid direct style manipulation
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 400,
  });

  // Track cursor type
  const [cursorType, setCursorType] = useState<'default' | 'pointer'>('default');
  
  // Check for touch device once on mount
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Optimized mouse move handler with debouncing
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Throttle updates to every 16ms (approximately 60fps)
    const now = performance.now();
    if (now - lastUpdateTime.current < 16) return;
    
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      lastUpdateTime.current = now;
    });
  }, [cursorX, cursorY]);

  // Optimized hover detection
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Use attribute selector for better performance
    const isInteractive = 
      target.matches('a, button, [data-hover="true"], a *, button *') || 
      target.closest('a, button, nav, [data-hover="true"]') !== null;

    if (isInteractive && !isHovering.current) {
      isHovering.current = true;
      scale.set(1.5);
      setCursorType('pointer');
    }
  }, [scale]);

  const handleMouseOut = useCallback(() => {
    if (isHovering.current) {
      isHovering.current = false;
      scale.set(1);
      setCursorType('default');
    }
  }, [scale]);

  // Check for touch device and setup event listeners
  useEffect(() => {
    // Check if device supports hover
    const touchDevice = window.matchMedia('(hover: none)').matches;
    setIsTouchDevice(touchDevice);
    
    if (touchDevice) return;
    
    // Only set cursor to none if not a touch device
    document.documentElement.classList.add('cursor-none');
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      document.documentElement.classList.remove('cursor-none');
      
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseOut]);

  // Don't render anything for touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Dot element - optimized with hardware acceleration */}
      <motion.div
        className={`cursor-element ${
          cursorType === 'pointer' ? 'cursor-dot-pointer' : 'cursor-dot-default'
        }`}
        style={{
          x,
          y,
          scale,
          translateX: '-50%',
          translateY: '-50%'
        }}
      />
      
      {/* Outline element - separate animation properties for better performance */}
      <motion.div
        className={`cursor-element cursor-outline ${
          cursorType === 'pointer' ? 'cursor-outline-pointer' : 'cursor-outline-default'
        }`}
        style={{
          x,
          y,
          scale,
          translateX: '-50%',
          translateY: '-50%'
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 150,
          mass: 0.3,
        }}
      />
    </>
  );
}