import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Archivo, Geist, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { routing } from "@/i18n/routing";
import { profile } from "@/content/data";
import "../globals.css";

const jb = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jb", display: "swap" });
const sg = Space_Grotesk({ subsets: ["latin"], variable: "--font-sg", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  authors: [{ name: profile.fullName }],
  creator: profile.fullName,
};

export const viewport: Viewport = {
  themeColor: "#07090b",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale === "pt" ? "pt-BR" : "en"}
      className={`${jb.variable} ${sg.variable} ${geist.variable} ${archivo.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
