import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader, Section, CodeBlock, Callout } from '../components/DocComponents';
import { PYTHON_CODE_SAMPLE } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Github, RefreshCw, Search, AlertCircle, GitCommit, GitPullRequest, Globe, Brain, Shield, Server, Box } from 'lucide-react';

interface ChartData {
  month: string;
  commits: number;
  prs: number;
  recentCommits: string[];
  recentPRs: string[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ChartData;
    return (
      <div className="bg-slate-900/95 border border-slate-700 p-4 rounded-xl shadow-2xl max-w-[320px] sm:max-w-[400px] text-xs backdrop-blur-md z-50">
        <div className="flex items-center justify-between mb-3 border-b border-slate-700 pb-2">
           <p className="font-bold text-slate-100 text-sm">{label} Activity</p>
           <span className="text-[10px] font-medium text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded-full border border-slate-700">
             Total Events: {data.commits + data.prs}
           </span>
        </div>
        
        <div className="mb-5">
          <p className="font-bold text-sky-400 mb-2.5 flex items-center gap-2 uppercase tracking-wide text-[10px]">
            <GitCommit size={12} />
            Recent Commits ({data.commits})
          </p>
          {data.recentCommits.length > 0 ? (
            <ul className="space-y-2.5">
              {data.recentCommits.slice(0, 5).map((msg, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-300">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 shadow-[0_0_8px_rgba(14,165,233,0.6)]"></div>
                  <span className="leading-relaxed break-words font-mono text-[11px] text-slate-300">{msg}</span>
                </li>
              ))}
              {data.recentCommits.length > 5 && (
                <li className="text-[10px] text-slate-500 italic pl-4">
                  ...and {data.recentCommits.length - 5} more
                </li>
              )}
            </ul>
          ) : (
             <p className="text-[10px] text-slate-600 pl-4 italic">No commit messages available</p>
          )}
        </div>

        <div>
          <p className="font-bold text-purple-400 mb-2.5 flex items-center gap-2 uppercase tracking-wide text-[10px]">
            <GitPullRequest size={12} />
            Pull Requests ({data.prs})
          </p>
           {data.recentPRs.length > 0 ? (
            <ul className="space-y-2.5">
              {data.recentPRs.slice(0, 3).map((title, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-300">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.6)]"></div>
                  <span className="leading-relaxed break-words font-medium">{title}</span>
                </li>
              ))}
               {data.recentPRs.length > 3 && (
                <li className="text-[10px] text-slate-500 italic pl-4">
                  ...and {data.recentPRs.length - 3} more
                </li>
              )}
            </ul>
          ) : (
             <p className="text-[10px] text-slate-600 pl-4 italic">No PR details available</p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

const PythonPage: React.FC = () => {
  const [username, setUsername] = useState('google');
  const [inputUsername, setInputUsername] = useState('google');
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Track which skill badge is currently clicked to show tooltip
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const skillCategories = [
    { 
      title: "Web Frameworks", 
      icon: <Globe size={18} className="text-blue-500" />,
      skills: [
        { name: "Django", desc: "The battery-included web framework for perfectionists with deadlines." },
        { name: "FastAPI", desc: "Modern, high-performance, web framework for building APIs with Python 3.6+." },
        { name: "Flask", desc: "A lightweight WSGI web application framework." },
        { name: "Starlette", desc: "Lightweight ASGI framework/toolkit, ideal for building high-performance asyncio services." }
      ], 
      containerClass: "border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/10",
      badgeClass: "bg-white dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600"
    },
    { 
      title: "Data Science & AI", 
      icon: <Brain size={18} className="text-emerald-500" />,
      skills: [
        { name: "Pandas", desc: "Fast, powerful, flexible and easy to use open source data analysis and manipulation tool." },
        { name: "NumPy", desc: "The fundamental package for scientific computing with Python." },
        { name: "Matplotlib", desc: "Comprehensive library for creating static, animated, and interactive visualizations." },
        { name: "Scikit-learn", desc: "Simple and efficient tools for predictive data analysis." },
        { name: "PyTorch", desc: "Deep learning framework that facilitates rapid research and experimentation." }
      ], 
      containerClass: "border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-900/10",
      badgeClass: "bg-white dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600"
    },
    { 
      title: "Testing & QA", 
      icon: <Shield size={18} className="text-amber-500" />,
      skills: [
        { name: "Pytest", desc: "Framework that makes building simple and scalable tests easy." },
        { name: "Unittest", desc: "Built-in unit testing framework inspired by JUnit." },
        { name: "Tox", desc: "Generic virtualenv management and test command line tool." },
        { name: "Selenium", desc: "Portable framework for testing web applications." },
        { name: "Playwright", desc: "Reliable end-to-end testing for modern web apps." }
      ], 
      containerClass: "border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-900/10",
      badgeClass: "bg-white dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600"
    },
    { 
      title: "Infrastructure & Async", 
      icon: <Server size={18} className="text-purple-500" />,
      skills: [
        { name: "Asyncio", desc: "Library to write concurrent code using the async/await syntax." },
        { name: "Celery", desc: "Distributed task queue processing for real-time operations." },
        { name: "Redis", desc: "In-memory data structure store, used as a database, cache, and message broker." },
        { name: "Docker", desc: "Platform for developing, shipping, and running applications in containers." },
        { name: "Kubernetes", desc: "Automated container deployment, scaling, and management." }
      ], 
      containerClass: "border-purple-200 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-900/10",
      badgeClass: "bg-white dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600"
    },
  ];

  const fetchGitHubStats = useCallback(async (user: string) => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch up to 3 pages (300 events) to get better coverage for the 6-month chart
      // Note: GitHub API limits unauthenticated requests to 60/hr. 
      const pageRequests = [1, 2, 3].map(page => 
        fetch(`https://api.github.com/users/${user}/events?per_page=100&page=${page}`)
      );

      const responses = await Promise.all(pageRequests);
      
      // Check first response for critical errors
      if (responses[0].status === 404) throw new Error(`User '${user}' not found.`);
      if (responses[0].status === 403) throw new Error('GitHub API Rate Limit Exceeded. Please try again in 1 hour.');

      let allEvents: any[] = [];
      
      for (const res of responses) {
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            allEvents = [...allEvents, ...data];
          }
        }
      }

      if (allEvents.length === 0 && responses[0].ok) {
        // User exists but has no public events
      }
      
      // Initialize last 6 months buckets
      const today = new Date();
      const monthsMap = new Map<string, ChartData>();
      const monthsOrder: string[] = [];

      for (let i = 5; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const monthName = d.toLocaleString('default', { month: 'short' });
        monthsOrder.push(monthName);
        monthsMap.set(monthName, { 
          month: monthName, 
          commits: 0, 
          prs: 0,
          recentCommits: [],
          recentPRs: []
        });
      }

      // Process events
      allEvents.forEach((event: any) => {
        const date = new Date(event.created_at);
        const monthName = date.toLocaleString('default', { month: 'short' });

        if (monthsMap.has(monthName)) {
          const entry = monthsMap.get(monthName)!;
          
          if (event.type === 'PushEvent') {
            entry.commits += event.payload.size || 0;
            if (event.payload.commits && Array.isArray(event.payload.commits)) {
              // Add commit messages (limit to 10 stored per month to keep memory light)
              for (const commit of event.payload.commits) {
                if (entry.recentCommits.length < 10) {
                  entry.recentCommits.push(commit.message);
                }
              }
            }
          } else if (event.type === 'PullRequestEvent' && event.payload.action === 'opened') {
            entry.prs += 1;
             if (entry.recentPRs.length < 10) {
                entry.recentPRs.push(event.payload.pull_request.title);
             }
          }
        }
      });

      setChartData(monthsOrder.map(m => monthsMap.get(m)!));

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred');
      setChartData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGitHubStats(username);
  }, [fetchGitHubStats, username]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUsername.trim()) {
      setUsername(inputUsername.trim());
    }
  };

  return (
    <div>
      <PageHeader 
        title="Python Proficiency" 
        subtitle="Scalable backend systems, data analysis, and automation scripts." 
      />

      <Section title="Core Competencies">
        <p className="mb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
          Python is my primary language for building backend logic and data processing pipelines. 
          I focus on writing <strong className="text-primary-600 dark:text-primary-400">idiomatic Python (Pythonic)</strong> code that is legible, efficient, and maintainable.
        </p>
        
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {skillCategories.map((category, idx) => (
             <div key={idx} className={`rounded-xl p-6 border transition-all duration-300 hover:shadow-lg ${category.containerClass}`}>
                <h4 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 mb-4">
                   <span className="p-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                     {category.icon}
                   </span>
                   {category.title}
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <button 
                      key={skill.name} 
                      onClick={() => setActiveSkill(activeSkill === skill.name ? null : skill.name)}
                      className={`relative px-3 py-1.5 text-xs font-bold rounded-lg border shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-500 ${category.badgeClass} ${activeSkill === skill.name ? 'ring-2 ring-primary-500 ring-offset-1' : ''}`}
                      aria-expanded={activeSkill === skill.name}
                      aria-label={`Show description for ${skill.name}`}
                    >
                      {skill.name}
                      {/* Tooltip Popup */}
                      {activeSkill === skill.name && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 bg-slate-900 text-white text-xs font-normal rounded-lg shadow-xl z-20 text-center animate-in fade-in zoom-in-95 duration-200 border border-slate-700 pointer-events-none">
                          <span className="block leading-relaxed">{skill.desc}</span>
                          {/* Triangle Arrow */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[6px] border-transparent border-t-slate-900"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
             </div>
          ))}
        </div>
        
        <Callout title="Philosophy" type="info">
          I believe that simple is better than complex. My code prioritizes readability without sacrificing performance.
        </Callout>
      </Section>

      <Section title="Code Sample">
        <p className="mb-4">
          Below is an example of a conceptual algorithm used in my "Motivational Structure" framework, written in Python.
        </p>
        <CodeBlock code={PYTHON_CODE_SAMPLE} language="python" title="motivation_engine.py" />
      </Section>

      <Section title="GitHub Activity Analysis">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <p className="text-slate-600 dark:text-slate-400 max-w-lg">
            Real-time visualization of commit activity and pull requests fetched directly from GitHub public events API. Hover over bars to see commit details.
          </p>
          
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                placeholder="GitHub Username"
                className="pl-9 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-primary-500 outline-none w-40 sm:w-48"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="p-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </button>
          </form>
        </div>

        <div className="h-80 w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 relative">
          {error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-red-500 bg-slate-50/95 dark:bg-slate-900/95 rounded-xl z-10">
              <AlertCircle className="w-8 h-8 mb-2" />
              <p className="font-bold mb-1">{error}</p>
              {error.includes('Rate Limit') && (
                <p className="text-xs text-slate-500 max-w-xs mt-2">
                   This uses the public GitHub API which has a limit of 60 requests per hour per IP. 
                   Try again later or search for a different user.
                </p>
              )}
            </div>
          ) : (
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" opacity={0.1} />
                <XAxis 
                  dataKey="month" 
                  tick={{fill: '#64748b', fontSize: 12}} 
                  axisLine={false} 
                  tickLine={false} 
                  dy={10}
                />
                <YAxis 
                  tick={{fill: '#64748b', fontSize: 12}} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip 
                   content={<CustomTooltip />}
                   cursor={{fill: 'rgba(255,255,255,0.05)'}}
                />
                <Bar 
                  dataKey="commits" 
                  fill="#0ea5e9" 
                  radius={[4, 4, 0, 0]} 
                  name="Commits (Pushes)" 
                  animationDuration={1500}
                />
                <Bar 
                  dataKey="prs" 
                  fill="#8b5cf6" 
                  radius={[4, 4, 0, 0]} 
                  name="Pull Requests" 
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
          
          {!loading && !error && chartData.length === 0 && (
             <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                <p>No public activity found for {username} in the last 6 months.</p>
             </div>
          )}
        </div>
        <p className="text-xs text-right text-slate-400 mt-2">
          Data Source: Public GitHub Events API (Last 300 Events)
        </p>
      </Section>
    </div>
  );
};

export default PythonPage;