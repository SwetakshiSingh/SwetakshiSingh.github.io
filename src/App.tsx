import { useState, useEffect } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillGalaxy } from './components/SkillGalaxy';
import { GithubMatrix } from './components/GithubMatrix';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { PromptStudioModal } from './components/PromptStudioModal';
import { AcademicProfileModal } from './components/AcademicProfileModal';
import { Footer } from './components/Footer';
import { fetchGithubProfile, fetchGithubRepos } from './services/githubApi';
import { DEFAULT_USER, DEFAULT_REPOSITORIES } from './data/defaultData';
import { GithubUser, GithubRepo, SceneTheme } from './types';
import { soundFx } from './utils/audio';
import { Sparkles, GraduationCap } from 'lucide-react';

export function App() {
  const [username, setUsername] = useState('SwetakshiSingh');
  const [user, setUser] = useState<GithubUser>(DEFAULT_USER);
  const [repos, setRepos] = useState<GithubRepo[]>(DEFAULT_REPOSITORIES);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<SceneTheme>('cyber');
  const [promptStudioOpen, setPromptStudioOpen] = useState(false);
  const [academicProfileOpen, setAcademicProfileOpen] = useState(false);

  // Load user data on mount or when username changes
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setLoading(true);
      try {
        const [userData, repoData] = await Promise.all([
          fetchGithubProfile(username),
          fetchGithubRepos(username),
        ]);
        if (isMounted) {
          setUser(userData);
          setRepos(repoData);
        }
      } catch (err) {
        console.error('Error loading GitHub data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, [username]);

  const handleRefresh = (newUsername: string) => {
    setUsername(newUsername);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 antialiased">
      {/* Three.js Canvas Engine */}
      <ThreeCanvas theme={theme} />

      {/* Subtle overlays */}
      <div className="fixed inset-0 cyber-grid opacity-15 pointer-events-none z-0" />

      {/* Floating Action Controls */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2 items-end">
        {/* IIT Patna Dossier Floating Trigger */}
        <button
          onClick={() => {
            soundFx.click();
            setAcademicProfileOpen(true);
          }}
          className="group relative px-3.5 py-2 rounded-xl bg-slate-900/95 text-slate-200 font-mono text-xs shadow-xl shadow-black/50 hover:text-white transition-all flex items-center gap-2 cursor-pointer border border-slate-700 backdrop-blur-md"
        >
          <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
          <span>IIT Patna Dossier</span>
        </button>

        {/* AI Prompt Studio Floating Trigger */}
        <button
          onClick={() => {
            soundFx.click();
            setPromptStudioOpen(true);
          }}
          className="group relative px-3.5 py-2 rounded-xl bg-indigo-950/90 text-indigo-200 font-mono text-xs shadow-xl shadow-black/50 hover:text-white transition-all flex items-center gap-2 cursor-pointer border border-indigo-700/60 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Prompt Studio</span>
        </button>
      </div>

      {/* Navbar */}
      <Navbar
        username={username}
        onOpenPromptStudio={() => setPromptStudioOpen(true)}
        onOpenProfile={() => setAcademicProfileOpen(true)}
      />

      {/* Main Sections */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          user={user}
          repos={repos}
          onOpenPromptStudio={() => setPromptStudioOpen(true)}
          onOpenProfile={() => setAcademicProfileOpen(true)}
          currentTheme={theme}
          onChangeTheme={setTheme}
        />

        {/* Repositories & Coursework */}
        <ProjectsSection repos={repos} username={username} />

        {/* Technical Skills Competency Framework */}
        <SkillGalaxy />

        {/* GitHub Skyline & Activity */}
        <GithubMatrix
          user={user}
          repos={repos}
          onRefresh={handleRefresh}
          loading={loading}
        />

        {/* Interactive CLI Terminal */}
        <InteractiveTerminal
          user={user}
          repos={repos}
          onOpenPromptStudio={() => setPromptStudioOpen(true)}
          onOpenProfile={() => setAcademicProfileOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        username={username}
        onOpenPromptStudio={() => setPromptStudioOpen(true)}
        onOpenProfile={() => setAcademicProfileOpen(true)}
      />

      {/* Prompt Studio Modal */}
      <PromptStudioModal
        isOpen={promptStudioOpen}
        onClose={() => setPromptStudioOpen(false)}
        username={username}
      />

      {/* Academic Profile Dossier Modal */}
      <AcademicProfileModal
        isOpen={academicProfileOpen}
        onClose={() => setAcademicProfileOpen(false)}
        username={username}
      />
    </div>
  );
}

export default App;
