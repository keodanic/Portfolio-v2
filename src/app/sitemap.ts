import type { MetadataRoute } from "next";
import { profile } from "@/content/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const alternates = { languages: { "pt-BR": `${profile.site}/pt`, en: `${profile.site}/en` } };
  return [
    { url: `${profile.site}/pt`, alternates },
    { url: `${profile.site}/en`, alternates },
  ];
}
