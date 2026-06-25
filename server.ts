import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Load environment variables
dotenv.config();

// Configurable model + retry settings via env
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
const GEMINI_RETRY_ATTEMPTS = parseInt(process.env.GEMINI_RETRY_ATTEMPTS || "3", 10);
const GEMINI_RETRY_BASE_DELAY = parseInt(process.env.GEMINI_RETRY_BASE_DELAY || "500", 10);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client on the server only
// Users configure this via Secrets panel, injected as GEMINI_API_KEY
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}
// Helpful runtime log so developers know whether AI features are enabled
if (ai) {
  console.log("Gemini API key detected — AI features enabled.");
} else {
  console.log("Gemini API key not found or using placeholder — running in simulated mode.");
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// Endpoint 1: Interactive Security Log Analyst
app.post("/api/analyze-log", async (req, res) => {
  try {
    const { logContent, customPrompt } = req.body;

    if (!logContent) {
      return res.status(400).json({ error: "Log content is required" });
    }

    if (!ai) {
      // Return a simulated high-quality report when API key is not configured yet
      // This ensures the application remains gorgeous and interactive in preview!
      return res.json({
        status: "simulated",
        threatLevel: "HIGH",
        threatVector: "SQL Injection (SQLi) & Privilege Escalation Attempt",
        mitreAttack: "T1190 - Exploit Public-Facing Application",
        explanation: "The log shows sequential HTTP POST requests to `/api/v1/auth/login` containing classical SQL Injection payloads (`' OR 1=1--`) inside the username field, followed immediately by administrative session cookies being issued to a non-whitelist IP address in Angola.",
        mitigationSteps: [
          "Deploy parameterized queries / prepared statements for all authentication modules.",
          "Enable strict Web Application Firewall (WAF) rule sets targeting SQL injection patterns.",
          "Revoke and rotate active administrative tokens issued during the timeframe of this log.",
          "Implement rate-limiting (maximum 5 login attempts per minute per IP address)."
        ],
        confidenceScore: 94
      });
    }

    const systemPrompt = `You are a world-class Cybersecurity Incident Response Engineer and lead SOC Analyst assisting João Manuel's portfolio visitors.
Analyze the provided security log, network packet summary, or suspicious alert.
Identify the threat vector, determine threat level (LOW, MEDIUM, HIGH, CRITICAL), map it to a MITRE ATT&CK technique, provide a clear, technical explanation, list urgent remediation/mitigation steps, and assign a confidence score (1-100).
Respond with a raw, valid JSON object matching the requested schema. Do not wrap the JSON in markdown blocks like \`\`\`json.`;

    const userPrompt = `
Analyze the following security log context:
---
${logContent}
---
Additional Context or Request: ${customPrompt || "Perform full security triage."}
`;

    // Retry wrapper to handle transient UNAVAILABLE (503) errors
    const retryWithBackoff = async (fn: () => Promise<any>, attempts = 3, baseDelay = 500) => {
      let lastErr: any = null;
      for (let i = 0; i < attempts; i++) {
        try {
          if (i > 0) console.log(`Retrying AI request (attempt ${i + 1}/${attempts})...`);
          return await fn();
        } catch (err: any) {
          lastErr = err;
          const status = err?.status || err?.error?.status || err?.error?.code;
          // If not a 503-like transient error, rethrow immediately
          if (status && status !== 503) throw err;
          const delay = baseDelay * Math.pow(2, i);
          await new Promise((r) => setTimeout(r, delay));
        }
      }
      throw lastErr;
    };

    const response = await retryWithBackoff(() => ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            threatLevel: {
              type: Type.STRING,
              description: "The assessed threat severity. Must be one of: LOW, MEDIUM, HIGH, CRITICAL."
            },
            threatVector: {
              type: Type.STRING,
              description: "The identified security threat vector (e.g., Brute Force, SQL Injection, XSS, DLL Hijacking)."
            },
            mitreAttack: {
              type: Type.STRING,
              description: "The corresponding MITRE ATT&CK technique id and name (e.g., T1190 - Exploit Public-Facing Application)."
            },
            explanation: {
              type: Type.STRING,
              description: "A professional, highly analytical, security-focused description of why this log is malicious or benign."
            },
            mitigationSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A bulleted list of 3-5 immediate remediation actions to secure the assets."
            },
            confidenceScore: {
              type: Type.INTEGER,
              description: "AI confidence score from 1 to 100."
            }
          },
          required: ["threatLevel", "threatVector", "mitreAttack", "explanation", "mitigationSteps", "confidenceScore"]
        }
      }
    }));

    const jsonText = response.text || "{}";
    const reportData = JSON.parse(jsonText.trim());

    res.json({
      status: "real",
      ...reportData
    });

  } catch (error: any) {
    console.error("Log analysis error:", error);
    res.status(500).json({
      error: "Failed to analyze log. Please try again later.",
      details: error.message
    });
  }
});

// Endpoint 2: Security Agent / Personal Recruiter Helper Chat
app.post("/api/security-chat", async (req, res) => {
  try {
    const { message, chatHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!ai) {
      // High-quality simulated response when key is missing, maintaining amazing interactive behavior
      return res.json({
        status: "simulated",
        reply: "Hi! I am João's AI Security Assistant. I'm operating in simulated mode because his Gemini API key is currently loading, but I can tell you that João specializes in designing robust backend APIs with Python/FastAPI, hardening Linux environments, and deploying security orchestration tools like Snort and custom SIEM rules. Feel free to explore the interactive Cyber Lab below, simulate an attack, or check out his ScopeScraping project!"
      });
    }

    // Prepare system instructions incorporating João Manuel's credentials
    const systemInstruction = `You are João Manuel's Personal AI Security Agent. You represent him to recruiters, engineering managers, and security officers visiting his portfolio.
Your tone is sharp, highly professional, deeply knowledgeable about cybersecurity, backend development, and Linux systems.
João Manuel is based in Angola. He is a Cybersecurity Engineer, SOC Analyst, and Backend Developer.
His tech stack:
- Cybersecurity: SOC Operations, Threat Hunting, Incident Response, Vulnerability Scanning (Nessus), Penetration Testing, OSINT, Snort, SIEM.
- Backend: Python, FastAPI, Node.js/Express, REST APIs, PostgreSQL, MySQL, Linux, Docker, Nginx.
- Certifications: eJPT (Active), CompTIA Security+ (Active), Blue Team Level 1 (BTL1 - In Progress).
Keep answers relatively concise (2-4 sentences), incredibly professional, and highlight his passion for combining secure coding with security automation. Avoid sales-pitch jargon; act like a peer security professional.`;

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: systemInstruction,
      }
    });

    // Retry transient UNAVAILABLE errors when sending a chat message
    const retryWithBackoff = async (fn: () => Promise<any>, attempts = 3, baseDelay = 500) => {
      let lastErr: any = null;
      for (let i = 0; i < attempts; i++) {
        try {
          if (i > 0) console.log(`Retrying AI chat (attempt ${i + 1}/${attempts})...`);
          return await fn();
        } catch (err: any) {
          lastErr = err;
          const status = err?.status || err?.error?.status || err?.error?.code;
          if (status && status !== 503) throw err;
          const delay = baseDelay * Math.pow(2, i);
          await new Promise((r) => setTimeout(r, delay));
        }
      }
      throw lastErr;
    };

    try {
      const response = await retryWithBackoff(() => chat.sendMessage({ message: message }), GEMINI_RETRY_ATTEMPTS, GEMINI_RETRY_BASE_DELAY);
      res.json({
        status: "real",
        reply: response.text
      });
    } catch (err: any) {
      console.error("Security chat final error after retries:", err);
      // Return a clear client-consumable response and a friendly fallback reply
      return res.status(503).json({
        status: "unavailable",
        error: "Model currently unavailable due to high demand. Please try again later.",
        fallback: "I'm temporarily unable to generate a live reply. João is a Security Engineer (eJPT, Security+) experienced with FastAPI, Linux hardening, and SOC operations. Please try again shortly."
      });
    }

  } catch (error: any) {
    console.error("Security chat error:", error);
    res.status(500).json({
      error: "Failed to process security query.",
      details: error.message
    });
  }
});

// -------------------------------------------------------------
// Vite Dev Server Integration & SPA Fallback
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving compiled production files from dist/.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`João Manuel Portfolio Server listening on port ${PORT}`);
  });
}

startServer();
