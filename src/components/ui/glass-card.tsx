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
          // Base glass styles
          "relative overflow-hidden rounded-xl",
          "backdrop-blur-[20px] saturate-[180%]",
          "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          
          // Variant styles
          variant === "default" && [
            "bg-white/[0.03]",
            "border border-white/[0.08]",
            "before:absolute before:inset-0 before:rounded-xl before:p-[1px]",
            "before:bg-gradient-to-br before:from-white/[0.15] before:via-white/[0.05] before:to-transparent",
            "before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
            "before:[mask-composite:exclude]",
            "before:pointer-events-none",
          ],
          variant === "highlight" && [
            "bg-white/[0.05]",
            "border border-white/[0.12]",
            "before:absolute before:inset-0 before:rounded-xl before:p-[1px]",
            "before:bg-gradient-to-br before:from-white/[0.2] before:via-white/[0.08] before:to-transparent",
            "before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
            "before:[mask-composite:exclude]",
            "before:pointer-events-none",
          ],
          variant === "subtle" && [
            "bg-white/[0.02]",
            "border border-white/[0.05]",
          ],
          
          // Hover effect
          hover && "hover:border-white/[0.15] hover:bg-white/[0.04]",
          
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
