// Setelah `vite build`: tulis dist/<rute>/index.html untuk setiap halaman (judul, deskripsi, canonical, Open Graph
// sudah benar sebelum JavaScript jalan), plus 404.html, sitemap.xml, dan robots.txt.
// Hasilnya bisa dipasang di hosting statis apa pun; nginx cukup `try_files $uri $uri/ /index.html` (docs/deploy.md).
//
// Data dibaca langsung dari src/data/*.ts (Node 22 type stripping), jadi tidak ada daftar rute ganda.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const load = (f) => import(pathToFileURL(join(root, "src/data", f)).href);

const { pages, NOT_FOUND, BRAND } = await load("pages.ts");
const { agents } = await load("agents.ts");
const { details } = await load("agent-details.ts");

// Sama dengan src/data/site.ts: VITE_SITE_URL dari .env / environment build.
async function siteUrl() {
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL;
  for (const f of [".env.production.local", ".env.local", ".env.production", ".env"]) {
    try {
      const m = (await readFile(join(root, f), "utf8")).match(/^VITE_SITE_URL=(.+)$/m);
      if (m) return m[1].trim().replace(/^["']|["']$/g, "");
    } catch {
      /* file tidak ada */
    }
  }
  return "https://domain-anda.com";
}
const SITE_URL = (await siteUrl()).replace(/\/$/, "");

const routes = [
  ...pages,
  ...agents.map((a) => {
    const d = details[a.id];
    return {
      path: `/agen/${a.name.toLowerCase()}`,
      title: `${a.name}, ${a.role} · ${BRAND}`,
      description: d ? `${d.headline} ${a.blurb}` : a.blurb,
      priority: a.active ? 0.7 : 0.5,
    };
  }),
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const template = await readFile(join(dist, "index.html"), "utf8");

function render(r) {
  const url = SITE_URL + (r.path === "/" ? "/" : r.path);
  const head = [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(BRAND)}" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(SITE_URL)}/og-image.png" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join("\n    ");
  let html = template.replace(/<title>[\s\S]*?<\/title>/, "").replace(/<meta\s+name="description"[\s\S]*?\/>/, "");
  if (!html.includes("<!--meta-->")) throw new Error("index.html harus memuat penanda <!--meta-->");
  return html.replace("<!--meta-->", head);
}

for (const r of routes) {
  const out = r.path === "/" ? join(dist, "index.html") : join(dist, r.path.slice(1), "index.html");
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, render(r));
}
await writeFile(join(dist, "404.html"), render(NOT_FOUND).replace('<link rel="canonical"', '<meta name="robots" content="noindex" />\n    <link rel="canonical"'));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE_URL}${r.path === "/" ? "/" : r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority}</priority></url>`).join("\n")}
</urlset>
`;
await writeFile(join(dist, "sitemap.xml"), sitemap);
await writeFile(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`prerender: ${routes.length} rute + 404.html, sitemap.xml, robots.txt (${SITE_URL})`);
