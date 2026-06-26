/**
 * Thin Claude wrapper. The browser POSTs to /api/anthropic which is
 * proxied to https://api.anthropic.com by Vite (dev) or by your own
 * backend (production). The API key never lives in the browser.
 */
const MODEL = "llama-3.3-70b-versatile";

export const hasAnthropicKey =
  typeof __HAS_ANTHROPIC_KEY__ !== "undefined" ? __HAS_ANTHROPIC_KEY__ : false;

export async function callClaude({ system, messages, maxTokens = 2048, signal }) {
  const res = await fetch("/api/groq/openai/v1/chat/completions", {
    method: "POST",
    signal,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      messages: [
        { role: "system", content: system },
        ...messages,
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Groq API ${res.status}: ${text.slice(0, 200)}`);
  }

  const json = await res.json();
  const text = json.choices?.[0]?.message?.content ?? "";
  return { text, raw: json };
}
