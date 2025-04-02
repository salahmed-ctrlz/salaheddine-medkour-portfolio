import { useState, useEffect, useCallback, useRef } from 'react';
import { Clock, MapPin, Mail, Phone, Github, Linkedin, Copy, Check, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  // State management
  const [currentTime, setCurrentTime] = useState(new Date());
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [typedText, setTypedText] = useState("Me");
  const typeInterval = useRef<NodeJS.Timeout | null>(null);
  const fullName = "Medkour Salah Eddine";

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle mouse movement for custom cursor
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const footer = document.getElementById('custom-footer');
    if (footer) {
      const rect = footer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  }, []);

  useEffect(() => {
    const footer = document.getElementById('custom-footer');
    footer?.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      footer?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  // Typing effect for portfolio name
  useEffect(() => {
    if (isExpanded) {
      let index = 2; // Start after "Me"
      
      typeInterval.current = setInterval(() => {
        if (index <= fullName.length) {
          setTypedText(fullName.slice(0, index));
          index++;
        } else {
          if (typeInterval.current) clearInterval(typeInterval.current);
        }
      }, 50);
    } else {
      setTypedText("Me");
      if (typeInterval.current) clearInterval(typeInterval.current);
    }
    
    return () => {
      if (typeInterval.current) clearInterval(typeInterval.current);
    };
  }, [isExpanded]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).replace(/\s/g, '');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCopy = async (text: string, type: 'email' | 'phone') => {
    await navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
    
    // Enhanced confetti effect
    confetti({
      particleCount: 80,
      spread: 40,
      origin: { y: 0.9, x: 0.5 },
      colors: ['#818cf8', '#6366f1', '#4f46e5', '#a855f7'],
      ticks: 200,
      shapes: ['circle'],
      gravity: 0.8,
      scalar: 1.2,
      disableForReducedMotion: true
    });
  };

  return (
    <footer 
      id="custom-footer" 
      className="relative border-t border-gray-800/30 bg-gray-900/60 backdrop-blur-lg cursor-none overflow-hidden"
      aria-label="Footer"
    >
      {/* Blurred SALAHUDDIN background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div 
          className="text-[15vw] font-bold text-gray-800/10 select-none tracking-tight"
          style={{
            filter: 'blur(8px)',
            transform: 'rotate(-5deg) translateY(10%)',
            letterSpacing: '-0.05em',
            userSelect: 'none'
          }}
        >
          SALAHUDDIN
        </div>
      </div>

      {/* Custom Cursor */}
      <motion.div
        className="pointer-events-none fixed mix-blend-screen"
        animate={{
          left: mousePosition.x,
          top: mousePosition.y,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.5
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
        style={{
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 50,
        }}
      >
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-md opacity-30" />
      </motion.div>

      {/* Main content with improved spacing and layout */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14 relative z-10">
        {/* Top section with main content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Left Column: Time, Location, Status */}
          <div className="md:col-span-4 space-y-6">
            {/* Time and Date */}
            <motion.div 
              className="flex items-start space-x-5 group bg-gray-800/20 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/20"
              onMouseEnter={() => {
                setIsHovering(true);
                setHoveredItem('time');
              }}
              onMouseLeave={() => {
                setIsHovering(false);
                setHoveredItem(null);
              }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            >
              <div className="mt-1 relative">
                <Clock className="w-5 h-5 text-indigo-400" />
                <AnimatePresence>
                  {hoveredItem === 'time' && (
                    <motion.div 
                      className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800/90 text-white text-xs px-2.5 py-1 rounded-lg whitespace-nowrap z-20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Local time
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex flex-col">
                <span className="font-medium tracking-wide text-white text-lg">{formatTime(currentTime)}</span>
                <span className="text-sm text-gray-400">{formatDate(currentTime)}</span>
              </div>
            </motion.div>
            
            {/* Location */}
            <motion.div 
              className="flex items-center space-x-5 group bg-gray-800/20 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/20"
              onMouseEnter={() => {
                setIsHovering(true);
                setHoveredItem('location');
              }}
              onMouseLeave={() => {
                setIsHovering(false);
                setHoveredItem(null);
              }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            >
              <div className="relative">
                <MapPin className="w-5 h-5 text-indigo-400" />
                <AnimatePresence>
                  {hoveredItem === 'location' && (
                    <motion.div 
                      className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800/90 text-white text-xs px-2.5 py-1 rounded-lg whitespace-nowrap z-20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Current location
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span className="text-white">Annaba, Algeria</span>
            </motion.div>
          </div>

          {/* Center Column: Contact Details */}
          <div className="md:col-span-4 space-y-6">
            {/* Email */}
            <motion.div 
              className="flex items-center space-x-4 group bg-gray-800/20 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/20 cursor-pointer relative"
              onClick={() => handleCopy('medkoursalaheddine@gmail.com', 'email')}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => {
                setIsHovering(true);
                setHoveredItem('email');
              }}
              onMouseLeave={() => {
                setIsHovering(false);
                setHoveredItem(null);
              }}
            >
              <div className="flex-shrink-0 relative">
                <Mail className="w-5 h-5 text-indigo-400" />
                <AnimatePresence>
                  {hoveredItem === 'email' && !copiedEmail && (
                    <motion.span 
                      className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800/90 text-white text-xs px-2.5 py-1 rounded-lg whitespace-nowrap z-20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Click to copy
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex-1 truncate text-white">medkoursalaheddine@gmail.com</div>
              <AnimatePresence mode="wait">
                {copiedEmail ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <Check className="w-4 h-4 text-green-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="opacity-0 group-hover:opacity-100 flex-shrink-0"
                  >
                    <Copy className="w-4 h-4 text-gray-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Phone */}
            <motion.div 
              className="flex items-center space-x-4 group bg-gray-800/20 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/20 cursor-pointer relative"
              onClick={() => handleCopy('+213551964262', 'phone')}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => {
                setIsHovering(true);
                setHoveredItem('phone');
              }}
              onMouseLeave={() => {
                setIsHovering(false);
                setHoveredItem(null);
              }}
            >
              <div className="flex-shrink-0 relative">
                <Phone className="w-5 h-5 text-indigo-400" />
                <AnimatePresence>
                  {hoveredItem === 'phone' && !copiedPhone && (
                    <motion.span 
                      className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800/90 text-white text-xs px-2.5 py-1 rounded-lg whitespace-nowrap z-20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Click to copy
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex-1 text-white">+213551964262</div>
              <AnimatePresence mode="wait">
                {copiedPhone ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <Check className="w-4 h-4 text-green-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="opacity-0 group-hover:opacity-100 flex-shrink-0"
                  >
                    <Copy className="w-4 h-4 text-gray-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Column: Status & Social */}
          <div className="md:col-span-4 space-y-6">
            {/* Status */}
            <motion.div 
              className="flex items-center space-x-4 group bg-gray-800/20 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/20"
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative flex h-3 w-3 mt-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <span className="text-white">Actively seeking new opportunities</span>
            </motion.div>
            
            {/* Social links */}
            <div className="flex items-center justify-between bg-gray-800/20 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/20">
              <div className="flex items-center space-x-4">
                <motion.a
                  href="https://github.com/salahmed-ctrlz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800/50 p-3 rounded-full hover:bg-indigo-500/20 transition-colors relative"
                  onMouseEnter={() => {
                    setIsHovering(true);
                    setHoveredItem('github');
                  }}
                  onMouseLeave={() => {
                    setIsHovering(false);
                    setHoveredItem(null);
                  }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  aria-label="Visit my GitHub profile"
                >
                  <Github className="w-5 h-5 text-white" />
                  <AnimatePresence>
                    {hoveredItem === 'github' && (
                      <motion.span 
                        className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800/90 text-white text-xs px-2.5 py-1 rounded-lg whitespace-nowrap flex items-center gap-1.5 z-20"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        GitHub <ExternalLink className="w-3 h-3 inline opacity-70" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.a>
                
                <motion.a
                  href="https://www.linkedin.com/in/salah-eddine-medkour/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800/50 p-3 rounded-full hover:bg-indigo-500/20 transition-colors relative"
                  onMouseEnter={() => {
                    setIsHovering(true);
                    setHoveredItem('linkedin');
                  }}
                  onMouseLeave={() => {
                    setIsHovering(false);
                    setHoveredItem(null);
                  }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  aria-label="Visit my LinkedIn profile"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                  <AnimatePresence>
                    {hoveredItem === 'linkedin' && (
                      <motion.span 
                        className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800/90 text-white text-xs px-2.5 py-1 rounded-lg whitespace-nowrap flex items-center gap-1.5 z-20"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        LinkedIn <ExternalLink className="w-3 h-3 inline opacity-70" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.a>
              </div>
              
              {/* Portfolio Credit */}
              <div 
                className="group relative cursor-pointer"
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
              >
                <motion.div 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 font-medium"
                  animate={{ opacity: 1 }}
                >
                  Portfolio by: {typedText}
                </motion.div>
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ 
                    scaleX: isExpanded ? 1 : 0,
                    opacity: isExpanded ? 1 : 0
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section with copyright */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-800/30">
          <div className="text-sm text-gray-500 flex items-center">
            <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full mr-3"></div>
            <span>All rights reserved. 2025.</span>
          </div>
          
          <div className="text-sm text-gray-500">
            <span>Let's collaborate to create an outstanding website.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}