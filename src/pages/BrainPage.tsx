import { ArrowRight, BookOpen, Building2, CircleCheck, Image as ImageIcon, Lock, MessageSquareQuote, Package, ShieldCheck, Tag } from "lucide-react";
import { motion } from "motion/react";
import { PageHero } from "@/components/page/PageHero";
import { CTA } from "@/components/sections/CTA";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { agents, avatar } from "@/data/agents";
import { pages } from "@/data/pages";
import { SIGNUP_URL } from "@/data/site";
import { usePageMeta } from "@/lib/meta";

const meta = pages.find((p) => p.path === "/brain-ai")!;

const blocks = [
  { icon: Building2, title: "Profil usaha", body: "Nama, lokasi, jam buka, kanal resmi, dan siapa yang menyetujui konten." },
  { icon: Package, title: "Produk & layanan", body: "Menu, kamar, paket, atau katalog lengkap dengan harga dan syaratnya." },
  { icon: MessageSquareQuote, title: "Gaya bahasa (Voice Card)", body: "Sapaan, nada, emoji, dan kata yang tidak boleh dipakai." },
  { icon: Tag, title: "Aturan merek", body: "Warna, klaim yang boleh, promo yang sedang berjalan, dan hal sensitif." },
  { icon: ImageIcon, title: "Aset & izin", body: "Foto dan video asli, plus catatan izin orang yang terlihat di dalamnya." },
  { icon: BookOpen, title: "Riwayat", body: "Konten yang sudah disetujui jadi acuan gaya untuk draft berikutnya." },
];

const flow = [
  { n: "1", title: "Isi sekali", body: "Lengkapi Brain bisnis saat onboarding. Bisa bertahap; agen memberi tahu bagian mana yang masih kosong." },
  { n: "2", title: "Konfirmasi fakta", body: "Harga, fasilitas, jarak, dan syarat Anda tandai sebagai fakta final. Hanya fakta final yang boleh dipakai agen." },
  { n: "3", title: "Semua agen membaca", body: "Tara, Raka, Bayu, Laras, dan agen lain memakai Brain yang sama, jadi isi kontennya konsisten di semua kanal." },
  { n: "4", title: "Cek otomatis", body: "Setiap klaim di draft dicocokkan ke fakta Anda. Yang belum ada ditulis sebagai <KONFIRMASI: …>, bukan dikarang." },
];

export default function BrainPage() {
  usePageMeta(meta.title, meta.description, meta.path);
  const crew = agents.filter((a) => a.active).slice(0, 8);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Beranda", href: "/" }, { label: "Brain AI" }]}
        eyebrow="Brain AI"
        title={
          <>
            Satu memori bisnis, <span className="text-gradient">untuk semua agen</span>
          </>
        }
        subtitle="Ceritakan bisnis Anda sekali. Semua agen membaca Brain yang sama, dan setiap klaim di draft dicocokkan ke fakta yang sudah Anda konfirmasi."
        actions={
          <>
            <Button href={SIGNUP_URL}>
              Mulai isi Brain bisnis <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href="/agen" variant="ghost">Lihat agen</Button>
          </>
        }
        aside={
          <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
            <div className="absolute inset-[12%] rounded-full border border-teal-300/20" />
            <div className="absolute inset-[28%] rounded-full border border-teal-300/15" />
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex size-36 flex-col items-center justify-center rounded-full border border-teal-300/40 bg-gradient-to-b from-teal-500/30 to-teal-900/40 text-center shadow-[0_0_80px_-10px_rgba(45,212,191,0.6)]"
            >
              <ShieldCheck className="size-8 text-teal-200" />
              <span className="mt-2 font-display text-sm font-bold text-white">Brain bisnis</span>
              <span className="text-[11px] text-teal-200/80">fakta final</span>
            </motion.div>
            {crew.map((a, i) => {
              const angle = (i / crew.length) * Math.PI * 2 - Math.PI / 2;
              return (
                <motion.img
                  key={a.id}
                  src={avatar(a.id)}
                  alt={`${a.name}, ${a.role}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.07, type: "spring", stiffness: 220, damping: 18 }}
                  className="absolute size-14 rounded-2xl border-2 border-ink bg-mint object-cover shadow-lg"
                  style={{ left: `calc(50% + ${Math.cos(angle) * 40}% - 1.75rem)`, top: `calc(50% + ${Math.sin(angle) * 40}% - 1.75rem)` }}
                />
              );
            })}
          </div>
        }
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="Isi Brain" title="Apa yang disimpan" subtitle="Semua yang dibutuhkan agen untuk menulis seperti tim Anda sendiri, tanpa menebak." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {blocks.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 0.06} className="rounded-3xl p-7 glass">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-teal-400/15 text-teal-300">
                  <b.icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{b.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="Cara kerja" title="Dari fakta Anda ke draft yang bisa dipercaya" />
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {flow.map((f, i) => (
              <Reveal key={f.n} delay={i * 0.07} className="relative rounded-3xl p-7 glass">
                <span className="font-display text-5xl font-extrabold text-teal-300/30">{f.n}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 lg:grid-cols-2">
          <Reveal className="rounded-3xl p-7 glass sm:p-9">
            <div className="flex items-center gap-2 text-teal-300">
              <Lock className="size-5" />
              <h2 className="font-display text-2xl font-bold text-white">Data Anda tetap milik Anda</h2>
            </div>
            <ul className="mt-6 flex flex-col gap-3.5 text-slate-300">
              {[
                "Brain bisnis hanya dipakai untuk akun Anda dan tidak dicampur dengan klien lain",
                "Data pribadi pelanggan disamarkan sebelum dikirim ke model AI",
                "Password akun sosmed tidak pernah diminta; kanal terhubung lewat login resmi",
                "Anda bisa meminta salinan atau penghapusan data kapan saja",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-teal-300" /> {t}
                </li>
              ))}
            </ul>
            <a href="/kebijakan-privasi" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300 hover:text-teal-200">
              Baca kebijakan privasi <ArrowRight className="size-4" />
            </a>
          </Reveal>
          <Reveal delay={0.08} className="rounded-3xl border border-teal-300/20 bg-gradient-to-br from-teal-600/15 via-ink-2 to-ink p-7 sm:p-9">
            <span className="inline-flex rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold text-amber-200">Contoh SIMULASI</span>
            <h2 className="mt-4 font-display text-2xl font-bold text-white">Saat fakta belum dikonfirmasi</h2>
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-5 text-sm leading-relaxed text-slate-200">
              Kolam renang privat siap menemani pagi Anda, hanya{" "}
              <mark className="rounded bg-amber-400/20 px-1 text-amber-200">&lt;KONFIRMASI: jarak ke pantai&gt;</mark> dari pantai.
            </div>
            <p className="mt-4 text-sm text-slate-400">Agen menandai bagian yang belum Anda konfirmasi, bukan mengarang angka. Lengkapi faktanya di Brain bisnis, lalu draft diperbarui sebelum Anda setujui.</p>
          </Reveal>
        </div>
      </section>
      <CTA />
    </>
  );
}
