import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getPortfolio } from "@/content/data";
import pt from "@/content/historical_pt.json";
import en from "@/content/historical_en.json";
import { Portfolio } from "@/components/portfolio";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const m = (locale === "pt" ? pt : en).Metadata;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: `/${locale}`, languages: { "pt-BR": "/pt", en: "/en" } },
    openGraph: {
      type: "website",
      siteName: "Victor Daniel",
      title: m.title,
      description: m.description,
      locale: locale === "pt" ? "pt_BR" : "en_US",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function Home({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Portfolio data={getPortfolio(locale)} />;
}
