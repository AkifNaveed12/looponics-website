import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { parseMarkdownDocument } from "../src/lib/chat-api/chunker";
import { generateEmbedding, EMBEDDING_DIMENSION } from "../src/lib/chat-api/embeddings";

async function ingestKnowledge() {
  console.log("=============================================================");
  console.log("Looponics AI Assistant — Knowledge Base Ingestion (Phase 2)");
  console.log("=============================================================");

  const knowledgeDir = path.join(process.cwd(), "docs", "knowledge");
  if (!fs.existsSync(knowledgeDir)) {
    console.error(`Knowledge directory not found at: ${knowledgeDir}`);
    process.exit(1);
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  const hasSupabase = !!(supabaseUrl && supabaseKey);
  const supabase = hasSupabase ? createClient(supabaseUrl, supabaseKey) : null;

  if (!hasSupabase) {
    console.warn(
      "[Warning] SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY not configured."
    );
    console.log(
      "Parsing documents locally to verify chunking and semantic structures..."
    );
  }

  const files = fs.readdirSync(knowledgeDir).filter((f) => f.endsWith(".md"));
  console.log(`Found ${files.length} knowledge markdown files in docs/knowledge/\n`);

  let totalChunks = 0;

  for (const file of files) {
    const filePath = path.join(knowledgeDir, file);
    const content = fs.readFileSync(filePath, "utf8");
    const parsed = parseMarkdownDocument(file, content);

    console.log(`📄 [${file}] - Title: "${parsed.title}"`);
    console.log(`   Hash: ${parsed.contentHash.slice(0, 12)}... | Chunks: ${parsed.chunks.length}`);
    totalChunks += parsed.chunks.length;

    if (supabase) {
      // 1. Check if document exists and has identical hash
      const { data: existingDoc } = await supabase
        .from("knowledge_documents")
        .select("id, content_hash")
        .eq("file_path", file)
        .single();

      let documentId: string;

      if (existingDoc && existingDoc.content_hash === parsed.contentHash) {
        console.log(`   ⚡ Hash unchanged. Skipping re-embedding.`);
        continue;
      } else if (existingDoc) {
        console.log(`   🔄 Document changed. Updating record & regenerating embeddings...`);
        const { data: updatedDoc, error: updateErr } = await supabase
          .from("knowledge_documents")
          .update({
            title: parsed.title,
            content_hash: parsed.contentHash,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingDoc.id)
          .select("id")
          .single();

        if (updateErr) throw updateErr;
        documentId = updatedDoc.id;

        // Delete old chunks
        await supabase.from("knowledge_chunks").delete().eq("document_id", documentId);
      } else {
        console.log(`   ✨ Inserting new document record...`);
        const { data: newDoc, error: insertErr } = await supabase
          .from("knowledge_documents")
          .insert({
            file_path: file,
            title: parsed.title,
            content_hash: parsed.contentHash,
          })
          .select("id")
          .single();

        if (insertErr) throw insertErr;
        documentId = newDoc.id;
      }

      // Generate embeddings and insert chunks
      for (let i = 0; i < parsed.chunks.length; i++) {
        const chunk = parsed.chunks[i];
        console.log(`   Embedding chunk ${i + 1}/${parsed.chunks.length}: "${chunk.headingPath}"`);
        const embedding = await generateEmbedding(`${chunk.headingPath}\n${chunk.chunkText}`);

        await supabase.from("knowledge_chunks").insert({
          document_id: documentId,
          heading_path: chunk.headingPath,
          chunk_text: chunk.chunkText,
          token_count: chunk.tokenCount,
          metadata: chunk.metadata,
          embedding,
        });
      }
    }
  }

  console.log("\n=============================================================");
  console.log(`Ingestion completed: ${files.length} documents, ${totalChunks} total chunks.`);
  if (!hasSupabase) {
    console.log("Local chunking verified. Configure Supabase to persist embeddings.");
  }
  console.log("=============================================================");
}

ingestKnowledge().catch((err) => {
  console.error("Ingestion failed:", err);
  process.exit(1);
});
