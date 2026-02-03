"use client";

import { useEffect, useRef } from "react";
import { X, MessageCircle, Linkedin, Mail, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
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

  const handleContact = (platform: "whatsapp" | "linkedin" | "gmail") => {
    const contacts = {
      whatsapp: "https://wa.me/86981509299", 
      linkedin: "https://linkedin.com/in/victordaniel-dev", 
      gmail: "mailto:victordanielsnt@gmail.com",
    };

    window.open(contacts[platform], "_blank");
    
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
                  <MessageCircle className="w-8 h-8 text-[#0066ff]" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="font-[family-name:var(--font-cabinet)] text-3xl font-bold text-white text-center mb-3 tracking-[-0.02em]">
              Let's Talk
            </h2>

            {/* Subtitle */}
            <p className="text-white/60 text-center mb-8">
              Choose your preferred platform
            </p>

            {/* Contact Buttons */}
            <div className="space-y-3">
              {/* WhatsApp Button */}
              <button
                onClick={() => handleContact("whatsapp")}
                className="w-full group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:bg-[#25D366]/10 hover:border-[#25D366]/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/0 via-[#25D366]/20 to-[#25D366]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                      <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">WhatsApp</div>
                      <div className="text-xs text-white/50">Message me directly</div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-[#25D366] transition-colors" />
                </div>
              </button>

              {/* LinkedIn Button */}
              <button
                onClick={() => handleContact("linkedin")}
                className="w-full group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A66C2]/0 via-[#0A66C2]/20 to-[#0A66C2]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0A66C2]/10 border border-[#0A66C2]/20 flex items-center justify-center group-hover:bg-[#0A66C2]/20 transition-colors">
                      <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">LinkedIn</div>
                      <div className="text-xs text-white/50">Professional network</div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-[#0A66C2] transition-colors" />
                </div>
              </button>

              {/* Gmail Button */}
              <button
                onClick={() => handleContact("gmail")}
                className="w-full group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:bg-[#EA4335]/10 hover:border-[#EA4335]/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#EA4335]/0 via-[#EA4335]/20 to-[#EA4335]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#EA4335]/10 border border-[#EA4335]/20 flex items-center justify-center group-hover:bg-[#EA4335]/20 transition-colors">
                      <Mail className="w-5 h-5 text-[#EA4335]" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">Gmail</div>
                      <div className="text-xs text-white/50">Send me an email</div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-[#EA4335] transition-colors" />
                </div>
              </button>
            </div>

            {/* Footer Note */}
            <p className="text-center text-xs text-white/30 mt-6">
              I typically respond within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}