import { Metadata } from 'next'
import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'

const title = 'Sewa Kantor Bintaro: Konsep, Fasilitas, dan Kesesuaian Bisnis'
const description = 'Gambaran konsep dan fasilitas private office di kawasan Bintaro, Jakarta Selatan. Ruang privat fully furnished dengan akses langsung ke Pintu Tol Veteran.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/sewa-kantor/bintaro' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/sewa-kantor/bintaro',
        siteName: 'Bintaro Business Centre',
        images: [{ url: '/images/sewa-kantor/ruangan-kantor-bersih.jpg' }]
    }
}

export default function Page() {
    const schemaObject = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor/bintaro/#webpage",
                "url": "https://www.bintarobusinesscentre.com/sewa-kantor/bintaro",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor/bintaro/#article",
                "headline": title,
                "description": description,
                "author": { "@type": "Organization", "name": "Bintaro Business Centre" },
                "publisher": { "@type": "Organization", "name": "Bintaro Business Centre" }
            }
        ]
    }

    return (
        <WeaponPageTemplate
            url="/sewa-kantor/bintaro"
            title={title}
            description={description}
            canonicalUrl="https://www.bintarobusinesscentre.com/sewa-kantor/bintaro"
            schemaObject={schemaObject}
            h1="Sewa Kantor Bintaro Eksekutif: Transformasi Ruangan Fisik All-In"
            intro='Koridor selatan Jakarta memiliki keunggulan aksesibilitas tol maupun ekosistem bisnis mapan (Bintaro Jaya). Ciptakan <a href="/sewa-kantor" class="text-accent font-bold hover:underline">sewa kantor berkelas operasional matang tanpa setup modal besar</a>, sepenuhnya legal di yurisdiksi Jakarta Selatan dengan BBC.'
            entity="sewa-kantor"
            location="bintaro"
            heroBadges={{ b1: "Konsep & Layout", b2: "Working Space" }}
            sections={[
                {
                    id: "problem",
                    h2: "Private Office versus Kosong vs Coworking Bintaro",
                    rawHtml: `
                        <p>Serviced office, atau kantor siap pakai, adalah model sewa kantor di mana unit ruang lantai Anda sudah dilengkapi dengan furnitur modular, infrastruktur jaringan terpasang (WiFi/kabel LAN), dan layanan back-office pendukung harian seperti resepsionis hingga kurir inter-office. Tenant nyaris tak perlu waktu renovasi.</p>
                        <p>Kawasan Bintaro dan Pesanggrahan Jakarta Selatan menarik para pengelola property management ini dengan gencar, menyebabkan membeludaknya opsi co-working. Berbeda dari coworking space yang lazimnya shared/open plan nan bising (privat rentan) serta kosongan telanjang yang wajib kontraktor fitting out, model private office memangkas semuanya di hari yang sama.</p>
                        <p><a href="/harga-sewa-kantor-bintaro" class="text-accent hover:underline">Halaman harga sewa kantor Bintaro yang membahas struktur biaya secara detail</a> sangat merefleksikan margin ROI antara 3 model layanan korporat properti tersebut secara finansial per pax di tahun pertama operasional PT / CV atau Startup branch office.</p>
                    `
                },
                {
                    id: "education",
                    h2: "Paket Fasilitas Standard Serviced Office",
                    rawHtml: `
                        <h3>Workstations Modern Minimalist (Desks + Chairs + Tumb P.</h3>
                        <p>Tersusun ergonomik mebel lemari credenza tanpa biaya angkut logistik / instalasi hardware rumit di muka ketika tim bertambah. Internet broadband dedicated untuk setiap ruang.</p>

                        <h3>Tamu Di-Handle Front Desk &amp; Lobby</h3>
                        <p>Gedung memiliki staf terlatih khusus untuk call forwarding / transfer ekstensi meja layaknya enterprise MNC tanpa budget UMR khusus resepsionis perusahaan mikro rintisan. <a href="/kantor-dekat-tol-veteran" class="text-accent hover:underline">Klien VIP masuk Pintu Tol Veteran JORR W2S</a>, mobil mereka akan diparkir di spot kami.</p>

                        <h3>Opex Ditutup Utilitas &amp; Kebersihan</h3>
                        <p>Listrik (PLN tier korporat), sentral kompresor AC harian, utilitas sanitary toilet premium hingga house keeping tiap jam telah diblend (bundle) fix charge. Beban vendor cleaning hilang.</p>
                    `
                },
                {
                    id: "authority",
                    h2: "Tipe Ruang Privat Yang Paling Digemari BBC",
                    rawHtml: `
                        <p>Berdasarkan okupansi penuh kami, perusahaan selalu melakukan rightsizing unit. Ruang eksklusif memungkinkan penyewa mengecilkan / membesarkan skalabilitas unit bila demand naik / surut (flexibilitas down-sizing).</p>
                    `,
                    visual: {
                        type: "card",
                        items: [
                            { title: "1-3 Pax: Mini command center / hub consultan spesialis independen (Lawyer single).", icon: "Smile" },
                            { title: "4-8 Pax: Scaleup SaaS startup, web design house studio, atau divisi rep cabang consumer goods.", icon: "Users" },
                            { title: "Lebih dari 8 pax: Kontraktor MEP, distribution control office.", icon: "Target" },
                            { title: "Booking jam meeting ruangan auditorium yang tak mengganggu hiruk pikuk pengerjaan laptop kolega sebelahnya.", icon: "Calendar" }
                        ]
                    }
                },
                {
                    id: "value",
                    h2: "Indikator Bisnis yang Wajib Beralih Ke Sini",
                    visual: {
                        type: "card",
                        items: [
                            { title: "Pendirian Legal", desc: "Sesuai UU, OSS mewajibkan kantor fisik untuk PKP Perdagangan/Distributor (cek zonasi KBLI).", icon: "Award" },
                            { title: "Tim Cabang (Branch)", desc: "Ekspansi wilayah Jabodetabek dari Jawa Barat sentral (Bandung) butuh rumah operasional sebulan.", icon: "Map" },
                            { title: "Remote Tapi Butuh Base", desc: "Kadang remote WFH butuh sentralisasi seminggu sekali (hybrid model).", icon: "Sun" },
                            { title: "C-Level Privasi", desc: "Direksi eksekutif menghargai kesunyian dinding peredam yang sulit dicari di cafe coworking.", icon: "Lock" }
                        ]
                    }
                },
                {
                    id: "options",
                    h2: "Katalog Kantor Bintaro BBC",
                    rawHtml: `
                        <p>Kondisi fisik gedung dengan protokol korporasi transparan.</p>

                        <h3>Mini Suite Bintaro</h3>
                        <p>Luas proporsional 10-14 sqm dilengkapi furnitur Aestetik.</p>
                        <p><strong>Akomodasi:</strong><br/>Tim super kurus inti. Founder dan admin operasional tandem.</p>
                        <ul>
                            <li>Biaya Variabel Ringan</li>
                            <li>Kontrak Lentur Pendek</li>
                        </ul>

                        <h3>Medium Business Suite</h3>
                        <p>Luas lega 15-20+ sqm, partisi meja lebar dan laci sorong.</p>
                        <p><strong>Akomodasi:</strong><br/>Tim solid siap delivery campaign, atau admin procurement massal.</p>
                        <ul>
                            <li>Lingkungan Kondusif Rapat Kecil</li>
                            <li>Daya Tampung Skalatis</li>
                        </ul>
                    `
                },
                {
                    id: "related",
                    h2: "ARTIKEL TERKAIT",
                    rawHtml: `
                        <ul>
                            <li><a href="/sewa-kantor/harga">Cara Menilai Harga Sewa Bintaro</a></li>
                            <li><a href="/sewa-kantor/jakarta-selatan">Sewa Kantor Jakarta Selatan Eksklusif</a></li>
                            <li><a href="/virtual-office/alamat-bisnis-jakarta-selatan">Alamat Bisnis Sah Jakarta Selatan</a></li>
                        </ul>
                    `
                },
                {
                    id: "cta",
                    h2: "Lihat Langsung Tata Ruang Kami Kapan Saja",
                    rawHtml: `
                        <p>Walk in tour 10 menit dengan tim penasihat operasional ruang BBC bisa mencerahkan struktur dan tata ruang sejati untuk kru Anda.</p>
                        <p><a href="https://wa.me/628128888069">Agendakan Survei Hari Ini</a> | <a href="/sewa-kantor">Gallery Fasilitas Ruangan Utama Jaksel</a></p>
                    `
                }
            ]}
            faq={{
                title: "FAQ Layanan & Ruangan Kantor Bintaro",
                items: [
                    { q: "Berapa durasi kontrak minimum untuk sewa kantor di Bintaro?", a: "Durasi kontrak bervariasi tergantung penyedia. Sebagian besar mengizinkan fleksibilitas sewa bulanan, per kuartal (3 bulan) minimal, hingga tahunan komitmen discount." },
                    { q: "Apakah alamat kantor di Bintaro bisa digunakan untuk domisili perusahaan?", a: "Tergantung lokasi spesifik dan IMB tata ruangnya. Alamat BBC di Pesanggrahan dapat mem-back up sah NIB serta NPWP korporasi PT sebagai domisili DKI Jakarta." }
                ]
            }}
            internalLinks={{
                intro: { label: "Tinjau Harga", href: "/harga-sewa-kantor-bintaro" },
                mid: { label: "Lihat Peta Akses Toll", href: "/kantor-dekat-tol-veteran" },
                closing: { label: "Agendakan Survei Hari Ini", href: "https://wa.me/628128888069" }
            }}
        />
    )
}
