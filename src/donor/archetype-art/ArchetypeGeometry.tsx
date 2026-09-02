import { useId } from "react";
import type { ArchetypeNumber } from "./archetypeTokens";

/**
 * DONOR MODULE — archetype-art
 * Девять пластических систем. Каждая — самостоятельный объект:
 * масса (рельеф), гравировка (линия) и одно движение-подпись.
 * Никакой смысловой интерпретации здесь нет — только art direction.
 */

const r2 = (v: number) => Math.round(v * 100) / 100;
const cx = (a: number, r: number) => r2(100 + Math.cos(a) * r);
const cy = (a: number, r: number) => r2(100 + Math.sin(a) * r);

export function ArchetypeGeometry({ n }: { n: ArchetypeNumber }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const sheen = `sheen-${uid}`;
  const clip = `clip-${uid}`;

  return (
    <svg viewBox="0 0 200 200" className="aa-geometry" aria-hidden="true">
      <defs>
        <linearGradient id={sheen} x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="var(--aa-sheen)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--aa-sheen)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--aa-sheen)" stopOpacity="0" />
        </linearGradient>
        <clipPath id={clip}>
          <circle cx="100" cy="100" r="86" />
        </clipPath>
      </defs>
      <g className="aa-relief">{shape(n)}</g>
      <g clipPath={`url(#${clip})`}>
        <rect className="aa-sheen-bar" x="-140" y="-40" width="120" height="280" fill={`url(#${sheen})`} />
      </g>
    </svg>
  );
}

function shape(n: ArchetypeNumber) {
  switch (n) {
    // 1 — ЯДРО: масса, собранная вокруг высверленного центра
    case 1:
      return (
        <g className="aa-sig aa-sig-1">
          <circle className="aa-mass" cx="100" cy="100" r="54" />
          <circle className="aa-void" cx="100" cy="100" r="13" />
          <circle className="aa-line" cx="100" cy="100" r="27" />
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * Math.PI) / 12;
            const r1 = 58;
            const r2v = i % 2 ? 68 : 80;
            return (
              <line
                key={i}
                className="aa-line aa-hair"
                x1={cx(a, r1)}
                y1={cy(a, r1)}
                x2={cx(a, r2v)}
                y2={cy(a, r2v)}
              />
            );
          })}
        </g>
      );

    // 2 — ФАЗА: половина формы всегда скрыта
    case 2:
      return (
        <g className="aa-sig aa-sig-2">
          <circle className="aa-mass" cx="100" cy="100" r="58" />
          <path className="aa-shade aa-phase" d="M100 42a58 58 0 0 1 0 116 58 58 0 0 0 0-116z" />
          <circle className="aa-line" cx="100" cy="100" r="58" />
          <circle className="aa-line aa-hair" cx="100" cy="100" r="72" />
          <path className="aa-line aa-hair" d="M52 100a48 22 0 0 0 96 0" />
        </g>
      );

    // 3 — РАСКРЫТИЕ: дуги, выходящие одна из другой
    case 3:
      return (
        <g className="aa-sig aa-sig-3">
          <path className="aa-mass" d="M100 44c26 24 40 46 40 66 0 22-17 38-40 50-23-12-40-28-40-50 0-20 14-42 40-66z" />
          <path className="aa-line" d="M100 58v96" />
          <path className="aa-line" d="M100 106c-16-7-27-19-31-35M100 106c16-7 27-19 31-35" />
          <g className="aa-arc-set">
            <circle className="aa-line aa-hair aa-arc" cx="100" cy="100" r="70" />
            <circle className="aa-line aa-hair aa-arc" cx="100" cy="100" r="82" />
          </g>
        </g>
      );

    // 4 — СДВИГ: затмение, две части не совпадают
    case 4:
      return (
        <g className="aa-sig aa-sig-4">
          <g className="aa-shift-a">
            <path className="aa-mass" d="M100 44a56 56 0 0 1 0 112z" />
            <path className="aa-line" d="M100 44a56 56 0 0 1 0 112z" />
          </g>
          <g className="aa-shift-b">
            <path className="aa-mass" d="M100 44a56 56 0 0 0 0 112z" />
            <path className="aa-line" d="M100 44a56 56 0 0 0 0 112z" />
          </g>
          <circle className="aa-void aa-shift-b" cx="118" cy="88" r="34" />
          <circle className="aa-line aa-hair aa-broken" cx="100" cy="100" r="78" />
        </g>
      );

    // 5 — ТРАЕКТОРИЯ: узлы и линия, ищущая путь
    case 5:
      return (
        <g className="aa-sig aa-sig-5">
          <circle className="aa-void" cx="100" cy="100" r="10" />
          {[0, 1, 2, 3, 4].map((i) => {
            const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
            return <circle key={i} className="aa-node" cx={cx(a, 62)} cy={cy(a, 62)} r="5" />;
          })}
          <path
            className="aa-line aa-trace"
            d={
              Array.from({ length: 5 })
                .map((_, i) => {
                  const a = (((i * 2) % 5) * 2 * Math.PI) / 5 - Math.PI / 2;
                  return `${i ? "L" : "M"}${cx(a, 62)} ${cy(a, 62)}`;
                })
                .join(" ") + " Z"
            }
          />
          <circle className="aa-line aa-hair" cx="100" cy="100" r="80" />
        </g>
      );

    // 6 — СОГЛАСИЕ: симметричные доли
    case 6:
      return (
        <g className="aa-sig aa-sig-6">
          <g className="aa-petals">
            {Array.from({ length: 6 }).map((_, i) => (
              <ellipse
                key={i}
                className="aa-mass"
                cx="100"
                cy="66"
                rx="18"
                ry="34"
                transform={`rotate(${i * 60} 100 100)`}
              />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <ellipse
                key={`l${i}`}
                className="aa-line"
                cx="100"
                cy="66"
                rx="18"
                ry="34"
                transform={`rotate(${i * 60} 100 100)`}
              />
            ))}
          </g>
          <circle className="aa-void" cx="100" cy="100" r="11" />
          <circle className="aa-line aa-hair" cx="100" cy="100" r="84" />
        </g>
      );

    // 7 — ОТСУТСТВИЕ: форма определена тем, чего нет
    case 7:
      return (
        <g className="aa-sig aa-sig-7">
          <circle className="aa-mass" cx="100" cy="100" r="58" />
          <circle className="aa-void" cx="100" cy="100" r="40" />
          <path className="aa-line aa-dissolve" d="M100 42a58 58 0 0 1 41 99" />
          <path className="aa-line aa-hair" d="M100 26v40" />
          <path className="aa-line aa-hair aa-dissolve-2" d="M70 168c8-10 42-10 60 0" />
        </g>
      );

    // 8 — ОСЬ: вес, кольцо, время
    case 8:
      return (
        <g className="aa-sig aa-sig-8">
          <rect className="aa-mass" x="62" y="62" width="76" height="76" />
          <rect className="aa-line" x="62" y="62" width="76" height="76" />
          <rect className="aa-line aa-hair" x="62" y="62" width="76" height="76" transform="rotate(45 100 100)" />
          <ellipse className="aa-line" cx="100" cy="100" rx="84" ry="28" transform="rotate(-18 100 100)" />
          <line className="aa-line" x1="100" y1="62" x2="100" y2="138" />
        </g>
      );

    // 9 — РАЗРЕЗ: импульс и направление
    default:
      return (
        <g className="aa-sig aa-sig-9">
          <path className="aa-mass" d="M100 38l50 88H50z" />
          <path className="aa-line" d="M100 38l50 88H50z" />
          <path className="aa-line aa-hair" d="M100 72l24 44H76z" />
          <line className="aa-line aa-cut" x1="100" y1="30" x2="100" y2="176" />
          <line className="aa-line aa-hair" x1="58" y1="146" x2="142" y2="146" />
        </g>
      );
  }
}