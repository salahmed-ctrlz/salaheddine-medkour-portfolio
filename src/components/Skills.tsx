import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Import logos
import nmapLogo from "./images/Logos/Nmap.png";
import zapLogo from "./images/Logos/Zap.png";
import burpsuiteLogo from "./images/Logos/Burp.png";
import awsLogo from "./images/Logos/AWS.png";
import powershellLogo from "./images/Logos/Powershell.png";
import windowsLogo from "./images/Logos/Windows.png";

interface Skill {
  name: string;
  logo: string;
  category: 'frontend' | 'backend' | 'devops' | 'security' | 'other' | 'ai';
}

const skills: Skill[] = [
  // Frontend Technologies
  {
    name: "React",
    logo: "https://cdn.simpleicons.org/react",
    category: "frontend"
  },
  {
    name: "Next.js",
    logo: "https://cdn.simpleicons.org/nextdotjs",
    category: "frontend"
  },
  {
    name: "Vite",
    logo: "https://cdn.simpleicons.org/vite",
    category: "frontend"
  },
  {
    name: "Three.js",
    logo: "https://cdn.simpleicons.org/threedotjs",
    category: "frontend"
  },
  {
    name: "TypeScript",
    logo: "https://cdn.simpleicons.org/typescript",
    category: "frontend"
  },
  {
    name: "HTML",
    logo: "https://cdn.simpleicons.org/html5",
    category: "frontend"
  },
  {
    name: "CSS",
    logo: "https://cdn.simpleicons.org/css",
    category: "frontend"
  },
  
  // Backend Technologies
  {
    name: "Node.js",
    logo: "https://cdn.simpleicons.org/nodedotjs",
    category: "backend"
  },
  {
    name: "Python",
    logo: "https://cdn.simpleicons.org/python",
    category: "backend"
  },
  {
    name: "MongoDB",
    logo: "https://cdn.simpleicons.org/mongodb",
    category: "backend"
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.simpleicons.org/postgresql",
    category: "backend"
  },
  
  // DevOps & Cloud
  {
    name: "Docker",
    logo: "https://cdn.simpleicons.org/docker",
    category: "devops"
  },
  {
    name: "AWS",
    logo: awsLogo,
    category: "devops"
  },
  {
    name: "Google Cloud",
    logo: "https://cdn.simpleicons.org/googlecloud",
    category: "devops"
  },
  
  // Security Tools
  {
    name: "Kali Linux",
    logo: "https://cdn.simpleicons.org/kalilinux",
    category: "security"
  },
  {
    name: "Burp Suite",
    logo: burpsuiteLogo,
    category: "security"
  },
  {
    name: "ZAP",
    logo: zapLogo,
    category: "security"
  },
  {
    name: "Wireshark",
    logo: "https://cdn.simpleicons.org/wireshark",
    category: "security"
  },
  {
    name: "Nmap",
    logo: nmapLogo,
    category: "security"
  },
  
  // AI Tools
  {
    name: "OpenAI",
    logo: "https://cdn.simpleicons.org/openai",
    category: "ai"
  },
  {
    name: "Claude",
    logo: "https://cdn.simpleicons.org/claude",
    category: "ai"
  },
  {
    name: "Google Gemini",
    logo: "https://cdn.simpleicons.org/googlegemini",
    category: "ai"
  },
  
  // Other Tools & Systems
  {
    name: "Github",
    logo: "https://cdn.simpleicons.org/github",
    category: "other"
  },
  {
    name: "Windows",
    logo: windowsLogo,
    category: "other"
  },
  {
    name: "Linux",
    logo: "https://cdn.simpleicons.org/linux",
    category: "other"
  },
  {
    name: "Ubuntu",
    logo: "https://cdn.simpleicons.org/ubuntu",
    category: "other"
  },
  {
    name: "Bash",
    logo: "https://cdn.simpleicons.org/gnubash",
    category: "other"
  },
  {
    name: "PowerShell",
    logo: powershellLogo,
    category: "other"
  },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'devops', label: 'DevOps' },
  { id: 'security', label: 'Security' },
  { id: 'ai', label: 'AI Tools' },
  { id: 'other', label: 'Other' }
];

export default function Skills() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isInView, setIsInView] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    setIsInView(inView);
  }, [inView]);

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  useEffect(() => {
    if (isInView && filteredSkills.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 4) % filteredSkills.length); // Move by 4 (one row)
      }, 4000); // Change every 4 seconds
      return () => clearInterval(interval);
    }
  }, [isInView, filteredSkills.length]);

  // Create two rows of skills for smooth sliding animation
  const topRowSkills = Array.from({ length: 4 }, (_, i) => {
    const index = (currentIndex + i) % filteredSkills.length;
    return filteredSkills[index];
  });

  const bottomRowSkills = Array.from({ length: 4 }, (_, i) => {
    const index = (currentIndex + 4 + i) % filteredSkills.length;
    return filteredSkills[index];
  });

  const handleGlowMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

      {/* Animated Glow Effect */}
      <motion.div
        className="skills-glow"
        ref={glowRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: hoveredSkill ? 0.6 : 0.2 }}
        transition={{ duration: 0.3 }}
        onMouseMove={handleGlowMouseMove}
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

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setCurrentIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto" ref={ref}>
          {/* Mobile: 4x2 Grid Layout */}
          <div className="block md:hidden">
            <div className="relative h-80 overflow-hidden px-4">
              <motion.div
                key={`mobile-${currentIndex}`}
                className="absolute inset-0 grid grid-cols-2 gap-3"
                initial={{ y: -100, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: 100, opacity: 0, filter: "blur(10px)" }}
                transition={{ 
                  duration: 1.2,
                  ease: "easeInOut"
                }}
              >
                {/* Show all 8 skills in 4x2 grid layout on mobile */}
                {[...topRowSkills, ...bottomRowSkills].map((skill, index) => (
                  <motion.div
                    key={`mobile-${skill.name}-${currentIndex}-${index}`}
                    className="flex flex-col items-center group"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8,
                      delay: index * 0.1
                    }}
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 360,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 20
                        }
                      }}
                      className="relative"
                    >
                      <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-300" />
                      <div className="relative w-16 h-16 mb-3 p-3 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-700/50 transition-all duration-300 group-hover:border-indigo-500/50">
                        {skill.name === 'Google Gemini' ? (
                          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="40" height="40"><title>Google Gemini</title><path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/></svg>
                        ) : (
                          <motion.img
                            src={skill.logo}
                            alt={skill.name}
                            className="w-10 h-10 transition-all duration-300"
                            style={{ 
                              willChange: "filter",
                              filter: skill.name === 'AWS' 
                                ? 'brightness(0) invert(1)' 
                                : 'none'
                            }}
                            loading="lazy"
                          />
                        )}
                      </div>
                    </motion.div>
                    <motion.span 
                      className="text-gray-400 group-hover:text-white transition-colors duration-300 text-sm text-center"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {skill.name}
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Desktop: Horizontal Layout */}
          <div className="hidden md:block">
            {/* Container for smooth sliding animation */}
            <div className="relative h-64 overflow-hidden">
              {/* Top Row */}
              <motion.div
                key={`top-${currentIndex}`}
                className="absolute top-0 left-0 w-full grid grid-cols-4 gap-8"
                initial={{ y: -50, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -50, opacity: 0, filter: "blur(10px)" }}
                transition={{ 
                  duration: 1.2,
                  ease: "easeInOut"
                }}
              >
                {topRowSkills.map((skill, index) => (
                  <motion.div
                    key={`top-${skill.name}-${currentIndex}-${index}`}
                    className="flex flex-col items-center group"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8,
                      delay: index * 0.1
                    }}
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 360,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 20
                        }
                      }}
                      className="relative"
                    >
                      <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-300" />
                      <div className="relative w-20 h-20 mb-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-700/50 transition-all duration-300 group-hover:border-indigo-500/50">
                        {skill.name === 'Google Gemini' ? (
                          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="48" height="48"><title>Google Gemini</title><path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/></svg>
                        ) : (
                          <motion.img
                            src={skill.logo}
                            alt={skill.name}
                            className="w-12 h-12 transition-all duration-300"
                            style={{ 
                              willChange: "filter",
                              filter: skill.name === 'AWS' 
                                ? 'brightness(0) invert(1)' 
                                : 'none'
                            }}
                            loading="lazy"
                          />
                        )}
                      </div>
                    </motion.div>
                    <motion.span 
                      className="text-gray-400 group-hover:text-white transition-colors duration-300 text-base"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {skill.name}
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Bottom Row */}
              <motion.div
                key={`bottom-${currentIndex}`}
                className="absolute bottom-0 left-0 w-full grid grid-cols-4 gap-8"
                initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: 50, opacity: 0, filter: "blur(10px)" }}
                transition={{ 
                  duration: 1.2,
                  ease: "easeInOut"
                }}
              >
                {bottomRowSkills.map((skill, index) => (
                  <motion.div
                    key={`bottom-${skill.name}-${currentIndex}-${index}`}
                    className="flex flex-col items-center group"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8,
                      delay: index * 0.1
                    }}
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 360,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 20
                        }
                      }}
                      className="relative"
                    >
                      <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-300" />
                      <div className="relative w-20 h-20 mb-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-700/50 transition-all duration-300 group-hover:border-indigo-500/50">
                        {skill.name === 'Google Gemini' ? (
                          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="48" height="48"><title>Google Gemini</title><path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/></svg>
                        ) : (
                          <motion.img
                            src={skill.logo}
                            alt={skill.name}
                            className="w-12 h-12 transition-all duration-300"
                            style={{ 
                              willChange: "filter",
                              filter: skill.name === 'AWS' 
                                ? 'brightness(0) invert(1)' 
                                : 'none'
                            }}
                            loading="lazy"
                          />
                        )}
                      </div>
                    </motion.div>
                    <motion.span 
                      className="text-gray-400 group-hover:text-white transition-colors duration-300 text-base"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {skill.name}
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Show progress indicator */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-sm text-gray-400">
              Row {Math.floor(currentIndex / 4) + 1} of {Math.ceil(filteredSkills.length / 4)} rows
            </span>
            <div className="w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${((currentIndex / 4) / Math.ceil(filteredSkills.length / 4)) * 100}%` 
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-sm text-gray-400">
              {filteredSkills.length} Total Tech Stack
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}