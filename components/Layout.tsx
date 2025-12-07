import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, Github, Search, ChevronRight, UserPlus, LogIn, Settings } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Initialize state based on the actual class on html element (set by index.html script)
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  
  const location = useLocation();

  // No useEffect needed for initial load anymore as index.html handles it.
  // We just handle the toggle.

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col dark:bg-slate-900 dark:text-slate-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/75 dark:bg-slate-900/75 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white lg:hidden"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="ml-4 lg:ml-0 flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">D</div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">DevMind</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search docs..." 
                  className="pl-10 pr-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-primary-500 w-48 lg:w-64 transition-all"
                />
              </div>
              
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="px-3 py-1.5 text-sm font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-md hover:opacity-90 transition-opacity">
                  Sign Up
                </Link>
              </div>

              <div className="flex items-center gap-2">
                 <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <Github size={20} />
                </a>
                <Link 
                  to="/settings"
                  className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="Settings"
                >
                  <Settings size={20} />
                </Link>
                <button 
                  onClick={toggleTheme} 
                  className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="Toggle Dark Mode"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out overflow-y-auto`}>
          <div className="py-6 px-4">
            
            <div className="lg:hidden mb-6 pb-6 border-b border-slate-200 dark:border-slate-800 space-y-2">
                <Link to="/login" className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
                   <LogIn size={16} /> Sign In
                </Link>
                <Link to="/signup" className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
                   <UserPlus size={16} /> Create Account
                </Link>
            </div>

            {NAV_ITEMS.map((section, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider px-2">
                  {section.children ? section.title : 'Overview'}
                </h3>
                <ul className="space-y-1">
                  {section.children ? (
                    section.children.map((item) => (
                      <li key={item.path}>
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            `flex items-center px-2 py-1.5 text-sm font-medium rounded-md transition-colors ${
                              isActive
                                ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                            }`
                          }
                        >
                          {item.title}
                        </NavLink>
                      </li>
                    ))
                  ) : (
                     <li>
                        <NavLink
                          to={section.path}
                           className={({ isActive }) =>
                            `flex items-center px-2 py-1.5 text-sm font-medium rounded-md transition-colors ${
                              isActive
                                ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                            }`
                          }
                        >
                          {section.title}
                        </NavLink>
                     </li>
                  )}
                </ul>
              </div>
            ))}
            
             <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-2">Daily Motivation</p>
                <p className="text-xs italic text-slate-600 dark:text-slate-300">"The only way to do great work is to love what you do."</p>
             </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 w-full lg:w-auto p-4 sm:p-8 lg:p-12 overflow-x-hidden">
          <div className="max-w-3xl mx-auto">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;