"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { profile, type FilterKey, type Portfolio, type Project } from "@/content/data";
import { ArrowRight, ArrowUpRight, Chat, Close, Download, Linkedin, Mail, Branch, Lock } from "./icons";
import { Cover, CopyEmail, Modal, ProjectBody, cx } from "./bits";

type Entry = { id: number; cmd: string; out: React.ReactNode };

const btnPrimary =
  "inline-flex min-h-11 items-center gap-2 bg-acc px-4 font-mono text-sm font-semibold text-acc-fg transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px";
const btnGhost =
  "inline-flex min-h-11 items-center gap-2 border border-line-strong px-4 font-mono text-sm text-fg transition-colors duration-200 hover:border-acc hover:text-acc";

export function V1({ data }: { data: Portfolio }) {
  const { ui, projects, locale } = data;
  const [open, setOpen] = useState<Project | null>(null);
  const [filter, setFilter] = useState<FilterKey | "all">("all");
  const shown = useMemo(() => projects.filter((p) => filter === "all" || p.filters.includes(filter)), [projects, filter]);
  const cv = profile.cv[locale];

  return (
    <div className="font-sans">
      <header className="sticky top-0 z-40 border-b border-line bg-bg">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
          <p className="flex min-w-0 items-center gap-2.5 font-mono text-[11px] tracking-wide text-mut sm:text-xs">
            <span className="pulse-dot size-2 shrink-0 rounded-full bg-acc" aria-hidden />
            <span className="truncate text-acc">{ui.v1.sys}</span>
          </p>
          <nav aria-label="Principal" className="hidden items-center gap-6 font-mono text-xs text-mut md:flex">
            {(["projects", "labs", "experience", "contact"] as const).map((k) => (
              <a key={k} href={`#${k}`} className="transition-colors hover:text-acc">
                {ui.nav[k]}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="mx-auto grid max-w-[1240px] gap-10 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:pt-20">
          <div className="lg:col-span-5">
            <h1 className="font-display text-[2.6rem] leading-[1.02] font-bold tracking-[-0.035em] sm:text-6xl">
              <span className="line-in block">{ui.headline[0]}</span>
              <span className="line-in block text-acc" style={{ animationDelay: "120ms" }}>
                {ui.headline[1]}
              </span>
            </h1>
            <p className="mt-6 text-lg font-medium">{profile.fullName}</p>
            <p className="font-mono text-sm text-acc-2">{ui.role}</p>
            <p className="mt-5 max-w-[56ch] text-mut">{ui.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className={btnPrimary}>
                {ui.talk} <ArrowRight className="size-4" />
              </a>
              <a href={cv} download className={btnGhost}>
                <Download className="size-4" /> {ui.cv}
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-mut">
              {data.heroStats.map((s) => (
                <li key={s.label}>
                  <span className="text-fg">{s.value}</span> {s.label}
                </li>
              ))}
              <li>
                <span className="text-fg">8k+</span> MAU
              </li>
            </ul>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <Terminal data={data} onOpen={setOpen} />
            <p className="mt-3 flex items-center gap-2 font-mono text-xs text-mut">
              <ArrowRight className="size-3.5 rotate-90 text-acc" /> {ui.v1.fullUi}
            </p>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mx-auto max-w-[1240px] scroll-mt-14 px-4 py-16 sm:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{ui.sections.projects}</h2>
              <p className="mt-2 max-w-[60ch] text-mut">{ui.sections.projectsSub}</p>
            </div>
            <div role="group" aria-label={ui.filtersLabel} className="flex flex-wrap gap-2">
              {(["all", "saas", "appsec", "iot", "mobile"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={filter === k}
                  onClick={() => setFilter(k)}
                  className={cx(
                    "min-h-10 border px-3 font-mono text-xs transition-colors duration-200",
                    filter === k ? "border-acc bg-acc text-acc-fg" : "border-line-strong text-mut hover:border-acc hover:text-acc",
                  )}
                >
                  {ui.filters[k]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {shown.map((p) => (
              <article
                key={p.id}
                className="group relative flex flex-col border border-line bg-surface transition-colors duration-200 hover:border-acc/60"
              >
                <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2 font-mono text-[11px] text-mut">
                  <span className="truncate">~/projects/{p.id}</span>
                  <span className={cx("shrink-0 border px-1.5 py-0.5", p.isPrivate ? "border-line-strong" : "border-acc/50 text-acc")}>
                    {p.isPrivate ? ui.v1.window.private : ui.v1.window.public}
                  </span>
                </div>
                <Cover p={p} className="aspect-[16/9] w-full" sizes="(min-width: 768px) 600px, 100vw" />
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-xs text-acc-2">
                    {p.category} · {p.year}
                  </p>
                  <h3 className="mt-2 font-display text-xl leading-snug font-semibold">
                    <button
                      type="button"
                      onClick={() => setOpen(p)}
                      className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-acc"
                    >
                      {p.name}
                    </button>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-mut">{p.short}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.metrics.map((m) => (
                      <li key={m} className="border border-line-strong px-2 py-0.5 font-mono text-[11px] text-fg">
                        {m}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-acc">
                    {ui.inspect} <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </p>
                </div>
              </article>
            ))}
            {shown.length === 0 && <p className="text-mut">{ui.empty}</p>}
          </div>
        </section>

        {/* LABS */}
        <section id="labs" className="border-y border-line bg-surface">
          <div className="mx-auto max-w-[1240px] scroll-mt-14 px-4 py-16 sm:px-6">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{ui.sections.labs}</h2>
            <p className="mt-2 max-w-[62ch] text-mut">{ui.sections.labsSub}</p>
            <div className="mt-8 border border-line bg-bg">
              <p className="border-b border-line px-4 py-2 font-mono text-xs text-mut">$ cat {ui.v1.labsFile}</p>
              <ul className="divide-y divide-line">
                {data.platforms.map((pl) => (
                  <li key={pl.key} className="grid gap-2 px-4 py-5 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-6">
                    <span className="font-mono text-xs text-acc">[ OK ]</span>
                    <div>
                      <a
                        href={pl.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-semibold underline decoration-line-strong hover:decoration-acc"
                      >
                        {pl.name} <ArrowUpRight className="size-3.5" />
                      </a>
                      <p className="mt-1 max-w-[70ch] text-sm leading-6 text-mut">{pl.description}</p>
                      <p className="mt-1 font-mono text-xs text-acc-2">{pl.badge}</p>
                    </div>
                    <span className="font-mono text-lg tnum text-acc md:text-right">{pl.metric}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a href={profile.exploitsRepo} target="_blank" rel="noreferrer" className={cx(btnGhost, "mt-6")}>
              <Branch className="size-4" /> web-sec-labs-and-exploits <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </section>

        {/* EXPERIENCE + EDUCATION */}
        <section id="experience" className="mx-auto grid max-w-[1240px] scroll-mt-14 gap-14 px-4 py-16 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{ui.sections.experience}</h2>
            <ol className="mt-8 divide-y divide-line border-y border-line">
              {data.jobs.map((j) => (
                <li key={j.title} className="py-6">
                  <p className="font-mono text-xs text-acc-2">{j.period}</p>
                  <h3 className="mt-1 font-semibold">{j.title}</h3>
                  <p className="mt-2 max-w-[66ch] text-sm leading-6 text-mut">{j.description}</p>
                </li>
              ))}
            </ol>
          </div>
          <div id="education" className="lg:col-span-5">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{ui.sections.education}</h2>
            <ul className="mt-8 space-y-5">
              {data.certs.map((c) => (
                <li key={c.key} className="border border-line bg-surface p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm leading-snug font-semibold">{c.name}</h3>
                    <span
                      className={cx(
                        "shrink-0 border px-1.5 py-0.5 font-mono text-[11px]",
                        c.status === "completed" ? "border-acc/60 text-acc" : "border-line-strong text-mut",
                      )}
                    >
                      {ui.status[c.status]}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-acc-2">{c.issuer}</p>
                  <p className="mt-2 text-sm leading-6 text-mut">{c.description}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-mut">
              <span className="font-semibold text-fg">{ui.studyingLabel}:</span> {data.studying[0]}
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="border-t border-line bg-surface">
          <div className="mx-auto max-w-[1240px] scroll-mt-14 px-4 py-20 sm:px-6">
            <h2 className="max-w-[18ch] font-display text-4xl leading-[1.05] font-bold tracking-[-0.035em] sm:text-6xl">
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
              <a href={profile.github} target="_blank" rel="noreferrer" className={btnGhost}>
                <Branch className="size-4" /> GitHub
              </a>
              <a href={cv} download className={btnGhost}>
                <Download className="size-4" /> {ui.cv}
              </a>
            </div>
            <p className="mt-6 font-mono text-xs text-mut">{data.contact.location}</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-4 py-8 pb-24 font-mono text-xs text-mut sm:px-6">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.fullName} — {ui.footer}</p>
          <a href="#" className="hover:text-acc">{ui.backToTop}</a>
        </div>
      </footer>

      {open && <Inspector p={open} data={data} onClose={() => setOpen(null)} />}
    </div>
  );
}

/* ---------------------------------------------------------------- terminal */

function Terminal({ data, onOpen }: { data: Portfolio; onOpen: (p: Project) => void }) {
  const { ui, projects, locale } = data;
  const seq = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const booted = useRef(false);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    const id = ++seq.current;
    if (cmd.toLowerCase() === "clear") {
      setEntries([]);
      return;
    }
    setEntries((e) => [...e, { id, cmd, out: output(cmd) }]);
  };

  const output = (cmd: string): React.ReactNode => {
    const [name, arg] = cmd.toLowerCase().split(/\s+/, 2);
    const full = cmd.toLowerCase().replace(/\s+/g, " ");
    if (name === "help" || name === "?") {
      return (
        <dl className="grid gap-x-4 sm:grid-cols-[13rem_1fr]">
          {ui.v1.help.map(([c, d]) => (
            <div key={c} className="contents">
              <dt className="text-acc">{c}</dt>
              <dd className="text-mut">{d}</dd>
            </div>
          ))}
        </dl>
      );
    }
    if (full === "whoami --career" || name === "whoami") {
      return (
        <div className="space-y-3">
          {data.bio.map((b) => (
            <p key={b} className="text-fg/90">{b}</p>
          ))}
          <ul className="space-y-1.5">
            {data.jobs.map((j) => (
              <li key={j.title}>
                <span className="text-acc-2">{j.period}</span> — {j.title}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    if (name === "./list-projects.sh" || name === "ls" || name === "projects") {
      return (
        <div>
          <ul className="space-y-1.5">
            {projects.map((p) => (
              <li key={p.id}>
                <button type="button" onClick={() => onOpen(p)} className="group text-left hover:text-acc">
                  <span className="text-acc">[{String(p.index).padStart(2, "0")}]</span> {p.name}{" "}
                  <span className="text-mut group-hover:text-acc">· {p.year}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-mut">{ui.v1.openHint}</p>
        </div>
      );
    }
    if (name === "open") {
      const p = projects[Number(arg) - 1];
      if (!p) return <p className="text-[#f87171]">{ui.v1.badOpen}</p>;
      queueMicrotask(() => onOpen(p));
      return <p className="text-acc">→ {p.name}</p>;
    }
    if (full === "cat security-labs.log" || name === "labs") {
      return (
        <ul className="space-y-1.5">
          {data.platforms.map((pl) => (
            <li key={pl.key}>
              <span className="text-acc">[ OK ]</span>{" "}
              <a href={pl.url} target="_blank" rel="noreferrer" className="underline decoration-line-strong hover:decoration-acc">
                {pl.name}
              </a>{" "}
              <span className="text-acc-2">{pl.metric}</span>
            </li>
          ))}
        </ul>
      );
    }
    if (name === "./contact.sh" || name === "contact") {
      return (
        <ul className="space-y-1.5">
          <li><a href={profile.whatsapp} target="_blank" rel="noreferrer" className="text-acc underline">WhatsApp</a> <span className="text-mut">{profile.whatsappLabel}</span></li>
          <li><a href={`mailto:${profile.email}`} className="text-acc underline">{ui.email}</a> <span className="text-mut">{profile.email}</span></li>
          <li><a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-acc underline">LinkedIn</a> <span className="text-mut">{profile.linkedinHandle}</span></li>
          <li><a href={profile.github} target="_blank" rel="noreferrer" className="text-acc underline">GitHub</a> <span className="text-mut">keodanic</span></li>
          <li><a href={profile.cv[locale]} download className="text-acc underline">{ui.cv}</a> <span className="text-mut">PDF</span></li>
        </ul>
      );
    }
    return (
      <p className="text-[#f87171]">
        {ui.v1.notFound} {cmd}. <span className="text-mut">{ui.v1.tryHelp}</span>
      </p>
    );
  };

  // First paint of the terminal: boot hint + project list, so the log is never empty.
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    run("./list-projects.sh");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [entries]);

  return (
    <div className="border border-line-strong bg-[#05080a] shadow-[0_24px_60px_-24px_rgb(0_0_0/0.8)]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2 font-mono text-[11px] text-mut">
        <span>victor@portfolio — zsh</span>
        <span className="text-acc">{ui.v1.quick}</span>
      </div>
      <div className="flex flex-wrap gap-2 border-b border-line p-3">
        {["./list-projects.sh", "cat security-labs.log", "whoami --career", "./contact.sh"].map((c, i) => (
          <button
            key={c}
            type="button"
            onClick={() => run(c)}
            className="min-h-10 border border-line-strong px-3 font-mono text-xs text-fg transition-colors duration-200 hover:border-acc hover:bg-acc hover:text-acc-fg"
            aria-label={ui.v1.quickLabels[i]}
          >
            {ui.v1.quickLabels[i]}
          </button>
        ))}
      </div>
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        className="h-[22rem] space-y-4 overflow-y-auto p-4 font-mono text-[13px] leading-6"
      >
        <p className="text-mut">{ui.v1.boot}</p>
        {entries.map((e) => (
          <div key={e.id}>
            <p>
              <span className="text-acc">{ui.v1.prompt}</span> {e.cmd}
            </p>
            <div className="mt-1.5">{e.out}</div>
          </div>
        ))}
      </div>
      <form
        className="flex items-center gap-2 border-t border-line px-4 py-2 font-mono text-[13px]"
        onSubmit={(ev) => {
          ev.preventDefault();
          run(value);
          setValue("");
        }}
      >
        <label htmlFor="v1-cmd" className="shrink-0 text-acc">
          {ui.v1.prompt}
        </label>
        <input
          id="v1-cmd"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder={ui.v1.placeholder}
          className="min-h-10 min-w-0 flex-1 bg-transparent text-fg outline-none placeholder:text-mut/70"
        />
        <button type="submit" className="min-h-10 px-2 text-acc hover:underline">
          {ui.v1.run}
        </button>
      </form>
    </div>
  );
}

/* --------------------------------------------------------------- inspector */

function Inspector({ p, data, onClose }: { p: Project; data: Portfolio; onClose: () => void }) {
  const { ui } = data;
  return (
    <Modal
      onClose={onClose}
      label={p.name}
      className="pop-in m-auto max-h-[calc(100dvh-1.5rem)] w-[min(980px,calc(100vw-1.5rem))] overflow-hidden border border-line-strong bg-bg p-0 text-fg shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)]"
    >
      <div className="flex max-h-[calc(100dvh-1.5rem)] flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-line bg-surface px-4 py-2.5 font-mono text-xs text-mut">
          <span className="truncate">~/projects/{p.id}/architecture.md</span>
          <button
            type="button"
            onClick={onClose}
            aria-label={ui.close}
            className="flex min-h-10 min-w-10 items-center justify-center text-mut hover:text-acc"
          >
            <Close className="size-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-5 sm:p-8">
          <p className="font-mono text-xs text-acc-2">
            {p.category} · {p.year}
          </p>
          <h2 className="mt-2 max-w-[28ch] font-display text-2xl leading-tight font-bold tracking-[-0.025em] sm:text-4xl">{p.name}</h2>
          <p className="mt-3 inline-flex items-center gap-2 font-mono text-xs text-mut">
            {p.isPrivate && <Lock className="size-3.5" />} {p.badge}
          </p>
          <div className="mt-8">
            <ProjectBody p={p} ui={ui} h="font-mono text-xs tracking-wide text-acc uppercase" btn={btnGhost} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
