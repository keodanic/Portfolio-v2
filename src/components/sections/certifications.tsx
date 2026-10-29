"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";
import { ExternalLink, Target, BookOpen } from "lucide-react";
import {
  CertificationIcon,
  CompletedIcon,
  InProgressIcon,
  PlannedIcon,
} from "@/components/icons/custom-icons";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

interface CertificationData {
  id: string;
  key: "ifma" | "bugbounty" | "sycp" | "bscp";
  status: "completed" | "in-progress" | "planned";
  date?: string;
  expectedDate?: string;
  url?: string;
}

export function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Certifications");

  const certifications: CertificationData[] = [
    {
      id: "ifma",
      key: "ifma",
      status: "completed",
      date: "2025",
      url: "http://lattes.cnpq.br/4578577844914472",
    },
    {
      id: "bugbounty",
      key: "bugbounty",
      status: "completed",
      date: "2025",
    },
    {
      id: "sycp",
      key: "sycp",
      status: "in-progress",
      expectedDate: "2026",
    },
    {
      id: "bscp",
      key: "bscp",
      status: "planned",
      expectedDate: "2026",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".cert-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getStatusIcon = (status: CertificationData["status"]) => {
    switch (status) {
      case "completed":
        return <CompletedIcon size={16} color="#10B981" />;
      case "in-progress":
        return <InProgressIcon size={16} color="#F59E0B" />;
      case "planned":
        return <PlannedIcon size={16} color="#9CA3AF" />;
    }
  };

  const getStatusText = (status: CertificationData["status"]) => {
    switch (status) {
      case "completed":
        return t("status.completed");
      case "in-progress":
        return t("status.inProgress");
      case "planned":
        return t("status.planned");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="mb-12 sm:mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <span className="font-mono text-[#0066ff] text-xs tracking-widest uppercase mb-3 block">
              {t("sectionTag")}
            </span>
            <h2 className="font-[family-name:var(--font-cabinet)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.08]">
              {t("title")}
            </h2>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* 2x2 Grid of Academic & Offensive Security Credentials */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8"
        >
          {certifications.map((cert) => (
            <GlassCard
              key={cert.id}
              variant={cert.status === "completed" ? "highlight" : "default"}
              className="cert-card group p-5 sm:p-6 border-zinc-800/80 bg-zinc-950/80 hover:border-zinc-700/80 transition-all"
              hover
            >
              <div className="flex flex-col h-full justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-[#0066ff]/10 border border-[#0066ff]/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CertificationIcon size={20} color="#0066ff" />
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-cabinet)] text-lg font-bold text-white group-hover:text-[#0066ff] transition-colors leading-snug">
                          {t(`certificationsList.${cert.key}.name`)}
                        </h3>
                        <p className="font-mono text-xs text-[#0066ff] mt-0.5">
                          {t(`certificationsList.${cert.key}.issuer`)}
                        </p>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium flex-shrink-0 border"
                      style={{
                        backgroundColor:
                          cert.status === "completed"
                            ? "rgba(16, 185, 129, 0.1)"
                            : cert.status === "in-progress"
                            ? "rgba(245, 158, 11, 0.1)"
                            : "rgba(255, 255, 255, 0.04)",
                        borderColor:
                          cert.status === "completed"
                            ? "rgba(16, 185, 129, 0.25)"
                            : cert.status === "in-progress"
                            ? "rgba(245, 158, 11, 0.25)"
                            : "rgba(255, 255, 255, 0.1)",
                        color:
                          cert.status === "completed"
                            ? "#10B981"
                            : cert.status === "in-progress"
                            ? "#F59E0B"
                            : "#9CA3AF",
                      }}
                    >
                      {getStatusIcon(cert.status)}
                      <span>{getStatusText(cert.status)}</span>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                    {t(`certificationsList.${cert.key}.description`)}
                  </p>
                </div>

                {/* Footer Row */}
                <div className="flex items-center justify-between pt-3 border-t border-zinc-800/70 font-mono text-xs">
                  <span className="text-zinc-500">
                    {cert.status === "completed" && cert.date ? (
                      <>
                        {t("dateLabels.earned")}:{" "}
                        <span className="text-zinc-300">{cert.date}</span>
                      </>
                    ) : cert.expectedDate ? (
                      <>
                        {t("dateLabels.target")}:{" "}
                        <span className="text-zinc-300">{cert.expectedDate}</span>
                      </>
                    ) : null}
                  </span>

                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#0066ff] hover:underline"
                    >
                      <span>{t("verifyLink")}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Bottom Compact Row: Bug Bounty Summary & Research Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          <GlassCard
            variant="default"
            className="lg:col-span-7 p-5 sm:p-6 border-zinc-800/80 bg-zinc-950/80 flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#0066ff]/10 border border-[#0066ff]/25 flex items-center justify-center">
                <Target className="w-5 h-5 text-[#0066ff]" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-cabinet)] text-lg font-bold text-white">
                  {t("bugBountyJourney.title")}
                </h3>
                <p className="text-xs text-zinc-400">
                  {t("bugBountyJourney.subtitle")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-center">
                <div className="font-mono text-xl sm:text-2xl font-bold text-white">
                  85+
                </div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase mt-0.5">
                  {t("bugBountyJourney.stats.reports")}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-center">
                <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-400">
                  10+
                </div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase mt-0.5">
                  {t("bugBountyJourney.stats.accepted")}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-center">
                <div className="font-mono text-xl sm:text-2xl font-bold text-white">
                  15+
                </div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase mt-0.5">
                  {t("bugBountyJourney.stats.programs")}
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard
            variant="default"
            className="lg:col-span-5 p-5 sm:p-6 border-zinc-800/80 bg-zinc-950/80"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <BookOpen className="w-4 h-4 text-[#0066ff]" />
              <h4 className="font-[family-name:var(--font-cabinet)] text-base font-bold text-white">
                {t("currentlyStudying.title")}
              </h4>
            </div>
            <ul className="space-y-2.5">
              {[0, 1, 2].map((idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] flex-shrink-0 mt-2" />
                  <span className="leading-relaxed">
                    {t(`currentlyStudying.items.${idx}`)}
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
