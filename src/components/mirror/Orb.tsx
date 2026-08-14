import type { Archetype } from "@/lib/archetypes";

const ok = (s: string) => {
  const [l, c, h] = s.split(" ");
  return `oklch(${l}% ${c} ${h})`;
};

export function Orb({
  archetype,
  size = 260,
  showNumber = true,
}: {
  archetype: Archetype;
  size?: number;
  showNumber?: boolean;
}) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 rounded-full blur-2xl animate-veil"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${ok(archetype.hue)}, transparent 70%)`,
        }}
      />
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 animate-spin-slow"
        style={{ color: "var(--gold-soft)" }}
      >
        <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 5" />
        <rect x="34" y="34" width="132" height="132" fill="none" stroke="currentColor" strokeWidth="0.3" transform="rotate(45 100 100)" />
        <rect x="34" y="34" width="132" height="132" fill="none" stroke="currentColor" strokeWidth="0.3" />
      </svg>
      <div
        className="absolute inset-[14%] rounded-full animate-breathe"
        style={{
          background: `radial-gradient(circle at 34% 28%, ${ok(archetype.hue)}, ${ok(archetype.hue2)} 55%, oklch(0.14 0.03 264) 100%)`,
          boxShadow: "var(--shadow-halo), inset 0 0 60px -10px oklch(0 0 0 / 70%)",
        }}
      />
      {showNumber && (
        <div
          className="absolute inset-0 grid place-items-center font-[var(--font-display)] text-foreground/90"
          style={{ fontSize: size * 0.3, lineHeight: 1 }}
        >
          {archetype.n}
        </div>
      )}
    </div>
  );
}