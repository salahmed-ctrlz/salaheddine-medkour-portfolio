import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Mail, Linkedin, Github, Download, Send, Check, Loader2, ExternalLink, Copy, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import Resume from "./MEDKOUR_SALAH_EDDINE_CV_EN.pdf";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    availability: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  const timeSlots = [
    "9am - 11am",
    "11am - 1pm", 
    "2pm - 4pm",
    "4pm - 6pm",
    "6pm - 8pm",
    "8pm - 10pm"
  ];
  
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const formControls = useAnimation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setError('');

    try {
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
        setIsSuccess(true);
        confetti({
          particleCount: 40,
          spread: 40,
          origin: { y: 0.7 },
          colors: ['#818cf8', '#6366f1', '#4f46e5'],
          disableForReducedMotion: true
        });

        setTimeout(() => {
          setFormState({ name: '', email: '', availability: '', message: '' });
          setIsSuccess(false);
        }, 2500);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('medkoursalaheddine@gmail.com').then(() => {
      setCopied(true);
      confetti({
        particleCount: 30,
        spread: 35,
        origin: { y: 0.7 },
        colors: ['#818cf8', '#6366f1'],
        disableForReducedMotion: true
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    formControls.start({ opacity: 1, y: 0 });
  }, [formControls]);

  return (
    <section 
      id="contact" 
      className="py-24 md:py-32 text-white relative overflow-hidden"
      style={{ scrollMarginTop: '80px' }}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-gray-900/50 to-black" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Say Hello!
          </h2>
          <p className="text-lg text-white/50 max-w-lg mx-auto">
            Let's work together on your next project, Or kindly rate the Portfolio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative">
              {/* Success Overlay */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-20 rounded-2xl"
                  >
                    <div className="text-center p-6">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-6 h-6 text-green-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1">Message Sent!</h3>
                      <p className="text-sm text-white/50">I'll get back to you soon.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm text-white/40 mb-2">
                    Name <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    ref={nameInputRef}
                    value={formState.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full bg-white/[0.03] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-white/20 focus:bg-white/[0.05] transition-all duration-300 outline-none text-sm placeholder:text-white/20"
                    placeholder="Salahuddin"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm text-white/40 mb-2">
                    Email <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    ref={emailInputRef}
                    value={formState.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full bg-white/[0.03] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-white/20 focus:bg-white/[0.05] transition-all duration-300 outline-none text-sm placeholder:text-white/20"
                    placeholder="salahuddin@example.com"
                  />
                </div>

                {/* Availability */}
                <div>
                  <label htmlFor="availability" className="block text-sm text-white/40 mb-2">
                    Preferred Time <span className="text-white/20">(optional)</span>
                  </label>
                  <div className="relative">
                    <select
                      id="availability"
                      name="availability"
                      value={formState.availability}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-white/[0.03] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-white/20 focus:bg-white/[0.05] transition-all duration-300 outline-none appearance-none cursor-pointer text-sm"
                    >
                      <option value="" className="bg-gray-900">Select time slot</option>
                      {timeSlots.map((slot, index) => (
                        <option key={index} value={slot} className="bg-gray-900">{slot}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm text-white/40 mb-2">
                    Message <span className="text-indigo-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    ref={messageInputRef}
                    value={formState.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    rows={4}
                    className="w-full bg-white/[0.03] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-white/20 focus:bg-white/[0.05] transition-all duration-300 outline-none resize-none text-sm placeholder:text-white/20"
                    placeholder="Your message..."
                  />
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-red-400 text-sm"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium py-3 rounded-xl hover:bg-white/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Email */}
            <button
              onClick={handleCopyEmail}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-white/40 mb-0.5">Email</p>
                  <p className="text-sm text-white/80">medkoursalaheddine@gmail.com</p>
                </div>
              </div>
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded"
                  >
                    Copied!
                  </motion.span>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Copy className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/salah-eddine-medkour/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between gap-4 px-5 py-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-white/40 mb-0.5">LinkedIn</p>
                  <p className="text-sm text-white/80">Salah Eddine Medkour</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/salahmed-ctrlz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between gap-4 px-5 py-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <Github className="w-5 h-5 text-white/60" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-white/40 mb-0.5">GitHub</p>
                  <p className="text-sm text-white/80">salahmed-ctrlz</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
            </a>

            {/* Resume */}
            <a
              href={Resume}
              download="Medkour_Salah_Eddine_Resume.pdf"
              className="w-full flex items-center justify-between gap-4 px-5 py-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Download className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-white/40 mb-0.5">Resume</p>
                  <p className="text-sm text-white/80">Download CV</p>
                </div>
              </div>
              <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded">PDF</span>
            </a>

            {/* Status Tags */}
            <div className="pt-6 flex flex-wrap gap-2">
              <span className="text-xs text-white/30 px-3 py-1.5 rounded-full border border-white/5">
                Open to Work
              </span>
              <span className="text-xs text-white/30 px-3 py-1.5 rounded-full border border-white/5">
                Freelance
              </span>
              <span className="text-xs text-white/30 px-3 py-1.5 rounded-full border border-white/5">
                Remote
              </span>
              <span className="text-xs text-white/30 px-3 py-1.5 rounded-full border border-white/5">
                ~24h Response
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}