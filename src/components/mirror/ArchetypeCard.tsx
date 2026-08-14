import { useState } from "react";
import type { Archetype } from "@/lib/archetypes";
import { Orb } from "./Orb";

export function ArchetypeCard({ a }: { a: Archetype }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="group relative overflow-hidden rounded-sm border border-border bg-card/40 p-7 backdrop-blur-sm transition-colors hover:border-gold/40">
      <div className="flex items-start gap-5">
        <Orb archetype={a} size={92} />
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider-xs text-gold">
            {a.n} · {a.sanskrit} · {a.planet}
          </p>
          <h3 className="mt-2 text-3xl text-foreground">{a.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{a.essence}</p>
        </div>
      </div>
      <p className="mt-6 text-[15px] leading-relaxed text-foreground/85">{a.core}</p>
      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-6 text-xs uppercase tracking-wider-xs text-gold/80 transition-colors hover:text-gold"
      >
        {open ? "Свернуть" : `История ${a.sanskrit}`}
      </button>
      {open && (
        <div className="animate-rise mt-5 space-y-4 border-t border-border pt-5">
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