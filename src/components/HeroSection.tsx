import React, { useState, useEffect } from 'react';
import { playSound } from '../utils/audio';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Terminal, Shield, Cpu, Zap } from 'lucide-react';

interface HeroSectionProps {
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTerminal }) => {
  const roles = [
    'AI / ML Engineer',
    'AI Systems Architect',
    'Reinforcement Learning Specialist',
    'Deterministic Backend Engineer',
    'Quantum Optimization Researcher',
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center items-center pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-indigo-500/15 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10 text-center space-y-8">
        {/* Holographic Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-slate-900/80 backdrop-blur-md text-xs font-mono shadow-[0_0_20px_rgba(56,189,248,0.2)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-slate-300">CORE STATUS:</span>
          <span className="text-cyan-400 font-bold">AUTONOMOUS & OPERATIONAL</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 font-mono text-[11px]">v2.6.4</span>
        </div>

        {/* Hero Title & Identity */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-sans">
            <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              {PORTFOLIO_DATA.profile.name}
            </span>
          </h1>

          {/* Typewriter Role Title */}
          <div className="h-10 flex items-center justify-center">
            <p className="text-lg sm:text-2xl font-mono text-cyan-400 font-semibold tracking-wide flex items-center">
              <span>&gt; </span>
              <span className="ml-2 text-white">{displayText}</span>
              <span className="w-2.5 h-6 bg-cyan-400 ml-1 animate-pulse" />
            </p>
          </div>

          {/* Core Mission Statement */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Building intelligent systems at the boundary of{' '}
            <span className="text-cyan-300 font-medium">machine learning</span>,{' '}
            <span className="text-indigo-300 font-medium">software architecture</span>, and{' '}
            <span className="text-purple-300 font-medium">autonomous decision-making</span>.
          </p>
        </div>

        {/* Engineering Philosophy Holographic Box */}
        <div className="hud-card max-w-3xl mx-auto rounded-xl p-6 sm:p-7 text-left relative overflow-hidden group">
          <div className="hud-corner hud-corner-tl" />
          <div className="hud-corner hud-corner-tr" />
          <div className="hud-corner hud-corner-bl" />
          <div className="hud-corner hud-corner-br" />

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  SYSTEM CREED // CORE PRINCIPLE
                </span>
                <span className="text-xs font-mono text-slate-600">•</span>
                <span className="text-xs font-mono text-emerald-400">DETERMINISTIC INVARIANTS</span>
              </div>
              <blockquote className="text-lg sm:text-xl font-bold text-white font-mono">
                &ldquo;{PORTFOLIO_DATA.profile.creed}&rdquo;
              </blockquote>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                {PORTFOLIO_DATA.profile.creedDetails}
              </p>
            </div>
          </div>
        </div>

        {/* Live Telemetry Matrix Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto font-mono text-xs">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3 hover:border-cyan-500/40 transition-colors">
            <div className="text-slate-500 text-[10px]">PRODUCTION ENGINES</div>
            <div className="text-white text-base sm:text-lg font-bold mt-1">6 Repositories</div>
            <div className="text-cyan-400 text-[10px] mt-0.5">Rust · Python · TS</div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3 hover:border-emerald-500/40 transition-colors">
            <div className="text-slate-500 text-[10px]">RISK SAFETY BOUNDARY</div>
            <div className="text-emerald-400 text-base sm:text-lg font-bold mt-1">Zero Leaks</div>
            <div className="text-slate-400 text-[10px] mt-0.5">Deterministic Gates</div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3 hover:border-purple-500/40 transition-colors">
            <div className="text-slate-500 text-[10px]">QUANTUM RESEARCH</div>
            <div className="text-purple-400 text-base sm:text-lg font-bold mt-1">SIH2026 AQTRO</div>
            <div className="text-slate-400 text-[10px] mt-0.5">QUBO / Annealing</div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3 hover:border-amber-500/40 transition-colors">
            <div className="text-slate-500 text-[10px]">SIMULATION CAPACITY</div>
            <div className="text-amber-400 text-base sm:text-lg font-bold mt-1">10k+ Steps/s</div>
            <div className="text-slate-400 text-[10px] mt-0.5">Parallel Vector Rollout</div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="#interactive-lab"
            onClick={() => playSound('quantum')}
            className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all flex items-center gap-2 group"
          >
            <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>LAUNCH INTERACTIVE LAB</span>
          </a>

          <a
            href="#projects"
            onClick={() => playSound('click')}
            className="px-6 py-3.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-cyan-500/30 hover:border-cyan-400 font-mono text-xs sm:text-sm transition-all flex items-center gap-2"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>EXPLORE SYSTEMS MATRIX</span>
          </a>

          <button
            onClick={() => {
              playSound('telemetry');
              onOpenTerminal();
            }}
            className="px-5 py-3.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 font-mono text-xs sm:text-sm transition-all flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-slate-400" />
            <span>OPEN CLI HUD</span>
          </button>
        </div>
      </div>
    </section>
  );
};
