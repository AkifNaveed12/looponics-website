import { getChatConfig } from "./config";

export const EMBEDDING_MODEL = "models/gemini-embedding-001";
export const EMBEDDING_DIMENSION = 768;

export interface EmbeddingResult {
  embedding: number[];
  dimension: number;
}

/**
 * Generate a 768-dimensional vector embedding for a single text chunk
 * using Google Gemini Embedding Model.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const config = getChatConfig();
  const apiKey = config.geminiApiKey;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const cleanText = text.trim();
  if (!cleanText) {
    throw new Error("Cannot generate embedding for empty text.");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/${EMBEDDING_MODEL}:embedContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      outputDimensionality: EMBEDDING_DIMENSION,
      content: {
        parts: [{ text: cleanText }],
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Gemini embedding API failed (${response.status}): ${errorBody}`
    );
  }

  const data = await response.json();
  if (!data.embedding || !Array.isArray(data.embedding.values)) {
    throw new Error("Invalid response shape from Gemini embedding API.");
  }

  return data.embedding.values;
}

/**
 * Generate embeddings for an array of text chunks sequentially
 * with small delay to avoid rate-limiting spikes.
 */
export async function generateEmbeddingsBatch(
  texts: string[]
): Promise<number[][]> {
  const embeddings: number[][] = [];
  for (let i = 0; i < texts.length; i++) {
    const emb = await generateEmbedding(texts[i]);
    embeddings.push(emb);
    // Brief 50ms pause between sequential embeddings
    if (i < texts.length - 1) {
      await new Promise((r) => setTimeout(r, 50));
    }
  }
  return embeddings;
}
