import { useEffect, useState } from "react";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import ScrollMeter from './components/ScrollMeter';

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    updateTimeBasedTheme();
    const interval = setInterval(updateTimeBasedTheme, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const updateTimeBasedTheme = () => {
    const hour = new Date().getHours();
    const root = document.documentElement;
    
    // Update background hue based on time (0-360 degrees)
    const bgHue = Math.floor((hour / 24) * 360);
    root.style.setProperty('--time-based-bg', `${bgHue}deg`);
    
    // Update accent hue (offset from bg)
    const accentHue = (bgHue + 40) % 360;
    root.style.setProperty('--time-based-accent', `${accentHue}deg`);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen relative">
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />
      
      {/* Dynamic background gradient */}
      <div 
        className="fixed inset-0 transition-colors duration-1000 ease-in-out z-[-1]"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, 
              hsl(var(--time-based-bg), 70%, 20%) 0%,
              hsl(var(--time-based-bg), 70%, 10%) 100%
            )
          `
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <ScrollMeter />
        <CustomCursor />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>

      {/* Progressive loading overlay */}
      {!mounted && (
        <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
          <div className="loading-skeleton w-32 h-32 rounded-full" />
        </div>
      )}
    </div>
  );
}

export default App;