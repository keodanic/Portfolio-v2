"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";
import { Terminal, ShieldCheck, Database, Layout } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "System Architecture",
    description:
      "Before coding, I design the blueprint. I define the data flow, choose the right database schema (PostgreSQL/NoSQL), and architect scalable backend services using NestJS.",
    icon: Terminal,
    details: ["Data Modeling", "API Design", "Schema Definition", "System Blueprint"],
  },
  {
    number: "02",
    title: "Security-First Dev",
    description:
      "Security isn't an afterthought. I implement robust authentication (JWT/OAuth2) and follow OWASP best practices to protect data from the ground up.",
    icon: ShieldCheck,
    details: ["Encryption", "Authentication", "Rate Limiting", "OWASP Standards"],
  },
  {
    number: "03",
    title: "Backend Core",
    description:
      "Building the engine. I develop performant APIs with Node.js and Prisma, ensuring type safety, clean code, and seamless integration with infrastructure.",
    icon: Database,
    details: ["NestJS/Node.js", "TypeORM/Prisma", "Clean Code", "Docker"],
  },
  {
    number: "04",
    title: "Full-Stack Delivery",
    description:
      "Connecting the dots. I craft modern Web (Next.js) and Mobile (React Native) interfaces that consume the secure backend, ensuring a smooth, end-to-end user experience.",
    icon: Layout,
    details: ["React & Next.js", "React Native", "State Management", "Performance Optimization"],
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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

      
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 60%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );
      }

      // Steps animation
      if (stepsRef.current) {
        const stepCards = stepsRef.current.querySelectorAll(".process-step");
        stepCards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: index % 2 === 0 ? -50 : 50,
            },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "expo.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className="text-[#0066ff] text-sm tracking-widest uppercase mb-4 block">
            My Process
          </span>
          <h2 className="font-[family-name:var(--font-cabinet)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] max-w-3xl mx-auto">
            A technical approach to scalable systems
          </h2>
        </div>

        {/* Process Steps */}
        <div ref={stepsRef} className="relative">
          {/* Progress Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#0066ff] to-[#0066ff]/50 origin-top"
              style={{ height: "100%" }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`process-step relative lg:grid lg:grid-cols-2 lg:gap-16 items-center ${
                    isEven ? "" : "lg:direction-rtl"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`${isEven ? "lg:pr-20" : "lg:pl-20 lg:col-start-2"}`}
                    style={{ direction: "ltr" }}
                  >
                    <GlassCard
                      variant={index === 0 ? "highlight" : "default"}
                      className="p-8"
                    >
                      <div className="flex items-start gap-6">
                        <div
                          className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${
                            index === 0
                              ? "bg-[#0066ff]/10 text-[#0066ff]"
                              : "bg-white/5 text-white/70"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span
                              className={`font-[family-name:var(--font-cabinet)] text-sm font-bold ${
                                index === 0 ? "text-[#0066ff]" : "text-white/30"
                              }`}
                            >
                              {step.number}
                            </span>
                            <h3 className="font-[family-name:var(--font-cabinet)] text-2xl font-bold text-white">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-white/60 leading-relaxed mb-6">
                            {step.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {step.details.map((detail) => (
                              <span
                                key={detail}
                                className="text-xs text-white/50 px-3 py-1 bg-white/5 rounded-full border border-white/10"
                              >
                                {detail}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </div>

                  {/* Center Dot - Desktop */}
                  <div
                    className={`hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 ${
                      index === 0
                        ? "bg-[#0066ff] border-[#0066ff]"
                        : "bg-black border-white/30"
                    } items-center justify-center z-10`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        index === 0 ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  </div>

                  {/* Empty space for alternating layout */}
                  <div
                    className={`hidden lg:block ${
                      isEven ? "lg:col-start-2" : "lg:col-start-1 lg:row-start-1"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
