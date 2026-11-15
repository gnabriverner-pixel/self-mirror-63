import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/code-question")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleCodeQuestion } = await import("@/lib/code-question.server");
        return handleCodeQuestion(request);
      },
    },
  },
});
