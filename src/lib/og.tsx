import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function renderOg(title: string, subtitle: string) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#090a0f", color: "#eceef5", padding: "64px 72px" }}>
        <div style={{ display: "flex", fontSize: 26, color: "#ccff00", fontFamily: "monospace" }}>SYS.ONLINE // TERESINA-BR // 100% REMOTE</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 72, lineHeight: 1.05, letterSpacing: "-0.03em", maxWidth: 1000 }}>{title}</div>
          <div style={{ fontSize: 28, color: "#9aa2b6", maxWidth: 1000 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, fontFamily: "monospace", color: "#10b981" }}>Victor Daniel · victordaniel.dev</div>
      </div>
    ),
    ogSize,
  );
}
