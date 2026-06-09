import { useEffect, useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";

export function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const scrollToProducts = () => {
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", fontFamily: "'Outfit', sans-serif" }}>
      {/* Background image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(https://images.unsplash.com/photo-1693578616322-c8abe6c7393d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80)`,
        backgroundSize: "cover", backgroundPosition: "center",
        animation: "heroZoom 12s ease-out forwards",
      }} />

      {/* Clean dark-to-transparent gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(105deg, rgba(15,34,68,0.92) 0%, rgba(15,34,68,0.72) 55%, rgba(15,34,68,0.25) 100%)",
      }} />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "110px 24px 90px", width: "100%" }}>
        <div style={{ maxWidth: 600 }}>

          {/* Small label */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 100, padding: "6px 16px", marginBottom: 28,
            backdropFilter: "blur(6px)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.1s",
          }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.80)", fontWeight: 500, letterSpacing: "0.5px" }}>Premium Furniture · Sri Lanka</span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 800, color: "#ffffff",
            lineHeight: 1.1, marginBottom: 22, letterSpacing: "-1px",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(22px)",
            transition: "opacity 0.75s ease 0.25s, transform 0.75s ease 0.25s",
          }}>
            Transform Your<br />
            <span style={{ color: "#f0d080" }}>Living Space</span>
          </h1>

          {/* Paragraph */}
          <p style={{
            color: "rgba(255,255,255,0.78)", fontSize: 17, lineHeight: 1.75,
            marginBottom: 38, maxWidth: 480,
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(18px)",
            transition: "opacity 0.7s ease 0.42s, transform 0.7s ease 0.42s",
          }}>
            Discover handcrafted furniture that brings elegance and comfort to every corner of your home. Quality pieces built to last a lifetime.
          </p>

          {/* CTAs */}
          <div style={{
            display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48,
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(16px)",
            transition: "opacity 0.7s ease 0.56s, transform 0.7s ease 0.56s",
          }}>
            <button onClick={scrollToProducts} style={{
              background: "#1b3a6b", color: "#fff", border: "2px solid #1b3a6b", cursor: "pointer",
              padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 700,
              fontFamily: "'Outfit', sans-serif",
              boxShadow: "0 4px 20px rgba(27,58,107,0.45)",
              transition: "all 0.28s ease",
            }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "#2d5aa8"; b.style.borderColor = "#2d5aa8"; b.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "#1b3a6b"; b.style.borderColor = "#1b3a6b"; b.style.transform = "none"; }}
            >
              Explore Collections
            </button>
            <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })} style={{
              background: "transparent", color: "#fff",
              border: "2px solid rgba(255,255,255,0.40)", cursor: "pointer",
              padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 600,
              fontFamily: "'Outfit', sans-serif", backdropFilter: "blur(6px)",
              transition: "all 0.28s ease",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.75)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.40)"; (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
            >
              Contact Us
            </button>
          </div>

          {/* Address */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            color: "rgba(255,255,255,0.60)", fontSize: 13.5,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.7s",
          }}>
            <MapPin size={15} color="rgba(255,255,255,0.60)" />
            <span>108 De Soysa Rd, Moratuwa 10400, Sri Lanka</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          position: "absolute", bottom: 44, right: 24,
          display: "flex", gap: 14, flexWrap: "wrap",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateX(24px)",
          transition: "opacity 0.75s ease 0.85s, transform 0.75s ease 0.85s",
        }}>
          {[
            { value: "500+", label: "Products" },
            { value: "2000+", label: "Happy Clients" },
            { value: "10+", label: "Years" },
          ].map((stat) => (
            <div key={stat.label} style={{
              textAlign: "center",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 14, padding: "16px 22px",
              backdropFilter: "blur(10px)",
            }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#ffffff", lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.60)", marginTop: 5, fontWeight: 400, letterSpacing: "0.5px" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button onClick={scrollToProducts} style={{
        position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)",
        background: "none", border: "none", cursor: "pointer",
        color: "rgba(255,255,255,0.50)", display: "flex", flexDirection: "column",
        alignItems: "center", gap: 4, animation: "scrollBounce 2.2s ease-in-out infinite",
        opacity: visible ? 1 : 0, transition: "opacity 1s ease 1.2s",
      }}>
        <span style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase" }}>Scroll</span>
        <ChevronDown size={18} />
      </button>

      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.06); }
          to { transform: scale(1); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(7px); }
        }
        @media (max-width: 768px) {
          #home > div > div:nth-child(3) > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
