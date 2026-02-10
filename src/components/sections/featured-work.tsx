"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ProjectModal } from "@/components/modals/project-modal";
import {
  ArrowUpRight,
  Lock,
  Shield,
  Code2,
  Database,
  Globe,
} from "lucide-react";

import projectsData from "@/data/projects.json";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  tags: string[];
  features: string[];
  images: string[];
  hasImages: boolean;
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

const _raw = (projectsData as any)?.default ?? projectsData;
const allProjects: Project[] = Array.isArray(_raw) 
  ? _raw 
  : Array.isArray(_raw?.projects)
  ? _raw.projects
  : [];

// Pegar apenas os primeiros 3 projetos para featured
const projects = allProjects.slice(0, 3);

// Helper function to get icon based on category
const getCategoryIcon = (category?: string) => {
  if (!category) return Code2;
  
  const lowerCategory = category.toLowerCase();
  if (lowerCategory.includes("security") || lowerCategory.includes("cyber")) {
    return Shield;
  }
  if (lowerCategory.includes("web") || lowerCategory.includes("mobile")) {
    return Globe;
  }
  if (lowerCategory.includes("data") || lowerCategory.includes("backend")) {
    return Database;
  }
  return Code2;
};

export function FeaturedWork() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      projectRefs.current.forEach((project, index) => {
        if (!project) return;

        gsap.fromTo(
          project,
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: project,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
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
        className="relative py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div ref={headerRef} className="mb-20">
            <span className="text-[#0066ff] text-sm tracking-widest uppercase mb-4 block">
              Technical Portfolio
            </span>
            <h2 className="font-[family-name:var(--font-cabinet)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] max-w-4xl">
              Engineering robust systems with a security-first mindset
            </h2>
          </div>

          {/* Projects Grid */}
          <div className="space-y-8">
            {projects.map((project, index) => {
              const CategoryIcon = getCategoryIcon(project.category);
              
              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    projectRefs.current[index] = el;
                  }}
                >
                  <GlassCard
                    variant="default"
                    className="group cursor-pointer"
                    hover
                    onClick={() => openProject(project)}
                  >
                    <div className="p-8 sm:p-10 lg:p-12">
                      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        {/* Left - Content */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-4 text-sm text-white/50">
                            <span>{project.category}</span>
                            <span className="w-1 h-1 rounded-full bg-white/30" />
                            <span>{project.year}</span>
                            {project.isPrivate && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-white/30" />
                                <Lock className="w-3 h-3 text-amber-400" />
                              </>
                            )}
                          </div>

                          <h3 className="font-[family-name:var(--font-cabinet)] text-3xl sm:text-4xl font-bold text-white tracking-[-0.02em] group-hover:text-[#0066ff] transition-colors duration-300">
                            {project.name}
                          </h3>

                          <p className="text-white/60 text-lg leading-relaxed">
                            {project.shortDescription}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.tags && project.tags.length > 0 ? (
                              <>
                                {project.tags.slice(0, 4).map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-3 py-1 text-xs text-white/70 bg-white/5 rounded-full border border-white/10 capitalize"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {project.tags.length > 4 && (
                                  <span className="px-3 py-1 text-xs text-white/50 bg-white/5 rounded-full border border-white/10">
                                    +{project.tags.length - 4}
                                  </span>
                                )}
                              </>
                            ) : null}
                          </div>

                          <div className="pt-4">
                            <span className="inline-flex items-center gap-2 text-sm text-[#0066ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              Ver Detalhes
                              <ArrowUpRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>

                        {/* Right - Visual Placeholder */}
                        <div
                          className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/10"
                          style={{
                            background: `linear-gradient(135deg, ${project.color}10 0%, transparent 50%)`,
                          }}
                        >
                          {project.hasImages ? (
                            // Traditional numbered preview for image projects
                            <>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div
                                  className="w-32 h-32 rounded-full opacity-20 blur-3xl"
                                  style={{ backgroundColor: project.color }}
                                />
                                <span
                                  className="font-[family-name:var(--font-cabinet)] text-8xl font-bold opacity-10"
                                  style={{ color: project.color }}
                                >
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                              </div>
                            </>
                          ) : (
                            // Icon-based preview for non-image projects
                            <>
                              <div className="absolute inset-0 flex items-center justify-center">
                                {/* Background glow */}
                                <div
                                  className="absolute w-40 h-40 rounded-full opacity-20 blur-3xl"
                                  style={{ backgroundColor: project.color }}
                                />
                                {/* Icon */}
                                <div
                                  className="relative z-10 p-8 rounded-xl border-2"
                                  style={{
                                    borderColor: `${project.color}40`,
                                    backgroundColor: `${project.color}10`,
                                  }}
                                >
                                  <CategoryIcon
                                    className="w-16 h-16"
                                    style={{ color: project.color }}
                                    strokeWidth={1.5}
                                  />
                                </div>
                              </div>
                            </>
                          )}

                          {/* Grid overlay */}
                          <div
                            className="absolute inset-0 opacity-30"
                            style={{
                              backgroundImage: `
                                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                              `,
                              backgroundSize: "40px 40px",
                            }}
                          />

                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-[#0066ff]/0 group-hover:bg-[#0066ff]/10 transition-colors duration-300" />
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>

          {/* Empty state if no projects */}
          {projects.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-4">
                <Code2 className="w-8 h-8 text-white/40" />
              </div>
              <h3 className="text-white/60 text-lg font-medium mb-2">
                Nenhum projeto encontrado
              </h3>
              <p className="text-white/40 text-sm">
                Novos projetos serão adicionados em breve.
              </p>
            </div>
          )}
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