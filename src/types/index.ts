export interface GithubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  location: string;
  company?: string;
  blog?: string;
  twitter_username?: string;
  created_at: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics?: string[];
  updated_at: string;
  pushed_at: string;
  featured?: boolean;
  category?: '3d' | 'fullstack' | 'ai' | 'cloud' | 'all';
  architecture?: string[];
}

export interface SkillNode {
  name: string;
  category: 'Frontend' | '3D & Graphics' | 'Backend & Cloud' | 'AI & Data';
  proficiency: number;
  color: string;
  icon?: string;
  experienceYears: number;
  details: string;
  associatedRepos: string[];
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export type SceneTheme = 'cyber' | 'nebula' | 'matrix' | 'sunset';

export interface PromptConfig {
  aiTarget: 'claude' | 'chatgpt' | 'cursor' | 'general';
  theme: 'cyberpunk' | 'space_hologram' | 'minimalist_3d' | 'synthwave';
  library: 'threejs' | 'r3f' | 'webgl_raw' | 'spline';
  features: {
    githubApi: boolean;
    skyline3d: boolean;
    interactiveParticles: boolean;
    tiltCards: boolean;
    terminal: boolean;
    soundFx: boolean;
    customThemes: boolean;
  };
  complexity: 'starter' | 'professional' | 'god-tier';
}
