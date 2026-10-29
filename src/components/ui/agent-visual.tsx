import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { AgentFigure } from "@/components/ui/agent-figure";
import { HospitalityScene } from "@/components/ui/hospitality-scenes";
import { sceneImage, type Agent } from "@/data/agents";
import { cn } from "@/lib/utils";

// Figur menoleh mengikuti kursor di dalam kartu.
function CardFigure({ a, i, height }: { a: Agent; i: number; height: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-9, 9]), { stiffness: 120, damping: 16 });
  const rotateX = useSpring(useTransform(my, [-1, 1], [5, -5]), { stiffness: 120, damping: 16 });

  return (
    <div
      className="absolute inset-0 [perspective:900px]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => {
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

/** Ruangan agen + figur + label suasana & status. Induk menentukan ukuran (mis. aspect-[3/4]). */
export function AgentVisual({ a, i, figureHeight = "80%", className }: { a: Agent; i: number; figureHeight?: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10 transition-shadow duration-500 group-hover:shadow-[0_40px_90px_-30px_rgba(45,212,191,0.45)]",
        className,
      )}
    >
      {a.sceneImage ? (
        <motion.img
          src={sceneImage(a.id)}
          alt={`${a.name}, ${a.role}, di ${a.scene.setting.toLowerCase()}`}
          loading="lazy"
          draggable={false}
          variants={{ hover: { scale: 1.06 } }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 size-full object-cover"
        />
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
    </div>
  );
}
