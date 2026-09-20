import React, { useState, useRef, useEffect } from 'react';
import { GithubUser, GithubRepo } from '../types';
import { soundFx } from '../utils/audio';
import { Terminal, CornerDownLeft, Trash2, Maximize2, Minimize2 } from 'lucide-react';

interface InteractiveTerminalProps {
  user: GithubUser;
  repos: GithubRepo[];
  onOpenPromptStudio: () => void;
  onOpenProfile: () => void;
}

interface CommandHistory {
  command: string;
  output: string | React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  user,
  repos,
  onOpenPromptStudio,
  onOpenProfile,
}) => {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1">
          <p className="text-cyan-400 font-semibold">
            Swetakshi Singh [IIT Patna • Course: CDSA Environment Ready]
          </p>
          <p className="text-slate-400">
            Type <span className="text-cyan-300 font-semibold">help</span> to view commands, or click any shortcut below.
          </p>
        </div>
      ),
    },
  ]);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    soundFx.click();

    let output: string | React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        output = (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs py-1">
            <div><span className="text-cyan-400 font-semibold">help</span> - Command directory</div>
            <div><span className="text-cyan-400 font-semibold">bio</span> - Student summary</div>
            <div><span className="text-cyan-400 font-semibold">education</span> - IIT Patna & CDSA info</div>
            <div><span className="text-cyan-400 font-semibold">skills</span> - What are your technical skills?</div>
            <div><span className="text-cyan-400 font-semibold">projects</span> - Course repositories</div>
            <div><span className="text-cyan-400 font-semibold">profile</span> - Open academic dossier</div>
            <div><span className="text-cyan-400 font-semibold">github</span> - GitHub repository URL</div>
            <div><span className="text-cyan-400 font-semibold">prompt</span> - Launch Prompt Studio</div>
            <div><span className="text-cyan-400 font-semibold">clear</span> - Clear terminal window</div>
          </div>
        );
        break;

      case 'bio':
        output = (
          <div className="space-y-1 text-slate-300">
            <p><strong className="text-white">Student:</strong> {user.name} (@{user.login})</p>
            <p><strong className="text-white">Institution:</strong> Indian Institute of Technology, Patna</p>
            <p><strong className="text-white">Course:</strong> CDSA (Core Data Structures & Algorithms)</p>
            <p><strong className="text-white">Technical Skills:</strong> Web Development, Python, C++, Java</p>
          </div>
        );
        break;

      case 'education':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-400 font-semibold">Academic Affiliation:</p>
            <p>• Institution: Indian Institute of Technology, Patna (IIT Patna)</p>
            <p>• Enrolled Course: Course: CDSA (Core Data Structures & Algorithms)</p>
            <p>• Department: Computer Science & Engineering Foundations</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-emerald-400 font-semibold">What are your technical skills?</p>
            <p className="text-cyan-300 font-bold">• Web Development</p>
            <p className="text-cyan-300 font-bold">• Python</p>
            <p className="text-cyan-300 font-bold">• C++</p>
            <p className="text-cyan-300 font-bold">• Java</p>
            <p>• Course: CDSA (Core Data Structures & Algorithms)</p>
            <p>• Git & GitHub Version Control</p>
          </div>
        );
        break;

      case 'profile':
        onOpenProfile();
        output = (
          <div className="space-y-1 text-cyan-300">
            <p className="font-semibold">Displaying IIT Patna Academic Dossier...</p>
            <p className="text-xs text-slate-400">Course: CDSA | Skills: Web Development, Python, C++, Java</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-1.5 text-slate-300">
            <p className="text-cyan-400 font-semibold">Course Repositories:</p>
            {repos.slice(0, 4).map((r) => (
              <div key={r.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1">
                <span className="text-white font-medium">{r.name} ({r.language})</span>
                <span className="text-amber-400">★ {r.stargazers_count}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'prompt':
        onOpenPromptStudio();
        output = (
          <div className="space-y-1 text-cyan-300">
            <p className="font-semibold">Opening AI Portfolio Prompt Studio...</p>
            <p className="text-xs text-slate-400">Configured for Swetakshi Singh, IIT Patna student.</p>
          </div>
        );
        break;

      case 'github':
        output = (
          <div>
            <p className="text-slate-300">GitHub Profile: <a href={user.html_url} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{user.html_url}</a></p>
            <p className="text-xs text-slate-400">Repositories: {user.public_repos} | Followers: {user.followers}</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        output = (
          <p className="text-rose-400">
            Command not recognized: <span className="font-semibold">{cmd}</span>. Type <span className="text-cyan-300 underline cursor-pointer" onClick={() => handleCommand('help')}>help</span> for directory.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput('');
  };

  return (
    <section id="terminal" className="relative py-16 px-4 max-w-5xl mx-auto z-10 text-left">
      <div
        className={`rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl transition-all duration-300 overflow-hidden flex flex-col ${
          isExpanded ? 'h-[580px]' : 'h-[400px]'
        }`}
      >
        {/* Terminal Titlebar */}
        <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>swetakshi@iitp-cdsa:~$</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.click();
                setHistory([]);
              }}
              title="Clear Terminal"
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                soundFx.click();
                setIsExpanded(!isExpanded);
              }}
              title={isExpanded ? 'Minimize' : 'Maximize'}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Console Log Area */}
        <div className="flex-1 p-5 font-mono text-xs overflow-y-auto space-y-3 bg-slate-900">
          {history.map((item, index) => (
            <div key={index} className="space-y-1">
              {item.command !== 'welcome' && (
                <div className="flex items-center gap-2 text-cyan-300">
                  <span className="text-slate-500">❯</span>
                  <span>{item.command}</span>
                </div>
              )}
              <div className="pl-3.5 text-slate-300">{item.output}</div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Quick Command Shortcuts Bar */}
        <div className="px-5 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider shrink-0">
            Commands:
          </span>
          {['help', 'bio', 'education', 'skills', 'projects', 'profile', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-mono transition-colors shrink-0 border border-slate-750 cursor-pointer"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={onSubmit} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-sm pl-2">❯</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'skills', 'education', 'bio'..."
            className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-600"
          />
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors border border-slate-700 cursor-pointer"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </section>
  );
};
