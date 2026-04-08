"use client";

import React from "react";

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

// Ícone de Web Security - Estilo shield com circuito
export function WebSecurityIcon({ className = "", size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield base */}
      <path
        d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Circuito interno */}
      <path
        d="M12 7v5l3 3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="7" r="1" fill={color} />
      <circle cx="15" cy="15" r="1" fill={color} />
      {/* Linhas de circuito */}
      <path
        d="M8 10h2M9 10v3"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Ícone de Terminal/Pentest - Estilo hacker/terminal
export function TerminalIcon({ className = "", size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Terminal box */}
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Prompt */}
      <path
        d="M6 9l3 3-3 3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cursor/underscore */}
      <path
        d="M11 12h7M11 15h4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Detalhe de glitch */}
      <path
        d="M17 8h2"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

// Ícone de Target/Recon - Estilo alvo/radar
export function TargetIcon({ className = "", size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Círculos concêntricos */}
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <circle
        cx="12"
        cy="12"
        r="5"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="12" cy="12" r="1.5" fill={color} />
      {/* Crosshair */}
      <path
        d="M12 2v3M12 19v3M2 12h3M19 12h3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Ping/sinal */}
      <path
        d="M20 4l-2 2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

// Ícone de Trophy/CTF - Estilo troféu hacker
export function TrophyIcon({ className = "", size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Corpo do troféu */}
      <path
        d="M7 4v5c0 2.5 2 4.5 4.5 4.5h1c2.5 0 4.5-2 4.5-4.5V4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Alças */}
      <path
        d="M7 6H5v3c0 1.5 1 2.5 2.5 2.5h0.5M17 6h2v3c0 1.5-1 2.5-2.5 2.5h-0.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Base */}
      <path
        d="M9 20h6M12 13.5V20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 20l-1 3h10l-1-3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Detalhe de bandeira */}
      <path
        d="M12 2v2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Ícone de Status Completed - Check customizado
export function CompletedIcon({ className = "", size = 24, color = "#10B981" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none" />
      <path
        d="M8 12l2.5 2.5L16 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Brilho */}
      <path
        d="M12 3v2M12 19v2M3 12h2M19 12h2"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

// Ícone de Status In Progress - Relógio/loading artesanal
export function InProgressIcon({ className = "", size = 24, color = "#F59E0B" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Ponteiros de relógio */}
      <path
        d="M12 7v5l3 2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Marcadores de tempo */}
      <path
        d="M12 4v1M12 19v1M4 12h1M19 12h1"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

// Ícone de Status Planned - Círculo vazio com estilo
export function PlannedIcon({ className = "", size = 24, color = "#9CA3AF" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Pontos de planejamento */}
      <circle cx="12" cy="5" r="1" fill={color} opacity="0.5" />
      <circle cx="12" cy="19" r="1" fill={color} opacity="0.5" />
      <circle cx="5" cy="12" r="1" fill={color} opacity="0.5" />
      <circle cx="19" cy="12" r="1" fill={color} opacity="0.5" />
    </svg>
  );
}

// Ícone de Certificação/Award - Medalha customizada
export function CertificationIcon({ className = "", size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Topo da medalha */}
      <path
        d="M7 4v6c0 1.5 1 2.5 2.5 2.5h5C16 12.5 17 11.5 17 10V4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Fitas */}
      <path
        d="M8 4l-2 3 2 3M16 4l2 3-2 3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Círculo da medalha */}
      <circle cx="12" cy="15" r="4" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Estrela/escudo interno */}
      <path
        d="M12 13l1 2 2 0-1.5 1 .5 2-1.5-1-1.5 1 .5-2L10 15l2 0z"
        fill={color}
        opacity="0.8"
      />
    </svg>
  );
}

// Ícone de Bug Bounty/Target - Alvo com bug
export function BugBountyIcon({ className = "", size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Alvo */}
      <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Bug/inseto estilizado */}
      <ellipse cx="12" cy="12" rx="2" ry="3" fill={color} opacity="0.8" />
      {/* Antenas do bug */}
      <path
        d="M10 9c-1-1-2-1-2-1M14 9c1-1 2-1 2-1"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Pernas */}
      <path
        d="M10 12H8M14 12h2M10 13.5H8.5M14 13.5h1.5"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

// Ícone de Reconnaissance - Lupa/binóculos estilizado
export function ReconIcon({ className = "", size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Lupa */}
      <circle cx="11" cy="11" r="6" stroke={color} strokeWidth="1.5" fill="none" />
      <path
        d="M16 16l4 4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Detalhes de busca */}
      <path
        d="M8 11h6M11 8v6"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Sinais de radar */}
      <path
        d="M2 11h2M20 11h2M11 2v2M11 20v2"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.2"
      />
    </svg>
  );
}

// Ícone de Code Review - Código com olho/lupa
export function CodeReviewIcon({ className = "", size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Linhas de código */}
      <path
        d="M4 8h10M4 12h14M4 16h8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Olho/lupa */}
      <circle cx="17" cy="10" r="3" stroke={color} strokeWidth="1.5" fill="none" />
      <path
        d="M17 9v2M16 10h2"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Destaque */}
      <path
        d="M14 8c0-2 1.5-3 3-3s3 1 3 3"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
