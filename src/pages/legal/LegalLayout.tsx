import { FileWarning } from "lucide-react";
import type { ReactNode } from "react";
import { PageHero } from "@/components/page/PageHero";
import { pages } from "@/data/pages";
import { SITE } from "@/data/site";
import { usePageMeta } from "@/lib/meta";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** Kerangka halaman legal: judul, tanggal berlaku, label draf, daftar isi, dan isi per pasal. */
export function LegalLayout({ path, title, intro, sections }: { path: string; title: string; intro: ReactNode; sections: LegalSection[] }) {
  const meta = pages.find((p) => p.path === path)!;
  usePageMeta(meta.title, meta.description, path);
  return (
    <>
      <PageHero crumbs={[{ label: "Beranda", href: "/" }, { label: title }]} eyebrow="Legal" title={title} subtitle={intro} />
      <div className="mx-auto max-w-6xl px-4 pb-24">
        {!SITE.legalReviewed && (
          <p role="note" className="mb-10 flex gap-3 rounded-2xl border border-amber-300/30 bg-amber-400/10 p-5 text-sm leading-relaxed text-amber-100">
            <FileWarning className="mt-0.5 size-5 shrink-0" />
            <span>
              <b>Draf.</b> Dokumen ini sedang ditinjau konsultan hukum dan dapat berubah sebelum layanan berbayar dibuka. Bagian bertanda [ … ] akan diisi dengan
              data usaha resmi.
            </span>
          </p>
        )}
        <div className="grid gap-12 lg:grid-cols-[15rem_1fr]">
          <nav aria-label="Daftar isi" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Daftar isi</p>
            <ol className="mt-4 flex flex-col gap-2 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-slate-400 transition-colors hover:text-white">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-xs leading-relaxed text-slate-500">
              Berlaku: {SITE.legalEffective}
              <br />
              Pengelola: {SITE.legalName}
            </p>
          </nav>
          <article className="legal max-w-3xl">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 border-b border-white/5 py-8 first:pt-0 last:border-0">
                <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                  {i + 1}. {s.title}
                </h2>
                <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-slate-300">{s.body}</div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-teal-300">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

export function Mail({ to }: { to: string }) {
  return (
    <a href={`mailto:${to}`} className="font-semibold text-teal-300 underline-offset-4 hover:underline">
      {to}
    </a>
  );
}
