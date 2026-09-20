import React, { useState, useMemo } from 'react';
import { GithubUser, GithubRepo } from '../types';
import { generateMockContributions } from '../data/defaultData';
import { soundFx } from '../utils/audio';
import { GithubIcon } from './Icons';
import { GitCommit, Activity, Star, FolderGit2, Award, RefreshCw, BookOpen } from 'lucide-react';

interface GithubMatrixProps {
  user: GithubUser;
  repos: GithubRepo[];
  onRefresh: (username: string) => void;
  loading: boolean;
}

export const GithubMatrix: React.FC<GithubMatrixProps> = ({ user, repos, onRefresh, loading }) => {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);
  const [inputUsername, setInputUsername] = useState('');

  const contributions = useMemo(() => generateMockContributions(), []);

  // Language breakdown
  const languageStats = useMemo(() => {
    const counts: Record<string, number> = {};
    let total = 0;
    repos.forEach(r => {
      if (r.language) {
        counts[r.language] = (counts[r.language] || 0) + 1;
        total += 1;
      }
    });

    const colors: Record<string, string> = {
      Python: '#38bdf8',
      TypeScript: '#818cf8',
      JavaScript: '#fbbf24',
      HTML: '#f97316',
      CSS: '#06b6d4',
      'C++': '#a78bfa',
      Java: '#fb923c',
    };

    return Object.entries(counts).map(([lang, count]) => ({
      name: lang,
      percentage: Math.round((count / (total || 1)) * 100),
      color: colors[lang] || '#06b6d4',
    }));
  }, [repos]);

  const totalStars = useMemo(() => {
    return repos.reduce((acc, curr) => acc + curr.stargazers_count, 0);
  }, [repos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUsername.trim()) {
      soundFx.click();
      onRefresh(inputUsername.trim());
    }
  };

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-cyan-950/70 border-cyan-800/40 hover:bg-cyan-800';
      case 2:
        return 'bg-cyan-800/80 border-cyan-600/50 hover:bg-cyan-700';
      case 3:
        return 'bg-cyan-600/90 border-cyan-500/70 hover:bg-cyan-500';
      case 4:
        return 'bg-cyan-400 border-cyan-300 hover:bg-cyan-300';
      default:
        return 'bg-slate-900 border-slate-800/60 hover:border-slate-700';
    }
  };

  return (
    <section id="matrix" className="relative py-16 px-4 max-w-6xl mx-auto z-10 text-left">
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Header HUD */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 text-xs font-mono mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>GitHub Telemetry & Activity Skyline</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display flex items-center gap-3">
              Contribution History
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                title="View on GitHub"
              >
                <GithubIcon className="w-4 h-4 text-slate-400 hover:text-cyan-400 transition-colors" />
              </a>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified commit records and coursework development metrics for @{user.login}.
            </p>
          </div>

          {/* Switcher */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-56">
              <input
                type="text"
                placeholder="Query GitHub handle..."
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 rounded-lg px-3 py-1.5 text-xs font-mono text-white placeholder-slate-500 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 border border-slate-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Query</span>
            </button>
          </form>
        </div>

        {/* Stats Row */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3.5 my-6">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
              Repositories
            </span>
            <p className="text-xl font-bold text-white mt-1 font-mono">{user.public_repos}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              Earned Stars
            </span>
            <p className="text-xl font-bold text-white mt-1 font-mono">{totalStars}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              Curriculum
            </span>
            <p className="text-base font-bold text-white mt-1 font-mono">IITP • CDSA</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              Followers
            </span>
            <p className="text-xl font-bold text-white mt-1 font-mono">{user.followers}</p>
          </div>
        </div>

        {/* Heatmap */}
        <div className="relative z-10 my-5 p-5 rounded-xl bg-slate-950/60 border border-slate-800 overflow-x-auto">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-slate-300 flex items-center gap-2">
              <GitCommit className="w-3.5 h-3.5 text-cyan-400" />
              Commit Timeline (6-Month Range)
            </span>

            {hoveredDay ? (
              <span className="text-cyan-400 font-semibold">
                {hoveredDay.count} contributions on {hoveredDay.date}
              </span>
            ) : (
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded bg-slate-900 border border-slate-800" />
                <span className="w-2.5 h-2.5 rounded bg-cyan-950 border border-cyan-800" />
                <span className="w-2.5 h-2.5 rounded bg-cyan-800 border border-cyan-700" />
                <span className="w-2.5 h-2.5 rounded bg-cyan-600 border border-cyan-500" />
                <span className="w-2.5 h-2.5 rounded bg-cyan-400 border border-cyan-300" />
                <span>More</span>
              </div>
            )}
          </div>

          {/* Grid */}
          <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[680px]">
            {contributions.map((c, i) => (
              <div
                key={i}
                onMouseEnter={() => {
                  soundFx.hover();
                  setHoveredDay({ date: c.date, count: c.count });
                }}
                onMouseLeave={() => setHoveredDay(null)}
                className={`w-2.5 h-2.5 rounded-[2px] border transition-all cursor-pointer ${getCellColor(
                  c.level
                )}`}
              />
            ))}
          </div>
        </div>

        {/* Language Breakdown */}
        {languageStats.length > 0 && (
          <div className="relative z-10 pt-4 border-t border-slate-800 text-xs font-mono">
            <span className="text-slate-400 block mb-2">
              Coursework Language Distribution
            </span>
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden flex gap-0.5 border border-slate-800">
              {languageStats.map((item, idx) => (
                <div
                  key={idx}
                  style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  className="h-full"
                  title={`${item.name}: ${item.percentage}%`}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-2.5 text-xs">
              {languageStats.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                  <span className="text-slate-500 font-sans">({item.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
