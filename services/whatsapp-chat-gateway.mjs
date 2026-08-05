import { createHmac, createHash, randomUUID, timingSafeEqual } from "node:crypto";
import { createServer } from "node:http";
import { mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";

const port = Number(process.env.PORT ?? 8787);
const storeDir = process.env.CHAT_STORE_DIR ?? "/var/lib/zhoupeng-chat";
const graphVersion = process.env.WHATSAPP_GRAPH_VERSION ?? "";
const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID ?? "";
const accessToken = process.env.WHATSAPP_ACCESS_TOKEN ?? "";
const operatorNumber = (process.env.WHATSAPP_OPERATOR_NUMBER ?? "").replace(/\D/g, "");
const appSecret = process.env.WHATSAPP_APP_SECRET ?? "";
const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN ?? "";
const alertTemplate = process.env.WHATSAPP_ALERT_TEMPLATE ?? "";
const templateLanguage = process.env.WHATSAPP_TEMPLATE_LANGUAGE ?? "en_US";
const dryRun = process.env.WHATSAPP_DRY_RUN === "1";
const configured = dryRun || Boolean(graphVersion && phoneNumberId && accessToken && operatorNumber && appSecret && verifyToken);
const limits = new Map();

await mkdir(storeDir, { recursive: true });

function sendJson(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
  response.end(JSON.stringify(body));
}

async function bodyBuffer(request) {
  const chunks = [];
  let length = 0;
  for await (const chunk of request) {
    length += chunk.length;
    if (length > 16_384) throw new Error("request too large");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

function validIdentity(sessionId, clientToken) {
  return /^[0-9a-f-]{36}$/i.test(sessionId ?? "") && /^[0-9a-f-]{36}$/i.test(clientToken ?? "");
}

function tokenHash(value) { return createHash("sha256").update(value).digest("hex"); }
function sessionFile(sessionId) { return join(storeDir, `${sessionId}.json`); }
function shortCode(sessionId) { return createHash("sha256").update(sessionId).digest("hex").slice(0, 8).toUpperCase(); }

async function loadSession(sessionId) {
  try { return JSON.parse(await readFile(sessionFile(sessionId), "utf8")); }
  catch (error) { if (error?.code === "ENOENT") return null; throw error; }
}

async function saveSession(session) {
  const target = sessionFile(session.sessionId);
  const temporary = `${target}.${randomUUID()}.tmp`;
  await writeFile(temporary, JSON.stringify(session), { mode: 0o600 });
  await rename(temporary, target);
}

function allowed(request) {
  const key = request.socket.remoteAddress ?? "unknown";
  const now = Date.now();
  const recent = (limits.get(key) ?? []).filter((time) => now - time < 60_000);
  if (recent.length >= 12) return false;
  recent.push(now);
  limits.set(key, recent);
  return true;
}

async function notifyOperator(session, text, pageUrl, language) {
  if (dryRun) return { messages: [{ id: `dry-${randomUUID()}` }] };
  const body = [
    `Website chat #${session.code}`,
    `Language: ${language || "unknown"}`,
    text,
    pageUrl ? `Page: ${pageUrl.slice(0, 300)}` : "",
    `Reply with: #${session.code} your message`,
  ].filter(Boolean).join("\n");
  const content = alertTemplate ? {
    type: "template",
    template: {
      name: alertTemplate,
      language: { code: templateLanguage },
      components: [{ type: "body", parameters: [
        { type: "text", text: session.code },
        { type: "text", text: text.slice(0, 900) },
      ] }],
    },
  } : { type: "text", text: { preview_url: false, body } };
  const response = await fetch(`https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", recipient_type: "individual", to: operatorNumber, ...content }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(`Meta API ${response.status}: ${JSON.stringify(result).slice(0, 500)}`);
  return result;
}

async function findSessionByCode(code) {
  for (const name of await readdir(storeDir)) {
    if (!name.endsWith(".json")) continue;
    const session = JSON.parse(await readFile(join(storeDir, name), "utf8"));
    if (session.code === code) return session;
  }
  return null;
}

async function processWebhook(payload) {
  const incoming = payload?.entry?.flatMap((entry) => entry?.changes ?? [])
    .flatMap((change) => change?.value?.messages ?? []) ?? [];
  for (const message of incoming) {
    if (operatorNumber && String(message.from).replace(/\D/g, "") !== operatorNumber) continue;
    const text = message?.text?.body?.trim();
    const match = text?.match(/^#([A-F0-9]{8})\s+([\s\S]{1,1000})$/i);
    if (!match) continue;
    const session = await findSessionByCode(match[1].toUpperCase());
    if (!session) continue;
    if (session.messages.some((item) => item.sourceId === message.id)) continue;
    session.messages.push({ id: randomUUID(), sourceId: message.id, role: "advisor", text: match[2].trim(), createdAt: new Date().toISOString() });
    session.updatedAt = new Date().toISOString();
    await saveSession(session);
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
  try {
    if (request.method === "GET" && url.pathname === "/health") {
      return sendJson(response, 200, { ok: true, configured });
    }
    if (request.method === "GET" && url.pathname === "/webhook") {
      if (url.searchParams.get("hub.mode") === "subscribe" && url.searchParams.get("hub.verify_token") === verifyToken) {
        response.writeHead(200, { "Content-Type": "text/plain" });
        return response.end(url.searchParams.get("hub.challenge") ?? "");
      }
      return sendJson(response, 403, { error: "verification failed" });
    }
    if (request.method === "POST" && url.pathname === "/webhook") {
      const raw = await bodyBuffer(request);
      const supplied = request.headers["x-hub-signature-256"] ?? "";
      const expected = `sha256=${createHmac("sha256", appSecret).update(raw).digest("hex")}`;
      const valid = dryRun || (supplied.length === expected.length && timingSafeEqual(Buffer.from(supplied), Buffer.from(expected)));
      if (!valid) return sendJson(response, 401, { error: "invalid signature" });
      await processWebhook(JSON.parse(raw.toString("utf8")));
      return sendJson(response, 200, { received: true });
    }
    if (request.method === "GET" && url.pathname === "/messages") {
      const sessionId = url.searchParams.get("sessionId") ?? "";
      const clientToken = String(request.headers["x-chat-token"] ?? "");
      if (!validIdentity(sessionId, clientToken)) return sendJson(response, 400, { error: "invalid session" });
      const session = await loadSession(sessionId);
      if (!session) return sendJson(response, 200, { messages: [] });
      if (session.clientTokenHash !== tokenHash(clientToken)) return sendJson(response, 403, { error: "forbidden" });
      return sendJson(response, 200, { messages: session.messages.map(({ id, role, text, createdAt }) => ({ id, role, text, createdAt })) });
    }
    if (request.method === "POST" && url.pathname === "/messages") {
      if (!configured) return sendJson(response, 503, { error: "WhatsApp Business API is not configured" });
      if (!allowed(request)) return sendJson(response, 429, { error: "rate limit exceeded" });
      const data = JSON.parse((await bodyBuffer(request)).toString("utf8"));
      if (!validIdentity(data.sessionId, data.clientToken)) return sendJson(response, 400, { error: "invalid session" });
      const text = String(data.message ?? "").trim();
      if (!text || text.length > 1000) return sendJson(response, 400, { error: "invalid message" });
      let session = await loadSession(data.sessionId);
      if (session && session.clientTokenHash !== tokenHash(data.clientToken)) return sendJson(response, 403, { error: "forbidden" });
      if (!session) session = { sessionId: data.sessionId, clientTokenHash: tokenHash(data.clientToken), code: shortCode(data.sessionId), createdAt: new Date().toISOString(), messages: [] };
      const message = { id: randomUUID(), role: "visitor", text, createdAt: new Date().toISOString() };
      await notifyOperator(session, text, String(data.pageUrl ?? ""), String(data.language ?? ""));
      session.messages.push(message);
      session.updatedAt = message.createdAt;
      await saveSession(session);
      return sendJson(response, 201, { message });
    }
    return sendJson(response, 404, { error: "not found" });
  } catch (error) {
    console.error(new Date().toISOString(), error);
    return sendJson(response, 500, { error: "internal error" });
  }
});

server.listen(port, "127.0.0.1", () => console.log(`Zhoupeng WhatsApp gateway listening on 127.0.0.1:${port}; configured=${configured}`));
