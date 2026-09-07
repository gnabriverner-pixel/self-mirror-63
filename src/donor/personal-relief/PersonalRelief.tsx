import { useEffect, useMemo, useRef, useState } from "react";
import { ArchetypeGeometry, ARCHETYPE_ART } from "../archetype-art";
import "../archetype-art/archetype-art.css";
import { composeRelief } from "./personalReliefComposition";
import type { PersonalReliefProps, ReliefSlot } from "./personalReliefTypes";
import "./personal-relief.css";

/**
 * DONOR MODULE — personal-relief
 * ОДИН персональный артефакт из пяти архетипических пластических систем.
 * Компонент ничего не знает о нумерологии: он получает уже готовые числа 1–9.
 * Зависимости: React + archetype-art (SVG/CSS). Никаких анимационных библиотек.
 */

/** Ступени сигнатурного раскрытия. */
const STAGE_MS = [0, 200, 700, 1400, 2100, 2900, 3900] as const;
const END_MS = 4500;

export function PersonalRelief({
  positions,
  material = "alabaster",
  motion = "auto",
  reveal = "staged",
  revealKey,
  statement,
  summary,
  focus = null,
  focusPair = null,
  onRevealEnd,
  className = "",
}: PersonalReliefProps) {
  const layout = useMemo(() => composeRelief(positions), [positions]);
  const [stage, setStage] = useState(reveal === "staged" && motion === "auto" ? 0 : 6);
  const endRef = useRef(onRevealEnd);
  endRef.current = onRevealEnd;

  useEffect(() => {
    const staged = reveal === "staged" && motion === "auto" && !prefersReduced();
    if (!staged) {
      setStage(6);
      const t = window.setTimeout(() => endRef.current?.(), 160);
      return () => window.clearTimeout(t);
    }
    setStage(0);
    const timers = STAGE_MS.map((ms, i) => window.setTimeout(() => setStage(i), ms));
    timers.push(window.setTimeout(() => endRef.current?.(), END_MS));
    return () => timers.forEach(window.clearTimeout);
  }, [reveal, motion, revealKey]);

  const active = (slot: ReliefSlot) =>
    focus === slot || (focusPair ? focusPair.includes(slot) : false);
  const anyFocus = focus !== null || focusPair !== null;

  const label =
    summary ??
    "Персональный рельеф: один объект, собранный из пяти архетипических форм.";

  return (
    <figure
      className={`pr-relief ${className}`}
      data-material={material}
      data-stage={stage}
      data-motion={motion}
      data-focused={anyFocus ? "yes" : "no"}
      style={
        {
          "--pr-light": `${layout.lightAngle}deg`,
          "--pr-exit": `${layout.exitAngle}deg`,
        } as React.CSSProperties
      }
    >
      <div className="pr-field" role="img" aria-label={label}>
        <div className="pr-plate" aria-hidden="true" />
        <div className="pr-grain" aria-hidden="true" />

        <svg className="pr-structure" viewBox="0 0 100 100" aria-hidden="true">
          <line
            className="pr-axis"
            x1={layout.axis.x1}
            y1={layout.axis.y1}
            x2={layout.axis.x2}
            y2={layout.axis.y2}
          />
          <line
            className="pr-fracture"
            x1={layout.fracture.x1}
            y1={layout.fracture.y1}
            x2={layout.fracture.x2}
            y2={layout.fracture.y2}
          />
        </svg>

        {layout.placements.map((p) => (
          <div
            key={p.slot}
            className="pr-object"
            data-slot={p.slot}
            data-step={p.step}
            data-active={active(p.slot) ? "yes" : "no"}
            aria-hidden="true"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}%`,
              zIndex: p.z,
              transform: `translate(-50%, -50%) rotate(${p.rotate}deg)`,
            }}
          >
            <div className="pr-object-inner">
              <ArchetypeGeometry n={p.archetype} />
            </div>
          </div>
        ))}

        <div className="pr-light" aria-hidden="true" />
        <div className="pr-edge" aria-hidden="true" />
      </div>

      {statement && (
        <figcaption className="pr-statement" data-shown={stage >= 6 ? "yes" : "no"}>
          {statement}
        </figcaption>
      )}

      {/* Текстовый эквивалент артефакта: artwork не должен быть смысловым тупиком */}
      <ul className="pr-sr">
        {layout.placements.map((p) => {
          const src = positions.find((x) => x.slot === p.slot);
          const token = ARCHETYPE_ART[p.archetype];
          return (
            <li key={p.slot}>
              {src?.label ?? p.slot}: объект {p.archetype} · {token.sanskrit} · {token.object}.{" "}
              Роль в композиции — {p.role}.
            </li>
          );
        })}
      </ul>
    </figure>
  );
}

function prefersReduced() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
