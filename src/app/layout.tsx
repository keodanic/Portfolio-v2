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
  other: {
    google: "notranslate",
  },
  title: "Victor Daniel | Bug Bounty Hunter & Security Researcher",
  description: "Bug Bounty Hunter focused on finding vulnerabilities and securing web applications.",
  keywords: [
    "Bug Bounty Hunter",
    "Security Researcher",
    "Penetration Tester",
    "Web Security",
    "Cybersecurity",
    "Ethical Hacker",
  ],
  authors: [{ name: "Victor Daniel" }],
  creator: "Victor Daniel",
  metadataBase: new URL("https://victordaniel.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Victor Daniel | Bug Bounty Hunter & Security Researcher",
    title: "Victor Daniel | Bug Bounty Hunter & Security Researcher",
    description: "Bug Bounty Hunter focused on finding vulnerabilities and securing web applications.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Daniel | Bug Bounty Hunter & Security Researcher",
    description: "Bug Bounty Hunter focused on finding vulnerabilities and securing web applications.",
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
    <html suppressHydrationWarning className="dark" translate="no">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
