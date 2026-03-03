# Internal Linking & Anchor Text Strategy - Bintaro Business Centre (BBC)

Dokumen ini merangkum strategi penautan internal (*internal linking*) untuk meningkatkan otoritas halaman (SEO) dan memudahkan navigasi pengguna di situs Bintaro Business Centre.

## 1. Peta Halaman Utama (Core Pages)

## 1. Peta Halaman Utama (Core Pages)

| Halaman | URL Target | Key Focus Keywords |
| :--- | :--- | :--- |
| **Home** | `/` | Bintaro Business Centre, Business Center Jakarta Selatan |
| **Serviced Office** | `/sewa-kantor` | sewa kantor siap pakai, serviced office jakarta selatan |
| **Virtual Office** | `/virtual-office` | virtual office jakarta selatan, alamat domisili perusahaan |
| **Jasa Legalitas** | `/legal/pendirian-pt-jakarta-selatan` | jasa pendirian PT, pengurusan izin usaha |
| **Lokasi** | `/lokasi` | lokasi Bintaro Business Centre, kantor dekat tol veteran |
| **Tentang Kami** | `/tentang-kami` | profil Bintaro Business Centre, profil perusahaan BBC |

---

## 2. Strategi Internal Linking & Anchor Text

### A. Dari Homepage (/) ke Halaman Layanan
Homepage harus mendistribusikan "link juice" ke layanan utama dengan anchor text yang eksplisit.
*   **Target:** `/sewa-kantor`
    *   *Anchor Text:* "Sewa Kantor Siap Pakai", "Serviced Office Jakarta Selatan"
*   **Target:** `/virtual-office`
    *   *Anchor Text:* "Virtual Office Jakarta Selatan", "Alamat Bisnis Profesional"
*   **Target:** `/legal/pendirian-pt-jakarta-selatan`
    *   *Anchor Text:* "Jasa Pendirian PT & CV", "Layanan Legalitas Usaha"

### B. Antar Halaman Layanan (Cross-Linking)
Layanan yang saling berkaitan harus saling menautkan untuk meningkatkan *topical authority*.
*   **Di Halaman Virtual Office menautkan ke Legalitas:**
    *   *Anchor Text:* "Dapatkan paket bundling dengan jasa pendirian PT."
*   **Di Halaman Sewa Kantor menautkan ke Fasilitas:**
    *   *Anchor Text:* "Fasilitas lengkap termasuk ruang meeting & training premium."
*   **Di Halaman Jasa Legalitas menautkan ke Virtual Office:**
    *   *Anchor Text:* "Gunakan alamat Virtual Office untuk memenuhi syarat domisili PT."

### C. Dari Gateway Pages (SEO Pages) ke Core Pages
Gateway pages (halaman yang dioptimasi untuk keyword spesifik) harus mengarah balik ke halaman konversi utama.
*   **Halaman:** `/sewa-kantor/bintaro` → Menuju `/sewa-kantor`
    *   *Anchor Text:* "Lihat harga sewa kantor di BBC"
*   **Halaman:** `/virtual-office/jakarta-selatan` → Menuju `/virtual-office`
    *   *Anchor Text:* "Daftar Virtual Office Jakarta Selatan"
*   **Halaman:** `/sewa-kantor/kantor-siap-pakai-bintaro` → Menuju `/lokasi`
    *   *Anchor Text:* "Cek lokasi strategis kami dekat Tol Veteran"

### D. Footer Links (Global)
Gunakan anchor text yang konsisten di seluruh situs melalui footer.
*   **Serviced Office:** "Sewa Kantor Jakarta Selatan"
*   **Virtual Office:** "Virtual Office Jakarta Selatan"
*   **Legal:** "Jasa Pendirian PT & CV"
*   **Location:** "Lokasi Kantor & Akses Tol"

---

## 3. Checklist Anchor Text SEO
1.  **Variasi:** Jangan gunakan anchor text yang sama 100% berulang-ulang (Gunakan variasi seperti "Sewa Kantor", "Kantor Siap Pakai", "Serviced Office").
2.  **Deskriptif:** Hindari "Klik di Sini" atau "Baca Selengkapnya". Gunakan "Cek Biaya Virtual Office" atau "Hubungi Tim Legal BBC".
3.  **Konteks:** Letakkan link di dalam paragraf teks yang relevan, bukan hanya di tombol.

---

## 4. Penempatan Link pada Landing Page (Contoh)

**Contoh Paragraf di Halaman `/lokasi`:**
> "Bintaro Business Centre (BBC) tidak hanya menawarkan lokasi strategis di koridor Jakarta Selatan. Bagi Anda yang membutuhkan operasional fisik, tersedia layanan **[sewa kantor siap pakai](/sewa-kantor)**. Namun, jika Anda hanya membutuhkan alamat legalitas, Anda bisa menggunakan layanan **[virtual office Jakarta Selatan](/virtual-office)** kami yang sudah mendukung pengurusan PKP."

---

## 5. Konvensi Struktur URL (URL Structure Convention)

Seluruh halaman komersial utama atau "Money Pages" menggunakan struktur semantic clean tanpa prefix `/layanan/`.

| Layanan | Slug Wajib |
| :--- | :--- |
| **Serviced Office** | `/sewa-kantor` |
| **Virtual Office** | `/virtual-office` |
| **Jasa Legalitas** | `/legal/pendirian-pt-jakarta-selatan` |

**Aturan Penautan:**
- Setiap tautan internal (*internal link*) yang mengarah ke halaman layanan di atas harus menggunakan URL sesuai tabel di atas.
- **DILARANG** menggunakan prefix `/layanan/`.
- Gateway pages atau artikel blog harus mengarah ke URL utama ini untuk memaksimalkan otoritas halaman konversi.

---

## 6. Pemeliharaan & Audit (Maintenance)
- Lakukan pengecekan berkala pada `sitemap.ts` untuk memastikan rute `/layanan/` sudah terdaftar dengan benar.
- Lakukan audit `grep` secara berkala untuk mendeteksi tautan yang masih menggunakan pola lama (`/services/` atau tanpa prefix).
