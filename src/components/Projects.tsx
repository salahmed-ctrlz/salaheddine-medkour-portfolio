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

const projects = [
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
    if (!carouselProject) return;

    const interval = setInterval(() => {
      setCurrentCarouselIndex(prevIndex => 
        prevIndex === carouselProject.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="projects" className="py-20 bg-gray-800 text-white">
      {maximizedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setMaximizedImage(null)}
        >
          <div className="relative max-w-screen-xl max-h-screen w-full h-full flex items-center justify-center">
            {/* Blurred background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 blur-xl"
              style={{ backgroundImage: `url(${maximizedImage})` }}
            ></div>
            
            {/* Actual image */}
            <div 
              className="relative max-w-[90vw] max-h-[90vh] z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setMaximizedImage(null)}
                className="absolute top-2 right-2 bg-black rounded-full p-2 shadow-[0_0_10px_rgba(255,255,255,0.7)] hover:text-indigo-400 transition-colors cursor-pointer z-20"
              >
                <X className="w-8 h-8 text-white" />
              </button>
              <img 
                src={maximizedImage} 
                alt="Maximized" 
                className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Picked Projects</h2>
          <p className="text-gray-300">Here are some of my projects that I can showcase here, Please feel free to check others on my Github.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-60">
                {project.carousel ? (
                  <div className="relative w-full h-full overflow-hidden">
                    {project.images.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        alt={`${project.title} - View ${imgIndex + 1}`}
                        className={`absolute w-full h-full object-cover transition-all duration-500 ${
                          imgIndex === currentCarouselIndex ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ objectPosition: "top" }}
                      />
                    ))}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                      {project.images.map((_, dotIndex) => (
                        <span
                          key={dotIndex}
                          className={`w-2 h-2 rounded-full ${
                            dotIndex === currentCarouselIndex ? "bg-indigo-500" : "bg-gray-500"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setMaximizedImage(project.images[currentCarouselIndex])}
                      className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      style={{ objectPosition: "top" }}
                    />
                    <button
                      onClick={() => setMaximizedImage(project.image)}
                      className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Live Demo
                  </a>
                </div>
                <button
                  onClick={() => toggleExpand(index)}
                  className="mt-4 flex items-center text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  {expandedIndex === index ? (
                    <ChevronUp className="w-5 h-5 mr-2" />
                  ) : (
                    <ChevronDown className="w-5 h-5 mr-2" />
                  )}
                  View More
                </button>
                {expandedIndex === index && (
                  <div className="mt-4">
                    <p className="text-gray-400 mb-4 whitespace-pre-line">{project.details}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i}
                          className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-indigo-600 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}