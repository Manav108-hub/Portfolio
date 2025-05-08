'use client';
import { useEffect, useState } from 'react';

export default function Projects() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch('/api/github')
      .then(res => res.json())
      .then(data => setRepos(data));
  }, []);

  return (
    <section id="projects" className="px-8 py-16 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {repos.map((repo: any) => (
          <div key={repo.id} className="border p-4 rounded">
            <h3 className="font-bold">{repo.name}</h3>
            <p className="text-sm text-gray-600">{repo.description || 'No description'}</p>
            <a href={repo.html_url} className="text-blue-500 text-sm mt-2 block">
              View on GitHub →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}