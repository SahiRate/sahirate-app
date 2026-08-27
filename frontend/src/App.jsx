import ScrollToTop from "@/components/ScrollToTop";
import { lazy, Suspense, useState, useEffect } from "react";
const Home = lazy(() => import("@/pages/Home"));
const MaterialsList = lazy(() => import("@/pages/MaterialsList"));
const MaterialDetail = lazy(() => import("@/pages/MaterialDetail"));
const DealersList = lazy(() => import("@/pages/DealersList"));
const DealerDetail = lazy(() => import("@/pages/DealerDetail"));
const LivePrices = lazy(() => import("@/pages/LivePrices"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const Careers = lazy(() => import("./pages/Careers"));
const TermsAndConditions = lazy(() => import("@/pages/TermsAndConditions"));
const SmartBuild = lazy(() => import("@/pages/SmartBuild"));

const DeogharHub = lazy(() => import("@/pages/DeogharHub"));
const CityMaterialPrice = lazy(
  () => import("@/pages/CityMaterialPrice")
);
const NotFound = lazy(() => import("@/pages/NotFound"));
import SEO from "@/components/SEO";
import { Toaster } from "@/components/ui/sonner";


const STORAGE_KEY = "sahirate-welcome-dismissed";

function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [welcomeClosed, setWelcomeClosed] = useState(true);

  const openSearch = () => setSearchOpen(true);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    setWelcomeClosed(!!dismissed);
  }, []);

  return (
    <>
      {!welcomeClosed && (
        <WelcomeOverlay
          onClose={() => setWelcomeClosed(true)}
        />
      )}

      <div
        className="App"
        style={{
          display: welcomeClosed ? "flex" : "none",
        }}
      >
        <SEO />

        <ScrollToTop />

        <Navbar onOpenSearch={openSearch} />

        <main
          className="min-h-screen"
          data-testid="app-main"
        >
          <Suspense
            fallback={
              <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-sm text-slate-500">
                  Loading...
                </div>
              </div>
            }
          >
  
          <Routes>
  <Route
    path="/"
    element={
      <Home onOpenSearch={openSearch} />
    }
  />

  <Route
    path="/materials"
    element={<MaterialsList />}
  />

  <Route
    path="/deoghar"
    element={<DeogharHub />}
  />

  <Route
    path="/deoghar/:materialPriceSlug"
    element={<CityMaterialPrice />}
  />

  <Route
    path="/materials/:slug"
    element={<MaterialDetail />}
  />

  <Route
    path="/dealers"
    element={<DealersList />}
  />

  <Route
    path="/dealers/:id"
    element={<DealerDetail />}
  />

  <Route
    path="/prices"
    element={
      <LivePrices
        onOpenSearch={openSearch}
      />
    }
  />

  <Route
    path="/smartbuild"
    element={<SmartBuild />}
  />

  <Route
    path="/about"
    element={<About />}
  />

  <Route
    path="/contact"
    element={<Contact />}
  />

  <Route
    path="/careers"
    element={<Careers />}
  />

  <Route
    path="/privacy-policy"
    element={<PrivacyPolicy />}
  />

  <Route
    path="/terms-and-conditions"
    element={<TermsAndConditions />}
  />

  <Route path="*" element={<NotFound />} />
</Routes>
          </Suspense>
        </main>

        <Footer />

        <AISearchDialog
          open={searchOpen}
          onOpenChange={setSearchOpen}
        />

        <Toaster />
      </div>
    </>
  );
}

export default App;






