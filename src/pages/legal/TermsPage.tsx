import { MONTHLY_CREDITS, plans, REFUND_DAYS, rupiah, topups } from "@/data/pricing";
import { SITE } from "@/data/site";
import { Bullets, LegalLayout, Mail, type LegalSection } from "@/pages/legal/LegalLayout";

// Draf. Sumber aturan: clau-core AI-CONSTITUTION v4.0.0 §4.7, §4b, §13 dan clau-market/commercial/pricing.md.
const sections: LegalSection[] = [
  {
    id: "layanan",
    title: "Layanan",
    body: (
      <p>
        CLAU AI adalah platform berlangganan berisi agen AI yang menyiapkan konten, balasan, rencana, laporan, dan pekerjaan lain untuk usaha Anda. Layanan
        dikelola oleh {SITE.legalName}. Dengan membuat akun, Anda menyetujui syarat ini atas nama diri sendiri atau badan usaha yang Anda wakili.
      </p>
    ),
  },
  {
    id: "akun",
    title: "Akun",
    body: (
      <Bullets
        items={[
          "Data pendaftaran harus benar dan diperbarui bila berubah",
          "Anda bertanggung jawab menjaga kerahasiaan login dan aktivitas di akun Anda",
          "Anda dapat menunjuk approver lain; persetujuan mereka dianggap persetujuan usaha Anda",
          "Kami dapat menangguhkan akun yang melanggar syarat ini atau membahayakan keamanan sistem",
        ]}
      />
    ),
  },
  {
    id: "paket",
    title: "Paket & pembayaran",
    body: (
      <>
        <Bullets
          items={[
            `Paket tersedia untuk ${plans.map((p) => `${p.label} (${rupiah(p.price)})`).join(", ")}; harga dapat berubah, tetapi tidak untuk periode yang sudah dibayar`,
            "Paket dibayar di muka lewat payment gateway resmi dan aktif setelah pembayaran terkonfirmasi",
            "Paket tidak diperpanjang otomatis; perpanjangan selalu memerlukan pembayaran baru dari Anda",
            "Harga yang tercantum [sudah/belum] termasuk PPN sesuai status perpajakan pengelola",
          ]}
        />
        <p>
          <b className="text-white">Pengembalian dana:</b> pembayaran paket berlangganan pertama dapat dikembalikan penuh bila diminta dalam {REFUND_DAYS} hari sejak
          pembayaran; top up kredit dan kredit percobaan tidak dapat dikembalikan. Rincian di{" "}
          <a href="/kebijakan-refund" className="font-semibold text-teal-300 hover:text-teal-200">
            Kebijakan Refund
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "kredit",
    title: "Kredit",
    body: (
      <Bullets
        items={[
          `Setiap paket memberi ${MONTHLY_CREDITS} kredit per periode bulanan; sisa kredit bulanan tidak menumpuk ke periode berikutnya`,
          `Top up tersedia: ${topups.map((t) => `${t.credits.toLocaleString("id-ID")} kredit (${rupiah(t.price)})`).join(", ")}; kredit top up berlaku 12 bulan`,
          "Jumlah kredit setiap pekerjaan ditampilkan sebelum agen bekerja; tarif berlaku tercantum di halaman Harga",
          "Bila kredit tidak cukup, agen tidak berjalan; tidak ada saldo minus dan tidak ada tagihan tambahan",
          "Pekerjaan yang gagal karena sistem atau penyedia AI mengembalikan kreditnya otomatis",
          "Kredit tidak dapat diuangkan atau dipindahkan ke akun lain",
        ]}
      />
    ),
  },
  {
    id: "persetujuan",
    title: "Persetujuan & publikasi konten",
    body: (
      <>
        <p>
          Hasil agen adalah <b className="text-white">draft</b>. Konten hanya diposting ke kanal Anda setelah Anda atau approver yang Anda tunjuk menekan
          Setujui untuk versi tersebut. Dengan menyetujui, Anda menyatakan sudah memeriksa isinya dan bertanggung jawab atas publikasinya.
        </p>
        <p>
          AI dapat keliru. Periksa harga, syarat, tanggal, dan klaim sebelum menyetujui. Agen hanya memakai fakta yang Anda konfirmasi di Brain bisnis dan menandai
          fakta yang belum ada.
        </p>
      </>
    ),
  },
  {
    id: "milik",
    title: "Kepemilikan",
    body: (
      <Bullets
        items={[
          "Brain bisnis, aset, dan konten yang dihasilkan untuk usaha Anda adalah milik Anda",
          "Anda menjamin berhak memakai foto, video, logo, dan data yang Anda unggah, termasuk izin orang yang terlihat",
          "Platform, agen, persona, dan perangkat lunak CLAU AI tetap milik pengelola",
        ]}
      />
    ),
  },
  {
    id: "larangan",
    title: "Penggunaan yang dilarang",
    body: (
      <>
        <p>Anda tidak boleh memakai layanan untuk:</p>
        <Bullets
          items={[
            "Membuat ulasan, testimoni, rating, atau akun palsu",
            "Klaim yang menyesatkan, termasuk klaim medis atau kesehatan tanpa dasar",
            "Menyerang atau menjelekkan pesaing, atau konten SARA dan ujaran kebencian",
            "Memakai wajah, suara, atau data orang tanpa izin, termasuk deepfake",
            "Menyamarkan konten berbayar atau iklan",
            "Melanggar hukum Indonesia, hak kekayaan intelektual, atau aturan platform media sosial",
          ]}
        />
        <p>Agen menolak atau meneruskan ke Anda permintaan yang melanggar aturan ini.</p>
        <p>
          Batas pemakaian akun, kredit, dan garansi diatur di{" "}
          <a href="/penggunaan-wajar" className="font-semibold text-teal-300 hover:text-teal-200">
            Penggunaan Wajar
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "tanggung-jawab",
    title: "Batas tanggung jawab",
    body: (
      <p>
        Kami berupaya menjaga layanan tetap tersedia dan akurat, tetapi tidak menjamin hasil tertentu seperti jumlah pengikut, jangkauan, penjualan, atau
        pemesanan. Sejauh diizinkan hukum, tanggung jawab kami atas suatu klaim dibatasi pada jumlah yang Anda bayar untuk layanan dalam tiga bulan terakhir.
        [Batas ini ditinjau konsultan hukum.]
      </p>
    ),
  },
  {
    id: "berhenti",
    title: "Berhenti & penutupan akun",
    body: (
      <p>
        Anda dapat berhenti kapan saja dengan tidak memperpanjang paket, dan dapat meminta penutupan akun serta penghapusan data lewat halaman{" "}
        <a href="/penghapusan-data" className="font-semibold text-teal-300 underline-offset-4 hover:underline">Penghapusan Data</a>. Kami dapat mengakhiri
        layanan untuk akun yang melanggar syarat ini dengan pemberitahuan.
      </p>
    ),
  },
  {
    id: "hukum",
    title: "Hukum yang berlaku & perubahan",
    body: (
      <p>
        Syarat ini tunduk pada hukum Republik Indonesia. Sengketa diupayakan selesai secara musyawarah terlebih dahulu. Perubahan material diberitahukan lewat
        email atau dashboard sebelum berlaku. Pertanyaan: <Mail to={SITE.email} />.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      path="/syarat-layanan"
      title="Syarat Layanan"
      intro="Aturan main berlangganan CLAU AI: paket dibayar di muka, kredit transparan, dan tidak ada konten yang tayang tanpa persetujuan Anda."
      sections={sections}
    />
  );
}
