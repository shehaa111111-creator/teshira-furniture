import { MapPin, Phone, MessageCircle, Clock, Facebook, Instagram } from "lucide-react";
import { useReveal } from "./useReveal";
import teshiraLogo from "../../imports/teshira.jpeg";

const WHATSAPP_NUMBERS = ["94701369059", "94701369029"];
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
              display: "inline-flex", alignItems: "center", gap: 12,
              background: "#25D366", color: "#fff",
              padding: "16px 36px", borderRadius: 100,
              fontSize: 16, fontWeight: 700, textDecoration: "none",
              boxShadow: "0 6px 24px rgba(37,211,102,0.38)",
              transition: "all 0.28s ease", whiteSpace: "nowrap",
              fontFamily: "'Outfit', sans-serif",
            }}
            onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = "translateY(-2px)"; a.style.boxShadow = "0 10px 32px rgba(37,211,102,0.50)"; a.style.background = "#20c45e"; }}
            onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = "none"; a.style.boxShadow = "0 6px 24px rgba(37,211,102,0.38)"; a.style.background = "#25D366"; }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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
                { icon: Phone, content: "+94 70 136 9059", href: "tel:+94701369059" },
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
            No. 127, Sri Premarathna Mawatha, Moratumulla, Moratuwa.
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
