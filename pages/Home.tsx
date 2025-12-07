import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, BrainCircuit, Rocket, Zap, ChevronRight } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; link: string; color: string }> = ({ icon, title, desc, link, color }) => (
  <Link to={link} className="block p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500`}></div>
    <div className={`w-14 h-14 rounded-xl bg-${color}-50 dark:bg-${color}-900/20 flex items-center justify-center text-${color}-600 dark:text-${color}-400 mb-6 group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{desc}</p>
    <div className={`flex items-center text-${color}-600 dark:text-${color}-400 font-bold text-sm tracking-wide uppercase`}>
      Explore <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </div>
  </Link>
);

const Home: React.FC = () => {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-primary-400/20 to-purple-500/20 blur-3xl opacity-50 dark:opacity-30 rounded-full pointer-events-none"></div>
        
        <div className="relative text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            System Operational
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Build Faster.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400">Think Deeper.</span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            The comprehensive developer portfolio and documentation for Python mastery, AI prompt engineering, and rapid hackathon prototyping.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
            <Link to="/guides/hackathon" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <Zap size={20} className="fill-current" />
              Hackathon Quick Start
            </Link>
            <Link to="/projects" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
              View Projects <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Code2 />}
          title="Python Proficiency"
          desc="Scalable backend architectures, clean code practices, and data processing pipelines."
          link="/skills/python"
          color="blue"
        />
        <FeatureCard 
          icon={<BrainCircuit />}
          title="Gemini Toolkit"
          desc="Advanced integration of Google's LLMs for mentorship, debugging, and asset generation."
          link="/ai/gemini"
          color="purple"
        />
        <FeatureCard 
          icon={<Rocket />}
          title="Idea Architecture"
          desc="A structured philosophical framework to transform motivation into concrete execution steps."
          link="/philosophy/structure"
          color="green"
        />
      </section>
      
      {/* Manifesto Section */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 dark:bg-black text-white p-10 sm:p-16 text-center">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Why Documentation Matters</h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            "In the heat of a hackathon or the complexity of a enterprise build, your past self is your best teammate. 
            This site serves as a living repository of knowledge, patterns, and solved problems."
          </p>
          <div className="flex justify-center gap-8 text-slate-400 font-mono text-sm">
             <span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Document</span>
             <span className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Iterate</span>
             <span className="flex items-center gap-2"><div className="w-2 h-2 bg-purple-500 rounded-full"></div> Deploy</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;