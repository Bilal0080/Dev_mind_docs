import React from 'react';
import { PageHeader, Section, CodeBlock, Callout } from '../components/DocComponents';
import { Terminal, Box, Shield, Command, Settings, PlusCircle, GitCommit } from 'lucide-react';

const ClaudePage: React.FC = () => {
  return (
    <div>
      <PageHeader 
        title="AI Tools & Specs" 
        subtitle="Modernize your workflow with Claude Code CLI and the robust SpecKit+ framework." 
      />

      <Section title="Claude Code: Setup">
        <p className="mb-6">
          <strong>Claude Code</strong> is an agentic CLI tool from Anthropic that lives in your terminal. It helps you understand, refactor, and fix code directly from the command line.
        </p>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div className="p-6 bg-slate-900 rounded-xl text-white shadow-lg">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Terminal size={20} className="text-purple-400" />
                    Installation
                </h3>
                <div className="space-y-4">
                    <div>
                        <p className="text-xs text-slate-400 mb-1.5 uppercase tracking-wide">1. Install Globally</p>
                        <CodeBlock language="bash" code="npm install -g @anthropic-ai/claude-code" />
                    </div>
                    <div>
                         <p className="text-xs text-slate-400 mb-1.5 uppercase tracking-wide">2. Authenticate (Free Tier available)</p>
                         <p className="text-xs text-slate-500 mb-2">You will need an Anthropic Console account.</p>
                        <CodeBlock language="bash" code="cd ~/my-project\nclaude login" />
                    </div>
                     <div>
                         <p className="text-xs text-slate-400 mb-1.5 uppercase tracking-wide">3. Start Session</p>
                        <CodeBlock language="bash" code="claude" />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <Callout title="What is it?" type="info">
                    Unlike standard web chats, Claude Code has context of your <strong>local file system</strong>. It can read multiple files, run terminal commands, and create new files to fix bugs automatically.
                </Callout>
                
                <div className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Command size={16} /> Power Commands
                    </h4>
                    <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
                        <li><code>/init</code> - Initialize project understanding</li>
                        <li><code>/bug</code> - Analyze current stack trace</li>
                        <li><code>/refactor [file]</code> - Suggest improvements</li>
                        <li><code>/test</code> - Run tests and fix failures</li>
                    </ul>
                </div>
            </div>
        </div>
      </Section>

      <Section title="SpecKit+ (Pro Specification Kit)">
        <p className="mb-6">
            Upgrade your project quality with <strong>SpecKit+</strong>. This extended configuration adds Git Hooks (Husky) and Commit Linting to ensure bad code never even reaches your repository.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="p-5 bg-blue-50 dark:bg-slate-800/50 rounded-xl border border-blue-100 dark:border-slate-700">
                <Box className="w-8 h-8 text-blue-500 mb-3" />
                <h3 className="font-bold text-slate-900 dark:text-white">Format</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Prettier</p>
            </div>

             <div className="p-5 bg-purple-50 dark:bg-slate-800/50 rounded-xl border border-purple-100 dark:border-slate-700">
                <Shield className="w-8 h-8 text-purple-500 mb-3" />
                <h3 className="font-bold text-slate-900 dark:text-white">Lint</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">ESLint</p>
            </div>

             <div className="p-5 bg-green-50 dark:bg-slate-800/50 rounded-xl border border-green-100 dark:border-slate-700">
                <Settings className="w-8 h-8 text-green-500 mb-3" />
                <h3 className="font-bold text-slate-900 dark:text-white">Test</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Jest / Vitest</p>
            </div>

            <div className="p-5 bg-rose-50 dark:bg-slate-800/50 rounded-xl border border-rose-100 dark:border-slate-700 relative overflow-hidden">
                <div className="absolute top-2 right-2">
                    <PlusCircle size={16} className="text-rose-500" />
                </div>
                <GitCommit className="w-8 h-8 text-rose-500 mb-3" />
                <h3 className="font-bold text-slate-900 dark:text-white">Git Hooks</h3>
                 <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Husky</p>
            </div>
        </div>

        <div className="mt-8">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <PlusCircle size={20} className="text-primary-600" />
                SpecKit+ Installation
            </h3>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                Run this single command block to install Husky and configure a pre-commit hook that runs your linters automatically.
            </p>
            <CodeBlock 
                language="bash" 
                title="Terminal"
                code={`# 1. Install Husky & Commitlint
npm install --save-dev husky @commitlint/cli @commitlint/config-conventional

# 2. Init Husky
npx husky init

# 3. Add Pre-commit Hook (Runs linting before commit)
echo "npm run lint && npm run test" > .husky/pre-commit

# 4. Add Commit Msg Hook (Enforces "feat: message" format)
echo "npx --no -- commitlint --edit \\$1" > .husky/commit-msg`} 
            />
            
            <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-sm mb-2">Why add the "+" ?</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                    Without hooks, developers can ignore linting errors. <strong>SpecKit+</strong> acts as a gatekeeper, rejecting any commit that breaks your rules or doesn't follow standard commit message formats.
                </p>
            </div>
        </div>
      </Section>
    </div>
  );
};

export default ClaudePage;