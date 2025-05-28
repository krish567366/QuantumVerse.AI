import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '../ui';
import SectionTitle from '../ui/Section';
import { useAnimatedText } from '../../hooks';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useAnimatedText('words');
  const paragraphRef = useAnimatedText('words');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);

  return (
    <Container id="about" className="relative flex items-center">
      <div ref={containerRef} className="w-full">
        <SectionTitle
          title="About Me"
          subtitle="Bridging the gap between quantum physics, artificial intelligence and human-centered design."
          accentColor="purple"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image side with code particles */}
          <motion.div 
            className="relative aspect-square rounded-lg overflow-hidden"
            style={{ opacity, y }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/30 to-neon-blue/30 rounded-lg">
              {/* Animated code snippets */}
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-xs md:text-sm font-mono text-white/60 bg-background-card/50 p-2 rounded"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.2, 0.8, 0.2],
                    x: `calc(${Math.random() * 80 - 40}%)`,
                    y: `calc(${Math.random() * 80 - 40}%)`,
                  }}
                  transition={{ 
                    duration: 10 + Math.random() * 15,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  style={{
                    left: `${Math.random() * 80}%`,
                    top: `${Math.random() * 80}%`,
                    maxWidth: '150px'
                  }}
                >
                  {[
                    "const quantum = createQubit(0);",
                    "<TensorFlow model={aiModel} />",
                    "import * as THREE from 'three';",
                    "useEffect(() => { ... }, []);",
                    "quantum.hadamard().cnot(target);",
                    "const [state, setState] = useState();",
                    "class QuantumCircuit { ... }",
                    "function predictImage(tensor) { ... }",
                    "gsap.to(element, { opacity: 1 });",
                    "async function generateText() { ... }",
                    "shader.uniforms.uTime.value = time;",
                    "const particles = new THREE.Points();",
                    "@tf.function const model = tf.sequential();",
                    "quantumSimulator.run(circuit);"
                  ][i % 14]}
                </motion.div>
              ))}
            </div>

            {/* Developer image */}
            <img 
              src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Developer at work" 
              className="absolute inset-0 w-full h-full object-cover rounded-lg mix-blend-luminosity opacity-60"
            />

            {/* Overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
          </motion.div>
          
          {/* Text content side */}
          <div>
            <motion.h3 
              className="text-2xl md:text-3xl font-display mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span ref={titleRef} className="bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-teal">
                Quantum Developer & AI Enthusiast
              </span>
            </motion.h3>
            
            <motion.p 
              className="text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              ref={paragraphRef}
            >
              I'm a full-stack developer specializing in quantum computing algorithms, 
              artificial intelligence, and immersive web experiences. With a background 
              in theoretical physics and computer science, I blend cutting-edge 
              technologies to build next-generation applications.
            </motion.p>
            
            <div className="space-y-4">
              {[
                { label: "Quantum Computing", value: 90 },
                { label: "AI & Machine Learning", value: 85 },
                { label: "WebGL & 3D Graphics", value: 80 },
                { label: "Full-Stack Development", value: 95 },
              ].map((skill, index) => (
                <motion.div 
                  key={skill.label}
                  className="space-y-1"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex justify-between text-sm">
                    <span>{skill.label}</span>
                    <span>{skill.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-background-light rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default About;