import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { LivePhoto } from "@/components/ui/live-photo";
import { deskEyes, HERO_RATIO } from "@/data/hero-photos";

// "CLAU AI on the hospitality": Bayu, Dimas, Sekar bekerja di meja resepsionis villa; parallax saat digulir.
export function DeskScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const titleY = useTransform(scrollYProgress, [0, 0.6], [60, 0]);

  return (
    <section ref={ref} className="relative isolate h-[clamp(620px,92svh,900px)] overflow-hidden bg-ink">
      <LivePhoto
        name="meja-hospitality"
        alt="Bayu, Dimas, dan Sekar, agent AI CLAU, di meja resepsionis villa dengan dashboard pemesanan, kalender konten, dan pesan tamu"
        ratio={HERO_RATIO}
        eyes={deskEyes}
        focusX={48}
        focusY={38}
        y={photoY}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-b from-transparent via-black/70 to-black" />
      <motion.div style={{ y: titleY }} className="absolute inset-x-0 bottom-0 px-4 pb-14 text-center sm:pb-20">
        <h2 className="mx-auto max-w-5xl font-display text-4xl leading-[1.02] font-extrabold tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
          AI menyiapkan setiap hari. <span className="text-gradient">Manusia yang memutuskan.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
          Bayu menulis listing OTA, Dimas menyusun kalender konten, Sekar menyiapkan Stories untuk tamu. Semua draft menunggu QA dan persetujuan Anda.
        </p>
      </motion.div>
    </section>
  );
}
