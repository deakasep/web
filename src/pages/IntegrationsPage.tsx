import { ArrowRight, Camera, CreditCard, FileSpreadsheet, FolderOpen, Globe, KeyRound, MapPin, MessageCircle, Music2, Share2, ShieldCheck, Unplug } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { CTA } from "@/components/sections/CTA";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { pages } from "@/data/pages";
import { SIGNUP_URL } from "@/data/site";
import { usePageMeta } from "@/lib/meta";
import { cn } from "@/lib/utils";

const meta = pages.find((p) => p.path === "/integrasi")!;

type Status = "aktif" | "segera" | "rencana";
const STATUS: Record<Status, { label: string; cls: string }> = {
  aktif: { label: "Aktif", cls: "bg-emerald-400/90 text-emerald-950" },
  segera: { label: "Segera hadir", cls: "bg-teal-400/15 text-teal-200" },
  rencana: { label: "Direncanakan", cls: "bg-white/10 text-slate-300" },
};

// Status jujur sesuai clau-core shared/integrations.md. Nama produk ditulis sebagai teks, tanpa logo merek.
const groups: { title: string; desc: string; items: { icon: typeof Camera; name: string; body: string; status: Status }[] }[] = [
  {
    title: "Kanal media sosial",
    desc: "Konten yang Anda setujui diposting lewat API resmi tiap platform.",
    items: [
      { icon: Camera, name: "Instagram", body: "Feed, carousel, Reels, dan Stories dari akun profesional Anda.", status: "segera" },
      { icon: Share2, name: "Facebook Page", body: "Posting ke Page bisnis yang terhubung dengan Instagram Anda.", status: "segera" },
      { icon: Music2, name: "TikTok", body: "Unggah video dengan pilihan privasi yang Anda tentukan sendiri.", status: "segera" },
      { icon: MapPin, name: "Google Business Profile", body: "Post terbaru dan draft balasan ulasan Google.", status: "segera" },
    ],
  },
  {
    title: "Pembayaran",
    desc: "Bayar paket dan top up kredit lewat payment gateway resmi.",
    items: [
      { icon: CreditCard, name: "QRIS", body: "Scan dari aplikasi bank atau e-wallet mana pun.", status: "segera" },
      { icon: CreditCard, name: "Virtual account bank", body: "Transfer dari bank yang tersedia di halaman pembayaran.", status: "segera" },
      { icon: CreditCard, name: "E-wallet", body: "Pembayaran dari dompet digital populer di Indonesia.", status: "segera" },
    ],
  },
  {
    title: "Data & produktivitas",
    desc: "Untuk agen data, laporan, dan integrasi.",
    items: [
      { icon: FileSpreadsheet, name: "Google Sheets & Excel", body: "Unggah file penjualan atau stok untuk dianalisis dan dilabeli.", status: "rencana" },
      { icon: FolderOpen, name: "Google Drive", body: "Ambil foto dan aset asli dari folder yang Anda izinkan.", status: "rencana" },
      { icon: MessageCircle, name: "WhatsApp Business", body: "Draft balasan inquiry dan pesan pelanggan dari template Anda.", status: "rencana" },
      { icon: Globe, name: "Marketplace & OTA", body: "Teks listing siap tempel untuk toko online dan situs pemesanan.", status: "aktif" },
    ],
  },
];

const safety = [
  { icon: KeyRound, title: "Tanpa password", body: "Kanal terhubung lewat login resmi platform (OAuth). Password Anda tidak pernah kami minta atau simpan." },
  { icon: ShieldCheck, title: "Token terenkripsi", body: "Izin akses disimpan terenkripsi, tidak pernah dikirim ke model AI atau ditampilkan di layar." },
  { icon: Unplug, title: "Putus kapan saja", body: "Lepas sambungan dari dashboard atau dari pengaturan platform. Izin langsung dicabut." },
];

export default function IntegrationsPage() {
  usePageMeta(meta.title, meta.description, meta.path);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Beranda", href: "/" }, { label: "Integrasi" }]}
        eyebrow="Integrasi"
        title={
          <>
            Terhubung ke alat <span className="text-gradient">yang sudah Anda pakai</span>
          </>
        }
        subtitle="Agen menyiapkan konten untuk kanal yang dipakai pelanggan Anda. Begitu kanal terhubung, konten yang Anda setujui tayang sesuai jadwal, tanpa berbagi password."
        actions={
          <Button href={SIGNUP_URL}>
            Mulai sekarang <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        }
      />

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <Reveal className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-sm leading-relaxed text-slate-400 sm:p-7">
          <span className="font-semibold text-white">Status integrasi.</span> Posting otomatis ke kanal sosial dibuka bertahap setelah persetujuan aplikasi dari
          tiap platform. Sambil menunggu, setiap draft yang Anda setujui bisa disalin dan diposting langsung dari dashboard.
        </Reveal>
      </section>

      {groups.map((g) => (
        <section key={g.title} className="py-12">
          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{g.title}</h2>
              <p className="mt-2 text-slate-400">{g.desc}</p>
            </Reveal>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {g.items.map((it, i) => (
                <Reveal key={it.name} delay={i * 0.05} className="flex flex-col rounded-3xl p-6 glass">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-slate-100">
                      <it.icon className="size-5" />
                    </span>
                    <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", STATUS[it.status].cls)}>{STATUS[it.status].label}</span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-white">{it.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{it.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="Keamanan" title="Akses seperlunya, bisa dicabut kapan saja" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {safety.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07} className="rounded-3xl p-7 glass">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-teal-400/15 text-teal-300">
                  <s.icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
