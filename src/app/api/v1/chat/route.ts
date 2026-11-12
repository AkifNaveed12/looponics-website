import { validateOrigin, validateChatPayload } from "@/lib/chat-api/validator";
import { callGeminiChat } from "@/lib/chat-api/providers/gemini";
import type { ChatErrorEnvelope } from "@/lib/chat-api/schemas";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const requestId = `req-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  // 1. Origin verification
  if (!validateOrigin(req)) {
    const errorEnvelope: ChatErrorEnvelope = {
      error: {
        code: "INVALID_ORIGIN",
        message: "Forbidden origin.",
      },
      requestId,
    };
    return new Response(JSON.stringify(errorEnvelope), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 2. Parse & validate body
  let rawBody: unknown;
  const contentLength = Number(req.headers.get("content-length") || "0");

  try {
    rawBody = await req.json();
  } catch {
    const errorEnvelope: ChatErrorEnvelope = {
      error: {
        code: "BAD_REQUEST",
        message: "Malformed JSON payload.",
      },
      requestId,
    };
    return new Response(JSON.stringify(errorEnvelope), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const validation = validateChatPayload(rawBody, contentLength);
  if (!validation.ok) {
    const errorEnvelope: ChatErrorEnvelope = {
      error: {
        code: validation.code,
        message: validation.message,
      },
      requestId,
    };
    return new Response(JSON.stringify(errorEnvelope), {
      status: validation.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { conversationId, messages } = validation.payload;

  // 3. Provider call
  const providerResult = await callGeminiChat(messages, conversationId, requestId);

  if (!providerResult.ok) {
    const errorEnvelope: ChatErrorEnvelope = {
      error: {
        code: providerResult.code,
        message: providerResult.message,
      },
      requestId,
    };
    return new Response(JSON.stringify(errorEnvelope), {
      status: providerResult.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(providerResult.envelope), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "X-Request-Id": requestId,
    },
  });
}
