// Konfigurasi situs. Semua nilai usaha & kontak masih PLACEHOLDER: isi lewat file .env saat build
// (lihat .env.example dan docs/deploy.md), tanpa mengubah kode.
const env = import.meta.env;
const pick = (v: string | undefined, fallback: string) => (v && v.trim() ? v.trim() : fallback);

export const SITE = {
  name: "CLAU AI",
  /** Nama usaha resmi (PT/CV/perorangan) untuk halaman legal & footer. */
  legalName: pick(env.VITE_LEGAL_NAME, "[Nama usaha resmi]"),
  address: pick(env.VITE_ADDRESS, "[Alamat usaha]"),
  email: pick(env.VITE_CONTACT_EMAIL, "halo@domain-anda.com"),
  privacyEmail: pick(env.VITE_PRIVACY_EMAIL, pick(env.VITE_CONTACT_EMAIL, "privasi@domain-anda.com")),
  /** Nomor WhatsApp format internasional tanpa + (mis. 6281234567890). Kosong = tombol WA disembunyikan. */
  whatsapp: pick(env.VITE_WHATSAPP, ""),
  /** URL situs ini (untuk canonical & sitemap). */
  url: pick(env.VITE_SITE_URL, "https://domain-anda.com"),
  /** Dashboard klien (repo clau-agent). Daftar & masuk diarahkan ke sini. */
  appUrl: pick(env.VITE_APP_URL, "https://app.domain-anda.com"),
  /** Tanggal berlaku dokumen legal (tampil di halaman legal). */
  legalEffective: pick(env.VITE_LEGAL_EFFECTIVE_DATE, "[Tanggal berlaku]"),
  /** "1" setelah dokumen legal ditinjau konsultan hukum; sampai itu halaman legal menampilkan label Draf. */
  legalReviewed: env.VITE_LEGAL_REVIEWED === "1",
  /** Batas waktu proses permintaan hapus data (hari kerja). */
  deletionDays: pick(env.VITE_DATA_DELETION_DAYS, "14"),
};

export const SIGNUP_URL = `${SITE.appUrl}/daftar`;
export const LOGIN_URL = `${SITE.appUrl}/login`;
export const CONTACT_URL = SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}` : `mailto:${SITE.email}`;

export type NavLink = { label: string; href: string; desc?: string };

/** Menu utama. "Agen AI" memakai mega menu dari data agen (components/layout/Navbar.tsx). */
export const features: NavLink[] = [
  { label: "Brain AI", href: "/brain-ai", desc: "Satu memori bisnis untuk semua agen" },
  { label: "Integrasi", href: "/integrasi", desc: "Instagram, Facebook, TikTok, pembayaran" },
  { label: "Keamanan konten", href: "/#keamanan", desc: "Cek fakta, approve sebelum posting" },
  { label: "Cara kerja", href: "/#cara-kerja", desc: "Dari daftar sampai terposting" },
];

export const footer: { title: string; links: NavLink[] }[] = [
  {
    title: "Produk",
    links: [
      { label: "Semua agen", href: "/agen" },
      { label: "Brain AI", href: "/brain-ai" },
      { label: "Integrasi", href: "/integrasi" },
      { label: "Harga", href: "/harga" },
    ],
  },
  {
    title: "Mulai",
    links: [
      { label: "Cara kerja", href: "/#cara-kerja" },
      { label: "Tarif kredit", href: "/harga#tarif" },
      { label: "Pertanyaan umum", href: "/harga#faq" },
      { label: "Masuk dashboard", href: LOGIN_URL },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Kebijakan privasi", href: "/kebijakan-privasi" },
      { label: "Syarat layanan", href: "/syarat-layanan" },
      { label: "Penghapusan data", href: "/penghapusan-data" },
    ],
  },
];
