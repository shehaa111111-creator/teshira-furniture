import { MapPin, Phone, MessageCircle, Clock, Facebook, Instagram } from "lucide-react";
import { useReveal } from "./useReveal";
import teshiraLogo from "../../imports/teshira.jpeg";

const WHATSAPP_NUMBERS = ["94701369029"];
const PRIMARY_WA = WHATSAPP_NUMBERS[0];

export function Footer() {
  const { ref: ctaRef, visible: ctaVisible } = useReveal(0.2);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" style={{ background: "#0f2244", fontFamily: "'Outfit', sans-serif" }}>
      {/* CTA Banner */}
      <div
        ref={ctaRef as React.RefObject<HTMLDivElement>}
        style={{
          background: "linear-gradient(135deg, #1b3a6b, #2d5aa8)",
          padding: "52px 24px",
          borderBottom: "1px solid rgba(201,160,37,0.18)",
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? "none" : "translateY(24px)",
          transition: "opacity 0.75s ease, transform 0.75s ease",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <h3 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 800, color: "#fff", marginBottom: 8 }}>
              Ready to transform your home?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 15 }}>
              Chat with us on WhatsApp for instant quotes and orders.
            </p>
          </div>
          <a
            href={`whatsapp://send?phone=${PRIMARY_WA}?text=${encodeURIComponent("Hello Teshira Furniture! I'd like to inquire about your furniture collection.")}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "#25D366", color: "#fff",
              padding: "15px 32px", borderRadius: 10,
              fontSize: 15, fontWeight: 700, textDecoration: "none",
              boxShadow: "0 6px 24px rgba(37,211,102,0.38)",
              transition: "all 0.28s ease", whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = "translateY(-2px)"; a.style.boxShadow = "0 10px 32px rgba(37,211,102,0.50)"; }}
            onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = "none"; a.style.boxShadow = "0 6px 24px rgba(37,211,102,0.38)"; }}
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px 44px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 48, marginBottom: 52 }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, overflow: "hidden", flexShrink: 0, border: "1px solid rgba(201,160,37,0.30)", boxShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
                <img src={teshiraLogo} alt="Teshira Furniture" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>TESHIRA</div>
                <div style={{ fontSize: 9, fontWeight: 600, color: "#c9a025", letterSpacing: "2.5px" }}>FURNITURE</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.50)", fontSize: 14, lineHeight: 1.85, maxWidth: 280, marginBottom: 26 }}>
              Premium furniture crafted for Sri Lankan homes. Quality you can trust, comfort you will love.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/18yfDm3FKQ/" },
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/teshira2026?igsh=MW9ka2lzZmdubTYwag==" },
                { icon: MessageCircle, label: "WhatsApp", href: `whatsapp://send?phone=${PRIMARY_WA}` },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{
                    width: 38, height: 38, borderRadius: 9,
                    border: "1px solid rgba(255,255,255,0.10)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.50)", textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = "#c9a025"; a.style.color = "#c9a025"; a.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = "rgba(255,255,255,0.10)"; a.style.color = "rgba(255,255,255,0.50)"; a.style.transform = "none"; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, color: "#c9a025", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 22 }}>Quick Links</h4>
            {[{ label: "Home", href: "#home" }, { label: "Collections", href: "#products" }, { label: "About Us", href: "#about" }, { label: "Contact", href: "#contact" }].map(({ label, href }) => (
              <button key={label} onClick={() => scrollTo(href)} style={{
                display: "block", background: "none", border: "none",
                color: "rgba(255,255,255,0.50)", fontSize: 14, cursor: "pointer",
                fontFamily: "'Outfit', sans-serif", padding: "5px 0", transition: "color 0.2s, transform 0.2s", textAlign: "left",
              }}
                onMouseEnter={e => { const b = e.target as HTMLButtonElement; b.style.color = "#fff"; b.style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { const b = e.target as HTMLButtonElement; b.style.color = "rgba(255,255,255,0.50)"; b.style.transform = "none"; }}
              >{label}</button>
            ))}
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, color: "#c9a025", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 22 }}>Categories</h4>
            {["Living Room", "Bedroom", "Dining Room", "Office", "Custom Orders"].map((cat) => (
              <button key={cat} onClick={() => scrollTo("#products")} style={{
                display: "block", background: "none", border: "none",
                color: "rgba(255,255,255,0.50)", fontSize: 14, cursor: "pointer",
                fontFamily: "'Outfit', sans-serif", padding: "5px 0", transition: "color 0.2s, transform 0.2s", textAlign: "left",
              }}
                onMouseEnter={e => { const b = e.target as HTMLButtonElement; b.style.color = "#fff"; b.style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { const b = e.target as HTMLButtonElement; b.style.color = "rgba(255,255,255,0.50)"; b.style.transform = "none"; }}
              >{cat}</button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, color: "#c9a025", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 22 }}>Visit Us</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: MapPin, content: "108 De Soysa Rd,\nMoratuwa 10400,\nSri Lanka", href: undefined },
                { icon: Phone, content: "+94 70 136 9029", href: "tel:+94701369029" },
                { icon: MessageCircle, content: "WhatsApp Us", href: `whatsapp://send?phone=${PRIMARY_WA}`, green: true },
                { icon: Clock, content: "Mon–Sat: 9am – 6pm", href: undefined },
              ].map(({ icon: Icon, content, href, green }: { icon: React.ElementType, content: string, href?: string, green?: boolean }) => (
                <div key={content} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <Icon size={15} color={green ? "#25D366" : "#c9a025"} style={{ flexShrink: 0, marginTop: 2 }} />
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      style={{ color: green ? "#25D366" : "rgba(255,255,255,0.65)", fontSize: 14, textDecoration: "none", whiteSpace: "pre-line", lineHeight: 1.65 }}>
                      {content}
                    </a>
                  ) : (
                    <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, whiteSpace: "pre-line", lineHeight: 1.65 }}>{content}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 30, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: "rgba(255,255,255,0.30)", fontSize: 13 }}>
            © {new Date().getFullYear()} Teshira Furniture. All rights reserved.
          </p>
          <p style={{ color: "rgba(255,255,255,0.20)", fontSize: 12 }}>
            108 De Soysa Rd, Moratuwa 10400, Sri Lanka
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
