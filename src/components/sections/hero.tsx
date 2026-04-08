"use client";

import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowDown } from "lucide-react";
import { WebSecurityIcon, ReconIcon, BugBountyIcon, CodeReviewIcon } from "@/components/icons/custom-icons";
import { CVModal } from "@/components/modals/cv-modal";
import { ContactModal } from "@/components/modals/contact-modal";
import { useTranslations } from "next-intl";

const Beams = lazy(() => import("@/components/background/beams"));

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const t = useTranslations("Hero");
  
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
    
      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll(".char");
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 100,
            rotateX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.02,
            delay: 0.3,
          }
        );
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            delay: 0.8,
          }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.1,
            delay: 1,
          }
        );
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".floating-card");

        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.8, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.15,
            delay: 0.5,
          }
        );

        cards.forEach((card, index) => {
          const speed = 0.3 + index * 0.1;
          gsap.to(card, {
            y: () => -100 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }

      gsap.to(".hero-content", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="char inline-block"
        style={{ transformStyle: "preserve-3d" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
      >
        {/* Animated Beams Background */}
        <div className="absolute inset-0 z-0">
          <Suspense
            fallback={
              <div className="absolute inset-0 bg-black">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
              </div>
            }
          >
            <Beams
              beamWidth={3}
              beamHeight={30}
              beamNumber={16}
              lightColor="#ffffff"
              speed={1.5}
              noiseIntensity={1.5}
              scale={0.15}
              rotation={15}
            />
          </Suspense>
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        </div>

        {/* Content Layer - 1.0x scroll speed */}
        <div className="hero-content relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Typography */}
            <div className="space-y-8">
              {/* Eyebrow */}
            
              {/* Main Headline */}
              <h1
                ref={headlineRef}
                className="font-[family-name:var(--font-cabinet)] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[-0.03em] leading-[0.9]"
                style={{ perspective: "1000px" }}
              >
                <span className="block text-white">
                  {splitText("Victor")}
                </span>
                <span className="block text-white/40">
                  {splitText("Daniel")}
                </span>
              </h1>

              {/* Subtitle */}
              <p
                ref={subtitleRef}
                className="text-lg sm:text-xl text-white/60 max-w-md leading-relaxed font-bold"
              >
                {t("subtitle1")}
              </p>
              <p
                className="text-lg sm:text-xl text-white/60 max-w-md leading-relaxed"
              >
                {t("subtitle2")}
              </p>

              {/* CTA Buttons */}
              <div ref={ctaRef} className="flex flex-wrap gap-4 pt-4">
                <MagneticButton 
                  variant="electric" 
                  size="lg"
                  onClick={() => setIsCVModalOpen(true)}
                >
                  {t("ctaDownloadCV")}
                </MagneticButton>
                <MagneticButton 
                  variant="outline" 
                  size="lg"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  {t("ctaTalkToMe")}
                </MagneticButton>
              </div>

              {/* Stats */}
              <div className="flex gap-12 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl font-[family-name:var(--font-cabinet)] font-bold text-white">
                    {t("stats.yearsExperience.value")}
                  </div>
                  <div className="text-sm text-white/50">{t("stats.yearsExperience.label")}</div>
                </div>
                <div>
                  <div className="text-3xl font-[family-name:var(--font-cabinet)] font-bold text-white">
                    {t("stats.projectsDelivered.value")}
                  </div>
                  <div className="text-sm text-white/50">{t("stats.projectsDelivered.label")}</div>
                </div>
                <div>
                  <div className="text-3xl font-[family-name:var(--font-cabinet)] font-bold text-white">
                    {t("stats.companies.value")}
                  </div>
                  <div className="text-sm text-white/50">{t("stats.companies.label")}</div>
                </div>
              </div>
            </div>

            {/* Right Column - Floating Glass Cards (0.5x scroll speed) */}
            <div ref={cardsRef} className="relative h-[600px] lg:h-[700px] hidden lg:block">
              {/* Card 1 - Web Security */}
              <GlassCard
                className="floating-card absolute top-0 right-4 w-72 p-6"
                variant="default"
              >
                <div className="flex items-start gap-4">
                  <WebSecurityIcon size={24} color="#FF6B6B" className="flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-[family-name:var(--font-cabinet)] font-semibold text-white mb-1">
                      {t("cards.webSecurity.title")}
                    </h3>
                    <p className="text-sm text-white/50">
                      {t("cards.webSecurity.description")}
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* Card 2 - Reconnaissance */}
              <GlassCard
                className="floating-card absolute top-28 left-0 w-64 p-6"
                variant="default"
              >
                <div className="flex items-start gap-4">
                  <ReconIcon size={24} color="#4ECDC4" className="flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-[family-name:var(--font-cabinet)] font-semibold text-white mb-1">
                      {t("cards.reconnaissance.title")}
                    </h3>
                    <p className="text-sm text-white/50">
                      {t("cards.reconnaissance.description")}
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* Card 3 - Bug Bounty */}
              <GlassCard
                className="floating-card absolute top-56 right-8 w-80 p-6"
                variant="default"
              >
                <div className="flex items-start gap-4">
                  <BugBountyIcon size={24} color="#FFE66D" className="flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-[family-name:var(--font-cabinet)] font-semibold text-white mb-1">
                      {t("cards.bugBounty.title")}
                    </h3>
                    <p className="text-sm text-white/50">
                      {t("cards.bugBounty.description")}
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* Card 4 - Code Review */}
              <GlassCard
                className="floating-card absolute top-96 left-12 w-72 p-6"
                variant="default"
              >
                <div className="flex items-start gap-4">
                  <CodeReviewIcon size={24} color="#A78BFA" className="flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-[family-name:var(--font-cabinet)] font-semibold text-white mb-1">
                      {t("cards.codeReview.title")}
                    </h3>
                    <p className="text-sm text-white/50">
                      {t("cards.codeReview.description")}
                    </p>
                  </div>
                </div>
              </GlassCard>
      
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs tracking-widest uppercase">{t("scrollIndicator")}</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* Modals */}
      <CVModal 
        isOpen={isCVModalOpen} 
        onClose={() => setIsCVModalOpen(false)} 
      />
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
}
