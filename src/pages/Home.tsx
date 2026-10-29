import { Agents } from "@/components/sections/Agents";
import { CTA } from "@/components/sections/CTA";
import { DeskScene } from "@/components/sections/DeskScene";
import { FAQ } from "@/components/sections/FAQ";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Showcase } from "@/components/sections/Showcase";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { UseCases } from "@/components/sections/UseCases";
import { pages } from "@/data/pages";
import { usePageMeta } from "@/lib/meta";

const meta = pages.find((p) => p.path === "/")!;

export default function Home() {
  usePageMeta(meta.title, meta.description, "/");
  return (
    <>
      <Hero />
      <TrustedBy />
      <Showcase />
      <Agents />
      <UseCases />
      <DeskScene />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
