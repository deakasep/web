import { SITE } from "@/data/site";
import { Bullets, LegalLayout, Mail, type LegalSection } from "@/pages/legal/LegalLayout";

// Draf. Wajib ditinjau konsultan hukum (clau-content docs/status.md: legal review) sebelum layanan berbayar dibuka.
// Sumber aturan: clau-core AI-BOUNDARY § Data ke Provider AI dan § Token Kanal & Pembayaran; UU No. 27 Tahun 2022 (PDP).
const sections: LegalSection[] = [
  {
    id: "siapa-kami",
    title: "Siapa kami",
    body: (
      <p>
        Layanan CLAU AI dikelola oleh {SITE.legalName}, beralamat di {SITE.address} (&quot;kami&quot;). Untuk data yang Anda berikan saat memakai layanan, kami
        bertindak sebagai pengendali data pribadi. Untuk data pelanggan bisnis Anda yang Anda masukkan ke platform, kami memproses data tersebut atas
        instruksi Anda. Pertanyaan soal privasi dapat dikirim ke <Mail to={SITE.privacyEmail} />.
      </p>
    ),
  },
  {
    id: "data",
    title: "Data yang kami kumpulkan",
    body: (
      <>
        <Bullets
          items={[
            <><b className="text-white">Data akun:</b> nama, email, nama usaha, peran, dan pengaturan login (password disimpan dalam bentuk hash, bukan teks asli).</>,
            <><b className="text-white">Brain bisnis:</b> profil usaha, produk, harga, gaya bahasa, aset, dan catatan izin yang Anda masukkan.</>,
            <><b className="text-white">Konten:</b> permintaan ke agen, draft, revisi, persetujuan, dan riwayat publikasi.</>,
            <><b className="text-white">Pemakaian & tagihan:</b> saldo dan riwayat kredit, paket aktif, ID transaksi, nominal, metode, dan status pembayaran.</>,
            <><b className="text-white">Kanal terhubung:</b> token akses resmi dari Instagram, Facebook, TikTok, atau Google yang Anda hubungkan, dan data publik akun bisnis yang diperlukan untuk memposting.</>,
            <><b className="text-white">Data teknis:</b> log keamanan seperti waktu login, alamat IP, dan jenis perangkat.</>,
          ]}
        />
        <p>
          Kami <b className="text-white">tidak</b> menyimpan nomor kartu, nomor rekening, PIN, atau OTP pembayaran. Data tersebut diproses langsung oleh payment
          gateway. Kami juga tidak pernah meminta password akun media sosial Anda.
        </p>
      </>
    ),
  },
  {
    id: "tujuan",
    title: "Untuk apa data dipakai",
    body: (
      <Bullets
        items={[
          "Menjalankan agen AI untuk usaha Anda dan menyimpan hasil kerjanya",
          "Mencocokkan klaim di draft dengan fakta yang Anda konfirmasi",
          "Memposting konten yang sudah Anda setujui ke kanal yang Anda pilih",
          "Memproses pembayaran, menghitung kredit, dan mengirim pemberitahuan saldo",
          "Menjaga keamanan akun, mencegah penyalahgunaan, dan memenuhi kewajiban hukum",
          "Menghubungi Anda soal layanan (bukan promosi pihak lain)",
        ]}
      />
    ),
  },
  {
    id: "ai",
    title: "Pemrosesan oleh model AI",
    body: (
      <>
        <p>
          Untuk membuat draft, kami mengirim instruksi agen, Brain bisnis Anda, dan permintaan kerja ke penyedia model AI. Sebelum dikirim, nama, kontak, dan
          nomor pesanan pelanggan Anda disamarkan. Data kategori khusus (kesehatan, identitas resmi, data pembayaran) dan password tidak pernah dikirim.
        </p>
        <p>
          Kami mencatat setiap panggilan ke model AI (model, jumlah token, biaya, waktu) tanpa menyimpan isi permintaan atau jawabannya di log. Penyedia model AI
          dapat memproses data di luar Indonesia dan menyimpannya sementara sesuai kebijakannya: [nama penyedia, wilayah pemrosesan, dan masa simpan diisi saat
          akun penyedia aktif]. Hasil AI selalu berupa draft yang menunggu persetujuan Anda.
        </p>
      </>
    ),
  },
  {
    id: "berbagi",
    title: "Dengan siapa data dibagikan",
    body: (
      <>
        <p>Kami tidak menjual data Anda. Data hanya dibagikan ke pihak yang membantu kami menjalankan layanan, sebatas yang diperlukan:</p>
        <Bullets
          items={[
            "Penyedia model AI (pembuatan draft, gambar, dan video)",
            "Payment gateway (pembayaran paket dan top up)",
            "Platform media sosial yang Anda hubungkan (posting konten yang Anda setujui)",
            "Penyedia server, penyimpanan cadangan terenkripsi, dan pengiriman email",
            "Instansi berwenang bila diwajibkan peraturan perundang-undangan",
          ]}
        />
        <p>Data satu klien tidak pernah dipakai atau ditampilkan untuk klien lain.</p>
      </>
    ),
  },
  {
    id: "simpan",
    title: "Berapa lama data disimpan",
    body: (
      <Bullets
        items={[
          "Data akun, Brain bisnis, dan konten: selama akun aktif, lalu dihapus sesuai permintaan atau setelah akun ditutup",
          "Catatan transaksi dan kredit: selama diwajibkan aturan perpajakan dan akuntansi",
          "Cadangan database terenkripsi: terhapus otomatis paling lambat 60 hari setelah dibuat",
          "Token kanal sosial: dihapus saat Anda memutus sambungan atau menutup akun",
        ]}
      />
    ),
  },
  {
    id: "hak",
    title: "Hak Anda",
    body: (
      <>
        <p>Sesuai Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi, Anda berhak antara lain untuk:</p>
        <Bullets
          items={[
            "Mendapat informasi tentang pemrosesan data Anda",
            "Mengakses dan memperoleh salinan data Anda",
            "Memperbaiki atau melengkapi data yang tidak akurat",
            "Meminta penghapusan data dan mengakhiri pemrosesan",
            "Menarik kembali persetujuan yang pernah diberikan",
            "Menunda atau membatasi pemrosesan, serta mengajukan keberatan",
          ]}
        />
        <p>
          Kirim permintaan ke <Mail to={SITE.privacyEmail} /> dari email akun Anda. Cara menghapus data dijelaskan di halaman{" "}
          <a href="/penghapusan-data" className="font-semibold text-teal-300 underline-offset-4 hover:underline">Penghapusan Data</a>.
        </p>
      </>
    ),
  },
  {
    id: "keamanan",
    title: "Keamanan",
    body: (
      <p>
        Kami memakai koneksi terenkripsi (HTTPS), password yang di-hash, verifikasi dua langkah untuk peran pengelola, pemisahan data antar klien, token kanal yang
        terenkripsi, dan cadangan terenkripsi. Bila terjadi kegagalan pelindungan data pribadi, kami memberi tahu Anda dan otoritas terkait sesuai batas waktu
        yang diatur peraturan perundang-undangan.
      </p>
    ),
  },
  {
    id: "cookie",
    title: "Cookie",
    body: (
      <p>
        Dashboard memakai cookie yang wajib untuk login dan keamanan (sesi dan perlindungan CSRF). Situs ini tidak memakai cookie iklan atau pelacak pihak ketiga.
        Huruf di situs dimuat dari Google Fonts, sehingga alamat IP Anda dapat terlihat oleh Google saat halaman dibuka.
      </p>
    ),
  },
  {
    id: "usia",
    title: "Pengguna",
    body: <p>Layanan ditujukan untuk pelaku usaha dan staf yang berusia 18 tahun ke atas, atau yang bertindak atas nama badan usaha.</p>,
  },
  {
    id: "perubahan",
    title: "Perubahan kebijakan",
    body: (
      <p>
        Bila kebijakan ini berubah secara material, kami memberi tahu lewat email atau dashboard sebelum perubahan berlaku. Tanggal berlaku terbaru tercantum di
        halaman ini.
      </p>
    ),
  },
  {
    id: "kontak",
    title: "Kontak",
    body: (
      <p>
        {SITE.legalName} · {SITE.address} · <Mail to={SITE.privacyEmail} />
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      path="/kebijakan-privasi"
      title="Kebijakan Privasi"
      intro="Ringkasnya: data Anda dipakai untuk menjalankan agen bagi usaha Anda, tidak dijual, tidak dicampur dengan klien lain, dan bisa Anda minta dihapus."
      sections={sections}
    />
  );
}
