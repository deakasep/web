// Sumber: clau-agent/agents/registry.json (nama, pilar, status). Avatar 256×256, figur tanpa latar (agents/full) & adegan: dari gambar agen tampak depan owner (2026-10-31).
export type Eye = { x: number; y: number; w: number; h: number; skin: string };

export type Agent = {
  id: string;
  name: string;
  role: string;
  blurb: string;
  pillar: string;
  active: boolean;
  /** Nama ruangan hospitality di kartu carousel (ilustrasi: components/ui/hospitality-scenes.tsx). */
  scene: { setting: string };
  /** Rasio lebar/tinggi figur full-body (public/agents/full/<id>.webp). */
  ratio: number;
  /** Posisi mata dalam % kotak figur (pusat, lebar, tinggi) + warna kulit kelopak, untuk animasi kedip. Tanpa nilai = tanpa kedip. */
  eyes?: [Eye, Eye];
  /** true bila public/agents/scene/<id>.webp sudah ada (lihat docs/avatar-scene-prompts.md). */
  sceneImage?: boolean;
  /** Kelopak mata di gambar adegan persegi (% kotak gambar, ukuran kelopak penuh) untuk kedip; 1–2 mata yang terlihat. */
  sceneEyes?: Eye[];
};

export const agents: Agent[] = [
  { id: "caption-writer", name: "Tara", role: "AI Caption Writer", blurb: "Caption feed yang hangat, jujur, dan sesuai voice brand Anda.", pillar: "AI Marketing", active: true, scene: { setting: "Kafe sore hari" }, ratio: 0.7122, eyes: [{ x: 31.77, y: 39.37, w: 13.4, h: 8.6, skin: "#c19068" }, { x: 70.47, y: 39.93, w: 13.4, h: 8.6, skin: "#c19068" }], sceneImage: true, sceneEyes: [{ x: 34.5, y: 44.5, w: 12.2, h: 11, skin: "#c19068" }, { x: 58.8, y: 45, w: 12.2, h: 11, skin: "#c19068" }] },
  { id: "reel-scripter", name: "Raka", role: "AI Reel Scripter", blurb: "Naskah Reels & TikTok per detik, lengkap dengan shot list.", pillar: "AI Marketing", active: true, scene: { setting: "Teras villa tepi pantai" }, ratio: 0.5578, eyes: [{ x: 32.11, y: 34.69, w: 14.39, h: 8.32, skin: "#ae775b" }, { x: 68.71, y: 34.69, w: 14.39, h: 8.32, skin: "#ae775b" }], sceneImage: true, sceneEyes: [{ x: 41.3, y: 35.8, w: 11, h: 11.4, skin: "#ae775b" }, { x: 60.6, y: 35.8, w: 11, h: 11.4, skin: "#ae775b" }] },
  { id: "story-writer", name: "Sekar", role: "AI Story Writer", blurb: "Set Stories 3 frame untuk promo, event, dan behind the scene.", pillar: "AI Marketing", active: true, scene: { setting: "Kamar villa Bali" }, ratio: 0.7622, eyes: [{ x: 31.2, y: 34.2, w: 10.4, h: 7.92, skin: "#b47b5a" }, { x: 57.51, y: 34.32, w: 9.02, h: 7.76, skin: "#b47b5a" }], sceneImage: true, sceneEyes: [{ x: 38, y: 36.5, w: 9.8, h: 9.8, skin: "#b47b5a" }, { x: 55.1, y: 36.6, w: 8.5, h: 9.6, skin: "#b47b5a" }] },
  { id: "listing-writer", name: "Bayu", role: "AI OTA Listing Writer", blurb: "Deskripsi produk, marketplace, OTA & website yang akurat dan mudah ditemukan.", pillar: "AI Marketing", active: true, scene: { setting: "Teras villa & kolam" }, ratio: 0.4722, eyes: [{ x: 32.7, y: 32.57, w: 14.78, h: 6.51, skin: "#c59273" }, { x: 65.56, y: 33.02, w: 13.14, h: 6.2, skin: "#c59273" }], sceneImage: true, sceneEyes: [{ x: 44.2, y: 34.4, w: 9, h: 8.4, skin: "#c59273" }, { x: 58, y: 34.8, w: 8, h: 8, skin: "#c59273" }] },
  { id: "review-responder", name: "Laras", role: "AI Review Responder", blurb: "Draft balasan review Google & OTA. Review negatif ke owner.", pillar: "AI Marketing", active: true, scene: { setting: "Meja resepsionis hotel" }, ratio: 0.6856, eyes: [{ x: 23.17, y: 38.87, w: 9.72, h: 6.03, skin: "#d39c78" }, { x: 49.84, y: 38.87, w: 9.25, h: 5.95, skin: "#d39c78" }], sceneImage: true, sceneEyes: [{ x: 43.6, y: 42.3, w: 8.4, h: 7.6, skin: "#d39c78" }, { x: 59.5, y: 42.3, w: 8, h: 7.5, skin: "#d39c78" }] },
  { id: "calendar-planner", name: "Dimas", role: "AI Calendar Planner", blurb: "Kalender konten bulanan: libur nasional, Ramadan, Nyepi, musim liburan.", pillar: "AI Marketing", active: true, scene: { setting: "Meja perencanaan" }, ratio: 0.5667, eyes: [{ x: 34.61, y: 34.86, w: 15.17, h: 8.17, skin: "#d5a27e" }, { x: 68.7, y: 34.23, w: 13.65, h: 7.74, skin: "#d5a27e" }], sceneImage: true, sceneEyes: [{ x: 40, y: 39, w: 10, h: 9.5, skin: "#d5a27e" }, { x: 55.5, y: 38.5, w: 9, h: 9, skin: "#d5a27e" }] },
  { id: "campaign-planner", name: "Ayu", role: "AI Campaign Planner", blurb: "Rencana kampanye musiman: Lebaran, Nataru, long weekend.", pillar: "AI Marketing", active: true, scene: { setting: "Ruang rapat kampanye" }, ratio: 1.0444, eyes: [{ x: 37.57, y: 27.59, w: 6.93, h: 7.24, skin: "#b68b6e" }, { x: 53.27, y: 27.59, w: 6.93, h: 7.24, skin: "#b68b6e" }], sceneImage: true, sceneEyes: [{ x: 44.5, y: 38.5, w: 8, h: 8, skin: "#b68b6e" }, { x: 57, y: 38.5, w: 8, h: 8, skin: "#b68b6e" }] },
  { id: "localizer", name: "Nara", role: "AI Localizer", blurb: "Konten bilingual ID ⇄ EN yang terasa natural, bukan terjemahan kaku.", pillar: "AI Marketing", active: true, scene: { setting: "Lobi hotel butik" }, ratio: 0.6211, eyes: [{ x: 41.39, y: 34.1, w: 10.75, h: 5.64, skin: "#c69273" }, { x: 67.36, y: 34.1, w: 9.55, h: 5.57, skin: "#c69273" }], sceneImage: true, sceneEyes: [{ x: 43.0, y: 37.5, w: 9, h: 7.6, skin: "#c69273" }, { x: 58, y: 37.5, w: 8, h: 7.5, skin: "#c69273" }] },
  { id: "image-creator", name: "Nova", role: "AI Image Creator", blurb: "Gambar promo, banner, dan visual feed sesuai warna merek Anda.", pillar: "AI Marketing", active: false, scene: { setting: "Studio foto" }, ratio: 0.6778, eyes: [{ x: 37.01, y: 30.47, w: 10.52, h: 6.75, skin: "#d0a282" }, { x: 64.93, y: 29.92, w: 10.4, h: 6.75, skin: "#d0a282" }], sceneImage: true, sceneEyes: [{ x: 40, y: 32, w: 9.5, h: 9, skin: "#d0a282" }, { x: 57.4, y: 31.5, w: 9.4, h: 9, skin: "#d0a282" }] },
  { id: "video-creator", name: "Aruna", role: "AI Video Creator", blurb: "Video AI pendek untuk Reels & TikTok, siap Anda setujui.", pillar: "AI Marketing", active: false, scene: { setting: "Set syuting mini" }, ratio: 0.5356, eyes: [{ x: 34.24, y: 36.83, w: 14.24, h: 6.87, skin: "#cb8e61" }, { x: 64.17, y: 36.28, w: 13.38, h: 6.87, skin: "#cb8e61" }], sceneImage: true, sceneEyes: [{ x: 43, y: 39, w: 10, h: 9, skin: "#cb8e61" }, { x: 57.5, y: 38.5, w: 9.4, h: 9, skin: "#cb8e61" }] },
  { id: "report-builder", name: "Intan", role: "AI Report Builder", blurb: "Laporan bulanan satu halaman, angka apa adanya dari insight platform.", pillar: "AI Business Intelligence", active: true, scene: { setting: "Meja analitik" }, ratio: 0.4256, eyes: [{ x: 32.72, y: 34.43, w: 12.6, h: 5.36, skin: "#cc9c81" }, { x: 70.22, y: 34.43, w: 13.44, h: 5.44, skin: "#cc9c81" }], sceneImage: true, sceneEyes: [{ x: 42, y: 33.5, w: 7.5, h: 7.5, skin: "#cc9c81" }, { x: 57.4, y: 33.5, w: 8, h: 7.6, skin: "#cc9c81" }] },
  { id: "data-analyst", name: "Dara", role: "AI Data Analyst & Annotator", blurb: "Baca file penjualan, beri insight, dan labeli data dalam jumlah besar.", pillar: "AI Business Intelligence", active: false, scene: { setting: "Ruang data" }, ratio: 0.5222, eyes: [{ x: 36.49, y: 31.18, w: 13.85, h: 6.86, skin: "#cf9d87" }, { x: 68.61, y: 31.18, w: 13.15, h: 6.86, skin: "#cf9d87" }], sceneImage: true, sceneEyes: [{ x: 42, y: 32.5, w: 10, h: 9.5, skin: "#cf9d87" }, { x: 58, y: 32.5, w: 9.5, h: 9.5, skin: "#cf9d87" }] },
  { id: "sales-assistant", name: "Galih", role: "AI Sales Assistant", blurb: "Draft balasan inquiry & penawaran untuk tim sales Anda.", pillar: "AI Sales", active: false, scene: { setting: "Front office hotel" }, ratio: 0.6478, eyes: [{ x: 30.56, y: 39.25, w: 13.31, h: 7.76, skin: "#cda684" }, { x: 68.39, y: 39.25, w: 14.11, h: 8.28, skin: "#cda684" }], sceneImage: true, sceneEyes: [{ x: 40, y: 41.5, w: 10, h: 9, skin: "#cda684" }, { x: 59.6, y: 41.5, w: 10.6, h: 9.6, skin: "#cda684" }] },
  { id: "guest-messenger", name: "Sari", role: "AI Guest Messenger", blurb: "Pesan pra-kedatangan & after-stay yang personal untuk tamu.", pillar: "AI Sales", active: false, scene: { setting: "Meja concierge villa" }, ratio: 0.4811, eyes: [{ x: 24.92, y: 30.6, w: 14.65, h: 6.62, skin: "#c48f64" }, { x: 61.28, y: 30.6, w: 14.65, h: 6.62, skin: "#c48f64" }], sceneImage: true, sceneEyes: [{ x: 40.4, y: 38, w: 8.3, h: 7.8, skin: "#c48f64" }, { x: 54.6, y: 38, w: 8.3, h: 7.8, skin: "#c48f64" }] },
  { id: "sop-writer", name: "Teguh", role: "AI Integration & Developer", blurb: "SOP, integrasi Google Sheets & toko online, dan landing page sederhana.", pillar: "AI Admin", active: false, scene: { setting: "Ruang operasional" }, ratio: 0.5689, eyes: [{ x: 32.13, y: 40.34, w: 13.79, h: 8.23, skin: "#dba889" }, { x: 65.59, y: 40.34, w: 13.39, h: 8.23, skin: "#dba889" }], sceneImage: true, sceneEyes: [{ x: 39.9, y: 41.1, w: 10.4, h: 10.9, skin: "#dba889" }, { x: 57.3, y: 41.1, w: 10.1, h: 10.9, skin: "#dba889" }] },
];

// Awalan aset public: "/" di produksi, "./" pada build pratinjau (base relatif). Node (prerender) tidak punya import.meta.env.
export const BASE = import.meta.env?.BASE_URL ?? "/";
export const avatar = (id: string) => `${BASE}agents/${id}.webp`;
// Figur full-body tanpa latar (dipotong dari gambar adegan tampak depan, latar dihapus).
export const figure = (id: string) => `${BASE}agents/full/${id}.webp`;
export const sceneImage = (id: string) => `${BASE}agents/scene/${id}.webp`;

/** Halaman detail agen: /agen/<slug> (slug = nama kecil, mis. /agen/tara). */
export const agentUrl = (a: Agent) => `/agen/${a.name.toLowerCase()}`;
export const agentBySlug = (slug: string) => agents.find((a) => a.name.toLowerCase() === slug.toLowerCase());
