import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Lock } from "lucide-react";
import { FloatChip } from "@/components/sections/Hero";
import { BASE } from "@/data/agents";
import { usePlayInView } from "@/lib/video";

// "CLAU AI on the hospitality": video Bayu, Dimas, Sekar di meja resepsionis villa (loop maju-mundur), parallax saat digulir.
// Laptop (lg+): video penuh selebar layar dengan judul di atasnya. HP & tablet: judul dulu, lalu video utuh 3:2 di kartu
// membulat (seperti foto tim di hero) supaya ketiga agen terlihat. HP memuat versi 768px. Reduced motion: poster diam.
export function DeskScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const titleY = useTransform(scrollYProgress, [0, 0.6], [60, 0]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLVideoElement>(null);
  const still = useReducedMotion();
  usePlayInView(videoRef, !still, 0.2);
  usePlayInView(cardRef, !still, 0.3);
  // Dipilih setelah mount (bukan saat prerender) supaya HTML server & klien sama.
  const [cardSrc, setCardSrc] = useState<string>();
  useEffect(() => {
    setCardSrc(`${BASE}hero/${window.matchMedia("(min-width: 768px)").matches ? "meja-1280" : "meja-768"}.mp4`);
  }, []);
  const alt = "Bayu, Dimas, dan Sekar, agent AI CLAU, di meja resepsionis villa dengan dashboard pemesanan, kalender konten, dan pesan tamu";

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink lg:h-[clamp(620px,92svh,900px)]">
      {/* Laptop: video penuh */}
      <motion.video
        ref={videoRef}
        src={still ? undefined : `${BASE}hero/meja-1280.mp4`}
        poster={`${BASE}hero/meja.webp`}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        aria-label={alt}
        style={{ y: photoY }}
        className="absolute inset-x-0 -inset-y-12 h-[calc(100%+6rem)] w-full object-cover object-[50%_38%] max-lg:hidden"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-b from-transparent via-black/70 to-black max-lg:hidden" />

      <motion.div style={{ y: titleY }} className="relative px-4 pt-20 text-center sm:pt-24 lg:absolute lg:inset-x-0 lg:bottom-0 lg:pt-0 lg:pb-20">
        <h2 className="mx-auto max-w-5xl font-display text-4xl leading-[1.02] font-extrabold tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
          AI menyiapkan setiap hari. <span className="text-gradient">Manusia yang memutuskan.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
          Bayu menulis listing OTA, Dimas menyusun kalender konten, Sekar menyiapkan Stories untuk tamu. Semua draft menunggu QA dan persetujuan Anda.
        </p>
      </motion.div>

      {/* HP & tablet: video utuh di kartu membulat */}
      <div className="relative mx-4 mt-10 mb-20 aspect-[3/2] overflow-hidden rounded-[28px] ring-1 ring-white/10 sm:mx-auto sm:max-w-2xl lg:hidden">
        <video
          ref={cardRef}
          src={still ? undefined : cardSrc}
          poster={`${BASE}hero/meja.webp`}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          aria-label={alt}
          className="absolute inset-0 size-full object-cover"
        />
        <FloatChip compact className="top-3 left-3" delay={0.4} icon={<CalendarCheck className="size-3.5 text-emerald-300" />} title="3 draft siap" sub="listing · kalender · Stories" />
        <FloatChip compact className="right-3 bottom-3" delay={0.7} icon={<Lock className="size-3.5 text-teal-300" />} title="Menunggu Anda" sub="QA lalu Setujui" />
      </div>
    </section>
  );
}
