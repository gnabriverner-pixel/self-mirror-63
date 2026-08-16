import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Ring } from "@/components/mirror/Ring";
import { useJourney, type MythAnswers } from "@/lib/journey";
import { buildMyth, MYTH_QUESTIONS } from "@/lib/myth";

export const Route = createFileRoute("/myth")({
  head: () => ({
    meta: [
      { title: "Личный миф — сказка про тебя · Зеркало себя" },
      {
        name: "description",
        content:
          "Четыре образных вопроса — и литературная история, собранная из ваших собственных символов: ключ, сказка и один зеркальный вопрос.",
      },
      { property: "og:title", content: "Личный миф — сказка про тебя" },
      {
        property: "og:description",
        content: "Первое зеркало: история, рождающаяся из ваших образов, а не из даты.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MythPage,
});

const EMPTY: MythAnswers = { fog: "", state: "", alive: "", missing: "" };

function MythPage() {
  const navigate = useNavigate();
  const { journey, update, ready } = useJourney();
  const [answers, setAnswers] = useState<MythAnswers>(EMPTY);
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"ask" | "loading" | "result">("ask");

  useEffect(() => {
    if (ready && journey.mythDone && journey.mythAnswers) {
      setAnswers(journey.mythAnswers);
      setPhase("result");
    }
  }, [ready, journey.mythDone, journey.mythAnswers]);

  useEffect(() => {
    if (phase !== "loading") return;
    const t = setTimeout(() => {
      setPhase("result");
      update({ mythDone: true, mythAnswers: answers, mythTitle: buildMyth(answers).title });
    }, 2600);
    return () => clearTimeout(t);
  }, [phase, answers, update]);

  const q = MYTH_QUESTIONS[step]!;
  const value = answers[q.id];

  if (phase === "loading") {
    return (
      <main className="grid min-h-[100svh] place-items-center px-6 text-center">
        <div className="animate-rise">
          <Ring size={220} />
          <p className="mt-12 text-[17px] leading-relaxed text-foreground/80">
            История собирается из ваших образов…
          </p>
          <p className="mt-3 text-xs uppercase tracking-wider-xs text-gold/70">Дышите ровно</p>
        </div>
      </main>
    );
  }

  if (phase === "result") {
    const myth = buildMyth(answers);
    return (
      <main className="mx-auto max-w-3xl px-6 pb-28 pt-20">
        <div className="animate-rise text-center">
          <p className="text-xs uppercase tracking-wider-xs text-gold/80">Первое зеркало · Личный миф</p>
          <h1 className="mt-6 text-4xl leading-tight text-balance sm:text-6xl">{myth.title}</h1>
        </div>

        <div className="mt-16 flex flex-col items-center text-center">
          <Ring size={200} />
          <p className="mt-8 text-xs uppercase tracking-wider-xs text-gold/80">Ключ вашей истории</p>
          <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">{myth.keyName}</h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            {myth.keyLine}
          </p>
        </div>

        <article className="mt-16 space-y-7 text-[18px] leading-[1.85] text-foreground/88">
          {myth.story.map((p, i) => (
            <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-[var(--font-display)] first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-gold" : ""}>
              {p}
            </p>
          ))}
        </article>

        <section className="mt-16 rounded-sm border border-border bg-card/40 p-7 backdrop-blur-sm">
          <p className="text-xs uppercase tracking-wider-xs text-gold/80">
            Из каких ваших образов она родилась
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {MYTH_QUESTIONS.map((mq) => (
              <span
                key={mq.id}
                className="max-w-full break-words rounded-sm border border-gold/30 bg-gold/5 px-4 py-2 text-sm text-foreground/85"
              >
                {answers[mq.id]}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-12 border-y border-gold/30 py-10 text-center">
          <p className="text-xs uppercase tracking-wider-xs text-gold/80">Зеркальный вопрос</p>
          <p className="mx-auto mt-5 max-w-xl text-[19px] leading-relaxed text-foreground/90">
            {myth.question}
          </p>
        </section>

        <div className="mt-14 flex flex-col items-center gap-4">
          {journey.codeDone ? (
            <Link
              to="/meeting"
              className="rounded-sm border border-gold/60 bg-gold/15 px-9 py-4 text-center text-xs uppercase tracking-wider-xs text-gold transition-all hover:bg-gold/25 hover:shadow-[var(--shadow-halo)]"
            >
              Перейти ко Встрече зеркал
            </Link>
          ) : (
            <Link
              to="/"
              hash="врата"
              className="rounded-sm border border-gold/60 bg-gold/10 px-9 py-4 text-center text-xs uppercase tracking-wider-xs text-gold transition-all hover:bg-gold/20 hover:shadow-[var(--shadow-halo)]"
            >
              Открыть второе зеркало · Цифровой код
            </Link>
          )}
          <Link to="/" className="text-xs uppercase tracking-wider-xs text-muted-foreground hover:text-gold">
            В начало
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[100svh] max-w-2xl flex-col justify-center px-6 py-20">
      <div key={q.id} className="animate-rise">
        <p className="text-xs uppercase tracking-wider-xs text-gold/80">
          {step + 1} / {MYTH_QUESTIONS.length} · {q.index}
        </p>
        <h1 className="mt-6 text-3xl leading-tight text-balance sm:text-5xl">{q.title}</h1>
        <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{q.hint}</p>
        <textarea
          value={value}
          onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
          placeholder={q.placeholder}
          rows={4}
          className="mt-9 w-full resize-none rounded-sm border border-border bg-card/40 p-5 text-[17px] leading-relaxed text-foreground outline-none backdrop-blur-sm transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60"
        />
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            disabled={value.trim().length < 2}
            onClick={() =>
              step === MYTH_QUESTIONS.length - 1
                ? setPhase("loading")
                : setStep((s) => s + 1)
            }
            className="rounded-sm border border-gold/60 bg-gold/10 px-8 py-4 text-xs uppercase tracking-wider-xs text-gold transition-all hover:bg-gold/20 hover:shadow-[var(--shadow-halo)] disabled:cursor-not-allowed disabled:opacity-35"
          >
            {step === MYTH_QUESTIONS.length - 1 ? "Собрать историю" : "Дальше"}
          </button>
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="text-xs uppercase tracking-wider-xs text-muted-foreground hover:text-gold"
            >
              Назад
            </button>
          )}
          <button
            onClick={() => navigate({ to: "/" })}
            className="ml-auto text-xs uppercase tracking-wider-xs text-muted-foreground/70 hover:text-gold"
          >
            Выйти
          </button>
        </div>
        <div className="mt-12 flex gap-2">
          {MYTH_QUESTIONS.map((_, i) => (
            <span
              key={i}
              className={`h-px flex-1 transition-colors ${i <= step ? "bg-gold/70" : "bg-border"}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
