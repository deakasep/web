// Sumber angka: clau-market/commercial/pricing.md v1.1.0 (AI-CONSTITUTION v4.0.0 §4b). Ubah di sana dulu, lalu di sini.
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

/** Masa berlaku kredit top up (pricing.md v1.1.0 §2; sama dengan platform clau-agent 0.14.0). */
export const TOPUP_VALID_MONTHS = 12;
// Kredit percobaan (clau-market pricing.md v1.3.0 §2a): sekali per akun usaha.
export const TRIAL_CREDITS = 50;
export const TRIAL_DAYS = 3;
export const topupNote = `Kredit top up berlaku ${TOPUP_VALID_MONTHS} bulan sejak dibayar. Urutan pemakaian: kredit percobaan, kredit bulanan, lalu top up yang paling cepat kedaluwarsa; tanggal hangus terdekat terlihat di dashboard.`;

/** Mode AI (pricing.md v1.2.0 §3a). Aktif setelah provider AI nyata tersambung; sampai itu web menandainya segera hadir. */
export const PRO_MULTIPLIER = 4;

export const aiModes = [
  { id: "ringan", name: "Ringan", model: "Claude Haiku", when: "Dipilih sistem untuk tugas ringan: balasan chat singkat, format ulang, ringkasan pendek. Tidak dipakai untuk pekerjaan berisiko.", price: "Tarif biasa" },
  { id: "standar", name: "Standar", model: "Claude Sonnet", when: "Default untuk semua pekerjaan agen: caption, naskah, listing, kalender, laporan, dan lainnya.", price: "Tarif biasa" },
  { id: "pro", name: "Pro", model: "Claude Fable 5.1", when: "Anda pilih sendiri sebelum mengirim permintaan, untuk pekerjaan teks yang butuh kualitas tertinggi.", price: `${PRO_MULTIPLIER}× tarif` },
] as const;

export type CreditCost = { job: string; agent: string; credits: string; soon?: boolean };

export const creditCosts: CreditCost[] = [
  { job: "Chat dengan agent (per pesan)", agent: "Semua", credits: "2", soon: true },
  { job: "Caption + hashtag + cek fakta", agent: "Tara", credits: "8" },
  { job: "Naskah Reels/TikTok", agent: "Raka", credits: "13" },
  { job: "Rangkaian Stories", agent: "Sekar", credits: "8" },
  { job: "Listing / deskripsi produk", agent: "Bayu", credits: "10" },
  { job: "Balasan komentar/review", agent: "Laras", credits: "3" },
  { job: "Kalender konten 30 hari", agent: "Dimas", credits: "18" },
  { job: "Rencana kampanye musiman", agent: "Ayu", credits: "18" },
  { job: "Terjemahan / lokalisasi", agent: "Nara", credits: "5" },
  { job: "Laporan bulanan 1 halaman", agent: "Intan", credits: "20" },
  { job: "Posting terjadwal", agent: "Platform", credits: "1", soon: true },
  { job: "Gambar AI (2K)", agent: "Nova", credits: "29", soon: true },
  { job: "Video AI 8 detik (standar / cepat)", agent: "Aruna", credits: "111 / 222", soon: true },
  { job: "Analisis data (1 file)", agent: "Dara", credits: "20", soon: true },
  { job: "Anotasi data (100 baris)", agent: "Dara", credits: "10", soon: true },
  { job: "Tugas integrasi / developer / website", agent: "Teguh", credits: "39", soon: true },
  { job: "SOP / dokumen kerja", agent: "Teguh", credits: "10", soon: true },
  { job: "Balas pertanyaan calon pelanggan", agent: "Galih", credits: "3", soon: true },
  { job: "Pesan ke tamu (konfirmasi, pengingat)", agent: "Sari", credits: "3", soon: true },
];

export const faq = [
  { q: "Bisa coba dulu sebelum bayar?", a: `Bisa. Akun usaha baru mendapat ${TRIAL_CREDITS} kredit percobaan gratis yang berlaku ${TRIAL_DAYS} hari sejak email Anda terverifikasi, sekali per usaha. Tanpa kartu, tanpa tagihan otomatis: setelah ${TRIAL_DAYS} hari sisa kredit percobaan hangus, dan Anda bebas memilih paket atau tidak.` },
  { q: "Apa itu karyawan AI?", a: "Agen AI yang masing-masing punya satu keahlian, misalnya menulis caption, naskah Reels, listing OTA, atau balasan review. Agen membaca Brain bisnis Anda, menyusun draft, mengecek setiap klaim ke fakta yang Anda konfirmasi, lalu menyerahkan hasilnya untuk Anda setujui. Seperti staf ahli, tapi tidak ada yang tayang tanpa persetujuan Anda." },
  { q: "Apa bedanya dengan chatbot AI biasa?", a: "Chatbot umum tidak tahu harga, produk, dan aturan merek Anda, sehingga hasilnya perlu dicek ulang dari nol. Agen CLAU bekerja dari Brain bisnis yang sama, mengikuti alur kerja dan checklist kualitas yang tetap, menandai isi berisiko seperti harga atau review negatif, dan mencatat siapa menyetujui apa." },
  { q: "Apa yang terjadi kalau kredit habis?", a: "Anda cukup menerima pemberitahuan di dashboard: saat kredit menipis dan saat habis. Agent berhenti sebelum memanggil AI, jadi tidak ada tagihan tambahan, dan draft yang sudah jadi tetap tersimpan. Top up dari dashboard dan agent langsung bekerja lagi." },
  { q: "Apakah AI memposting sendiri?", a: "Tidak. Konten hanya terposting setelah Anda (atau approver yang Anda tunjuk) menekan Setujui untuk versi itu." },
  { q: "Perlu API key atau akun AI sendiri?", a: "Tidak. Anda tidak perlu mendaftar ke OpenAI, Google, atau penyedia AI lain. Semua pemakaian AI diatur otomatis oleh sistem CLAU dan sudah termasuk dalam kredit; Anda cukup membayar paket dan, bila perlu, top up." },
  { q: "Kalau job AI gagal, kredit hilang?", a: "Tidak. Job yang gagal karena sistem atau provider AI mengembalikan kreditnya otomatis." },
  { q: "Apakah kredit top up bisa hangus?", a: "Ya, kredit top up berlaku 12 bulan sejak dibayar, lalu sisanya hangus otomatis. Kredit bulanan selalu dipakai lebih dulu, lalu top up yang paling cepat kedaluwarsa, dan dashboard menampilkan berapa kredit yang akan hangus berikutnya beserta tanggalnya. Kredit yang dikembalikan karena job gagal tidak hangus. Top up tetap bisa dipakai meskipun paket sudah berakhir." },
  { q: "Bayar pakai apa?", a: "QRIS, virtual account bank, dan e-wallet lewat payment gateway resmi. Kami tidak menyimpan data kartu atau rekening Anda." },
  { q: "Bagaimana cara berhenti?", a: "Paket tidak diperpanjang otomatis. Cukup tidak membayar periode berikutnya." },
];

export const rupiah = (n: number) => "Rp" + n.toLocaleString("id-ID");
