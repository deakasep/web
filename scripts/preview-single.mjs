// Pratinjau: gabungkan hasil `vite build` (VITE_BASE=./ VITE_HASH_ROUTER=1) menjadi satu halaman HTML tanpa
// <html>/<head> (CSS & JS di-inline), gambar tetap berkas terpisah dengan path relatif. Bukan untuk produksi.
import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const dir = process.argv[2] ?? "preview";
const html = await readFile(join(dir, "index.html"), "utf8");
const assets = await readdir(join(dir, "assets"));
const css = (await Promise.all(assets.filter((f) => f.endsWith(".css")).map((f) => readFile(join(dir, "assets", f), "utf8")))).join("\n");
const jsFiles = assets.filter((f) => f.endsWith(".js"));
if (jsFiles.length !== 1) throw new Error(`harus satu bundle JS, dapat ${jsFiles.length}: ${jsFiles}`);
const js = (await readFile(join(dir, "assets", jsFiles[0]), "utf8")).replace(/<\/script/gi, "<\\/script");
const fonts = html.match(/<link[^>]+fonts\.googleapis\.com\/css2[^>]*>/s)?.[0] ?? "";
const page = `<title>CLAU AI Website</title>
<meta name="theme-color" content="#05080D">
${fonts}
<style>
${css}
</style>
<div id="root"></div>
<script type="module">
${js}
</script>
`;
await writeFile(join(dir, "page.html"), page);
console.log(`page.html ${(page.length / 1024).toFixed(0)} KB`);
