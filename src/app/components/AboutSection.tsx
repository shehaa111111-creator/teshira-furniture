import { MapPin, Phone, Clock, Award, Shield, Truck, MessageCircle } from "lucide-react";
import { useReveal } from "./useReveal";

export function AboutSection() {
  const { ref: leftRef, visible: leftVisible } = useReveal(0.18);
  const { ref: rightRef, visible: rightVisible } = useReveal(0.18);

  return (
    <section id="about" style={{ background: "#ffffff", padding: "100px 0 96px", fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="about-grid">

          {/* Left: image */}
          <div
            ref={leftRef as React.RefObject<HTMLDivElement>}
            style={{
              position: "relative",
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? "none" : "translateX(-32px)",
              transition: "opacity 0.85s cubic-bezier(0.4,0,0.2,1), transform 0.85s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div style={{
              borderRadius: 20, overflow: "hidden", paddingTop: "72%", position: "relative",
              boxShadow: "0 28px 70px rgba(27,58,107,0.16)",
            }}>
              <img
                src="https://images.unsplash.com/photo-1724582586580-8b52c02e99dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80"
                alt="Teshira Furniture showroom"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = "scale(1.03)"; }}
                onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = "scale(1)"; }}
              />
              {/* Gold shimmer line */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #c9a025, #f0d080, #c9a025)" }} />
            </div>

            {/* Floating stat card */}
            <div style={{
              position: "absolute", bottom: -28, right: -20,
              background: "linear-gradient(135deg, #1b3a6b, #2d5aa8)",
              borderRadius: 16, padding: "20px 28px",
              boxShadow: "0 16px 40px rgba(27,58,107,0.32)",
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? "none" : "scale(0.85)",
              transition: "opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s",
            }}>
              <div style={{ fontSize: 38, fontWeight: 900, color: "#f0d080", lineHeight: 1 }}>10+</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 5, fontWeight: 500, letterSpacing: "0.5px" }}>Years of Excellence</div>
            </div>

            {/* Decorative gold square */}
            <div style={{
              position: "absolute", top: -18, left: -18, width: 72, height: 72,
              borderRadius: 14, border: "2px solid rgba(201,160,37,0.25)",
              background: "rgba(201,160,37,0.06)", zIndex: -1,
            }} />
          </div>

          {/* Right: content */}
          <div
            ref={rightRef as React.RefObject<HTMLDivElement>}
            style={{
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? "none" : "translateX(32px)",
              transition: "opacity 0.85s cubic-bezier(0.4,0,0.2,1) 0.15s, transform 0.85s cubic-bezier(0.4,0,0.2,1) 0.15s",
            }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(201,160,37,0.10)", border: "1px solid rgba(201,160,37,0.28)",
              borderRadius: 100, padding: "5px 18px", marginBottom: 22,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c9a025" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#c9a025", letterSpacing: "2px", textTransform: "uppercase" }}>About Us</span>
            </div>

            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.5px", marginBottom: 18, lineHeight: 1.2 }}>
              Crafting Comfort for<br />Sri Lankan Homes
            </h2>
            <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.82, marginBottom: 20 }}>
              Teshira Furniture has been serving families in Moratuwa and across Sri Lanka for over a decade. We pride ourselves on sourcing the finest materials and delivering furniture that combines elegance, durability, and comfort.
            </p>
            <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.82, marginBottom: 36 }}>
              Whether you're furnishing a new home or refreshing a single room, our team is here to help you find the perfect pieces for your space and budget.
            </p>

            {/* Feature grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 36 }}>
              {[
                { icon: Award, label: "Premium Quality", desc: "Only the finest materials" },
                { icon: Shield, label: "5-Year Warranty", desc: "On all furniture pieces" },
                { icon: Truck, label: "Island-Wide Delivery", desc: "We deliver across Sri Lanka" },
                { icon: MessageCircle, label: "WhatsApp Orders", desc: "Simple, fast ordering" },
              ].map(({ icon: Icon, label, desc }, i) => (
                <div key={label} style={{
                  display: "flex", gap: 12, alignItems: "flex-start",
                  padding: "14px 16px", background: "#f8faff", borderRadius: 12,
                  border: "1px solid rgba(27,58,107,0.07)",
                  transition: "all 0.25s ease",
                  opacity: rightVisible ? 1 : 0,
                  transform: rightVisible ? "none" : "translateY(12px)",
                  transitionDelay: rightVisible ? `${0.3 + i * 0.08}s` : "0s",
                }}
                  onMouseEnter={e => {
                    const d = e.currentTarget as HTMLDivElement;
                    d.style.background = "#eff4ff";
                    d.style.borderColor = "rgba(27,58,107,0.15)";
                    d.style.transform = "translateY(-2px)";
                    d.style.boxShadow = "0 4px 16px rgba(27,58,107,0.08)";
                  }}
                  onMouseLeave={e => {
                    const d = e.currentTarget as HTMLDivElement;
                    d.style.background = "#f8faff";
                    d.style.borderColor = "rgba(27,58,107,0.07)";
                    d.style.transform = "none";
                    d.style.boxShadow = "none";
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                    background: "linear-gradient(135deg, rgba(27,58,107,0.10), rgba(27,58,107,0.06))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={17} color="#1b3a6b" />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-grid > div:first-child { display: none; }
        }
      `}</style>
    </section>
  );
}
