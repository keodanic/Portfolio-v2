"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectModal } from "@/components/modals/project-modal";
import { ArrowUpRight } from "lucide-react";
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
    <div className="relative w-full h-full bg-[#09090b] flex flex-col justify-between p-5 sm:p-6 font-mono text-[11px] sm:text-xs select-none overflow-hidden">
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800/80 text-zinc-500">
          <span>exploit_bola_poc.py</span>
          <span>PoC verified</span>
        </div>

        <div className="space-y-1.5 leading-relaxed">
          <div className="text-zinc-300">
            <span className="text-zinc-600">$ </span>
            python3 exploit_infinite_money.py --target portswigger-lab
          </div>
          <div className="text-zinc-500">[+] Extracting anti-CSRF token via regex… OK (200)</div>
          <div className="text-zinc-500">[+] Automating gift-card redemption loop (x42)…</div>
          <div className="text-red-400">[!] Business logic flaw: balance $100.00 → $1,340.00</div>
        </div>
      </div>

      {!compact && (
        <div className="mt-4 pt-4 border-t border-zinc-800/80">
          <div className="flex items-center justify-between mb-2 text-zinc-500">
            <span>patch</span>
            <span>orders.service.ts</span>
          </div>
          <pre className="text-[10px] sm:text-[11px] text-zinc-400 overflow-x-auto leading-snug">
            <code>
              <span className="text-zinc-100">await</span> prisma.$transaction(<span className="text-zinc-100">async</span> (tx) =&gt; {"{"}{"\n"}
              {"  "}<span className="text-zinc-100">const</span> coupon = <span className="text-zinc-100">await</span> tx.coupon.updateMany({"{"}{"\n"}
              {"    "}where: {"{"} code, redeemedAt: null, <span className="text-emerald-400">userId: user.sub</span> {"}"}{"\n"}
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
  const t = useTranslations("FeaturedWork");
  const locale = useLocale();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
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
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <header data-reveal className="mb-12 sm:mb-16 grid lg:grid-cols-2 gap-6 lg:items-end">
            <div>
              <span className="font-mono text-xs text-zinc-500">{t("sectionTag")}</span>
              <h2 className="mt-3 font-[family-name:var(--font-cabinet)] text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 tracking-[-0.03em] leading-[1.05]">
                {t("title")}
              </h2>
            </div>
            <p className="text-zinc-400 text-base leading-relaxed max-w-md lg:justify-self-end">
              {t("subtitle")}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 sm:gap-y-16">
            {allProjects.map((project, index) => {
              const description =
                locale === "en" && project.shortDescriptionEn
                  ? project.shortDescriptionEn
                  : project.shortDescription;
              const category =
                locale === "en" && project.categoryEn
                  ? project.categoryEn
                  : project.category;

              return (
                <article key={project.id} data-reveal className="group">
                  <button
                    type="button"
                    onClick={() => openProject(project)}
                    className="block w-full text-left cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050507]"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-zinc-800/80 bg-[#09090b] transition-colors duration-200 group-hover:border-zinc-700">
                      {project.hasImages && project.images?.[0] ? (
                        <Image
                          src={project.images[0]}
                          alt={project.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                          priority={index < 2}
                        />
                      ) : (
                        <TerminalPreview />
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-4 font-mono text-xs text-zinc-500">
                      <span className="truncate">{category}</span>
                      <span className="flex-shrink-0">
                        {project.isPrivate ? t("caseBadge") : t("openSourceBadge")} · {project.year}
                      </span>
                    </div>

                    <h3 className="mt-2.5 flex items-start justify-between gap-3 font-[family-name:var(--font-cabinet)] text-xl sm:text-2xl font-bold text-zinc-100 tracking-[-0.02em] leading-tight">
                      <span>{project.name}</span>
                      <ArrowUpRight className="w-5 h-5 mt-1 flex-shrink-0 text-zinc-600 transition-[color,transform] duration-200 group-hover:text-zinc-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </h3>

                    <p className="mt-2 text-sm text-zinc-400 leading-relaxed line-clamp-2">
                      {description}
                    </p>

                    <p className="mt-4 font-mono text-xs text-zinc-500 truncate">
                      {project.technologies.slice(0, 5).join(" · ")}
                    </p>
                  </button>

                  {(project.liveUrl || (project.github && !project.isPrivate)) && (
                    <div className="mt-3 flex items-center gap-4 font-mono text-xs">
                      {project.github && !project.isPrivate && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-500 hover:text-zinc-100 transition-colors"
                        >
                          GitHub ↗
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-500 hover:text-zinc-100 transition-colors"
                        >
                          {t("liveDemo")} ↗
                        </a>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
