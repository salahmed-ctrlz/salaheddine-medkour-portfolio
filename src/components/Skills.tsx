import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Import logos
import nmapLogo from "./images/Logos/Nmap.png";
import zapLogo from "./images/Logos/zap.png";
import burpsuiteLogo from "./images/Logos/burp.svg";
import awsLogo from "./images/Logos/aws.svg";
import powershellLogo from "./images/Logos/powershell.svg";
import windowsLogo from "./images/Logos/windows.svg";

interface Skill {
  name: string;
  logo: string;
  category: 'frontend' | 'backend' | 'devops' | 'security' | 'other' | 'ai';
}

const skills: Skill[] = [
  // Security Tools
  { name: "Kali Linux", logo: "https://cdn.simpleicons.org/kalilinux", category: "security" },
  { name: "Wireshark", logo: "https://cdn.simpleicons.org/wireshark", category: "security" },
  { name: "Burp Suite", logo: burpsuiteLogo, category: "security" },
  { name: "Nmap", logo: nmapLogo, category: "security" },
  { name: "ZAP", logo: zapLogo, category: "security" },
  
  // Frontend
  { name: "React", logo: "https://cdn.simpleicons.org/react", category: "frontend" },
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript", category: "frontend" },
  { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs", category: "frontend" },
  { name: "HTML", logo: "https://cdn.simpleicons.org/html5", category: "frontend" },
  { name: "CSS", logo: "https://cdn.simpleicons.org/css", category: "frontend" },
  { name: "Vite", logo: "https://cdn.simpleicons.org/vite", category: "frontend" },
  { name: "Three.js", logo: "https://cdn.simpleicons.org/threedotjs", category: "frontend" },
  
  // Backend
  { name: "Python", logo: "https://cdn.simpleicons.org/python", category: "backend" },
  { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs", category: "backend" },
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql", category: "backend" },
  { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb", category: "backend" },
  
  // DevOps
  { name: "Git", logo: "https://cdn.simpleicons.org/git", category: "devops" },
  { name: "Docker", logo: "https://cdn.simpleicons.org/docker", category: "devops" },
  { name: "AWS", logo: awsLogo, category: "devops" },
  { name: "Google Cloud", logo: "https://cdn.simpleicons.org/googlecloud", category: "devops" },
  
  // Other
  { name: "Github", logo: "https://cdn.simpleicons.org/github", category: "other" },
  { name: "Bash", logo: "https://cdn.simpleicons.org/gnubash", category: "other" },
  { name: "Windows", logo: windowsLogo, category: "other" },
  { name: "Linux", logo: "https://cdn.simpleicons.org/linux", category: "other" },
  { name: "Ubuntu", logo: "https://cdn.simpleicons.org/ubuntu", category: "other" },
  { name: "Arch Linux", logo: "https://cdn.simpleicons.org/archlinux", category: "other" },
  { name: "PowerShell", logo: powershellLogo, category: "other" },
  
  // AI
  { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface", category: "ai" },
  { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai", category: "ai" },
  { name: "Google Gemini", logo: "https://cdn.simpleicons.org/googlegemini", category: "ai" },
  { name: "Claude", logo: "https://cdn.simpleicons.org/claude", category: "ai" },
  { name: "Windsurf", logo: "https://cdn.simpleicons.org/windsurf", category: "ai" }
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

const logosToStyle = ['Github', 'Next.js', 'Three.js', 'Windsurf', 'OpenAI', 'Google Cloud'];

export default function Skills() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const glowRef = useRef<HTMLDivElement>(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Row-by-row animation interval
  useEffect(() => {
    if (!inView || filteredSkills.length <= 8) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 4;
        return nextIndex >= filteredSkills.length ? 0 : nextIndex;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [inView, filteredSkills.length]);

  const getVisibleSkills = (rowOffset: number) => {
    const startIndex = currentIndex + rowOffset;
    return filteredSkills.slice(startIndex, startIndex + 4);
  };

  const getLogoFilter = (skillName: string): string => {
    if (logosToStyle.includes(skillName)) {
      return 'grayscale(100%) brightness(1.2) contrast(0.9)';
    }
    if (skillName === 'AWS') {
      return 'brightness(0) invert(1)';
    }
    return 'none';
  };

  const handleGlowMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (glowRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const renderSkillItem = (skill: Skill, index: number, keyPrefix: string) => (
    <motion.div
      key={`${keyPrefix}-${skill.name}-${currentIndex}-${index}`}
      className="flex flex-col items-center group"
      onMouseEnter={() => setHoveredSkill(skill.name)}
      onMouseLeave={() => setHoveredSkill(null)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <motion.div
        whileHover={{
          scale: 1.1,
          rotate: 360,
          transition: { type: "spring", stiffness: 200, damping: 20 }
        }}
        className="relative"
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-300" />
        <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3 md:mb-4 p-3 md:p-4 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-700/50 transition-all duration-300 group-hover:border-indigo-500/50">
          {skill.name === 'Google Gemini' ? (
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 md:w-12 md:h-12"
              fill="url(#grayGradient)"
            >
              <title>Google Gemini</title>
              <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
            </svg>
          ) : (
            <img
              src={skill.logo}
              alt={skill.name}
              className="w-8 h-8 md:w-12 md:h-12 transition-all duration-300"
              style={{ filter: getLogoFilter(skill.name) }}
              loading="lazy"
            />
          )}
        </div>
      </motion.div>
      <motion.span
        className="text-gray-400 group-hover:text-white transition-colors duration-300 text-xs md:text-base text-center"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        {skill.name}
      </motion.span>
    </motion.div>
  );

  const shouldAnimate = filteredSkills.length > 8;

  return (
    <section 
      id="skills" 
      className="section text-white relative overflow-hidden py-20"
    >
      {/* SVG Gradient Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="grayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#A0AEC0', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 backdrop-blur-3xl bg-black/70"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
          }}
        />
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
        {/* Header */}
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
            Tech stack I have experience with, ranging from frontend/backend development to DevOps, security tools, Operating Systems and AI technologies.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Skills Container */}
        <div className="max-w-5xl mx-auto" ref={ref}>
          <AnimatePresence mode="wait">
            {shouldAnimate ? (
              /* Animated Row-by-Row Layout */
              <motion.div
                key={`animated-${selectedCategory}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative min-h-[320px] md:min-h-[280px]"
              >
                {/* Skills Grid with padding to prevent clipping */}
                <div className="py-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`rows-${currentIndex}`}
                      initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: -50, opacity: 0, filter: "blur(10px)" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="flex flex-col gap-6 md:gap-8"
                    >
                      {/* Top Row */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 justify-items-center">
                        {getVisibleSkills(0).map((skill, index) => 
                          renderSkillItem(skill, index, 'top')
                        )}
                      </div>
                      
                      {/* Bottom Row */}
                      {getVisibleSkills(4).length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 justify-items-center">
                          {getVisibleSkills(4).map((skill, index) => 
                            renderSkillItem(skill, index, 'bottom')
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              /* Static Grid for 8 or fewer skills */
              <motion.div
                key={`static-${selectedCategory}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="py-4"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 justify-items-center">
                  {filteredSkills.map((skill, index) => 
                    renderSkillItem(skill, index, 'static')
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-3 bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2">
            {shouldAnimate ? (
              <>
                <span className="text-sm text-gray-400">
                  Row {Math.floor(currentIndex / 4) + 1} of {Math.ceil(filteredSkills.length / 4)}
                </span>
                <div className="w-24 md:w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${((currentIndex / 4 + 1) / Math.ceil(filteredSkills.length / 4)) * 100}%`
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </>
            ) : (
              <span className="text-sm text-gray-400">
                Showing all {filteredSkills.length} skills
              </span>
            )}
            <span className="text-sm text-gray-400">
              {filteredSkills.length} Total
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}