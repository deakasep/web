import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { agents, agentUrl, avatar } from "@/data/agents";
import { MONTHLY_CREDITS } from "@/data/pricing";

// Contoh alur kerja gabungan beberapa agen. Kredit = jumlah tarif di clau-market/commercial/pricing.md.
const flows = [
  {
    title: "Konten seminggu untuk kafe",
    who: ["Dimas", "Tara", "Sekar"],
    steps: ["Dimas menyusun kalender 30 hari", "Tara menulis 7 caption minggu ini", "Sekar menyiapkan 3 set Stories", "Anda klik Setujui, konten terjadwal"],
    credits: 18 + 7 * 8 + 3 * 8,
  },
  {
    title: "Balas review & komentar",
    who: ["Laras", "Nara"],
    steps: ["Laras menyiapkan 20 draft balasan", "Nara membuat versi Inggris untuk 5 review tamu asing", "Review rating ≤ 3 langsung diteruskan ke Anda", "Anda kirim balasan yang sudah disetujui"],
    credits: 20 * 3 + 5 * 5,
  },
  {
    title: "Kampanye Harbolnas toko online",
    who: ["Ayu", "Bayu", "Raka"],
    steps: ["Ayu merencanakan kampanye dan syarat promo", "Bayu memperbarui 4 deskripsi produk", "Raka menulis 2 naskah Reels", "Anda putuskan diskon final, lalu Setujui"],
    credits: 18 + 4 * 10 + 2 * 13,
  },
];

const byName = (n: string) => agents.find((a) => a.name === n)!;

export function UseCases() {
  return (
    <section id="contoh" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Contoh kerja"
          title={
            <>
              Agen bekerja <span className="text-gradient">sebagai tim</span>
            </>
          }
          subtitle="Satu permintaan bisa melibatkan beberapa agen. Kredit tiap langkah dihitung dari tarif resmi dan tampil sebelum dijalankan."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {flows.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08} className="flex flex-col rounded-3xl p-7 glass">
              <div className="flex -space-x-2">
                {f.who.map((n) => {
                  const a = byName(n);
                  return (
                    <motion.a key={n} href={agentUrl(a)} whileHover={{ y: -4, zIndex: 10 }} className="relative" title={`${a.name}, ${a.role}`}>
                      <img src={avatar(a.id)} alt={`${a.name}, ${a.role}`} className="size-11 rounded-full border-2 border-ink bg-mint object-cover" loading="lazy" />
                    </motion.a>
                  );
                })}
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-white">{f.title}</h3>
              <ol className="mt-5 flex flex-1 flex-col gap-3">
                {f.steps.map((s) => (
                  <li key={s} className="flex gap-3 text-sm text-slate-300">
                    <Check className="mt-0.5 size-4 shrink-0 text-teal-300" /> {s}
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
                <span className="text-slate-400">Perkiraan kredit</span>
                <span className="font-semibold text-teal-300">
                  {f.credits} <span className="text-slate-500">/ {MONTHLY_CREDITS} per bulan</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 text-center">
          <a href="/harga#tarif" className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300 hover:text-teal-200">
            Lihat semua tarif kredit <ArrowRight className="size-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
