"use client";

import { GeometricPatterns } from "@/components/background/geometric-patterns";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { FeaturedWork } from "@/components/sections/featured-work";
import { About } from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      {/* Background Layer - Multi-plane parallax */}
      <GeometricPatterns />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <FeaturedWork />
        <About />
        <Process />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
