'use client';
import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface Skill {
  name: string;
  color: string;
}

const skills: Skill[] = [
  { name: 'C++', color: '#00599C' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#FFFFFF' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Python', color: '#3776AB' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Kubernetes', color: '#326CE5' },
];

function SkillItem({ skill, index, total, scrollProgress }: {
  skill: Skill;
  index: number;
  total: number;
  scrollProgress: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textRef = useRef<any>(null);

  const angle = (index / total) * Math.PI * 2;
  const radius = 3;

  useFrame((state) => {
    if (!meshRef.current || !textRef.current) return;

    const time = state.clock.getElapsedTime();

    // Base rotation
    const rotationSpeed = 0.5;
    const currentAngle = angle + time * rotationSpeed;

    // Calculate position with scroll-based dispersion
    const dispersionFactor = scrollProgress * 2;
    const currentRadius = radius + dispersionFactor;

    meshRef.current.position.x = Math.cos(currentAngle) * currentRadius;
    meshRef.current.position.y = Math.sin(currentAngle) * currentRadius + Math.sin(time * 2 + index) * 0.3;
    meshRef.current.position.z = Math.sin(currentAngle) * 0.5;

    // Update text position to match sphere
    textRef.current.position.copy(meshRef.current.position);

    // Make text face camera
    textRef.current.quaternion.copy(state.camera.quaternion);

    // Floating animation
    meshRef.current.position.y += Math.sin(time * 2 + index) * 0.1;

    // Scale effect with scroll
    const scale = 1 - scrollProgress * 0.5;
    meshRef.current.scale.set(scale, scale, scale);
    textRef.current.scale.set(scale * 0.8, scale * 0.8, scale * 0.8);
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <Text
        ref={textRef}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {skill.name}
      </Text>
    </>
  );
}

function SkillsRingScene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />

      {skills.map((skill, index) => (
        <SkillItem
          key={skill.name}
          skill={skill}
          index={index}
          total={skills.length}
          scrollProgress={scrollProgress}
        />
      ))}

      {/* Center ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
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
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SkillsRingScene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
