import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centerTitle?: boolean;
  accentColor?: 'blue' | 'purple' | 'teal';
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  centerTitle = false,
  accentColor = 'blue' 
}) => {
  const gradientMap = {
    blue: 'from-neon-blue to-primary-500',
    purple: 'from-neon-purple to-accent-500',
    teal: 'from-neon-teal to-secondary-500'
  };

  const gradient = gradientMap[accentColor];
  
  return (
    <div className={`mb-12 ${centerTitle ? 'text-center' : ''}`}>
      <motion.h2 
        className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          className="mt-4 text-lg text-gray-400 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;