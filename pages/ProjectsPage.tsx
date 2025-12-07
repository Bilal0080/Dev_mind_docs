import React, { useState } from 'react';
import { PageHeader, Section, Callout } from '../components/DocComponents';
import { generateProjectDescription, GeminiError } from '../services/geminiService';
import { Project } from '../types';
import { Github, ExternalLink, Wand2, Plus, FolderGit2, Code2, Layers, AlertCircle } from 'lucide-react';

const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'DevMind Portfolio',
    description: 'A React-based documentation portfolio built with Docusaurus styling, Tailwind CSS, and Google Gemini API integration for real-time AI features.',
    techStack: ['React', 'TypeScript', 'Gemini API', 'Tailwind'],
    link: 'https://github.com/yourusername/devmind'
  },
  {
    id: '2',
    title: 'Python Auto-Scaler',
    description: 'An intelligent background service that monitors server load and dynamically adjusts resource allocation using AWS Lambda and Boto3.',
    techStack: ['Python', 'AWS', 'Docker'],
    link: 'https://github.com/yourusername/auto-scaler'
  }
];

const TechBadge: React.FC<{ text: string }> = ({ text }) => (
  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors hover:border-primary-300 dark:hover:border-primary-700">
    <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
    {text}
  </span>
);

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  
  // New Project Form State
  const [newTitle, setNewTitle] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newLink, setNewLink] = useState('');
  const [generatedDesc, setGeneratedDesc] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateDescription = async () => {
    if (!newTitle || !newNotes) return;
    setIsGenerating(true);
    setError(null);
    try {
      const desc = await generateProjectDescription(newTitle, newNotes);
      setGeneratedDesc(desc);
    } catch (e: any) {
      if (e instanceof GeminiError) {
        setError(e.message);
      } else {
        setError("AI generation failed.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddProject = () => {
    if (!newTitle || !generatedDesc) return;
    
    const newProject: Project = {
      id: Date.now().toString(),
      title: newTitle,
      description: generatedDesc,
      techStack: ['Python', 'React'], // Default for demo
      link: newLink || '#'
    };
    
    setProjects([newProject, ...projects]);
    
    // Reset form
    setNewTitle('');
    setNewNotes('');
    setNewLink('');
    setGeneratedDesc('');
  };

  return (
    <div>
      <PageHeader 
        title="Project Portfolio" 
        subtitle="A collection of open-source contributions and personal experiments." 
      />

      <Section title="Featured Work">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project) => (
            <div key={project.id} className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:border-primary-500/30 transition-all duration-300">
              
              {/* Header */}
              <div className="p-6 pb-2 flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-blue-50 dark:from-slate-800 dark:to-slate-800 flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:scale-105 transition-transform duration-300 border border-slate-100 dark:border-slate-700">
                   <FolderGit2 size={24} />
                </div>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
              
              {/* Body */}
              <div className="px-6 py-2 flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack & Footer */}
              <div className="p-6 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-800/20">
                 <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <Layers size={14} />
                    <span>Tech Stack</span>
                 </div>
                 <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <TechBadge key={tech} text={tech} />
                  ))}
                </div>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <Github size={16} className="mr-2" />
                  View Source Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Add Project with AI">
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-100/50 to-transparent dark:from-purple-900/20 dark:to-transparent rounded-bl-full pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/50">
                <Wand2 size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Description Generator</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Paste your rough notes or repo readme content, and Gemini will write the pitch.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Project Name</label>
                  <input 
                    type="text" 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-purple-500 outline-none text-slate-900 dark:text-white transition-all shadow-sm"
                    placeholder="e.g. Weather Bot"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">GitHub Link (Optional)</label>
                  <input 
                    type="text" 
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-purple-500 outline-none text-slate-900 dark:text-white transition-all shadow-sm"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Raw Notes / Description</label>
                  <textarea 
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-purple-500 outline-none text-slate-900 dark:text-white h-32 resize-none transition-all shadow-sm"
                    placeholder="It's a python script that scrapes weather data and sends SMS alerts..."
                  />
                </div>
                <button 
                  onClick={handleGenerateDescription}
                  disabled={isGenerating || !newTitle || !newNotes}
                  className="w-full py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/25 flex justify-center items-center gap-2"
                >
                  {isGenerating ? 'Generating...' : <><Wand2 size={18} /> Generate Professional Description</>}
                </button>
                {error && (
                   <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                      <AlertCircle size={16} />
                      {error}
                   </div>
                )}
              </div>

              <div className="flex flex-col h-full">
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Result Preview</label>
                <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col shadow-sm">
                  {generatedDesc ? (
                    <div className="animate-in fade-in duration-500">
                        <div className="flex items-center gap-2 mb-4 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            AI Generated
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">"{generatedDesc}"</p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center p-4 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-lg">
                       <Code2 size={32} className="mb-2 opacity-20" />
                       <p className="text-sm">Generated content will appear here</p>
                    </div>
                  )}
                  
                  <button 
                    onClick={handleAddProject}
                    disabled={!generatedDesc}
                    className="mt-6 w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex justify-center items-center gap-2"
                  >
                    <Plus size={18} /> Add to Portfolio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ProjectsPage;