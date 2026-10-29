import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { agents, agentUrl } from "@/data/agents";
import { SIGNUP_URL, SITE, footer } from "@/data/site";

export function Footer() {
  const activeAgents = agents.filter((a) => a.active);
  return (
    <footer className="border-t border-white/5 px-4 pt-16 pb-10">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.3fr_2fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Platform karyawan AI berlangganan untuk UMKM &amp; hospitality Indonesia. AI menyiapkan, Anda memutuskan.
          </p>
          <ul className="mt-6 flex flex-col gap-2.5 text-sm text-slate-400">
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 text-teal-300" />
              <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-white">{SITE.email}</a>
            </li>
            {SITE.whatsapp && (
              <li className="flex items-center gap-2.5">
                <MessageCircle className="size-4 text-teal-300" />
                <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer external" className="transition-colors hover:text-white">
                  WhatsApp +{SITE.whatsapp}
                </a>
              </li>
            )}
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-teal-300" />
              <span>{SITE.address}</span>
            </li>
          </ul>
          <Button href={SIGNUP_URL} className="mt-7">Mulai sekarang</Button>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Agen aktif</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {activeAgents.slice(0, 7).map((a) => (
                <li key={a.id}>
                  <a href={agentUrl(a)} className="text-slate-400 transition-colors hover:text-white">
                    {a.name} <span className="text-slate-600">· {a.role.replace(/^AI /, "")}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {footer.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">{col.title}</p>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-slate-400 transition-colors hover:text-white">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-2 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {SITE.legalName}. Hak cipta dilindungi.</p>
        <p>Avatar agen adalah karakter AI fiktif. Contoh hasil di situs ini adalah SIMULASI.</p>
      </div>
    </footer>
  );
}
