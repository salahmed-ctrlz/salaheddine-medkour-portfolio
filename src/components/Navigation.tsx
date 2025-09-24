"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Home, User, Code, Briefcase, Mail, Linkedin, Github } from "lucide-react";
import { IconChevronRight, IconX } from "@tabler/icons-react";
import portrait1 from './images/Portraits/portrait3.webp';

export function Navigation({ children }: { children?: React.ReactNode }) {
  const links = [
    {
      label: "Home",
      href: "#",
      icon: (
        <Home className="h-5 w-5 shrink-0 text-white" />
      ),
    },
    {
      label: "About",
      href: "#about",
      icon: (
        <User className="h-5 w-5 shrink-0 text-white" />
      ),
    },
    {
      label: "Skills",
      href: "#skills",
      icon: (
        <Code className="h-5 w-5 shrink-0 text-white" />
      ),
    },
    {
      label: "Projects",
      href: "#projects",
      icon: (
        <Briefcase className="h-5 w-5 shrink-0 text-white" />
      ),
    },
    {
      label: "Contact",
      href: "#contact",
      icon: (
        <Mail className="h-5 w-5 shrink-0 text-white" />
      ),
    },
  ];

  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/salah-eddine-medkour/",
      icon: (
        <Linkedin className="h-4 w-4 shrink-0 text-white" />
      ),
    },
    {
      label: "GitHub",
      href: "https://github.com/salahmed-ctrlz",
      icon: (
        <Github className="h-4 w-4 shrink-0 text-white" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Single arrow button for both PC and mobile */}
      <div className="fixed top-4 left-4 z-40">
        <div
          className="w-12 h-12 bg-black/10 backdrop-blur-[40px] border border-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all duration-300"
          onClick={() => setOpen(!open)}
        >
          <IconChevronRight className="text-white w-6 h-6" />
        </div>
      </div>

      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className={open ? "justify-center items-center gap-12 py-8 h-screen relative" : "justify-between gap-8 py-8 h-screen"}>
          {/* Close button - top right when open */}
          {open && (
            <div className="absolute top-8 right-8 z-50">
              <IconX 
                className="text-white w-8 h-8 cursor-pointer hover:text-gray-300 transition-all duration-300" 
                onClick={() => setOpen(false)}
              />
            </div>
          )}

          {/* Navigation icons - centered when open */}
          <div className={open ? "flex flex-col gap-8 items-center" : "flex flex-col gap-4 items-center flex-1 justify-center"}>
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
          
          {/* PC Full-screen layout - only show on desktop */}
          <div className="hidden md:contents">
            {/* Profile picture and name - bottom left when open, centered when closed */}
            <div className={open ? "absolute bottom-8 left-8 flex flex-col gap-6 items-start" : "flex flex-col gap-6 items-center"}>
              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 min-h-[60px]">
                <img
                  src={portrait1}
                  className={open ? "h-16 w-16 shrink-0 rounded-full object-cover" : "h-10 w-10 shrink-0 rounded-full object-cover"}
                  width={50}
                  height={50}
                  alt="Salahuddin M."
                />
                <motion.span
                  animate={{
                    display: open ? "inline-block" : "none",
                    opacity: open ? 1 : 0,
                  }}
                  className={open ? "text-white text-xl font-medium whitespace-pre" : "text-white text-sm font-medium whitespace-pre"}
                >
                  Salahuddin M.
                </motion.span>
              </div>
            </div>

            {/* Social links - bottom center when open, part of profile when closed */}
            <div className={open ? "absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4" : "hidden"}>
              {socialLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-16 w-16 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {React.cloneElement(link.icon as React.ReactElement, {
                    className: "h-8 w-8 shrink-0 text-white hover:text-gray-300 transition-colors duration-300"
                  })}
                </motion.a>
              ))}
            </div>

            {/* Available to work label - bottom right when open, part of profile when closed */}
            <div className={open ? "absolute bottom-8 right-8 flex flex-col gap-6 items-start" : "hidden"}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 min-h-[60px]"
              >
                <div className="h-16 w-16 flex items-center justify-center">
                  <div className="w-8 h-8 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50 flex items-center justify-center">
                    <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                  </div>
                </div>
                <span className="text-green-400 text-xl font-medium whitespace-pre">Available to work</span>
              </motion.div>
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      
      {/* Content wrapper with dynamic margin */}
      {children && (
        <div 
          className={`transition-all duration-300 ${
            open ? 'md:ml-[300px]' : 'md:ml-[80px]'
          }`}
        >
          {children}
        </div>
      )}
    </>
  );
}

export const ArrowIcon = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  return (
    <motion.button
      onClick={(e) => {
        e.preventDefault();
        setOpen(!open);
      }}
      className="relative z-20 flex items-center justify-center p-4 cursor-pointer hover:scale-105 transition-all duration-300 rounded-xl hover:bg-white/10 min-h-[60px] min-w-[60px]"
      whileHover={{ scale: 1.05, rotate: open ? -90 : 0 }}
      whileTap={{ scale: 0.98 }}
      animate={{ rotate: open ? -90 : 0 }}
    >
      <IconChevronRight className="h-6 w-6 text-white" />
    </motion.button>
  );
};
