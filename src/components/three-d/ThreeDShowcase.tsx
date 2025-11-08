'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Box, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import type { Mesh } from 'three';

/**
 * 3D Logo Component - Rotating geometric shapes representing MERTMAX divisions
 */
function Logo3D() {
  const groupRef = useRef<any>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Grocery - Red Cube */}
      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={0.3}
        position={[-2, 0, 0]}
      >
        <Box args={[1, 1, 1]}>
          <meshStandardMaterial 
            color="rgb(229, 62, 62)" 
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
      </Float>
      
      {/* Industrial - Magenta Sphere */}
      <Float
        speed={2.5}
        rotationIntensity={0.6}
        floatIntensity={0.4}
        position={[0, 0, 0]}
      >
        <Sphere args={[0.7, 32, 32]}>
          <meshStandardMaterial 
            color="rgb(213, 63, 140)" 
            metalness={0.9}
            roughness={0.1}
          />
        </Sphere>
      </Float>
      
      {/* Construction - Blue Box */}
      <Float
        speed={1.8}
        rotationIntensity={0.4}
        floatIntensity={0.5}
        position={[2, 0, 0]}
      >
        <Box args={[1.2, 1.2, 1.2]} rotation={[0.5, 0.5, 0]}>
          <meshStandardMaterial 
            color="rgb(49, 130, 206)" 
            metalness={0.7}
            roughness={0.3}
          />
        </Box>
      </Float>
    </group>
  );
}

/**
 * 3D Showcase - Auto-rotating 3D shapes representing the three divisions
 * 
 * Features:
 * - React Three Fiber canvas with auto-rotation
 * - Floating animations for each division
 * - Metallic materials with lighting
 * - OrbitControls for user interaction
 * - Suspense boundary for loading state
 */
export function ThreeDShowcase() {
  return (
    <motion.div
      className="w-full h-[400px] md:h-[500px] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        className="bg-transparent"
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#E53E3E" />
          <pointLight position={[10, 10, 5]} intensity={0.5} color="#3182CE" />
          
          {/* 3D Shapes */}
          <Logo3D />
          
          {/* Controls - enable user rotation */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
      
      {/* Overlay text */}
      <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
        <p className="text-gray-600 text-sm font-medium">
          <span className="text-red-600">Супермаркет</span> · <span className="text-pink-600">Индустрия</span> · <span className="text-blue-600">Строителство</span>
        </p>
      </div>
    </motion.div>
  );
}
