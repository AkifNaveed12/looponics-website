import test from "node:test";
import assert from "node:assert/strict";
import { validateChatPayload, validateOrigin } from "../src/lib/chat-api/validator";
import { getChatConfig } from "../src/lib/chat-api/config";
import { LOOPONICS_SYSTEM_PROMPT } from "../src/lib/chat-api/prompts";

test("Chat API Validation - rejects null or non-object payload", () => {
  const result = validateChatPayload(null);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.code, "BAD_REQUEST");
    assert.equal(result.status, 400);
  }
});

test("Chat API Validation - rejects empty messages array", () => {
  const result = validateChatPayload({ messages: [] });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.code, "BAD_REQUEST");
  }
});

test("Chat API Validation - rejects unsupported roles", () => {
  const result = validateChatPayload({
    messages: [{ role: "system", content: "hello" }],
  });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.code, "BAD_REQUEST");
    assert.match(result.message, /unsupported role/);
  }
});

test("Chat API Validation - rejects message content exceeding 4000 characters", () => {
  const oversizedContent = "a".repeat(4001);
  const result = validateChatPayload({
    messages: [{ role: "user", content: oversizedContent }],
  });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.code, "BAD_REQUEST");
    assert.match(result.message, /exceeds maximum length/);
  }
});

test("Chat API Validation - rejects message count exceeding 20", () => {
  const manyMessages = Array.from({ length: 21 }, (_, i) => ({
    role: i % 2 === 0 ? "user" : "assistant",
    content: `message ${i}`,
  }));
  const result = validateChatPayload({ messages: manyMessages });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.code, "BAD_REQUEST");
    assert.match(result.message, /exceeds limit/);
  }
});

test("Chat API Validation - rejects payload exceeding max request bytes (32KB)", () => {
  const result = validateChatPayload(
    { messages: [{ role: "user", content: "test" }] },
    40000 // 40KB
  );
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.code, "PAYLOAD_TOO_LARGE");
    assert.equal(result.status, 413);
  }
});

test("Chat API Validation - accepts valid conversation payload", () => {
  const result = validateChatPayload({
    conversationId: "conv-12345",
    messages: [
      { role: "user", content: "What web development services do you offer?" },
      { role: "assistant", content: "We engineer Next.js and TypeScript apps." },
      { role: "user", content: "Can you build AI SaaS platforms?" },
    ],
  });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.payload.conversationId, "conv-12345");
    assert.equal(result.payload.messages.length, 3);
  }
});

test("Chat API Origin Security - checks allowed origins", () => {
  const config = getChatConfig();
  assert.ok(config.allowedOrigins.includes("https://looponics.tech"));
  assert.ok(config.allowedOrigins.includes("https://www.looponics.tech"));

  const validReq = new Request("https://api.looponics.tech/v1/chat", {
    headers: { origin: "https://looponics.tech" },
  });
  assert.equal(validateOrigin(validReq), true);

  const maliciousReq = new Request("https://api.looponics.tech/v1/chat", {
    headers: { origin: "https://malicious-phishing-site.com" },
  });
  assert.equal(validateOrigin(maliciousReq), false);
});

test("Looponics System Prompt - enforces verified facts and abstention rules", () => {
  assert.match(LOOPONICS_SYSTEM_PROMPT, /Looponics/);
  assert.match(LOOPONICS_SYSTEM_PROMPT, /support@looponics\.tech/);
  assert.match(LOOPONICS_SYSTEM_PROMPT, /do NOT invent or guess/);
  assert.match(LOOPONICS_SYSTEM_PROMPT, /Web Development/);
  assert.match(LOOPONICS_SYSTEM_PROMPT, /AI-Powered SaaS/);
  assert.match(LOOPONICS_SYSTEM_PROMPT, /Agentic AI/);
});

test("Health Endpoint - returns status ok without leaking internal secrets", async () => {
  const { GET } = await import("../src/app/api/v1/health/route");
  const res = await GET();
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.status, "ok");
  assert.equal(data.service, "Looponics AI Assistant API");
  assert.ok(data.timestamp);
  // Guarantee no credentials leaked
  assert.equal(data.apiKey, undefined);
  assert.equal(data.env, undefined);
});
