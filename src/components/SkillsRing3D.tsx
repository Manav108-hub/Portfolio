'use client';
import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface Skill {
  name: string;
  color: string;
  icon: string;
}

const skills: Skill[] = [
  { name: 'C++', color: '#00599C', icon: '⚡' },
  { name: 'JavaScript', color: '#F7DF1E', icon: 'JS' },
  { name: 'TypeScript', color: '#3178C6', icon: 'TS' },
  { name: 'React', color: '#61DAFB', icon: '⚛️' },
  { name: 'Next.js', color: '#FFFFFF', icon: '▲' },
  { name: 'Node.js', color: '#339933', icon: '◆' },
  { name: 'Python', color: '#3776AB', icon: '🐍' },
  { name: 'AWS', color: '#FF9900', icon: '☁️' },
  { name: 'Docker', color: '#2496ED', icon: '🐳' },
  { name: 'K8s', color: '#326CE5', icon: '☸️' },
];

function SkillOrb({ skill, index, total, scrollProgress }: {
  skill: Skill;
  index: number;
  total: number;
  scrollProgress: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);

  const angle = (index / total) * Math.PI * 2;
  const radius = 3.5;

  useFrame((state) => {
    if (!groupRef.current || !orbRef.current) return;

    const time = state.clock.getElapsedTime();
    const rotationSpeed = 0.3;
    const currentAngle = angle + time * rotationSpeed;

    // Scroll-based expansion
    const dispersionFactor = scrollProgress * 3;
    const currentRadius = radius + dispersionFactor;

    // Position calculation with 3D depth
    const x = Math.cos(currentAngle) * currentRadius;
    const y = Math.sin(currentAngle) * currentRadius;
    const z = Math.sin(currentAngle * 2) * 1.5;

    groupRef.current.position.set(x, y, z);

    // Floating animation
    groupRef.current.position.y += Math.sin(time * 1.5 + index) * 0.2;

    // Rotation for orb
    orbRef.current.rotation.y += 0.01;
    orbRef.current.rotation.x += 0.005;

    // Scale with scroll
    const scale = Math.max(0.5, 1 - scrollProgress * 0.4);
    groupRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={groupRef}>
      {/* Glowing outer sphere */}
      <mesh ref={orbRef}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>

      {/* Icon/Text using HTML */}
      <Html
        center
        distanceFactor={8}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <div
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              textShadow: '0 0 10px rgba(0,0,0,0.8)',
              filter: 'drop-shadow(0 0 8px ' + skill.color + ')',
            }}
          >
            {skill.icon}
          </div>
          <div
            style={{
              fontSize: '12px',
              fontWeight: '600',
              color: 'white',
              background: 'rgba(0,0,0,0.7)',
              padding: '2px 8px',
              borderRadius: '4px',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.2)',
              whiteSpace: 'nowrap',
            }}
          >
            {skill.name}
          </div>
        </div>
      </Html>

      {/* Glow effect */}
      <pointLight
        position={[0, 0, 0]}
        color={skill.color}
        intensity={0.5}
        distance={2}
      />
    </group>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#3b82f6"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

function SkillsRingScene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[0, 10, -10]} intensity={0.6} color="#8b5cf6" />

      <ParticleField />

      {skills.map((skill, index) => (
        <SkillOrb
          key={skill.name}
          skill={skill}
          index={index}
          total={skills.length}
          scrollProgress={scrollProgress}
        />
      ))}

      {/* Animated rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.4}
          transparent
          opacity={0.4}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.2, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export default function SkillsRing3D() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SkillsRingScene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
