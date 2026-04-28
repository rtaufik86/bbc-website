// Auto Execution Engine v0.5 — REWRITE prompt builder (draft-only).
//
// REWRITE is intentionally blocked inside safeExecute. Instead, the system
// produces a draft prompt that a human (or a separate LLM pipeline) uses
// to generate the rewritten page. No side effects.

import { getEntity } from '../entity'

export interface RewriteDraftInput {
  path:        string
  pageType:    string
  title?:      string
  primaryEntity?: string
  angle?:      string
  /** Entity lookup key (e.g., 'virtual-office') for BBC_ENTITIES. */
  entity?:     string
}

export function buildRewriteDraftPrompt(page: RewriteDraftInput): string {
  const lines: string[] = [
    'REWRITE TASK (DRAFT ONLY)',
    '',
    `URL: ${page.path}`,
    `Page Type: ${page.pageType}`,
  ]
  if (page.title)         lines.push(`Current Title: ${page.title}`)
  if (page.primaryEntity) lines.push(`Primary Entity: ${page.primaryEntity}`)
  if (page.angle)         lines.push(`Angle: ${page.angle}`)

  lines.push(
    '',
    'Tujuan: hasilkan draft rewrite production-grade untuk halaman ini.',
    '',
    '# DIRECT ANSWER',
    '- Buka dengan 1 paragraf ringkas yang langsung menjawab search/user intent.',
    '- WAJIB menyebut primary entity di paragraf pertama.',
    '- Tidak boleh basa-basi pengantar yang tidak menjawab intent.',
    '',
    '# SECTION STRUCTURE',
    'Gunakan markdown headings (H2/H3). Bagian wajib (urutkan natural sesuai narasi halaman):',
    '- Pengertian / konteks utama',
    '- Mengapa hal ini penting untuk bisnis',
    '- Faktor yang perlu dipertimbangkan',
    '- Hubungan dengan layanan BBC',
    '- Kapan solusi ini cocok',
    '- Kapan perlu alternatif',
    '- FAQ',
    '',
    '# ENTITY REINFORCEMENT',
    '- Sebut primary entity secara natural di seluruh draft (bukan hanya intro).',
    '- Gunakan minimal 3 attributes entity dalam penjelasan.',
    '- Gunakan minimal 1 relasi (supports ATAU compared_to).',
    '- Gunakan konteks geografis bila tersedia.',
    '- DILARANG menulis definisi generik tanpa kaitan ke konteks BBC.',
    '',
    '# PAGE TYPE BEHAVIOR',
    'Terapkan behavior sesuai Page Type halaman ini:',
    '- MONEY: CTA boleh lebih kuat. Tekankan konversi. Outbound link dikontrol.',
    '- WEAPON: tone edukatif / authority-first. Hanya soft CTA. Hindari bahasa salesy. Dukung money page via saran internal link kontekstual.',
    '- HUB: orientasi distribusi. Ringkas topic clusters. Sarankan internal links ke halaman terkait.',
    '- SUPPORT: tone trust-building. Hindari CTA agresif.',
    '- UNKNOWN / lainnya: default edukatif + soft CTA.',
    '',
    '# INTERNAL LINK SUGGESTIONS',
    'Di akhir draft, tambahkan section "## Internal Link Suggestions" berisi minimal 3 saran. Format setiap saran:',
    '- Suggested anchor: <anchor text natural>',
    '- Target URL: <relative path BBC, mis. /layanan/...>',
    '- Placement rationale: <kalimat singkat alasan penempatan>',
    '',
    'JANGAN sisipkan raw HTML <a>. JANGAN paksa link bila tidak natural.',
    '',
    '# FAQ',
    '- Tambahkan 3–5 item FAQ di bagian "## FAQ".',
    '- Setiap pertanyaan harus spesifik untuk topik halaman ini — BUKAN pertanyaan generik.',
    '- Jawaban singkat, padat, langsung.',
    '',
    '# CTA',
    '- MONEY page: CTA konsultasi yang lebih kuat (mis. ajakan menghubungi tim BBC).',
    '- WEAPON page: soft CTA yang mengarahkan ke money page relevan.',
    '- SUPPORT page: light trust CTA (mis. dorongan menghubungi support).',
    '- Lainnya: soft CTA edukatif.',
    '',
    '# SAFETY RULES',
    '- DILARANG mengubah angle halaman.',
    '- DILARANG mengubah intent halaman.',
    '- DILARANG menjanjikan jaminan legal yang tidak ada di sumber/konteks.',
    '- DILARANG klaim "pasti approved", "100% berhasil", atau sejenis.',
    '- DILARANG membuat klaim harga bila tidak ada di source/context.',
    '- DILARANG overpromise outcome PKP / legal.',
    '- DILARANG menulis seperti blog generik.',
    '- DILARANG membuat angle baru.',
    '',
    '# OUTPUT FORMAT',
    '- Hanya konten draft dalam markdown.',
    '- JANGAN tulis komentar tentang task.',
    '- JANGAN jelaskan apa yang kamu ubah.',
    '- JANGAN bungkus output dengan code fence (```).',
    '- Target panjang: 1500–1800 kata.',
  )

  let prompt = lines.join('\n')

  // Entity-driven augmentation (v0.9). When the page carries a known entity
  // key, append structured knowledge so the draft pipeline grounds content
  // in real BBC relations instead of generic definitions.
  const entityData = getEntity(page?.entity)
  if (entityData) {
    prompt += `

Gunakan entity berikut sebagai dasar konten:

Entity: ${entityData.entity}

Attributes:
${entityData.attributes.join(', ')}

Relations:
- Supports: ${entityData.relations.supports.join(', ')}
- Compared to: ${entityData.relations.compared_to.join(', ')}

Geographic context:
${entityData.geo.join(', ')}

Instruksi:
- Gunakan entity ini sebagai fondasi penjelasan
- Perkuat hubungan antar konsep (jangan hanya definisi)
- JANGAN keluar dari angle halaman
- JANGAN mengubah intent halaman
`

    prompt += `

WAJIB DIPATUHI:
- Sebutkan entity utama secara eksplisit di paragraf pertama
- Gunakan minimal 3 attributes dalam penjelasan
- Gunakan minimal 1 relasi berikut:
  - supports ATAU
  - compared_to
- Gunakan konteks geografis jika tersedia
- DILARANG membuat definisi umum tanpa mengaitkan ke entity ini
- DILARANG keluar dari intent halaman
`
  }

  return prompt
}
