import Link from "next/link";
import "./globals.css";

// Requests that never match a locale land here, outside [locale]/layout, so this page brings its own <html>.
export default function GlobalNotFound() {
  return (
    <html lang="pt-BR">
      <body style={{ background: "#07090b", color: "#dce5ea", fontFamily: "ui-sans-serif, system-ui, sans-serif", padding: "6rem 1.5rem" }}>
        <p style={{ color: "#10b981", fontFamily: "ui-monospace, monospace" }}>404</p>
        <h1 style={{ fontSize: "2rem", marginTop: "0.5rem" }}>Página não encontrada · Page not found</h1>
        <p style={{ marginTop: "1.5rem", display: "flex", gap: "1.5rem" }}>
          <Link href="/pt" style={{ color: "#10b981" }}>Início</Link>
          <Link href="/en" style={{ color: "#10b981" }}>Home</Link>
        </p>
      </body>
    </html>
  );
}
