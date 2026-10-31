// Sumber: clau-agent/agents/registry.json (nama, pilar, status). Avatar: crop 256×256 dari repo yang sama.
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
  { id: "caption-writer", name: "Tara", role: "AI Caption Writer", blurb: "Caption feed yang hangat, jujur, dan sesuai voice brand Anda.", pillar: "AI Marketing", active: true, scene: { setting: "Kafe sore hari" }, ratio: 0.6611, eyes: [{ x: 31.12, y: 46.24, w: 13.07, h: 8.64, skin: "#deaa71" }, { x: 68.21, y: 46.18, w: 12.89, h: 8.52, skin: "#deaa71" }], sceneImage: true, sceneEyes: [{ x: 34.5, y: 44.5, w: 12.2, h: 11, skin: "#c19068" }, { x: 58.8, y: 45, w: 12.2, h: 11, skin: "#c19068" }] },
  { id: "reel-scripter", name: "Raka", role: "AI Reel Scripter", blurb: "Naskah Reels & TikTok per detik, lengkap dengan shot list.", pillar: "AI Marketing", active: true, scene: { setting: "Teras villa tepi pantai" }, ratio: 0.5522, eyes: [{ x: 33.09, y: 35.65, w: 11.95, h: 6.6, skin: "#f1b076" }, { x: 66.59, y: 36.81, w: 11.73, h: 6.48, skin: "#f1b076" }], sceneImage: true, sceneEyes: [{ x: 41.3, y: 35.8, w: 11, h: 11.4, skin: "#ae775b" }, { x: 60.6, y: 35.8, w: 11, h: 11.4, skin: "#ae775b" }] },
  { id: "story-writer", name: "Sekar", role: "AI Story Writer", blurb: "Set Stories 3 frame untuk promo, event, dan behind the scene.", pillar: "AI Marketing", active: true, scene: { setting: "Kamar villa Bali" }, ratio: 0.4389, eyes: [{ x: 30.97, y: 32.73, w: 14.76, h: 6.48, skin: "#f7c08c" }, { x: 68.07, y: 32.57, w: 13.94, h: 6.12, skin: "#f6c795" }], sceneImage: true, sceneEyes: [{ x: 38, y: 36.5, w: 9.8, h: 9.8, skin: "#b47b5a" }, { x: 55.1, y: 36.6, w: 8.5, h: 9.6, skin: "#b47b5a" }] },
  { id: "listing-writer", name: "Bayu", role: "AI OTA Listing Writer", blurb: "Deskripsi produk, marketplace, OTA & website yang akurat dan mudah ditemukan.", pillar: "AI Marketing", active: true, scene: { setting: "Teras villa & kolam" }, ratio: 0.5233, eyes: [{ x: 33.04, y: 39.16, w: 10.55, h: 5.52, skin: "#f5c688" }, { x: 66.86, y: 38.84, w: 11.92, h: 6.24, skin: "#f0bd7c" }], sceneImage: true, sceneEyes: [{ x: 44.2, y: 34.4, w: 9, h: 8.4, skin: "#c59273" }, { x: 58, y: 34.8, w: 8, h: 8, skin: "#c59273" }] },
  { id: "review-responder", name: "Laras", role: "AI Review Responder", blurb: "Draft balasan review Google & OTA. Review negatif ke owner.", pillar: "AI Marketing", active: true, scene: { setting: "Meja resepsionis hotel" }, ratio: 0.6189, eyes: [{ x: 42.42, y: 37.5, w: 10.86, h: 6.72, skin: "#f5ce9b" }, { x: 71.81, y: 37.19, w: 11.44, h: 7.08, skin: "#f5c996" }], sceneImage: true, sceneEyes: [{ x: 43.6, y: 42.3, w: 8.4, h: 7.6, skin: "#d39c78" }, { x: 59.5, y: 42.3, w: 8, h: 7.5, skin: "#d39c78" }] },
  { id: "calendar-planner", name: "Dimas", role: "AI Calendar Planner", blurb: "Kalender konten bulanan: libur nasional, Ramadan, Nyepi, musim liburan.", pillar: "AI Marketing", active: true, scene: { setting: "Meja perencanaan" }, ratio: 0.5611, eyes: [{ x: 32.1, y: 40.97, w: 11.55, h: 6.48, skin: "#e8a265" }, { x: 68.2, y: 40.54, w: 11.98, h: 6.72, skin: "#e4a065" }], sceneImage: true, sceneEyes: [{ x: 40, y: 39, w: 10, h: 9.5, skin: "#d5a27e" }, { x: 55.5, y: 38.5, w: 9, h: 9, skin: "#d5a27e" }] },
  { id: "campaign-planner", name: "Ayu", role: "AI Campaign Planner", blurb: "Rencana kampanye musiman: Lebaran, Nataru, long weekend.", pillar: "AI Marketing", active: true, scene: { setting: "Ruang rapat kampanye" }, ratio: 0.6044, eyes: [{ x: 38.59, y: 35.14, w: 10.92, h: 6.6, skin: "#ffd290" }, { x: 69.34, y: 34.34, w: 10.52, h: 6.36, skin: "#fed495" }], sceneImage: true, sceneEyes: [{ x: 44.5, y: 38.5, w: 8, h: 8, skin: "#b68b6e" }, { x: 57, y: 38.5, w: 8, h: 8, skin: "#b68b6e" }] },
  { id: "localizer", name: "Nara", role: "AI Localizer", blurb: "Konten bilingual ID ⇄ EN yang terasa natural, bukan terjemahan kaku.", pillar: "AI Marketing", active: true, scene: { setting: "Lobi hotel butik" }, ratio: 0.88, eyes: [{ x: 39.3, y: 36.6, w: 7.23, h: 6.36, skin: "#edb578" }, { x: 59.69, y: 36.69, w: 7.23, h: 6.36, skin: "#edb578" }], sceneImage: true, sceneEyes: [{ x: 43.0, y: 37.5, w: 9, h: 7.6, skin: "#c69273" }, { x: 58, y: 37.5, w: 8, h: 7.5, skin: "#c69273" }] },
  { id: "image-creator", name: "Nova", role: "AI Image Creator", blurb: "Gambar promo, banner, dan visual feed sesuai warna merek Anda.", pillar: "AI Marketing", active: false, scene: { setting: "Studio foto" }, ratio: 0.4989, sceneImage: true, sceneEyes: [{ x: 40, y: 32, w: 9.5, h: 9, skin: "#d0a282" }, { x: 57.4, y: 31.5, w: 9.4, h: 9, skin: "#d0a282" }] },
  { id: "video-creator", name: "Aruna", role: "AI Video Creator", blurb: "Video AI pendek untuk Reels & TikTok, siap Anda setujui.", pillar: "AI Marketing", active: false, scene: { setting: "Set syuting mini" }, ratio: 0.6322, sceneImage: true, sceneEyes: [{ x: 43, y: 39, w: 10, h: 9, skin: "#cb8e61" }, { x: 57.5, y: 38.5, w: 9.4, h: 9, skin: "#cb8e61" }] },
  { id: "report-builder", name: "Intan", role: "AI Report Builder", blurb: "Laporan bulanan satu halaman, angka apa adanya dari insight platform.", pillar: "AI Business Intelligence", active: true, scene: { setting: "Meja analitik" }, ratio: 0.6111, eyes: [{ x: 20.73, y: 38.3, w: 10.21, h: 6.24, skin: "#f7c78f" }, { x: 51.71, y: 38.9, w: 11.59, h: 7.08, skin: "#f4c489" }], sceneImage: true, sceneEyes: [{ x: 42, y: 33.5, w: 7.5, h: 7.5, skin: "#cc9c81" }, { x: 57.4, y: 33.5, w: 8, h: 7.6, skin: "#cc9c81" }] },
  { id: "data-analyst", name: "Dara", role: "AI Data Analyst & Annotator", blurb: "Baca file penjualan, beri insight, dan labeli data dalam jumlah besar.", pillar: "AI Business Intelligence", active: false, scene: { setting: "Ruang data" }, ratio: 0.5022, sceneImage: true, sceneEyes: [{ x: 42, y: 32.5, w: 10, h: 9.5, skin: "#cf9d87" }, { x: 58, y: 32.5, w: 9.5, h: 9.5, skin: "#cf9d87" }] },
  { id: "sales-assistant", name: "Galih", role: "AI Sales Assistant", blurb: "Draft balasan inquiry & penawaran untuk tim sales Anda.", pillar: "AI Sales", active: false, scene: { setting: "Front office hotel" }, ratio: 0.4667, eyes: [{ x: 31.5, y: 34.16, w: 10.8, h: 5.04, skin: "#fad49a" }, { x: 66.54, y: 33.8, w: 11.57, h: 5.4, skin: "#f8d49a" }], sceneImage: true, sceneEyes: [{ x: 40, y: 41.5, w: 10, h: 9, skin: "#cda684" }, { x: 59.6, y: 41.5, w: 10.6, h: 9.6, skin: "#cda684" }] },
  { id: "guest-messenger", name: "Sari", role: "AI Guest Messenger", blurb: "Pesan pra-kedatangan & after-stay yang personal untuk tamu.", pillar: "AI Sales", active: false, scene: { setting: "Meja concierge villa" }, ratio: 0.5322, eyes: [{ x: 34.72, y: 34.99, w: 11.72, h: 6.24, skin: "#fbcb94" }, { x: 69.0, y: 34.88, w: 12.4, h: 6.6, skin: "#f3c189" }], sceneImage: true, sceneEyes: [{ x: 40.4, y: 38, w: 8.3, h: 7.8, skin: "#c48f64" }, { x: 54.6, y: 38, w: 8.3, h: 7.8, skin: "#c48f64" }] },
  { id: "sop-writer", name: "Teguh", role: "AI Integration & Developer", blurb: "SOP, integrasi Google Sheets & toko online, dan landing page sederhana.", pillar: "AI Admin", active: false, scene: { setting: "Ruang operasional" }, ratio: 0.5111, eyes: [{ x: 33.05, y: 32.42, w: 10.33, h: 5.28, skin: "#fddaa8" }, { x: 66.63, y: 32.84, w: 9.86, h: 5.04, skin: "#fbdaa8" }], sceneImage: true, sceneEyes: [{ x: 39.9, y: 41.1, w: 10.4, h: 10.9, skin: "#dba889" }, { x: 57.3, y: 41.1, w: 10.1, h: 10.9, skin: "#dba889" }] },
];

// Awalan aset public: "/" di produksi, "./" pada build pratinjau (base relatif). Node (prerender) tidak punya import.meta.env.
export const BASE = import.meta.env?.BASE_URL ?? "/";
export const avatar = (id: string) => `${BASE}agents/${id}.webp`;
// Figur full-body tanpa latar (dipotong dari master clau-agent/agents/avatars).
export const figure = (id: string) => `${BASE}agents/full/${id}.webp`;
export const sceneImage = (id: string) => `${BASE}agents/scene/${id}.webp`;

/** Halaman detail agen: /agen/<slug> (slug = nama kecil, mis. /agen/tara). */
export const agentUrl = (a: Agent) => `/agen/${a.name.toLowerCase()}`;
export const agentBySlug = (slug: string) => agents.find((a) => a.name.toLowerCase() === slug.toLowerCase());
