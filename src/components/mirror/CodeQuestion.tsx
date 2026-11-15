import { useEffect, useRef, useState } from "react";
import { Send, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Chart } from "@/lib/numerology";

export function CodeQuestion({ chart }: { chart: Chart }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [stopped, setStopped] = useState(false);
  const active = useRef<AbortController | null>(null);
  useEffect(() => () => active.current?.abort(), []);
  const ask = async (value: string) => {
    if (!value.trim() || busy) return;
    setQuestion(value); setAnswer(""); setReasoning(""); setError(""); setStopped(false); setBusy(true);
    const controller = new AbortController(); active.current = controller;
    try {
      const response = await fetch("/api/public/code-question", {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal,
        body: JSON.stringify({ question: value, positions: chart.positions.map(({ key, value }) => ({ key, value })) }),
      });
      if (!response.ok) { const body = await response.json(); throw new Error(body.message ?? "AI недоступен."); }
      if (!response.body) throw new Error("Ответ не получен.");
      const reader = response.body.getReader(); const decoder = new TextDecoder(); let pending = "";
      while (true) {
        const chunk = await reader.read();
        pending += decoder.decode(chunk.value, { stream: !chunk.done });
        const lines = pending.split("\n"); pending = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const part = JSON.parse(line);
          if (part.type === "text") setAnswer((text) => text + part.text);
          if (part.type === "reasoning") setReasoning((text) => text + part.text);
          if (part.type === "error") setError(part.message);
        }
        if (chunk.done) break;
      }
    } catch (failure) {
      if (controller.signal.aborted) setStopped(true);
      else setError(failure instanceof Error ? failure.message : "Не удалось получить ответ.");
    } finally { setBusy(false); active.current = null; }
  };
  return <section className="mt-12 border-y border-border py-8" aria-labelledby="code-question-title">
    <h3 id="code-question-title" className="text-3xl">Вопрос к вашей карте</h3>
    <div className="mt-5 flex flex-wrap gap-2">{["Как связаны моя душа и действие?", "Откуда берётся напряжение в моей карте?", "Как мой вектор связан с реализацией?"].map((q) => <Button key={q} variant="outline" className="min-h-11 h-auto whitespace-normal text-left" disabled={busy} onClick={() => void ask(q)}>{q}</Button>)}</div>
    <form className="mt-6" onSubmit={(e) => { e.preventDefault(); void ask(question); }}>
      <label htmlFor="code-question" className="text-sm text-muted-foreground">Ваш вопрос</label>
      <textarea id="code-question" value={question} onChange={(e) => setQuestion(e.target.value)} maxLength={2000} required disabled={busy} rows={3} className="mt-2 block w-full rounded-sm border border-input bg-background p-4 text-base focus-visible:outline focus-visible:outline-ring" />
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">В AI Gateway отправятся вопрос и пять позиций, без даты рождения. Ответ — символическая гипотеза, не диагноз.</p>
      <div className="mt-4 flex gap-3"><Button type="submit" className="min-h-11" disabled={busy || !question.trim()}><Send aria-hidden="true" />Задать вопрос</Button>{busy && <Button type="button" variant="outline" className="min-h-11" onClick={() => active.current?.abort()}><Square aria-hidden="true" />Остановить</Button>}</div>
    </form>
    {busy && !answer && <p className="mt-6 text-sm text-muted-foreground" role="status">Альберт рассматривает связи…</p>}
    {reasoning && <details className="mt-6"><summary className="min-h-11 cursor-pointer text-sm text-muted-foreground">Ход рассмотрения</summary><p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{reasoning}</p></details>}
    {answer && <article aria-label="Ответ Альберта" className="mt-8 whitespace-pre-wrap break-words text-base leading-relaxed">{answer}</article>}
    {stopped && <p className="mt-4 text-sm text-muted-foreground">Ответ остановлен. Полученная часть сохранена на экране.</p>}
    {error && <p role="alert" className="mt-5 text-sm text-destructive">{error}</p>}
  </section>;
}