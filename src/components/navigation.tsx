"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Menu, X } from "lucide-react";
import LogoVictor from "./logo";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations("Navigation");
  const locale = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("labs"), href: "/#labs" },
    { label: t("certifications"), href: "/#certifications" },
    { label: t("about"), href: "/#about" },
    { label: t("contact"), href: "/#contact" },
  ];

  const toggleLocale = () => {
    const newLocale = locale === "pt" ? "en" : "pt";
    window.location.href = `/${newLocale}${window.location.pathname.replace(/^\/(pt|en)/, "")}${window.location.hash}`;
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isScrolled
            ? "py-3"
            : "py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={cn(
              "flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500",
              isScrolled
                ? "bg-black/50 backdrop-blur-[20px] saturate-[180%] border border-white/[0.08]"
                : "bg-transparent"
            )}
          >
            {/* Logo */}
            <Link href="/">
              <LogoVictor className="h-10 w-auto text-white" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-white transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#0066ff] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Button & Locale Toggle */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleLocale}
                className="text-sm text-white/50 hover:text-white transition-colors uppercase tracking-wider"
                aria-label="Toggle language"
              >
                {locale}
              </button>
              <MagneticButton variant="electric" size="sm">
                {t("ctaButton")}
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white hover:text-[#0066ff] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-[20px]"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-8">
          {/* Locale Toggle Mobile */}
          <button
            onClick={toggleLocale}
            className="absolute top-24 text-sm text-white/50 hover:text-white transition-colors uppercase tracking-wider"
          >
            {locale === "en" ? "English (EN)" : "Português (PT)"} → {locale === "en" ? "Português" : "English"}
          </button>

          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              className="font-[family-name:var(--font-cabinet)] text-4xl font-bold text-white hover:text-[#0066ff] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </a>
          ))}
          <MagneticButton
            variant="electric"
            size="lg"
            className="mt-8"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("ctaButton")}
          </MagneticButton>
        </div>
      </div>
    </>
  );
}
