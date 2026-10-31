"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface CertificationData {
  key: "ifma" | "bugbounty" | "sycp" | "bscp";
  status: "completed" | "in-progress" | "planned";
  date: string;
  url?: string;
}

const certifications: CertificationData[] = [
  { key: "ifma", status: "completed", date: "2025", url: "http://lattes.cnpq.br/4578577844914472" },
  { key: "bugbounty", status: "completed", date: "2025" },
  { key: "sycp", status: "in-progress", date: "2026" },
  { key: "bscp", status: "planned", date: "2026" },
];

const statusKey = {
  completed: "completed",
  "in-progress": "inProgress",
  planned: "planned",
} as const;

const journeyStats = [
  { value: "85+", key: "reports" },
  { value: "10+", key: "accepted" },
  { value: "15+", key: "programs" },
] as const;

export function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("Certifications");

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <header data-reveal className="mb-12 sm:mb-16 grid lg:grid-cols-2 gap-6 lg:items-end">
          <div>
            <span className="font-mono text-xs text-zinc-500">{t("sectionTag")}</span>
            <h2 className="mt-3 font-[family-name:var(--font-cabinet)] text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 tracking-[-0.03em] leading-[1.05]">
              {t("title")}
            </h2>
          </div>
          <p className="text-zinc-400 text-base leading-relaxed max-w-md lg:justify-self-end">
            {t("description")}
          </p>
        </header>

        <ol data-reveal className="border-y border-zinc-800/80 divide-y divide-zinc-800/80">
          {certifications.map((cert) => (
            <li
              key={cert.key}
              className="py-6 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8"
            >
              <div className="md:col-span-8">
                <h3 className="text-base font-semibold text-zinc-100 tracking-tight">
                  {t(`certificationsList.${cert.key}.name`)}
                </h3>
                <p className="mt-1 font-mono text-xs text-zinc-500">
                  {t(`certificationsList.${cert.key}.issuer`)}
                </p>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-2xl">
                  {t(`certificationsList.${cert.key}.description`)}
                </p>
              </div>
              <div className="md:col-span-4 flex md:flex-col md:items-end gap-x-4 gap-y-2 font-mono text-xs text-zinc-500">
                <span className="inline-flex items-center gap-2">
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      cert.status === "completed" ? "bg-emerald-400" : "bg-zinc-600"
                    )}
                  />
                  {t(`status.${statusKey[cert.status]}`)} · {cert.date}
                </span>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    {t("verifyLink")} ↗
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div data-reveal className="mt-16 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h3 className="font-mono text-xs text-zinc-500">{t("bugBountyJourney.title")}</h3>
            <dl className="mt-4 grid grid-cols-3 border-t border-l border-zinc-800/80">
              {journeyStats.map((stat) => (
                <div key={stat.key} className="border-r border-b border-zinc-800/80 p-4 sm:p-6">
                  <dd className="font-mono text-2xl sm:text-3xl text-zinc-100 tracking-tight">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 font-mono text-[11px] text-zinc-500">
                    {t(`bugBountyJourney.stats.${stat.key}`)}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <h3 className="font-mono text-xs text-zinc-500">{t("currentlyStudying.title")}</h3>
            <ol className="mt-4 border-t border-zinc-800/80 divide-y divide-zinc-800/80">
              {[0, 1, 2].map((idx) => (
                <li key={idx} className="py-3.5 flex gap-4 text-sm text-zinc-400 leading-relaxed">
                  <span className="font-mono text-xs text-zinc-600 pt-0.5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {t(`currentlyStudying.items.${idx}`)}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
