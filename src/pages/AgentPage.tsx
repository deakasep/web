import { ArrowRight, Check, Coins, FileText, ShieldAlert, Sparkles, UserCheck } from "lucide-react";
import { motion } from "motion/react";
import { PageHero } from "@/components/page/PageHero";
import { CTA } from "@/components/sections/CTA";
import { AgentVisual } from "@/components/ui/agent-visual";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CATEGORIES, details } from "@/data/agent-details";
import { agents, agentUrl, avatar, type Agent } from "@/data/agents";
import { BRAND } from "@/data/pages";
import { MONTHLY_CREDITS } from "@/data/pricing";
import { SIGNUP_URL } from "@/data/site";
import { usePageMeta } from "@/lib/meta";
import NotFound from "@/pages/NotFound";

const steps = [
  { icon: FileText, title: "Anda minta", body: "Lewat chat di dashboard atau jadwal mingguan. Kredit tampil sebelum agen bekerja." },
  { icon: Sparkles, title: "Agen menyiapkan draft", body: "Memakai Brain bisnis Anda; setiap klaim dicocokkan ke fakta yang sudah Anda konfirmasi." },
  { icon: UserCheck, title: "Anda setujui", body: "Setujui, minta revisi, atau tolak. Tidak ada yang tayang sebelum Anda klik Setujui." },
];

export default function AgentPage({ slug }: { slug: string }) {
  const index = agents.findIndex((a) => a.name.toLowerCase() === slug.toLowerCase());
  const a = agents[index] as Agent | undefined;
  const d = a ? details[a.id] : undefined;
  const title = a ? `${a.name}, ${a.role} · ${BRAND}` : `Agen tidak ditemukan · ${BRAND}`;
  usePageMeta(title, d ? `${d.headline} ${a!.blurb}` : "Agen yang Anda cari tidak ada.", a ? agentUrl(a) : "/agen");
  if (!a || !d) return <NotFound />;

  const category = CATEGORIES.find((c) => c.id === d.category)?.label ?? "";
  const others = agents.filter((x) => x.id !== a.id && details[x.id]?.category === d.category).slice(0, 4);
  const more = others.length ? others : agents.filter((x) => x.id !== a.id).slice(0, 4);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Beranda", href: "/" }, { label: "Agen AI", href: "/agen" }, { label: a.name }]}
        eyebrow={`${category} · ${a.active ? "Aktif" : "Segera hadir"}`}
        title={
          <>
            {a.name}, <span className="text-gradient">{a.role}</span>
          </>
        }
        subtitle={
          <>
            <span className="text-white">{d.headline}</span> Bekerja seperti {d.like.charAt(0).toLowerCase() + d.like.slice(1)}
          </>
        }
        actions={
          a.active ? (
            <>
              <Button href={SIGNUP_URL}>
                Rekrut {a.name} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="#contoh" variant="ghost">Lihat contoh hasil</Button>
            </>
          ) : (
            <>
              <Button href={SIGNUP_URL}>
                Daftar, {a.name} menyusul otomatis <ArrowRight className="size-4" />
              </Button>
              <Button href="/agen?status=aktif" variant="ghost">Lihat agen yang sudah aktif</Button>
            </>
          )
        }
        aside={
          <motion.div whileHover="hover" className="group mx-auto w-full max-w-md">
            <AgentVisual a={a} i={index} className="aspect-[4/5]" figureHeight="84%" />
          </motion.div>
        }
      />

      <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-8 lg:grid-cols-2">
        <Reveal className="rounded-3xl p-7 glass sm:p-9">
          <h2 className="font-display text-2xl font-bold text-white">Yang dikerjakan {a.name}</h2>
          <ul className="mt-6 flex flex-col gap-3.5">
            {d.tasks.map((t) => (
              <li key={t} className="flex gap-3 text-slate-300">
                <Check className="mt-1 size-4 shrink-0 text-teal-300" /> {t}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="rounded-3xl p-7 glass sm:p-9">
          <h2 className="font-display text-2xl font-bold text-white">Yang Anda terima</h2>
          <ul className="mt-6 flex flex-col gap-3.5">
            {d.outputs.map((t) => (
              <li key={t} className="flex gap-3 text-slate-300">
                <FileText className="mt-1 size-4 shrink-0 text-teal-300" /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-2">
            {d.channels.map((c) => (
              <span key={c} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{c}</span>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="contoh" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16">
        <Reveal className="grid gap-8 rounded-[2rem] border border-teal-300/20 bg-gradient-to-br from-teal-600/15 via-ink-2 to-ink p-7 sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold text-amber-200">Contoh SIMULASI · usaha fiktif</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white">Seperti ini hasil kerja {a.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Contoh ditulis untuk usaha fiktif. Untuk bisnis Anda, {a.name} memakai fakta dari Brain bisnis yang sudah Anda konfirmasi.
            </p>
          </div>
          <figure className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <figcaption className="flex items-center gap-3 text-sm">
              <img src={avatar(a.id)} alt="" className="size-9 rounded-lg bg-mint object-cover" />
              <span>
                <span className="block font-semibold text-white">{d.example.title}</span>
                <span className="block text-xs text-slate-500">Draft · menunggu persetujuan</span>
              </span>
            </figcaption>
            <pre className="mt-5 font-sans text-sm leading-relaxed whitespace-pre-wrap text-slate-200">{d.example.text}</pre>
          </figure>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-8 lg:grid-cols-[1.3fr_1fr]">
        <Reveal className="rounded-3xl p-7 glass sm:p-9">
          <div className="flex items-center gap-2 text-amber-200">
            <ShieldAlert className="size-5" />
            <h2 className="font-display text-2xl font-bold text-white">Batas yang selalu dijaga</h2>
          </div>
          <ul className="mt-6 flex flex-col gap-3.5">
            {d.limits.map((t) => (
              <li key={t} className="flex gap-3 text-slate-300">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-300" /> {t}
              </li>
            ))}
            <li className="flex gap-3 text-slate-300">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-300" /> Tidak mengaku manusia dan tidak memposting tanpa persetujuan Anda
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="flex flex-col rounded-3xl p-7 glass sm:p-9">
          <div className="flex items-center gap-2 text-teal-300">
            <Coins className="size-5" />
            <h2 className="font-display text-2xl font-bold text-white">Tarif kredit</h2>
          </div>
          {d.credits.length ? (
            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {d.credits.map((c) => (
                <li key={c.job} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                  <span className="text-sm text-slate-200">{c.job}</span>
                  <span className="font-display text-lg font-bold text-teal-300">{c.credits}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 flex-1 text-sm text-slate-400">Tarif diumumkan saat {a.name} dibuka.</p>
          )}
          <p className="mt-5 text-xs leading-relaxed text-slate-500">
            Paket berisi {MONTHLY_CREDITS} kredit per bulan. Chat dengan agen 2 kredit per pesan. Job yang gagal karena sistem mengembalikan kredit otomatis.
          </p>
          <a href="/harga#tarif" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300 hover:text-teal-200">
            Semua tarif <ArrowRight className="size-4" />
          </a>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white">Cara kerja dengan {a.name}</h2>
        </Reveal>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="rounded-3xl p-7 glass">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-teal-400/15 text-teal-300">
                <s.icon className="size-5" />
              </span>
              <p className="mt-5 text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Langkah {i + 1}</p>
              <h3 className="mt-1 font-display text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <Reveal className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-white">Rekan satu tim</h2>
          <a href="/agen" className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300 hover:text-teal-200">
            Semua agen <ArrowRight className="size-4" />
          </a>
        </Reveal>
        <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {more.map((x) => (
            <li key={x.id}>
              <a href={agentUrl(x)} className="flex items-center gap-3 rounded-2xl p-4 transition-colors glass hover:border-white/20">
                <img src={avatar(x.id)} alt="" className="size-12 rounded-xl bg-mint object-cover" loading="lazy" />
                <span className="min-w-0">
                  <span className="block font-semibold text-white">{x.name}</span>
                  <span className="block truncate text-xs text-slate-400">{x.role}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <CTA />
    </>
  );
}
