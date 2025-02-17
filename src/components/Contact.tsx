import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('medkoursalaheddine@gmail.com').then(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-300">Let's work together on your next project</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.form
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your message"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors duration-300"
              >
                Send Message
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-semibold mb-8">Connect With Me</h3>
                <div className="space-y-6">
                  <div
                    onClick={handleCopyEmail}
                    className="flex items-center text-gray-300 hover:text-indigo-400 transition-colors cursor-pointer relative group text-lg py-2"
                  >
                    <Mail className="w-8 h-8 mr-4" />
                    medkoursalaheddine@gmail.com
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to copy
                    </span>
                  </div>
                  <a
                    href="https://www.linkedin.com/in/salah-eddine-medkour/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-indigo-400 transition-colors text-lg py-2"
                  >
                    <Linkedin className="w-8 h-8 mr-4" />
                    LinkedIn Profile
                  </a>
                  <a
                    href="https://github.com/salahmed-ctrlz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-indigo-400 transition-colors text-lg py-2"
                  >
                    <Github className="w-8 h-8 mr-4" />
                    GitHub Profile
                  </a>
                  <a
                    href="/path/to/your/cv.pdf"
                    download
                    className="flex items-center text-gray-300 hover:text-indigo-400 transition-colors text-lg py-2"
                  >
                    <Download className="w-8 h-8 mr-4" />
                    Download CV
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}