import React from 'react';
import { Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-light py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-teal">
              QuantumVerse<span className="text-neon-purple">.AI</span>
            </h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Exploring the fusion of quantum computing, artificial intelligence, 
              and cutting-edge web technologies to build the next generation of 
              digital experiences.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-gray-400 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a>
              </li>
              <li>
                <a href="#quantum" className="text-gray-400 hover:text-white transition-colors">Quantum Lab</a>
              </li>
              <li>
                <a href="#tech" className="text-gray-400 hover:text-white transition-colors">Tech Stack</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background-dark flex items-center justify-center hover:bg-neon-blue/20 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} className="text-white" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background-dark flex items-center justify-center hover:bg-neon-blue/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="text-white" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background-dark flex items-center justify-center hover:bg-neon-blue/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} className="text-white" />
              </a>
              <a 
                href="mailto:contact@quantumverse.ai" 
                className="w-10 h-10 rounded-full bg-background-dark flex items-center justify-center hover:bg-neon-blue/20 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} className="text-white" />
              </a>
            </div>
            <div className="mt-6">
              <a 
                href="#contact" 
                className="inline-flex items-center text-neon-blue hover:text-neon-purple transition-colors"
              >
                <span className="mr-2">Get in touch</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} QuantumVerse.AI. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Built with React, Three.js, and quantum entanglement.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;