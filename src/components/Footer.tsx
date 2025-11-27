import { useState, useEffect, useRef } from 'react';
import { Clock, MapPin, Mail, Github, Linkedin, Copy, Check, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { SiWhatsapp } from 'react-icons/si';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [typedText, setTypedText] = useState("Me");
  const typeInterval = useRef<NodeJS.Timeout | null>(null);
  const fullName = "Medkour Salahuddin";

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isExpanded) {
      let index = 2;
      typeInterval.current = setInterval(() => {
        if (index <= fullName.length) {
          setTypedText(fullName.slice(0, index));
          index++;
        } else {
          if (typeInterval.current) clearInterval(typeInterval.current);
        }
      }, 50);
    } else {
      setTypedText("Me");
      if (typeInterval.current) clearInterval(typeInterval.current);
    }
    return () => {
      if (typeInterval.current) clearInterval(typeInterval.current);
    };
  }, [isExpanded]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
    
    confetti({
      particleCount: 60,
      spread: 35,
      origin: { y: 0.9, x: 0.5 },
      colors: ['#818cf8', '#6366f1', '#4f46e5'],
      ticks: 150,
      gravity: 0.9,
      scalar: 1,
      disableForReducedMotion: true
    });
  };

  return (
    <footer 
      id="custom-footer" 
      className="relative bg-black/90 backdrop-blur-xl border-t border-white/5"
      aria-label="Footer"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          
          {/* Left: Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-white/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{formatTime(currentTime)}</span>
              <span className="text-white/20">·</span>
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Annaba, Algeria</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm text-white/50">Open to opportunities</span>
            </div>
          </div>

          {/* Center: Contact */}
          <div className="space-y-4">
            <motion.button
              onClick={() => handleCopy('medkoursalaheddine@gmail.com')}
              className="w-full flex items-center justify-between gap-4 px-4 py-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors group"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/40" />
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                  medkoursalaheddine@gmail.com
                </span>
              </div>
              <AnimatePresence mode="wait">
                {copiedEmail ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                  >
                    <Check className="w-4 h-4 text-green-400" />
                  </motion.div>
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
            </motion.button>

            <a 
              href="https://wa.me/213551964262"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between gap-4 px-4 py-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <SiWhatsapp className="w-4 h-4 text-green-400/70" />
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                  WhatsApp
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
            </a>
          </div>

          {/* Right: Social & Credit */}
          <div className="flex flex-col items-start md:items-end justify-between gap-6">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/salahmed-ctrlz"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-white/60 hover:text-white transition-colors" />
              </a>
              
              <a
                href="https://www.linkedin.com/in/salah-eddine-medkour/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-white/60 hover:text-white transition-colors" />
              </a>
            </div>

            <div 
              className="cursor-pointer"
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
            >
              <span className="text-sm text-white/30 hover:text-white/50 transition-colors">
                Made by <span className="text-white/50">{typedText}</span>
              </span>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
          <span className="text-xs text-white/30">
            © 2025 All rights reserved
          </span>
          
          <span className="text-xs text-white/30 text-center sm:text-right">
            Open to collaborations and new projects
          </span>
        </div>
      </div>
    </footer>
  );
}