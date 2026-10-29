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
  magneticStrength = 0.2,
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
      "hover:bg-zinc-200",
      "border border-transparent",
    ],
    outline: [
      "bg-zinc-950/80 text-zinc-200",
      "border border-zinc-800/80",
      "hover:border-zinc-600 hover:bg-zinc-900 hover:text-white",
    ],
    ghost: [
      "bg-transparent text-zinc-300",
      "border border-transparent",
      "hover:bg-zinc-900 hover:text-white",
    ],
    electric: [
      "bg-[#0066ff] text-white",
      "border border-[#0066ff]",
      "hover:bg-[#0052cc] hover:border-[#0052cc]",
    ],
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative inline-flex items-center justify-center cursor-pointer",
        "font-medium tracking-tight",
        "rounded-full",
        "transition-[transform,background-color,border-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: position.x || position.y ? `translate(${position.x}px, ${position.y}px)` : undefined,
      }}
      {...props}
    >
      <span
        className="relative z-10 flex items-center gap-2 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{
          transform: position.x || position.y ? `translate(${position.x * 0.15}px, ${position.y * 0.15}px)` : undefined,
        }}
      >
        {children}
      </span>
    </button>
  );
}
