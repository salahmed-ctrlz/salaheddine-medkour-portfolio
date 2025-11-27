import { useEffect, useState, lazy, Suspense } from "react";
import { Navigation } from './components/Navigation';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import ScrollMeter from './components/ScrollMeter';
import Footer from './components/Footer';
import SEO from './components/SEO';
import Orb from './components/Orb';
import LoadingScreen from './components/LoadingScreen';

const Projects = lazy(() => import('./components/Projects'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
);


function App() {
  const [mounted, setMounted] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Always show loading screen on page load/refresh
    setShowLoadingScreen(true);
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Using 768px as a common tablet breakpoint
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const contactLink = document.querySelector('a[href="#contact"]');
    const contactElement = document.getElementById('contact');
    
    if (contactLink && contactElement) {
      contactLink.addEventListener('click', function(e) {
        e.preventDefault();
        contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, []);

  const handleLoadingComplete = () => {
    setShowLoadingScreen(false);
  };

  return (
    <>
      <SEO />
      {/* Loading Screen */}
      {showLoadingScreen && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      
      {/* Main App */}
      <div className="bg-black text-white min-h-screen relative">
        {/* Orb Background */}
        <Orb
          hoverIntensity={isMobile ? 0 : 0.5}
          rotateOnHover={!isMobile}
          hue={0}
          forceHoverState={isMobile}
        />

        {/* Content */}
        <div className="relative z-10">
          <main>
            <Navigation>
              {!isMobile && <ScrollMeter />}
              {!isMobile && <CustomCursor />}
              <Hero />
              <Suspense fallback={<LoadingSpinner />}>
                <About />
                <Skills />
                <Projects />
                <Contact />
              </Suspense>
              <Footer />
            </Navigation>
          </main>
        </div>

        {/* Progressive loading overlay */}
        {!mounted && !showLoadingScreen && (
          <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
            <div className="loading-skeleton w-32 h-32 rounded-full" />
          </div>
        )}
      </div>
    </>
  );
}
export default App;
