/**
 * DONOR MODULE — personal-relief
 * COMPOSITION LAW — детерминированная грамматика.
 * Один и тот же набор чисел всегда даёт одну и ту же композицию. Никакого random().
 */
import type { ArchetypeNumber } from "../archetype-art";
import type {
  ReliefLayout,
  ReliefPlacement,
  ReliefPosition,
  ReliefSlot,
} from "./personalReliefTypes";

const rad = (deg: number) => (deg * Math.PI) / 180;
const r2 = (v: number) => Math.round(v * 100) / 100;

const ROLE: Record<ReliefSlot, string> = {
  soul: "центр массы: вокруг него собран весь предмет",
  action: "направление: сила, которая выводит массу из покоя",
  realization: "внешняя раскрывающая форма: оболочка, в которой всё стоит",
  tension: "разрыв: смещённая масса и отрицательное пространство",
  vector: "выход: сторона, в которую разворачивается вся композиция",
};

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function bySlot(positions: ReliefPosition[]) {
  const map = new Map<ReliefSlot, ReliefPosition>();
  for (const p of positions) if (!map.has(p.slot)) map.set(p.slot, p);
  return map;
}

/** вес → множитель масштаба, узкий диапазон: композиция не должна разваливаться */
const wScale = (w: number | undefined) => 0.9 + clamp(w ?? 0.5, 0, 1) * 0.2;

export function composeRelief(positions: ReliefPosition[]): ReliefLayout {
  const map = bySlot(positions);
  const num = (s: ReliefSlot): ArchetypeNumber => map.get(s)?.archetype ?? 1;

  const soul = num("soul");
  const action = num("action");
  const realization = num("realization");
  const tension = num("tension");
  const vector = num("vector");

  // Направление действия: три устойчивых художественных угла, выбор детерминирован.
  const actionAngle = [-58, -34, -12][action % 3]!;
  // Разрыв всегда в противоположной полусфере, но не строго напротив.
  const tensionAngle = actionAngle + 148 + (tension % 4) * 14;
  // Выход — низ композиции, с небольшим детерминированным наклоном.
  const exitAngle = 92 + (((vector + soul) % 5) - 2) * 12;

  const density = clamp(0.28 + ((action + tension + vector) % 7) / 14, 0.25, 0.78);
  const spread = 38 - density * 9; // плотнее → радиусы меньше

  const lightAngle = 18 + ((realization * 7 + soul * 3) % 5) * 11;

  const at = (angle: number, r: number) => ({
    x: r2(50 + Math.cos(rad(angle)) * r),
    y: r2(50 + Math.sin(rad(angle)) * r * 0.92),
  });

  const aPt = at(actionAngle, spread * 0.86);
  const tPt = at(tensionAngle, spread * 0.94);
  const vPt = at(exitAngle, spread * 1.12);

  const placements: ReliefPlacement[] = [
    {
      slot: "realization",
      archetype: realization,
      x: 50,
      y: 49,
      size: r2(104 * wScale(map.get("realization")?.weight)),
      rotate: ((realization % 5) - 2) * 3,
      z: 1,
      step: 4,
      role: ROLE["realization"],
    },
    {
      slot: "soul",
      archetype: soul,
      x: 50,
      y: r2(50 - density * 2),
      size: r2(46 * wScale(map.get("soul")?.weight)),
      rotate: 0,
      z: 4,
      step: 1,
      role: ROLE["soul"],
    },
    {
      slot: "action",
      archetype: action,
      x: aPt.x,
      y: aPt.y,
      size: r2(27 * wScale(map.get("action")?.weight)),
      rotate: r2(actionAngle / 6),
      z: 3,
      step: 2,
      role: ROLE["action"],
    },
    {
      slot: "tension",
      archetype: tension,
      x: tPt.x,
      y: tPt.y,
      size: r2(23 * wScale(map.get("tension")?.weight)),
      rotate: r2(-tensionAngle / 8),
      z: 5,
      step: 3,
      role: ROLE["tension"],
    },
    {
      slot: "vector",
      archetype: vector,
      x: vPt.x,
      y: vPt.y,
      size: r2(21 * wScale(map.get("vector")?.weight)),
      rotate: r2((exitAngle - 90) / 4),
      z: 2,
      step: 4,
      role: ROLE["vector"],
    },
  ];

  // Линия разлома проходит через точку напряжения поперёк оси выхода.
  const fAngle = tensionAngle + 90;
  const f1 = { x: tPt.x - Math.cos(rad(fAngle)) * 70, y: tPt.y - Math.sin(rad(fAngle)) * 70 };
  const f2 = { x: tPt.x + Math.cos(rad(fAngle)) * 70, y: tPt.y + Math.sin(rad(fAngle)) * 70 };

  return {
    placements,
    exitAngle,
    lightAngle,
    density: r2(density),
    fracture: { x1: r2(f1.x), y1: r2(f1.y), x2: r2(f2.x), y2: r2(f2.y) },
    axis: { x1: 50, y1: r2(50 - density * 2), x2: vPt.x, y2: vPt.y },
  };
}

/** Порядок слотов в reveal-хореографии. */
export const REVEAL_ORDER: ReliefSlot[] = ["soul", "action", "tension", "realization", "vector"];
