import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useAppStore } from '../store';

const Loader: React.FC = () => {
  const { isLoading, progress, setProgress, setLoading } = useAppStore();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading progress
    let loadProgress = 0;
    const interval = setInterval(() => {
      loadProgress += Math.random() * 10;
      
      if (loadProgress >= 100) {
        loadProgress = 100;
        clearInterval(interval);
        
        // Finish loading
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
      
      setProgress(loadProgress);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  }, [progress]);

  if (!isLoading) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background-dark"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo/Cube */}
      <motion.div
        className="w-20 h-20 mb-8"
        animate={{
          rotateY: [0, 180, 360],
          rotateX: [0, 180, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="80" height="80" rx="10" stroke="#4361EE" strokeWidth="2" />
          <rect x="20" y="20" width="60" height="60" rx="5" stroke="#7209B7" strokeWidth="2" />
          <rect x="30" y="30" width="40" height="40" rx="2" stroke="#4CC9F0" strokeWidth="2" />
          <circle cx="50" cy="50" r="10" fill="#4CC9F0" fillOpacity="0.5" />
        </svg>
      </motion.div>

      {/* Text */}
      <motion.h1 
        className="text-2xl font-display text-white mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
          QuantumVerse.AI
        </span>
      </motion.h1>

      {/* Loading bar */}
      <div className="w-64 h-1 bg-background-card rounded-full overflow-hidden">
        <div 
          ref={progressRef}
          className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-teal"
          style={{ width: '0%' }}
        ></div>
      </div>
      
      {/* Loading text */}
      <motion.p 
        className="mt-4 text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Initializing quantum environment...
      </motion.p>
    </motion.div>
  );
};

export default Loader;