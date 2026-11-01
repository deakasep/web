// Use case siap pakai per agen (pola "Use Cases" Sintra.ai, content docs/sintra-benchmark.md §2).
// Kunci = id agen (data/agents.ts). Kredit = tarif di data/pricing.ts (creditCosts); ubah di sana dulu.
// Contoh perintah selalu FIKTIF/umum, tanpa data klien nyata. Semua hasil = draft yang Anda setujui dulu.

export type UseCase = {
  title: string;
  /** Contoh perintah yang Anda ketik/pilih di dashboard. */
  ask: string;
  credits: string;
};

export const useCases: Record<string, UseCase[]> = {
  "caption-writer": [
    { title: "Caption produk baru", ask: "Tulis caption untuk menu baru kami, ajak orang mampir minggu ini.", credits: "8" },
    { title: "Caption dua bahasa", ask: "Buat caption Indonesia + Inggris untuk foto kolam villa pagi hari.", credits: "8" },
    { title: "Caption behind the scene", ask: "Ceritakan proses dapur kami menyiapkan sarapan, gaya hangat.", credits: "8" },
    { title: "Caption pengumuman", ask: "Umumkan jam buka baru mulai bulan depan, singkat dan jelas.", credits: "8" },
  ],
  "reel-scripter": [
    { title: "Reels tur tempat", ask: "Naskah Reels 15 detik tur kamar, dari pintu masuk sampai balkon.", credits: "13" },
    { title: "TikTok resep / proses", ask: "Naskah TikTok 20 detik proses membuat kopi andalan kami.", credits: "13" },
    { title: "Reels testimoni", ask: "Naskah Reels dari ulasan tamu yang sudah memberi izin dikutip.", credits: "13" },
    { title: "Reels promo musiman", ask: "Naskah Reels promo long weekend, satu ajakan di akhir.", credits: "13" },
  ],
  "story-writer": [
    { title: "Stories promo", ask: "Rangkaian 3 frame untuk promo akhir pekan, frame terakhir ajakan pesan.", credits: "8" },
    { title: "Stories polling", ask: "Stories dengan polling: pilih menu favorit bulan ini.", credits: "8" },
    { title: "Stories hitung mundur event", ask: "Stories hitung mundur 3 hari menuju acara live music.", credits: "8" },
    { title: "Stories FAQ", ask: "Jawab 3 pertanyaan yang paling sering ditanya pelanggan lewat Stories.", credits: "8" },
  ],
  "listing-writer": [
    { title: "Deskripsi produk marketplace", ask: "Tulis deskripsi produk untuk Tokopedia & Shopee dari data di Brain.", credits: "10" },
    { title: "Listing OTA", ask: "Perbarui deskripsi kamar Deluxe untuk Booking.com dan Agoda.", credits: "10" },
    { title: "Profil Google Business", ask: "Tulis deskripsi usaha untuk Google Business Profile, maks 750 karakter.", credits: "10" },
    { title: "Halaman layanan website", ask: "Tulis halaman paket wedding: isi paket, syarat, dan cara pesan.", credits: "10" },
  ],
  "review-responder": [
    { title: "Balas review positif", ask: "Balas 5 review Google bintang 5 minggu ini, sebut detailnya.", credits: "3" },
    { title: "Draft balasan keluhan", ask: "Siapkan draft balasan review bintang 2 soal waktu tunggu; saya putuskan dulu.", credits: "3" },
    { title: "Balas komentar Instagram", ask: "Balas komentar yang bertanya harga di post terakhir, arahkan ke DM.", credits: "3" },
    { title: "Balas review OTA", ask: "Balas review tamu di TripAdvisor dengan nada ramah dan singkat.", credits: "3" },
  ],
  "calendar-planner": [
    { title: "Kalender bulan depan", ask: "Susun kalender konten Instagram & TikTok untuk bulan depan.", credits: "18" },
    { title: "Kalender Ramadan", ask: "Kalender konten selama Ramadan sampai Lebaran, termasuk jam buka puasa.", credits: "18" },
    { title: "Kalender musim liburan", ask: "Kalender konten musim libur sekolah dengan pilar seimbang.", credits: "18" },
    { title: "Daftar aset yang perlu disiapkan", ask: "Dari kalender bulan ini, daftar foto & video yang harus saya siapkan.", credits: "18" },
  ],
  "campaign-planner": [
    { title: "Kampanye Lebaran", ask: "Rencana kampanye Lebaran: penawaran, syarat, timeline, dan kanal.", credits: "18" },
    { title: "Kampanye Nataru", ask: "Rencana kampanye Natal & Tahun Baru untuk tamu domestik.", credits: "18" },
    { title: "Kampanye long weekend", ask: "Rencana promo long weekend 2 minggu, dengan rencana cadangan.", credits: "18" },
    { title: "Kampanye pembukaan", ask: "Rencana kampanye soft opening cabang baru, target 4 minggu.", credits: "18" },
  ],
  localizer: [
    { title: "Caption ke bahasa Inggris", ask: "Lokalisasi caption ini untuk tamu mancanegara, jangan kaku.", credits: "5" },
    { title: "Menu dua bahasa", ask: "Terjemahkan menu kami ke bahasa Inggris dan jelaskan nama hidangan lokal.", credits: "5" },
    { title: "Listing untuk tamu asing", ask: "Lokalisasi deskripsi villa ke bahasa Inggris, angka & syarat tetap sama.", credits: "5" },
    { title: "Pesan tamu dua bahasa", ask: "Ubah pesan selamat datang ke Indonesia dan Inggris.", credits: "5" },
  ],
  "image-creator": [
    { title: "Banner promo", ask: "Buat banner promo 4:5 untuk diskon akhir pekan, warna merek kami.", credits: "29" },
    { title: "Visual Stories", ask: "Buat latar Stories 9:16 untuk pengumuman jam buka baru.", credits: "29" },
    { title: "Poster event", ask: "Buat poster acara live music Sabtu malam, teks singkat.", credits: "29" },
    { title: "Visual feed seragam", ask: "Buat 3 visual feed dengan gaya yang sama untuk seri menu baru.", credits: "29" },
  ],
  "video-creator": [
    { title: "Video Reels 8 detik", ask: "Buat klip 9:16 suasana kafe pagi hari dari naskah Raka.", credits: "111" },
    { title: "Video promo produk", ask: "Buat video pendek produk unggulan dengan teks layar 3 detik pertama.", credits: "111" },
    { title: "Storyboard dulu", ask: "Siapkan storyboard per detik sebelum videonya dibuat.", credits: "111" },
    { title: "Video teaser event", ask: "Buat teaser 8 detik untuk acara akhir bulan.", credits: "111" },
  ],
  "report-builder": [
    { title: "Laporan bulanan", ask: "Buat laporan 1 halaman performa Instagram bulan lalu.", credits: "20" },
    { title: "Konten terbaik", ask: "Tunjukkan 3 konten terbaik bulan ini dan alasannya.", credits: "20" },
    { title: "Rekomendasi bulan depan", ask: "Dari angka bulan ini, apa yang sebaiknya diubah bulan depan?", credits: "20" },
    { title: "Ringkasan untuk pemilik", ask: "Ringkas performa semua kanal dalam 3 kalimat.", credits: "20" },
  ],
  "data-analyst": [
    { title: "Analisis penjualan", ask: "Baca file penjualan bulan ini, beri tren dan 3 insight utama.", credits: "20" },
    { title: "Cek stok", ask: "Dari file stok, tandai produk yang perlu dipesan ulang.", credits: "20" },
    { title: "Sentimen ulasan", ask: "Labeli 100 ulasan pelanggan: positif, netral, negatif.", credits: "10" },
    { title: "Kategori produk", ask: "Kelompokkan 100 baris produk ke kategori yang saya tentukan.", credits: "10" },
  ],
  "sales-assistant": [
    { title: "Balas pertanyaan harga", ask: "Siapkan balasan DM yang menanyakan harga paket, dari Brain bisnis.", credits: "3" },
    { title: "Lengkapi pesanan", ask: "Buat pertanyaan lanjutan untuk calon tamu yang belum menyebut tanggal.", credits: "3" },
    { title: "Penawaran rombongan", ask: "Draft penawaran untuk rombongan 20 orang sesuai syarat kami.", credits: "3" },
    { title: "Follow-up calon pelanggan", ask: "Follow-up sopan untuk calon pelanggan yang belum membalas 3 hari.", credits: "3" },
  ],
  "guest-messenger": [
    { title: "Pesan pra-kedatangan", ask: "Pesan H-1 untuk tamu: jam check-in, arah lokasi, kontak.", credits: "3" },
    { title: "Info pengiriman", ask: "Pesan untuk pelanggan bahwa pesanan sedang dikirim, dengan estimasi.", credits: "3" },
    { title: "Follow-up setelah menginap", ask: "Ucapan terima kasih setelah check-out, ajak menulis ulasan dengan sopan.", credits: "3" },
    { title: "Pengingat reservasi", ask: "Pengingat reservasi meja besok malam, dengan opsi ubah jadwal.", credits: "3" },
  ],
  "sop-writer": [
    { title: "SOP kerja", ask: "Tulis SOP buka toko pagi hari dalam bentuk checklist.", credits: "10" },
    { title: "Rencana integrasi", ask: "Rencanakan alur pesanan dari WhatsApp ke Google Sheets.", credits: "39" },
    { title: "Landing page sederhana", ask: "Buat landing page promo dengan form pemesanan.", credits: "39" },
    { title: "Dokumen kerja tim", ask: "Susun panduan onboarding karyawan baru bagian kasir.", credits: "10" },
  ],
};
