import { ArrowRight, Check, Coins, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { MONTHLY_CREDITS, creditCosts, included, plans, rupiah, topups, type Plan } from "@/data/pricing";
import { CONTACT_URL, SIGNUP_URL } from "@/data/site";
import { cn } from "@/lib/utils";

// Model langganan (clau-core AI-CONSTITUTION v4.0.0 §4b). Angka dari src/data/pricing.ts.
export function Pricing() {
  const [picked, setPicked] = useState<Plan["id"]>("12");
  const plan = plans.find((p) => p.id === picked)!;

  return (
    <section id="paket" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="absolute right-0 bottom-0 -z-10 size-[520px] rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Paket"
          title={
            <>
              Satu paket, <span className="text-gradient">semua agent</span>
            </>
          }
          subtitle="Pilih durasi, bayar sekali, dan seluruh tim AI langsung bekerja. Makin panjang langganan, makin hemat."
        />

        <Reveal className="mt-12 flex justify-center">
          <div role="group" aria-label="Pilih durasi langganan" className="inline-flex flex-wrap justify-center gap-1 rounded-full p-1.5 glass">
            {plans.map((p) => {
              const on = p.id === picked;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setPicked(p.id)}
                  className={cn(
                    "relative min-h-11 rounded-full px-4 text-sm font-semibold transition-colors sm:px-5",
                    on ? "text-slate-950" : "text-slate-300 hover:text-white",
                  )}
                >
                  {on && <motion.span layoutId="plan-pill" className="absolute inset-0 rounded-full bg-teal-400" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                  <span className="relative">
                    {p.label}
                    {p.save > 0 && <span className={cn("ml-1.5 text-xs", on ? "text-slate-900/80" : "text-teal-300")}>-{p.save}%</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-5 lg:items-stretch">
          <Reveal className="relative flex flex-col rounded-3xl border border-teal-300/40 bg-gradient-to-b from-teal-500/[0.16] via-teal-500/[0.05] to-transparent p-7 shadow-[0_30px_80px_-30px_rgba(45,212,191,0.55)] backdrop-blur-xl sm:p-9 lg:col-span-3">
            <span className="absolute -top-3 left-8 flex items-center gap-1 rounded-full bg-teal-400 px-3 py-1 text-xs font-bold text-slate-950">
              <Sparkles className="size-3" /> Semua agent termasuk
            </span>
            <p className="text-sm font-semibold text-teal-300">Paket {plan.label}</p>
            <motion.p key={plan.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
              {rupiah(plan.price)}
            </motion.p>
            <p className="mt-2 text-sm text-slate-300">
              {plan.months === 1 ? "per bulan" : `sekali bayar · setara ${rupiah(Math.round(plan.price / plan.months / 100) * 100)}/bulan`} · {MONTHLY_CREDITS} kredit setiap bulan
            </p>
            <ul className="mt-7 grid flex-1 gap-3 sm:grid-cols-2">
              {included.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-slate-300">
                  <Check className="mt-0.5 size-4 shrink-0 text-teal-300" /> {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={`${SIGNUP_URL}?paket=${plan.id}`}>
                Mulai paket {plan.label} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <p className="text-xs text-slate-400">QRIS · virtual account · e-wallet</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col rounded-3xl p-7 glass sm:p-9 lg:col-span-2">
            <div className="flex items-center gap-2 text-teal-300">
              <Coins className="size-5" />
              <h3 className="font-display text-xl font-bold text-white">Top up kredit</h3>
            </div>
            <p className="mt-2 text-sm text-slate-400">Kredit bulanan habis sebelum waktunya? Isi ulang dari dashboard. Kredit top up berlaku 12 bulan.</p>
            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {topups.map((t) => (
                <li key={t.credits} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                  <span>
                    <span className="block font-display text-lg font-bold text-white">{t.credits.toLocaleString("id-ID")} kredit</span>
                    <span className="block text-xs text-teal-300">{t.note}</span>
                  </span>
                  <span className="text-sm font-semibold text-slate-200">{rupiah(t.price)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-14 scroll-mt-28" id="tarif">
          <h3 className="font-display text-2xl font-bold text-white">Berapa kredit tiap pekerjaan?</h3>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Jumlah kredit tampil sebelum agent bekerja. {MONTHLY_CREDITS} kredit cukup untuk, misalnya, 1 kalender + 30 caption + 10 balasan review dengan sisa untuk chat.
          </p>
          <div className="mt-6 overflow-x-auto rounded-3xl glass">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th scope="col" className="px-6 py-4 font-semibold">Pekerjaan</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Agent</th>
                  <th scope="col" className="px-6 py-4 text-right font-semibold">Kredit</th>
                </tr>
              </thead>
              <tbody>
                {creditCosts.map((c) => (
                  <tr key={c.job} className="border-b border-white/5 last:border-0">
                    <td className="px-6 py-3.5 text-slate-200">
                      {c.job}
                      {c.soon && <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-slate-300">segera</span>}
                    </td>
                    <td className="px-6 py-3.5 text-slate-400">{c.agent}</td>
                    <td className="px-6 py-3.5 text-right font-semibold text-teal-300">{c.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl p-6 text-center glass sm:flex-row sm:text-left">
          <div>
            <p className="font-display font-bold text-white">Butuh tim kami yang mengerjakan?</p>
            <p className="mt-1 text-sm text-slate-400">Layanan terkelola: tim CLAU menyiapkan fact sheet, memeriksa, dan menjadwalkan konten untuk Anda. Harga lewat proposal.</p>
          </div>
          <Button href={CONTACT_URL} variant="ghost" className="shrink-0">
            Minta proposal
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
