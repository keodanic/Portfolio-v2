"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
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
  FileText,
  Shield,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  tags: string[];
  features: string[];
  images: string[];
  hasImages: boolean; // New field
  github: string | null;
  isPrivate: boolean;
  color: string;
  year: string;
  category: string;
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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "tech" | "details">("overview");
  const modalRef = useRef<HTMLDivElement>(null);

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

  const nextImage = () => {
    if (!project || !project.hasImages) return;
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!project || !project.hasImages) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!project?.hasImages) return;
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !project?.hasImages) return;
    const diff = e.clientX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging || !project?.hasImages) return;
    setIsDragging(false);

    if (translateX > 50) {
      prevImage();
    } else if (translateX < -50) {
      nextImage();
    }
    setTranslateX(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!project?.hasImages) return;
    setIsDragging(true);
    setStartX(e.touches[0]?.clientX ?? 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !project?.hasImages) return;
    const touch = e.touches[0];
    if (!touch) return;
    const diff = touch.clientX - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging || !project?.hasImages) return;
    setIsDragging(false);

    if (translateX > 50) {
      prevImage();
    } else if (translateX < -50) {
      nextImage();
    }
    setTranslateX(0);
  };

  if (!project || !isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500",
        "opacity-100 pointer-events-auto"
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className={cn(
          "relative w-full max-w-7xl max-h-[95vh] overflow-hidden rounded-3xl transition-all duration-500",
          "bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] border border-white/10 flex flex-col shadow-2xl",
          "scale-100 translate-y-0"
        )}
      >
        {/* Header - Fixed */}
        <div className="relative border-b border-white/10 bg-black/40 backdrop-blur-sm">
          <div className="p-6 lg:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span
                    className="px-3 py-1.5 text-xs font-semibold rounded-full border"
                    style={{
                      backgroundColor: `${project.color}20`,
                      borderColor: `${project.color}40`,
                      color: project.color,
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="text-white/50 text-sm font-medium">{project.year}</span>
                  {project.duration && (
                    <span className="text-white/40 text-sm">• {project.duration}</span>
                  )}
                  {project.isPrivate && (
                    <span className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full border border-amber-400/20">
                      <Lock className="w-3 h-3" />
                      Privado
                    </span>
                  )}
                </div>
                <h2 className="font-[family-name:var(--font-cabinet)] text-3xl lg:text-5xl font-bold text-white tracking-[-0.03em] mb-3">
                  {project.name}
                </h2>
                <p className="text-white/60 text-lg leading-relaxed max-w-3xl">
                  {project.shortDescription}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="flex-shrink-0 p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              {project.liveUrl && (
                <MagneticButton
                  variant="electric"
                  size="md"
                  onClick={() => window.open(project.liveUrl!, "_blank")}
                >
                  <ExternalLink className="w-4 h-4" />
                  Ver Projeto ao Vivo
                </MagneticButton>
              )}
              {project.github && !project.isPrivate && (
                <MagneticButton
                  variant="outline"
                  size="md"
                  onClick={() => window.open(project.github!, "_blank")}
                >
                  <Github className="w-4 h-4" />
                  Ver Código
                </MagneticButton>
              )}
              {project.isPrivate && (
                <div className="px-4 py-2 bg-amber-400/5 border border-amber-400/20 rounded-xl text-amber-400/80 text-sm flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5" />
                  Código sob NDA
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 lg:px-8 flex gap-1 border-t border-white/5">
            {[
              { id: "overview", label: "Visão Geral", icon: Sparkles },
              { id: "tech", label: "Stack Técnico", icon: Code2 },
              { id: "details", label: "Detalhes", icon: Layers },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "relative px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center gap-2",
                  activeTab === tab.id
                    ? "text-white"
                    : "text-white/50 hover:text-white/70"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: project.color }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className={cn(
            "flex flex-col",
            project.hasImages ? "lg:flex-row" : ""
          )}>
            {/* Image Carousel - Only shows if hasImages is true */}
            {project.hasImages && (
              <div className="relative lg:w-3/5 bg-gradient-to-br from-black/60 to-black/40">
                <div
                  className="relative aspect-video lg:aspect-auto lg:h-[600px] overflow-hidden cursor-grab active:cursor-grabbing"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div
                    className="flex transition-transform duration-300 ease-out h-full"
                    style={{
                      transform: `translateX(calc(-${currentImageIndex * 100}% + ${translateX}px))`,
                    }}
                  >
                    {project.images.map((image, index) => (
                      <div
                        key={index}
                        className="min-w-full h-full flex items-center justify-center p-8 lg:p-12"
                      >
                        <div
                          className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                          style={{
                            background: `linear-gradient(135deg, ${project.color}15 0%, transparent 60%)`,
                          }}
                        >
                          {/* Placeholder for image */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div
                              className="w-32 h-32 rounded-full opacity-20 blur-3xl"
                              style={{ backgroundColor: project.color }}
                            />
                            <span
                              className="font-[family-name:var(--font-cabinet)] text-8xl font-bold opacity-10"
                              style={{ color: project.color }}
                            >
                              {index + 1}
                            </span>
                          </div>
                          {/* Grid overlay */}
                          <div
                            className="absolute inset-0 opacity-20"
                            style={{
                              backgroundImage: `
                                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                              `,
                              backgroundSize: "40px 40px",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-black/80 hover:border-white/20 transition-all duration-200 shadow-lg"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-black/80 hover:border-white/20 transition-all duration-200 shadow-lg"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Dots Indicator */}
                  {project.images.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full border border-white/10">
                      {project.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(index);
                          }}
                          className={cn(
                            "w-2 h-2 rounded-full transition-all duration-200",
                            index === currentImageIndex
                              ? "w-6"
                              : "bg-white/30 hover:bg-white/50"
                          )}
                          style={{
                            backgroundColor:
                              index === currentImageIndex ? project.color : undefined,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Image Counter */}
                  <div className="absolute top-6 right-6 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 text-white/70 text-sm font-medium">
                    {currentImageIndex + 1} / {project.images.length}
                  </div>
                </div>
              </div>
            )}

            {/* Visual Header for non-image projects */}
            {!project.hasImages && (
              <div className="relative w-full h-64 lg:h-80 bg-gradient-to-br from-black/60 to-black/40 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Animated background */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: `radial-gradient(circle at 30% 50%, ${project.color}40 0%, transparent 50%),
                                   radial-gradient(circle at 70% 50%, ${project.color}20 0%, transparent 50%)`,
                    }}
                  />
                  
                  {/* Grid pattern */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                      `,
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* Icon */}
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div 
                      className="p-6 rounded-2xl border-2"
                      style={{ 
                        borderColor: `${project.color}40`,
                        backgroundColor: `${project.color}10`
                      }}
                    >
                      <Shield 
                        className="w-20 h-20" 
                        style={{ color: project.color }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="text-center">
                      <div 
                        className="text-sm font-semibold tracking-wider uppercase opacity-60"
                        style={{ color: project.color }}
                      >
                        {project.category}
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div 
                    className="absolute top-10 left-10 w-32 h-32 rounded-full blur-3xl opacity-20"
                    style={{ backgroundColor: project.color }}
                  />
                  <div 
                    className="absolute bottom-10 right-10 w-40 h-40 rounded-full blur-3xl opacity-20"
                    style={{ backgroundColor: project.color }}
                  />
                </div>
              </div>
            )}

            {/* Project Details */}
            <div className={cn(
              "p-6 lg:p-8 space-y-8",
              project.hasImages ? "lg:w-2/5" : "w-full"
            )}>
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* Impact Metrics */}
                  {project.impact && project.impact.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5" style={{ color: project.color }} />
                        <h3 className="text-white font-bold text-lg tracking-wide uppercase">
                          Impacto
                        </h3>
                      </div>
                      <div className={cn(
                        "grid gap-3",
                        project.hasImages ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-4"
                      )}>
                        {project.impact.map((item, index) => (
                          <div
                            key={index}
                            className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                          >
                            <div
                              className="text-2xl font-bold mb-1"
                              style={{ color: project.color }}
                            >
                              {item.value}
                            </div>
                            <div className="text-white/60 text-xs leading-tight">
                              {item.metric}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* My Role */}
                  {project.role && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5" style={{ color: project.color }} />
                        <h3 className="text-white font-bold text-lg tracking-wide uppercase">
                          Meu Papel
                        </h3>
                      </div>
                      <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                        <p className="text-white/80 leading-relaxed">{project.role}</p>
                        {project.teamSize && (
                          <div className="mt-3 pt-3 border-t border-white/10 text-sm text-white/50">
                            Time: {project.teamSize}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div>
                    <h3 className="text-white font-bold text-lg tracking-wide uppercase mb-4">
                      Sobre o Projeto
                    </h3>
                    <p className="text-white/70 leading-relaxed">{project.fullDescription}</p>
                  </div>

                  {/* Key Features */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5" style={{ color: project.color }} />
                      <h3 className="text-white font-bold text-lg tracking-wide uppercase">
                        Funcionalidades Principais
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-white/70">
                          <CheckCircle2
                            className="w-5 h-5 flex-shrink-0 mt-0.5"
                            style={{ color: project.color }}
                          />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges */}
                  {project.challenges && project.challenges.length > 0 && (
                    <div>
                      <h3 className="text-white font-bold text-lg tracking-wide uppercase mb-4">
                        Desafios Superados
                      </h3>
                      <ul className="space-y-3">
                        {project.challenges.map((challenge, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-white/70 p-3 rounded-lg bg-white/[0.02] border border-white/5"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: project.color }}
                            />
                            <span className="leading-relaxed">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Tech Stack Tab */}
              {activeTab === "tech" && (
                <div className="space-y-6">
                  {project.techStack ? (
                    <>
                      {project.techStack.frontend && project.techStack.frontend.length > 0 && (
                        <div>
                          <h4 className="text-white/80 font-semibold mb-3 flex items-center gap-2">
                            <div
                              className="w-1 h-4 rounded-full"
                              style={{ backgroundColor: project.color }}
                            />
                            Frontend
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.frontend.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-2 text-sm text-white/80 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {project.techStack.backend && project.techStack.backend.length > 0 && (
                        <div>
                          <h4 className="text-white/80 font-semibold mb-3 flex items-center gap-2">
                            <div
                              className="w-1 h-4 rounded-full"
                              style={{ backgroundColor: project.color }}
                            />
                            Backend
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.backend.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-2 text-sm text-white/80 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {project.techStack.database && project.techStack.database.length > 0 && (
                        <div>
                          <h4 className="text-white/80 font-semibold mb-3 flex items-center gap-2">
                            <div
                              className="w-1 h-4 rounded-full"
                              style={{ backgroundColor: project.color }}
                            />
                            Database
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.database.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-2 text-sm text-white/80 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {project.techStack.devops && project.techStack.devops.length > 0 && (
                        <div>
                          <h4 className="text-white/80 font-semibold mb-3 flex items-center gap-2">
                            <div
                              className="w-1 h-4 rounded-full"
                              style={{ backgroundColor: project.color }}
                            />
                            DevOps & Tools
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.devops.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-2 text-sm text-white/80 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div>
                      <h4 className="text-white/80 font-semibold mb-3">Tecnologias</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-2 text-sm text-white/80 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Details Tab */}
              {activeTab === "details" && (
                <div className="space-y-6">
                  {/* Tags */}
                  <div>
                    <h4 className="text-white/80 font-semibold mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 text-sm text-white/60 bg-white/5 rounded-lg border border-white/10 capitalize"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className={cn(
                    "grid gap-4",
                    project.hasImages ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-4"
                  )}>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-white/50 text-xs mb-1">Categoria</div>
                      <div className="text-white font-medium">{project.category}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-white/50 text-xs mb-1">Ano</div>
                      <div className="text-white font-medium">{project.year}</div>
                    </div>
                    {project.duration && (
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                        <div className="text-white/50 text-xs mb-1">Duração</div>
                        <div className="text-white font-medium">{project.duration}</div>
                      </div>
                    )}
                    {project.teamSize && (
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                        <div className="text-white/50 text-xs mb-1">Time</div>
                        <div className="text-white font-medium">{project.teamSize}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}