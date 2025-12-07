import React from 'react';
import { PageHeader, Section, CodeBlock, Callout } from '../components/DocComponents';
import { Server, Network, FileJson, AlertCircle, CheckCircle, Terminal } from 'lucide-react';

const MCPPage: React.FC = () => {
  return (
    <div>
      <PageHeader 
        title="MCP Server Installation" 
        subtitle="Connect AI models to your local data and tools using the Model Context Protocol." 
      />

      <Section title="What is MCP?">
        <p className="mb-6 text-slate-600 dark:text-slate-400">
          The <strong>Model Context Protocol (MCP)</strong> is an open standard that allows AI assistants (like Claude Desktop) to connect to external systems—databases, local files, or custom APIs—without building custom integrations for every single model.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
             <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full mb-3">
                    <Server size={24} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">MCP Server</h3>
                <p className="text-xs text-slate-500 mt-1">Exposes tools & resources (Your PC)</p>
             </div>
             
             <div className="flex items-center justify-center">
                <div className="h-1 w-full border-t-2 border-dashed border-slate-300 dark:border-slate-600 relative">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 px-2 text-xs font-mono text-slate-400">JSON-RPC</span>
                </div>
             </div>

             <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full mb-3">
                    <Network size={24} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">MCP Client</h3>
                <p className="text-xs text-slate-500 mt-1">Consumes tools (Claude Desktop)</p>
             </div>
        </div>
      </Section>

      <Section title="Step 1: Create a Simple Server">
        <p className="mb-4">
            We'll create a basic TypeScript server that gives the AI a tool to calculate the sum of two numbers. This verifies the connection works.
        </p>

        <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
            <Terminal size={16} /> Init Project
        </h4>
        <CodeBlock 
            language="bash" 
            code={`mkdir my-mcp-server
cd my-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk zod`} 
        />

        <h4 className="font-bold text-sm mb-2 mt-6 flex items-center gap-2">
            <Code2Icon size={16} /> Server Code (index.js)
        </h4>
        <CodeBlock 
            language="javascript" 
            title="index.js"
            code={`#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 1. Create Server
const server = new McpServer({
  name: "math-server",
  version: "1.0.0",
});

// 2. Define a Tool
server.tool(
  "add-numbers",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => {
    return {
      content: [{ type: "text", text: String(a + b) }],
    };
  }
);

// 3. Connect via Stdio (Standard Input/Output)
const transport = new StdioServerTransport();
await server.connect(transport);`} 
        />
      </Section>

      <Section title="Step 2: Connect to Claude Desktop">
        <Callout title="Critical: File Paths" type="warning">
            The #1 cause of errors is incorrect paths in the config file. Use <strong>absolute paths</strong> (e.g., <code>C:/Users/...</code>) and ensure you have installed the server dependencies (`npm install`).
        </Callout>

        <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <FileJson size={20} className="text-orange-500" />
                    Config Location
                </h3>
                <div className="space-y-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                        <span className="text-xs font-bold text-slate-500 uppercase">macOS</span>
                        <p className="text-sm font-mono mt-1 break-all text-slate-800 dark:text-slate-300">
                            ~/Library/Application Support/Claude/claude_desktop_config.json
                        </p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                        <span className="text-xs font-bold text-slate-500 uppercase">Windows</span>
                        <p className="text-sm font-mono mt-1 break-all text-slate-800 dark:text-slate-300">
                            %APPDATA%\Claude\claude_desktop_config.json
                        </p>
                    </div>
                </div>
            </div>

            <div>
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    Configuration Content
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Open the file above and paste this JSON. Replace the path with your actual project path.
                </p>
                <CodeBlock 
                    language="json" 
                    title="claude_desktop_config.json"
                    code={`{
  "mcpServers": {
    "my-math-server": {
      "command": "node",
      "args": [
        "C:/Users/Dev/my-mcp-server/index.js"
      ]
    }
  }
}`} 
                />
            </div>
        </div>
      </Section>

      <Section title="Troubleshooting">
        <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900 rounded-lg">
                <AlertCircle className="shrink-0 text-red-600 dark:text-red-400" />
                <div>
                    <h4 className="font-bold text-red-800 dark:text-red-300 text-sm">Claude says "Connection Failed"</h4>
                    <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                        1. Did you run <code>npm install</code> in your server folder?<br/>
                        2. Is the path in the JSON config absolute and correct?<br/>
                        3. Try running <code>node index.js</code> manually in terminal. If it hangs (waiting for input), it's working! If it crashes, fix the code error.
                    </p>
                </div>
            </div>

             <div className="flex gap-4 p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900 rounded-lg">
                <CheckCircle className="shrink-0 text-green-600 dark:text-green-400" />
                <div>
                    <h4 className="font-bold text-green-800 dark:text-green-300 text-sm">How to verify?</h4>
                    <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                        Restart Claude Desktop. Look for a plug icon <PlugIcon size={12} className="inline"/> in the input bar. If it's there, ask: "Can you add 5 and 10 using the math server?"
                    </p>
                </div>
            </div>
        </div>
      </Section>
    </div>
  );
};

// Simple Icon component for the code block above to avoid extra imports
const Code2Icon = ({ size }: { size: number }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
    </svg>
);

const PlugIcon = ({ size, className }: { size: number; className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 22v-5" />
        <path d="M9 8V2" />
        <path d="M15 8V2" />
        <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
    </svg>
);

export default MCPPage;