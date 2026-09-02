import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArchetypeEmblem } from "@/donor/archetype-art";
import { Ring } from "@/components/mirror/Ring";
import { useJourney } from "@/lib/journey";
import { buildMyth } from "@/lib/myth";
import { synthesize } from "@/lib/meeting";
import { buildChart, formatDate } from "@/lib/numerology";

export const Route = createFileRoute("/meeting")({
  head: () => ({
    meta: [
      { title: "Встреча зеркал — синтез мифа и кода · Зеркало себя" },
      {
        name: "description",
        content:
          "Два независимых отражения — из даты рождения и из ваших образов — рядом: параллели, расхождение и один глубокий вопрос.",
      },
      { property: "og:title", content: "Встреча зеркал" },
      {
        property: "og:description",
        content: "Что общего у вашего Кода и вашего Мифа — и где они спорят.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MeetingPage,
});

const TELEGRAM = "https://t.me/";

function MeetingPage() {
  const { journey, update, ready } = useJourney();
  const both = journey.mythDone && journey.codeDone && journey.mythAnswers && journey.birthDate;

  useEffect(() => {
    if (both && !journey.meetingDone) update({ meetingDone: true });
  }, [both, journey.meetingDone, update]);

  if (!ready) {
    return <main className="grid min-h-[70svh] place-items-center px-6" />;
  }

  if (!both) {
    return (
      <main className="mx-auto grid min-h-[80svh] max-w-xl place-items-center px-6 text-center">
        <div className="animate-rise">
          <h1 className="text-4xl leading-tight sm:text-5xl">Встреча зеркал ещё закрыта</h1>
          <p className="mt-6 text-[17px] leading-relaxed text-foreground/80">
            Чтобы два отражения встретились, нужно, чтобы каждое появилось независимо от
            другого. {journey.mythDone ? "Личный миф уже написан — осталcя Цифровой код." : null}
            {journey.codeDone ? " Цифровой код уже открыт — остался Личный миф." : null}
          </p>
          <div className="mt-10 flex flex-col items-center gap-3">
            {!journey.mythDone && (
              <Link to="/myth" className="rounded-sm border border-gold/60 bg-gold/10 px-8 py-4 text-xs uppercase tracking-wider-xs text-gold hover:bg-gold/20">
                Открыть Личный миф
              </Link>
            )}
            {!journey.codeDone && (
              <Link to="/" hash="врата" className="rounded-sm border border-gold/60 bg-gold/10 px-8 py-4 text-xs uppercase tracking-wider-xs text-gold hover:bg-gold/20">
                Открыть Цифровой код
              </Link>
            )}
            <Link to="/" className="text-xs uppercase tracking-wider-xs text-muted-foreground hover:text-gold">
              В начало
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const [y, m, d] = journey.birthDate!.split("-").map(Number);
  const date = new Date(y!, m! - 1, d!);
  const chart = buildChart(date);
  const myth = buildMyth(journey.mythAnswers!);
  const s = synthesize(chart, journey.mythAnswers!);

  return (
    <main className="mx-auto max-w-3xl px-6 pb-28 pt-20">
      <header className="animate-rise text-center">
        <p className="text-xs uppercase tracking-wider-xs text-gold/80">Встреча зеркал</p>
        <h1 className="mt-6 text-4xl leading-tight text-balance sm:text-6xl">
          Две версии одного человека
        </h1>
      </header>

      <div className="mt-16 flex flex-wrap items-center justify-center gap-x-2 gap-y-8">
        <div className="text-center">
          <ArchetypeEmblem number={chart.soul.archetype.n} variant="obsidian" size={150} />
          <p className="mt-4 text-xs uppercase tracking-wider-xs text-gold/80">Код</p>
          <p className="mt-1 text-sm text-muted-foreground">{formatDate(date)}</p>
        </div>
        <span className="animate-veil px-2 text-3xl text-gold/60">·</span>
        <div className="text-center">
          <Ring size={150} />
          <p className="mt-4 text-xs uppercase tracking-wider-xs text-gold/80">Миф</p>
          <p className="mt-1 max-w-[9rem] text-sm text-muted-foreground">{myth.keyName}</p>
        </div>
      </div>

      <p className="mx-auto mt-14 max-w-xl text-center text-[17px] leading-relaxed text-foreground/85">
        Эти две версии появились независимо. Одна — из даты. Другая — из ваших образов. Они
        ничего не доказывают, но подсвечивают главное.
      </p>

      <section className="mt-16">
        <p className="text-xs uppercase tracking-wider-xs text-gold/80">✨ Параллели</p>
        <div className="mt-6 space-y-4">
          {s.parallels.map((p, i) => (
            <div key={i} className="rounded-sm border border-border bg-card/40 p-6 text-[16px] leading-relaxed text-foreground/85 backdrop-blur-sm">
              {p}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <p className="text-xs uppercase tracking-wider-xs text-gold/80">⚖️ Расхождение</p>
        <div className="mt-6 rounded-sm border border-gold/30 bg-gold/5 p-6 text-[16px] leading-relaxed text-foreground/85">
          {s.divergence}
        </div>
      </section>

      <section className="mt-14 border-y border-gold/30 py-10 text-center">
        <p className="text-xs uppercase tracking-wider-xs text-gold/80">🪞 Вопрос</p>
        <p className="mx-auto mt-5 max-w-xl text-[19px] leading-relaxed text-foreground/90">
          {s.question}
        </p>
      </section>

      <div className="mt-14 text-center">
        <a
          href={TELEGRAM}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-sm border border-gold/60 bg-gold/15 px-10 py-4 text-xs uppercase tracking-wider-xs text-gold transition-all hover:bg-gold/25 hover:shadow-[var(--shadow-halo)]"
        >
          Обсудить это с Альбертом
        </a>
        <p className="mt-5 text-xs text-muted-foreground">Диалог продолжается в Telegram.</p>
      </div>

      <div className="mt-16 flex flex-wrap justify-center gap-6 text-xs uppercase tracking-wider-xs text-muted-foreground">
        <Link to="/myth" className="hover:text-gold">Личный миф</Link>
        <Link to="/code" search={{ d: journey.birthDate! }} className="hover:text-gold">Цифровой код</Link>
        <Link to="/" className="hover:text-gold">В начало</Link>
      </div>
    </main>
  );
}
