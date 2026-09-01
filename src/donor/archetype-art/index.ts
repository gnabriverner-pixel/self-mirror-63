/**
 * DONOR MODULE — archetype-art
 * Портируемый визуальный модуль: девять архетипических объектов.
 * Зависимости: только React. Никакой бизнес-логики продукта.
 */
export { ArchetypeEmblem, type ArchetypeEmblemProps } from "./ArchetypeEmblem";
export { ArchetypeGeometry } from "./ArchetypeGeometry";
export {
  ARCHETYPE_ART,
  ARCHETYPE_NUMBERS,
  EMBLEM_SIZE_PX,
  isArchetypeNumber,
  type ArchetypeArtToken,
  type ArchetypeNumber,
  type EmblemSize,
  type EmblemVariant,
} from "./archetypeTokens";
export { AMBIENT, REVEAL_MS, type MotionMode } from "./archetypeMotion";
