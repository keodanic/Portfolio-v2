import { routing, type Locale } from "@/i18n/routing";
import { ui } from "@/content/ui";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Victor Daniel — Backend & Full-Stack Engineer · AppSec";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return renderOg(ui[locale].headline.join(" "), "NestJS · Next.js · TypeScript · Python · AppSec");
}
