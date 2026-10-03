/**
 * Automated Vector Database Re-indexer for ACTIF Global Ventures
 *
 * Run this script whenever you update company documentation or add new data to:
 * src/lib/actif-knowledge.ts
 *
 * Usage:
 * npm run reindex
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

async function reindex() {
  console.log("Starting Vector Database Re-indexing...");

  // Load API key from .env if present
  let apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const envPath = path.join(rootDir, ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(/GEMINI_API_KEY=(.*)/);
      if (match && match[1]) {
        apiKey = match[1].trim();
      }
    }
  }

  if (!apiKey) {
    console.error("Error: GEMINI_API_KEY not found in .env or environment variables.");
    process.exit(1);
  }

  const knowledgePath = path.join(rootDir, "src", "lib", "actif-knowledge.ts");
  const knowledgeModule = await import("file://" + knowledgePath.replace(/\\/g, "/"));
  const knowledgeBase = knowledgeModule.ACTIF_KNOWLEDGE_BASE;

  if (!knowledgeBase || knowledgeBase.length === 0) {
    console.error("No knowledge entries found in src/lib/actif-knowledge.ts");
    process.exit(1);
  }

  console.log(`Generating 3072-dimensional vector embeddings for ${knowledgeBase.length} knowledge chunks...`);

  const vectors = [];

  for (const item of knowledgeBase) {
    const textToEmbed = `${item.title}\n${item.keywords.join(" ")}\n${item.content}`;
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: { parts: [{ text: textToEmbed }] },
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.warn(`Failed to embed ${item.id}:`, errText.slice(0, 100));
        continue;
      }

      const data = await res.json();
      if (data.embedding && data.embedding.values) {
        vectors.push({
          id: item.id,
          category: item.category,
          title: item.title,
          citation: item.citation,
          content: item.content,
          keywords: item.keywords,
          embedding: data.embedding.values,
        });
        console.log(`Indexed vector: [${item.id}] ${item.title}`);
      }
    } catch (e) {
      console.error(`Error processing ${item.id}:`, e.message);
    }
  }

  const outputPath = path.join(rootDir, "src", "lib", "vector-index.json");
  fs.writeFileSync(outputPath, JSON.stringify(vectors, null, 2));

  console.log(`SUCCESS! Vector Database saved to: ${outputPath}`);
  console.log(`Total indexed items: ${vectors.length}`);
}

reindex();
