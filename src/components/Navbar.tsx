import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { motion } from 'framer-motion';
=======
import { motion, AnimatePresence } from 'framer-motion';
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
import { Home, User, Briefcase, Code2, Mail } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
<<<<<<< HEAD
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
=======
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = ['contact', 'projects', 'skills', 'about'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (window.scrollY < 100) setActiveSection('');
    };

<<<<<<< HEAD
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
=======
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
  }, []);

  const navItems = [
    { name: 'Home', icon: Home, href: '#' },
    { name: 'About', icon: User, href: '#about' },
    { name: 'Skills', icon: Code2, href: '#skills' },
    { name: 'Projects', icon: Briefcase, href: '#projects' },
    { name: 'Contact', icon: Mail, href: '#contact' },
  ];

  return (
    <motion.nav
<<<<<<< HEAD
      className="fixed w-full z-50 transition-all duration-300 overflow-hidden py-2 px-4 sm:px-6"
=======
      className="fixed w-full z-50 transition-all duration-300 px-4"
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
    >
<<<<<<< HEAD
      {/* Container with max-width for desktop to prevent excessive width */}
      <div className="mx-auto max-w-xl relative">
        {/* Animated background with glow effect */}
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className={`absolute inset-0 ${scrolled ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          </div>
        </div>

        {/* Main navbar content */}
        <motion.div
          className="relative h-14 rounded-xl overflow-hidden bg-slate-900/50 backdrop-blur-md border border-white/5 flex items-center justify-center"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          animate={{
            boxShadow: scrolled ? "0 8px 32px rgba(0, 0, 0, 0.25)" : "0 4px 12px rgba(0, 0, 0, 0.1)"
          }}
        >
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-8 px-8 h-full">
            {navItems.map((item) => {
              const isActive = (item.href === '#' && activeSection === '') || 
                             (item.href !== '#' && activeSection === item.href.slice(1));
              
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-white/90 hover:text-white transition-all duration-300 relative group py-1"
                  whileHover={{ color: "#fff" }}
                  initial={false}
                >
                  <span className="relative z-10 font-medium">
                    {item.name}
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-md -z-10"
                        style={{
                          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15))"
                        }}
                        layoutId="activeSection"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </span>
                  
                  {/* Active section underline */}
                  {isActive && (
                    <motion.span 
                      className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                      layoutId="activeUnderline"
                      transition={{ duration: 0.2, type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover underline effect */}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-white/40 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* Mobile Navigation - properly sized icons */}
          <div className="flex md:hidden justify-around w-full px-4 h-full">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = (item.href === '#' && activeSection === '') || 
                             (item.href !== '#' && activeSection === item.href.slice(1));
              
              // Create unique filter ID for each icon
              const filterId = `icon-gradient-${index}`;

              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center h-full relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={item.name}
                >
                  {isActive && (
                    <svg width="0" height="0" className="absolute">
                      <defs>
                        <linearGradient id={filterId} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="50%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}
                  
                  {/* Properly sized icons */}
                  <Icon 
                    className="w-6 h-6 sm:w-7 sm:h-7" 
                    strokeWidth={isActive ? 2.5 : 2}
                    style={isActive ? { stroke: `url(#${filterId})` } : {}}
                    color={isActive ? undefined : 'rgba(255, 255, 255, 0.7)'}
                  />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
=======
      <div className="container mx-auto max-w-3xl">
        <div className="navbar-container relative flex items-center justify-center h-16 mt-4">
          {/* Enhanced Animated Border */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: scrolled
                ? "0 0 20px rgba(99, 102, 241, 0.3)"
                : "0 0 10px rgba(99, 102, 241, 0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20"
                style={{
                  filter: "blur(10px)",
                  transform: "translateY(-50%)",
                  animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                }}
              />
            </div>
          </motion.div>

          {/* Enhanced Glass Effect Content */}
          <motion.div
            className={`glass-nav relative flex items-center justify-center w-full h-full px-6 rounded-full transition-all duration-300 ${
              scrolled ? 'bg-white/10' : 'bg-white/5'
            } backdrop-blur-md border border-white/10`}
            animate={{
              backgroundColor: scrolled ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)"
            }}
          >
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-12">
              {navItems.map((item) => {
                const isActive = (item.href === '#' && activeSection === '') || 
                               (item.href !== '#' && activeSection === item.href.slice(1));
                
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-white/90 hover:text-white transition-all duration-300 relative group py-1"
                    whileHover={{ y: -2 }}
                    initial={false}
                  >
                    <span className="relative z-10 font-medium">
                      {item.name}
                      {isActive && (
                        <motion.span
                          className="absolute inset-0 bg-indigo-500/20 rounded-lg -z-10"
                          layoutId="activeSection"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </span>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </motion.a>
                );
              })}
            </div>

            {/* Enhanced Mobile Navigation */}
            <div className="flex md:hidden space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = (item.href === '#' && activeSection === '') || 
                               (item.href !== '#' && activeSection === item.href.slice(1));

                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`relative p-2 rounded-lg transition-colors duration-300 ${
                      isActive ? 'text-indigo-400' : 'text-white/90 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-6 h-6" />
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 bg-indigo-500/20 rounded-lg -z-10"
                        layoutId="activeMobileSection"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 0.3;
              transform: translateY(-50%) scale(1);
            }
            50% {
              opacity: 0.5;
              transform: translateY(-50%) scale(1.1);
            }
          }
        `}
      </style>
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
    </motion.nav>
  );
}