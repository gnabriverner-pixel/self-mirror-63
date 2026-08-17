import type { Archetype } from "@/lib/archetypes";
import { Sigil } from "./Sigil";

const ok = (s: string) => {
  const [l, c, h] = s.split(" ");
  return `oklch(${l}% ${c} ${h})`;
};
const oka = (s: string, a: number) => {
  const [l, c, h] = s.split(" ");
  return `oklch(${l}% ${c} ${h} / ${a}%)`;
};
/** округление до 2 знаков — стабильные координаты между сервером и клиентом */
const px = (v: number) => Math.round((100 + v) * 100) / 100;

export function Orb({
  archetype,
  size = 260,
  showNumber = true,
}: {
  archetype: Archetype;
  size?: number;
  showNumber?: boolean;
}) {
  const detailed = size >= 140;
  return (
    <div
      className="orb group/orb relative shrink-0"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* туманность-аура */}
      <div
        className="animate-veil absolute -inset-[18%] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${oka(archetype.hue, 70)}, ${oka(archetype.hue2, 30)} 45%, transparent 72%)`,
        }}
      />
      <div
        className="animate-drift absolute -inset-[10%] rounded-full opacity-60 blur-2xl mix-blend-screen"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${oka(archetype.hue2, 45)}, transparent 42%, ${oka(archetype.hue, 35)}, transparent 78%)`,
        }}
      />

      {/* внешняя яна-геометрия */}
      <svg
        viewBox="0 0 200 200"
        className="animate-spin-slow absolute inset-0"
        style={{ color: "var(--gold-soft)" }}
      >
        <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 5" />
        <rect x="34" y="34" width="132" height="132" fill="none" stroke="currentColor" strokeWidth="0.3" transform="rotate(45 100 100)" />
        <rect x="34" y="34" width="132" height="132" fill="none" stroke="currentColor" strokeWidth="0.3" />
        {detailed &&
          Array.from({ length: 36 }).map((_, i) => {
            const a = (i * Math.PI) / 18;
            return (
              <line
                key={i}
                x1={px(Math.cos(a) * (88))}
                y1={px(Math.sin(a) * (88))}
                x2={px(Math.cos(a) * ((i % 3 ? 91 : 94)))}
                y2={px(Math.sin(a) * ((i % 3 ? 91 : 94)))}
                stroke="currentColor"
                strokeWidth="0.4"
              />
            );
          })}
      </svg>

      {/* контр-вращение: орбита кометы */}
      <svg viewBox="0 0 200 200" className="animate-spin-rev absolute inset-0">
        <circle
          cx="100"
          cy="100"
          r="86"
          fill="none"
          stroke={oka(archetype.hue, 55)}
          strokeWidth="0.6"
          strokeDasharray="1 22"
        />
        <circle cx="100" cy="14" r={size > 120 ? 2.4 : 1.6} fill={ok(archetype.hue)} />
        <circle cx="100" cy="14" r={size > 120 ? 6 : 4} fill={oka(archetype.hue, 22)} />
      </svg>

      {/* тело сферы */}
      <div
        className="animate-breathe absolute inset-[14%] overflow-hidden rounded-full"
        style={{
          background: `radial-gradient(circle at 34% 28%, ${ok(archetype.hue)}, ${ok(archetype.hue2)} 55%, oklch(0.14 0.03 264) 100%)`,
          boxShadow: "var(--shadow-halo), inset 0 0 60px -10px oklch(0 0 0 / 70%)",
        }}
      >
        {/* внутренняя дымка, медленно плывущая */}
        <div
          className="animate-nebula absolute -inset-1/2 opacity-70 mix-blend-screen blur-xl"
          style={{
            background: `radial-gradient(closest-side, ${oka(archetype.hue2, 70)}, transparent 70%), radial-gradient(closest-side at 70% 40%, ${oka(archetype.hue, 55)}, transparent 65%)`,
          }}
        />
        {/* световая развёртка */}
        <div className="animate-sweep absolute inset-0" />
        {/* терминатор: тень планеты */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 78% 82%, oklch(0 0 0 / 65%), transparent 62%)",
          }}
        />
      </div>

      {/* сигил архетипа */}
      <Sigil
        n={archetype.n}
        className="animate-sigil absolute inset-[9%] text-gold/70 transition-opacity duration-700 group-hover/orb:text-gold"
      />

      {showNumber && (
        <div
          className="animate-glowtext absolute inset-0 grid place-items-center font-[var(--font-display)] text-foreground/90"
          style={{ fontSize: size * 0.28, lineHeight: 1 }}
        >
          {archetype.n}
        </div>
      )}

      {/* искры на орбите */}
      {detailed &&
        [0, 1, 2].map((i) => (
          <span
            key={i}
            className="animate-orbit absolute left-1/2 top-1/2 block"
            style={{ animationDelay: `${i * -7}s`, animationDuration: `${22 + i * 9}s` }}
          >
            <span
              className="animate-twinkle block rounded-full"
              style={{
                width: 3,
                height: 3,
                transform: `translateY(-${size * (0.34 + i * 0.05)}px)`,
                background: ok(archetype.hue),
                boxShadow: `0 0 10px 2px ${oka(archetype.hue, 55)}`,
              }}
            />
          </span>
        ))}
    </div>
  );
}