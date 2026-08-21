import { lazy, Suspense, useEffect, useState } from "react";
import "@/App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AISearchDialog from "@/components/AISearchDialog";
import WelcomeOverlay from "@/components/WelcomeOverlay";
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

            <Route
              path="*"
              element={
                <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
                  <h1 className="text-5xl font-black text-[#0A192F]">
                    404
                  </h1>

                  <p className="mt-3 text-slate-600">
                    Page not found.
                  </p>
                </div>
              }
            />
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