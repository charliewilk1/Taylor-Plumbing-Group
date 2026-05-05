import { createFileRoute } from "@tanstack/react-router";
import { client } from "@/config/client";

const SYSTEM_PROMPT = client.chat.systemPrompt;

const JSON_HEADERS = { "Content-Type": "application/json" };

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: JSON_HEADERS,
  });
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.ANTHROPIC_API_KEY1;
        if (!apiKey) {
          console.error("[/api/chat] ANTHROPIC_API_KEY is not set");
          return jsonError("API key not configured", 500);
        }

        let messages: Array<{ role: "user" | "assistant"; content: string }>;
        try {
          const body = await request.json();
          messages = body.messages;
        } catch (err) {
          console.error("[/api/chat] Failed to parse request body:", err);
          return jsonError("Invalid request body", 400);
        }

        if (!Array.isArray(messages) || messages.length === 0) {
          console.error("[/api/chat] Invalid messages array:", messages);
          return jsonError("No messages provided", 400);
        }

        try {
          const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
              model: "claude-haiku-4-5-20251001",
              max_tokens: 1024,
              system: SYSTEM_PROMPT,
              messages,
            }),
          });

          if (!res.ok) {
            const text = await res.text();
            console.error(
              `[/api/chat] Anthropic API returned ${res.status}:`,
              text
            );
            return jsonError(
              `Anthropic API error: ${res.status} ${res.statusText}`,
              502
            );
          }

          const data = (await res.json()) as {
            content: Array<{ type: string; text?: string }>;
          };
          const block = data.content?.[0];
          if (!block || block.type !== "text" || block.text == null) {
            console.error(
              "[/api/chat] Unexpected Anthropic response shape:",
              JSON.stringify(data)
            );
            return jsonError("Unexpected response type", 500);
          }

          return new Response(JSON.stringify({ message: block.text }), {
            headers: JSON_HEADERS,
          });
        } catch (err) {
          console.error("[/api/chat] fetch to Anthropic failed:", err);
          const message =
            err instanceof Error ? err.message : String(err);
          return jsonError(`Anthropic API error: ${message}`, 500);
        }
      },
    },
  },
});
