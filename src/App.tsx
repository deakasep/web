import { MotionConfig } from "motion/react";
import { lazy, Suspense } from "react";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { matchPath, Router, useRouter } from "@/lib/router";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

// Halaman selain beranda dimuat terpisah (code splitting) supaya beranda tetap ringan.
const AgentsPage = lazy(() => import("@/pages/AgentsPage"));
const AgentPage = lazy(() => import("@/pages/AgentPage"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));
const BrainPage = lazy(() => import("@/pages/BrainPage"));
const IntegrationsPage = lazy(() => import("@/pages/IntegrationsPage"));
const PrivacyPage = lazy(() => import("@/pages/legal/PrivacyPage"));
const TermsPage = lazy(() => import("@/pages/legal/TermsPage"));
const DataDeletionPage = lazy(() => import("@/pages/legal/DataDeletionPage"));

const STATIC: Record<string, React.ComponentType> = {
  "/": Home,
  "/agen": AgentsPage,
  "/harga": PricingPage,
  "/brain-ai": BrainPage,
  "/integrasi": IntegrationsPage,
  "/kebijakan-privasi": PrivacyPage,
  "/syarat-layanan": TermsPage,
  "/penghapusan-data": DataDeletionPage,
};

function Routes() {
  const { path } = useRouter();
  const Page = STATIC[path];
  if (Page) return <Page key={path} />;
  const agent = matchPath("/agen/:slug", path);
  if (agent) return <AgentPage key={path} slug={agent.slug} />;
  return <NotFound />;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <a href="#konten" className="sr-only z-[60] rounded-full bg-teal-400 px-4 py-2 font-semibold text-slate-950 focus:not-sr-only focus:fixed focus:top-4 focus:left-4">
          Lewati ke konten
        </a>
        <Navbar />
        <main id="konten">
          <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
            <Routes />
          </Suspense>
        </main>
        <Footer />
      </Router>
    </MotionConfig>
  );
}
