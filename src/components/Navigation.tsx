"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { Home, User, Code, Briefcase, Mail, Linkedin, Github, Menu, X } from "lucide-react";
import portrait1 from './images/Portraits/portrait3.webp';

export function Navigation({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", href: "#", icon: Home },
    { label: "About", href: "#about", icon: User },
    { label: "Skills", href: "#skills", icon: Code },
    { label: "Projects", href: "#projects", icon: Briefcase },
    { label: "Contact", href: "#contact", icon: Mail },
  ];

  const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/salah-eddine-medkour/", icon: Linkedin },
    { label: "GitHub", href: "https://github.com/salahmed-ctrlz", icon: Github },
  ];

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="fixed top-5 left-5 z-50 w-11 h-11 rounded-xl bg-zinc-900/80 backdrop-blur-xl border border-white/[0.08] flex items-center justify-center cursor-pointer group"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        style={{
          boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255,255,255,0.05)'
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 md:inset-auto md:left-0 md:top-0 md:bottom-0 md:w-80 z-40 flex flex-col"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-zinc-950/95 md:bg-zinc-950/90 backdrop-blur-2xl">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
              <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-violet-500/10 via-transparent to-violet-500/10 hidden md:block" />
              <div className="absolute top-20 -left-20 w-60 h-60 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-20 -left-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Content Container */}
            <div className="relative flex flex-col h-full px-6 py-8">
              
              {/* Header - Profile Section (with extra top spacing) */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4 mt-14 md:mt-12"
              >
                <div className="relative">
                  <img
                    src={portrait1}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10"
                    alt="Salahuddin M."
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-zinc-950" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-medium text-base">Salahuddin M.</span>
                  <span className="text-zinc-500 text-sm">Networks Engineer & Frontend Developer</span>
                </div>
              </motion.div>

              {/* Navigation Links - Centered Vertically */}
              <nav className="flex-1 flex flex-col gap-1.5 justify-center">
                <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-4 px-3">
                  Navigation
                </span>
                {links.map((link, idx) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx + 0.15 }}
                    className="group relative flex items-center gap-4 px-4 py-3.5 rounded-xl text-zinc-400 hover:text-white transition-all duration-300"
                  >
                    <div className="absolute inset-0 rounded-xl bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-violet-500 rounded-full group-hover:h-5 transition-all duration-300" />
                    
                    <link.icon className="relative w-5 h-5 text-zinc-500 group-hover:text-violet-400 transition-colors duration-300" />
                    <span className="relative font-medium text-[15px]">{link.label}</span>
                  </motion.a>
                ))}
              </nav>

              {/* Footer Section */}
              <div className="pt-6 border-t border-white/[0.05]">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider mr-2">
                    Connect
                  </span>
                  {socialLinks.map((link, idx) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center hover:bg-violet-600/20 hover:border-violet-500/30 transition-all duration-300 group"
                      aria-label={`Visit my ${link.label} profile`}
                    >
                      <link.icon className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 transition-colors" />
                    </motion.a>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-emerald-400 text-sm font-medium">Available for work</span>
                </motion.div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Collapsed Desktop Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={cn(
          "fixed left-0 top-0 bottom-0 w-[72px] z-30 hidden md:flex flex-col items-center py-6 transition-opacity duration-300",
          open ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-xl border-r border-white/[0.04]" />
        
        <div className="h-14" />
        
        {/* Nav Icons - Centered Vertically */}
        <nav className="relative flex-1 flex flex-col items-center justify-center gap-2">
          {links.map((link, idx) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx + 0.3 }}
              aria-label={link.label}
              className="group relative w-11 h-11 rounded-xl flex items-center justify-center hover:bg-white/[0.05] transition-all duration-300"
            >
              <link.icon className="w-5 h-5 text-zinc-500 group-hover:text-violet-400 transition-colors duration-300" />
              
              <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-white text-sm font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap pointer-events-none">
                {link.label}
                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-zinc-900 border-l border-b border-white/10 rotate-45" />
              </div>
            </motion.a>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="relative flex flex-col items-center gap-3">
          {socialLinks.map((link, idx) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              aria-label={`Visit my ${link.label} profile`}
              className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/[0.05] transition-all duration-300 group"
            >
              <link.icon className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            </motion.a>
          ))}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="relative mt-2"
          >
            <img
              src={portrait1}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-white/10 hover:ring-violet-500/30 transition-all duration-300 cursor-pointer"
              alt="Profile"
              onClick={() => setOpen(true)}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-zinc-950" />
          </motion.div>
        </div>
      </motion.aside>

      {/* Content wrapper */}
      {children && (
        <div className={cn(
          "transition-all duration-300 ease-out",
          "md:ml-[72px]"
        )}>
          {children}
        </div>
      )}
    </>
  );
}

export default Navigation;