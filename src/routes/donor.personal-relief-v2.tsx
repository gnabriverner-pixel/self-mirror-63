import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  DEMO_RELIEFS,
  PersonalRelief,
  ReliefProvenance,
  demoPositions,
  type MotionModeAlias,
  type ReliefSlot,
} from "@/donor/personal-relief";

export const Route = createFileRoute("/donor/personal-relief-v2")({
  head: () => ({
    meta: [
      { title: "Donor Lab — персональный рельеф" },
      {
        name: "description",
        content:
          "Пять позиций как один музейный объект: детерминированная композиция, боковой свет, разлом и основание.",
      },
      { property: "og:title", content: "Donor Lab — персональный рельеф" },
      {
        property: "og:description",
        content: "Сигнатурное раскрытие одного объекта и двенадцать демо-комбинаций.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DonorPersonalRelief,
});

const STATEMENT =
  "Демо-фраза: центр держится, но выход смещён — объект стоит не там, где начинался.";

function DonorPersonalRelief() {
  const [motion, setMotion] = useState<MotionModeAlias>("auto");
  const [run, setRun] = useState(0);
  const [done, setDone] = useState(false);
  const [focus, setFocus] = useState<ReliefSlot | null>(null);
  const [demoIndex, setDemoIndex] = useState(0);

  const demo = DEMO_RELIEFS[demoIndex]!;
  const positions = demoPositions(demo);

  const replay = () => {
    setDone(false);
    setFocus(null);
    setRun((v) => v + 1);
  };

  return (
    <main className="mx-auto min-h-[100dvh] w-full max-w-5xl overflow-x-hidden px-5 pb-24 pt-12 sm:px-8">
      <p className="text-xs uppercase tracking-wider-xs text-gold/80">
        Donor Lab · signature moment
      </p>
      <h1 className="mt-5 text-4xl leading-tight sm:text-6xl">Персональный рельеф</h1>
      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-foreground/75">
        Пять сил не стоят рядом. Они собраны в один предмет: центр массы, направление, внешняя
        оболочка, разрыв и сторона выхода. Одни и те же числа всегда дают одну и ту же композицию.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={replay}
          className="min-h-11 rounded-sm border border-gold/50 px-5 text-xs uppercase tracking-wider-xs text-gold"
        >
          Повторить
        </button>
        <button
          type="button"
          onClick={() => setDone(true)}
          className="min-h-11 rounded-sm border border-border px-5 text-xs uppercase tracking-wider-xs text-muted-foreground hover:text-foreground"
        >
          Пропустить
        </button>
        {(["auto", "reduced"] as MotionModeAlias[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMotion(m);
              setRun((v) => v + 1);
              setDone(m === "reduced");
            }}
            aria-pressed={motion === m}
            className={`min-h-11 rounded-sm border border-border px-5 text-xs uppercase tracking-wider-xs ${
              motion === m ? "bg-gold/20 text-gold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {m === "auto" ? "движение" : "reduced motion"}
          </button>
        ))}
      </div>

      <section className="mt-12" data-testid="relief-hero">
        <PersonalRelief
          key={`${demo.id}-${motion}-${run}-${done ? "done" : "live"}`}
          positions={positions}
          material={demo.material}
          motion={motion}
          reveal={done ? "instant" : "staged"}
          statement={STATEMENT}
          summary="Персональный рельеф: один объект, собранный из пяти архетипических форм — центр, направление, оболочка, разрыв и выход."
          focus={focus}
          onRevealEnd={() => setDone(true)}
        />

        {done && (
          <div className="animate-rise mx-auto mt-10 max-w-xl">
            <ReliefProvenance positions={positions} focus={focus} onFocus={setFocus} />
          </div>
        )}
      </section>

      <section className="mt-24 border-t border-border/60 pt-12">
        <p className="text-xs uppercase tracking-wider-xs text-gold/80">
          Стресс-проверка · 12 demo-комбинаций
        </p>
        <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">Разные числа — разная форма</h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Все комбинации ниже — demo data. Это не расчёт и не чья-то карта.
        </p>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {DEMO_RELIEFS.map((d, i) => (
            <figure key={d.id} className="min-w-0">
              <button
                type="button"
                onClick={() => {
                  setDemoIndex(i);
                  replay();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="block w-full text-left"
                aria-label={`Показать ${d.title} крупно`}
              >
                <PersonalRelief
                  positions={demoPositions(d)}
                  material={d.material}
                  motion="reduced"
                  reveal="instant"
                />
                <figcaption className="mt-4 min-h-11">
                  <span className="text-xs uppercase tracking-wider-xs text-gold/70">
                    {d.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {d.numbers.join(" · ")} — {d.note}
                  </span>
                </figcaption>
              </button>
            </figure>
          ))}
        </div>
      </section>

      <nav className="mt-20 flex flex-wrap gap-5 border-t border-border/60 pt-10 text-xs uppercase tracking-wider-xs">
        <Link to="/donor/archetypes" className="text-gold hover:opacity-80">
          Девять объектов
        </Link>
        <Link to="/donor/symbolic-portrait" className="text-muted-foreground hover:text-foreground">
          Символический портрет
        </Link>
        <Link to="/" className="text-muted-foreground hover:text-foreground">
          На главную
        </Link>
      </nav>
    </main>
  );
}
