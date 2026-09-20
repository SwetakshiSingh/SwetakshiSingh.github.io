import React, { useState, useRef } from 'react';
import { GithubRepo } from '../types';
import { soundFx } from '../utils/audio';
import { GithubIcon } from './Icons';
import { Star, GitFork, ExternalLink, Code2, Sparkles, FolderGit2 } from 'lucide-react';

interface ProjectTiltCardProps {
  repo: GithubRepo;
  onSelect: (repo: GithubRepo) => void;
}

export const ProjectTiltCard: React.FC<ProjectTiltCardProps> = ({ repo, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -8;
    const rotY = ((x - centerX) / centerX) * 8;

    setRotateX(rotX);
    setRotateY(rotY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundFx.hover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        soundFx.click();
        onSelect(repo);
      }}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
      }}
      className="relative group rounded-xl p-[1px] bg-slate-800/80 hover:bg-slate-700/80 shadow-lg cursor-pointer select-none text-left"
    >
      {/* Specular sheen reflection */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 200px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.08), transparent 70%)`,
          }}
        />
      )}

      <div className="relative h-full flex flex-col justify-between rounded-xl bg-slate-900/95 p-5 border border-slate-800/90 overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

        {/* Top Badges */}
        <div className="relative z-10 flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] px-2.5 py-0.5 rounded font-mono font-medium bg-slate-800 text-cyan-300 border border-slate-700">
              {repo.language}
            </span>
            {repo.featured && (
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1 font-mono">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Featured
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-xs font-mono">
            <span className="flex items-center gap-1 text-slate-300">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <GitFork className="w-3.5 h-3.5" />
              {repo.forks_count}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="relative z-10 mb-4">
          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2 font-display">
            <Code2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="truncate">{repo.name}</span>
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed font-sans">
            {repo.description}
          </p>
        </div>

        {/* Architecture Badges */}
        {repo.architecture && (
          <div className="relative z-10 flex flex-wrap gap-1.5 mb-5">
            {repo.architecture.map((tech, i) => (
              <span
                key={i}
                className="text-[11px] px-2 py-0.5 rounded bg-slate-950/60 text-slate-400 border border-slate-800 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="relative z-10 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-200">
            <FolderGit2 className="w-3.5 h-3.5 text-slate-400" />
            Inspect Coursework
          </span>

          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noreferrer"
                aria-label="View Project"
                onClick={() => soundFx.click()}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repository"
              onClick={() => soundFx.click()}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
