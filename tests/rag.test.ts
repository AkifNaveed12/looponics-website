import test from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import {
  parseMarkdownDocument,
  computeHash,
  filterUnconfirmedContent,
  estimateTokens,
} from "../src/lib/chat-api/chunker";
import {
  searchKnowledge,
  assembleRAGContext,
} from "../src/lib/chat-api/retrieval";
import { EMBEDDING_DIMENSION } from "../src/lib/chat-api/embeddings";

test("RAG Chunker - computes deterministic SHA-256 hash", () => {
  const hash1 = computeHash("Looponics agency");
  const hash2 = computeHash("Looponics agency");
  const hash3 = computeHash("Different content");
  assert.equal(hash1, hash2);
  assert.notEqual(hash1, hash3);
  assert.equal(hash1.length, 64);
});

test("RAG Chunker - excludes NEEDS_OWNER_CONFIRMATION blocks from indexing", () => {
  const raw = `
# Services
## Confirmed Service
We build web applications.
<!-- NEEDS_OWNER_CONFIRMATION: Unapproved pricing $50/hr -->
## Another Service
We build AI agents.
  `;
  const filtered = filterUnconfirmedContent(raw);
  assert.ok(!filtered.includes("NEEDS_OWNER_CONFIRMATION"));
  assert.ok(!filtered.includes("$50/hr"));
  assert.ok(filtered.includes("We build web applications."));
  assert.ok(filtered.includes("We build AI agents."));
});

test("RAG Chunker - parses markdown into semantic chunks with headings", () => {
  const sampleMarkdown = `
# Looponics Overview
## Web Engineering
We build high-performance Next.js applications.
## Mobile Engineering
We build React Native applications.
  `;
  const parsed = parseMarkdownDocument("sample.md", sampleMarkdown);
  assert.equal(parsed.title, "Looponics Overview");
  assert.equal(parsed.chunks.length, 2);
  assert.equal(parsed.chunks[0].headingPath, "Looponics Overview > Web Engineering");
  assert.match(parsed.chunks[0].chunkText, /Next\.js/);
  assert.equal(parsed.chunks[1].headingPath, "Looponics Overview > Mobile Engineering");
  assert.match(parsed.chunks[1].chunkText, /React Native/);
});

test("RAG Knowledge Base - all curated documents including founder intake exist and parse cleanly", () => {
  const knowledgeDir = path.join(process.cwd(), "docs", "knowledge");
  const expectedFiles = [
    "company.md",
    "services.md",
    "process.md",
    "faq.md",
    "capabilities.md",
    "portfolio.md",
    "policies.md",
    "escalation.md",
    "LOOPONICS_FOUNDER_INTAKE_REVIEWED_2026-11-12.md",
  ];

  for (const file of expectedFiles) {
    const filePath = path.join(knowledgeDir, file);
    assert.ok(fs.existsSync(filePath), `Missing knowledge file: ${file}`);
    const content = fs.readFileSync(filePath, "utf8");
    const parsed = parseMarkdownDocument(file, content);
    assert.ok(parsed.title.length > 0);
    assert.ok(parsed.chunks.length > 0, `No chunks generated for: ${file}`);
  }
});

test("RAG Retrieval - finds relevant knowledge for web development query", async () => {
  const results = await searchKnowledge("Next.js web development services", { topK: 3 });
  assert.ok(results.length > 0);
  const matchedFiles = results.map((r) => r.filePath);
  assert.ok(
    matchedFiles.includes("services.md") || matchedFiles.includes("capabilities.md")
  );
});

test("RAG Retrieval - finds escalation channel for support query", async () => {
  const results = await searchKnowledge("contact support email human escalation", { topK: 3 });
  assert.ok(results.length > 0);
  const matchedFiles = results.map((r) => r.filePath);
  assert.ok(matchedFiles.includes("escalation.md") || matchedFiles.includes("company.md"));
});

test("RAG Context Assembly - formats sources with titles and grounding directive", () => {
  const mockChunks = [
    {
      filePath: "services.md",
      title: "Looponics Services",
      headingPath: "Looponics Services > Web Development",
      chunkText: "We engineer Next.js web applications.",
      similarity: 0.85,
    },
  ];
  const context = assembleRAGContext(mockChunks);
  assert.match(context, /VERIFIED KNOWLEDGE BASE CONTEXT/);
  assert.match(context, /services\.md/);
  assert.match(context, /STRICT GROUNDING DIRECTIVE/);
});

test("RAG Context Assembly - emits abstention directive when no chunks match", () => {
  const emptyContext = assembleRAGContext([]);
  assert.match(emptyContext, /No specific knowledge base documents matched/);
  assert.match(emptyContext, /ABSTENTION DIRECTIVE/);
  assert.match(emptyContext, /support@looponics\.tech/);
});

test("RAG Embeddings - embedding dimension constant is 768", () => {
  assert.equal(EMBEDDING_DIMENSION, 768);
});
