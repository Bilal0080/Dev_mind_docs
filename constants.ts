import { LucideIcon, Code2, BrainCircuit, Lightbulb, Home, Github, FolderGit2, Zap, Terminal, Laptop, Server } from 'lucide-react';

export const NAV_ITEMS = [
  {
    title: 'Getting Started',
    path: '/',
    iconName: 'Home'
  },
  {
    title: 'Guides',
    path: '/guides',
    children: [
      { title: 'Hackathon Setup', path: '/guides/hackathon', iconName: 'Zap' },
      { title: 'WSL & Linux', path: '/guides/wsl', iconName: 'Laptop' },
      { title: 'AI Tools & Specs', path: '/guides/tools', iconName: 'Terminal' },
      { title: 'MCP Servers', path: '/guides/mcp', iconName: 'Server' },
    ]
  },
  {
    title: 'Portfolio',
    path: '/portfolio',
    children: [
      { title: 'Projects', path: '/projects', iconName: 'FolderGit2' },
    ]
  },
  {
    title: 'Core Skills',
    path: '/skills',
    children: [
      { title: 'Python Proficiency', path: '/skills/python', iconName: 'Code2' },
      { title: 'GitHub & DevOps', path: '/skills/github', iconName: 'Github' },
    ]
  },
  {
    title: 'Advanced AI',
    path: '/ai',
    children: [
      { title: 'Gemini Toolkit', path: '/ai/gemini', iconName: 'BrainCircuit' },
    ]
  },
  {
    title: 'Philosophy',
    path: '/philosophy',
    children: [
      { title: 'Motivational Structure', path: '/philosophy/structure', iconName: 'Lightbulb' },
    ]
  }
];

export const PYTHON_CODE_SAMPLE = `def motivational_algorithm(idea, passion):
    """
    Calculates the potential impact of an idea.
    """
    if passion < 0.5:
        return "Refine your 'Why' first."
    
    momentum = 0
    steps = break_down(idea)
    
    for step in steps:
        momentum += execute(step) * passion
        
    return f"Success Probability: {momentum}%"
`;