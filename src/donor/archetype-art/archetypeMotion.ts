import type { ArchetypeNumber } from "./archetypeTokens";

/**
 * DONOR MODULE — archetype-art
 * MOTION LAW: появление → проход света → проявление геометрии → покой.
 * Ambient-движение допускается максимум одно на объект и только очень тихое.
 */
export type MotionMode = "auto" | "reduced" | "still";

/** Длительность фазы «оживления» объекта, мс. После неё экран успокаивается. */
export const REVEAL_MS = 6200;

/** У каких объектов вообще есть ambient-движение (по одному тихому эффекту). */
export const AMBIENT: Record<ArchetypeNumber, boolean> = {
  1: false,
  2: true, // ход внутренней тени
  3: false,
  4: false,
  5: false,
  6: true, // дыхание формы
  7: true, // растворение части контура
  8: false, // почти неподвижен
  9: false,
};