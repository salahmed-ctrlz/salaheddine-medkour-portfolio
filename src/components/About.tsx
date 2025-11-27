import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Code2, Pencil, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { SiDuolingo } from "react-icons/si";
import { FaGraduationCap, FaShoppingCart, FaShieldAlt, FaCode, FaCrown, FaRedhat, FaChalkboardTeacher } from "react-icons/fa";
import { useRef, useState, useMemo, useCallback } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'flag-icons/css/flag-icons.min.css';

import portrait1 from './images/Portraits/portrait1.webp';
import portrait2 from './images/Portraits/portrait2.webp';
import portrait3 from './images/Portraits/portrait3.webp';

import './About.css';

const languages = [
  { 
    name: "Arabic", 
    level: "Native",
    flags: ["sa"]
  },
  { 
    name: "English", 
    level: "C1+ to C2",
    flags: ["gb", "us"]
  },
  { 
    name: "French", 
    level: "B2+ to C1",
    flags: ["fr"]
  },
  { 
    name: "Spanish", 
    level: "A1+ to A2",
    flags: ["es"]
  },
  { 
    name: "Russian & Turkish", 
    level: "A1+",
    flags: ["ru", "tr"]
  }
];

const timelineData = [
  {
    type: "work",
    title: "Teaching Assistant & Lab Instructor",
    institution: "Université Badji Mokhtar de Annaba",
    period: "Oct 2025 - Present",
    description: "Teaching and supervising Python lab sessions for master's students, and mentoring first-year student-teachers at ENS through the 'Information and Communication Technology' module. Leading practical sessions covering IT fundamentals, cloud collaboration (Google Workspace), cybersecurity awareness, and digital literacy.",
    icon: FaChalkboardTeacher,
    color: "#f59e0b",
    isPeak: false,
    skills: ["Python", "IT Fundamentals", "Google Workspace", "Cybersecurity", "Digital Literacy", "Teaching"]
  },
  {
    type: "work",
    title: "Web Developer",
    institution: "Freelance",
    period: "July 2024 - Present",
    description: "Freelance web developer specializing in custom online portfolios. Full-stack development from UI/UX design to deployment using React, Next.js, and Node.js.",
    icon: FaCode,
    color: "#00eaff",
    isPeak: false
  },
  {
    type: "work",
    title: "Network & Cybersecurity Self-Learner",
    institution: "Personal Development",
    period: "Present",
    description: "Building deep technical skills through personal lab environments. Focus on networking, operating systems, and cybersecurity with practical security testing.",
    icon: FaShieldAlt,
    color: "#d400ff",
    platforms: [
      { name: "Coursera", link: "https://www.coursera.org/user/f30ce887e6bf606962bcdbd0125111e6" },
      { name: "TryHackMe", link: "https://tryhackme.com/p/bettercallsala7" }
    ],
    research: {
      title: "AI-Driven Scams in Algeria: Exposure, Detection, and Roadmap",
      link: "https://www.researchgate.net/publication/395466783_A_Preliminary_Study_of_AI-Driven_Scams_in_Algeria_Exposure_Detection_and_a_Roadmap"
    },
    isPeak: false
  },
  {
    type: "education",
    title: "Master's in Network & Telecommunications",
    institution: "Badji Mokhtar University of Annaba",
    period: "Sep 2023 – Jun 2025",
    description: "Focused on network architecture, secure communications, and cybersecurity. Graduated with Highest Honors. Thesis: Implementation of End-to-End Encryption in WebRTC Video Streaming.",
    icon: FaGraduationCap,
    color: "#ffd700",
    research: {
      title: "E2E Encryption in WebRTC Video Streaming",
      link: "https://www.researchgate.net/publication/392926889_Implementation_of_an_End-to-End_Encryption_Mechanism_in_WebRTC_Video_Streaming"
    },
    isPeak: true
  },
  {
    type: "work",
    title: "Ecommerce Business Owner",
    institution: "eTopia Shop, Algeria",
    period: "Aug 2023 – Oct 2024",
    description: "Launched and managed an online store with automated sales and finance systems. Improved inventory management and customer satisfaction.",
    icon: FaShoppingCart,
    color: "#00ff88",
    social: {
      text: "Instagram: eTopia Shop",
      link: "https://www.instagram.com/etopia.plus/"
    },
    isPeak: false
  },
  {
    type: "education",
    title: "Licentiate in Telecommunications Engineering",
    institution: "Badji Mokhtar University",
    period: "Sep 2020 - Jun 2023",
    description: "Telecommunications fundamentals and engineering principles.",
    icon: FaGraduationCap,
    color: "#ff6b6b",
    isPeak: false
  }
];

interface TooltipProps {
  text: string;
  link: string;
  children: React.ReactNode;
  color?: string;
}

const Tooltip = ({ text, link, children, color = "#00eaff" }: TooltipProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="font-medium text-white/90 hover:text-white transition-colors underline decoration-1 underline-offset-2"
        style={{ textDecorationColor: color }}
      >
        {children}
      </a>
      <AnimatePresence>
        {isHovered && (
          <motion.span 
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-medium text-white rounded-lg whitespace-nowrap z-[9999] pointer-events-none"
            style={{ 
              backgroundColor: color,
              boxShadow: `0 4px 20px ${color}40`
            }}
          >
            {text}
            <span 
              className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
              style={{ borderTopColor: color }}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

// Custom Arrow Component
const CustomArrow = ({ 
  direction, 
  onClick, 
  className = "" 
}: { 
  direction: 'left' | 'right'; 
  onClick: () => void; 
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={`arrow ${direction} ${className}`}
    aria-label={direction === 'left' ? 'Previous' : 'Next'}
  >
    <div className="arrow-top"></div>
    <div className="arrow-bottom"></div>
  </button>
);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedItems, setExpandedItems] = useState<boolean[]>(Array(timelineData.length).fill(false));

  const fadeUpVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }), []);

  // Profile Card Component
  const ProfileCard = () => {
    const cards = useMemo(() => [
      { src: portrait1, alt: 'Portrait 1', title: 'Salah Eddine Medkour', line2: 'Network Engineer', line3: 'Annaba, Algeria' },
      { src: portrait2, alt: 'Portrait 2', title: 'صَلَاحُ الدّينْ مَذكُورْ', line2: 'مهندس شبكات', line3: 'عنابة، الجزائر' },
      { src: portrait3, alt: 'Portrait 3', title: 'Salahuddin', line2: 'Jack Of All Trades', line3: '' }
    ], []);

    const [activeIndex, setActiveIndex] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartX = useRef<number>(0);
    
    const next = useCallback(() => {
      setSwipeDirection('left');
      setActiveIndex((p) => (p + 1) % cards.length);
    }, [cards.length]);
    
    const prev = useCallback(() => {
      setSwipeDirection('right');
      setActiveIndex((p) => (p - 1 + cards.length) % cards.length);
    }, [cards.length]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    }, [prev, next]);

    const handleTouchStart = (e: React.TouchEvent) => {
      dragStartX.current = e.touches[0].clientX;
      setIsDragging(true);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
      if (!isDragging) return;
      const deltaX = e.changedTouches[0].clientX - dragStartX.current;
      if (deltaX > 50) prev();
      else if (deltaX < -50) next();
      setIsDragging(false);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      dragStartX.current = e.clientX;
      setIsDragging(true);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartX.current;
      if (deltaX > 50) prev();
      else if (deltaX < -50) next();
      setIsDragging(false);
    };

    const handleMouseLeave = () => setIsDragging(false);

    const activeCard = cards[activeIndex];

    return (
      <div 
        className="w-full flex items-center justify-center gap-8 md:gap-12 lg:gap-20"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Profile card carousel"
      >
        {/* Left Arrow */}
        <CustomArrow 
          direction="left" 
          onClick={prev}
          className="hidden md:flex flex-shrink-0" 
        />

        {/* Card + Dots Container */}
        <div className="flex flex-col items-center">
          {/* Card Container */}
          <div 
            className={`relative w-[300px] sm:w-[340px] md:w-[380px] lg:w-[400px] aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-gray-800/50 to-gray-900/50 shadow-2xl select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave} // This makes the whole card area draggable
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={activeIndex}
                className="absolute inset-0"
                initial={{ 
                  opacity: 0,
                  x: swipeDirection === 'left' ? 80 : swipeDirection === 'right' ? -80 : 0
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ 
                  opacity: 0,
                  x: swipeDirection === 'left' ? -80 : swipeDirection === 'right' ? 80 : 0
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onAnimationComplete={() => setSwipeDirection(null)}
              >
                <LazyLoadImage
                  src={activeCard.src}
                  alt={activeCard.alt}
                  effect="blur"
                  className="w-full h-full object-cover pointer-events-none"
                  wrapperClassName="!block !w-full !h-full"
                  draggable={false}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-center pointer-events-none">
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1"
                  >
                    {activeCard.title}
                  </motion.h2>
                  {activeCard.line2 && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="text-sm sm:text-base text-white/80"
                    >
                      {activeCard.line2}
                    </motion.p>
                  )}
                  {activeCard.line3 && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-xs sm:text-sm text-white/60"
                    >
                      {activeCard.line3}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-3 mt-8" role="tablist">
            <button onClick={prev} className="md:hidden p-1 text-white/40 hover:text-white transition-colors" aria-label="Previous profile card">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {cards.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="h-2 rounded-full transition-colors duration-300"
                animate={{
                  width: index === activeIndex ? 24 : 8,
                  backgroundColor: index === activeIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)'
                }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Go to profile card ${index + 1}`}
              />
            ))}
            <button onClick={next} className="md:hidden p-1 text-white/40 hover:text-white transition-colors" aria-label="Next profile card">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Arrow */}
        <CustomArrow 
          direction="right" 
          onClick={next}
          className="hidden md:flex flex-shrink-0" 
        />
      </div>
    );
  };

  // Languages Section Component
  const LanguagesSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="language-card"
          >
            {/* Flags */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {lang.flags.map((flag, idx) => (
                <span 
                  key={idx} 
                  className={`fi fi-${flag} text-2xl sm:text-3xl lg:text-4xl rounded-sm`}
                />
              ))}
            </div>
            
            {/* Language Name */}
            <h4 className="text-sm sm:text-base lg:text-lg font-bold text-white text-center mb-1">
              {lang.name}
            </h4>
            
            {/* Level */}
            <p className="text-xs sm:text-sm text-white/50 text-center">
              {lang.level}
            </p>
          </motion.div>
        ))}
      </div>
      
      {/* Duolingo Link */}
      <motion.a 
        href="https://www.duolingo.com/profile/bettercallsala7"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="block group"
      >
        <div className="flex items-center justify-center gap-3 py-4 px-6 transition-all duration-300">
          <SiDuolingo className="w-5 h-5 text-[#58CC02]" />
          <span className="text-sm font-medium text-[#58CC02] group-hover:underline">View Duolingo Profile</span>
        </div>
      </motion.a>
    </div>
  );

  // Skills Carousel Component
  const SkillsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const cards = useMemo(() => [
      {
        Icon: Code2,
        title: "Web Development",
        subtitle: "Frontend & Backend",
        description: "Building modern web apps with React, Next.js, and AI integration.",
        skills: ["React / Next.js", "TypeScript", "Tailwind CSS", "Firebase", "UI/UX"],
        color: "#00eaff"
      },
      {
        Icon: FaRedhat,
        title: "Cybersecurity",
        subtitle: "Practice & Tools",
        description: "Packet analysis, encryption implementation, and penetration testing.",
        skills: ["Pentesting", "Wireshark", "Burp Suite", "E2EE / AES", "Linux/Kali"],
        color: "#00ff88"
      },
      {
        Icon: Pencil,
        title: "Writing",
        subtitle: "Technical & Creative",
        description: "Documentation, tutorials, and creative literature in multiple languages.",
        skills: ["Technical Docs", "API Guides", "Research Papers", "Essays", "Poetry"],
        color: "#d400ff"
      }
    ], []);

    const handleNext = useCallback(() => {
      setCurrentIndex(prev => (prev + 1) % cards.length);
    }, [cards.length]);

    const handlePrev = useCallback(() => {
      setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
    }, [cards.length]);

    const [isDragging, setIsDragging] = useState(false);
    const dragStartX = useRef<number>(0);

    const handleTouchStart = (e: React.TouchEvent) => {
      dragStartX.current = e.touches[0].clientX;
      setIsDragging(true);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
      if (!isDragging) return;
      const deltaX = e.changedTouches[0].clientX - dragStartX.current;
      if (deltaX > 50) handlePrev();
      else if (deltaX < -50) handleNext();
      setIsDragging(false);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      dragStartX.current = e.clientX;
      setIsDragging(true);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartX.current;
      if (deltaX > 50) handlePrev();
      else if (deltaX < -50) handleNext();
      setIsDragging(false);
    };

    return (
      <div className="w-full flex flex-col items-center">
        {/* Arrow + Cards Row */}
        <div className="w-full flex items-center justify-center gap-4 sm:gap-8 md:gap-12">
          {/* Left Arrow */}
          <CustomArrow 
            direction="left" 
            onClick={handlePrev} 
            className="hidden md:flex flex-shrink-0" 
          />

          {/* Cards Container */}
          <div 
            className={`relative h-[320px] sm:h-[300px] w-full max-w-xs sm:max-w-sm md:max-w-md flex items-center justify-center overflow-visible select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onTouchStart={handleTouchStart}
            onTouchMove={(e) => e.preventDefault()}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDragging(false)}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {cards.map((card, index) => {
                const offset = index - currentIndex;
                const normalizedOffset = ((offset % cards.length) + cards.length) % cards.length;
                const position = normalizedOffset === 0 ? 0 : normalizedOffset === 1 ? 1 : -1;
                const isActive = position === 0;
                
                return (
                  <motion.div
                    key={card.title}
                    className="absolute w-full"
                    initial={false}
                    animate={{
                      x: position * 40,
                      scale: isActive ? 1 : 0.9,
                      opacity: isActive ? 1 : 0,
                      zIndex: isActive ? 10 : 5,
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 35 }}
                    onClick={() => !isActive && setCurrentIndex(index)}
                    style={{ cursor: isActive ? 'default' : 'pointer' }}
                  >
                    <div
                      className="h-[300px] sm:h-[280px] p-6 sm:p-8 rounded-2xl flex flex-col transition-all duration-300"
                      style={{
                        background: isActive 
                          ? `linear-gradient(160deg, ${card.color}12 0%, rgba(0,0,0,0.5) 100%)`
                          : 'rgba(255,255,255,0.02)',
                        boxShadow: isActive ? `0 25px 60px -15px ${card.color}20` : 'none'
                      }}
                    > 
                      <div className={!isActive ? 'blur-sm' : ''}>
                      {/* Icon */}
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 mx-auto"
                        style={{ backgroundColor: `${card.color}12` }}
                      >
                        <card.Icon className="w-7 h-7" style={{ color: card.color }} />
                      </div>

                      {/* Title */}
                      <div className="text-center mb-4">
                        <h4 className="text-lg sm:text-xl font-bold text-white mb-1">
                          {card.title}
                        </h4>
                        <p className="text-xs text-white/40">{card.subtitle}</p>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-white/60 text-center mb-5 leading-relaxed line-clamp-2">
                        {card.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 justify-center mt-auto">
                        {card.skills.slice(0, 5).map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2.5 py-1 rounded-full"
                            style={{
                              backgroundColor: `${card.color}10`,
                              color: isActive ? card.color : 'rgba(255,255,255,0.4)'
                            }}
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

          {/* Right Arrow */}
          <CustomArrow 
            direction="right" 
            onClick={handleNext} 
            className="hidden md:flex flex-shrink-0" 
          />
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <button onClick={handlePrev} className="md:hidden p-1 text-white/40 hover:text-white transition-colors" aria-label="Previous skill">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {cards.map((card, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="h-2 rounded-full"
              animate={{
                width: index === currentIndex ? 24 : 8,
                backgroundColor: index === currentIndex ? card.color : 'rgba(255,255,255,0.2)'
              }}
              whileHover={{ backgroundColor: index === currentIndex ? card.color : 'rgba(255,255,255,0.4)' }}
              transition={{ duration: 0.2 }}
              aria-label={`Go to skill: ${card.title}`}
            />
          ))}
          <button onClick={handleNext} className="md:hidden p-1 text-white/40 hover:text-white transition-colors" aria-label="Next skill">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const toggleExpand = useCallback((index: number) => {
    setExpandedItems(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  }, []);

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="py-24 md:py-36 text-white relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-gray-900/50 to-black" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          variants={fadeUpVariants}
          className="text-center mb-20 md:mb-28"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-white">
            About Me
          </h2>
          <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            My name is <span className="text-white">Salahuddin Medkour</span>, a 23-year-old from Annaba, Algeria. 
            I hold a Master's degree in <span className="text-white">Networks Engineering</span>. And currently working as a <span className="text-white">Teaching Assistant & Lab Instructor</span> at <span className="text-white">Badji Mokhtar University of Annaba.</span> I'm actively looking for new opportunities. 
            My main interests are <span className="text-white">Cybersecurity</span>, <span className="text-white">Networking</span>, <span className="text-white">Freelance Web Development</span>, and <span className="text-white">AI</span>. 
            I'm very motivated and eager to learn and grow in these fields.
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          variants={fadeUpVariants}
          className="mb-24 md:mb-32"
        >
          <ProfileCard />
        </motion.div>

        {/* Typewriter */}
        <motion.div 
          className="text-center mb-24 md:mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeUpVariants}
        >
          <p className="text-lg sm:text-xl text-white/50">
            Currently exploring{" "}
            <span className="text-white font-medium">
              <Typewriter 
                words={["Web Development", "Cybersecurity", "Network Engineering", "Technical Writing"]} 
                loop 
                cursor 
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={40}
                delaySpeed={2500}
              />
            </span>
          </p>
        </motion.div>

        {/* Languages */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          variants={fadeUpVariants}
          className="mb-24 md:mb-32"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">
            Languages
          </h3>
          
          <LanguagesSection />
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          variants={fadeUpVariants}
          className="mb-24 md:mb-32"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">
            Experience & Education
          </h3>

          <div className="space-y-3">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div 
                  className="relative bg-white/[0.02] hover:bg-white/[0.04] rounded-xl transition-all duration-300 cursor-pointer overflow-hidden group"
                  onClick={() => toggleExpand(index)}
                >
                  {/* Left accent */}
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: item.color }}
                    animate={{ opacity: expandedItems[index] ? 1 : 0.4 }}
                  />
                  
                  {/* Header */}
                  <div className="p-5 sm:p-6 pl-6 sm:pl-7">
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        <item.icon 
                          className="w-5 h-5 sm:w-6 sm:h-6" 
                          style={{ color: item.color }} 
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-base sm:text-lg font-semibold text-white">
                                {item.title}
                              </h4>
                              {item.isPeak && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-[10px] font-bold rounded">
                                  <FaCrown className="w-2.5 h-2.5" />
                                  PEAK
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-white/40 mt-1">
                              {item.institution}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="text-xs sm:text-sm text-white/30">
                              {item.period}
                            </span>
                            <motion.div
                              animate={{ rotate: expandedItems[index] ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-5 h-5 text-white/30 group-hover:text-white/50 transition-colors" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expandable Content */}
                  <AnimatePresence>
                    {expandedItems[index] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[76px] sm:pl-[84px] space-y-4 border-t border-white/5 pt-4">
                          <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                            {item.description}
                          </p>
                          
                          {item.skills && (
                            <div className="flex flex-wrap gap-2">
                              {item.skills.map((skill, idx) => (
                                <span 
                                  key={idx}
                                  className="text-xs px-2.5 py-1 rounded-lg"
                                  style={{
                                    backgroundColor: `${item.color}10`,
                                    color: item.color
                                  }}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          {item.research && (
                            <Tooltip text="View Publication" link={item.research.link} color={item.color}>
                              <span className="text-sm">📄 {item.research.title}</span>
                            </Tooltip>
                          )}
                          
                          {item.social && (
                            <Tooltip text="Visit Profile" link={item.social.link} color={item.color}>
                              <span className="text-sm">🔗 {item.social.text}</span>
                            </Tooltip>
                          )}
                          
                          {item.platforms && (
                            <div className="flex flex-wrap gap-2">
                              {item.platforms.map((platform, idx) => (
                                <Tooltip key={idx} text={`Visit ${platform.name}`} link={platform.link} color={item.color}>
                                  <span className="text-sm px-3 py-1.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                    {platform.name}
                                  </span>
                                </Tooltip>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interests & Expertise */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          variants={fadeUpVariants}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-12 text-center">
            Interests & Expertise
          </h3>
          
          <SkillsCarousel />
        </motion.div>
      </div>
    </section>
  );
}