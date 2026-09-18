import { useEffect, useMemo, useState } from "react";
import type { MythAnswers } from "@/lib/journey";
import "./myth-artifact.css";

type MythArtifactProps = {
  answers: MythAnswers;
  title: string;
  keyName: string;
  keyLine: string;
};

const hash = (value: string) => {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
};

const point = (seed: number, offset: number, min: number, span: number) =>
  min + ((seed >>> offset) % span);

export function MythArtifact({ answers, title, keyName, keyLine }: MythArtifactProps) {
  const [revealed, setRevealed] = useState(false);
  const geometry = useMemo(() => {
    const seed = hash(Object.values(answers).join("|"));
    const cx = point(seed, 2, 45, 11);
    const cy = point(seed, 7, 43, 15);
    const tilt = point(seed, 12, -14, 29);
    const opening = point(seed, 17, 18, 21);
    const horizon = point(seed, 21, 43, 18);
    return { seed, cx, cy, tilt, opening, horizon };
  }, [answers]);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setRevealed(true);
      return;
    }
    setRevealed(false);
    const timer = window.setTimeout(() => setRevealed(true), 2400);
    return () => window.clearTimeout(timer);
  }, [geometry.seed]);

  const summary = `Личный миф «${title}». Четыре образа собраны в один рельеф: туман — ${answers.fog}; текущее состояние — ${answers.state}; живой момент — ${answers.alive}; недостающее движение — ${answers.missing}. Центральный ключ — ${keyName}.`;

  return (
    <figure className="ma-artifact" data-revealed={revealed ? "yes" : "no"}>
      <div className="ma-surface" role="img" aria-label={summary}>
        <div className="ma-stone" aria-hidden="true" />
        <div className="ma-heading">
          <span>Первое зеркало · Личный миф</span>
          <h1>{title}</h1>
        </div>

        <svg className="ma-relief" viewBox="0 0 100 116" aria-hidden="true">
          <g className="ma-field" transform={`rotate(${geometry.tilt} 50 58)`}>
            <path
              d={`M12 ${geometry.horizon} C 25 ${geometry.horizon - 8}, 38 ${geometry.horizon + 8}, 50 ${geometry.horizon} S 76 ${geometry.horizon - 8}, 90 ${geometry.horizon + 2}`}
            />
            <path
              d={`M16 ${geometry.horizon + 7} C 31 ${geometry.horizon - 1}, 43 ${geometry.horizon + 15}, 57 ${geometry.horizon + 4} S 78 ${geometry.horizon}, 87 ${geometry.horizon + 11}`}
            />
          </g>

          <g className="ma-veil">
            <path d={`M8 25 Q ${geometry.cx} 8 92 27 Q 76 45 50 39 Q 25 46 8 25Z`} />
            <path d={`M12 31 Q ${geometry.cx - 8} 19 88 34`} />
            <path d={`M18 37 Q ${geometry.cx + 7} 25 82 40`} />
          </g>

          <g className="ma-memory" transform={`translate(${geometry.cx} ${geometry.cy})`}>
            <ellipse rx="31" ry="25" />
            <ellipse rx="23" ry="18" />
            <ellipse rx="14" ry="11" />
            <path d="M-26 9 Q-8 -21 18 -17 Q34 -2 19 19 Q-3 31 -26 9Z" />
          </g>

          <g className="ma-key" transform={`translate(${geometry.cx} ${geometry.cy}) rotate(${geometry.tilt * -0.35})`}>
            <circle cx="0" cy="0" r="5.5" />
            <path d={`M0 5.5 V${geometry.opening + 24} M0 ${geometry.opening + 13} H10 M0 ${geometry.opening + 19} H6`} />
          </g>

          <g className="ma-exit">
            <path d={`M${geometry.cx} ${geometry.cy + 28} L${geometry.cx + geometry.tilt / 2} 107`} />
            <path d={`M${geometry.cx - 8} 103 L${geometry.cx + geometry.tilt / 2} 111 L${geometry.cx + 9} 103`} />
          </g>
        </svg>

        <div className="ma-light" aria-hidden="true" />
        <div className="ma-inscription">
          <span>Ключ вашей истории</span>
          <strong>{keyName}</strong>
          <p>{keyLine}</p>
        </div>
        <div className="ma-edge" aria-hidden="true" />
      </div>
      <figcaption className="ma-caption">Четыре ваших образа. Один предмет.</figcaption>
    </figure>
  );
}