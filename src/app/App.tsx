import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ProductsSection } from "./components/ProductsSection";
import { AboutSection } from "./components/AboutSection";
import { Footer } from "./components/Footer";
import { AdminLock } from "./components/AdminLock";
import { AdminPanel } from "./components/AdminPanel";
import "../styles/fonts.css";

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    /* MARKER-MAKE-KIT-INVOKED */
    <div style={{ fontFamily: "'Outfit', sans-serif", minHeight: "100vh", background: "#ffffff" }}>
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <AboutSection />
      <Footer />

      {/* Secret movable admin lock */}
      {!adminOpen && (
        <AdminLock onUnlock={() => setAdminOpen(true)} />
      )}

      {/* Admin panel */}
      {adminOpen && (
        <AdminPanel onClose={() => setAdminOpen(false)} />
      )}
    </div>
  );
}
