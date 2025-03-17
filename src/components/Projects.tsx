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
  useEffect(() => {
    const carouselProject = projects.find(project => project.carousel);
    if (!carouselProject?.images?.length) return;

    const interval = setInterval(() => {
      setCurrentCarouselIndex(prevIndex => 
        prevIndex === carouselProject.images!.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

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

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}