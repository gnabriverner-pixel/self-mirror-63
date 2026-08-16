import type { Chart } from "./numerology";
import type { MythAnswers } from "./journey";

export type Synthesis = {
  parallels: string[];
  divergence: string;
  question: string;
  weak: boolean;
};

type Theme = { id: string; name: string; words: string[] };

const THEMES: Theme[] = [
  { id: "control", name: "удержание контроля", words: ["контрол", "порядок", "план", "структур", "держ", "надо", "должен", "ответствен", "дисциплин"] },
  { id: "freedom", name: "свобода и движение", words: ["свобод", "движен", "дорог", "путь", "ехать", "лет", "бег", "простор", "ветер", "поезд"] },
  { id: "voice", name: "право на голос", words: ["сказат", "говор", "голос", "слыш", "молч", "выраз", "показ", "текст", "писа"] },
  { id: "closeness", name: "близость и тепло", words: ["любв", "близ", "тепл", "обним", "семь", "друг", "один", "одинок", "связ"] },
  { id: "rest", name: "усталость и потребность в паузе", words: ["устал", "выгор", "тяжел", "сон", "пауз", "тишин", "покой", "сил нет", "истощ"] },
  { id: "meaning", name: "поиск смысла", words: ["смысл", "зачем", "предназнач", "важн", "глубин", "истин", "вер"] },
  { id: "chaos", name: "запрос на хаос и риск", words: ["хаос", "риск", "спонтан", "авантюр", "сломать", "бросить", "непредсказ", "дик"] },
  { id: "recognition", name: "признание и своё место", words: ["призна", "заметн", "оцен", "успех", "мест", "имя", "уважен"] },
];

const norm = (s: string) => s.toLowerCase().replace(/ё/g, "е");

function themesIn(text: string): Theme[] {
  const t = norm(text);
  return THEMES.filter((th) => th.words.some((w) => t.includes(norm(w))));
}

function themesOfChart(chart: Chart): Theme[] {
  const text = chart.positions
    .map((p) => [p.archetype.demand, p.archetype.essence, p.archetype.outlet, ...p.archetype.light, ...p.archetype.shadow].join(" "))
    .join(" ");
  return themesIn(text);
}

export function synthesize(chart: Chart, answers: MythAnswers): Synthesis {
  const mythText = [answers.fog, answers.state, answers.alive, answers.missing].join(" ");
  const mythThemes = themesIn(mythText);
  const codeThemes = themesOfChart(chart);

  const shared = mythThemes.filter((m) => codeThemes.some((c) => c.id === m.id)).slice(0, 3);
  const onlyCode = codeThemes.filter((c) => !mythThemes.some((m) => m.id === c.id));
  const onlyMyth = mythThemes.filter((m) => !codeThemes.some((c) => c.id === m.id));

  const soul = chart.soul.archetype;
  const vector = chart.vector.archetype;
  const tension = chart.tension.archetype;

  const parallels: string[] = shared.map(
    (t) =>
      `И в Коде, и в Мифе звучит тема «${t.name}». В Коде она приходит через ${soul.sanskrit}: этой части вас нужно ${soul.demand}. В Мифе — через ваш собственный образ, который вы выбрали, ни о какой нумерологии не думая. Совпадение здесь не доказательство, а указание: это сейчас действительно центральная линия.`,
  );

  if (parallels.length < 2) {
    parallels.push(
      `Оба зеркала говорят о движении в одну сторону: Код называет ваш вектор — ${vector.title} (${vector.sanskrit}), а Миф заканчивается тем, что человек делает маленький шаг, не дожидаясь ясности. Разными словами — одно и то же требование: сначала движение, потом понимание.`,
    );
  }
  if (parallels.length < 2) {
    parallels.push(
      `И там, и там появляется одна и та же интонация — ${soul.essence.toLowerCase()} В Коде это позиция души, в Мифе это тон, которым вы описали своё состояние.`,
    );
  }

  const divergence = onlyCode.length
    ? `Код говорит о «${onlyCode[0]!.name}» — этого требует ${vector.sanskrit}. Но ваш Миф сейчас просит другого: ${onlyMyth[0] ? `«${onlyMyth[0].name}»` : "тишины и права не соответствовать"}. Это не ошибка расчёта: чаще всего так выглядит момент, когда природа и текущая жизненная фаза временно расходятся.`
    : `Код описывает вас как устойчивую формулу, а Миф — как человека в переходе. Расхождение здесь в темпе: ${tension.sanskrit} внутри вас требует ${tension.demand}, а образы, которые вы выбрали, говорят о желании остановиться и не требовать от себя ничего.`;

  const weak = shared.length === 0;

  const question = weak
    ? `Два зеркала почти не пересеклись — связь слабая, и это честный результат. Вопрос тогда такой: что вы сейчас проживаете такого, чего ваша природа ещё не знает о вас?`
    : `Где в вашей обычной неделе вы уже делаете то, о чём говорят оба зеркала, — и почему не считаете это важным?`;

  return { parallels: parallels.slice(0, 3), divergence, question, weak };
}
