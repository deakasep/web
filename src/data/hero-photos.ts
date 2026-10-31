// Foto adegan utama (disetujui owner Dea Karisna 2026-10-31) + posisi kelopak mata untuk kedip (% gambar asli).
// File: public/hero/<name>-960.webp & <name>-1672.webp. Rasio gambar asli 1672×941.
import type { Eye } from "@/data/agents";

export const HERO_RATIO = 1672 / 941;

/** Hero: "AI coworkers" — Aruna, Nova, Sari, Ayu di lobi hotel. */
export const heroEyes: Eye[] = [
  { x: 49.45, y: 40.1, w: 3.77, h: 6.24, skin: "#f9ac80" },
  { x: 53.88, y: 38.1, w: 3.77, h: 6.24, skin: "#f9ac80" },
  { x: 60.5, y: 38.8, w: 3.51, h: 5.76, skin: "#d98b62" },
  { x: 65.2, y: 37.9, w: 3.51, h: 5.76, skin: "#d98b62" },
  { x: 71.07, y: 39.7, w: 3.25, h: 5.28, skin: "#fdb688" },
  { x: 75.13, y: 40.5, w: 3.25, h: 5.28, skin: "#fdb688" },
  { x: 82.26, y: 39.7, w: 3.51, h: 5.76, skin: "#eaa277" },
  { x: 87.0, y: 39.1, w: 3.51, h: 5.76, skin: "#eaa277" },
];

/** Section meja: "CLAU AI on the hospitality" — Bayu, Dimas, Sekar di depan dashboard. */
export const deskEyes: Eye[] = [
  { x: 25.53, y: 43.0, w: 3.72, h: 6.32, skin: "#ca784f" },
  { x: 30.18, y: 44.98, w: 3.72, h: 6.32, skin: "#ca784f" },
  { x: 47.58, y: 49.7, w: 3.96, h: 6.79, skin: "#e18f60" },
  { x: 52.54, y: 47.97, w: 3.96, h: 6.79, skin: "#e18f60" },
  { x: 66.71, y: 55.15, w: 3.48, h: 5.86, skin: "#e9985e" },
  { x: 71.8, y: 54.75, w: 3.48, h: 5.86, skin: "#e9985e" },
];
