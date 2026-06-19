/**
 * Thin Claude wrapper. The browser POSTs to /api/anthropic which is
 * proxied to https://api.anthropic.com by Vite (dev) or by your own
 * backend (production). The API key never lives in the browser.
 */
const MODEL = import.meta.env.VITE_CLAUDE_MODEL || "claude-sonnet-4-5";

export const hasAnthropicKey =
  typeof __HAS_ANTHROPIC_KEY__ !== "undefined" ? __HAS_ANTHROPIC_KEY__ : false;

export async function callClaude({
  system,
  messages,
  maxTokens = 2048,
  signal,
}) {
  const res = await fetch("/api/anthropic/v1/messages", {
    method: "POST",
    signal,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system,
      messages,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Claude API ${res.status}: ${text.slice(0, 200)}`);
  }
  const json = await res.json();
  const text = (json.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");
  return { text, raw: json };
}
