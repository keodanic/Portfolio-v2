"use client";

import { useState } from "react";
import { profile, type Portfolio, type Project } from "@/content/data";
import { ArrowRight, ArrowUpRight, Check, Download, Linkedin, Lock, Mail, Chat, Branch } from "./icons";
import { CopyEmail, Gallery, ProjectLinks, cx } from "./bits";

const btnSolid =
  "inline-flex min-h-12 items-center gap-2 border border-acc bg-acc px-5 font-mono text-xs font-bold tracking-wider text-acc-fg uppercase transition-colors duration-150 hover:bg-fg hover:border-fg";
const btnLine =
  "inline-flex min-h-12 items-center gap-2 border border-line-strong px-5 font-mono text-xs font-bold tracking-wider text-fg uppercase transition-colors duration-150 hover:border-acc hover:text-acc";
const label = "font-mono text-[11px] tracking-[0.14em] text-mut uppercase";
const pad = (n: number) => String(n).padStart(2, "0");

function SectionHead({ n, title, sub }: { n: string; title: string; sub?: string }) {
  return (
    <div className="grid border-b border-line-strong lg:grid-cols-12">
      <p className={cx(label, "border-b border-line px-4 py-4 sm:px-6 lg:col-span-2 lg:border-r lg:border-b-0")}>
        <span className="text-acc">§{n}</span>
      </p>
      <div className="px-4 py-8 sm:px-6 lg:col-span-10 lg:py-12">
        <h2 className="font-display text-[2.4rem] leading-[0.95] font-black tracking-[-0.045em] uppercase sm:text-6xl lg:text-7xl">
          {title}
        </h2>
        {sub && <p className="mt-5 max-w-[62ch] text-mut">{sub}</p>}
      </div>
    </div>
  );
}

function ProjectSheet({ p, data }: { p: Project; data: Portfolio }) {
  const { ui } = data;
  const [open, setOpen] = useState(false);
  const panelId = `decisions-${p.id}`;
  const rows: [string, string][] = [
    [ui.d.role, p.role],
    [ui.d.duration, p.duration],
    [ui.d.team, p.teamSize],
  ];
  return (
    <article id={`p-${p.id}`} className="scroll-mt-14 border-b border-line-strong">
      <div className="grid lg:grid-cols-12">
        {/* visual */}
        <div className="min-w-0 border-b border-line p-4 sm:p-6 lg:col-span-7 lg:border-r lg:border-b-0">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <p className="font-display text-6xl leading-none font-black tracking-[-0.06em] text-acc sm:text-8xl">{pad(p.index)}</p>
            <p className={cx(label, "text-right")}>
              {p.category} · {p.year}
            </p>
          </div>
          <Gallery p={p} ui={ui} frame="border border-line-strong" />
        </div>

        {/* spec sheet */}
        <aside aria-label={`${ui.v3.sheet} — ${p.name}`} className="min-w-0 lg:col-span-5">
          <div className="border-b border-line px-4 py-5 sm:px-6">
            <p className={label}>{ui.v3.sheet}</p>
            <h3 className="mt-2 font-display text-3xl leading-none font-black tracking-[-0.04em] uppercase sm:text-4xl">{p.name}</h3>
            <p className="mt-3 text-sm leading-6 text-fg/90">{p.short}</p>
            <p className="mt-3 inline-flex items-center gap-2 border border-line-strong px-2 py-1 font-mono text-[11px] text-mut">
              {p.isPrivate ? <Lock className="size-3" /> : <Branch className="size-3" />} {p.badge}
            </p>
          </div>

          <dl className="divide-y divide-line border-b border-line text-sm">
            {rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6rem_1fr] gap-3 px-4 py-3 sm:px-6">
                <dt className={label}>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <ul className="grid grid-cols-3 gap-px border-b border-line bg-line">
            {p.impact.map((m) => (
              <li key={m.metric} className="bg-bg p-3 sm:p-4">
                <p className="font-mono text-base tnum text-acc sm:text-lg">{m.value}</p>
                <p className="mt-1 text-[11px] leading-4 text-mut">{m.metric}</p>
              </li>
            ))}
          </ul>

          <div className="space-y-2 border-b border-line px-4 py-4 sm:px-6">
            {p.stack.map((g) => (
              <div key={g.group} className="flex flex-wrap items-center gap-1.5">
                <span className={cx(label, "w-24 shrink-0")}>{g.group}</span>
                {g.items.map((s) => (
                  <span key={s} className="border border-line-strong px-1.5 py-0.5 font-mono text-[11px]">
                    {s}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="px-4 py-4 sm:px-6">
            <ProjectLinks p={p} ui={ui} btn={cx(btnLine, "min-h-11 px-4")} />
          </div>
        </aside>
      </div>

      {/* engineering decisions */}
      <div className="border-t border-line">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-12 w-full items-center justify-between gap-4 px-4 py-3 text-left font-mono text-xs font-bold tracking-wider uppercase transition-colors hover:bg-surface-2 hover:text-acc sm:px-6"
        >
          <span>{open ? ui.v3.collapse : ui.v3.expand}</span>
          <span aria-hidden className="text-lg leading-none">
            {open ? "−" : "+"}
          </span>
        </button>
        {open && (
          <div id={panelId} className="grid border-t border-line lg:grid-cols-12">
            <div className="border-b border-line p-4 sm:p-6 lg:col-span-4 lg:border-r lg:border-b-0">
              <p className={label}>{ui.d.overview}</p>
              <p className="mt-3 text-sm leading-7 text-fg/90">{p.full}</p>
            </div>
            <div className="border-b border-line p-4 sm:p-6 lg:col-span-4 lg:border-r lg:border-b-0">
              <p className={label}>{ui.d.features}</p>
              <ul className="mt-3 space-y-3 text-sm leading-6">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check className="mt-1 size-4 shrink-0 text-acc" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 sm:p-6 lg:col-span-4">
              <p className={label}>{ui.d.challenges}</p>
              <ul className="mt-3 space-y-3 text-sm leading-6">
                {p.challenges.map((c) => (
                  <li key={c} className="flex gap-3">
                    <Lock className="mt-1 size-4 shrink-0 text-acc-2" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export function V3({ data }: { data: Portfolio }) {
  const { ui, projects, locale } = data;
  const cv = profile.cv[locale];
  const maxLab = Math.max(...data.platforms.map((p) => p.count));
  const navKeys = ["projects", "labs", "experience", "education", "contact"] as const;

  return (
    <div className="mx-auto max-w-[1440px] border-x border-line-strong">
      <header className="sticky top-0 z-40 border-b border-line-strong bg-bg">
        <div className="flex items-stretch justify-between">
          <a href="#" className="flex items-center gap-3 border-r border-line-strong px-4 py-3 sm:px-6" aria-label={profile.name}>
            <span className="font-display text-xl leading-none font-black tracking-[-0.05em] text-acc">VD</span>
            <span className="hidden font-mono text-xs tracking-wider uppercase sm:inline">{profile.name}</span>
          </a>
          <nav aria-label="Principal" className="hidden items-stretch md:flex">
            {navKeys.map((k) => (
              <a
                key={k}
                href={`#${k}`}
                className="flex items-center border-l border-line px-5 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors hover:bg-acc hover:text-acc-fg"
              >
                {ui.nav[k]}
              </a>
            ))}
          </nav>
          <a
            href={cv}
            download
            className="flex items-center gap-2 border-l border-line-strong px-4 font-mono text-[11px] font-bold tracking-wider uppercase transition-colors hover:bg-acc hover:text-acc-fg sm:px-6"
          >
            <Download className="size-4" /> <span className="hidden sm:inline">{ui.cv}</span>
            <span className="sm:hidden">CV</span>
          </a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="border-b border-line-strong">
          <div className="grid border-b border-line lg:grid-cols-12">
            <p className={cx(label, "px-4 py-3 sm:px-6 lg:col-span-8")}>
              {profile.fullName} — {ui.role}
            </p>
            <p className={cx(label, "flex items-center gap-2 border-t border-line px-4 py-3 sm:px-6 lg:col-span-4 lg:border-t-0 lg:border-l")}>
              <span className="pulse-dot size-2 rounded-full bg-acc" aria-hidden /> {ui.availability}
            </p>
          </div>
          <div className="px-4 py-10 sm:px-6 lg:py-20">
            <h1 className="font-display text-[clamp(2.6rem,9.2vw,9rem)] leading-[0.88] font-black tracking-[-0.055em] uppercase">
              <span className="clip-in block">{ui.headline[0]}</span>
              <span className="clip-in block text-acc" style={{ animationDelay: "140ms" }}>
                {ui.headline[1]}
              </span>
            </h1>
          </div>
          <div className="grid border-t border-line-strong lg:grid-cols-12">
            <p className="border-b border-line px-4 py-6 text-lg leading-8 text-fg/90 sm:px-6 lg:col-span-6 lg:border-r lg:border-b-0">
              {ui.lead}
            </p>
            <ul className="grid grid-cols-3 lg:col-span-6">
              {data.heroStats.map((s, i) => (
                <li key={s.label} className={cx("px-4 py-6 sm:px-6", i > 0 && "border-l border-line")}>
                  <p className="font-display text-4xl leading-none font-black tracking-[-0.05em] tnum text-acc sm:text-5xl">{s.value}</p>
                  <p className={cx(label, "mt-3")}>{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3 border-t border-line-strong px-4 py-5 sm:px-6">
            <a href="#contact" className={btnSolid}>
              {ui.talk} <ArrowRight className="size-4" />
            </a>
            <a href="#projects" className={btnLine}>
              {ui.sections.projects}
            </a>
          </div>
        </section>

        {/* MANIFESTO */}
        <section aria-label={ui.v3.manifestoTitle} className="grid border-b border-line-strong md:grid-cols-2">
          {[
            { k: "01", t: ui.v3.build, d: ui.v3.buildText, tone: "bg-acc text-acc-fg" },
            { k: "02", t: ui.v3.break, d: ui.v3.breakText, tone: "bg-bg text-fg" },
          ].map((m, i) => (
            <div key={m.k} className={cx("p-6 sm:p-10 lg:p-14", m.tone, i === 1 && "border-t border-line-strong md:border-t-0 md:border-l")}>
              <p className="font-mono text-[11px] font-bold tracking-[0.14em] uppercase opacity-70">
                {ui.v3.manifestoTitle} / {m.k}
              </p>
              <p className="mt-6 font-display text-6xl leading-none font-black tracking-[-0.06em] uppercase sm:text-8xl">{m.t}</p>
              <p className={cx("mt-6 max-w-[48ch] leading-7", i === 0 ? "text-acc-fg" : "text-mut")}>{m.d}</p>
            </div>
          ))}
        </section>

        {/* PROJECTS */}
        <section id="projects" className="scroll-mt-14">
          <SectionHead n="01" title={ui.sections.projects} sub={ui.sections.projectsSub} />
          <div className="border-b border-line-strong">
            <p className={cx(label, "border-b border-line px-4 py-3 sm:px-6")}>{ui.v3.index}</p>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <li key={p.id} className={cx("border-line", i > 0 && "border-t", i > 0 && "sm:max-lg:[&:nth-child(2)]:border-t-0", i > 0 && i < 3 && "lg:border-t-0", i % 2 === 1 && "sm:max-lg:border-l", i % 3 !== 0 && "lg:border-l")}>
                  <a href={`#p-${p.id}`} className="group flex items-baseline gap-4 px-4 py-4 transition-colors hover:bg-acc hover:text-acc-fg sm:px-6">
                    <span className="font-mono text-xs text-acc group-hover:text-acc-fg">{pad(p.index)}</span>
                    <span className="font-display text-lg font-bold tracking-[-0.02em] uppercase">{p.name}</span>
                    <ArrowUpRight className="ml-auto size-4 shrink-0 self-center opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ol>
          </div>
          {projects.map((p) => (
            <ProjectSheet key={p.id} p={p} data={data} />
          ))}
        </section>

        {/* LABS */}
        <section id="labs" className="scroll-mt-14 border-b border-line-strong">
          <SectionHead n="02" title={ui.sections.labs} sub={ui.sections.labsSub} />
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
            {data.platforms.map((pl, i) => (
              <li key={pl.key} className={cx("flex flex-col p-4 sm:p-6", i > 0 && "border-t border-line sm:max-lg:[&:nth-child(2)]:border-t-0 lg:border-t-0", i % 2 === 1 && "sm:max-lg:border-l", i > 0 && "lg:border-l")}>
                <p className={label}>{pl.name}</p>
                <p className="mt-4 font-display text-7xl leading-none font-black tracking-[-0.06em] tnum text-acc">
                  {pl.count}
                  <span className="text-3xl">+</span>
                </p>
                <p className="mt-2 text-sm font-medium">{pl.metric}</p>
                <div className="mt-4 h-1.5 bg-line" aria-hidden>
                  <div className="bar-in h-full bg-acc" style={{ width: `${(pl.count / maxLab) * 100}%` }} />
                </div>
                <p className="mt-4 text-sm leading-6 text-mut">{pl.description}</p>
                <a
                  href={pl.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex min-h-11 items-center gap-2 pt-4 font-mono text-[11px] font-bold tracking-wider uppercase hover:text-acc"
                >
                  {pl.key === "hackerone" ? ui.verify : ui.openPlatform} <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line-strong px-4 py-4 sm:px-6">
            <p className="text-sm text-mut">{data.cards[0]?.description}</p>
            <a href={profile.exploitsRepo} target="_blank" rel="noreferrer" className={btnLine}>
              <Branch className="size-4" /> {ui.github} <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="scroll-mt-14 border-b border-line-strong">
          <SectionHead n="03" title={ui.sections.experience} />
          <ol>
            {data.jobs.map((j, i) => (
              <li key={j.title} className={cx("grid lg:grid-cols-12", i > 0 && "border-t border-line")}>
                <p className="px-4 pt-5 font-mono text-xs text-acc sm:px-6 lg:col-span-3 lg:py-6">{j.period}</p>
                <div className="px-4 pt-1 pb-6 sm:px-6 lg:col-span-9 lg:border-l lg:border-line lg:py-6">
                  <h3 className="font-display text-2xl font-bold tracking-[-0.03em] uppercase">{j.title}</h3>
                  <p className="mt-2 max-w-[70ch] text-sm leading-7 text-mut">{j.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="grid border-t border-line-strong lg:grid-cols-12">
            <div className="border-b border-line p-4 sm:p-6 lg:col-span-6 lg:border-r lg:border-b-0">
              {data.bio.map((b) => (
                <p key={b.slice(0, 24)} className="mb-4 max-w-[62ch] text-sm leading-7 text-fg/90 last:mb-0">
                  {b}
                </p>
              ))}
            </div>
            <ul className="grid sm:grid-cols-2 lg:col-span-6">
              {data.skills.map((s, i) => (
                <li key={s.category} className={cx("p-4 sm:p-6", i > 0 && "border-t border-line", i === 1 && "sm:border-t-0", i % 2 === 1 && "sm:border-l sm:border-line")}>
                  <p className={label}>{s.category}</p>
                  <p className="mt-2 flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <span key={it} className="border border-line-strong px-1.5 py-0.5 font-mono text-[11px]">
                        {it}
                      </span>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="scroll-mt-14 border-b border-line-strong">
          <SectionHead n="04" title={ui.sections.education} />
          <div className="grid lg:grid-cols-12">
            <div className="border-b border-line p-4 sm:p-6 lg:col-span-4 lg:border-r lg:border-b-0">
              <p className={label}>{data.education.label}</p>
              <p className="mt-3 font-display text-2xl leading-tight font-bold tracking-[-0.03em] uppercase">{data.education.course}</p>
              <p className="mt-2 text-sm text-mut">{data.education.institution}</p>
              <p className="mt-3 font-mono text-xs text-acc">{data.education.period}</p>
              <p className={cx(label, "mt-8")}>{ui.studyingLabel}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {data.studying.map((s) => (
                  <li key={s} className="border border-line-strong px-1.5 py-0.5 font-mono text-[11px]">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <ul className="grid sm:grid-cols-2 lg:col-span-8">
              {data.certs.map((c, i) => (
                <li key={c.key} className={cx("p-4 sm:p-6", i > 0 && "border-t border-line", i === 1 && "sm:border-t-0", i % 2 === 1 && "sm:border-l sm:border-line")}>
                  <span
                    className={cx(
                      "inline-flex items-center gap-1 border px-2 py-0.5 font-mono text-[11px] uppercase",
                      c.status === "completed" ? "border-acc text-acc" : "border-line-strong text-mut",
                    )}
                  >
                    {c.status === "completed" && <Check className="size-3" />} {ui.status[c.status]}
                  </span>
                  <h3 className="mt-3 font-display text-xl leading-tight font-bold tracking-[-0.02em]">{c.name}</h3>
                  <p className="mt-1 text-xs text-mut">{c.issuer}</p>
                  <p className="mt-3 text-sm leading-6 text-fg/90">{c.description}</p>
                  <p className="mt-3 flex flex-wrap gap-1.5">
                    {c.skills.map((s) => (
                      <span key={s} className="border border-line px-1.5 py-0.5 font-mono text-[11px] text-mut">
                        {s}
                      </span>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-14 bg-acc text-acc-fg">
          <div className="px-4 py-14 sm:px-6 lg:py-24">
            <p className="font-mono text-[11px] font-bold tracking-[0.14em] uppercase opacity-70">§05 — {ui.nav.contact}</p>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2.4rem,8vw,7.5rem)] leading-[0.9] font-black tracking-[-0.055em] uppercase">
              {ui.v3.contactBig}
            </h2>
            <p className="mt-6 max-w-[58ch] leading-7">{data.contact.description}</p>
          </div>
          <div className="grid border-t border-acc-fg/30 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: `mailto:${profile.email}`, icon: <Mail className="size-5" />, t: ui.email, v: profile.email },
              { href: profile.whatsapp, icon: <Chat className="size-5" />, t: "WhatsApp", v: profile.whatsappLabel },
              { href: profile.linkedin, icon: <Linkedin className="size-5" />, t: "LinkedIn", v: profile.linkedinHandle },
              { href: profile.github, icon: <Branch className="size-5" />, t: "GitHub", v: "keodanic" },
            ].map((c, i) => (
              <a
                key={c.t}
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className={cx(
                  "group flex min-h-28 flex-col justify-between gap-6 border-acc-fg/30 p-4 transition-colors hover:bg-acc-fg hover:text-acc sm:p-6",
                  i > 0 && "border-t sm:max-lg:[&:nth-child(2)]:border-t-0 lg:border-t-0",
                  i % 2 === 1 && "sm:max-lg:border-l",
                  i > 0 && "lg:border-l",
                )}
              >
                <span className="flex items-center justify-between font-mono text-[11px] font-bold tracking-wider uppercase">
                  {c.t} {c.icon}
                </span>
                <span className="font-display text-lg font-bold tracking-[-0.02em] break-all">{c.v}</span>
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 border-t border-acc-fg/30 px-4 py-5 sm:px-6">
            <CopyEmail
              ui={ui}
              className="inline-flex min-h-12 items-center gap-2 border border-acc-fg px-5 font-mono text-xs font-bold tracking-wider uppercase transition-colors hover:bg-acc-fg hover:text-acc"
            />
            <a
              href={cv}
              download
              className="inline-flex min-h-12 items-center gap-2 border border-acc-fg bg-acc-fg px-5 font-mono text-xs font-bold tracking-wider text-acc uppercase transition-opacity hover:opacity-85"
            >
              <Download className="size-4" /> {ui.cv}
            </a>
            <p className="font-mono text-[11px] tracking-wider uppercase">{data.contact.location}</p>
          </div>
        </section>
      </main>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line-strong px-4 py-5 pb-24 font-mono text-[11px] tracking-wider text-mut uppercase sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.fullName} — {ui.footer}
        </p>
        <a href="#" className="hover:text-acc">
          {ui.backToTop} ↑
        </a>
      </footer>
    </div>
  );
}
