import { useState } from "react";
import "@/App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AISearchDialog from "@/components/AISearchDialog";
import Home from "@/pages/Home";
import MaterialsList from "@/pages/MaterialsList";
import MaterialDetail from "@/pages/MaterialDetail";
import SEO from "@/seo/SEO";
import DealersList from "./pages/DealersList";
import DealerDetail from "@/pages/DealerDetail";
import LivePrices from "@/pages/LivePrices";
import { Toaster } from "@/components/ui/sonner";
import WelcomeOverlay from "./components/WelcomeOverlay";
function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch = () => setSearchOpen(true);

  return (
  <div className="App">
    <SEO />
    <ScrollToTop />

<h1 style={{ color: "red", fontSize: "40px" }}>
  TEST APP
</h1>

    <WelcomeOverlay />

    <Navbar onOpenSearch={openSearch} />

    <main className="min-h-screen" data-testid="app-main">
      <Routes>
        <Route path="/" element={<Home onOpenSearch={openSearch} />} />
        <Route path="/materials" element={<MaterialsList />} />
        <Route path="/materials/:slug" element={<MaterialDetail />} />
        <Route path="/dealers" element={<DealersList />} />
        <Route path="/dealers/:id" element={<DealerDetail />} />
        <Route
          path="/prices"
          element={<LivePrices onOpenSearch={openSearch} />}
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
    </main>

    <Footer />

        <AISearchDialog
      open={searchOpen}
      onOpenChange={setSearchOpen}
    />

    <Toaster />
  </div>
  );
}

export default App;