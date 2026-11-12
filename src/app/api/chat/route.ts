import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {
  streamText,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from "ai";
import type { UIMessage } from "ai";
import { validateOrigin } from "@/lib/chat-api/validator";
import { LOOPONICS_SYSTEM_PROMPT } from "@/lib/chat-api/prompts";
import { getChatConfig } from "@/lib/chat-api/config";
import { searchKnowledge, assembleRAGContext } from "@/lib/chat-api/retrieval";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // 1. Origin verification
  if (!validateOrigin(req)) {
    return new Response(JSON.stringify({ error: "Forbidden origin" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages array required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const config = getChatConfig();
    const apiKey = config.geminiApiKey;

    if (!apiKey) {
      console.error("[ChatAPI] GEMINI_API_KEY is missing in environment.");
      return new Response(
        JSON.stringify({
          error: {
            code: "KEY_MISSING",
            message:
              "GEMINI_API_KEY is not configured on the server. Please add it to your .env or .env.local file.",
          },
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const google = createGoogleGenerativeAI({
      apiKey,
    });

    // 2. Bounded history: take up to maxMessages
    const boundedMessages = messages.slice(-config.maxMessages);

    // 3. Extract latest query for RAG retrieval
    const lastUserMsg = [...boundedMessages].reverse().find((m) => m.role === "user");
    let queryText = "";
    if (lastUserMsg) {
      const msg = lastUserMsg as any;
      if (typeof msg.content === "string") {
        queryText = msg.content;
      } else if (Array.isArray(msg.parts)) {
        queryText = msg.parts
          .filter((p: any) => p.type === "text" && p.text)
          .map((p: any) => p.text)
          .join(" ");
      }
    }

    // 4. Retrieve knowledge chunks & assemble context
    const retrievedChunks = queryText ? await searchKnowledge(queryText, { topK: 4 }) : [];
    const ragContext = assembleRAGContext(retrievedChunks);

    // 5. Stream response with grounded context
    const result = streamText({
      abortSignal: req.signal,
      model: google(config.geminiModel),
      providerOptions: {
        google: {
          thinking: { budget: 0 },
        },
      },
      system: `${LOOPONICS_SYSTEM_PROMPT}\n\n${ragContext}`,
      messages: await convertToModelMessages(boundedMessages),
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch (error: unknown) {
    console.error("[ChatAPI] Error during stream execution:", error);
    return new Response(
      JSON.stringify({
        error: {
          code: "PROVIDER_ERROR",
          message:
            "Assistant service temporarily unavailable. Please try again or contact support@looponics.tech.",
        },
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
