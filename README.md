# ACTIF GLOBAL VENTURES — Enterprise Web & RAG Chatbot Platform

> **A high-end luxury editorial web application and full-stack AI commercial liaison for ACTIF GLOBAL VENTURES PVT LTD — a sustainable, vertically integrated knitted home-textile manufacturer based in Tirupur, Tamil Nadu, India.**

---

## 🌟 Overview

This project pairs a cinematic, editorial digital showcase with an **enterprise-grade, RAG-powered AI Commercial Concierge** built directly into the web application. Designed for global retail procurement teams in **Australia, Europe, and the USA**, the platform delivers verifiable corporate capabilities, sustainability disclosures, and manufacturing metrics in real time.

- **Production URL**: [http://localhost:5173/](http://localhost:5173/)
- **Target Export Markets**: Australia, Europe, USA
- **Manufacturing Core**: 150 MT Greige Fabric / Month, 50 MT Finished Fabric / Month, 5 Export Containers / Month

---

## ⚡ Key Highlights & Developments

### 1. Built-in RAG (Retrieval-Augmented Generation) Architecture
- **100% Native TypeScript**: Runs natively on the TanStack Start / Nitro full-stack server. Zero Python dependencies and zero LangChain bloat.
- **Embedded Vector Database (`src/lib/vector-index.json`)**: Stores 3,072-dimensional dense float vectors generated via Google's `gemini-embedding-001`.
- **Hybrid Retrieval**: Combines Dense Vector Cosine Similarity with Sparse BM25 keyword matching using **Reciprocal Rank Fusion (RRF)**.
- **Sub-Second Latency**: Vector similarity math executes in Node.js memory in **under 2 milliseconds**.
- **Automated Re-indexing (`npm run reindex`)**: Easily update knowledge chunks in `actif-knowledge.ts` and sync vector embeddings with a single command.

### 2. Commercial Privacy & Security Guardrails
- **Confidential Boundaries**: The AI strictly refuses to disclose proprietary unit production costs, profit margins, internal server credentials, or brand labels protected under third-party NDAs.
- **Off-Topic Redirection**: Graciously redirects non-commercial queries back to ACTIF's manufacturing capabilities.
- **Zero-Emoji Mandate**: Clean, authoritative, B2B editorial tone with zero emojis or decorative glyph clutter.
- **Typographic Formatter**: Cleanly formats bullet points, bold product highlights, and section titles without raw markdown symbols (`###`, `* **`).

### 3. Luxury Glassmorphism & Framer Motion UI
- **Refined Glassmorphism**: Frosted translucent surfaces (`backdrop-blur-2xl bg-ivory/80`), subtle white border reflections, and multi-tier elevation shadows.
- **Organic Geometry**: Smooth `rounded-3xl` modal curves paired with `rounded-full` launcher pills.
- **Micro-Animations**: Ambient breathing ripple wave on the floating trigger, spring message transitions (`motion/react`), and wave typing indicators.

---

## 🛠️ Complete Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | **React 19**, **TanStack Router** (type-safe file-based routing) |
| **Full-Stack Server** | **TanStack Start (`createServerFn`)**, **Nitro Engine**, **Vite 8** |
| **Styling & Design** | **Tailwind CSS v4** (OKLCH palette, custom design tokens, glassmorphism) |
| **Motion & Physics** | **Motion / Framer Motion (`motion/react` v13.1.1)** |
| **Icons & Primitives** | **Lucide React**, **Radix UI** headless primitives |
| **AI & Embeddings** | **Google Gemini API (`gemini-3.7-flash` with automatic fallback to `3.6-flash`, `3.5-flash`, `flash-lite`)** |
| **Vector Engine** | **Gemini Embeddings (`gemini-embedding-001`)**, In-Memory Cosine Similarity, BM25 Lexical Index |
| **Language & Tooling** | **TypeScript 5.8**, ESLint 9, Prettier |

---

## 📂 Project Structure

```text
├── scripts/
│   └── reindex.js                  # Automated vector re-indexer script (npm run reindex)
├── src/
│   ├── components/
│   │   ├── actif/
│   │   │   ├── ChatbotIcon.tsx     # Floating launcher with ambient pulse animation
│   │   │   ├── ChatbotModal.tsx    # Glassmorphic AI advisory modal with formatted typography
│   │   │   ├── Hero.tsx            # Full-screen textile background showcase
│   │   │   ├── Capacity.tsx        # Manufacturing scale counters (150 MT / 50 MT / 5 containers)
│   │   │   ├── ESGSection.tsx      # Solar, wind, and ZLD water recycling
│   │   │   └── ...
│   │   └── ui/                     # Accessible UI components (Radix primitives)
│   ├── lib/
│   │   ├── actif-knowledge.ts      # Single source of truth corporate knowledge corpus
│   │   ├── vector-store.ts         # Cosine similarity math, BM25 search, and RRF fusion
│   │   ├── vector-index.json       # 3072-dimensional vector database
│   │   ├── multi-query-hybrid.ts   # Parallel hybrid retrieval engine
│   │   └── chat-service.ts         # Server function (createServerFn) with Gemini inference
│   ├── routes/
│   │   ├── __root.tsx              # Root HTML shell and layouts
│   │   └── index.tsx               # Main single-page application orchestrator
│   ├── server.ts                   # Universal Nitro/Node server entry
│   └── styles.css                  # Tailwind v4 theme definitions and OKLCH color tokens
├── .env.example                    # Environment variable template
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v20 or higher (v24.x recommended)
- **npm** or compatible package manager

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/HariharanM-AI/Rag-chatbot-SIM.git
cd Rag-chatbot-SIM
npm install
```

### 3. Environment Configuration
Create a `.env` file in the project root (see `.env.example`):
```bash
cp .env.example .env
```
Populate your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_PRIMARY_MODEL=gemini-3.7-flash
GEMINI_FALLBACK_MODELS=gemini-3.6-flash,gemini-3.5-flash,gemini-flash-lite-latest
```

### 4. Running the Development Server
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

---

## 🔄 Updating Knowledge & Re-indexing Vectors

When company data (capacities, products, certifications) changes:

1. Open `src/lib/actif-knowledge.ts` and update or add knowledge sections under `ACTIF_KNOWLEDGE_BASE`.
2. Run the re-indexer script:
   ```bash
   npm run reindex
   ```
3. The script recomputes the 3,072-dimensional vector embeddings and writes the updated vectors directly to `src/lib/vector-index.json`.

---

## 🔒 Privacy & Confidentiality Directives

The chatbot enforces strict commercial guardrails:
- **Restricted**: Internal factory blueprints, unit costs, profit margins, NDA client labels, or employee personal phone numbers.
- **Allowed & Verified**: Greige/finished capacities, knitted bed linen portfolio, GOTS & OEKO-TEX accreditations, ZLD water recycling, renewable energy, and official commercial contact channels (`info@actif.ltd`, `+91 98946 02235`).

---

## 📜 License & Attribution

Developed for **ACTIF GLOBAL VENTURES PVT LTD**. All brand assets, corporate specifications, and manufacturing data are proprietary to ACTIF Global Ventures.
