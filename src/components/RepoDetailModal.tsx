import React, { useState } from 'react';
import { GithubRepo } from '../types';
import { soundFx } from '../utils/audio';
import { GithubIcon } from './Icons';
import { X, ExternalLink, Star, GitFork, Copy, Check, Terminal, Sparkles, Layers } from 'lucide-react';

interface RepoDetailModalProps {
  repo: GithubRepo | null;
  onClose: () => void;
}

export const RepoDetailModal: React.FC<RepoDetailModalProps> = ({ repo, onClose }) => {
  const [copiedClone, setCopiedClone] = useState(false);

  if (!repo) return null;

  const cloneCommand = `git clone ${repo.html_url}.git`;

  const handleCopyClone = () => {
    navigator.clipboard.writeText(cloneCommand);
    soundFx.success();
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 rounded-3xl bg-gray-950/95 border border-cyan-500/30 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 border-b border-white/10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-mono">
                {repo.language}
              </span>
              {repo.featured && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 font-mono flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  Featured System
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-white font-display flex items-center gap-2">
              {repo.name}
            </h3>
          </div>

          <button
            onClick={() => {
              soundFx.click();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Description */}
          <div>
            <h4 className="text-xs font-mono text-gray-400 mb-1 uppercase tracking-wider">Overview</h4>
            <p className="text-sm text-gray-200 leading-relaxed font-sans">
              {repo.description}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
              <Star className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-[10px] text-gray-400 block font-mono">Stars</span>
                <span className="text-sm font-bold text-white font-mono">{repo.stargazers_count}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
              <GitFork className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="text-[10px] text-gray-400 block font-mono">Forks</span>
                <span className="text-sm font-bold text-white font-mono">{repo.forks_count}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
              <Layers className="w-4 h-4 text-purple-400" />
              <div>
                <span className="text-[10px] text-gray-400 block font-mono">Status</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">Production</span>
              </div>
            </div>
          </div>

          {/* Architecture & Stack */}
          {repo.architecture && (
            <div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                System Architecture
              </h4>
              <div className="flex flex-wrap gap-2">
                {repo.architecture.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-mono"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Terminal Clone Command Snippet */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                Clone & Run Locally
              </h4>
              <button
                onClick={handleCopyClone}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                {copiedClone ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedClone ? 'Copied' : 'Copy command'}
              </button>
            </div>
            <div className="p-3 rounded-xl bg-black/90 border border-white/10 font-mono text-xs text-gray-300 flex items-center justify-between">
              <code>{cloneCommand}</code>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-gray-950 border-t border-white/10 flex items-center justify-end gap-3">
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.click()}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white transition-colors border border-white/15 text-xs font-mono flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFx.click()}
            className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-bold font-mono text-xs hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 flex items-center gap-2"
          >
            <GithubIcon className="w-4 h-4" />
            Open on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};
