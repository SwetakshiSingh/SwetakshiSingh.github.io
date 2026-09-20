import React from 'react';
import { soundFx } from '../utils/audio';
import { GithubIcon } from './Icons';
import { X, GraduationCap, BookOpen, Code2, Award, MapPin, CheckCircle2, FileText } from 'lucide-react';

interface AcademicProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

export const AcademicProfileModal: React.FC<AcademicProfileModalProps> = ({ isOpen, onClose, username }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 text-left">
        {/* Subtle executive top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-cyan-500" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">Academic Dossier</h3>
              <p className="text-xs text-slate-400 font-mono">Indian Institute of Technology, Patna</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.click();
              onClose();
            }}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Info */}
        <div className="mt-6 space-y-4">
          {/* Institution Card */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Academic Institution</span>
            </div>
            <h4 className="text-base font-bold text-white font-display">
              Indian Institute of Technology, Patna
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Institute of National Importance established by the Government of India, recognized for research and engineering excellence.
            </p>
          </div>

          {/* Enrolled Course */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 text-[11px] font-mono text-indigo-400 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>Enrolled Curriculum</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/60">
                Core Requirement
              </span>
            </div>
            <h4 className="text-base font-bold text-white font-display flex items-center gap-2">
              Course: CDSA
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Core Data Structures & Algorithms coursework emphasizing computational problem-solving, asymptotic runtime evaluation, recursive techniques, and memory management.
            </p>
          </div>

          {/* Technical Skills Highlight */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>What are your technical skills?</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-white font-mono">Web Development</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">HTML5, CSS3, JavaScript, and responsive design.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-white font-mono">Python</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Core syntax, control flow, functions, and data structures.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-white font-mono">C++</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">OOP, pointers, STL, and algorithm implementation.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-white font-mono">Java</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">OOP concepts, exception handling, and collections.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Academic Attributes */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2.5">
              <Award className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="text-slate-500 block text-[10px]">CAMPUS STATUS</span>
                <span className="text-slate-200 font-semibold">Active Student</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <span className="text-slate-500 block text-[10px]">DISCIPLINE</span>
                <span className="text-slate-200 font-semibold">Computer Science</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Profile Links */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">GitHub Identity:</span>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>github.com/{username}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
