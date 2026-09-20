import React, { useState, useEffect } from 'react';
import { soundFx } from '../utils/audio';
import { GithubIcon, CubeIcon } from './Icons';
import { Sparkles, Volume2, VolumeX, Menu, X, GraduationCap } from 'lucide-react';

interface NavbarProps {
  username: string;
  onOpenPromptStudio: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  username,
  onOpenPromptStudio,
  onOpenProfile,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    soundFx.enabled = next;
    setSoundEnabled(next);
    if (next) soundFx.click();
  };

  const navLinks = [
    { label: 'Repositories', href: '#projects' },
    { label: 'Technical Skills', href: '#skills' },
    { label: 'Skyline Activity', href: '#matrix' },
    { label: 'CLI Terminal', href: '#terminal' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 flex justify-center pointer-events-none">
      <nav
        className={`pointer-events-auto w-full max-w-5xl transition-all duration-300 rounded-xl px-4 py-2.5 flex items-center justify-between backdrop-blur-xl border ${
          scrolled
            ? 'bg-slate-900/90 border-slate-700/80 shadow-2xl'
            : 'bg-slate-900/70 border-slate-800'
        }`}
      >
        {/* Brand */}
        <a
          href="#"
          onClick={() => soundFx.click()}
          className="flex items-center gap-2.5 text-white hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
            <CubeIcon className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-xs tracking-tight font-display text-slate-100">
              Swetakshi Singh
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              IIT Patna • CDSA
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => soundFx.hover()}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* IIT Patna Academic Dossier Button */}
          <button
            onClick={() => {
              soundFx.click();
              onOpenProfile();
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-400 font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">IIT Patna</span>
          </button>

          {/* Audio FX toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
            className={`p-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1 border cursor-pointer ${
              soundEnabled
                ? 'bg-slate-800 text-cyan-400 border-cyan-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* AI Prompt Studio Button */}
          <button
            onClick={() => {
              soundFx.click();
              onOpenPromptStudio();
            }}
            className="px-2.5 py-1 rounded-lg bg-indigo-950/70 border border-indigo-800/80 hover:bg-indigo-900/80 text-indigo-300 font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span className="hidden sm:inline">Prompt</span>
          </button>

          {/* GitHub Icon Link */}
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            onClick={() => soundFx.click()}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => {
              soundFx.click();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed top-16 left-4 right-4 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col gap-3 text-xs font-mono z-50 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                soundFx.click();
                setMobileMenuOpen(false);
              }}
              className="text-slate-300 hover:text-cyan-400 py-1.5 border-b border-slate-800"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              soundFx.click();
              setMobileMenuOpen(false);
              onOpenProfile();
            }}
            className="w-full py-2 rounded-lg bg-slate-800 text-white font-medium text-xs flex items-center justify-center gap-2 border border-slate-700"
          >
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            IIT Patna & Course CDSA Details
          </button>
          <button
            onClick={() => {
              soundFx.click();
              setMobileMenuOpen(false);
              onOpenPromptStudio();
            }}
            className="w-full py-2 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            AI Prompt Studio
          </button>
        </div>
      )}
    </header>
  );
};
