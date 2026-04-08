import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  
  // Access metadata from messages safely
  const metadataTitle = (messages?.Metadata?.title as string) || "Victor Daniel | Bug Bounty Hunter & Security Researcher";
  const metadataDesc = (messages?.Metadata?.description as string) || "Bug Bounty Hunter focused on finding vulnerabilities and securing web applications.";
  
  return {
    title: {
      default: metadataTitle,
      template: "%s | Victor Daniel",
    },
    description: metadataDesc,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
