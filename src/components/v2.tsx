"use client";

import { useState } from "react";
import { profile, type Portfolio, type Project } from "@/content/data";
import { ArrowRight, ArrowUpRight, Branch, Chat, Check, Close, Download, Linkedin, Lock, Mail, Shield } from "./icons";
import { Cover, CopyEmail, Modal, ProjectBody, cx } from "./bits";

const btnPrimary =
  "inline-flex min-h-11 items-center gap-2 rounded-md bg-acc px-4 text-sm font-semibold text-acc-fg transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px";
const btnGhost =
  "inline-flex min-h-11 items-center gap-2 rounded-md border border-line-strong bg-surface px-4 text-sm font-medium text-fg transition-colors duration-200 hover:border-acc/70 hover:text-acc";
const panel = "rounded-xl border border-line bg-surface";

const bento = [
  "lg:col-span-4 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

export function V2({ data }: { data: Portfolio }) {
  const { ui, projects, locale } = data;
  const [open, setOpen] = useState<Project | null>(null);
  const cv = profile.cv[locale];
  const maxLab = Math.max(...data.platforms.map((p) => p.count));

  const signals = [
    { label: ui.v2.mau, value: "8k+", note: ui.v2.mauSub },
    { label: ui.v2.portswigger, value: "45+", note: data.platforms[0].badge },
    { label: ui.v2.thm, value: "30+", note: data.platforms[2].badge },
    { label: ui.v2.systems, value: "12+", note: `${data.heroStats[2].value} ${data.heroStats[2].label.toLowerCase()}` },
  ];

  return (
    <div>
      <header className="sticky top-0 z-40 border-b border-line bg-bg">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#" className="flex items-center gap-2.5 font-semibold" aria-label={profile.name}>
            <span className="grid size-8 place-items-center rounded-md bg-acc font-mono text-xs font-bold text-acc-fg">VD</span>
            <span className="hidden sm:inline">{profile.name}</span>
          </a>
          <nav aria-label="Principal" className="hidden items-center gap-6 text-sm text-mut md:flex">
            {(["projects", "labs", "experience", "contact"] as const).map((k) => (
              <a key={k} href={`#${k}`} className="transition-colors hover:text-fg">
                {ui.nav[k]}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={cv} download className={cx(btnGhost, "hidden sm:inline-flex")}>
              <Download className="size-4" /> {ui.cv}
            </a>
            <a href="#contact" className={btnPrimary}>
              {ui.talk}
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO — command center */}
        <section className="mx-auto max-w-[1280px] px-4 pt-12 sm:px-6 lg:pt-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1 text-xs text-mut">
                <span className="pulse-dot size-2 rounded-full bg-acc-2" aria-hidden /> {ui.availability}
              </p>
              <h1 className="mt-6 font-display text-[2.7rem] leading-[1.02] font-semibold tracking-[-0.04em] sm:text-6xl lg:text-[4.4rem]">
                <span className="line-in block">{ui.headline[0]}</span>
                <span className="line-in block text-acc" style={{ animationDelay: "120ms" }}>
                  {ui.headline[1]}
                </span>
              </h1>
              <p className="mt-6 text-lg font-medium">
                {profile.fullName} <span className="text-mut">— {ui.role}</span>
              </p>
              <p className="mt-3 max-w-[58ch] text-mut">{ui.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className={btnPrimary}>
                  {ui.talk} <ArrowRight className="size-4" />
                </a>
                <a href="#projects" className={btnGhost}>
                  {ui.sections.projects}
                </a>
                <a href={cv} download className={cx(btnGhost, "sm:hidden")}>
                  <Download className="size-4" /> {ui.cv}
                </a>
              </div>
            </div>

            <div className={cx(panel, "overflow-hidden lg:col-span-5")}>
              <div className="flex items-center justify-between border-b border-line px-4 py-3 text-xs">
                <span className="font-medium">{ui.v2.signals}</span>
                <span className="inline-flex items-center gap-2 font-mono text-acc-2">
                  <span className="size-1.5 rounded-full bg-acc-2" aria-hidden /> {ui.v2.nowOnline}
                </span>
              </div>
              <dl className="divide-y divide-line">
                {signals.map((s) => (
                  <div key={s.label} className="flex items-baseline justify-between gap-4 px-4 py-4">
                    <div>
                      <dt className="text-sm">{s.label}</dt>
                      <dd className="mt-0.5 text-xs text-mut">{s.note}</dd>
                    </div>
                    <p className="font-mono text-3xl font-medium tnum tracking-tight text-acc">{s.value}</p>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            <div className={cx(panel, "lg:col-span-7")}>
              <h2 className="border-b border-line px-4 py-3 text-xs font-medium">{ui.v2.certs}</h2>
              <ul className="grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0">
                {data.certs.map((c, i) => (
                  <li key={c.key} className={cx("p-4", i % 2 === 0 && "sm:border-r sm:border-line", i > 1 && "sm:border-t sm:border-line")}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm leading-snug font-medium">{c.name.split(" — ")[0]}</p>
                      <span
                        className={cx(
                          "inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px]",
                          c.status === "completed" ? "border-acc/50 text-acc" : "border-line-strong text-mut",
                        )}
                      >
                        {c.status === "completed" && <Check className="size-3" />} {ui.status[c.status]}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-mut">{c.issuer}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={cx(panel, "lg:col-span-5")}>
              <h2 className="border-b border-line px-4 py-3 text-xs font-medium">{ui.v2.radar}</h2>
              <div className="grid items-center gap-2 p-4 sm:grid-cols-[auto_1fr]">
                <Radar data={data} />
                <p className="text-xs leading-5 text-mut">{ui.sections.stackSub}</p>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS — bento */}
        <section id="projects" className="mx-auto max-w-[1280px] scroll-mt-16 px-4 pt-24 sm:px-6">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">{ui.sections.projects}</h2>
          <p className="mt-3 max-w-[62ch] text-mut">{ui.sections.projectsSub}</p>

          <div className="mt-10 grid gap-4 lg:grid-cols-6">
            {projects.map((p, i) => {
              const big = i === 0;
              return (
                <article
                  key={p.id}
                  className={cx(
                    panel,
                    "group relative flex flex-col overflow-hidden transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-acc/50",
                    bento[i],
                  )}
                >
                  <Cover p={p} className={cx("w-full", big ? "min-h-64 flex-1" : "h-44")} sizes={big ? "(min-width: 1024px) 840px, 100vw" : "(min-width: 1024px) 420px, 100vw"} />
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3 text-xs text-mut">
                      <span>{p.category}</span>
                      <span className="inline-flex items-center gap-1.5 font-mono">
                        {p.isPrivate && <Lock className="size-3" />} {p.year}
                      </span>
                    </div>
                    <h3 className={cx("mt-2 font-display leading-tight font-semibold tracking-[-0.02em]", big ? "text-2xl" : "text-lg")}>
                      <button
                        type="button"
                        onClick={() => setOpen(p)}
                        className="text-left after:absolute after:inset-0 after:content-['']"
                      >
                        {p.name}
                      </button>
                    </h3>
                    <p className={cx("mt-2 text-sm leading-6 text-mut", !big && "line-clamp-3")}>{p.short}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {p.metrics.map((m) => (
                        <li key={m} className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[11px] text-acc">
                          {m}
                        </li>
                      ))}
                    </ul>
                    {big && (
                      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-mut">
                        {p.tags.map((t) => (
                          <li key={t}>#{t}</li>
                        ))}
                      </ul>
                    )}
                    <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fg">
                      {ui.inspect} <ArrowRight className="size-4 text-acc transition-transform duration-200 group-hover:translate-x-1" />
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* LABS */}
        <section id="labs" className="mx-auto max-w-[1280px] scroll-mt-16 px-4 pt-24 sm:px-6">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">{ui.sections.labs}</h2>
          <p className="mt-3 max-w-[62ch] text-mut">{ui.sections.labsSub}</p>

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className={cx(panel, "lg:col-span-8")}>
              <div className="flex items-center justify-between border-b border-line px-4 py-3 text-xs">
                <span className="inline-flex items-center gap-2 font-medium">
                  <Shield className="size-4 text-acc" /> {ui.v2.labsPanel}
                </span>
                <span className="text-mut">{ui.v2.relative}</span>
              </div>
              <ul className="divide-y divide-line">
                {data.platforms.map((pl) => (
                  <li key={pl.key} className="p-4 sm:p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <a
                        href={pl.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-semibold hover:text-acc"
                      >
                        {pl.name} <ArrowUpRight className="size-4" />
                      </a>
                      <p className="font-mono text-lg text-acc tnum">{pl.metric}</p>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2" role="img" aria-label={pl.metric}>
                      <div className="bar-in h-full rounded-full bg-acc" style={{ width: `${(pl.count / maxLab) * 100}%` }} />
                    </div>
                    <p className="mt-3 max-w-[70ch] text-sm leading-6 text-mut">{pl.description}</p>
                    <p className="mt-1 font-mono text-xs text-acc-2">{pl.badge}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-6 lg:col-span-4">
              <div className={cx(panel, "p-5")}>
                <p className="text-sm font-semibold">{ui.studyingLabel}</p>
                <ul className="mt-3 space-y-3 text-sm leading-6 text-mut">
                  {data.studying.map((s) => (
                    <li key={s} className="flex gap-3">
                      <Check className="mt-1 size-4 shrink-0 text-acc" /> <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={cx(panel, "p-5")}>
                <p className="font-mono text-sm text-acc">@keodanic</p>
                <div className="mt-4 flex flex-col gap-3">
                  <a href={profile.hackerone} target="_blank" rel="noreferrer" className={btnGhost}>
                    HackerOne <ArrowUpRight className="size-4" />
                  </a>
                  <a href={profile.exploitsRepo} target="_blank" rel="noreferrer" className={btnGhost}>
                    <Branch className="size-4" /> web-sec-labs-and-exploits <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="mx-auto grid max-w-[1280px] scroll-mt-16 gap-12 px-4 pt-24 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{ui.sections.experience}</h2>
            <ol className="mt-8 border-l border-line-strong">
              {data.jobs.map((j) => (
                <li key={j.title} className="relative pb-9 pl-7 last:pb-0">
                  <span className="absolute top-2 -left-[4.5px] size-2 rounded-full bg-acc" aria-hidden />
                  <p className="font-mono text-xs text-acc-2">{j.period}</p>
                  <h3 className="mt-1 font-semibold">{j.title}</h3>
                  <p className="mt-2 max-w-[64ch] text-sm leading-6 text-mut">{j.description}</p>
                </li>
              ))}
            </ol>
          </div>
          <div id="education" className="lg:col-span-5">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{ui.sections.education}</h2>
            <div className={cx(panel, "mt-8 p-5")}>
              <p className="text-xs text-mut">{data.education.label}</p>
              <p className="mt-1 font-semibold">{data.education.course}</p>
              <p className="text-sm text-mut">{data.education.institution}</p>
              <p className="mt-2 font-mono text-xs text-acc-2">{data.education.period}</p>
            </div>
            <ul className="mt-4 space-y-3">
              {data.certs.slice(1).map((c) => (
                <li key={c.key} className={cx(panel, "p-5")}>
                  <h3 className="text-sm font-semibold">{c.name}</h3>
                  <p className="mt-1 text-xs text-mut">{c.issuer}</p>
                  <p className="mt-2 text-sm leading-6 text-mut">{c.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {c.skills.map((s) => (
                      <li key={s} className="rounded-full border border-line-strong px-2.5 py-0.5 text-[11px] text-fg/90">{s}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-[1280px] scroll-mt-16 px-4 pt-24 pb-28 sm:px-6">
          <div className="rounded-2xl border border-line-strong bg-surface p-7 sm:p-12">
            <h2 className="max-w-[20ch] font-display text-4xl leading-[1.04] font-semibold tracking-[-0.04em] sm:text-6xl">
              {ui.sections.contact}
            </h2>
            <p className="mt-5 max-w-[60ch] text-mut">{data.contact.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={profile.whatsapp} target="_blank" rel="noreferrer" className={btnPrimary}>
                <Chat className="size-4" /> WhatsApp
              </a>
              <a href={`mailto:${profile.email}`} className={btnGhost}>
                <Mail className="size-4" /> {profile.email}
              </a>
              <CopyEmail ui={ui} className={btnGhost} />
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className={btnGhost}>
                <Linkedin className="size-4" /> LinkedIn
              </a>
              <a href={cv} download className={btnGhost}>
                <Download className="size-4" /> {ui.cv}
              </a>
            </div>
            <p className="mt-6 text-sm text-mut">{data.contact.location}</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-4 py-8 pb-24 text-xs text-mut sm:px-6">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.fullName} — {ui.footer}</p>
          <a href="#" className="hover:text-fg">{ui.backToTop}</a>
        </div>
      </footer>

      {open && <Drawer p={open} data={data} onClose={() => setOpen(null)} />}
    </div>
  );
}

function Radar({ data }: { data: Portfolio }) {
  const axes = data.radar;
  const n = axes.length;
  const R = 62;
  const C = 100;
  const pt = (i: number, r: number) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [C + Math.cos(a) * r, C + Math.sin(a) * r] as const;
  };
  const poly = (f: (i: number) => number) => axes.map((_, i) => pt(i, f(i)).join(",")).join(" ");
  return (
    <svg viewBox="0 0 200 200" className="mx-auto size-52 shrink-0" role="img" aria-label={axes.map((a) => `${a.label} ${a.count}/6`).join(", ")}>
      {[1 / 3, 2 / 3, 1].map((k) => (
        <polygon key={k} points={poly(() => R * k)} fill="none" stroke="var(--line-strong)" strokeWidth="1" />
      ))}
      {axes.map((_, i) => {
        const [x, y] = pt(i, R);
        return <line key={i} x1={C} y1={C} x2={x} y2={y} stroke="var(--line)" strokeWidth="1" />;
      })}
      <polygon points={poly((i) => (R * axes[i].count) / 6)} fill="var(--acc)" fillOpacity="0.16" stroke="var(--acc)" strokeWidth="1.5" />
      {axes.map((a, i) => {
        const [x, y] = pt(i, (R * a.count) / 6);
        const [lx, ly] = pt(i, R + 17);
        return (
          <g key={a.label}>
            <circle cx={x} cy={y} r="2.5" fill="var(--acc)" />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="var(--fg)" fontFamily="var(--f-mono)">
              {a.label}
            </text>
            <text x={lx} y={ly + 10} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="var(--mut)" fontFamily="var(--f-mono)">
              {a.count}/6
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Drawer({ p, data, onClose }: { p: Project; data: Portfolio; onClose: () => void }) {
  const { ui } = data;
  return (
    <Modal
      onClose={onClose}
      label={p.name}
      className="drawer-in m-0 ml-auto h-dvh max-h-none w-[min(760px,100vw)] max-w-none border-l border-line-strong bg-bg p-0 text-fg shadow-[-30px_0_80px_-30px_rgb(0_0_0/0.9)]"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-8">
          <div>
            <p className="text-xs text-mut">
              {p.category} · <span className="font-mono">{p.year}</span>
            </p>
            <h2 className="mt-1 font-display text-2xl leading-tight font-semibold tracking-[-0.03em]">{p.name}</h2>
            <p className="mt-2 inline-flex items-center gap-2 text-xs text-acc-2">
              {p.isPrivate && <Lock className="size-3.5" />} {p.badge}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={ui.close}
            className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md border border-line-strong text-mut hover:border-acc hover:text-acc"
          >
            <Close className="size-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-8 sm:px-8">
          <ProjectBody p={p} ui={ui} h="text-sm font-semibold text-acc" btn={btnGhost} />
        </div>
      </div>
    </Modal>
  );
}
