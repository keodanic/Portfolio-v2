"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";
import {
  ExternalLink,
  Cpu,
  Brain,
  Lock,
  FileText,
  Code2,
  ShieldAlert
} from "lucide-react";
import { WebSecurityIcon, TerminalIcon, TargetIcon, TrophyIcon } from "@/components/icons/custom-icons";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

interface PlatformData {
  id: string;
  nameKey: string;
  descriptionKey: string;
  icon: string;
  url: string;
  color: string;
  skillsKey: string;
}

export function SecurityLabs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const platformsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"labs" | "writeups">("labs");
  const t = useTranslations("SecurityLabs");

  const platforms: PlatformData[] = [
    {
      id: "portswigger",
      nameKey: "portswigger",
      descriptionKey: "portswigger",
      icon: "websecurity",
      url: "https://portswigger.net/web-security",
      color: "#0066ff",
      skillsKey: "portswigger"
    },
    {
      id: "tryhackme",
      nameKey: "tryhackme",
      descriptionKey: "tryhackme",
      icon: "target",
      url: "https://tryhackme.com",
      color: "#0066ff",
      skillsKey: "tryhackme"
    },
    {
      id: "hacker101",
      nameKey: "hacker101",
      descriptionKey: "hacker101",
      icon: "trophy",
      url: "https://ctf.hacker101.com",
      color: "#0066ff",
      skillsKey: "hacker101"
    },
    {
      id: "htb",
      nameKey: "htb",
      descriptionKey: "htb",
      icon: "terminal",
      url: "https://hackerone.com/keodanic",
      color: "#0066ff",
      skillsKey: "htb"
    }
  ];

  const renderIcon = (iconName: string, color: string, size: number = 24) => {
    switch (iconName) {
      case "websecurity":
        return <WebSecurityIcon size={size} color={color} />;
      case "terminal":
        return <TerminalIcon size={size} color={color} />;
      case "target":
        return <TargetIcon size={size} color={color} />;
      case "trophy":
        return <TrophyIcon size={size} color={color} />;
      default:
        return null;
    }
  };

  const skillsData: Record<string, string[]> = {
    portswigger: ["SQLi", "XSS", "CSRF", "SSRF", "IDOR / BOLA", "Business Logic Flaws", "JWT Bypass"],
    tryhackme: ["Linux Hardening", "Network Recon", "OWASP Top 10", "Privilege Escalation"],
    hacker101: ["Broken Access Control", "IDOR", "Stored XSS", "Session Tampering"],
    htb: ["Web Recon", "Subdomain Enum", "Nuclei / FFUF", "API Security Testing"]
  };

  const progressData: Record<string, { progress: number; completed: number; total: number }> = {
    portswigger: { progress: 45, completed: 45, total: 100 },
    tryhackme: { progress: 60, completed: 30, total: 50 },
    hacker101: { progress: 40, completed: 10, total: 25 },
    htb: { progress: 50, completed: 15, total: 30 }
  };

  const writeupsList = [
    {
      id: "portswigger-infinite-money",
      title: "Exploiting Business Logic Flaws: Automated Gift Card & Coupon Loop (Python PoC)",
      platform: "PortSwigger Web Security Academy",
      severity: "High (CVSS 8.1) — Business Logic Bypass",
      tags: ["Python", "CSRF Extraction", "Session Automation", "Business Logic"],
      summary: "Automação completa em Python (Requests + Regex) explorando falha na validação cíclica de cupons de desconto e gift cards, com extração automática de tokens anti-CSRF e recomendações de mitigação transacional em NestJS/Prisma.",
      url: "https://github.com/keodanic/web-sec-labs-and-exploits"
    },
    {
      id: "hacker101-postbook",
      title: "Hacker101 CTF — Postbook: Account Takeover, IDOR & Parameter Tampering (7 Flags)",
      platform: "Hacker101 CTF (HackerOne)",
      severity: "Critical (CVSS 9.1) — Broken Access Control (BOLA/IDOR)",
      tags: ["IDOR / BOLA", "Cookie Tampering", "MD5 Hash", "Mass Assignment"],
      summary: "Write-up completo detalhando a exploração de Broken Object Level Authorization (IDOR) em posts privados, falsificação de autoria via manipulação de parâmetros ocultos e sequestro de sessão por cookie previsível em MD5.",
      url: "https://github.com/keodanic/web-sec-labs-and-exploits"
    }
  ];

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

      if (platformsRef.current) {
        const cards = platformsRef.current.querySelectorAll(".platform-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: platformsRef.current,
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
      id="labs"
      className="relative py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16">
          <span className="text-[#0066ff] text-sm tracking-widest uppercase mb-4 block">
            {t("sectionTag")}
          </span>
          <h2 className="font-[family-name:var(--font-cabinet)] text-4xl sm:text-5xl font-bold text-white tracking-[-0.03em] mb-6">
            {t("title")}
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl">
            {t("description")}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-12">
          <button
            onClick={() => setActiveTab("labs")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === "labs"
                ? "bg-[#0066ff] text-white"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Cpu className="w-4 h-4" />
            {t("tabs.labs")}
          </button>
          <button
            onClick={() => setActiveTab("writeups")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === "writeups"
                ? "bg-[#0066ff] text-white"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            {t("tabs.writeups")} (2)
          </button>
        </div>

        {/* Labs Tab */}
        {activeTab === "labs" && (
          <div ref={platformsRef} className="space-y-6">
            {platforms.map((platform) => {
              const progress = progressData[platform.id];
              const skills = skillsData[platform.id];
              
              return (
                <GlassCard
                  key={platform.id}
                  variant="default"
                  className="platform-card group"
                  hover
                >
                  <div className="p-6 sm:p-8">
                    <div className="grid lg:grid-cols-3 gap-8 items-center">
                      {/* Left - Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start gap-5">
                          <div className="flex-shrink-0">
                            {renderIcon(platform.icon, "#0066ff", 40)}
                            <div className="w-12 h-px bg-gradient-to-r from-[#0066ff] to-transparent mt-3" />
                          </div>
                          <div className="flex-1 pt-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-[family-name:var(--font-cabinet)] text-lg font-bold text-white group-hover:text-[#0066ff] transition-colors">
                                {t(`platforms.${platform.nameKey}.name`)}
                              </h3>
                              <a
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/30 hover:text-[#0066ff] transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                            <p className="text-white/50 text-sm leading-relaxed">
                              {t(`platforms.${platform.descriptionKey}.description`)}
                            </p>
                          </div>
                        </div>

                        {/* Skills Tags */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-xs text-white/60 px-3 py-1.5 bg-white/5 rounded-full border border-white/10"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right - Progress */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/40">{t("progressLabels.progress")}</span>
                          <span className="text-white font-medium">
                            {progress.completed}+ Labs
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${progress.progress}%`,
                              backgroundColor: platform.color
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Brain className="w-4 h-4 text-[#0066ff]" />
                            <span className="text-sm text-white/60">
                              {progress.progress}{t("progressLabels.percentComplete")}
                            </span>
                          </div>
                          <span className="text-xs text-[#10B981]">
                            {progress.completed}+ {t("progressLabels.completed")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              );
            })}

            {/* CTA */}
            <div className="flex justify-center pt-8">
              <MagneticButton
                variant="outline"
                size="lg"
                onClick={() => window.open("https://github.com/keodanic/web-sec-labs-and-exploits", "_blank")}
              >
                <Lock className="w-4 h-4 mr-2" />
                {t("ctaButton")}
              </MagneticButton>
            </div>
          </div>
        )}

        {/* Write-ups Tab */}
        {activeTab === "writeups" && (
          <div className="space-y-6">
            {writeupsList.map((item) => (
              <GlassCard
                key={item.id}
                variant="default"
                className="p-8 group cursor-pointer"
                hover
                onClick={() => window.open(item.url, "_blank")}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5 text-[#10B981]" />
                    <span className="text-sm font-mono text-[#0066ff]">{item.platform}</span>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
                    {item.severity}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-cabinet)] text-2xl font-bold text-white group-hover:text-[#0066ff] transition-colors mb-3">
                  {item.title}
                </h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  {item.summary}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs text-white/60 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm text-[#0066ff] font-medium">
                    <Code2 className="w-4 h-4" />
                    GitHub Repository & PoC
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
