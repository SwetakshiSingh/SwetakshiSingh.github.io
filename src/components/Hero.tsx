import React from 'react';
import { GithubUser, GithubRepo, SceneTheme } from '../types';
import { soundFx } from '../utils/audio';
import { GithubIcon } from './Icons';
import { Sparkles, Terminal, Code2, ArrowDown, ExternalLink, GraduationCap, BookOpen, Palette, CheckCircle2, Award } from 'lucide-react';

interface HeroProps {
  user: GithubUser;
  repos: GithubRepo[];
  onOpenPromptStudio: () => void;
  onOpenProfile: () => void;
  currentTheme: SceneTheme;
  onChangeTheme: (theme: SceneTheme) => void;
}

export const Hero: React.FC<HeroProps> = ({
  user,
  repos,
  onOpenPromptStudio,
  onOpenProfile,
  currentTheme,
  onChangeTheme,
}) => {
  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);

  const themes: { id: SceneTheme; label: string; color: string }[] = [
    { id: 'cyber', label: 'Sapphire & Cyan', color: 'bg-cyan-400' },
    { id: 'nebula', label: 'Deep Violet', color: 'bg-purple-500' },
    { id: 'matrix', label: 'Emerald Slate', color: 'bg-emerald-400' },
    { id: 'sunset', label: 'Amber Solar', color: 'bg-amber-400' },
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 pt-28 pb-16 text-center z-10 max-w-5xl mx-auto">
      {/* Institutional Distinction Badge */}
      <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-700/80 text-cyan-300 text-xs font-mono mb-8 backdrop-blur-md shadow-lg shadow-black/40">
        <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
        <span className="font-semibold tracking-wider uppercase text-[11px] sm:text-xs text-slate-200">
          Student of Indian Institute of Technology, Patna
        </span>
      </div>

      {/* Profile Portrait with Subtle Glassmorphic Aura */}
      <div className="relative mb-6 group cursor-pointer" onClick={() => soundFx.hover()}>
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500/30 via-indigo-500/20 to-purple-500/30 opacity-70 blur-xl group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-2xl border border-slate-700/70">
          <img
            src={user.avatar_url}
            alt={user.name}
            className="w-full h-full object-cover rounded-full filter contrast-105 group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Verified Academic Affiliation Tag */}
        <div className="absolute -bottom-2 right-1/2 translate-x-1/2 sm:translate-x-0 sm:right-0 bg-slate-900/95 border border-slate-700/90 rounded-full px-3 py-1 text-[11px] font-mono text-cyan-300 shadow-xl flex items-center gap-1.5 whitespace-nowrap">
          <Award className="w-3.5 h-3.5 text-cyan-400" />
          <span>IIT Patna • CDSA</span>
        </div>
      </div>

      {/* Name and Professional Title */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-display mb-3">
        {user.name}
      </h1>

      {/* Institutional & Course Subtitle */}
      <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-4">
        Undergraduate Student at <strong className="text-white font-semibold">Indian Institute of Technology, Patna</strong>
      </p>

      {/* Course Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs sm:text-sm font-mono mb-8 backdrop-blur-md">
        <BookOpen className="w-4 h-4 text-cyan-400" />
        <span>Enrolled Course: <strong className="text-cyan-300 font-semibold">CDSA</strong> (Core Data Structures & Algorithms)</span>
      </div>

      {/* Clean, Executive "What are your technical skills?" Card */}
      <div className="w-full max-w-xl mx-auto mb-10 p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-2xl backdrop-blur-xl text-left">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <span className="text-xs font-mono font-medium text-slate-400 tracking-wide uppercase">
            Technical Proficiency Inquiry
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
            Current Specialization
          </span>
        </div>

        <p className="text-xs sm:text-sm font-mono text-slate-400 mb-3">
          What are your technical skills?
        </p>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-sm font-mono font-bold text-white tracking-tight">Web Development</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/80 border border-sky-500/30">
            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="text-sm font-mono font-bold text-white tracking-tight">Python</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/80 border border-indigo-500/30">
            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-sm font-mono font-bold text-white tracking-tight">C++</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/80 border border-orange-500/30">
            <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
            <span className="text-sm font-mono font-bold text-white tracking-tight">Java</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3">
          Core syntax, algorithmic routines, object-oriented design, and responsive front-end fundamentals.
        </p>
      </div>

      {/* GitHub Real-time Metrics Strip */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-xs font-mono">
        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center gap-2 backdrop-blur-md"
        >
          <GithubIcon className="w-4 h-4 text-slate-400" />
          <span>@{user.login}</span>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </a>

        <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center gap-2 backdrop-blur-md">
          <span className="text-cyan-400 font-semibold">{user.public_repos}</span>
          <span>Repositories</span>
        </div>

        <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center gap-2 backdrop-blur-md">
          <span className="text-amber-400 font-semibold">★ {totalStars}</span>
          <span>Stars</span>
        </div>

        <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center gap-2 backdrop-blur-md">
          <span className="text-indigo-400 font-semibold">{user.followers}</span>
          <span>Followers</span>
        </div>
      </div>

      {/* Professional Call-to-Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
        {/* View Academic Dossier */}
        <button
          onClick={() => {
            soundFx.click();
            onOpenProfile();
          }}
          className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-semibold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
        >
          <GraduationCap className="w-4 h-4" />
          IIT Patna Academic Dossier
        </button>

        {/* Explore Projects */}
        <a
          href="#projects"
          onClick={() => soundFx.click()}
          className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-700/80 font-mono text-xs transition-all flex items-center gap-2 cursor-pointer hover:scale-102 active:scale-98 backdrop-blur-md"
        >
          <Code2 className="w-4 h-4 text-slate-400" />
          Review Repositories
        </a>

        {/* AI Prompt Studio Button */}
        <button
          onClick={() => {
            soundFx.click();
            onOpenPromptStudio();
          }}
          className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-850 text-indigo-300 hover:text-indigo-200 border border-indigo-500/30 font-mono text-xs transition-all flex items-center gap-2 cursor-pointer hover:scale-102 active:scale-98 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Portfolio Prompt Studio
        </button>

        {/* Launch Dev Terminal */}
        <a
          href="#terminal"
          onClick={() => soundFx.click()}
          className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 font-mono text-xs transition-all flex items-center gap-2 cursor-pointer hover:scale-102 active:scale-98 backdrop-blur-md"
        >
          <Terminal className="w-3.5 h-3.5 text-slate-400" />
          Interactive CLI
        </a>
      </div>

      {/* 3D Theme Switcher HUD */}
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md text-xs font-mono">
        <span className="text-slate-400 pl-2 flex items-center gap-1.5 text-[11px]">
          <Palette className="w-3.5 h-3.5 text-slate-400" />
          Cosmos Palette:
        </span>
        <div className="flex items-center gap-1">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                soundFx.click();
                onChangeTheme(t.id);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer text-[11px] ${
                currentTheme === t.id
                  ? 'bg-slate-800 text-white font-medium border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${t.color}`} />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Down indicator */}
      <div className="mt-12 text-slate-600 animate-bounce">
        <ArrowDown className="w-4 h-4 mx-auto" />
      </div>
    </section>
  );
};
