/**
 * DONOR MODULE — personal-relief
 * Только типы визуального слоя. Ни расчётов, ни методологии, ни копирайта продукта.
 */
import type { ArchetypeNumber, EmblemVariant } from "../archetype-art";
import type { MotionMode } from "../archetype-art";

/** Пять пространственных функций композиции. Это НЕ смысловые позиции методологии. */
export const RELIEF_SLOTS = ["soul", "action", "realization", "tension", "vector"] as const;
export type ReliefSlot = (typeof RELIEF_SLOTS)[number];

export type ReliefPosition = {
  slot: ReliefSlot;
  archetype: ArchetypeNumber;
  /** относительный вес позиции 0…1; влияет только на масштаб. По умолчанию 0.5 */
  weight?: number;
  /** подпись позиции, приходит извне (продукт), не из модуля */
  label?: string;
  /** короткая расшифровка объекта, приходит извне */
  caption?: string;
};

export type ReliefMaterial = EmblemVariant;

/** Что композиционная грамматика вычислила для одной позиции. */
export type ReliefPlacement = {
  slot: ReliefSlot;
  archetype: ArchetypeNumber;
  /** центр в процентах поля */
  x: number;
  y: number;
  /** сторона объекта в процентах поля */
  size: number;
  rotate: number;
  /** порядок слоёв */
  z: number;
  /** порядок появления в reveal-хореографии */
  step: number;
  /** пространственная функция человеческим языком (art direction, не методология) */
  role: string;
};

export type ReliefLayout = {
  placements: ReliefPlacement[];
  /** угол общего выхода композиции, град. */
  exitAngle: number;
  /** угол бокового света, град. */
  lightAngle: number;
  /** плотность 0…1: насколько тесно стоят массы */
  density: number;
  /** линия разлома: две точки в процентах поля */
  fracture: { x1: number; y1: number; x2: number; y2: number };
  /** ось выхода: от центра массы к точке выхода */
  axis: { x1: number; y1: number; x2: number; y2: number };
};

export type PersonalReliefProps = {
  positions: ReliefPosition[];
  material?: ReliefMaterial;
  motion?: MotionMode;
  /** "staged" — сигнатурная хореография; "instant" — сразу финальная композиция */
  reveal?: "staged" | "instant";
  /** смена значения перезапускает хореографию */
  revealKey?: string | number;
  /** очень короткая человеческая фраза; появляется в конце последовательности */
  statement?: string;
  /** доступное описание артефакта целиком */
  summary?: string;
  /** какой слот сейчас подсвечен снаружи (provenance) */
  focus?: ReliefSlot | null;
  /** подсветить пару «разрыва» */
  focusPair?: [ReliefSlot, ReliefSlot] | null;
  onRevealEnd?: () => void;
  className?: string;
};
