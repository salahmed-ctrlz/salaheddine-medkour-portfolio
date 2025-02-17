import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Code2, Mail } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', icon: Home, href: '#' },
    { name: 'About', icon: User, href: '#about' },
    { name: 'Projects', icon: Briefcase, href: '#projects' },
    { name: 'Skills', icon: Code2, href: '#skills' },
    { name: 'Contact', icon: Mail, href: '#contact' },
  ];

  return (
    <motion.nav
      className="fixed w-full z-50 transition-all duration-300 px-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-3xl">
        {/* Navbar Container with Border Animation */}
        <div className="navbar-container relative flex items-center justify-center h-16 mt-4">
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="progress-border"></div>
          </div>

          {/* Glass Effect Content */}
          <div
            className={`glass-nav relative flex items-center justify-center w-full h-full px-6 rounded-full transition-all duration-300 ${
              scrolled ? 'bg-white/10' : 'bg-white/5'
            } backdrop-blur-[8px]`}
          >
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-12">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-indigo-400 transition-colors relative group"
                  whileHover={{ y: -2 }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </motion.a>
              ))}
            </div>

            {/* Mobile Navigation Icons */}
            <div className="flex md:hidden space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-white hover:text-indigo-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}