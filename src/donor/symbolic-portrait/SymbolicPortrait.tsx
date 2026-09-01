import { ArchetypeEmblem } from "../archetype-art";
import type { ArchetypeNumber, EmblemVariant } from "../archetype-art";
import type { MotionMode } from "../archetype-art";
import "./symbolic-portrait.css";

/**
 * DONOR MODULE — symbolic-portrait (VISUAL R&D)
 * Композиция из нескольких архетипических объектов как один художественный артефакт.
 * Это НЕ расчёт и НЕ портрет человека. Только проверка визуальной гипотезы.
 */
export type PortraitComposition = {
  id: string;
  /** ведущий объект композиции */
  primary: ArchetypeNumber;
  /** второй план */
  secondary: ArchetypeNumber;
  /** контрапункт: то, что спорит с ведущим */
  counter: ArchetypeNumber;
  material: EmblemVariant;
  /** угол падения света, град. */
  light: number;
  /** плотность композиции: 0 — воздух, 1 — тесно */
  density: number;
  title: string;
  note: string;
};

export function SymbolicPortrait({
  composition,
  motion = "auto",
}: {
  composition: PortraitComposition;
  motion?: MotionMode;
}) {
  const c = composition;
  const counterMaterial: EmblemVariant = c.material === "obsidian" ? "alabaster" : "obsidian";
  return (
    <figure
      className="sp-portrait"
      style={
        {
          "--sp-light": `${c.light}deg`,
          "--sp-gap": `${Math.round(72 - c.density * 44)}px`,
        } as React.CSSProperties
      }
    >
      <div className="sp-field" aria-hidden="true">
        <div className="sp-object sp-object--primary">
          <ArchetypeEmblem number={c.primary} variant={c.material} size={224} motion={motion} />
        </div>
        <div className="sp-object sp-object--secondary">
          <ArchetypeEmblem number={c.secondary} variant={c.material} size={132} motion={motion} />
        </div>
        <div className="sp-object sp-object--counter">
          <ArchetypeEmblem number={c.counter} variant={counterMaterial} size={96} motion={motion} />
        </div>
      </div>
      <figcaption className="sp-caption">
        <p className="sp-title">{c.title}</p>
        <p className="sp-note">{c.note}</p>
        <p className="sp-meta">
          {c.primary} · {c.secondary} · {c.counter} — демо-комбинация, не расчёт
        </p>
      </figcaption>
    </figure>
  );
}

/** DEMO DATA — произвольные комбинации для визуальной проверки. */
export const DEMO_COMPOSITIONS: PortraitComposition[] = [
  {
    id: "demo-a",
    primary: 6,
    secondary: 8,
    counter: 9,
    material: "alabaster",
    light: 28,
    density: 0.3,
    title: "Светлый камень с осью и разрезом",
    note: "Мягкая симметрия держится на тяжёлой структуре, а один точный разрез не даёт композиции стать декоративной.",
  },
  {
    id: "demo-b",
    primary: 2,
    secondary: 7,
    counter: 1,
    material: "obsidian",
    light: 62,
    density: 0.75,
    title: "Тёмная фаза и пустота",
    note: "Две формы, работающие тенью и отсутствием, и один плотный источник света рядом с ними.",
  },
  {
    id: "demo-c",
    primary: 5,
    secondary: 3,
    counter: 4,
    material: "alabaster",
    light: 104,
    density: 0.55,
    title: "Траектория в раскрывающемся поле",
    note: "Сеть переходов внутри растущей структуры; смещённая плита рядом мешает системе замкнуться.",
  },
];
