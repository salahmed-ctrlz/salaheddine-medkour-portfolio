import { useState, useEffect, useRef } from 'react';
import { Clock, MapPin, Mail, Github, Linkedin, Copy, Check, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { SiWhatsapp } from 'react-icons/si';

export default function Footer() {
  // State management
  const [currentTime, setCurrentTime] = useState(new Date());
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [typedText, setTypedText] = useState("Me");
  const typeInterval = useRef<NodeJS.Timeout | null>(null);
  const fullName = "Medkour Salahuddin";

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);


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

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
    
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const contactLink = document.querySelector('a[href="#contact"]');
    if (contactLink) {
      contactLink.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToSection('contact');
      });
    }
  }, []);


  return (
    <footer 
      id="custom-footer" 
      className="relative border-t border-gray-800/20 bg-gray-900/40 backdrop-blur-lg overflow-hidden"
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


      {/* Main content with improved spacing and layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        {/* Top section with main content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Left Column: Time, Location, Status */}
          <div className="md:col-span-4 space-y-4">
            {/* Time and Date */}
            <motion.div 
              className="flex items-start space-x-5 group bg-gray-800/20 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/20"
              onMouseEnter={() => setHoveredItem('time')}
              onMouseLeave={() => setHoveredItem(null)}
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
              onMouseEnter={() => setHoveredItem('location')}
              onMouseLeave={() => setHoveredItem(null)}
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

          {/* Center Column:  Details */}
          <div className="md:col-span-4 space-y-4">
            {/* Email */}
            <motion.div 
              className="flex items-center space-x-4 group bg-gray-800/20 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/20 cursor-pointer relative"
              onClick={() => handleCopy('medkoursalaheddine@gmail.com')}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setHoveredItem('email')}
              onMouseLeave={() => setHoveredItem(null)}
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
              <AnimatePresence mode="sync">
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
            <motion.a 
              href="https://wa.me/213551964262"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 group bg-gray-800/20 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/20 cursor-pointer relative"
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setHoveredItem('phone')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="flex-shrink-0 relative">
                <SiWhatsapp className="w-5 h-5 text-green-400" />
                <AnimatePresence>
                  {hoveredItem === 'phone' && (
                    <motion.span 
                      className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800/90 text-white text-xs px-2.5 py-1 rounded-lg whitespace-nowrap z-20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                    >DM me on Whatsapp</motion.span>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex-1 text-white">DM me on Whatsapp</div>
              <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          </div>

          {/* Right Column: Status & Social */}
          <div className="md:col-span-4 space-y-4">
            {/* Status */}
            <motion.div 
              className="flex items-center space-x-4 group bg-gray-800/20 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/20"
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
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
                  onMouseEnter={() => setHoveredItem('github')}
                  onMouseLeave={() => setHoveredItem(null)}
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
                  onMouseEnter={() => setHoveredItem('linkedin')}
                  onMouseLeave={() => setHoveredItem(null)}
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
                  style={{ fontSize: '0.85rem' }}
                >
                  Made by: {typedText}
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
        <div className="flex justify-between items-center pt-6 border-t border-gray-800/20">
          <div className="text-sm text-gray-500 flex items-center">
            <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full mr-3"></div>
            <span>All rights reserved. 2025.</span>
          </div>
          
          <div className="text-sm text-gray-500">
            <span>Let's collaborate on a project or to create an outstanding website.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}