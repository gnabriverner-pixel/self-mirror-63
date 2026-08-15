export function Ring({ size = 200, label }: { size?: number; label?: string }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} aria-hidden="true">
      <div
        className="animate-veil absolute inset-0 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.86 0.05 250 / 60%), transparent 68%)",
        }}
      />
      <svg viewBox="0 0 200 200" className="animate-spin-slow absolute inset-0" style={{ color: "var(--gold-soft)" }}>
        <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="74" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 7" />
        <circle cx="100" cy="100" r="56" fill="none" stroke="currentColor" strokeWidth="0.3" />
      </svg>
      <div
        className="animate-breathe absolute inset-[18%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 38% 30%, oklch(0.95 0.02 250 / 55%), oklch(0.62 0.05 258 / 30%) 55%, transparent 75%)",
          boxShadow: "0 0 70px -18px oklch(0.9 0.03 250 / 55%)",
        }}
      />
      {label && (
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-[var(--font-display)] text-xl text-foreground/85">{label}</span>
        </div>
      )}
    </div>
  );
}
