import { describe, expect, test } from "bun:test";
import { canContinueToCosmos } from "../src/lib/code-session";

describe("Code cosmic continuation", () => {
  test("does not open before the session's final step", () => {
    for (let step = 0; step <= 8; step++) {
      expect(canContinueToCosmos(step)).toBe(false);
    }
  });

  test("opens after the final step, including restored completed sessions", () => {
    expect(canContinueToCosmos(9)).toBe(true);
  });
});
