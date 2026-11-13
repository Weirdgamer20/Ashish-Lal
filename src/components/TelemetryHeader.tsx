import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal, Cpu } from 'lucide-react';
import { playSound, setSoundEnabled } from '../utils/audio';
import { GithubIcon, LinkedinIcon } from './Icons';

interface TelemetryHeaderProps {
  onOpenTerminal: () => void;
}

export const TelemetryHeader: React.FC<TelemetryHeaderProps> = ({ onOpenTerminal }) => {
  const [time, setTime] = useState<string>('');
  const [soundOn, setSoundOn] = useState<boolean>(true);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toISOString().slice(11, 19) + ' UTC');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) {
      playSound('blip');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#05070e]/85 backdrop-blur-md border-b border-cyan-500/20 px-4 sm:px-6 lg:px-8 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand & Telemetry Pulse */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={() => playSound('click')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.25)] transition-all">
              <Cpu className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold tracking-wider text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                <span>ASHISH LAL</span>
                <span className="text-[10px] text-cyan-400 font-normal opacity-75">// WEIRDGAMER20</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SYS_STATUS: OPTIMAL</span>
              </div>
            </div>
          </a>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-slate-400">
          <a
            href="#hero"
            onClick={() => playSound('click')}
            className="hover:text-cyan-400 transition-colors"
          >
            // 01.HERO
          </a>
          <a
            href="#projects"
            onClick={() => playSound('click')}
            className="hover:text-cyan-400 transition-colors"
          >
            // 02.SYSTEMS
          </a>
          <a
            href="#interactive-lab"
            onClick={() => playSound('click')}
            className="hover:text-cyan-400 transition-colors text-cyan-400 font-bold"
          >
            // 03.INTERACTIVE LAB
          </a>
          <a
            href="#research"
            onClick={() => playSound('click')}
            className="hover:text-cyan-400 transition-colors"
          >
            // 04.RESEARCH
          </a>
          <a
            href="#stack"
            onClick={() => playSound('click')}
            className="hover:text-cyan-400 transition-colors"
          >
            // 05.STACK
          </a>
        </nav>

        {/* Right: Telemetry readouts, Audio toggle, CLI */}
        <div className="flex items-center gap-3">
          <span className="hidden xl:inline text-[11px] font-mono text-slate-500 bg-slate-900/60 px-2 py-1 rounded border border-slate-800">
            {time}
          </span>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundOn ? 'Disable Sound FX' : 'Enable Sound FX'}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* CLI Terminal Trigger */}
          <button
            onClick={() => {
              playSound('telemetry');
              onOpenTerminal();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-300 text-xs font-mono font-bold transition-all shadow-[0_0_10px_rgba(56,189,248,0.2)]"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CLI_HUD</span>
          </button>

          {/* External Links */}
          <a
            href="https://github.com/Weirdgamer20"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-colors"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/ashishlal20"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 transition-colors"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
