"use client";

import { useEffect, useRef } from "react";
import { X, ExternalLink, FileText } from "lucide-react";
import { gsap } from "gsap";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CVModal({ isOpen, onClose }: CVModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { scale: 0.9, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }
        );
      }
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => {
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);

  const handleViewCV = (language: "pt" | "en") => {
    const cvLinks = {
      pt: "/cv/Victor_Daniel_CV_PT.pdf",
      en: "/cv/Victor_Daniel_CV_EN.pdf",
    };

    // Abre o CV em uma nova aba para visualização
    window.open(cvLinks[language], "_blank", "noopener,noreferrer");

    // Também faz o download automaticamente
    const link = document.createElement("a");
    link.href = cvLinks[language];
    link.download = `Victor_Daniel_CV_${language.toUpperCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Fecha o modal após abrir e baixar
    setTimeout(() => onClose(), 300);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative w-full max-w-md"
      >
        {/* Glass Card Effect */}
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0066ff]/10 via-transparent to-purple-500/10 pointer-events-none" />
          
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px",
            }}
          />

          {/* Content */}
          <div className="relative p-8">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#0066ff] blur-2xl opacity-30" />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0066ff]/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-[#0066ff]" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="font-[family-name:var(--font-cabinet)] text-3xl font-bold text-white text-center mb-3 tracking-[-0.02em]">
              View & Download CV
            </h2>

            {/* Subtitle */}
            <p className="text-white/60 text-center mb-8">
              Choose your language
            </p>

            {/* Language Buttons */}
            <div className="space-y-3">
              {/* Portuguese Button */}
              <button
                onClick={() => handleViewCV("pt")}
                className="w-full group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0066ff]/0 via-[#0066ff]/10 to-[#0066ff]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                      🇧🇷
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">Português</div>
                      <div className="text-xs text-white/50">Brazilian Portuguese</div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-[#0066ff] transition-colors" />
                </div>
              </button>

              {/* English Button */}
              <button
                onClick={() => handleViewCV("en")}
                className="w-full group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                      🇺🇸
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">English</div>
                      <div className="text-xs text-white/50">International</div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-purple-500 transition-colors" />
                </div>
              </button>
            </div>

            {/* Footer Note */}
            <p className="text-center text-xs text-white/30 mt-6">
              PDF format • Updated {new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}