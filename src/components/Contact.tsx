import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Download, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import Resume from "../components/Medkour Salah Eddine - Resume Feb 2025.pdf";

export default function Contact() {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('medkoursalaheddine@gmail.com').then(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#818cf8', '#6366f1', '#4f46e5']
      });
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 1%, transparent 0%), radial-gradient(circle at 75px 75px, white 1%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Get In Touch
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Let's work together on your next project
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.form
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
                  placeholder="Your name"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
                  placeholder="your@email.com"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 resize-none"
                  placeholder="Your message"
                />
              </motion.div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative overflow-hidden group bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-lg transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center space-x-2">
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </span>
              </motion.button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Connect With Me
              </h3>
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  onClick={handleCopyEmail}
                  className="flex items-center text-gray-300 hover:text-indigo-400 transition-all duration-300 cursor-pointer relative group bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700/30 hover:border-indigo-500/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Mail className="w-8 h-8 mr-4 flex-shrink-0" />
                  <span className="text-lg">medkoursalaheddine@gmail.com</span>
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Click to copy
                  </span>
                </motion.div>

                <motion.a
                  whileHover={{ scale: 1.02, x: 5 }}
                  href="https://www.linkedin.com/in/salah-eddine-medkour/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-indigo-400 transition-all duration-300 bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700/30 hover:border-indigo-500/30 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Linkedin className="w-8 h-8 mr-4 flex-shrink-0" />
                  <span className="text-lg">LinkedIn Profile</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02, x: 5 }}
                  href="https://github.com/salahmed-ctrlz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-indigo-400 transition-all duration-300 bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700/30 hover:border-indigo-500/30 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Github className="w-8 h-8 mr-4 flex-shrink-0" />
                  <span className="text-lg">GitHub Profile</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02, x: 5 }}
                  href={Resume}
                  download="Medkour_Salah_Eddine_Resume.pdf"
                  className="flex items-center text-gray-300 hover:text-indigo-400 transition-all duration-300 bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700/30 hover:border-indigo-500/30 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Download className="w-8 h-8 mr-4 flex-shrink-0" />
                  <span className="text-lg">Download CV</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
