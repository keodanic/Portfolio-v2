"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import {
  Mail,
  MapPin,
  Linkedin,
  ArrowUpRight,
  Send,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/86981509299",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/victordaniel-dev",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/victoor__sc",
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const t = useTranslations("Contact");

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols) - Info */}
          <div ref={contentRef} className="lg:col-span-5 space-y-8">
            <div>
              <span className="font-mono text-[#0066ff] text-xs tracking-widest uppercase mb-3 block">
                {t("sectionTag")}
              </span>
              <h2 className="font-[family-name:var(--font-cabinet)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.08] mb-4">
                {t("title")}
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                {t("description")}
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${t("info.email.value")}`}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:text-[#0066ff] transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0066ff]/10 border border-[#0066ff]/25 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#0066ff]" />
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-500">
                    {t("info.email.label")}
                  </div>
                  <div className="text-sm font-medium text-white group-hover:text-[#0066ff] transition-colors">
                    {t("info.email.value")}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-zinc-300">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-zinc-400" />
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-500">
                    {t("info.location.label")}
                  </div>
                  <div className="text-sm font-medium text-white">
                    {t("info.location.value")}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3">
                {t("social.title")}
              </div>
              <div className="flex gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800/90 flex items-center justify-center text-zinc-400 hover:text-[#0066ff] hover:border-[#0066ff]/50 hover:bg-[#0066ff]/5 transition-all"
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (7 cols) - Form */}
          <div className="lg:col-span-7">
            <GlassCard
              variant="highlight"
              className="p-6 sm:p-8 border-zinc-800/90 bg-zinc-950/90"
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-xl bg-[#0066ff]/10 border border-[#0066ff]/25 flex items-center justify-center mx-auto mb-5">
                    <Send className="w-6 h-6 text-[#0066ff]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-cabinet)] text-2xl font-bold text-white mb-2">
                    {t("form.submit.success.title")}
                  </h3>
                  <p className="text-zinc-400 text-sm">
                    {t("form.submit.success.description")}
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                      >
                        {t("form.name.label")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        required
                        className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#0066ff] transition-colors"
                        placeholder={t("form.name.placeholder")}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                      >
                        {t("form.email.label")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        required
                        className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#0066ff] transition-colors"
                        placeholder={t("form.email.placeholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                    >
                      {t("form.message.label")}
                    </label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      required
                      rows={4}
                      className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#0066ff] transition-colors resize-none"
                      placeholder={t("form.message.placeholder")}
                    />
                  </div>

                  <MagneticButton
                    type="submit"
                    variant="electric"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        {t("form.submit.sending")}
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        {t("form.submit.default")}
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    )}
                  </MagneticButton>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
