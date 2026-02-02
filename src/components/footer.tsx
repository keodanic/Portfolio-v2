"use client";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowUp } from "lucide-react";
import LogoVictor from "./logo";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <LogoVictor className="h-10 w-auto text-white" />
            <span className="text-white/40 text-sm">
              © {new Date().getFullYear()} Victor Daniel Cardoso. Todos os direitos reservados.
            </span>
          </div>

          {/* Back to Top */}
          <MagneticButton
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="group"
          >
            Voltar ao Topo
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
