export const BBC_ENTITIES = {
  "virtual-office": {
    entity: "Virtual Office Jakarta Selatan",
    type: "service",

    aliases: [
      "Virtual Office Jakarta Selatan",
      "Virtual Office Bintaro",
      "Virtual Office",
      "Alamat Bisnis Jakarta Selatan",
      "Alamat Bisnis Virtual Office Jakarta Selatan",
      "virtual office",
      "virtual-office"
    ],

    attributes: [
      "alamat bisnis resmi",
      "tanpa ruang kantor fisik",
      "digunakan untuk PT dan CV",
      "pengurusan surat menyurat",
      "biaya operasional rendah"
    ],

    relations: {
      supports: [
        "Pendirian PT",
        "Domisili perusahaan"
      ],
      compared_to: [
        "Sewa Kantor Fisik"
      ],
      restricted_by: [
        "KBLI tertentu"
      ]
    },

    geo: [
      "Jakarta Selatan",
      "Bintaro",
      "Tangerang Selatan"
    ]
  },

  "sewa-kantor": {
    entity: "Sewa Kantor Bintaro",
    type: "service",

    aliases: [
      "Sewa Kantor Bintaro",
      "Sewa Kantor Jakarta Selatan",
      "Kantor Siap Pakai Bintaro",
      "Private Office Bintaro",
      "Sewa Kantor",
      "Kantor Siap Pakai",
      "sewa kantor",
      "sewa-kantor"
    ],

    attributes: [
      "kantor siap pakai",
      "furniture lengkap",
      "internet dedicated",
      "resepsionis profesional",
      "akses 24 jam"
    ],

    relations: {
      supports: [
        "Operasional bisnis",
        "Meeting klien"
      ],
      compared_to: [
        "Virtual Office"
      ],
      restricted_by: []
    },

    geo: [
      "Bintaro",
      "Jakarta Selatan"
    ]
  },

  "pendirian-pt": {
    entity: "Pendirian PT Jakarta Selatan",
    type: "legal",

    aliases: [
      "Pendirian PT Jakarta Selatan",
      "Jasa Pendirian PT",
      "Jasa Legal",
      "Legalitas Usaha",
      "Pengurusan PT",
      "Pendirian PT",
      "pendirian pt",
      "pendirian-pt"
    ],

    attributes: [
      "legalitas perusahaan",
      "akta notaris",
      "SK Kemenkumham",
      "NPWP perusahaan"
    ],

    relations: {
      supports: [
        "Operasional bisnis",
        "Legal compliance"
      ],
      compared_to: [],
      restricted_by: [
        "Regulasi pemerintah"
      ]
    },

    geo: [
      "Jakarta Selatan"
    ]
  }
}
