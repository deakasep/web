// Sumber angka: clau-market/commercial/pricing.md (AI-CONSTITUTION v4.0.0 §4b). Ubah di sana dulu, lalu di sini.
// Patokan: 1 kredit = Rp200 (top up dasar); tarif tiap aksi minimal 3x biaya provider AI.

export const MONTHLY_CREDITS = 500;

export type Plan = { id: "1" | "3" | "6" | "12"; label: string; months: number; price: number; save: number };

export const plans: Plan[] = [
  { id: "1", label: "1 bulan", months: 1, price: 149_000, save: 0 },
  { id: "3", label: "3 bulan", months: 3, price: 399_000, save: 11 },
  { id: "6", label: "6 bulan", months: 6, price: 749_000, save: 16 },
  { id: "12", label: "12 bulan", months: 12, price: 1_390_000, save: 22 },
];

export const included = [
  "Semua agent aktif, plus agent baru begitu dirilis",
  `${MONTHLY_CREDITS} kredit setiap bulan (tidak menumpuk ke bulan berikutnya)`,
  "Brain bisnis bersama: produk, harga, dan gaya bahasa untuk semua agent",
  "Hubungkan Instagram, Facebook, TikTok lewat login resmi",
  "Approve sebelum posting + kalender konten",
  "Riwayat pemakaian kredit lengkap di dashboard",
  "Tidak diperpanjang otomatis tanpa izin Anda",
];

export const topups = [
  { credits: 250, price: 50_000, note: "Rp200 per kredit" },
  { credits: 550, price: 100_000, note: "Bonus 10%" },
  { credits: 1500, price: 250_000, note: "Bonus 20%" },
];

export type CreditCost = { job: string; agent: string; credits: string; soon?: boolean };

export const creditCosts: CreditCost[] = [
  { job: "Chat dengan agent (per pesan)", agent: "Semua", credits: "2" },
  { job: "Caption + hashtag + cek fakta", agent: "Tara", credits: "8" },
  { job: "Naskah Reels/TikTok", agent: "Raka", credits: "13" },
  { job: "Kalender konten 30 hari", agent: "Dimas", credits: "18" },
  { job: "Balasan komentar/review", agent: "Laras", credits: "3" },
  { job: "Laporan bulanan 1 halaman", agent: "Intan", credits: "20" },
  { job: "Posting terjadwal", agent: "Platform", credits: "1" },
  { job: "Gambar AI (2K)", agent: "AI Image Creator", credits: "29", soon: true },
  { job: "Video AI 8 detik (standar / cepat)", agent: "AI Video Creator", credits: "111 / 222", soon: true },
  { job: "Analisis data (1 file)", agent: "AI Data Analyst", credits: "20", soon: true },
  { job: "Anotasi data (100 baris)", agent: "AI Data Analyst", credits: "10", soon: true },
  { job: "Tugas integrasi / developer", agent: "Teguh, Sari", credits: "39", soon: true },
];

export const faq = [
  { q: "Apa yang terjadi kalau kredit habis?", a: "Anda cukup menerima pemberitahuan di dashboard: saat kredit menipis dan saat habis. Agent berhenti sebelum memanggil AI, jadi tidak ada tagihan tambahan, dan draft yang sudah jadi tetap tersimpan. Top up dari dashboard dan agent langsung bekerja lagi." },
  { q: "Apakah AI memposting sendiri?", a: "Tidak. Konten hanya terposting setelah Anda (atau approver yang Anda tunjuk) menekan Setujui untuk versi itu." },
  { q: "Perlu API key atau akun AI sendiri?", a: "Tidak. Anda tidak perlu mendaftar ke OpenAI, Google, atau penyedia AI lain. Semua pemakaian AI diatur otomatis oleh sistem CLAU dan sudah termasuk dalam kredit; Anda cukup membayar paket dan, bila perlu, top up." },
  { q: "Kalau job AI gagal, kredit hilang?", a: "Tidak. Job yang gagal karena sistem atau provider AI mengembalikan kreditnya otomatis." },
  { q: "Bayar pakai apa?", a: "QRIS, virtual account bank, dan e-wallet lewat payment gateway resmi. Kami tidak menyimpan data kartu atau rekening Anda." },
  { q: "Bagaimana cara berhenti?", a: "Paket tidak diperpanjang otomatis. Cukup tidak membayar periode berikutnya." },
];

export const rupiah = (n: number) => "Rp" + n.toLocaleString("id-ID");
