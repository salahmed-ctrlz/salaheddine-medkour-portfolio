import { motion, AnimatePresence } from "framer-motion";
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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const titleInterval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);

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
    }

    return () => {
      clearInterval(titleInterval);
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

  useEffect(() => {
    if (backgroundRef.current) {
      const cleanup = initParallaxEffect(backgroundRef.current, {
        intensity: 0.01,
        reverse: true
      });
      return cleanup;
    }
  }, []);

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
            //backgroundImage: `url(${background})`,
            backgroundImage: `url(${background2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
            opacity: 0.15
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
      </motion.div>

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

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="relative overflow-hidden group bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-4 rounded-full text-lg font-semibold w-full sm:w-auto"
          >
            <span className="relative z-10">Contact Me</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-indigo-800 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.a
            href={Resume}
            download="Medkour Salah Eddine - Resume.pdf"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
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
            />
          </motion.a>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
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
    </section>
  );
}