import { GithubUser, GithubRepo } from '../types';
import { DEFAULT_USER, DEFAULT_REPOSITORIES } from '../data/defaultData';

export async function fetchGithubProfile(username: string): Promise<GithubUser> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      return {
        login: data.login || username,
        name: data.name || username,
        bio: data.bio || DEFAULT_USER.bio,
        avatar_url: data.avatar_url || DEFAULT_USER.avatar_url,
        html_url: data.html_url || `https://github.com/${username}`,
        public_repos: data.public_repos ?? DEFAULT_USER.public_repos,
        public_gists: data.public_gists ?? DEFAULT_USER.public_gists,
        followers: data.followers ?? DEFAULT_USER.followers,
        following: data.following ?? DEFAULT_USER.following,
        location: data.location || DEFAULT_USER.location,
        company: data.company || DEFAULT_USER.company,
        blog: data.blog || DEFAULT_USER.blog,
        twitter_username: data.twitter_username || DEFAULT_USER.twitter_username,
        created_at: data.created_at || DEFAULT_USER.created_at,
      };
    } else {
      console.warn(`GitHub API returned status ${res.status}. Using default profile.`);
      return {
        ...DEFAULT_USER,
        login: username,
        name: username === 'SwetakshiSingh' ? 'Swetakshi Singh' : username,
      };
    }
  } catch (err) {
    console.error('Failed to fetch GitHub profile:', err);
    return DEFAULT_USER;
  }
}

export async function fetchGithubRepos(username: string): Promise<GithubRepo[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item: any, idx: number) => ({
          id: item.id || idx + 1,
          name: item.name,
          description: item.description || 'Modern open-source development project.',
          html_url: item.html_url,
          homepage: item.homepage || undefined,
          stargazers_count: item.stargazers_count || 0,
          forks_count: item.forks_count || 0,
          language: item.language || 'TypeScript',
          topics: item.topics || ['open-source', 'github'],
          updated_at: item.updated_at || new Date().toISOString(),
          pushed_at: item.pushed_at || new Date().toISOString(),
          featured: idx < 3,
          category: idx % 3 === 0 ? '3d' : idx % 3 === 1 ? 'ai' : 'fullstack',
          architecture: [item.language || 'TypeScript', 'GitHub CI', 'Tailwind', 'REST API']
        }));
      }
    }
    return DEFAULT_REPOSITORIES;
  } catch (err) {
    console.error('Failed to fetch GitHub repos:', err);
    return DEFAULT_REPOSITORIES;
  }
}
