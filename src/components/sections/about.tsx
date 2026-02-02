"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { category: "Backend", items: ["Node.js", "NestJS", "Adonis", "Express", "PostgreSQL"] },
  { category: "Frontend", items: ["React.js", "Next.js", "React Native", "TypeScript", "Tailwind CSS"] },
  { category: "Tools", items: ["Git", "Docker", "VS Code", "Figma", "Postman"] },
];

const experiences = [
  {
    title: "Simplifit Academias",
    description: "Desenvolvedor Full-Stack Pleno. Criação de aplicativos em React Native, back-end com Node.js (NestJS) e front-end com Next.js. Setembro 2025 - Presente",
  },
  {
    title: "Prefeitura Municipal de Timon",
    description: "Desenvolvedor de software. Desenvolvimento e implementação de plataformas governamentais. Junho 2025 - Agosto 2025",
  },
  {
    title: "FAPEMA - IFMA",
    description: "Bolsista em projeto de sistema de monitoramento de CO2 com tecnologia maker. Novembro 2024 - Julho 2025",
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (skillsRef.current) {
        const cards = skillsRef.current.querySelectorAll(".skill-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (philosophyRef.current) {
        const items = philosophyRef.current.querySelectorAll(".philosophy-item");
        gsap.fromTo(
          items,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: philosophyRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left Column - Bio */}
          <div ref={contentRef}>
            <span className="text-[#0066ff] text-sm tracking-widest uppercase mb-4 block">
              About Me
            </span>
            <h2 className="font-[family-name:var(--font-cabinet)] text-4xl sm:text-5xl font-bold text-white tracking-[-0.03em] mb-8">
              Desenvolvedor Full-Stack
            </h2>
            <div className="space-y-6 text-lg text-white/60 leading-relaxed">
              <p>
                Graduado em Sistemas para Internet pelo IFMA com experiência
                em Node.js (NestJS, Adonis, Express), PostgreSQL, React e
                React Native. Foco em desenvolvimento Web e Mobile.
              </p>
              <p>
                Atualmente atuo como Desenvolvedor Full-Stack Pleno na
                Simplifit Academias, criando soluções completas desde o
                back-end até aplicativos mobile.
              </p>
              <p>
                Sou apaixonado por tecnologia e inovação, sempre buscando
                criar código limpo, escalável e que gere valor real para
                os usuários e negócios.
              </p>
            </div>

            {/* Skills */}
            <div ref={skillsRef} className="mt-12 space-y-4">
              {skills.map((skillGroup) => (
                <GlassCard
                  key={skillGroup.category}
                  variant="subtle"
                  className="skill-card p-5"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-white font-medium min-w-[100px]">
                      {skillGroup.category}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((item) => (
                        <span
                          key={item}
                          className="text-sm text-white/50 px-3 py-1 bg-white/5 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Right Column - Experience */}
          <div ref={philosophyRef} className="lg:pt-20">
            <h3 className="font-[family-name:var(--font-cabinet)] text-2xl font-bold text-white mb-8 tracking-[-0.02em]">
              Experiência Profissional
            </h3>
            <div className="space-y-8">
              {experiences.map((item, index) => (
                <div key={item.title} className="philosophy-item group">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#0066ff]/50 group-hover:bg-[#0066ff]/5 transition-colors duration-300">
                        <span className="font-[family-name:var(--font-cabinet)] text-lg font-bold text-white/50 group-hover:text-[#0066ff] transition-colors">
                          0{index + 1}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-[family-name:var(--font-cabinet)] text-xl font-semibold text-white mb-2 group-hover:text-[#0066ff] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-white/50 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Education & Stats */}
            <GlassCard variant="highlight" className="mt-12 p-8">
              <div className="mb-6 pb-6 border-b border-white/10">
                <div className="text-sm text-[#0066ff] uppercase tracking-wider mb-2">Formação Acadêmica</div>
                <div className="font-[family-name:var(--font-cabinet)] text-xl font-bold text-white mb-1">
                  Sistemas para Internet
                </div>
                <div className="text-white/60">IFMA - Instituto Federal do Maranhão</div>
                <div className="text-sm text-white/40">2023 - 2025</div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="font-[family-name:var(--font-cabinet)] text-4xl font-bold text-white mb-1">
                    2+
                  </div>
                  <div className="text-sm text-white/50">Anos de Experiência</div>
                </div>
                <div>
                  <div className="font-[family-name:var(--font-cabinet)] text-4xl font-bold text-white mb-1">
                    10+
                  </div>
                  <div className="text-sm text-white/50">Projetos Entregues</div>
                </div>
                <div>
                  <div className="font-[family-name:var(--font-cabinet)] text-4xl font-bold text-white mb-1">
                    3
                  </div>
                  <div className="text-sm text-white/50">Empresas</div>
                </div>
                <div>
                  <div className="font-[family-name:var(--font-cabinet)] text-4xl font-bold text-white mb-1">
                    Full
                  </div>
                  <div className="text-sm text-white/50">Stack Dev</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
