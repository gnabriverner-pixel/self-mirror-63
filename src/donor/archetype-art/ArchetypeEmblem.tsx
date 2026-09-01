import { ArchetypeGeometry } from "./ArchetypeGeometry";
import {
  ARCHETYPE_ART,
  EMBLEM_SIZE_PX,
  isArchetypeNumber,
  type EmblemSize,
  type EmblemVariant,
} from "./archetypeTokens";
import { AMBIENT, type MotionMode } from "./archetypeMotion";
import "./archetype-art.css";

/**
 * DONOR MODULE — archetype-art
 * Один архетипический объект: плита из материала + рельеф + одно движение.
 * Принимает ТОЛЬКО числа 1–9. Некорректное значение не превращается в «1».
 */
export type ArchetypeEmblemProps = {
  number: number;
  variant?: EmblemVariant;
  size?: EmblemSize | number;
  motion?: MotionMode;
  /** подпись для скринридера; по умолчанию объект декоративен */
  label?: string;
  className?: string;
};

export function ArchetypeEmblem({
  number,
  variant = "alabaster",
  size = "md",
  motion = "auto",
  label,
  className = "",
}: ArchetypeEmblemProps) {
  if (!isArchetypeNumber(number)) {
    if (import.meta.env.DEV) {
      // Явная ошибка вместо silent fallback на Солнце.
      throw new Error(
        `[archetype-art] ArchetypeEmblem: number must be an integer 1–9, received ${JSON.stringify(number)}`,
      );
    }
    return (
      <div
        className={`aa-emblem aa-emblem--invalid ${className}`}
        style={{ width: sizePx(size), height: sizePx(size) }}
        role="img"
        aria-label="Объект недоступен"
      />
    );
  }

  const token = ARCHETYPE_ART[number];
  const px = sizePx(size);

  return (
    <figure
      className={`aa-emblem ${className}`}
      data-variant={variant}
      data-n={number}
      data-motion={motion}
      data-ambient={AMBIENT[number] ? "on" : "off"}
      style={{ width: px, height: px }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      title={undefined}
    >
      <div className="aa-plate" />
      <div className="aa-grain" />
      <ArchetypeGeometry n={number} />
      <div className="aa-shadow-edge" />
      <figcaption className="aa-caption-sr">
        {token.n} · {token.sanskrit} · {token.object}
      </figcaption>
    </figure>
  );
}

function sizePx(size: EmblemSize | number) {
  return typeof size === "number" ? size : EMBLEM_SIZE_PX[size];
}
