"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("About");

  const skills = [
    { categoryKey: "webAttacks", items: ["XSS", "SQL Injection", "CSRF", "IDOR", "SSRF", "LFI/RFI"] },
    { categoryKey: "recon", items: ["Nmap", "Burp Suite", "Subdomain Enum", "OSINT", "Content Discovery"] },
    { categoryKey: "tools", items: ["Burp Suite Pro", "Nuclei", "FFUF", "SQLMap", "Amass", "GitHub"] },
  ];

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
              {t("sectionTag")}
            </span>
            <h2 className="font-[family-name:var(--font-cabinet)] text-4xl sm:text-5xl font-bold text-white tracking-[-0.03em] mb-8">
              {t("title")}
            </h2>
            <div className="space-y-6 text-lg text-white/60 leading-relaxed">
              <p>{t("bio.paragraph1")}</p>
              <p>{t("bio.paragraph2")}</p>
              <p>{t("bio.paragraph3")}</p>
            </div>

            {/* Skills */}
            <div ref={skillsRef} className="mt-12 space-y-4">
              {skills.map((skillGroup) => (
                <GlassCard
                  key={skillGroup.categoryKey}
                  variant="subtle"
                  className="skill-card p-5"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-white font-medium min-w-[100px]">
                      {t(`skills.${skillGroup.categoryKey}.category`)}
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
              {t("experience.title")}
            </h3>
            <div className="space-y-8">
              {[0, 1, 2].map((index) => (
                <div key={index} className="philosophy-item group">
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
                        {t(`experience.items.${index}.title`)}
                      </h4>
                      <p className="text-white/50 leading-relaxed">
                        {t(`experience.items.${index}.description`)}
                        <span className="block mt-2 text-sm text-white/30 italic">
                          {t(`experience.items.${index}.period`)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Education & Stats */}
            <GlassCard variant="highlight" className="mt-12 p-8 relative overflow-hidden group">
              {/* Background Glow sutil para dar profundidade */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#0066ff]/10 rounded-full blur-3xl group-hover:bg-[#0066ff]/20 transition-colors" />

              <div className="mb-8 pb-6 border-b border-white/10">
                <div className="text-xs text-[#0066ff] uppercase tracking-[0.2em] font-bold mb-3">{t("education.label")}</div>
                <div className="font-[family-name:var(--font-cabinet)] text-2xl font-bold text-white mb-1">
                  {t("education.course")}
                </div>
                <div className="text-white/70 flex items-center gap-2">
                  {t("education.institution")}
                </div>
                <div className="text-sm text-white/40 mt-1 font-mono">{t("education.period")}</div>
              </div>

              <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                <div className="relative">
                  <div className="font-[family-name:var(--font-cabinet)] text-5xl font-bold text-white mb-2 tracking-tighter">
                    {t("stats.yearsEngineering.value")}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-white/40 font-bold" dangerouslySetInnerHTML={{ __html: t("stats.yearsEngineering.label").replace(" ", " <br/>") }} />
                </div>
                
                <div className="relative">
                  <div className="font-[family-name:var(--font-cabinet)] text-5xl font-bold text-white mb-2 tracking-tighter">
                    {t("stats.systemsDeployed.value")}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-white/40 font-bold" dangerouslySetInnerHTML={{ __html: t("stats.systemsDeployed.label").replace(" ", " <br/>") }} />
                </div>

                <div className="relative">
                  <div className="font-[family-name:var(--font-cabinet)] text-5xl font-bold text-white mb-2 tracking-tighter">
                    {t("stats.partnerships.value")}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-white/40 font-bold" dangerouslySetInnerHTML={{ __html: t("stats.partnerships.label").replace(" ", " <br/>") }} />
                </div>

                <div className="relative">
                  <div className="font-[family-name:var(--font-cabinet)] text-5xl font-bold text-[#0066ff] mb-2 tracking-tighter">
                    {t("stats.seniority.value")}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[#0066ff]/60 font-bold" dangerouslySetInnerHTML={{ __html: t("stats.seniority.label").replace(" ", " <br/>") }} />
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
