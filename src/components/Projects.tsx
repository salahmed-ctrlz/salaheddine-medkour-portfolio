import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, ChevronUp, ArrowUp, Globe, Wrench, Shield } from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Projects.css';

// Import images
import currentPortfolio from './images/Projects/CurrentPortfolio.webp';
import pchavenMockup from './images/Projects/pchavenmockup.webp';
import amaneMockup from './images/Projects/amanemockup.webp';
import pwdGeneratorDark from './images/Projects/pwd-generator-dark.webp';
import bettercallsaul from './images/Projects/BetterCallSaul.webp';
import pwdGeneratorLight from './images/Projects/pwd-generator-light.webp';
import pwdGeneratorHacker from './images/Projects/pwd-generator-hacker.webp';
import graphicdesigner from './images/Projects/graphicdesigner.webp';
import webrtcE2eeImage1 from './images/Projects/webrtcE2eeImage1.webp'
import webrtcE2eeImage2 from './images/Projects/webrtcE2eeImage2.webp'
import webrtcE2eeImage3 from './images/Projects/webrtcE2eeImage3.webp'
import saktool from './images/Projects/saktool.png';
import adamzebilah from './images/Projects/adamzebilah.webp';

// Import preview GIFs  
import portfolioPreview from './images/Preview/portfolio-preview.webp';
import pchavenPreview from './images/Preview/pchaven-preview.webp';
import bettercallsaulPreview from './images/Preview/bettercallsaul-preview.webp';
import graphicdesignerPreview from './images/Preview/graphicdesigner-preview.webp';
import { SiResearchgate } from 'react-icons/si';
import adamzebilahPreview from './images/Preview/adamzebilah-preview.webp';

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
  category: 'web' | 'tools' | 'security';
  categories?: ('web' | 'tools' | 'security')[]; // Support multiple categories
  hidden?: boolean;
}

// Category configuration - Easy to edit in the future
const categories = [
  {
    id: 'web',
    name: 'Web Development',
    shortName: 'WebDev',
    description: 'All websites and web apps',
    icon: Globe,
    gradient: 'from-blue-500 to-indigo-500',
    color: 'blue'
  },
  {
    id: 'tools',
    name: 'Tools & Scripts',
    shortName: 'Tools & Scripts',
    description: 'Standalone tools and utilities',
    icon: Wrench,
    gradient: 'from-emerald-500 to-green-500',
    color: 'emerald'
  },
  {
    id: 'security',
    name: 'Cybersecurity Projects',
    shortName: 'Cybersecurity',
    description: 'Security-focused work',
    icon: Shield,
    gradient: 'from-purple-500 to-pink-500',
    color: 'purple'
  }
];

const ProjectImage = ({ src, alt, width, height }: { 
  src: string; 
  alt: string;
  width: number;
  height: number;
}) => (
  <div 
    className="project-image-wrapper" 
    style={{ 
      contain: 'layout size style',
      aspectRatio: `${width}/${height}`,
    }}
  >
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      width={width}
      height={height}
      className="project-image"
      threshold={100}
      placeholderSrc={src}
    />
  </div>
);

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const sectionRef = useRef<HTMLElement>(null);
  
  // Projects data organized by categories - Easy to edit in the future
  const projects: Project[] = [
    // Featured Projects (First 3 - Pinned)
    {
      id: 1,
      title: "Adam Zebilah - Portfolio Website",
      description: "A clean, bilingual portfolio website built with React and Vite, featuring a dark-themed, modern design to showcase creative work and services.",
      details: "Portfolio Features\n\n• Bilingual Interface: Available in English and German with easy language switching\n• Modern Dark Theme: Elegant, minimal layout focused on contrast and readability\n• Responsive Design: Fully optimized for desktop, tablet, and mobile screens\n• Smooth Animations: Subtle transitions powered by Framer Motion\n• Accessibility: WCAG-compliant with semantic HTML and ARIA labels\n• SEO Optimization: Structured data, meta tags, and semantic markup\n• Interactive Elements: Hover effects, smooth scrolling, and micro-interactions\n• Fast Performance: Vite-based build with code-splitting and lazy loading\n\nTechnical Implementation\n\n• Built with React 18 and Vite for high performance\n• Styled with TailwindCSS for consistent and responsive UI\n• Framer Motion for smooth, fluid animations\n• i18next for internationalization (English/German)\n• React Icons for scalable vector icons\n• Deployed via GitHub Pages with continuous integration\n\nDesign & Structure\n\n• Clean dark interface with minimalist visual hierarchy\n• Project showcase sections with case study previews\n• Organized architecture using reusable React components\n• Dedicated sections: Hero, Projects, About, Services, Testimonials, and Contact",
      image: adamzebilah,
      previewGif: adamzebilahPreview,
      technologies: ["React", "Vite", "TailwindCSS", "Framer Motion", "React Icons", "i18next"],
      github: "https://github.com/salahmed-ctrlz",
      demo: "https://adamze07.github.io/AdamZebilah/",
      featured: true,
      category: "web"
    },
    {
      id: 2,
      title: "Better Call Saul - Portfolio",
      description: "A fully responsive and immersive portfolio website inspired by Saul Goodman, built with a modern tech stack.",
      details: "Tribute Portfolio Features\n\n• Custom gavel cursor for an interactive legal touch\n• Fully responsive design, optimized for all devices\n• Smooth animations and dynamic UI elements\n• Themed aesthetic with Saul Goodman’s iconic red & yellow branding\n• Interactive testimonials from iconic Breaking Bad characters\n\nTechnical Highlights\n\n• Built with React & Vite for high performance\n• Styled with Tailwind CSS for rapid development\n• TypeScript for type safety and scalability\n• Framer Motion for fluid animations\n• React Router for seamless navigation\n• Open Graph meta optimization for social media sharing",
      image: bettercallsaul,
      previewGif: bettercallsaulPreview,
      technologies: ["React", "TypeScript", "TailwindCSS", "Framer Motion"],
      github: "https://github.com/salahmed-ctrlz/BetterCallSaul",
      demo: "https://salahmed-ctrlz.github.io/BetterCallSaul/",
      featured: true,
      category: 'web'
    },
    {
      id: 3,
      title: "Graphic Designer Portfolio",
      description: "A modern, responsive portfolio website for a graphic designer showcasing brand identity projects and creative work.",
      details: "Portfolio Features\n\n• Multilingual Support: Available in English, French, German, Spanish, and Arabic\n• Responsive Design: Fully responsive layout that works on all devices\n• Dark/Light Mode: Toggle between dark and light themes\n• Interactive UI: Smooth animations and transitions\n• Project Showcase: Detailed project pages with image galleries\n• Contact Form: Integrated contact form with validation\n• Social Integration: Links to social media profiles\n• Accessibility: Built with accessibility in mind\n\nTechnical Implementation\n\n• Built with React 18 and TypeScript for type safety\n• Styled with TailwindCSS for consistent design\n• Enhanced with Radix UI and Shadcn/ui components\n• Smooth animations using Framer Motion\n• Form handling with React Hook Form\n• Data visualization with Recharts\n• Icons from Lucide React\n• Deployed on GitHub Pages",
      image: graphicdesigner,
      previewGif: graphicdesignerPreview,
      technologies: ["React", "TypeScript", "TailwindCSS", "Framer Motion", "Radix UI"],
      github: "https://github.com/salahmed-ctrlz/graphic-designer-portfolio",
      demo: "https://salahmed-ctrlz.github.io/graphic-designer-portfolio/",
      featured: true,
      category: 'web'
    },
    {
      id: 4,
      title: "Current Portfolio",
      description: "Personal portfolio showcasing my projects, skills, and experience. Built with React, Framer Motion, and TailwindCSS.",
      details: "Portfolio Overview\n\n• Features a responsive design that works flawlessly on mobile, tablet, and desktop devices\n• Incorporates smooth animations using Framer Motion for enhanced user experience\n• Utilizes TailwindCSS for consistent styling and rapid development\n• Optimized for fast loading with lazy-loaded images and minimal dependencies\n\nTechnical Implementation\n\n• Built with React and TypeScript for type safety and better developer experience\n• Custom theme with dark mode and carefully crafted color palette\n• Interactive elements with hover states and responsive feedback\n• Performance optimized with proper code splitting and asset optimization",
      image: currentPortfolio,
      previewGif: portfolioPreview,
      technologies: ["React", "TypeScript", "TailwindCSS", "Framer Motion"],
      github: "https://github.com/salahmed-ctrlz/salaheddine-medkour-portfolio",
      demo: "https://salahmed-ctrlz.github.io/salaheddine-medkour-portfolio/",
      featured: true,
      category: 'web'
    },
    {
      id: 5,
      title: "WebRTC Video Chat with True E2EE",
      description: "A secure peer-to-peer WebRTC video chat application with real end-to-end encryption using insertable streams and custom cryptography.",
      details: "Project Features\n\n• End-to-End Encryption: Media is encrypted using AES-GCM or ChaCha20, ensuring only peers can decrypt\n• Secure Signaling: Uses JWT authentication and ECDH key exchange during signaling\n• Peer-to-Peer: Built with WebRTC and Insertable Streams API\n• Multi-User Support: Allows multiple participants in a single session\n• Privacy by Design: Even the server cannot decrypt video/audio content\n• Testing Tools: Integrated OWASP ZAP, Burp Suite, Wireshark for security validation\n\nTechnical Implementation\n\n• Built with WebRTC and JavaScript APIs\n• Signaling server implemented using Node.js and Socket.IO\n• Cryptography via Web Crypto API and TweetNaCl.js\n• Browser support: Works on Chromium-based browsers with `RTCRtpScriptTransform`\n• Includes performance testing and security analysis setup\n• Modular structure for future upgrades (e.g., E2EE group calls)\n• Strong defense against MITM and replay attacks\n\nUsage Requirements\n\n• Modern browser with Insertable Streams support\n• Node.js for the signaling server\n• HTTPS setup for secure context",
      image: webrtcE2eeImage1,
      images: [webrtcE2eeImage1, webrtcE2eeImage2, webrtcE2eeImage3],
      technologies: ["WebRTC", "JavaScript", "Node.js", "Socket.IO", "AES-GCM", "ECDH", "TweetNaCl.js"],
      github: "https://github.com/salahmed-ctrlz/WebRTC-VideoChatApp-with-True-EndToEndEncryption-Enabled",
      demo: "",
      featured: false,
      carousel: true,
      category: 'security'
    },
    {
      id: 6,
      title: "99SAK Tool",
      description: "Swiss Army Knife CLI tool for Windows (PowerShell-based).",
      details: "99SAK Tool Overview\n\n• Multi-purpose CLI utility designed to centralize productivity, system tools, and entertainment in one interface\n• Features quick access to networking tools, file management utilities, and system monitoring commands\n• Includes fun additions like mini text-based games, ASCII art, and hidden easter eggs for users\n\nTechnical Details\n\n• Built entirely with PowerShell scripting\n• Modular design with expandable command sets\n• Menu-driven interface for easy navigation\n• Supports both automation scripts and interactive utilities",
      image: saktool,
      technologies: ["PowerShell"],
      github: "https://github.com/salahmed-ctrlz/99SAK-PowershellSwissArmyKnife",
      demo: "https://github.com/salahmed-ctrlz/99SAK-PowershellSwissArmyKnife",
      featured: false,
      category: 'tools'
    },
    {
      id: 7,
      title: "Gaming & PC Parts Website (PC Haven)",
      description: "E-commerce website for PC components with a modern design, secure payment gateway, and advanced filtering.",
      details: "E-commerce Platform\n\n• Developed a full-featured e-commerce platform for PC components and peripherals\n• Integrated secure payment gateway with Stripe for safe transactions\n• Implemented advanced filtering and search functionality for easy product discovery\n• Added user account management with order history and saved preferences\n\nTechnical Details\n\n• Built with the MERN stack (MongoDB, Express, React, Node.js)\n• Implemented responsive design principles for all device sizes\n• Used Redux for state management across the application\n• Set up CI/CD pipeline for automated testing and deployment",
      image: pchavenMockup,
      previewGif: pchavenPreview,
      technologies: ["React", "Node.js", "MongoDB", "Express", "Redux"],
      github: "https://github.com/salahmed-ctrlz/PC-Haven",
      demo: "https://salahmed-ctrlz.github.io/PC-Haven/",
      featured: false,
      category: 'web'
    },
    {
      id: 8,
      title: "Cybersecurity Startup Info Page (AMANE)",
      description: "Information page for a cybersecurity startup with details on services, team, and contact information.",
      details: "Startup Info Page\n\n• Developed an informative page for a cybersecurity startup\n• Highlighted services offered, team members, and contact information\n• Integrated a contact form for inquiries\n\nTechnical Details\n\n• Built with React and TailwindCSS\n• Used Formik for form handling and validation\n• Implemented responsive design for all device sizes",
      image: amaneMockup,
      technologies: ["React", "TailwindCSS", "Formik"],
      github: "https://github.com/salahmed-ctrlz/amane-cybersecurity",
      demo: "https://salahmed-ctrlz.github.io/amane-cybersecurity/",
      featured: false,
      category: 'web'
    },
    {
      id: 9,  
      title: "Password Generator",
      description: "Secure password generator with multiple themes and customization options. Built with React and styled-components.",
      details: "Password Generator Features\n\n• Generates secure passwords with customizable length and character sets\n• Features multiple themes including light, dark, and hacker modes\n• Allows copying generated passwords to clipboard with a single click\n• Provides password strength evaluation and security tips\n\nTechnical Implementation\n\n• Built with React and styled-components for theme switching\n• Used cryptographically secure random number generation\n• Implemented responsive design for mobile and desktop usage\n• Added keyboard accessibility and screen reader support",
      image: pwdGeneratorDark,
      images: [pwdGeneratorDark, pwdGeneratorLight, pwdGeneratorHacker],
      technologies: ["React", "styled-components", "JavaScript"],
      github: "https://github.com/salahmed-ctrlz/Sala7-Password-Generator",
      demo: "https://salahmed-ctrlz.github.io/Sala7-Password-Generator/",
      featured: false,
      carousel: true,
      category: 'security'
    },
  ];

  // Coming Soon cards for Tools & Scripts and Cybersecurity
  const comingSoonCards = [
    {
      id: 'tools-coming-soon-1',
      title: "Network Scanner Tool",
      description: "Advanced network scanning and monitoring utility",
      category: 'tools'
    },
    {
      id: 'tools-coming-soon-2', 
      title: "System Automation Suite",
      description: "Comprehensive system automation and management tools",
      category: 'tools'
    },
    {
      id: 'security-coming-soon-1',
      title: "Penetration Testing Framework",
      description: "Automated penetration testing and vulnerability assessment",
      category: 'security'
    },
    {
      id: 'security-coming-soon-2',
      title: "Security Monitoring Dashboard",
      description: "Real-time security monitoring and alerting system",
      category: 'security'
    }
  ];

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    const activeProjects = projects.filter(p => !p.hidden);
    if (selectedCategory === 'all') {
      return activeProjects;
    }
    
    const categoryProjects = activeProjects.filter(project => project.category === selectedCategory);
    
    // Add coming soon cards for specific categories
    if (selectedCategory === 'tools' || selectedCategory === 'security') {
      const comingSoon = comingSoonCards.filter(card => card.category === selectedCategory);
      return [...categoryProjects, ...comingSoon];
    }
    
    return categoryProjects;
  }, [projects, selectedCategory]);

  const visibleProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 3);

  // Get category info for display
  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  // Get project categories (support for multiple categories)
  const getProjectCategories = (project: Project) => {
    if (project.categories && project.categories.length > 0) {
      return project.categories;
    }
    return [project.category];
  };

  // Check if project is a coming soon card
  const isComingSoonCard = (project: any) => {
    return project.id && typeof project.id === 'string' && project.id.includes('coming-soon');
  };

  // Count projects per category
  const categoryCounts = useMemo(() => {
    const activeProjects = projects.filter(p => !p.hidden);
    const counts: { [key: string]: number } = { all: activeProjects.length };
    categories.forEach(cat => {
      counts[cat.id] = activeProjects.filter(p => p.category === cat.id).length;
    });
    return counts;
  }, [projects]);
  
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


  

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, project: Project) => {
    if (!project.previewGif) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage position for CSS variables
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    // Add bounds checking
    const safeX = Math.max(10, Math.min(90, xPercent));
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
  useEffect(() => {
    const carouselProject = projects.find(project => project.carousel);
    if (!carouselProject?.images?.length) return;

    const interval = setInterval(() => {
      setCurrentCarouselIndex(prevIndex => 
        prevIndex === (carouselProject.images?.length || 1) - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
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

  const scrollToSection = (sectionId: string) => {
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
          (img as HTMLImageElement).src = src;
        }
      });
    };

    preloadImages();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="section relative overflow-hidden"
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

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Here are some of my recent works, ranging from web applications to cybersecurity tools.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {/* All Projects Tab */}
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                selectedCategory === 'all'
                  ? 'bg-white text-gray-900 border-white shadow-lg'
                  : 'bg-transparent text-gray-300 border-gray-600 hover:border-gray-400 hover:text-white'
              }`}
            >
              All Projects ({categoryCounts.all})
            </button>

            {/* Category Tabs */}
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.gradient} text-white border-transparent shadow-lg`
                      : 'bg-transparent text-gray-300 border-gray-600 hover:border-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name} ({categoryCounts[category.id]})
                </button>
              );
            })}
          </div>

          {/* Category Description */}
          {selectedCategory !== 'all' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
                {(() => {
                  const category = getCategoryInfo(selectedCategory);
                  const Icon = category.icon;
                  return (
                    <>
                      <div className={`p-2 rounded-full bg-gradient-to-r ${category.gradient}`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-medium">{category.name}</p>
                        <p className="text-gray-400 text-sm">{category.description}</p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Projects Grid */}
        <div className="project-grid">
          {isInView && !imagesLoaded && renderSkeletons()}
          
          {isInView && imagesLoaded && visibleProjects.length > 0 ? (
            visibleProjects.map((project) => {
              const isComingSoon = isComingSoonCard(project);
              const projectCategories = isComingSoon ? [project.category] : getProjectCategories(project as Project);
              
              return (
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
                    onMouseMove={!isComingSoon ? (e) => handleMouseMove(e, project as Project) : undefined}
                    onMouseLeave={!isComingSoon ? () => setHoveredId(null) : undefined}
                  >
                    {isComingSoon ? (
                       // Coming Soon Card - Same structure as normal cards
                       <>
                         {/* Blurred Image Placeholder */}
                         <div className="relative w-full h-full bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-2xl overflow-hidden">
                           <div className="absolute inset-0 bg-gray-800/80 backdrop-blur-xl" />
                           <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-16 h-16 bg-gray-600/50 rounded-full flex items-center justify-center">
                               <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                               </svg>
                             </div>
                           </div>
                         </div>
                       </>
                     ) : (
                       // Regular Project Card
                       <>
                         {(project as Project).carousel && (project as Project).images ? (
                           <div className="carousel-container">
                             {(project as Project).images!.map((image: string, imgIndex: number) => (
                               <div
                                 key={imgIndex}
                                 className={`carousel-slide ${imgIndex === currentCarouselIndex ? 'active' : ''}`}
                               >
                                 <ProjectImage 
                                   src={image}
                                   alt={`${project.title} - View ${imgIndex + 1}`}
                                   width={640}
                                   height={360}
                                 />
                               </div>
                             ))}
                             <div className="carousel-dots">
                               {(project as Project).images!.map((_: string, dotIndex: number) => (
                                 <span
                                   key={dotIndex}
                                   className={`carousel-dot ${dotIndex === currentCarouselIndex ? 'active' : ''}`}
                                   onClick={() => setCurrentCarouselIndex(dotIndex)}
                                 />
                               ))}
                             </div>
                           </div>
                         ) : (
                           <>
                             <ProjectImage 
                               src={(project as Project).image}
                               alt={project.title}
                               width={640}
                               height={360}
                             />
                             {(project as Project).previewGif && (
                               <div className="preview-gif">
                                 <img 
                                   src={(project as Project).previewGif}
                                   alt={`${project.title} preview`}
                                   loading="lazy"
                                 />
                               </div>
                             )}
                           </>
                         )}
                       </>
                     )}
                    <div className="project-overlay" />
                  </div>

                  {/* Project Content */}
                  <div className="project-content">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="project-title">
                        {isComingSoon ? "Coming Soon" : project.title}
                      </h3>
                      {/* Category Badge(s) */}
                      <div className="flex flex-col gap-1">
                        {projectCategories.map((cat, index) => {
                          const categoryInfo = getCategoryInfo(cat);
                          return (
                            <span 
                              key={cat}
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                cat === 'web' ? 'bg-blue-500/20 text-blue-300' :
                                cat === 'tools' ? 'bg-emerald-500/20 text-emerald-300' :
                                'bg-purple-500/20 text-purple-300'
                              }`}
                            >
                              {categoryInfo.shortName}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    
                    {isComingSoon ? (
                      // Mock content for coming soon cards
                      <>
                        <div className="project-description-wrapper">
                          <div className="project-description">
                            <p className="text-gray-400">
                              This project is currently in development. Stay tuned for updates on this exciting new tool that will revolutionize the way we approach {project.category === 'tools' ? 'system automation and productivity' : 'cybersecurity and threat detection'}.
                            </p>
                          </div>
                        </div>
                        
                        {/* Mock Technologies */}
                        <div className="project-tags">
                          <span className="project-tag">In Development</span>
                          <span className="project-tag">Coming Soon</span>
                          <span className="project-tag">Stay Tuned</span>
                        </div>

                        {/* Mock Project Links */}
                        <div className="project-footer">
                          <div className="project-links">
                            <div className="project-link opacity-50 cursor-not-allowed">
                              <Github className="w-4 h-4" />
                              <span>Code</span>
                            </div>
                            <div className="project-link opacity-50 cursor-not-allowed">
                              <ExternalLink className="w-4 h-4" />
                              <span>Demo</span>
                            </div>
                          </div>
                          <div className="view-more-link opacity-50 cursor-not-allowed">
                            <span className="text-sm">Coming Soon</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={`project-description-wrapper ${expandedId === project.id ? 'expanded' : ''}`}>
                          <div className={`project-description ${expandedId === project.id ? 'expanded' : ''}`}>
                            {expandedId === project.id ? (
                              <div className="space-y-4">
                                {(project as Project).details.split('\n\n').map((section: string, index: number) => (
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
                                            .map((item: string, i: number) => (
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
                          {(project as Project).technologies.map((tech: string, index: number) => (
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
                              href={(project as Project).github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-link"
                              data-hover="true"
                            >
                              <Github className="w-4 h-4" />
                              <span>Code</span>
                            </a>
                            {(project as Project).id === 5 ? (
                              <a
                                href="https://www.researchgate.net/publication/392926889_Implementation_of_an_End-to-End_Encryption_Mechanism_in_WebRTC_Video_Streaming"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link"
                                data-hover="true"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                              >
                                <SiResearchgate size={18} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                                <span>Research</span>
                              </a>
                            ) : (
                              <a
                                href={(project as Project).demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`project-link ${(project as Project).demo ? '' : 'opacity-50 cursor-not-allowed'}`}
                                data-hover="true"
                              >
                                <ExternalLink className="w-4 h-4" />
                                <span>Demo</span>
                              </a>
                            )}
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
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-gray-400 text-lg">No projects found in this category.</p>
            </motion.div>
          )}
        </div>

        {!showAllProjects && filteredProjects.length > 3 && (
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

      </div>
    </section>
  );
}