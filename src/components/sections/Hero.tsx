import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { QuantumCube, ParticleField } from '../3d';
import { Button } from '../ui';
import { ArrowDownCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.1} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} color="#4CC9F0" />
          <directionalLight position={[-5, -5, 5]} intensity={0.3} color="#7209B7" />
          <pointLight position={[0, 0, 2]} intensity={1} color="#4361EE" />
          
          <group position={[0, 0, 0]}>
            <QuantumCube size={1.5} position={[0, 0, 0]} color="#4361EE" />
            <ParticleField count={1500} size={0.03} color="#4CC9F0" spread={15} />
          </group>
          
          <Stars radius={100} depth={50} count={5000} factor={4} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true}
            autoRotate 
            autoRotateSpeed={0.5} 
          />
        </Canvas>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-dark/70 via-transparent to-background-dark z-10"></div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div 
            className="mb-6 inline-block"
            animate={{ 
              boxShadow: [
                '0 0 5px rgba(67, 97, 238, 0.5)', 
                '0 0 20px rgba(67, 97, 238, 0.8)', 
                '0 0 5px rgba(67, 97, 238, 0.5)'
              ] 
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            <h2 className="text-sm md:text-base uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-neon-teal to-neon-blue py-1 px-4 rounded-full border border-neon-blue/30">
              Welcome to the future
            </h2>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-purple to-neon-teal">
              QuantumVerse.AI
            </span>
            <span className="block text-white text-2xl md:text-3xl mt-2">
              Next-Generation Developer Portfolio
            </span>
          </h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Exploring the intersection of quantum computing, 
            artificial intelligence, and immersive web experiences
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Button 
              variant="primary" 
              size="lg" 
              glowing={true}
              onClick={() => document.getElementById('quantum')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Quantum Lab
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View AI Projects
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <button 
            onClick={scrollToNext}
            className="text-white opacity-80 hover:opacity-100 transition-opacity"
            aria-label="Scroll down"
          >
            <ArrowDownCircle size={36} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;