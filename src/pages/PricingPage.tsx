import { Check, Minus } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";
import { Pricing } from "@/components/sections/Pricing";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { pages } from "@/data/pages";
import { MONTHLY_CREDITS } from "@/data/pricing";
import { usePageMeta } from "@/lib/meta";

const meta = pages.find((p) => p.path === "/harga")!;

// Perbandingan kualitatif yang jujur (tanpa angka karangan, tanpa menyebut kompetitor).
const rows: { label: string; manual: string | boolean; clau: string | boolean }[] = [
  { label: "Kalender konten bulanan", manual: "Disusun sendiri tiap bulan", clau: "Disiapkan Dimas, Anda tinggal setujui" },
  { label: "Caption, Stories, naskah Reels", manual: "Ditulis satu per satu", clau: "Draft dari Tara, Sekar, Raka" },
  { label: "Cek fakta harga & fasilitas", manual: "Mengandalkan ingatan", clau: "Dicocokkan ke Brain bisnis" },
  { label: "Balasan review & komentar", manual: "Sering tertunda", clau: "Draft siap, yang negatif diteruskan ke Anda" },
  { label: "Konten dua bahasa", manual: "Perlu penerjemah", clau: "Nara menyelaraskan ID ⇄ EN" },
  { label: "Biaya bisa diprediksi", manual: false, clau: `Paket tetap + ${MONTHLY_CREDITS} kredit/bulan` },
  { label: "Keputusan akhir di tangan Anda", manual: true, clau: true },
];

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <Check className="mx-auto size-5 text-teal-300" aria-label="Ya" />;
  if (v === false) return <Minus className="mx-auto size-5 text-slate-600" aria-label="Tidak" />;
  return <span>{v}</span>;
}

export default function PricingPage() {
  usePageMeta(meta.title, meta.description, meta.path);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Beranda", href: "/" }, { label: "Harga" }]}
        eyebrow="Harga"
        title={
          <>
            Harga sederhana, <span className="text-gradient">kredit transparan</span>
          </>
        }
        subtitle="Satu paket berisi semua agen dan 500 kredit setiap bulan. Setiap pekerjaan menampilkan jumlah kreditnya sebelum dijalankan. Tanpa biaya tersembunyi, tanpa perpanjangan otomatis."
      />
      <Pricing heading={false} />

      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="Perbandingan" title="Kerja manual vs dengan tim AI CLAU" subtitle="Bukan menggantikan Anda: agen menyiapkan, Anda memutuskan." />
          <Reveal className="mt-12 overflow-x-auto rounded-3xl glass">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th scope="col" className="px-6 py-4 font-semibold">Pekerjaan</th>
                  <th scope="col" className="px-6 py-4 text-center font-semibold">Dikerjakan manual</th>
                  <th scope="col" className="px-6 py-4 text-center font-semibold text-teal-300">Dengan CLAU AI</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-b border-white/5 last:border-0">
                    <th scope="row" className="px-6 py-4 font-medium text-slate-200">{r.label}</th>
                    <td className="px-6 py-4 text-center text-slate-400"><Cell v={r.manual} /></td>
                    <td className="px-6 py-4 text-center text-slate-200"><Cell v={r.clau} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <FAQ />
      <CTA />
    </>
  );
}
