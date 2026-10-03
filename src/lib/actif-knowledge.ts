/**
 * ACTIF GLOBAL VENTURES — Official Verified Knowledge Corpus
 * Source of truth: Company documentation and technical specifications.
 */

export interface KnowledgeSection {
  id: string;
  category: string;
  title: string;
  keywords: string[];
  content: string;
  citation: string;
}

export const ACTIF_KNOWLEDGE_BASE: KnowledgeSection[] = [
  {
    id: "company-overview",
    category: "Brand & Corporate",
    title: "About ACTIF Global Ventures Pvt Ltd",
    keywords: ["who", "about", "company", "location", "tirupur", "headquarters", "overview", "founded", "history", "identity"],
    content: `ACTIF GLOBAL VENTURES PVT LTD is a premier, future-ready manufacturer of sustainable knitted home textiles headquartered in Tirupur, Tamil Nadu, India — widely recognized as India's Knitwear Capital.
The company operates on a vertically integrated 'knit-to-pack' model, controlling the entire manufacturing journey under one roof from yarn sourcing to knitted fabric production, dyeing, functional finishing, cutting, sewing, and final retail-ready packaging.
Primary export markets served include Australia, Europe, and the United States of America.
Website: https://actif.ltd | Official Inquiries: info@actif.ltd | Corporate Line: +91 98946 02235`,
    citation: "01 — WHO WE ARE",
  },
  {
    id: "manufacturing-capacity",
    category: "Operations & Capacity",
    title: "Manufacturing Capacity & Operational Scale",
    keywords: ["capacity", "scale", "volume", "containers", "mt", "metric tons", "fabric", "greige", "finished", "output", "production"],
    content: `ACTIF's operational metrics are strictly audited and verified:
- Greige Fabric Capacity: 150 Metric Tons (MT) per month.
- Finished Fabric Capacity: 50 Metric Tons (MT) per month.
- Global Shipping Output: 5 export containers per month.
- Production Flexibility: Rapid turnaround from initial lab dips and sample development to full commercial bulk container dispatch. Scale is engineered to flex dynamically to retail brand programmes.`,
    citation: "08 — MANUFACTURING CAPACITY",
  },
  {
    id: "product-portfolio",
    category: "Products & Materials",
    title: "Knitted Bed Linen & Textile Collections",
    keywords: ["products", "bedding", "sheets", "pillow", "duvet", "baby", "hospitality", "linen", "materials", "cotton", "bamboo", "tencel", "fabrics"],
    content: `ACTIF produces a complete range of luxury knitted home textiles and bed linen:
- Product Categories: Knitted Bed Sheets, Precision Fitted Sheets, Envelope & Oxford Pillow Cases, Knitted Duvet Covers, Baby Bedding Collection, and Luxury Hospitality & Hotel Collections.
- Approved Fibre Matrix: Certified Organic Cotton, Regenerated Bamboo Lyocell, TENCEL Modal & Lyocell, Premium French/European Flax Linen, and high-performance sustainable blends.
- Knit Structures: Single Jersey, Interlock, Rib knits, and specialized textured circular knits offering superior breathability, thermal adaptability, and cloud-like hand feel.`,
    citation: "09 — PRODUCT PORTFOLIO",
  },
  {
    id: "esg-sustainability",
    category: "ESG & Sustainability",
    title: "ESG Framework & Circular Manufacturing",
    keywords: ["esg", "sustainability", "environmental", "social", "governance", "green", "carbon", "water", "renewable", "solar", "wind", "zld"],
    content: `Sustainability is engineered directly into every manufacturing column rather than added retrospectively:
- Environmental: Powered predominantly by captive solar and wind renewable energy installations. Zero Liquid Discharge (ZLD) effluent treatment recovers and recycles over 95% of processing water. Non-hazardous, closed-loop green chemistry.
- Social: Certified ethical labor practices, fair living wages, comprehensive worker health and safety compliance, gender equality, and ongoing technical skill development programs.
- Governance: 100% supply chain transparency, Digital Product Passport (DPP) readiness, verified batch-level traceability, and strict adherence to international anti-bribery and compliance protocols.`,
    citation: "03 — ESG INTEGRATED MANUFACTURING",
  },
  {
    id: "digital-product-passport",
    category: "Technology & Compliance",
    title: "Digital Product Passport (DPP) & Traceability",
    keywords: ["dpp", "digital product passport", "traceability", "qr", "europe", "compliance", "transparency", "supply chain", "tracking"],
    content: `ACTIF is fully equipped for European Union Digital Product Passport (DPP) mandates:
- Every product batch carries end-to-end provenance data from farm and spinning mill to finished pack.
- QR-code and RFID enabled DPP tracking provides brand partners and retail end-consumers full visibility into fibre origin, water footprint, carbon footprint, chemical compliance, and recyclability instructions.`,
    citation: "05 — FUTURE-READY SUPPLY CHAIN",
  },
  {
    id: "hygiene-wellness",
    category: "Textile Science",
    title: "Hygiene, Wellness & Antimicrobial Finishes",
    keywords: ["hygiene", "wellness", "antimicrobial", "antibacterial", "odour", "skin", "hypoallergenic", "finishing", "chemical-free"],
    content: `ACTIF pioneers wellness-oriented textile finishes designed for sensitive skin and prolonged hygiene:
- Chemical-Free Antimicrobial Protection: Safe, non-toxic bio-based antimicrobial agents that inhibit bacterial proliferation and odour formation without leaching hazardous chemicals.
- Wash Durability: Antimicrobial and freshness properties verified to endure 50+ industrial and domestic laundry cycles.
- Dermatologically Safe: Hypoallergenic, skin-friendly, and OEKO-TEX Class 1 safe (approved for infants and sensitive sleepers).`,
    citation: "06 — HYGIENE & WELLNESS",
  },
  {
    id: "value-added-finishes",
    category: "Textile Science",
    title: "Functional & Performance Textile Finishes",
    keywords: ["finishes", "functional", "moisture", "wicking", "soil release", "easy care", "soft finish", "treatments", "technical"],
    content: `Engineered performance finishes tailored to brand buyer specifications:
01 — Soil & Stain Release: Advanced hydrophilic molecular finish allowing dirt and oils to release easily during standard washing.
02 — Moisture Management: Dynamic capillary wicking that pulls perspiration away from the skin for rapid ambient evaporation.
03 — Soft Finish: Ultra-luxurious hand-feel achieved through mechanical and enzymatic softening without degrading fibre tensile strength.
04 — Easy Care: Wrinkle-resistant, minimal-shrinkage dimensional stability for effortless consumer maintenance.
05 — Bespoke Client Chemistry: Customized functional treatments developed on request to meet specific international retailer criteria.`,
    citation: "07 — VALUE-ADDED FINISHES",
  },
  {
    id: "certifications",
    category: "Quality & Certifications",
    title: "Global Compliance & Accreditations",
    keywords: ["certifications", "gots", "oeko-tex", "sedex", "smeta", "bsci", "zdhc", "iso", "compliance", "audit", "standards"],
    content: `ACTIF holds global accreditations audited by independent third-party inspection bodies:
- Environmental: Global Organic Textile Standard (GOTS) for organic fibre processing; OEKO-TEX Standard 100 (Appendix 4 / 6, Product Class I & II) ensuring zero harmful substances.
- Chemical Safety: Zero Discharge of Hazardous Chemicals (ZDHC) Level 3 conformance.
- Social & Ethical: SEDEX SMETA 4-Pillar audit compliant, BSCI audited ethical factory floor.
- Digital & Regulatory: Full readiness for EU Ecodesign for Sustainable Products Regulation (ESPR) and DPP compliance.`,
    citation: "10 — GLOBAL CERTIFICATIONS",
  },
  {
    id: "un-sdgs",
    category: "ESG & Sustainability",
    title: "United Nations Sustainable Development Goals",
    keywords: ["sdg", "un", "united nations", "goals", "sdg 6", "sdg 7", "sdg 8", "sdg 9", "sdg 12", "sdg 13"],
    content: `ACTIF directly contributes to six targeted United Nations Sustainable Development Goals:
- SDG 06 (Clean Water & Sanitation): State-of-the-art ZLD effluent treatment plant and water recycling.
- SDG 07 (Affordable & Clean Energy): Wind and solar power generation across manufacturing units.
- SDG 08 (Decent Work & Economic Growth): Fair living wages, safe working conditions, social security.
- SDG 09 (Industry, Innovation & Infrastructure): Modernized energy-efficient circular knitting and finishing lines.
- SDG 12 (Responsible Consumption & Production): Organic and circular fibres with zero hazardous chemical discharge.
- SDG 13 (Climate Action): Measurable Scope 1 and Scope 2 carbon footprint reduction targets.`,
    citation: "11 — UN SUSTAINABLE DEVELOPMENT GOALS",
  },
  {
    id: "contact-orders",
    category: "Commercial & Contact",
    title: "Commercial Inquiries, Sampling & Contact Details",
    keywords: ["contact", "email", "phone", "inquiry", "quote", "samples", "moq", "order", "partner", "sales", "address"],
    content: `For commercial procurement, fabric swatch bookings, container pricing, or technical consultations:
- Company: ACTIF GLOBAL VENTURES PVT LTD
- Corporate Office & Mills: Tirupur, Tamil Nadu, India
- Official Email: info@actif.ltd
- Digital Portal: https://actif.ltd
- Direct Telephone: +91 98946 02235
- Inquiry Procedure: Prospective international brands can request fabric swatch books, laboratory dip approvals, or complete tech pack evaluations directly via the inquiry form or email.`,
    citation: "22 — CONTACT SECTION",
  },
];

/**
 * Confidential Boundaries & Guardrail Directives
 */
export const SENSITIVE_TOPICS_DIRECTIVE = `
STRICT RESTRICTION DIRECTIVE — CONFIDENTIAL DATA & PRIVACY BOUNDARIES:
You are the official digital concierge for ACTIF GLOBAL VENTURES PVT LTD.
You MUST strictly uphold data privacy and confidentiality boundaries:
1. RESTRICTED INFORMATION:
   - Proprietary unit production costs, profit margins, raw fiber buying rates, and unquoted commercial discount formulas.
   - Internal factory blueprints, private server architectures, database credentials, API keys, and employee personal mobile/home details.
   - Specific brand labels manufactured under third-party Non-Disclosure Agreements (NDAs).
   - Any proprietary corporate financial accounts or unpublished executive communications.

2. WHEN RESTRICTED INFORMATION IS REQUESTED:
   - Provide an authoritative, polite, professional refusal.
   - Example response: "That information is proprietary to ACTIF Global Ventures and protected under commercial confidentiality policies. For certified inquiries or custom commercial discussions, please connect directly with our executive team at info@actif.ltd or +91 98946 02235."

3. UNRELATED / OFF-TOPIC QUERIES:
   - If the user asks about topics completely unrelated to ACTIF, textiles, manufacturing, ESG, or home bedding (such as general programming, unrelated trivia, or competitor gossip), politely redirect them back to ACTIF's operations and capabilities.

4. TONE AND STYLE MANDATE:
   - ZERO EMOJIS: Never use emojis under any circumstance.
   - Authoritative, refined, editorial, and concise luxury B2B tone.
   - Clear markdown formatting with brief bullet points or paragraphs.
   - Deliver direct answers to the user without adding source citations, footnotes, or section references.
`;

/**
 * Semantic & keyword relevance search for RAG context extraction
 */
export function retrieveRelevantKnowledge(query: string, maxResults = 3): KnowledgeSection[] {
  const normalizedQuery = query.toLowerCase();
  const queryTokens = normalizedQuery.split(/[\s,?.!]+/).filter((t) => t.length > 2);

  const scored = ACTIF_KNOWLEDGE_BASE.map((section) => {
    let score = 0;

    // Check title match
    if (normalizedQuery.includes(section.title.toLowerCase())) {
      score += 15;
    }

    // Check keyword matches
    for (const kw of section.keywords) {
      if (normalizedQuery.includes(kw)) {
        score += 8;
      }
    }

    // Check token matches against keywords and content
    for (const token of queryTokens) {
      if (section.keywords.some((kw) => kw.includes(token))) {
        score += 4;
      }
      if (section.content.toLowerCase().includes(token)) {
        score += 1;
      }
    }

    return { section, score };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // Return top matches that have non-zero relevance score
  const matches = scored.filter((item) => item.score > 0).map((item) => item.section);

  if (matches.length === 0) {
    // Default fallback to company overview and capacity
    const first = ACTIF_KNOWLEDGE_BASE[0];
    const second = ACTIF_KNOWLEDGE_BASE[1];
    return [first!, second!].filter(Boolean) as KnowledgeSection[];
  }

  return matches.slice(0, maxResults);
}
