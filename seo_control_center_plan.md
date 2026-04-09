# BBC SEO + AEO Audit Suite — Implementation Plan

## Architecture Overview

**Pattern:** Localhost-only, dev-only, read-only intelligence tools.  
**Data Flow:** `pageTypeMap.ts` + `site-registry.ts` → static TS data → server pages → client UIs  
**Route Base:** `/seo-control-center/*`

---

## File Delivery Checklist

### Phase 0 — Foundation
| File | Description |
|------|-------------|
| `lib/seo/site-registry.ts` | Extended registry: angle, family, intent, cluster, queryBank, trustSignals |
| `lib/seo/pageTypeMap.ts` | Register `/seo-control-center/*` as utility |

### Paket A — Foundation Intelligence
| File | Tool |
|------|------|
| `app/seo-control-center/page.tsx` | Master Dashboard server |
| `app/seo-control-center/ControlCenterClient.tsx` | Master Dashboard UI |
| `app/seo-control-center/entity-audit/page.tsx` | Tool 1 server |
| `app/seo-control-center/entity-audit/EntityAuditClient.tsx` | Tool 1 UI |
| `app/seo-control-center/answer-extraction/page.tsx` | Tool 3 server |
| `app/seo-control-center/answer-extraction/AnswerExtractionClient.tsx` | Tool 3 UI |
| `app/seo-control-center/trust-scanner/page.tsx` | Tool 5 server |
| `app/seo-control-center/trust-scanner/TrustScannerClient.tsx` | Tool 5 UI |

### Paket B — Ranking Control
| File | Tool |
|------|------|
| `app/seo-control-center/authority-analyzer/page.tsx` | Tool 4 server |
| `app/seo-control-center/authority-analyzer/AuthorityAnalyzerClient.tsx` | Tool 4 UI |
| `app/seo-control-center/crawl-audit/page.tsx` | Tool 6 server |
| `app/seo-control-center/crawl-audit/CrawlAuditClient.tsx` | Tool 6 UI |

### Paket C — Answer Engine Expansion
| File | Tool |
|------|------|
| `app/seo-control-center/intent-map/page.tsx` | Tool 7 server |
| `app/seo-control-center/intent-map/IntentMapClient.tsx` | Tool 7 UI |
| `app/seo-control-center/llm-scanner/page.tsx` | Tool 2 server |
| `app/seo-control-center/llm-scanner/LLMScannerClient.tsx` | Tool 2 UI |

---

## Scoring Formulas

### Entity Clarity Score (0-100)
- 30pt: H1 matches entity + angle from registry
- 25pt: Angle uniqueness vs same-cluster pages
- 20pt: Heading uniqueness (H2 not duplicated across siblings)
- 15pt: Intent consistency (title language matches intent)
- 10pt: CTA alignment by page type

### Answer Extraction Score (0-100)
- 25pt: Direct answer block (wordCount > 400 + rich H2)
- 20pt: FAQ (schemaTypes includes FAQPage)
- 15pt: Entity clarity (H1 present)
- 15pt: Trust signals present
- 10pt: Schema coverage
- 10pt: isIndexable + not orphan
- 5pt: Freshness (canonical + sitemap)

### Trust & Verifiability Score (0-100)
- 20pt: Brand mention in title/description
- 20pt: Location mention (Jakarta Selatan/Pesanggrahan)
- 20pt: Schema LocalBusiness or Organization
- 20pt: Trust signal patterns (2007, 1.800+, Ganesha)
- 20pt: Has trust/support link

### LLM Citation Readiness Score (0-100)
- 25pt: Direct answer block
- 20pt: FAQ exactness
- 15pt: Entity clarity
- 15pt: Trust signals
- 10pt: Schema support
- 10pt: Has inbound links
- 5pt: Freshness markers
