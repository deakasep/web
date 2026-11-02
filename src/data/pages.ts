// Judul & deskripsi tiap halaman statis. Dipakai halaman (usePageMeta) DAN scripts/prerender-routes.mjs
// (HTML per rute, sitemap). File ini sengaja tanpa import supaya bisa dibaca Node langsung.

export type PageMeta = { path: string; title: string; description: string; priority: number };

export const BRAND = "CLAU AI";

export const pages: PageMeta[] = [
  {
    path: "/",
    title: "CLAU AI · Karyawan AI untuk UMKM & Hospitality Indonesia",
    description: "Tim agen AI untuk konten sosmed, video, gambar, data, dan laporan. Langganan mulai Rp149rb/bulan, kredit per pekerjaan, dan tidak ada yang terposting sebelum Anda klik Setujui.",
    priority: 1,
  },
  {
    path: "/agen",
    title: "Agen AI · CLAU AI",
    description: "Kenali 15 agen AI CLAU: caption, Reels, Stories, listing, balasan review, kalender, kampanye, terjemahan, gambar, video, laporan, data, sales, dan integrasi.",
    priority: 0.9,
  },
  {
    path: "/harga",
    title: "Harga & Kredit · CLAU AI",
    description: "Paket 1, 3, 6, atau 12 bulan dengan 500 kredit setiap bulan, top up kapan saja, dan tarif kredit transparan untuk setiap pekerjaan agen.",
    priority: 0.9,
  },
  {
    path: "/brain-ai",
    title: "Brain AI · Satu memori bisnis untuk semua agen · CLAU AI",
    description: "Isi profil usaha, produk, harga, dan gaya bahasa sekali. Semua agen membaca Brain bisnis yang sama dan mencocokkan setiap klaim ke fakta yang Anda konfirmasi.",
    priority: 0.8,
  },
  {
    path: "/integrasi",
    title: "Integrasi · CLAU AI",
    description: "Hubungkan Instagram, Facebook, TikTok, dan Google Business Profile lewat login resmi, tanpa berbagi password. Bayar via QRIS, virtual account, dan e-wallet.",
    priority: 0.7,
  },
  {
    path: "/yang-baru",
    title: "Yang baru · CLAU AI",
    description: "Catatan fitur baru dan perbaikan CLAU AI: agen, kredit, Brain bisnis, keamanan, dan fitur yang segera hadir.",
    priority: 0.6,
  },
  {
    path: "/kebijakan-privasi",
    title: "Kebijakan Privasi · CLAU AI",
    description: "Data apa yang kami kumpulkan, untuk apa, dengan siapa dibagikan, berapa lama disimpan, dan hak Anda sesuai UU Pelindungan Data Pribadi.",
    priority: 0.3,
  },
  {
    path: "/syarat-layanan",
    title: "Syarat Layanan · CLAU AI",
    description: "Ketentuan akun, langganan, kredit, pembayaran, persetujuan konten, dan penggunaan agen AI CLAU.",
    priority: 0.3,
  },
  {
    path: "/penghapusan-data",
    title: "Penghapusan Data · CLAU AI",
    description: "Cara meminta penghapusan akun dan data Anda, termasuk data dari akun Instagram, Facebook, dan TikTok yang terhubung.",
    priority: 0.3,
  },
];

export const NOT_FOUND: PageMeta = { path: "/404", title: "Halaman tidak ditemukan · CLAU AI", description: "Halaman yang Anda cari tidak ada.", priority: 0 };
