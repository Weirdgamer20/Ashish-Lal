import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playSound } from '../utils/audio';
import { Atom, ExternalLink, Network, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';

export const ResearchSection: React.FC = () => {
  const r = PORTFOLIO_DATA.research;

  return (
    <section id="research" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300 text-xs font-mono mb-3">
            <Atom className="w-3.5 h-3.5" />
            <span>// 04. ACTIVE RESEARCH FRONTIER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Quantum Computing & Meta-Learning
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Formulating Quadratic Unconstrained Binary Optimization (QUBO) matrices for NP-hard vehicle routing problems, benchmarked on simulated quantum annealing and QAOA circuits.
          </p>
        </div>

        {/* Research Holographic Banner */}
        <div className="hud-card rounded-2xl p-6 sm:p-10 relative overflow-hidden bg-gradient-to-b from-[#0e0a1f]/80 to-[#090d1a]/90 border border-purple-500/30">
          <div className="hud-corner hud-corner-tl" />
          <div className="hud-corner hud-corner-tr" />
          <div className="hud-corner hud-corner-bl" />
          <div className="hud-corner hud-corner-br" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 cols: Research Overview & Formulas */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 font-mono text-xs font-bold border border-purple-500/40">
                  {r.shortCode}
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 text-slate-400 font-mono text-xs border border-slate-800">
                  {r.status}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">{r.title}</h3>
                <p className="text-sm text-cyan-300 font-mono mt-1.5">{r.subtitle}</p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">{r.summary}</p>

              {/* Mathematical Formulation Telemetry Box */}
              <div className="p-4 rounded-xl bg-black/70 border border-purple-500/30 font-mono">
                <div className="flex items-center justify-between text-[11px] text-purple-400 mb-2 font-bold">
                  <span>// HAMILTONIAN COST OPERATOR FORMULATION (QUBO)</span>
                  <span className="text-slate-500">Ising Spin Mapping</span>
                </div>
                <div className="bg-slate-950 p-3 rounded border border-slate-800 text-cyan-300 text-xs sm:text-sm overflow-x-auto">
                  <code>
                    H = ∑ C_ij · x_ij + λ₁ ∑ (1 - ∑ x_ij)² + λ₂ ∑ SubtourPenalty(k)
                  </code>
                </div>
                <div className="text-[10px] text-slate-400 mt-2">
                  Maps classical permutation routes into qubit spin states |ψ⟩ with quadratic penalty barriers λ.
                </div>
              </div>

              {/* Research Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {r.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded bg-purple-950/60 text-purple-300 font-mono text-xs border border-purple-500/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right 5 cols: Key Findings & Benchmarks */}
            <div className="lg:col-span-5 space-y-6 bg-slate-950/70 p-6 rounded-xl border border-slate-800/80">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Network className="w-4 h-4 text-purple-400" />
                <span>KEY BENCHMARK FINDINGS</span>
              </h4>

              <div className="space-y-3 font-sans">
                {r.keyFindings.map((finding, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-1" />
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{finding}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                <div className="text-xs font-mono text-slate-400">
                  Target Conference: <span className="text-white font-bold">SIH 2026</span>
                </div>

                <a
                  href={r.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('click')}
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>RESEARCH REPO</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
