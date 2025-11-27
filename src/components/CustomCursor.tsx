import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const isHovering = useRef(false);
  const lastUpdateTime = useRef(0);
  const rafId = useRef<number>();
  
  // Spring configurations for smooth movement - optimized for performance
  const springConfig = { damping: 20, stiffness: 300, mass: 0.2 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  
  // Transform scale based on hover state
  const scale = useSpring(1, {
    damping: 15,
    stiffness: 400,
    mass: 0.1,
  });

  // Track cursor type
  const [cursorType, setCursorType] = useState<'default' | 'pointer'>('default');

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Throttle updates to every 16ms (approximately 60fps) for better responsiveness
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

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInteractive = 
      target.tagName === 'A' || 
      target.tagName === 'BUTTON' ||
      target.closest('button') ||
      target.closest('a') ||
      target.closest('nav') ||
      target.dataset.hover === 'true';

    if (isInteractive) {
      isHovering.current = true;
      scale.set(1.5);
      setCursorType('pointer');
    }
  }, [scale]);

  const handleMouseOut = useCallback(() => {
    isHovering.current = false;
    scale.set(1);
    setCursorType('default');
  }, [scale]);

  useEffect(() => {
    document.body.style.cursor = 'none';
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      document.body.style.cursor = '';
      
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseOut]);

  // Hide cursor when device doesn't support hover
  if (window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      {/* Cursor outline */}
      <motion.div
        className={`fixed pointer-events-none z-50 w-8 h-8 rounded-full border border-white mix-blend-difference ${
          cursorType === 'pointer' ? 'cursor-outline-pointer' : 'cursor-outline-default'
        }`}
        style={{
          x: x,
          y: y,
          scale: scale,
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)'
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 150,
          mass: 0.3,
        }}
      />
      {/* Cursor dot */}
      <motion.div
        className={`fixed pointer-events-none z-50 w-2 h-2 rounded-full bg-white mix-blend-difference ${
          cursorType === 'pointer' ? 'cursor-dot-pointer' : 'cursor-dot-default'
        }`}
        style={{
          x: cursorX,
          y: cursorY,
          scale: scale,
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  );
}