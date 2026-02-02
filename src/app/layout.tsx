import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-satoshi",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-cabinet",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Victor Daniel | Dev Full Stack",
    template: "%s | Victor Daniel",
  },
  description:
    "Full-Stack Developer crafting human-centered digital experiences with intentional design and sophisticated interactions.",
  keywords: [
    "Programador",
    "Desenvolvedor Web",
    "Desenvolvedor Full Stack",
    "Digital Experience",
    "Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Victor Daniel" }],
  creator: "Victor Silva",
  metadataBase: new URL("https://victordaniel.developer"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Victor Daniel | Dev Full Stack",
    title: "Victor Daniel | Dev Full Stack",
    description:
      "Full-Stack Developer crafting human-centered digital experiences with intentional design and sophisticated interactions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Daniel | Dev Full Stack",
    description:
      "Full-Stack Developer crafting human-centered digital experiences with intentional design and sophisticated interactions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#000000" }],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
