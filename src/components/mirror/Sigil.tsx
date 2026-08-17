/**
 * Уникальный символ-сигил для каждого из девяти архетипов.
 * Рисуется поверх сферы тонкой золотой линией и «прорисовывается» при появлении.
 */
export function Sigil({ n, className = "" }: { n: number; className?: string }) {
  const s = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g {...s} strokeWidth={1.1} className="sigil-draw">
        {glyph(n)}
      </g>
    </svg>
  );
}

function glyph(n: number) {
  switch (n) {
    // Солнце — центр и лучи
    case 1:
      return (
        <>
          <circle cx="100" cy="100" r="26" />
          <circle cx="100" cy="100" r="3.5" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI) / 6;
            const r1 = 36, r2 = i % 2 ? 48 : 62;
            return (
              <line
                key={i}
                x1={px(Math.cos(a) * (r1))}
                y1={px(Math.sin(a) * (r1))}
                x2={px(Math.cos(a) * (r2))}
                y2={px(Math.sin(a) * (r2))}
              />
            );
          })}
        </>
      );
    // Луна — серп и волны
    case 2:
      return (
        <>
          <path d="M126 58a48 48 0 1 0 0 84 56 56 0 0 1 0-84z" />
          <path d="M56 158c10-9 20-9 30 0s20 9 30 0 20-9 30 0" />
          <path d="M64 46c8-7 16-7 24 0" />
        </>
      );
    // Юпитер — раскрывающиеся дуги / лотос роста
    case 3:
      return (
        <>
          <path d="M100 46c22 20 34 40 34 60s-15 34-34 46c-19-12-34-26-34-46s12-40 34-60z" />
          <path d="M100 60v92" />
          <path d="M100 96c-14-6-24-16-28-30M100 96c14-6 24-16 28-30" />
          <circle cx="100" cy="100" r="66" strokeDasharray="3 9" strokeWidth={0.6} />
        </>
      );
    // Раху — затмение, разорванное кольцо, змея
    case 4:
      return (
        <>
          <circle cx="100" cy="100" r="34" strokeDasharray="34 14" />
          <path d="M46 132c14-14 22 14 36 0s22 14 36 0 22 14 36 0" />
          <path d="M74 62c10-14 42-14 52 0" strokeDasharray="4 6" />
        </>
      );
    // Меркурий — сеть связей
    case 5:
      return (
        <>
          {[0, 1, 2, 3, 4].map((i) => {
            const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
            return <circle key={i} cx={px(Math.cos(a) * (50))} cy={px(Math.sin(a) * (50))} r="4" />;
          })}
          <path
            d={Array.from({ length: 5 })
              .map((_, i) => {
                const a = (((i * 2) % 5) * 2 * Math.PI) / 5 - Math.PI / 2;
                return `${i ? "L" : "M"}${px(Math.cos(a) * (50))} ${px(Math.sin(a) * (50))}`;
              })
              .join(" ") + " Z"}
            strokeWidth={0.7}
          />
          <circle cx="100" cy="100" r="8" />
        </>
      );
    // Венера — лотос
    case 6:
      return (
        <>
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse key={i} cx="100" cy="70" rx="16" ry="34" transform={`rotate(${i * 60} 100 100)`} />
          ))}
          <circle cx="100" cy="100" r="9" />
        </>
      );
    // Кету — комета, знамя, спираль ухода
    case 7:
      return (
        <>
          <path d="M100 40v92" />
          <path d="M100 44c26 4 34 14 34 22s-8 16-34 20" />
          <path
            d="M100 132c-18 0-30 8-30 18s12 16 30 16 32-6 32-16"
            strokeDasharray="5 7"
          />
          <circle cx="100" cy="36" r="4" />
        </>
      );
    // Сатурн — квадрат в кольце, ось времени
    case 8:
      return (
        <>
          <rect x="66" y="66" width="68" height="68" />
          <rect x="66" y="66" width="68" height="68" transform="rotate(45 100 100)" strokeWidth={0.6} />
          <ellipse cx="100" cy="100" rx="76" ry="26" transform="rotate(-18 100 100)" />
          <line x1="100" y1="100" x2="100" y2="66" strokeWidth={0.8} />
        </>
      );
    // Марс — острие
    default:
      return (
        <>
          <path d="M100 42l44 78H56z" />
          <path d="M100 74l22 40H78z" strokeWidth={0.7} />
          <path d="M62 140h76" />
          <path d="M100 150v18" />
        </>
      );
  }
}