import React, { useState } from 'react';
import { QuantumCanvas } from './components/QuantumCanvas';
import { TelemetryHeader } from './components/TelemetryHeader';
import { HeroSection } from './components/HeroSection';
import { InteractiveLab } from './components/InteractiveLab';
import { ProjectsMatrix } from './components/ProjectsMatrix';
import { ResearchSection } from './components/ResearchSection';
import { EngineeringStack } from './components/EngineeringStack';
import { Terminal, X, CornerDownLeft } from 'lucide-react';
import { playSound } from './utils/audio';

export const App: React.FC = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [cmdInput, setCmdInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Ashish Lal [Weirdgamer20] Quantum Telemetry CLI v2.6.4',
    'Type "help" for a list of available systems commands, or "projects" to query active engines.',
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cmdInput.trim().toLowerCase();
    if (!cmd) return;

    playSound('telemetry');
    const newHistory = [...terminalHistory, `> ${cmdInput}`];

    switch (cmd) {
      case 'help':
        newHistory.push(
          'AVAILABLE COMMANDS:',
          '  projects    - List production-grade repositories and system invariants',
          '  research    - Display SIH2026 Quantum VRP / AQTRO formulation',
          '  philosophy  - Display "Build systems, not demos" architectural manifesto',
          '  status      - Query real-time deterministic risk gate and system health',
          '  stack       - Print core multi-paradigm technical tooling',
          '  contact     - Direct neural uplink & social coordinates',
          '  clear       - Wipe terminal screen buffer'
        );
        break;

      case 'projects':
        newHistory.push(
          'INDEXED ENGINES:',
          '  1. TradeHive    - RL trading infrastructure with deterministic Rust risk gate',
          '  2. EcoConnect   - AI civic issue intelligence & semantic vector clustering',
          '  3. RLLS16       - RL simulation environment with 10k+ steps/sec rollout',
          '  4. Mine-Bot     - Autonomous learning agent with hierarchical world models',
          '  5. Farm Advisor - Multi-variate agricultural ML & CNN pathology diagnosis',
          '  6. Quantum VRP  - QUBO & QAOA combinatorial optimization (SIH2026)'
        );
        break;

      case 'research':
        newHistory.push(
          'AQTRO / QUANTUM VRP (SIH2026):',
          '  Formulation : QUBO Ising Spin Matrix',
          '  Hamiltonian : H = ∑ C_ij · x_ij + λ₁ ∑ (1 - ∑ x_ij)² + λ₂ ∑ Subtour(k)',
          '  Benchmark   : 42% quantum circuit depth reduction via meta-learned warmup'
        );
        break;

      case 'philosophy':
        newHistory.push(
          'ENGINEERING MANIFESTO:',
          '  "Build systems, not demos."',
          '  - Explicit interfaces over implicit magic',
          '  - Deterministic boundaries around learned stochastic components',
          '  - Reproducibility, measurable behavior, and failure-aware design'
        );
        break;

      case 'status':
        newHistory.push(
          'TELEMETRY AUDIT:',
          '  Deterministic Gate : 100% INVARIANT ENFORCED (0 Leaks)',
          '  Core Health        : OPTIMAL // ZERO DRIFT',
          '  Active Nodes       : 6 Repositories Online'
        );
        break;

      case 'stack':
        newHistory.push(
          'FOUNDATIONAL STACK:',
          '  Languages  : Python, Rust, TypeScript, JavaScript, SQL',
          '  ML / RL    : PyTorch, TensorFlow, Scikit-learn, Gymnasium, World Models',
          '  Backend    : FastAPI, Tokio, Node.js, PostgreSQL, Redis',
          '  Infra      : Docker, GitHub Actions, AWS, Railway'
        );
        break;

      case 'contact':
        newHistory.push(
          'COORDINATES:',
          '  GitHub   : https://github.com/Weirdgamer20',
          '  LinkedIn : https://www.linkedin.com/in/ashishlal20',
          '  Email    : ashishlal.dev@gmail.com'
        );
        break;

      case 'clear':
        setTerminalHistory([]);
        setCmdInput('');
        return;

      default:
        newHistory.push(`Unknown command: "${cmd}". Type "help" for valid commands.`);
        break;
    }

    setTerminalHistory(newHistory);
    setCmdInput('');
  };

  return (
    <div className="min-h-screen bg-[#05070e] text-slate-100 relative font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dynamic Quantum Particle Entanglement Canvas */}
      <QuantumCanvas />

      {/* Futuristic CRT Scanline Texture Overlay */}
      <div className="fixed inset-0 scanline-overlay z-10 pointer-events-none" />

      {/* Main Content Hierarchy */}
      <div className="relative z-20">
        <TelemetryHeader onOpenTerminal={() => setTerminalOpen(true)} />

        <main>
          <HeroSection onOpenTerminal={() => setTerminalOpen(true)} />
          <InteractiveLab />
          <ProjectsMatrix />
          <ResearchSection />
          <EngineeringStack />
        </main>

        {/* Futuristic Footer */}
        <footer className="border-t border-slate-800/80 bg-black/60 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8 text-center font-mono text-xs text-slate-500">
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
              <a href="https://github.com/Weirdgamer20" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                GITHUB // WEIRDGAMER20
              </a>
              <span>•</span>
              <a href="https://www.linkedin.com/in/ashishlal20" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                LINKEDIN // IN/ASHISHLAL20
              </a>
              <span>•</span>
              <a href="mailto:ashishlal.dev@gmail.com" className="hover:text-cyan-400 transition-colors">
                ASHISHLAL.DEV@GMAIL.COM
              </a>
            </div>

            <p className="text-slate-600">
              [SYSTEMS_CORE_ID: 0x9F41B] · BUILD SYSTEMS, NOT DEMOS · REPRODUCIBLE · DETERMINISTIC · AUDITABLE
            </p>
          </div>
        </footer>
      </div>

      {/* Interactive CLI Terminal Modal */}
      {terminalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="hud-card max-w-2xl w-full rounded-xl bg-black/95 border border-cyan-500/40 shadow-[0_0_40px_rgba(56,189,248,0.25)] flex flex-col h-[500px] overflow-hidden">
            {/* Terminal Header */}
            <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2 text-cyan-400">
                <Terminal className="w-4 h-4" />
                <span className="font-bold">ashish@quantum-sys:~ (telemetry_cli)</span>
              </div>
              <button
                onClick={() => {
                  playSound('click');
                  setTerminalOpen(false);
                }}
                className="text-slate-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-4 font-mono text-xs text-slate-300 overflow-y-auto space-y-1.5 selection:bg-cyan-500/40">
              {terminalHistory.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    line.startsWith('>')
                      ? 'text-cyan-400 font-bold'
                      : line.startsWith('AVAILABLE') || line.startsWith('INDEXED') || line.startsWith('TELEMETRY')
                      ? 'text-purple-400 font-bold mt-2'
                      : 'text-slate-300'
                  }
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Terminal Input */}
            <form onSubmit={handleCommand} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2 font-mono text-xs">
              <span className="text-cyan-400 font-bold">&gt;</span>
              <input
                type="text"
                value={cmdInput}
                onChange={(e) => setCmdInput(e.target.value)}
                placeholder="Type command (e.g., 'help', 'projects', 'status', 'research')..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-600 font-mono"
                autoFocus
              />
              <button type="submit" className="text-slate-500 hover:text-cyan-400">
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
