import { motion, AnimatePresence } from "framer-motion";
<<<<<<< HEAD
import { ChevronDown, Download, Mail, Github, Linkedin } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import background2 from "./images/blackhole.webp";
import Resume from "./Medkour Salah Eddine - Resume Feb 2025.pdf";
import { initParallaxEffect } from "../utils/parallax";
import Particles from 'react-tsparticles';
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

// Text animation component with improved Arabic text handling
const TextAnimate = ({ 
  children, 
  variants, 
  className = "",
  style = {},
  direction = "ltr",
  isArabic = false,
  animationType = "default"
}: { 
  children: string; 
  variants: any;
  className?: string;
  style?: React.CSSProperties;
  direction?: "ltr" | "rtl";
  isArabic?: boolean;
  animationType?: "default" | "tracking-in-expand" | "focus-in-expand";
}) => {
  // For Arabic text, we need to render it as a whole to maintain connections
  if (isArabic) {
    return (
      <motion.div 
        className={`${className} ${animationType === "focus-in-expand" ? "focus-in-expand" : ""}`}
        style={{ 
          direction,
          ...style
        }}
        variants={variants}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {children}
      </motion.div>
    );
  }
  
  // For tracking-in-expand animation, we want to animate the whole text as one unit
  if (animationType === "tracking-in-expand" || animationType === "focus-in-expand") {
    return (
      <motion.div 
        className={`${className} ${animationType}`}
        style={{ 
          direction,
          ...style
        }}
        variants={variants}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {children}
      </motion.div>
    );
  }
  
  // For English text with default animation, animate each character
  return (
    <motion.div 
      className={className}
      style={{ 
        display: "flex",
        flexWrap: "wrap", 
        justifyContent: "center",
        direction,
        ...style
      }}
    >
      {children.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={i}
          variants={variants}
          initial="hidden"
          animate="show"
          exit="exit"
          style={{ 
            display: "inline-block",
            whiteSpace: "pre"
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Constellation effect component
const ConstellationEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    color: string;
    alpha: number;
    vx: number;
    vy: number;
  }>>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const interactiveDistanceRef = useRef(150);
  const frameRef = useRef<number>(0);
  const isInitializedRef = useRef(false);
  const [isInView, setIsInView] = useState(false);

  // Colors for particles with increased variety
  const particleColors = [
    'rgba(99, 102, 241, 0.8)',   // indigo
    'rgba(139, 92, 246, 0.8)',   // violet
    'rgba(168, 85, 247, 0.8)',   // purple
    'rgba(217, 70, 239, 0.8)',   // fuchsia
    'rgba(236, 72, 153, 0.8)',   // pink
    'rgba(79, 70, 229, 0.8)',    // indigo-dark
    'rgba(99, 179, 237, 0.8)',   // light blue
    'rgba(129, 140, 248, 0.8)'   // indigo-light
  ];

  // Setup intersection observer to detect when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px 100px 0px" // Load when closer to viewport
      }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const initParticles = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize canvas to match window size
    const updateCanvasSize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Create particles with reduced count for better performance
    // Calculate particle count based on screen size with lower density
    const particleCount = Math.min(Math.floor(window.innerWidth * window.innerHeight / 15000), 80);
    
    particlesRef.current = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      alpha: Math.random() * 0.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4
    }));
    
    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Add touch support
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePositionRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };
    
    window.addEventListener('touchmove', handleTouchMove);
    
    // Animation loop
    const animate = () => {
      if (!canvasRef.current || !isInView) {
        // Skip animation if component is not visible
        frameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Boundary check with wrap-around
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Calculate distance to mouse
        const dx = mousePositionRef.current.x - particle.x;
        const dy = mousePositionRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Interactive effect - particles move away from mouse
        if (distance < interactiveDistanceRef.current) {
          const angle = Math.atan2(dy, dx);
          const force = (interactiveDistanceRef.current - distance) / interactiveDistanceRef.current;
          
          // Push particle away from mouse
          particle.vx -= Math.cos(angle) * force * 0.05;
          particle.vy -= Math.sin(angle) * force * 0.05;
          
          // Limit velocity
          const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
          if (speed > 1.5) {
            particle.vx = (particle.vx / speed) * 1.5;
            particle.vy = (particle.vy / speed) * 1.5;
          }
          
          // Highlight particles near mouse
          ctx.globalAlpha = Math.min(1, particle.alpha + force * 0.5);
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size + force * 2, 0, Math.PI * 2); // Larger highlight effect
          ctx.fillStyle = particle.color;
          ctx.fill();
        } else {
          // Gradually return to normal velocity
          particle.vx *= 0.99;
          particle.vy *= 0.99;
          
          // Draw normal particle
          ctx.globalAlpha = particle.alpha;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        }
        
        // Draw connections between nearby particles
        // Reduced connection distance for better performance
        const connectionDistance = 100;
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx2 = particle.x - p2.x;
          const dy2 = particle.y - p2.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          
          if (distance2 < connectionDistance) {
            // Determine if this connection is near the mouse
            const mouseInfluence = Math.max(
              0,
              1 - Math.min(
                Math.sqrt(Math.pow(mousePositionRef.current.x - particle.x, 2) + 
                         Math.pow(mousePositionRef.current.y - particle.y, 2)), 
                Math.sqrt(Math.pow(mousePositionRef.current.x - p2.x, 2) + 
                         Math.pow(mousePositionRef.current.y - p2.y, 2))
              ) / interactiveDistanceRef.current
            );
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance2 / connectionDistance) * 0.2 + mouseInfluence * 0.3})`;
            ctx.lineWidth = 0.6 + mouseInfluence * 1.2;
            ctx.stroke();
          }
        }
        
        // Reset global alpha
        ctx.globalAlpha = 1;
      });
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    frameRef.current = requestAnimationFrame(animate);
    isInitializedRef.current = true;
    
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isInView]);

  // Handle visibility changes to improve performance
  useEffect(() => {
    let cleanupFn: (() => void) | undefined;
    
    if (isInView) {
      if (!isInitializedRef.current) {
        // Initialize particles when component comes into view for the first time
        cleanupFn = initParticles();
      } else {
        // Restart animation if already initialized
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        }
        
        frameRef.current = requestAnimationFrame(function animate() {
          if (!canvasRef.current || !isInView) return;
          
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw particles
          particlesRef.current.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.globalAlpha = particle.alpha;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Draw connections (simplified for performance)
            const connectionDistance = 100;
            for (let j = i + 1; j < particlesRef.current.length; j++) {
              const p2 = particlesRef.current[j];
              const dx2 = particle.x - p2.x;
              const dy2 = particle.y - p2.y;
              const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
              
              if (distance2 < connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance2 / connectionDistance) * 0.2})`;
                ctx.lineWidth = 0.6;
                ctx.stroke();
              }
            }
          });
          
          frameRef.current = requestAnimationFrame(animate);
        });
      }
    } else {
      // Stop animation when not in view
      cancelAnimationFrame(frameRef.current);
    }
    
    return () => {
      cancelAnimationFrame(frameRef.current);
      if (cleanupFn) cleanupFn();
    };
  }, [isInView, initParticles]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
      style={{ touchAction: 'none' }}
    />
  );
};

// Main Hero component
export default function Hero() {
  const titles = [
    "Web Developer",
    "Network Engineer",
    "Cybersecurity Enthusiast",
    "Writer"
  ];

  const [currentTitle, setCurrentTitle] = useState(0);
  const [displayLanguage, setDisplayLanguage] = useState<'en' | 'ar'>('en');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isContactClicked, setIsContactClicked] = useState(false);
  const [isResumeClicked, setIsResumeClicked] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [isResumeHovered, setIsResumeHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const backgroundRef = useRef<HTMLDivElement>(null);

  // Content based on language with phonetic pronunciation
  const content = {
    en: {
      greeting: "Hello World! I am",
      name: "Salahuddin",
      phonetic: "/saː.laːħ ad.diːn/"
    },
    ar: {
      greeting: "السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ",
      name: "صَلَاحُ الدّينْ "
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      rotate: 5,
      scale: 0.8,
    },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        type: "spring",
        damping: 12,
        stiffness: 200
      },
    }),
    exit: (i: number) => ({
      opacity: 0,
      y: -20,
      rotate: -5,
      scale: 0.8,
      transition: {
        delay: i * 0.03,
        duration: 0.3,
      },
    }),
  };

  // Inject CSS animations for tracking-in-expand and focus-in-expand
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .tracking-in-expand{-webkit-animation:tracking-in-expand .7s cubic-bezier(.215,.61,.355,1.000) both;animation:tracking-in-expand .7s cubic-bezier(.215,.61,.355,1.000) both}
      @-webkit-keyframes tracking-in-expand{0%{letter-spacing:-.5em;opacity:0}40%{opacity:.6}100%{opacity:1}}
      @keyframes tracking-in-expand{0%{letter-spacing:-.5em;opacity:0}40%{opacity:.6}100%{opacity:1}}
      
      .focus-in-expand{-webkit-animation:focus-in-expand .8s cubic-bezier(.25,.46,.45,.94) both;animation:focus-in-expand .8s cubic-bezier(.25,.46,.45,.94) both}
      @-webkit-keyframes focus-in-expand{0%{letter-spacing:-.5em;-webkit-filter:blur(12px);filter:blur(12px);opacity:0}100%{-webkit-filter:blur(0);filter:blur(0);opacity:1}}
      @keyframes focus-in-expand{0%{letter-spacing:-.5em;-webkit-filter:blur(12px);filter:blur(12px);opacity:0}100%{-webkit-filter:blur(0);filter:blur(0);opacity:1}}
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Check if device is mobile
=======
import { ChevronDown, Download } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import background from "../components/images/nasa-2W-QWAC0mzI-unsplash.jpg";
import background2 from "../components/images/blackhole.jpg";
import Resume from "../components/Medkour Salah Eddine - Resume Feb 2025.pdf";
import { initParallaxEffect } from "../utils/parallax";

const titles = [
  "Web Developer",
  "Cybersecurity Enthusiast",
  "Network Engineer",
  "Writer"
];

const generateRandomChar = () => {
  const chars = 'AqS5AصLلHز3a9l2ح7kjاm8s!@#$%^&*()';
  return chars[Math.floor(Math.random() * chars.length)];
};

export default function Hero() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [displayName, setDisplayName] = useState("Medkour Salah Eddine");
  const [displayGreeting, setDisplayGreeting] = useState("Hello there I'm");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileLanguageToggle, setMobileLanguageToggle] = useState(false);
  
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const scrambleText = useCallback((start: string, end: string, setDisplay: React.Dispatch<React.SetStateAction<string>>) => {
    let iteration = 0;
    const maxIterations = 5;
    setIsTransitioning(true);

    const interval = setInterval(() => {
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplay(end);
        setIsTransitioning(false);
        return;
      }

      setDisplay((prevText) => {
        return prevText
          .split('')
          .map((_, index) => {
            if (index < iteration) {
              return end[index];
            }
            return generateRandomChar();
          })
          .join('');
      });

      iteration += 1 / 3;
    }, 50);
  }, []);

>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

<<<<<<< HEAD
  // Handle title rotation and language toggle
  useEffect(() => {
    // Rotate through titles
=======
  useEffect(() => {
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
    const titleInterval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);

<<<<<<< HEAD
    // Toggle language based on device type
    let languageInterval: NodeJS.Timeout | null = null;
    
    if (isMobile) {
      // Mobile: automatic toggle every 3 seconds
      languageInterval = setInterval(() => {
        if (!isTransitioning) {
          setIsTransitioning(true);
          setDisplayLanguage(prev => prev === 'en' ? 'ar' : 'en');
          setTimeout(() => setIsTransitioning(false), 1000);
        }
      }, 3000);
=======
    // Different animation handling for mobile vs desktop
    let languageInterval;
    
    if (isMobile) {
      // Mobile animation (simple swap with slide)
      languageInterval = setInterval(() => {
        setMobileLanguageToggle(prev => !prev);
        if (mobileLanguageToggle) {
          setDisplayName("Medkour Salah Eddine");
          setDisplayGreeting("Hello there I'm");
        } else {
          setDisplayName("صَلَاحُ الدّينْ مَذكُورْ");
          setDisplayGreeting("السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ");
        }
      }, 3500);
    } else {
      // Desktop animation (scramble effect)
      languageInterval = setInterval(() => {
        if (!isTransitioning) {
          if (displayName === "Medkour Salah Eddine") {
            scrambleText("Medkour Salah Eddine", "صَلَاحُ الدّينْ مَذكُورْ", setDisplayName);
            scrambleText("Hello there I'm", "السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ", setDisplayGreeting);
          } else {
            scrambleText("صَلَاحُ الدّينْ مَذكُورْ", "Medkour Salah Eddine", setDisplayName);
            scrambleText("السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ", "Hello there I'm", setDisplayGreeting);
          }
        }
      }, 5000);
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
    }

    return () => {
      clearInterval(titleInterval);
<<<<<<< HEAD
      if (languageInterval) clearInterval(languageInterval);
    };
  }, [isMobile, isTransitioning, titles]);

  // Track mouse movement for background parallax effect
=======
      clearInterval(languageInterval);
    };
  }, [isMobile, displayName, isTransitioning, scrambleText, mobileLanguageToggle]);

  useEffect(() => {
    if (floatingElementsRef.current) {
      const cleanup = initParallaxEffect(floatingElementsRef.current, {
        intensity: 0.03,
        bounds: 20
      });
      return cleanup;
    }
  }, []);

>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
  useEffect(() => {
    if (backgroundRef.current) {
      const cleanup = initParallaxEffect(backgroundRef.current, {
        intensity: 0.01,
        reverse: true
      });
      return cleanup;
    }
  }, []);

<<<<<<< HEAD
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  }, []);

  // Toggle language on hover (desktop only)
  const handleLanguageToggle = useCallback(() => {
    if (!isMobile && !isTransitioning) {
      setIsTransitioning(true);
      setDisplayLanguage(prev => prev === 'en' ? 'ar' : 'en');
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  }, [isMobile, isTransitioning]);

  // Handle contact button click
  const scrollToContact = () => {
    setIsContactClicked(true);
    setTimeout(() => setIsContactClicked(false), 1000);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // Intersection Observer for particles
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
=======
  const handleHover = () => {
    if (!isMobile && !isTransitioning) {
      if (displayName === "Medkour Salah Eddine") {
        scrambleText("Medkour Salah Eddine", "صَلَاحُ الدّينْ مَذكُورْ", setDisplayName);
        scrambleText("Hello there I'm", "السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ", setDisplayGreeting);
      } else {
        scrambleText("صَلَاحُ الدّينْ مَذكُورْ", "Medkour Salah Eddine", setDisplayName);
        scrambleText("السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ", "Hello there I'm", setDisplayGreeting);
      }
    }
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to check if the text is Arabic
  const isArabic = (text: string) => {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text);
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
      {/* Animated background */}
      <motion.div
        ref={backgroundRef}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-gradient-to-br"
          style={{
<<<<<<< HEAD
=======
            //backgroundImage: `url(${background})`,
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
            backgroundImage: `url(${background2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
            opacity: 0.15
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
      </motion.div>
<<<<<<< HEAD
      
      {/* Interactive Constellation Effect */}
      <ConstellationEffect />

      {/* Radial gradient that follows mouse */}
      <motion.div 
        className="absolute pointer-events-none"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          opacity: 0.8
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5
        }}
        style={{
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, rgba(79, 70, 229, 0.04) 40%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(40px)',
          mixBlendMode: 'screen'
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto w-full flex flex-col justify-center">
        {/* Greeting text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`greeting-${displayLanguage}`}
            className="h-16 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TextAnimate
              variants={itemVariants}
              className="text-2xl md:text-3xl text-gray-300"
              direction={displayLanguage === 'ar' ? 'rtl' : 'ltr'}
              isArabic={displayLanguage === 'ar'}
              animationType={displayLanguage === 'en' ? "tracking-in-expand" : "focus-in-expand"}
              style={{ 
                fontFamily: displayLanguage === 'ar' ? 'Neo Sans Arabic, sans-serif' : 'inherit',
                textAlign: 'center'
              }}
            >
              {content[displayLanguage].greeting}
            </TextAnimate>
          </motion.div>
        </AnimatePresence>

        {/* Name with phonetic pronunciation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`name-${displayLanguage}`}
            className="relative group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={!isMobile ? handleLanguageToggle : undefined}
          >
            {displayLanguage === 'en' ? (
              <div className="flex flex-col items-center space-y-2">
                <motion.h1
                  className="text-5xl md:text-7xl font-bold text-white tracking-in-expand"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  {content.en.name}
                </motion.h1>
                <motion.p 
                  className="text-sm md:text-base text-gray-400/60 italic font-light"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.6, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  {content.en.phonetic}
                </motion.p>
              </div>
            ) : (
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-white focus-in-expand"
                style={{ 
                  fontFamily: 'Neo Sans Arabic, sans-serif',
                  direction: 'rtl'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {content.ar.name}
              </motion.h1>
            )}
            
            <motion.div
              className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl blur-2xl opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Rotating titles */}
=======

      {/* Floating elements */}
      <div 
        ref={floatingElementsRef}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        {isMobile ? (
          // Mobile content with enhanced animations
          <motion.div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`greeting-${mobileLanguageToggle}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="h-16 flex items-center justify-center"
              >
                <p
                  className="text-2xl md:text-3xl text-gray-300"
                  style={{ 
                    fontFamily: isArabic(displayGreeting) ? 'Neo Sans Arabic, sans-serif' : 'inherit',
                    direction: isArabic(displayGreeting) ? 'rtl' : 'ltr',
                    minWidth: '280px',
                    maxWidth: '320px'
                  }}
                >
                  {displayGreeting}
                </p>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`name-${mobileLanguageToggle}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="h-24 flex items-center justify-center"
              >
                <h1
                  className="text-4xl md:text-6xl font-bold"
                  style={{ 
                    fontFamily: isArabic(displayName) ? 'Neo Sans Arabic, sans-serif' : 'inherit',
                    direction: isArabic(displayName) ? 'rtl' : 'ltr',
                    minWidth: '300px',
                    maxWidth: '400px'
                  }}
                >
                  {displayName}
                </h1>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : (
          // Desktop content with enhanced animations
          <motion.div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="h-16 flex items-center justify-center relative group"
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
            >
              <p
                className="text-2xl md:text-3xl text-gray-300"
                style={{ 
                  fontFamily: isArabic(displayGreeting) ? 'Neo Sans Arabic, sans-serif' : 'inherit',
                  direction: isArabic(displayGreeting) ? 'rtl' : 'ltr',
                  minWidth: '400px',
                  maxWidth: '600px'
                }}
              >
                {displayGreeting}
              </p>
              <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="h-28 flex items-center justify-center relative group"
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
            >
              <h1
                className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
                style={{ 
                  fontFamily: isArabic(displayName) ? 'Neo Sans Arabic, sans-serif' : 'inherit',
                  direction: isArabic(displayName) ? 'rtl' : 'ltr',
                  minWidth: '600px',
                  maxWidth: '800px'
                }}
              >
                {displayName}
              </h1>
              <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl blur-2xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        )}

>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
        <div className="h-16 my-12">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTitle}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-xl md:text-2xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-semibold"
            >
              {titles[currentTitle]}
            </motion.p>
          </AnimatePresence>
        </div>

<<<<<<< HEAD
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Contact Me Button */}
=======
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
<<<<<<< HEAD
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setIsContactHovered(true)}
            onMouseLeave={() => setIsContactHovered(false)}
            onClick={scrollToContact}
            className="relative flex items-center justify-center overflow-hidden cursor-pointer w-[180px] h-[50px] bg-[#1a1a1a]/60 backdrop-blur-sm rounded-full border border-white/10 transition-all duration-300"
          >
            {/* Button Text */}
            <motion.span
              className="absolute z-10 font-medium text-white text-lg tracking-wide"
              initial={false}
              animate={{ 
                opacity: isContactHovered ? 0 : 1,
                scale: isContactHovered ? 0.8 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              Contact Me
            </motion.span>
            
            {/* Social Icons Container */}
            <motion.div
              className="container flex items-center justify-center space-x-4 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: isContactHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Mail Icon */}
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToContact();
                }}
                className="text-white/80 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={22} />
              </motion.a>
              
              {/* LinkedIn Icon */}
              <motion.a
                href="https://www.linkedin.com/in/salah-eddine-medkour/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={22} />
              </motion.a>
              
              {/* GitHub Icon */}
              <motion.a
                href="https://github.com/salahmed-ctrlz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={22} />
              </motion.a>
            </motion.div>
            
            {/* Background hover effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#4f46e5]/80 to-[#818cf8]/80 opacity-0"
              initial={false}
              animate={{ opacity: isContactHovered ? 0.9 : 0 }}
=======
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="relative overflow-hidden group bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-4 rounded-full text-lg font-semibold w-full sm:w-auto"
          >
            <span className="relative z-10">Contact Me</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-indigo-800 opacity-0 group-hover:opacity-100"
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
              transition={{ duration: 0.3 }}
            />
          </motion.button>

<<<<<<< HEAD
          {/* Download Resume Button */}
=======
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
          <motion.a
            href={Resume}
            download="Medkour Salah Eddine - Resume.pdf"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
<<<<<<< HEAD
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setIsResumeHovered(true)}
            onMouseLeave={() => setIsResumeHovered(false)}
            onClick={() => {
              setIsResumeClicked(true);
              setTimeout(() => setIsResumeClicked(false), 2000);
            }}
            className="relative overflow-hidden h-[50px] px-8 rounded-full bg-transparent border-none border-white/10 flex items-center justify-center"
          >
            {/* Button Content */}
            <motion.span
              className="relative z-10 flex items-center gap-2 text-lg font-medium text-white border-none"
              initial={false}
              animate={{ 
                x: isResumeClicked ? -20 : 0, 
                opacity: isResumeClicked ? 0 : 1 
              }}
            >
              <Download className={`w-5 h-5 transition-colors duration-300 ${isResumeHovered ? 'text-white' : 'text-indigo-400'}`} />
              <span className={`button-content transition-colors duration-300 ${isResumeHovered ? 'text-white' : 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400'}`}>
                Download Resume
              </span>
            </motion.span>

            {/* Success checkmark when clicked */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: isResumeClicked ? 1 : 0, 
                scale: isResumeClicked ? 1 : 0.5 
              }}
              className="absolute flex items-center justify-center"
            >
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            {/* Gradient background that appears on hover */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={false}
              animate={{ 
                scaleY: isResumeHovered ? 1 : 0,
                opacity: isResumeHovered ? 1 : 0
              }}
              style={{
                background: 'linear-gradient(82.3deg, rgba(150, 93, 233, 1) 10.8%, rgba(99, 88, 238, 1) 94.3%)',
                transformOrigin: 'bottom',
                borderRadius: 'inherit'
              }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
=======
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden group bg-gradient-to-r from-gray-700 to-gray-800 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center justify-center w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
            />
          </motion.a>
        </div>
      </div>
<<<<<<< HEAD
      
      {/* Scroll indicator */}
=======

>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
<<<<<<< HEAD
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        style={{ zIndex: 20 }}
      >
        <motion.div 
          className="relative w-[30px] h-[50px] rounded-[30px] flex items-center justify-center bg-transparent"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 rounded-[30px] outline-[2px] outline outline-[#697fff] shadow-[0px_0px_10px_rgb(105,127,255)]"></div>
          <motion.div 
            className="w-[5px] h-[10px] rounded-[10px] bg-[#697fff] shadow-[0px_0px_10px_rgb(105,127,255)]"
            animate={{ y: ['40%', '90%', '40%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="absolute top-[140%] text-white uppercase tracking-[1.5px] text-xs">scroll</span>
        </motion.div>
      </motion.div>

      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: isInView,
              speed: 1,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        style={{ position: 'absolute', top: '10%' }}
      />
=======
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/50 hover:text-white/80 transition-colors duration-300"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
    </section>
  );
}