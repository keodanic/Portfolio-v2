import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  // Every URL carries its locale; "/" redirects to /pt. Query strings (?v=1|2|3) pass through untouched.
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
