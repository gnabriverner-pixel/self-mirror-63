import { z } from "zod";

export const codeQuestionSchema = z.object({
  question: z.string().trim().min(1).max(2000),
  positions: z
    .array(
      z.object({
        key: z.enum(["soul", "action", "realization", "vector", "tension"]),
        value: z.number().int().min(1).max(9),
      }),
    )
    .length(5)
    .refine((items) => new Set(items.map((p) => p.key)).size === 5),
});
