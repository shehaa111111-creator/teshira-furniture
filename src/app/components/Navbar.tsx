import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import teshiraLogo from "../../imports/teshira.jpeg";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Collections", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "#ffffff",
      boxShadow: scrolled ? "0 2px 24px rgba(27,58,107,0.10)" : "0 1px 0 rgba(27,58,107,0.07)",
      backdropFilter: "blur(10px)",
      transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
      fontFamily: "'Outfit', sans-serif",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        {/* Logo */}
        <button
          onClick={() => scrollTo("#home")}
          style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <div style={{
            width: 46, height: 46, borderRadius: 10, overflow: "hidden",
            flexShrink: 0,
            boxShadow: "0 2px 10px rgba(27,58,107,0.20)",
          }}>
            <img
              src={teshiraLogo}
              alt="Teshira Furniture logo"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#1b3a6b", letterSpacing: "-0.3px", lineHeight: 1.1 }}>TESHIRA</div>
            <div style={{ fontSize: 9, fontWeight: 600, color: "#c9a025", letterSpacing: "2.5px", lineHeight: 1, textTransform: "uppercase" }}>Furniture</div>
          </div>
        </button>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="nav-desktop">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "9px 17px", borderRadius: 8,
                color: "#1b3a6b", fontSize: 15, fontWeight: 500,
                fontFamily: "'Outfit', sans-serif",
                transition: "background 0.2s, color 0.2s",
                position: "relative",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#eff4ff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "none"; }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#products")}
            style={{
              marginLeft: 10, background: "#1b3a6b", color: "#fff",
              border: "none", cursor: "pointer",
              padding: "10px 24px", borderRadius: 9,
              fontSize: 14, fontWeight: 700,
              fontFamily: "'Outfit', sans-serif",
              transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
              boxShadow: "0 2px 10px rgba(27,58,107,0.25)",
              letterSpacing: "0.2px",
            }}
            onMouseEnter={e => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.background = "#244f91";
              b.style.boxShadow = "0 6px 20px rgba(27,58,107,0.35)";
              b.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.background = "#1b3a6b";
              b.style.boxShadow = "0 2px 10px rgba(27,58,107,0.25)";
              b.style.transform = "none";
            }}
          >
            Shop Now
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#1b3a6b", padding: 4, display: "none" }}
          className="nav-mobile-btn"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: "#fff", borderTop: "1px solid rgba(27,58,107,0.07)",
          padding: "10px 24px 20px",
          boxShadow: "0 12px 30px rgba(27,58,107,0.10)",
          animation: "slideDown 0.2s ease",
        }}>
          {navLinks.map((link) => (
            <button key={link.label} onClick={() => scrollTo(link.href)} style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none", cursor: "pointer",
              padding: "13px 0", color: "#1b3a6b", fontSize: 16, fontWeight: 500,
              fontFamily: "'Outfit', sans-serif",
              borderBottom: "1px solid rgba(27,58,107,0.06)",
            }}>
              {link.label}
            </button>
          ))}
          <button onClick={() => scrollTo("#products")} style={{
            marginTop: 14, width: "100%", background: "#1b3a6b", color: "#fff",
            border: "none", cursor: "pointer", padding: "13px 0", borderRadius: 9,
            fontSize: 15, fontWeight: 700, fontFamily: "'Outfit', sans-serif",
          }}>
            Shop Now
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}
