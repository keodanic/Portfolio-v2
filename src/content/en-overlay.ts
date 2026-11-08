// English copy for the project fields that historical_projects.json only carries in Portuguese.
// Names, short/full descriptions and private badges already have *En fields in the JSON.

export interface ProjectOverlay {
  category: string;
  role: string;
  duration: string;
  teamSize: string;
  impact: { metric: string; value: string }[];
  features: string[];
  challenges: string[];
}

export const enOverlay: Record<string, ProjectOverlay> = {
  "kronoshot-saas": {
    category: "SaaS & Backend Architecture",
    role: "Lead Full-Stack & AppSec Engineer — monorepo architecture, BullMQ async workers, Sharp/Rekognition pipeline, anti-IDOR protection and cent-precise financial split.",
    duration: "2026",
    teamSize: "Commercial case",
    impact: [
      { metric: "LGPD biometrics", value: "RAM-Only" },
      { metric: "Processing", value: "BullMQ + Sharp" },
      { metric: "Storage", value: "Dual S3 Bucket" },
    ],
    features: [
      "pnpm monorepo with NestJS 11 (REST API + dedicated BullMQ worker) and Next.js 15 App Router",
      "Selfie face search processed 100% in RAM (LGPD-compliant) plus bib-number OCR",
      "Async pipeline with Sharp generating thumbnails and previews with an anti-piracy SVG watermark",
      "Two isolated S3/R2 buckets (public for previews, private for originals behind Presigned URLs)",
      "Strict BOLA/IDOR prevention, Zod/class-validator validation and money stored as integer cents",
    ],
    challenges: [
      "Guarantee that high-resolution originals are never exposed before the Pix webhook confirms payment",
      "Process massive photo batches in the background with BullMQ and Redis without blocking the API event loop",
      "Implement deterministic progressive discounts and commission split in basis points",
    ],
  },
  "simplifit-dumpy": {
    category: "Full-Stack, Mobile & Cloud",
    role: "Full-Stack & Mobile Engineer — NestJS API architecture, OWASP security (JWT, CASL ABAC, rate limiting), AWS serverless queues + OpenAI, and React Native / Next.js apps.",
    duration: "6 months",
    teamSize: "3 developers",
    impact: [
      { metric: "Gyms integrated", value: "12" },
      { metric: "Monthly active users", value: "8k+" },
      { metric: "Messages per day", value: "20k+" },
    ],
    features: [
      "Modular RESTful APIs in NestJS + TypeScript + Prisma ORM with CASL access control (ABAC/RBAC)",
      "AI-personalized workouts (OpenAI) processed through AWS Lambda, SQS queues and S3",
      "Cross-platform mobile apps (iOS/Android) in React Native (Expo) and Next.js web dashboards",
      "Fitness social feed, weekly ranking and real-time chat between members, trainers and nutritionists",
      "Automatic Audit Log trail for critical database write operations",
    ],
    challenges: [
      "Prevent BOLA/IDOR and Mass Assignment on multi-tenant routes for members, diets and workouts",
      "Orchestrate OpenAI calls in the background through AWS SQS + Lambda to avoid HTTP timeouts",
      "Keep real-time state in sync between the React Native app and the web admin dashboard",
    ],
  },
  "web-sec-labs-exploits": {
    category: "Offensive Security & AppSec",
    role: "Offensive Security Researcher & AppSec Engineer — automated Python exploits, technical write-ups and secure-coding patterns.",
    duration: "Ongoing",
    teamSize: "Solo",
    impact: [
      { metric: "Main focus", value: "OWASP Top 10" },
      { metric: "PoC automation", value: "Python 3" },
      { metric: "Methodology", value: "Red + Blue Team" },
    ],
    features: [
      "Automated exploitation of business logic flaws with regex extraction of anti-CSRF tokens",
      "PoCs for Account Takeover, Broken Object Level Authorization (BOLA/IDOR) and Mass Assignment",
      "Remediation playbooks showing vulnerable vs. hardened code in NestJS + Prisma",
      "Recon pipelines, subdomain enumeration and fuzzing with Nuclei, FFUF and Nmap",
    ],
    challenges: [
      "Chain dozens of HTTP requests while keeping session state and refreshing CSRF tokens dynamically",
      "Spot race conditions and logic flaws that DAST scanners cannot see",
      "Translate every offensive vector into regression tests and backend authorization policies",
    ],
  },
  "monitoring-co2-iot": {
    category: "IoT & Backend Engineering",
    role: "FAPEMA Research Fellow & Full-Stack/IoT Developer — C++ firmware on ESP32, RESTful API in NestJS and Next.js dashboard.",
    duration: "9 months (Nov 2024 – Jul 2025)",
    teamSize: "FAPEMA / IFMA research",
    impact: [
      { metric: "Telemetry", value: "Real-Time" },
      { metric: "Hardware", value: "ESP32 + ENS160" },
      { metric: "Funding", value: "FAPEMA / IFMA" },
    ],
    features: [
      "Embedded C++ collection on an ESP32 microcontroller paired with the ENS160 digital gas sensor",
      "Time-series ingestion and validation through a RESTful API in NestJS + Prisma ORM + PostgreSQL",
      "Next.js dashboard with automatic air-quality classification and weekly charts",
      "Per-room history (Library, Cafeteria, Classrooms) with PDF report export",
    ],
    challenges: [
      "Calibrate ENS160 readings and handle automatic network reconnection in the ESP32 firmware",
      "Optimize aggregate time-series queries in PostgreSQL for fast rendering",
      "Standardize Docker deployment for continuous operation at the CapivaraLab (IFMA)",
    ],
  },
  "freelant-platform": {
    category: "Full-Stack & Mobile",
    role: "Author & Full-Stack/Mobile Engineer — NestJS API architecture, WebSockets, PostgreSQL modeling and the React Native app.",
    duration: "8 months",
    teamSize: "Solo (IFMA capstone)",
    impact: [
      { metric: "Market validation", value: "83.3%" },
      { metric: "Communication", value: "Socket.IO" },
      { metric: "Academic grade", value: "Top grade" },
    ],
    features: [
      "RESTful NestJS API with JWT authentication, role-based Guards and Swagger documentation",
      "Bidirectional instant messaging between clients and providers over Socket.IO",
      "React Native app with Expo Router, NativeWind and dedicated Client and Freelancer flows",
      "Full service-order cycle: request, accept/decline, completion and mutual review",
    ],
    challenges: [
      "Sync WebSocket events for new messages and order status in real time on mobile",
      "Guarantee permission isolation between Client and Provider profiles across API routes",
      "Model PostgreSQL relations and indexes for fast filtering by specialty",
    ],
  },
  "fundacao-multirao-report": {
    category: "Web Systems & FinTech Tools",
    role: "Full-Stack Developer — Next.js interfaces, PDF/Excel document generation and NestJS API integration.",
    duration: "4 months",
    teamSize: "2 developers",
    impact: [
      { metric: "Batch export", value: "PDF & Excel" },
      { metric: "Hedge calculation", value: "Real-Time" },
      { metric: "Status", value: "In Production" },
    ],
    features: [
      "Quick registration and filtering of medical campaigns by state, city, period, doctor and specialty",
      "Automated official reports in PDF and Excel spreadsheets for accountability",
      "Dynamic arbitrage engine (SurebetCalc) with proportional stake distribution and scenarios",
    ],
    challenges: [
      "Lay out long patient tables in paginated PDFs without losing layout",
      "Optimize the fast-typing flow (keyboard shortcuts) during on-site care at the campaigns",
    ],
  },
};
