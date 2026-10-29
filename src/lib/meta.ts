import { useEffect } from "react";
import { SITE } from "@/data/site";

function setMeta(selector: string, attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

/** Judul, deskripsi, canonical & Open Graph per halaman (HTML awal per rute dibuat scripts/prerender-routes.mjs). */
export function usePageMeta(title: string, description: string, path: string) {
  useEffect(() => {
    document.title = title;
    const url = SITE.url.replace(/\/$/, "") + (path === "/" ? "/" : path);
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;
  }, [title, description, path]);
}
