export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
  id?: string;
}

export interface ChatRequestPayload {
  conversationId?: string;
  messages: ChatMessage[];
  locale?: string;
  stream?: boolean;
}

export interface ChatResponseEnvelope {
  requestId: string;
  conversationId: string;
  message: {
    id: string;
    role: "assistant";
    content: string;
  };
  sources: string[];
  actions: unknown[];
}

export interface ChatErrorEnvelope {
  error: {
    code: string;
    message: string;
  };
  requestId: string;
}

export type ChatErrorCode =
  | "BAD_REQUEST"
  | "PAYLOAD_TOO_LARGE"
  | "INVALID_ORIGIN"
  | "PROVIDER_UNAVAILABLE"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR";
