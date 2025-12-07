import React, { useState } from 'react';
import { PageHeader, Section, Callout } from '../components/DocComponents';
import { generateIdeaStructure, GeminiError } from '../services/geminiService';
import { IdeaStructureResponse } from '../types';
import { Lightbulb, Target, TrendingUp, ArrowRightCircle, AlertTriangle } from 'lucide-react';

const MotivationalPage: React.FC = () => {
  const [ideaInput, setIdeaInput] = useState('');
  const [structure, setStructure] = useState<IdeaStructureResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStructureIdea = async () => {
    if (!ideaInput.trim()) return;
    setIsProcessing(true);
    setError(null);
    try {
      const result = await generateIdeaStructure(ideaInput);
      setStructure(result);
    } catch (e: any) {
      if (e instanceof GeminiError) {
        setError(e.message);
      } else {
        setError("Failed to generate structure. Please check your connection.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <PageHeader 
        title="Motivational Background Structure" 
        subtitle="Transforming raw thoughts into actionable, inspired plans." 
      />

      <Section title="The Philosophy">
        <p className="mb-4">
          Ideas are cheap; execution is expensive. My "Motivational Background Structure" is a mental framework designed to 
          bridge the gap between a fleeting thought and a concrete project.
        </p>
        <div className="grid md:grid-cols-3 gap-4 my-8">
            <div className="p-4 bg-blue-50 dark:bg-slate-800 rounded-lg border border-blue-100 dark:border-slate-700">
                <Target className="w-8 h-8 text-blue-500 mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white">Vision</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">What does the finished product look like?</p>
            </div>
             <div className="p-4 bg-purple-50 dark:bg-slate-800 rounded-lg border border-purple-100 dark:border-slate-700">
                <Lightbulb className="w-8 h-8 text-purple-500 mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white">Why?</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">The core emotional driver behind the work.</p>
            </div>
             <div className="p-4 bg-green-50 dark:bg-slate-800 rounded-lg border border-green-100 dark:border-slate-700">
                <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white">Steps</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Atomic, executable actions to gain momentum.</p>
            </div>
        </div>
      </Section>

      <Section title="Idea Architect Tool">
        <Callout title="Try it out" type="info">
            Enter a rough idea below (e.g., "A website for tracking water intake") and let Gemini apply the structure.
        </Callout>

        <div className="mt-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Raw Idea</label>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    className="flex-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="e.g. Learn Rust in 30 days..."
                    value={ideaInput}
                    onChange={(e) => setIdeaInput(e.target.value)}
                />
                <button 
                    onClick={handleStructureIdea}
                    disabled={isProcessing || !ideaInput}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50 transition-colors"
                >
                    {isProcessing ? 'Structuring...' : 'Build Structure'}
                </button>
            </div>
        </div>

        {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm rounded-lg border border-red-200 dark:border-red-800 flex items-center gap-2">
                <AlertTriangle size={16} />
                {error}
            </div>
        )}

        {structure && (
            <div className="mt-8 space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-xl shadow-xl">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-primary-400 mb-2">The Vision</h3>
                    <p className="text-2xl font-serif italic">"{structure.vision}"</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <h3 className="flex items-center text-lg font-bold text-purple-600 dark:text-purple-400 mb-4">
                            <Lightbulb className="w-5 h-5 mr-2" />
                            Motivation
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300">
                            {structure.motivation}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <h3 className="flex items-center text-lg font-bold text-green-600 dark:text-green-400 mb-4">
                            <TrendingUp className="w-5 h-5 mr-2" />
                            Execution Plan
                        </h3>
                        <ul className="space-y-3">
                            {structure.steps.map((step, i) => (
                                <li key={i} className="flex items-start">
                                    <ArrowRightCircle className="w-5 h-5 text-slate-400 mr-2 mt-0.5 shrink-0" />
                                    <span className="text-slate-700 dark:text-slate-300 text-sm">{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )}
      </Section>
    </div>
  );
};

export default MotivationalPage;