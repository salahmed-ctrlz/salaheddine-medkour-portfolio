<<<<<<< HEAD
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, ChevronUp, ArrowUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Projects.css';

// Import images
import currentPortfolio from './images/Projects/CurrentPortfolio.webp';
import pchavenMockup from './images/Projects/pchavenmockup.webp';
import amaneMockup from './images/Projects/amanemockup.webp';
import pwdGeneratorDark from './images/Projects/pwd-generator-dark.webp';
import pwdGeneratorLight from './images/Projects/pwd-generator-light.webp';
import pwdGeneratorHacker from './images/Projects/pwd-generator-hacker.webp';
import ecommerce from './images/Projects/ecommerce.webp';
import weatherApp from './images/Projects/WeathApp.webp';
import eportfolio from './images/Projects/eportfolio.webp';
import bettercallsaul from './images/Projects/BetterCallSaul.webp';

// Import preview GIFs  
import portfolioPreview from './images/Preview/portfolio-preview.gif';
import pchavenPreview from './images/Preview/pchaven-preview.gif';
import bettercallsaulPreview from './images/Preview/bettercallsaul-preview.gif';

interface Project {
  id: number;
  title: string;
  description: string;
  details: string;
  image: string;
  images?: string[];
  previewGif?: string;
  technologies: string[];
  github: string;
  demo: string;
  featured: boolean;
  carousel?: boolean;
}

export default function Projects() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Current Portfolio",
      description: "Personal portfolio showcasing my projects, skills, and experience. Built with React, Framer Motion, and TailwindCSS.",
      details: "Portfolio Overview\n\n• Features a responsive design that works flawlessly on mobile, tablet, and desktop devices\n• Incorporates smooth animations using Framer Motion for enhanced user experience\n• Utilizes TailwindCSS for consistent styling and rapid development\n• Optimized for fast loading with lazy-loaded images and minimal dependencies\n\nTechnical Implementation\n\n• Built with React and TypeScript for type safety and better developer experience\n• Custom theme with dark mode and carefully crafted color palette\n• Interactive elements with hover states and responsive feedback\n• Performance optimized with proper code splitting and asset optimization",
      image: currentPortfolio,
      previewGif: portfolioPreview,
      technologies: ["React", "TypeScript", "TailwindCSS", "Framer Motion"],
      github: "https://github.com/salahmed-ctrlz/portfolio",
      demo: "#",
      featured: true
    },
    {
      id: 2,
      title: "Better Call Saul - Portfolio",
      description: "Fan tribute website for Better Call Saul with character information, timeline, and quotes.",
      details: "Fan Tribute Website\n\n• Created an interactive fan tribute for the Better Call Saul TV series\n• Implemented character profiles with detailed information and visuals\n• Added an interactive timeline of key events from the show\n• Featured a quote generator with memorable lines from the series\n\nTechnical Details\n\n• Built with HTML, CSS, and JavaScript\n• Used CSS Grid and Flexbox for responsive layouts\n• Implemented lazy loading for improved performance\n• Added animations and transitions for enhanced user experience",
      image: bettercallsaul,
      previewGif: bettercallsaulPreview,
      technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
      github: "https://github.com/salahmed-ctrlz/bettercallsaul",
      demo: "#",
      featured: false
    },
    {
      id: 3,
      title: "Gaming & PC Parts Website (PC Haven)",
      description: "E-commerce website for PC components with a modern design, secure payment gateway, and advanced filtering.",
      details: "E-commerce Platform\n\n• Developed a full-featured e-commerce platform for PC components and peripherals\n• Integrated secure payment gateway with Stripe for safe transactions\n• Implemented advanced filtering and search functionality for easy product discovery\n• Added user account management with order history and saved preferences\n\nTechnical Details\n\n• Built with the MERN stack (MongoDB, Express, React, Node.js)\n• Implemented responsive design principles for all device sizes\n• Used Redux for state management across the application\n• Set up CI/CD pipeline for automated testing and deployment",
      image: pchavenMockup,
      previewGif: pchavenPreview,
      technologies: ["React", "Node.js", "MongoDB", "Express", "Redux"],
      github: "https://github.com/salahmed-ctrlz/pchaven",
      demo: "#",
      featured: true
    },
    {
      id: 4,
      title: "Cybersecurity Startup Info Page (AMANE)",
      description: "Information page for a cybersecurity startup with details on services, team, and contact information.",
      details: "Startup Info Page\n\n• Developed an informative page for a cybersecurity startup\n• Highlighted services offered, team members, and contact information\n• Integrated a contact form for inquiries\n\nTechnical Details\n\n• Built with React and TailwindCSS\n• Used Formik for form handling and validation\n• Implemented responsive design for all device sizes",
      image: amaneMockup,
      technologies: ["React", "TailwindCSS", "Formik"],
      github: "https://github.com/salahmed-ctrlz/amane",
      demo: "#",
      featured: false
    },
    {
      id: 5,
      title: "Password Generator",
      description: "Secure password generator with multiple themes and customization options. Built with React and styled-components.",
      details: "Password Generator Features\n\n• Generates secure passwords with customizable length and character sets\n• Features multiple themes including light, dark, and hacker modes\n• Allows copying generated passwords to clipboard with a single click\n• Provides password strength evaluation and security tips\n\nTechnical Implementation\n\n• Built with React and styled-components for theme switching\n• Used cryptographically secure random number generation\n• Implemented responsive design for mobile and desktop usage\n• Added keyboard accessibility and screen reader support",
      image: pwdGeneratorDark,
      images: [pwdGeneratorDark, pwdGeneratorLight, pwdGeneratorHacker],
      technologies: ["React", "styled-components", "JavaScript"],
      github: "https://github.com/salahmed-ctrlz/password-generator",
      demo: "#",
      featured: true,
      carousel: true
    },
    {
      id: 6,
      title: "E-commerce Website (Front End)",
      description: "Admin dashboard for e-commerce platforms with analytics, inventory management, and order processing.",
      details: "Admin Dashboard Features\n\n• Comprehensive admin dashboard for managing e-commerce operations\n• Real-time analytics with customizable date ranges and metrics\n• Inventory management system with low stock alerts\n• Order processing workflow with status tracking\n\nTechnical Implementation\n\n• Built with React and Material-UI for consistent UI components\n• Implemented data visualization with Chart.js\n• Used React Query for efficient data fetching and caching\n• Set up role-based access control for different admin levels",
      image: ecommerce,
      technologies: ["React", "TypeScript", "Material-UI", "Chart.js"],
      github: "https://github.com/salahmed-ctrlz/ecommerce-dashboard",
      demo: "#",
      featured: false
    },
    {
      id: 7,
      title: "Weather Web App",
      description: "Weather application with 7-day forecast, location detection, and beautiful UI transitions.",
      details: "Weather App Features\n\n• Displays current weather conditions and 7-day forecast\n• Implements geolocation for automatic location detection\n• Allows searching for weather in any city worldwide\n• Shows additional metrics like humidity, wind speed, and UV index\n\nTechnical Details\n\n• Built with React and CSS modules for styling\n• Integrated with OpenWeatherMap API for weather data\n• Implemented error handling for API failures and location services\n• Added smooth transitions between different views and states",
      image: weatherApp,
      technologies: ["React", "CSS Modules", "OpenWeatherMap API"],
      github: "https://github.com/salahmed-ctrlz/weather-app",
      demo: "#",
      featured: false
    },
    {
      id: 8,
      title: "ePortfolio",
      description: "Digital portfolio showcasing various projects and achievements.",
      details: "ePortfolio Overview\n\n• Comprehensive digital portfolio showcasing various projects and achievements\n• Includes detailed project descriptions, images, and links\n• Features a clean and modern design with easy navigation\n\nTechnical Details\n\n• Built with HTML, CSS, and JavaScript\n• Used responsive design principles for all device sizes\n• Implemented lazy loading for improved performance",
      image: eportfolio,
      technologies: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/salahmed-ctrlz/eportfolio",
      demo: "#",
      featured: false
    }
  ];

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 3);

  // Simulate image preloading
  useEffect(() => {
    const imagePromises = projects.map(project => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = project.image;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      });
    });

    Promise.all(imagePromises).then(() => {
      setTimeout(() => setImagesLoaded(true), 500); // Add a small delay for smoother transition
    });
  }, [projects]);
  
  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50% 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Add scroll handler for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, project: Project) => {
    if (!project.previewGif) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage position for CSS variables
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    // Add bounds checking
    const safeX = Math.max(10, Math.min(90, xPercent)); // Limit between 10% and 90%
    const safeY = Math.max(10, Math.min(90, yPercent));
    
    // Get the preview element and update CSS variables
    const previewElement = e.currentTarget.querySelector('.preview-gif') as HTMLElement;
    if (previewElement) {
      previewElement.style.setProperty('--cursor-x', `${safeX}%`);
      previewElement.style.setProperty('--cursor-y', `${safeY}%`);
    }
    
    setHoveredId(project.id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  // Carousel auto-rotation effect for projects with carousel property
=======
import { motion } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, ChevronUp, Maximize2, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import pchaven from './images/pchavenmockup.png';
import amane from './images/amanemockup.png';
import weathapp from './images/WeathApp.png';
import pwdgenDark from './images/pwd-generator-dark.png';
import pwdgenLight from './images/pwd-generator-light.png';
import pwdgenHacker from './images/pwd-generator-hacker.png';
import ePortfolio from './images/eportfolio.png';
import ecommerce from './images/ecommerce.png';

interface Project {
  title: string;
  description: string;
  image?: string;
  images?: string[];
  github: string;
  live: string;
  details: string;
  technologies: string[];
  carousel?: boolean;
}

const projects: Project[] = [
  {
    title: "Gaming & PC Parts Website (PC Haven)",
    description: "A fully responsive e-commerce website for PC components and accessories.",
    image: pchaven,
    github: "https://github.com/salahmed-ctrlz/PC-Haven",
    live: "https://salahmed-ctrlz.github.io/PC-Haven/",
    details: "PC Haven is a modern, fast, and scalable e-commerce platform for PC enthusiasts. Built with React, TypeScript, and Tailwind CSS, it features a dynamic shopping cart, product filtering, and a seamless UI experience.",
    technologies: ["React", "Tailwind CSS", "TypeScript"],
    carousel: false
  },
  {
    title: "Cybersecurity Startup Info Page (AMANE)",
    description: "A concept cybersecurity website designed for learning and exploration.",
    image: amane,
    github: "https://github.com/salahmed-ctrlz/amane-cybersecurity",
    live: "https://salahmed-ctrlz.github.io/amane-cybersecurity/",
    details: "AMANE is a mock cybersecurity website featuring a modern UI, 3D animated background, dark/light mode, and a bilingual interface. It was built to practice frontend development and UX/UI design for cybersecurity-focused businesses.",
    technologies: ["React", "Tailwind CSS", "TypeScript"],
    carousel: false
  },
  {
    title: "Password Generator",
    description: "A secure password generator tool with customizable options.",
    images: [pwdgenDark, pwdgenLight, pwdgenHacker],
    github: "https://github.com/salahmed-ctrlz/Sala7-Password-Generator",
    live: "https://salahmed-ctrlz.github.io/Sala7-Password-Generator/",
    details: "A password generator built with React.js and TypeScript featuring multiple themes (dark, light, hacker mode), adjustable length, and real-time strength feedback.",
    technologies: ["React.js", "TypeScript", "Tailwind CSS"],
    carousel: true
  },
  {
    title: "E-commerce Website (Front End)",
    description: "A modern e-commerce website built with HTML and CSS.",
    image: ecommerce,
    github: "https://github.com/salahmed-ctrlz/etopia",
    live: "https://salahmed-ctrlz.github.io/etopia/",
    details: "This project is a fully responsive e-commerce website. Built with HTML CSS & JAVASCRIPT.",
    technologies: ["HTML", "Tailwind CSS", "JavaScript"]
  },
  {
    title: "Weather Web App",
    description: "A weather application that provides real-time weather updates.",
    image: weathapp,
    github: "https://github.com/salahmed-ctrlz/WeathApp",
    live: "https://salahmed-ctrlz.github.io/WeathApp/",
    details: "Fetches real-time weather data and displays a 5-day forecast with a user-friendly interface. Features temperature unit conversion and location-based weather data.",
    technologies: ["HTML", "OpenWeather API", "CSS"],
    carousel: false
  },
  {
    title: "ePortfolio",
    description: "My previous portfolio website showcasing my projects and skills.",
    image: ePortfolio,
    github: "https://github.com/salahmed-ctrlz/ePortfolio",
    live: "https://salahmed-ctrlz.github.io/ePortfolio/",
    details: "A personal portfolio website showcasing my skills and projects. Built with a clean design, responsive layout, and smooth animations.",
    technologies: ["HTML", "CSS", "JavaScript"],
    carousel: false
  }
];

export default function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [maximizedImage, setMaximizedImage] = useState<string | null>(null);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Carousel auto-rotation effect
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
  useEffect(() => {
    const carouselProject = projects.find(project => project.carousel);
    if (!carouselProject?.images?.length) return;

    const interval = setInterval(() => {
      setCurrentCarouselIndex(prevIndex => 
<<<<<<< HEAD
        prevIndex === (carouselProject.images?.length || 1) - 1 ? 0 : prevIndex + 1
=======
        prevIndex === carouselProject.images!.length - 1 ? 0 : prevIndex + 1
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
      );
    }, 3000);

    return () => clearInterval(interval);
<<<<<<< HEAD
  }, [projects]);

  // Generate skeleton loaders
  const renderSkeletons = () => {
    return Array(3).fill(0).map((_, index) => (
      <div key={`skeleton-${index}`} className="project-card">
        <div className="skeleton skeleton-image"></div>
        <div className="project-content">
          <div className="skeleton skeleton-title"></div>
          <div className="project-description-wrapper">
            <div className="skeleton skeleton-text" style={{ width: '100%' }}></div>
            <div className="skeleton skeleton-text" style={{ width: '90%' }}></div>
            <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
          </div>
          <div className="project-tags">
            <span className="skeleton skeleton-tag"></span>
            <span className="skeleton skeleton-tag"></span>
            <span className="skeleton skeleton-tag"></span>
          </div>
          <div className="project-footer">
            <div className="skeleton skeleton-footer"></div>
          </div>
        </div>
      </div>
    ));
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Adjust based on your navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Preload images or other critical content
    const preloadImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      images.forEach((img) => {
        const src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
        }
      });
    };

    preloadImages();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 1%, transparent 0%), radial-gradient(circle at 75px 75px, white 1%, transparent 0%)`,
=======
  }, []);

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
          backgroundSize: '100px 100px'
        }} />
      </div>

<<<<<<< HEAD
=======
      {/* Maximized Image Modal */}
      {maximizedImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setMaximizedImage(null)}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative max-w-screen-xl max-h-screen w-full h-full flex items-center justify-center"
          >
            {/* Blurred background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 blur-2xl"
              style={{ backgroundImage: `url(${maximizedImage})` }}
            />
            
            {/* Actual image */}
            <div 
              className="relative max-w-[90vw] max-h-[90vh] z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMaximizedImage(null)}
                className="absolute -top-4 -right-4 bg-black/80 rounded-full p-2 shadow-lg hover:shadow-indigo-500/50 hover:text-indigo-400 transition-all duration-300 cursor-pointer z-20"
              >
                <X className="w-8 h-8 text-white" />
              </motion.button>
              <motion.img 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                src={maximizedImage} 
                alt="Maximized" 
                className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg shadow-2xl"
              />
            </div>
          </motion.div>
        </motion.div>
      )}

>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
<<<<<<< HEAD
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent works, ranging from web applications to cybersecurity tools.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="project-grid">
          {isInView && !imagesLoaded && renderSkeletons()}
          
          {isInView && imagesLoaded && visibleProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`project-card ${expandedId === project.id ? 'expanded' : ''}`}
            >
              {/* Project Image */}
              <div 
                className="project-image-container"
                onMouseMove={(e) => handleMouseMove(e, project)}
                onMouseLeave={handleMouseLeave}
              >
                {project.carousel && project.images ? (
                  <div className="carousel-container">
                    {project.images.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`carousel-slide ${imgIndex === currentCarouselIndex ? 'active' : ''}`}
                      >
                        <LazyLoadImage
                          src={image}
                          alt={`${project.title} - View ${imgIndex + 1}`}
                          effect="blur"
                          className="project-image"
                          threshold={100}
                          placeholderSrc={image} // Low quality placeholder
                        />
                      </div>
                    ))}
                    <div className="carousel-dots">
                      {project.images.map((_, dotIndex) => (
                        <span
                          key={dotIndex}
                          className={`carousel-dot ${dotIndex === currentCarouselIndex ? 'active' : ''}`}
                          onClick={() => setCurrentCarouselIndex(dotIndex)}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <LazyLoadImage
                    src={project.image}
                    alt={project.title}
                    effect="blur"
                    className="project-image"
                    threshold={100}
                    placeholderSrc={project.image} // Low quality placeholder
                  />
                )}
                
                {/* Overlay gradient */}
                <div className="project-overlay" />
                
                {/* Preview GIF */}
                {project.previewGif && (
                  <div className="preview-gif">
                    <img 
                      src={project.previewGif}
                      alt={`${project.title} preview`}
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="project-content">
                <h3 className="project-title">
                  {project.title}
                </h3>
                
                <div className={`project-description-wrapper ${expandedId === project.id ? 'expanded' : ''}`}>
                  <div className={`project-description ${expandedId === project.id ? 'expanded' : ''}`}>
                    {expandedId === project.id ? (
                      <div className="space-y-4">
                        {project.details.split('\n\n').map((section, index) => (
                          <div key={index}>
                            {section.includes('•') ? (
                              <>
                                <h4 className="font-semibold text-white mb-2">
                                  {section.split('\n')[0]}
                                </h4>
                                <ul className="space-y-2 ml-2">
                                  {section
                                    .split('\n')
                                    .slice(1)
                                    .map((item, i) => (
                                      <li key={i} className="flex items-start gap-2">
                                        <span className="text-indigo-400 mt-1">•</span>
                                        <span>{item.replace('•', '').trim()}</span>
                                      </li>
                                    ))}
                                </ul>
                              </>
                            ) : (
                              <p>{section}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>{project.description}</p>
                    )}
                  </div>
                </div>
                
                {/* Technologies */}
                <div className="project-tags">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="project-tag"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links & Toggle */}
                <div className="project-footer">
                  <div className="project-links">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      data-hover="true"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      data-hover="true"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Demo</span>
                    </a>
                  </div>
                  <button
                    onClick={() => {
                      setIsTransitioning(true);
                      setExpandedId(expandedId === project.id ? null : project.id);
                      setTimeout(() => setIsTransitioning(false), 300);
                    }}
                    className="view-more-link"
                    data-hover="true"
                    aria-expanded={expandedId === project.id}
                  >
                    <span className="text-sm">
                      {expandedId === project.id ? "View Less" : "View More"}
                    </span>
                    {expandedId === project.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
=======
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Picked Projects
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Here are some of my projects that I can showcase here. Please feel free to check others on my Github.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 border border-gray-800/50"
            >
              <div className="relative h-60 overflow-hidden">
                {project.carousel && project.images ? (
                  <div className="relative w-full h-full">
                    {project.images.map((image, imgIndex) => (
                      <motion.img
                        key={imgIndex}
                        src={image}
                        alt={`${project.title} - View ${imgIndex + 1}`}
                        className={`absolute w-full h-full object-cover transition-all duration-700 ${
                          imgIndex === currentCarouselIndex ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ objectPosition: "top" }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                    ))}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
                      {project.images.map((_, dotIndex) => (
                        <motion.span
                          key={dotIndex}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: dotIndex === currentCarouselIndex ? 1.2 : 1 }}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            dotIndex === currentCarouselIndex 
                              ? "bg-indigo-400 w-4" 
                              : "bg-gray-500 hover:bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => project.images && setMaximizedImage(project.images[currentCarouselIndex])}
                      className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:text-indigo-400 transition-all duration-300 cursor-pointer opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                ) : (
                  project.image && (
                    <div className="relative w-full h-full overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: "top" }}
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMaximizedImage(project.image!)}
                        className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:text-indigo-400 transition-all duration-300 cursor-pointer opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                      >
                        <Maximize2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  )
                )}
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold group-hover:text-indigo-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-400 hover:text-indigo-300 transition-all duration-300"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    Code
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-400 hover:text-indigo-300 transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Live Demo
                  </motion.a>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleExpand(index)}
                  className="w-full mt-4 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white transition-all duration-300"
                >
                  <span>View More</span>
                  {expandedIndex === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </motion.button>
                
                {expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 space-y-4"
                  >
                    <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                      {project.details}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          className="bg-gray-800/50 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-indigo-600/50 hover:text-white transition-all duration-300"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
              </div>
            </motion.div>
          ))}
        </div>
<<<<<<< HEAD

        {!showAllProjects && projects.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <button 
              className="cta"
              onClick={() => setShowAllProjects(true)}
              data-hover="true"
              aria-label="Show more projects"
            >
              <span>Show More Projects</span>
            </button>
          </motion.div>
        )}

        {showAllProjects && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <button 
              className="minimize"
              onClick={() => {
                setShowAllProjects(false);
                scrollToSection('projects');
              }}
              data-hover="true"
              aria-label="Show fewer projects"
            >
              <span>Show Less</span>
            </button>
          </motion.div>
        )}

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="back-to-top"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              data-hover="true"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
=======
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
      </div>
    </section>
  );
}