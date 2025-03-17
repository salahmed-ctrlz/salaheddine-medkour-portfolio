import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Code2, Mail } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      className="fixed w-full z-50 transition-all duration-300 px-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
    >
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
    </motion.nav>
  );
}