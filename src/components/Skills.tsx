import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Import logos
import nmapLogo from "./images/Nmap.png";
import zapLogo from "./images/zap.png";
import burpsuiteLogo from "./images/burp.png";
import awsLogo from "./images/AWS.png";
import powershellLogo from "./images/powershell.png";
import windowsLogo from "./images/windows.png"

const skills = [
  {
    name: "React",
    logo: "https://cdn.simpleicons.org/react"
  },
  {
    name: "Node.js",
    logo: "https://cdn.simpleicons.org/nodedotjs"
  },
  {
    name: "TypeScript",
    logo: "https://cdn.simpleicons.org/typescript"
  },
  {
    name: "Python",
    logo: "https://cdn.simpleicons.org/python"
  },
  {
    name: "Docker",
    logo: "https://cdn.simpleicons.org/docker"
  },
  {
    name: "HTML",
    logo: "https://cdn.simpleicons.org/html5"
  },
  {
    name: "CSS",
    logo: "https://cdn.simpleicons.org/css3"
  },
  {
    name: "AWS",
    logo: awsLogo // Use the imported AWS logo
  },
  {
    name: "MongoDB",
    logo: "https://cdn.simpleicons.org/mongodb"
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.simpleicons.org/postgresql"
  },
  {
    name: "Github",
    logo: "https://cdn.simpleicons.org/github"
  },
  {
    name: "Windows",
    logo: windowsLogo
  },
  {
    name: "Linux",
    logo: "https://cdn.simpleicons.org/linux"
  },
  {
    name: "Kali Linux",
    logo: "https://cdn.simpleicons.org/kalilinux"
  },
  {
    name: "Ubuntu",
    logo: "https://cdn.simpleicons.org/ubuntu"
  },
  {
    name: "Google Cloud",
    logo: "https://cdn.simpleicons.org/googlecloud"
  },
  {
    name: "Bash",
    logo: "https://cdn.simpleicons.org/gnubash"
  },
  {
    name: "PowerShell",
    logo: powershellLogo // Use the imported PowerShell logo
  },
  {
    name: "Burp Suite",
    logo: burpsuiteLogo // Use the imported Burp Suite logo
  },
  {
    name: "ZAP",
    logo: zapLogo // Use the imported ZAP logo
  },
  {
    name: "Wireshark",
    logo: "https://cdn.simpleicons.org/wireshark"
  },
  {
    name: "Nmap",
    logo: nmapLogo // Use the imported Nmap logo
  }
];

export default function Skills() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const itemsPerPage = 8;
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (skills.length - itemsPerPage + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const visibleSkills = skills.slice(currentIndex, currentIndex + itemsPerPage);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (glowRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  return (
    <section 
      id="skills" 
      className="py-20 bg-gradient-to-b from-gray-950 to-gray-900 text-white relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 1%, transparent 0%), radial-gradient(circle at 75px 75px, white 1%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      {/* Animated Glow Effect */}
      <motion.div
        className="skills-glow"
        ref={glowRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: hoveredSkill ? 0.6 : 0.2 }}
        transition={{ duration: 0.3 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Technologies I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
            <AnimatePresence mode="wait">
              {visibleSkills.map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${index}`}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="flex flex-col items-center group"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                      }
                    }}
                    className="relative"
                  >
                    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-300" />
                    <div className="relative w-20 h-20 mb-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-700/50 transition-all duration-300 group-hover:border-indigo-500/50">
                      <motion.img
                        src={skill.logo}
                        alt={skill.name}
                        className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        style={{ willChange: "filter" }}
                      />
                    </div>
                  </motion.div>
                  <motion.span 
                    className="text-gray-400 group-hover:text-white transition-colors duration-300 text-sm md:text-base"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {skill.name}
                  </motion.span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: skills.length - itemsPerPage + 1 }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative h-2 transition-all duration-300 rounded-full ${
                currentIndex === index ? 'w-8 bg-indigo-500' : 'w-2 bg-gray-600 hover:bg-gray-500'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="absolute inset-0 bg-indigo-400 rounded-full"
                initial={false}
                animate={{
                  opacity: currentIndex === index ? [0, 1, 0] : 0
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ filter: "blur(8px)" }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}