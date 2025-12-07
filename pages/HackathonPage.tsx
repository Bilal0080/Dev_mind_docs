import React from 'react';
import { PageHeader, Section, CodeBlock, Callout } from '../components/DocComponents';
import { Zap, Key, Terminal, ShieldCheck, PlayCircle, Cloud, Lock, GitMerge, AlertCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HackathonPage: React.FC = () => {
  return (
    <div>
      <PageHeader 
        title="Hackathon Survival Guide" 
        subtitle="Rapidly configure your environment, secure your keys, and start building with Gemini." 
      />

      <Section title="The 5-Minute Setup">
        <p className="mb-6">
          Speed is everything in a hackathon. This guide streamlines the process of integrating Google's Gemini API into your project so you can focus on building features, not fixing configs.
        </p>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-4">
                    <Key size={20} />
                </div>
                <h3 className="font-bold text-lg mb-2">1. Get the Key</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Head to Google AI Studio to generate your free API key. It takes less than 30 seconds.
                </p>
                <a 
                    href="https://aistudio.google.com/app/apikey" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                >
                    Open Google AI Studio &rarr;
                </a>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                 <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center mb-4">
                    <ShieldCheck size={20} />
                </div>
                <h3 className="font-bold text-lg mb-2">2. Secure It</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Never hardcode keys. Use environment variables to keep your credentials safe from public repos.
                </p>
                 <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    See details below &darr;
                </span>
            </div>
        </div>
      </Section>

      <Section title="Git Emergency Room">
        <p className="mb-4">
          Stuck trying to push to GitHub? Here are the fixes for the most common errors.
        </p>

        <div className="space-y-6">
          <div className="p-5 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-800">
            <h4 className="font-bold text-amber-800 dark:text-amber-400 flex items-center gap-2 mb-3">
              <AlertCircle size={18} />
              Error: "Updates were rejected" / "Non-fast-forward"
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              This happens when the remote repo (GitHub) has changes that you don't have locally (e.g., a README created during initialization).
            </p>
            <CodeBlock 
              language="bash" 
              title="Fix"
              code={`# 1. Pull the changes first
git pull origin main --rebase

# 2. If it complains about unrelated histories:
git pull origin main --allow-unrelated-histories

# 3. Then push again
git push origin main`} 
            />
          </div>

          <div className="p-5 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-800">
            <h4 className="font-bold text-red-800 dark:text-red-400 flex items-center gap-2 mb-3">
              <Lock size={18} />
              Error: "Permission denied (publickey)" or Auth Failed
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              GitHub no longer accepts passwords. You must use a Personal Access Token (PAT) or SSH key.
            </p>
            <div className="bg-white dark:bg-slate-900 p-3 rounded border border-red-100 dark:border-red-900/30 text-sm">
              <ol className="list-decimal list-inside space-y-1 text-slate-700 dark:text-slate-300">
                <li>Go to GitHub Settings &gt; Developer Settings &gt; Personal Access Tokens.</li>
                <li>Generate a <strong>Classic Token</strong> with 'repo' scope.</li>
                <li>When running <code>git push</code>, paste this token as your <strong>password</strong>.</li>
              </ol>
            </div>
          </div>

          <div className="p-5 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-200 dark:border-purple-800">
            <h4 className="font-bold text-purple-800 dark:text-purple-400 flex items-center gap-2 mb-3">
              <GitMerge size={18} />
              Error: "Merge Conflict"
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Git can't decide which code to keep. You have to choose manually.
            </p>
            <div className="text-sm text-slate-700 dark:text-slate-300">
              <ol className="list-decimal list-inside space-y-1">
                <li>Open the files marked as "conflicted" in VS Code.</li>
                <li>Look for <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> markers.</li>
                <li>Choose "Accept Current" or "Accept Incoming" using the editor buttons.</li>
                <li>Save the files.</li>
                <li>Run <code>git add .</code> and <code>git commit</code>.</li>
              </ol>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Secure Deployment (Vercel)">
        <p className="mb-4">
            When deploying to Vercel, you must hide your API key from the public but make it available to your running application.
        </p>

        <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-md shrink-0">
                    <Lock size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">1. Git Security</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Ensure you have a <code>.gitignore</code> file in your root directory that includes <code>.env</code>. This prevents you from accidentally pushing your keys to GitHub.
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
                <div className="p-2 bg-black dark:bg-slate-800 text-white rounded-md shrink-0">
                    <Cloud size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">2. Vercel Dashboard</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        After importing your repo into Vercel:
                    </p>
                    <ol className="list-decimal list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-1">
                        <li>Go to your project <strong>Settings</strong> tab.</li>
                        <li>Select <strong>Environment Variables</strong> on the left sidebar.</li>
                        <li>Add Key: <code>API_KEY</code> (or <code>VITE_API_KEY</code> if using Vite).</li>
                        <li>Add Value: Paste your actual Google Gemini API key.</li>
                        <li>Click <strong>Save</strong> and Redeploy.</li>
                    </ol>
                </div>
            </div>
        </div>
        
        <Callout title="Routing Fix" type="info">
            If you see 404 errors when refreshing pages on Vercel, ensure you have a <code>vercel.json</code> file in your root with a rewrite rule pointing to <code>/index.html</code>.
        </Callout>
      </Section>

      <Section title="Installation & Configuration">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Terminal size={18} className="text-slate-400" /> 
            Install the SDK
        </h3>
        <p className="mb-2 text-slate-600 dark:text-slate-400">
            For Node.js / React projects, install the official Google GenAI package.
        </p>
        <CodeBlock 
            language="bash" 
            code="npm install @google/genai" 
        />

        <h3 className="text-lg font-bold mb-3 mt-8 flex items-center gap-2">
            <Key size={18} className="text-slate-400" /> 
            Configure Environment Variables
        </h3>
        <p className="mb-2 text-slate-600 dark:text-slate-400">
            Create a <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">.env</code> file in your project root.
        </p>
        <CodeBlock 
            language="properties" 
            title=".env"
            code={`# For standard Node.js/CRA
API_KEY=AIzaSyD...

# For Vite Projects (Client Side)
VITE_API_KEY=AIzaSyD...
`} 
        />
      </Section>

      <Section title="Quick Start Template">
        <p className="mb-4">
            Copy-paste this boilerplate to verify your connection immediately.
        </p>
        <CodeBlock 
            language="typescript" 
            title="test-connection.ts"
            code={`import { GoogleGenAI } from "@google/genai";

// Initialize
// Note: If using Vite, check import.meta.env.VITE_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function testConnection() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Hello! confirm you are online.",
    });
    console.log("Success:", response.text);
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

testConnection();`} 
        />
      </Section>

      <Section title="Next Steps">
        <div className="flex gap-4 flex-wrap">
             <Link to="/ai/gemini" className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                <PlayCircle size={20} /> Try the Toolkit
             </Link>
             <Link to="/projects" className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium">
                Start a Project
             </Link>
        </div>
      </Section>
    </div>
  );
};

export default HackathonPage;