import { GithubUser, GithubRepo, SkillNode, ContributionDay } from '../types';

export const DEFAULT_USER: GithubUser = {
  login: 'SwetakshiSingh',
  name: 'Swetakshi Singh',
  bio: 'Computer Science Undergraduate at Indian Institute of Technology, Patna (IIT Patna). Actively undertaking Course: CDSA (Core Data Structures & Algorithms) with hands-on experience in Web Development, Python, C++, and Java.',
  avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  html_url: 'https://github.com/SwetakshiSingh',
  public_repos: 14,
  public_gists: 4,
  followers: 48,
  following: 26,
  location: 'Patna, Bihar, India',
  company: 'Indian Institute of Technology, Patna',
  blog: 'https://github.com/SwetakshiSingh',
  twitter_username: 'SwetakshiSingh',
  created_at: '2023-01-15T00:00:00Z',
};

export const DEFAULT_REPOSITORIES: GithubRepo[] = [
  {
    id: 101,
    name: 'python-core-fundamentals',
    description: 'Structured computational problem-solving and algorithmic foundations implemented in Python: control flow, modular functions, string manipulations, and data structures.',
    html_url: 'https://github.com/SwetakshiSingh/python-core-fundamentals',
    homepage: 'https://github.com/SwetakshiSingh',
    stargazers_count: 28,
    forks_count: 6,
    language: 'Python',
    topics: ['python', 'algorithms', 'problem-solving', 'iit-patna'],
    updated_at: '2025-02-18T14:32:00Z',
    pushed_at: '2025-02-18T14:32:00Z',
    featured: true,
    category: 'ai',
    architecture: ['Python 3.12', 'Clean Architecture', 'Unit Testing']
  },
  {
    id: 102,
    name: 'cdsa-data-structures-suite',
    description: 'Coursework implementations for CDSA (Core Data Structures & Algorithms) at IIT Patna: linked structures, search algorithms, sorting analysis, and asymptotic complexity.',
    html_url: 'https://github.com/SwetakshiSingh/cdsa-data-structures-suite',
    homepage: 'https://github.com/SwetakshiSingh',
    stargazers_count: 34,
    forks_count: 9,
    language: 'Python',
    topics: ['cdsa', 'data-structures', 'algorithms', 'python', 'iit-patna'],
    updated_at: '2025-02-14T09:12:00Z',
    pushed_at: '2025-02-14T09:12:00Z',
    featured: true,
    category: 'fullstack',
    architecture: ['Python', 'Time & Space Analysis', 'Algorithm Design']
  },
  {
    id: 103,
    name: 'algorithmic-problem-vault',
    description: 'A curated repository of competitive programming challenges, mathematical modeling scripts, and algorithmic edge-case evaluations.',
    html_url: 'https://github.com/SwetakshiSingh/algorithmic-problem-vault',
    homepage: 'https://github.com/SwetakshiSingh',
    stargazers_count: 21,
    forks_count: 4,
    language: 'Python',
    topics: ['competitive-programming', 'mathematics', 'python-basics', 'leetcode'],
    updated_at: '2025-02-10T11:45:00Z',
    pushed_at: '2025-02-10T11:45:00Z',
    featured: true,
    category: '3d',
    architecture: ['Python Standard Library', 'Data Modeling', 'Optimization']
  },
  {
    id: 104,
    name: 'interactive-3d-academic-portfolio',
    description: 'High-performance interactive WebGL and Three.js academic showcase engineered with strict TypeScript typing, responsive physics, and live telemetry.',
    html_url: 'https://github.com/SwetakshiSingh/interactive-3d-academic-portfolio',
    homepage: 'https://github.com/SwetakshiSingh',
    stargazers_count: 42,
    forks_count: 12,
    language: 'TypeScript',
    topics: ['threejs', 'webgl', 'portfolio', 'iit-patna'],
    updated_at: '2025-02-20T18:00:00Z',
    pushed_at: '2025-02-20T18:00:00Z',
    featured: true,
    category: '3d',
    architecture: ['React 19', 'Three.js', 'Tailwind CSS', 'Vite']
  },
  {
    id: 105,
    name: 'web-dev-practice-lab',
    description: 'Responsive front-end web development exercises covering semantic HTML5, modern CSS3 layouts (Flexbox & Grid), and interactive JavaScript components.',
    html_url: 'https://github.com/SwetakshiSingh/web-dev-practice-lab',
    homepage: 'https://github.com/SwetakshiSingh',
    stargazers_count: 19,
    forks_count: 5,
    language: 'JavaScript',
    topics: ['web-development', 'html5', 'css3', 'javascript'],
    updated_at: '2025-02-08T10:00:00Z',
    pushed_at: '2025-02-08T10:00:00Z',
    featured: true,
    category: 'fullstack',
    architecture: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Responsive Design']
  },
  {
    id: 106,
    name: 'cpp-dsa-practice',
    description: 'C++ implementations of core data structures and algorithms including linked lists, stacks, queues, trees, and sorting/searching techniques for CDSA coursework.',
    html_url: 'https://github.com/SwetakshiSingh/cpp-dsa-practice',
    homepage: 'https://github.com/SwetakshiSingh',
    stargazers_count: 23,
    forks_count: 7,
    language: 'C++',
    topics: ['cpp', 'data-structures', 'algorithms', 'cdsa'],
    updated_at: '2025-02-05T12:00:00Z',
    pushed_at: '2025-02-05T12:00:00Z',
    featured: true,
    category: 'fullstack',
    architecture: ['C++17', 'STL', 'Object-Oriented Design']
  },
  {
    id: 107,
    name: 'java-oop-fundamentals',
    description: 'Java-based object-oriented programming exercises covering classes, inheritance, interfaces, exception handling, and the collections framework.',
    html_url: 'https://github.com/SwetakshiSingh/java-oop-fundamentals',
    homepage: 'https://github.com/SwetakshiSingh',
    stargazers_count: 16,
    forks_count: 3,
    language: 'Java',
    topics: ['java', 'oop', 'programming-fundamentals'],
    updated_at: '2025-01-30T09:30:00Z',
    pushed_at: '2025-01-30T09:30:00Z',
    featured: false,
    category: 'ai',
    architecture: ['Java 17', 'OOP Principles', 'Collections Framework']
  }
];

export const SKILL_NODES: SkillNode[] = [
  {
    name: 'Web Development',
    category: 'Frontend',
    proficiency: 72,
    color: '#f472b6',
    experienceYears: 1,
    details: 'Building responsive interfaces with HTML5, CSS3, and JavaScript fundamentals; understanding of DOM manipulation, semantic markup, and modern component-based frameworks like React.',
    associatedRepos: ['interactive-3d-academic-portfolio', 'web-dev-practice-lab']
  },
  {
    name: 'Python',
    category: 'AI & Data',
    proficiency: 78,
    color: '#38bdf8',
    experienceYears: 1,
    details: 'Syntax fundamentals, control flow branching, iteration patterns, procedural function definitions, list/dict manipulation, and basic file operations.',
    associatedRepos: ['python-core-fundamentals', 'cdsa-data-structures-suite', 'algorithmic-problem-vault']
  },
  {
    name: 'C++',
    category: 'Backend & Cloud',
    proficiency: 70,
    color: '#818cf8',
    experienceYears: 1,
    details: 'Object-oriented programming principles, pointers and memory management, STL containers, and implementation of core data structures & algorithms for CDSA coursework.',
    associatedRepos: ['cdsa-data-structures-suite', 'cpp-dsa-practice']
  },
  {
    name: 'Java',
    category: 'Backend & Cloud',
    proficiency: 68,
    color: '#fb923c',
    experienceYears: 1,
    details: 'Core object-oriented concepts (classes, inheritance, polymorphism), exception handling, collections framework, and basic application development.',
    associatedRepos: ['java-oop-fundamentals']
  },
  {
    name: 'Course: CDSA',
    category: '3D & Graphics',
    proficiency: 74,
    color: '#06b6d4',
    experienceYears: 1,
    details: 'Core Data Structures & Algorithms curriculum at IIT Patna covering linear arrays, linked representations, recursion dynamics, searching, and sorting complexities.',
    associatedRepos: ['cdsa-data-structures-suite', 'algorithmic-problem-vault']
  },
  {
    name: 'Git & Version Control',
    category: '3D & Graphics',
    proficiency: 80,
    color: '#34d399',
    experienceYears: 1,
    details: 'Repository management, branching strategies, commit cleanliness, and standard GitHub open-source collaboration workflows.',
    associatedRepos: ['interactive-3d-academic-portfolio', 'python-core-fundamentals']
  }
];

export const generateMockContributions = (): ContributionDay[] => {
  const contributions: ContributionDay[] = [];
  const today = new Date();
  
  for (let i = 180; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseProb = isWeekend ? 0.35 : 0.75;
    
    let count = 0;
    if (Math.random() < baseProb) {
      count = Math.floor(Math.random() * 6) + 1;
    }
    
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 0 && count <= 2) level = 1;
    else if (count > 2 && count <= 4) level = 2;
    else if (count > 4 && count <= 7) level = 3;
    else if (count > 7) level = 4;

    contributions.push({
      date: d.toISOString().split('T')[0],
      count,
      level
    });
  }
  return contributions;
};

export const MASTER_PROMPTS = {
  comprehensive: `Act as a Senior Creative Technologist and WebGL Graphics Engineer.
Design and develop an elegant, highly professional 3D portfolio website for Swetakshi Singh, student of Indian Institute of Technology, Patna (IIT Patna) pursuing Course: CDSA.

### ACADEMIC & TECHNICAL SPECIFICATIONS:
- Developer / Student: Swetakshi Singh
- Academic Institution: Student of Indian Institute of Technology, Patna (IIT Patna)
- Enrolled Curriculum: Course: CDSA (Core Data Structures & Algorithms)
- Technical Skills: Web Development, Python, C++, Java
- GitHub Profile: https://github.com/SwetakshiSingh

### AESTHETIC & ARCHITECTURAL GUIDELINES:
1. Executive Modern Aesthetics:
   - Deep slate and midnight black background palette (#030712 / #0b0f19) with refined sapphire, cyan, and indigo ambient lighting.
   - Elegant, clean typography pairing (Plus Jakarta Sans for readable editorial copy, Space Grotesk for architectural headers, Fira Code for technical metrics).
   - Subtle, refined 3D background with hardware-accelerated Three.js WebGL rendering (smoothly rotating wireframe polyhedra, crystal core, and responsive cosmic particle field).
2. Institutional Prominence:
   - Prominently feature the academic credential: "Student of Indian Institute of Technology, Patna".
   - Highlight the enrolled course: "Course: CDSA".
   - Feature the technical skills prompt and answer: "What are your technical skills? Web Development, Python, C++, Java".
3. Interactive Features:
   - 3D gyroscopic tilt perspective on project cards with specular reflections.
   - Interactive 3D orbital competency matrix with clickable nodes.
   - GitHub contribution telemetry skyline.
   - Developer terminal emulator with academic commands ('bio', 'education', 'skills', 'projects', 'profile').
   - IIT Patna Student Profile Modal without any email or contact form.
4. Production Quality:
   - 60+ FPS rendering performance, responsive across mobile, tablet, and widescreen desktops, strict TypeScript types, zero build errors.`,

  claude: `Build an executive-grade, professional 3D portfolio website for Swetakshi Singh.
Institution: Indian Institute of Technology, Patna (IIT Patna)
Course: Course CDSA (Core Data Structures & Algorithms)
Technical Skills: Web Development, Python, C++, Java
GitHub: https://github.com/SwetakshiSingh
Design: Sophisticated dark mode, Three.js 3D WebGL background, gyroscopic tilt project cards, interactive skills orbit, and interactive student profile modal. Ensure clean, elegant typography and professional tone without email or contact forms.`,

  cursor: `Create a professional 3D portfolio for GitHub user SwetakshiSingh.
Details:
- Student of Indian Institute of Technology, Patna
- Course: CDSA
- Technical Skills: Web Development, Python, C++, Java
Requirements:
- Three.js WebGL canvas background with responsive particle dust and polyhedra.
- Distinct academic header featuring IIT Patna and Course: CDSA.
- Technical skills showcase box highlighting Web Development, Python, C++, and Java.
- Gyroscopic 3D cards for coursework repositories.
- Professional academic modal instead of contact forms.`
};
