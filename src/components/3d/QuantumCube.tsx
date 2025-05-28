import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Box, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface QuantumCubeProps {
  position?: [number, number, number];
  size?: number;
  color?: string;
  wireframe?: boolean;
  distort?: boolean;
  rotationSpeed?: number;
  pulseSpeed?: number;
}

const QuantumCube: React.FC<QuantumCubeProps> = ({
  position = [0, 0, 0],
  size = 1,
  color = '#4361EE',
  wireframe = false,
  distort = true,
  rotationSpeed = 0.005,
  pulseSpeed = 0.5
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { clock } = useThree();

  useFrame(() => {
    if (!meshRef.current) return;
    
    // Rotate the cube
    meshRef.current.rotation.x += rotationSpeed;
    meshRef.current.rotation.y += rotationSpeed * 0.7;
    
    // Add pulsing effect
    if (distort) {
      const pulseValue = Math.sin(clock.getElapsedTime() * pulseSpeed) * 0.1 + 0.2;
      meshRef.current.scale.set(
        1 + pulseValue * 0.1,
        1 + pulseValue * 0.1,
        1 + pulseValue * 0.1
      );
    }
  });

  return (
    <Box 
      args={[size, size, size]} 
      position={position}
      ref={meshRef}
    >
      {distort ? (
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={3}
          wireframe={wireframe}
          roughness={0.2}
          metalness={0.8}
        />
      ) : (
        <meshStandardMaterial
          color={color}
          wireframe={wireframe}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      )}
    </Box>
  );
};

export default QuantumCube;