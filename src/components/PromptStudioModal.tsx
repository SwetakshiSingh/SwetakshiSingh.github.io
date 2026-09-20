import React, { useState } from 'react';
import { PromptConfig } from '../types';
import { MASTER_PROMPTS } from '../data/defaultData';
import { soundFx } from '../utils/audio';
import { Copy, Check, Download, Sparkles, Terminal, X, Code, Sliders, ExternalLink, Cpu, GraduationCap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PromptStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

export const PromptStudioModal: React.FC<PromptStudioModalProps> = ({ isOpen, onClose, username }) => {
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState<PromptConfig>({
    aiTarget: 'claude',
    theme: 'space_hologram',
    library: 'threejs',
    features: {
      githubApi: true,
      skyline3d: true,
      interactiveParticles: true,
      tiltCards: true,
      terminal: true,
      soundFx: true,
      customThemes: true,
    },
    complexity: 'professional',
  });

  const [activeTab, setActiveTab] = useState<'master' | 'generator' | 'guide'>('master');

  if (!isOpen) return null;

  const generateDynamicPrompt = (): string => {
    const aiEngine = 
      config.aiTarget === 'claude' ? 'Claude 3.7 Sonnet / Opus' :
      config.aiTarget === 'chatgpt' ? 'ChatGPT-4o / OpenAI o3' :
      config.aiTarget === 'cursor' ? 'Cursor AI Composer / Windsurf' : 'Senior Creative Technologist LLM';

    const themeDesc =
      config.theme === 'cyberpunk' ? 'Executive dark slate aesthetic with refined cyan and sapphire ambient glow' :
      config.theme === 'space_hologram' ? 'Sophisticated midnight cosmos with subtle particle field and frosted glassmorphism' :
      config.theme === 'minimalist_3d' ? 'Ultra-clean Swiss academic 3D aesthetic with monochromatic slate glass and subtle depth' :
      'Retro synthwave dark horizon with chromatic gradients and wireframe structures';

    const libDesc =
      config.library === 'threejs' ? 'Three.js directly inside React with requestAnimationFrame loop, custom geometries, point lights, and particle buffers' :
      config.library === 'r3f' ? '@react-three/fiber and @react-three/drei with Canvas, OrbitControls, and Float animations' :
      config.library === 'spline' ? 'Spline 3D embedded interactive scenes combined with React overlays' :
      'Raw WebGL shaders with GLSL vertex and fragment shaders';

    return `SYSTEM PROMPT & ARCHITECTURAL BRIEF:
Target AI: ${aiEngine}
Project: Professional 3D Portfolio Website for "${username}" (https://github.com/${username})
Aesthetic Level: Executive Professional Grade (${config.complexity.toUpperCase()})

ACADEMIC & TECHNICAL SPECIFICATIONS:
- Developer Name: Swetakshi Singh
- Academic Affiliation: Student of Indian Institute of Technology, Patna (IIT Patna)
- Enrolled Curriculum: Course: CDSA (Core Data Structures & Algorithms)
- Technical Competencies: Web Development, Python, C++, Java
- GitHub Profile: https://github.com/${username}

ROLE:
Act as a Principal Creative Technologist, Senior WebGL Graphics Engineer, and Enterprise React/TypeScript Architect.

OBJECTIVE:
Build a highly professional, responsive 3D portfolio website tailored for Swetakshi Singh, student of Indian Institute of Technology, Patna pursuing Course: CDSA with technical skills in Web Development, Python, C++, and Java.

VISUAL & ART DIRECTION:
- Aesthetics: ${themeDesc}
- 3D Rendering Pipeline: ${libDesc}
- Typography: Clean typography pairing (Space Grotesk for headers, Plus Jakarta Sans for body, Fira Code for technical metrics)
- Design Language: Modern dark slate glassmorphism, refined borders, and seamless responsive transitions.
- Note: Do NOT include any email address or contact form. Instead, include an Academic Dossier modal for IIT Patna.

KEY MODULES:
1. Hero Header: Distinct institutional credential ("Student of Indian Institute of Technology, Patna"), course designation ("Course: CDSA"), and technical skills prompt ("What are your technical skills? Web Development, Python, C++, Java").
2. 3D Gyroscopic Tilt Cards: Repositories highlighting Web Development, Python, C++, Java, and CDSA coursework.
3. Interactive 3D Skill Orbital Radar: Visualizing Web Development, Python, C++, Java, and CDSA competencies.
4. Interactive Terminal CLI: Academic commands ('bio', 'education', 'skills', 'projects', 'profile').
5. IIT Patna Academic Dossier Modal: Detailed overview of academic track and verified student identity.

Generate the complete, robust, ready-to-deploy React application codebase.`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    soundFx.success();
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#06b6d4', '#6366f1', '#38bdf8'],
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (text: string) => {
    soundFx.click();
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Professional-3D-Portfolio-Prompt-${username}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentPrompt = activeTab === 'master' ? MASTER_PROMPTS.comprehensive : generateDynamicPrompt();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto text-left">
      <div className="relative w-full max-w-4xl my-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="relative p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-750 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
                AI Portfolio Prompt Studio
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  @{username}
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                IIT Patna • Course: CDSA • Web Dev, Python, C++, Java
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.click();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.click();
                setActiveTab('master');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'master'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-755'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Master Prompt
            </button>
            <button
              onClick={() => {
                soundFx.click();
                setActiveTab('generator');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'generator'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Prompt Generator
            </button>
            <button
              onClick={() => {
                soundFx.click();
                setActiveTab('guide');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'guide'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Architecture Guide
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(currentPrompt)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={() => handleDownload(currentPrompt)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Download Markdown"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Status Bar */}
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-3 text-xs font-mono">
            <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-300">
              <span><strong>Institution:</strong> Indian Institute of Technology, Patna</span>
              <span><strong>Course:</strong> CDSA</span>
              <span className="text-cyan-300"><strong>Skills:</strong> Web Dev, Python, C++, Java</span>
            </div>
          </div>

          {activeTab === 'generator' && (
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-4">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5" />
                Prompt Parameters
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <label className="text-slate-400 block mb-1">Target Model</label>
                  <select
                    value={config.aiTarget}
                    onChange={(e) => setConfig({ ...config, aiTarget: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-slate-700"
                  >
                    <option value="claude">Claude 3.7 Sonnet</option>
                    <option value="chatgpt">ChatGPT-4o</option>
                    <option value="cursor">Cursor AI</option>
                    <option value="general">Universal Format</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Visual Palette</label>
                  <select
                    value={config.theme}
                    onChange={(e) => setConfig({ ...config, theme: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-slate-700"
                  >
                    <option value="space_hologram">Executive Midnight</option>
                    <option value="cyberpunk">Sapphire Slate</option>
                    <option value="minimalist_3d">Monochrome Academic</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">WebGL Framework</label>
                  <select
                    value={config.library}
                    onChange={(e) => setConfig({ ...config, library: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-slate-700"
                  >
                    <option value="threejs">Three.js (Pure WebGL)</option>
                    <option value="r3f">React Three Fiber</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'guide' ? (
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-sans">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <h4 className="font-bold text-white mb-2 font-display flex items-center gap-2 text-base">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Professional Prompt Engineering Notes
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  To ensure generative models craft an authentic academic portfolio without generic filler:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs text-slate-400">
                  <li><strong className="text-slate-200">Explicit Academic Context:</strong> Maintain verified affiliation with Indian Institute of Technology, Patna and Course: CDSA.</li>
                  <li><strong className="text-slate-200">Focused Skill Scope:</strong> Accurately reflect foundational skills with <code className="text-cyan-300 font-mono">Web Development, Python, C++, Java</code> rather than overinflated lists.</li>
                  <li><strong className="text-slate-200">Zero Contact Form Policy:</strong> Explicitly instruct the model to avoid contact forms or email inputs, presenting an Academic Dossier modal instead.</li>
                  <li><strong className="text-slate-200">Executive Aesthetics:</strong> Enforce sophisticated slate palettes over harsh neon saturated hues for a refined look.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-cyan-400" />
                  Prompt Output
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {currentPrompt.length} characters
                </span>
              </div>

              <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap select-all max-h-[360px] scrollbar-thin">
                {currentPrompt}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Swetakshi Singh (IIT Patna • CDSA)</span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://chat.openai.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => handleCopy(currentPrompt)}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              Open ChatGPT <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={() => handleCopy(currentPrompt)}
              className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied Prompt' : 'Copy Master Prompt'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
