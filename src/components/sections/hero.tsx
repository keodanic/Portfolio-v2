"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { CVModal } from "@/components/modals/cv-modal";
import { ContactModal } from "@/components/modals/contact-modal";
import { useTranslations } from "next-intl";

const pillars = [
  { key: "webSecurity", tag: "Backend & SaaS" },
  { key: "reconnaissance", tag: "AppSec" },
  { key: "bugBounty", tag: "Offensive" },
  { key: "codeReview", tag: "Full-Stack" },
] as const;

const stats = ["yearsExperience", "projectsDelivered", "companies"] as const;

export function Hero() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const t = useTranslations("Hero");

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06, delay: 0.05 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-20 sm:pb-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div data-reveal className="flex items-center gap-2.5 font-mono text-xs text-zinc-500">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span>Software Engineer · AppSec Researcher</span>
            </div>

            <h1
              data-reveal
              className="mt-6 font-[family-name:var(--font-cabinet)] text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.035em] leading-[0.95] text-zinc-100"
            >
              Victor Daniel
            </h1>

            <p data-reveal className="mt-6 text-lg sm:text-xl text-zinc-100 leading-snug tracking-[-0.01em] max-w-2xl">
              {t("subtitle1")}
            </p>
            <p data-reveal className="mt-3 text-base text-zinc-400 leading-relaxed max-w-2xl">
              {t("subtitle2")}
            </p>

            <div data-reveal className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton size="lg" onClick={() => setIsCVModalOpen(true)}>
                {t("ctaDownloadCV")}
              </MagneticButton>
              <MagneticButton
                variant="outline"
                size="lg"
                onClick={() => setIsContactModalOpen(true)}
              >
                {t("ctaTalkToMe")}
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>

            <dl data-reveal className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs">
              {stats.map((key) => (
                <div key={key} className="flex items-baseline gap-2">
                  <dt className="sr-only">{t(`stats.${key}.label`)}</dt>
                  <dd className="text-zinc-100 text-sm">{t(`stats.${key}.value`)}</dd>
                  <dd className="text-zinc-500">{t(`stats.${key}.label`)}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Technical pillars — 1px architectural matrix */}
          <div
            data-reveal
            className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-zinc-800/80"
          >
            {pillars.map((pillar, i) => (
              <div
                key={pillar.key}
                className="border-r border-b border-zinc-800/80 p-5 sm:p-6 transition-colors duration-200 hover:bg-zinc-900/40"
              >
                <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span>{pillar.tag}</span>
                </div>
                <h3 className="mt-8 text-sm font-semibold text-zinc-100 tracking-tight">
                  {t(`cards.${pillar.key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {t(`cards.${pillar.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
