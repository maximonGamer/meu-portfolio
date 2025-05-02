'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// 🌍 Planeta
function Planet({ texturePath, size, distance, speed }: {
  texturePath: string;
  size: number;
  distance: number;
  speed: number;
}) {
  const texture = useMemo(() => new TextureLoader().load(texturePath), [texturePath]);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(t) * distance;
      meshRef.current.position.z = Math.sin(t) * distance;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// ☀️ Sol
function Sun() {
  const texture = useTexture('/textures/2k_sun.jpg');
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        emissive={'orange'}
        emissiveIntensity={1.2}
      />
    </mesh>
  );
}

// 🔆 Anel do Sol
function GlowRing() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.001;
    }
  });

  return (
    <mesh ref={meshRef}>
      <ringGeometry args={[1.6, 2.5, 64]} />
      <meshBasicMaterial color="orange" side={THREE.DoubleSide} transparent opacity={0.25} />
    </mesh>
  );
}

// 🌌 Estrelas realistas
function Starfield() {
  const starCount = 6000;
  const positions = useMemo(() => {
    const posArray = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      posArray[i] = THREE.MathUtils.randFloatSpread(400);
    }
    return posArray;
  }, []);

  const sizes = useMemo(() => {
    const sizeArray = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      sizeArray[i] = Math.random() * 1.8 + 0.2;
    }
    return sizeArray;
  }, []);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geom;
  }, [positions, sizes]);

  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.01;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        attach="material"
        args={[{
          uniforms: {
            time: { value: 0 },
          },
          vertexShader: `
            attribute float size;
            varying float vOpacity;
            void main() {
              vOpacity = size;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying float vOpacity;
            void main() {
              float alpha = smoothstep(1.0, 0.0, length(gl_PointCoord - vec2(0.5)));
              gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * vOpacity);
            }
          `,
          transparent: true,
        }]}/>
    </points>
  );
}

// ☄️ Meteoritos com cauda flamejante
function Meteor({ startPosition, speed, scale }: {
  startPosition: [number, number, number],
  speed: number,
  scale: number
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x += speed;
      meshRef.current.position.y -= speed * 0.4;
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.y += 0.01;

      if (meshRef.current.position.x > 50 || meshRef.current.position.y < -50) {
        meshRef.current.position.set(
          THREE.MathUtils.randFloatSpread(100) - 50,
          30 + Math.random() * 10,
          THREE.MathUtils.randFloatSpread(100)
        );
      }
    }
  });

  return (
    <mesh ref={meshRef} position={startPosition}>
      <coneGeometry args={[0.1 * scale, 0.4 * scale, 8]} />
      <meshStandardMaterial color="orange" emissive="red" emissiveIntensity={1.5} />
    </mesh>
  );
}

// 🌟 HeroSection final
export default function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 0]} intensity={3} />

          <Sun />
          <GlowRing />
          <Starfield />

          {/* Meteoritos */}
          {Array.from({ length: 15 }).map((_, i) => (
            <Meteor
              key={i}
              startPosition={[ 
                THREE.MathUtils.randFloatSpread(100),
                Math.random() * 20 + 10,
                THREE.MathUtils.randFloatSpread(100)
              ]}
              speed={Math.random() * 0.1 + 0.05}
              scale={Math.random() * 1.5 + 0.5}
            />
          ))}

          {/* Planetas */}
          <Planet texturePath="/textures/2k_earth_daymap.jpg" size={0.3} distance={4} speed={0.4} />
          <Planet texturePath="/textures/2k_mars.jpg" size={0.25} distance={5.5} speed={0.3} />
          <Planet texturePath="/textures/2k_jupiter.jpg" size={0.6} distance={7} speed={0.2} />
          <Planet texturePath="/textures/2k_venus_surface.jpg" size={0.28} distance={3.5} speed={0.35} />
          <Planet texturePath="/textures/2k_saturn.jpg" size={0.5} distance={8.5} speed={0.15} />
          <Planet texturePath="/textures/2k_uranus.jpg" size={0.4} distance={10} speed={0.12} />
          <Planet texturePath="/textures/2k_neptune.jpg" size={0.38} distance={11.5} speed={0.1} />

          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>

      {/* Textos sobrepostos */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text drop-shadow-xl"
        >
          Criando Experiências Inovadoras em Tecnologia Vision
        </motion.h1>

        <div className="bg-black/50 p-6 rounded-xl max-w-3xl mx-auto">
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 1.2 }}
    className="text-white text-sm sm:text-base drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
  >
    Engenheiro de Software Full Stack com experiência em Web, Mobile e Software.
    Especialista em tecnologias modernas e focado em qualidade e performance.
  </motion.p>
</div>


      </div>
    </div>
  );
}
