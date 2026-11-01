import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { PageHero } from "@/components/page/PageHero";
import { CTA } from "@/components/sections/CTA";
import { AgentVisual } from "@/components/ui/agent-visual";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CATEGORIES, details, type Category } from "@/data/agent-details";
import { capabilities } from "@/data/capabilities";
import { agents, agentUrl } from "@/data/agents";
import { pages } from "@/data/pages";
import { SIGNUP_URL } from "@/data/site";
import { usePageMeta } from "@/lib/meta";
import { cn } from "@/lib/utils";

const meta = pages.find((p) => p.path === "/agen")!;
type Filter = "semua" | Category;
type Status = "semua" | "aktif" | "segera";

export default function AgentsPage() {
  usePageMeta(meta.title, meta.description, meta.path);
  const [cat, setCat] = useState<Filter>("semua");
  const [status, setStatus] = useState<Status>(() => {
    const s = new URLSearchParams(window.location.search).get("status");
    return s === "aktif" || s === "segera" ? s : "semua";
  });
  const shown = agents.filter(
    (a) => (cat === "semua" || details[a.id]?.category === cat) && (status === "semua" || (status === "aktif" ? a.active : !a.active)),
  );
  const activeCount = agents.filter((a) => a.active).length;

  const pill = (on: boolean) =>
    cn("min-h-10 rounded-full px-4 text-sm font-semibold transition-colors", on ? "bg-teal-400 text-slate-950" : "border border-white/10 bg-white/5 text-slate-300 hover:text-white");

  return (
    <>
      <PageHero
        crumbs={[{ label: "Beranda", href: "/" }, { label: "Agen AI" }]}
        eyebrow={`${agents.length} agen · ${activeCount} aktif`}
        title={
          <>
            Satu tim AI, <span className="text-gradient">masing-masing spesialis</span>
          </>
        }
        subtitle="Setiap agen punya satu keahlian, persona, dan batas yang jelas. Semua membaca Brain bisnis yang sama, dan semua hasilnya menunggu persetujuan Anda."
        actions={
          <>
            <Button href={SIGNUP_URL}>
              Mulai sekarang <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href="/harga" variant="ghost">Lihat harga</Button>
          </>
        }
      />

      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter kategori" className="flex flex-wrap gap-2">
            <button type="button" aria-pressed={cat === "semua"} onClick={() => setCat("semua")} className={pill(cat === "semua")}>Semua</button>
            {CATEGORIES.map((c) => (
              <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => setCat(c.id)} className={pill(cat === c.id)}>
                {c.label}
              </button>
            ))}
          </div>
          <div role="group" aria-label="Filter status" className="flex flex-wrap gap-2">
            {(["semua", "aktif", "segera"] as const).map((s) => (
              <button key={s} type="button" aria-pressed={status === s} onClick={() => setStatus(s)} className={pill(status === s)}>
                {s === "semua" ? "Semua status" : s === "aktif" ? "Aktif" : "Segera hadir"}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-slate-500" aria-live="polite">{shown.length} agen ditampilkan</p>

        <motion.ul layout className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((a, i) => (
              <motion.li
                key={a.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover="hover"
                className="group"
              >
                <a href={agentUrl(a)} className="block rounded-[28px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300">
                  <AgentVisual a={a} i={i} className="aspect-[4/5]" />
                  <div className="px-1 pt-5">
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-500 uppercase">
                      {CATEGORIES.find((c) => c.id === details[a.id]?.category)?.label}
                    </p>
                    <h2 className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-white">
                      {a.name} <span className="font-semibold text-slate-400">· {a.role}</span>
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{a.blurb}</p>
                    {capabilities[a.id] && (
                      <ul aria-label={`Yang bisa ${a.name} lakukan`} className="mt-3 flex flex-wrap gap-1.5">
                        {capabilities[a.id].abilities.map((x) => (
                          <li key={x} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">{x}</li>
                        ))}
                      </ul>
                    )}
                    <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal-300">
                      Lihat detail <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </p>
                  </div>
                </a>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <Reveal className="mt-16 rounded-3xl p-6 text-sm text-slate-400 glass sm:p-8">
          <p className="font-display text-base font-bold text-white">Agen &quot;Segera hadir&quot;</p>
          <p className="mt-2 max-w-3xl leading-relaxed">
            Persona, batas, dan tarif kreditnya sudah ditetapkan, tetapi agen baru dibuka setelah lolos uji kualitas. Begitu aktif, agen otomatis
            masuk ke paket Anda tanpa biaya tambahan; pemakaiannya memakai kredit. Avatar adalah karakter AI fiktif, bukan foto staf.
          </p>
        </Reveal>
      </section>
      <CTA />
    </>
  );
}
