import { useState } from "react";

export function DateEntry({ onSubmit }: { onSubmit: (d: Date) => void }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const d = Number(day), m = Number(month), y = Number(year);
    const date = new Date(y, m - 1, d);
    if (
      !d || !m || !y || y < 1900 || y > 2026 ||
      date.getDate() !== d || date.getMonth() !== m - 1
    ) {
      setError("Проверьте дату — кажется, такой не бывает.");
      return;
    }
    setError(null);
    onSubmit(date);
  };

  const field =
    "w-full bg-transparent border-b border-border py-3 text-center text-2xl font-[var(--font-display)] text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-gold";

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-md">
      <div className="grid grid-cols-[1fr_1fr_1.4fr] gap-4">
        <input className={field} inputMode="numeric" maxLength={2} placeholder="ДД"
          value={day} onChange={(e) => setDay(e.target.value.replace(/\D/g, ""))} aria-label="День" />
        <input className={field} inputMode="numeric" maxLength={2} placeholder="ММ"
          value={month} onChange={(e) => setMonth(e.target.value.replace(/\D/g, ""))} aria-label="Месяц" />
        <input className={field} inputMode="numeric" maxLength={4} placeholder="ГГГГ"
          value={year} onChange={(e) => setYear(e.target.value.replace(/\D/g, ""))} aria-label="Год" />
      </div>
      {error && <p className="mt-4 text-center text-sm text-destructive">{error}</p>}
      <button
        type="submit"
        className="mt-10 w-full rounded-sm border border-gold/60 bg-gold/10 px-8 py-4 text-xs uppercase tracking-wider-xs text-gold transition-all hover:bg-gold/20 hover:shadow-[var(--shadow-halo)]"
      >
        Открыть свой код
      </button>
      <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
        Мы ничего о вас не спрашиваем. Сначала — расчёт и интерпретация.
        <br />А потом уже вы решаете, насколько это про вас.
      </p>
    </form>
  );
}