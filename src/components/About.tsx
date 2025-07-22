import { motion, useScroll, useTransform } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Code2, Brain, Pencil, GraduationCap, Briefcase } from "lucide-react";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { AnimatePresence } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Import image
import profilePic from "./images/profile.webp";

// Import CSS
import './About.css';

// Timeline data
const timelineData = [
  {
    type: "work",
    title: "Web Developer",
    institution: "Freelance",
    period: "July 2024 - Present",
    description: "Developing modern, high-performance web applications using React, Next.js, TypeScript, Tailwind CSS, and Node.js. Crafting custom solutions with pixel-perfect designs while leveraging technologies like Express.js, MongoDB, Firebase, and WebRTC to ensure seamless user experiences, scalability, and security.",
    icon: Briefcase
  },
  {
    type: "education",
    title: "Master's in Network & Telecommunications",
    institution: "Badji Mokhtar University of Annaba, Algeria",
    period: "Sep 2023 – Jun 2025",
    description: "Focused on network architecture, secure communications, and cybersecurity. Graduated with strong academic standing. Final project: 'Implementation of an End-to-End Encryption Mechanism in WebRTC Video Streaming', covering real-time encryption, key exchange protocols, and security testing.",
    icon: GraduationCap
  },
  
  {
    type: "work",
    title: "Network & Cybersecurity Self-Learner",
    institution: "Personal Development",
    period: "Present",
    description: "Learning through a home lab using virtual machines to explore networking, operating systems, and cybersecurity. Practicing hands-on tasks using platforms like TryHackMe, Coursera, and YouTube. Focused on real-world skills like system setup, basic hardening, and secure configurations.",
    icon: Briefcase
  },
  
  {
    type: "education",
    title: "Licentiate Degree in Telecommunications Engineering",
    institution: "Badji Mokhtar University",
    period: "Sep 2020 - Jun 2023",
    description: "Focused on telecommunications fundamentals and engineering principles.",
    icon: GraduationCap
  }
];

export default function About() {
  // Memoize the container ref to prevent unnecessary re-renders
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Memoize scroll progress calculation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Memoize transform calculations
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]);

  // State for Annaba hover effect
  const [isAnnabaHovered, setIsAnnabaHovered] = useState(false);
  
  // State for expanded timeline items
  const [expandedItems, setExpandedItems] = useState(Array(timelineData.length).fill(false));

  // Memoize animation variants
  const fadeUpVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }), []);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: { 
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }), []);

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
          className="absolute left-2 sm:left-4 top-1/2 z-50 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 border border-white/10 shadow-lg hover:scale-110"
          aria-label="Previous card"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 z-50 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 border border-white/10 shadow-lg hover:scale-110"
          aria-label="Next card"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <div className={`relative p-6 sm:p-8 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 
                    transition-all duration-500 ${isActive ? 'shadow-2xl' : 'shadow-lg'}`}>
                    {/* Gradient Background Effect */}
                    <div 
                      className={`absolute inset-0 rounded-xl opacity-20 transition-opacity duration-500 ${isActive ? 'opacity-30' : 'opacity-10'}`}
                      style={{
                        background: `radial-gradient(circle at center, ${card.gradient.split(' ')[1]}15, transparent 70%)`
                      }}
                    />

                    {/* Icon Container */}
                    <div className="relative mb-3 sm:mb-6 flex justify-center">
                      <div className={`absolute -inset-1.5 sm:-inset-2 bg-gradient-to-r ${card.gradient} rounded-full opacity-50 blur-lg transition-all duration-500 
                        ${isActive ? 'scale-110' : 'scale-100'}`} />
                      <div className="relative bg-gray-900/50 p-2.5 sm:p-4 rounded-full w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center">
                        <card.Icon className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
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
                            className={`text-[10px] sm:text-xs font-medium px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-opacity-20 transition-all duration-300
                              ${card.gradient.includes('blue') ? 'bg-blue-500 text-blue-200' :
                                card.gradient.includes('emerald') ? 'bg-emerald-500 text-emerald-200' :
                                'bg-purple-500 text-purple-200'}`}
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
      className="py-20 text-white relative overflow-hidden"
    >
      {/* Modern Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-violet-900/20 to-gray-900 opacity-80"></div>
        
        {/* Modern mesh gradient effect */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 80% 85%, rgba(168, 85, 247, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 60% 40%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
            `,
            backgroundSize: '100% 100%',
          }}
        ></div>
        
        {/* Animated floating elements */}
        <motion.div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/images/noise.png')`,
            backgroundSize: '200px 200px',
            mixBlendMode: 'soft-light',
            opacity: 0.4
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Subtle grid lines */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Profile Section */}
        <div className="text-center mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            variants={fadeUpVariants}
            className="relative group"
          >
            <div className="relative inline-block">
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-75 group-hover:opacity-100 blur-lg transition-opacity duration-500"
                animate={{
                  scale: [1, 1.02, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <div className="relative rounded-full overflow-hidden w-44 h-44 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-56 lg:h-56 mx-auto">
                <LazyLoadImage
                  src={profilePic}
                  alt="Medkour Salah Eddine"
                  width={224}
                  height={224}
                  effect="blur"
                  className="w-full h-full object-cover"
                  wrapperClassName="!block !w-full !h-full"
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={fadeUpVariants}
            className="mt-8 space-y-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Medkour Salah Eddine
            </h2>
            <p className="text-lg text-gray-400">Network Engineer</p>
            <div className="reference relative">
              {/* Location with interactive tooltip */}
              <p className="text-gray-500 relative inline-block">
                <span 
                  className="hover-card relative inline-block"
                  onMouseEnter={() => setIsAnnabaHovered(true)}
                  onMouseLeave={() => setIsAnnabaHovered(false)}
                >
                  Annaba
                </span>, Algeria
                
                {/* Location Tooltip */}
                <div className="location-tooltip">
                  {/* Map background */}
                  <div className="location-map"></div>
                  <div className="location-dots"></div>
                  
                  {/* Animated pin */}
                  <div className="location-pin"></div>
                  
                  {/* Content */}
                  <div className="location-content">
                    <h4 className="location-title">From Annaba</h4>
                    <p className="location-subtitle">Coastal city in northeastern Algeria</p>
                    
                    {/* Stats */}
                    <div className="location-stats">
                      <div className="location-stat">
                        <div className="location-stat-value">650K+</div>
                        <div className="location-stat-label">Population</div>
                      </div>
                      <div className="location-stat">
                        <div className="location-stat-value">80 km²</div>
                        <div className="location-stat-label">Area</div>
                      </div>
                      <div className="location-stat">
                        <div className="location-stat-value">1830</div>
                        <div className="location-stat-label">Founded</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative wave */}
                  <div className="location-wave"></div>
                </div>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Interests Section */}
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          variants={fadeUpVariants}
        >
          <p className="text-xl md:text-2xl leading-relaxed">
            I'm interested in{" "}
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
            <ul className="space-y-4">
              {timelineData.map((item, index) => (
                <motion.li
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
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden"
                >
                  <div 
                    className={`p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between transition-all duration-300
                      ${item.type === 'education' ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-blue-500'}`}
                    onClick={() => {
                      const newExpandedItems = [...expandedItems];
                      newExpandedItems[index] = !newExpandedItems[index];
                      setExpandedItems(newExpandedItems);
                    }}
                  >
                    {/* Position */}
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center
                        ${item.type === 'education' ? 'bg-emerald-500/10' : 'bg-blue-500/10'}`}
                      >
                        <item.icon className={`w-5 h-5 
                          ${item.type === 'education' ? 'text-emerald-400' : 'text-blue-400'}`} 
                        />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-lg font-bold text-white">{item.title}</h4>
                      </div>
                    </div>
                    
                    {/* Place & Time */}
                    <div className="mt-2 sm:mt-0 flex flex-col sm:items-end">
                      <span className="text-gray-300 font-medium">{item.institution}</span>
                      <span className={`text-sm font-semibold ${
                        item.type === 'education' ? 'text-emerald-400' : 'text-blue-400'
                      }`}>
                        {item.period}
                      </span>
                    </div>
                  </div>
                  
                  {/* Description - Collapsible */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: expandedItems[index] ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 border-t border-gray-700/50">
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
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