/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Terminal, Command, Cpu, CheckCircle2, ChevronRight, Download, Menu, X, ArrowUpRight } from "lucide-react";

import BackgroundGrid from "./components/BackgroundGrid";
import CommandPalette from "./components/CommandPalette";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
/*import CyberLab from "./components/CyberLab";*/
/*import AiCybersecurity from "./components/AiCybersecurity";*/
import Roadmap from "./components/Roadmap";
import Contact from "./components/Contact";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [bootStep, setBootStep] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero-section");


  // Track scroll position to update active navigation highlights
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero-section",
        "about-section",
        "skills-section",
        "projects-section",
        "cybersecurity-lab",
        "copilot-section",
        "roadmap-section",
        "contact-section"
      ];

      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleDownloadCV = () => {
    // Elegant CV download simulation with direct text logs feedback
    alert(
      "DIAGNOSTIC NOTICE: Simulated credential retrieval active. João Manuel's complete technical dossier (eJPT & Security+ Verified Portfolio CV) is ready for your acquisition. Contact him at joaomanuelconquia@gmail.com for direct file transmittals."
    );
  };

  const handleCommandPaletteAction = (actionType: string, payload?: any) => {
    if (actionType === "open-palette") {
      setPaletteOpen(true);
    } else if (actionType === "scroll") {
      if (payload) handleScrollTo(payload);
    } else if (actionType === "download-cv") {
      handleDownloadCV;
    } else if (actionType === "load-log") {
      // Find Log Triage field, scroll to it, and insert payload
      handleScrollTo("copilot-section");
      
      const el = document.querySelector("textarea") as HTMLTextAreaElement;
      if (el) {
        let presetText = "";
        if (payload === "sqli") {
          presetText = `2026-06-25T11:05:14.921Z [WAF-INGRESS] ALERT: Signature Match (Rule ID: SQLI-9982) [IP: 185.112.98.42] -> POST /api/v1/auth/login HTTP/1.1 - User-Agent: Mozilla/5.0 - Body: username=admin' OR '1'='1&password=invalid`;
        } else if (payload === "ssh") {
          presetText = `Jun 25 11:06:12 cloud-node sshd[19021]: Failed password for root from 203.0.113.19 port 51109 ssh2\nJun 25 11:06:14 cloud-node sshd[19024]: Failed password for root from 203.0.113.19 port 51111 ssh2`;
        } else if (payload === "phishing") {
          presetText = `2026-06-25T11:07:05.120Z [Proxy-Core] WARNING: URL Sanitization triggered [IP: 198.51.100.41] -> GET /api/v1/feedback?user_id=1&comment=<script>fetch('http://malicious.c2')</script>`;
        }
        
        // Force state update by triggering React's value assignment
        const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
        nativeTextAreaValueSetter?.call(el, presetText);
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  };

  return (
    <div className="relative text-[#f8fafc] bg-[#020203] font-sans selection:bg-blue-600/30 selection:text-blue-100 min-h-screen">

      {/* 2. Interactive SVG Network Particle Background */}
      <BackgroundGrid />

      {/* 3. Header Glass Navigation Rail */}
      <header className="fixed top-0 inset-x-0 z-40 bg-black/20 backdrop-blur-md border-b border-white/5 transition-all">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex justify-between items-center">
          
          {/* Logo Name */}
          <button
            onClick={() => handleScrollTo("hero-section")}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <div>
              <span className="font-bold text-sm tracking-tight text-white block font-display">
                JOÃO CONQUIA
              </span>
            </div>
          </button>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono">
            {[
              { id: "about-section", label: "About" },
              { id: "skills-section", label: "Skills" },
              { id: "projects-section", label: "Projects" },
             /* { id: "cybersecurity-lab", label: "SOC Lab" },
              { id: "copilot-section", label: "AI Copilot" },*/
              { id: "roadmap-section", label: "Roadmap" },
              { id: "contact-section", label: "Contact" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className={`transition-colors cursor-pointer ${
                  activeSection === link.id
                    ? "text-blue-400 font-semibold"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Callouts Header buttons */}
          <div className="hidden md:flex items-center gap-4 text-xs font-mono">

            {/* Ctrl+K Action button */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Command className="w-3.5 h-3.5 text-slate-500" />
              <span>Console</span>
              <kbd className="text-[9px] bg-slate-950 px-1 py-0.2 rounded text-slate-500">
                Ctrl+K
              </kbd>
            </button>
          </div>

          {/* Mobile Hamburguer */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded bg-slate-900 border border-slate-850 text-slate-400 hover:text-white cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* 4. Mobile Navigation Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-16 bg-[#020203]/95 backdrop-blur-lg border-b border-white/10 z-35 md:hidden p-6 font-mono text-xs flex flex-col gap-4 shadow-2xl"
          >
            {[
              { id: "about-section", label: "About Blueprint" },
              { id: "skills-section", label: "Skills Telemetry" },
              { id: "projects-section", label: "Core Projects" },
              { id: "cybersecurity-lab", label: "SOC Research Lab" },
              { id: "copilot-section", label: "AI Log Triage" },
              { id: "roadmap-section", label: "Cert Roadmap" },
              { id: "contact-section", label: "Secure Contact" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className="text-left py-2 border-b border-slate-900/60 text-slate-300 hover:text-blue-400 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setPaletteOpen(true);
              }}
              className="py-2.5 rounded bg-blue-600 text-white font-medium flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Workstation console</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Workstation Command Palette (Raycast Style) */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelectAction={handleCommandPaletteAction}
      />

      {/* 6. Main Core content panels */}
      <main className="relative z-10">
        
        {/* Landing Section */}
        <Hero onScrollTo={handleScrollTo} onDownloadCV={handleDownloadCV} />

        {/* Divider accent */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Section 1: About Compelling Narrative & Timeline */}
        <About />

        {/* Divider accent */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Section 2: Technical Skills Grid */}
        <Skills />

        {/* Divider accent */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Section 3: Portfolio Projects Cases */}
        <Projects />

        {/* Divider accent */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Section 4: SOC Lab Simulator */}
        {/* <CyberLab /> */}

        {/* Divider accent */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Section 5: AI Cybersecurity Triage */}
        {/* <AiCybersecurity /> */}

        {/* Divider accent */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Section 6: Roadmap & Certifications */}
        <Roadmap />

        {/* Divider accent */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Section 7: Secure Contacts & Chat bot */}
        <Contact />

      </main>

      {/* 7. Corporate Technical Footer */}
      <footer className="relative z-10 bg-[#020203] border-t border-white/5 py-12 px-4 md:px-8 font-mono text-[10px] text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-slate-300 font-display font-bold text-xs tracking-wide">JOÃO CONQUIA</span>
            <p>CYBERSECURITY ENGINEER // SOC ANALYST // BACKEND DEVELOPER</p>
          </div>

          <div className="flex gap-6">
            <button onClick={() => handleScrollTo("hero-section")} className="hover:text-slate-300 transition-colors cursor-pointer">
              BACK TO CONSOLE
            </button>
            <span>//</span>
            <a href="https://github.com/C0nqu14" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors flex items-center gap-0.5">
              <span>GITHUB</span>
              <ArrowUpRight className="w-2.5 h-2.5" />
            </a>
            <span>//</span>
            <a href="www.linkedin.com/in/joão-conquia-6a7507239" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors flex items-center gap-0.5">
              <span>LINKEDIN</span>
              <ArrowUpRight className="w-2.5 h-2.5" />
            </a>
          </div>

          <div className="text-center md:text-right">
            <p>© 2026 JOÃO CONQUIA.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

