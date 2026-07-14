import { useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AISearchDialog from "@/components/AISearchDialog";
import Home from "@/pages/Home";
import MaterialsList from "@/pages/MaterialsList";
import MaterialDetail from "@/pages/MaterialDetail";
import DealersList from "@/pages/DealersList";
import DealerDetail from "@/pages/DealerDetail";
import LivePrices from "@/pages/LivePrices";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch = () => setSearchOpen(true);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar onOpenSearch={openSearch} />
        <main data-testid="app-main">
          <Routes>
            <Route path="/" element={<Home onOpenSearch={openSearch} />} />
            <Route path="/materials" element={<MaterialsList />} />
            <Route path="/materials/:slug" element={<MaterialDetail />} />
            <Route path="/dealers" element={<DealersList />} />
            <Route path="/dealers/:id" element={<DealerDetail />} />
            <Route path="/prices" element={<LivePrices onOpenSearch={openSearch} />} />
          </Routes>
        </main>
        <Footer />
        <AISearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
