import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import background from "../components/images/nasa-2W-QWAC0mzI-unsplash.jpg";

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
    if (!isMobile) return;

    const titleInterval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 5000);

    const languageInterval = setInterval(() => {
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

    return () => {
      clearInterval(titleInterval);
      clearInterval(languageInterval);
    };
  }, [isMobile, displayName, isTransitioning, scrambleText]);

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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-3xl mb-4 text-gray-300"
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
          className="text-5xl md:text-7xl font-bold mb-4"
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          style={{ fontFamily: isArabic(displayName) ? 'Neo Sans Arabic, sans-serif' : 'inherit' }}
        >
          {displayName}
        </motion.h1>

        <div className="h-8 mb-8">
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

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToContact}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300"
        >
          Contact Me
        </motion.button>
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