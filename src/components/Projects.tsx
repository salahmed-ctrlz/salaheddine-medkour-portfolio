import { motion } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, ChevronUp, Maximize2, X } from 'lucide-react';
import { useState } from 'react';
import ecommerce from './images/ecommerce.png';
import weathapp from './images/WeathApp.png';
import pwdgen from './images/pwdgen.png';
import ePortfolio from './images/eportfolio.png';

const projects = [
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
    details: "This app fetches real-time weather data from a public API and displays it in a user-friendly interface. It includes features like location-based weather, temperature units conversion, and a 5-day forecast.",
    technologies: ["HTML", "OpenWeather API", "CSS"]
  },
  {
    title: "Password Generator",
    description: "A secure password generator tool with customizable options.",
    image: pwdgen,
    github: "https://github.com/salahmed-ctrlz/sala7-PwdGen.github.io",
    live: "https://salahmed-ctrlz.github.io/sala7-PwdGen.github.io/",
    details: "This tool generates strong, secure passwords based on user preferences like length, character types, and special symbols. It ensures high security and ease of use, And it doesn't save logs/Passwords for privacy.",
    technologies: ["JavaScript", "HTML", "CSS"]
  },
  {
    title: "ePortfolio",
    description: "My previous portfolio website showcasing my projects and skills.",
    image: ePortfolio,
    github: "https://github.com/salahmed-ctrlz/ePortfolio",
    live: "https://salahmed-ctrlz.github.io/ePortfolio/",
    details: "This was my first portfolio website, built to showcase my projects and skills. It includes a clean design, responsive layout, and smooth animations.",
    technologies: ["HTML", "CSS", "JavaScript"]
  }
];

export default function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [maximizedImage, setMaximizedImage] = useState<string | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="projects" className="py-20 bg-gray-800 text-white">
      {maximizedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={() => setMaximizedImage(null)}
        >
          <div 
            className="relative max-w-[90vw] max-h-[90vh] bg-gray-900 rounded-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMaximizedImage(null)}
              className="absolute top-2 right-2 text-black hover:text-indigo-400 transition-colors"
            >
              <X className="w-10 h-10" />
            </button>
            <img 
              src={maximizedImage} 
              alt="Maximized" 
              className="max-h-[60vh] max-w-[80vw] object-contain rounded-lg"
            />
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
              <div className="relative h-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <button
                  onClick={() => setMaximizedImage(project.image)}
                  className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:text-indigo-400 transition-colors"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
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
                  className="mt-4 flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
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
                    <p className="text-gray-400 mb-4">{project.details}</p>
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