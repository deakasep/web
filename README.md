# claw-web

Landing page **CLAU AI**: platform karyawan AI berlangganan untuk UMKM & hospitality Indonesia (model langganan + kredit, clau-core AI-CONSTITUTION v4.0.0).

## Stack

React 19 + Vite + TypeScript · Tailwind CSS v4 · Motion (`import { motion } from "motion/react"`) · lucide-react

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # typecheck + build ke dist/
```

## Struktur

Situs multi-halaman dengan router ringan sendiri (`src/lib/router.tsx`, History API, tanpa dependency tambahan).

| Rute | File | Isi |
|---|---|---|
| `/` | `src/pages/Home.tsx` | Hero → Trusted By → Showcase → carousel agen → Contoh kerja → Desk Scene → Keamanan → Cara kerja → Harga → FAQ → CTA |
| `/agen` | `src/pages/AgentsPage.tsx` | Semua agen, filter kategori & status |
| `/agen/:nama` | `src/pages/AgentPage.tsx` | Detail agen: tugas, hasil, contoh SIMULASI, batas, tarif kredit, cara kerja |
| `/harga` | `src/pages/PricingPage.tsx` | Paket, top up, tarif kredit (`#tarif`), manual vs CLAU, FAQ |
| `/brain-ai` · `/integrasi` | `src/pages/BrainPage.tsx` · `IntegrationsPage.tsx` | Memori bisnis bersama · status integrasi kanal & pembayaran |
| `/kebijakan-privasi` · `/syarat-layanan` · `/penghapusan-data` | `src/pages/legal/` | Draf dokumen legal (label Draf sampai `VITE_LEGAL_REVIEWED=1`) |

| Path | Isi |
|---|---|
| `src/data/site.ts` | Nama usaha, kontak, URL dashboard: **placeholder**, diisi lewat `.env` (`.env.example`) |
| `src/data/pages.ts` | Judul & deskripsi tiap halaman (dipakai halaman dan prerender) |
| `src/data/agents.ts` · `agent-details.ts` | Daftar agen (ikut `clau-agent/agents/registry.json`) · isi halaman agen (dari persona clau-agent) |
| `src/data/pricing.ts` | Angka dari `clau-market/commercial/pricing.md` |
| `src/components/sections/` | Section beranda + Navbar (mega menu, menu HP) & Footer |
| `src/components/page/PageHero.tsx` · `ui/agent-visual.tsx` | Hero halaman dalam · ruangan + figur agen |
| `scripts/prerender-routes.mjs` | Setelah build: HTML per rute (judul/meta benar), `404.html`, `sitemap.xml`, `robots.txt` |
| `deploy/` · `docs/deploy.md` | Contoh nginx, skrip pasang/update VPS, panduan langkah demi langkah |
| `public/agents/` · `public/scenes/` · `public/og-image.png` | Avatar, figur, latar, gambar share |

## Untuk AI agent

Baca [AGENTS.md](./AGENTS.md): selalu backup ke repo, branch AI → PR → CI hijau → merge otomatis (`.github/workflows/auto-merge.yml`).

## Aturan isi

- Harga paket, top up, dan tarif kredit **ditampilkan** dari `src/data/pricing.ts`, yang wajib sama dengan `clau-market/commercial/pricing.md`. Layanan terkelola tetap lewat proposal.
- Level approval & penanda risiko mengikuti `clau-market/rules/08`.
- Tanpa logo/testimoni klien sampai ada klien nyata yang mengizinkan; contoh data berlabel SIMULASI.
- Avatar = karakter AI fiktif; agent selalu ditampilkan sebagai AI.

## Sebelum tayang publik (NEXT ACTION)

- [ ] Isi `CONTACT_URL` di `src/data/site.ts` dengan kontak resmi (WhatsApp Business / form).
- [ ] Cek nama & merek CLAU di DJKI, domain, handle sosmed (brand-guideline § 1).
- [ ] Review copywriting oleh Pak Indra / Dea Karisna.
