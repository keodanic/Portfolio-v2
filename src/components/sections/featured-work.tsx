"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Fintech Dashboard",
    category: "Product Design",
    year: "2024",
    description:
      "A comprehensive financial analytics platform designed for institutional investors. Features real-time data visualization and intuitive portfolio management.",
    tags: ["UX Research", "UI Design", "Design System"],
    color: "#0066FF",
  },
  {
    id: 2,
    title: "E-commerce Experience",
    category: "Web Design",
    year: "2024",
    description:
      "Redesigning the shopping experience for a luxury fashion brand. Focused on storytelling and immersive product discovery.",
    tags: ["Brand Strategy", "Interaction Design", "Prototyping"],
    color: "#8B5CF6",
  },
  {
    id: 3,
    title: "Health & Wellness App",
    category: "Mobile Design",
    year: "2023",
    description:
      "A mindful approach to health tracking. Creating calm in the chaos of daily wellness routines through thoughtful interaction design.",
    tags: ["User Research", "Mobile UI", "Motion Design"],
    color: "#10B981",
  },
];

export function FeaturedWork() {
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

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-20">
          <span className="text-[#0066ff] text-sm tracking-widest uppercase mb-4 block">
            Selected Work
          </span>
          <h2 className="font-[family-name:var(--font-cabinet)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] max-w-3xl">
            Projects that define my approach to design
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, index) => (
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
              >
                <div className="p-8 sm:p-10 lg:p-12">
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left - Content */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 text-sm text-white/50">
                        <span>{project.category}</span>
                        <span className="w-1 h-1 rounded-full bg-white/30" />
                        <span>{project.year}</span>
                      </div>

                      <h3 className="font-[family-name:var(--font-cabinet)] text-3xl sm:text-4xl font-bold text-white tracking-[-0.02em] group-hover:text-[#0066ff] transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-white/60 text-lg leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs text-white/70 bg-white/5 rounded-full border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <MagneticButton
                        variant="ghost"
                        size="sm"
                        className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        View Case Study
                        <ArrowUpRight className="w-4 h-4" />
                      </MagneticButton>
                    </div>

                    {/* Right - Visual Placeholder */}
                    <div
                      className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
                      style={{
                        background: `linear-gradient(135deg, ${project.color}10 0%, transparent 50%)`,
                      }}
                    >
                      {/* Abstract geometric representation */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-32 h-32 rounded-full opacity-20 blur-3xl"
                          style={{ backgroundColor: project.color }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className="font-[family-name:var(--font-cabinet)] text-8xl font-bold opacity-10"
                            style={{ color: project.color }}
                          >
                            0{project.id}
                          </span>
                        </div>
                      </div>

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
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-16">
          <a href="/projects">
            <MagneticButton variant="outline" size="lg">
              View All Projects
              <ArrowUpRight className="w-5 h-5" />
            </MagneticButton>
          </a>
        </div>
      </div>
    </section>
  );
}
