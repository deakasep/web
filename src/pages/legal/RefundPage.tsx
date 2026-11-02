import { REFUND_DAYS, REFUND_PROCESS, TRIAL_CREDITS } from "@/data/pricing";
import { SITE } from "@/data/site";
import { Bullets, LegalLayout, Mail, type LegalSection } from "@/pages/legal/LegalLayout";

// Draf. Sumber aturan: clau-market/commercial/pricing.md v1.4.0 §2b (keputusan owner Dea Karisna 2026-11-02,
// alur garansi seperti Sintra.ai). Ubah angka di pricing.md dulu, lalu REFUND_DAYS/REFUND_PROCESS di data/pricing.ts.
const link = "font-semibold text-teal-300 hover:text-teal-200";

const sections: LegalSection[] = [
  {
    id: "garansi",
    title: `Garansi uang kembali ${REFUND_DAYS} hari`,
    body: (
      <>
        <p>
          Kalau CLAU AI ternyata tidak cocok untuk usaha Anda, pembayaran <b className="text-white">paket berlangganan pertama</b> Anda kami kembalikan penuh, asal
          permintaannya masuk paling lambat <b className="text-white">{REFUND_DAYS} hari kalender</b> sejak pembayaran terkonfirmasi. Anda tidak perlu memberi
          alasan.
        </p>
        <p>Garansi berlaku untuk semua durasi paket (1, 3, 6, atau 12 bulan), sekali per akun usaha.</p>
      </>
    ),
  },
  {
    id: "tidak-termasuk",
    title: "Yang tidak termasuk",
    body: (
      <Bullets
        items={[
          "Pembelian top up kredit, kapan pun dibeli",
          `Kredit percobaan (${TRIAL_CREDITS} kredit gratis), karena tidak ada pembayaran`,
          "Perpanjangan paket dan pembayaran paket kedua dan seterusnya",
          "Permintaan yang masuk setelah lewat batas waktu",
          "Akun yang melanggar Penggunaan Wajar, misalnya membuat akun berulang untuk mengulang garansi",
        ]}
      />
    ),
  },
  {
    id: "cara",
    title: "Cara meminta refund",
    body: (
      <>
        <p>
          Kirim email ke <Mail to={SITE.email} /> <b className="text-white">dari alamat email pemilik akun</b> dengan subjek{" "}
          <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-white">Refund</span>. Sebutkan nama usaha dan tanggal pembayaran.
        </p>
        <p>Untuk keamanan, kami dapat meminta verifikasi bahwa Anda pemilik akun sebelum memproses permintaan.</p>
      </>
    ),
  },
  {
    id: "proses",
    title: "Proses & waktu",
    body: (
      <Bullets
        items={[
          "Kami membalas untuk mengonfirmasi permintaan Anda diterima",
          `Setelah disetujui, dana dikembalikan penuh ke metode bayar asal dalam ${REFUND_PROCESS}`,
          "Waktu dana terlihat di rekening atau e-wallet mengikuti bank dan payment gateway",
          "Bila permintaan ditolak, alasannya kami sampaikan tertulis",
        ]}
      />
    ),
  },
  {
    id: "akibat",
    title: "Setelah refund",
    body: (
      <>
        <p>Paket berakhir saat refund disetujui, dan sisa kredit bulanan ikut hangus. Kredit top up yang masih berlaku tetap bisa dipakai.</p>
        <p>Draft dan Brain bisnis tetap milik Anda. Unduh yang Anda perlukan sebelum akun ditutup, atau minta penghapusan data lewat halaman Penghapusan Data.</p>
      </>
    ),
  },
  {
    id: "job-gagal",
    title: "Kredit dari job yang gagal",
    body: (
      <p>
        Terpisah dari garansi: pekerjaan agen yang gagal karena sistem atau penyedia AI selalu mengembalikan kreditnya otomatis, tanpa perlu diminta. Lihat juga{" "}
        <a href="/syarat-layanan#kredit" className={link}>
          Syarat Layanan
        </a>{" "}
        dan{" "}
        <a href="/penggunaan-wajar" className={link}>
          Penggunaan Wajar
        </a>
        .
      </p>
    ),
  },
];

export default function RefundPage() {
  return (
    <LegalLayout
      path="/kebijakan-refund"
      title="Kebijakan Refund"
      intro={`Coba paket berbayar tanpa risiko: pembayaran paket pertama kembali penuh bila Anda memintanya dalam ${REFUND_DAYS} hari.`}
      sections={sections}
    />
  );
}
