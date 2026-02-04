"use client";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowUp } from "lucide-react";
import LogoVictor from "./logo";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden">
      {/* Glow sutil de fundo para manter a estética Cyber */}
      <div className="absolute left-1/2 -top-24 -translate-x-1/2 w-64 h-24 bg-[#0066ff]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-4">
              <LogoVictor className="h-8 w-auto text-white opacity-80" />
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              <p className="text-white/40 text-xs tracking-widest uppercase font-medium">
                Security-First Engineer
              </p>
            </div>
            <span className="text-white/20 text-xs font-mono">
              © {new Date().getFullYear()} Victor Daniel. Built for scalability & security.
            </span>
          </div>

          {/* Nav & Action */}
          <div className="flex items-center gap-8">
            <MagneticButton
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="group text-white/50 hover:text-white transition-colors"
            >
              Back to Top
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
            </MagneticButton>
          </div>
        </div>

        {/* Local Time / Status (Opcional - Toque de Senioridade) */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] text-white/20 uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Available for new challenges
          </div>
          <div className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
            Based in Teresina, BR — {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
          </div>
        </div>
      </div>
    </footer>
  );
}