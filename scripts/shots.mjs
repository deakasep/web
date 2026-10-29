// SEMENTARA (branch pratinjau): screenshot HP & tablet dengan layar sentuh untuk cek animasi.
import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";
const out = process.argv[2] || "shots";
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const targets = [
  ["hp", devices["iPhone 13"]],
  ["tab", devices["iPad Mini"]],
];
const errors = [];
for (const [name, dev] of targets) {
  const ctx = await browser.newContext({ ...dev });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${name}: ${e.message}`));
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${out}/${name}-hero-a.png` });
  const t1 = await page.evaluate(() => [...document.querySelectorAll("[style*='rotateY'], [style*='rotate']")].slice(0, 3).map((e) => e.style.transform).join(" | "));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${out}/${name}-hero-b.png` });
  const t2 = await page.evaluate(() => [...document.querySelectorAll("[style*='rotateY'], [style*='rotate']")].slice(0, 3).map((e) => e.style.transform).join(" | "));
  console.log(name, "moving:", t1 !== t2, "\n  ", t1, "\n  ", t2);
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log(name, "scrollWidth", sw, "viewport", dev.viewport.width);
  await page.locator("#agent").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${out}/${name}-agents.png` });
  await ctx.close();
}
console.log("errors:", errors.length ? errors : "none");
await browser.close();
