import { SITE } from "@/data/site";
import { Bullets, LegalLayout, Mail, type LegalSection } from "@/pages/legal/LegalLayout";

// Halaman "Data Deletion Instructions" yang diminta Meta (App Review) dan TikTok. Draf; isi placeholder lewat .env.
const sections: LegalSection[] = [
  {
    id: "minta",
    title: "Cara meminta penghapusan",
    body: (
      <>
        <p>
          Kirim email ke <Mail to={SITE.privacyEmail} /> <b className="text-white">dari alamat email akun CLAU AI Anda</b> dengan subjek{" "}
          <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-white">Hapus data</span>. Sebutkan nama usaha dan apakah Anda ingin menghapus
          seluruh akun atau hanya data tertentu (misalnya sambungan Instagram).
        </p>
        <p>
          Kami mengonfirmasi penerimaan dan memprosesnya paling lambat <b className="text-white">{SITE.deletionDays} hari kerja</b>. Untuk keamanan, kami dapat
          meminta verifikasi bahwa Anda pemilik akun.
        </p>
      </>
    ),
  },
  {
    id: "sosmed",
    title: "Memutus akun media sosial",
    body: (
      <>
        <p>Anda juga dapat mencabut izin CLAU AI langsung dari platform kapan saja:</p>
        <Bullets
          items={[
            "Facebook & Instagram: Pengaturan › Integrasi Bisnis (Business Integrations), lalu hapus CLAU AI",
            "TikTok: Pengaturan › Keamanan › Aplikasi dan layanan yang diizinkan, lalu hapus CLAU AI",
            "Google: myaccount.google.com › Keamanan › Aplikasi pihak ketiga, lalu hapus akses CLAU AI",
          ]}
        />
        <p>Setelah izin dicabut, token akses yang kami simpan untuk platform tersebut dihapus dan kami tidak bisa lagi memposting atau membaca data akun itu.</p>
      </>
    ),
  },
  {
    id: "dihapus",
    title: "Apa yang dihapus",
    body: (
      <Bullets
        items={[
          "Profil akun, anggota tim, dan pengaturan login",
          "Brain bisnis, aset, draft, dan riwayat konten",
          "Token akses dan data dari akun media sosial yang terhubung",
          "Log pemakaian yang terkait dengan akun",
        ]}
      />
    ),
  },
  {
    id: "disimpan",
    title: "Yang tetap disimpan",
    body: (
      <>
        <p>Sebagian data wajib kami simpan sesuai peraturan, terutama catatan transaksi dan kredit untuk keperluan pajak dan akuntansi. Data ini tidak dipakai untuk keperluan lain.</p>
        <p>Salinan cadangan terenkripsi terhapus otomatis paling lambat 60 hari setelah dibuat.</p>
      </>
    ),
  },
  {
    id: "status",
    title: "Status permintaan",
    body: (
      <p>
        Setelah selesai, kami mengirim konfirmasi ke email Anda. Pertanyaan tentang status permintaan dapat dikirim ke <Mail to={SITE.privacyEmail} />.
      </p>
    ),
  },
];

export default function DataDeletionPage() {
  return (
    <LegalLayout
      path="/penghapusan-data"
      title="Penghapusan Data"
      intro="Anda bisa meminta akun dan data Anda dihapus kapan saja, termasuk data dari akun Instagram, Facebook, TikTok, atau Google yang terhubung."
      sections={sections}
    />
  );
}
