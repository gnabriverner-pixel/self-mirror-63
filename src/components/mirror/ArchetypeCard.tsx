import { useState } from "react";
import type { Archetype } from "@/lib/archetypes";
import { Orb } from "./Orb";

const ok = (s: string, alpha: number) => {
  const [l, c, h] = s.split(" ");
  return `oklch(${l}% ${c} ${h} / ${alpha}%)`;
};

export function ArchetypeCard({ a, index = 0 }: { a: Archetype; index?: number }) {
  const [open, setOpen] = useState(false);
  return (
    <article
      className="animate-card-in group relative overflow-hidden rounded-sm border border-border bg-card/40 p-7 backdrop-blur-sm transition-all duration-700 hover:border-gold/40 hover:shadow-[var(--shadow-lift)]"
      style={{ animationDelay: `${Math.min(index, 8) * 90}ms` }}
    >
      {/* цветовая аура архетипа, проявляется при наведении */}
      <div
        className="pointer-events-none absolute -left-24 -top-28 h-64 w-64 rounded-full opacity-25 blur-3xl transition-all duration-1000 group-hover:opacity-60 group-hover:blur-2xl"
        style={{ background: `radial-gradient(circle, ${ok(a.hue, 70)}, transparent 70%)` }}
      />
      {/* тонкая световая линия сверху */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-40 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${ok(a.hue, 80)}, transparent)` }}
      />
      <div className="relative flex items-start gap-5">
        <Orb archetype={a} size={104} />
        <div className="min-w-0 pt-1">
          <p className="text-xs uppercase tracking-wider-xs text-gold">
            {a.n} · {a.sanskrit} · {a.planet}
          </p>
          <h3 className="mt-2 text-3xl text-foreground transition-colors duration-500 group-hover:text-gold/90">
            {a.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{a.essence}</p>
        </div>
      </div>
      <p className="relative mt-6 text-[15px] leading-relaxed text-foreground/85">{a.core}</p>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative mt-6 text-xs uppercase tracking-wider-xs text-gold/80 transition-colors hover:text-gold"
      >
        {open ? "Свернуть" : `История ${a.sanskrit}`}
      </button>
      {open && (
        <div className="animate-rise relative mt-5 space-y-4 border-t border-border pt-5">
          <p className="text-[15px] italic leading-relaxed text-foreground/75">{a.myth}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wider-xs text-muted-foreground">Свет</p>
              <p className="mt-2 text-sm text-foreground/85">{a.light.join(" · ")}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider-xs text-muted-foreground">Тень</p>
              <p className="mt-2 text-sm text-foreground/85">{a.shadow.join(" · ")}</p>
            </div>
          </div>
          <p className="text-sm text-foreground/70">{a.action}</p>
        </div>
      )}
    </article>
  );
}