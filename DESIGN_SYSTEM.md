# BBC WEBSITE DESIGN SYSTEM FOUNDATION
**Document Type:** Master Reference - Design System Specification
**Status:** 🔒 PRODUCTION STANDARD
**Version:** 1.0
**Effective Date:** 2026-02-10
**Scope:** ALL BBC digital properties

---

## EXECUTIVE CONTEXT
**Purpose:** Single source of truth for Developers, Designers, Content Writers, and Marketing.
**Non-negotiable principle:** Every visual element, spacing decision, and interaction pattern MUST reference this system.

---

## SECTION 1: BRAND IDENTITY FOUNDATION

### 1.1 Brand Positioning
- **For:** Business owners, startups, professionals in Jakarta Selatan.
- **Who need:** Credible business address, professional workspace, legal compliance.
- **Unlike:** Generic coworking (too casual) or expensive serviced offices (inflexible).
- **Voice:** Professional, Confident, Helpful, Modern.

### 1.2 Color System
#### Primary Colors
- **Brand Navy (Corporate):** `#0F1E33` (Inline links, headings, trust elements)
- **Action Gold (Conversion):** `#B08B3E` (Primary CTAs, floating actions)

#### Hover/Interaction States
- **Navy Hover:** `#253a5e`
- **Gold Hover:** `#8F6F2E`

#### Functional Colors
- **Success Green:** `#059669`
- **Alert Red:** `#DC2626`
- **Neutral Gray Scale:**
  - Background: `#FAFAF8`
  - Text Primary: `#0F1E33`
  - Text Secondary: `#6B7280`
  - Border: `#E5E7EB`

**Visual Standards:**
- **Inline Hyperlinks (Body Text):** Color `#0F1E33`, Font-weight 500, Text-decoration: underline. Applied specifically to links within paragraphs and lists in the main content. Hover: `#253a5e`.
- **Primary CTA:** Background `#B08B3E`, Text: `#FFFFFF`, Font-weight Bold.
- **Secondary CTA:** Border `#0F1E33`, Text: `#0F1E33`, Background: transparent.
- **Hierarchical Rule:** Gold is for action, Navy is for information and authority.

### 1.3 Typography System
- **Primary Font:** `Inter` (Sans-serif)
- **Fallback:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Numeric:** `JetBrains Mono` (Optional for pricing)

**Scale (Desktop / Mobile):**
- **H1:** 48px / 32px (Bold 700)
- **H2:** 36px / 24px (Semibold 600)
- **H3:** 28px / 20px (Semibold 600)
- **Body:** 18px / 16px (Regular 400)

### 1.4 Spacing System (8px Grid)
- **Base unit:** 8px
- 4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px.

### 1.5 Border Radius
- **sm (4px):** Inputs
- **md (8px):** Buttons
- **lg (12px):** Cards
- **xl (16px):** Hero images
- **full:** Pills/Avatars

### 1.6 Shadow & Elevation
- **sm:** Inputs
- **md:** Cards
- **lg:** Hover states
- **xl:** Floating CTAs

---

## SECTION 2: COMPONENT LIBRARY

### 2.1 Button System
- **Primary:** Gold (`#B08B3E`) background, White text. (Main conversion)
- **Secondary:** Transparent background, Navy (`#0F1E33`) border. (Authority/Comparison)
- **Tertiary/Inline:** Navy (`#0F1E33`) text, underline on hover. (Contextual links)
- **Ghost:** White border (for usage on dark backgrounds).

### 2.2 Form Input System
- **Default:** White bg, `#D1D5DB` border.
- **Focus:** Navy (`#0F1E33`) border + ring.
- **Error:** `#DC2626` border.
- **Labels:** 14px Semibold.

### 2.3 Card Component System
- **Service Card:** Icon + Title + Desc + Price + CTA.
- **Testimonial Card:** Rating + Quote + Author.
- **Pricing Card:** Badge + Title + Price + Features + CTA.

### 2.4 Navigation System
- **Desktop:** Logo left, Nav center, CTA right. Sticky.
- **Mobile:** Hamburger menu, slide-out drawer.

### 2.5 Footer System
- Dark theme (`#111827`).
- 4 Columns: About, Services, Company, Contact.
- Social icons & Legal links.

### 2.6 Icon System
- **Library:** Heroicons.
- **Sizes:** 16px (sm), 24px (md), 32px (lg), 48px (xl).

---

## SECTION 3: RESPONSIVE LAYOUT SYSTEM

### 3.1 Breakpoints
- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px (Recommended Max)

### 3.2 Grid System
- **2-col:** Service pages.
- **3-col:** Features.
- **4-col:** Stats/Bento.

### 3.3 Mobile-First
- Min touch target: 44x44px.
- Typography scale up for desktop.

---

## SECTION 4: ACCESSIBILITY STANDARDS (WCAG 2.1 AA)
- **Contrast:** 4.5:1 min.
- **Focus:** Visible outlines.
- **Alt Text:** Required for content images.
- **Semantic HTML:** Correct header hierarchy.

---

## SECTION 5: PERFORMANCE STANDARDS
- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1
- **Images:** WebP, configured sizes, lazy loading.
- **Fonts:** Preload Inter, `font-display: swap`.

---

## SECTION 6: ANIMATION
- **Transition:** 0.2s ease (UI), 0.3s (layout).
- **Hover:** Lift (-4px) and shadow increase.
- **Loading:** Spinners for buttons, Skeletons for content.

---

## SECTION 7: CODE QUALITY
- **HTML:** Semantic, validated.
- **CSS:** BEM or Utility-first (Tailwind).
- **JS:** ES6+, Async/await, Error handling.

---

## SECTION 8: IMPLEMENTATION CHECKLIST
- [ ] Create CSS variables / Tailwind config modifications
- [ ] Install Heroicons
- [ ] Validate Contrast
- [ ] Test Mobile/Desktop Responsiveness
- [ ] Lighthouse Audit (90+ score target)

---

## SECTION 9: MAINTENANCE
- **Minor Updates:** Monthly (non-breaking).
- **Major Updates:** Annual (redesign).
- **Approvals:** Owner (Aan) -> Design -> Dev.

---

## SECTION 10: PAGE COMPOSITION STANDARD
**Status:** 🔒 PRODUCTION LOCK
**Applies To:** ALL BBC Pages
**Authority Level:** Mandatory Structural Governance

### 10.1 Strategic Principle
Setiap jenis halaman melayani state of mind berbeda. Template tidak boleh disamakan. Jika struktur sama, conversion rusak.
- **Money Page:** Decision-Ready
- **Hub Page:** Comparative Research
- **Weapon Page:** Specific Intent Answer

### 10.2 Global Rules (All Page Types)
1. **Section Spacing:**
   - Desktop: 96px vertical rhythm
   - Mobile: 64px
2. **Container Width:**
   - Max width: 1200px
   - Text column max: 720px
3. **CTA Hierarchy:**
   - Gold (`#B08B3E`) = Primary Conversion Only
   - Navy (`#0F1E33`) = Authority / Secondary
   - Inline links = Navy + underline
4. **Gold Usage Rule:** Gold hanya untuk Primary CTA button dan Sticky WhatsApp (Money Page only). Tidak boleh untuk navigasi atau blok informasi biasa.

### 10.3 Money Page Template Standard
**Purpose:** Conversion Execution (e.g., `/sewa-kantor`, `/virtual-office`)
**Mandatory Section Order:**
1. **Hero Section:** Headline: Concrete value statement, Max 2 CTA (Gold Primary), Dark overlay image, Height max 70vh.
2. **Immediate Trust Bar:** Directly below Hero. 3–4 signals (Years operating, companies served, legal entity).
3. **Problem → Solution Framing:** Address pain avoided before introducing benefits.
4. **Value Proposition Blocks:** 3–5 cards max.
5. **Pricing / Package Section:** Clear tier logic and pricing structure.
6. **Comparison Matrix:** If relevant for multiple packages.
7. **FAQ (Max 6):** Only decision blockers.
8. **Final CTA Block:** Strong visual container, Gold button.
9. **Sticky WhatsApp (Mobile Only):** Fixed bottom, high z-index.

**Rules:** Max 1 primary CTA per section. Max 5 total CTA blocks. No CTA redirect to `/kontak`.

### 10.4 Hub Page Template Standard
**Purpose:** Authority & Comparison (e.g., `/sewa-kantor-jakarta-selatan`)
**Mandatory Section Order:**
1. **Hero (Informational):** 1 CTA only (to Money Page), No sticky WA.
2. **Context Framing:** Area / service landscape.
3. **Breakdown Sections:** Area & Service comparison.
4. **Table-Based Comparison:** Structured and factual.
5. **Supporting Internal Links:** Structured link blocks.
6. **FAQ (Max 6):** Comparison-driven questions.
7. **Bottom CTA:** Redirect to Money Page.

**Rules:** No Sticky WA. 2–3 CTA blocks max. All CTA → Money Page.

### 10.5 Weapon Page Template Standard
**Purpose:** Specific Intent Capture (e.g., `/harga-sewa-kantor-bintaro`)
**Mandatory Section Order:**
1. **Hero (Direct Answer):** Address keyword explicitly.
2. **Short Problem Context:** 2-3 paragraphs.
3. **Data / Table / Concrete Breakdown:** Specific metrics/prices.
4. **Clarification Section:** Administrative/Eligibility distinction.
5. **Mini FAQ (Max 4):** Intent-aligned.
6. **Soft CTA:** Redirect to Hub or Money Page.

**Rules:** No Sticky WA. Max 2 CTA blocks. Primary CTA text: "Explore / View Detail" (not "Hubungi Sekarang").

---

## APPENDIX
**Final Colors:**
- **Navy:** `#0F1E33` (Authority)
- **Gold:** `#B08B3E` (Action)

**Spacing Grid:** 4, 8, 16, 24, 32, 48, 64, 96.
