"use client";

import { useSyncExternalStore } from "react";

export type Version = 1 | 2 | 3;
export const DEFAULT_VERSION: Version = 2;

const listeners = new Set<() => void>();

function read(): Version {
  const v = new URLSearchParams(window.location.search).get("v");
  return v === "1" ? 1 : v === "3" ? 3 : v === "2" ? 2 : DEFAULT_VERSION;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("popstate", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("popstate", cb);
  };
}

/** Active version, driven by ?v=1|2|3. Server and first paint render the default. */
export function useVersion(): Version {
  return useSyncExternalStore(subscribe, read, () => DEFAULT_VERSION);
}

/** Switch without reloading: rewrite the query string in place and notify subscribers. */
export function setVersion(v: Version) {
  const url = new URL(window.location.href);
  url.searchParams.set("v", String(v));
  window.history.replaceState(null, "", url);
  window.scrollTo({ top: 0, behavior: "instant" });
  listeners.forEach((l) => l());
}
