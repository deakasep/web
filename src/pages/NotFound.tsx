import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { Button } from "@/components/ui/button";
import { NOT_FOUND } from "@/data/pages";
import { usePageMeta } from "@/lib/meta";

export default function NotFound() {
  usePageMeta(NOT_FOUND.title, NOT_FOUND.description, NOT_FOUND.path);
  return (
    <div className="pb-24">
      <PageHero
        eyebrow="404"
        title="Halaman ini tidak ada"
        subtitle="Mungkin tautannya salah ketik atau halamannya sudah dipindah. Coba mulai dari beranda atau lihat tim agen kami."
        actions={
          <>
            <Button href="/">
              Ke beranda <ArrowRight className="size-4" />
            </Button>
            <Button href="/agen" variant="ghost">Lihat agen</Button>
          </>
        }
      />
    </div>
  );
}
