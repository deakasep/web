import { SITE } from "@/data/site";
import { Bullets, LegalLayout, Mail, type LegalSection } from "@/pages/legal/LegalLayout";

// Draf. Menjaga layanan adil untuk semua klien dan melindungi garansi & kredit percobaan dari penyalahgunaan.
// Sumber aturan: Syarat Layanan § Penggunaan yang dilarang, clau-market/commercial/pricing.md §2–§2b.
const link = "font-semibold text-teal-300 hover:text-teal-200";

const sections: LegalSection[] = [
  {
    id: "tujuan",
    title: "Tujuan",
    body: (
      <p>
        Kredit dan agen CLAU AI dirancang untuk kebutuhan konten dan operasional <b className="text-white">satu usaha</b>. Aturan ini menjaga layanan tetap cepat dan
        adil untuk semua klien. Hampir semua pengguna tidak akan pernah menyentuh batas ini.
      </p>
    ),
  },
  {
    id: "akun",
    title: "Akun & kredit",
    body: (
      <Bullets
        items={[
          "Satu akun untuk satu usaha. Tambahkan anggota tim lewat fitur undangan, bukan dengan berbagi kata sandi",
          "Kredit percobaan dan garansi uang kembali hanya sekali per usaha; membuat akun baru untuk mengulangnya tidak diperbolehkan",
          "Kredit tidak dapat dijual kembali, diuangkan, atau dipindahkan ke akun lain",
          "Agensi yang mengelola beberapa usaha memakai satu akun per usaha klien",
        ]}
      />
    ),
  },
  {
    id: "pemakaian",
    title: "Pemakaian yang wajar",
    body: (
      <>
        <Bullets
          items={[
            "Permintaan dikirim oleh orang atau otomasi yang Anda atur di dalam CLAU AI, bukan oleh skrip atau bot dari luar",
            "Tidak membanjiri agen dengan permintaan berulang yang sama untuk menguras kapasitas sistem",
            "Tidak mencoba membobol, menguji keamanan, atau melewati batas kredit tanpa izin tertulis",
            "Tidak menyalin, membongkar, atau mengekstrak instruksi, persona, dan logika agen untuk membuat produk pesaing",
          ]}
        />
        <p>
          Saat beban sistem tinggi, kami dapat memperlambat sementara pekerjaan dari satu akun supaya klien lain tetap terlayani. Kredit tidak terpotong untuk
          pekerjaan yang belum berjalan.
        </p>
      </>
    ),
  },
  {
    id: "konten",
    title: "Isi konten",
    body: (
      <p>
        Larangan isi konten (ulasan palsu, klaim menyesatkan, SARA, deepfake, dan lainnya) tercantum di{" "}
        <a href="/syarat-layanan#larangan" className={link}>
          Syarat Layanan
        </a>
        . Semua hasil agen tetap draft sampai Anda menyetujuinya.
      </p>
    ),
  },
  {
    id: "pelanggaran",
    title: "Bila terjadi pelanggaran",
    body: (
      <>
        <p>Kami menghubungi Anda lebih dulu, kecuali pelanggarannya berat atau membahayakan pihak lain. Langkah yang dapat kami ambil, sesuai tingkatnya:</p>
        <Bullets
          items={[
            "Peringatan tertulis",
            "Membatasi sementara fitur atau kecepatan pemakaian",
            "Menolak permintaan garansi atau mencabut kredit percobaan yang diperoleh dengan melanggar aturan ini",
            "Menutup akun untuk pelanggaran berat atau berulang",
          ]}
        />
        <p>
          Merasa keputusan kami keliru? Kirim email ke <Mail to={SITE.email} /> dan kami tinjau ulang.
        </p>
      </>
    ),
  },
];

export default function FairUsePage() {
  return (
    <LegalLayout
      path="/penggunaan-wajar"
      title="Penggunaan Wajar"
      intro="Batas pemakaian yang wajar untuk akun, kredit, agen AI, dan garansi, supaya layanan tetap adil untuk semua klien."
      sections={sections}
    />
  );
}
