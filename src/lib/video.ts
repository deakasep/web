import { useEffect, type RefObject } from "react";

/**
 * Putar video hanya saat terlihat (hemat baterai & kuota), jeda saat digulir lewat.
 * `enabled=false` (mis. reduced motion) membuat video tidak pernah diputar; poster yang tampil.
 */
export function usePlayInView(ref: RefObject<HTMLVideoElement | null>, enabled: boolean, threshold = 0.25) {
  useEffect(() => {
    const v = ref.current;
    if (!v || !enabled) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [ref, enabled, threshold]);
}
