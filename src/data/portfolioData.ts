// VERBATIM SOURCE OF TRUTH — Section 7 of the build brief.
// Only verified facts. No invented metrics, testimonials, awards, or
// years of experience. Freelancing started January 2026.
// No phone number, no home/hostel address, no exact date of birth.
// No Argon trading bot. No Verity red-team findings.

export const BASICS = {
  name: "Dhyey Patel",
  age: 19,
  location: "Bhopal, Madhya Pradesh, India",
  education: "B.Tech Computer Science Engineering, VIT Bhopal (2025–2029)",
  role: "Editor, GSoC Innovators Club at VIT Bhopal",
  headline:
    "Founder @ Auditify | DopaDiary in Production | B.Tech CSE Student at VIT Bhopal",
} as const;

export const LINKS = {
  linkedin: "https://www.linkedin.com/in/dhyeypatel-work",
  github: "https://github.com/DhyeyPatel007",
  agency: "https://krynex.in",
  email: "dhyeypatel.work@gmail.com",
} as const;

export const EXPERIENCE = [
  {
    period: "Sep 2026 – Present",
    role: "Founder & Developer, Auditify",
    detail:
      "Free 36-check website audit engine, PDF reports, site monitoring, agency white-label",
  },
  {
    period: "Jan 2026 – Present",
    role: "Freelance Developer",
    detail: "Full-stack web, mobile MVPs, client architecture",
  },
  {
    period: "2025 – 2029",
    role: "B.Tech Computer Science Engineering, VIT Bhopal",
    detail: "Expected graduation June 2029",
  },
] as const;

export type Project = {
  id: string;
  index: string;
  name: string;
  url: string | null;
  urlLabel: string;
  tagline: string;
  description: string;
  accent: string;
  act: "I" | "II" | "III" | "IV";
  badge?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "auditify",
    index: "01",
    name: "Auditify",
    url: "https://auditify.krynex.in",
    urlLabel: "auditify.krynex.in",
    tagline: "Free website audit tool",
    description:
      "36 checks, 0–100 report-card score, full PDF reports, site monitoring, agency white-label. Free for everyone.",
    accent: "#FF3300",
    act: "I",
  },
  {
    id: "dopadiary",
    index: "02",
    name: "DopaDiary",
    url: "https://dopadiary.vercel.app",
    urlLabel: "dopadiary.vercel.app",
    tagline: "Parkinson's symptom tracking",
    description:
      "Four trained engines (spiral drawing, voice, tapping, tremor), levodopa dose clock, doctor portal, works offline as a PWA.",
    accent: "#00A86B",
    act: "I",
  },
  {
    id: "phalanx",
    index: "03",
    name: "PHALANX",
    url: "https://phalanx.krynex.in",
    urlLabel: "phalanx.krynex.in",
    tagline: "Autonomous PayPal dispute-defense swarm",
    description:
      "Deterministic evidence scoring, 3-juror deliberation, human approval gate before any action. Proven live on real PayPal Sandbox disputes.",
    accent: "#0A0A0A",
    act: "I",
  },
  {
    id: "gillnet",
    index: "04",
    name: "GillNet",
    url: "https://gillnet-project.vercel.app",
    urlLabel: "gillnet-project.vercel.app",
    tagline: "Phishing and malware detection",
    description:
      "Heuristic/rule-based engine (not trained ML). URL detection ~99% and text detection ~98% accuracy on test sets. Includes autopsy analysis of suspicious links and files.",
    accent: "#D91E36",
    act: "II",
  },
  {
    id: "datum",
    index: "05",
    name: "DATUM",
    url: "https://datum-a7iq.onrender.com",
    urlLabel: "datum-a7iq.onrender.com",
    tagline: "Clean web UI over sqlmap",
    description:
      "Clean web UI over sqlmap for SQL injection testing. CLI-vs-DATUM parity 100% (7/7) in benchmarks.",
    accent: "#D91E36",
    act: "II",
    badge: "PASSWORD-GATED",
  },
  {
    id: "bharatraksha",
    index: "06",
    name: "BharatRaksha",
    url: "https://bharatraksha.krynex.in",
    urlLabel: "bharatraksha.krynex.in",
    tagline: "Autonomous support agent for Indian online sellers",
    description:
      "Telegram intake, Razorpay + Shiprocket tracking. AgentX 2026 Top 100.",
    accent: "#D9822B",
    act: "II",
    badge: "AGENTX 2026 TOP 100",
  },
  {
    id: "vajra",
    index: "07",
    name: "Vajra",
    url: "https://vajra.krynex.in",
    urlLabel: "vajra.krynex.in",
    tagline: "WebGPU kernel tuner",
    description:
      "Tests GPU kernel variants in the browser and keeps only the correct fast ones. Built for the Nebius x NVIDIA hackathon.",
    accent: "#C6F10E",
    act: "III",
  },
  {
    id: "specballoon",
    index: "08",
    name: "SpecBalloon",
    url: "https://spec-balloon.vercel.app",
    urlLabel: "spec-balloon.vercel.app",
    tagline: "AI reads 2D CAD drawings",
    description:
      "AI reads 2D CAD drawings and auto-balloons dimensions and GD&T callouts into AS9102/PPAP Excel sheets for CNC and auto shops.",
    accent: "#0047FF",
    act: "III",
  },
  {
    id: "evenly",
    index: "09",
    name: "Evenly",
    url: null,
    urlLabel: "Android APK & iOS PWA // No App-Store Listing Yet",
    tagline: "Expense-splitting app (Expo + Supabase)",
    description:
      "Paise-perfect splits, smart settle-up, UPI payment chooser. Android APK and iOS PWA, no app-store listing yet.",
    accent: "#00A86B",
    act: "IV",
  },
  {
    id: "krynex",
    index: "10",
    name: "Krynex",
    url: "https://krynex.in",
    urlLabel: "krynex.in",
    tagline: "His audit agency",
    description: "Figma-first, premium typography.",
    accent: "#0A0A0A",
    act: "IV",
  },
  {
    id: "amitarasa",
    index: "11",
    name: "Amita Rasa Resort",
    url: "https://amitarasa.vercel.app",
    urlLabel: "amitarasa.vercel.app",
    tagline: "Client website · $150 project · July 2026",
    description:
      "Premium resort site: story in five chapters, experiences, guest journey, gallery, booking.",
    accent: "#D9822B",
    act: "IV",
    badge: "Client Website · $150 Project · July 2026",
  },
  {
    id: "paperfellows",
    index: "12",
    name: "PaperFellows",
    url: null,
    urlLabel: "Client Project · Fiverr Portfolio Piece",
    tagline: "Client project",
    description: "Client project (Fiverr portfolio piece).",
    accent: "#0A0A0A",
    act: "IV",
    badge: "Client Project · Fiverr Portfolio Piece",
  },
];

export const MVP = {
  promise:
    "I build your mobile app MVP in 14 days, fixed price, you own the code.",
  timeline: [
    { day: "01–02", phase: "Figma Architecture", note: "Flows, screens, design system" },
    { day: "03–06", phase: "Expo / FastAPI Core", note: "App shell, API, core features" },
    { day: "07–10", phase: "Supabase / Auth", note: "Data, auth, payments wiring" },
    { day: "11–12", phase: "Polish & Test", note: "Real-device pass, fixes" },
    { day: "13–14", phase: "Production APK / PWA Handover", note: "Builds, docs, code handover" },
  ],
  tiers: [
    {
      id: "founding",
      name: "Founding-Client",
      price: 1200,
      upfront: 600,
      note: "Founding-client price for the first 3",
      terms: "50% upfront",
    },
    {
      id: "sprint",
      name: "Sprint",
      price: 1900,
      upfront: 950,
      note: "Fixed price · 14-day delivery · 100% code ownership",
      terms: "50% upfront",
    },
    {
      id: "plus",
      name: "Plus",
      price: 3200,
      upfront: 1600,
      note: "Extended scope · Fixed price · 100% code ownership",
      terms: "50% upfront",
    },
  ],
} as const;

export const SKILL_GROUPS = [
  {
    group: "Languages & Core",
    items: ["JavaScript", "TypeScript", "React", "React Native / Expo", "Python / FastAPI", "HTML", "CSS"],
  },
  {
    group: "AI & LLM Engineering",
    items: ["Gemini", "Nemotron", "Agent Design", "Prompt Engineering"],
  },
  { group: "Compute & Graphics", items: ["WebGPU / WGSL GPU Kernel Tuning"] },
  { group: "Data & Infra", items: ["Firebase", "Supabase", "Git", "GitHub"] },
  { group: "Design", items: ["Figma UI/UX"] },
  {
    group: "Security & Red-Teaming",
    items: ["sqlmap", "Vulnerability Research", "Prompt-Injection Red-Teaming"],
  },
] as const;

export const ACADEMICS = [
  { subject: "EVS", score: 92.2 },
  { subject: "MPMC", score: 88.9 },
  { subject: "CAO", score: 86.15 },
  { subject: "C++", score: 81.2 },
] as const;

export const NPTEL = {
  course: "NPTEL Computer Networks",
  score: 76,
  note: "Passed · E-Certificate",
} as const;

export const INTERESTS = [
  "Building products where AI is the hard core, not a wrapper",
  "Hackathons, motion graphics and 3D explainers",
  "Bug bounty and AI security (LLM safety, prompt injection)",
  "Solo Leveling-style power-fantasy anime",
] as const;
