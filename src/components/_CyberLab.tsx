import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert, Terminal, Eye, AlertCircle, Play, RefreshCw, Zap, Server, Code } from "lucide-react";

interface LogEntry {
  timestamp: string;
  sourceIp: string;
  eventType: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  message: string;
  status: "DETECTED" | "TRIAGED" | "BLOCKED";
}

export default function CyberLab() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"siem" | "playbooks" | "homelab">("siem");
  const [systemLoad, setSystemLoad] = useState({ cpu: 12, ram: 42, network: 140 });
  const [isSimulating, setIsSimulating] = useState(false);
  const logTerminalEndRef = useRef<HTMLDivElement | null>(null);

  // Load baseline logs
  useEffect(() => {
    const initialLogs: LogEntry[] = [
      { timestamp: "04:10:02", sourceIp: "192.168.1.45", eventType: "Auth Event", severity: "LOW", message: "User joao logged in from system console", status: "TRIAGED" },
      { timestamp: "04:10:15", sourceIp: "10.0.0.12", eventType: "Network Scan", severity: "MEDIUM", message: "Port sweep identified targeting TCP ports [22, 80, 443, 8080]", status: "DETECTED" },
      { timestamp: "04:10:48", sourceIp: "198.51.100.82", eventType: "WAF Alert", severity: "HIGH", message: "SQL Injection payload detected in API field 'username'", status: "BLOCKED" },
    ];
    setLogs(initialLogs);

    // Minor fluctuation ticker for system load metrics
    const interval = setInterval(() => {
      setSystemLoad({
        cpu: Math.floor(8 + Math.random() * 10),
        ram: Math.floor(41 + Math.random() * 2),
        network: Math.floor(130 + Math.random() * 30),
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll terminal logs to bottom on change
  useEffect(() => {
    logTerminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Handle mock attack simulations
  const triggerSimulation = (type: "sqli" | "ssh_brute" | "port_scan") => {
    setIsSimulating(true);
    const time = new Date().toLocaleTimeString();

    if (type === "sqli") {
      const newLogs: LogEntry[] = [
        { timestamp: time, sourceIp: "203.0.113.14", eventType: "SQL Injection Attempt", severity: "HIGH", message: "POST /api/v1/auth/login payload: ' OR 1=1 --", status: "DETECTED" },
      ];
      setLogs((prev) => [...prev, ...newLogs]);

      setTimeout(() => {
        const remediationTime = new Date().toLocaleTimeString();
        setLogs((prev) =>
          prev.map((l) =>
            l.sourceIp === "203.0.113.14" ? { ...l, status: "BLOCKED" } : l
          ).concat({
            timestamp: remediationTime,
            sourceIp: "System",
            eventType: "Mitigation",
            severity: "LOW",
            message: "IP 203.0.113.14 blocked on Ingress firewall rules for 24h",
            status: "TRIAGED",
          })
        );
        setIsSimulating(false);
      }, 1800);

    } else if (type === "ssh_brute") {
      const newLogs: LogEntry[] = [
        { timestamp: time, sourceIp: "185.220.101.5", eventType: "SSH Login Failure", severity: "MEDIUM", message: "Failed password for root from port 49211 ssh2", status: "DETECTED" },
        { timestamp: time, sourceIp: "185.220.101.5", eventType: "SSH Login Failure", severity: "MEDIUM", message: "Failed password for invalid user admin from port 49212 ssh2", status: "DETECTED" },
        { timestamp: time, sourceIp: "185.220.101.5", eventType: "SSH Login Failure", severity: "MEDIUM", message: "Failed password for invalid user support from port 49213 ssh2", status: "DETECTED" },
      ];
      setLogs((prev) => [...prev, ...newLogs]);

      setTimeout(() => {
        const blockTime = new Date().toLocaleTimeString();
        setLogs((prev) =>
          prev.map((l) =>
            l.sourceIp === "185.220.101.5" ? { ...l, status: "BLOCKED" } : l
          ).concat({
            timestamp: blockTime,
            sourceIp: "Fail2ban Daemon",
            eventType: "Host Hardening",
            severity: "HIGH",
            message: "Host 185.220.101.5 banned (3 failed login events in 5s)",
            status: "BLOCKED",
          })
        );
        setIsSimulating(false);
      }, 2000);

    } else if (type === "port_scan") {
      const newLogs: LogEntry[] = [
        { timestamp: time, sourceIp: "45.132.89.2", eventType: "Port Scan Activity", severity: "LOW", message: "TCP SYN packets scanned 100 random port numbers in under 1s", status: "DETECTED" },
      ];
      setLogs((prev) => [...prev, ...newLogs]);

      setTimeout(() => {
        const triggerTime = new Date().toLocaleTimeString();
        setLogs((prev) =>
          prev.map((l) =>
            l.sourceIp === "45.132.89.2" ? { ...l, status: "TRIAGED" } : l
          ).concat({
            timestamp: triggerTime,
            sourceIp: "Snort IDS",
            eventType: "Alert Triaged",
            severity: "LOW",
            message: "Scan flagged as passive reconnaissance; source added to watchlists",
            status: "TRIAGED",
          })
        );
        setIsSimulating(false);
      }, 1500);
    }
  };

  const clearLogs = () => {
    setLogs([
      { timestamp: new Date().toLocaleTimeString(), sourceIp: "System Gateway", eventType: "Maintenance", severity: "LOW", message: "Active logs buffer cleared by operator.", status: "TRIAGED" }
    ]);
  };

  const playbooks = [
    {
      title: "Detection Engineering",
      badge: "Snort / Splunk Rules",
      desc: "Designing secure log aggregations and behavioral correlations rather than relying strictly on flat hash matching.",
      actions: ["MITRE mapping", "Signature writing", "Alert rate tuning"]
    },
    {
      title: "Malware & Threat Research",
      badge: "Dynamic Sandbox",
      desc: "Analyzing static indicators of compromise (IOCs) and capturing execution hooks in sandboxed virtual registries.",
      actions: ["Process auditing", "C2 beacon capture", "Yara rule testing"]
    },
    {
      title: "Incident Response Playbooks",
      badge: "Operational SOC",
      desc: "Fast isolation of hypervisors, container revocations, network partitioning, and automated log collection backups.",
      actions: ["Token revocation", "Container isolation", "Post-mortem drafting"]
    }
  ];

  return (
    <section id="cybersecurity-lab" className="py-24 px-4 md:px-8 max-w-6xl mx-auto z-10 relative">
      <div className="space-y-16">
        
        {/* Section Title */}
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>04 // Defensive Security Lab</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Security Research Lab
          </h2>
          <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
            A specialized operational window mimicking a fully configured Security Operations Center. Simulate active attack patterns and see real-time log ingestion and state response mechanisms.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Dashboard Interface (8 columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between p-6 rounded-xl glass-panel border-white/5 relative overflow-hidden min-h-[480px]">
            
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-mono text-slate-300">CONSOLE_STATUS://SOC_MONITOR_ON</span>
              </div>
              
              {/* Tabs list inside lab */}
              <div className="flex gap-2 rounded bg-white/[0.03] p-1 text-[11px] font-mono border border-white/10">
                <button
                  onClick={() => setActiveTab("siem")}
                  className={`px-2.5 py-1 rounded cursor-pointer ${activeTab === "siem" ? "bg-blue-600/25 text-blue-300" : "text-slate-500 hover:text-slate-300"}`}
                >
                  Live SIEM
                </button>
                <button
                  onClick={() => setActiveTab("playbooks")}
                  className={`px-2.5 py-1 rounded cursor-pointer ${activeTab === "playbooks" ? "bg-blue-600/25 text-blue-300" : "text-slate-500 hover:text-slate-300"}`}
                >
                  IR Playbooks
                </button>
                <button
                  onClick={() => setActiveTab("homelab")}
                  className={`px-2.5 py-1 rounded cursor-pointer ${activeTab === "homelab" ? "bg-blue-600/25 text-blue-300" : "text-slate-500 hover:text-slate-300"}`}
                >
                  Home Lab Config
                </button>
              </div>
            </div>

            {/* TAB CONTENT: Live SIEM */}
            {activeTab === "siem" && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                
                {/* Simulated Terminal View */}
                <div className="bg-white/[0.01] rounded-lg p-4 font-mono text-[11px] leading-relaxed border border-white/10 overflow-y-auto max-h-[220px] flex-1 space-y-2 select-text">
                  <div className="text-slate-500 border-b border-white/5 pb-1.5 flex justify-between">
                    <span>ACTIVE_SYS_LOG_STREAM</span>
                    <span>UTC-07:00</span>
                  </div>
                  {logs.map((log, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-x-2 text-slate-400">
                      <span className="text-slate-600">[{log.timestamp}]</span>
                      <span className={`px-1 py-0.5 rounded text-[9px] font-bold ${
                        log.severity === 'CRITICAL' || log.severity === 'HIGH'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : log.severity === 'MEDIUM'
                          ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {log.severity}
                      </span>
                      <span className="text-blue-400 font-medium">SRC:{log.sourceIp}</span>
                      <span className="text-slate-500">//</span>
                      <span className="text-slate-300 flex-1">{log.message}</span>
                      <span className={`text-[9px] uppercase font-bold tracking-widest px-1 rounded ${
                        log.status === 'BLOCKED' ? 'text-red-400 bg-red-950/20' : log.status === 'TRIAGED' ? 'text-emerald-400 bg-emerald-950/20' : 'text-yellow-400'
                      }`}>
                        [{log.status}]
                      </span>
                    </div>
                  ))}
                  <div ref={logTerminalEndRef} />
                </div>

                {/* Simulated metrics footer inside SIEM */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] block">CPU Load</span>
                    <span className="text-slate-200 font-semibold">{systemLoad.cpu}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] block">Ram Alloc</span>
                    <span className="text-slate-200 font-semibold">{systemLoad.ram}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] block">Network Ingress</span>
                    <span className="text-slate-200 font-semibold">{systemLoad.network} pkts/s</span>
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: Playbooks */}
            {activeTab === "playbooks" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                {playbooks.map((pb, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-wider font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded w-fit block">
                        {pb.badge}
                      </span>
                      <h4 className="text-sm font-bold font-display text-white">
                        {pb.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        {pb.desc}
                      </p>
                    </div>

                    <div className="space-y-1 pt-4">
                      {pb.actions.map((act, aIdx) => (
                        <div key={aIdx} className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-slate-600" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: Home Lab Configuration */}
            {activeTab === "homelab" && (
              <div className="space-y-4 flex-1 font-sans text-xs text-slate-400 leading-relaxed">
                <h4 className="text-sm font-bold text-slate-200 font-display">João's Dynamic Cyber Research Infrastructure</h4>
                <p>
                  To conduct deep threat audits, vulnerability analyses, and custom signature checks without hazard to active production servers, I maintain a fully isolated network sandbox featuring the following environments:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3 rounded bg-white/[0.02] border border-white/5 space-y-1.5">
                    <span className="text-indigo-400 font-mono text-[10px] font-bold uppercase tracking-wider">01 // Blue Operations Lab</span>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                       Ubuntu systems feeding audit events into dynamic syslog parsers. Snort signature containers constantly capturing network sweep events.
                    </p>
                  </div>
                  <div className="p-3 rounded bg-white/[0.02] border border-white/5 space-y-1.5">
                    <span className="text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider">02 // Active API Hardening sandbox</span>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Custom Python/FastAPI microservices deployed intentionally with known SQLi vectors, secured using secure database prepared queries and Nginx rate limit rules.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Trigger Panel Side Controller (4 columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-xl glass-panel border-white/5 bg-white/[0.01]">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="p-2 rounded bg-red-500/10 text-red-400 w-fit">
                  <ShieldAlert className="w-5 h-5 animate-pulse" />
                </div>
                <h3 className="text-base font-bold font-display text-white">
                  Attack Intrusion Simulator
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Execute mock threat payloads in a controlled sandbox. Watch the telemetry panel catch and block intrusion behaviors instantly.
                </p>
              </div>

              {/* Simulation Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  disabled={isSimulating}
                  onClick={() => triggerSimulation("sqli")}
                  className="w-full text-left p-3.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-red-500/20 text-xs flex items-center justify-between transition-all group disabled:opacity-50 cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-mono">
                    <Terminal className="w-4 h-4 text-slate-500 group-hover:text-red-400 transition-colors" />
                    <span className="text-slate-300 font-sans font-medium">SQL Injection Payloads</span>
                  </div>
                  <Play className="w-3.5 h-3.5 text-slate-600 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all" />
                </button>

                <button
                  disabled={isSimulating}
                  onClick={() => triggerSimulation("ssh_brute")}
                  className="w-full text-left p-3.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-yellow-500/20 text-xs flex items-center justify-between transition-all group disabled:opacity-50 cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-mono">
                    <Server className="w-4 h-4 text-slate-500 group-hover:text-yellow-400 transition-colors" />
                    <span className="text-slate-300 font-sans font-medium">SSH Brute Force Scrapes</span>
                  </div>
                  <Play className="w-3.5 h-3.5 text-slate-600 group-hover:text-yellow-400 group-hover:translate-x-0.5 transition-all" />
                </button>

                <button
                  disabled={isSimulating}
                  onClick={() => triggerSimulation("port_scan")}
                  className="w-full text-left p-3.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blue-500/20 text-xs flex items-center justify-between transition-all group disabled:opacity-50 cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-mono">
                    <RefreshCw className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                    <span className="text-slate-300 font-sans font-medium">Passive Port Sweeps</span>
                  </div>
                  <Play className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>
            </div>

            {/* Clear console buffer */}
            <div className="pt-6 border-t border-white/5 mt-6 lg:mt-0 flex gap-2">
              <button
                onClick={clearLogs}
                className="w-full py-2 bg-transparent hover:bg-white/[0.04] border border-white/10 text-[10px] font-mono rounded text-slate-500 hover:text-slate-300 transition-all cursor-pointer"
              >
                CLEAR_LOGS_BUFFER
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
