/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { codeQuestionSchema } from "./code-question";

const positions = [
  { key: "soul", value: 6 },
  { key: "action", value: 2 },
  { key: "realization", value: 8 },
  { key: "vector", value: 5 },
  { key: "tension", value: 4 },
];
describe("code question context", () => {
  test("accepts all five map positions", () => {
    const result = codeQuestionSchema.parse({ question: "Как связаны мои архетипы?", positions });
    expect(result.positions.map((p) => p.value)).toEqual([6, 2, 8, 5, 4]);
  });
  test("rejects duplicate positions", () => {
    expect(
      codeQuestionSchema.safeParse({
        question: "Вопрос",
        positions: positions.map(() => ({ key: "soul", value: 6 })),
      }).success,
    ).toBe(false);
  });
  test("does not include the birth date in model input", () => {
    expect(
      codeQuestionSchema.parse({ question: "Вопрос", positions, birthDate: "1986-05-06" }),
    ).not.toHaveProperty("birthDate");
  });
});
