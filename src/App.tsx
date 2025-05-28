import React, { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppStore } from './store';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Loader from './components/Loader';
import { 
  Hero,
  About,
  Projects,
  QuantumPlayground,
  TechStack,
  Contact
} from './components/sections';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const { isLoading, setActiveSection } = useAppStore();
  const appRef = useRef<HTMLDivElement>(null);

  // Handle section detection for navbar highlighting
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      sections.forEach((section) => {
        const sectionId = section.getAttribute('id') || '';
        const sectionHeight = section.clientHeight;
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        
        if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={appRef} className="min-h-screen bg-background-dark text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <Loader />}
      </AnimatePresence>
      
      {/* Overlay gradient for background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-neon-blue/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-neon-purple/5 to-transparent"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-neon-blue/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-neon-purple/5 blur-3xl"></div>
      </div>
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <QuantumPlayground />
        <TechStack />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;