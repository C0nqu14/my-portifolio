import { useState } from "react";
import { motion } from "motion/react";
import { Shield, Cpu, Binary, Sparkles, Server, ArrowRight, Eye, Briefcase, GraduationCap } from "lucide-react";
import { TIMELINE_DATA, TimelineEvent } from "../types";

export default function About() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'security' | 'development'>('all');

  const pillars = [
    {
      title: "Security-First Focus",
      icon: Shield,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      description: "Treating defensive guardrails not as a final step, but as a core requirement during API design and database query formatting."
    },
    {
      title: "Backend Depth",
      icon: Cpu,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      description: "Developing scalable servers with FastAPI, Python, and Node.js. Structuring optimal data schemas that withstand peak traffic flows."
    },
    {
      title: "Infrastructure & DevSecOps",
      icon: Server,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      description: "Operating secure Linux kernels, managing Nginx ingress reverse proxies, and sandboxing microservices via secure Docker containers."
    },
    {
      title: "AI Integration Strategy",
      icon: Sparkles,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      description: "Automating security operations using Large Language Models to parse raw logs and draft security alerts."
    }
  ];

  const filteredTimeline = TIMELINE_DATA.filter(
    (event) => activeCategory === 'all' || event.type === activeCategory
  );

  return (
    <section id="about-section" className="py-24 px-4 md:px-8 max-w-6xl mx-auto z-10 relative">
      <div className="space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>01 // Technical Blueprint</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Defensive Intent & Architectural Depth
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed">
            I am a software and security practitioner from Angola, focused on engineering secure application structures, defending operational surfaces, and leveraging AI models to optimize incident triage response times.
          </p>
        </div>

        {/* Narrative & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Detailed Narrative (5 columns) */}
          <div className="lg:col-span-5 space-y-6 text-slate-400 text-sm leading-relaxed font-sans glass-panel p-6 sm:p-8 rounded-xl border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-mono text-slate-500 ml-2">sys_manifest.json</span>
            </div>

            <p>
              My path operates at the intersection of <strong className="text-slate-200 font-medium">Cybersecurity</strong> and <strong className="text-slate-200 font-medium">Backend Engineering</strong>. I believe software cannot be considered highly scaleable if it remains vulnerable to simple injection vectors or brute force enumeration.
            </p>
            <p>
              Whether analyzing active network packets via SIEM dashboards, drafting complex custom Snort sniffer signatures, or engineering modular API models with Python, my mindset remains strictly focused on <span className="text-blue-400 font-medium">defense-in-depth</span>.
            </p>
            <p>
              In my active home lab environment, I build custom honeypots, configure secure firewalls, and simulate penetration attacks to design robust, hardened systems. I am dedicated to continuous education, keeping pace with current attack tactics (MITRE ATT&CK), and building security tools that automate mundane SOC tasks.
            </p>
          </div>

          {/* Pillars (7 columns) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div key={idx} className="p-5 rounded-xl glass-panel border-white/5 hover:border-white/10 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-full opacity-50" />
                  <div className={`p-2 rounded-lg w-fit ${pillar.bg} ${pillar.color} mb-4`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-100 mb-2 font-display">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline (Operational Growth) */}
        <div className="space-y-8 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-white/5 pb-4 gap-4">
            <h3 className="text-lg font-medium font-display text-white flex items-center gap-2">
              <Binary className="w-4 h-4 text-indigo-400" />
              <span>Career Roadmap & Operations Log</span>
            </h3>
            
            {/* Filter Pills */}
            <div className="flex rounded-lg bg-white/[0.03] p-1 border border-white/10 text-xs font-mono">
              {(['all', 'security', 'development'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-md capitalize transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Layout */}
          <div className="relative border-l border-white/5 ml-4 pl-6 md:pl-8 space-y-12 py-2">
            {filteredTimeline.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Timeline node icon */}
                <span className={`absolute -left-[38px] md:-left-[46px] top-1.5 p-1 rounded-full ${
                  event.type === 'security' ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                }`}>
                  {event.type === 'security' ? (
                    <Shield className="w-3.5 h-3.5" />
                  ) : (
                    <Cpu className="w-3.5 h-3.5" />
                  )}
                </span>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Left Column: Date & Title (4 cols) */}
                  <div className="md:col-span-4 space-y-1">
                    <span className="text-xs font-mono text-slate-500 block">
                      {event.year}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-100 font-sans">
                      {event.role}
                    </h4>
                    <span className="text-xs text-blue-400 font-mono">
                      {event.company}
                    </span>
                  </div>

                  {/* Right Column: Description & Bullet Achievements (8 cols) */}
                  <div className="md:col-span-8 space-y-3">
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {event.description}
                    </p>
                    
                    {/* Highlight metrics */}
                    <ul className="space-y-1.5">
                      {event.highlights.map((hl, hlIdx) => (
                        <li key={hlIdx} className="text-xs text-slate-400 flex items-start gap-2 leading-relaxed">
                          <span className="text-blue-500 shrink-0 mt-1.5 font-sans">•</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
