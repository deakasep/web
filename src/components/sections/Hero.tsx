import { ArrowRight, Check, Lock, ShieldCheck } from "lucide-react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { LivePhoto } from "@/components/ui/live-photo";
import { HERO_RATIO, heroEyes } from "@/data/hero-photos";
import { useAmbientPointer } from "@/lib/ambient";

const HERO_ALT = "Tim AI coworkers CLAU: Aruna, Nova, Sari, dan Ayu berdiri di lobi hotel";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  // Parallax kursor halus pada foto; HP/tablet: gerak pelan otomatis (useAmbientPointer).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  useAmbientPointer(mx, my, { strength: 0.8 });
  const photoX = useTransform(sx, (v) => v * -14);
  const photoY = useTransform(sy, (v) => v * -8);
  // Scroll: adegan sedikit membesar & teks naik saat digulir.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      className="relative isolate overflow-hidden bg-ink md:h-[clamp(680px,100svh,940px)]"
    >
      <motion.div className="absolute inset-0 -z-20" style={{ scale: sceneScale }} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}>
        <LivePhoto name="tim-lobi" alt={HERO_ALT} ratio={HERO_RATIO} eyes={heroEyes} focusX={72} focusY={45} eager x={photoX} y={photoY} className="max-md:hidden" />
      </motion.div>
      {/* Gelap di sisi teks & bawah, supaya headline terbaca */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,13,0.8)_0%,rgba(5,8,13,0.7)_55%,rgba(5,8,13,0.9)_100%)] md:bg-[linear-gradient(90deg,rgba(5,8,13,0.92)_0%,rgba(5,8,13,0.7)_38%,rgba(5,8,13,0.05)_70%),linear-gradient(180deg,transparent_60%,rgba(5,8,13,0.9)_100%)]" />

      <motion.div style={{ y: textY }} className="relative mx-auto flex max-w-6xl flex-col justify-start px-4 pt-28 md:h-full md:justify-center md:pt-16">
        <div className="max-w-2xl">
          <motion.a {...fade(0.1)} href="#keamanan" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs text-slate-200 backdrop-blur-md transition-colors hover:bg-black/50 sm:text-sm">
            <span className="flex h-5 items-center rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 px-2 text-[10px] font-bold tracking-wide text-slate-950">BARU</span>
            Langganan mulai Rp149rb/bulan
            <ArrowRight className="size-3.5" />
          </motion.a>
          <motion.h1 {...fade(0.2)} className="mt-6 font-display text-[2.5rem] leading-[1.02] font-extrabold tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.6rem]">
            Karyawan AI untuk <span className="text-gradient">UMKM &amp; hospitality</span>
          </motion.h1>
          <motion.p {...fade(0.3)} className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Tim agent AI menyusun konten sosmed, kalender, naskah video, balasan review, dan laporan untuk toko, kafe, villa, atau usaha Anda. Bayar per paket, pakai kredit per pekerjaan,{" "}
            <span className="text-white">dan tidak ada yang terposting sebelum Anda klik Setujui.</span>
          </motion.p>
          <motion.div {...fade(0.4)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#paket">
              Lihat paket & harga
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button href="/agen" variant="ghost">
              Kenalan dengan agent
            </Button>
          </motion.div>
          <motion.ul {...fade(0.5)} className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300 sm:gap-x-6">
            {["Kredit tampil sebelum kerja", "Top up kapan saja", "Approve sebelum posting"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-4 text-teal-300" /> {t}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      {/* HP: foto tim di bawah teks */}
      <div className="relative mx-4 mt-10 mb-12 aspect-[4/3] overflow-hidden rounded-[28px] ring-1 ring-white/10 md:hidden">
        <LivePhoto name="tim-lobi" alt={HERO_ALT} ratio={HERO_RATIO} eyes={heroEyes} focusX={70} focusY={45} eager />
        <FloatChip compact className="top-3 left-3" delay={1.2} icon={<ShieldCheck className="size-3.5 text-emerald-300" />} title="8 kredit" sub="caption + cek fakta" />
        <FloatChip compact className="right-3 bottom-3" delay={1.5} icon={<Lock className="size-3.5 text-teal-300" />} title="Setujui dulu" sub="baru terposting" />
      </div>

      {/* Kartu status di atas foto tim (desktop) */}
      <FloatChip className="top-[17%] right-[4%] lg:right-[6%]" delay={1.2} icon={<ShieldCheck className="size-4 text-emerald-300" />} title="8 kredit · caption + cek fakta" sub="Saldo tampil sebelum agent bekerja" />
      <FloatChip className="bottom-[9%] right-[30%] lg:right-[34%]" delay={1.5} icon={<Lock className="size-4 text-teal-300" />} title="Terposting setelah Setujui" sub="Anda yang menekan tombol" />
    </section>
  );
}

function FloatChip({ className, delay, icon, title, sub, compact = false }: { className: string; delay: number; icon: React.ReactNode; title: string; sub: string; compact?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: [0, -8, 0] }}
      transition={{ opacity: { delay, duration: 0.6 }, y: { delay, duration: 6, repeat: Infinity, ease: "easeInOut" } }}
      className={
        compact
          ? `absolute z-10 flex items-center gap-2 rounded-xl border border-white/15 bg-black/45 px-2.5 py-2 text-left whitespace-nowrap shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)] backdrop-blur-md lg:hidden ${className}`
          : `absolute z-10 hidden items-center gap-3 rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-left shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md lg:flex ${className}`
      }
    >
      <span className={compact ? "flex size-6 items-center justify-center rounded-md bg-white/10" : "flex size-8 items-center justify-center rounded-lg bg-white/10"}>{icon}</span>
      <span>
        <span className={compact ? "block text-xs font-semibold text-white" : "block text-sm font-semibold text-white"}>{title}</span>
        <span className={compact ? "block text-[10px] text-slate-300" : "block text-xs text-slate-300"}>{sub}</span>
      </span>
    </motion.div>
  );
}
