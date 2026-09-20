import React, { useState, useMemo } from 'react';
import { GithubRepo } from '../types';
import { ProjectTiltCard } from './ProjectTiltCard';
import { RepoDetailModal } from './RepoDetailModal';
import { soundFx } from '../utils/audio';
import { GithubIcon } from './Icons';
import { Layers, Search, BookOpen } from 'lucide-react';

interface ProjectsSectionProps {
  repos: GithubRepo[];
  username: string;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ repos, username }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRepo, setActiveRepo] = useState<GithubRepo | null>(null);

  const categories = [
    { id: 'all', label: 'All Repositories' },
    { id: 'ai', label: 'Python Fundamentals' },
    { id: 'fullstack', label: 'CDSA Coursework' },
    { id: '3d', label: 'Systems & Interactive' },
  ];

  const filteredRepos = useMemo(() => {
    return repos.filter((r) => {
      const matchesCat =
        selectedCategory === 'all' || r.category === selectedCategory;
      const matchesSearch =
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.language.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [repos, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="relative py-20 px-4 max-w-6xl mx-auto z-10 text-left">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic & Open-Source Repositories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Coursework & <span className="text-cyan-400">Repositories</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl">
            Selected projects demonstrating Python foundational problem-solving, CDSA data structures, and algorithmic logic.
          </p>
        </div>

        {/* GitHub direct link */}
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-750 text-xs font-mono text-slate-300 hover:text-white transition-all flex items-center gap-2"
        >
          <GithubIcon className="w-4 h-4 text-slate-400" />
          <span>View on GitHub</span>
        </a>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-800">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundFx.click();
                setSelectedCategory(cat.id);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search coursework or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500/50 rounded-lg pl-8 pr-3 py-1.5 text-xs font-mono text-white placeholder-slate-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Grid of 3D Gyroscopic Tilt Cards */}
      {filteredRepos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {filteredRepos.map((repo) => (
            <ProjectTiltCard
              key={repo.id}
              repo={repo}
              onSelect={(r) => setActiveRepo(r)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 rounded-2xl bg-slate-900 border border-slate-800 p-8">
          <Layers className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <h3 className="text-base font-semibold text-white">No Repositories Match</h3>
          <p className="text-xs text-slate-400 mt-1">Adjust search terms or filter selection.</p>
        </div>
      )}

      {/* Detail Modal */}
      <RepoDetailModal repo={activeRepo} onClose={() => setActiveRepo(null)} />
    </section>
  );
};
