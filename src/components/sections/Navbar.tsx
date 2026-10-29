import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { CATEGORIES, details } from "@/data/agent-details";
import { agents, agentUrl, avatar } from "@/data/agents";
import { LOGIN_URL, SIGNUP_URL, features } from "@/data/site";
import { useRouter } from "@/lib/router";
import { cn } from "@/lib/utils";

type MenuId = "agen" | "fitur" | null;

const grouped = CATEGORIES.map((c) => ({ ...c, items: agents.filter((a) => details[a.id]?.category === c.id) })).filter((g) => g.items.length);

function AgentsMenu() {
  return (
    <div className="grid gap-6 p-6 lg:grid-cols-[1fr_1fr_1fr_14rem]">
      {[grouped[0], grouped.slice(1)].map((col, ci) => (
        <div key={ci} className={cn("flex flex-col gap-5", ci === 0 && "lg:col-span-2")}>
          {(Array.isArray(col) ? col : [col]).map((g) => (
            <div key={g.id}>
              <p className="px-2 text-[11px] font-semibold tracking-[0.16em] text-slate-500 uppercase">{g.label}</p>
              <ul className={cn("mt-2 grid gap-0.5", ci === 0 && "sm:grid-cols-2")}>
                {g.items.map((a) => (
                  <li key={a.id}>
                    <a href={agentUrl(a)} className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/5">
                      <img src={avatar(a.id)} alt="" className="size-9 rounded-lg bg-mint object-cover" loading="lazy" />
                      <span className="min-w-0">
                        <span className="flex items-center gap-2 text-sm font-semibold text-white">
                          {a.name}
                          {!a.active && <span className="rounded-full bg-white/10 px-1.5 py-px text-[10px] font-medium text-slate-300">Segera</span>}
                        </span>
                        <span className="block truncate text-xs text-slate-400">{a.role}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
      <a href="/agen" className="group flex flex-col justify-between rounded-2xl border border-teal-300/20 bg-gradient-to-b from-teal-500/15 to-transparent p-5">
        <span>
          <span className="font-display text-lg font-bold text-white">Tim lengkap</span>
          <span className="mt-1 block text-sm text-slate-400">{agents.length} agen, satu langganan, satu Brain bisnis.</span>
        </span>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300">
          Lihat semua agen <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </a>
    </div>
  );
}

function FeaturesMenu() {
  return (
    <ul className="grid gap-1 p-3 sm:w-[26rem]">
      {features.map((f) => (
        <li key={f.href}>
          <a href={f.href} className="block rounded-xl px-4 py-3 transition-colors hover:bg-white/5">
            <span className="block text-sm font-semibold text-white">{f.label}</span>
            <span className="block text-xs text-slate-400">{f.desc}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const { path } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<MenuId>(null);
  const [mobile, setMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Tutup menu saat pindah halaman, Esc, atau klik di luar.
  useEffect(() => {
    setMenu(null);
    setMobile(false);
  }, [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setMenu(null), setMobile(false));
    const onDown = (e: PointerEvent) => navRef.current && !navRef.current.contains(e.target as Node) && setMenu(null);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  const trigger = (id: Exclude<MenuId, null>, label: string) => (
    <button
      type="button"
      aria-expanded={menu === id}
      aria-controls={`menu-${id}`}
      onClick={() => setMenu(menu === id ? null : id)}
      onPointerEnter={(e) => e.pointerType === "mouse" && setMenu(id)}
      className={cn(
        "inline-flex min-h-10 items-center gap-1 rounded-full px-4 text-sm transition-colors hover:bg-white/5 hover:text-white",
        menu === id ? "bg-white/5 text-white" : "text-slate-300",
      )}
    >
      {label}
      <ChevronDown className={cn("size-4 transition-transform", menu === id && "rotate-180")} />
    </button>
  );

  const linkCls = (href: string) =>
    cn("inline-flex min-h-10 items-center rounded-full px-4 text-sm transition-colors hover:bg-white/5 hover:text-white", path === href ? "text-white" : "text-slate-300");

  return (
    <>
    <motion.header
      ref={navRef}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
      onPointerLeave={(e) => e.pointerType === "mouse" && setMenu(null)}
    >
      <nav
        aria-label="Navigasi utama"
        className={cn(
          "relative mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2 transition-all duration-500 sm:px-5",
          scrolled || menu ? "glass shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)]" : "border border-transparent",
        )}
      >
        <Logo />
        <ul className="hidden items-center gap-0.5 lg:flex">
          <li>{trigger("agen", "Agen AI")}</li>
          <li>{trigger("fitur", "Fitur")}</li>
          <li>
            <a href="/harga" className={linkCls("/harga")}>Harga</a>
          </li>
          <li>
            <a href="/#cara-kerja" className={linkCls("/#cara-kerja")}>Cara kerja</a>
          </li>
        </ul>
        <div className="flex items-center gap-1 sm:gap-2">
          <a href={LOGIN_URL} className="hidden min-h-10 items-center rounded-full px-4 text-sm text-slate-300 transition-colors hover:text-white sm:inline-flex">
            Masuk
          </a>
          <Button href={SIGNUP_URL} className="px-4 py-2 text-xs sm:px-5 sm:text-sm">
            Mulai sekarang
          </Button>
          <button
            type="button"
            onClick={() => setMobile(true)}
            aria-label="Buka menu"
            aria-expanded={mobile}
            className="inline-flex size-11 items-center justify-center rounded-full text-slate-200 hover:bg-white/5 lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.div
              id={`menu-${menu}`}
              key={menu}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className={cn(
                "absolute top-[calc(100%+0.75rem)] hidden overflow-hidden rounded-3xl border border-white/10 bg-ink-2/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl lg:block",
                menu === "agen" ? "inset-x-0" : "left-[13rem]",
              )}
            >
              {menu === "agen" ? <AgentsMenu /> : <FeaturesMenu />}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>

      {/* Di luar header: header punya transform (animasi masuk), jadi child fixed akan ikut terpotong. */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-ink/98 px-4 pt-4 pb-10 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-1">
              <Logo />
              <button type="button" onClick={() => setMobile(false)} aria-label="Tutup menu" className="inline-flex size-11 items-center justify-center rounded-full text-slate-200 hover:bg-white/5">
                <X className="size-5" />
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-6">
              {grouped.map((g) => (
                <div key={g.id}>
                  <p className="px-2 text-[11px] font-semibold tracking-[0.16em] text-slate-500 uppercase">{g.label}</p>
                  <ul className="mt-2 grid grid-cols-2 gap-1">
                    {g.items.map((a) => (
                      <li key={a.id}>
                        <a href={agentUrl(a)} className="flex min-h-11 items-center gap-2.5 rounded-xl px-2 py-1.5 hover:bg-white/5">
                          <img src={avatar(a.id)} alt="" className="size-8 rounded-lg bg-mint object-cover" loading="lazy" />
                          <span className="text-sm font-semibold text-white">{a.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <ul className="flex flex-col border-t border-white/10 pt-4">
                {[{ label: "Semua agen", href: "/agen" }, ...features, { label: "Harga", href: "/harga" }].map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="flex min-h-12 items-center rounded-xl px-2 font-display text-lg font-semibold text-white hover:bg-white/5">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3">
                <Button href={SIGNUP_URL}>Mulai sekarang</Button>
                <Button href={LOGIN_URL} variant="ghost">
                  Masuk
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
