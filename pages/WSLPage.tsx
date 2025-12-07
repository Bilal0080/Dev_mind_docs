import React from 'react';
import { PageHeader, Section, CodeBlock, Callout } from '../components/DocComponents';
import { Terminal, Laptop, AlertTriangle, CheckCircle, Server, Settings, Globe } from 'lucide-react';

const WSLPage: React.FC = () => {
  return (
    <div>
      <PageHeader 
        title="WSL & Linux Environment" 
        subtitle="Turn your Windows machine into a powerhouse developer workstation using Ubuntu." 
      />

      <Section title="Quick Install (WSL 2)">
        <p className="mb-6">
          Windows Subsystem for Linux (WSL) lets you run a full Linux terminal kernel directly on Windows. No dual-boot required.
        </p>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div className="p-6 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Terminal size={20} className="text-green-400" />
                    One-Command Install
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                    Open <strong>PowerShell</strong> or <strong>Command Prompt</strong> as Administrator and run:
                </p>
                <CodeBlock language="powershell" code="wsl --install" />
                <p className="text-xs text-slate-500 mt-3">
                    * This automatically enables required features and installs the latest Ubuntu LTS.
                </p>
            </div>

            <div className="space-y-4">
                <div className="p-5 bg-blue-50 dark:bg-slate-800/50 rounded-xl border border-blue-100 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <CheckCircle size={18} className="text-blue-500" />
                        Post-Install Steps
                    </h4>
                    <ol className="list-decimal list-inside text-sm text-slate-700 dark:text-slate-300 space-y-2">
                        <li><strong>Restart</strong> your computer when prompted.</li>
                        <li>A terminal window will open automatically.</li>
                        <li>Create a <strong>UNIX username</strong> and <strong>password</strong>.</li>
                        <li className="text-xs text-slate-500 italic">(Password characters won't appear while typing)</li>
                    </ol>
                </div>
            </div>
        </div>
      </Section>

      <Section title="Ubuntu Essentials Setup">
        <p className="mb-4">
            Once inside your Ubuntu terminal, run these commands to set up your dev tools.
        </p>

        <div className="space-y-6">
            <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">1. Update Package Lists</h4>
                <CodeBlock language="bash" code="sudo apt update && sudo apt upgrade -y" />
            </div>
            
            <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">2. Install Python & Node.js</h4>
                <CodeBlock 
                    language="bash" 
                    code={`# Install Python tools
sudo apt install python3 python3-pip python3-venv -y

# Install Node.js (using nvm recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts`} 
                />
            </div>
        </div>
      </Section>

      <Section title="Troubleshooting Common Errors">
        <div className="grid gap-6 md:grid-cols-2">
            
            {/* Error 1 */}
            <div className="p-5 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/50">
                <h4 className="font-bold text-red-700 dark:text-red-400 flex items-center gap-2 mb-3">
                    <AlertTriangle size={18} />
                    Error: 0x800701bc
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                    "WslRegisterDistribution failed... kernel component is not installed."
                </p>
                <div className="bg-white dark:bg-slate-900 p-3 rounded border border-red-100 dark:border-red-900/30">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Fix</p>
                    <p className="text-sm text-slate-800 dark:text-slate-200">
                        Download and install the <a href="https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Linux kernel update package</a> from Microsoft.
                    </p>
                </div>
            </div>

            {/* Error 2 */}
            <div className="p-5 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/50">
                <h4 className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2 mb-3">
                    <Settings size={18} />
                    Error: Virtualization Disabled
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                    "Please enable the Virtual Machine Platform Windows feature and ensure virtualization is enabled in the BIOS."
                </p>
                <div className="bg-white dark:bg-slate-900 p-3 rounded border border-amber-100 dark:border-amber-900/30">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Fix</p>
                    <ul className="text-sm text-slate-800 dark:text-slate-200 list-disc list-inside">
                        <li>Restart PC -> Enter BIOS (F2/Del).</li>
                        <li>Enable <strong>Intel VTx</strong> or <strong>AMD-V</strong>.</li>
                        <li>Save & Exit.</li>
                    </ul>
                </div>
            </div>

            {/* Error 3 */}
             <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 md:col-span-2">
                <h4 className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-3">
                    <Globe size={18} />
                    Network / DNS Issues
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    If <code>apt update</code> fails to connect:
                </p>
                <CodeBlock 
                    language="bash" 
                    title="Fix DNS"
                    code={`# Create a wsl.conf file to stop auto-generation
sudo nano /etc/wsl.conf

# Add these lines:
[network]
generateResolvConf = false

# Save (Ctrl+O) and Exit (Ctrl+X)
# Then restart WSL in PowerShell: wsl --shutdown`} 
                />
            </div>

        </div>
      </Section>
    </div>
  );
};

export default WSLPage;