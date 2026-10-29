"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";
import {
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Code2,
  FileText,
  Lock,
} from "lucide-react";
import {
  WebSecurityIcon,
  TerminalIcon,
  TargetIcon,
  TrophyIcon,
} from "@/components/icons/custom-icons";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

interface PlatformData {
  id: string;
  key: "portswigger" | "htb" | "tryhackme" | "hacker101";
  icon: string;
  url: string;
  skills: string[];
}

export function SecurityLabs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const platformsRef = useRef<HTMLDivElement>(null);
  const [redBlueTab, setRedBlueTab] = useState<"exploit" | "patch">("exploit");
  const t = useTranslations("SecurityLabs");

  const platforms: PlatformData[] = [
    {
      id: "portswigger",
      key: "portswigger",
      icon: "websecurity",
      url: "https://portswigger.net/web-security",
      skills: ["SQLi", "XSS", "CSRF", "SSRF", "BOLA / IDOR", "Business Logic", "JWT"],
    },
    {
      id: "htb",
      key: "htb",
      icon: "terminal",
      url: "https://hackerone.com/keodanic",
      skills: ["Web Recon", "Subdomain Enum", "API Security", "CVE Triage"],
    },
    {
      id: "tryhackme",
      key: "tryhackme",
      icon: "target",
      url: "https://tryhackme.com",
      skills: ["Linux Hardening", "Network Recon", "OWASP Top 10", "PrivEsc"],
    },
    {
      id: "hacker101",
      key: "hacker101",
      icon: "trophy",
      url: "https://ctf.hacker101.com",
      skills: ["Broken Access Control", "IDOR", "Session Tampering", "Crypto"],
    },
  ];

  const renderIcon = (iconName: string, color: string, size: number = 22) => {
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

      if (platformsRef.current) {
        const cards = platformsRef.current.querySelectorAll(".platform-card");
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
              trigger: platformsRef.current,
              start: "top 85%",
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
      className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-12 sm:mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
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

        {/* Clean 2x2 Platforms Grid — No Percentage Bars, Standardized Counters */}
        <div
          ref={platformsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-10"
        >
          {platforms.map((platform) => (
            <GlassCard
              key={platform.id}
              variant="default"
              className="platform-card group p-5 sm:p-6 border-zinc-800/80 bg-zinc-950/80 hover:border-zinc-700/80 transition-all"
              hover
            >
              <div className="flex flex-col h-full justify-between space-y-4">
                <div>
                  {/* Top Row: Icon + Platform Name + Standardized Metric Counter */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0066ff]/10 border border-[#0066ff]/25 flex items-center justify-center flex-shrink-0">
                        {renderIcon(platform.icon, "#0066ff", 20)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-[family-name:var(--font-cabinet)] text-lg font-bold text-white group-hover:text-[#0066ff] transition-colors">
                            {t(`platforms.${platform.key}.name`)}
                          </h3>
                          <a
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t(`platforms.${platform.key}.name`)}
                            className="text-zinc-500 hover:text-[#0066ff] transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                        <span className="font-mono text-[11px] text-zinc-500">
                          {t(`platforms.${platform.key}.badge`)}
                        </span>
                      </div>
                    </div>

                    {/* Clean Monospace Counter Pill */}
                    <span className="px-2.5 py-1 rounded-md font-mono text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                      {t(`platforms.${platform.key}.metric`)}
                    </span>
                  </div>

                  {/* Concise 2-Line Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                    {t(`platforms.${platform.key}.description`)}
                  </p>
                </div>

                {/* Compact Monospace Skill Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/70">
                  {platform.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono text-zinc-300 px-2 py-0.5 bg-zinc-900 rounded border border-zinc-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Visual Component: Red Team vs. Blue Team (Exploit & Patch) in Tabs */}
        <GlassCard
          variant="default"
          className="border-zinc-800/90 bg-zinc-950/95 overflow-hidden"
        >
          {/* Header & Tab Switcher */}
          <div className="p-5 sm:p-6 border-b border-zinc-800/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-zinc-900/30">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#0066ff]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#0066ff]">
                  AppSec Case Study • OWASP API1:2023
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-cabinet)] text-xl sm:text-2xl font-bold text-white tracking-[-0.02em]">
                {t("redBlue.title")}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
                {t("redBlue.subtitle")}
              </p>
            </div>

            {/* Interactive Tabs: Red Team (Exploit) vs Blue Team (Patch) */}
            <div className="inline-flex p-1 rounded-xl bg-zinc-900 border border-zinc-800 self-start lg:self-auto">
              <button
                type="button"
                onClick={() => setRedBlueTab("exploit")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  redBlueTab === "exploit"
                    ? "bg-red-500/15 text-red-300 border border-red-500/30 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                {t("redBlue.exploitTab")}
              </button>
              <button
                type="button"
                onClick={() => setRedBlueTab("patch")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  redBlueTab === "patch"
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {t("redBlue.patchTab")}
              </button>
            </div>
          </div>

          {/* Code Window Content */}
          <div className="p-5 sm:p-6 bg-[#09090b]">
            {redBlueTab === "exploit" ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-800/80">
                  <div className="flex items-center gap-2 font-mono text-xs text-red-400">
                    <Terminal className="w-4 h-4" />
                    <span>{t("redBlue.exploitTitle")}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-red-500/10 text-red-400 border border-red-500/20">
                    CVSS 8.6 (High) — Unauthorized S3 Asset Leak
                  </span>
                </div>

                <div className="grid lg:grid-cols-2 gap-4 font-mono text-xs">
                  {/* Request */}
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/90 overflow-x-auto">
                    <div className="text-[11px] text-zinc-500 mb-2 flex justify-between">
                      <span>// 1. Manipulated HTTP Request (Burp Repeater)</span>
                      <span className="text-red-400">Attacker JWT</span>
                    </div>
                    <pre className="text-zinc-300 leading-relaxed">
                      <code>
                        <span className="text-red-400 font-semibold">GET</span> /api/v1/orders/<span className="text-amber-300 underline decoration-red-500/60">9b1deb4d-3b7d-4bad-9bdd</span> HTTP/1.1{"\n"}
                        <span className="text-zinc-500">Host:</span> api.target-saas.internal{"\n"}
                        <span className="text-zinc-500">Authorization:</span> Bearer eyJhbGciOiJIUzI1Ni... (sub: <span className="text-emerald-400">&quot;user_attacker_99&quot;</span>){"\n"}
                        <span className="text-zinc-500">Accept:</span> application/json
                      </code>
                    </pre>
                  </div>

                  {/* Vulnerable Response / Controller flaw */}
                  <div className="p-4 rounded-xl bg-zinc-950 border border-red-500/20 overflow-x-auto">
                    <div className="text-[11px] text-zinc-500 mb-2 flex justify-between">
                      <span>// 2. Vulnerable Endpoint Response (200 OK — BOLA)</span>
                      <span className="text-red-400">Missing Ownership Check</span>
                    </div>
                    <pre className="text-zinc-300 leading-relaxed">
                      <code>
                        HTTP/1.1 <span className="text-red-400 font-semibold">200 OK</span>{"\n"}
                        {"{"}{"\n"}
                        {"  "}&quot;orderId&quot;: &quot;9b1deb4d-3b7d-4bad-9bdd&quot;,{"\n"}
                        {"  "}&quot;buyerId&quot;: <span className="text-amber-300">&quot;user_victim_01&quot;</span>, <span className="text-zinc-500">// != user_attacker_99</span>{"\n"}
                        {"  "}&quot;downloadUrl&quot;: &quot;https://s3.amazonaws.com/raw-photos/signed?...&quot;{"\n"}
                        {"}"}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-800/80">
                  <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                    <Code2 className="w-4 h-4" />
                    <span>{t("redBlue.patchTitle")}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Mitigated — Zero-Trust Scoped Query
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-emerald-500/20 font-mono text-xs overflow-x-auto">
                  <pre className="text-zinc-300 leading-relaxed">
                    <code>
                      <span className="text-purple-400">@UseGuards</span>(JwtAuthGuard){"\n"}
                      <span className="text-purple-400">@Get</span>(<span className="text-emerald-300">&apos;:id&apos;</span>){"\n"}
                      <span className="text-purple-400">async</span> <span className="text-blue-400">getOrder</span>(@Param(<span className="text-emerald-300">&apos;id&apos;</span>, ParseUUIDPipe) orderId: <span className="text-amber-300">string</span>, @CurrentUser() user: JwtPayload) {"{"}{"\n"}
                      {"  "}<span className="text-zinc-500">// Enforce tenant/ownership isolation directly at the Prisma query layer</span>{"\n"}
                      {"  "}<span className="text-purple-400">const</span> order = <span className="text-purple-400">await</span> <span className="text-purple-400">this</span>.prisma.order.<span className="text-blue-400">findFirst</span>({"{"}{"\n"}
                      {"    "}where: {"{"} id: orderId, <span className="text-emerald-400 font-semibold">buyerId: user.sub</span>, status: <span className="text-emerald-300">&apos;PAID&apos;</span> {"}"},{"\n"}
                      {"  "}{"}"});{"\n"}
                      {"  "}<span className="text-purple-400">if</span> (!order) <span className="text-purple-400">throw new</span> <span className="text-amber-300">NotFoundException</span>(<span className="text-emerald-300">&apos;Order not found or unauthorized&apos;</span>);{"\n"}
                      {"  "}<span className="text-purple-400">return</span> <span className="text-purple-400">this</span>.s3Service.<span className="text-blue-400">getPresignedOrderAssets</span>(order.id);{"\n"}
                      {"}"}
                    </code>
                  </pre>
                </div>
              </div>
            )}

            {/* Footer Link to Write-ups & PoCs Repository */}
            <div className="mt-5 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <FileText className="w-4 h-4 text-[#0066ff]" />
                <span>
                  PortSwigger Business Logic PoC (Python) & Hacker101 CTF (7 Flags) Write-ups
                </span>
              </div>
              <MagneticButton
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    "https://github.com/keodanic/web-sec-labs-and-exploits",
                    "_blank"
                  )
                }
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{t("ctaButton")}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
