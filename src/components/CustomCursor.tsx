import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || 
          (e.target as HTMLElement).tagName === 'BUTTON') {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <motion.div
        className="cursor-dot"
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovering ? 1.5 : 1,
        }}
      />
      <motion.div
        className="cursor-outline"
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 12,
          stiffness: 200,
          mass: 0.5,
        }}
      />
    </>
  );
}