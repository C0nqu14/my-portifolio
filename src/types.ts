export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'cybersecurity' | 'backend' | 'fullstack';
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  caseStudy: {
    problem: string;
    solution: string;
    architecture: string[];
    challenges: string[];
    results: string[];
  };
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: {
    name: string;
    level: number; // 1-100
    description: string;
  }[];
}

export interface TimelineEvent {
  year: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
  type: 'security' | 'development' | 'education';
}

export interface Certification {
  name: string;
  issuer: string;
  status: 'active' | 'in-progress' | 'planned';
  code?: string;
  url?: string;
  date?: string;
}

export const SKILL_DATA: SkillCategory[] = [
  {
    title: "Cybersecurity & Defenses",
    icon: "ShieldAlert",
    skills: [
      { name: "SOC Operations", level: 90, description: "Real-time threat monitoring, alert triage, incident detection, and log collection orchestration." },
      { name: "Threat Hunting", level: 85, description: "Proactive hypothesis-driven hunting using Sysmon logs, Event Viewer, and advanced KQL/SIEM rules." },
      { name: "Incident Response", level: 88, description: "Containment strategies, playbook execution, digital forensics, and root cause analysis." },
      { name: "Vulnerability Assessment", level: 85, description: "Scanning, evaluating, and prioritizing risk metrics using tools like Nessus and OpenVAS." },
      { name: "Penetration Testing", level: 80, description: "Network exploitation, web application security auditing, and privilege escalation simulation." },
      { name: "OSINT & Reconnaissance", level: 92, description: "Passive mapping of attack surfaces, asset discovery, and credential leak discovery." },
      { name: "Security Automation (SOAR)", level: 88, description: "Creating automated response workflows with custom scripts and serverless integrations." },
      { name: "Network Security", level: 85, description: "Packet analysis (Wireshark), firewall rule drafting, and secure network topology engineering." }
    ]
  },
  {
    title: "Backend Engineering",
    icon: "Cpu",
    skills: [
      { name: "Python", level: 92, description: "Highly efficient systems scripts, data scrapers, automation tools, and secure web servers." },
      { name: "FastAPI", level: 90, description: "High-performance, type-safe REST APIs with automatic OpenAPI schema generation and OAuth2 integration." },
      { name: "Node.js & Express", level: 88, description: "Asynchronous backend microservices, real-time gateways, and secure proxy integrations." },
      { name: "PostgreSQL & MySQL", level: 85, description: "Relational database schema optimization, indexing strategies, and secure prepared statements." },
      { name: "Django & Flask", level: 82, description: "Rapid web development with robust built-in ORMs, security middlewares, and admin dashboards." },
      { name: "REST APIs & Webhooks", level: 95, description: "Designing secure, modular API systems with rate-limiting, CORS control, and cryptographically verified webhooks." }
    ]
  },
  {
    title: "Infrastructure & Orchestration",
    icon: "Server",
    skills: [
      { name: "Linux System Administration", level: 90, description: "Hardening system configurations, kernel fine-tuning, systemd service management, and cron job automation." },
      { name: "Docker & Containers", level: 88, description: "Drafting minimalist secure Dockerfiles, containerizing microservices, and multi-container composition." },
      { name: "Nginx & Reverse Proxies", level: 86, description: "Load balancing, SSL/TLS termination, custom header injection, and rate limiting rules." },
      { name: "Cloud Platforms", level: 80, description: "Deploying secure, isolated infrastructure instances with strict VPC guidelines and Identity Access Management (IAM)." }
    ]
  },
  {
    title: "AI & Cybersecurity Integration",
    icon: "Brain",
    skills: [
      { name: "AI Automation", level: 85, description: "Leveraging Large Language Models to automate security alert triaging, log parsing, and report writing." },
      { name: "LLM Security / OWASP Top 10", level: 82, description: "Auditing LLM implementations for prompt injection, insecure output handling, and training data poisoning." },
      { name: "Prompt Engineering", level: 90, description: "Formulating highly structured, deterministic prompts for zero-shot threat analysis and extraction." }
    ]
  }
];

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    year: "2025",
    role: "SOC Analyst & Backend Security Developer",
    company: "EvoTec",
    description: "Developing automated threat detection playbooks and deploying security orchestration workflows. Monitoring critical backend infrastructure, conducting threat hunts, and leading secure code reviews.",
    highlights: [
      "Built an automated security log analysis pipeline reducing incident response triage time by 40%.",
      "Conducted 15+ mock penetration tests and secure code audits on financial APIs.",
      "Successfully integrated LLM endpoints to automate security reporting of daily system vulnerabilities."
    ],
    type: "security"
  },
  {
    year: "2023 - 2025",
    role: "Backend Software Engineer",
    company: "Flix Home",
    description: "Led backend engineering for scalable, microservices-driven architectures. Designed robust REST APIs and optimized relational database query latency for cloud systems.",
    highlights: [
      "Architected a financial transaction ledger with a high level of database transaction isolation and audit logging.",
      "Configured robust Linux-based Nginx reverse proxies with DDoS mitigation rate limits.",
      "Engineered high-performance background worker tasks utilizing Python and background queuing."
    ],
    type: "development"
  },
  {
    year: "2021 - 2023",
    role: "Full Stack Developer & SysAdmin Intern",
    company: "2B Digital",
    description: "Configured Linux servers, automated system maintenance scripts, and designed custom internal web applications to streamline system operations.",
    highlights: [
      "Automated Linux server backup schedules, slashing service disruption risks to zero.",
      "Wrote Python/Bash system scripts to monitor disk usage and daemon logs, feeding into a simple alerting panel.",
      "Created highly modular administration web screens using React and Node.js."
    ],
    type: "education"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "eLearnSecurity Junior Penetration Tester (eJPT)",
    issuer: "INE Security",
    status: "active",
    date: "2025",
    code: "INE-EJPT-9821"
  },
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    status: "active",
    date: "2024",
    code: "COMP-SEC-77192"
  },
  {
    name: "Blue Team Level 1 (BTL1)",
    issuer: "Security Blue Team",
    status: "in-progress"
  },
  {
    name: "Practical Network Penetration Tester (PNPT)",
    issuer: "TCM Security",
    status: "planned"
  },
  {
    name: "Certified Information Systems Security Professional (CISSP)",
    issuer: "ISC2",
    status: "planned"
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "scopescraping",
    title: "ScopeScraping",
    subtitle: "Cybersecurity Reconnaissance & Asset Surface Monitor",
    description: "An automated threat intelligence platform monitoring HackerOne program scopes, discovering subdomains, enumerating network assets, and recording historical URLs to detect shadow IT and orphaned resources.",
    category: "cybersecurity",
    tags: ["Python", "FastAPI", "PostgreSQL", "Docker", "OSINT", "Recon"],
    githubUrl: "https://github.com/C0nqu14/scopescraping",
    caseStudy: {
      problem: "Securing modern enterprise networks requires continuous visibility over a shifting surface. Manual asset enumeration is slow and fails to detect freshly spun up developer servers or orphaned subdomains, which become ripe targets for subdomain takeover or unauthorized API access.",
      solution: "ScopeScraping automates this entirely. It connects to HackerOne's structured program feeds, parses valid scope lists, and feeds them into automated pipelines. These pipelines trigger parallel subdomain discoveries, perform passive DNS queries, check port configurations, grab HTTP banners, and scrape historical archive endpoints.",
      architecture: [
        "Python background workers running asynchronous scraping workflows",
        "FastAPI control plane serving asset records and exposing real-time change events via WebSockets",
        "PostgreSQL DB with specialized schema for tracking asset histories and IP subnet distributions",
        "Minimal Dockerized structure for rapid deployment inside cloud VPC configurations"
      ],
      challenges: [
        "Handling massive volumes of subdomain requests without triggering rate-limiting blocklists or alert sirens on third-party security feeds.",
        "Deduplicating historic web archive records containing millions of redundant URLs."
      ],
      results: [
        "Discovered 14 critical orphaned subdomains pointing to forgotten staging assets during deployment tests.",
        "Aggregates scope metrics for over 50 enterprise bug bounty programs, updating assets in under 15 minutes.",
        "Improved reconnaissance speed by 10x compared to standard sequential security tooling."
      ]
    }
  },
  {
    id: "bugquia",
    title: "BugQuia",
    subtitle: "Vulnerability Management & PenTesting Report Engine",
    description: "A collaborative penetration testing hub and vulnerability tracking portal. Designed for engineering groups to upload threat reports, verify security patches, and maintain system compliance.",
    category: "cybersecurity",
    tags: ["React", "Node.js", "Express", "MongoDB", "Auth", "Compliance"],
    githubUrl: "https://github.com/C0nqu14/bugquia",
    caseStudy: {
      problem: "Penetration testers typically produce PDF reports. Engineers struggle to translate these flat documents into actionable developer tickets. This communication gap delays fixes and leaves key systems exposed to vulnerabilities for longer.",
      solution: "BugQuia transforms PDF reports into active, queryable vulnerabilities. It parses findings into interactive task items with security severity ratings (CVSS v3), tracks remediation timelines, and notifies stakeholders automatically.",
      architecture: [
        "Vulnerability API parsing structures for standardized threat categorization",
        "Interactive dashboard displaying critical security SLAs (Service Level Agreements) and patch aging statistics",
        "Cryptographically signed report generation module for formal compliance auditing"
      ],
      challenges: [
        "Creating a simple and secure file parsing system that correctly reads various penetration test formats without exposing the backend to XML External Entity (XXE) or payload execution risks."
      ],
      results: [
        "Reduced security flaw remediation cycles by 35% across integrated dev teams.",
        "Successfully tracks and visualizes over 400 vulnerability records, keeping teams focused on critical high-priority items."
      ]
    }
  },
  {
    id: "plusmoney",
    title: "PlusMoney",
    subtitle: "Highly Secure Financial Technology Ledger & API Portal",
    description: "A secure, resilient financial ledger API and portal ensuring transactional integrity, audit trails, secure vault authorization, and automated double-entry compliance.",
    category: "fullstack",
    tags: ["TypeScript", "React", "Python", "Flask", "MySQL", "Cryptography"],
    githubUrl: "https://github.com/C0nqu14/plusmoney",
    caseStudy: {
      problem: "Financial ledgers must absolutely guarantee database integrity. Any potential race condition or ledger alteration can cause severe financial imbalance or audit failures, especially under high concurrent request volumes.",
      solution: "PlusMoney implements strict database locking mechanisms, double-entry ledgers, and tamper-evident audit trails. Every transaction requires cryptographic signatures and goes through a state machine that validates funds before execution.",
      architecture: [
        "Secure micro-service database isolation running in private subnets with strict security groups",
        "Double-entry bookkeeping validation engine that guarantees absolute consistency",
        "Audit trail logger mapping transactions to persistent tamper-resistant data blocks"
      ],
      challenges: [
        "Maintaining fast transaction times while adhering to high ACID database compliance and thread-safe operations in multi-container setups."
      ],
      results: [
        "Maintained 100% transactional consistency across more than 500,000 simulated high-concurrency ledger operations.",
        "Automated compliance checks completed instantly, slashing standard financial audit times."
      ]
    }
  },
  {
    id: "lionsec-projects",
    title: "LionSec Projects",
    subtitle: "Dedicated Security Operations Center & Active Lab Work",
    description: "A comprehensive platform mapping Blue Team Operations, custom SIEM rules, automated Snort rule generation, and network security topologies.",
    category: "cybersecurity",
    tags: ["Linux", "SIEM", "Splunk", "Snort Rules", "Detection Engineering"],
    githubUrl: "https://github.com/C0nqu14/lionsec",
    caseStudy: {
      problem: "Incident response teams are constantly flooded with noise from false positives. Sifting through millions of events manually leads to fatigue and leaves critical attacks unnoticed in the background noise.",
      solution: "LionSec Projects serves as an operational blueprint. It defines detection engineering templates, parses core logs using standardized formats, and optimizes alert-to-incident ratios with specialized behavioral rules rather than relying solely on static hashes.",
      architecture: [
        "Detection rules engine focusing on MITRE ATT&CK techniques",
        "Automated script generating Snort/Suricata rules on the fly from suspicious active behaviors",
        "Interactive incident playbook visualizer illustrating precise triage workflows"
      ],
      challenges: [
        "Balancing rule specificity to detect advanced lateral movement attacks without flooding security feeds with standard network system traffic."
      ],
      results: [
        "Cut security team response latency to zero for high-severity credential scraping attempts.",
        "Standardized alerts map directly to 20+ MITRE ATT&CK techniques, offering immediate context to analysts."
      ]
    }
  },
  {
    id: "software-eng",
    title: "Software Engineering Core",
    subtitle: "Collection of Backend Engines & High Performance Scripts",
    description: "A suite of backend microservices, real-time message relays, custom caching systems, and high-performance server configurations.",
    category: "backend",
    tags: ["Node.js", "Python", "FastAPI", "Nginx", "Redis", "WebSockets"],
    githubUrl: "https://github.com/C0nqu14/software-core",
    caseStudy: {
      problem: "Modern microservice infrastructures suffer from excessive communication overhead, high memory footprints, and slow websocket message broadcasting at scale.",
      solution: "A curated collection of highly optimized backend engines focusing on resource efficiency. Features customized connection-pooling, memory-friendly stream processing, and multi-threaded script executors.",
      architecture: [
        "Asynchronous task loops with Redis cache buffers",
        "Reverse proxy configurations optimizing gzip compressions and static asset serving rates",
        "Type-safe data validators enforcing schema integrity instantly"
      ],
      challenges: [
        "Managing socket handshakes safely, resolving CORS policies elegantly, and avoiding memory leak issues over millions of active connection hours."
      ],
      results: [
        "Dramatically reduced backend server memory utilization by 40%.",
        "Handled 5,000 concurrent websocket connections smoothly on single-core setups."
      ]
    }
  }
];
