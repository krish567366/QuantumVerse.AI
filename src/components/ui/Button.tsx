import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  glowing?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon,
  isLoading = false, 
  fullWidth = false,
  glowing = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const variantClasses = {
    primary: 'bg-neon-blue hover:bg-neon-blue/90 text-white focus:ring-neon-blue/50',
    secondary: 'bg-neon-purple hover:bg-neon-purple/90 text-white focus:ring-neon-purple/50',
    outline: 'bg-transparent border-2 border-neon-blue text-neon-blue hover:bg-neon-blue/10 focus:ring-neon-blue/50',
    ghost: 'bg-transparent hover:bg-white/10 text-white focus:ring-white/50',
  };
  
  const glowClass = glowing ? 'shadow-neon-blue' : '';
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <motion.button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${glowClass} ${widthClass} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
          <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </motion.button>
  );
};

export default Button;