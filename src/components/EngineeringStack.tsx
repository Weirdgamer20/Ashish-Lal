import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playSound } from '../utils/audio';
import { Cpu, Server, Binary, Layers, Code, ChevronRight, Sliders } from 'lucide-react';

export const EngineeringStack: React.FC = () => {
  const [activeDomainIndex, setActiveDomainIndex] = useState<number>(0);

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-emerald-400" />;
      case 'Binary':
        return <Binary className="w-5 h-5 text-purple-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-amber-400" />;
      case 'Code':
        return <Code className="w-5 h-5 text-blue-400" />;
      default:
        return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  const currentDomain = PORTFOLIO_DATA.techStack[activeDomainIndex];

  return (
    <section id="stack" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs font-mono mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>// 05. ENGINEERING STACK & DOMAINS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Technical Foundations & Tooling
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Tools chosen for deterministic execution, high performance, strict typing, and zero unhedged state leaks.
          </p>
        </div>

        {/* Domain Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {PORTFOLIO_DATA.techStack.map((domain, idx) => (
            <button
              key={domain.domain}
              onClick={() => {
                setActiveDomainIndex(idx);
                playSound('click');
              }}
              className={`p-3 rounded-xl border text-left font-mono transition-all flex items-center gap-3 ${
                activeDomainIndex === idx
                  ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="shrink-0">{getDomainIcon(domain.iconName)}</div>
              <div>
                <div className="text-xs font-bold truncate">{domain.domain}</div>
                <div className="text-[10px] text-slate-500">{domain.skills.length} Technologies</div>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Domain Telemetry Panel */}
        <div className="hud-card rounded-2xl p-6 sm:p-8 relative">
          <div className="hud-corner hud-corner-tl" />
          <div className="hud-corner hud-corner-tr" />
          <div className="hud-corner hud-corner-bl" />
          <div className="hud-corner hud-corner-br" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                {getDomainIcon(currentDomain.iconName)}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">{currentDomain.domain}</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{currentDomain.description}</p>
              </div>
            </div>

            <div className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1.5 rounded-lg border border-cyan-500/30">
              TELEMETRY: VERIFIED
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentDomain.skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex justify-between items-center mb-1.5 font-mono text-xs">
                  <span className="text-white font-bold">{skill.name}</span>
                  <span className="text-cyan-400">{skill.level}% Depth</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-500 shrink-0" />
                  <span>{skill.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
