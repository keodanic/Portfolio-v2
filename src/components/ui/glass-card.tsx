"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlight" | "subtle";
  hover?: boolean;
  tilt?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", hover = true, tilt = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Linear / Vercel / Raycast dark surface aesthetic
          "relative overflow-hidden rounded-2xl",
          "transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",

          variant === "default" && [
            "bg-zinc-950/90",
            "border border-zinc-800/80",
          ],
          variant === "highlight" && [
            "bg-zinc-900/70",
            "border border-zinc-700/80",
          ],
          variant === "subtle" && [
            "bg-zinc-950/60",
            "border border-zinc-800/60",
          ],

          hover && "hover:border-zinc-700 hover:bg-zinc-900/80",

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
