import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import background from "../components/images/nasa-2W-QWAC0mzI-unsplash.jpg";
import Resume from "../components/Medkour Salah Eddine - Resume Feb 2025.pdf";

const titles = [
  "Web Developer",
  "Cybersecurity Enthusiast",
  "Graphic Designer",
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

  const scrambleText = useCallback((start: string, end: string, setDisplay: (value: string) => void) => {
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

      setDisplay((prevText: string) => {
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
    <section className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      <div className="relative z-10 text-center px-4">
        {isMobile ? (
          // Mobile Animation
          <motion.div>
            <AnimatePresence mode="wait">
              <motion.p
                key={`greeting-${mobileLanguageToggle}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl mb-6 text-gray-300"
                style={{ fontFamily: isArabic(displayGreeting) ? 'Neo Sans Arabic, sans-serif' : 'inherit' }}
              >
                {displayGreeting}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.h1
                key={`name-${mobileLanguageToggle}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="text-5xl md:text-7xl font-bold mb-8"
                style={{ fontFamily: isArabic(displayName) ? 'Neo Sans Arabic, sans-serif' : 'inherit' }}
              >
                {displayName}
              </motion.h1>
            </AnimatePresence>
          </motion.div>
        ) : (
          // Desktop Animation (Original)
          <>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-3xl mb-6 text-gray-300"
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
              style={{ fontFamily: isArabic(displayGreeting) ? 'Neo Sans Arabic, sans-serif' : 'inherit' }}
            >
              {displayGreeting}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-8"
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
              style={{ fontFamily: isArabic(displayName) ? 'Neo Sans Arabic, sans-serif' : 'inherit' }}
            >
              {displayName}
            </motion.h1>
          </>
        )}

        <div className="h-10 mb-12">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl text-indigo-400"
            >
              {titles[currentTitle]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300 w-full md:w-auto"
          >
            Contact Me
          </motion.button>

          <motion.a
            href={Resume}
            download="Medkour Salah Eddine - Resume.pdf"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300 w-full md:w-auto"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Resume
          </motion.a>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 animate-bounce text-white/70" />
      </motion.div>
    </section>
  );
}