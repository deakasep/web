#!/usr/bin/env bash
# Pasang / perbarui situs CLAU AI di VPS (Ubuntu). Jalankan sebagai user biasa dari folder repo:  bash deploy/deploy.sh
# (git & build jalan sebagai user; hanya salin file & reload nginx yang memakai sudo)
# Sekali pakai pertama: buat .env dari .env.example dan isi domain + kontak.
set -euo pipefail

TARGET=/var/www/clau-web
cd "$(dirname "$0")/.."

[ -f .env ] || { echo "Buat .env dulu: cp .env.example .env lalu isi nilainya"; exit 1; }
command -v node >/dev/null || { echo "Node.js 22 belum terpasang (lihat docs/deploy.md langkah 2)"; exit 1; }
node -e 'process.exit(+process.versions.node.split(".")[0] >= 22 ? 0 : 1)' || { echo "Butuh Node.js 22 atau lebih baru"; exit 1; }

git pull --ff-only
npm ci --ignore-scripts
npm run build

sudo mkdir -p "$TARGET"
sudo rsync -a --delete dist/ "$TARGET/"
echo "Situs terpasang di $TARGET"

if command -v nginx >/dev/null; then
  sudo nginx -t && sudo systemctl reload nginx && echo "nginx dimuat ulang"
fi
