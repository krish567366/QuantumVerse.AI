import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  className?: string;
  glowColor?: 'blue' | 'purple' | 'teal' | 'none';
  hoverEffect?: boolean;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  className = '',
  glowColor = 'none',
  hoverEffect = true,
  children
}) => {
  const getGlowClass = () => {
    switch (glowColor) {
      case 'blue': return 'shadow-neon-blue';
      case 'purple': return 'shadow-neon-purple';
      case 'teal': return 'shadow-neon-teal';
      default: return '';
    }
  };

  const glowClass = getGlowClass();

  return (
    <motion.div
      className={`
        bg-background-card rounded-lg border border-gray-800 
        backdrop-blur-md p-6 ${glowClass} ${className}
      `}
      initial={hoverEffect ? { y: 0 } : {}}
      whileHover={hoverEffect ? { y: -5 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;