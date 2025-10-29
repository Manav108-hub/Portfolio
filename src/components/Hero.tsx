'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import profilePic from '../../public/manav_profile.jpg';
import { Download, Github, Linkedin, Mail } from 'lucide-react';
import dynamic from 'next/dynamic';
import TypingAnimation from './TypingAnimation';

const SkillsRing3D = dynamic(() => import('./SkillsRing3D'), { ssr: false });
const AnimatedBackground = dynamic(() => import('./AnimatedBackground'), { ssr: false });

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          observer.unobserve(entry.target);
        }
      });
    });

    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll<HTMLElement>('.animate-on-scroll');
      elements.forEach((el) => {
        el.classList.add('opacity-0', 'transition-all', 'duration-1000');
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen flex flex-col justify-center px-8 hero-bg relative overflow-hidden">
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <div>
          {/* Profile Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8 animate-on-scroll">
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-400/50">
              <Image src={profilePic} alt="Profile" layout="fill" objectFit="cover" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-300">Available for opportunities</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-on-scroll leading-tight">
            Hi, I&apos;m{' '}
            <span className="gradient-text block mt-2">
              <TypingAnimation text="Manav Adwani" speed={120} delay={300} />
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-xl leading-relaxed animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <span className="text-blue-400 font-semibold">Cloud & DevOps Engineer</span> specializing in{' '}
            <span className="text-purple-400">AWS</span>,{' '}
            <span className="text-cyan-400">Kubernetes</span>, and{' '}
            <span className="text-blue-300">modern web development</span>.
          </p>

          {/* Stats */}
          <div className="mt-8 flex gap-6 animate-on-scroll" style={{ animationDelay: '0.3s' }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">3+</div>
              <div className="text-sm text-gray-500">Years Coding</div>
            </div>
            <div className="w-px bg-gray-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">10+</div>
              <div className="text-sm text-gray-500">Projects</div>
            </div>
            <div className="w-px bg-gray-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">5+</div>
              <div className="text-sm text-gray-500">Technologies</div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 animate-on-scroll" style={{ animationDelay: '0.4s' }}>
            <Link href="#projects" className="btn-primary group">
              <span>View Projects</span>
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="#contact" className="btn-outline">
              Contact Me
            </Link>
            <Link
              href="https://drive.google.com/file/d/1a6BhfHaFaRblWNh3DYyuJR20-S8_AucZ/view?usp=drive_link"
              target="_blank"
              className="btn-outline inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Resume
            </Link>
          </div>

          <div className="mt-10 flex gap-4 animate-on-scroll" style={{ animationDelay: '0.5s' }}>
            <Link
              href="https://github.com/manav108-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800 transition-all hover:-translate-y-1"
            >
              <Github className="w-6 h-6 text-gray-400 hover:text-blue-400 transition-colors" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/manav-adwani-1146a221b/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800 transition-all hover:-translate-y-1"
            >
              <Linkedin className="w-6 h-6 text-gray-400 hover:text-blue-400 transition-colors" />
            </Link>
            <Link
              href="mailto:manavadwani86@gmail.com"
              className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800 transition-all hover:-translate-y-1"
            >
              <Mail className="w-6 h-6 text-gray-400 hover:text-blue-400 transition-colors" />
            </Link>
          </div>
        </div>

        {/* 3D Skills Ring */}
        <div className="hidden lg:block h-[700px] animate-on-scroll" style={{ animationDelay: '0.3s' }}>
          <SkillsRing3D />
        </div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-400/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}