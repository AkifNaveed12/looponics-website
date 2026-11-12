import { createClient } from "@supabase/supabase-js";
import { generateEmbedding } from "./embeddings";
import { parseMarkdownDocument } from "./chunker";
import fs from "fs";
import path from "path";

export interface RetrievedChunk {
  id?: string;
  filePath: string;
  title: string;
  headingPath: string;
  chunkText: string;
  similarity: number;
}

export interface RetrievalOptions {
  topK?: number;
  threshold?: number;
}

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key) {
    return createClient(url, key);
  }
  return null;
}

/**
 * Local fallback retrieval: searches curated markdown knowledge base
 * directly from disk when Supabase credentials are not yet configured.
 */
function localKnowledgeFallback(query: string, topK: number): RetrievedChunk[] {
  const knowledgeDir = path.join(process.cwd(), "docs", "knowledge");
  if (!fs.existsSync(knowledgeDir)) {
    return [];
  }

  const queryTokens = query
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const files = fs.readdirSync(knowledgeDir).filter((f) => f.endsWith(".md"));
  const allChunks: RetrievedChunk[] = [];

  for (const file of files) {
    const filePath = path.join(knowledgeDir, file);
    const content = fs.readFileSync(filePath, "utf8");
    const parsed = parseMarkdownDocument(file, content);

    for (const chunk of parsed.chunks) {
      const lowerText = (chunk.headingPath + " " + chunk.chunkText).toLowerCase();
      let score = 0;
      for (const token of queryTokens) {
        if (lowerText.includes(token)) score += 1;
      }

      if (score > 0) {
        allChunks.push({
          filePath: chunk.metadata.filePath,
          title: chunk.metadata.title,
          headingPath: chunk.headingPath,
          chunkText: chunk.chunkText,
          similarity: Math.min(1.0, 0.6 + score * 0.1),
        });
      }
    }
  }

  allChunks.sort((a, b) => b.similarity - a.similarity);
  return allChunks.slice(0, topK);
}

/**
 * Semantic knowledge retrieval:
 * Queries Supabase pgvector with embedding, falling back to local curated knowledge.
 */
export async function searchKnowledge(
  query: string,
  options: RetrievalOptions = {}
): Promise<RetrievedChunk[]> {
  const topK = options.topK ?? 4;
  const threshold = options.threshold ?? 0.6;
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const queryEmbedding = await generateEmbedding(query);
      const { data, error } = await supabase.rpc("match_knowledge_chunks", {
        query_embedding: queryEmbedding,
        match_threshold: threshold,
        match_count: topK,
      });

      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map((item: any) => ({
          id: item.id,
          filePath: item.file_path,
          title: item.title,
          headingPath: item.heading_path,
          chunkText: item.chunk_text,
          similarity: item.similarity,
        }));
      }
    } catch (err) {
      console.warn("[RAG] Supabase vector query failed, using local fallback:", err);
    }
  }

  // Fallback to local curated Markdown knowledge base
  return localKnowledgeFallback(query, topK);
}

/**
 * Assembles retrieved knowledge chunks into formatted grounding context
 * with strict abstention rules.
 */
export function assembleRAGContext(chunks: RetrievedChunk[]): string {
  if (!chunks || chunks.length === 0) {
    return `\nVERIFIED KNOWLEDGE BASE CONTEXT:\nNo specific knowledge base documents matched this inquiry.\n\nABSTENTION DIRECTIVE:\nDo NOT guess or fabricate details. Politely state that you do not have confirmed information in the knowledge base and direct the visitor to support@looponics.tech or https://looponics.tech/#contact.`;
  }

  const contextSegments = chunks.map((c, i) => {
    return `[Source ${i + 1}: ${c.title} (${c.filePath}) > ${c.headingPath} | Relevance: ${(c.similarity * 100).toFixed(0)}%]\n${c.chunkText}`;
  });

  return `\nVERIFIED KNOWLEDGE BASE CONTEXT (Phase 2 RAG):\n${contextSegments.join("\n\n---\n\n")}\n\nSTRICT GROUNDING DIRECTIVE:\nAnswer the visitor's inquiry using the verified facts above. If the inquiry asks about specifics not confirmed in the context (such as unconfirmed pricing, fixed deadlines, or unlisted clients), politely abstain and direct the visitor to support@looponics.tech or https://looponics.tech/#contact.`;
}
