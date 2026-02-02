"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function GeometricPatterns() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const circuitRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax for grid layer (0.2x scroll speed)
      gsap.to(gridRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Parallax for circuit layer (0.15x scroll speed - slower)
      gsap.to(circuitRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Parallax for nodes layer (0.25x scroll speed - slightly faster)
      gsap.to(nodesRef.current, {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Grid Layer - 0.2x scroll speed */}
      <div
        ref={gridRef}
        className="absolute inset-0 -top-[20%] -bottom-[20%]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: "translateZ(0)",
        }}
      />

      {/* Circuit Traces Layer - 0.15x scroll speed */}
      <div
        ref={circuitRef}
        className="absolute inset-0 -top-[15%] -bottom-[15%]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20h60v60h-60zM120 20h60v60h-60zM20 120h60v60h-60zM120 120h60v60h-60z' fill='none' stroke='rgba(255,255,255,0.025)' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='50' r='3' fill='rgba(255,255,255,0.04)'/%3E%3Ccircle cx='150' cy='50' r='3' fill='rgba(255,255,255,0.04)'/%3E%3Ccircle cx='50' cy='150' r='3' fill='rgba(255,255,255,0.04)'/%3E%3Ccircle cx='150' cy='150' r='3' fill='rgba(255,255,255,0.04)'/%3E%3Cpath d='M50 53v67M53 50h67M150 53v67M147 50h-67M50 147v-67M53 150h67M150 147v-67M147 150h-67' stroke='rgba(255,255,255,0.02)' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          transform: "translateZ(0)",
        }}
      />

      {/* Abstract Node Connections - 0.25x scroll speed */}
      <div
        ref={nodesRef}
        className="absolute inset-0 -top-[25%] -bottom-[25%]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 25%, rgba(255, 255, 255, 0.02) 0%, transparent 6%),
            radial-gradient(circle at 85% 35%, rgba(255, 255, 255, 0.02) 0%, transparent 8%),
            radial-gradient(circle at 45% 65%, rgba(255, 255, 255, 0.015) 0%, transparent 10%),
            radial-gradient(circle at 75% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 7%),
            radial-gradient(circle at 25% 85%, rgba(255, 255, 255, 0.015) 0%, transparent 9%),
            radial-gradient(circle at 60% 15%, rgba(255, 255, 255, 0.01) 0%, transparent 12%)
          `,
          transform: "translateZ(0)",
        }}
      />

      {/* Subtle gradient overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(0, 102, 255, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(255, 255, 255, 0.01) 0%, transparent 40%)
          `,
        }}
      />
    </div>
  );
}
