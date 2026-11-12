import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { getChatConfig } from "../config";
import { LOOPONICS_SYSTEM_PROMPT } from "../prompts";
import { searchKnowledge, assembleRAGContext } from "../retrieval";
import type { ChatMessage, ChatResponseEnvelope } from "../schemas";

export interface ProviderResponse {
  ok: true;
  envelope: ChatResponseEnvelope;
}

export interface ProviderError {
  ok: false;
  code: string;
  message: string;
  status: number;
}

export async function callGeminiChat(
  messages: ChatMessage[],
  conversationId: string,
  requestId: string
): Promise<ProviderResponse | ProviderError> {
  const config = getChatConfig();
  const apiKey = config.geminiApiKey;

  if (!apiKey) {
    return {
      ok: false,
      code: "PROVIDER_UNAVAILABLE",
      message:
        "The assistant is temporarily offline for maintenance. Please reach out to our team at support@looponics.tech.",
      status: 503,
    };
  }

  try {
    const google = createGoogleGenerativeAI({
      apiKey,
    });

    const formattedMessages = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    // 1. RAG retrieval for the latest user message
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    const query = lastUserMessage?.content || "";
    const retrievedChunks = query ? await searchKnowledge(query, { topK: 4 }) : [];
    const ragContext = assembleRAGContext(retrievedChunks);

    // 2. Generate response with grounded RAG context
    const result = await generateText({
      model: google(config.geminiModel),
      providerOptions: {
        google: {
          thinking: { budget: 0 },
        },
      },
      system: `${LOOPONICS_SYSTEM_PROMPT}\n\n${ragContext}`,
      messages: formattedMessages,
    });

    const uniqueSources = Array.from(
      new Set(retrievedChunks.map((c) => c.filePath))
    );

    return {
      ok: true,
      envelope: {
        requestId,
        conversationId,
        message: {
          id: `msg-${Date.now()}`,
          role: "assistant",
          content: result.text.trim(),
        },
        sources: uniqueSources,
        actions: [],
      },
    };
  } catch (err: unknown) {
    console.error(`[ChatAPI][${requestId}] Gemini Provider Error:`, err);
    return {
      ok: false,
      code: "PROVIDER_UNAVAILABLE",
      message:
        "The assistant is temporarily unable to process your request. Please try again or contact support@looponics.tech.",
      status: 502,
    };
  }
}
