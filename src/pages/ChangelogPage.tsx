import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { CTA } from "@/components/sections/CTA";
import { Reveal } from "@/components/ui/reveal";
import { releases, TAG } from "@/data/changelog";
import { pages } from "@/data/pages";
import { usePageMeta } from "@/lib/meta";
import { cn } from "@/lib/utils";

const meta = pages.find((p) => p.path === "/yang-baru")!;

export default function ChangelogPage() {
  usePageMeta(meta.title, meta.description, meta.path);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Beranda", href: "/" }, { label: "Yang baru" }]}
        eyebrow="Yang baru"
        title={
          <>
            Agen AI Anda <span className="text-gradient">terus bertambah pintar</span>
          </>
        }
        subtitle="Catatan fitur baru dan perbaikan CLAU AI. Fitur bertanda Segera hadir sedang disiapkan dan belum bisa dipakai."
      />

      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-4">
          {releases.map((r) => (
            <div key={r.date} className="relative border-l border-white/10 pb-14 pl-6 last:pb-0 sm:pl-10">
              <span className="absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-teal-300 shadow-[0_0_12px_rgba(45,212,191,0.7)]" aria-hidden />
              <Reveal>
                <h2 className="font-display text-2xl font-bold text-white">
                  <time dateTime={r.date}>{r.label}</time>
                </h2>
              </Reveal>
              <ul className="mt-6 flex flex-col gap-4">
                {r.items.map((it, i) => (
                  <Reveal key={it.title} delay={i * 0.04} className="rounded-3xl p-6 glass">
                    <span className={cn("inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold", TAG[it.tag].cls)}>{TAG[it.tag].label}</span>
                    <h3 className="mt-3 font-display text-lg font-bold text-white">{it.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{it.body}</p>
                    {it.href && (
                      <a href={it.href} className="group mt-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-teal-300 hover:text-teal-200">
                        Lihat <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    )}
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
