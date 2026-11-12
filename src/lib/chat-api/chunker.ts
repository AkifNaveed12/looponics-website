import crypto from "crypto";

export interface KnowledgeChunk {
  headingPath: string;
  chunkText: string;
  tokenCount: number;
  metadata: {
    title: string;
    filePath: string;
    section: string;
    hash: string;
  };
}

export interface ParsedDocument {
  filePath: string;
  title: string;
  contentHash: string;
  chunks: KnowledgeChunk[];
}

/**
 * Approximate token count (~4 characters per token in English).
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.trim().length / 4);
}

/**
 * Computes SHA-256 hash of a string.
 */
export function computeHash(content: string): string {
  return crypto.createHash("sha256").update(content, "utf8").digest("hex");
}

/**
 * Strips out sections marked as NEEDS_OWNER_CONFIRMATION from answerable content.
 */
export function filterUnconfirmedContent(markdown: string): string {
  // Matches <!-- NEEDS_OWNER_CONFIRMATION: ... --> up to next section or comment
  const commentRegex = /<!--\s*NEEDS_OWNER_CONFIRMATION[\s\S]*?-->/gi;
  return markdown.replace(commentRegex, "").trim();
}

/**
 * Parses a markdown document, extracts headings and sections,
 * and splits into semantic chunks (approx 200-450 tokens each).
 */
export function parseMarkdownDocument(
  filePath: string,
  rawContent: string
): ParsedDocument {
  const contentHash = computeHash(rawContent);
  const cleanContent = filterUnconfirmedContent(rawContent);

  const lines = cleanContent.split("\n");
  let documentTitle = "Looponics Knowledge";

  // Check top-level H1 title
  const h1Match = cleanContent.match(/^#\s+(.+)$/m);
  if (h1Match) {
    documentTitle = h1Match[1].trim();
  }

  const sections: { heading: string; lines: string[] }[] = [];
  let currentHeading = documentTitle;
  let currentLines: string[] = [];

  for (const line of lines) {
    // Skip H1 title line as it is already captured in documentTitle
    if (line.match(/^#\s+/)) {
      continue;
    }

    // Check if line is a header (## or ###)
    const headerMatch = line.match(/^(#{2,4})\s+(.+)$/);
    if (headerMatch) {
      if (currentLines.length > 0) {
        sections.push({
          heading: currentHeading,
          lines: currentLines,
        });
        currentLines = [];
      }
      currentHeading = `${documentTitle} > ${headerMatch[2].trim()}`;
    } else {
      currentLines.push(line);
    }
  }

  if (currentLines.length > 0) {
    sections.push({
      heading: currentHeading,
      lines: currentLines,
    });
  }

  const chunks: KnowledgeChunk[] = [];

  for (const section of sections) {
    const sectionText = section.lines.join("\n").trim();
    if (!sectionText) continue;

    // Check token estimate
    const tokens = estimateTokens(sectionText);

    if (tokens <= 450) {
      chunks.push({
        headingPath: section.heading,
        chunkText: sectionText,
        tokenCount: tokens,
        metadata: {
          title: documentTitle,
          filePath,
          section: section.heading,
          hash: computeHash(sectionText),
        },
      });
    } else {
      // Split large sections by paragraphs
      const paragraphs = sectionText.split(/\n\s*\n/);
      let currentChunkParagraphs: string[] = [];
      let currentChunkTokens = 0;

      for (const p of paragraphs) {
        const pTrimmed = p.trim();
        if (!pTrimmed) continue;
        const pTokens = estimateTokens(pTrimmed);

        if (currentChunkTokens + pTokens > 400 && currentChunkParagraphs.length > 0) {
          const chunkText = currentChunkParagraphs.join("\n\n");
          chunks.push({
            headingPath: section.heading,
            chunkText,
            tokenCount: currentChunkTokens,
            metadata: {
              title: documentTitle,
              filePath,
              section: section.heading,
              hash: computeHash(chunkText),
            },
          });
          currentChunkParagraphs = [];
          currentChunkTokens = 0;
        }

        currentChunkParagraphs.push(pTrimmed);
        currentChunkTokens += pTokens;
      }

      if (currentChunkParagraphs.length > 0) {
        const chunkText = currentChunkParagraphs.join("\n\n");
        chunks.push({
          headingPath: section.heading,
          chunkText,
          tokenCount: currentChunkTokens,
          metadata: {
            title: documentTitle,
            filePath,
            section: section.heading,
            hash: computeHash(chunkText),
          },
        });
      }
    }
  }

  return {
    filePath,
    title: documentTitle,
    contentHash,
    chunks,
  };
}
