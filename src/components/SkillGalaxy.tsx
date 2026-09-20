import React, { useState } from 'react';
import { SKILL_NODES } from '../data/defaultData';
import { SkillNode } from '../types';
import { soundFx } from '../utils/audio';
import { Cpu, Layers, CheckCircle2, GraduationCap } from 'lucide-react';

export const SkillGalaxy: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode>(SKILL_NODES[0]);

  return (
    <section id="skills" className="relative py-20 px-4 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Technical Competency Framework</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          What are your{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            technical skills?
          </span>
        </h2>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-750 text-slate-200 font-mono text-xs sm:text-sm font-semibold shadow-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
            Web Development
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-750 text-slate-200 font-mono text-xs sm:text-sm font-semibold shadow-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
            Python
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-750 text-slate-200 font-mono text-xs sm:text-sm font-semibold shadow-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
            C++
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-750 text-slate-200 font-mono text-xs sm:text-sm font-semibold shadow-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
            Java
          </span>
        </div>
        <p className="mt-3 text-slate-400 max-w-lg mx-auto text-xs sm:text-sm">
          Core foundations developed under Course: CDSA at Indian Institute of Technology, Patna.
        </p>
      </div>

      {/* Main Grid: Orbital Matrix Visualizer + Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Interactive 3D Orbital Competency Radar */}
        <div className="lg:col-span-7 relative h-[440px] rounded-2xl bg-slate-900/90 border border-slate-800 p-6 backdrop-blur-xl flex items-center justify-center overflow-hidden">
          {/* Subtle cyber background grid */}
          <div className="absolute inset-0 cyber-grid opacity-25" />
          
          {/* Orbit Rings */}
          <div className="absolute w-[180px] h-[180px] rounded-full border border-slate-700/60 border-dashed animate-spin" style={{ animationDuration: '45s' }} />
          <div className="absolute w-[280px] h-[280px] rounded-full border border-slate-800 animate-spin" style={{ animationDuration: '70s', animationDirection: 'reverse' }} />
          <div className="absolute w-[380px] h-[380px] rounded-full border border-slate-800/80 border-dashed animate-spin" style={{ animationDuration: '95s' }} />

          {/* Central Core: IIT Patna Emblem Node */}
          <div className="relative z-10 w-24 h-24 rounded-full bg-slate-800 p-[2px] shadow-2xl border border-slate-700 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center text-center p-2">
              <GraduationCap className="w-5 h-5 text-cyan-400 mb-0.5" />
              <span className="text-[10px] font-mono font-bold text-white tracking-wider">IIT PATNA</span>
              <span className="text-[8px] font-mono text-slate-400">CDSA</span>
            </div>
          </div>

          {/* Floating Orbiting Skill Nodes */}
          {SKILL_NODES.map((skill, index) => {
            const total = SKILL_NODES.length;
            const angle = (index / total) * (Math.PI * 2);
            const radius = 120 + (index % 2) * 40;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isSelected = selectedSkill.name === skill.name;

            return (
              <button
                key={skill.name}
                onClick={() => {
                  soundFx.click();
                  setSelectedSkill(skill);
                }}
                onMouseEnter={() => soundFx.hover()}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s',
                }}
                className={`absolute z-20 group flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold scale-105 shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-900 text-slate-300 border border-slate-700/80 hover:border-cyan-400 hover:scale-102'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: skill.color }}
                />
                <span className="text-xs font-mono font-medium whitespace-nowrap">
                  {skill.name}
                </span>
                <span className={`text-[10px] font-mono px-1 rounded ${isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                  {skill.proficiency}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Selected Skill Details HUD */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-7 backdrop-blur-xl shadow-2xl relative overflow-hidden text-left">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                IIT Patna Coursework
              </span>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-slate-400" />
                Foundations
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 font-display flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: selectedSkill.color }}
              />
              {selectedSkill.name}
            </h3>

            {/* Proficiency Meter */}
            <div className="my-5">
              <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                <span>Comprehension & Academic Practice</span>
                <span className="text-cyan-400 font-semibold">{selectedSkill.proficiency}% Proficiency</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-700 ease-out"
                  style={{ width: `${selectedSkill.proficiency}%` }}
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-sans">
              {selectedSkill.details}
            </p>

            {/* Associated Repositories */}
            <div>
              <h4 className="text-[11px] font-mono text-slate-400 mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                Associated Course Repositories
              </h4>
              <div className="space-y-2">
                {selectedSkill.associatedRepos.map((repo) => (
                  <div
                    key={repo}
                    className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300 transition-colors"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{repo}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded shrink-0">
                      Academic
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
