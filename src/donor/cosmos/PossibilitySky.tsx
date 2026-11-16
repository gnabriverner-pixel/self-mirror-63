import { useId, useMemo, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  POSSIBILITIES,
  buildConstellation,
  hashPossibility,
  type PossibilityId,
} from "./possibilities";
import "./cosmos.css";

type PossibilitySkyProps = {
  still?: boolean;
};

export function PossibilitySky({ still = false }: PossibilitySkyProps) {
  const id = useId().replace(/:/g, "");
  const [selectedId, setSelectedId] = useState<PossibilityId>("freedom");
  const [dream, setDream] = useState("");
  const [committedDream, setCommittedDream] = useState("");
  const selected = POSSIBILITIES.find((item) => item.id === selectedId) ?? POSSIBILITIES[0];
  const source = `${selected.id}|${committedDream}`;
  const points = useMemo(() => buildConstellation(source), [source]);
  const seed = hashPossibility(source);
  const tilt = (seed % 100) - 50;
  const coreRadius = 32 + (seed % 15);
  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`)
    .join(" ");

  function submitDream(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = dream.trim();
    if (value) setCommittedDream(value);
  }

  return (
    <section
      id="possible"
      className="possibility-sky"
      data-still={still ? "yes" : "no"}
      aria-labelledby="possibility-title"
    >
      <header className="possibility-heading">
        <p className="cosmos-kicker">Интерактивная карта возможного</p>
        <h2 id="possibility-title">Что в тебе просится наружу?</h2>
        <p>Не тест и не диагноз. Просто выбери направление, к которому хочется повернуться.</p>
      </header>

      <div className="possibility-layout">
        <figure className="constellation-figure">
          <svg key={source} className="constellation-art" viewBox="0 0 640 640" aria-hidden="true">
            <defs>
              <radialGradient id={`${id}-core`} cx="35%" cy="28%" r="72%">
                <stop offset="0%" stopColor="var(--cosmos-core-high)" />
                <stop offset="58%" stopColor="var(--cosmos-core-mid)" />
                <stop offset="100%" stopColor="var(--cosmos-core-low)" />
              </radialGradient>
              <filter id={`${id}-glow`} x="-200%" y="-200%" width="400%" height="400%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g className="constellation-orbits" transform={`rotate(${tilt} 320 320)`}>
              <ellipse cx="320" cy="320" rx="254" ry="174" />
              <ellipse cx="320" cy="320" rx="208" ry="252" transform="rotate(58 320 320)" />
              <circle cx="320" cy="320" r="276" />
            </g>

            <g className="constellation-lines">
              <path d={path} />
              <path
                d={`M${points[0]?.x ?? 320} ${points[0]?.y ?? 320} L320 320 L${points[5]?.x ?? 320} ${points[5]?.y ?? 320}`}
              />
            </g>

            <circle className="constellation-core-shadow" cx="320" cy="320" r={coreRadius + 16} />
            <circle
              className="constellation-core"
              cx="320"
              cy="320"
              r={coreRadius}
              fill={`url(#${id}-core)`}
            />
            <circle className="constellation-core-line" cx="320" cy="320" r={coreRadius + 9} />

            <g className="constellation-stars" filter={`url(#${id}-glow)`}>
              {points.map((point, index) => (
                <g key={`${point.x}-${point.y}`}>
                  <circle cx={point.x} cy={point.y} r={point.radius} />
                  {index % 3 === 0 && (
                    <path
                      d={`M${point.x - 9} ${point.y} H${point.x + 9} M${point.x} ${point.y - 9} V${point.y + 9}`}
                    />
                  )}
                </g>
              ))}
            </g>

            <g className="constellation-traveller">
              <circle cx="320" cy="68" r="5" />
              <circle cx="320" cy="68" r="12" />
            </g>
          </svg>
          <figcaption>
            <p className="constellation-number">0{POSSIBILITIES.indexOf(selected) + 1} / 06</p>
            <blockquote>{selected.phrase}</blockquote>
            <p className="constellation-question">{selected.question}</p>
          </figcaption>
        </figure>

        <div className="possibility-controls">
          <div className="possibility-options" role="group" aria-label="Направление возможного">
            {POSSIBILITIES.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={selectedId === item.id}
                onClick={() => setSelectedId(item.id)}
              >
                <span aria-hidden="true">0{index + 1}</span>
                {item.label}
                <ArrowUpRight aria-hidden="true" />
              </button>
            ))}
          </div>

          <form className="dream-form" onSubmit={submitDream}>
            <label htmlFor={`${id}-dream`}>Какую мечту ты разрешаешь себе увидеть?</label>
            <textarea
              id={`${id}-dream`}
              value={dream}
              onChange={(event) => setDream(event.target.value)}
              placeholder="Например: жить у моря и создавать…"
              rows={3}
              maxLength={120}
              required
            />
            <div className="dream-form-footer">
              <p>Только на этом экране. Ничего не отправляется.</p>
              <button type="submit">
                Поместить в пространство
                <ArrowUpRight aria-hidden="true" />
              </button>
            </div>
          </form>

          <div className="dream-result" aria-live="polite">
            {committedDream ? (
              <>
                <p className="cosmos-kicker">Твоя звезда появилась</p>
                <blockquote>«{committedDream}»</blockquote>
                <p>
                  Это не обещание и не план. Это направление, которое стало видимым — потому что ты
                  его увидел.
                </p>
              </>
            ) : (
              <p>Можно начать с выбора выше. Мечте не обязательно быть точной.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
