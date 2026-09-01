# DONOR EXPORT v1 — self-mirror-63

**Этот репозиторий — не production source of truth.**
Это дизайн-лаборатория. Отсюда переносятся визуальные и интеракционные модули,
и НЕ переносится ничего, что похоже на расчётное или генеративное ядро продукта.

## SAFE TO PORT

Переносимо в production после review. Зависимости — только React (+ CSS-файл модуля).

| Модуль | Путь | Что даёт |
| --- | --- | --- |
| Archetype Emblem | `src/donor/archetype-art/ArchetypeEmblem.tsx` | Публичный компонент объекта: `number` 1–9, `variant`, `size`, `motion` |
| Archetype Geometry | `src/donor/archetype-art/ArchetypeGeometry.tsx` | Девять пластических SVG-систем (масса, гравировка, подпись движения) |
| Art tokens | `src/donor/archetype-art/archetypeTokens.ts` | Числа-типы, размеры, материалы, art-direction подписи |
| Motion law | `src/donor/archetype-art/archetypeMotion.ts` | Правила движения и карта ambient-эффектов |
| Material CSS | `src/donor/archetype-art/archetype-art.css` | Алебастр/обсидиан, рельеф, свет, reduced-motion |
| Symbolic portrait (R&D) | `src/donor/symbolic-portrait/*` | Композиция из нескольких объектов как один артефакт |
| Showcase-паттерн | `src/routes/donor.archetypes.tsx` | Способ ревью визуальной системы, не пользовательский экран |
| Смысловой документ | `docs/DONOR_PRODUCT_MEANING_v1.md` | Voice law, experience law, границы языка |

Также переносимы как ориентир (не как код): типографика Cormorant Garamond + Manrope,
OKLCH-палитра тёмной сцены, ритуал постепенного раскрытия, идея двух дверей.

## DO NOT PORT

Ни при каких условиях не считать источником продуктовой истины:

- `src/lib/numerology.ts` — неканонический расчёт, демо-математика.
- `src/lib/myth.ts` — локальный генератор истории, не продуктовый движок.
- `src/lib/meeting.ts` — локальный синтез «встречи зеркал», не методология.
- `src/lib/practice.ts` — демо-практики, не редакционный контент.
- `src/lib/journey.ts` — демо-состояние пользователя в localStorage.
- Любые тексты интерпретаций из `src/lib/archetypes.ts` — как контент требуют
  отдельной редактуры, как методология не канон.
- Все demo-комбинации в `src/donor/symbolic-portrait/SymbolicPortrait.tsx`
  (`DEMO_COMPOSITIONS`) — произвольные числа для визуальной проверки.
- Любая логика ценообразования, CTA-формулировки и упоминания Альберта как
  готового продукта.

## Для будущего агента

Если задача звучит как «возьми расчёт из self-mirror-63» — задача сформулирована
неверно. Отсюда берут форму, свет, материал, движение и правила языка.
