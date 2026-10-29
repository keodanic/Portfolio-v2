"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";
import { GraduationCap, Briefcase } from "lucide-react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("About");

  const skills = [
    {
      categoryKey: "webAttacks",
      items: [
        "Node.js",
        "NestJS",
        "TypeScript",
        "Python (FastAPI)",
        "PostgreSQL & Prisma",
        "Next.js & React Native",
        "BullMQ / Redis",
        "Docker & AWS",
      ],
    },
    {
      categoryKey: "recon",
      items: [
        "OWASP Top 10",
        "BOLA / IDOR",
        "SQLi / XSS / CSRF",
        "SSRF",
        "JWT & OAuth2 Hardening",
        "Business Logic Flaws",
      ],
    },
    {
      categoryKey: "tools",
      items: [
        "Burp Suite Pro",
        "Nmap",
        "Nuclei",
        "FFUF",
        "SQLMap",
        "Wireshark",
        "Linux & GitHub Actions",
      ],
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll(".timeline-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 85%",
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
      className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column (5 cols) - Concise Bio, Education & Stack */}
          <div ref={contentRef} className="lg:col-span-5 space-y-8">
            <div>
              <span className="font-mono text-[#0066ff] text-xs tracking-widest uppercase mb-3 block">
                {t("sectionTag")}
              </span>
              <h2 className="font-[family-name:var(--font-cabinet)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.08] mb-5">
                {t("title")}
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
                <p>{t("bio.paragraph1")}</p>
                <p>{t("bio.paragraph2")}</p>
              </div>
            </div>

            {/* Education Card */}
            <GlassCard
              variant="highlight"
              className="p-5 sm:p-6 border-zinc-800/90 bg-zinc-950/90"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#0066ff]/10 border border-[#0066ff]/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <GraduationCap className="w-5 h-5 text-[#0066ff]" />
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#0066ff] block mb-1">
                    {t("education.label")}
                  </span>
                  <h3 className="font-[family-name:var(--font-cabinet)] text-lg font-bold text-white">
                    {t("education.course")}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
                    {t("education.institution")}
                  </p>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded text-[11px] font-mono bg-zinc-900 text-zinc-300 border border-zinc-800">
                    {t("education.period")}
                  </span>
                </div>
              </div>
            </GlassCard>

            {/* Skills Groups */}
            <div ref={skillsRef} className="space-y-3">
              {skills.map((skillGroup) => (
                <GlassCard
                  key={skillGroup.categoryKey}
                  variant="default"
                  className="p-4 sm:p-5 border-zinc-800/80 bg-zinc-950/80"
                >
                  <div className="font-mono text-xs text-zinc-300 uppercase tracking-wider mb-2.5">
                    {t(`skills.${skillGroup.categoryKey}.category`)}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skillGroup.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs font-mono text-zinc-400 px-2.5 py-1 bg-zinc-900 rounded border border-zinc-800/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Right Column (7 cols) - Clean Linear-Style Experience Timeline */}
          <div ref={timelineRef} className="lg:col-span-7 lg:pt-8">
            <div className="flex items-center gap-2.5 mb-6">
              <Briefcase className="w-4 h-4 text-[#0066ff]" />
              <h3 className="font-[family-name:var(--font-cabinet)] text-xl sm:text-2xl font-bold text-white tracking-[-0.02em]">
                {t("experience.title")}
              </h3>
            </div>

            <div className="relative pl-6 border-l border-zinc-800/90 space-y-5">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="timeline-item relative group">
                  {/* Timeline Node Dot */}
                  <span
                    className={`absolute -left-[29px] top-6 w-2.5 h-2.5 rounded-full border-2 transition-colors ${
                      index === 0
                        ? "bg-[#0066ff] border-[#0066ff] shadow-[0_0_10px_rgba(0,102,255,0.6)]"
                        : "bg-zinc-950 border-zinc-600 group-hover:border-[#0066ff]"
                    }`}
                  />

                  <GlassCard
                    variant="default"
                    className="p-5 sm:p-6 border-zinc-800/80 bg-zinc-950/80 hover:border-zinc-700/80 transition-all"
                    hover
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                      <h4 className="font-[family-name:var(--font-cabinet)] text-lg font-bold text-white group-hover:text-[#0066ff] transition-colors">
                        {t(`experience.items.${index}.title`)}
                      </h4>
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-zinc-900 text-zinc-300 border border-zinc-800 whitespace-nowrap w-fit">
                        {t(`experience.items.${index}.period`)}
                      </span>
                    </div>

                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {t(`experience.items.${index}.description`)}
                    </p>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
