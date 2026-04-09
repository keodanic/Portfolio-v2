"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";
import { 
  ExternalLink,
  Target,
  BookOpen
} from "lucide-react";
import { CertificationIcon, CompletedIcon, InProgressIcon, PlannedIcon } from "@/components/icons/custom-icons";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

interface CertificationData {
  id: string;
  nameKey: string;
  issuerKey: string;
  status: "completed" | "in-progress" | "planned";
  date?: string;
  expectedDate?: string;
  credentialId?: string;
  url?: string;
  descriptionKey: string;
  color: string;
}

export function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);
  const t = useTranslations("Certifications");

  const certifications: CertificationData[] = [
    {
      id: "ejpt",
      nameKey: "ejpt",
      issuerKey: "ejpt",
      status: "completed",
      date: "2025",
      credentialId: "",
      url: "",
      descriptionKey: "ejpt",
      color: "#0066ff"
    },
    {
      id: "ecppt",
      nameKey: "ecppt",
      issuerKey: "ecppt",
      status: "in-progress",
      expectedDate: "2025",
      descriptionKey: "ecppt",
      color: "#0066ff"
    },
    {
      id: "oscp",
      nameKey: "oscp",
      issuerKey: "oscp",
      status: "planned",
      expectedDate: "2026",
      descriptionKey: "oscp",
      color: "#0066ff"
    },
    {
      id: "bscp",
      nameKey: "bscp",
      issuerKey: "bscp",
      status: "planned",
      expectedDate: "2025",
      descriptionKey: "bscp",
      color: "#0066ff"
    }
  ];

  const bugBountyStats = {
    platforms: [
      { name: "HackerOne", handle: "", rank: "", reports: 0 },
      { name: "Bugcrowd", handle: "", rank: "", reports: 0 },
      { name: "Intigriti", handle: "", rank: "", reports: 0 }
    ],
    totalReports: 0,
    acceptedReports: 0,
    programs: 0
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

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".cert-card");
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
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (statsRef.current) {
        const items = statsRef.current.querySelectorAll(".stat-item");
        gsap.fromTo(
          items,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: statsRef.current,
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
        return <CompletedIcon size={20} color="#10B981" />;
      case "in-progress":
        return <InProgressIcon size={20} color="#F59E0B" />;
      case "planned":
        return <PlannedIcon size={20} color="#9CA3AF" />;
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
      className="relative py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Header & Certifications */}
          <div>
            {/* Section Header */}
            <div ref={headerRef} className="mb-12">
              <span className="text-[#0066ff] text-sm tracking-widest uppercase mb-4 block">
                {t("sectionTag")}
              </span>
              <h2 className="font-[family-name:var(--font-cabinet)] text-4xl sm:text-5xl font-bold text-white tracking-[-0.03em] mb-6">
                {t("title")}
              </h2>
              <p className="text-white/60 text-lg leading-relaxed max-w-xl">
                {t("description")}
              </p>
            </div>

            {/* Certifications Grid */}
            <div ref={cardsRef} className="space-y-4">
              {certifications.map((cert) => (
                <GlassCard
                  key={cert.id}
                  variant={cert.status === "completed" ? "highlight" : "default"}
                  className={`cert-card group cursor-pointer transition-all duration-300 ${
                    hoveredCert === cert.id ? "scale-[1.02]" : ""
                  }`}
                  hover
                  onMouseEnter={() => setHoveredCert(cert.id)}
                  onMouseLeave={() => setHoveredCert(null)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-5">
                        <div className="flex-shrink-0">
                          <CertificationIcon 
                            size={36}
                            color="#0066ff"
                            className="transition-colors duration-300"
                          />
                          <div className="w-12 h-px bg-gradient-to-r from-[#0066ff] to-transparent mt-3" />
                        </div>
                        <div className="pt-1">
                          <h3 className="font-[family-name:var(--font-cabinet)] text-lg font-bold text-white group-hover:text-[#0066ff] transition-colors">
                            {t(`certificationsList.${cert.nameKey}.name`)}
                          </h3>
                          <p className="text-sm text-white/50">{t(`certificationsList.${cert.issuerKey}.issuer`)}</p>
                        </div>
                      </div>
                      
                      {/* Status Badge */}
                      <div 
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: cert.status === "completed" 
                            ? "rgba(16, 185, 129, 0.1)" 
                            : cert.status === "in-progress"
                            ? "rgba(245, 158, 11, 0.1)"
                            : "rgba(255, 255, 255, 0.05)",
                          color: cert.status === "completed" 
                            ? "#10B981" 
                            : cert.status === "in-progress"
                            ? "#F59E0B"
                            : "rgba(255, 255, 255, 0.5)"
                        }}
                      >
                        {getStatusIcon(cert.status)}
                        <span className="hidden sm:inline">{getStatusText(cert.status)}</span>
                      </div>
                    </div>

                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                      {t(`certificationsList.${cert.descriptionKey}.description`)}
                    </p>

                    {/* Date & Credential */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="text-sm">
                        {cert.status === "completed" && cert.date ? (
                          <span className="text-white/40">
                            {t("dateLabels.earned")}: <span className="text-white/60">{cert.date}</span>
                          </span>
                        ) : cert.expectedDate ? (
                          <span className="text-white/40">
                            {t("dateLabels.target")}: <span className="text-white/60">{cert.expectedDate}</span>
                          </span>
                        ) : null}
                      </div>

                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-[#0066ff] hover:text-[#0066ff]/80 transition-colors"
                        >
                          {t("verifyLink")}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Right Column - Bug Bounty Stats */}
          <div className="lg:pt-32">
            <div ref={statsRef}>
              {/* BB Stats Card */}
              <GlassCard variant="highlight" className="mb-8 p-8 relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#0066ff]/10 rounded-full blur-3xl" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0066ff]/10 border border-[#0066ff]/30 flex items-center justify-center">
                      <Target className="w-6 h-6 text-[#0066ff]" />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-cabinet)] text-xl font-bold text-white">
                        {t("bugBountyJourney.title")}
                      </h3>
                      <p className="text-sm text-white/50">{t("bugBountyJourney.subtitle")}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="stat-item text-center p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="font-[family-name:var(--font-cabinet)] text-2xl font-bold text-white mb-1">
                        {bugBountyStats.totalReports}
                      </div>
                      <div className="text-xs text-white/40 uppercase tracking-wider">{t("bugBountyJourney.stats.reports")}</div>
                    </div>
                    <div className="stat-item text-center p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="font-[family-name:var(--font-cabinet)] text-2xl font-bold text-[#10B981] mb-1">
                        {bugBountyStats.acceptedReports}
                      </div>
                      <div className="text-xs text-white/40 uppercase tracking-wider">{t("bugBountyJourney.stats.accepted")}</div>
                    </div>
                    <div className="stat-item text-center p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="font-[family-name:var(--font-cabinet)] text-2xl font-bold text-white mb-1">
                        {bugBountyStats.programs}
                      </div>
                      <div className="text-xs text-white/40 uppercase tracking-wider">{t("bugBountyJourney.stats.programs")}</div>
                    </div>
                  </div>

                  <p className="text-sm text-white/50 text-center">
                    {t("bugBountyJourney.description")}
                  </p>
                </div>
              </GlassCard>

              {/* Platforms */}
              <h4 className="font-[family-name:var(--font-cabinet)] text-lg font-semibold text-white mb-4">
                {t("activePlatforms.title")}
              </h4>
              <div className="space-y-3 mb-8">
                {bugBountyStats.platforms.map((platform, index) => (
                  <div 
                    key={platform.name}
                    className="stat-item flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-white/30 font-mono text-sm">0{index + 1}</span>
                      <span className="text-white font-medium">{platform.name}</span>
                    </div>
                    <span className="text-sm text-white/40">
                      {platform.reports > 0 ? `${platform.reports} ${t("activePlatforms.reports")}` : t("activePlatforms.gettingStarted")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Study Resources */}
              <GlassCard variant="subtle" className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-5 h-5 text-[#0066ff]" />
                  <h4 className="font-[family-name:var(--font-cabinet)] font-semibold text-white">
                    {t("currentlyStudying.title")}
                  </h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-white/60">
                    <span className="w-4 h-4 rounded-full bg-white/10 border border-white/20 flex-shrink-0 mt-0.5" />
                    <span>{t("currentlyStudying.items.0")}</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-white/60">
                    <span className="w-4 h-4 rounded-full bg-white/10 border border-white/20 flex-shrink-0 mt-0.5" />
                    <span>{t("currentlyStudying.items.1")}</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-white/60">
                    <span className="w-4 h-4 rounded-full bg-white/10 border border-white/20 flex-shrink-0 mt-0.5" />
                    <span>{t("currentlyStudying.items.2")}</span>
                  </li>
                </ul>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
