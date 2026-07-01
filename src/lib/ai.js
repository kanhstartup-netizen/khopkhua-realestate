// ຟັງຊັນເຊື່ອມຕໍ່ Claude API ໂດຍກົງຈາກ browser
// ໃຊ້ API key ທີ່ຜູ້ໃຊ້ໃສ່ເອງ (ເກັບໄວ້ໃນ localStorage ເທົ່ານັ້ນ)

export const API_KEY_STORAGE = "kk_claude_api_key";
export const MODEL = "claude-sonnet-5";
export const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

export function getApiKey() {
  try {
    return localStorage.getItem(API_KEY_STORAGE) || "";
  } catch {
    return "";
  }
}

export function setApiKey(key) {
  try {
    if (key) localStorage.setItem(API_KEY_STORAGE, key.trim());
    else localStorage.removeItem(API_KEY_STORAGE);
  } catch {
    /* ignore */
  }
}

export function hasApiKey() {
  return !!getApiKey();
}

/**
 * ສົ່ງຂໍ້ຄວາມໄປຫາ Claude API
 * @param {Array<{role:'user'|'assistant', content:string}>} messages
 * @param {string} systemPrompt - ບົດບາດ / persona ຂອງ AI staff ຄົນນັ້ນ
 * @returns {Promise<string>} ຄຳຕອບຈາກ AI
 */
export async function sendToClaude(messages, systemPrompt) {
  const key = getApiKey();
  if (!key) {
    const err = new Error("NO_API_KEY");
    err.code = "NO_API_KEY";
    throw err;
  }

  const res = await fetch(ANTHROPIC_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  });

  if (!res.ok) {
    let detail = "";
    try {
      const j = await res.json();
      detail = j?.error?.message || "";
    } catch {
      /* ignore */
    }
    const err = new Error(detail || `HTTP ${res.status}`);
    err.code = res.status === 401 ? "BAD_KEY" : "API_ERROR";
    err.status = res.status;
    throw err;
  }

  const data = await res.json();
  const text = (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");
  return text || "（ບໍ່ມີຄຳຕອບ）";
}
