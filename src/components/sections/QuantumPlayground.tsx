import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Container, Card, SectionTitle, Button } from '../ui';
import { ChevronsUpDown, Plus, Trash2, RotateCcw, Play } from 'lucide-react';

// List of quantum gates
const quantumGates = [
  { id: 'hadamard', name: 'Hadamard', symbol: 'H', color: '#4361EE' },
  { id: 'pauliX', name: 'Pauli-X', symbol: 'X', color: '#7209B7' },
  { id: 'pauliY', name: 'Pauli-Y', symbol: 'Y', color: '#4CC9F0' },
  { id: 'pauliZ', name: 'Pauli-Z', symbol: 'Z', color: '#F72585' },
  { id: 'cnot', name: 'CNOT', symbol: '•—⊕', color: '#4CC9F0' },
  { id: 'measure', name: 'Measure', symbol: 'M', color: '#ffffff' },
];

const QuantumGate: React.FC<{ gate: typeof quantumGates[0], onDragStart: (gate: typeof quantumGates[0]) => void }> = ({ gate, onDragStart }) => {
  return (
    <motion.div
      className="p-2 rounded-md bg-background-card border border-gray-800 cursor-grab"
      whileHover={{ scale: 1.05, boxShadow: `0 0 8px ${gate.color}` }}
      whileTap={{ scale: 0.95 }}
      drag
      dragSnapToOrigin
      onDragStart={() => onDragStart(gate)}
    >
      <div className="w-10 h-10 rounded-md flex items-center justify-center text-lg font-bold"
           style={{ backgroundColor: `${gate.color}20`, color: gate.color }}>
        {gate.symbol}
      </div>
      <p className="text-xs mt-1 text-center text-gray-400">{gate.name}</p>
    </motion.div>
  );
};

// 3D Qubit representation
const Qubit3D: React.FC<{ position: [number, number, number], state: number }> = ({ position, state }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // State is a value between 0 (|0⟩) and 1 (|1⟩), or something in between for superposition
  const stateColor = state === 0 
    ? '#4361EE'  // |0⟩ state - blue
    : state === 1 
      ? '#7209B7'  // |1⟩ state - purple
      : '#4CC9F0';  // superposition - teal

  return (
    <group position={position} ref={groupRef}>
      {/* Qubit sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color={stateColor} 
          emissive={stateColor} 
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* State label */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {state === 0 ? '|0⟩' : state === 1 ? '|1⟩' : '|ψ⟩'}
      </Text>
    </group>
  );
};

const QuantumPlayground: React.FC = () => {
  const [circuit, setCircuit] = useState<Array<typeof quantumGates[0]>>([]);
  const [qubits, setQubits] = useState([0, 0]); // Initial state |00⟩
  const [isSimulating, setIsSimulating] = useState(false);

  const handleGateDragStart = (gate: typeof quantumGates[0]) => {
    // In a real implementation, this would handle the logic for placing gates
    // For this demo, we'll just add the gate to the circuit
    setCircuit(prev => [...prev, gate]);
  };

  const removeGate = (index: number) => {
    setCircuit(prev => prev.filter((_, i) => i !== index));
  };

  const resetCircuit = () => {
    setCircuit([]);
    setQubits([0, 0]);
  };

  const simulateCircuit = () => {
    setIsSimulating(true);
    
    // Simple simulation for demo purposes
    // In a real quantum circuit simulator, we would apply the gates
    // to the quantum state vector
    setTimeout(() => {
      // Apply a simple rule: H gates create superposition (0.5)
      // X gates flip bits (0->1, 1->0)
      const newQubits = [...qubits];
      
      circuit.forEach(gate => {
        if (gate.id === 'hadamard') {
          // For simplicity, we'll say Hadamard puts qubit in superposition
          newQubits[0] = 0.5;
        }
        else if (gate.id === 'pauliX') {
          // Flip the first qubit
          newQubits[0] = newQubits[0] === 0 ? 1 : newQubits[0] === 1 ? 0 : newQubits[0];
        }
        else if (gate.id === 'cnot') {
          // If first qubit is 1, flip second qubit
          if (newQubits[0] === 1) {
            newQubits[1] = newQubits[1] === 0 ? 1 : 0;
          }
        }
      });
      
      setQubits(newQubits);
      setIsSimulating(false);
    }, 1500);
  };

  return (
    <Container id="quantum" className="py-20">
      <SectionTitle
        title="Quantum Playground"
        subtitle="Experiment with quantum gates and circuits in this interactive simulator. Drag gates to the circuit and see how they affect qubits."
        accentColor="teal"
        centerTitle
      />
      
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gate palette */}
        <Card className="lg:col-span-1" glowColor="teal">
          <h3 className="text-xl font-semibold mb-4">Quantum Gates</h3>
          <p className="text-gray-400 text-sm mb-4">
            Drag these gates to the circuit to build your quantum algorithm.
          </p>
          
          <div className="grid grid-cols-3 gap-2">
            {quantumGates.map((gate) => (
              <QuantumGate 
                key={gate.id} 
                gate={gate} 
                onDragStart={handleGateDragStart}
              />
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-800">
            <h4 className="text-sm font-semibold mb-2">Instructions:</h4>
            <ol className="text-xs text-gray-400 space-y-1 list-decimal pl-4">
              <li>Drag gates from the palette to create your circuit</li>
              <li>Click "Run Simulation" to see how gates affect the qubits</li>
              <li>Use "Reset" to clear your circuit and start over</li>
            </ol>
          </div>
        </Card>
        
        {/* Circuit Builder and Visualization */}
        <Card className="lg:col-span-2" glowColor="teal">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Quantum Circuit</h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                icon={<RotateCcw size={14} />}
                onClick={resetCircuit}
              >
                Reset
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<Play size={14} />}
                onClick={simulateCircuit}
                isLoading={isSimulating}
              >
                Run Simulation
              </Button>
            </div>
          </div>
          
          {/* Circuit grid */}
          <div className="mb-8 border border-gray-800 rounded-lg bg-background-dark/50 p-4">
            {circuit.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Drag gates here to build your quantum circuit</p>
                <p className="text-sm mt-2">Your gates will appear in this area</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {circuit.map((gate, index) => (
                  <div key={index} className="relative">
                    <div
                      className="p-2 rounded-md bg-background-card border border-gray-800"
                      style={{ borderColor: gate.color }}
                    >
                      <div 
                        className="w-12 h-12 rounded-md flex items-center justify-center text-lg font-bold"
                        style={{ backgroundColor: `${gate.color}20`, color: gate.color }}
                      >
                        {gate.symbol}
                      </div>
                      <button 
                        className="absolute -top-2 -right-2 bg-background-dark rounded-full p-0.5 text-red-500 hover:text-red-400"
                        onClick={() => removeGate(index)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* 3D Qubit Visualization */}
          <div className="h-64 rounded-lg overflow-hidden border border-gray-800">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={0.8} color="#4361EE" />
              <pointLight position={[-10, -10, 10]} intensity={0.5} color="#7209B7" />
              
              {/* Quantum state visualization */}
              <Qubit3D position={[-1.5, 0, 0]} state={qubits[0]} />
              <Qubit3D position={[1.5, 0, 0]} state={qubits[1]} />
              
              {/* Connection line between qubits */}
              <line>
                <bufferGeometry 
                  attach="geometry" 
                  setFromPoints={[
                    { x: -1, y: 0, z: 0 },
                    { x: 1, y: 0, z: 0 }
                  ].map(p => new THREE.Vector3(p.x, p.y, p.z))} 
                />
                <lineBasicMaterial 
                  attach="material" 
                  color="#4CC9F0" 
                  linewidth={1} 
                  linecap="round" 
                  linejoin="round"
                  opacity={0.5}
                  transparent
                />
              </line>
              
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>
        </Card>
      </div>
      
      {/* Add more qubits button */}
      <div className="mt-6 text-center">
        <motion.button
          className="inline-flex items-center text-neon-teal border border-neon-teal/50 px-4 py-2 rounded-full text-sm hover:bg-neon-teal/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={16} className="mr-2" />
          Add Qubit
          <span className="ml-2 text-xs bg-neon-teal/20 px-2 py-0.5 rounded-full">Coming Soon</span>
        </motion.button>
      </div>
    </Container>
  );
};

export default QuantumPlayground;