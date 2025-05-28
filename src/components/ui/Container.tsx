import React from 'react';

interface ContainerProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ 
  id, 
  className = '', 
  children 
}) => {
  return (
    <section
      id={id}
      className={`min-h-screen py-20 ${className}`}
    >
      <div className="container mx-auto px-4 md:px-6 h-full">
        {children}
      </div>
    </section>
  );
};

export default Container;