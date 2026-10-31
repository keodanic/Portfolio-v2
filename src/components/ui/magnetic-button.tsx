"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  // "electric" kept as an alias of "default" for existing call sites.
  variant?: "default" | "outline" | "ghost" | "electric";
  size?: "sm" | "md" | "lg";
}

const variants = {
  default: "bg-zinc-100 text-zinc-950 border-transparent hover:bg-white",
  electric: "bg-zinc-100 text-zinc-950 border-transparent hover:bg-white",
  outline: "bg-transparent text-zinc-300 border-zinc-800 hover:border-zinc-600 hover:text-zinc-100",
  ghost: "bg-transparent text-zinc-400 border-transparent hover:bg-zinc-900 hover:text-zinc-100",
};

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-10 px-5 text-sm",
};

export function MagneticButton({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}: MagneticButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 cursor-pointer rounded-md border",
        "font-medium tracking-tight",
        "transition-[background-color,border-color,color,transform] duration-150 ease-out",
        "active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507]",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
