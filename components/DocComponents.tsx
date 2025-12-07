import React from 'react';
import { Terminal, Info, AlertTriangle } from 'lucide-react';

export const PageHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-10 border-b border-slate-200 dark:border-slate-700 pb-8">
    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
      {title}
    </h1>
    {subtitle && <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">{subtitle}</p>}
  </div>
);

export const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center group">
      {title}
      <span className="hidden group-hover:inline ml-2 text-slate-400 text-sm opacity-50">#</span>
    </h2>
    <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
      {children}
    </div>
  </div>
);

export const CodeBlock: React.FC<{ code: string; language?: string; title?: string }> = ({ code, language = 'python', title }) => (
  <div className="my-6 rounded-xl overflow-hidden bg-slate-900 shadow-xl border border-slate-800 group transition-all hover:border-slate-700">
    {(title || language) && (
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/50 border-b border-slate-800 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 group-hover:bg-red-500 transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500 transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 group-hover:bg-green-500 transition-colors"></div>
          </div>
          <span className="text-xs font-mono text-slate-400 ml-2">{title || 'Terminal'}</span>
        </div>
        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-slate-800 px-2 py-0.5 rounded">{language}</span>
      </div>
    )}
    <div className="p-5 overflow-x-auto custom-scrollbar">
      <pre className="font-mono text-sm leading-relaxed">
        <code className="text-slate-300">{code}</code>
      </pre>
    </div>
  </div>
);

export const Callout: React.FC<{ type?: 'info' | 'warning'; title: string; children: React.ReactNode }> = ({ type = 'info', title, children }) => {
  const styles = type === 'info' 
    ? 'bg-blue-50/50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800' 
    : 'bg-amber-50/50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-800';
  
  const Icon = type === 'info' ? Info : AlertTriangle;
  const iconColor = type === 'info' ? 'text-blue-500' : 'text-amber-500';

  return (
    <div className={`p-5 rounded-xl border my-6 ${styles} transition-all hover:shadow-sm`}>
      <div className="flex items-center mb-2">
        <Icon className={`w-5 h-5 mr-3 ${iconColor}`} />
        <span className="font-bold text-slate-900 dark:text-slate-100">{title}</span>
      </div>
      <div className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed ml-8">
        {children}
      </div>
    </div>
  );
};