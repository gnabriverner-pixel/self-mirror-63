/**
 * DONOR MODULE — archetype-art
 * Портируемые визуальные токены системы девяти объектов.
 * Здесь нет никакой бизнес-логики, расчётов и интерпретаций.
 */

export const ARCHETYPE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export type ArchetypeNumber = (typeof ARCHETYPE_NUMBERS)[number];

export function isArchetypeNumber(v: unknown): v is ArchetypeNumber {
  return typeof v === "number" && Number.isInteger(v) && v >= 1 && v <= 9;
}

export type EmblemVariant = "alabaster" | "obsidian";
export type EmblemSize = "sm" | "md" | "lg";

export const EMBLEM_SIZE_PX: Record<EmblemSize, number> = {
  sm: 96,
  md: 168,
  lg: 288,
};

/** Только подписи и пластическая характеристика объекта — не методология. */
export type ArchetypeArtToken = {
  n: ArchetypeNumber;
  sanskrit: string;
  planet: string;
  /** одно слово-имя объекта */
  object: string;
  /** art direction: как ведёт себя материал и свет */
  material: string;
  /** art direction: характер единственного движения */
  motion: string;
};

export const ARCHETYPE_ART: Record<ArchetypeNumber, ArchetypeArtToken> = {
  1: {
    n: 1,
    sanskrit: "Сурья",
    planet: "Солнце",
    object: "Ядро",
    material: "гладкий алебастр, собранный вокруг высверленного центра",
    motion: "один скользящий луч по рельефу",
  },
  2: {
    n: 2,
    sanskrit: "Чандра",
    planet: "Луна",
    object: "Фаза",
    material: "полированный камень с одной затенённой половиной",
    motion: "очень медленный ход внутренней тени",
  },
  3: {
    n: 3,
    sanskrit: "Брихаспати",
    planet: "Юпитер",
    object: "Раскрытие",
    material: "многослойный барельеф, дуги выступают одна из другой",
    motion: "едва заметное раскрытие дуг",
  },
  4: {
    n: 4,
    sanskrit: "Раху",
    planet: "Раху",
    object: "Сдвиг",
    material: "расколотая плита: две части не совпадают по свету",
    motion: "контролируемое смещение границы",
  },
  5: {
    n: 5,
    sanskrit: "Будха",
    planet: "Меркурий",
    object: "Траектория",
    material: "тонкая гравировка по матовому металлу",
    motion: "линия находит путь между узлами",
  },
  6: {
    n: 6,
    sanskrit: "Шукра",
    planet: "Венера",
    object: "Согласие",
    material: "мягкий гипс, симметричные лепестковые доли",
    motion: "небольшое дыхание формы",
  },
  7: {
    n: 7,
    sanskrit: "Кету",
    planet: "Кету",
    object: "Отсутствие",
    material: "вырезанная пустота, контур существует только частично",
    motion: "часть контура появляется и растворяется",
  },
  8: {
    n: 8,
    sanskrit: "Шани",
    planet: "Сатурн",
    object: "Ось",
    material: "тяжёлый обсидиан с кольцом и глубокой тенью",
    motion: "почти неподвижен; работает только свет",
  },
  9: {
    n: 9,
    sanskrit: "Мангала",
    planet: "Марс",
    object: "Разрез",
    material: "камень с одним точным разрезом",
    motion: "одно короткое направленное проявление",
  },
};