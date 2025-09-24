import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Code2, Brain, Pencil, Globe, ChevronDown } from "lucide-react";
import { SiDuolingo } from "react-icons/si";
import { FaGraduationCap, FaShoppingCart, FaShieldAlt, FaCode, FaCrown } from "react-icons/fa";
import { useRef, useState, useMemo, useCallback } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Import image
// removed unused circular profile image
import portrait1 from './images/Portraits/portrait1.webp';
import portrait2 from './images/Portraits/portrait2.webp';
import portrait3 from './images/Portraits/portrait3.webp';

// Import CSS
import './About.css';

// Languages data
const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "C1–C2 Advanced" },
  { name: "French", level: "C1 Advanced" },
  { name: "Spanish", level: "A1–A2" },
  { name: "Russian / Turkish", level: "A1" }
];

// Timeline data
const timelineData = [
  {
    type: "work",
    title: "Web Developer",
    institution: "Freelance",
    period: "July 2024 - Present",
    description: "Developing modern, high-performance web applications using React, Next.js, TypeScript, Tailwind CSS, and Node.js. Crafting custom solutions with pixel-perfect designs while leveraging technologies like Express.js, MongoDB, Firebase, and WebRTC to ensure seamless user experiences, scalability, and security.",
    icon: FaCode,
    color: "#00eaff", // Neon Blue
    isPeak: false
  },
  {
    type: "work",
    title: "Network & Cybersecurity Self-Learner",
    institution: "Personal Development",
    period: "Present",
    description: "Building deep technical skills through a personal lab (virtual machines, networking configurations, security testing). Applied knowledge of networking, operating systems, and cybersecurity in practical settings, with focus on system setup, hardening, and secure configurations.",
    icon: FaShieldAlt,
    color: "#d400ff", // Neon Purple
    platforms: [
      { name: "Coursera", link: "https://www.coursera.org/user/f30ce887e6bf606962bcdbd0125111e6" },
      { name: "TryHackMe", link: "https://tryhackme.com/p/bettercallsala7" }
    ],
    research: {
      title: "A Preliminary Study of AI-Driven Scams in Algeria: Exposure, Detection, and a Roadmap",
      link: "https://www.researchgate.net/publication/395466783_A_Preliminary_Study_of_AI-Driven_Scams_in_Algeria_Exposure_Detection_and_a_Roadmap"
    },
    isPeak: false
  },
  {
    type: "education",
    title: "Master's in Network & Telecommunications",
    institution: "Badji Mokhtar University of Annaba, Algeria",
    period: "Sep 2023 – Jun 2025",
    description: "Focused on network architecture, secure communications, and cybersecurity, graduating with Highest Honors. Final project: Implementation of an End-to-End Encryption Mechanism in WebRTC Video Streaming, covering real-time encryption, key exchange protocols, and security testing.",
    icon: FaGraduationCap,
    color: "#ffd700", // Gold
    research: {
      title: "Implementation of an End-to-End Encryption Mechanism in WebRTC Video Streaming",
      link: "https://www.researchgate.net/publication/392926889_Implementation_of_an_End-to-End_Encryption_Mechanism_in_WebRTC_Video_Streaming"
    },
    isPeak: true // Career peak
  },
  {
    type: "work",
    title: "Ecommerce Business Owner",
    institution: "eTopia Shop, Algeria",
    period: "Aug 2023 – Oct 2024",
    description: "Launched and managed an online store, emphasizing automation for sales and finance. Improved inventory management and streamlined order fulfillment systems to raise efficiency and customer satisfaction. Devised and executed marketing strategies that scaled growth while sustaining client trust and loyalty.",
    icon: FaShoppingCart,
    color: "#00ff88", // Neon Green
    social: {
      text: "Instagram: eTopia Shop",
      link: "https://www.instagram.com/etopia.plus/"
    },
    isPeak: false
  },
  {
    type: "education",
    title: "Licentiate Degree in Telecommunications Engineering",
    institution: "Badji Mokhtar University",
    period: "Sep 2020 - Jun 2023",
    description: "Focused on telecommunications fundamentals and engineering principles.",
    icon: FaGraduationCap,
    color: "#ff6b6b", // Neon Red
    isPeak: false
  }
];

// Tooltip Component with custom background color
const Tooltip = ({ text, link, children, backgroundColor = "#00eaff" }: { text: string; link: string; children: React.ReactNode; backgroundColor?: string }) => (
  <div className="tooltip-container" style={{ '--background': backgroundColor } as React.CSSProperties}>
    <span className="tooltip">{text}</span>
    <a href={link} target="_blank" rel="noopener noreferrer" className="text font-bold underline text-white hover:text-gray-300 transition-colors">
      {children}
    </a>
  </div>
);

export default function About() {
  // Memoize the container ref to prevent unnecessary re-renders
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for expanded timeline items
  const [expandedItems, setExpandedItems] = useState(Array(timelineData.length).fill(false));
  

  // Memoize animation variants
  const fadeUpVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }), []);

  // removed unused cardVariants

  // Glassmorphism Profile Card with slideshow
  const ProfileCard = () => {
    const cards = useMemo(() => [
      { src: portrait1, alt: 'Portrait 1', title: 'Salah Eddine Medkour', line2: 'Network Engineer', line3: 'Annaba, Algeria' },
      { src: portrait2, alt: 'Portrait 2', title: 'صَلَاحُ الدّينْ مَذكُورْ', line2: 'مهندس شبكات', line3: 'عنابة، الجزائر' },
      { src: portrait3, alt: 'Portrait 3', title: 'Salahuddin', line2: 'Jack Of All Trades', line3: '' }
    ], []);

    const [activeIndex, setActiveIndex] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
    const next = useCallback(() => {
      setSwipeDirection('left');
      setActiveIndex((p) => (p + 1) % cards.length);
    }, [cards.length]);
    const prev = useCallback(() => {
      setSwipeDirection('right');
      setActiveIndex((p) => (p - 1 + cards.length) % cards.length);
    }, [cards.length]);

    // Keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prev();
      } else if (e.key === 'ArrowRight') {
        next();
      }
    }, [prev, next]);

    // removed auto-rotation per request

    // Basic swipe support
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const onTouchStart = (e: React.TouchEvent) => {
      touchStartX.current = e.changedTouches[0].clientX;
    };
    const onTouchMove = (e: React.TouchEvent) => {
      touchEndX.current = e.changedTouches[0].clientX;
    };
    const onTouchEnd = () => {
      if (touchStartX.current === null || touchEndX.current === null) return;
      const delta = touchEndX.current - touchStartX.current;
      const threshold = 40; // px
      if (delta > threshold) {
        setSwipeDirection('right');
        prev();
      } else if (delta < -threshold) {
        setSwipeDirection('left');
        next();
      }
      touchStartX.current = null;
      touchEndX.current = null;
    };

    const activeCard = cards[activeIndex];

    return (
      <div 
        className="w-full relative flex justify-center items-center"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Profile card carousel"
        aria-live="polite"
      >
        {/* External nav arrows (laptop and up) */}
        <button 
          className="hidden lg:block absolute left-[-28px] top-1/2 -translate-y-1/2 rotate-180 z-20" 
          onClick={prev} 
          aria-label="Previous profile card"
          aria-describedby="profile-card-info"
        >
          <div className="arrow">
            <div className="arrow-top"></div>
            <div className="arrow-bottom"></div>
          </div>
        </button>
        <button 
          className="hidden lg:block absolute right-[-28px] top-1/2 -translate-y-1/2 z-20" 
          onClick={next} 
          aria-label="Next profile card"
          aria-describedby="profile-card-info"
        >
          <div className="arrow">
            <div className="arrow-top"></div>
            <div className="arrow-bottom"></div>
          </div>
        </button>

        {/* Simple arrows for laptop view (md:lg range) */}
        <button 
          className="hidden md:block lg:hidden absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-gray-600/50 shadow-xl hover:scale-110"
          onClick={prev} 
          aria-label="Previous profile card"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          className="hidden md:block lg:hidden absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-gray-600/50 shadow-xl hover:scale-110"
          onClick={next} 
          aria-label="Next profile card"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Mobile navigation dots */}
        <div className="md:hidden flex justify-center space-x-2 mb-4" role="tablist" aria-label="Profile card navigation">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-purple-400 w-6' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to profile card ${index + 1}`}
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls={`profile-card-${index}`}
            />
          ))}
        </div>

        {/* Hidden description for screen readers */}
        <div id="profile-card-info" className="sr-only">
          Profile card carousel showing different portraits and information about Salah Eddine Medkour. 
          Use arrow keys or navigation dots to switch between cards.
        </div>

        {/* Outer card with requested style and hover interaction */}
        <div 
          className="group relative z-10 w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] max-h-[80vh] rounded-2xl overflow-hidden drop-shadow-xl bg-[#3d3c3d] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_-12px_rgba(168,85,247,0.4)]"
          id={`profile-card-${activeIndex}`}
          role="tabpanel"
          aria-label={`Profile card ${activeIndex + 1}`}
          aria-describedby="profile-card-info"
        >
          {/* Glow effect under card on hover */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] h-8 bg-purple-500/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.6)]" />
          
          {/* Blurred glow element */}
          <div className="pointer-events-none absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2 opacity-20 group-hover:opacity-40 transition-opacity" />

          {/* Inset inner panel turns into the image card */}
          <div className="relative m-0.5 z-[1] rounded-2xl bg-[#323132] text-white/90 flex flex-col border border-white/10">
            {/* Image as the card */}
            <div
              className="relative w-full h-[50vh] sm:h-[54vh] md:h-[58vh] min-h-[420px] rounded-2xl overflow-hidden bg-[#2b2a2b]"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={(e) => {
                // Desktop swipe support
                const startX = e.clientX;
                const handleMouseMove = (e: MouseEvent) => {
                  const deltaX = e.clientX - startX;
                  if (Math.abs(deltaX) > 50) {
                    if (deltaX > 0) {
                      setSwipeDirection('right');
                      prev();
                    } else {
                      setSwipeDirection('left');
                      next();
                    }
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                  }
                };
                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
              style={{ cursor: 'grab' }}
            >
              <AnimatePresence mode="sync">
                <motion.div
                  key={activeCard.src}
                  className="absolute inset-0"
                  initial={{ 
                    opacity: 0,
                    x: swipeDirection === 'left' ? 100 : swipeDirection === 'right' ? -100 : 0
                  }}
                  animate={{ 
                    opacity: 1,
                    x: 0
                  }}
                  exit={{ 
                    opacity: 0,
                    x: swipeDirection === 'left' ? -100 : swipeDirection === 'right' ? 100 : 0
                  }}
                  transition={{ 
                    duration: 0.6, 
                    ease: 'easeInOut',
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  onAnimationComplete={() => setSwipeDirection(null)}
                >
                  <LazyLoadImage
                    src={activeCard.src}
                    alt={activeCard.alt}
                    width={1920}
                    height={1080}
                    effect="blur"
                    className="w-full h-full object-cover"
                    wrapperClassName="!block !w-full !h-full"
                  />

                  {/* Stronger bottom gradient for readability */}
                  <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:opacity-30" style={{ 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.2) 60%, transparent 80%)',
                    backgroundSize: '100% 100%'
                  }} />

                  {/* Overlay text centered near bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-4 pb-5 text-center group-hover:opacity-30 transition-opacity duration-300">
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {activeCard.title}
                    </h2>
                    {activeCard.line2 && (
                      <p className="text-base md:text-lg text-gray-200">{activeCard.line2}</p>
                    )}
                    {activeCard.line3 && (
                      <p className="text-sm md:text-base text-gray-300">{activeCard.line3}</p>
                    )}
                  </div>
                </motion.div>
                </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Carousel3D = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    
    const cards = useMemo(() => [
      {
        Icon: Pencil,
        title: "Writing",
        subtitle: "Technical & Literature",
        description: "I write documentation, tutorials, cybersecurity articles, and sometimes literature in Arabic, French, or English.",
        skills: [
          "Technical Docs",
          "API Guides",
          "Tutorials",
          "Cybersecurity Writeups",
          "Essays",
          "Research Papers",
          "Poetry",
          "Articles",
          "Literary Pieces",
          "Multilingual Writing"
        ],
        gradient: "from-purple-500 to-pink-500",
        neonColor: "#d400ff"
      },
      {
        Icon: Code2,
        title: "Web Development",
        subtitle: "Frontend & Backend",
        description: "I build web apps that are fast, simple, and easy to maintain. I write clean code and use tools I trust, and I'm comfortable with AI tools and agents.",
        skills: [
          "React / Next.js",
          "Node.js",
          "REST APIs",
          "Tailwind CSS",
          "MongoDB / Firebase",
          "AI",
          "JWT Auth",
          "Responsive Design",
          "Deployments"
        ],
        gradient: "from-blue-500 to-indigo-500",
        neonColor: "#00eaff"
      },
      {
        Icon: Brain,
        title: "Cybersecurity",
        subtitle: "Practice & Tools",
        description: "I'm constantly practicing real security tasks like packet analysis, encryption, and testing systems for weak spots. But I'm interested in acquiring real-life experience in the field.",
        skills: [
          "Pentesting (Web / Network)",
          "Wireshark",
          "Burp Suite / OWASP ZAP",
          "E2EE / AES / ChaCha20",
          "Linux Tools (Kali)",
          "SSH / VPN / Proxychains",
          "Firewall Configs",
          "AI"
        ],
        gradient: "from-emerald-500 to-green-500",
        neonColor: "#00ff88"
      }
    ], []);
    

    // Memoize handlers
    const handleNext = useCallback(() => {
      setCurrentIndex(prev => (prev + 1) % cards.length);
    }, [cards.length]);

    const handlePrev = useCallback(() => {
      setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
    }, [cards.length]);

    // Memoize card animation variants
    const cardAnimationVariants = useMemo(() => ({
      initial: (distance: number) => ({ 
        scale: 0.8,
        opacity: 0,
        x: distance * 100
      }),
      animate: (distance: number) => ({
        scale: distance === 0 ? 1 : 0.7,
        opacity: distance === 0 ? 1 : 0.4,
        x: distance * (window.innerWidth < 640 ? 300 : 600),
        filter: distance === 0 ? 'blur(0px)' : 'blur(2px)',
      }),
      exit: (distance: number) => ({ 
        scale: 0.8,
        opacity: 0,
        x: distance * 100
      })
    }), []);

    return (
      <div className="relative h-[500px] sm:h-[400px] w-full mt-10 sm:mt-20">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 md:left-8 top-1/2 z-50 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-gray-800/80 hover:bg-gray-700/80 text-white/80 hover:text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-gray-600/50 shadow-xl hover:scale-110"
          aria-label="Previous card"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 md:right-8 top-1/2 z-50 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-gray-800/80 hover:bg-gray-700/80 text-white/80 hover:text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-gray-600/50 shadow-xl hover:scale-110"
          aria-label="Next card"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Cards Container */}
        <div className="relative h-full max-w-6xl mx-auto flex items-center justify-center px-4 sm:px-0">
          <AnimatePresence mode="popLayout" initial={false}>
            {cards.map((card, index) => {
              const distance = (index - currentIndex + cards.length) % cards.length;
              const isActive = distance === 0;
              
              return (
                <motion.div
                  key={card.title}
                  custom={distance}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={cardAnimationVariants}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className={`absolute w-full max-w-[90vw] sm:max-w-lg
                    ${isActive ? 'cursor-default z-20' : 'cursor-pointer z-10'}`}
                  onClick={() => !isActive && setCurrentIndex(index)}
                >
                  <div 
                    className={`relative p-6 sm:p-8 bg-gray-900/20 backdrop-blur-md rounded-xl border transition-all duration-500 group/card ${
                      isActive ? 'border-gray-600/50 shadow-2xl' : 'border-gray-700/20 shadow-lg'
                    }`}
                    style={{
                      '--neon-color': card.neonColor,
                      backgroundColor: 'rgba(15, 15, 15, 0.4)',
                      boxShadow: isActive ? `0 0 20px ${card.neonColor}40, 0 0 40px ${card.neonColor}20` : undefined
                    } as React.CSSProperties}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                      e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                    }}
                  >
                    {/* Gradient Background Effect */}
                    <div 
                      className={`absolute inset-0 rounded-xl opacity-20 transition-opacity duration-500 ${isActive ? 'opacity-30' : 'opacity-10'}`}
                      style={{
                        background: `radial-gradient(circle at center, ${card.neonColor}15, transparent 70%)`
                      }}
                    />

                    {/* Icon Container */}
                    <div className="relative mb-3 sm:mb-6 flex justify-center">
                      <div className="relative bg-gray-800/30 backdrop-blur-sm p-2.5 sm:p-4 rounded-full w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center transition-all duration-300 border border-gray-700/30">
                        <card.Icon className="w-5 h-5 sm:w-8 sm:h-8 text-gray-300" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2 sm:space-y-4">
                      <div>
                        <h3 className="text-base sm:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-center">
                          {card.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-400 mt-0.5 sm:mt-1 text-center">
                          {card.subtitle}
                        </p>
                      </div>

                      <p className="text-xs sm:text-base text-gray-400 line-clamp-3 text-center">
                        {card.description}
                      </p>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1 sm:gap-2 justify-center pt-1 sm:pt-2">
                        {card.skills.slice(0, isActive ? undefined : 3).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="text-[10px] sm:text-xs font-medium px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-gray-800/40 text-gray-300 transition-all duration-300 border border-gray-700/30"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Dots Navigation */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  // Memoize the Carousel component
  const MemoizedCarousel = useMemo(() => <Carousel3D />, []);

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="section text-white relative overflow-hidden"
    >
      
      {/* Enhanced Blurry Background with Fade Edges */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-3xl bg-black/70" 
             style={{
               filter: 'blur(20px)',
               maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
               WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
             }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* About Me Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeUpVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-loose tracking-wide hyphens-auto text-justify px-4">
            My name is <span className="font-bold text-white">Salahuddin Medkour</span>, a <span className="font-bold text-white">23-year-old</span> from <span className="font-bold text-white">Annaba, Algeria</span>. I hold a degree in <span className="font-bold text-white">Network Engineering</span> and I'm currently looking for new opportunities. My main interests are <span className="font-bold text-white">Cybersecurity</span>, <span className="font-bold text-white">Networking</span>, <span className="font-bold text-white">Web Development</span>, and <span className="font-bold text-white">AI</span>.
          </p>
        </motion.div>

        {/* Profile Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            variants={fadeUpVariants}
          className="mb-20"
        >
          <ProfileCard />
          </motion.div>

        {/* Interests Section */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          variants={fadeUpVariants}
        >
          <p className="text-lg md:text-xl leading-relaxed min-h-[3rem] flex items-center justify-center">
            <span>I'm interested in</span>
            <span className="mx-2"></span>
            <span className="relative inline-block">
              <span className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-lg" />
              <span className="relative text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text font-bold">
                <Typewriter 
                  words={["Web Development", "Cybersecurity", "Scriptwriting & Automation", "Writing"]} 
                  loop 
                  cursor 
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </span>
          </p>
        </motion.div>

        {/* Languages Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
          >
            Languages
          </motion.h3>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="bg-gray-900/30 backdrop-blur-md rounded-2xl border border-gray-700/30 p-6 md:p-8 relative overflow-hidden"
          >
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl"></div>
            
            {/* Header */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between mb-8">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-xl font-semibold text-white">Language Proficiency</span>
              </div>
              <div className="relative z-50">
                <Tooltip text="View Duolingo Profile" link="https://www.duolingo.com/profile/bettercallsala7" backgroundColor="#58CC02">
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-lg border border-green-500/20 hover:bg-green-500/20 transition-all duration-300 cursor-pointer backdrop-blur-sm">
                    <SiDuolingo style={{ color: "#58CC02" }} className="w-4 h-4" />
                    <span className="text-sm font-medium text-green-400">Duolingo</span>
                  </div>
                </Tooltip>
              </div>
            </div>
            
            {/* Languages List */}
            <div className="relative z-10 space-y-3 mb-8">
              {languages.map((language, index) => (
                <motion.div
                  key={language.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between py-3 px-4 rounded-xl bg-gray-800/20 backdrop-blur-sm border border-gray-700/20 hover:bg-gray-800/40 hover:border-gray-600/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    <span className="font-semibold text-white group-hover:text-blue-100 transition-colors">{language.name}</span>
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors font-medium">{language.level}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Translation Service Line */}
            <div className="relative z-10 pt-6 border-t border-gray-700/40">
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-gray-700/30">
                <p className="text-sm text-center leading-relaxed">
                  <span className="font-semibold text-white">Eng ↔ Ar translation service</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="text-gray-300">Documents + content writing</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="text-gray-300">Tutoring/teaching both languages</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="text-2xl md:text-3xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
          >
            Experience & Education
          </motion.h3>

          <div className="relative">
            <div className="space-y-3">
              {timelineData.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: index * 0.1
                      }
                    }
                  }}
                  className="group"
                >
                  {/* Dropdown Card */}
                  <div 
                    className="relative bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-700/30 overflow-hidden transition-all duration-300 hover:bg-gray-800/30 cursor-pointer"
                    onClick={() => {
                      const newExpandedItems = [...expandedItems];
                      newExpandedItems[index] = !newExpandedItems[index];
                      setExpandedItems(newExpandedItems);
                    }}
                    style={{
                      boxShadow: expandedItems[index] ? `0 0 20px ${item.color}20, 0 0 40px ${item.color}10` : 'none'
                    }}
                  >
                    {/* Colored left border */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
                      style={{ backgroundColor: item.color }}
                    />
                    
                    {/* Header */}
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                      <div className="flex items-start sm:items-center space-x-4">
                        {/* Icon */}
                        <div className="w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center transition-colors duration-300 group-hover:bg-gray-700/50 flex-shrink-0">
                          <item.icon className="w-5 h-5 text-gray-400 transition-colors duration-300 group-hover:text-gray-300" />
                        </div>
                        
                        {/* Title and Institution */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                            <h4 className="text-base sm:text-lg font-semibold text-white transition-colors duration-300 group-hover:text-gray-100 leading-tight">
                              {item.title}
                            </h4>
                            {item.isPeak && (
                              <div className="px-2 py-1 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 backdrop-blur-sm text-yellow-300 text-xs font-bold rounded-full flex items-center space-x-1 border border-yellow-400/30 sm:flex-shrink-0">
                                <FaCrown className="w-3 h-3" />
                                <span className="hidden sm:inline">PEAK</span>
                                <span className="sm:hidden">★</span>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300 mt-1">
                            {item.institution}
                          </p>
                          <p className="text-xs sm:hidden text-gray-500 transition-colors duration-300 group-hover:text-gray-400 mt-1">
                            {item.period}
                          </p>
                        </div>
                      </div>
                      
                      {/* Period and Chevron - Hidden on mobile, shown on desktop */}
                      <div className="hidden sm:flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-500 transition-colors duration-300 group-hover:text-gray-400">
                          {item.period}
                        </span>
                        <motion.div
                          animate={{ rotate: expandedItems[index] ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-gray-400 transition-colors duration-300 group-hover:text-gray-300" />
                        </motion.div>
                      </div>
                      
                      {/* Mobile Chevron */}
                      <div className="sm:hidden flex justify-end">
                        <motion.div
                          animate={{ rotate: expandedItems[index] ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-gray-400 transition-colors duration-300 group-hover:text-gray-300" />
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Expandable Content */}
                    <AnimatePresence>
                      {expandedItems[index] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 border-t border-gray-700/30">
                            <div className="pt-4 space-y-4">
                              <p className="text-gray-300 leading-relaxed">{item.description}</p>
                              
                              {/* Research links */}
                              {item.research && (
                                <div>
                                  <Tooltip text="View Research Publication" link={item.research.link} backgroundColor="#d400ff">
                                    <span className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
                                      📄 {item.research.title}
                                    </span>
                                  </Tooltip>
                                </div>
                              )}
                              
                              {/* Social links */}
                              {item.social && (
                                <div>
                                  <Tooltip text={item.social.text} link={item.social.link} backgroundColor="#00eaff">
                                    <span className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                                      🔗 {item.social.text}
                                    </span>
                                  </Tooltip>
                                </div>
                              )}
                              
                              {/* Platforms for Cybersecurity section */}
                              {item.platforms && (
                                <div>
                                  <h5 className="text-white font-medium mb-2 text-sm">Learning Platforms:</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {item.platforms.map((platform, idx) => (
                                      <Tooltip key={idx} text={`Visit ${platform.name} Profile`} link={platform.link} backgroundColor="#00eaff">
                                        <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-md hover:bg-blue-500/30 transition-colors">
                                          {platform.name}
                                        </span>
                                      </Tooltip>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Cards */}
        <div className="space-y-8">
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="text-2xl md:text-3xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
          >
            Interests & Expertise
          </motion.h3>

          {MemoizedCarousel}
        </div>
      </div>
    </section>
  );
}