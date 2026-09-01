import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ARCHETYPE_ART,
  ARCHETYPE_NUMBERS,
  ArchetypeEmblem,
  type EmblemVariant,
  type MotionMode,
} from "@/donor/archetype-art";

export const Route = createFileRoute("/donor/archetypes")({
  head: () => ({
    meta: [
      { title: "Donor Lab — девять архетипических объектов" },
      {
        name: "description",
        content:
          "Лабораторная витрина визуальной системы «Зеркала себя»: девять объектов в алебастре и обсидиане, размеры и режимы движения.",
      },
      { property: "og:title", content: "Donor Lab — архетипические объекты" },
      {
        property: "og:description",
        content: "Девять пластических систем: материалы, размеры, motion и reduced-motion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DonorArchetypes,
});

function DonorArchetypes() {
  const [variant, setVariant] = useState<EmblemVariant>("alabaster");
  const [motion, setMotion] = useState<MotionMode>("auto");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [nonce, setNonce] = useState(0);

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl overflow-x-hidden px-5 py-16 sm:px-8">
      <p className="text-xs uppercase tracking-wider-xs text-gold/80">Donor Lab · visual R&amp;D</p>
      <h1 className="mt-5 text-4xl leading-tight sm:text-6xl">Девять объектов</h1>
      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-foreground/75">
        Это не пользовательский экран. Здесь проверяется одно: если убрать подпись и цифру,
        девять объектов всё равно должны читаться как девять разных характеров.
      </p>

      <div className="sticky top-0 z-10 -mx-5 mt-10 flex flex-wrap gap-2 border-y border-border/60 bg-background/85 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8">
        <Toggle
          label="Материал"
          value={variant}
          options={[
            ["alabaster", "Алебастр"],
            ["obsidian", "Обсидиан"],
          ]}
          onChange={(v) => setVariant(v as EmblemVariant)}
        />
        <Toggle
          label="Размер"
          value={size}
          options={[
            ["sm", "sm"],
            ["md", "md"],
            ["lg", "lg"],
          ]}
          onChange={(v) => setSize(v as "sm" | "md" | "lg")}
        />
        <Toggle
          label="Движение"
          value={motion}
          options={[
            ["auto", "normal"],
            ["reduced", "reduced"],
            ["still", "still"],
          ]}
          onChange={(v) => setMotion(v as MotionMode)}
        />
        <button
          onClick={() => setNonce((n) => n + 1)}
          className="min-h-11 rounded-sm border border-gold/50 px-4 text-xs uppercase tracking-wider-xs text-gold transition-colors hover:bg-gold/10"
        >
          Проиграть появление
        </button>
      </div>

      <section className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {ARCHETYPE_NUMBERS.map((n) => {
          const t = ARCHETYPE_ART[n];
          return (
            <figure key={`${n}-${nonce}-${variant}-${size}-${motion}`} className="min-w-0">
              <div className="flex justify-center">
                <ArchetypeEmblem number={n} variant={variant} size={size} motion={motion} />
              </div>
              <figcaption className="mt-5">
                <p className="text-xs uppercase tracking-wider-xs text-gold/80">
                  {n} · {t.sanskrit} · {t.planet}
                </p>
                <p className="mt-2 text-2xl">{t.object}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {t.material}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground/80">
                  движение: {t.motion}
                </p>
              </figcaption>
            </figure>
          );
        })}
      </section>

      <section className="mt-20 border-t border-border/60 pt-12">
        <h2 className="text-3xl">Оба материала рядом</h2>
        <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
          {ARCHETYPE_NUMBERS.map((n) => (
            <div key={`pair-${n}`} className="min-w-0 space-y-3">
              <ArchetypeEmblem number={n} variant="alabaster" size={96} motion={motion} />
              <ArchetypeEmblem number={n} variant="obsidian" size={96} motion={motion} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t border-border/60 pt-12">
        <h2 className="text-3xl">Reduced motion</h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          В этом ряду анимация выключена принудительно: объекты должны выглядеть законченными
          в состоянии покоя, без «недорисованных» линий.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
          {ARCHETYPE_NUMBERS.map((n) => (
            <ArchetypeEmblem key={`rm-${n}`} number={n} variant={variant} size={96} motion="reduced" />
          ))}
        </div>
      </section>

      <nav className="mt-20 flex flex-wrap gap-4 border-t border-border/60 pt-10 text-xs uppercase tracking-wider-xs">
        <Link to="/donor/symbolic-portrait" className="text-gold hover:opacity-80">
          Символический портрет →
        </Link>
        <Link to="/" className="text-muted-foreground hover:text-foreground">
          На главную
        </Link>
      </nav>
    </main>
  );
}

function Toggle({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: [string, string][];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] uppercase tracking-wider-xs text-muted-foreground">{label}</span>
      <div className="flex overflow-hidden rounded-sm border border-border">
        {options.map(([v, l]) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            aria-pressed={value === v}
            className={`min-h-11 px-3 text-xs transition-colors ${
              value === v ? "bg-gold/20 text-gold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
