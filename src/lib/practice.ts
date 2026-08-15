import type { Archetype } from "./archetypes";

export type Practice = { observation: string; action: string };

export function practiceFor(a: Archetype): Practice {
  return {
    observation: `Сегодня понаблюдайте, где внутри вас включается потребность ${a.demand}. Не меняйте ничего — просто отметьте момент: что происходило за минуту до, и что вы почувствовали телом.`,
    action: `Один шаг: сделайте что-то, где нужно ${a.demand.replace(/^(признания|тепла)/, "$1")} — но маленькое и заметное только вам. ${a.action} Достаточно одного раза за день, чтобы сила ${a.sanskrit} перестала копиться внутри.`,
  };
}
