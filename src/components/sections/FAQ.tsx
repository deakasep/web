import { ChevronDown } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { faq } from "@/data/pricing";

export function FAQ() {
  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading eyebrow="FAQ" title="Pertanyaan umum" subtitle="Soal kredit, pembayaran, dan siapa yang menekan tombol posting." />
        <div className="mt-12 flex flex-col gap-3">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <details className="group rounded-2xl p-5 glass open:border-teal-300/25">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold text-white [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown className="size-5 shrink-0 text-teal-300 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
