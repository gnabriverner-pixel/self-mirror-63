/**
 * DONOR MODULE — personal-relief · DEMO DATA
 * ЯВНО ДЕМО. Это произвольные комбинации чисел для стресс-проверки композиции.
 * Никакого расчёта, никакой персонализации. DO NOT PORT.
 */
import type { ArchetypeNumber } from "../archetype-art";
import type { ReliefMaterial, ReliefPosition } from "./personalReliefTypes";

export type DemoRelief = {
  id: string;
  title: string;
  material: ReliefMaterial;
  /** [soul, action, realization, tension, vector] */
  numbers: [ArchetypeNumber, ArchetypeNumber, ArchetypeNumber, ArchetypeNumber, ArchetypeNumber];
  note: string;
};

export const DEMO_RELIEFS: DemoRelief[] = [
  { id: "d01", title: "Демо 01", material: "alabaster", numbers: [6, 8, 5, 1, 9], note: "плотная масса, резкий выход" },
  { id: "d02", title: "Демо 02", material: "obsidian", numbers: [1, 2, 3, 4, 5], note: "последовательный набор" },
  { id: "d03", title: "Демо 03", material: "alabaster", numbers: [9, 9, 9, 9, 9], note: "предельная однородность" },
  { id: "d04", title: "Демо 04", material: "obsidian", numbers: [7, 4, 2, 8, 1], note: "пустота против веса" },
  { id: "d05", title: "Демо 05", material: "alabaster", numbers: [3, 5, 7, 2, 6], note: "разомкнутая структура" },
  { id: "d06", title: "Демо 06", material: "obsidian", numbers: [8, 1, 6, 5, 3], note: "ось и раскрытие" },
  { id: "d07", title: "Демо 07", material: "alabaster", numbers: [2, 7, 4, 9, 8], note: "смещение и разрез" },
  { id: "d08", title: "Демо 08", material: "obsidian", numbers: [5, 3, 1, 6, 2], note: "траектория внутри ядра" },
  { id: "d09", title: "Демо 09", material: "alabaster", numbers: [4, 6, 8, 3, 7], note: "разлом в мягком материале" },
  { id: "d10", title: "Демо 10", material: "obsidian", numbers: [1, 1, 1, 1, 1], note: "предельная минимальность" },
  { id: "d11", title: "Демо 11", material: "alabaster", numbers: [9, 2, 5, 7, 4], note: "высокая плотность" },
  { id: "d12", title: "Демо 12", material: "obsidian", numbers: [3, 8, 9, 1, 6], note: "низкая плотность, много воздуха" },
];

export const DEMO_SLOT_LABELS = ["soul", "action", "realization", "tension", "vector"] as const;

export function demoPositions(d: DemoRelief): ReliefPosition[] {
  const [soul, action, realization, tension, vector] = d.numbers;
  return [
    { slot: "soul", archetype: soul, weight: 0.7, label: "Центр" },
    { slot: "action", archetype: action, weight: 0.5, label: "Направление" },
    { slot: "realization", archetype: realization, weight: 0.6, label: "Оболочка" },
    { slot: "tension", archetype: tension, weight: 0.45, label: "Разрыв" },
    { slot: "vector", archetype: vector, weight: 0.5, label: "Выход" },
  ];
}
