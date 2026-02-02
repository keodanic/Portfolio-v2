"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";
import { Search, Lightbulb, Palette, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Every great design starts with understanding. I dive deep into user research, stakeholder interviews, and competitive analysis to uncover the real problems worth solving.",
    icon: Search,
    details: ["User Interviews", "Competitive Analysis", "Stakeholder Workshops", "Problem Definition"],
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "With insights in hand, I map out the experience architecture. Information hierarchy, user flows, and strategic roadmaps that align business goals with user needs.",
    icon: Lightbulb,
    details: ["Information Architecture", "User Flows", "Content Strategy", "KPI Definition"],
  },
  {
    number: "03",
    title: "Design",
    description:
      "This is where ideas take shape. From wireframes to high-fidelity prototypes, I craft interfaces that balance aesthetic beauty with functional clarity.",
    icon: Palette,
    details: ["Wireframing", "Visual Design", "Prototyping", "Design Systems"],
  },
  {
    number: "04",
    title: "Refine",
    description:
      "Design is never done. Through user testing, iterative refinement, and close collaboration with engineering, I ensure the final product exceeds expectations.",
    icon: Rocket,
    details: ["Usability Testing", "Iteration", "Developer Handoff", "Launch Support"],
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
            A proven approach to exceptional design
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
