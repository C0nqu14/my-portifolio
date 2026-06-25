import { motion } from "motion/react";
import { Award, Briefcase, GraduationCap, Shield, ChevronRight, CheckCircle2, Clock, Calendar } from "lucide-react";
import { CERTIFICATIONS } from "../types";

export default function Roadmap() {
  const currentFocus = [
    {
      title: "SOC Analyst Operations",
      desc: "Deepening real-time telemetry correlation and behavioral sniffer analysis using Sysmon logs, Event Viewer logs, and advanced SIEM rules."
    },
    {
      title: "Secure API Architecture",
      desc: "Advancing backend security controls (anti-injection, rate-limit ingress, token revocations, crypto hashing) in FastAPI/Python systems."
    },
    {
      title: "Detection Engineering",
      desc: "Creating high-fidelity signatures for intrusion detection (Snort, Suricata) and behavioral alerts aligned with the MITRE ATT&CK matrix."
    }
  ];

  return (
    <section id="roadmap-section" className="py-24 px-4 md:px-8 max-w-6xl mx-auto z-10 relative">
      <div className="space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>07 // Professional Roadmap</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Strategic Direction & Goals
          </h2>
          <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
            I prioritize continuous professional education, structuring technical certifications and operational focuses to match current attack mitigation standards.
          </p>
        </div>

        {/* Focus and Roadmap Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Current Focus (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-xl glass-panel border-white/5 bg-white/[0.01]">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold font-display text-white">
                  Active Operational Focus
                </h3>
              </div>

              <div className="space-y-5">
                {currentFocus.map((f, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <h4 className="text-xs font-semibold text-slate-100 flex items-center gap-2 font-display">
                      <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{f.title}</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed pl-5 font-sans">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 mt-6 lg:mt-0 font-mono text-[10px] text-slate-500">
              CURRENT_STATUS: UPGRADING_DEFENSIVE_SKILLS
            </div>
          </div>

          {/* Certifications (7 columns) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl glass-panel border-white/5 bg-white/[0.01] space-y-6">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold font-display text-white">
                Certification Ledger & Pipeline
              </h3>
            </div>

            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/10 transition-all"
                >
                  <div className="flex items-start gap-3">
                    {cert.status === "active" ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : cert.status === "in-progress" ? (
                      <Clock className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5 animate-pulse" />
                    ) : (
                      <Calendar className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-100 font-sans">
                        {cert.name}
                      </h4>
                      <span className="text-xs text-slate-400 font-mono">
                        {cert.issuer}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 sm:text-right">
                    {cert.status === "active" ? (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25 uppercase font-bold">
                        ACTIVE // {cert.date}
                      </span>
                    ) : cert.status === "in-progress" ? (
                      <span className="text-[10px] font-mono text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/25 uppercase font-bold">
                        IN PROGRESS
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500 bg-white/[0.02] px-2 py-0.5 rounded border border-white/5 uppercase font-bold">
                        PLANNED
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
