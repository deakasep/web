import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BASE } from "@/data/agents";
import { usePlayInView } from "@/lib/video";

// "CLAU AI on the hospitality": video Bayu, Dimas, Sekar di meja resepsionis villa (loop maju-mundur), parallax saat digulir.
// Layar kecil memuat versi 768px, layar besar 1280px. Reduced motion: poster diam.
export function DeskScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const titleY = useTransform(scrollYProgress, [0, 0.6], [60, 0]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const still = useReducedMotion();
  usePlayInView(videoRef, !still, 0.2);
  // Dipilih setelah mount (bukan saat prerender) supaya HTML server & klien sama.
  const [src, setSrc] = useState<string>();
  useEffect(() => {
    setSrc(`${BASE}hero/${window.matchMedia("(min-width: 768px)").matches ? "meja-1280" : "meja-768"}.mp4`);
  }, []);

  return (
    <section ref={ref} className="relative isolate h-[clamp(620px,92svh,900px)] overflow-hidden bg-ink">
      <motion.video
        ref={videoRef}
        src={still ? undefined : src}
        poster={`${BASE}hero/meja.webp`}
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        aria-label="Bayu, Dimas, dan Sekar, agent AI CLAU, di meja resepsionis villa dengan dashboard pemesanan, kalender konten, dan pesan tamu"
        style={{ y: photoY }}
        className="absolute inset-x-0 -inset-y-12 size-auto h-[calc(100%+6rem)] w-full object-cover object-[50%_38%]"
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
