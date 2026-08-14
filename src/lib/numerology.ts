import { ARCHETYPES, type Archetype } from "./archetypes";

export type Position = {
  key: string;
  label: string;
  question: string;
  /** путь чисел: [35, 8] */
  path: number[];
  value: number;
  archetype: Archetype;
};

export type Chart = {
  date: Date;
  positions: Position[];
  soul: Position;
  action: Position;
  realization: Position;
  vector: Position;
  tension: Position;
  digits: number[];
  missing: number[];
};

const digitsOf = (n: number) => String(n).split("").map(Number);

/** сводит число к 1–9, сохраняя путь */
function reducePath(n: number): number[] {
  const path = [n];
  let cur = n;
  while (cur > 9) {
    cur = digitsOf(cur).reduce((a, b) => a + b, 0);
    path.push(cur);
  }
  return path;
}

function makePosition(
  key: string,
  label: string,
  question: string,
  raw: number,
): Position {
  const path = reducePath(raw);
  const value = path[path.length - 1];
  return { key, label, question, path, value, archetype: ARCHETYPES[value] };
}

export function buildChart(date: Date): Chart {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  const all = [...digitsOf(d), ...digitsOf(m), ...digitsOf(y)];
  const sumAll = all.reduce((a, b) => a + b, 0);

  const soul = makePosition("soul", "Ваша душа", "Кто вы внутри, до всех ролей", d);
  const action = makePosition(
    "action",
    "Как вы действуете",
    "Каким способом вы входите в мир",
    d + m,
  );
  const realization = makePosition(
    "realization",
    "Где энергия ищет выход",
    "Через что вы реализуетесь",
    sumAll,
  );
  const vector = makePosition(
    "vector",
    "Ваш вектор реализации",
    "Куда естественнее всего разворачивать жизнь",
    soul.value + realization.value,
  );
  const diff = Math.abs(soul.value - action.value) || Math.abs(soul.value - realization.value) || 9;
  const tension = makePosition(
    "tension",
    "Место внутреннего напряжения",
    "Что спорит внутри вас",
    diff,
  );

  const present = new Set(all.filter((x) => x !== 0));
  const missing = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((x) => !present.has(x));

  return {
    date,
    positions: [soul, action, realization, vector, tension],
    soul,
    action,
    realization,
    vector,
    tension,
    digits: all,
    missing,
  };
}

/** Текст встречи двух сил — механизм, а не список качеств */
export function meeting(a: Archetype, b: Archetype): string {
  if (a.n === b.n) {
    return `Здесь одна и та же сила звучит дважды. То, что требует ${a.demand}, не встречает внутри себя противовеса: это даёт ${a.gift}, но лишает вас внутреннего спора, который обычно останавливает вовремя. Когда никто не возражает изнутри, ${a.cost}.`;
  }
  return `Одна часть вашей формулы требует ${a.demand}. Другая — ${b.demand}. Вместе они дают ${a.gift}, но в плохие дни ${b.cost} — и тогда ${a.cost.replace(/^вы /, "вы же ")}.`;
}

export function tensionText(a: Archetype, b: Archetype): string {
  return `Внутри вас живут две потребности, которые редко договариваются. Одной нужно ${a.demand}. Другой — ${b.demand}. Это не поломка характера: именно из этого спора берётся ваша сложность. Проблема начинается только тогда, когда одна сторона надолго побеждает — тогда ${b.cost}.`;
}

export const MONTHS = [
  "января","февраля","марта","апреля","мая","июня",
  "июля","августа","сентября","октября","ноября","декабря",
];

export const formatDate = (d: Date) =>
  `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;