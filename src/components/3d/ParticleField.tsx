import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  size?: number;
  color?: string;
  spread?: number;
  speed?: number;
}

const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 2000,
  size = 0.02,
  color = '#4CC9F0',
  spread = 10,
  speed = 0.1,
}) => {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread;
    }
    
    return positions;
  }, [count, spread]);

  const particleSizes = useMemo(() => {
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      sizes[i] = Math.random() * size;
    }
    
    return sizes;
  }, [count, size]);

  useFrame((state) => {
    if (!points.current) return;

    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = points.current.geometry.attributes.position.array[i3];
      const y = points.current.geometry.attributes.position.array[i3 + 1];
      const z = points.current.geometry.attributes.position.array[i3 + 2];
      
      // Apply sine wave movement
      points.current.geometry.attributes.position.array[i3] = x + Math.sin(time * speed + i * 0.1) * 0.01;
      points.current.geometry.attributes.position.array[i3 + 1] = y + Math.cos(time * speed + i * 0.1) * 0.01;
      points.current.geometry.attributes.position.array[i3 + 2] = z + Math.sin(time * speed + i * 0.1) * 0.01;
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particleSizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={color}
      />
    </points>
  );
};

export default ParticleField;