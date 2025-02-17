import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

function App() {
  useEffect(() => {
    document.title = "Medkour Salah Eddine | Portfolio";
  }, []);

  return (
    <div className="bg-black">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}

export default App;