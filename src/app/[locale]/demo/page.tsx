"use client";

import { GeometricPatterns } from "@/components/background/geometric-patterns";
import { Navigation } from "@/components/navigation";
import { WebSecurityIcon, ReconIcon, BugBountyIcon, CodeReviewIcon, TerminalIcon, TargetIcon, TrophyIcon } from "@/components/icons/custom-icons";

export default function DemoPage() {
  return (
    <>
      <GeometricPatterns />
      <Navigation />
      <main className="relative z-10 min-h-screen py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-[family-name:var(--font-cabinet)] text-4xl sm:text-5xl font-bold text-white tracking-[-0.03em] mb-4">
              Estilos de Ícones
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Compare diferentes abordagens visuais para os cards e ícones
            </p>
          </div>

          {/* ESTILO ATUAL (referência) */}
          <section>
            <h2 className="text-[#0066ff] text-sm tracking-widest uppercase mb-8 block">
              Estilo Atual (Glass + Caixa Colorida)
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                <div className="w-12 h-12 rounded-xl bg-[#FF6B6B]/20 border border-[#FF6B6B]/40 flex items-center justify-center mb-4">
                  <WebSecurityIcon size={24} color="#FF6B6B" />
                </div>
                <h3 className="font-semibold text-white mb-2">Web Security</h3>
                <p className="text-sm text-white/50">XSS, SQLi, CSRF, IDOR</p>
              </div>
              {/* Card 2 */}
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                <div className="w-12 h-12 rounded-xl bg-[#4ECDC4]/20 border border-[#4ECDC4]/40 flex items-center justify-center mb-4">
                  <ReconIcon size={24} color="#4ECDC4" />
                </div>
                <h3 className="font-semibold text-white mb-2">Reconnaissance</h3>
                <p className="text-sm text-white/50">Subdomain enum, OSINT</p>
              </div>
              {/* Card 3 */}
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                <div className="w-12 h-12 rounded-xl bg-[#FFE66D]/20 border border-[#FFE66D]/40 flex items-center justify-center mb-4">
                  <BugBountyIcon size={24} color="#FFE66D" />
                </div>
                <h3 className="font-semibold text-white mb-2">Bug Bounty</h3>
                <p className="text-sm text-white/50">HackerOne, Bugcrowd</p>
              </div>
              {/* Card 4 */}
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                <div className="w-12 h-12 rounded-xl bg-[#A78BFA]/20 border border-[#A78BFA]/40 flex items-center justify-center mb-4">
                  <CodeReviewIcon size={24} color="#A78BFA" />
                </div>
                <h3 className="font-semibold text-white mb-2">Code Review</h3>
                <p className="text-sm text-white/50">Reading code to find bugs</p>
              </div>
            </div>
          </section>

          {/* OPÇÃO A: Ícones Grandes sem Caixa */}
          <section>
            <h2 className="text-[#0066ff] text-sm tracking-widest uppercase mb-8 block">
              Opção A: Ícones Grandes sem Caixa
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div className="group">
                <WebSecurityIcon size={48} color="#FF6B6B" className="mb-4" />
                <div className="w-12 h-px bg-gradient-to-r from-[#FF6B6B] to-transparent mb-4" />
                <h3 className="font-semibold text-white mb-2 group-hover:text-[#FF6B6B] transition-colors">Web Security</h3>
                <p className="text-sm text-white/50">XSS, SQLi, CSRF, IDOR</p>
              </div>
              {/* Card 2 */}
              <div className="group">
                <ReconIcon size={48} color="#4ECDC4" className="mb-4" />
                <div className="w-12 h-px bg-gradient-to-r from-[#4ECDC4] to-transparent mb-4" />
                <h3 className="font-semibold text-white mb-2 group-hover:text-[#4ECDC4] transition-colors">Reconnaissance</h3>
                <p className="text-sm text-white/50">Subdomain enum, OSINT</p>
              </div>
              {/* Card 3 */}
              <div className="group">
                <BugBountyIcon size={48} color="#FFE66D" className="mb-4" />
                <div className="w-12 h-px bg-gradient-to-r from-[#FFE66D] to-transparent mb-4" />
                <h3 className="font-semibold text-white mb-2 group-hover:text-[#FFE66D] transition-colors">Bug Bounty</h3>
                <p className="text-sm text-white/50">HackerOne, Bugcrowd</p>
              </div>
              {/* Card 4 */}
              <div className="group">
                <CodeReviewIcon size={48} color="#A78BFA" className="mb-4" />
                <div className="w-12 h-px bg-gradient-to-r from-[#A78BFA] to-transparent mb-4" />
                <h3 className="font-semibold text-white mb-2 group-hover:text-[#A78BFA] transition-colors">Code Review</h3>
                <p className="text-sm text-white/50">Reading code to find bugs</p>
              </div>
            </div>
          </section>

          {/* OPÇÃO B: Números/Letters */}
          <section>
            <h2 className="text-[#0066ff] text-sm tracking-widest uppercase mb-8 block">
              Opção B: Números Estilo Editorial
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="border-l-2 border-[#FF6B6B] pl-6 py-2">
                <span className="font-[family-name:var(--font-cabinet)] text-5xl font-bold text-[#FF6B6B]/30 block mb-2">01</span>
                <h3 className="font-semibold text-white mb-2">Web Security</h3>
                <p className="text-sm text-white/50">XSS, SQLi, CSRF, IDOR</p>
              </div>
              {/* Card 2 */}
              <div className="border-l-2 border-[#4ECDC4] pl-6 py-2">
                <span className="font-[family-name:var(--font-cabinet)] text-5xl font-bold text-[#4ECDC4]/30 block mb-2">02</span>
                <h3 className="font-semibold text-white mb-2">Reconnaissance</h3>
                <p className="text-sm text-white/50">Subdomain enum, OSINT</p>
              </div>
              {/* Card 3 */}
              <div className="border-l-2 border-[#FFE66D] pl-6 py-2">
                <span className="font-[family-name:var(--font-cabinet)] text-5xl font-bold text-[#FFE66D]/30 block mb-2">03</span>
                <h3 className="font-semibold text-white mb-2">Bug Bounty</h3>
                <p className="text-sm text-white/50">HackerOne, Bugcrowd</p>
              </div>
              {/* Card 4 */}
              <div className="border-l-2 border-[#A78BFA] pl-6 py-2">
                <span className="font-[family-name:var(--font-cabinet)] text-5xl font-bold text-[#A78BFA]/30 block mb-2">04</span>
                <h3 className="font-semibold text-white mb-2">Code Review</h3>
                <p className="text-sm text-white/50">Reading code to find bugs</p>
              </div>
            </div>
          </section>

          {/* OPÇÃO C: Ícones Outline Minimalistas */}
          <section>
            <h2 className="text-[#0066ff] text-sm tracking-widest uppercase mb-8 block">
              Opção C: Ícones Outline (Estilo Blueprint)
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="p-6 border border-white/10 rounded-lg hover:border-[#FF6B6B]/50 transition-colors">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="1" className="mb-4">
                  <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
                  <path d="M12 7v5l3 3" />
                </svg>
                <h3 className="font-semibold text-white mb-2">Web Security</h3>
                <p className="text-sm text-white/50">XSS, SQLi, CSRF, IDOR</p>
              </div>
              {/* Card 2 */}
              <div className="p-6 border border-white/10 rounded-lg hover:border-[#4ECDC4]/50 transition-colors">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4ECDC4" strokeWidth="1" className="mb-4">
                  <circle cx="11" cy="11" r="6" />
                  <path d="M16 16l4 4" />
                </svg>
                <h3 className="font-semibold text-white mb-2">Reconnaissance</h3>
                <p className="text-sm text-white/50">Subdomain enum, OSINT</p>
              </div>
              {/* Card 3 */}
              <div className="p-6 border border-white/10 rounded-lg hover:border-[#FFE66D]/50 transition-colors">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFE66D" strokeWidth="1" className="mb-4">
                  <circle cx="12" cy="12" r="8" />
                  <circle cx="12" cy="12" r="4" />
                  <ellipse cx="12" cy="12" rx="2" ry="3" />
                </svg>
                <h3 className="font-semibold text-white mb-2">Bug Bounty</h3>
                <p className="text-sm text-white/50">HackerOne, Bugcrowd</p>
              </div>
              {/* Card 4 */}
              <div className="p-6 border border-white/10 rounded-lg hover:border-[#A78BFA]/50 transition-colors">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1" className="mb-4">
                  <path d="M4 8h10M4 12h14M4 16h8" />
                  <circle cx="17" cy="10" r="3" />
                </svg>
                <h3 className="font-semibold text-white mb-2">Code Review</h3>
                <p className="text-sm text-white/50">Reading code to find bugs</p>
              </div>
            </div>
          </section>

          {/* OPÇÃO D: Cards sem Glassmorphism */}
          <section>
            <h2 className="text-[#0066ff] text-sm tracking-widest uppercase mb-8 block">
              Opção D: Cards Sólidos (Sem Glass/Blur)
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="bg-[#1a1a2e] p-6 rounded-lg border-l-4 border-[#FF6B6B]">
                <span className="text-[#FF6B6B] text-xs font-mono mb-2 block">// 01</span>
                <h3 className="font-semibold text-white mb-2">Web Security</h3>
                <p className="text-sm text-white/50">XSS, SQLi, CSRF, IDOR</p>
              </div>
              {/* Card 2 */}
              <div className="bg-[#1a1a2e] p-6 rounded-lg border-l-4 border-[#4ECDC4]">
                <span className="text-[#4ECDC4] text-xs font-mono mb-2 block">// 02</span>
                <h3 className="font-semibold text-white mb-2">Reconnaissance</h3>
                <p className="text-sm text-white/50">Subdomain enum, OSINT</p>
              </div>
              {/* Card 3 */}
              <div className="bg-[#1a1a2e] p-6 rounded-lg border-l-4 border-[#FFE66D]">
                <span className="text-[#FFE66D] text-xs font-mono mb-2 block">// 03</span>
                <h3 className="font-semibold text-white mb-2">Bug Bounty</h3>
                <p className="text-sm text-white/50">HackerOne, Bugcrowd</p>
              </div>
              {/* Card 4 */}
              <div className="bg-[#1a1a2e] p-6 rounded-lg border-l-4 border-[#A78BFA]">
                <span className="text-[#A78BFA] text-xs font-mono mb-2 block">// 04</span>
                <h3 className="font-semibold text-white mb-2">Code Review</h3>
                <p className="text-sm text-white/50">Reading code to find bugs</p>
              </div>
            </div>
          </section>

          {/* OPÇÃO E: Lista Estilo Terminal */}
          <section>
            <h2 className="text-[#0066ff] text-sm tracking-widest uppercase mb-8 block">
              Opção E: Lista Estilo Terminal
            </h2>
            <div className="font-mono text-sm">
              <div className="space-y-4">
                <div className="flex items-start gap-4 group cursor-pointer">
                  <span className="text-[#FF6B6B] select-none">$</span>
                  <div>
                    <span className="text-white group-hover:text-[#FF6B6B] transition-colors">web-security</span>
                    <span className="text-white/40 ml-4">--tools=xss,sqli,csrf</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 group cursor-pointer">
                  <span className="text-[#4ECDC4] select-none">$</span>
                  <div>
                    <span className="text-white group-hover:text-[#4ECDC4] transition-colors">reconnaissance</span>
                    <span className="text-white/40 ml-4">--methods=osint,enum</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 group cursor-pointer">
                  <span className="text-[#FFE66D] select-none">$</span>
                  <div>
                    <span className="text-white group-hover:text-[#FFE66D] transition-colors">bug-bounty</span>
                    <span className="text-white/40 ml-4">--platforms=h1,bugcrowd</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 group cursor-pointer">
                  <span className="text-[#A78BFA] select-none">$</span>
                  <div>
                    <span className="text-white group-hover:text-[#A78BFA] transition-colors">code-review</span>
                    <span className="text-white/40 ml-4">--focus=vulnerabilities</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* OPÇÃO F: Grid Técnico/Minimalista */}
          <section>
            <h2 className="text-[#0066ff] text-sm tracking-widest uppercase mb-8 block">
              Opção F: Grid Técnico/Minimalista
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
              <div className="bg-black p-6 hover:bg-white/5 transition-colors group">
                <div className="text-[#FF6B6B] text-xs mb-2">[01]</div>
                <h3 className="font-semibold text-white mb-1">Web Security</h3>
                <p className="text-xs text-white/40">XSS, SQLi, CSRF</p>
              </div>
              <div className="bg-black p-6 hover:bg-white/5 transition-colors group">
                <div className="text-[#4ECDC4] text-xs mb-2">[02]</div>
                <h3 className="font-semibold text-white mb-1">Recon</h3>
                <p className="text-xs text-white/40">OSINT, Enum</p>
              </div>
              <div className="bg-black p-6 hover:bg-white/5 transition-colors group">
                <div className="text-[#FFE66D] text-xs mb-2">[03]</div>
                <h3 className="font-semibold text-white mb-1">Bug Bounty</h3>
                <p className="text-xs text-white/40">H1, Bugcrowd</p>
              </div>
              <div className="bg-black p-6 hover:bg-white/5 transition-colors group">
                <div className="text-[#A78BFA] text-xs mb-2">[04]</div>
                <h3 className="font-semibold text-white mb-1">Code Review</h3>
                <p className="text-xs text-white/40">Vuln Hunting</p>
              </div>
            </div>
          </section>

          {/* OPÇÃO G: Acordeão/Expansível */}
          <section>
            <h2 className="text-[#0066ff] text-sm tracking-widest uppercase mb-8 block">
              Opção G: Estilo Acordeão
            </h2>
            <div className="space-y-2">
              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-[#FF6B6B] font-mono">01</span>
                    <h3 className="font-semibold text-white">Web Security</h3>
                  </div>
                  <span className="text-white/30">+</span>
                </div>
                <p className="text-sm text-white/50 mt-2 ml-10">XSS, SQLi, CSRF, IDOR, SSRF</p>
              </div>
              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-[#4ECDC4] font-mono">02</span>
                    <h3 className="font-semibold text-white">Reconnaissance</h3>
                  </div>
                  <span className="text-white/30">+</span>
                </div>
                <p className="text-sm text-white/50 mt-2 ml-10">Subdomain enum, port scanning, OSINT</p>
              </div>
              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-[#FFE66D] font-mono">03</span>
                    <h3 className="font-semibold text-white">Bug Bounty</h3>
                  </div>
                  <span className="text-white/30">+</span>
                </div>
                <p className="text-sm text-white/50 mt-2 ml-10">HackerOne, Bugcrowd, Intigriti</p>
              </div>
              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-[#A78BFA] font-mono">04</span>
                    <h3 className="font-semibold text-white">Code Review</h3>
                  </div>
                  <span className="text-white/30">+</span>
                </div>
                <p className="text-sm text-white/50 mt-2 ml-10">Reading code to find vulnerabilities</p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
