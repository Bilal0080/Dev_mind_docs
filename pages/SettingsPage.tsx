import React, { useState, useEffect } from 'react';
import { PageHeader, Section, Callout } from '../components/DocComponents';
import { Key, Eye, EyeOff, Save, Trash2, Shield, CheckCircle, ExternalLink, AlertTriangle } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [storedKey, setStoredKey] = useState<string | null>(null);
  const [envKeyExists, setEnvKeyExists] = useState(false);

  useEffect(() => {
    // Check for stored key
    const local = localStorage.getItem('gemini_api_key');
    if (local) {
      setStoredKey(local);
      setApiKey(local);
    }

    // Check if env key exists (we can't see the value for security, but we know if it's there)
    if (process.env.API_KEY && process.env.API_KEY.length > 0) {
      setEnvKeyExists(true);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setStoredKey(apiKey.trim());
      alert("API Key saved securely to local storage.");
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to remove your personal API key?")) {
      localStorage.removeItem('gemini_api_key');
      setStoredKey(null);
      setApiKey('');
    }
  };

  return (
    <div>
      <PageHeader 
        title="Settings" 
        subtitle="Manage your AI credentials and application preferences." 
      />

      <Section title="API Key Management">
        <div className="grid gap-8 md:grid-cols-3">
          
          {/* Main Key Input */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg">
                  <Key size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Gemini API Key</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Required for AI features like chat, debugging, and generation.</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Your Personal Key
                </label>
                <div className="relative">
                  <input 
                    type={isVisible ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full pl-4 pr-12 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 dark:text-white font-mono text-sm transition-all"
                  />
                  <button 
                    onClick={() => setIsVisible(!isVisible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button 
                    onClick={handleSave}
                    disabled={!apiKey || apiKey === storedKey}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={18} />
                    Save Key
                  </button>
                  {storedKey && (
                    <button 
                      onClick={handleDelete}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>
                  )}
                  <a 
                    href="https://aistudio.google.com/app/apikey" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ml-auto"
                  >
                    Generate Key <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>

            <Callout title="Security Note" type="info">
               Your key is stored locally in your browser (LocalStorage). It is never sent to any server other than Google's Gemini API directly.
            </Callout>
          </div>

          {/* Status Card */}
          <div className="md:col-span-1">
             <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-6 h-full">
                <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Shield size={18} className="text-slate-500" />
                  Key Status
                </h4>
                
                <div className="space-y-4">
                  <div className={`p-3 rounded-lg border ${storedKey ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-50'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">Personal Key</span>
                      {storedKey && <CheckCircle size={16} className="text-green-500" />}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {storedKey ? 'Active (Preferred)' : 'Not configured'}
                    </p>
                  </div>

                  <div className={`p-3 rounded-lg border ${envKeyExists && !storedKey ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
                     <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">System Key (Env)</span>
                      {envKeyExists && <CheckCircle size={16} className="text-blue-500" />}
                    </div>
                     <p className="text-xs text-slate-600 dark:text-slate-400">
                      {envKeyExists 
                        ? (storedKey ? 'Overridden by Personal Key' : 'Active (Fallback)') 
                        : 'Not detected'}
                    </p>
                  </div>

                  {!storedKey && !envKeyExists && (
                    <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-700 dark:text-amber-400">
                      <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                      <p className="text-xs font-medium">No API Key detected. AI features will not work.</p>
                    </div>
                  )}
                </div>
             </div>
          </div>

        </div>
      </Section>
    </div>
  );
};

export default SettingsPage;