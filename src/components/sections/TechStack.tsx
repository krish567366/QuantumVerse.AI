import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container, SectionTitle } from '../ui';

// Tech stack data with categories
const techData = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', proficiency: 95, icon: '⚛️' },
      { name: 'TypeScript', proficiency: 90, icon: 'TS' },
      { name: 'Three.js', proficiency: 85, icon: '3D' },
      { name: 'WebGL/GLSL', proficiency: 80, icon: '⬢' },
      { name: 'TailwindCSS', proficiency: 90, icon: '🌊' },
    ],
  },
  {
    category: 'AI & Machine Learning',
    skills: [
      { name: 'TensorFlow.js', proficiency: 85, icon: '🧠' },
      { name: 'Python/PyTorch', proficiency: 90, icon: '🐍' },
      { name: 'NLP', proficiency: 80, icon: '📝' },
      { name: 'Computer Vision', proficiency: 85, icon: '👁️' },
    ],
  },
  {
    category: 'Quantum Computing',
    skills: [
      { name: 'Qiskit', proficiency: 85, icon: 'Q' },
      { name: 'Quantum Algorithms', proficiency: 80, icon: '⚛️' },
      { name: 'Quantum Machine Learning', proficiency: 75, icon: '🔄' },
    ],
  },
  {
    category: 'Backend & DevOps',
    skills: [
      { name: 'Node.js', proficiency: 90, icon: '🟢' },
      { name: 'GraphQL', proficiency: 85, icon: '◼️' },
      { name: 'Docker', proficiency: 80, icon: '🐳' },
      { name: 'AWS', proficiency: 85, icon: '☁️' },
    ],
  },
];

const SkillCard: React.FC<{ 
  skill: { name: string; proficiency: number; icon: string; }; 
  index: number;
}> = ({ skill, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      className="bg-background-card rounded-lg p-4 border border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background-light flex items-center justify-center text-xl">
          {skill.icon}
        </div>
        <div className="flex-grow">
          <h4 className="text-white font-medium">{skill.name}</h4>
          <div className="mt-2 h-2 w-full bg-background-dark rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-blue to-neon-teal"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.proficiency}%` } : { width: 0 }}
              transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TechStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Container id="tech" className="py-20">
      <SectionTitle
        title="Tech Stack"
        subtitle="The technologies, frameworks, and tools I work with to build cutting-edge applications."
        accentColor="blue"
        centerTitle
      />
      
      <div className="mt-12" ref={containerRef}>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {techData.map((category, categoryIndex) => (
            <motion.div key={category.category} variants={itemVariants}>
              <div className="mb-4">
                <motion.h3 
                  className="text-xl font-display font-semibold inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                    {category.category}
                  </span>
                </motion.h3>
                <motion.div 
                  className="mt-2 h-0.5 bg-gradient-to-r from-neon-blue to-transparent"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + categoryIndex * 0.1 }}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard 
                    key={skill.name} 
                    skill={skill} 
                    index={skillIndex + (categoryIndex * category.skills.length)}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Additional professional skills */}
      <motion.div 
        className="mt-16 bg-background-card rounded-lg p-6 border border-gray-800"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-xl font-semibold mb-6 text-center">Other Professional Skills</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            'WebXR/VR', 'GSAP Animations', 'Shader Programming', 'UI/UX Design',
            'Web Crypto API', 'Responsive Design', 'Performance Optimization', 
            'System Architecture', 'WebAssembly', 'Web Workers'
          ].map((skill, i) => (
            <motion.span
              key={skill}
              className="px-4 py-2 bg-background-light rounded-full text-sm text-gray-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: '#4361EE20',
                color: '#fff'
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </Container>
  );
};

export default TechStack;