import { useState } from "react";
import { PersonalRelief, ReliefProvenance, type ReliefPosition, type ReliefSlot } from "@/donor/personal-relief";
import { isArchetypeNumber, type ArchetypeNumber } from "@/donor/archetype-art";
import type { Chart } from "@/lib/numerology";

/**
 * Продуктовая обвязка донорского модуля: карта → props рельефа.
 * Сам модуль ничего не знает о расчёте; здесь только сопоставление.
 */
const n = (v: number): ArchetypeNumber => (isArchetypeNumber(v) ? v : 1);

export function CodeRelief({ chart }: { chart: Chart }) {
  const [done, setDone] = useState(false);
  const [focus, setFocus] = useState<ReliefSlot | null>(null);
  const [pair, setPair] = useState(false);
  const [run, setRun] = useState(0);

  const positions: ReliefPosition[] = [
    { slot: "soul", archetype: n(chart.soul.value), weight: 0.72, label: chart.soul.label, caption: chart.soul.archetype.title },
    { slot: "action", archetype: n(chart.action.value), weight: 0.55, label: chart.action.label, caption: chart.action.archetype.title },
    { slot: "realization", archetype: n(chart.realization.value), weight: 0.6, label: chart.realization.label, caption: chart.realization.archetype.title },
    { slot: "tension", archetype: n(chart.tension.value), weight: 0.45, label: chart.tension.label, caption: chart.tension.archetype.title },
    { slot: "vector", archetype: n(chart.vector.value), weight: 0.5, label: chart.vector.label, caption: chart.vector.archetype.title },
  ];

  const statement = `Заметнее всего здесь спор между ${chart.soul.archetype.title.toLowerCase()} и ${chart.tension.archetype.title.toLowerCase()}.`;

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-center text-xs uppercase tracking-wider-xs text-gold/80">Ваш рельеф</p>
      <h2 className="mt-4 text-center text-4xl leading-tight sm:text-5xl">
        Пять сил как один предмет
      </h2>

      <div className="mt-10">
        <PersonalRelief
          key={`relief-${run}`}
          positions={positions}
          material="obsidian"
          motion="auto"
          reveal={run === 0 ? "staged" : "instant"}
          statement={statement}
          summary={`Персональный рельеф: ${positions
            .map((p) => `${p.label} — объект ${p.archetype}`)
            .join("; ")}.`}
          focus={focus}
          focusPair={pair ? ["soul", "tension"] : null}
          onRevealEnd={() => setDone(true)}
        />
      </div>

      {!done && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setDone(true);
              setRun((v) => v + 1);
            }}
            className="min-h-11 text-xs uppercase tracking-wider-xs text-muted-foreground hover:text-gold"
          >
            Показать сразу
          </button>
        </div>
      )}

      {done && (
        <div className="animate-rise mt-8 space-y-6">
          <div className="text-center">
            <button
              type="button"
              aria-pressed={pair}
              onClick={() => {
                setPair((v) => !v);
                setFocus(null);
              }}
              className="min-h-11 rounded-sm border border-gold/50 px-6 text-xs uppercase tracking-wider-xs text-gold"
            >
              {pair ? "Снять подсветку" : "Показать это напряжение на объекте"}
            </button>
            <button
              type="button"
              onClick={() => {
                setDone(false);
                setPair(false);
                setFocus(null);
                setRun(0);
              }}
              className="ml-2 min-h-11 px-4 text-xs uppercase tracking-wider-xs text-muted-foreground hover:text-foreground"
            >
              Повторить сборку
            </button>
          </div>

          <ReliefProvenance
            positions={positions}
            focus={focus}
            onFocus={(s) => {
              setFocus(s);
              setPair(false);
            }}
            heading="Почему карта выглядит именно так?"
          />
        </div>
      )}
    </div>
  );
}
