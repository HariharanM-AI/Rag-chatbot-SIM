import { createServerFn } from "@tanstack/react-start";
import {
  ACTIF_KNOWLEDGE_BASE,
  SENSITIVE_TOPICS_DIRECTIVE,
  KnowledgeSection,
} from "./actif-knowledge";
import { executeMultiQueryHybridSearch } from "./multi-query-hybrid";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ChatRequestPayload {
  message: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
}

export interface ChatResponsePayload {
  reply: string;
}

/**
 * Regex to rigorously strip any emojis or pictorial symbols from the output.
 */
function sanitizeOutput(text: string): string {
  return text
    .replace(
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
      ""
    )
    .replace(/ {2,}/g, " ")
    .trim();
}

/**
 * Server Function: Executes Multi-Query Hybrid Search + Reranking + Gemini Inference
 */
export const sendChatMessage = createServerFn({ method: "POST" })
  .validator((data: ChatRequestPayload) => data)
  .handler(async ({ data }): Promise<ChatResponsePayload> => {
    const userMessage = data.message.trim();
    if (!userMessage) {
      return {
        reply: "Please enter a valid inquiry regarding ACTIF Global Ventures.",
      };
    }

    const apiKey =
      (typeof process !== "undefined" && process.env["GEMINI_API_KEY"]) || "";

    const candidateModels = [
      (typeof process !== "undefined" && process.env["GEMINI_PRIMARY_MODEL"]) ||
        "gemini-3.7-flash",
      "gemini-3.6-flash",
      "gemini-3.5-flash",
      "gemini-flash-lite-latest",
    ];

    // Multi-Query Hybrid Search (Dense Vectors + BM25) + Cross-Encoder Reranking
    const retrievedSections: KnowledgeSection[] = await executeMultiQueryHybridSearch(
      userMessage,
      apiKey
    );

    const knowledgeSnippet = retrievedSections
      .map((s) => `### ${s.title}\n${s.content}`)
      .join("\n\n");

    // Enterprise System Instructions
    const systemInstructionText = `
You are the official Senior Executive Liaison for ACTIF GLOBAL VENTURES PVT LTD (Headquarters & Mills: Tirupur, Tamil Nadu, India — India's Knitwear Capital).

ROLE:
Represent ACTIF Global Ventures to international retail brands, institutional sourcing directors, and procurement executives across Australia, Europe, and the USA.

CRITICAL DIRECTIVES:
1. ZERO EMOJIS: Do not include emojis, graphical icons, or casual pictograms under any circumstance.
2. CLEAN EDITORIAL FORMATTING:
   - Present answers in well-organized, readable paragraphs and clean bullet points.
   - Do NOT use markdown heading hashtags (such as ### or ##).
   - Use bold titles (e.g. **Category:**) followed by concise details.
   - Avoid symbol clutter, asterisks spam, or decorative characters.
3. SOURCE GROUNDING: Ground your response strictly in the verified corporate technical specifications provided below. Do not fabricate unverified claims.
4. DIRECT ANSWER ONLY: Provide a clean, articulate, and well-structured answer. Do not add reference tags, section markers, or citation footnotes.
5. CONFIDENTIALITY & PRIVACY BOUNDARIES:
   ${SENSITIVE_TOPICS_DIRECTIVE}

VERIFIED CORPORATE KNOWLEDGE:
${knowledgeSnippet}
`;

    // Prepare message history
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (data.history && data.history.length > 0) {
      const recentHistory = data.history.slice(-6);
      for (const msg of recentHistory) {
        contents.push({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        });
      }
    }

    contents.push({
      role: "user",
      parts: [{ text: userMessage }],
    });

    let rawReply = "";

    // Generation loop with model fallback
    for (const model of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const payload = {
          systemInstruction: {
            parts: [{ text: systemInstructionText }],
          },
          contents,
          generationConfig: {
            temperature: 0.2,
            topP: 0.85,
            maxOutputTokens: 600,
          },
        };

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const json = await response.json();
          const candidate = json.candidates?.[0];
          const textPart = candidate?.content?.parts?.[0]?.text;
          if (textPart) {
            rawReply = textPart;
            break;
          }
        }
      } catch (err: unknown) {
        console.warn(`[Gemini Error] Model ${model} execution error:`, err);
      }
    }

    // Deterministic fallback if all endpoints failed
    if (!rawReply) {
      const fallbackTopic = retrievedSections[0] ?? ACTIF_KNOWLEDGE_BASE[0];
      const topicTitle = fallbackTopic?.title ?? "manufacturing capabilities";
      rawReply = `ACTIF Global Ventures operates as an integrated knit-to-pack manufacturer in Tirupur, India, producing 150 MT greige fabric and 50 MT finished fabric monthly with 5 export containers. For specialized commercial inquiries regarding ${topicTitle}, please connect with our executive desk at info@actif.ltd or +91 98946 02235.`;
    }

    const sanitizedReply = sanitizeOutput(rawReply);

    return {
      reply: sanitizedReply,
    };
  });
