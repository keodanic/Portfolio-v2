"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface PlatformData {
  key: "portswigger" | "htb" | "tryhackme" | "hacker101";
  url: string;
  skills: string[];
}

const platforms: PlatformData[] = [
  {
    key: "portswigger",
    url: "https://portswigger.net/web-security",
    skills: ["SQLi", "XSS", "CSRF", "SSRF", "BOLA/IDOR", "Business Logic", "JWT"],
  },
  {
    key: "htb",
    url: "https://hackerone.com/keodanic",
    skills: ["Web Recon", "Subdomain Enum", "API Security", "CVE Triage"],
  },
  {
    key: "tryhackme",
    url: "https://tryhackme.com",
    skills: ["Linux Hardening", "Network Recon", "OWASP Top 10", "PrivEsc"],
  },
  {
    key: "hacker101",
    url: "https://ctf.hacker101.com",
    skills: ["Broken Access Control", "IDOR", "Session Tampering", "Crypto"],
  },
];

function CodePane({
  label,
  meta,
  children,
  className,
}: {
  label: string;
  meta?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="flex items-center justify-between gap-4 px-4 sm:px-5 h-10 border-b border-zinc-800/80 font-mono text-[11px] text-zinc-500">
        <span className="truncate">{label}</span>
        {meta && <span className="flex-shrink-0">{meta}</span>}
      </div>
      <pre className="p-4 sm:p-5 font-mono text-xs leading-relaxed text-zinc-400 overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function SecurityLabs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [redBlueTab, setRedBlueTab] = useState<"exploit" | "patch">("exploit");
  const t = useTranslations("SecurityLabs");

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

  const tabs = [
    { id: "exploit", label: t("redBlue.exploitTab"), dot: "bg-red-400" },
    { id: "patch", label: t("redBlue.patchTab"), dot: "bg-emerald-400" },
  ] as const;

  return (
    <section
      ref={sectionRef}
      id="labs"
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

        {/* Platforms — 2x2 hairline grid */}
        <div
          data-reveal
          className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-zinc-800/80"
        >
          {platforms.map((platform) => (
            <a
              key={platform.key}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-r border-b border-zinc-800/80 p-6 sm:p-8 flex flex-col gap-4 transition-colors duration-200 hover:bg-zinc-900/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-mono text-xs">
                <span className="text-zinc-500">{t(`platforms.${platform.key}.badge`)}</span>
                <span className="text-zinc-100">{t(`platforms.${platform.key}.metric`)}</span>
              </div>
              <h3 className="flex items-start justify-between gap-3 text-lg font-semibold text-zinc-100 tracking-tight">
                {t(`platforms.${platform.key}.name`)}
                <ArrowUpRight className="w-4 h-4 mt-1 flex-shrink-0 text-zinc-600 transition-[color,transform] duration-200 group-hover:text-zinc-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {t(`platforms.${platform.key}.description`)}
              </p>
              <p className="mt-auto font-mono text-xs text-zinc-500">
                {platform.skills.join(" · ")}
              </p>
            </a>
          ))}
        </div>

        {/* Red Team vs. Blue Team — code inspector */}
        <div data-reveal className="mt-16 sm:mt-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
            <div className="max-w-2xl">
              <span className="font-mono text-xs text-zinc-500">
                AppSec Case Study · OWASP API1:2023
              </span>
              <h3 className="mt-2 font-[family-name:var(--font-cabinet)] text-2xl sm:text-3xl font-bold text-zinc-100 tracking-[-0.02em]">
                {t("redBlue.title")}
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                {t(`redBlue.${redBlueTab === "exploit" ? "redDescription" : "blueDescription"}`)}
              </p>
            </div>

            <div
              role="tablist"
              className="grid grid-cols-2 sm:inline-flex sm:self-start lg:self-auto rounded-md border border-zinc-800/80 p-0.5 font-mono text-xs"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={redBlueTab === tab.id}
                  onClick={() => setRedBlueTab(tab.id)}
                  className={cn(
                    "flex items-center justify-center gap-2 h-8 px-3 rounded-[5px] whitespace-nowrap transition-colors cursor-pointer",
                    redBlueTab === tab.id
                      ? "bg-zinc-800/80 text-zinc-100"
                      : "text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  <span className={cn("w-1.5 h-1.5 rounded-full", tab.dot)} />
                  <span className="sm:hidden">{tab.label.split(" (")[0]}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-zinc-800/80 bg-black overflow-hidden">
            <div className="flex items-center justify-between gap-4 px-4 sm:px-5 h-10 border-b border-zinc-800/80 font-mono text-[11px]">
              <span className="text-zinc-500 truncate">
                {redBlueTab === "exploit" ? t("redBlue.exploitTitle") : t("redBlue.patchTitle")}
              </span>
              <span
                className={cn(
                  "flex-shrink-0",
                  redBlueTab === "exploit" ? "text-red-400" : "text-emerald-400"
                )}
              >
                {redBlueTab === "exploit" ? "CVSS 8.6 · High" : "Mitigated"}
              </span>
            </div>

            {redBlueTab === "exploit" ? (
              <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/80">
                <CodePane label="request · burp repeater" meta="attacker JWT">
                  <span className="text-zinc-100">GET</span> /api/v1/orders/<span className="text-red-400">9b1deb4d-3b7d-4bad-9bdd</span> HTTP/1.1{"\n"}
                  <span className="text-zinc-600">Host:</span> api.target-saas.internal{"\n"}
                  <span className="text-zinc-600">Authorization:</span> Bearer eyJhbGciOi… <span className="text-zinc-600">(sub: &quot;user_attacker_99&quot;)</span>{"\n"}
                  <span className="text-zinc-600">Accept:</span> application/json
                </CodePane>
                <CodePane label="response · missing ownership check" meta="200 OK">
                  HTTP/1.1 <span className="text-red-400">200 OK</span>{"\n"}
                  {"{"}{"\n"}
                  {"  "}&quot;orderId&quot;: &quot;9b1deb4d-3b7d-4bad-9bdd&quot;,{"\n"}
                  <span className="block -mx-4 sm:-mx-5 px-4 sm:px-5 bg-red-500/10 text-red-300">{"  "}&quot;buyerId&quot;: &quot;user_victim_01&quot;,</span>
                  <span className="block -mx-4 sm:-mx-5 px-4 sm:px-5 bg-red-500/10 text-red-300">{"  "}&quot;downloadUrl&quot;: &quot;https://s3.amazonaws.com/raw-photos/signed?…&quot;</span>
                  {"}"}
                </CodePane>
              </div>
            ) : (
              <CodePane label="orders.controller.ts" meta="NestJS + Prisma">
                <span className="text-zinc-100">@UseGuards</span>(JwtAuthGuard){"\n"}
                <span className="text-zinc-100">@Get</span>(&apos;:id&apos;){"\n"}
                <span className="text-zinc-100">async</span> getOrder(@Param(&apos;id&apos;, ParseUUIDPipe) orderId: string, @CurrentUser() user: JwtPayload) {"{"}{"\n"}
                {"  "}<span className="text-zinc-600">{"// Enforce ownership at the query layer"}</span>{"\n"}
                {"  "}<span className="text-zinc-100">const</span> order = <span className="text-zinc-100">await</span> this.prisma.order.findFirst({"{"}{"\n"}
                <span className="block -mx-4 sm:-mx-5 px-4 sm:px-5 bg-red-500/10 text-red-300/80 line-through decoration-red-400/40">{"-   where: { id: orderId },"}</span>
                <span className="block -mx-4 sm:-mx-5 px-4 sm:px-5 bg-emerald-500/10 text-emerald-300">{"+   where: { id: orderId, buyerId: user.sub, status: 'PAID' },"}</span>
                {"  "}{"}"});{"\n"}
                {"  "}<span className="text-zinc-100">if</span> (!order) <span className="text-zinc-100">throw new</span> NotFoundException();{"\n"}
                {"  "}<span className="text-zinc-100">return</span> this.s3Service.getPresignedOrderAssets(order.id);{"\n"}
                {"}"}
              </CodePane>
            )}
          </div>

          <div className="mt-5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 font-mono text-xs">
            <span className="text-zinc-500">
              PortSwigger Business Logic PoC (Python) · Hacker101 CTF write-ups
            </span>
            <a
              href="https://github.com/keodanic/web-sec-labs-and-exploits"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-zinc-100 transition-colors"
            >
              {t("ctaButton")}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
