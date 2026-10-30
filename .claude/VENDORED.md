# Komponen Claude dari pihak luar (vendored) — daftar & aturan keamanan

Semua di bawah ini **buatan Anthropic**, disalin apa adanya dan **dikunci ke commit yang sudah direview**. Tanpa hook, MCP server, skrip,
atau koneksi ke layanan luar.

| File | Sumber | Commit (review 2026-10-30) | Catatan |
|---|---|---|---|
| `.claude/skills/frontend-design/` (SKILL.md + LICENSE.txt, Apache-2.0) | anthropics/skills `skills/frontend-design` | ca45fc4 | Panduan arah visual, tipografi, satu momen animasi yang disengaja, aksesibilitas (reduced motion). Hanya teks. |

Batas jujur: skill ini memandu desain & kode (React + `motion`, CSS, SVG, WebGL bila perlu). Ia **tidak membuat gambar 4K atau render 3D**;
gambar/render 4K berasal dari aset asli (foto, render 3D tim, avatar master di repo agent `agents/avatars/`) atau alat pembuat gambar yang
dipilih pemilik.

Aturan menambah komponen: utamakan buatan Anthropic tanpa koneksi luar, baca seluruh isi, tolak hook/skrip berjaringan/akses token, salin per
proyek dengan commit tercatat di tabel ini, naik versi = review diff dulu. Ditolak 2026-10-30: `web-artifacts-builder` (untuk artifact claude.ai,
skrip memasang paket), `algorithmic-art` (memuat p5.js dari CDN pihak ketiga).
