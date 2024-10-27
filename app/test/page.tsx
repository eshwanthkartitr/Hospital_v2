'use client';

import { useEffect, useState } from 'react';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  featured: boolean;
  imageUrl?: string;
}

export default function TestPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project._id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{project.title}</h2>
            <p>{project.description}</p>
            <div className="mt-2">
              <strong>Technologies:</strong>{' '}
              {project.technologies.join(', ')}
            </div>
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Project
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
