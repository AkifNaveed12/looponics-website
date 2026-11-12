export interface ChatConfig {
  geminiApiKey: string;
  geminiModel: string;
  allowedOrigins: string[];
  maxMessages: number;
  maxMessageLength: number;
  maxRequestBytes: number;
}

export function getChatConfig(): ChatConfig {
  const geminiApiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    "";
  const geminiModel =
    process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  const originsEnv =
    process.env.ALLOWED_ORIGOrigins ||
    process.env.ALLOWED_ORIGINS ||
    "https://looponics.tech,https://www.looponics.tech";

  const allowedOrigins = originsEnv
    .split(",")
    .map((o) => o.trim().toLowerCase())
    .filter(Boolean);

  // In development, allow localhost and loopback
  if (process.env.NODE_ENV !== "production") {
    allowedOrigins.push(
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:3001"
    );
  }

  return {
    geminiApiKey,
    geminiModel,
    allowedOrigins,
    maxMessages: 20,
    maxMessageLength: 4000,
    maxRequestBytes: 32768, // 32KB
  };
}
