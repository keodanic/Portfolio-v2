"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ProjectModal } from "@/components/modals/project-modal";
import {
  ArrowUpRight,
  Lock,
  Github,
  ExternalLink,
  Terminal,
  ShieldCheck,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

import projectsData from "@/data/projects.json";

gsap.registerPlugin(ScrollTrigger);

export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  shortDescriptionEn?: string;
  fullDescription: string;
  fullDescriptionEn?: string;
  technologies: string[];
  tags: string[];
  metrics?: string[];
  features: string[];
  images: string[];
  hasImages: boolean;
  previewType?: "image" | "terminal";
  github: string | null;
  isPrivate: boolean;
  privateBadge?: string;
  privateBadgeEn?: string;
  color: string;
  year: string;
  category: string;
  categoryEn?: string;
  role?: string;
  duration?: string;
  teamSize?: string;
  impact?: {
    metric: string;
    value: string;
  }[];
  challenges?: string[];
  techStack?: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    devops?: string[];
  };
  liveUrl?: string;
}

const _raw = (projectsData as unknown as { default?: { projects?: Project[] }; projects?: Project[] })?.default ?? projectsData;
const allProjects: Project[] = Array.isArray(_raw)
  ? (_raw as Project[])
  : Array.isArray((_raw as { projects?: Project[] })?.projects)
  ? ((_raw as { projects: Project[] }).projects)
  : [];

export function TerminalPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative w-full h-full bg-[#09090b] flex flex-col justify-between p-4 sm:p-5 font-mono text-[11px] sm:text-xs select-none overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute -top-12 -right-12 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-[#0066ff]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top terminal bar */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-2 text-zinc-400 text-[11px] flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-emerald-400" />
              exploit_bola_poc.py — zsh
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
            PoC Verified
          </span>
        </div>

        {/* Terminal output */}
        <div className="space-y-1.5 text-zinc-300 leading-relaxed">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="text-emerald-400">❯</span>
            <span>python3 exploit_infinite_money.py --target portswigger-lab</span>
          </div>
          <div className="text-zinc-500">
            [+] Extracting anti-CSRF token via regex... <span className="text-emerald-400">OK (200)</span>
          </div>
          <div className="text-zinc-500">
            [+] Automating gift-card redemption loop (x42)...
          </div>
          <div className="text-amber-300/90">
            [!] Business Logic Flaw exploited: Balance $100.00 → $1,340.00
          </div>
        </div>
      </div>

      {/* Bottom remediation snippet */}
      {!compact && (
        <div className="mt-3 pt-3 border-t border-zinc-800/80 bg-zinc-900/50 -mx-4 sm:-mx-5 -mb-4 sm:-mb-5 p-3 sm:p-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] uppercase tracking-wider text-[#0066ff] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Blue Team Patch (NestJS + Prisma)
            </span>
            <span className="text-[10px] text-zinc-500">orders.service.ts</span>
          </div>
          <pre className="text-[10px] sm:text-[11px] text-zinc-300 overflow-x-auto leading-snug">
            <code>
              <span className="text-purple-400">await</span> prisma.<span className="text-blue-400">$transaction</span>(<span className="text-purple-400">async</span> (tx) =&gt; {"{"}{"\n"}
              {"  "}<span className="text-purple-400">const</span> coupon = <span className="text-purple-400">await</span> tx.coupon.<span className="text-blue-400">updateMany</span>({"{"}{"\n"}
              {"    "}where: {"{"} code, redeemedAt: <span className="text-amber-400">null</span>, userId: user.sub {"}"}{"\n"}
              {"  "}{"}"});{"\n"}
              {"}"});
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}

export function FeaturedWork() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const t = useTranslations("FeaturedWork");
  const locale = useLocale();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      projectRefs.current.forEach((project, index) => {
        if (!project) return;

        gsap.fromTo(
          project,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            delay: (index % 2) * 0.08,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div ref={headerRef} className="mb-14 sm:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <span className="font-mono text-[#0066ff] text-xs tracking-widest uppercase mb-3 block">
                {t("sectionTag")}
              </span>
              <h2 className="font-[family-name:var(--font-cabinet)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.08]">
                {t("title")}
              </h2>
            </div>
            <p className="text-zinc-400 text-sm sm:text-base max-w-md leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* Curated Projects Grid (2 columns on desktop for scannable Linear/Vercel look) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {allProjects.map((project, index) => {
              const description =
                locale === "en" && project.shortDescriptionEn
                  ? project.shortDescriptionEn
                  : project.shortDescription;
              const category =
                locale === "en" && project.categoryEn
                  ? project.categoryEn
                  : project.category;
              const privateBadgeText =
                locale === "en"
                  ? project.privateBadgeEn || t("privateBadge")
                  : project.privateBadge || t("privateBadge");

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    projectRefs.current[index] = el;
                  }}
                  className="h-full"
                >
                  <GlassCard
                    variant="default"
                    className="group cursor-pointer h-full flex flex-col overflow-hidden border-zinc-800/80 bg-zinc-950/80 hover:border-zinc-700/90 transition-all duration-300"
                    hover
                    onClick={() => openProject(project)}
                  >
                    {/* Top Visual Frame (16:10 aspect ratio with real screenshot or terminal preview) */}
                    <div className="p-3 sm:p-4 pb-0">
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-zinc-800/80 bg-zinc-900/90 shadow-inner">
                        {project.hasImages && project.images?.[0] ? (
                          <>
                            {/* Window chrome bar */}
                            <div className="absolute top-0 inset-x-0 h-7 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 z-10 flex items-center justify-between px-3">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-zinc-700" />
                                <span className="w-2 h-2 rounded-full bg-zinc-700" />
                                <span className="w-2 h-2 rounded-full bg-zinc-700" />
                              </div>
                              <span className="font-mono text-[10px] text-zinc-400 truncate max-w-[200px]">
                                {project.liveUrl
                                  ? project.liveUrl.replace(/^https?:\/\//, "")
                                  : `${project.id}.internal`}
                              </span>
                              <span className="font-mono text-[10px] text-zinc-500">
                                {project.year}
                              </span>
                            </div>

                            {/* Real Screenshot with next/image */}
                            <div className="relative w-full h-full pt-7">
                              <Image
                                src={project.images[0]}
                                alt={project.name}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                                priority={index < 2}
                              />
                            </div>
                          </>
                        ) : (
                          <TerminalPreview />
                        )}

                        {/* Subtle bottom gradient for contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
                      </div>
                    </div>

                    {/* Card Body — Direct, Scannable, Concise */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        {/* Meta Row: Category + Private/Public Badge */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-mono text-xs text-[#0066ff] tracking-tight">
                            {category}
                          </span>

                          {project.isPrivate ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                              <Lock className="w-3 h-3" />
                              {privateBadgeText}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                              {t("publicBadge")}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-[family-name:var(--font-cabinet)] text-xl sm:text-2xl font-bold text-white tracking-[-0.02em] group-hover:text-[#0066ff] transition-colors">
                            {project.name}
                          </h3>
                          <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-[#0066ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-1" />
                        </div>

                        {/* Strict 2-Line Direct Impact Description */}
                        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                          {description}
                        </p>
                      </div>

                      {/* Monospace Metrics & Tech Stack Badges */}
                      <div className="pt-3 border-t border-zinc-800/80 space-y-3">
                        {/* Architecture / Impact Metrics */}
                        {project.metrics && project.metrics.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {project.metrics.map((metric) => (
                              <span
                                key={metric}
                                className="px-2 py-0.5 text-[11px] font-mono text-zinc-200 bg-zinc-900 rounded border border-zinc-800"
                              >
                                {metric}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Tech Stack Row + Quick Action Links */}
                        <div className="flex items-center justify-between gap-2 pt-1">
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 text-[11px] font-mono text-zinc-400 bg-zinc-950 rounded border border-zinc-800/70"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 4 && (
                              <span className="px-1.5 py-0.5 text-[11px] font-mono text-zinc-500">
                                +{project.technologies.length - 4}
                              </span>
                            )}
                          </div>

                          <div
                            className="flex items-center gap-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {project.github && !project.isPrivate && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`GitHub ${project.name}`}
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Demo ${project.name}`}
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-[#0066ff] hover:bg-zinc-800/80 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
