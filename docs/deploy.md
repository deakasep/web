# Pasang situs CLAU AI di VPS

Situs ini statis: hasil `npm run build` (folder `dist/`) cukup disajikan nginx. Tidak butuh database atau proses Node yang terus berjalan. Dashboard klien (repo `clau-agent`) dipasang terpisah di subdomain `app.`.

Perkiraan waktu: 30–45 menit pertama kali, lalu ±1 menit setiap update.

## 0. Yang perlu disiapkan

| Item | Contoh | Catatan |
|---|---|---|
| Domain | `domain-anda.com` | Kartu ClickUp TASK-002 |
| VPS Ubuntu 22.04/24.04 | 1 vCPU, 1–4 GB RAM | Bisa satu VPS dengan dashboard |
| DNS | `A @ → IP VPS`, `A www → IP VPS`, `A app → IP VPS` | Diatur di panel domain |
| Data usaha | nama usaha, alamat, email, WhatsApp | Untuk `.env` |

## 1. Masuk ke VPS dan pasang paket dasar

```bash
sudo apt update && sudo apt install -y nginx git rsync certbot python3-certbot-nginx
```

## 2. Pasang Node.js 22

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # harus v22.x atau lebih baru
```

## 3. Ambil kode dan isi konfigurasi

```bash
sudo mkdir -p /opt/clau && sudo chown "$USER" /opt/clau
git clone https://github.com/deakasep/web.git /opt/clau/web
cd /opt/clau/web
cp .env.example .env
nano .env
```

Isi minimal: `VITE_SITE_URL`, `VITE_APP_URL`, `VITE_LEGAL_NAME`, `VITE_ADDRESS`, `VITE_CONTACT_EMAIL`, `VITE_PRIVACY_EMAIL`, dan `VITE_WHATSAPP` bila ada. Penjelasan tiap baris ada di `.env.example`. File `.env` tidak pernah di-commit.

## 4. Build dan salin ke folder web

```bash
bash deploy/deploy.sh
```

Skrip ini menjalankan `git pull`, `npm ci`, `npm run build`, lalu menyalin `dist/` ke `/var/www/clau-web`.

## 5. Aktifkan nginx

```bash
sudo cp deploy/nginx-clau-web.conf /etc/nginx/sites-available/clau-web
sudo sed -i 's/domain-anda.com/DOMAIN-ASLI-ANDA/g' /etc/nginx/sites-available/clau-web
sudo ln -s /etc/nginx/sites-available/clau-web /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

## 6. HTTPS gratis (Let's Encrypt)

```bash
sudo certbot --nginx -d DOMAIN-ASLI-ANDA -d www.DOMAIN-ASLI-ANDA
```

Certbot memperpanjang sertifikat otomatis.

## 7. Cek

- `https://DOMAIN-ASLI-ANDA/` beranda tampil
- `https://DOMAIN-ASLI-ANDA/agen/tara` langsung terbuka (bukan 404)
- `https://DOMAIN-ASLI-ANDA/halaman-acak` menampilkan halaman 404 situs
- `https://DOMAIN-ASLI-ANDA/sitemap.xml` memakai domain asli
- Tombol **Mulai sekarang** mengarah ke `https://app.DOMAIN-ASLI-ANDA/daftar`

## Update berikutnya

Setelah PR di-merge ke `main`:

```bash
cd /opt/clau/web && bash deploy/deploy.sh
```

## Sebelum menerima pembayaran

- [ ] Kebijakan Privasi & Syarat Layanan ditinjau konsultan hukum, lalu `VITE_LEGAL_REVIEWED=1` dan `VITE_LEGAL_EFFECTIVE_DATE` diisi
- [ ] Bagian bertanda `[ … ]` di halaman legal diisi (kebijakan refund, status PPN, penyedia AI): `src/pages/legal/*.tsx`
- [ ] Halaman `/kebijakan-privasi` dan `/penghapusan-data` dipakai sebagai URL di Meta App Review, TikTok, dan Midtrans
- [ ] Email di `.env` benar-benar bisa menerima pesan
