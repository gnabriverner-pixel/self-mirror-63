# DONOR EXPORT v2 — Personal Relief

Дополняет `DONOR_EXPORT_v1.md`, не заменяет его. Всё перечисленное ниже проверено на 390×844, 768×1024 и 1440×1000; evidence pack — `screenshots/donor-v2/` (12 состояний).

## SAFE TO PORT

### 1. PersonalRelief — персональный рельеф из пяти сил

Файлы:
- `src/donor/personal-relief/PersonalRelief.tsx`
- `src/donor/personal-relief/personal-relief.css`
- `src/donor/personal-relief/personalReliefTypes.ts`
- `src/donor/personal-relief/personalReliefComposition.ts`
- `src/donor/personal-relief/index.ts`

Зависимости: React + `src/donor/archetype-art/` (`ArchetypeGeometry`, `ARCHETYPE_ART`, `archetype-art.css`). Никаких анимационных библиотек, никакого знания о нумерологии внутри.

Props (`PersonalReliefProps`):
- `positions: ReliefPosition[]` — пять записей `{ slot, archetype: 1–9, weight: 0–1, label?, caption? }`; слоты: `soul | action | realization | tension | vector`.
- `material?: "alabaster" | "obsidian"` (default `alabaster`).
- `motion?: "auto" | "reduced"` (default `auto`).
- `reveal?: "staged" | "instant"` (default `staged`).
- `revealKey?: string | number` — смена ключа перезапускает раскрытие.
- `statement?: string` — одна короткая человеческая фраза после сборки.
- `summary?: string` — доступное текстовое описание артефакта (`role="img"`).
- `focus?: ReliefSlot | null`, `focusPair?: ReliefSlot[] | null` — подсветка позиции/пары на объекте.
- `onRevealEnd?: () => void`, `className?: string`.

Композиционная грамматика (`composeRelief`): детерминированная, без `random()`. SOUL → центр массы; ACTION → направление/вектор; REALIZATION → внешняя оболочка; TENSION → разрыв/отрицательное пространство; VECTOR → сторона выхода. Порядок раскрытия: soul → action → tension → realization → vector; ступени `STAGE_MS = [0, 200, 700, 1400, 2100, 2900, 3900]`, финал ~4.5 с.

Reduced motion: `prefers-reduced-motion` или `motion="reduced"` → финальная композиция почти сразу (стадия 6, переходы 1 мс), без потери информации; скользящий свет отключён.

CSS: `personal-relief.css` опирается на токены `--aa-*` из `archetype-art.css` и семантические переменные темы (`--gold`, `--border`, `--foreground`, `--muted-foreground`, `--shadow-lift`, `--veil`).

### 2. ReliefProvenance — паттерн «узнавание → основание»

Файл: `src/donor/personal-relief/ReliefProvenance.tsx` (стили в `personal-relief.css`).

Props: `positions`, `focus`, `onFocus`, опциональные `heading` и `disclaimer`. Список «подпись позиции → объект → роль в композиции» с кнопками «показать на объекте» (aria-pressed, keyboard-доступно). По умолчанию свёрнут — раскрывается по tap.

### 3. MythArtifact — личный миф как монолитный рельеф

Файлы:
- `src/donor/myth-artifact/MythArtifact.tsx`
- `src/donor/myth-artifact/myth-artifact.css`
- `src/donor/myth-artifact/index.ts`

Props: `answers: { fog, state, alive, missing: string }`, `title`, `keyName`, `keyLine`. Детерминированная геометрия из хеша ответов; reveal 2.4 с; reduced motion → сразу финальное состояние. Зависимости: только React и токены темы.

### 4. Улучшения archetype-art

Объект №4 (Раху) — затмение: две несовпадающие половины и смещённый тёмный диск в разорванном кольце. Правило motion law сохранено: entrance/reveal/hover + максимум одно тихое ambient (только у 2, 6, 7).

## DO NOT PORT

- `src/lib/numerology.ts` — локальный расчёт карты.
- `src/lib/myth.ts`, `src/lib/meeting.ts` — генераторы сказки и встречи.
- `src/lib/journey.ts` — journey state в localStorage (`mirror_journey_v1`).
- `src/donor/personal-relief/demoReliefs.ts` — 12 произвольных demo-комбинаций (явно DEMO).
- `src/components/mirror/CodeRelief.tsx` — продуктовая обвязка (веса, фразы, связка с расчётом); использовать как пример интеграции, не как модуль.
- Демо-копирайт, цены, продуктовые утверждения Альберта, псевдоперсонализация шоурумов.

## Known limitations

- Веса позиций в продуктовой интеграции (`CodeRelief`) подобраны вручную, не выведены из методологии.
- MythArtifact кодирует ответы только через хеш: смысл слов на геометрию не влияет.
- Скриншоты сняты на dev-сборке; production-кадры могут отличаться subpixel-рендерингом.
