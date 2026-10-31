import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { agents, avatar, headPoster, headVideo, type Agent } from "@/data/agents";
import { useAmbientPointer } from "@/lib/ambient";
import { cn } from "@/lib/utils";
import { usePlayInView } from "@/lib/video";

// Close-up wajah agent di latar hitam (gaya kartu karakter): video asli (kedip & lambai) berganti otomatis, bisa dipilih,
// sedikit miring mengikuti kursor. Tepi video memudar ke hitam supaya menyatu dengan section.
const GANTI_MS = 6000;

function HeadVideo({ a }: { a: Agent }) {
  const ref = useRef<HTMLVideoElement>(null);
  const still = useReducedMotion();
  usePlayInView(ref, !still, 0.2);
  return (
    <video
      ref={ref}
      src={still ? undefined : headVideo(a.id)}
      poster={headPoster(a.id)}
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-label={`${a.name}, ${a.role}`}
      className="size-full object-cover"
    />
  );
}

export function Showcase() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const a = agents[idx];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % agents.length), GANTI_MS);
    return () => clearInterval(t);
  }, [paused]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-6, 6]), { stiffness: 90, damping: 16 });
  const rotateX = useSpring(useTransform(my, [-1, 1], [4, -4]), { stiffness: 90, damping: 16 });
  useAmbientPointer(mx, my);

  return (
    <section
      className="relative overflow-hidden bg-black py-20 sm:py-28"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        mx.set(0);
        my.set(0);
      }}
    >
      <div className="absolute top-1/3 left-1/2 -z-0 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/15 blur-[120px]" />

      {/* Jendela close-up: video persegi, tepi memudar ke hitam */}
      <div className="relative mx-auto aspect-square w-full max-w-[min(600px,100%)] [perspective:1100px]">
        <motion.div
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_47%,#000_52%,transparent_97%)]"
          style={{ rotateX, rotateY }}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <HeadVideo a={a} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-b from-transparent to-black" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <Reveal>
          <p className="text-sm font-semibold tracking-wide text-teal-300">
            {a.name} · {a.role}
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-6xl">
            Temukan agent AI yang tepat untuk bisnis hospitality Anda
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Setiap bisnis berbeda, begitu juga timnya. Villa butuh caption dan listing OTA, resto butuh kalender promo, WO butuh balasan review yang hati-hati. Setiap agent memegang satu peran, dan tim CLAU memeriksa hasilnya.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-2" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {agents.map((ag, k) => (
            <motion.button
              key={ag.id}
              type="button"
              onClick={() => setIdx(k)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Lihat ${ag.name}, ${ag.role}`}
              aria-pressed={k === idx}
              className={cn(
                "flex items-center gap-2 rounded-full border py-1 pr-3 pl-1 text-sm transition-colors",
                k === idx ? "border-teal-300/60 bg-teal-400/15 text-white" : "border-white/10 bg-white/5 text-slate-400 hover:text-white",
              )}
            >
              <img src={avatar(ag.id)} alt="" width={28} height={28} loading="lazy" className="size-7 rounded-full bg-mint object-cover" />
              {ag.name}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
