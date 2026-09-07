import { useId, useState } from "react";
import { ARCHETYPE_ART } from "../archetype-art";
import { composeRelief } from "./personalReliefComposition";
import type { ReliefPosition, ReliefSlot } from "./personalReliefTypes";
import "./personal-relief.css";

/**
 * DONOR MODULE — personal-relief
 * INTERACTION PATTERN: узнавание → основание.
 * Показывает связь: подпись позиции → объект → роль в композиции.
 * Никаких утверждений об истинности: это интерфейсное представление уже
 * рассчитанной структуры, а не доказательство.
 */
export function ReliefProvenance({
  positions,
  focus,
  onFocus,
  heading = "Почему объект выглядит именно так?",
  disclaimer = "Это интерфейсное представление уже рассчитанной структуры, а не доказательство.",
}: {
  positions: ReliefPosition[];
  focus: ReliefSlot | null;
  onFocus: (slot: ReliefSlot | null) => void;
  heading?: string;
  disclaimer?: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const layout = composeRelief(positions);

  return (
    <div className="pr-prov">
      <button
        type="button"
        className="pr-prov-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          setOpen((v) => !v);
          if (open) onFocus(null);
        }}
      >
        {open ? "Свернуть основание" : heading}
      </button>

      {open && (
        <div className="pr-prov-panel" id={panelId}>
          <ul className="pr-prov-list">
            {layout.placements
              .slice()
              .sort((a, b) => a.step - b.step)
              .map((p) => {
                const src = positions.find((x) => x.slot === p.slot);
                const token = ARCHETYPE_ART[p.archetype];
                const on = focus === p.slot;
                return (
                  <li key={p.slot}>
                    <button
                      type="button"
                      className="pr-prov-item"
                      aria-pressed={on}
                      onClick={() => onFocus(on ? null : p.slot)}
                    >
                      <span className="pr-prov-label">{src?.label ?? p.slot}</span>
                      <span className="pr-prov-arch">
                        {p.archetype} · {token.sanskrit} · {token.object}
                      </span>
                      <span className="pr-prov-role">{p.role}</span>
                      {src?.caption && <span className="pr-prov-note">{src.caption}</span>}
                      <span className="pr-prov-state">{on ? "показано на объекте" : "показать на объекте"}</span>
                    </button>
                  </li>
                );
              })}
          </ul>
          <p className="pr-prov-disclaimer">{disclaimer}</p>
        </div>
      )}
    </div>
  );
}
