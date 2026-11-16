export const POSSIBILITIES = [
  {
    id: "freedom",
    label: "Свобода",
    phrase: "Пространство появляется там, где ты разрешаешь себе выбирать.",
    question: "Что могло бы стать твоим «по-своему»?",
  },
  {
    id: "create",
    label: "Создавать",
    phrase: "То, чего ещё нет, может начаться с твоего любопытства.",
    question: "Что хочется сделать просто потому, что это интересно?",
  },
  {
    id: "love",
    label: "Любить",
    phrase: "Можно становиться ближе к другим — и не терять себя.",
    question: "Где тебе хочется быть по-настоящему открытым?",
  },
  {
    id: "courage",
    label: "Смелость",
    phrase: "Смелость не всегда громкая. Иногда это тихое «попробую».",
    question: "Какой шаг кажется маленьким, но настоящим?",
  },
  {
    id: "joy",
    label: "Радость",
    phrase: "Радости не нужно оправдание. Она может быть смыслом сама по себе.",
    question: "Что возвращает тебе вкус к жизни?",
  },
  {
    id: "wonder",
    label: "Мечтать",
    phrase: "Мечта показывает не обязательство, а пространство, куда хочется смотреть.",
    question: "Что ты ещё не разрешил себе даже представить?",
  },
] as const;

export type PossibilityId = (typeof POSSIBILITIES)[number]["id"];

export type ConstellationPoint = {
  x: number;
  y: number;
  radius: number;
};

export function hashPossibility(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

export function buildConstellation(value: string): ConstellationPoint[] {
  const seed = hashPossibility(value);
  const offset = seed % 72;
  return Array.from({ length: 9 }, (_, index) => {
    const angle = ((index * 137.508 + offset) * Math.PI) / 180;
    const distance = 70 + ((seed >>> (index * 3)) % 112);
    return {
      x: Math.round((320 + Math.cos(angle) * distance * 1.15) * 100) / 100,
      y: Math.round((320 + Math.sin(angle) * distance) * 100) / 100,
      radius: 2.2 + ((seed >>> ((index * 2) % 28)) % 4),
    };
  });
}
