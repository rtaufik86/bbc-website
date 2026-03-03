# IMPLEMENATION MASTER PLAN: BINTARO BUSINESS CENTRE
**Status:** ACTIVE | **Last Updated:** 2026-02-10
**Documents Integrated:**
1. Site Structure & Internal Linking Map
2. Supplementary Doc V1: Internal Linking Execution Guide
3. Supplementary Doc V2: Technical SEO & Content Quality Rules
4. **BBC Website Design System Foundation (v1.0)**

---

## 📅 PHASING OVERVIEW

| Phase | Focus | Status |
|-------|-------|--------|
| **Phase 1** | **Structural Foundation** (Layout, Routing, Components) | ✅ **COMPLETED** |
| **Phase 2** | **Content & Internal Linking Execution** (SEO Pages) | ✅ **COMPLETED** |
| **Phase 3** | **Technical SEO, Assets & Design System** | ⏳ PENDING |
| **Phase 4** | **Future Expansion** (Blog, FAQs, etc.) | 🔮 PLANNED (Month 3+) |

---

## ✅ PHASE 1: STRUCTURAL FOUNDATION (Completed)
- **Core:** Next.js 14 App Router setup, Tailwind config (BBC Blue/Gold).
- **Pages:** 17 Total (1 Homepage, 5 Money, 8 SEO, 3 Support).
- **Components:** 30+ Reusable Components (UI, Navigation, Service, CTA).
- **Initial Schema:** Organization, LocalBusiness, Service, Article.
- **Domain:** Fixed `bintarobusinesscentre.com` spelling.

---

## 🔄 PHASE 2: CONTENT & INTERNAL LINKING EXECUTION (Current)
**Objective:** Populate all 8 SEO pages with high-quality content and strategic internal links.

### 📝 Execution Rules (Per Page)
1.  **Anchor Text Distribution (40/30/20/10):**
    -   40% Brand + Service (e.g., "sewa kantor Bintaro Business Center")
    -   30% Service + Location (e.g., "virtual office Jakarta Selatan")
    -   20% Generic/CTA (e.g., "lihat paket kami", "hubungi kami")
    -   10% Naked/Descriptive (e.g., "bintarobusinesscentre.com")
2.  **First Link Rule:** First internal link must appear within the first 300 words.
3.  **Related Content:** Every SEO page must end with the `RelatedContent` component linking to 2-3 pages in the same silo.
4.  **Content Quality:** 
    -   Headings: H1 (1x), H2 (Keyword rich), H3 (Long-tail).
    -   Meta Description: 150-160 chars.
    -   Mobile-First: Short paragraphs (2-3 sentences), Bullet points.

### 📋 Page-by-Page Status
**HUB Pages:**
- [x] `/sewa-kantor-bintaro` (Final Copy Locked)
- [x] `/virtual-office-jakarta-selatan`
- [x] `/pendirian-pt-jakarta-selatan`

**SPOKE Pages:**
- [x] `/harga-sewa-kantor-bintaro` (Completed with full content & linking)
- [x] `/kantor-siap-pakai-bintaro`
- [x] `/sewa-kantor-murah-jakarta-selatan`
- [x] `/sewa-kantor-jakarta-selatan`
- [x] `/alamat-bisnis-jakarta-selatan`

---

## ⏳ PHASE 3: TECHNICAL SEO, ASSETS & DESIGN SYSTEM
**Objective:** Ensure the site is crawlable, indexable, and visually pro (adhering to Design System v1.0).

### 1. Image Optimization & Assets
- [x] **Hero Images:** Add distinct hero images for all 17 pages (1200x630px).
- [ ] **Alt Text:** Apply "Service + Location + Feature" formula.
- [ ] **File Names:** `service-location-feature.jpg` convention.
- [x] **OG Images:** Create specific Open Graph images for shared links.

### 2. Advanced Technical Configuration
- [x] **Canonical URLs:** Add self-referencing canonicals to all pages (stripping params).
- [x] **Sitemap.xml:** Ensure all 17 pages are included with correct priorities (1.0 - 0.5).
- [x] **Robots.txt:** Allow all, block nothing critical.
- [ ] **Environment Variables:** Set API keys, WhatsApp numbers, Pixel IDs.

### 3. Schema Validation
- [ ] **Rich Results Test:** Validate every single page URL.
- [ ] **Fix Errors:** Address 'missing image', 'invalid price' errors immediately.

### 4. Design System Integration (NEW)
- [ ] **Reference Doc:** `DESIGN_SYSTEM.md` (See root directory)
- [ ] **Audit:** Verify strict adherence to Color System (#1E3A8A, #F59E0B) and Typography (Inter).
- [ ] **Components:** Standardize Buttons, Forms, and Cards to 8px grid.
- [ ] **Performance:** Ensure LCP < 2.5s and Cumulative Layout Shift < 0.1.

---

## 🔮 PHASE 4: FUTURE EXPANSION (Post-Launch / Month 3+)
**Objective:** Scale based on user data.

### Priority 0.4 - Conversion Support (Trigger: User Confusion)
- [ ] `/faq` (Aggregated FAQ)
- [ ] `/proses-sewa` (Step-by-step guide)
- [ ] `/testimoni` (Client success stories)

### Priority 0.6 - Content Hubs (Trigger: Growth Mode)
- [ ] `/blog` (Weekly articles)
- [ ] `/panduan` (Resource center)
- [ ] `/harga` (Dedicated pricing page)

---

## 🛠️ INSTRUCTION REFERENCE
| Task | Reference Doc | Section |
|------|---------------|---------|
| **Link Strategy** | Suppl. Doc V1 | Section 3 |
| **Image Rules** | Suppl. Doc V2 | Section 1 |
| **Heading Structure** | Suppl. Doc V2 | Section 2 |
| **Mobile Content** | Suppl. Doc V2 | Section 5 |
| **Schema Rules** | Suppl. Doc V2 | Section 10 |
| **Expansion Plan** | Suppl. Doc V2 | Section 9C |
| **UI/UX Standards** | **DESIGN_SYSTEM.md** | **All** |

---
**Current Action Item:** Start Phase 3 (Technical SEO, Assets & Design System).
