import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { DEMO_COMPOSITIONS, SymbolicPortrait } from "@/donor/symbolic-portrait/SymbolicPortrait";
import type { MotionMode } from "@/donor/archetype-art";

export const Route = createFileRoute("/donor/symbolic-portrait")({
  head: () => ({
    meta: [
      { title: "Donor Lab — символический портрет" },
      {
        name: "description",
        content:
          "Визуальный эксперимент: несколько архетипических объектов как одна композиция — материал, свет, плотность, направление.",
      },
      { property: "og:title", content: "Donor Lab — символический портрет" },
      {
        property: "og:description",
        content: "Три демо-композиции архетипических объектов. Только визуальный R&D.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DonorPortrait,
});

function DonorPortrait() {
  const [motion, setMotion] = useState<MotionMode>("auto");

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl overflow-x-hidden px-5 py-16 sm:px-8">
      <p className="text-xs uppercase tracking-wider-xs text-gold/80">Donor Lab · visual R&amp;D</p>
      <h1 className="mt-5 text-4xl leading-tight sm:text-6xl">Символический портрет</h1>
      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-foreground/75">
        Не портрет лица и не вывод о человеке. Проверка одной гипотезы: может ли сочетание
        объектов, материала, света и плотности давать артефакт, который ощущается как чей-то
        собственный.
      </p>
      <p className="mt-4 max-w-2xl text-xs uppercase tracking-wider-xs text-muted-foreground">
        Все композиции ниже — demo data
      </p>

      <div className="mt-10 flex gap-2">
        {(["auto", "reduced"] as MotionMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMotion(m)}
            aria-pressed={motion === m}
            className={`min-h-11 rounded-sm border border-border px-4 text-xs uppercase tracking-wider-xs transition-colors ${
              motion === m ? "bg-gold/20 text-gold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {m === "auto" ? "движение" : "reduced motion"}
          </button>
        ))}
      </div>

      <div className="mt-14 space-y-20">
        {DEMO_COMPOSITIONS.map((c) => (
          <SymbolicPortrait key={`${c.id}-${motion}`} composition={c} motion={motion} />
        ))}
      </div>

      <nav className="mt-20 flex flex-wrap gap-4 border-t border-border/60 pt-10 text-xs uppercase tracking-wider-xs">
        <Link to="/donor/archetypes" className="text-gold hover:opacity-80">
          ← Девять объектов
        </Link>
        <Link to="/" className="text-muted-foreground hover:text-foreground">
          На главную
        </Link>
      </nav>
    </main>
  );
}
