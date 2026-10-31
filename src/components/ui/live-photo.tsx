import { motion, useReducedMotion, type MotionValue } from "motion/react";
import { BASE, type Eye } from "@/data/agents";

/**
 * Foto adegan lebar yang "hidup" (gaya sintra.ai): gambar menutupi kotak induk seperti object-cover dengan titik fokus,
 * napas pelan, dan kedip lewat kelopak berwarna kulit di posisi `eyes` (% dari gambar asli).
 * Kelopak ikut bergeser bersama gambar karena berada di panggung yang sama. Reduced motion: diam, mata terbuka.
 * Induk wajib `position: relative/absolute` dengan ukuran tertentu; komponen ini mengisi penuh induknya.
 */
export function LivePhoto({
  name,
  alt,
  ratio,
  eyes = [],
  focusX = 50,
  focusY = 50,
  eager = false,
  x,
  y,
  className = "",
}: {
  /** File di public/hero: `<name>-960.webp` dan `<name>-1672.webp`. */
  name: string;
  alt: string;
  /** Lebar/tinggi gambar asli. */
  ratio: number;
  eyes?: Eye[];
  focusX?: number;
  focusY?: number;
  eager?: boolean;
  x?: MotionValue<number>;
  y?: MotionValue<number>;
  className?: string;
}) {
  const still = useReducedMotion();
  return (
    <div className={`absolute inset-0 overflow-hidden [container-type:size] ${className}`}>
      <motion.div
        className="absolute"
        style={{
          aspectRatio: ratio,
          width: `max(100cqw, calc(100cqh * ${ratio}))`,
          left: `${focusX}%`,
          top: `${focusY}%`,
          translate: `-${focusX}% -${focusY}%`,
          x,
          y,
        }}
      >
        <motion.div
          className="relative size-full [transform-origin:50%_90%]"
          animate={still ? undefined : { scale: [1.02, 1.032, 1.02] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={`${BASE}hero/${name}-1672.webp`}
            srcSet={`${BASE}hero/${name}-960.webp 960w, ${BASE}hero/${name}-1672.webp 1672w`}
            sizes="100vw"
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
            draggable={false}
            className="absolute inset-0 size-full"
          />
          {eyes.map((e, k) => {
            const pair = Math.floor(k / 2);
            const dur = 4.1 + ((pair * 7) % 5) * 0.55;
            return (
              <span
                key={k}
                aria-hidden
                className="absolute animate-blink rounded-[50%] blur-[0.6px]"
                style={
                  {
                    left: `${e.x - e.w / 2}%`,
                    top: `${e.y - e.h / 2}%`,
                    width: `${e.w}%`,
                    height: `${e.h}%`,
                    background: `radial-gradient(ellipse at 50% 35%, color-mix(in srgb, ${e.skin} 85%, white), ${e.skin} 85%)`,
                    "--blink-dur": `${dur}s`,
                    "--blink-delay": `${-((pair * 1.7) % dur)}s`,
                  } as React.CSSProperties
                }
              >
                <span className="absolute inset-x-[12%] top-[40%] h-[32%] rounded-b-full border-b-2 border-[#3b2418]/80" />
              </span>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
