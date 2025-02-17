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
  const itemsPerPage = 8;
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (skills.length - itemsPerPage + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const visibleSkills = skills.slice(currentIndex, currentIndex + itemsPerPage);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (glowRef.current) {
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
    }
  };

  return (
    <section 
      id="skills" 
      className="py-20 bg-gray-950 text-white relative overflow-hidden skills-section"
      onMouseMove={handleMouseMove}
    >
      <div className="skills-glow" ref={glowRef}></div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-gray-300">Technologies I work with</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatePresence mode="wait">
              {visibleSkills.map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 mb-4 p-4 bg-gray-800 rounded-full flex items-center justify-center"
                  >
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-12 h-12 filter grayscale"
                    />
                  </motion.div>
                  <span className="text-gray-300">{skill.name}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: skills.length - itemsPerPage + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                currentIndex === index ? 'bg-indigo-500' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}