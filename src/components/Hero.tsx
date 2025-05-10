'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import profilePic from '../../public/manav_profile.jpg'; // Import your image
import { Download } from 'lucide-react'

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
      <div className="max-w-6xl mx-auto w-full z-10">
        <div className="flex items-center gap-8 mb-6 animate-on-scroll">
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            <Image src={profilePic} alt="Hero Profile Picture" layout="fill" objectFit="cover" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Hi, I&apos;m <span className="gradient-text">Manav Adwani</span>
          </h1>
        </div>

        <p className="mt-6 text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl animate-on-scroll" style={{ animationDelay: '0.2s' }}>
          Cloud & DevOps Engineer specializing in AWS, Kubernetes, and modern web development.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 animate-on-scroll" style={{ animationDelay: '0.4s' }}>
          <Link href="#projects" className="btn-primary">
            View Projects
          </Link>
          <Link href="#contact" className="btn-outline">
            Contact Me
          </Link>
          <Link
            href="https://drive.usercontent.google.com/download?id=1AkF10ym7Ptm2uJGuQ2qropPF-cL6Xt9g&export=download&authuser=0&confirm=t&uuid=3642788a-efef-411e-b7fe-1de5c6d03f4a&at=ALoNOgk37gtl_VYYu9tYwg_zSrjQ:174688632"
            className="btn-outline"
            download="Manav_Adwani_Resume.pdf"
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} // For left alignment
          >
            <Download className="w-5 h-5 mr-2" style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} /> {/* Smaller icon */}
            <span style={{ fontSize: '0.8rem' }}>Download Resume</span> {/* Smaller text */}
          </Link>
        </div>


        <div className="mt-12 flex gap-6 animate-on-scroll" style={{ animationDelay: '0.6s' }}>
          <Link href="https://github.com/manav108-hub" target="_blank" rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </Link>
          <Link href="https://www.linkedin.com/in/manav-adwani-1146a221b/" target="_blank" rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </Link>
          <Link href="mailto:manavadwani86@gmail.com"
            className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </Link>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
    </section>
  );
}