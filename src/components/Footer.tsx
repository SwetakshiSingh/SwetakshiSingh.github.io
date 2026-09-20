import React from 'react';
import { soundFx } from '../utils/audio';
import { GithubIcon, CubeIcon } from './Icons';
import { GraduationCap, ArrowUp, Sparkles } from 'lucide-react';

interface FooterProps {
  username: string;
  onOpenPromptStudio: () => void;
  onOpenProfile: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  username,
  onOpenPromptStudio,
  onOpenProfile,
}) => {
  const scrollToTop = () => {
    soundFx.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800 bg-slate-950/95 py-10 px-4 mt-16 text-left">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
              <CubeIcon className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-white font-display text-sm">
              Swetakshi Singh
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Student of Indian Institute of Technology, Patna • Course: CDSA
          </p>
        </div>

        {/* Center links */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-mono text-slate-400">
          <button
            onClick={() => {
              soundFx.click();
              onOpenProfile();
            }}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            Academic Dossier
          </button>
          <button
            onClick={() => {
              soundFx.click();
              onOpenPromptStudio();
            }}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Prompt Studio
          </button>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            GitHub Profile
          </a>
        </div>

        {/* Right action */}
        <div>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 cursor-pointer"
            aria-label="Scroll to top"
            title="Return to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-slate-850 text-center text-[11px] font-mono text-slate-500">
        Indian Institute of Technology, Patna • Course: CDSA • Skills: Web Development, Python, C++, Java
      </div>
    </footer>
  );
};
