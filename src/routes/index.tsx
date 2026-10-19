import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import heroImage from "@/assets/mirror-relief-entry.jpg";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  done,
  children,
}: {
  tag: string;
  title: string;
  text: string;
  done: boolean;
  children: React.ReactNode;
}) {
  return (
    <article className="entry-door">
      <p className="entry-tag">{tag}</p>
      <h3>{title}</h3>
      <p className="entry-door-copy">{text}</p>
      {done && <p className="entry-open">Уже открыто</p>}
      <div className="entry-door-action">{children}</div>
    </article>
  );
}

const doorCta = "entry-cta";

function Index() {
  const navigate = useNavigate();
  const { journey } = useJourney();
  const [allArchetypes, setAllArchetypes] = useState(false);
  const teaser = ARCHETYPE_LIST.slice(0, 3);

  return (
    <main className="overflow-x-hidden">
      {/* Тайна */}
      <section className="entry-hall" aria-labelledby="entry-title">
        <img
          src={heroImage}
          alt="Две поверхности музейного рельефа: ключ среди органических линий и собранные каменные формы"
          width={1600}
          height={1008}
          fetchPriority="high"
          className="entry-exhibit"
        />
        <div className="entry-content">
          <p className="entry-tag">
            Личный миф ∥ Цифровой код
          </p>
          <h1 id="entry-title">
            Зеркало себя
          </h1>
          <p className="entry-intro">
            Одно отражение — из ваших образов. Другое — из даты рождения.
            Между ними можете узнать себя.
          </p>

          <div className="entry-doors">
            <Door
              tag="Личный миф"
              title="Ваши образы"
              text="Четыре ответа. История и рельеф ваших символов."
              done={journey.mythDone}
            >
              <Button asChild variant="ghost" className={doorCta}>
                <Link to="/myth">
                  {journey.mythDone ? "К мифу" : "Через образы"}<ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </Door>
            <Door
              tag="Цифровой код"
              title="Ваша структура"
              text="Дата рождения. Пять сил в одном рельефе."
              done={journey.codeDone}
            >
              {journey.birthDate ? (
                <Button asChild variant="ghost" className={doorCta}>
                  <Link to="/code" search={{ d: journey.birthDate }}>
                    {journey.codeDone ? "К карте" : "Продолжить"}<ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="ghost" className={doorCta}>
                  <Link to="/" hash="врата">Через дату<ArrowRight aria-hidden="true" /></Link>
                </Button>
              )}
            </Door>
          </div>

          {journey.mythDone && journey.codeDone && (
            <Button asChild variant="ghost" className="entry-meeting">
              <Link to="/meeting">Встреча зеркал открыта<ArrowRight aria-hidden="true" /></Link>
            </Button>
          )}
          {journey.mythDone !== journey.codeDone && (
            <p className="entry-progress">
              Одно зеркало уже открыто. Откройте второе — и станет доступна «Встреча зеркал».
            </p>
          )}
          {!journey.mythDone && !journey.codeDone && (
            <p className="entry-progress">Два независимых пути. Затем — Встреча зеркал.</p>
          )}
          <a href="#коллекция" className="entry-next" aria-label="К коллекции девяти сил">
            <span>Девять сил · коллекция</span><ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* Мир */}
      <section id="коллекция" className="mx-auto max-w-3xl scroll-mt-8 px-6 py-28">
        <p className="text-xs uppercase tracking-wider-xs text-gold/80">Что это за система</p>
        <h2 className="mt-6 text-4xl leading-tight text-balance sm:text-5xl">
          Девять сил, из которых собран человек
        </h2>
        <div className="mt-8 space-y-6 text-[17px] leading-relaxed text-foreground/85">
          <p>
            Ведическая нумерология смотрит на числа как на язык. Каждому числу от одного до девяти
            соответствует планетарный архетип индийской традиции: Солнце и Луна, Юпитер и Сатурн,
            Венера и Марс, Меркурий и две лунные точки — Раху и Кету.
          </p>
          <p>
            Это не характеристики и не типы личности. Это скорее набор сил с собственным характером:
            у каждой есть своё желание, свой способ действовать, своя светлая сторона и своя тень.
          </p>
          <p className="text-muted-foreground">
            Личный миф работает иначе: он не считает ничего. Он собирает историю из ваших образов —
            и потому появляется независимо от кода.
          </p>
        </div>
      </section>

      {/* Пантеон — коллекция объектов */}
      <section className="mx-auto max-w-4xl px-6 pb-28">
        <div className="mb-4 max-w-2xl">
          <p className="text-xs uppercase tracking-wider-xs text-gold/80">Коллекция</p>
          <h2 className="mt-6 text-4xl leading-tight sm:text-5xl">
            Девять сил как девять объектов
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-foreground/80">
            Идите вдоль коллекции. Сначала форма и материал, потом одна человеческая фраза — и
            только если захочется, всё остальное.
          </p>
        </div>
        <div>
          {(allArchetypes ? ARCHETYPE_LIST : teaser).map((a, i) => (
            <ArchetypeCard key={a.n} a={a} index={i} />
          ))}
        </div>
        <div className="mt-12 border-t border-border/70 pt-10 text-center">
          <Button
            variant="outline"
            onClick={() => setAllArchetypes((v) => !v)}
            className="min-h-11 rounded-sm border border-gold/50 bg-gold/5 px-8 py-4 text-xs uppercase tracking-wider-xs text-gold transition-all hover:bg-gold/15"
          >
            {allArchetypes ? "Свернуть коллекцию" : "Пройти всю коллекцию — девять объектов"}
          </Button>
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
            <Link
              to="/myth"
              className="text-xs uppercase tracking-wider-xs text-gold/80 hover:text-gold"
            >
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
