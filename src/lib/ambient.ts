import { useInView, useReducedMotion, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * HP & tablet tidak punya kursor, jadi efek "menoleh ke kursor" & hover di laptop tidak pernah jalan di sana.
 * Hook di sini memberi gerak yang sama di layar sentuh:
 * - `useTouchDevice`: true bila perangkat utama tanpa hover (layar sentuh).
 * - `useAmbientPointer`: menggerakkan nilai kursor (-1..1) sendiri: miringkan HP (giroskop, bila tersedia tanpa izin)
 *   atau, tanpa giroskop, gerak melayang pelan. Di laptop tidak melakukan apa-apa (kursor yang menggerakkan).
 * `active` = false menghentikan gerak (mis. saat elemen di luar layar). Pengaturan "kurangi gerakan" tetap dihormati.
 */
const TOUCH_QUERY = "(hover: none), (pointer: coarse)";

export function useTouchDevice(): boolean {
  const [touch, setTouch] = useState(() => typeof window !== "undefined" && !!window.matchMedia?.(TOUCH_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia?.(TOUCH_QUERY);
    if (!mq) return;
    const on = () => setTouch(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return touch;
}

const clamp = (v: number) => Math.max(-1, Math.min(1, v));

export function useAmbientPointer(mx: MotionValue<number>, my: MotionValue<number>, { phase = 0, strength = 0.7, active = true } = {}) {
  const touch = useTouchDevice();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!touch || reduce || !active) return;
    let raf = 0;
    let tilt: { x: number; y: number } | null = null;
    let lastTilt = 0;
    const start = performance.now();

    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      // gamma: miring kiri/kanan (±90), beta: depan/belakang; posisi pegang HP normal ~45°.
      tilt = { x: clamp(e.gamma / 30), y: clamp((e.beta - 45) / 30) };
      lastTilt = performance.now();
    };
    window.addEventListener("deviceorientation", onTilt);

    const tick = (now: number) => {
      if (tilt && now - lastTilt < 1500) {
        mx.set(mx.get() + (tilt.x * strength - mx.get()) * 0.12);
        my.set(my.get() + (tilt.y * strength - my.get()) * 0.12);
      } else {
        const t = (now - start) / 1000 + phase;
        mx.set(Math.sin(t * 0.55) * strength);
        my.set(Math.sin(t * 0.83 + 1.3) * strength * 0.6);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("deviceorientation", onTilt);
    };
  }, [touch, reduce, active, mx, my, phase, strength]);

  return touch;
}

/**
 * Pengganti hover di layar sentuh: `lit` = true selama elemen berada di tengah layar (HP/tablet saja). Pasang
 * `data-lit={lit}` pada elemen, lalu kelas `data-[lit=true]:…` / `group-data-[lit=true]:…` menyalakan efek yang
 * di laptop muncul saat kursor di atasnya. Di laptop selalu false (hover biasa yang bekerja).
 */
export function useTouchLit<T extends Element>(amount = 0.6) {
  const ref = useRef<T>(null);
  const touch = useTouchDevice();
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount });
  return [ref, touch && !reduce && inView, touch] as const;
}
