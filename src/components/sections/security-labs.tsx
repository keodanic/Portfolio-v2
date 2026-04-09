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
  Bookmark
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

  // Platform data with translations
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
      id: "htb",
      nameKey: "htb",
      descriptionKey: "htb",
      icon: "terminal",
      url: "https://app.hackthebox.com",
      color: "#0066ff",
      skillsKey: "htb"
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
    }
  ];

  // Helper function to render icon by name
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

  // Skills data
  const skillsData: Record<string, string[]> = {
    portswigger: ["XSS", "SQLi", "CSRF", "SSRF", "IDOR", "XXE"],
    htb: ["Enumeration", "Exploitation", "Privilege Escalation", "Active Directory"],
    tryhackme: ["Networking", "Linux", "Web Fundamentals", "Pentesting"],
    hacker101: ["Web Hacking", "Mobile", "Crypto", "Recon"]
  };

  // Progress data (would come from API/state in real app)
  const progressData: Record<string, { progress: number; completed: number; total: number }> = {
    portswigger: { progress: 0, completed: 0, total: 300 },
    htb: { progress: 0, completed: 0, total: 100 },
    tryhackme: { progress: 0, completed: 0, total: 50 },
    hacker101: { progress: 0, completed: 0, total: 50 }
  };

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
            {t("tabs.writeups")}
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
                            {progress.completed}/{progress.total}
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
                            <Brain className="w-4 h-4 text-white/30" />
                            <span className="text-sm text-white/50">
                              {progress.progress === 0 ? t("progressLabels.gettingStarted") : `${progress.progress}${t("progressLabels.percentComplete")}`}
                            </span>
                          </div>
                          {progress.progress > 0 && (
                            <span className="text-xs text-white/40">
                              {progress.completed} {t("progressLabels.completed")}
                            </span>
                          )}
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
                onClick={() => window.open("https://app.hackthebox.com/profile/", "_blank")}
              >
                <Lock className="w-4 h-4 mr-2" />
                {t("ctaButton")}
              </MagneticButton>
            </div>
          </div>
        )}

        {/* Write-ups Tab */}
        {activeTab === "writeups" && (
          <div>
            {/* Empty State */}
            <GlassCard variant="subtle" className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6">
                <FileText className="w-8 h-8 text-white/30" />
              </div>
              <h3 className="font-[family-name:var(--font-cabinet)] text-xl font-bold text-white mb-3">
                {t("writeups.emptyState.title")}
              </h3>
              <p className="text-white/50 max-w-md mx-auto mb-6">
                {t("writeups.emptyState.description")}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-white/40">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                {t("writeups.emptyState.status")}
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </section>
  );
}
