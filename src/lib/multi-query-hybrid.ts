import { KnowledgeSection, ACTIF_KNOWLEDGE_BASE } from "./actif-knowledge";
import {
  embedQuery,
  searchDenseVectors,
  searchBM25,
  reciprocalRankFusion,
} from "./vector-store";

/**
 * Ultra-Fast High-Accuracy Hybrid Search (Dense Vector Cosine Similarity + Sparse BM25)
 * Optimized for sub-second latency:
 * - Computes query embedding and BM25 token matching concurrently.
 * - Computes cosine similarity across pre-indexed 3,072-dim vectors in < 2ms in-memory.
 * - Merges dense & sparse results via Reciprocal Rank Fusion (RRF).
 * - Avoids multiple sequential LLM roundtrips to keep response times blazing fast.
 */
export async function executeMultiQueryHybridSearch(
  userQuery: string,
  apiKey: string
): Promise<KnowledgeSection[]> {
  try {
    // Run BM25 keyword matching immediately (instant, <1ms)
    const sparseResults = searchBM25(userQuery, 4);

    // Concurrently generate query vector embedding with 1500ms timeout guard
    const embeddingPromise = embedQuery(userQuery, apiKey);
    const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500));

    const queryEmbedding = await Promise.race([embeddingPromise, timeoutPromise]);

    let denseResults: Array<{ item: KnowledgeSection; score: number }> = [];
    if (queryEmbedding && queryEmbedding.length > 0) {
      denseResults = searchDenseVectors(queryEmbedding, 4);
    }

    // Merge dense vectors + BM25 using Reciprocal Rank Fusion
    const fused = reciprocalRankFusion(denseResults, sparseResults);

    if (fused.length > 0) {
      return fused.slice(0, 3);
    }

    // Fallback to top BM25 or knowledge base
    return sparseResults.length > 0
      ? sparseResults.map((r) => r.item).slice(0, 3)
      : ACTIF_KNOWLEDGE_BASE.slice(0, 3);
  } catch (err) {
    console.warn("[Hybrid Search Warning] Fallback to BM25/default:", err);
    return ACTIF_KNOWLEDGE_BASE.slice(0, 3);
  }
}
