import { createContext, useCallback, useContext, useEffect, useMemo, useState, type AnchorHTMLAttributes, type ReactNode } from "react";

/**
 * Router kecil tanpa dependency (History API). Semua <a href="/..."> internal di seluruh halaman otomatis jadi
 * navigasi SPA lewat satu listener klik; link "#bagian" tetap scroll biasa, link "/#bagian" pindah ke beranda lalu
 * scroll. Server (nginx) cukup mengirim index.html untuk path yang tidak ada (docs/deploy.md), dan build juga
 * menulis HTML per rute (scripts/prerender-routes.mjs) supaya hosting statis apa pun langsung jalan.
 */

type RouterValue = { path: string; navigate: (to: string, opts?: { replace?: boolean }) => void };

const RouterContext = createContext<RouterValue>({ path: "/", navigate: () => {} });

const normalize = (p: string) => (p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p) || "/";

/**
 * Mode hash (VITE_HASH_ROUTER=1) untuk build pratinjau yang dibuka dari subfolder/berkas statis tanpa server:
 * rute di `#/harga`, bagian halaman di `#/harga#tarif`. Produksi memakai path biasa.
 */
const HASH = import.meta.env.VITE_HASH_ROUTER === "1";

function readLocation(): { path: string; hash: string } {
  if (!HASH) return { path: normalize(window.location.pathname), hash: window.location.hash };
  const raw = window.location.hash.startsWith("#/") ? window.location.hash.slice(1) : "/";
  const i = raw.indexOf("#", 1);
  return { path: normalize(i === -1 ? raw : raw.slice(0, i)), hash: i === -1 ? "" : raw.slice(i) };
}

function scrollToHash(hash: string, smooth: boolean) {
  if (!hash) return false;
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return false;
  el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  return true;
}

export function Router({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => readLocation().path);

  const navigate = useCallback((to: string, opts: { replace?: boolean } = {}) => {
    const url = new URL(to, HASH ? "http://hash.local" + readLocation().path : window.location.href);
    const same = normalize(url.pathname) === readLocation().path;
    const target = HASH ? `${window.location.pathname}${window.location.search}#${normalize(url.pathname)}${url.hash}` : url;
    if (opts.replace) window.history.replaceState(null, "", target);
    else window.history.pushState(null, "", target);
    setPath(normalize(url.pathname));
    // Tunggu halaman baru dirender, lalu ke #bagian atau ke atas.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (!scrollToHash(url.hash, same)) window.scrollTo({ top: 0, behavior: "auto" });
      }),
    );
  }, []);

  useEffect(() => {
    const onPop = () => setPath(readLocation().path);
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target || a.hasAttribute("download") || a.getAttribute("rel")?.includes("external")) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (href.startsWith("#")) {
        // Mode hash: "#bagian" tidak boleh menimpa rute di hash; scroll saja.
        if (HASH) {
          e.preventDefault();
          scrollToHash(href, true);
        }
        return;
      }
      if (HASH && /^[a-z][a-z0-9+.-]*:/i.test(href)) return; // tautan luar
      const url = new URL(href, HASH ? "http://hash.local" : window.location.href);
      if (!HASH && url.origin !== window.location.origin) return;
      e.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    };
    window.addEventListener("popstate", onPop);
    if (HASH) window.addEventListener("hashchange", onPop);
    document.addEventListener("click", onClick);
    // Halaman dibuka langsung dengan #bagian (mis. /#faq).
    const initial = readLocation().hash;
    if (initial) requestAnimationFrame(() => scrollToHash(initial, false));
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", onPop);
      document.removeEventListener("click", onClick);
    };
  }, [navigate]);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export const useRouter = () => useContext(RouterContext);

/** `/agen/:slug` → { slug } bila cocok, selain itu null. */
export function matchPath(pattern: string, path: string): Record<string, string> | null {
  const a = normalize(pattern).split("/");
  const b = normalize(path).split("/");
  if (a.length !== b.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith(":")) params[a[i].slice(1)] = decodeURIComponent(b[i]);
    else if (a[i] !== b[i]) return null;
  }
  return params;
}

/** Link biasa; navigasinya ditangani listener di Router. `aria-current` otomatis untuk halaman aktif. */
export function Link({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { path } = useRouter();
  const active = !href.includes("#") && normalize(href) === path;
  return (
    <a href={href} aria-current={active ? "page" : undefined} {...rest}>
      {children}
    </a>
  );
}
