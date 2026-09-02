import { useState } from "react";
import type { Archetype } from "@/lib/archetypes";
import { ArchetypeEmblem, isArchetypeNumber } from "@/donor/archetype-art";

/**
 * Один объект коллекции: сначала образ, потом очень короткий человеческий слой,
 * и только по раскрытию — ресурс, напряжение, вопрос и справка о традиции.
 */
export function ArchetypeCard({ a, index = 0 }: { a: Archetype; index?: number }) {
  const [open, setOpen] = useState(false);
  if (!isArchetypeNumber(a.n)) return null;

  return (
    <article
      className="animate-card-in grid gap-8 border-t border-border/70 py-12 sm:grid-cols-[auto_1fr] sm:gap-10"
      style={{ animationDelay: `${Math.min(index, 8) * 90}ms` }}
    >
      <div className="flex justify-start">
        <ArchetypeEmblem number={a.n} variant={index % 2 === 0 ? "alabaster" : "obsidian"} size="md" />
      </div>

      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider-xs text-gold/80">
          {a.n} · {a.sanskrit} · {a.planet}
        </p>
        <h3 className="mt-3 text-4xl leading-none text-foreground">{a.title}</h3>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-foreground/85">{a.core}</p>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-6 min-h-11 text-xs uppercase tracking-wider-xs text-gold/80 transition-colors hover:text-gold"
        >
          {open ? "Свернуть" : "Ближе"}
        </button>

        {open && (
          <div className="animate-rise mt-6 max-w-xl space-y-6 border-l border-border pl-6">
            <Row label="Что этой силе важно" text={`Ей нужно ${a.demand}.`} />
            <Row label="Где ресурс" text={`${cap(a.gift)}. ${a.action}`} />
            <Row label="Где напряжение" text={cap(a.cost) + "."} />
            <Row
              label="Вопрос для узнавания"
              text={`Где на этой неделе вы узнаёте в себе требование ${a.demand} — и что происходит, когда выполнить его не получается?`}
            />
            <Row label="Традиция" text={a.myth} muted />
          </div>
        )}
      </div>
    </article>
  );
}

function Row({ label, text, muted = false }: { label: string; text: string; muted?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider-xs text-muted-foreground">{label}</p>
      <p
        className={`mt-2 text-[15px] leading-relaxed ${muted ? "italic text-foreground/65" : "text-foreground/85"}`}
      >
        {text}
      </p>
    </div>
  );
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
