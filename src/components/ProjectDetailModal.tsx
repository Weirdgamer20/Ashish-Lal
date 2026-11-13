import React from 'react';
import { Project } from '../data/portfolioData';
import { playSound } from '../utils/audio';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="hud-card max-w-3xl w-full rounded-2xl p-6 sm:p-8 bg-[#090d1a]/95 border border-cyan-500/40 shadow-[0_0_50px_rgba(56,189,248,0.25)] relative max-h-[90vh] overflow-y-auto">
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-tr" />
        <div className="hud-corner hud-corner-bl" />
        <div className="hud-corner hud-corner-br" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                {project.category}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30">
                {project.status}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">{project.title}</h3>
            <p className="text-xs sm:text-sm text-cyan-300 font-mono mt-1">{project.tagline}</p>
          </div>

          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-6 space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
              // SYSTEM OVERVIEW
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              {project.description}
            </p>
          </div>

          {/* Architecture Details */}
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
              // ARCHITECTURAL DESIGN & INVARIANTS
            </h4>
            <div className="space-y-2.5">
              {project.architectureDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* System Highlights / Telemetry */}
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
              // SYSTEM TELEMETRY & HIGHLIGHTS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              {project.systemHighlights.map((hl, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
                  <div className="text-slate-500 text-[10px] uppercase">{hl.label}</div>
                  <div className="text-cyan-400 font-bold text-sm mt-1">{hl.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
              // STACK & DEPENDENCY BOUNDARIES
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded bg-slate-900/90 border border-cyan-500/20 text-cyan-300 font-mono text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-800 pt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Deterministic Contracts Verified</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('click')}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              <span>EXPLORE REPOSITORY</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
