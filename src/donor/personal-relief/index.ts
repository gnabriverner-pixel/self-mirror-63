/**
 * DONOR MODULE — personal-relief
 * Экспортируемый визуальный модуль: пять сил как один рельеф.
 * Зависимости: React + ../archetype-art. Никакой продуктовой логики.
 */
export { PersonalRelief } from "./PersonalRelief";
export { ReliefProvenance } from "./ReliefProvenance";
export { composeRelief, REVEAL_ORDER } from "./personalReliefComposition";
export {
  RELIEF_SLOTS,
  type PersonalReliefProps,
  type ReliefLayout,
  type ReliefMaterial,
  type ReliefPlacement,
  type ReliefPosition,
  type ReliefSlot,
} from "./personalReliefTypes";
export { DEMO_RELIEFS, demoPositions, type DemoRelief } from "./demoReliefs";
export type { MotionMode as MotionModeAlias } from "../archetype-art";
