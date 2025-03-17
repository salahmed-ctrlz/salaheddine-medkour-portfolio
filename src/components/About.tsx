import { motion, useScroll, useTransform } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Code2, Palette, Brain, PenBoxIcon, Pencil, Calendar, GraduationCap, Briefcase } from "lucide-react";
import profilePic from "./images/profile.jpg";
import { useRef, useEffect } from "react";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
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
      rotateX: 5,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
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

  return (
    <section 
      ref={containerRef}
      id="about" 
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
            <div className="relative inline-block perspective-1000">
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
        </div>
      </div>
    </section>
  );
}