import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ProjectDetailModal } from './ProjectDetailModal';
import { playSound } from '../utils/audio';
import { ExternalLink, Binary, Sliders } from 'lucide-react';

export const ProjectsMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ['All', 'Reinforcement Learning', 'AI / ML', 'Systems & Backend'];

  const filteredProjects =
    selectedCategory === 'All'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs font-mono mb-3">
              <Binary className="w-3.5 h-3.5" />
              <span>// 02. PRODUCTION & RESEARCH PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
              Intelligent Systems Architecture
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Systems designed with explicit interfaces, deterministic risk boundaries, and high-performance execution.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  playSound('click');
                }}
                className={`px-3.5 py-1.5 rounded-lg border transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat} {cat === 'All' ? `(${PORTFOLIO_DATA.projects.length})` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="hud-card rounded-xl p-6 flex flex-col justify-between group transition-all"
            >
              <div className="hud-corner hud-corner-tl" />
              <div className="hud-corner hud-corner-tr" />
              <div className="hud-corner hud-corner-bl" />
              <div className="hud-corner hud-corner-br" />

              <div>
                {/* Header row: Status + Category */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                    {project.category}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      project.status === 'Production Core'
                        ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                        : project.status === 'Deployed'
                        ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30'
                        : project.status === 'Research Benchmark'
                        ? 'bg-purple-950/60 text-purple-300 border-purple-500/30'
                        : 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-sans flex items-center justify-between">
                  <span>{project.title}</span>
                </h3>
                <p className="text-xs font-mono text-cyan-400/90 mt-1 mb-3">{project.tagline}</p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4 font-sans">
                  {project.description}
                </p>

                {/* System Highlight Badges */}
                <div className="space-y-1.5 mb-5 bg-slate-950/60 border border-slate-800/80 rounded-lg p-3 font-mono text-[11px]">
                  {project.systemHighlights.slice(0, 2).map((sh, idx) => (
                    <div key={idx} className="flex justify-between items-center text-slate-400">
                      <span className="text-slate-500">{sh.label}:</span>
                      <span className="text-slate-200 font-medium">{sh.value}</span>
                    </div>
                  ))}
                </div>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900/90 text-slate-400 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    playSound('telemetry');
                    setActiveProject(project);
                  }}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>INSPECT SYSTEM</span>
                </button>

                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('click')}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-white transition-colors"
                  title="View Source on GitHub"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
};
