"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GeometricPatterns } from "@/components/background/geometric-patterns";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import {
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  Github,
  ExternalLink,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "freelant-app",
    name: "Freelant",
    shortDescription: "App para freelancers em Timon-MA",
    fullDescription:
      "Aplicativo mobile desenvolvido para meu TCC com o intuito de conectar freelancers e clientes, chat integrado e sistema de avaliações.",
    technologies: [
      "React Native",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "SocketIO",
      "NativeWind",
      "Expo-Router",
    ],
    tags: ["mobile", "fullstack"],
    features: [
      "Chat integrado via SocketIO",
      "Requisição para solicitar serviço",
      "Autenticação JWT",
    ],
    images: [
      "/projects/Freelant/freelantCadastro.png",
      "/projects/Freelant/freelantHomeFreela.png",
      "/projects/Freelant/chat.png",
      "/projects/Freelant/homeUser.png",
    ],
    github: null,
    isPrivate: true,
    color: "#8B5CF6",
    year: "2024",
    category: "Mobile App",
  },
  {
    id: "fintech-dashboard",
    name: "Fintech Dashboard",
    shortDescription: "Dashboard financeiro para investidores institucionais",
    fullDescription:
      "Uma plataforma abrangente de análise financeira projetada para investidores institucionais. Apresenta visualização de dados em tempo real e gerenciamento intuitivo de portfólio.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Recharts",
      "Prisma",
      "PostgreSQL",
    ],
    tags: ["web", "dashboard", "fintech"],
    features: [
      "Visualização de dados em tempo real",
      "Gráficos interativos",
      "Exportação de relatórios",
      "Autenticação multi-fator",
    ],
    images: [
      "/projects/Fintech/dashboard.png",
      "/projects/Fintech/analytics.png",
      "/projects/Fintech/portfolio.png",
    ],
    github: "https://github.com/victor/fintech-dashboard",
    isPrivate: false,
    color: "#0066FF",
    year: "2024",
    category: "Web Application",
  },
  {
    id: "ecommerce-luxury",
    name: "Luxury E-commerce",
    shortDescription: "Experiência de compra para marca de moda de luxo",
    fullDescription:
      "Redesign da experiência de compra para uma marca de moda de luxo. Foco em storytelling e descoberta imersiva de produtos.",
    technologies: [
      "React",
      "Next.js",
      "Framer Motion",
      "Stripe",
      "Sanity CMS",
    ],
    tags: ["web", "e-commerce", "luxury"],
    features: [
      "Visualização 360° de produtos",
      "Checkout otimizado",
      "Lista de desejos",
      "Recomendações personalizadas",
    ],
    images: [
      "/projects/Luxury/home.png",
      "/projects/Luxury/product.png",
      "/projects/Luxury/cart.png",
    ],
    github: "https://github.com/victor/luxury-ecommerce",
    isPrivate: false,
    color: "#F59E0B",
    year: "2023",
    category: "E-commerce",
  },
  {
    id: "health-wellness",
    name: "Health & Wellness",
    shortDescription: "App de saúde com abordagem consciente",
    fullDescription:
      "Uma abordagem consciente para rastreamento de saúde. Criando calma no caos das rotinas diárias de bem-estar através de design de interação cuidadoso.",
    technologies: ["React Native", "Expo", "Firebase", "TypeScript"],
    tags: ["mobile", "health", "wellness"],
    features: [
      "Rastreamento de hábitos",
      "Meditação guiada",
      "Integração com Apple Health",
      "Lembretes personalizados",
    ],
    images: [
      "/projects/Health/dashboard.png",
      "/projects/Health/meditation.png",
      "/projects/Health/stats.png",
    ],
    github: "https://github.com/victor/health-wellness",
    isPrivate: false,
    color: "#10B981",
    year: "2023",
    category: "Mobile App",
  },
  {
    id: "task-management",
    name: "TaskFlow Pro",
    shortDescription: "Sistema de gerenciamento de tarefas colaborativo",
    fullDescription:
      "Plataforma completa de gerenciamento de projetos com recursos de colaboração em tempo real, quadros Kanban e relatórios de produtividade.",
    technologies: ["Vue.js", "Node.js", "MongoDB", "Socket.io", "Docker"],
    tags: ["web", "productivity", "collaboration"],
    features: [
      "Quadros Kanban",
      "Colaboração em tempo real",
      "Relatórios de produtividade",
      "Integração com calendário",
    ],
    images: [
      "/projects/Taskflow/board.png",
      "/projects/Taskflow/calendar.png",
      "/projects/Taskflow/reports.png",
    ],
    github: "https://github.com/victor/taskflow-pro",
    isPrivate: false,
    color: "#EC4899",
    year: "2023",
    category: "Web Application",
  },
  {
    id: "ai-content-generator",
    name: "AI Content Studio",
    shortDescription: "Ferramenta de geração de conteúdo com IA",
    fullDescription:
      "Plataforma de geração de conteúdo impulsionada por IA para criadores de conteúdo e profissionais de marketing. Gera textos, imagens e ideias criativas.",
    technologies: ["Next.js", "OpenAI API", "Python", "FastAPI", "Redis"],
    tags: ["web", "ai", "productivity"],
    features: [
      "Geração de textos com IA",
      "Criação de imagens",
      "Templates personalizáveis",
      "Histórico de gerações",
    ],
    images: [
      "/projects/AIStudio/editor.png",
      "/projects/AIStudio/templates.png",
      "/projects/AIStudio/history.png",
    ],
    github: null,
    isPrivate: true,
    color: "#6366F1",
    year: "2024",
    category: "Web Application",
  },
];

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
}

function ProjectModal({
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
  const modalRef = useRef<HTMLDivElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0);
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
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, currentImageIndex]);

  const nextImage = () => {
    if (!project) return;
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!project) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (translateX > 50) {
      prevImage();
    } else if (translateX < -50) {
      nextImage();
    }
    setTranslateX(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0]?.clientX ?? 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    if (!touch) return;
    const diff = touch.clientX - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (translateX > 50) {
      prevImage();
    } else if (translateX < -50) {
      nextImage();
    }
    setTranslateX(0);
  };

  if (!project) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className={cn(
          "relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl transition-all duration-500",
          "bg-[#0a0a0a] border border-white/10 flex flex-col",
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
        )}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col lg:flex-row overflow-y-auto">
          {/* Image Carousel */}
          <div className="relative lg:w-3/5 bg-black/50">
            <div
              ref={imagesContainerRef}
              className="relative aspect-video lg:aspect-auto lg:h-[500px] overflow-hidden cursor-grab active:cursor-grabbing"
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
                    className="min-w-full h-full flex items-center justify-center p-8"
                  >
                    <div
                      className="relative w-full h-full rounded-xl overflow-hidden border border-white/10"
                      style={{
                        background: `linear-gradient(135deg, ${project.color}10 0%, transparent 50%)`,
                      }}
                    >
                      {/* Placeholder for image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-24 h-24 rounded-full opacity-20 blur-2xl"
                          style={{ backgroundColor: project.color }}
                        />
                        <span className="font-[family-name:var(--font-cabinet)] text-6xl font-bold text-white/10">
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
                          backgroundSize: "30px 30px",
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-black/70 transition-all duration-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-black/70 transition-all duration-200"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {project.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
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
                          ? "bg-white w-6"
                          : "bg-white/30 hover:bg-white/50"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div className="lg:w-2/5 p-6 lg:p-8">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="px-3 py-1 text-xs rounded-full border"
                    style={{
                      backgroundColor: `${project.color}15`,
                      borderColor: `${project.color}30`,
                      color: project.color,
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="text-white/40 text-sm">{project.year}</span>
                  {project.isPrivate && (
                    <span className="flex items-center gap-1 text-xs text-amber-400">
                      <Lock className="w-3 h-3" />
                      Privado
                    </span>
                  )}
                </div>
                <h2 className="font-[family-name:var(--font-cabinet)] text-3xl lg:text-4xl font-bold text-white tracking-[-0.02em]">
                  {project.name}
                </h2>
              </div>

              {/* Description */}
              <p className="text-white/70 text-base leading-relaxed">
                {project.fullDescription}
              </p>

              {/* Features */}
              <div>
                <h3 className="text-white font-medium mb-3 text-sm tracking-wide uppercase">
                  Funcionalidades
                </h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-white/60 text-sm"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: project.color }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-white font-medium mb-3 text-sm tracking-wide uppercase">
                  Tecnologias
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs text-white/70 bg-white/5 rounded-lg border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-white font-medium mb-3 text-sm tracking-wide uppercase">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs text-white/50 capitalize"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                {project.github && (
                  <MagneticButton
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(project.github!, "_blank")}
                  >
                    <Github className="w-4 h-4" />
                    Código
                  </MagneticButton>
                )}
                {!project.isPrivate && (
                  <MagneticButton variant="electric" size="sm">
                    <ExternalLink className="w-4 h-4" />
                    Ver Projeto
                  </MagneticButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
