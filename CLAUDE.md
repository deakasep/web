# CLAUDE.md — claw-web

Baca [AGENTS.md](./AGENTS.md): berlaku sama untuk Claude, ChatGPT/Codex, dan agent lain.

Ringkas:
- **Selalu backup:** commit + push semua hasil kerja ke branch kerja di GitHub, setiap bagian selesai.
- Branch `claude/…` → PR ke `main` → CI `build` + `audit` hijau → `auto-merge.yml` me-merge otomatis (exact-head guard). Opt-out: draft / label `no-auto-merge`.
- `npm run build` dan `npm audit --audit-level=high` wajib lulus sebelum push.

## Hemat kuota: satu chat per topik (perintah owner, 2026-11-01)

- **Satu chat = satu topik/tugas** (mis. web CLAU, JASA, video agen). Chat panjang membuat setiap balasan membaca ulang seluruh riwayat, jadi kuota cepat habis.
- **Di akhir setiap tugas** perbarui file status (CLAU: [content `docs/status.md`](https://github.com/deakasep/content/blob/main/docs/status.md); JASA: `jasa/STATUS.md`) supaya chat baru langsung nyambung.
- **Chat baru** cukup dibuka owner dengan "lanjutkan dari status": AI membaca file status dulu, tidak menanyakan ulang hal yang sudah diputuskan.
- Bila chat sudah panjang atau topik berganti, AI menyarankan owner membuka chat baru (satu kalimat), **setelah** status diperbarui dan semua kerja di-push.
