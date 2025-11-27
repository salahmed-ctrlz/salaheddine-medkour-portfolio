import { motion, AnimatePresence } from "framer-motion";
import { Download, Mail, Github, Linkedin } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import Resume from "./MEDKOUR_SALAH_EDDINE_CV_EN.pdf";

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


// Main Hero component
export default function Hero() {
  const titles = [
    "Web Developer",
    "Network Engineer",
    "Cybersecurity Enthusiast",
    "Writer"
  ];

  const [currentTitle, setCurrentTitle] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isResumeClicked, setIsResumeClicked] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [isResumeHovered, setIsResumeHovered] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [displayLanguage, setDisplayLanguage] = useState('en');

  // Content based on language with phonetic pronunciation
  const content: Record<string, { greeting: string; name: string; phonetic?: string }> = {
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

  // Check if device is mobile - using 640px for better tablet handling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowBackToTop(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle title rotation and language toggle
  useEffect(() => {
    const titleInterval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);

    // Language switching - timed for mobile, manual for desktop
    let languageInterval: NodeJS.Timeout | undefined;
    
    if (isMobile) {
      // Mobile animation (timed switching)
      languageInterval = setInterval(() => {
        setDisplayLanguage(prev => prev === 'en' ? 'ar' : 'en');
      }, 4000);
    }
    // Desktop will be handled by hover events only

    return () => {
      clearInterval(titleInterval);
      if (languageInterval) clearInterval(languageInterval);
    };
  }, [isMobile]);



  // Toggle language on hover (desktop only)
  const handleLanguageToggle = useCallback(() => {
    if (!isMobile) {
      setDisplayLanguage(prev => prev === 'en' ? 'ar' : 'en');
    }
  }, [isMobile]);

  // Handle contact button click
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <section 
      ref={sectionRef}
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden"
    >
      

      {/* Static radial gradient - centered in main content area (ignoring sidebar) */}
      <motion.div 
        className="absolute pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 2 }}
        style={{
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, rgba(79, 70, 229, 0.04) 40%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(40px)',
          mixBlendMode: 'screen',
          left: 'calc(50% + 80px)', // Offset by full sidebar width (80px)
          top: '50%'
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto w-full flex flex-col justify-center pb-16 lg:pb-0">
        {/* Available to work label - at the top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
          <span className="text-green-400 text-sm font-medium">Available to work</span>
        </motion.div>

        {/* Greeting text */}
        <div className="h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`greeting-${displayLanguage}`}
              className="absolute"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
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
        </div>

        {/* Name with phonetic pronunciation */}
        <div className="relative h-32 md:h-40 flex items-center justify-center">
          <div className="relative group" onMouseEnter={!isMobile ? handleLanguageToggle : undefined}>
            <AnimatePresence mode="wait">
              {displayLanguage === 'en' ? (
                <motion.div
                  key="name-en"
                  className="absolute inset-0 flex flex-col items-center justify-center space-y-2"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <motion.h1
                    className="text-5xl md:text-7xl font-bold text-white tracking-in-expand"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    {content.en.name}
                  </motion.h1>
                  <motion.p 
                    className="text-sm md:text-base text-gray-300/80 italic font-light whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    {content.en.phonetic}
                  </motion.p>
                </motion.div>
              ) : (
                <motion.h1
                  key="name-ar"
                  className="absolute inset-0 text-5xl md:text-7xl font-bold text-white focus-in-expand flex items-center justify-center"
                  style={{ 
                    fontFamily: 'Neo Sans Arabic, sans-serif',
                    direction: 'rtl',
                    whiteSpace: 'nowrap'
                  }}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {content.ar.name}
                </motion.h1>
              )}
            </AnimatePresence>
            
            <motion.div
              className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl blur-2xl opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Rotating titles */}
        <div className="h-16 my-12">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTitle}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="text-xl md:text-2xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-semibold"
            >
              {titles[currentTitle]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6" role="group" aria-label="Main action buttons">
          {/* Contact Me Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setIsContactHovered(true)}
            onMouseLeave={() => setIsContactHovered(false)}
            onClick={scrollToContact}
            className="relative flex items-center justify-center overflow-hidden cursor-pointer w-[180px] h-[50px] bg-[#1a1a1a]/60 backdrop-blur-sm rounded-full border border-white/10 transition-all duration-300"
            aria-label="Contact me - navigate to contact section"
            aria-describedby="contact-button-description"
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
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          {/* Download Resume Button */}
          <motion.a
            href={Resume}
            download="Medkour_Salah_Eddine_Resume.pdf"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setIsResumeHovered(true)}
            onMouseLeave={() => setIsResumeHovered(false)}
            onClick={() => {
              setIsResumeClicked(true);
              setTimeout(() => setIsResumeClicked(false), 2000);
            }}
            className="relative overflow-hidden h-[50px] px-8 rounded-full bg-transparent border-none border-white/10 flex items-center justify-center"
            aria-label="Download resume PDF"
            aria-describedby="resume-button-description"
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
            />
          </motion.a>
        </div>
      </div>
      
      {/* Static scroll indicator with gradient lines - centered with main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-2/2 -translate-x-1/2 flex items-center gap-4"
        style={{ 
          zIndex: 20
        }}
      >
        {/* Left gradient line */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
        
        {/* Scroll text */}
        <span className="text-white uppercase tracking-[2px] text-xs font-medium">SCROLL</span>
        
        {/* Right gradient line */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
      </motion.div>

      {/* Back to Top Button */}
<AnimatePresence>
  {showBackToTop && (
    <motion.button
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 h-12 rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden cursor-pointer group transition-all duration-300 ease-out hover:w-[130px] hover:bg-violet-500 w-12"
      style={{
        boxShadow: "0px 0px 0px 4px rgba(139, 92, 246, 0.2)"
      }}
      aria-label="Back to top"
    >
      {/* Arrow Icon */}
      <svg
        className="w-3 h-3 fill-white absolute transition-all duration-300 ease-out group-hover:-translate-y-12 group-hover:opacity-0"
        viewBox="0 0 384 512"
      >
        <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
      </svg>

      {/* Text */}
      <span className="absolute text-white text-[13px] font-semibold whitespace-nowrap translate-y-8 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        Back to Top
      </span>
    </motion.button>
  )}
</AnimatePresence>

    </section>
  );
}