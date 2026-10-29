"use client";

import { GeometricPatterns } from "@/components/background/geometric-patterns";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { FeaturedWork } from "@/components/sections/featured-work";

export default function ProjectsPage() {
  return (
    <>
      <GeometricPatterns />
      <Navigation />
      <main className="relative z-10 min-h-screen pt-12">
        <FeaturedWork />
      </main>
      <Footer />
    </>
  );
}
