import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import { AgentVisual } from "@/components/ui/agent-visual";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { agents, agentUrl, type Agent } from "@/data/agents";

function AgentCard({ a, i }: { a: Agent; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: Math.min(i, 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
      className="group w-[78vw] max-w-[360px] shrink-0 snap-start sm:w-[340px]"
    >
      <a href={agentUrl(a)} className="block rounded-[28px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300">
        <AgentVisual a={a} i={i} className="aspect-[3/4]" />
        <div className="px-1 pt-6">
          <h3 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{a.name}</h3>
          <p className="mt-3 text-base leading-relaxed text-slate-400">
            <span className="text-slate-200">{a.role}.</span> {a.blurb}
          </p>
          <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal-300">
            Lihat detail <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </p>
        </div>
      </a>
    </motion.article>
  );
}

const upcoming = agents.filter((a) => !a.active);

export function Agents() {
  const track = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("article");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 340) + 24), behavior: "smooth" });
  };

  return (
    <section id="agent" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="The Agents"
          title={
            <>
              Kenalkan tim AI Anda, <span className="text-gradient">masing-masing spesialis</span>
            </>
          }
          subtitle="Setiap agent punya satu keahlian, persona, dan batas yang jelas. Mereka menyiapkan draft. Keputusan tetap di tangan Anda."
        />
      </div>

      <Reveal className="relative mt-16">
        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:scroll-px-[max(1rem,calc((100vw-72rem)/2+1rem))] sm:px-[max(1rem,calc((100vw-72rem)/2+1rem))] [&::-webkit-scrollbar]:hidden"
        >
          {agents.map((a, i) => (
            <AgentCard key={a.id} a={a} i={i} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-[200px] hidden justify-between px-6 sm:flex lg:px-10">
          {([-1, 1] as const).map((dir) => (
            <motion.button
              key={dir}
              type="button"
              onClick={() => scrollBy(dir)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              aria-label={dir < 0 ? "Agent sebelumnya" : "Agent berikutnya"}
              className="pointer-events-auto flex size-14 items-center justify-center rounded-full border border-white/15 bg-ink/70 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.9)] backdrop-blur-md transition-colors hover:bg-slate-800"
            >
              {dir < 0 ? <ArrowLeft className="size-6" /> : <ArrowRight className="size-6" />}
            </motion.button>
          ))}
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-12 max-w-6xl px-4">
        <div className="flex flex-col gap-4 rounded-3xl p-6 glass sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display font-bold text-white">Segera bergabung</p>
            <p className="mt-1 text-sm text-slate-400">Agent baru otomatis masuk ke paket Anda tanpa biaya tambahan; pemakaiannya memakai kredit.</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {upcoming.map((u) => (
              <li key={u.id}>
                <a href={agentUrl(u)} className="block rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-white/25 hover:text-white">
                  {u.name} · {u.role.replace(/^AI /, "")}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <p className="mx-auto mt-6 max-w-6xl px-4 text-center text-xs text-slate-500">
        Geser untuk melihat semua {agents.length} agent. Avatar adalah karakter AI fiktif, bukan foto staf. Agent selalu ditampilkan sebagai AI, bukan manusia.
      </p>
    </section>
  );
}
