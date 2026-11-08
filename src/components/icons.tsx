type P = { className?: string };
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ArrowRight = ({ className }: P) => (
  <svg {...base} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowUpRight = ({ className }: P) => (
  <svg {...base} className={className}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const Mail = ({ className }: P) => (
  <svg {...base} className={className}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 7 8.5 6 8.5-6" /></svg>
);
export const Chat = ({ className }: P) => (
  <svg {...base} className={className}><path d="M4 20l1.4-4.2A8 8 0 1 1 8.2 18.6L4 20Z" /><path d="M9 9.5c.4 2.2 2.3 4.1 4.5 4.5l1.3-1.3-1.9-1-.9.6c-.8-.4-1.5-1.1-1.9-1.9l.6-.9-1-1.9L9 9.5Z" /></svg>
);
export const Linkedin = ({ className }: P) => (
  <svg {...base} className={className}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10.5V16M8 7.8v.1M12 16v-3.2a2.3 2.3 0 0 1 4.6 0V16M12 10.5V16" /></svg>
);
export const Branch = ({ className }: P) => (
  <svg {...base} className={className}><circle cx="6" cy="5.5" r="2" /><circle cx="6" cy="18.5" r="2" /><circle cx="18" cy="8.5" r="2" /><path d="M6 7.5v9M18 10.5c0 4-5 3.5-10.5 6.5" /></svg>
);
export const Download = ({ className }: P) => (
  <svg {...base} className={className}><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></svg>
);
export const Close = ({ className }: P) => (
  <svg {...base} className={className}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Copy = ({ className }: P) => (
  <svg {...base} className={className}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>
);
export const Check = ({ className }: P) => (
  <svg {...base} className={className}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);
export const Lock = ({ className }: P) => (
  <svg {...base} className={className}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
);
export const Globe = ({ className }: P) => (
  <svg {...base} className={className}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z" /></svg>
);
export const Shield = ({ className }: P) => (
  <svg {...base} className={className}><path d="M12 3 5 6v5.5c0 4.3 2.8 8 7 9.5 4.2-1.5 7-5.2 7-9.5V6l-7-3Z" /><path d="m9 12 2.2 2.2L15.5 10" /></svg>
);
