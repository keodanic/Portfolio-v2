"use client";

import type { Portfolio } from "@/content/data";
import { cx } from "./bits";
import { setVersion, type Version } from "./store";

const versions: Version[] = [1, 2, 3];

/** Fixed bottom-right control: V1 / V2 / V3 plus PT / EN. Switching versions never reloads the page. */
export function VersionSwitcher({ data, version }: { data: Portfolio; version: Version }) {
  const { ui, locale } = data;
  const names = { 1: ui.switcher.v1, 2: ui.switcher.v2, 3: ui.switcher.v3 } as const;
  const other = locale === "pt" ? "en" : "pt";
  return (
    <div
      role="group"
      aria-label={ui.switcher.label}
      className="fixed right-3 bottom-3 z-[90] flex items-stretch border border-[#2c3440] bg-[#0a0c10] font-mono text-xs text-[#e8ecf1] shadow-[0_10px_30px_-8px_rgb(0_0_0/0.7)] sm:right-5 sm:bottom-5"
    >
      <p className="hidden items-center border-r border-[#2c3440] px-3 text-[11px] text-[#a3adbb] md:flex" aria-live="polite">
        {names[version]}
      </p>
      {versions.map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => setVersion(v)}
          aria-pressed={v === version}
          aria-label={`V${v} — ${names[v]}`}
          title={names[v]}
          className={cx(
            "min-h-11 min-w-11 px-3 font-semibold transition-colors duration-200",
            v === version ? "bg-acc text-acc-fg" : "text-[#cbd3de] hover:bg-white/10 hover:text-white",
          )}
        >
          V{v}
        </button>
      ))}
      <a
        href={`/${other}?v=${version}`}
        hrefLang={other === "pt" ? "pt-BR" : "en"}
        aria-label={`${ui.switcher.lang}: ${other === "pt" ? "Português" : "English"}`}
        className="flex min-h-11 min-w-11 items-center justify-center border-l border-[#2c3440] px-3 font-semibold text-[#cbd3de] transition-colors duration-200 hover:bg-white/10 hover:text-white"
      >
        {locale === "pt" ? "PT → EN" : "EN → PT"}
      </a>
    </div>
  );
}
