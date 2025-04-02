import { useEffect, useState, useCallback, useRef } from 'react';
<<<<<<< HEAD
import { motion, useSpring, useMotionValue } from 'framer-motion';
=======
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b

export default function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const isHovering = useRef(false);
  const lastUpdateTime = useRef(0);
  const rafId = useRef<number>();
  
<<<<<<< HEAD
  // Optimized spring configurations for better performance
=======
  // Spring configurations for smooth movement
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  
<<<<<<< HEAD
  // Spring for scale to avoid direct style manipulation
=======
  // Transform scale based on hover state
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 400,
  });

  // Track cursor type
  const [cursorType, setCursorType] = useState<'default' | 'pointer'>('default');
<<<<<<< HEAD
  
  // Check for touch device once on mount
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Optimized mouse move handler with debouncing
=======

>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
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

<<<<<<< HEAD
  // Optimized hover detection
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Use attribute selector for better performance
    const isInteractive = 
      target.matches('a, button, [data-hover="true"], a *, button *') || 
      target.closest('a, button, nav, [data-hover="true"]') !== null;

    if (isInteractive && !isHovering.current) {
=======
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
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
      isHovering.current = true;
      scale.set(1.5);
      setCursorType('pointer');
    }
  }, [scale]);

  const handleMouseOut = useCallback(() => {
<<<<<<< HEAD
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
=======
    isHovering.current = false;
    scale.set(1);
    setCursorType('default');
  }, [scale]);

  useEffect(() => {
    document.body.style.cursor = 'none';
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
<<<<<<< HEAD
      document.documentElement.classList.remove('cursor-none');
=======
      document.body.style.cursor = '';
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
      
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseOut]);

<<<<<<< HEAD
  // Don't render anything for touch devices
  if (isTouchDevice) {
=======
  // Hide cursor when device doesn't support hover
  if (window.matchMedia('(hover: none)').matches) {
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
    return null;
  }

  return (
    <>
<<<<<<< HEAD
      {/* Dot element - optimized with hardware acceleration */}
      <motion.div
        className={`cursor-element ${
          cursorType === 'pointer' ? 'cursor-dot-pointer' : 'cursor-dot-default'
        }`}
        style={{
          x,
          y,
          scale,
=======
      <motion.div
        className={`fixed pointer-events-none z-50 mix-blend-difference ${
          cursorType === 'pointer' ? 'cursor-dot-pointer' : 'cursor-dot-default'
        }`}
        style={{
          x: x,
          y: y,
          scale: scale,
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
          translateX: '-50%',
          translateY: '-50%'
        }}
      />
<<<<<<< HEAD
      
      {/* Outline element - separate animation properties for better performance */}
      <motion.div
        className={`cursor-element cursor-outline ${
          cursorType === 'pointer' ? 'cursor-outline-pointer' : 'cursor-outline-default'
        }`}
        style={{
          x,
          y,
          scale,
=======
      <motion.div
        className={`fixed pointer-events-none z-50 w-8 h-8 rounded-full border border-white mix-blend-difference ${
          cursorType === 'pointer' ? 'cursor-outline-pointer' : 'cursor-outline-default'
        }`}
        style={{
          x: x,
          y: y,
          scale: scale,
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
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