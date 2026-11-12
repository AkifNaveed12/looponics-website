-- ============================================================================
-- Looponics AI Assistant — Phase 2: RAG Schema & pgvector Setup
-- Model: Gemini text-embedding-004 (768 dimensions)
-- ============================================================================

-- 1. Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Knowledge Documents Table
CREATE TABLE IF NOT EXISTS knowledge_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_path TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  version INTEGER DEFAULT 1,
  language TEXT DEFAULT 'en',
  visibility TEXT DEFAULT 'public',
  ingestion_status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Knowledge Chunks Table
CREATE TABLE IF NOT EXISTS knowledge_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES knowledge_documents(id) ON DELETE CASCADE,
  heading_path TEXT NOT NULL,
  chunk_text TEXT NOT NULL,
  token_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb NOT NULL,
  embedding VECTOR(768),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Vector Cosine Similarity Index (HNSW for high-speed retrieval)
CREATE INDEX IF NOT EXISTS knowledge_chunks_embedding_idx
  ON knowledge_chunks
  USING hnsw (embedding vector_cosine_ops);

-- Index for document lookups
CREATE INDEX IF NOT EXISTS knowledge_chunks_doc_id_idx
  ON knowledge_chunks (document_id);

-- 5. Semantic Match RPC Function
CREATE OR REPLACE FUNCTION match_knowledge_chunks(
  query_embedding VECTOR(768),
  match_threshold FLOAT DEFAULT 0.60,
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  document_id UUID,
  file_path TEXT,
  title TEXT,
  heading_path TEXT,
  chunk_text TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kc.id,
    kc.document_id,
    kd.file_path,
    kd.title,
    kc.heading_path,
    kc.chunk_text,
    ROUND((1 - (kc.embedding <=> query_embedding))::numeric, 4)::float AS similarity
  FROM knowledge_chunks kc
  INNER JOIN knowledge_documents kd ON kd.id = kc.document_id
  WHERE kd.visibility = 'public'
    AND (1 - (kc.embedding <=> query_embedding)) >= match_threshold
  ORDER BY kc.embedding <=> query_embedding ASC
  LIMIT match_count;
END;
$$;

-- 6. Row Level Security (RLS)
ALTER TABLE knowledge_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_chunks ENABLE ROW LEVEL SECURITY;

-- Allow public read access to public documents
CREATE POLICY "Public read knowledge_documents"
  ON knowledge_documents
  FOR SELECT
  USING (visibility = 'public');

CREATE POLICY "Public read knowledge_chunks"
  ON knowledge_chunks
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM knowledge_documents kd
      WHERE kd.id = knowledge_chunks.document_id
      AND kd.visibility = 'public'
    )
  );
