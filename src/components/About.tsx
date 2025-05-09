'use client';
import { useEffect, useRef } from 'react';

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);

  const education = [
    {
      degree: "BTech in Computer Science (Cloud Computing)",
      school: "University of Petroleum and Energy Studies",
      year: "2022 – 2026",
      description: "Focusing on cloud technologies, distributed systems, and modern software development practices."
    }
  ];

  const skills = [
    { name: "AWS Cloud", level: 90 },
    { name: "Docker", level: 85 },
    { name: "Kubernetes", level: 80 },
    { name: "React", level: 85 },
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Next.js", level: 80 },
    { name: "Node.js", level: 75 }
  ];

  useEffect(() => {
    if (!aboutRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = aboutRef.current.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => {
      el.classList.add('opacity-0', 'transition-all', 'duration-1000');
      observer.observe(el);
    });

    const skillBars = aboutRef.current.querySelectorAll<HTMLElement>('.skill-bar-fill');
    skillBars.forEach((bar) => {
      bar.style.width = '0%';
    });

    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const width = target.getAttribute('data-width');

          setTimeout(() => {
            if (width) target.style.width = `${width}%`;
          }, 100 * Array.from(skillBars).indexOf(target));

          skillObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach((bar) => {
      skillObserver.observe(bar);
    });

    return () => {
      observer.disconnect();
      skillObserver.disconnect();
    };
  }, []);

  return (
    <section id="about" ref={aboutRef} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="section-container">
        <h2 className="section-title animate-on-scroll">About Me</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="animate-on-scroll">
            <p className="text-lg mb-6 leading-relaxed">
              I&apos;m a final-year BTech student specializing in Cloud Computing with a passion for building scalable and resilient systems.
              My expertise lies in AWS, containerization, and modern web development frameworks.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              I enjoy solving complex problems and building systems that can scale efficiently.
              With hands-on experience in cloud services and DevOps practices, I&apos;m prepared to tackle
              the challenges of modern infrastructure and application development.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Education</h3>
            {education.map((edu, i) => (
              <div key={i} className="mb-6 card p-5">
                <p className="font-bold text-lg">{edu.degree}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{edu.school} • {edu.year}</p>
                <p className="text-gray-700 dark:text-gray-300">{edu.description}</p>
              </div>
            ))}
          </div>

          <div className="animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-semibold mb-4">Skills</h3>

            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="skill-bar-fill bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                      data-width={skill.level}
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-4">Technologies I Work With</h3>
            <div className="flex flex-wrap gap-2">
              {["AWS", "EC2", "S3", "Lambda", "Docker", "Kubernetes", "CI/CD", "React", "Next.js", "Node.js", "TypeScript", "Git"].map((tech) => (
                <span key={tech} className="skill-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}