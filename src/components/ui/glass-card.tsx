"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlight" | "subtle";
  hover?: boolean;
}

// Dry, architectural surface: flat fill, 1px hairline, precise corners.
const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-lg border transition-colors duration-200",
          variant === "default" && "bg-[#09090b] border-zinc-800/80",
          variant === "highlight" && "bg-zinc-900/60 border-zinc-700/80",
          variant === "subtle" && "bg-transparent border-zinc-800/60",
          hover && "hover:border-zinc-700",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
