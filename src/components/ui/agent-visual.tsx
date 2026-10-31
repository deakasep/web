import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { AgentFigure } from "@/components/ui/agent-figure";
import { HospitalityScene } from "@/components/ui/hospitality-scenes";
import { sceneImage, scenePoster, sceneVideo, type Agent } from "@/data/agents";
import { useAmbientPointer, useTouchLit } from "@/lib/ambient";
import { cn } from "@/lib/utils";
import { usePlayInView } from "@/lib/video";

// Figur menoleh mengikuti kursor di dalam kartu; di layar sentuh menoleh sendiri (giroskop / gerak pelan).
function CardFigure({ a, i, height }: { a: Agent; i: number; height: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px" });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  useAmbientPointer(mx, my, { phase: i * 1.7, active: inView });
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-9, 9]), { stiffness: 120, damping: 16 });
  const rotateX = useSpring(useTransform(my, [-1, 1], [5, -5]), { stiffness: 120, damping: 16 });

  return (
    <div
      ref={ref}
      className="absolute inset-0 [perspective:900px]"
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
      <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2" style={{ aspectRatio: a.ratio, height }}>
        <motion.div className="size-full" variants={{ hover: { y: -14, scale: 1.04 } }} transition={{ type: "spring", stiffness: 200, damping: 18 }}>
          <AgentFigure a={a} i={i} rotateX={rotateX} rotateY={rotateY} />
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Foto adegan agen yang "hidup" (gaya sintra.ai): gambar persegi dipusatkan seperti object-cover, napas pelan
 * (skala & goyang sangat kecil dari titik kaki), dan kedip lewat kelopak berwarna kulit di posisi `sceneEyes`.
 * Kelopak ikut bergerak karena berada di panggung yang sama. Reduced motion: diam, mata terbuka.
 */
function LiveScene({ a, i }: { a: Agent; i: number }) {
  const still = useReducedMotion();
  const dur = 4.4 + (i % 4) * 0.5;
  const blinkDur = 3.8 + ((i * 7) % 5) * 0.55;
  return (
    <motion.div className="absolute inset-0" variants={{ hover: { scale: 1.06 } }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
      {/* Panggung persegi setinggi kartu, dipusatkan: koordinat % mata = koordinat % gambar. */}
      <motion.div
        className="absolute top-0 left-1/2 aspect-square h-full -translate-x-1/2 [transform-origin:50%_85%]"
        animate={still ? undefined : { scale: [1, 1.012, 1], rotate: [-0.22, 0.22, -0.22], y: ["0%", "-0.35%", "0%"] }}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: (i % 5) * 0.35 }}
      >
        <img
          src={sceneImage(a.id)}
          alt={`${a.name}, ${a.role}, di ${a.scene.setting.toLowerCase()}`}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 size-full"
        />
        {a.sceneEyes?.map((e, k) => (
          <span
            key={k}
            aria-hidden
            className="absolute animate-blink rounded-[50%] blur-[0.5px]"
            style={
              {
                left: `${e.x - e.w / 2}%`,
                top: `${e.y - e.h / 2}%`,
                width: `${e.w}%`,
                height: `${e.h}%`,
                background: `radial-gradient(ellipse at 50% 35%, color-mix(in srgb, ${e.skin} 88%, white), ${e.skin} 85%)`,
                "--blink-dur": `${blinkDur}s`,
                "--blink-delay": `${-((i * 1.3) % blinkDur)}s`,
              } as React.CSSProperties
            }
          >
            <span className="absolute inset-x-[12%] top-[40%] h-[32%] rounded-b-full border-b-2 border-[#3b2418]/80" />
          </span>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/10" />
    </motion.div>
  );
}

/**
 * Video agen (kedip & lambai asli) yang di-loop mulus: diputar hanya saat kartu terlihat, berhenti saat digulir lewat.
 * Poster = frame pertama, jadi tidak ada lompatan saat video mulai. Reduced motion: hanya poster.
 */
function SceneVideo({ a }: { a: Agent }) {
  const ref = useRef<HTMLVideoElement>(null);
  const still = useReducedMotion();
  usePlayInView(ref, !still);
  return (
    <motion.div className="absolute inset-0" variants={{ hover: { scale: 1.05 } }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
      <video
        ref={ref}
        src={still ? undefined : sceneVideo(a.id)}
        poster={scenePoster(a.id)}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        aria-label={`${a.name}, ${a.role}, di ${a.scene.setting.toLowerCase()}`}
        className="absolute inset-0 size-full object-cover object-[50%_40%]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/10" />
    </motion.div>
  );
}

/** Ruangan agen + figur + label suasana & status. Induk menentukan ukuran (mis. aspect-[3/4]). */
export function AgentVisual({ a, i, figureHeight = "80%", className }: { a: Agent; i: number; figureHeight?: string; className?: string }) {
  // Layar sentuh: efek hover laptop (figur naik, ruangan zoom, cahaya) jalan saat kartu masuk ke tengah layar.
  const [ref, lit, touch] = useTouchLit<HTMLDivElement>(0.65);
  return (
    <motion.div
      ref={ref}
      data-lit={lit}
      whileInView={touch ? "hover" : undefined}
      viewport={{ amount: 0.65 }}
      className={cn(
        "relative overflow-hidden rounded-[28px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10 transition-shadow duration-500 group-hover:shadow-[0_40px_90px_-30px_rgba(45,212,191,0.45)] data-[lit=true]:shadow-[0_40px_90px_-30px_rgba(45,212,191,0.45)]",
        className,
      )}
    >
      {a.sceneVideo ? (
        <SceneVideo a={a} />
      ) : a.sceneImage ? (
        <LiveScene a={a} i={i} />
      ) : (
        <>
          <motion.div className="absolute inset-0" variants={{ hover: { scale: 1.05 } }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <HospitalityScene id={a.id} />
          </motion.div>
          <div className="absolute bottom-[7%] left-1/2 h-7 w-[50%] -translate-x-1/2 rounded-[50%] bg-black/40 blur-md" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_110px_rgba(0,0,0,0.38)]" />
          <CardFigure a={a} i={i} height={figureHeight} />
        </>
      )}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
        <span className="rounded-full bg-black/35 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">{a.scene.setting}</span>
        <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md", a.active ? "bg-emerald-400/90 text-emerald-950" : "bg-black/45 text-white/80")}>
          {a.active ? "Aktif" : "Segera hadir"}
        </span>
      </div>
    </motion.div>
  );
}
