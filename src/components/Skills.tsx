import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Cpu, Server, Brain, Terminal, TerminalSquare, AlertCircle } from "lucide-react";
import { SKILL_DATA, SkillCategory } from "../types";

export default function Skills() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [hoveredSkill, setHoveredSkill] = useState<{name: string, desc: string} | null>({
    name: "Hover a technique",
    desc: "Select or hover over any technical node below to inspect specialized telemetry and configuration standards used to execute this operational task."
  });

  const iconsMap: Record<string, any> = {
    ShieldAlert: Shield,
    Cpu: Cpu,
    Server: Server,
    Brain: Brain,
  };

  const currentCategory = SKILL_DATA[activeTab];

  return (
    <section id="skills-section" className="py-24 px-4 md:px-8 max-w-6xl mx-auto z-10 relative">
      <div className="space-y-16">
        
        {/* Section Title */}
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>02 // Tech Stack & Telemetry</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Vetted Security Capabilities
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed">
            I maintain a highly practical, active set of technical competencies spanning deep system security operations, scalable backend design, and system hardening.
          </p>
        </div>

        {/* Console Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Category Tabs List (4 columns) */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-3 pb-4 lg:pb-0 scrollbar-none">
            {SKILL_DATA.map((cat, idx) => {
              const TabIcon = iconsMap[cat.icon] || Shield;
              const isActive = idx === activeTab;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveTab(idx);
                    setHoveredSkill({
                      name: cat.skills[0].name,
                      desc: cat.skills[0].description
                    });
                  }}
                  className={`w-full text-left p-4 rounded-xl border flex items-center gap-4 transition-all duration-300 shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-white/[0.06] border-blue-500/50 text-slate-100 shadow-lg shadow-blue-500/5"
                      : "bg-white/[0.02] border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className={`p-2 rounded-lg border ${
                    isActive ? "bg-blue-600/15 text-blue-400 border-blue-500/20" : "bg-white/[0.02] text-slate-500 border-white/5"
                  }`}>
                    <TabIcon className="w-5 h-5" />
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-xs font-mono text-slate-500 uppercase block tracking-wider">
                      MODULE 0{idx + 1}
                    </span>
                    <span className="text-sm font-semibold font-display">
                      {cat.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Core Visualizer Box (8 columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-8 rounded-xl glass-panel border-white/5 relative overflow-hidden min-h-[420px]">
            {/* Ambient border scan line */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            
            <div className="space-y-6">
              {/* Module Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3 font-mono text-xs">
                  <Terminal className="w-4 h-4 text-blue-400 animate-pulse" />
                  <span className="text-slate-400 uppercase tracking-wider">
                    MODULE_CONSOLE://{currentCategory.title.toLowerCase().replace(/\s+/g, '_')}
                  </span>
                </div>
              </div>

              {/* Skills Bars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 col-span-2"
                  >
                    {currentCategory.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        onMouseEnter={() => setHoveredSkill({ name: skill.name, desc: skill.description })}
                        className="space-y-2 group cursor-crosshair"
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-300 font-sans font-medium group-hover:text-blue-400 transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-slate-500">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Progress slider base */}
                        <div className="h-1.5 w-full bg-white/[0.02] rounded-full overflow-hidden relative border border-white/5">
                          {/* Active filled indicator */}
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full relative"
                          >
                            <span className="absolute right-0 top-0 bottom-0 w-1 bg-white opacity-40" />
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Dynamic inspector board at bottom */}
            <div className="mt-8 p-4 rounded-lg bg-white/[0.02] border border-white/5 flex items-start gap-3">
              <div className="p-1.5 rounded bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
                <TerminalSquare className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-mono font-semibold text-slate-200">
                  {hoveredSkill?.name}
                </h4>
                <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                  {hoveredSkill?.desc}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
