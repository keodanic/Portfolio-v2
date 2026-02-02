"use client";

import { cn } from "@/lib/utils";
import { useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  magneticStrength?: number;
  variant?: "default" | "outline" | "ghost" | "electric";
  size?: "sm" | "md" | "lg";
}

export function MagneticButton({
  children,
  className,
  magneticStrength = 0.3,
  variant = "default",
  size = "md",
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPosition({
      x: distanceX * magneticStrength,
      y: distanceY * magneticStrength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    default: [
      "bg-white text-black",
      "hover:bg-[#0066ff] hover:text-white",
      "border border-transparent",
    ],
    outline: [
      "bg-transparent text-white",
      "border border-white/20",
      "hover:border-[#0066ff] hover:text-[#0066ff]",
    ],
    ghost: [
      "bg-transparent text-white",
      "border border-transparent",
      "hover:bg-white/5 hover:text-white",
    ],
    electric: [
      "bg-[#0066ff] text-white",
      "border border-[#0066ff]",
      "hover:bg-[#0052cc] hover:border-[#0052cc]",
      "shadow-[0_0_20px_rgba(0,102,255,0.3)]",
    ],
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative inline-flex items-center justify-center",
        "font-medium tracking-tight",
        "rounded-full",
        "transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      {...props}
    >
      <span
        className="relative z-10 flex items-center gap-2 transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: `translate(${position.x * 0.2}px, ${position.y * 0.2}px)`,
        }}
      >
        {children}
      </span>
    </button>
  );
}
