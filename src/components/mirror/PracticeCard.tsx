import { useState } from "react";
import type { Archetype } from "@/lib/archetypes";
import { practiceFor } from "@/lib/practice";

export function PracticeCard({ a }: { a: Archetype }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"observation" | "action">("observation");
  const p = practiceFor(a);

  return (
    <div className="mt-8 rounded-sm border border-border bg-card/40 backdrop-blur-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-xs uppercase tracking-wider-xs text-gold/80">Практика дня</span>
        <span className="text-gold/70">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="animate-rise border-t border-border px-5 pb-6 pt-5">
          <div className="flex flex-wrap gap-2">
            {([
              ["observation", "👁 Наблюдение"],
              ["action", "⚡ Действие"],
            ] as const).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`rounded-sm border px-4 py-2 text-xs uppercase tracking-wider-xs transition-colors ${
                  tab === id
                    ? "border-gold/60 bg-gold/15 text-gold"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="mt-5 text-[15px] leading-relaxed text-foreground/85">{p[tab]}</p>
        </div>
      )}
    </div>
  );
}
