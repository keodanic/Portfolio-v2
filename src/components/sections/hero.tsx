"use client";

import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowDown, Shield, Terminal } from "lucide-react";
import {
  WebSecurityIcon,
  ReconIcon,
  BugBountyIcon,
  CodeReviewIcon,
} from "@/components/icons/custom-icons";
import { CVModal } from "@/components/modals/cv-modal";
import { ContactModal } from "@/components/modals/contact-modal";
import { useTranslations } from "next-intl";

const Beams = lazy(() => import("@/components/background/beams"));

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const t = useTranslations("Hero");

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.1,
          }
        );
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".bento-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.25,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      key: "webSecurity",
      tag: "BACKEND & SAAS",
      icon: WebSecurityIcon,
    },
    {
      key: "reconnaissance",
      tag: "OFFENSIVE APPSEC",
      icon: ReconIcon,
    },
    {
      key: "bugBounty",
      tag: "DEVSECOPS & CLOUD",
      icon: BugBountyIcon,
    },
    {
      key: "codeReview",
      tag: "ZERO-TRUST API",
      icon: CodeReviewIcon,
    },
  ] as const;

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:py-24"
      >
        {/* Animated Beams Background */}
        <div className="absolute inset-0 z-0">
          <Suspense
            fallback={
              <div className="absolute inset-0 bg-black">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
              </div>
            }
          >
            <Beams
              beamWidth={3}
              beamHeight={30}
              beamNumber={14}
              lightColor="#ffffff"
              speed={1.2}
              noiseIntensity={1.4}
              scale={0.15}
              rotation={15}
            />
          </Suspense>
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-12 items-center">
            {/* Left Column (7 cols) - High-Contrast Typography */}
            <div ref={contentRef} className="lg:col-span-7 space-y-6">
              {/* Eyebrow Status Pill */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Software Engineer & AppSec Researcher</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-[family-name:var(--font-cabinet)] text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold tracking-[-0.03em] leading-[0.94]">
                <span className="block text-white">Victor</span>
                <span className="block text-zinc-500">Daniel</span>
              </h1>

              {/* Concise Subtitle */}
              <div className="space-y-2.5 max-w-xl">
                <p className="text-base sm:text-lg text-zinc-200 font-semibold leading-snug">
                  {t("subtitle1")}
                </p>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                  {t("subtitle2")}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3.5 pt-2">
                <MagneticButton
                  variant="electric"
                  size="lg"
                  onClick={() => setIsCVModalOpen(true)}
                >
                  {t("ctaDownloadCV")}
                </MagneticButton>
                <MagneticButton
                  variant="outline"
                  size="lg"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  {t("ctaTalkToMe")}
                </MagneticButton>
              </div>

              {/* Clean Scannable Metrics Strip */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 border-t border-zinc-800/80 max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                    {t("stats.yearsExperience.value")}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {t("stats.yearsExperience.label")}
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                    {t("stats.projectsDelivered.value")}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {t("stats.projectsDelivered.label")}
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                    {t("stats.companies.value")}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {t("stats.companies.label")}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols) - Structured Architecture Bento Grid */}
            <div ref={cardsRef} className="lg:col-span-5 hidden lg:block">
              <div className="p-3 rounded-2xl border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl shadow-2xl space-y-3">
                {/* Top Window Header */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-900/70 border border-zinc-800/80 font-mono text-[11px] text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[#0066ff]" />
                    <span>architecture-sec-profile.ts</span>
                  </div>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Secure-by-Design
                  </span>
                </div>

                {/* 2x2 Bento Pillars */}
                <div className="grid grid-cols-2 gap-3">
                  {pillars.map((pillar) => {
                    const IconComponent = pillar.icon;
                    return (
                      <GlassCard
                        key={pillar.key}
                        variant="default"
                        className="bento-card p-4 border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-9 h-9 rounded-lg bg-[#0066ff]/10 border border-[#0066ff]/25 flex items-center justify-center">
                            <IconComponent size={18} color="#0066ff" />
                          </div>
                          <span className="font-mono text-[10px] text-zinc-500">
                            {pillar.tag}
                          </span>
                        </div>
                        <h3 className="font-[family-name:var(--font-cabinet)] text-sm font-bold text-white mb-1">
                          {t(`cards.${pillar.key}.title`)}
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {t(`cards.${pillar.key}.description`)}
                        </p>
                      </GlassCard>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator — hidden on small mobile to prevent overlap */}
        <div className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-zinc-500">
          <span className="font-mono text-[10px] tracking-widest uppercase">
            {t("scrollIndicator")}
          </span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </section>

      {/* Modals */}
      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
