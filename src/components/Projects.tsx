'use client';
import { useState, useEffect, useRef } from 'react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Fetch GitHub repositories
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/github');

        if (!res.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const data: GitHubRepo[] = await res.json();
        setRepos(data);
      } catch (err: unknown) { // Use unknown as a safer default
        let errorMessage = 'Something went wrong';
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        console.error('Error fetching repositories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // Animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (projectsRef.current) {
      const elements = projectsRef.current.querySelectorAll<HTMLElement>('.animate-on-scroll');
      elements.forEach((el, index) => {
        el.classList.add('opacity-0', 'transition-all', 'duration-700');
        el.style.transitionDelay = `${index * 100}ms`;
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, [repos]);

  // Placeholder repos in case of error or while loading
  const placeholderRepos: GitHubRepo[] = loading
    ? Array(4).fill({
        id: 0,
        name: '',
        description: '',
        html_url: '#',
      })
    : [];

  const displayRepos = repos.length > 0 ? repos : placeholderRepos;

  return (
    <section id="projects" ref={projectsRef} className="py-20 bg-white dark:bg-gray-950">
      <div className="section-container">
        <h2 className="section-title animate-on-scroll">Projects</h2>

        {error && (
          <div className="mb-8 p-4 bg-red-100 text-red-700 rounded-lg">
            Error loading projects: {error}. Check the API route at <code>/api/github</code>.
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayRepos.map((repo, index) => (
            <div
              key={repo.id + index}
              className={`project-card animate-on-scroll ${loading ? 'animate-pulse' : ''}`}
            >
              <div className="flex items-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600 mr-2"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <h3 className="font-bold text-lg">
                  {loading ? (
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                  ) : (
                    repo.name
                  )}
                </h3>
              </div>

              {loading ? (
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              ) : (
                <p className="text-gray-600 dark:text-gray-300 mb-4 h-16 overflow-hidden">
                  {repo.description || 'No description available'}
                </p>
              )}

              {loading ? (
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
              ) : (
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
                >
                  View on GitHub
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1 transform group-hover:translate-x-1 transition-transform"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-on-scroll">
          <a
            href="https://github.com/yourusername "
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}