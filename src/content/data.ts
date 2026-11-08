import type { Locale } from "@/i18n/routing";
import projectsRaw from "./historical_projects.json";
import pt from "./historical_pt.json";
import en from "./historical_en.json";
import { enOverlay } from "./en-overlay";
import { ui, type UI } from "./ui";

export const profile = {
  name: "Victor Daniel",
  fullName: "Victor Daniel Santos Cardoso",
  email: "victordanielsnt@gmail.com",
  github: "https://github.com/keodanic",
  linkedin: "https://www.linkedin.com/in/victordaniel-dev",
  linkedinHandle: "in/victordaniel-dev",
  whatsapp: "https://wa.me/5586981509299",
  whatsappLabel: "+55 (86) 9 8150-9299",
  hackerone: "https://hackerone.com/keodanic",
  exploitsRepo: "https://github.com/keodanic/web-sec-labs-and-exploits",
  site: "https://victordaniel.dev",
  cv: { pt: "/cv/Victor_Daniel_CV_PT.pdf", en: "/cv/Victor_Daniel_CV_EN.pdf" },
} as const;

export type FilterKey = "saas" | "appsec" | "iot" | "mobile";

const filtersById: Record<string, FilterKey[]> = {
  "kronoshot-saas": ["saas", "appsec"],
  "simplifit-dumpy": ["saas", "mobile", "appsec"],
  "web-sec-labs-exploits": ["appsec"],
  "monitoring-co2-iot": ["iot", "saas"],
  "freelant-platform": ["mobile", "saas"],
  "fundacao-multirao-report": ["saas"],
};

export interface Project {
  id: string;
  index: number;
  name: string;
  short: string;
  full: string;
  category: string;
  year: string;
  color: string;
  isPrivate: boolean;
  badge: string;
  images: string[];
  previewType: "image" | "terminal";
  github: string | null;
  liveUrl: string | null;
  role: string;
  duration: string;
  teamSize: string;
  impact: { metric: string; value: string }[];
  features: string[];
  challenges: string[];
  stack: { group: string; items: string[] }[];
  tags: string[];
  metrics: string[];
  filters: FilterKey[];
}

type Raw = (typeof projectsRaw)[number];

function localizeProject(p: Raw, i: number, locale: Locale): Project {
  const o = enOverlay[p.id];
  const isEn = locale === "en";
  const stackRaw = p.techStack as Record<string, string[]>;
  const order = ["frontend", "backend", "database", "devops"] as const;
  const raw = p as Raw & { privateBadge?: string; privateBadgeEn?: string };
  return {
    id: p.id,
    index: i + 1,
    name: p.name,
    short: isEn ? p.shortDescriptionEn : p.shortDescription,
    full: isEn ? p.fullDescriptionEn : p.fullDescription,
    category: isEn ? o.category : p.category,
    year: p.year,
    color: p.color,
    isPrivate: p.isPrivate,
    badge: p.isPrivate ? (isEn ? raw.privateBadgeEn : raw.privateBadge) ?? "" : isEn ? "Open Source / GitHub" : "Open Source / GitHub",
    images: p.images,
    previewType: p.previewType as "image" | "terminal",
    github: p.github,
    liveUrl: p.liveUrl,
    role: isEn ? o.role : p.role,
    duration: isEn ? o.duration : p.duration,
    teamSize: isEn ? o.teamSize : p.teamSize,
    impact: isEn ? o.impact : p.impact,
    features: isEn ? o.features : p.features,
    challenges: isEn ? o.challenges : p.challenges,
    stack: order
      .filter((g) => stackRaw[g])
      .map((g) => ({ group: ui[locale].stackGroups[g], items: stackRaw[g] })),
    tags: p.tags,
    metrics: p.metrics,
    filters: filtersById[p.id] ?? [],
  };
}

export interface Platform {
  key: "portswigger" | "hackerone" | "tryhackme" | "hacker101";
  name: string;
  metric: string;
  count: number;
  badge: string;
  description: string;
  url: string;
}

export interface Cert {
  key: "ifma" | "bugbounty" | "sycp" | "bscp";
  name: string;
  issuer: string;
  description: string;
  skills: string[];
  status: "completed" | "inProgress" | "planned";
}

export interface Job {
  title: string;
  description: string;
  period: string;
}

export interface Portfolio {
  locale: Locale;
  ui: UI;
  projects: Project[];
  platforms: Platform[];
  certs: Cert[];
  jobs: Job[];
  heroStats: { value: string; label: string }[];
  bio: string[];
  skills: { category: string; items: string[] }[];
  cards: { title: string; description: string }[];
  education: { label: string; course: string; institution: string; period: string };
  studying: string[];
  contact: { description: string; location: string };
  radar: { label: string; count: number }[];
}

const platformMeta = {
  portswigger: { key: "portswigger", count: 45, url: "https://portswigger.net/web-security" },
  hackerone: { key: "hackerone", count: 12, url: "https://hackerone.com/keodanic" },
  tryhackme: { key: "tryhackme", count: 30, url: "https://tryhackme.com" },
  hacker101: { key: "hacker101", count: 10, url: "https://ctf.hacker101.com" },
} as const;

/** Data-derived radar: in how many of the 6 projects each capability actually appears. */
function buildRadar(raw: Raw[]): { label: string; count: number }[] {
  const text = (p: Raw) => JSON.stringify(p.techStack).concat(" ", p.technologies.join(" "));
  const sec = (p: Raw) => [...p.features, ...p.challenges].join(" ");
  const axes: [string, (p: Raw) => boolean][] = [
    ["NestJS", (p) => /nest/i.test(text(p))],
    ["Next.js", (p) => /next\.?js/i.test(text(p))],
    ["Python", (p) => /python/i.test(text(p))],
    ["AWS", (p) => /aws|s3|lambda|sqs|rekognition/i.test(text(p))],
    ["AppSec", (p) => /bola|idor|owasp|casl|rbac|csrf|lgpd|jwt|guards|hardening/i.test(sec(p) + text(p))],
  ];
  return axes.map(([label, test]) => ({ label, count: raw.filter(test).length }));
}

export function getPortfolio(locale: Locale): Portfolio {
  const d = locale === "pt" ? pt : en;
  const raw = projectsRaw as Raw[];
  const platforms: Platform[] = (["portswigger", "htb", "tryhackme", "hacker101"] as const).map((k) => {
    const p = d.SecurityLabs.platforms[k];
    const metaKey = k === "htb" ? "hackerone" : k;
    const meta = platformMeta[metaKey];
    return { key: meta.key, name: p.name, metric: p.metric, badge: p.badge, description: p.description, count: meta.count, url: meta.url };
  });
  const statusByCert = { ifma: "completed", bugbounty: "completed", sycp: "inProgress", bscp: "planned" } as const;
  const certs: Cert[] = (["ifma", "bugbounty", "sycp", "bscp"] as const).map((k) => ({
    key: k,
    ...d.Certifications.certificationsList[k],
    status: statusByCert[k],
  }));
  const s = d.Hero.stats;
  return {
    locale,
    ui: ui[locale],
    projects: raw.map((p, i) => localizeProject(p, i, locale)),
    platforms,
    certs,
    jobs: d.About.experience.items,
    heroStats: [s.yearsExperience, s.projectsDelivered, s.companies],
    bio: [d.About.bio.paragraph1, d.About.bio.paragraph2],
    skills: Object.values(d.About.skills),
    cards: Object.values(d.Hero.cards),
    education: d.About.education,
    studying: d.Certifications.currentlyStudying.items,
    contact: { description: d.Contact.description, location: d.Contact.info.location.value },
    radar: buildRadar(raw),
  };
}
