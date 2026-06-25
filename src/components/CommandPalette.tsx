import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Terminal, Shield, FolderGit, MessageSquare, Download, Hash, X } from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  shortcut: string[];
  category: string;
  icon: any;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (actionType: string, payload?: any) => void;
}

export default function CommandPalette({ isOpen, onClose, onSelectAction }: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      // Let's delay input focus slightly to allow modal transition to complete smoothly
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Global keyboard listeners to open the palette
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onSelectAction("open-palette");
      }
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [isOpen, onClose, onSelectAction]);

  const commands: CommandItem[] = [
    {
      id: "run-analysis",
      title: "Simulate SQLi Attack Log",
      subtitle: "Inject an active SQL injection attempt into the AI Analyzer",
      shortcut: ["↵", "S"],
      category: "Simulation Controls",
      icon: Shield,
      action: () => {
        onSelectAction("load-log", "sqli");
        onClose();
      },
    },
    {
      id: "run-bruteforce",
      title: "Simulate SSH Brute Force Log",
      subtitle: "Inject SSH intrusion indicators into the AI Analyzer",
      shortcut: ["↵", "B"],
      category: "Simulation Controls",
      icon: Terminal,
      action: () => {
        onSelectAction("load-log", "ssh");
        onClose();
      },
    },
    {
      id: "sc-phishing",
      title: "Simulate Phishing Log Analysis",
      subtitle: "Load an active suspicious phishing header payload",
      shortcut: ["↵", "P"],
      category: "Simulation Controls",
      icon: Shield,
      action: () => {
        onSelectAction("load-log", "phishing");
        onClose();
      },
    },
    {
      id: "go-lab",
      title: "Launch Cybersecurity Lab",
      subtitle: "Scroll directly to the Security Research Hub",
      shortcut: ["G", "L"],
      category: "Navigation",
      icon: Shield,
      action: () => {
        onSelectAction("scroll", "cybersecurity-lab");
        onClose();
      },
    },
    {
      id: "go-projects",
      title: "Explore Core Engineering Projects",
      subtitle: "Jump to portfolio case studies section",
      shortcut: ["G", "P"],
      category: "Navigation",
      icon: FolderGit,
      action: () => {
        onSelectAction("scroll", "projects-section");
        onClose();
      },
    },
    {
      id: "go-assistant",
      title: "Activate AI Threat Copilot",
      subtitle: "Speak directly to João's SOC assistant daemon",
      shortcut: ["G", "A"],
      category: "Navigation",
      icon: MessageSquare,
      action: () => {
        onSelectAction("scroll", "copilot-section");
        onClose();
      },
    },
    {
      id: "download-cv",
      title: "Download Technical CV",
      subtitle: "Obtain João's updated resume PDF (Mock download)",
      shortcut: ["D", "R"],
      category: "Utilities",
      icon: Download,
      action: () => {
        onSelectAction("download-cv");
        onClose();
      },
    },
    {
      id: "go-contact",
      title: "Establish Encrypted Contact Channel",
      subtitle: "View email, LinkedIn, and secure keys",
      shortcut: ["G", "C"],
      category: "Navigation",
      icon: Hash,
      action: () => {
        onSelectAction("scroll", "contact-section");
        onClose();
      },
    }
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(search.toLowerCase()) ||
      cmd.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Keyboard navigation inside the palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  // Keep selected item visible in scrolling div
  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;
    const selectedEl = listEl.children[selectedIndex] as HTMLElement;
    if (!selectedEl) return;

    const listRect = listEl.getBoundingClientRect();
    const selectedRect = selectedEl.getBoundingClientRect();

    if (selectedRect.bottom > listRect.bottom) {
      listEl.scrollTop += selectedRect.bottom - listRect.bottom;
    } else if (selectedRect.top < listRect.top) {
      listEl.scrollTop -= listRect.top - selectedRect.top;
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            id="palette-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Dialog Body */}
          <motion.div
            id="palette-dialog"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-xl glass-panel rounded-xl overflow-hidden shadow-2xl border-slate-800 flex flex-col max-h-[480px]"
            onKeyDown={handleKeyDown}
          >
            {/* Search Header */}
            <div className="flex items-center px-4 border-b border-slate-800/80">
              <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or simulation (e.g. SQLi, SSH)..."
                className="w-full h-14 bg-transparent border-none text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-0 text-sm font-sans"
              />
              <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-mono mr-2 uppercase shrink-0">
                esc
              </span>
              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-slate-100 transition-colors"
                aria-label="Close command palette"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Command List */}
            <div
              ref={listRef}
              className="overflow-y-auto flex-1 p-2 space-y-0.5 max-h-[350px]"
            >
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => {
                  const IconComponent = cmd.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-blue-600/15 border-l-2 border-blue-500 text-slate-100"
                          : "text-slate-300 hover:bg-slate-900/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-1.5 rounded-md ${
                            isSelected
                              ? "bg-blue-500/20 text-blue-400 animate-pulse"
                              : "bg-slate-900 text-slate-400"
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium font-sans">
                            {cmd.title}
                          </div>
                          <div className="text-xs text-slate-500 font-sans">
                            {cmd.subtitle}
                          </div>
                        </div>
                      </div>

                      {/* Shortcut tags */}
                      <div className="flex items-center gap-1">
                        {cmd.shortcut.map((key, kIdx) => (
                          <kbd
                            key={kIdx}
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                              isSelected
                                ? "bg-blue-500/30 text-blue-200"
                                : "bg-slate-800 text-slate-500"
                            }`}
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-slate-500 text-sm font-sans flex flex-col items-center justify-center gap-2">
                  <Terminal className="w-6 h-6 text-slate-600 animate-bounce" />
                  <span>No micro-commands found matching "{search}"</span>
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-500 font-mono shrink-0">
              <div className="flex gap-4">
                <span>
                  <kbd>↓↑</kbd> Navigate
                </span>
                <span>
                  <kbd>Enter</kbd> Select
                </span>
              </div>
              <div>
                <span>Press <kbd className="text-slate-400">Ctrl + K</kbd> anywhere</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
