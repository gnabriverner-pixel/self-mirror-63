import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import cosmosHero from "@/assets/cosmos-possibility.jpg";
import { PossibilitySky } from "@/donor/cosmos";
import { useJourney } from "@/lib/journey";

export const Route = createFileRoute("/donor/cosmos")({
  validateSearch: (search: Record<string, unknown>): { from?: "code" } =>
    search["from"] === "code" ? { from: "code" } : {},
  head: () => ({
    meta: [
      { title: "Пространство возможного — космический эксперимент · Зеркало себя" },
      {
        name: "description",
        content:
          "Космическая интерактивная сцена о свободе, мечте и внутренних возможностях. Выберите направление и создайте личное созвездие.",
      },
      { property: "og:title", content: "Пространство возможного — Зеркало себя" },
      {
        property: "og:description",
        content:
          "Не предсказание. Приглашение увидеть в себе больше пространства, свободы и возможного.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CosmosPage,
});

function CosmosPage() {
  const [still, setStill] = useState(false);
  const { from } = Route.useSearch();
  const { journey } = useJourney();
  const returnDate = from === "code" ? journey.birthDate : undefined;

  return (
    <main className="cosmos-page" data-still={still ? "yes" : "no"}>
      <section className="cosmos-hero" aria-labelledby="cosmos-title">
        <img
          src={cosmosHero}
          alt="Алебастровый портал над планетарным горизонтом в глубоком космосе"
          width={1920}
          height={1440}
          fetchPriority="high"
          className="cosmos-hero-image"
        />
        <div className="cosmos-hero-shade" aria-hidden="true" />

        <nav className="cosmos-nav" aria-label="Космический эксперимент">
          {returnDate ? (
            <Link to="/code" search={{ d: returnDate }} className="cosmos-brand">
              <ArrowLeft aria-hidden="true" />К вашей карте
            </Link>
          ) : (
            <Link to="/" className="cosmos-brand">
              <ArrowLeft aria-hidden="true" />
              Зеркало себя
            </Link>
          )}
          <div>
            <span>{from === "code" ? "За пределами карты" : "DONOR LAB · EXP 01"}</span>
            <button
              type="button"
              onClick={() => setStill((value) => !value)}
              aria-pressed={still}
              aria-label={still ? "Включить движение" : "Остановить движение"}
            >
              {still ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
              <span>{still ? "Оживить" : "Покой"}</span>
            </button>
          </div>
        </nav>

        <div className="cosmos-hero-content">
          <p className="cosmos-kicker">Пространство возможного</p>
          <h1 id="cosmos-title">
            <span>В тебе больше,</span>
            <span>чем ты успел</span>
            <em>исследовать.</em>
          </h1>
          <p className="cosmos-intro">
            Здесь ничего не нужно доказывать. Можно на мгновение забыть о пределах — и увидеть, куда
            хочется расти.
          </p>
          <a href="#possible" className="cosmos-primary-link">
            Увидеть возможное
            <ArrowDown aria-hidden="true" />
          </a>
        </div>

        <p className="cosmos-hero-note">Не предсказание. Не диагноз. Приглашение.</p>
      </section>

      <PossibilitySky still={still} />

      <section className="cosmos-manifesto" aria-labelledby="manifesto-title">
        <p className="cosmos-kicker">Маленький манифест возможного</p>
        <h2 id="manifesto-title" className="sr-only">
          Манифест возможного
        </h2>
        <p>Свобода начинается там, где появляется место для выбора.</p>
        <p>Смысл рождается не из обязанности, а из живого отклика.</p>
        <p>Надежда — это когда возможное снова становится видимым.</p>
        <div className="cosmos-return">
          <p>Пусть следующий шаг будет не обязанностью, а открытием.</p>
          {from === "code" ? (
            <Link to="/myth">
              {journey.mythDone ? "Вернуться к личному мифу" : "Открыть личный миф"}
              <ArrowRight aria-hidden="true" />
            </Link>
          ) : (
            <Link to="/">
              Вернуться к двум зеркалам
              <ArrowRight aria-hidden="true" />
            </Link>
          )}
        </div>
      </section>

      <footer className="cosmos-footer">
        <span>
          {from === "code"
            ? "Зеркало себя · Пространство возможного"
            : "Художественный эксперимент DONOR LAB"}
        </span>
        {from === "code" ? (
          <Link to="/">К двум зеркалам</Link>
        ) : (
          <Link to="/donor/artifacts">Галерея артефактов</Link>
        )}
      </footer>
    </main>
  );
}
