import vectorIndexRaw from "./vector-index.json";
import { KnowledgeSection, ACTIF_KNOWLEDGE_BASE } from "./actif-knowledge";

export interface VectorItem extends KnowledgeSection {
  embedding: number[];
}

const VECTOR_DATABASE: VectorItem[] = vectorIndexRaw as VectorItem[];

/**
 * Calculates Cosine Similarity between two dense numeric vectors.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (!a || !b || a.length !== b.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    const valA = a[i] ?? 0;
    const valB = b[i] ?? 0;
    dotProduct += valA * valB;
    normA += valA * valA;
    normB += valB * valB;
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Generates an embedding for a text query using Gemini's gemini-embedding-001 model.
 */
export async function embedQuery(text: string, apiKey: string): Promise<number[] | null> {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: { parts: [{ text }] },
      }),
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.embedding?.values || null;
  } catch (err) {
    console.warn("[Embed Error] Failed to generate embedding:", err);
    return null;
  }
}

/**
 * Dense Vector Search: Computes cosine similarity across all indexed vectors.
 */
export function searchDenseVectors(
  queryEmbedding: number[],
  topK = 5
): Array<{ item: KnowledgeSection; score: number }> {
  const scored = VECTOR_DATABASE.map((v) => ({
    item: {
      id: v.id,
      category: v.category,
      title: v.title,
      keywords: v.keywords,
      content: v.content,
      citation: v.citation,
    },
    score: cosineSimilarity(queryEmbedding, v.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}

/**
 * Sparse BM25 Keyword Search: Computes term frequency and token matching.
 */
export function searchBM25(
  query: string,
  topK = 5
): Array<{ item: KnowledgeSection; score: number }> {
  const tokens = query
    .toLowerCase()
    .split(/[\s,?.!]+/)
    .filter((t) => t.length > 2);

  const scored = ACTIF_KNOWLEDGE_BASE.map((section) => {
    let score = 0;
    const lowerTitle = section.title.toLowerCase();
    const lowerContent = section.content.toLowerCase();

    for (const token of tokens) {
      if (lowerTitle.includes(token)) score += 8;
      for (const kw of section.keywords) {
        if (kw.includes(token)) score += 5;
      }
      if (lowerContent.includes(token)) score += 2;
    }

    return { item: section, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}

/**
 * Reciprocal Rank Fusion (RRF): Combines Dense Vector and Sparse Keyword rankings.
 */
export function reciprocalRankFusion(
  denseRankings: Array<{ item: KnowledgeSection; score: number }>,
  sparseRankings: Array<{ item: KnowledgeSection; score: number }>,
  k = 60
): KnowledgeSection[] {
  const rrfScores: Map<string, { item: KnowledgeSection; rrf: number }> = new Map();

  // Add Dense RRF points
  denseRankings.forEach((entry, rank) => {
    const id = entry.item.id;
    const current = rrfScores.get(id) || { item: entry.item, rrf: 0 };
    current.rrf += 1 / (k + rank + 1);
    rrfScores.set(id, current);
  });

  // Add Sparse RRF points
  sparseRankings.forEach((entry, rank) => {
    const id = entry.item.id;
    const current = rrfScores.get(id) || { item: entry.item, rrf: 0 };
    current.rrf += 1 / (k + rank + 1);
    rrfScores.set(id, current);
  });

  const merged = Array.from(rrfScores.values());
  merged.sort((a, b) => b.rrf - a.rrf);

  return merged.map((entry) => entry.item);
}
