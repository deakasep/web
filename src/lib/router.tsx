import { createContext, useCallback, useContext, useEffect, useMemo, useState, type AnchorHTMLAttributes, type ReactNode } from "react";

/**
 * Router kecil tanpa dependency (History API). Semua <a href="/..."> internal di seluruh halaman otomatis jadi
 * navigasi SPA lewat satu listener klik; link "#bagian" tetap scroll biasa, link "/#bagian" pindah ke beranda lalu
 * scroll. Server (nginx) cukup mengirim index.html untuk path yang tidak ada (docs/deploy.md), dan build juga
 * menulis HTML per rute (scripts/prerender-routes.mjs) supaya hosting statis apa pun langsung jalan.
 */

type RouterValue = { path: string; navigate: (to: string, opts?: { replace?: boolean }) => void };

const RouterContext = createContext<RouterValue>({ path: "/", navigate: () => {} });

/**
 * Mode pratinjau (build dengan VITE_MEMORY_ROUTER=1, mis. artifact claude.ai): rute disimpan di memori, tanpa History
 * API dan tanpa mengubah URL, karena halaman berjalan di dalam frame yang path-nya bukan milik situs.
 */
const MEMORY = import.meta.env.VITE_MEMORY_ROUTER === "1";

const normalize = (p: string) => (p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p) || "/";

function scrollToHash(hash: string, smooth: boolean) {
  if (!hash) return false;
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return false;
  el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  return true;
}

export function Router({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => (MEMORY ? "/" : normalize(window.location.pathname)));

  const navigate = useCallback((to: string, opts: { replace?: boolean } = {}) => {
    const url = new URL(to, MEMORY ? "https://pratinjau.local/" : window.location.href);
    if (MEMORY) {
      const next = normalize(url.pathname);
      setPath((cur) => {
        const same = cur === next;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            if (!scrollToHash(url.hash, same)) window.scrollTo({ top: 0, behavior: "auto" });
          }),
        );
        return next;
      });
      return;
    }
    const same = normalize(url.pathname) === normalize(window.location.pathname);
    if (opts.replace) window.history.replaceState(null, "", url);
    else window.history.pushState(null, "", url);
    setPath(normalize(url.pathname));
    // Tunggu halaman baru dirender, lalu ke #bagian atau ke atas.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (!scrollToHash(url.hash, same)) window.scrollTo({ top: 0, behavior: "auto" });
      }),
    );
  }, []);

  useEffect(() => {
    const onPop = () => setPath(normalize(window.location.pathname));
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target || a.hasAttribute("download") || a.getAttribute("rel")?.includes("external")) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (MEMORY) {
        // Link internal di pratinjau selalu diawali "/" (mis. "/harga", "/agen/tara", "/#faq").
        if (!href.startsWith("/") || href.startsWith("//")) return;
        e.preventDefault();
        navigate(href);
        return;
      }
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      e.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    };
    window.addEventListener("popstate", onPop);
    document.addEventListener("click", onClick);
    // Halaman dibuka langsung dengan #bagian (mis. /#faq).
    if (window.location.hash) requestAnimationFrame(() => scrollToHash(window.location.hash, false));
    return () => {
      window.removeEventListener("popstate", onPop);
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
