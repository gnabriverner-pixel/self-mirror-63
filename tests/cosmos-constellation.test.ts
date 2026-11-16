import { describe, expect, test } from "bun:test";
import { buildConstellation } from "../src/donor/cosmos/possibilities";

describe("possibility constellation", () => {
  test("same dream produces the same nine stars", () => {
    expect(buildConstellation("свобода|жить у моря")).toEqual(
      buildConstellation("свобода|жить у моря"),
    );
    expect(buildConstellation("свобода|жить у моря")).toHaveLength(9);
  });

  test("different dreams produce different geometry", () => {
    expect(buildConstellation("свобода|жить у моря")).not.toEqual(
      buildConstellation("свобода|создавать музыку"),
    );
  });

  test("all stars remain inside the artwork", () => {
    for (const point of buildConstellation("мечтать|очень длинная и смелая мечта")) {
      expect(point.x).toBeGreaterThanOrEqual(90);
      expect(point.x).toBeLessThanOrEqual(550);
      expect(point.y).toBeGreaterThanOrEqual(120);
      expect(point.y).toBeLessThanOrEqual(520);
    }
  });
});
