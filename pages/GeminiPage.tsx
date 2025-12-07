import React, { useState, useRef, useEffect } from 'react';
import { PageHeader, Section, CodeBlock } from '../components/DocComponents';
import { chatWithMentor, debugCode, generateImage, performWebSearch, GeminiError } from '../services/geminiService';
import { Sparkles, MessageSquare, Bug, Image as ImageIcon, Download, Globe, ExternalLink, Search, AlertOctagon, XCircle, ArrowUpRight } from 'lucide-react';
import { SearchResult } from '../types';

const COMMON_SEARCH_QUERIES = [
  "React 19 new features",
  "Python 3.12 release notes",
  "Gemini API pricing",
  "Tailwind CSS cheat sheet",
  "TypeScript utility types",
  "Best VS Code extensions",
  "Vercel deployment guide",
  "Next.js vs Remix",
  "FastAPI tutorial",
  "Docker commands list",
  "Git commands cheat sheet",
  "Kubernetes basics",
  "Gemini 1.5 Pro capabilities",
  "Latest AI trends 2025"
];

const ErrorAlert: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2 shadow-sm" role="alert">
    <AlertOctagon className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
    <div className="flex-1">
      <h3 className="text-sm font-bold text-red-800 dark:text-red-300">Operation Failed</h3>
      <p className="text-sm text-red-700 dark:text-red-400 mt-1 leading-relaxed">{message}</p>
    </div>
    <button 
      onClick={onClose} 
      className="text-red-500 hover:text-red-700 dark:hover:text-red-300 transition-colors p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full"
      aria-label="Dismiss error"
    >
      <XCircle size={20} />
    </button>
  </div>
);

const GeminiPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mentor' | 'debugger' | 'image' | 'search'>('mentor');
  const [globalError, setGlobalError] = useState<string | null>(null);
  
  // Mentor State
  const [prompt, setPrompt] = useState('');
  const [mentorResponse, setMentorResponse] = useState('');
  const [mentorLoading, setMentorLoading] = useState(false);

  // Debugger State
  const [codeSnippet, setCodeSnippet] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [debugResponse, setDebugResponse] = useState('');
  const [debugLoading, setDebugLoading] = useState(false);

  // Image Gen State
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [imageLoading, setImageLoading] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleError = (context: string, e: any) => {
    // Log detailed error for debugging
    console.error(`[GeminiPage] Error in ${context}:`, e);
    
    if (e instanceof GeminiError) {
      setGlobalError(e.message);
    } else {
      setGlobalError(`An unexpected error occurred during ${context}. Please check the console or try again later.`);
    }
  };

  const handleAskMentor = async () => {
    if (!prompt.trim()) return;
    setMentorLoading(true);
    setMentorResponse('');
    setGlobalError(null);
    try {
      const reply = await chatWithMentor(prompt);
      setMentorResponse(reply);
    } catch (e) {
      handleError('Mentor Chat', e);
    } finally {
      setMentorLoading(false);
    }
  };

  const handleDebug = async () => {
    if (!codeSnippet.trim() || !errorMessage.trim()) return;
    setDebugLoading(true);
    setDebugResponse('');
    setGlobalError(null);
    try {
      const reply = await debugCode(codeSnippet, errorMessage);
      setDebugResponse(reply);
    } catch (e) {
      handleError('Code Debugging', e);
    } finally {
      setDebugLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    setImageLoading(true);
    setGeneratedImage('');
    setGlobalError(null);
    try {
      const result = await generateImage(imagePrompt);
      if (result) setGeneratedImage(result);
    } catch (e) {
      handleError('Image Generation', e);
    } finally {
      setImageLoading(false);
    }
  };

  const handleSearch = async (queryOverride?: string) => {
    const query = queryOverride || searchQuery;
    if (!query.trim()) return;
    
    setSearchLoading(true);
    setSearchResult(null);
    setGlobalError(null);
    setShowSuggestions(false); // Close suggestions on search
    
    try {
      const result = await performWebSearch(query);
      setSearchResult(result);
    } catch (e) {
      handleError('Web Search', e);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      const filtered = COMMON_SEARCH_QUERIES.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    // Optionally focus back on input or trigger search immediately?
    // Let's just fill the input to let the user review before searching
  };

  return (
    <div>
      <PageHeader 
        title="Gemini AI Toolkit" 
        subtitle="Harnessing LLMs for mentorship, debugging, creative assets, and web intelligence." 
      />

      {globalError && <ErrorAlert message={globalError} onClose={() => setGlobalError(null)} />}

      <div className="flex border-b border-slate-200 dark:border-slate-700 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('mentor')}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'mentor' 
              ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <MessageSquare size={18} />
          Tech Mentor
        </button>
        <button
          onClick={() => setActiveTab('debugger')}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'debugger' 
              ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Bug size={18} />
          Code Debugger
        </button>
        <button
          onClick={() => setActiveTab('image')}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'image' 
              ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <ImageIcon size={18} />
          Visual Assets
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'search' 
              ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Globe size={18} />
          Web Search
        </button>
      </div>

      {activeTab === 'mentor' && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Section title="Interactive Mentor">
            <p className="mb-4">
              Ask my digital twin (powered by Gemini) a quick question about Python, React, or Career Growth.
            </p>
            
            <div className="bg-slate-100 dark:bg-slate-800/80 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex flex-col space-y-4">
                <textarea 
                  className="w-full p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none h-24 text-slate-900 dark:text-white"
                  placeholder="Ex: What is the best way to handle errors in Python?"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                
                <div className="flex justify-end">
                  <button 
                    onClick={handleAskMentor}
                    disabled={mentorLoading || !prompt}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    {mentorLoading ? 'Thinking...' : <><Sparkles size={18} /> Ask Mentor</>}
                  </button>
                </div>

                {mentorResponse && (
                  <div className="mt-4 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Gemini Output</h4>
                    <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{mentorResponse}</p>
                  </div>
                )}
              </div>
            </div>
          </Section>
        </div>
      )}

      {activeTab === 'debugger' && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Section title="AI Error Resolver">
            <p className="mb-4">
              Paste your broken code and the error message below. Gemini will analyze the stack trace and suggest a fix.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Code Snippet</label>
                 <textarea 
                  className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-xs focus:ring-2 focus:ring-primary-500 outline-none h-48 text-slate-900 dark:text-slate-300"
                  placeholder="def my_function(): ..."
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Error Message</label>
                 <textarea 
                  className="w-full p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900 font-mono text-xs focus:ring-2 focus:ring-red-500 outline-none h-48 text-red-800 dark:text-red-300"
                  placeholder="IndexError: list index out of range..."
                  value={errorMessage}
                  onChange={(e) => setErrorMessage(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
               <button 
                  onClick={handleDebug}
                  disabled={debugLoading || !codeSnippet || !errorMessage}
                  className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors"
                >
                  {debugLoading ? 'Analyzing...' : <><Bug size={18} /> Fix Code</>}
                </button>
            </div>

            {debugResponse && (
               <div className="mt-8">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Analysis Result</h3>
                  <div className="bg-slate-900 rounded-lg p-6 border border-slate-700 overflow-x-auto">
                    <pre className="text-slate-300 whitespace-pre-wrap font-mono text-sm">{debugResponse}</pre>
                  </div>
               </div>
            )}
          </Section>
        </div>
      )}

      {activeTab === 'image' && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
           <Section title="Visual Asset Studio">
             <p className="mb-4">
               Generate professional web images, icons, or conceptual diagrams using the Gemini Image model.
             </p>
             
             <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
               <div className="flex flex-col gap-4">
                 <div>
                   <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Asset Prompt</label>
                   <div className="relative">
                      <input 
                        type="text" 
                        className="w-full pl-4 pr-12 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 dark:text-white"
                        placeholder="A futuristic 3D icon of a python snake wrapped around a computer chip, high quality, 4k..."
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerateImage()}
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                         <button 
                          onClick={handleGenerateImage}
                          disabled={imageLoading || !imagePrompt}
                          className="p-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 transition-colors"
                         >
                           {imageLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Sparkles size={16} />}
                         </button>
                      </div>
                   </div>
                 </div>

                 {generatedImage ? (
                   <div className="mt-4">
                      <div className="relative group rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
                        <img src={generatedImage} alt="Generated Asset" className="w-full h-auto max-h-[500px] object-contain bg-slate-200 dark:bg-slate-900" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <a href={generatedImage} download={`gemini-asset-${Date.now()}.png`} className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-colors">
                              <Download size={20} /> Download Asset
                           </a>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-center text-slate-500">Generated with Gemini 2.5 Flash Image</p>
                   </div>
                 ) : (
                   <div className="mt-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg h-64 flex flex-col items-center justify-center text-slate-400">
                      <ImageIcon size={48} className="mb-4 opacity-50" />
                      <p className="text-sm">Preview area</p>
                   </div>
                 )}
               </div>
             </div>
           </Section>
           
           <Section title="Implementation">
              <CodeBlock 
                language="typescript"
                code={`// Generating images with Gemini
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash-image',
  contents: {
    parts: [{ text: '${imagePrompt || "A robot..."}' }],
  },
});
// Response contains inlineData with base64 encoded image`}
              />
           </Section>
        </div>
      )}

      {activeTab === 'search' && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
           <Section title="Google Search Grounding">
             <p className="mb-4">
               Need real-time information? Use Gemini with Google Search to find current data, stats, or news.
             </p>
             
             <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-8">
               <div className="flex gap-2">
                 <div className="relative flex-1" ref={searchWrapperRef}>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 dark:text-white"
                      placeholder="e.g. Latest React version released or Who won the Superbowl 2024?"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    
                    {/* Auto-suggestions Dropdown */}
                    {showSuggestions && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-2">
                          <p className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Suggestions</p>
                          {filteredSuggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-primary-50 dark:hover:bg-slate-800 rounded-md transition-colors flex items-center gap-2"
                            >
                              <Search size={14} className="text-slate-400 shrink-0" />
                              <span className="truncate">{suggestion}</span>
                              <ArrowUpRight size={12} className="ml-auto text-slate-300 opacity-0 group-hover:opacity-100" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                 </div>
                 <button 
                    onClick={() => handleSearch()}
                    disabled={searchLoading || !searchQuery}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                 >
                    {searchLoading ? 'Searching...' : 'Search'}
                 </button>
               </div>

               {searchResult && (
                 <div className="mt-6 bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">{searchResult.text}</p>
                    </div>
                    
                    {searchResult.sources.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Sources</h4>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {searchResult.sources.map((source, idx) => (
                            <a 
                              key={idx}
                              href={source.uri}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-sm text-primary-600 dark:text-primary-400 transition-colors truncate"
                            >
                              <ExternalLink size={14} className="shrink-0" />
                              <span className="truncate">{source.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                 </div>
               )}
             </div>

             <Section title="Implementation">
              <CodeBlock 
                language="typescript"
                code={`// Using Google Search Tool
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: '${searchQuery || "Current events query"}',
  config: {
    tools: [{ googleSearch: {} }], // Enable grounding
  }
});
// Access groundingChunks in response.candidates[0].groundingMetadata`}
              />
           </Section>
           </Section>
        </div>
      )}
    </div>
  );
};

export default GeminiPage;