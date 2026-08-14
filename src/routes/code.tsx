import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Orb } from "@/components/mirror/Orb";
import { buildChart, formatDate, meeting, tensionText, type Position } from "@/lib/numerology";

export const Route = createFileRoute("/code")({
  validateSearch: (s: Record<string, unknown>) => ({ d: typeof s.d === "string" ? s.d : "" }),
  head: () => ({
    meta: [
      { title: "Ваш код — Зеркало себя" },
      {
        name: "description",
        content:
          "Личная карта из даты рождения: ваши планетарные архетипы, встреча сил, внутреннее противоречие и вектор реализации.",
      },
      { property: "og:title", content: "Ваш код — Зеркало себя" },
      {
        property: "og:description",
        content: "Карта открывается по одному ключу: душа, действие, реализация, тень, вектор.",
      },
    ],
  }),
  component: CodePage;
});

function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  return (
    <section ref={ref} className="animate-rise scroll-mt-16 border-t border-border/50 py-20">
      {children}
    </section>
  );
}

function Key({ p, index }: { p: Position; index: string }) {
  return (
    <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:gap-12 md:text-left">
      <Orb archetype={p.archetype} size={220} />
      <div className="max-w-xl">
        <p className="text-xs uppercase tracking-wider-xs text-gold/80">{index} · {p.label}</p>
        <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
          {p.archetype.title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {p.value} · {p.archetype.sanskrit} · {p.archetype.planet} — {p.archetype.essence}
        </p>
        <p className="mt-7 text-[17px] leading-relaxed text-foreground/85">{p.archetype.core}</p>
        <p className="mt-5 text-[15px] leading-relaxed text-foreground/70">{p.archetype.action}</p>
      </div>
    </div>
  );
}

function CodePage() {
  const { d } = Route.useSearch();
  const [step, setStep] = useState(0);

  const parts = d.split("-").map(Number);
  const valid = parts.length === 3 && parts.every((x) => !Number.isNaN(x));
  if (!valid) {
    return (
      <div className="grid min-h-screen place-items-center px-6 text-center">
        <div>
          <h1 className="text-3xl">Дата не найдена</h1>
          <Link to="/" className="mt-6 inline-block text-sm text-gold underline-offset-4 hover:underline">
            Вернуться ко входу
          </Link>
        </div>
      </div>
    );
  }

  const date = new Date(parts[0]!, parts[1]! - 1, parts[2]!);
  const chart = buildChart(date);
  const { soul, action, realization, vector, tension } = chart;

  const steps = 8;
  const next = () => setStep((s) => Math.min(s + 1, steps));

  const NextButton = ({ label }: { label: string }) => (
    <div className="mt-14 text-center">
      <button
        onClick={next}
        className="rounded-sm border border-gold/60 bg-gold/10 px-9 py-4 text-xs uppercase tracking-wider-xs text-gold transition-all hover:bg-gold/20 hover:shadow-[var(--shadow-halo)]"
      >
        {label}
      </button>
    </div>
  );

  const compound = realization.path.length > 1 ? realization : soul.path.length > 1 ? soul : vector;

  return (
    <main className="mx-auto max-w-4xl px-6 pb-32">
      <header className="flex min-h-[70svh] flex-col items-center justify-center text-center">
        <p className="text-xs uppercase tracking-wider-xs text-gold/80">{formatDate(date)}</p>
        <h1 className="mt-8 text-5xl leading-tight text-balance sm:text-6xl">
          Из этой даты складывается формула
        </h1>
        <p className="mt-7 max-w-lg text-[17px] leading-relaxed text-foreground/80">
          Она уже посчитана. Мы откроем её не всю сразу — по одному ключу, чтобы каждый
          успел с вами встретиться.
        </p>
        {step === 0 && <NextButton label="Первый ключ" />}
      </header>

      {step >= 1 && (
        <Reveal>
          <Key p={soul} index="Первый ключ" />
          {step === 1 && <NextButton label="Как вы действуете" />}
        </Reveal>
      )}

      {step >= 2 && (
        <Reveal>
          <Key p={action} index="Второй ключ" />
          {step === 2 && <NextButton label="Что происходит, когда они встречаются" />}
        </Reveal>
      )}

      {step >= 3 && (
        <Reveal>
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center justify-center gap-6">
              <Orb archetype={soul.archetype} size={120} />
              <span className="text-3xl text-gold/60">·</span>
              <Orb archetype={action.archetype} size={120} />
            </div>
            <p className="mt-10 text-center text-xs uppercase tracking-wider-xs text-gold/80">
              Соединение
            </p>
            <h2 className="mt-4 text-center text-4xl leading-tight">
              Когда эти две силы встречаются
            </h2>
            <p className="mt-8 text-[17px] leading-relaxed text-foreground/85">
              {meeting(soul.archetype, action.archetype)}
            </p>
          </div>
          {step === 3 && <NextButton label="Где энергия ищет выход" />}
        </Reveal>
      )}

      {step >= 4 && (
        <Reveal>
          <Key p={realization} index="Третий ключ" />
          <p className="mx-auto mt-8 max-w-xl text-center text-[15px] leading-relaxed text-foreground/70">
            Эта сила ищет выход {realization.archetype.outlet}. Там вы устаёте меньше, чем
            должны были бы, — и это самый честный признак своего места.
          </p>
          {step === 4 && <NextButton label="Ваш вектор" />}
        </Reveal>
      )}

      {step >= 5 && (
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Orb archetype={vector.archetype} size={200} />
            <p className="mt-10 text-xs uppercase tracking-wider-xs text-gold/80">
              Ваш вектор реализации
            </p>
            <h2 className="mt-4 text-4xl leading-tight">
              {vector.archetype.title} · {vector.archetype.sanskrit}
            </h2>
            <p className="mt-8 text-left text-[17px] leading-relaxed text-foreground/85">
              Ваша жизнь разворачивается естественнее всего туда, где нужно{" "}
              {vector.archetype.demand.replace(/^/, "")} — и где это требуется не иногда, а
              как основа дела. Вы приносите туда {vector.archetype.gift}. Всё, что построено
              мимо этого, работает, но забирает у вас больше, чем возвращает.
            </p>
          </div>
          {step === 5 && <NextButton label="Место напряжения" />}
        </Reveal>
      )}

      {step >= 6 && (
        <Reveal>
          <div className="mx-auto max-w-2xl">
            <p className="text-center text-xs uppercase tracking-wider-xs text-gold/80">
              Противоречие
            </p>
            <h2 className="mt-4 text-center text-4xl leading-tight">
              Две потребности, которые спорят
            </h2>
            <p className="mt-8 text-[17px] leading-relaxed text-foreground/85">
              {tensionText(soul.archetype, tension.archetype)}
            </p>
            <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
              Тень здесь — не приговор, а место, где ваша сила поворачивается против вас:{" "}
              {tension.archetype.shadow.join(", ")}.
            </p>
          </div>
          {step === 6 && <NextButton label="Показать карту целиком" />}
        </Reveal>
      )}

      {step >= 7 && (
        <Reveal>
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider-xs text-gold/80">Ваша карта</p>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">{formatDate(date)}</h2>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {chart.positions.map((p) => (
              <div
                key={p.key}
                className="flex items-center gap-5 rounded-sm border border-border bg-card/40 p-5 backdrop-blur-sm"
              >
                <Orb archetype={p.archetype} size={72} />
                <div>
                  <p className="text-xs uppercase tracking-wider-xs text-muted-foreground">
                    {p.label}
                  </p>
                  <p className="mt-1 text-xl">
                    {p.value} · {p.archetype.sanskrit}
                  </p>
                  <p className="text-sm text-muted-foreground">{p.archetype.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-sm border border-gold/30 bg-gold/5 p-8">
            <p className="text-xs uppercase tracking-wider-xs text-gold/80">Составные числа</p>
            <p className="mt-5 text-[17px] leading-relaxed text-foreground/85">
              За вашей {compound.value}-кой стоит {compound.path[0]}
              {compound.path.length > 2 ? ` → ${compound.path[1]}` : ""}. В этой системе важно
              не только итоговое число, но и путь, которым оно сложилось: две одинаковые{" "}
              {compound.value}-ки могут звучать совершенно по-разному.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Ваша {compound.value} пришла через {compound.path[0]} — это значит, что к{" "}
              {compound.archetype.essence.toLowerCase()} вы приходите не напрямую, а через
              опыт, который сначала кажется совсем другим. Это отдельный слой карты.
            </p>
          </div>
          {step === 7 && <NextButton label="Проверить на своей жизни" />}
        </Reveal>
      )}

      {step >= 8 && (
        <Reveal>
          <div className="mx-auto max-w-2xl">
            <p className="text-center text-xs uppercase tracking-wider-xs text-gold/80">Альберт</p>
            <h2 className="mt-4 text-center text-4xl leading-tight">
              Теперь можно поговорить о том, что вы увидели
            </h2>
            <p className="mt-8 text-center text-[17px] leading-relaxed text-foreground/85">
              Альберт знает вашу карту целиком и помогает приложить её к реальной ситуации —
              к работе, отношениям, выбору направления.
            </p>
            <div className="mt-10 space-y-3">
              {[
                "Почему я всё время оказываюсь между этими двумя состояниями?",
                "Как это может проявляться в отношениях?",
                "Что моя формула говорит о реализации?",
                "Какая часть моей природы сейчас подавлена?",
              ].map((q) => (
                <div
                  key={q}
                  className="rounded-sm border border-border bg-card/40 px-5 py-4 text-[15px] text-foreground/80"
                >
                  {q}
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-sm border border-gold/40 bg-gold/5 p-9 text-center">
              <h3 className="text-3xl leading-tight">Полное зеркало</h3>
              <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-foreground/80">
                Все позиции формулы, происхождение каждого числа, связи между ними, ресурсы и
                тень, матрица, ваш индивидуальный миф и персональный символический портрет —
                плюс разговор с Альбертом внутри уже открытой карты.
              </p>
              <button className="mt-9 rounded-sm border border-gold/60 bg-gold/15 px-10 py-4 text-xs uppercase tracking-wider-xs text-gold transition-all hover:bg-gold/25 hover:shadow-[var(--shadow-halo)]">
                Открыть глубину · 650 ₽
              </button>
              <p className="mt-5 text-xs text-muted-foreground">
                Прототип: оплата пока не подключена.
              </p>
            </div>

            <p className="mt-16 text-center text-xs leading-relaxed text-muted-foreground/80">
              Всё это — интерпретация символической системы, а не утверждение о фактах.
              Верным считается только то, что вы узнаёте в собственной жизни.
            </p>
            <div className="mt-8 text-center">
              <Link to="/" className="text-xs uppercase tracking-wider-xs text-gold/80 hover:text-gold">
                Вернуться в начало
              </Link>
            </div>
          </div>
        </Reveal>
      )}
    </main>
  );
}