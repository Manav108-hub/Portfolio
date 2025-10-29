'use client';
import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Skill {
  name: string;
  color: string;
  icon: string;
  bgColor: string;
}

const skills: Skill[] = [
  { name: 'C++', color: '#00599C', icon: '⚡', bgColor: 'rgba(0, 89, 156, 0.2)' },
  { name: 'JavaScript', color: '#F7DF1E', icon: 'JS', bgColor: 'rgba(247, 223, 30, 0.2)' },
  { name: 'TypeScript', color: '#3178C6', icon: 'TS', bgColor: 'rgba(49, 120, 198, 0.2)' },
  { name: 'React', color: '#61DAFB', icon: '⚛️', bgColor: 'rgba(97, 218, 251, 0.2)' },
  { name: 'Next.js', color: '#FFFFFF', icon: '▲', bgColor: 'rgba(255, 255, 255, 0.2)' },
  { name: 'Node.js', color: '#339933', icon: '◆', bgColor: 'rgba(51, 153, 51, 0.2)' },
  { name: 'Python', color: '#3776AB', icon: '🐍', bgColor: 'rgba(55, 118, 171, 0.2)' },
  { name: 'AWS', color: '#FF9900', icon: '☁️', bgColor: 'rgba(255, 153, 0, 0.2)' },
  { name: 'Docker', color: '#2496ED', icon: '🐳', bgColor: 'rgba(36, 150, 237, 0.2)' },
  { name: 'K8s', color: '#326CE5', icon: '☸️', bgColor: 'rgba(50, 108, 229, 0.2)' },
];

function SkillCard({ skill, index, total }: {
  skill: Skill;
  index: number;
  total: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const angle = (index / total) * Math.PI * 2;
  const radius = 4;

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    const speed = 0.2;
    const currentAngle = angle + time * speed;

    // Circular path
    const x = Math.cos(currentAngle) * radius;
    const z = Math.sin(currentAngle) * radius;
    const y = Math.sin(time * 0.5 + index) * 0.5;

    groupRef.current.position.set(x, y, z);

    // Rotate to face center
    groupRef.current.lookAt(0, y, 0);

    // Scale on hover
    const targetScale = hovered ? 1.3 : 1;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Glowing backdrop */}
        <mesh position={[0, 0, -0.1]}>
          <circleGeometry args={[0.8, 32]} />
          <meshBasicMaterial
            color={skill.color}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Icon Card */}
        <Html
          center
          distanceFactor={6}
          transform
          occlude
          style={{
            pointerEvents: 'auto',
            userSelect: 'none',
            cursor: 'pointer',
          }}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <div
            style={{
              width: '140px',
              height: '140px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              background: `linear-gradient(135deg, ${skill.bgColor}, rgba(0,0,0,0.8))`,
              backdropFilter: 'blur(20px)',
              border: `2px solid ${skill.color}`,
              borderRadius: '24px',
              padding: '16px',
              boxShadow: `0 0 40px ${skill.color}80, 0 0 80px ${skill.color}40`,
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.3s ease',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                textShadow: `0 0 20px ${skill.color}`,
                filter: `drop-shadow(0 0 10px ${skill.color})`,
                lineHeight: 1,
              }}
            >
              {skill.icon}
            </div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: '700',
                color: skill.color,
                textAlign: 'center',
                textShadow: `0 0 10px ${skill.color}`,
                letterSpacing: '0.5px',
                fontFamily: 'var(--font-display)',
              }}
            >
              {skill.name}
            </div>
          </div>
        </Html>

        {/* Point light */}
        <pointLight
          position={[0, 0, 0.5]}
          color={skill.color}
          intensity={hovered ? 2 : 1}
          distance={3}
        />
      </Float>
    </group>
  );
}

function OrbitingRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[4, 0.05, 16, 100]} />
      <meshStandardMaterial
        color="#3b82f6"
        emissive="#3b82f6"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

      <OrbitingRing />

      {skills.map((skill, index) => (
        <SkillCard
          key={skill.name}
          skill={skill}
          index={index}
          total={skills.length}
        />
      ))}
    </>
  );
}

export default function SkillsRing3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
