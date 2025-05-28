import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Card, Button, SectionTitle } from '../ui';
import { ExternalLink, Github, Play } from 'lucide-react';

// Project data based on resume
const projects = [
  {
    id: 'quantum-ml',
    title: 'Quantum Machine Learning',
    description: 'Developed a hybrid quantum-classical machine learning model using Qiskit and TensorFlow for image classification. Achieved 95% accuracy on MNIST dataset while reducing computational complexity by 30%.',
    tags: ['Quantum Computing', 'Machine Learning', 'Python', 'Qiskit', 'TensorFlow'],
    imageUrl: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg',
    demoUrl: '#demo-quantum-ml',
    aiModel: 'imageClassification'
  },
  {
    id: 'blockchain-platform',
    title: 'Decentralized Trading Platform',
    description: 'Built a decentralized cryptocurrency trading platform using Ethereum smart contracts and Web3.js. Implemented automated market making algorithms and real-time price feeds.',
    tags: ['Blockchain', 'Ethereum', 'Solidity', 'Web3.js', 'React'],
    imageUrl: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg',
    demoUrl: '#demo-trading',
    githubUrl: 'https://github.com'
  },
  {
    id: 'ai-assistant',
    title: 'AI Research Assistant',
    description: 'Created an AI-powered research assistant using GPT-3 and BERT for academic paper analysis. Features include paper summarization, citation network analysis, and research trend identification.',
    tags: ['NLP', 'Deep Learning', 'Python', 'PyTorch', 'Transformers'],
    imageUrl: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
    demoUrl: '#demo-research-ai',
    aiModel: 'textGeneration'
  },
  {
    id: 'quantum-crypto',
    title: 'Post-Quantum Cryptography',
    description: 'Implemented and benchmarked post-quantum cryptographic algorithms for secure communication. Developed a hybrid encryption scheme combining classical and quantum-resistant methods.',
    tags: ['Cryptography', 'Quantum Computing', 'C++', 'OpenSSL'],
    imageUrl: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg',
    demoUrl: '#demo-crypto'
  }
];

const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.tags.some(tag => 
        tag.toLowerCase().includes(activeTab.toLowerCase())));

  return (
    <Container id="projects" className="py-20">
      <SectionTitle 
        title="Featured Projects" 
        subtitle="Exploring the intersection of quantum computing, artificial intelligence, and blockchain technology through innovative research and development."
        accentColor="blue"
        centerTitle
      />
      
      {/* Filter tabs */}
      <motion.div 
        className="flex flex-wrap justify-center gap-2 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {['All', 'Quantum Computing', 'Machine Learning', 'Blockchain', 'Cryptography'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              activeTab.toLowerCase() === tab.toLowerCase() || (tab === 'All' && activeTab === 'all')
                ? 'bg-neon-blue text-white'
                : 'bg-background-card hover:bg-neon-blue/20 text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab(tab.toLowerCase())}
          >
            {tab}
          </button>
        ))}
      </motion.div>
      
      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              className="h-full flex flex-col" 
              glowColor="blue"
            >
              {/* Project image */}
              <div className="relative h-48 rounded-md overflow-hidden mb-4">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"></div>
                
                {/* Tags */}
                <div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-background-dark/80 text-xs px-2 py-1 rounded-full text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-display font-semibold mb-2 text-white">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
              
              {/* Actions */}
              <div className="mt-auto pt-4 flex justify-between items-center">
                {project.aiModel && (
                  <span className="flex items-center text-xs text-neon-purple">
                    <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse mr-2"></span>
                    Live AI Demo
                  </span>
                )}
                
                <div className="flex space-x-2">
                  {project.githubUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Github size={16} />}
                      aria-label="View source code"
                    >
                      Code
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    size="sm"
                    icon={project.aiModel ? <Play size={16} /> : <ExternalLink size={16} />}
                    aria-label="View live demo"
                  >
                    {project.aiModel ? 'Run Demo' : 'View Project'}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};

export default Projects;