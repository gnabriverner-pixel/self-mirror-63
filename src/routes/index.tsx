import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import heroImage from "@/assets/mirror-hero.jpg";
import { ARCHETYPE_LIST } from "@/lib/archetypes";
import { ArchetypeCard } from "@/components/mirror/ArchetypeCard";
import { DateEntry } from "@/components/mirror/DateEntry";
import { useJourney } from "@/lib/journey";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Зеркало себя — личный миф и цифровой код" },
      {
        name: "description",
        content:
          "Два независимых зеркала: сказка про вас из четырёх образов и карта природы из даты рождения — а затем их встреча.",
      },
      { property: "og:title", content: "Зеркало себя" },
      {
        property: "og:description",
        content: "Две двери: личный миф из ваших образов и цифровой код из даты рождения.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Door({
  tag,
  title,
  text,
  cta,
  done,
  to,
  hash,
}: {
  tag: string;
  title: string;
  text: string;
  cta: string;
  done: boolean;
  to: string;
  hash?: string;
}) {
  return (
    <article className="flex flex-col rounded-sm border border-border bg-card/40 p-7 backdrop-blur-sm transition-colors hover:border-gold/40">
      <p className="text-xs uppercase tracking-wider-xs text-gold">{tag}</p>
      <h3 className="mt-4 text-3xl leading-tight">{title}</h3>
      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/80">{text}</p>
      {done && (
        <p className="mt-4 text-xs uppercase tracking-wider-xs text-gold/70">Уже открыто</p>
      )}
      <Link
        to={to}
        hash={hash}
        className="mt-7 rounded-sm border border-gold/60 bg-gold/10 px-6 py-4 text-center text-xs uppercase tracking-wider-xs text-gold transition-all hover:bg-gold/20 hover:shadow-[var(--shadow-halo)]"
      >
        {done ? "Вернуться" : cta}
      </Link>
    </article>
  );
}

function Index() {
  const navigate = useNavigate();
  const { journey } = useJourney();
  const [allArchetypes, setAllArchetypes] = useState(false);
  const teaser = ARCHETYPE_LIST.slice(0, 3);

  return (
    <main className="overflow-x-hidden">
      {/* Тайна */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24">
        <img
          src={heroImage}
          alt="Небесная сфера в кольцах янтрической геометрии"
          width={1920}
          height={1088}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_50%,transparent,var(--background)_92%)]" />
        <div className="animate-rise relative mx-auto w-full max-w-3xl text-center">
          <p className="text-xs uppercase tracking-wider-xs text-gold/80">
            Ведическая нумерология и личный миф
          </p>
          <h1 className="mt-7 text-6xl leading-[0.95] text-balance text-foreground sm:text-8xl">
            Зеркало себя
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-foreground/80">
            Два независимых отражения одного человека. Одно рождается из ваших образов,
            другое — из даты рождения. Каждое можно открыть отдельно, а потом свести вместе.
          </p>

          <div className="mt-12 grid gap-5 text-left sm:grid-cols-2">
            <Door
              tag="Личный миф · сказка про тебя"
              title="Войти через образы"
              text="4 образных вопроса. Литературная история, рождающаяся из ваших собственных символов."
              cta="Войти через образы"
              done={journey.mythDone}
              to="/myth"
            />
            <Door
              tag="Цифровой код"
              title="Войти через дату"
              text="Только дата рождения. Пять ключей и символическая карта вашей природы."
              cta="Войти через дату"
              done={journey.codeDone}
              to="/"
              hash="врата"
            />
          </div>

          {journey.mythDone && journey.codeDone && (
            <Link
              to="/meeting"
              className="mt-8 inline-block rounded-sm border border-gold/60 bg-gold/15 px-9 py-4 text-xs uppercase tracking-wider-xs text-gold transition-all hover:bg-gold/25 hover:shadow-[var(--shadow-halo)]"
            >
              Встреча зеркал открыта
            </Link>
          )}
          {(journey.mythDone !== journey.codeDone) && (
            <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
              Одно зеркало уже открыто. Откройте второе — и станет доступна «Встреча зеркал».
            </p>
          )}
        </div>
      </section>

      {/* Мир */}
      <section className="mx-auto max-w-3xl px-6 py-28">
        <p className="text-xs uppercase tracking-wider-xs text-gold/80">Что это за система</p>
        <h2 className="mt-6 text-4xl leading-tight text-balance sm:text-5xl">
          Девять сил, из которых собран человек
        </h2>
        <div className="mt-8 space-y-6 text-[17px] leading-relaxed text-foreground/85">
          <p>
            Ведическая нумерология смотрит на числа как на язык. Каждому числу от одного
            до девяти соответствует планетарный архетип индийской традиции: Солнце и Луна,
            Юпитер и Сатурн, Венера и Марс, Меркурий и две лунные точки — Раху и Кету.
          </p>
          <p>
            Это не характеристики и не типы личности. Это скорее набор сил с собственным
            характером: у каждой есть своё желание, свой способ действовать, своя светлая
            сторона и своя тень.
          </p>
          <p className="text-muted-foreground">
            Личный миф работает иначе: он не считает ничего. Он собирает историю из ваших
            образов — и потому появляется независимо от кода.
          </p>
        </div>
      </section>

      {/* Пантеон-тизер */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-wider-xs text-gold/80">Пантеон</p>
          <h2 className="mt-6 text-4xl leading-tight sm:text-5xl">Девять архетипов</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-foreground/80">
            Сначала образ, потом смысл. Три силы — для знакомства, остальные шесть ждут
            за одной кнопкой.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {(allArchetypes ? ARCHETYPE_LIST : teaser).map((a) => (
            <ArchetypeCard key={a.n} a={a} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <button
            onClick={() => setAllArchetypes((v) => !v)}
            className="rounded-sm border border-gold/50 bg-gold/5 px-8 py-4 text-xs uppercase tracking-wider-xs text-gold transition-all hover:bg-gold/15"
          >
            {allArchetypes ? "Свернуть пантеон" : "Посмотреть все 9 архетипов"}
          </button>
        </div>
      </section>

      {/* Врата */}
      <section id="врата" className="scroll-mt-8 border-t border-border/60 px-6 py-28">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs uppercase tracking-wider-xs text-gold/80">Второе зеркало</p>
          <h2 className="mt-6 text-4xl leading-tight sm:text-5xl">Ваша дата рождения</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            Дальше карта будет открываться постепенно — по одному ключу за раз.
          </p>
          <div className="mt-12">
            <DateEntry
              onSubmit={(d) =>
                navigate({
                  to: "/code",
                  search: {
                    d: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
                  },
                })
              }
            />
          </div>
          <div className="mt-10">
            <Link to="/myth" className="text-xs uppercase tracking-wider-xs text-gold/80 hover:text-gold">
              Или начните с личного мифа
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 px-6 py-12 text-center text-xs leading-relaxed text-muted-foreground/80">
        «Зеркало себя» опирается на символическую традицию, а не на естественные науки.
        <br />
        Это способ увидеть себя иначе, а не предсказание и не диагноз.
      </footer>
    </main>
  );
}
