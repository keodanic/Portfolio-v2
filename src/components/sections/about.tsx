"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    categoryKey: "webAttacks",
    items: ["Node.js", "NestJS", "TypeScript", "Python (FastAPI)", "PostgreSQL", "Prisma", "Next.js", "React Native", "BullMQ", "Redis", "Docker", "AWS"],
  },
  {
    categoryKey: "recon",
    items: ["OWASP Top 10", "BOLA/IDOR", "SQLi", "XSS", "CSRF", "SSRF", "JWT & OAuth2", "Business Logic"],
  },
  {
    categoryKey: "tools",
    items: ["Burp Suite", "Nmap", "Nuclei", "FFUF", "SQLMap", "Wireshark", "Linux", "GitHub Actions"],
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("About");

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
      id="about"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div data-reveal className="lg:col-span-5">
          <span className="font-mono text-xs text-zinc-500">{t("sectionTag")}</span>
          <h2 className="mt-3 font-[family-name:var(--font-cabinet)] text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 tracking-[-0.03em] leading-[1.05]">
            {t("title")}
          </h2>
          <div className="mt-6 space-y-4 text-base text-zinc-400 leading-relaxed">
            <p>{t("bio.paragraph1")}</p>
            <p>{t("bio.paragraph2")}</p>
          </div>

          <dl className="mt-10 border-t border-zinc-800/80 divide-y divide-zinc-800/80">
            {skills.map((group) => (
              <div key={group.categoryKey} className="py-4 grid grid-cols-[7rem_1fr] gap-4">
                <dt className="font-mono text-xs text-zinc-300">
                  {t(`skills.${group.categoryKey}.category`)}
                </dt>
                <dd className="font-mono text-xs text-zinc-500 leading-relaxed">
                  {group.items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-7 space-y-14">
          <div data-reveal>
            <h3 className="font-mono text-xs text-zinc-500 pb-4 border-b border-zinc-800/80">
              {t("experience.title")}
            </h3>
            <ol className="divide-y divide-zinc-800/80 border-b border-zinc-800/80">
              {[0, 1, 2, 3].map((index) => {
                const [company, role] = t(`experience.items.${index}.title`).split(" — ");
                return (
                  <li key={index} className="py-6">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-6">
                      <h4 className="text-base font-semibold text-zinc-100 tracking-tight">
                        {company}
                        {role && <span className="font-normal text-zinc-400"> · {role}</span>}
                      </h4>
                      <span className="font-mono text-xs text-zinc-500 whitespace-nowrap">
                        {t(`experience.items.${index}.period`)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-400 leading-relaxed max-w-2xl">
                      {t(`experience.items.${index}.description`)}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          <div data-reveal>
            <h3 className="font-mono text-xs text-zinc-500 pb-4 border-b border-zinc-800/80">
              {t("education.label")}
            </h3>
            <div className="py-6 border-b border-zinc-800/80 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-6">
              <div>
                <h4 className="text-base font-semibold text-zinc-100 tracking-tight">
                  {t("education.course")}
                </h4>
                <p className="mt-1 text-sm text-zinc-400">{t("education.institution")}</p>
              </div>
              <span className="font-mono text-xs text-zinc-500 whitespace-nowrap">
                {t("education.period")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
