import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GradientButton from './GradientButton';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  github: string;
  features: string[];
  technicalHighlights: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Better Call Saul",
    description: "A modern web application inspired by the hit TV series 'Better Call Saul'. This project showcases a sleek, responsive design with interactive elements and smooth animations.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "src/components/images/BetterCallSaul.webp",
    link: "https://bettercallsaul.vercel.app/",
    github: "https://github.com/medkoursalah/BetterCallSaul",
    features: [
      "Responsive design that works on all devices",
      "Interactive UI elements with smooth animations",
      "Dark mode support",
      "Performance optimized with lazy loading"
    ],
    technicalHighlights: [
      "Built with React and TypeScript for type safety",
      "Uses Tailwind CSS for styling",
      "Implements Framer Motion for animations",
      "Optimized images with WebP format"
    ]
  },
  {
    id: 2,
    title: "Current Portfolio",
    description: "A modern, responsive portfolio website showcasing my projects and skills. Built with React and TypeScript, featuring smooth animations and a clean design.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "src/components/images/CurrentPortfolio.webp",
    link: "https://medkoursalah.vercel.app/",
    github: "https://github.com/medkoursalah/portfolio",
    features: [
      "Responsive design with mobile-first approach",
      "Interactive project cards with expandable details",
      "Smooth scroll animations",
      "Custom cursor effects"
    ],
    technicalHighlights: [
      "React with TypeScript for type safety",
      "Tailwind CSS for styling",
      "Framer Motion for animations",
      "Custom cursor implementation"
    ]
  },
  {
    id: 3,
    title: "Black Hole",
    description: "An interactive visualization of a black hole using Three.js. This project demonstrates advanced 3D graphics and physics simulations in the browser.",
    technologies: ["Three.js", "React", "TypeScript", "Tailwind CSS"],
    image: "src/components/images/blackhole.webp",
    link: "https://blackhole.vercel.app/",
    github: "https://github.com/medkoursalah/blackhole",
    features: [
      "Realistic 3D black hole visualization",
      "Interactive camera controls",
      "Particle effects and lighting",
      "Responsive design"
    ],
    technicalHighlights: [
      "Three.js for 3D graphics",
      "Custom shaders for realistic effects",
      "Performance optimized rendering",
      "Responsive canvas sizing"
    ]
  }
];

const Projects: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-white"
        >
          Featured Projects
        </motion.h2>

        <div className="project-grid">
          {displayedProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`project-card ${expandedId === project.id ? 'expanded' : ''}`}
            >
              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
              </div>
              <div className="project-content">
                <h3 className="text-2xl font-bold mb-4 text-white">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="project-description text-gray-300 mb-4">
                  {project.description}
                </p>
                {expandedId === project.id && (
                  <div className="expanded-content">
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-white mb-3">Key Features</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        {project.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-white mb-3">Technical Highlights</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        {project.technicalHighlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-4 mt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Live Demo →
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    GitHub →
                  </a>
                </div>
                <div className="mt-4">
                  <GradientButton
                    onClick={() => toggleExpand(project.id)}
                    className="px-4 py-2 min-h-10 ml-auto"
                  >
                    {expandedId === project.id ? "View Less" : "Learn More"}
                  </GradientButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {projects.length > 3 && (
          <div className="text-center mt-12">
            <GradientButton
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3"
            >
              {showAll ? "Show Less Projects" : "Show More Projects"}
            </GradientButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects; 