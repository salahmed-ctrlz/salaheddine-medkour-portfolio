import { motion, useScroll, useTransform } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
<<<<<<< HEAD
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
    title: "Master's Degree in Network & Telecommunications",
    institution: "Badji Mokhtar University",
    period: "Sep 2023 - Jun 2025",
    description: "Studying advanced networking, cybersecurity, and secure communications.",
    icon: GraduationCap
  },
  {
    type: "work",
    title: "Internship",
    institution: "Algeria Telecom",
    period: "March 2025",
    description: "Optimized network configurations and enhanced security measures.",
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
=======
import { Code2, Palette, Brain, PenBoxIcon, Pencil, Calendar, GraduationCap, Briefcase } from "lucide-react";
import profilePic from "./images/profile.jpg";
import { useRef, useEffect } from "react";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

<<<<<<< HEAD
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
=======
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
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
<<<<<<< HEAD
=======
      rotateX: 5,
      rotateY: 5,
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
<<<<<<< HEAD
  }), []);

  const Carousel3D = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    
    // Memoize cards data to prevent unnecessary re-renders
    const cards = useMemo(() => [
      {
        Icon: Pencil,
        title: "Technical Writing",
        subtitle: "Documentation & Content",
        description: "Creating comprehensive technical documentation and engaging content.",
        skills: ["Technical Documentation", "API Documentation", "Blog Writing", "User Guides", "Knowledge Base", "Content Strategy"],
        gradient: "from-purple-500 to-pink-500",
      },
      {
        Icon: Code2,
        title: "Web Development",
        subtitle: "Frontend & Backend Solutions",
        description: "Building modern and efficient web applications with cutting-edge technologies.",
        skills: ["React.js", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "MongoDB"],
        gradient: "from-blue-500 to-indigo-500",
      },
      {
        Icon: Brain,
        title: "Cybersecurity",
        subtitle: "Network & System Security",
        description: "Implementing robust security measures and conducting penetration testing.",
        skills: ["Network Security", "Penetration Testing", "Security Auditing", "Cloud Security", "Encryption", "Firewall Configuration"],
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
=======
  };

  const timelineData = [
    {
      type: "education",
      title: "Master's Degree in Network & Telecommunications",
      institution: "Badji Mokhtar University",
      period: "Sep 2023 - Jun 2025",
      description: "Studying advanced networking, cybersecurity, and secure communications.",
      icon: GraduationCap
    },
    {
      type: "work",
      title: "Internship",
      institution: "Algeria Telecom",
      period: "March 2025",
      description: "Optimized network configurations and enhanced security measures.",
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
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b

  return (
    <section 
      ref={containerRef}
      id="about" 
<<<<<<< HEAD
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
=======
      className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ y: backgroundY, opacity }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, white 1%, transparent 0%),
            radial-gradient(circle at 75px 75px, white 1%, transparent 0%)
          `,
          backgroundSize: '100px 100px'
        }} />
      </motion.div>
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b

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
<<<<<<< HEAD
            <div className="relative inline-block">
=======
            <div className="relative inline-block perspective-1000">
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
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
<<<<<<< HEAD
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
=======
              <motion.div
                className="relative rounded-full overflow-hidden w-48 h-48 md:w-56 md:h-56 mx-auto transform-gpu"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                  rotateX: -10
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15 
                }}
              >
                <img
                  src={profilePic}
                  alt="Medkour Salah Eddine"
                  className="w-full h-full object-cover transition-transform duration-300"
                />
              </motion.div>
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
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
            <p className="text-lg text-gray-400">Network Engineering graduate</p>
<<<<<<< HEAD
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

=======
            <p className="text-gray-500">Annaba, Algeria</p>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="text-2xl md:text-3xl font-bold text-center mb-10 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            Experience & Education
          </motion.h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500" />

            {/* Timeline Items */}
            {timelineData.map((item, index) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
                className="relative mb-8 perspective-1000"
              >
                <div className={`flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} flex-col md:flex-row`}>
                  {/* Timeline Point */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4">
                    <div className="w-4 h-4 bg-indigo-500 rounded-full" />
                    <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-75" />
                  </div>

                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} px-4`}>
                    <motion.div
                      className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 transform-gpu max-w-sm mx-auto md:max-w-none"
                      whileHover={{
                        scale: 1.02,
                        rotateX: 5,
                        rotateY: index % 2 === 0 ? -5 : 5
                      }}
                    >
                      <div className="flex items-center mb-3">
                        <item.icon className="w-6 h-6 mr-2 text-indigo-400 flex-shrink-0" />
                        <h4 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent break-words">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-gray-400 mb-2 break-words">{item.institution}</p>
                      <p className="text-indigo-400 text-sm mb-3">{item.period}</p>
                      <p className="text-gray-500 break-words">{item.description}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
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

<<<<<<< HEAD
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
=======
        {/* Skills Cards */}
        <div className="text-center grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              Icon: Code2,
              title: "Web Development",
              description: "Building modern and efficient web applications, And designing responsive and creative website designs.",
              gradient: "from-blue-500 to-indigo-500"
            },
            {
              Icon: Pencil,
              title: "Writing",
              description: "Engaging and interesting stories, Creative writing, Blogs, Articles, Books.",
              gradient: "from-purple-500 to-pink-500"
            },
            {
              Icon: Brain,
              title: "Cybersecurity",
              description: "Exploring security and digital protection methods, Pentesting, Cloud solutions.",
              gradient: "from-green-500 to-emerald-500"
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 * (index + 3) }}
              variants={cardVariants}
              className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 transform-gpu perspective-1000"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="relative inline-block">
                  <div className={`absolute -inset-2 bg-gradient-to-r ${item.gradient} rounded-full opacity-75 group-hover:opacity-100 blur-lg transition-opacity duration-300`} />
                  <div className="relative">
                    <item.Icon className="w-12 h-12 mx-auto mb-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
        </div>
      </div>
    </section>
  );
}