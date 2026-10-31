// Deep black canvas with a near-invisible architectural grid.
export function GeometricPatterns() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none bg-[#050507]"
      style={{ zIndex: 0 }}
    >
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, #000 0%, #000 60%, transparent 100%)",
        }}
      />
    </div>
  );
}
