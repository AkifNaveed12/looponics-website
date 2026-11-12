import { getChatConfig } from "./config";
import type { ChatMessage, ChatRequestPayload, ChatErrorCode } from "./schemas";

export interface ValidationSuccess {
  ok: true;
  payload: {
    conversationId: string;
    messages: ChatMessage[];
    locale: string;
    stream: boolean;
  };
}

export interface ValidationFailure {
  ok: false;
  code: ChatErrorCode;
  message: string;
  status: number;
}

export type ValidationResult = ValidationSuccess | ValidationFailure;

export function validateOrigin(req: Request): boolean {
  const config = getChatConfig();
  const origin = req.headers.get("origin");
  if (!origin) {
    // Non-browser or same-origin direct calls without origin header
    return true;
  }
  const normalized = origin.trim().toLowerCase();
  return config.allowedOrigins.some(
    (allowed) => allowed === normalized || allowed === "*"
  );
}

export function validateChatPayload(
  rawBody: unknown,
  contentLengthBytes?: number
): ValidationResult {
  const config = getChatConfig();

  if (contentLengthBytes && contentLengthBytes > config.maxRequestBytes) {
    return {
      ok: false,
      code: "PAYLOAD_TOO_LARGE",
      message: `Payload exceeds maximum allowed size of ${config.maxRequestBytes} bytes.`,
      status: 413,
    };
  }

  if (!rawBody || typeof rawBody !== "object") {
    return {
      ok: false,
      code: "BAD_REQUEST",
      message: "Request body must be a valid JSON object.",
      status: 400,
    };
  }

  const data = rawBody as Record<string, unknown>;

  if (!Array.isArray(data.messages) || data.messages.length === 0) {
    return {
      ok: false,
      code: "BAD_REQUEST",
      message: "Messages must be a non-empty array.",
      status: 400,
    };
  }

  if (data.messages.length > config.maxMessages) {
    return {
      ok: false,
      code: "BAD_REQUEST",
      message: `Message count exceeds limit of ${config.maxMessages}.`,
      status: 400,
    };
  }

  const validatedMessages: ChatMessage[] = [];

  for (let i = 0; i < data.messages.length; i++) {
    const item = data.messages[i];
    if (!item || typeof item !== "object") {
      return {
        ok: false,
        code: "BAD_REQUEST",
        message: `Message at index ${i} is invalid.`,
        status: 400,
      };
    }

    const { role, content, id } = item as Record<string, unknown>;

    if (role !== "user" && role !== "assistant") {
      return {
        ok: false,
        code: "BAD_REQUEST",
        message: `Message at index ${i} has unsupported role "${role}". Only "user" and "assistant" are allowed.`,
        status: 400,
      };
    }

    if (typeof content !== "string" || content.trim().length === 0) {
      return {
        ok: false,
        code: "BAD_REQUEST",
        message: `Message at index ${i} must have non-empty text content.`,
        status: 400,
      };
    }

    if (content.length > config.maxMessageLength) {
      return {
        ok: false,
        code: "BAD_REQUEST",
        message: `Message at index ${i} exceeds maximum length of ${config.maxMessageLength} characters.`,
        status: 400,
      };
    }

    validatedMessages.push({
      role,
      content: content.trim(),
      id: typeof id === "string" ? id : undefined,
    });
  }

  // Ensure conversationId is safe
  const rawConvId = typeof data.conversationId === "string" ? data.conversationId.trim() : "";
  const conversationId = rawConvId.length > 0 && rawConvId.length <= 128
    ? rawConvId
    : `conv-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const locale = typeof data.locale === "string" && data.locale.length <= 10
    ? data.locale
    : "en";

  const stream = typeof data.stream === "boolean" ? data.stream : false;

  return {
    ok: true,
    payload: {
      conversationId,
      messages: validatedMessages,
      locale,
      stream,
    },
  };
}
