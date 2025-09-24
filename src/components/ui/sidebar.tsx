"use client";
import { cn } from "../../lib/utils";
import React, { useState, createContext, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconChevronRight, IconX } from "@tabler/icons-react";
 
interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}
 
interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}
 
const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);
 
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
 
export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);
 
  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;
 
  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};
 
export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};
 
export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};
 
export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Don't render on mobile devices
  if (isMobile) {
    return null;
  }
  
  return (
    <>
      {/* Always visible collapsed sidebar */}
      <motion.div
        className={cn(
          "fixed left-0 top-0 h-screen px-2 py-6 hidden md:flex md:flex-col bg-black/30 backdrop-blur-[120px] border-r border-white/20 w-[80px] shrink-0 z-30 transition-all duration-500 pointer-events-auto",
          className
        )}
        animate={{
          width: animate ? (open ? "0px" : "80px") : "80px",
          opacity: animate ? (open ? 0 : 1) : 1,
        }}
        transition={{
          duration: 0.5,
          ease: [0.23, 1, 0.32, 1],
        }}
        {...props}
      >
        {!open && children}
      </motion.div>
      
      {/* Full screen overlay when open */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-[120px] z-40"
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-full h-full flex flex-col items-center justify-center gap-12 px-8 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
 
export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Force mobile menu to be closed initially
  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile, setOpen]);
  
  // Only render on mobile devices
  if (!isMobile) {
    return null;
  }
  
  return (
    <>
      
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-[480px] z-50"
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-full h-full flex flex-col items-center justify-center gap-8 px-8 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
 
export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
}) => {
  const { open, animate, setOpen } = useSidebar();
  const [isActive, setIsActive] = React.useState(false);
  
  const scrollToSection = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // Close sidebar after navigation
    setOpen(false);
  };

  // Check if current section is active
  React.useEffect(() => {
    const checkActiveSection = () => {
      if (link.href === '#') {
        setIsActive(window.scrollY < 100);
        return;
      }
      
      const element = document.querySelector(link.href);
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top <= 100 && rect.bottom >= 100;
        setIsActive(isInView);
      }
    };

    checkActiveSection();
    window.addEventListener('scroll', checkActiveSection);
    return () => window.removeEventListener('scroll', checkActiveSection);
  }, [link.href]);

  return (
    <motion.a
      href={link.href}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(link.href);
      }}
      className={cn(
        "flex items-center gap-4 group/sidebar py-4 px-4 cursor-pointer rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-105 w-full min-h-[60px] relative z-10",
        open ? "justify-start" : "justify-center",
        isActive && "bg-white/20 text-white",
        className
      )}
      whileHover={{ x: open ? 4 : 0, scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <div className={cn(
        "flex-shrink-0 flex items-center justify-center transition-all duration-300",
        isActive && "scale-110"
      )}>
        {React.cloneElement(link.icon as React.ReactElement, {
          className: cn(
            (link.icon as React.ReactElement).props?.className || "",
            isActive ? "text-white drop-shadow-lg" : "text-white"
          )
        })}
      </div>
 
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className={cn(
          "text-sm font-medium group-hover/sidebar:translate-x-1 transition-all duration-300 whitespace-pre inline-block !p-0 !m-0",
          isActive ? "text-white font-semibold" : "text-white"
        )}
      >
        {link.label}
      </motion.span>
    </motion.a>
  );
};
