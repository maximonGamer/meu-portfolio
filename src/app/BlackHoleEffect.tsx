'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// --- CONFIGURAÇÃO DOS PLANETAS ---
// Centralizamos os dados para facilitar a manutenção (Padrão Clean Code)
const PLANETS_DATA = [
  { name: 'Venus', texture: '/textures/2k_venus_surface.jpg', size: 0.28, distance: 3.5, speed: 0.35 },
  { name: 'Earth', texture: '/textures/2k_earth_daymap.jpg', size: 0.3, distance: 5, speed: 0.3 },
  { name: 'Mars', texture: '/textures/2k_mars.jpg', size: 0.25, distance: 6.5, speed: 0.25 },
  { name: 'Jupiter', texture: '/textures/2k_jupiter.jpg', size: 0.6, distance: 9, speed: 0.15 },
  { name: 'Saturn', texture: '/textures/2k_saturn.jpg', size: 0.5, distance: 11.5, speed: 0.12 },
  { name: 'Uranus', texture: '/textures/2k_uranus.jpg', size: 0.4, distance: 14, speed: 0.1 },
  { name: 'Neptune', texture: '/textures/2k_neptune.jpg', size: 0.38, distance: 16, speed: 0.08 },
];

// 🌍 Componente Planeta Otimizado
function Planet({ texturePath, size, distance, speed }: { texturePath: string; size: number; distance: number; speed: number }) {
  const texture = useTexture(texturePath);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (meshRef.current) {
      // Movimento orbital (Trigonométrico)
      meshRef.current.position.x = Math.cos(t) * distance;
      meshRef.current.position.z = Math.sin(t) * distance;
      // Rotação axial (Giro do planeta)
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial map={texture} roughness={0.8} metalness={0.1} />
    </mesh>
  );
}

// ☀️ Sol: O centro do sistema e fonte de luz
function Sun() {
  const texture = useTexture('/textures/2k_sun.jpg');
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (sunRef.current) sunRef.current.rotation.y += 0.002;
  });

  return (
    <group>
      <mesh ref={sunRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial 
          map={texture} 
          emissive={new THREE.Color('#ff5500')} 
          emissiveIntensity={2} 
        />
      </mesh>
      {/* Luz que ilumina os planetas lateralmente */}
      <pointLight intensity={150} distance={50} decay={2} color="#ffcc33" />
    </group>
  );
}

// ☄️ Chuva de Meteoros (Processamento centralizado para alta performance)
function MeteorShower({ count = 12 }) {
  const groupRef = useRef<THREE.Group>(null);
  const meteors = useMemo(() => 
    Array.from({ length: count }, () => ({
      pos: new THREE.Vector3(THREE.MathUtils.randFloatSpread(100), Math.random() * 20 + 10, THREE.MathUtils.randFloatSpread(100)),
      speed: Math.random() * 0.1 + 0.05,
      scale: Math.random() * 0.5 + 0.2
    }))
  , [count]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.x += meteors[i].speed;
        child.position.y -= meteors[i].speed * 0.5;
        child.rotation.x += 0.01;
        
        // Reset infinito dos meteoros
        if (child.position.y < -25) child.position.y = 35;
        if (child.position.x > 50) child.position.x = -50;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {meteors.map((m, i) => (
        <mesh key={i} position={m.pos} scale={m.scale}>
          <coneGeometry args={[0.2, 0.8, 4]} />
          <meshStandardMaterial color="#ff4400" emissive="#ff0000" emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  );
}

// 🌟 Componente Principal da Seção Hero
export default function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#020205]">
      
      {/* CANVAS 3D - Camada de Fundo */}
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 8, 20]} fov={55} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          maxPolarAngle={Math.PI / 1.8} 
          minPolarAngle={Math.PI / 2.5} 
        />
        
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          
          {/* Estrelas do Drei (Super leves) */}
          <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
          
          <Sun />
          <MeteorShower />

          {PLANETS_DATA.map((planet) => (
            <Planet 
              key={planet.name}
              texturePath={planet.texture} 
              size={planet.size} 
              distance={planet.distance} 
              speed={planet.speed} 
            />
          ))}
        </Suspense>
      </Canvas>

      {/* OVERLAY DE INTERFACE - Camada Superior */}
      {/* pointer-events-none permite interagir com o 3D através do texto */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-10"
        >
          <h1 className="text-5xl sm:text-8xl font-black tracking-tighter">
            <span className="text-white drop-shadow-2xl">TECNOLOGIA</span>{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse">
              VISION
            </span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-base tracking-[0.5em] uppercase mt-4 opacity-80">
            Inovação | Tecnologia | Compreensão
          </p>
        </motion.div>

        <motion.div 
          className="bg-black/30 backdrop-blur-md p-8 rounded-3xl border border-white/10 max-w-3xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h2 className="text-white text-2xl sm:text-3xl font-bold mb-4">
            Analista e Desenvolvedor de Sistemas
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6 rounded-full" />
          <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-light">
            <span className="text-cyan-400 font-semibold">Full Stack Developer</span> • Especialista em criar soluções inovadoras para Web e Mobile, unindo rigor acadêmico e performance técnica.
          </p>
        </motion.div>

      </div>

      {/* EFEITO DE VINHETA (Escurece as bordas para focar no centro) */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_180px_rgba(0,0,0,1)]" />

    </div>
  );
}