'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedProject {
  id: string;
  name: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
  coverImage: string;
  video: string;
  tags: string[];
}

// Define your featured live projects here
const featuredProjects: FeaturedProject[] = [
  {
    id: 'portfolio',
    name: 'Portfolio Website',
    description: 'Modern portfolio built with Next.js 15, React 19, Three.js, and Tailwind CSS featuring 3D animations and dark mode.',
    liveUrl: 'https://your-portfolio-url.com',
    githubUrl: 'https://github.com/manav108-hub/Portfolio',
    coverImage: '/projects/portfolio-cover.jpg',
    video: '/projects/portfolio-demo.mp4',
    tags: ['Next.js', 'React', 'Three.js', 'Tailwind'],
  },
  // Add more projects here
  // Example:
  // {
  //   id: 'project2',
  //   name: 'Your Project',
  //   description: 'Description of your project',
  //   liveUrl: 'https://live-url.com',
  //   githubUrl: 'https://github.com/manav108-hub/project',
  //   coverImage: '/projects/project-cover.jpg',
  //   video: '/projects/project-demo.mp4',
  //   tags: ['React', 'Node.js'],
  // },
];

function ProjectCard({ project }: { project: FeaturedProject }) {
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovering) {
        videoRef.current.play().catch(err => console.log('Video play failed:', err));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovering]);

  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Media Container */}
      <div className="relative h-64 overflow-hidden bg-gray-800">
        {/* Cover Image */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
          <Image
            src={project.coverImage}
            alt={project.name}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback to gradient if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
        </div>

        {/* Video on Hover */}
        <video
          ref={videoRef}
          src={project.video}
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          onError={(e) => {
            // Hide video if it fails to load
            const target = e.target as HTMLVideoElement;
            target.style.display = 'none';
          }}
        />

        {/* Live Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-white text-xs font-semibold">LIVE</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {project.name}
        </h3>

        <p className="text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Visit
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 border border-gray-600 hover:border-blue-500 text-gray-300 hover:text-blue-400 font-medium rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const projectsRef = useRef<HTMLDivElement>(null);

  // Animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (projectsRef.current) {
      const elements = projectsRef.current.querySelectorAll<HTMLElement>('.animate-on-scroll');
      elements.forEach((el, index) => {
        el.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700');
        el.style.transitionDelay = `${index * 150}ms`;
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={projectsRef} className="py-20 bg-gray-950">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title animate-on-scroll inline-block">Featured Projects</h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto animate-on-scroll">
            Showcasing live projects built with modern technologies. Hover over each card to see a preview!
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto">
          {featuredProjects.map((project) => (
            <div key={project.id} className="animate-on-scroll">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-16 text-center animate-on-scroll">
          <Link
            href="https://github.com/manav108-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <span>View More Projects on GitHub</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
