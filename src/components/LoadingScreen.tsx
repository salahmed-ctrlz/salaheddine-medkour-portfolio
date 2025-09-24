import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlurText from './BlurText';
import ShinyText from './ShinyText';
import CountUp from './CountUp';
import './ShinyText.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setLoadingComplete(true);
          // Wait a bit more for animations to complete
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15; // Random increment for realistic feel
      });
    }, 150);

    // Show content after a short delay
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(contentTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
      >
        {/* Main content container */}
        <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
          {/* Salahuddin - BlurText */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <BlurText
              text="Salahuddin"
              delay={100}
              animateBy="characters"
              direction="top"
              className="text-6xl md:text-8xl font-bold text-white"
              onAnimationComplete={() => {
                // Animation completed
              }}
            />
          </motion.div>

          {/* Subtitle - ShinyText */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <ShinyText
              text="Jack of All Trades ..."
              speed={3}
              className="text-xl md:text-2xl"
            />
          </motion.div>

          {/* Loading progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="space-y-4"
          >
            {/* Progress bar */}
            <div className="w-full max-w-xs mx-auto">
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Percentage counter */}
            <div className="text-gray-400 text-sm">
              <CountUp
                from={0}
                to={100}
                duration={3}
                className="text-white font-medium"
                onEnd={() => {
                  // Counter animation completed
                }}
              />
              <span>%</span>
            </div>
          </motion.div>
        </div>

        {/* Subtle background gradient */}
        <div className="absolute inset-0 -z-10">
          <div 
            className="w-full h-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)'
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
