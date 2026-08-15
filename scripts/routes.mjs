#!/usr/bin/env node
/**
 * Генерация / проверка src/routeTree.gen.ts.
 *
 *   node scripts/routes.mjs          -> сгенерировать дерево маршрутов
 *   node scripts/routes.mjs --check  -> проверить, что файл актуален (exit 1, если нет)
 */
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { Generator, getConfig } from "@tanstack/router-generator";

const root = process.cwd();
const check = process.argv.includes("--check");
const target = path.join(root, "src", "routeTree.gen.ts");

const before = existsSync(target) ? await readFile(target, "utf8") : null;

// Футер, который добавляет плагин TanStack Start (типы Register).
const routeTreeFileFooter = [
  `import type { getRouter } from './router.tsx'
import type { startInstance } from './start.ts'
declare module '@tanstack/react-start' {
  interface Register {
    ssr: true
    router: Awaited<ReturnType<typeof getRouter>>
    config: Awaited<ReturnType<typeof startInstance.getOptions>>
  }
}`,
];

const config = await getConfig(
  { target: "react", autoCodeSplitting: true, routeTreeFileFooter },
  root,
);
const generator = new Generator({ config, root });
await generator.run();

const after = await readFile(target, "utf8");

if (!check) {
  console.log(before === after ? "routeTree.gen.ts уже актуален" : "routeTree.gen.ts обновлён");
  process.exit(0);
}

if (before !== after) {
  if (before !== null) await writeFile(target, before);
  console.error(
    "✖ src/routeTree.gen.ts устарел. Запустите: bun run routes:gen (файл не изменён).",
  );
  process.exit(1);
}
console.log("✓ routeTree.gen.ts актуален");
