import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export type Crumb = { label: string; href?: string };

/** Hero halaman dalam: breadcrumb, eyebrow, judul besar, subjudul, tombol, dan slot visual kanan. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  subtitle,
  actions,
  aside,
}: {
  crumbs?: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute -top-40 left-1/2 -z-10 size-[620px] -translate-x-1/2 rounded-full bg-teal-500/15 blur-[140px]" />
      <div className={`mx-auto grid max-w-6xl gap-12 px-4 ${aside ? "lg:grid-cols-[1.15fr_1fr] lg:items-center" : ""}`}>
        <div className={aside ? "" : "mx-auto max-w-3xl text-center"}>
          {crumbs && (
            <motion.nav {...fade(0)} aria-label="Breadcrumb" className={`mb-6 flex flex-wrap items-center gap-1 text-xs text-slate-500 ${aside ? "" : "justify-center"}`}>
              {crumbs.map((c, i) => (
                <span key={c.label} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="size-3.5" aria-hidden />}
                  {c.href ? (
                    <a href={c.href} className="transition-colors hover:text-slate-200">{c.label}</a>
                  ) : (
                    <span aria-current="page" className="text-slate-300">{c.label}</span>
                  )}
                </span>
              ))}
            </motion.nav>
          )}
          {eyebrow && (
            <motion.span {...fade(0.05)} className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-teal-200 uppercase">
              {eyebrow}
            </motion.span>
          )}
          <motion.h1 {...fade(0.12)} className="mt-5 font-display text-4xl leading-[1.05] font-extrabold tracking-[-0.025em] text-white sm:text-6xl">
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p {...fade(0.2)} className={`mt-6 text-base leading-relaxed text-slate-300 sm:text-lg ${aside ? "max-w-xl" : "mx-auto max-w-2xl"}`}>
              {subtitle}
            </motion.p>
          )}
          {actions && (
            <motion.div {...fade(0.28)} className={`mt-9 flex flex-col gap-3 sm:flex-row ${aside ? "" : "justify-center"}`}>
              {actions}
            </motion.div>
          )}
        </div>
        {aside && <motion.div {...fade(0.3)}>{aside}</motion.div>}
      </div>
    </section>
  );
}
