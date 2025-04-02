<<<<<<< HEAD
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Mail, Linkedin, Github, Download, Send, Check, Loader2, ArrowRight, MessageSquare, ChevronDown } from 'lucide-react';
=======
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Download, Send } from 'lucide-react';
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
import confetti from 'canvas-confetti';
import Resume from "../components/Medkour Salah Eddine - Resume Feb 2025.pdf";

export default function Contact() {
<<<<<<< HEAD
  // Form state management
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    availability: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activeField, setActiveField] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Availability time slots
  const timeSlots = [
    "9am - 11am",
    "11am - 1pm",
    "2pm - 4pm",
    "4pm - 6pm",
    "6pm - 8pm",
    "8pm - 10pm"
  ];
  
  // Refs for focus management
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const availabilityRef = useRef<HTMLSelectElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  
  // Animation controls
  const formControls = useAnimation();
  const connectControls = useAnimation();
  
  // Optimized animated background elements - reduced count for better performance
  const bubbles = Array(4).fill(0).map((_, i) => ({
    id: i,
    size: Math.random() * 80 + 40,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 5
  }));

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  // Form validation
  const validateForm = () => {
    if (!formState.name.trim()) {
      setError('Please enter your name');
      nameInputRef.current?.focus();
      return false;
    }
    
    if (!formState.email.trim()) {
      setError('Please enter your email');
      emailInputRef.current?.focus();
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setError('Please enter a valid email address');
      emailInputRef.current?.focus();
      return false;
    }
    
    if (!formState.message.trim()) {
      setError('Please enter your message');
      messageInputRef.current?.focus();
      return false;
    }
    
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      // Animated form transition
      await formControls.start({ 
        scale: 0.98, 
        opacity: 0.8,
        transition: { duration: 0.2 } 
      });
      
      // Submit the form to Formspree
      const response = await fetch('https://formspree.io/f/mjkykprr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formState)
      });
      
      const data = await response.json();
      
      if (data.ok) {
        // Show success state and confetti
        setIsSuccess(true);
        
        // Optimized confetti with fewer particles for better performance
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#818cf8', '#6366f1', '#4f46e5'],
          disableForReducedMotion: true
        });

        // Reset form after delay with animation
        setTimeout(() => {
          formControls.start({ 
            scale: 1, 
            opacity: 1,
            transition: { duration: 0.5, type: "spring" } 
          });
          setFormState({ 
            name: '', 
            email: '', 
            availability: '', 
            message: '' 
          });
          setIsSuccess(false);
        }, 2500);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again or contact directly via email.');
      formControls.start({ 
        scale: 1, 
        opacity: 1,
        transition: { duration: 0.3 } 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle copy email to clipboard
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('medkoursalaheddine@gmail.com').then(() => {
      setCopied(true);
      
      // Optimized confetti
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#818cf8', '#6366f1', '#4f46e5'],
        disableForReducedMotion: true
      });
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  // Floating label effect and field focus
  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };
  
  const handleBlur = () => {
    setActiveField(null);
  };
  
  // Initialize animations
  useEffect(() => {
    formControls.start({ opacity: 1, y: 0 });
    connectControls.start({ opacity: 1, y: 0 });
  }, [formControls, connectControls]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Adjust based on your navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const contactLink = document.querySelector('a[href="#contact"]');
    if (contactLink) {
      contactLink.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToSection('contact');
      });
    }
  }, []);

  // Add smooth hover effects to buttons and links
  const hoverEffect = {
    whileHover: { scale: 1.05, transition: { duration: 0.1 } },
    whileTap: { scale: 0.95 }
  };

  return (
    <section 
      id="contact" 
      className="pb-16 pt-20 text-white relative overflow-hidden"
      style={{ scrollMarginTop: '80px' }} // Adjust based on your navbar height
    >
      {/* Optimized background animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Simplified gradient background for better performance */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-900/90"></div>
        
        {/* Reduced number of animated elements */}
        {bubbles.map(bubble => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full bg-gradient-to-br from-indigo-500/5 to-purple-600/5 will-change-transform"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              opacity: 0.1,
            }}
            animate={{
              x: [0, 10, -10, 5, -5, 0],
              y: [0, -10, 10, -5, 5, 0],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
              delay: bubble.delay,
            }}
          />
        ))}
        
        {/* Subtle grid overlay with reduced opacity */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-indigo-200 to-gray-300 bg-clip-text text-transparent"
=======
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
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
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
<<<<<<< HEAD
              Let's work together on your next project,
              Or kindly rate the Portfolio.
            </motion.p>
          </div>

          {/* Mobile-first approach with a single column layout that expands on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* Form Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={formControls}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Send a Message
              </h3>

              <div className="bg-gray-800/30 backdrop-blur-md p-5 rounded-xl border border-gray-700/50 relative overflow-hidden shadow-lg">
                {/* Form success overlay */}
                <AnimatePresence>
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center z-10"
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="text-center p-4"
                      >
                        <motion.div 
                          className="relative bg-gradient-to-br from-green-500/30 to-emerald-600/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                          animate={{ 
                            boxShadow: ["0 0 0 0px rgba(74, 222, 128, 0.2)", "0 0 0 15px rgba(74, 222, 128, 0)"] 
                          }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            repeatDelay: 0.5
                          }}
                        >
                          <Check className="w-8 h-8 text-green-500" />
                        </motion.div>
                        <motion.h3 
                          className="text-xl font-bold text-white mb-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          Message Sent!
                        </motion.h3>
                        <motion.p 
                          className="text-gray-300 text-sm"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          Thanks for reaching out. I'll get back to you soon.
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div className="relative">
                    <label 
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Name <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      ref={nameInputRef}
                      placeholder="Salahuddin Medkour"
                      value={formState.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className="w-full bg-gray-900/50 text-white px-4 py-2 rounded-lg border border-gray-700/50 focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 outline-none text-sm"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label 
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Email <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      ref={emailInputRef}
                      placeholder="salahuddin@portfolio.me"
                      value={formState.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className="w-full bg-gray-900/50 text-white px-4 py-2 rounded-lg border border-gray-700/50 focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 outline-none text-sm"
                    />
                  </div>

                  {/* Availability Time Field */}
                  <div className="relative">
                    <label 
                      htmlFor="availability"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Availability time <span className="text-gray-500">(optional)</span>
                    </label>
                    <div className="relative">
                      <select
                        id="availability"
                        name="availability"
                        ref={availabilityRef}
                        value={formState.availability}
                        onChange={handleChange}
                        onFocus={() => handleFocus('availability')}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        className="w-full bg-gray-900/50 text-white px-4 py-2 rounded-lg border border-gray-700/50 focus:border-indigo-300/70 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 outline-none appearance-none cursor-pointer text-sm"
                      >
                        <option value="">Select time slot</option>
                        {timeSlots.map((slot, index) => (
                          <option key={index} value={slot}>{slot}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <label 
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Your Message <span className="text-indigo-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      ref={messageInputRef}
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      rows={4}
                      className="w-full bg-gray-900/50 text-white px-4 py-2 rounded-lg border border-gray-700/50 focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 outline-none resize-none text-sm"
                    />
                  </div>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                      >
                        <p className="text-red-500 text-xs flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative group overflow-hidden bg-indigo-600 text-white py-2.5 rounded-lg transition-all duration-300 shadow-lg shadow-indigo-600/20 mt-2"
                    {...hoverEffect}
                  >
                    <span className="relative flex items-center justify-center gap-2 font-medium text-sm">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          <span>Send Message</span>
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Connect Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={connectControls}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Connect With Me
              </h3>
              
              <div className="space-y-4">
                {/* Email Card */}
                <motion.div
                  whileHover={{ scale: 1.05, x: 10 }}
                  onClick={handleCopyEmail}
                  className="flex items-center text-gray-300 transition-all duration-300 cursor-pointer relative group bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30 overflow-hidden"
                >
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 relative z-10">
                    <Mail className="w-5 h-5 text-indigo-400" />
                  </div>
                  
                  <div className="flex-1 relative z-10 overflow-hidden">
                    <p className="text-xs text-indigo-300 font-medium mb-0.5">Email</p>
                    <p className="text-sm text-gray-300 truncate">medkoursalaheddine@gmail.com</p>
                  </div>
                  
                  <div className="relative z-10 flex items-center">
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="bg-green-500/20 text-green-500 text-xs font-medium px-2 py-0.5 rounded-full"
                        >
                          Copied!
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300"
                        >
                          <span className="text-xs mr-1 hidden sm:inline">Copy</span>
                          <ArrowRight className="w-3.5 h-3.5 inline-block" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* LinkedIn Profile */}
                <motion.a
                  whileHover={{ scale: 1.05, x: 10 }}
                  href="https://www.linkedin.com/in/salah-eddine-medkour/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 transition-all duration-300 relative group bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30 overflow-hidden"
                >
                  <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 relative z-10">
                    <Linkedin className="w-5 h-5 text-blue-400" />
                  </div>
                  
                  <div className="flex-1 relative z-10">
                    <p className="text-xs text-blue-300 font-medium mb-0.5">LinkedIn</p>
                    <p className="text-sm text-gray-300">Salah Eddine Medkour</p>
                  </div>
                  
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400 relative z-10" />
                </motion.a>

                {/* GitHub Profile */}
                <motion.a
                  whileHover={{ scale: 1.05, x: 10 }}
                  href="https://github.com/salahmed-ctrlz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 transition-all duration-300 relative group bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30 overflow-hidden"
                >
                  <div className="w-10 h-10 bg-gray-500/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 relative z-10">
                    <Github className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  <div className="flex-1 relative z-10">
                    <p className="text-xs text-gray-300 font-medium mb-0.5">GitHub</p>
                    <p className="text-sm text-gray-300">salahmed-ctrlz</p>
                  </div>
                  
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 relative z-10" />
                </motion.a>

                {/* Resume Download */}
                <motion.a
                  whileHover={{ scale: 1.05, x: 10 }}
                  href={Resume}
                  download="Medkour_Salah_Eddine_Resume.pdf"
                  className="flex items-center text-gray-300 transition-all duration-300 relative group bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30 overflow-hidden"
                >
                  <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 relative z-10">
                    <Download className="w-5 h-5 text-purple-400" />
                  </div>
                  
                  <div className="flex-1 relative z-10">
                    <p className="text-xs text-purple-300 font-medium mb-0.5">Resume</p>
                    <p className="text-sm text-gray-300">Download CV (PDF)</p>
                  </div>
                  
                  <div className="relative z-10 bg-purple-500/10 rounded-full py-0.5 px-2 text-xs font-medium text-purple-400">
                    <span className="hidden sm:inline">PDF</span>
                    <Download className="w-3 h-3 inline-block sm:ml-1" />
                  </div>
                </motion.a>
              </div>
              
              {/* Response Time */}
              <div className="bg-gray-800/20 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
                <h4 className="text-base font-medium text-gray-300 mb-3">Response Time</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Email & LinkedIn</span>
                  <span className="text-xs text-gray-300">Within 24 hours</span>
                </div>
                <div className="w-full bg-gray-700/30 rounded-full h-1 mb-4">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1 rounded-full" style={{ width: '90%' }}></div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <div className="bg-indigo-500/10 backdrop-blur-sm rounded-lg px-2 py-1 border border-indigo-500/20">
                    <span className="text-xs text-indigo-400">Open to Work</span>
                  </div>
                  <div className="bg-purple-500/10 backdrop-blur-sm rounded-lg px-2 py-1 border border-purple-500/20">
                    <span className="text-xs text-purple-400">Freelance</span>
                  </div>
                  <div className="bg-blue-500/10 backdrop-blur-sm rounded-lg px-2 py-1 border border-blue-500/20">
                    <span className="text-xs text-blue-400">Remote</span>
                  </div>
                </div>
              </div>
=======
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
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 7a88c03d5cf831ed95bcdcea54472365beef279b
