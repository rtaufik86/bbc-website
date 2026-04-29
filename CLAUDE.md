# BBC — Bintaro Business Centre Website
## Project Context for Claude Code

---

## 🗣️ BAHASA & GAYA KOMUNIKASI

> **INSTRUKSI UNTUK CLAUDE:** Komunikasi dengan user pakai bahasa **formal-santai
> Indonesia**. **JANGAN** pakai pronoun jalanan seperti `lo`, `gw`, `gue`, `lu`,
> `elu`, `gua`. Pakai: **`kamu`**, **`saya`**, **`aku`**.
>
> Contoh:
> - ❌ "lo bisa cek lagi" / "gue patch dulu"
> - ✅ "kamu bisa cek lagi" / "saya patch dulu"
>
> Gaya tetap ringkas, langsung, no fluff — cuma ganti pronoun-nya. Konsisten di
> seluruh sesi (text reply, summary, planning, error explanation, dll). Aturan
> ini berlaku untuk SEMUA model (Opus / Sonnet / Haiku) dan SEMUA effort level.

---

## 🤖 MODEL & EFFORT — PILIH SEBELUM MULAI

> **INSTRUKSI UNTUK CLAUDE:** Di awal setiap sesi, setelah membaca task dari user,
> WAJIB rekomendasikan model dan effort yang tepat sebelum mulai coding.
> Gunakan tabel di bawah sebagai acuan.

### Referensi Cepat

| Task | Model | Effort | Alasan |
|---|---|---|---|
| Bangun engine/module baru dari scratch | **Opus 4.7** | **High** | Multi-file, type chain kompleks, zero-error target |
| Architectural decision (desain sistem baru) | **Opus 4.7** | **High** | Perlu reasoning mendalam lintas banyak file |
| Refactor besar (ubah pattern di banyak file) | **Opus 4.7** | **High** | Cross-file consistency kritis |
| Debug TypeScript error yang tidak jelas | **Opus 4.7** | **High** | Butuh trace type chain yang panjang |
| Patch existing file (tambah fitur kecil) | **Sonnet 4.6** | **Medium** | Spec jelas, lokasi patch sudah diketahui |
| Buat UI component baru (ikut pattern yang ada) | **Sonnet 4.6** | **Medium** | Pattern sudah ada, tinggal replicate |
| Fix bug yang sudah terlokalisir | **Sonnet 4.6** | **Medium** | Scope kecil, reasoning tidak perlu dalam |
| Tulis/edit konten halaman publik | **Sonnet 4.6** | **Low** | Tidak perlu reasoning code |
| Patch ringan (typo, style, rename variable) | **Haiku 4.5** | **Low** | Terlalu simpel untuk model besar |
| Baca & jelaskan kode yang ada | **Haiku 4.5** | **Low** | Read-only, tidak perlu reasoning |
| Update CLAUDE.md / dokumentasi | **Haiku 4.5** | **Low** | Menulis teks, bukan code logic |
| Tanya pertanyaan tentang codebase | **Haiku 4.5** | **Low** | Lookup, bukan synthesis |

### Kapan Pakai Opus 4.7 1M (1 juta token)?
Gunakan **Opus 4.7 1M** (bukan Opus 4.7 biasa) ketika:
- Perlu load **banyak file sekaligus** (>10 file besar)
- Session melibatkan **hampir seluruh codebase** (full audit, big refactor)
- Takut context overflow di tengah sesi panjang

### Effort Guide
| Effort | Artinya | Gunakan untuk |
|---|---|---|
| **High** | Extended thinking aktif — Claude berpikir lebih dalam sebelum jawab | Arsitektur, debug kompleks, multi-file build |
| **Medium** | Standard reasoning | Patch, komponen baru, task dengan spec jelas |
| **Low** | Cepat, minimal reasoning | Pertanyaan, baca kode, edit teks |

### Contoh Rekomendasi Claude di Awal Sesi
Ketika kamu bilang *"Bangun GSC integration ke ControlCenterClient"*, Claude harus reply:
> **Rekomendasi sebelum mulai:**
> - Model: **Opus 4.7** (multi-file, type chain, zero-error constraint)
> - Effort: **High** (perlu trace dependency dari performance module ke ControlCenterClient)
> - Ganti model sekarang sebelum lanjut.

---

## ⚠️ KAPAN HARUS PINDAH SESI BARU

### Sinyal dari Claude Code (perhatikan ini)
Claude Code menampilkan indikator context di bagian bawah terminal.
Pindah sesi baru ketika salah satu kondisi ini terjadi:

| Sinyal | Artinya | Tindakan |
|---|---|---|
| Muncul pesan **"context window is getting full"** | Context hampir habis | Segera wrap up, pindah sesi |
| Claude mulai **mengulang pertanyaan** yang sudah dijawab | Context overflow | Pindah sesi sekarang |
| Claude membuat **kesalahan aneh** yang tidak konsisten dengan keputusan awal | Konteks terlupakan | Pindah sesi |
| Claude meminta **baca ulang file yang sudah dibaca** di sesi yang sama | Memory degraded | Pindah sesi |
| **Selesai 1 engine/module besar** | Natural break point | Waktu yang tepat pindah |
| **Ganti domain** (dari SEO OS ke CRM, atau ke halaman publik) | Context shift | Mulai sesi baru yang fresh |

### Cara yang benar sebelum pindah sesi
Sebelum tutup sesi, minta Claude untuk:
```
"Update CLAUDE.md bagian Next Tasks dengan status terkini"
```
Atau kamu bisa langsung tulis sendiri di bagian ## 16 di bawah.

### Cara mulai sesi baru
Copy seluruh blok di bawah ini dan paste ke sesi baru. **Blok ini selalu diupdate Claude di akhir setiap sesi.**

---
```
Lanjutkan development BBC. Baca CLAUDE.md dulu sebelum mulai.

Project: C:\Users\Worknew\Documents\Saas\BBC

Status terakhir (sesi 2026-04-29 — DEPLOY LANDED):
- ✅ Signal Engine, Intelligence Layer, Performance Engine v1.1
- ✅ Health Engine v1
- ✅ Feedback Engine v1.2 → v1.3 (Supabase persistence + 7d-vs-7d window + stability threshold)
- ✅ SEO Control Center v3 UI (ControlCenterClient single computation boundary)
- ✅ Action Attribution Engine v1.0 / v1.1 (multi-action decay + MIN_DAYS + pageType segmentation + confidence × successRate)
- ✅ Auto Execution Engine v0.5 → v0.8 (governance + approval + diff viewer; status pipeline `pending_review` → `approved`/`rejected`)
- ✅ Config Extraction v1 (BBC_CONFIG → governance.ts)
- ✅ Entity System v0.1 + Entity Validator v0.1 (3 entities; validator dipanggil HANYA terhadap LLM output)
- ✅ Rewrite Pipeline v0.45 → v0.8.1 (Anthropic SDK + entity resolver + score-on-save + canonical key di route boundary)
- ✅ **Audit Generator hardening (sesi ini)**:
  - Homepage override: `route === '/' → pageType: 'homepage'` (tidak lagi 'money' untuk audit semantics)
  - Inbound graph populated: `linksIn[]` derived by inverting `linksOut` across all routes (was hardcoded `[]`; broke authority_gap/orphan_risk for 42 pages)
  - JSON-LD detection 2-pass: plain `<script type="application/ld+json">` blocks PLUS RSC-encoded `<Script>` payload (`extractRscEscapedJsonLd` walks brace-balanced escaped JSON, decodes `\"` → `"`, parses) — surfaces FAQPage/Article/WebPage emitted via `next/script`
- ✅ **Execution Queue filter (sesi ini)**: ExecutionCenter hides decisions where `actions.length === 0` (P0 from perf-only signals tanpa actionable item tidak pollute Today's Focus)
- ✅ **SEO Infra cleanup (sesi ini)**: middleware GROUP E kill patterns (`/classroom`, `/event`, `/gallery`, `/client`, `/nggallery`, `/thrive_*` → 410); meeting-room redirect reorder (sebelum trailing-slash strip → 1-hop 301); deleted dead `/gallery → /tentang-kami` rule dari next.config
- ✅ **Content rewrite (sesi ini)**: `/sewa-kantor/kantor-siap-pakai-bintaro` weapon page (1162 words, 1 H1, FAQ + FAQPage schema, 3 contextual links, soft CTA, KBLI cautious wording)
- ✅ **Internal authority injection batch (sesi ini)**: 5 page.tsx files × contextual links (legal, sewa-kantor hub, sewa-kantor/bintaro, sewa-kantor/jakarta-selatan, virtual-office)
- ✅ **TS bugfix (sesi ini)**: `IntentMapClient.tsx` filter predicate narrowed (`(p): p is {...} => !!p.reg && ...`) — pre-existing TS error eliminated
- ✅ **Production deploy (sesi ini)**: branch `seo-kill-fix-v1` fast-forward merged ke `main` + pushed → Vercel deploy verified PASS (14/14 URLs match expected, GROUP E patterns active, meeting-room reorder confirmed)
- 0 TS error baru (8 pre-existing di test files — abaikan)

Arsitektur penting:
- Import path: SELALU relative (../../lib/seo/...), JANGAN @/
- let actions (bukan const), priority mutation via intelligence.priority.value/reason
- Supabase async TIDAK masuk useMemo — load di useEffect, baca di useMemo via state
- Supabase builder adalah THENABLE — void tidak fire request, pakai .then(() => {}, () => {}) atau await
- Attribution v1.1: multi-action (limit 3, weight=1/(idx+1)), MIN_ATTRIBUTION_DAYS=3, segmented by (type, pageType)
- Smart filter: P0 dan KILL selalu exempt, total < 3 pass-through, keep iff successRate*confidence > 0.25
- Auto Execution v0.6: browser-side fetchPageHtml dari origin, double-link guard cegah nested <a>, persist patch ke DB only
- Auto Execution v0.7: setiap safeExecute butuh { mode, run? }, mode ∈ 'safe'|'manual', RunContext enforce 1-action-per-page-per-run, setiap log membawa run_id + mode
- Auto Execution v0.8: safeExecute emit status `pending_review` (bukan `applied`) — operator harus Apply/Reject via DiffViewer modal. Cooldown query cek `status='pending_review'`. Fetch filter ControlCenterClient: `status IN ('pending_review','approved')`. `rejected` hidden. Filesystem TIDAK pernah disentuh; approval = DB state change only.
- Governance gate order (penting, jangan reorder): freeze → eligibility (P0/P1 + FIX/INJECT) → page protection (money/utility blocked; hub no INJECT) → run claim → cooldown → HTML fetch → HTML safety → link budget (≤4 outbound) → action
- Freeze triggers: error rate > 0.3 (min 5 samples) OR ≥2 already_linked INJECT dalam 50 log terakhir → triggerFreeze(reason) → autoRunSafe di-flip OFF otomatis
- Audit ≤5 issues per run, grouped by run_id, kinds: duplicate_link | anchor_concentration | broken_html | rule_violation
- Config extraction: `governance.ts` tidak lagi punya magic number untuk money gate/link budget/priority/cooldown/maxActionsPerPage — semua dari `BBC_CONFIG`. Hard-coded yang MASIH di governance: hub+INJECT block, utility block, REWRITE/KILL block, FIX/INJECT eligibility, HTML safety thresholds, freeze thresholds, audit constants.
- Entity System: `lib/seo/entity/bbcEntities.ts` = source of truth (3 entity: virtual-office, sewa-kantor, pendirian-pt). `getEntity(key)` → null-safe lookup. `rewriteDraft` inject entity block hanya ketika `page.entity` di-pass — interface additive, `primaryEntity` field lama tidak di-rename.
- Entity Validator: `validateEntityUsage(output, entityData)` dipanggil HANYA terhadap LLM output (bukan prompt). rewriteDraft.ts adalah pure prompt builder — tidak panggil validator. Scorer = entity mention (1) + ≥2 attribute hit (1) + ≥1 relation hit (1); threshold valid ≥ 2.
- **Audit Generator (sesi 2026-04-29)**: butuh dev server di `http://localhost:3000` saat `npx tsx scripts/generate-audit-data.ts` jalan; tanpa dev server fetch fall through ke error-fallback HTML dan 27/42 pages flip ke Red secara salah. Flow: `auditFile()` → `extractJsonLdSchemas(content)` (plain) + `extractRscEscapedJsonLd(content)` (RSC payload) → merge dedup. Inbound graph dibuild post-loop di `run()`: invert `linksOut` ke `Map<targetPath, {from,anchor}[]>` lalu attach ke `result.linksIn`. Hanya routes di `PAGE_TYPE_MAP` yang di-track (asset/external links di-skip di `normalizeInternalHref`).
- **ExecutionCenter queue gate (sesi 2026-04-29)**: visible queue + p0Count/p1Count badges semua difilter via `isExecutable(d) = ['P0','P1'].includes(priority) && d.actions.length > 0`. Decisions dengan P0 dari signal performa tapi tanpa action concrete (mis. `query_mismatch` yang tidak nge-build action di buildActions) tidak pollute UI.
- **Middleware redirect chain (sesi 2026-04-29)**: meeting-room check (`if normalizedPath === '/meeting-room' return redirect('/ruang-meeting', 301)`) HARUS sebelum trailing-slash strip supaya `/meeting-room/` direct 1-hop ke `/ruang-meeting`. Reordering = regression (akan jadi 2-hop).

Sebelum coding pastikan migration sudah dijalankan di Supabase:
- supabase/migrations/20260424120000_seo_performance_snapshots.sql
- supabase/migrations/20260424130000_seo_action_attribution.sql
- supabase/migrations/20260424140000_seo_action_attribution_v1_1.sql
- supabase/migrations/20260424150000_seo_execution_logs.sql
- supabase/migrations/20260424160000_seo_execution_patches.sql
- supabase/migrations/20260424170000_seo_execution_governance.sql
- supabase/migrations/20260424180000_seo_rewrite_drafts.sql
- supabase/migrations/20260424190000_seo_rewrite_entity_score.sql
- supabase/migrations/20260424200000_seo_rewrite_page_type.sql

Catatan: v0.8 Approval Layer TIDAK butuh migration baru — kolom `status` adalah `text` tanpa CHECK constraint.

Catatan: semua tabel SEO butuh `alter table ... disable row level security` (internal tool, tidak ada data user). Supabase auto-enable RLS untuk tabel baru — manual disable di SQL Editor SETELAH migration jalan.

Executor guardrail:
- Kalau spec menyebut variable/flow yang TIDAK visible dalam file-scope yang diizinkan → STOP dan tanya, jangan tebak.
- Working tree dirty != merge blocker. Untracked files (mis. V2 artifacts) aman dilewati checkout/merge selama tidak konflik dengan tracked tree di branch tujuan.
- `npm run dev` ditolak Bash sandbox kalau foreground — pakai `run_in_background: true`. Cold start Next.js 16 Turbopack ~5–10 detik; allow ~30 detik sebelum probe.

Open items (pilih yang mau dikerjakan):
1. **V2 untracked artifacts** — owner decision: ship / A-B test / discard
   - `app/sewa-kantor/kantor-siap-pakai-bintaro-v2/page.tsx`
   - `components/templates/WeaponPageTemplateV2.tsx`
2. **Supabase migrations** — manual apply ke prod Supabase kalau belum (9 migration di list di atas)
3. **Verify SEO Control Center queue di prod** — REWRITE/no_faq harus sudah drop setelah FAQ schema fix landed
4. **Authority gap follow-up** — `/sewa-kantor/kantor-siap-pakai-bintaro` linksIn=3, weapon threshold=4.8 → butuh 1-2 inbound injection lagi dari sister weapon (mis. `/harga-sewa-kantor-bintaro`, `/sewa-kantor/murah-jakarta-selatan`)

Task hari ini: [TULIS TASK DI SINI]
```
---

> **📌 INSTRUKSI CLAUDE — wajib dijalankan di akhir setiap sesi:**
> Update blok copy-paste di atas dengan:
> 1. Tambahkan engine baru ke daftar ✅
> 2. Update "Arsitektur penting" kalau ada pattern baru
> 3. Update migration / prerequisite kalau ada yang baru
> Blok ini adalah satu-satunya yang perlu di-copy user — jaga agar selalu akurat.

---

## 1. IDENTITAS PROJECT

**Apa ini:** Website bisnis untuk Bintaro Business Centre (BBC) — penyedia sewa kantor siap pakai,
virtual office, dan legalitas usaha di Pesanggrahan, Jakarta Selatan, beroperasi sejak 2007.

**Domain:** https://www.bintarobusinesscentre.com
**Entitas hukum:** PT. Ganesha Dwipaya Bhakti
**Lokasi fisik:** Jl. RC Veteran No. 1-i, Pesanggrahan, Jakarta Selatan, DKI Jakarta
**Trust anchor:** 1.800+ perusahaan, sejak 2007, dekat Pintu Tol Veteran & Bintaro Jaya

**Fungsi website:**
1. Marketing & konversi (sewa kantor, virtual office, pendirian PT)
2. Admin panel internal (CRM leads, manajemen produk)
3. SEO Control Center (tool audit internal, localhost-only)

---

## 2. TECH STACK

| Komponen | Versi |
|---|---|
| Next.js | 16.1.6 (App Router) |
| React | 19.2.3 |
| TypeScript | ^5 (strict mode) |
| Tailwind CSS | 3.4.19 |
| Supabase | ^2.94.0 (PostgreSQL + Auth) |
| React Hook Form | ^7.71.1 |
| Zod | ^4.3.6 |
| Radix UI | (accordion, dialog, dropdown, select, dll) |
| Shadcn/ui | 19 base components di components/ui/ |
| Lucide React | ^0.563.0 |
| Swiper | ^12.1.0 |
| react-force-graph-2d | ^1.29.1 (visualisasi link graph) |
| Sonner | ^2.0.7 (toast) |
| Jest | ^30.2.0 + React Testing Library |

**TypeScript config:**
- `strict: true`, `skipLibCheck: true`
- Path alias: `@/*` → `./*` (tapi **JANGAN pakai** untuk SEO OS — gunakan relative path)
- Module resolution: `bundler`

---

## 3. ARSITEKTUR NEXT.JS

**Pattern:** App Router (Next.js 16), semua halaman di `app/`
**Server/Client:** Halaman publik = Server Components; tool/dashboard = Client Components (`'use client'`)
**Auth:** Supabase SSR via cookies (middleware refresh session)
**Styling:** Tailwind dark theme untuk admin/SEO tools; light theme untuk halaman publik

### Naming Convention
- Route folder = slug kebab-case Indonesia
- Client component files: `[Name]Client.tsx` (pisah dari `page.tsx`)
- API routes: `app/api/[domain]/[resource]/route.ts`

---

## 4. ROUTE MAP

### 4a. Halaman Publik (Marketing)
```
app/
├── page.tsx                              # Homepage — money page
├── sewa-kantor/
│   ├── page.tsx                          # Hub — money page
│   ├── bintaro/page.tsx                  # Weapon — private office concept
│   ├── jakarta-selatan/page.tsx          # Weapon — structure & facilities
│   ├── harga/page.tsx                    # Weapon — price value guide
│   ├── murah-jakarta-selatan/page.tsx    # Weapon — budget office analysis
│   └── kantor-siap-pakai-bintaro/page.tsx
├── virtual-office/
│   ├── page.tsx                          # Money page — PKP & KBLI jasa
│   ├── jakarta-selatan/page.tsx          # Weapon — regulatory compliance
│   └── alamat-bisnis-jakarta-selatan/page.tsx
├── virtual-office-bintaro/page.tsx       # Weapon
├── harga-virtual-office/page.tsx         # Weapon — price factors
├── harga-virtual-office-jakarta-selatan/page.tsx
├── harga-sewa-kantor-bintaro/page.tsx    # Weapon — cost structure
├── legal/
│   ├── page.tsx                          # Hub — navigational
│   ├── pendirian-pt-jakarta-selatan/page.tsx  # Money page
│   ├── cek-kbli/page.tsx                # Hub — reference
│   └── pkp-perdagangan/page.tsx         # Hub — regulatory
├── kantor-dekat-bintaro-jaya/page.tsx   # Weapon — geo
├── kantor-dekat-tol-veteran/page.tsx    # Weapon — geo
├── ruang-meeting/page.tsx               # Support
├── lokasi-kantor/page.tsx               # Support
├── fasilitas-kantor/page.tsx            # Support
├── tentang-kami/page.tsx                # Support — trust
├── klien-dan-testimoni/page.tsx         # Support — social proof
├── kontak/page.tsx                      # Support — contact
└── legalitas-dan-perizinan-bbc/page.tsx # Support — transparency
```

### 4b. Admin Panel (`/admin/*` — protected)
```
app/admin/
├── layout.tsx
├── page.tsx                    # Dashboard
├── leads/
│   ├── page.tsx               # CRM leads list
│   └── [id]/page.tsx          # Lead detail
├── products/
│   ├── page.tsx
│   └── [id]/page.tsx
├── sales/page.tsx
├── account/page.tsx
└── settings/
    ├── page.tsx
    └── telegram/page.tsx
```

### 4c. SEO Control Center (`/seo-control-center/*` — localhost only, noindex)
```
app/seo-control-center/
├── page.tsx + ControlCenterClient.tsx   # Main dashboard v3 ← AKTIF
├── decision-engine/DecisionEngineClient.tsx
├── entity-audit/
├── answer-extraction/
├── trust-scanner/
├── authority-analyzer/
├── crawl-audit/
├── intent-map/
└── llm-scanner/
```

### 4d. API Routes
```
app/api/
├── leads/route.ts                          # Lead submission (publik)
├── admin/leads/[id]/
│   ├── route.ts
│   ├── change-product/route.ts
│   └── reassign/route.ts
├── admin/settings/telegram/{sales,test,update}/
├── auth/{callback,logout}/
├── cron/reminders/route.ts
├── health/route.ts
└── seo/verify-deploy/route.ts
```

### 4e. Auth Pages
```
app/{login,signup,forgot-password}/page.tsx
app/auth/reset-password/page.tsx
app/auth/callback/route.ts
```

### 4f. Utility / Internal Tools
```
app/internal-links/          # Internal link viewer
app/internal-link-graph/     # Force graph visualization
app/web-audit/               # Web audit tool
app/layout.tsx               # Root layout
app/robots.ts                # Robots.txt generation
app/sitemap.ts               # Sitemap generation
app/not-found.tsx            # 404 page
```

---

## 5. KOMPONEN STRUKTUR

```
components/
├── admin/          # AdminHeader, AdminSidebar, LeadsTable, LeadsFilters,
│                   # LeadActions, LeadHeader, LeadInfo, LeadTimeline,
│                   # ConversationHistory, ProductForm
├── auth/           # ForgotPasswordForm, LoginForm, ResetPasswordForm, SignupForm
├── account/        # ChangePasswordForm
├── chat/           # ChatWidget
├── cta/            # CTASection, ContactForm, ServiceCTA, WhatsAppFloating
├── forms/          # LeadForm
├── home/           # ServicesTabSection
├── marketing/      # Benefits, FAQ, Features, Footer, Header, Hero,
│                   # HomeHero, PricingTable, ServiceSlider, SolutionCard
├── navigation/     # Footer, Header
├── seo/            # ← SEO OS components (lihat section 9)
├── service/        # ServiceCard, ServiceFAQ, ServiceFeatures, ServiceHero
├── shared/         # LocationMap, ServicesOverview, Stats, Testimonials,
│                   # TrustBadges, TrustSignals
├── templates/      # WeaponPageTemplate
├── tracking/       # MetaPixel
├── ui/             # Shadcn base: button, card, input, dialog, select,
│                   # accordion, badge, avatar, checkbox, dropdown-menu,
│                   # label, popover, separator, sheet, switch, table, textarea
└── StickyWhatsAppCTA.tsx
```

---

## 6. LIB MODULES

```
lib/
├── types.ts                    # Global types
├── utils.ts                    # Utility functions (cn, dll)
├── auth/
│   ├── client.ts              # Client-side auth
│   ├── server.ts              # Server-side auth
│   └── permissions.ts         # Permission checking
├── schemas/
│   └── lead.ts                # Lead Zod schema
├── supabase/
│   ├── client.ts              # Browser Supabase client
│   ├── server.ts              # Server Supabase client (cookies)
│   ├── admin.ts               # Service role admin client
│   └── types.ts               # Database types (generated)
├── telegram/
│   ├── bot.ts                 # Telegram bot logic
│   └── types.ts
├── tracking/
│   ├── capi.ts                # Meta Conversion API
│   ├── meta.ts                # Meta Pixel
│   └── hash.ts                # Data hashing untuk CAPI
└── seo/                       # ← Lihat section 9 untuk detail
```

---

## 7. DATABASE (Supabase / PostgreSQL)

### Tabel Utama
```
supabase/migrations/
├── 20240101000000_foundation.sql       # Base schema
├── 20240101000001_products.sql         # Produk/layanan
├── 20240101000002_leads_crm.sql        # CRM leads
├── 20240101000003_conversations.sql    # Conversation history
├── 20240101000004_routing.sql          # Lead routing rules
├── 20240101000005_indexes_rls_final.sql # Indexes + Row Level Security
├── 20240101000006_events.sql           # Event logging
├── 20240103000000_notification_logs.sql # Notifikasi
├── 20240103000001_leads_reminder.sql   # Reminder system
└── 20240104000000_auth_triggers.sql    # Auth triggers
```

### Key Tables
- `leads` — form submissions, lead scoring, status tracking
- `products` — layanan (sewa kantor, VO, PT)
- `conversations` — history percakapan per lead
- `notification_logs` — log Telegram/email
- `routing_rules` — aturan assign lead ke sales

### RLS Pattern
Semua tabel public menggunakan Row Level Security. Admin bypass via service role key.
Client-side = anon key (read-only terbatas). Server-side admin = service role key.

---

## 8. AUTH SYSTEM

**Provider:** Supabase Auth (email + password)
**Pattern:** SSR via `@supabase/ssr` dengan cookies

### Flow
```
login page → Supabase signInWithPassword → session di cookie
middleware.ts → createServerClient → supabase.auth.getSession() (refresh)
Protected routes → lib/auth/server.ts → getUser() → redirect ke /login jika null
```

### Route Protection
- `/admin/*` — harus login (check di layout.tsx atau page.tsx server-side)
- `/seo-control-center/*` — tidak diprotect auth (localhost only by convention)
- Semua route publik — tidak perlu auth

### Environment Variables (Auth)
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

---

## 9. MIDDLEWARE.TS — SEO RULES

Middleware menangani:
1. **Query string stripping** — `?foo=bar` → 301 redirect ke clean URL
2. **Trailing slash normalization** — `/foo/` → `/foo`
3. **SEO Kill Engine** — 410 Gone untuk WordPress legacy paths, feeds, archives
4. **Canonical redirects** — `/home` → `/`, `/index.php` → `/`
5. **SEO_KILL_BLOG env** — jika `SEO_KILL_BLOG=1`, `/blog/*` → 410
6. **Session refresh** — `supabase.auth.getSession()` di setiap request

**Kill patterns (410):** `/wp-admin`, `/wp-login.php`, `/category/*`, `/tag/*`,
`/author/*`, `/feed`, `/amp/*`, `*.html`, `/lp/*`, `/campaign/*`

---

## 10. SEO SITE TAXONOMY

### Page Types
| Type | Fungsi | Contoh |
|---|---|---|
| `money` | Primary conversion | `/sewa-kantor`, `/virtual-office` |
| `weapon` | Educate & assist conversion | `/harga-virtual-office`, geo pages |
| `hub` | Navigation & distribution | `/legal`, `/legal/cek-kbli` |
| `support` | Trust & brand | `/tentang-kami`, `/lokasi-kantor` |
| `utility` | Tool, admin, non-index | `/admin`, `/seo-control-center` |

### Silos / Clusters
| Cluster | Scope |
|---|---|
| `virtual-office` | Semua VO pages |
| `sewa-kantor` | Semua office rental pages |
| `legal` | PT, KBLI, PKP pages |
| `trust` | About, location, testimonials |
| `root` | Homepage |

### Content Rules (PENTING — jangan dilanggar)
- **Money pages:** Strong CTA, trust signals, no "panduan lengkap", no "apa itu"
- **Weapon pages:** Educational, BUKAN conversion, no promo/diskon/garansi
- **Hub pages:** Navigational only, points to sub-pages
- **Support pages:** Trust-focused, factual
- **Forbidden patterns (semua halaman):** "garansi", "terbaik di Indonesia", "nomor satu",
  "pasti approved", "semua KBLI bisa PKP"
- **BBC trust anchors:** "sejak 2007", "1.800+ perusahaan", "Jakarta Selatan", "PT. Ganesha Dwipaya Bhakti"

---

## 11. SEO CONTROL CENTER (DETAIL)

### Lokasi
`app/seo-control-center/` + `components/seo/` + `lib/seo/`

### Status Module

```
lib/seo/signals/          ✅ DONE
  ├── types.ts            — SignalInput, AllSignals
  ├── adapter.ts          — toSignalInput(auditPage) → SignalInput
  ├── index.ts            — computeAllSignals(input): AllSignals
  ├── h1Signal.ts
  ├── faqSignal.ts
  ├── entitySignal.ts
  ├── aeoSignal.ts
  ├── linkSignal.ts
  ├── schemaSignal.ts
  └── trustSignal.ts

lib/seo/intelligence/     ✅ DONE
  ├── types.ts            — Priority, ImpactBand, ImpactResult, PriorityResult,
  │                         Opportunity, ConfidenceResult, IntelligenceContext, IntelligenceOutput
  ├── impactEngine.ts     — computeImpact(signals, pageType): ImpactResult
  ├── priorityEngine.ts   — derivePriority(signals, issues, impact, ctx): PriorityResult
  ├── actionOptimizer.ts  — optimizeActions(actions): actions (KILL supersedes, max 3)
  ├── executionSequencer.ts — sequenceActions(actions): SequencedAction[]
  ├── opportunityEngine.ts — detectOpportunities(signals, pageType): Opportunity[]
  ├── confidenceEngine.ts — computeConfidence(signals): ConfidenceResult
  └── index.ts            — computeIntelligence(signals, ctx?): IntelligenceOutput

lib/seo/performance/      ✅ DONE
  ├── types.ts            — QueryPerformance, PagePerformance
  ├── queryMapper.ts      — mapQueriesToPage(queries): Record<string, QueryPerformance[]>
  ├── pagePerformance.ts  — computePagePerformance(mapped): Record<string, PagePerformance>
  └── index.ts

lib/seo/health/           ✅ DONE
  ├── types.ts            — HealthStatus, HealthIssue, HealthResult
  ├── healthEngine.ts     — computeHealth(page): HealthResult
  └── index.ts

lib/seo/feedback/         ✅ DONE
  ├── types.ts            — PerformanceSnapshot, FeedbackDelta, FeedbackResult, FeedbackResultType
  ├── feedbackEngine.ts   — snapshotFromPerformance(), computeFeedback(current, previous)
  └── index.ts

lib/seo/ (root files)
  ├── site-registry.ts    — SITE_REGISTRY (source of truth: 26 entries, LOCKED)
  ├── pageTypeMap.ts      — PAGE_TYPE_MAP, getPageType(), getMetadata()
  ├── entityDictionary.ts
  ├── entityGraph.ts
  ├── anchorGovernance.ts
  ├── linkInjectionEngine.ts
  ├── metaGenerator.ts
  ├── metadata.ts
  ├── semanticGraph.ts
  ├── structured-data.ts
  └── visualMapping.ts
```

### Components SEO
```
components/seo/
  ├── SystemOverview.tsx       — 5 KPI stats (total, indexable, entity%, aeo%, P0 count)
  ├── ExecutionCenter.tsx      — P0+P1 queue, sorted by impact, max 5, [Execute] button
  ├── PageExecutionDetail.tsx  — Slide panel: Health→Entity→Actions→LLM→Tech→Perf→Feedback
  ├── EntityPanel.tsx          — Grade A-F, covered/missing tokens, relationship gaps
  ├── ActionPanel.tsx          — Sequenced actions dengan step number, hint
  ├── LLMReadinessPanel.tsx    — Direct answer, FAQ schema, entity clarity checks
  ├── PerformancePanel.tsx     — GSC: position, impressions, CTR, clicks, topQuery
  ├── HealthPanel.tsx          — Status badge, score bar, issue list
  ├── FeedbackPanel.tsx        — Delta signal: improved/declined/flat/no_data
  ├── EntityOverview.tsx       — Avg entity per silo, top missing tokens
  ├── OpportunityBoard.tsx     — Aggregated opportunities by type
  ├── ArticleHeader.tsx
  ├── Breadcrumbs.tsx
  ├── InternalLink.tsx
  ├── RelatedContent.tsx
  └── SiloNavigation.tsx
```

### Main Orchestrator: `app/seo-control-center/ControlCenterClient.tsx`

**PRINSIP UTAMA:** "UI TIDAK BOLEH recompute logic"

```
useMemo computation order (per page):
  1.  signals         = computeAllSignals(toSignalInput(p))
  1b. health          = computeHealth(p)
  2.  strength + authorityGap
  3.  overlap detection (O(n²))
  4.  issues[]        = ['angle_overlap','thin_content','no_faq','authority_gap','orphan_risk','no_h1']
  5.  intelligence    = computeIntelligence(signals, { pageType, issues, authorityGap, rawPage })
  5b. performance augmentation v1.1 (GSC signals → priority override)
  5c. health override (critical → P0 'critical_health_issue')
  5d. feedback loop (snapshotStore → computeFeedback)
  5e. feedback adaptation (declined→P0, flat→P0, improved→P2)
  6.  actions         (let, bukan const — karena ada filter/mutation)
  7.  entity token analysis
```

**ATURAN KRITIS:**
- Import path: SELALU `../../lib/seo/...` — JANGAN `@/lib/seo/...`
- `let actions` bukan `const` (ada filter REWRITE + unshift FIX setelah build)
- Priority mutation: `intelligence.priority.value = 'P0'` dan `intelligence.priority.reason = 'xxx'`
- `snapshotStore` = `useRef<Record<string, PerformanceSnapshot>>({})` — di luar useMemo
- Guard feedback: `feedback.result !== 'no_data' && previousSnapshot !== undefined`
- Child components: PURE display only — tidak boleh recompute, tidak boleh import lib/seo

### Action Types & Priority
```
Action order: KILL(0) → FIX(1) → INJECT(2) → REWRITE(3)

P0: structural blocker (no_h1, angle_overlap) | critical health | performance_declined
    high_impression_opportunity | authority_gap_detected | no_progress_detected
P1: content issues (weapon/hub) | high impact
P2: link/authority issues | improved performance (downgrade)
P3: everything else

REWRITE suppression: low_ranking + entityScore > 70 → hapus REWRITE (bottleneck = authority, bukan content)
```

---

## 12. CRM / LEAD SYSTEM

### Flow
```
Form submit (LeadForm.tsx)
  → POST /api/leads
  → Supabase insert (leads table)
  → Meta Pixel + CAPI tracking
  → Telegram notification ke sales
  → Response 200

Admin panel
  → GET /api/admin/leads (dengan filter)
  → Lead detail, status update, assign sales
  → Cron job /api/cron/reminders (follow-up reminder)
```

### Lead Schema (lib/schemas/lead.ts)
Zod schema untuk validasi form: nama, telepon, email, layanan, message.

---

## 13. ENVIRONMENT VARIABLES

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# App
NEXT_PUBLIC_APP_URL=https://www.bintarobusinesscentre.com

# Meta Tracking
NEXT_PUBLIC_META_PIXEL_ID=
META_ACCESS_TOKEN=

# Telegram
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# SEO
SEO_KILL_BLOG=0          # Set ke 1 untuk 410 semua /blog/* routes
```

---

## 14. CODING CONVENTIONS

### TypeScript
- Strict mode selalu aktif
- Interface untuk data contracts, type untuk unions/aliases
- Explicit return types untuk function yang diexport
- `Record<string, T>` lebih disukai dari `{ [key: string]: T }`

### React / Next.js
- Server Components by default; `'use client'` hanya kalau perlu
- Pisahkan data-fetching (page.tsx) dari UI (Client.tsx)
- `useMemo` untuk heavy computation di client components
- `useRef` untuk mutable state yang tidak trigger re-render

### Import Order
```typescript
// 1. React
import React, { useState, useMemo } from 'react'
// 2. External libraries
import { Terminal } from 'lucide-react'
// 3. Internal lib (RELATIVE PATH)
import { computeAllSignals } from '../../lib/seo/signals'
import type { AllSignals } from '../../lib/seo/signals'
// 4. Internal components
import ExecutionCenter from '../../components/seo/ExecutionCenter'
```

### File Naming
- Components: `PascalCase.tsx`
- Lib modules: `camelCase.ts`
- Route pages: `page.tsx` (Next.js convention)
- Client components di route: `[Name]Client.tsx`

### Tailwind / Styling
- Dark theme SEO tools: `bg-slate-950 text-white`, cards: `bg-slate-900 border-slate-800`
- Light theme publik: standard Tailwind
- Badge sizing konsisten: `text-[8px]` atau `text-[9px]` untuk micro-labels
- Animation: `hover:scale-[1.02] transition-all` untuk CTA buttons

### SQL Migrations — WAJIB tampilkan inline di chat
Kalau menulis / mengubah file `supabase/migrations/*.sql`, setelah `Write`/`Edit`
**tampilkan isinya dalam ```sql code block di chat** supaya user bisa langsung copy-paste ke
Supabase SQL Editor tanpa harus buka file.

Format standar:
````markdown
**Jalankan di Supabase SQL Editor:**
```sql
-- isi lengkap file migration di sini
```
````

Alasan: migration tidak auto-apply ke Supabase cloud; user harus paste manual.
File path saja tidak cukup — harus ada isi yang bisa langsung di-copy.

Berlaku untuk: CREATE TABLE, ALTER TABLE, CREATE INDEX, disable RLS, seed data.
Tidak berlaku untuk: SQL hanya sebagai dokumentasi / referensi (bukan untuk dijalankan).

---

## 15. PRE-EXISTING TYPESCRIPT ERRORS (ABAIKAN)

Error berikut **sudah ada sebelum** development dimulai dan **bukan tanggung jawab sesi ini:**

```
__tests__/api/leads.test.ts(13,45): error TS2345
__tests__/api/leads.test.ts(17,42): error TS2345
__tests__/components/LeadForm.test.tsx (6 errors — toBeInTheDocument)
app/seo-control-center/intent-map/IntentMapClient.tsx(78,51): error TS2345
```

**Validasi yang benar:**
```bash
npx tsc --noEmit --skipLibCheck 2>&1 | grep "error TS" | grep -v "leads.test\|LeadForm.test\|IntentMapClient"
# Output kosong = PASS
```

---

## 16. STATUS DEVELOPMENT

### ✅ Selesai
- Signal Engine (lib/seo/signals/)
- Intelligence Layer (lib/seo/intelligence/) — Phase 3
- SEO Control Center v3 UI — Execution-First dashboard
- Performance Engine v1 + v1.1 — GSC integration + decision refinement
- Health Engine v1 — structural health gate
- Feedback Loop Engine v1.2 — delta tracking (session-based)
- Feedback Engine v1.3 — persistence + 7d-vs-7d window + stability threshold
- Action Attribution Engine v1.0 — action log → result → success rate → decision bias
- Action Attribution Engine v1.1 — multi-action decay + MIN_DAYS + pageType segmentation + confidence
- Auto Execution Engine v0.5 — deterministic safeExecute (INJECT/FIX only, money-page protected, 24h cooldown, REWRITE draft-only)
- Auto Execution Engine v0.6 — runtime HTML fetch + double-link guard + persist original/patched HTML (DB only, no file write)
- **Auto Execution Engine v0.7 — GOVERNANCE (hard limits + page protection + HTML safety + link budget + RunContext + freeze circuit breaker + audit ≤5 issues + SAFE/MANUAL mode)**
- **Rewrite Draft Pipeline v0.45 — table `seo_rewrite_drafts` + store + skeleton generator + state hook (no LLM call yet)**
- **Rewrite Draft Pipeline v0.5 — Anthropic SDK (server-only) + `/api/rewrite/generate` route + Sonnet 4.6 default + classified provider errors + granular env diagnostics**
- **Rewrite Draft UI v0.6 — `RewriteDraftViewer` modal + Approval panel (sorted, capped 5) + Approve/Reject DB-only flip**
- **Rewrite Trigger v0.7 — "Generate Draft" button per REWRITE action + `generatingRewriteKey` lifecycle (deterministic single-flight)**
- **Entity Resolver v0.7 — `resolveEntityKey` + 23 aliases across 3 entities + canonical key in client handler**
- **Entity Quality Score v0.8 — score columns + `scoreEntityQuality` post-LLM hook + breakdown JSONB persisted + score in route response**
- **Entity Canonical Key v0.8.1 — server-side `resolveEntityKey` at route boundary so direct-API callers can't drift `entity_key`**

---

## 🚀 SYSTEM STATUS (LATEST)

- v0.8 — Approval Layer ✅
  - Diff viewer (original vs patched HTML)
  - Apply / Reject flow
  - DB-based approval (no filesystem write)
  - Human-in-the-loop control aktif

- v0.9 — Config Extraction ✅
  - Governance rules dipindahkan ke `bbcConfig.ts`
  - Engine tetap hardcoded (safety)
  - Behavior 100% identical (non-breaking)
  - System siap untuk multi-project (future)

- v0.10 — Entity System (v0.1) ✅
  - Entity source (`bbcEntities.ts`)
  - Entity helper (`getEntity`)
  - Entity injection ke rewrite prompt
  - Non-breaking integration (fallback-safe)
  - Validation module tersedia (belum di pipeline)

- v0.45 — Rewrite Draft Pipeline (skeleton) ✅
  - Migration `seo_rewrite_drafts` (page_path, entity_key, action_type, prompt, draft_content, status, error)
  - `lib/seo/rewrite/{store,generate,index}.ts` — store + skeleton generator (returns `anthropic_api_not_configured`) + barrel
  - State hook + `fetchRewriteDrafts` di ControlCenterClient (skeleton, no UI)

- v0.5 — Anthropic Server Route ✅
  - `@anthropic-ai/sdk@^0.91.1` + `import 'server-only'` enforces no browser leak
  - `lib/seo/anthropic/client.ts` — singleton, granular env diagnostics
  - `app/api/rewrite/generate/route.ts` — POST handler, body validation, classified provider errors, runtime=nodejs
  - Default model `claude-sonnet-4-6` (family alias auto-tracks 4.6 patches; override via `ANTHROPIC_MODEL`)
  - `saveDiag` field di response untuk surface Supabase error code (rescue v0.45 silent-fail)

- v0.6 — Rewrite Approval UI ✅
  - `RewriteDraftViewer` modal — scrollable plain-text body + status pill + Approve/Reject (DB-only flip)
  - Drafts panel di ExecutionCenter — pending_review first, capped 5, "+N more" indicator
  - `handleApproveRewriteDraft` / `handleRejectRewriteDraft` — mirror v0.8 patch approval pattern

- v0.7-trigger — REWRITE Action Generator ✅
  - "Generate Draft" button per row (only when `firstAction.type === 'REWRITE'`)
  - `generatingRewriteKey` state — single-flight, prevents double POST
  - Lifecycle: set → POST → finally null → tick refresh

- v0.7-entity-mapping — Entity Resolver ✅
  - `resolveEntityKey(input)` — exact key → normalized key → entity name + aliases (case-insensitive, ws-collapsed)
  - 23 aliases across virtual-office (7) / sewa-kantor (8) / pendirian-pt (8)
  - Wired di `handleGenerateRewriteDraft`: `resolveEntityKey(decision.entity) ?? decision.entity ?? null`

- v0.8 — Entity Quality Score on Save ✅
  - Migration `seo_rewrite_entity_score` — adds `entity_score INT`, `entity_score_valid BOOL`, `entity_score_breakdown JSONB` + index
  - Route handler scores post-LLM (best-effort, swallows scorer fault)
  - `saveRewriteDraft` accepts 3 new optional fields → persisted in DB
  - Response surfaces `entityScore` + `entityScoreValid` (NOT `draft_content`)

- v0.8.1 — Server-side Entity Canonicalization ✅
  - `resolveEntityKey` at route boundary so direct-API callers (curl, future SDK) cannot drift `entity_key`
  - Threaded into 3 spots: scoring lookup, saveRewriteDraft, diagnostic fallback insert
  - Backfill SQL pattern documented for historical rows

- **2026-04-29 — Audit Generator hardening + SEO infra cleanup + Production deploy ✅**
  - Audit generator: homepage `/` overridden ke `pageType: 'homepage'` (not 'money') untuk decouple metadata-registry dari audit semantics
  - Audit generator: `linksIn[]` populated by inverting `linksOut` across 42 routes (was hardcoded `[]`; before fix all pages flagged orphan_risk + authority_gap)
  - Audit generator: JSON-LD detection now 2-pass — plain `<script>` blocks AND RSC-encoded `<Script>` payload (next/script's `dangerouslySetInnerHTML` JSON-LD never appears as plain `<script>` in SSR HTML; lives inside escaped RSC stream). Helper `extractRscEscapedJsonLd` walks brace-balanced escaped JSON, decodes `\"` → `"`, parses
  - Audit generator: `schemaTypes` and `faqs` now actually populated (FAQPage / Article / WebPage / LocalBusiness / BreadcrumbList all detected)
  - ExecutionCenter: queue + p0Count/p1Count gated by `isExecutable(d) = ['P0','P1'] && actions.length > 0` — perf-only P0 decisions tanpa actionable item tidak pollute Today's Focus
  - Middleware: GROUP E kill patterns (`/classroom`, `/event`, `/gallery`, `/client`, `/nggallery`, `/thrive_*` → 410) + meeting-room redirect reorder (BEFORE trailing-slash strip → 1-hop 301 to `/ruang-meeting`)
  - next.config: deleted dead `/gallery → /tentang-kami` redirect (replaced by middleware 410)
  - TS bugfix: `IntentMapClient.tsx` filter predicate narrowed via type-guard, eliminates pre-existing TS error
  - Content rewrite: `/sewa-kantor/kantor-siap-pakai-bintaro` (1162 words, 1 H1, FAQ + FAQPage schema, 3 contextual links, soft CTA, KBLI cautious wording)
  - Internal authority injections: 5 page.tsx files × contextual links (legal/pendirian-pt, sewa-kantor hub, sewa-kantor/bintaro, sewa-kantor/jakarta-selatan, virtual-office)
  - **Branch `seo-kill-fix-v1` fast-forward merged ke `main` + pushed**; Vercel production deploy verified PASS (14/14 URLs match expected on `https://www.bintarobusinesscentre.com`)

---

### 🔲 Next Tasks
**Sesi terakhir selesai: 2026-04-29 (Audit Generator hardening + Production deploy verified PASS)**

- [ ] **V2 untracked artifacts — owner decision needed**:
  - `app/sewa-kantor/kantor-siap-pakai-bintaro-v2/page.tsx`
  - `components/templates/WeaponPageTemplateV2.tsx`
  Sengaja tidak di-commit di sesi 2026-04-29 (eksperimental, no route registry entry). Owner pilih: (a) discard, (b) commit ke feature branch untuk A/B test, (c) replace v1 jika approved.

- [ ] **Jalankan migration di Supabase** (manual paste ke SQL Editor):
  - `supabase/migrations/20260424120000_seo_performance_snapshots.sql`
  - `supabase/migrations/20260424130000_seo_action_attribution.sql`
  - `supabase/migrations/20260424140000_seo_action_attribution_v1_1.sql`
  - `supabase/migrations/20260424150000_seo_execution_logs.sql`
  - `supabase/migrations/20260424160000_seo_execution_patches.sql`
  - `supabase/migrations/20260424170000_seo_execution_governance.sql`
  - `supabase/migrations/20260424180000_seo_rewrite_drafts.sql`
  - `supabase/migrations/20260424190000_seo_rewrite_entity_score.sql`
  - `supabase/migrations/20260424200000_seo_rewrite_page_type.sql`

  Migration files merged ke `main` di sesi 2026-04-29 tapi BUKAN auto-apply ke Supabase cloud — harus di-paste manual. Ingat juga `alter table ... disable row level security` setelah CREATE TABLE.

- [ ] **Verify SEO Control Center queue di prod** — REWRITE/no_faq actions pada weapon pages dengan template-emitted FAQPage seharusnya sudah drop setelah FAQ schema fix (`9e08ce5`) landed. Buka `/seo-control-center` dan konfirmasi.

- [ ] **Authority gap follow-up: `/sewa-kantor/kantor-siap-pakai-bintaro`** — linksIn=3, weapon threshold=4.8 → masih trigger `authority_gap` issue → INJECT action di queue. Solusi: tambah 1-2 inbound link dari sister weapon (mis. `/harga-sewa-kantor-bintaro`, `/sewa-kantor/murah-jakarta-selatan`, `/kantor-dekat-bintaro-jaya`).

- [ ] **Koneksi GSC data nyata** (sekarang masih mock di `performanceMock` array di ControlCenterClient.tsx). Begitu GSC live, snapshot akan terakumulasi dan window comparison menjadi aktif setelah 14 hari data.

- [ ] **Auto Execution Engine v0.9+** — generate content otomatis + apply fix otomatis + loop tanpa manual. Attribution Engine sekarang menjadi loss function untuk learning loop ini.

**File yang dimodifikasi di sesi Attribution v1.0:**
- `supabase/migrations/20260424130000_seo_action_attribution.sql` ← BARU (tabel `seo_action_logs` + `seo_action_results` + index)
- `lib/seo/feedback/actionStats.ts` ← BARU (`computeActionStats(rows)`, `ActionStat`, `ActionResultRow`, `ActionType`)
- `lib/seo/feedback/index.ts` ← PATCH (re-export actionStats)
- `components/seo/ActionPanel.tsx` ← PATCH (prop `pagePath?`, fungsi `logAction`, tombol "Mark Executed" per-action; KILL tidak di-track)
- `components/seo/PageExecutionDetail.tsx` ← PATCH (teruskan `pagePath={d.path}` ke ActionPanel)
- `app/seo-control-center/ControlCenterClient.tsx` ← PATCH
  - State: `actionStats: ActionStat[]` + `writtenResultsRef: useRef<Set<string>>`
  - useEffect: load stats dari `seo_action_results` sekali per mount
  - useMemo decisions: filter action jika `successRate <= 0.3` (guard: P0 exempt, KILL exempt, total < 3 pass-through)
  - useEffect write-back: pasangkan feedback (improved/declined) dengan last action log → insert ke `seo_action_results`, dedup via ref keyed `${path}:${result}`
- `CLAUDE.md` ← PATCH (status Attribution v1.0 + migration prereq baru)

**Arsitektur Attribution v1.0 (untuk sesi berikutnya):**
- Dua tabel baru terpisah dari feedback (logs vs results). Tidak ada FK karena v1 spec minta "no relation complexity".
- Attribution tidak bergantung `feedback.delta.impressionDelta` atau `clickDelta` — hanya `positionDelta` + `ctrDelta` (DB schema menyimpan hanya dua ini).
- Dedup write menggunakan `useRef<Set<string>>` (bukan state) supaya tidak memicu re-render dalam loop write-back.
- Filter 0.3 threshold punya triple-safeguard: (1) kosong hingga stats load, (2) minimum sample 3, (3) P0+KILL selalu lolos. Memastikan early-life data tidak menekan action yang valid.
- `logAction` di ActionPanel adalah fire-and-forget — UI tidak pernah blokir meskipun Supabase down.

**File yang dimodifikasi di sesi Attribution v1.1:**
- `supabase/migrations/20260424140000_seo_action_attribution_v1_1.sql` ← BARU (ALTER TABLE: `page_type text`, `weight float default 1`; index `(action_type, page_type)`)
- `lib/seo/feedback/actionStats.ts` ← REWRITE
  - Expanded `ActionStat`: `type, pageType, total, success, fail, successRate, confidence`
  - New `ActionContext` type (pageType + timeToResultDays — reserved, v1.1 hanya pakai pageType)
  - New `ActionResultRow.page_type` + `.weight` optional fields
  - Stat key `${action_type}::${page_type || 'unknown'}`
  - `successRate = success / (success + fail * 1.5)` (fail-weighted)
  - `confidence = min(1, total / 10)`
- `app/seo-control-center/ControlCenterClient.tsx` ← PATCH
  - Module-scope: `MIN_ATTRIBUTION_DAYS=3`, `ATTRIBUTION_WINDOW=3`, `resolveAttributedAction()` (harmonic decay)
  - Write-back effect: `.limit(3)` + `executed_at` select + MIN_DAYS filter + per-action INSERT loop dengan `page_type` dan `weight`
  - Decision filter: segmented `(type, pageType)` lookup, threshold `successRate * confidence > 0.25`
- `CLAUDE.md` ← PATCH (status + migration prereq v1.1)

**Arsitektur Attribution v1.1 (untuk sesi berikutnya):**
- Stats segmented per `(actionType, pageType)` — action yang bagus di weapon bisa buruk di money. Filter baca segment yang relevan saja.
- Decay weight (1/idx+1) disimpan di kolom `weight` supaya analisis future bisa bobot ulang. V1.1 filter masih count-based (raw success/fail, tidak baca weight) — upgrade di v1.2 kalau perlu weighted-stats.
- MIN_ATTRIBUTION_DAYS guard mencegah spurious pairing: action yang baru 1 hari belum mungkin menggerakkan GSC 7d window.
- Fail-weight 1.5× menghukum REWRITE/INJECT yang gagal lebih keras daripada menghargai yang sukses — bias ke conservative selection.
- Confidence × successRate threshold 0.25 berarti action butuh SALAH SATU: very high success (0.5+ rate dengan 5 samples ≈ 0.25) atau moderate success dengan banyak samples (0.3 rate dengan 10 samples = 0.3 > 0.25).
- Dedup key `${path}:${result}` tetap meng-cover seluruh feedback event: satu render → maksimal ATTRIBUTION_WINDOW (3) rows, tidak berulang.
- Empty-state safe: tanpa data Supabase → `actionStats: []` → filter block diskip (`if (actionStats.length > 0)`), semua action lolos.

**File yang dimodifikasi di sesi Auto Execution v0.5:**
- `supabase/migrations/20260424150000_seo_execution_logs.sql` ← BARU (tabel + index + RLS disable)
- `lib/seo/execution/safeExecutor.ts` ← BARU (safeExecute, canExecute, anchorIsValid, injectOnce; self-fetch lastExecutedAt dari DB)
- `lib/seo/execution/rewriteDraft.ts` ← BARU (pure string builder, no side effects)
- `lib/seo/execution/index.ts` ← BARU (barrel re-export)
- `components/seo/ExecutionCenter.tsx` ← PATCH (opt-in toggle via `autoRunSafe` + `onAutoRunSafeChange` props; default OFF; hidden when props absent)
- `app/seo-control-center/ControlCenterClient.tsx` ← PATCH
  - State `autoRunSafe` + `autoRunRef` (dedup per session)
  - Dispatcher useEffect watch `[autoRunSafe, decisions]` → `safeExecute(page, firstAction)` dengan dedup key `${path}:${actionType}`
  - Pass toggle props ke ExecutionCenter
- `CLAUDE.md` ← PATCH (status + migration baru)

**Arsitektur Auto Execution v0.5 (untuk sesi berikutnya):**
- Guard stack di safeExecute (urutan evaluasi): `money_page_protected` → `not_allowed_v0_5 (REWRITE/KILL)` → `cooldown_24h` → action-specific checks (`missing_html`, `invalid_anchor`, `no_match_or_already_linked`, `h1_exists`).
- `lastExecutedAt` resolved dari DB otomatis di safeExecute bila caller tidak supply. Cooldown bekerja meski tanpa upstream state.
- Dispatcher dedup **session-level** (`useRef<Set<string>>`) — `${path}:${actionType}` — cegah double-fire pada re-render. Cooldown DB-level (24h) adalah guardrail kedua.
- `html` belum ada di `CoreDecision` → INJECT/FIX mayoritas log `failed: missing_html` di v0.5. Arsitektur ready; tinggal inject HTML source (fetch runtime atau pass dari audit pipeline) di v0.6.
- REWRITE **tidak pernah dieksekusi**. `buildRewriteDraftPrompt(page)` return prompt untuk LLM/manual draft pipeline terpisah.
- Toggle `autoRunSafe` OFF by default. Opt-in eksplisit — tidak ada side effect tanpa user action.
- Decision shape tidak berubah — integrasi `safeExecute` via cast (`first as SafeAction`, `pageType as SafePageType`). Keep forward-compat.

**File yang dimodifikasi di sesi Auto Execution v0.6:**
- `supabase/migrations/20260424160000_seo_execution_patches.sql` ← BARU (ALTER: `original_html`, `patched_html` TEXT columns)
- `lib/seo/execution/safeExecutor.ts` ← REWRITE
  - `fetchPageHtml(path)` — runtime fetch dari `window.location.origin + path` (browser-only), AbortController timeout 8s
  - `anchorIsAlreadyLinked(html, anchor)` guard — cegah nested `<a>` tags
  - `logExecution(payload)` signature expanded → optional `original_html` + `patched_html`
  - Reason codes diperluas: `fetch_failed`, `missing_target`, `already_linked`, `no_match`, `no_main_tag`
  - Truncate HTML ke 500KB sebelum simpan ke DB
- `CLAUDE.md` ← PATCH (status v0.6 + migration baru)

**Arsitektur Auto Execution v0.6 (untuk sesi berikutnya):**
- HTML source tidak lagi dari `CoreDecision` — safeExecute self-fetch dari origin runtime. Caller tetap bisa pass `page.html` kalau sudah punya (skip fetch, save RTT).
- Fetch pakai same-origin credentials + follow redirects. Gagal → `failed: fetch_failed` (jangan crash).
- Double-link guard menjaga idempotency: run ke-2 atas page yang sudah di-INJECT → `skipped: already_linked`.
- Persist original/patched HTML di DB bukan file system. Keputusan sengaja: file write-back di localhost aman tapi production risky (misalnya push ke git, break SSR). v0.7 akan tambah **approval flow** (preview UI + apply button) sebelum file write.
- `no_match_or_already_linked` dipecah jadi 2 reason (`no_match` + `already_linked`) untuk debug precision.
- Fetch pada dispatcher bulk-run = 1 request per decision. Untuk 27 pages ~27 HTTP req; localhost ms each, production butuh rate limit (future).

**File yang dimodifikasi di sesi Auto Execution v0.7 (Governance):**
- `supabase/migrations/20260424170000_seo_execution_governance.sql` ← BARU
  - ALTER `seo_execution_logs` → `run_id text`, `mode text` (nullable untuk backward compat)
  - Index `(run_id)` + `(mode, created_at desc)`
  - Tabel `seo_execution_freeze_state` + index `(triggered_at desc)` + RLS disabled
- `lib/seo/execution/governance.ts` ← BARU
  - `GOVERNANCE` constants: MAX_ACTIONS_PER_PAGE_PER_RUN=1, MAX_OUTBOUND_LINKS_PER_PAGE=4, COOLDOWN_MS=24h, ERROR_RATE_THRESHOLD=0.3, ERROR_RATE_MIN_SAMPLES=5, DUPLICATE_INJECT_THRESHOLD=2, FREEZE_LOOKBACK_LOGS=50
  - `checkPageProtection(pageType, actionType)` → money/utility = blocked; hub+INJECT = blocked; REWRITE/KILL = always blocked
  - `checkEligibility(priority, actionType)` → P0/P1 + FIX/INJECT only
  - `checkHtmlSafety(html)` → reject empty, too_small, nested_anchor, unclosed_tag, tag_imbalance (tolerance ±3)
  - `countOutboundLinks(html)` + `checkLinkBudget(html)` → scope ke `<main>`, fallback whole doc
- `lib/seo/execution/runContext.ts` ← BARU
  - `RunContext` class: `runId` token, `claimPage(path)` returns false kalau sudah claimed, `pageCount()`
  - `createRunContext()` factory
- `lib/seo/execution/freeze.ts` ← BARU
  - `getFreezeState()` → baca row terbaru, frozen jika row terakhir frozen=true
  - `triggerFreeze(reason, runId?)` → insert row baru (never UPDATE, history dipertahankan)
  - `releaseFreeze()` → insert row frozen=false reason='released_manually'
  - `evaluateFreezeRisk()` → scan 50 log terakhir, return {rate, samples, duplicates, shouldFreeze, reason}
- `lib/seo/execution/audit.ts` ← BARU
  - `auditRun(runId)` → query logs berdasarkan run_id, max 5 issues
  - Kinds: `duplicate_link` (already_linked skip), `anchor_concentration` (same anchor ≥2× in run), `broken_html` (nested <a> in patched_html OR no_main_tag), `rule_violation` (governance reasons set)
  - `extractInjectedAnchors(patched)` regex match class contains `text-accent`
- `lib/seo/execution/safeExecutor.ts` ← REWRITE (v0.7)
  - New signature: `safeExecute(page, action, options?)` dengan `ExecuteOptions { mode?: 'safe'|'manual', run?: RunContext }`
  - `SafeAction` tambah `priority?: Priority` (dibutuhkan eligibility gate)
  - Gate order: freeze → eligibility → page protection → run claim → cooldown → HTML fetch → HTML safety → link budget (INJECT only) → action
  - `emit(status, reason, ctx, extras?)` helper → setiap log carry `run_id` + `mode`
- `lib/seo/execution/index.ts` ← PATCH (re-export governance, freeze, audit, runContext)
- `components/seo/ExecutionCenter.tsx` ← PATCH
  - Props baru: `freeze?`, `onReleaseFreeze?`, `onManualRun?`, `audit?`
  - Mode badge header: FROZEN / SAFE (AUTO) / MANUAL
  - Freeze banner merah di atas queue saat frozen, tombol Release
  - Tombol "Run Now" per-row (muncul hanya saat !autoRunSafe && !frozen && isRunnable)
  - Audit panel di bawah queue saat `audit.issues.length > 0`, display kind + page + detail
- `app/seo-control-center/ControlCenterClient.tsx` ← PATCH
  - Imports: `createRunContext, getFreezeState, evaluateFreezeRisk, triggerFreeze, releaseFreeze, auditRun, FreezeState, AuditReport`
  - State baru: `freezeState`, `auditReport`
  - useEffect bootstrap: load freeze state on mount
  - Dispatcher rewrite: buat RunContext per pass, call `safeExecute(..., { mode: 'safe', run })`; post-loop `evaluateFreezeRisk` → kalau trigger, `triggerFreeze` + `setAutoRunSafe(false)`; akhirnya `auditRun(run.runId)` → `setAuditReport`
  - `handleManualRun(d)` → RunContext baru, `safeExecute(..., { mode: 'manual', run })`, post-call risk eval + audit
  - `handleReleaseFreeze()` → releaseFreeze + setFreezeState({ frozen: false })
  - Props passed ke ExecutionCenter: freeze, onReleaseFreeze, onManualRun, audit
- `CLAUDE.md` ← PATCH (status v0.7 + migration baru + governance notes)

**Arsitektur Auto Execution v0.7 (untuk sesi berikutnya):**
- Governance modul bersifat **pure & stateless**. Tidak ada side effect, tidak pakai Supabase. Satu tempat untuk ubah limit. Bisa di-unit-test isolated.
- Freeze PERSIST di DB, bukan hanya state React. Multi-tab, multi-reload → konsisten. `getFreezeState` di-load on mount + re-polled setelah setiap auto-run.
- `triggerFreeze` **flip `autoRunSafe` OFF otomatis** di dispatcher (`setAutoRunSafe(false)` setelah trigger). User harus tekan Release sebelum boleh auto-run lagi. Tombol toggle juga di-hide saat frozen.
- RunContext **session-local** (Set<string>) — hard limit 1-action-per-page-per-run hanya valid dalam satu dispatcher pass. Cross-run uniqueness dijaga oleh cooldown 24h (DB-level).
- `mode` di log membedakan apakah run dipicu otomatis (`safe`) atau user (`manual`). Attribution v1.2 nanti bisa weight beda per mode.
- **Manual Run button** muncul hanya saat mode MANUAL (autoRunSafe OFF) + tidak frozen + firstAction.priority P0/P1 + firstAction.type FIX/INJECT — minimalkan tombol yang akan langsung log `skipped:priority_not_eligible` kalau ditekan.
- Audit query filter `.eq('run_id', runId)` — hanya surface issue dari **run terakhir**, bukan cumulative. History tetap di DB untuk query manual.
- Gate order sengaja: freeze PERTAMA (circuit breaker), eligibility kedua (cheap check sebelum DB hit), page protection ketiga (cheap lookup), run claim keempat (in-memory), cooldown kelima (DB hit), HTML fetch terakhir sebelum action (expensive I/O). Perubahan urutan bisa ubah log telemetry.
- HTML safety: `TAG_BALANCE_TOLERANCE = 3` sengaja lenient — minor imbalance dari self-closing edge cases (SVG, meta, img, br) tetap pass. Hard reject hanya untuk nested `<a>` dan unclosed tags > 500 chars.
- Link budget `< 4` (strict less-than). Page dengan 4 existing outbound links **tidak boleh** tambah lagi; 3 existing links masih bisa tambah 1 (total jadi 4, baru berhenti di run berikutnya).
- `logExecution` tetap fire-and-forget (thenable pattern). Tetap kritis: kalau Supabase down, governance jalan tapi log hilang → "action tidak pernah terjadi" per spec 11H. Ini acceptable di v0.7 (internal tool, localhost), perlu hardening di v0.8.

**Lanjutkan dari:** Auto Execution Engine v0.7 Governance compile bersih (0 error baru, 9 pre-existing stabil).
Loop Decision ↔ Execution ↔ Attribution ↔ Feedback sekarang **terproteksi**: hard limits, freeze circuit breaker, audit per-run, dual-mode (safe auto / manual approval).
Next: v0.8 — (a) approval flow dengan diff viewer untuk write patched HTML ke filesystem, ATAU (b) REWRITE draft pipeline (LLM generate → human review → apply), ATAU (c) GSC live data (ganti `performanceMock` dengan GSC API feed).

---

**File yang dimodifikasi di sesi Rewrite Pipeline (v0.45 → v0.8.1):**

Migration baru:
- `supabase/migrations/20260424180000_seo_rewrite_drafts.sql` — table `seo_rewrite_drafts` (id, page_path, entity_key, action_type, prompt, draft_content, status, error, created_at, updated_at) + 3 index + RLS disabled
- `supabase/migrations/20260424190000_seo_rewrite_entity_score.sql` — ALTER TABLE: `entity_score INT`, `entity_score_valid BOOL`, `entity_score_breakdown JSONB` + index `(entity_score)`

Library baru:
- `lib/seo/rewrite/store.ts` — `saveRewriteDraft` / `fetchRewriteDrafts` / `updateRewriteDraftStatus` (graceful fallback, browser-safe, accepts score fields)
- `lib/seo/rewrite/generate.ts` — server-only `generateRewriteDraft(prompt)` (Anthropic Messages API, max_tokens 4096, temp 0.3, 60s timeout, 1 retry on transient)
- `lib/seo/rewrite/index.ts` — barrel export
- `lib/seo/anthropic/client.ts` — server-only singleton + `getAnthropicClientStatus()` granular reasons (`env_undefined` / `env_empty` / `sdk_constructor_error` / `ok`) + `getDefaultModel()` env override
- `app/api/rewrite/generate/route.ts` — POST handler, body validation, runtime=nodejs, classified errors, score+canonicalize, response `{ ok, draftId?, error?, entityScore?, entityScoreValid?, saveDiag? }`

Entity layer:
- `lib/seo/entity/bbcEntities.ts` — added `aliases: string[]` ke 3 entitas (23 aliases total)
- `lib/seo/entity/index.ts` — `normalizeEntityInput` (private) + `resolveEntityKey` (exact key → normalized key → entity name + aliases) + `getEntityByInput`

UI baru:
- `components/seo/RewriteDraftViewer.tsx` — modal review draft (status pill + entity/action chips + scrollable plain-text + Approve/Reject hidden when terminal)
- `components/seo/ExecutionCenter.tsx` — Drafts panel + 3 props (`rewriteDrafts`, `onApproveRewriteDraft`, `onRejectRewriteDraft`) + 2 props v0.7 (`onGenerateRewriteDraft`, `generatingRewriteKey`) + Generate Draft button per REWRITE action

Glue:
- `app/seo-control-center/ControlCenterClient.tsx` — direct import `lib/seo/rewrite/store` (NOT barrel — avoid server-only chain) + state (`rewriteDrafts`, `rewriteDraftRefreshTick`, `generatingRewriteKey`) + 3 handlers (Generate / Approve / Reject) + `resolveEntityKey` import + props pass-through

Misc:
- `package.json` — `@anthropic-ai/sdk@^0.91.1` (root + worktree both)
- `.env.local.example` — `ANTHROPIC_API_KEY` + `ANTHROPIC_MODEL` documentation

**Arsitektur Rewrite Pipeline v0.45 → v0.8.1 (untuk sesi berikutnya):**
- Loop ujung-ke-ujung: Generate (Sonnet 4.6) → Resolve entity (label/alias → stable key) → Score (entity / attrs / relations / context) → Save (draft + score + breakdown JSONB) → Display panel → Approve/Reject (DB-only flip).
- **Server-only enforcement** kritis — `lib/seo/anthropic/client.ts` dan `lib/seo/rewrite/generate.ts` keduanya `import 'server-only'`. Build akan FAIL kalau client component import-nya. Browser bundle bersih dari API key.
- **Barrel poisoning** — `lib/seo/rewrite/index.ts` re-export `generate.ts` (server-only). Client component HARUS import langsung dari `./store`, BUKAN dari barrel. Kalau pakai barrel: 500 error saat page load. Pattern: `import { fetchRewriteDrafts } from '../../lib/seo/rewrite/store'` (bukan `from '../../lib/seo/rewrite'`).
- **Single-flight per row** — `generatingRewriteKey` format `${path}:${actionType}` mencegah double-POST. `setGeneratingRewriteKey` di-set sebelum fetch, di-null di `finally` block.
- **Entity canonicalization 2-layer** — client (`handleGenerateRewriteDraft`) AND server (`route.ts`). Client untuk UX (pass yang sudah resolved); server untuk safety net (direct-API/curl tidak bisa drift).
- **Score is best-effort** — wrapped in try/catch, score fields default null. Scorer fault NEVER blocks draft persistence.
- **Response shape contract** — route NEVER expose `draft_content` (ukuran, dan operator harus open modal untuk baca). Score boleh expose (numeric, non-PII).
- **Default model alias** — `claude-sonnet-4-6` (no date) auto-track patches dalam family. Untuk pindah ke 4.7+ butuh explicit `ANTHROPIC_MODEL=...`. Tidak ada "latest sonnet across families" alias.

**Operational quirks discovered (HARUS DIINGAT untuk debugging future):**

1. **Windows User-level env var override** — Kalau `ANTHROPIC_API_KEY=""` (empty) ter-set di Windows User scope, Next.js TIDAK menimpanya dengan value dari `.env.local`. Symptom: `getAnthropicClientStatus()` return `env_empty` reason despite `.env.local` correct. Fix: `[Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', $null, 'User')` lalu close-reopen Claude Code (parent process inheritance). Workaround sementara: spawn dev server via `powershell -Command "Remove-Item Env:\ANTHROPIC_API_KEY; npm run dev"`.

2. **Supabase auto-RLS** — Migration `disable row level security` ke-override Supabase default (auto-enable RLS untuk tabel baru). Symptom: insert return error code `42501` ("row-level security policy violation"). Fix: manual `alter table public.X disable row level security;` di SQL Editor SETELAH migration table-create jalan.

3. **Multiple lockfiles confusion** — Worktree `package.json` + BBC root `package.json` keduanya bisa ada `node_modules`. `npm install` di worktree TIDAK bantu BBC root dev server. Fix: `cd "C:/Users/Worknew/Documents/Saas/BBC" && npm install ...` eksplisit di root.

4. **Dev server port hold** — Old `npm run dev` process bisa pegang port 3000 + `.next/dev/lock` setelah `TaskStop`. Fix: `netstat -ano | findstr :3000` untuk dapat PID, lalu `taskkill //F //PID <pid>`.

5. **Save silent-fail observability** — `saveRewriteDraft` graceful fallback (return null) bisa mask masalah serius (RLS, schema mismatch). Pattern di route.ts: kalau `saved == null`, retry dengan direct insert dan capture `dbError.code` ke `saveDiag` field response. Memunculkan bug 42501 yang awalnya silent.

**Lanjutkan dari:** Rewrite Pipeline v0.8.1 closed clean — generate / resolve / score / save / approve loop sehat. Score badge UI di RewriteDraftViewer, sort by score di Drafts panel, soft-gate auto-reject score<50, dan v1.0 Apply-to-Page (FS write / git PR) adalah pilihan task berikutnya. Migration v0.8 (`20260424190000_seo_rewrite_entity_score.sql`) sudah ke-apply di prod. Backfill historis untuk row pre-canonicalization sudah dilakukan untuk virtual-office; pattern sama bisa dipakai untuk sewa-kantor / pendirian-pt kalau kelak ada drift.

---

**File yang dimodifikasi di sesi 2026-04-29 (Audit Generator hardening + SEO infra cleanup + Production deploy):**

Audit generator + snapshot (5 commits):
- `scripts/generate-audit-data.ts` ← PATCH (homepage override, `normalizeInternalHref`, inverse `linksIn` graph build, `collectJsonLdNodes`, `extractJsonLdSchemas`, `findRscJsonObjectEnd`, `extractRscEscapedJsonLd`)
- `app/web-audit/audit-data.ts` ← regenerated multiple times (final state has populated linksIn + schemaTypes + faqs)

SEO Control Center fix (1 commit):
- `components/seo/ExecutionCenter.tsx` ← PATCH (`isExecutable` predicate; queue + p0Count/p1Count gated by `actions.length > 0`)

Content rewrite (1 commit):
- `app/sewa-kantor/kantor-siap-pakai-bintaro/page.tsx` ← REWRITE (1162 words, FAQ + FAQPage schema, 3 contextual links, KBLI cautious wording, soft CTA)

Internal authority injection batch (2 commits):
- `app/legal/pendirian-pt-jakarta-selatan/page.tsx` ← PATCH (2 contextual links: `/legal`, `/legal/pkp-perdagangan`)
- `app/sewa-kantor/page.tsx` ← PATCH (lead-in expansion: `/kantor-dekat-bintaro-jaya`, `/kantor-dekat-tol-veteran`)
- `app/sewa-kantor/bintaro/page.tsx` ← PATCH (intro `/kantor-dekat-bintaro-jaya`)
- `app/sewa-kantor/jakarta-selatan/page.tsx` ← PATCH (Konektivitas section: `/kantor-dekat-tol-veteran`, `/kantor-dekat-bintaro-jaya`)
- `app/virtual-office/page.tsx` ← PATCH (`/legalitas-dan-perizinan-bbc`)
- `app/harga-virtual-office/page.tsx` ← PATCH (commit c59ef1f earlier in session: `/harga-virtual-office-jakarta-selatan` in authority section)
- `app/virtual-office/jakarta-selatan/page.tsx` ← PATCH (commit c59ef1f: closing-CTA target swapped to `/harga-virtual-office-jakarta-selatan`)

SEO infra (1 commit):
- `middleware.ts` ← PATCH (GROUP E kill patterns + meeting-room redirect reorder before trailing-slash strip)
- `next.config.ts` ← PATCH (deleted `/gallery → /tentang-kami` rule, replaced by middleware 410)

TS bugfix (1 commit):
- `app/seo-control-center/intent-map/IntentMapClient.tsx` ← PATCH (filter type-guard predicate)

Production deploy:
- Branch `seo-kill-fix-v1` (HEAD `98d5f36`) fast-forward merged ke `main` (`d5951e3` → `98d5f36`)
- Pushed `main` → origin → Vercel auto-deploy
- 14/14 prod URL probes match expected behavior

**Operational quirks discovered (HARUS DIINGAT untuk debugging future):**

6. **Audit generator REQUIRES live dev server on `localhost:3000`** — without it, all 42 fetches fall through to error-fallback HTML (`<html><body>Error Rendering Path: /...</body></html>`), 27/42 pages flip to Red, and JSON-LD extraction returns empty. Symptom: schemaTypes `[]`, mass Red status. Fix: ensure `npm run dev` is running BEFORE running the generator. Generator otherwise has no way to know.

7. **Next.js `<Script>` JSON-LD invisible to plain HTML scrapers** — `<Script type="application/ld+json" dangerouslySetInnerHTML={...}>` from `next/script` does NOT render as a real `<script>` tag in initial SSR HTML. Instead, the schema string is encoded inside the RSC stream payload as escaped JSON (every `"` becomes `\"`). Plain regex `<script[^>]*application/ld\+json...>` won't catch it. Generator now has 2-pass extraction (plain + RSC-escaped) to compensate. Pattern: server components emitting JSON-LD via raw `<script>` tag (e.g. root layout) ARE visible; only `next/script`-emitted ones need RSC-payload extraction.

8. **Vercel deploys `main` to production by default** — pushing a feature branch goes to *preview*, not production. Confirmed by `git merge-base --is-ancestor` test before deploy validation. To deploy: merge feature branch → main → push main. Force-push to main is forbidden by Git Safety Protocol.

9. **`git push -u origin <branch>`** sets upstream + pushes in one shot; cleanest for first-push. Subsequent pushes use `git push` only. `git fetch origin` followed by `git log --oneline origin/main -5` shows what production is actually running.

10. **Working tree dirty != merge blocker** — untracked files (mis. V2 artifacts) survive `git checkout` and FF merge as long as they don't conflict with tracked files in target branch. They stay in working dir untouched. Tracked-modified files DO block checkout if conflicting; spec saying "STOP if dirty" usually means modified-tracked, not untracked. Verify via `git status --short`: lines starting with ` M` (modified-tracked) block, lines starting with `??` (untracked) generally don't.

11. **Path mangling in Git Bash MSYS curl `-w` format** — string literals like `/path/` inside `-w` format string get auto-converted to Windows paths (`C:/Users/Worknew/AppData/Local/Programs/Git/path/`). Workaround: use `curl -sI <url> | head -1` and `curl -sI <url> | grep -i ^location:` instead of `curl -w`. Path is fine when fed via stdin (`while read -r p; do curl ... "$p" ... done` works for the URL but format string still mangles).

**Lanjutkan dari:** seo-kill-fix-v1 fast-forward merged ke main, Vercel production deploy verified PASS. Working tree clean kecuali 2 V2 untracked artifacts yang sengaja preserved untuk owner decision. Open items prioritized: (1) V2 owner decision, (2) Supabase migration manual apply, (3) prod queue verification, (4) authority gap follow-up untuk `/sewa-kantor/kantor-siap-pakai-bintaro`.

**⚠️ Context sesi sebelumnya sudah panjang (banyak chained tasks: audit → fix → commit → deploy → verify). Disarankan mulai sesi baru untuk task berikutnya.**

---

> **📌 REMINDER UNTUK CLAUDE — SESSION PIVOT PROTOCOL:**
>
> **Trigger** — ingatkan user untuk pindah sesi (PROAKTIF, jangan tunggu user nanya) saat MINIMAL SATU sinyal berikut muncul:
>
> 1. **3+ formal task berturut-turut sudah selesai** dalam satu sesi (kompleksitas LOW boleh sampai 5; MEDIUM/HIGH ~3)
> 2. **Major debugging session** baru selesai (env-var bug, RLS bug, build failure, dll yang bikin transcript membengkak >30 turns)
> 3. **Natural milestone closure** — versi v0.x.y baru saja closed clean, no in-flight work, dev server stabil, DB consistent
> 4. **User pivot total** — task baru tidak ada hubungan sama task sebelumnya (mis. dari Rewrite Pipeline ke GSC integration)
> 5. **Cache pressure** — response makin lambat, sleep/wait makin sering kelewat 5 menit (TTL prompt cache habis berkali-kali)
> 6. **User eksplisit ragu** — "ini panjang ya?", "masih oke gak?", "lanjut atau...?", "ini nyangkut gak?", dll
>
> **Saat trigger, Claude WAJIB:**
> 1. Update bagian "Next Tasks" + ✅ Selesai list dengan status terkini
> 2. Catat file yang dimodifikasi di sesi ini (block "File yang dimodifikasi di sesi ...")
> 3. Tulis "Lanjutkan dari: ..." sebagai pointer pembuka sesi berikutnya
> 4. Catat operational quirks/bug pattern yang ke-uncover (kalau ada) di subsection terpisah
> 5. Berikan ke user: **(a) prompt opener copy-paste-ready** untuk sesi baru, plus **(b) reminder eksplisit "Context sesi ini sudah panjang. Disarankan mulai sesi baru untuk task berikutnya."**
>
> **JANGAN tunggu task selesai sempurna kalau context sudah berdarah.** Suggest pivot di natural boundary (selesai sub-step, sebelum mulai sub-step berikutnya) supaya hand-off bersih.

---

## 17. DOKUMENTASI TAMBAHAN (ROOT LEVEL)

```
DESIGN_SYSTEM.md              — Design system BBC
IMPLEMENTATION_MASTER_PLAN.md — Roadmap implementasi
IMPLEMENTATION_STATUS.md      — Status implementasi
INTERNAL_LINKING_STRATEGY.md  — Strategi internal linking
seo_control_center_plan.md    — Rencana fitur SEO Control Center
links_inventory.json          — Inventori internal links
```

---

*Update CLAUDE.md ini setiap kali ada perubahan arsitektur signifikan atau module baru selesai dibangun.*

---

## 🔴 EXECUTION INTERRUPTION PROTOCOL (CRITICAL)

Claude Code WAJIB menghentikan eksekusi jika terdapat kontradiksi antara spesifikasi dan scope file.

### RULE

IF specification references:

- variable yang tidak ada di file yang diizinkan
- data yang tidak tersedia dalam scope saat ini
- output dari sistem lain (misalnya LLM result, API response) yang tidak dihasilkan dalam langkah ini

THEN:

❌ DO NOT assume
❌ DO NOT infer
❌ DO NOT implement partial logic

INSTEAD:

→ STOP execution
→ FLAG contradiction
→ REQUEST clarification

---

### PRINCIPLE

"Executor must not invent missing system context."

---

### CONTEXT BOUNDARY CHECK (MANDATORY)

Sebelum menulis code, Claude Code HARUS memastikan:

1. Apakah data tersedia di file ini?
2. Apakah data dapat diakses dalam scope yang diizinkan?
3. Apakah data dihasilkan dalam step ini?

IF ANY ANSWER = NO:

→ STOP
→ ASK FOR CLARIFICATION

---

### STOP LOGGING

If STOP is triggered:

→ Log reason as `"interruption: <reason>"`
→ Include **which file + which step** triggered the interruption
→ Do NOT produce partial code

Example:

```
interruption: missing LLM output in rewriteDraft.ts step (validateEntityUsage call)
```

---

### AMBIGUOUS / CONFLICTING SPEC

If specification is ambiguous, under-specified, or conflicts with existing code behavior:

→ STOP
→ ASK FOR CLARIFICATION

Coverage matrix (after this rule):

- Missing context        ✅
- Out-of-scope data      ✅
- Ambiguous spec         ✅
- Conflicting behavior   ✅

---

## REPO / WORKTREE SAFETY PROTOCOL (CRITICAL)

All BBC website code edits MUST be made only in the main project directory:

C:/Users/Worknew/Documents/Saas/BBC

Claude Code MUST NOT edit files inside:

C:/Users/Worknew/Documents/Saas/BBC/.claude/worktrees/

### Mandatory Pre-Flight Check

Before editing any file, Claude Code MUST run:

pwd
git branch --show-current
git status --short

Expected values:

pwd = C:/Users/Worknew/Documents/Saas/BBC
branch = seo-kill-fix-v1

If the current working directory is not exactly the main project directory, or if the branch is not seo-kill-fix-v1, Claude Code MUST:

- STOP immediately
- report the actual pwd
- report the actual branch
- explain that the task must be re-run from the main repo
- make no file changes

### Forbidden Worktree Rule

Claude Code MUST NOT patch, commit, or validate BBC website code from any path matching:

C:/Users/Worknew/Documents/Saas/BBC/.claude/worktrees/*

If Claude Code detects it is inside a .claude/worktrees directory, it must treat this as an interruption event:

interruption: wrong worktree detected

and stop without editing.

### Mandatory Report After Every Task

Every coding task report MUST include:

WORKDIR:
BRANCH:
FILES PATCHED:
DEV SERVER PORT USED:

If WORKDIR is not the main repo path, the task is invalid.

### Principle

The browser only reflects the repo used by the running dev server. Patching a different worktree is not a successful implementation.

