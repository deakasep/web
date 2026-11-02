// Catatan rilis publik halaman /yang-baru (pola "What's new" Sintra.ai).
// Sumber: riwayat PR clau-agent & claw-web serta clau-market/commercial/pricing.md. Tulis bahasa pelanggan,
// bukan istilah teknis. Fitur yang belum aktif untuk klien WAJIB bertanda "segera". Entri terbaru di atas.

export type ChangeTag = "baru" | "perbaikan" | "segera";

export type ChangeItem = { tag: ChangeTag; title: string; body: string; href?: string };

export type Release = { date: string; label: string; items: ChangeItem[] };

export const releases: Release[] = [
  {
    date: "2026-11-02",
    label: "November 2026",
    items: [
      {
        tag: "baru",
        title: "Coba gratis: 50 kredit percobaan",
        body: "Akun usaha baru mendapat 50 kredit gratis yang berlaku 3 hari sejak email terverifikasi, sekali per usaha. Kredit percobaan dipakai lebih dulu dan tidak ada tagihan otomatis setelahnya.",
        href: "/harga#faq",
      },
      {
        tag: "baru",
        title: "Tugas tiap agen dijelaskan seperti staf ahli",
        body: "Setiap halaman agen kini memuat 3 kemampuan utama, 6 fitur, alur kerja langkah demi langkah, dan checklist kualitas yang dicek sebelum draft sampai ke Anda.",
        href: "/agen",
      },
      {
        tag: "baru",
        title: "Use case siap pakai",
        body: "Empat contoh perintah per agen lengkap dengan tarif kreditnya, jadi Anda tahu harus minta apa dan berapa kredit yang terpakai sebelum mulai.",
        href: "/agen",
      },
      {
        tag: "segera",
        title: "Mode AI: Ringan, Standar, dan Pro",
        body: "Standar menjadi pilihan bawaan. Mode Pro memakai Claude Fable 5.1 untuk pekerjaan yang butuh hasil paling teliti, dengan tarif kredit lebih tinggi yang tampil sebelum Anda mengirim permintaan.",
        href: "/harga#mode-ai",
      },
    ],
  },
  {
    date: "2026-10-30",
    label: "Oktober 2026",
    items: [
      {
        tag: "baru",
        title: "Kredit top up berlaku 12 bulan",
        body: "Kredit bulanan dipakai lebih dulu, lalu top up yang paling cepat kedaluwarsa. Dashboard menampilkan jumlah kredit yang akan hangus berikutnya beserta tanggalnya.",
        href: "/harga",
      },
      {
        tag: "baru",
        title: "Pemilik usaha bisa memakai agen sendiri",
        body: "Isi Brain bisnis, minta draft ke agen, lalu setujui hasilnya langsung dari dashboard tanpa perlu menunggu tim kami.",
        href: "/brain-ai",
      },
      {
        tag: "baru",
        title: "Daftar mandiri dengan verifikasi email",
        body: "Buat akun, verifikasi email, lalu pilih paket. Lupa password bisa diatur ulang sendiri lewat email. Pendaftaran dibuka bertahap.",
      },
      {
        tag: "baru",
        title: "Langganan 1, 3, 6, atau 12 bulan dengan kredit",
        body: "Setiap paket berisi kredit bulanan, bisa ditambah top up kapan saja. Pekerjaan AI yang gagal karena sistem mengembalikan kreditnya otomatis.",
        href: "/harga",
      },
      {
        tag: "baru",
        title: "Tiga agen baru: Nova, Aruna, dan Dara",
        body: "Gambar promo, video pendek untuk Reels & TikTok, serta analisis file penjualan. Ketiganya ditampilkan sebagai Segera hadir sampai siap dipakai.",
        href: "/agen",
      },
      {
        tag: "perbaikan",
        title: "Level persetujuan naik otomatis untuk konten berisiko",
        body: "Draft yang menyebut harga atau promo, orang, iklan, review negatif, atau agama dan adat otomatis ditandai dan meminta pemeriksaan yang lebih teliti sebelum disetujui.",
      },
      {
        tag: "perbaikan",
        title: "Verifikasi dua langkah untuk pemilik akun",
        body: "Login pemilik dan penanggung jawab konten dilindungi kode dari aplikasi autentikator, lengkap dengan kode cadangan.",
      },
    ],
  },
];

export const TAG: Record<ChangeTag, { label: string; cls: string }> = {
  baru: { label: "Baru", cls: "bg-emerald-400/90 text-emerald-950" },
  perbaikan: { label: "Perbaikan", cls: "bg-teal-400/15 text-teal-200" },
  segera: { label: "Segera hadir", cls: "bg-white/10 text-slate-300" },
};
