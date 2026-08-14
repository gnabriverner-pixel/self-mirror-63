import { createFileRoute, useNavigate } from "@tanstack/react-router";
import heroImage from "@/assets/mirror-hero.jpg";
import { ARCHETYPE_LIST } from "@/lib/archetypes";
import { ArchetypeCard } from "@/components/mirror/ArchetypeCard";
import { DateEntry } from "@/components/mirror/DateEntry";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Зеркало себя — ваш цифровой код по дате рождения" },
      {
        name: "description",
        content:
          "Девять планетарных архетипов ведической нумерологии и ваша личная карта: сила, противоречие и вектор реализации — из одной даты рождения.",
      },
      { property: "og:title", content: "Зеркало себя" },
      {
        property: "og:description",
        content:
          "Откройте свой код: девять архетипов, личная карта и то, что вы в ней узнаете.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  return (
    <main>
      {/* Тайна */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
        <img
          src={heroImage}
          alt="Небесная сфера в кольцах янтрической геометрии"
          width={1920}
          height={1088}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_50%,transparent,var(--background)_92%)]" />
        <div className="animate-rise relative mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-wider-xs text-gold/80">
            Ведическая нумерология
          </p>
          <h1 className="mt-7 text-6xl leading-[0.95] text-balance text-foreground sm:text-8xl">
            Зеркало себя
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-foreground/80">
            У каждого человека есть свой числовой рисунок. В ведической традиции числа
            даты рождения связывают с девятью планетарными архетипами — силами, через
            которые можно по-новому увидеть характер, внутренние противоречия и
            направление реализации.
          </p>
          <p className="mt-5 text-sm text-muted-foreground">
            Откройте свой код и посмотрите, насколько точно он вас узнаёт.
          </p>
          <a
            href="#врата"
            className="mt-12 inline-block rounded-sm border border-gold/60 bg-gold/10 px-10 py-4 text-xs uppercase tracking-wider-xs text-gold transition-all hover:bg-gold/20 hover:shadow-[var(--shadow-halo)]"
          >
            Открыть свой код
          </a>
          <p className="mt-6 text-xs text-muted-foreground/80">
            Около десяти минут. Начинается с даты рождения.
          </p>
        </div>
      </section>

      {/* Мир */}
      <section className="mx-auto max-w-3xl px-6 py-32">
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
            сторона и своя тень. Человек — не одна из них, а сочетание нескольких,
            расставленных по разным местам.
          </p>
          <p className="text-muted-foreground">
            Мы используем эту систему как способ посмотреть на себя с неожиданной стороны —
            и проверить, что действительно откликается в вашей жизни. Последнее слово
            остаётся за вами.
          </p>
        </div>
      </section>

      {/* Девять архетипов */}
      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-wider-xs text-gold/80">Пантеон</p>
          <h2 className="mt-6 text-4xl leading-tight sm:text-5xl">Девять архетипов</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-foreground/80">
            Сначала образ, потом смысл. Познакомьтесь с силами до того, как узнаете, какие
            из них ваши.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {ARCHETYPE_LIST.map((a) => (
            <ArchetypeCard key={a.n} a={a} />
          ))}
        </div>
      </section>

      {/* Почему дата */}
      <section className="mx-auto max-w-3xl px-6 pb-32">
        <p className="text-xs uppercase tracking-wider-xs text-gold/80">Почему дата рождения</p>
        <h2 className="mt-6 text-4xl leading-tight text-balance sm:text-5xl">
          Первый ход делает система, а не вы
        </h2>
        <div className="mt-8 space-y-6 text-[17px] leading-relaxed text-foreground/85">
          <p>
            Дата рождения даёт фиксированную числовую формулу — единственную и неизменную.
            Из неё складываются несколько позиций: то, кто вы внутри; то, как вы
            действуете; то, где ваша энергия ищет выход.
          </p>
          <p>
            Мы ничего у вас не спрашиваем. Ни анкеты, ни теста, ни «оцените себя по шкале».
            Сначала считаем — потом показываем. А вы уже сами проверяете, насколько эта
            версия совпадает с вашей жизнью.
          </p>
        </div>
      </section>

      {/* Врата */}
      <section id="врата" className="border-t border-border/60 px-6 py-32">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-4xl leading-tight sm:text-5xl">Ваша дата рождения</h2>
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
