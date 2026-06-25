import { motion } from "motion/react";
import { Shield, Terminal, ArrowRight, Download, Server, Cpu } from "lucide-react";

interface HeroProps {
  onScrollTo: (elementId: string) => void;
  onDownloadCV: () => void;
}

export default function Hero({ onScrollTo, onDownloadCV }: HeroProps) {
  // Stagger configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const stats = [
    { label: "Years Experience", value: "4+" },
    { label: "SOC Log Alerts Triaged", value: "12,400+" },
    { label: "Completed Deployments", value: "30+" },
    { label: "Secured Backend APIs", value: "100%" },
  ];

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center pt-20 px-4 md:px-8 overflow-hidden z-10">
      {/* Visual Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full text-center relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >

          {/* Main Display Typography */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold tracking-tight text-white select-none">
              JOÃO CONQUIA
            </h1>
            
            {/* Typing effect simulation / Subheading */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-mono text-slate-300">
              <span className="flex items-center gap-1.5 text-blue-400">
                <Shield className="w-4 h-4" /> Cybersecurity Engineer
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1.5 text-indigo-400">
                <Terminal className="w-4 h-4" /> SOC Analyst
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Cpu className="w-4 h-4" /> Backend Developer
              </span>
            </div>
          </motion.div>

          {/* Tagline / Pitch */}
          <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-400 font-sans leading-relaxed">
            Building highly resilient systems, automating security operations, and engineering tamper-proof backend software. Blending threat defense mechanics with core infrastructure architecture.
          </motion.p>

          {/* Dynamic CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={() => onScrollTo("projects-section")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onDownloadCV}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800/80 font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Acquire Credentials</span>
            </button>

            <button
              onClick={() => onScrollTo("contact-section")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-transparent border border-slate-800 text-slate-400 hover:text-slate-200 font-medium text-sm transition-all hover:bg-slate-900/50 flex items-center justify-center cursor-pointer"
            >
              <span>Secure Signal</span>
            </button>
          </motion.div>

          {/* Metric Indicators */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto"
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl glass-panel border-slate-900 flex flex-col items-center justify-center text-center relative group overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-mono mt-1 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Keyboard prompt hints */}
          <motion.div
            variants={itemVariants}
            className="hidden md:flex items-center justify-center gap-1.5 text-xs text-slate-600 font-mono pt-4 select-none"
          >
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500 text-[10px]">
              Ctrl
            </kbd>
            <span>+</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500 text-[10px]">
              K
            </kbd>
            <span>to execute direct secure commands</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative floating indicators in the background */}
      <div className="absolute bottom-10 left-10 text-[10px] font-mono text-slate-700 select-none hidden lg:block">
        SEC_SECTOR // REG_ANGOLA // AUTH_STATUS_GRANTED
      </div>
      <div className="absolute bottom-10 right-10 text-[10px] font-mono text-slate-700 select-none hidden lg:block">
        CORE_PORT: 3000 // STATUS: STANDBY
      </div>
    </section>
  );
}
