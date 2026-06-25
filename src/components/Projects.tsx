import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FolderGit, Github, ExternalLink, ShieldCheck, X, Eye, Code, Cpu, CheckCircle } from "lucide-react";
import { PROJECTS_DATA, Project } from "../types";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'cybersecurity' | 'backend' | 'fullstack'>('all');

  const filteredProjects = PROJECTS_DATA.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <section id="projects-section" className="py-24 px-4 md:px-8 max-w-6xl mx-auto z-10 relative">
      <div className="space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>03 // Enterprise Portfolio</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
              Production Engines & Audits
            </h2>
            <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
              Curated architectural solutions built with scalability, high transactional integrity, and aggressive threat-mitigation defenses in mind.
            </p>
          </div>

          {/* Filtering controls */}
          <div className="flex flex-wrap gap-2 rounded-lg bg-white/[0.03] p-1 border border-white/10 text-xs font-mono">
            {(['all', 'cybersecurity', 'backend', 'fullstack'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-md capitalize transition-colors cursor-pointer ${
                  filter === cat
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat === 'all' ? 'All Engines' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group p-6 rounded-xl glass-panel border-white/5 flex flex-col justify-between hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden"
              >
                {/* Glowing corner gradient hover */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all" />

                <div className="space-y-4">
                  {/* Category icon indicator */}
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-white/[0.02] text-slate-500 border border-white/5">
                      {project.category}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-blue-500/30 group-hover:text-blue-400 transition-colors" />
                  </div>

                  {/* Title & description */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold font-display text-slate-100 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans font-medium">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-sans">
                    {project.description}
                  </p>
                </div>

                {/* Tech tags list */}
                <div className="space-y-4 pt-6">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((t, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 bg-white/[0.02] text-slate-400 border border-white/5 rounded">
                        {t}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-white/[0.02] text-slate-500 rounded">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Buttons line */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Case Study</span>
                    </button>

                    <div className="flex gap-3 text-slate-400">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer referrerPolicy"
                          className="hover:text-white transition-colors"
                          title="View Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="hover:text-white transition-colors"
                        title="Launch Project"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal: Case Study Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-[#020203]/90 backdrop-blur-md"
              />

              {/* Slideable Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="relative w-full max-w-3xl glass-panel rounded-2xl border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
              >
                {/* Header background bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <FolderGit className="w-5 h-5 text-blue-400" />
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                      SYSTEM_AUDIT_REPORT://{selectedProject.id}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-900 transition-all cursor-pointer"
                    aria-label="Close case study"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 font-sans text-sm text-slate-300 leading-relaxed">
                  
                  {/* Project Banner Meta */}
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                      {selectedProject.title}
                    </h3>
                    <p className="text-blue-400 font-medium text-xs sm:text-sm">
                      {selectedProject.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {selectedProject.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-white/[0.02] border border-white/5 text-slate-400 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Problem Statement */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      The Problem / Architectural Vulnerability
                    </h4>
                    <p className="pl-4 border-l border-red-500/20 text-xs sm:text-sm text-slate-400">
                      {selectedProject.caseStudy.problem}
                    </p>
                  </div>

                  {/* Solution Statement */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      The Defensive Solution
                    </h4>
                    <p className="pl-4 border-l border-blue-500/20 text-xs sm:text-sm text-slate-300">
                      {selectedProject.caseStudy.solution}
                    </p>
                  </div>

                  {/* Architecture Blocks */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-indigo-400" />
                      Core Architecture Guidelines
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-4">
                      {selectedProject.caseStudy.architecture.map((arch, idx) => (
                        <div key={idx} className="p-3 rounded bg-white/[0.02] border border-white/5 text-xs text-slate-400 flex items-start gap-2.5">
                          <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{arch}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Challenges Faced */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-yellow-500" />
                      Engineering Challenges
                    </h4>
                    <ul className="space-y-1.5 pl-5 list-disc text-xs sm:text-sm text-slate-400">
                      {selectedProject.caseStudy.challenges.map((ch, idx) => (
                        <li key={idx}>{ch}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Results & Audit Status */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      Remediation Outcomes & Hardened Results
                    </h4>
                    <div className="space-y-1.5 pl-4 border-l border-emerald-500/20">
                      {selectedProject.caseStudy.results.map((res, idx) => (
                        <div key={idx} className="text-xs sm:text-sm text-slate-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer buttons */}
                <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5 flex justify-between items-center text-xs shrink-0">
                  <span className="text-slate-500 font-mono">ENCRYPTED_OUTPUT_ID: {selectedProject.id.toUpperCase()}</span>
                  <div className="flex gap-4">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer referrerPolicy"
                        className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source</span>
                      </a>
                    )}
                    <a
                      href={selectedProject.githubUrl || "#"}
                      target="_blank"
                      rel="noreferrer referrerPolicy"
                      className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Instance</span>
                    </a>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
