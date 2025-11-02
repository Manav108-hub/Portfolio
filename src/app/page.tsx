'use client';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import dynamic from 'next/dynamic';

const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), { ssr: false });

export default function Home() {
  return (
    <div className="relative bg-gray-950 min-h-screen">
      {/* Global Animated Background */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Hero />

        {/* Seamless Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

        <About />

        {/* Seamless Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>

        <Projects />

        {/* Seamless Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>

        <Contact />
      </div>
    </div>
  );
}