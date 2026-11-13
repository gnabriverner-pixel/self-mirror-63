import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Monitor, Tablet, Smartphone, RotateCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEMO_RELIEFS, PersonalRelief, demoPositions } from "@/donor/personal-relief";
import { MythArtifact } from "@/donor/myth-artifact";
import { DEMO_MYTHS } from "@/donor/gallery/demoMyths";
import { ArtifactViewport } from "@/donor/gallery/ArtifactViewport";
import "@/donor/gallery/gallery.css";

const searchSchema = z.object({
  preview: z.enum(["relief", "myth"]).optional(),
  demo: z.string().optional(),
  motion: z.enum(["auto", "reduced"]).optional(),
  material: z.enum(["alabaster", "obsidian"]).optional(),
  run: z.coerce.string().optional(),
});

export const Route = createFileRoute("/donor/artifacts")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Галерея артефактов — DONOR LAB · Зеркало себя" },
      {
        name: "description",
        content:
          "Сравнение Personal Relief и Личного Мифа на демонстрационных данных и разных размерах экрана.",
      },
      { property: "og:title", content: "Галерея артефактов — DONOR LAB" },
      {
        property: "og:description",
        content: "Два артефакта, демонстрационные наборы, телефон, планшет и большой экран.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ArtifactGallery,
});

function ArtifactGallery() {
  const search = Route.useSearch();
  const [reliefId, setReliefId] = useState("d01");
  const [mythId, setMythId] = useState("m01");
  const [width, setWidth] = useState(390);
  const [motion, setMotion] = useState<"auto" | "reduced">("reduced");
  const [material, setMaterial] = useState<"alabaster" | "obsidian">("alabaster");
  const [run, setRun] = useState(0);
  const relief = DEMO_RELIEFS.find((d) => d.id === (search.demo ?? reliefId)) ?? DEMO_RELIEFS[0];
  const myth = DEMO_MYTHS.find((d) => d.id === (search.demo ?? mythId)) ?? DEMO_MYTHS[0];
  if (!relief || !myth) return null;

  if (search.preview) {
    return (
      <main className="gallery-preview-page">
        <div>
          {search.preview === "relief" ? (
            <PersonalRelief
              positions={demoPositions(relief)}
              material={search.material ?? material}
              motion={search.motion ?? "reduced"}
              reveal={search.motion === "auto" ? "staged" : "instant"}
              summary={`DEMO · ${relief.title}. ${relief.note}.`}
            />
          ) : (
            <MythArtifact {...myth} motion={search.motion ?? "reduced"} />
          )}
        </div>
      </main>
    );
  }
  const src = (preview: "relief" | "myth", demo: string) =>
    `/donor/artifacts?${new URLSearchParams({ preview, demo, motion, material, run: String(run) })}`;
  return (
    <main className="mx-auto min-h-screen max-w-[1600px] px-5 py-10 sm:px-8">
      <nav className="flex flex-wrap gap-2" aria-label="DONOR LAB">
        <Button asChild variant="ghost" className="min-h-11">
          <Link to="/donor/archetypes">
            <ArrowLeft aria-hidden="true" />
            Девять объектов
          </Link>
        </Button>
        <Button asChild variant="ghost" className="min-h-11">
          <Link to="/donor/personal-relief-v2">Personal Relief</Link>
        </Button>
      </nav>
      <p className="mt-8 text-xs text-gold">DONOR LAB · DEMO</p>
      <h1 className="mt-3 text-4xl sm:text-6xl">Галерея артефактов</h1>
      <div className="my-8 flex flex-wrap items-center gap-5 border-y border-border py-4">
        <div className="flex flex-wrap gap-1" role="group" aria-label="Размер экрана">
          {[
            { width: 390, label: "Телефон", Icon: Smartphone },
            { width: 768, label: "Планшет", Icon: Tablet },
            { width: 1440, label: "Большой экран", Icon: Monitor },
          ].map(({ width: w, label, Icon }) => (
            <Button
              key={w}
              variant={width === w ? "secondary" : "ghost"}
              className="min-h-11"
              aria-pressed={width === w}
              onClick={() => setWidth(w)}
            >
              <Icon aria-hidden="true" />
              {label}
            </Button>
          ))}
        </div>
        <div className="flex gap-1" role="group" aria-label="Движение">
          <Button
            className="min-h-11"
            variant={motion === "reduced" ? "secondary" : "ghost"}
            aria-pressed={motion === "reduced"}
            onClick={() => setMotion("reduced")}
          >
            Покой
          </Button>
          <Button
            className="min-h-11"
            variant={motion === "auto" ? "secondary" : "ghost"}
            aria-pressed={motion === "auto"}
            onClick={() => setMotion("auto")}
          >
            Раскрытие
          </Button>
          <Button
            className="min-h-11 min-w-11"
            variant="outline"
            size="icon"
            title="Повторить раскрытие"
            aria-label="Повторить раскрытие"
            onClick={() => setRun((n) => n + 1)}
          >
            <RotateCcw />
          </Button>
        </div>
      </div>
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <section aria-labelledby="gallery-relief">
          <header className="mb-5">
            <h2 id="gallery-relief" className="text-3xl">
              Personal Relief
            </h2>
            <p className="mt-2 text-xs text-muted-foreground">DEMO · {width} × 900</p>
          </header>
          <label className="mb-2 block text-xs text-muted-foreground" htmlFor="relief-demo">
            Комбинация пяти сил
          </label>
          <select
            id="relief-demo"
            className="gallery-select"
            value={reliefId}
            onChange={(e) => setReliefId(e.target.value)}
          >
            {DEMO_RELIEFS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title} · {d.note}
              </option>
            ))}
          </select>
          <div className="my-4 flex gap-2" role="group" aria-label="Материал рельефа">
            <Button
              className="min-h-11"
              variant={material === "alabaster" ? "secondary" : "ghost"}
              aria-pressed={material === "alabaster"}
              onClick={() => setMaterial("alabaster")}
            >
              Алебастр
            </Button>
            <Button
              className="min-h-11"
              variant={material === "obsidian" ? "secondary" : "ghost"}
              aria-pressed={material === "obsidian"}
              onClick={() => setMaterial("obsidian")}
            >
              Обсидиан
            </Button>
          </div>
          <ArtifactViewport
            width={width}
            src={src("relief", reliefId)}
            title="Демо Personal Relief"
          />
          <details className="mt-5 border-t border-border py-4">
            <summary className="min-h-11 cursor-pointer text-sm focus-visible:outline focus-visible:outline-ring">
              Пять позиций · {relief.numbers.join(" · ")}
            </summary>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {demoPositions(relief).map((p) => (
                <li key={p.slot}>
                  {p.label} · {p.archetype}
                </li>
              ))}
            </ul>
          </details>
        </section>
        <section aria-labelledby="gallery-myth">
          <header className="mb-5">
            <h2 id="gallery-myth" className="text-3xl">
              Личный Миф
            </h2>
            <p className="mt-2 text-xs text-muted-foreground">DEMO · {width} × 900</p>
          </header>
          <label className="mb-2 block text-xs text-muted-foreground" htmlFor="myth-demo">
            Четыре образа
          </label>
          <select
            id="myth-demo"
            className="gallery-select"
            value={mythId}
            onChange={(e) => setMythId(e.target.value)}
          >
            {DEMO_MYTHS.map((d) => (
              <option key={d.id} value={d.id}>
                DEMO · {d.name}
              </option>
            ))}
          </select>
          <p className="my-4 flex min-h-11 items-center text-sm text-muted-foreground">
            Монолитный рельеф
          </p>
          <ArtifactViewport width={width} src={src("myth", mythId)} title="Демо Личного Мифа" />
          <details className="mt-5 border-t border-border py-4">
            <summary className="min-h-11 cursor-pointer text-sm focus-visible:outline focus-visible:outline-ring">
              Исходные образы · {myth.name}
            </summary>
            <dl className="space-y-3 text-sm text-muted-foreground">
              {Object.entries(myth.answers).map(([key, value], i) => (
                <div key={key}>
                  <dt>Образ {i + 1}</dt>
                  <dd className="text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </details>
        </section>
      </div>
      <footer className="mt-10 border-t border-border py-6 text-xs leading-relaxed text-muted-foreground">
        Все наборы — вымышленные DEMO. Не расчёт, не биография и не сохранённая сессия.
      </footer>
    </main>
  );
}
