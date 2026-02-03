"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GeometricPatterns } from "@/components/background/geometric-patterns";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ProjectModal } from "@/components/modals/project-modal"; // Importar o modal corrigido
import {
  ArrowUpRight,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
const projects: Project[] = _raw
  ? Array.isArray(_raw)
    ? (_raw as Project[])
    : ([_raw] as Project[])
  : [];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
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

      // Project cards animation
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
            delay: (index % 3) * 0.1,
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
      {/* Background Layer */}
      <GeometricPatterns />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10 min-h-screen">
        <section
          ref={sectionRef}
          className="relative py-32 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div ref={headerRef} className="mb-16">
              <span className="text-[#0066ff] text-sm tracking-widest uppercase mb-4 block">
                Portfólio
              </span>
              <h1 className="font-[family-name:var(--font-cabinet)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] max-w-3xl mb-6">
                Todos os Projetos
              </h1>
              <p className="text-white/60 text-lg max-w-2xl">
                Uma coleção dos meus trabalhos mais recentes, abrangendo desde
                aplicativos mobile até plataformas web complexas.
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  ref={(el) => {
                    projectRefs.current[index] = el;
                  }}
                >
                  <GlassCard
                    variant="default"
                    className="group cursor-pointer h-full"
                    hover
                    onClick={() => openProject(project)}
                  >
                    <div className="p-6 flex flex-col h-full">
                      {/* Image Preview */}
                      <div
                        className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6 border border-white/10"
                        style={{
                          background: `linear-gradient(135deg, ${project.color}10 0%, transparent 50%)`,
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className="w-20 h-20 rounded-full opacity-20 blur-2xl"
                            style={{ backgroundColor: project.color }}
                          />
                          <span
                            className="font-[family-name:var(--font-cabinet)] text-6xl font-bold opacity-10"
                            style={{ color: project.color }}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        {/* Grid overlay */}
                        <div
                          className="absolute inset-0 opacity-30"
                          style={{
                            backgroundImage: `
                              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                            `,
                            backgroundSize: "30px 30px",
                          }}
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-[#0066ff]/0 group-hover:bg-[#0066ff]/10 transition-colors duration-300 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-medium flex items-center gap-2">
                            Ver Detalhes
                            <ArrowUpRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className="px-2 py-0.5 text-xs rounded border"
                            style={{
                              backgroundColor: `${project.color}15`,
                              borderColor: `${project.color}30`,
                              color: project.color,
                            }}
                          >
                            {project.category}
                          </span>
                          <span className="text-white/40 text-xs">
                            {project.year}
                          </span>
                          {project.isPrivate && (
                            <Lock className="w-3 h-3 text-amber-400" />
                          )}
                        </div>

                        <h3 className="font-[family-name:var(--font-cabinet)] text-xl font-bold text-white tracking-[-0.02em] group-hover:text-[#0066ff] transition-colors duration-300 mb-2">
                          {project.name}
                        </h3>

                        <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">
                          {project.shortDescription}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs text-white/50 bg-white/5 rounded border border-white/10 capitalize"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}