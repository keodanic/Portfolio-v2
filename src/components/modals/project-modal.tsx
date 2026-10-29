"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TerminalPreview, type Project } from "@/components/sections/featured-work";
import { useLocale } from "next-intl";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Github,
  ExternalLink,
  Lock,
  TrendingUp,
  Sparkles,
  Code2,
  Layers,
  Zap,
  CheckCircle2,
} from "lucide-react";

export function ProjectModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "tech" | "details">("overview");
  const modalRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0);
      setActiveTab("overview");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const nextImage = () => {
    if (!project || !project.hasImages || project.images.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!project || !project.hasImages || project.images.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && project?.hasImages) prevImage();
      if (e.key === "ArrowRight" && project?.hasImages) nextImage();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => {
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, currentImageIndex, project]);

  if (!project || !isOpen) return null;

  const shortDesc =
    locale === "en" && project.shortDescriptionEn
      ? project.shortDescriptionEn
      : project.shortDescription;
  const fullDesc =
    locale === "en" && project.fullDescriptionEn
      ? project.fullDescriptionEn
      : project.fullDescription;
  const category =
    locale === "en" && project.categoryEn ? project.categoryEn : project.category;
  const privateBadgeText =
    locale === "en"
      ? project.privateBadgeEn || "Private Repository / Commercial Case"
      : project.privateBadge || "Repositório Privado / Case Comercial";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl max-h-[94vh] overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-800/90 flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="relative border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md flex-shrink-0 p-4 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                <span className="px-2.5 py-0.5 text-xs font-mono rounded-md border border-[#0066ff]/30 bg-[#0066ff]/10 text-[#0066ff]">
                  {category}
                </span>
                <span className="text-zinc-400 text-xs font-mono">
                  {project.year}
                </span>
                {project.duration && (
                  <span className="hidden sm:inline text-zinc-500 text-xs font-mono">
                    • {project.duration}
                  </span>
                )}
                {project.isPrivate && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                    <Lock className="w-3 h-3" />
                    <span>{privateBadgeText}</span>
                  </span>
                )}
              </div>

              <h2 className="font-[family-name:var(--font-cabinet)] text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-[-0.02em] mb-1">
                {project.name}
              </h2>

              <p className="hidden sm:block text-zinc-400 text-sm leading-relaxed line-clamp-2">
                {shortDesc}
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="flex-shrink-0 p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 mt-4">
            {project.liveUrl && (
              <MagneticButton
                variant="electric"
                size="sm"
                onClick={() => window.open(project.liveUrl!, "_blank")}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{locale === "en" ? "Live Production" : "Acessar Produção"}</span>
              </MagneticButton>
            )}
            {project.github && !project.isPrivate && (
              <MagneticButton
                variant="outline"
                size="sm"
                onClick={() => window.open(project.github!, "_blank")}
              >
                <Github className="w-3.5 h-3.5" />
                <span>{locale === "en" ? "Source Code" : "Código no GitHub"}</span>
              </MagneticButton>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4 pt-3 border-t border-zinc-800/80">
            {[
              {
                id: "overview",
                label: locale === "en" ? "Overview & Architecture" : "Visão Geral & Arquitetura",
                icon: Sparkles,
              },
              {
                id: "tech",
                label: locale === "en" ? "Tech Stack" : "Stack Técnico",
                icon: Code2,
              },
              {
                id: "details",
                label: locale === "en" ? "Metrics & Info" : "Métricas & Detalhes",
                icon: Layers,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5",
                  activeTab === tab.id
                    ? "bg-[#0066ff] text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                )}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid lg:grid-cols-12">
            {/* Left: Visual Preview (Real Screenshots or Terminal Code Window) */}
            <div className="lg:col-span-7 bg-zinc-900/40 border-b lg:border-b-0 lg:border-r border-zinc-800/80 p-4 sm:p-6 flex flex-col justify-center">
              {project.hasImages && project.images.length > 0 ? (
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-xl">
                  <Image
                    src={project.images[currentImageIndex]}
                    alt={`${project.name} - screenshot ${currentImageIndex + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-contain bg-zinc-950"
                  />

                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        aria-label="Previous image"
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-zinc-700 text-zinc-200 hover:text-white hover:bg-zinc-900 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextImage}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-zinc-700 text-zinc-200 hover:text-white hover:bg-zinc-900 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-zinc-300">
                        {currentImageIndex + 1} / {project.images.length}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="aspect-[16/10] w-full rounded-xl overflow-hidden border border-zinc-800">
                  <TerminalPreview />
                </div>
              )}
            </div>

            {/* Right: Project Details */}
            <div className="lg:col-span-5 p-5 sm:p-6 space-y-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Impact Metrics */}
                  {project.impact && project.impact.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-[#0066ff]" />
                        <h3 className="text-zinc-200 font-semibold text-xs font-mono uppercase tracking-wider">
                          {locale === "en" ? "Engineering Impact" : "Impacto & Escala"}
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        {project.impact.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40"
                          >
                            <div className="font-mono text-lg font-bold text-white">
                              {item.value}
                            </div>
                            <div className="text-zinc-400 text-xs mt-0.5">
                              {item.metric}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Full Description */}
                  <div>
                    <h3 className="text-zinc-200 font-semibold text-xs font-mono uppercase tracking-wider mb-2">
                      {locale === "en" ? "Architecture & Context" : "Arquitetura & Contexto"}
                    </h3>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {fullDesc}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-4 h-4 text-[#0066ff]" />
                      <h3 className="text-zinc-200 font-semibold text-xs font-mono uppercase tracking-wider">
                        {locale === "en" ? "Key Deliverables" : "Entregas Técnicas"}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2.5 text-zinc-300 text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#0066ff] flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "tech" && (
                <div className="space-y-5">
                  {project.techStack ? (
                    Object.entries(project.techStack).map(([group, items]) =>
                      items && items.length > 0 ? (
                        <div key={group}>
                          <h4 className="text-zinc-300 font-mono text-xs uppercase tracking-wider mb-2">
                            {group}
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {items.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 text-xs font-mono text-zinc-200 bg-zinc-900 rounded-md border border-zinc-800"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null
                    )
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono text-zinc-200 bg-zinc-900 rounded-md border border-zinc-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "details" && (
                <div className="space-y-5">
                  {project.role && (
                    <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                      <div className="text-zinc-500 text-xs font-mono mb-1">
                        {locale === "en" ? "Role" : "Papel no Projeto"}
                      </div>
                      <div className="text-zinc-200 text-sm font-medium">
                        {project.role}
                      </div>
                    </div>
                  )}
                  {project.challenges && project.challenges.length > 0 && (
                    <div>
                      <h4 className="text-zinc-300 font-mono text-xs uppercase tracking-wider mb-2.5">
                        {locale === "en" ? "Solved Challenges" : "Desafios Resolvidos"}
                      </h4>
                      <ul className="space-y-2">
                        {project.challenges.map((c, i) => (
                          <li
                            key={i}
                            className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 text-zinc-300 text-xs sm:text-sm leading-relaxed"
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
