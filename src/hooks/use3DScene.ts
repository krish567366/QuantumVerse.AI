import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface SceneOptions {
  backgroundColor?: THREE.ColorRepresentation;
  cameraPosition?: THREE.Vector3;
  autoRotate?: boolean;
  renderCallback?: (scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.WebGLRenderer) => void;
}

export function use3DScene(containerRef: React.RefObject<HTMLDivElement>, options: SceneOptions = {}) {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const frameIdRef = useRef<number>(0);

  const defaultOptions = {
    backgroundColor: 0x030712,
    cameraPosition: new THREE.Vector3(0, 0, 5),
    autoRotate: true
  };

  const mergedOptions = { ...defaultOptions, ...options };

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const container = containerRef.current;
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(mergedOptions.backgroundColor);
    sceneRef.current = scene;

    // Create camera
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    camera.position.copy(mergedOptions.cameraPosition);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = mergedOptions.autoRotate;
    controls.autoRotateSpeed = 0.5;
    controlsRef.current = controls;

    // Animation loop
    const animate = () => {
      controls.update();
      
      if (mergedOptions.renderCallback) {
        mergedOptions.renderCallback(scene, camera, renderer);
      }
      
      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      if (renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef]);

  return {
    scene: sceneRef,
    camera: cameraRef,
    renderer: rendererRef,
    controls: controlsRef
  };
}