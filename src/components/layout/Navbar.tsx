import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store';
import { Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'quantum', label: 'Quantum Lab', href: '#quantum' },
  { id: 'tech', label: 'Tech Stack', href: '#tech' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const { isNavOpen, setNavOpen, activeSection } = useAppStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setNavOpen(!isNavOpen);
  };

  const closeMenu = () => {
    setNavOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background-light/80 backdrop-blur-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="#hero" className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple opacity-70 animate-pulse-slow"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-xl md:text-2xl font-display bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-teal">
              QuantumVerse<span className="text-neon-purple">.AI</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-teal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-background-light/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`px-4 py-2 rounded-md text-base font-medium transition-colors ${
                      activeSection === item.id
                        ? 'bg-background-card text-neon-blue'
                        : 'text-gray-300 hover:bg-background-card/50 hover:text-white'
                    }`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;