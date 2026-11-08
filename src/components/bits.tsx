"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/data";
import { profile } from "@/content/data";
import type { UI } from "@/content/ui";
import { ArrowUpRight, Branch, Check, Copy, Globe, Lock } from "./icons";

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

/** Native <dialog>: focus trap, Esc and top layer for free. Click on the backdrop closes it. */
export function Modal({
  onClose,
  label,
  className,
  children,
}: {
  onClose: () => void;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={className}
    >
      {children}
    </dialog>
  );
}

export function CopyEmail({ ui, className }: { ui: UI; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(profile.email);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {
          window.location.href = `mailto:${profile.email}`;
        }
      }}
    >
      {done ? <Check className="size-4" /> : <Copy className="size-4" />}
      <span role="status">{done ? ui.copied : ui.copyEmail}</span>
    </button>
  );
}

export const TERMINAL_PREVIEW = [
  "$ python3 poc_business_logic.py --lab portswigger",
  "[*] GET  /login            csrf=extracted (regex)",
  "[*] POST /login            302 -> session renewed",
  "[*] token rotation         csrf refreshed per request",
  "[*] race window            parallel requests armed",
  "[+] finding                logic flaw reproduced",
  "$ git diff patches/orders.guard.ts",
  "+ where: { id, ownerId: user.sub }   # authz in the query",
];

export function TerminalPreview({ className }: { className?: string }) {
  return (
    <pre
      aria-label="Python PoC terminal output"
      className={cx("overflow-x-auto bg-[#05080a] p-4 font-mono text-[12.5px] leading-6 text-[#8fe3c3]", className)}
    >
      {TERMINAL_PREVIEW.map((l, i) => (
        <span
          key={i}
          className={cx(
            "block whitespace-pre",
            l.startsWith("[+]") && "text-[#d6ff3a]",
            l.startsWith("+") && "text-[#6ee7b7]",
            l.startsWith("$") && "text-white",
          )}
        >
          {l}
        </span>
      ))}
    </pre>
  );
}

/** Fills its (relative, sized) parent. Cover keeps cards dense; contain shows the whole screen. */
export function Shot({
  src,
  alt,
  fit = "cover",
  priority,
  sizes = "(min-width: 1024px) 720px, 100vw",
}: {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={fit === "cover" ? "object-cover object-top" : "object-contain"}
    />
  );
}

/** Project cover: first real screenshot, or the PoC terminal for the repo that has no UI. */
export function Cover({ p, className, sizes }: { p: Project; className?: string; sizes?: string }) {
  if (p.previewType === "terminal" || p.images.length === 0) {
    return (
      <div className={cx("relative overflow-hidden", className)}>
        <TerminalPreview className="h-full" />
      </div>
    );
  }
  return (
    <div className={cx("relative overflow-hidden bg-surface-2", className)}>
      <Shot src={p.images[0]} alt={p.name} sizes={sizes} />
    </div>
  );
}

export function Gallery({ p, ui, frame }: { p: Project; ui: UI; frame?: string }) {
  const [i, setI] = useState(0);
  if (p.images.length === 0) {
    return <TerminalPreview className={cx("rounded-sm", frame)} />;
  }
  return (
    <div>
      <div className={cx("relative aspect-[16/10] w-full overflow-hidden bg-[#05070a]", frame)}>
        <Shot src={p.images[i]} alt={`${ui.d.screenshot} ${i + 1}/${p.images.length} — ${p.name}`} fit="contain" />
      </div>
      {p.images.length > 1 && (
        <div className="mt-2 flex gap-2" role="group" aria-label={ui.d.gallery}>
          {p.images.map((src, n) => (
            <button
              key={src}
              type="button"
              aria-label={`${ui.d.screenshot} ${n + 1}`}
              aria-pressed={n === i}
              onClick={() => setI(n)}
              className={cx(
                "relative h-14 w-24 overflow-hidden border bg-surface-2 transition-[opacity,border-color] duration-200",
                n === i ? "border-acc opacity-100" : "border-line opacity-60 hover:opacity-100",
              )}
            >
              <Shot src={src} alt="" sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectLinks({ p, ui, btn }: { p: Project; ui: UI; btn: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {p.liveUrl && (
        <a href={p.liveUrl} target="_blank" rel="noreferrer" className={btn}>
          <Globe className="size-4" /> {ui.liveDemo} <ArrowUpRight className="size-3.5" />
        </a>
      )}
      {p.github && (
        <a href={p.github} target="_blank" rel="noreferrer" className={btn}>
          <Branch className="size-4" /> {ui.github} <ArrowUpRight className="size-3.5" />
        </a>
      )}
      {p.isPrivate && !p.github && (
        <p className="inline-flex items-center gap-2 text-sm text-mut">
          <Lock className="size-4" /> {ui.privateRepo}
        </p>
      )}
    </div>
  );
}

/** Shared body of the project inspector. Each version wraps it in its own chrome. */
export function ProjectBody({
  p,
  ui,
  h,
  btn,
  withGallery = true,
}: {
  p: Project;
  ui: UI;
  /** class for sub-headings */
  h: string;
  btn: string;
  withGallery?: boolean;
}) {
  return (
    <div className="space-y-9">
      <section>
        <h3 className={h}>{ui.d.overview}</h3>
        <p className="mt-3 max-w-[68ch] text-[15px] leading-7 text-fg/90">{p.full}</p>
        <dl className="mt-5 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-[7rem_1fr]">
          <dt className="text-mut">{ui.d.role}</dt>
          <dd>{p.role}</dd>
          <dt className="text-mut">{ui.d.duration}</dt>
          <dd>{p.duration}</dd>
          <dt className="text-mut">{ui.d.team}</dt>
          <dd>{p.teamSize}</dd>
        </dl>
      </section>

      <section>
        <h3 className={h}>{ui.d.impact}</h3>
        <ul className="mt-3 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          {p.impact.map((m) => (
            <li key={m.metric} className="bg-surface p-4">
              <p className="font-mono text-lg tnum text-acc">{m.value}</p>
              <p className="mt-1 text-xs text-mut">{m.metric}</p>
            </li>
          ))}
        </ul>
      </section>

      {withGallery && (
        <section>
          <h3 className={h}>{ui.d.gallery}</h3>
          <div className="mt-3">
            <Gallery p={p} ui={ui} frame="border border-line" />
          </div>
        </section>
      )}

      <div className="grid gap-9 md:grid-cols-2">
        <section>
          <h3 className={h}>{ui.d.features}</h3>
          <ul className="mt-3 space-y-3 text-sm leading-6 text-fg/90">
            {p.features.map((f) => (
              <li key={f} className="flex gap-3">
                <Check className="mt-1 size-4 shrink-0 text-acc" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className={h}>{ui.d.challenges}</h3>
          <ul className="mt-3 space-y-3 text-sm leading-6 text-fg/90">
            {p.challenges.map((c) => (
              <li key={c} className="flex gap-3">
                <Lock className="mt-1 size-4 shrink-0 text-acc-2" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section>
        <h3 className={h}>{ui.d.stack}</h3>
        <dl className="mt-3 space-y-3">
          {p.stack.map((g) => (
            <div key={g.group} className="grid gap-2 sm:grid-cols-[9rem_1fr]">
              <dt className="text-sm text-mut">{g.group}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <span key={s} className="border border-line bg-surface px-2 py-0.5 font-mono text-xs text-fg/90">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h3 className={h}>{ui.d.links}</h3>
        <div className="mt-3">
          <ProjectLinks p={p} ui={ui} btn={btn} />
        </div>
      </section>
    </div>
  );
}
