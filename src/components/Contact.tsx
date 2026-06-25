import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Github, Linkedin, Mail, Phone, ShieldCheck, Loader2, MessageSquare, Key, Terminal } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
}

export default function Contact() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I am João's digital Security Assistant. You can ask me any professional questions about his skill stack, certification timelines, or invite him for an interview!"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll chat to bottom on changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: inputText
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    // Delegate the actual network request to a shared helper
    await sendMessageText(userMsg.text);
  };

  // Send text to server and append AI reply or fallback
  const sendMessageText = async (text: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/security-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await response.json();

      if (!response.ok) {
        const serverMsg = data?.fallback || data?.error || data?.details || response.statusText;
        const aiReply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: serverMsg || "The assistant is temporarily unavailable. Please try again shortly."
        };
        setMessages((prev) => [...prev, aiReply]);
        return;
      }

      const aiReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: data.reply || data.fallback || "I encountered a minor network parsing issue. Rest assured, João excels in secure coding!"
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error(err);
      const errorReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "I am currently running in local offline diagnostics mode. To summarize João: He is based in Luanda, Angola, holds eJPT and Security+ credentials, designs secure APIs with Python/FastAPI, and is actively open to remote cybersecurity / engineering roles globally!"
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setLoading(false);
    }
  };

  // Retry the last user message (add it again and resend)
  const retryLastMessage = async () => {
    if (loading) return;
    const lastUser = [...messages].reverse().find((m) => m.sender === "user");
    if (!lastUser) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: lastUser.text
    };
    setMessages((prev) => [...prev, userMsg]);
    await sendMessageText(userMsg.text);
  };

  const contactLinks = [
    {
      name: "GitHub",
      value: "github.com/C0nqu14",
      url: "https://github.com/C0nqu14",
      icon: Github,
      color: "hover:text-slate-200"
    },
    {
      name: "LinkedIn",
      value: "www.linkedin.com/in/joão-conquia-6a7507239",
      url: "https://www.linkedin.com/in/joão-conquia-6a7507239",
      icon: Linkedin,
      color: "hover:text-blue-400"
    },
    {
      name: "Encrypted Email",
      value: "joaomanuelconquia@gmail.com",
      url: "mailto:joaomanuelconquia@gmail.com",
      icon: Mail,
      color: "hover:text-emerald-400"
    },
    {
      name: "Secure Signal (WhatsApp)",
      value: "+244 937 564 210",
      url: "https://wa.me/244937564210",
      icon: Phone,
      color: "hover:text-teal-400"
    }
  ];

  return (
    <section id="contact-section" className="py-24 px-4 md:px-8 max-w-6xl mx-auto z-10 relative">
      <div className="space-y-16">
        
        {/* Section Title */}
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>06 // Secure Handshake</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Establish Secure Connection
          </h2>
          <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
            I am currently open to global remote opportunities or relocation agreements. Reach out directly on secure channels or consult my digital representative daemon below.
          </p>
        </div>

        {/* Contact and Chat Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Channel links (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-xl glass-panel border-white/5 bg-white/[0.01]">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold font-display text-white">
                  Communication Channels
                </h3>
              </div>

              <div className="space-y-4">
                {contactLinks.map((link, idx) => {
                  const LinkIcon = link.icon;
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer referrerPolicy"
                      className="flex items-center gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all group"
                    >
                      <div className="p-2 rounded-md bg-white/[0.02] border border-white/5 text-slate-500 group-hover:text-blue-400 transition-all">
                        <LinkIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                          {link.name}
                        </span>
                        <span className={`text-xs font-mono text-slate-300 font-medium ${link.color} transition-colors`}>
                          {link.value}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Verification Key sign-off */}
            <div className="pt-6 border-t border-white/5 mt-8 font-mono text-[10px] text-slate-500 space-y-1 select-text">
              <div className="flex items-center gap-1.5 text-blue-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SHA-256 Verified Credentials</span>
              </div>
              <p className="font-mono text-slate-600 line-clamp-1">
                KEY_FPR: 8E3B:012F:998A:77BC:4411:FF32:00A1:993C:BB21
              </p>
            </div>
          </div>

          {/* AI Security Agent Chat Box (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 rounded-xl glass-panel border-white/5 bg-white/[0.01] relative min-h-[460px]">
            
            {/* Chat header panel */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 shrink-0">
              <div className="flex items-center gap-2.5 text-xs font-mono">
                <MessageSquare className="w-4 h-4 text-blue-400 animate-pulse" />
                <span className="text-slate-300">ConquIA</span>
              </div>
            </div>

            {/* Messages scrolling list */}
            <div className="flex-1 overflow-y-auto space-y-4 px-2 py-1 max-h-[280px] scrollbar-none font-sans text-xs sm:text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-3 border leading-relaxed select-text ${
                      msg.sender === "user"
                        ? "bg-blue-600 border-blue-500 text-white rounded-br-none"
                        : "bg-white/[0.03] border-white/5 text-slate-300 rounded-bl-none"
                    }`}
                  >
                    {msg.sender === "ai" && (
                      <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400 block mb-1">
                        ConquIA Assistant
                      </span>
                    )}
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.03] border border-white/5 text-slate-400 rounded-xl rounded-bl-none px-4 py-3 flex items-center gap-2 font-mono text-[10px]">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                    <span>CONSULTING SECURITY DATA STORES...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

              {/* Input Submission box */}
              <form onSubmit={handleSendMessage} className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask about relocation, skills, projects, eJPT..."
                  disabled={loading}
                  className="w-full bg-white/[0.02] border border-white/5 px-4 py-3 rounded-lg text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 font-sans disabled:opacity-50"
                />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={loading || !inputText.trim()}
                  className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50"
                  aria-label="Send message to assistant"
                >
                  <Send className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={retryLastMessage}
                  disabled={loading}
                  className="p-2 bg-white/[0.02] hover:bg-white/[0.04] text-slate-300 rounded-lg transition-all text-xs disabled:opacity-50"
                >
                  Retry
                </button>
              </div>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
