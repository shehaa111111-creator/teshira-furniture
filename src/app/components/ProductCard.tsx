import { useState } from "react";
import { MessageCircle, Tag, Package, X, ChevronRight } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const WHATSAPP_NUMBERS = ["94701369029"];

const categoryColors: Record<string, string> = {
  "Living Room": "#1b3a6b",
  "Bedroom": "#2d5aa8",
  "Dining": "#1b3a6b",
  "Office": "#2d5aa8",
  "Other": "#64748b",
};

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [imgError, setImgError] = useState(false);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello Teshira Furniture! 🛋️\n\nI'm interested in ordering:\n*${product.name}*\nPrice: Rs. ${product.price.toLocaleString()}\n\nCould you please confirm availability and provide any additional details?\n\nThank you!`
    );
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const url = isMobile
      ? `https://wa.me/${WHATSAPP_NUMBERS[0]}?text=${message}`
      : `whatsapp://send?phone=${WHATSAPP_NUMBERS[0]}&text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16, fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="modal-inner"
        style={{
          background: "#fff", borderRadius: 20, overflow: "hidden",
          maxWidth: 860, width: "100%", maxHeight: "90vh",
          display: "flex", flexDirection: "row",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          animation: "modalIn 0.25s ease",
        }}
      >
        {/* Left — Image */}
        <div style={{ flex: "0 0 50%", position: "relative", background: "#f4f6fb", minHeight: 400 }}>
          {!imgError && product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              onError={() => setImgError(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <div style={{
              width: "100%", height: "100%", minHeight: 400,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg, #eff4ff, #dce8ff)",
            }}>
              <Package size={72} color="rgba(27,58,107,0.2)" />
            </div>
          )}
          {/* Badges */}
          <div style={{
            position: "absolute", top: 14, left: 14,
            background: categoryColors[product.category] || "#1b3a6b",
            color: "#fff", borderRadius: 6, padding: "4px 12px", fontSize: 12, fontWeight: 600,
          }}>
            {product.category}
          </div>
          <div style={{
            position: "absolute", top: 14, right: 14,
            background: product.inStock ? "rgba(34,197,94,0.9)" : "rgba(239,68,68,0.9)",
            color: "#fff", borderRadius: 6, padding: "4px 12px", fontSize: 12, fontWeight: 600,
          }}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </div>
        </div>

        {/* Right — Details */}
        <div style={{ flex: 1, padding: "36px 32px", display: "flex", flexDirection: "column", overflowY: "auto" }}>
          {/* Close button */}
          <button onClick={onClose} style={{
            alignSelf: "flex-end", background: "#f1f5f9", border: "none",
            borderRadius: "50%", width: 36, height: 36, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 20,
          }}>
            <X size={18} color="#64748b" />
          </button>

          <div style={{
            display: "inline-block", background: "#eff4ff", color: "#1b3a6b",
            borderRadius: 6, padding: "4px 12px", fontSize: 12, fontWeight: 600,
            marginBottom: 12, alignSelf: "flex-start",
          }}>
            Teshira Furniture
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", marginBottom: 12, lineHeight: 1.2 }}>
            {product.name}
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
            <Tag size={14} color="#64748b" />
            <span style={{ fontSize: 13, color: "#64748b" }}>Price</span>
            <span style={{ fontSize: 28, fontWeight: 900, color: "#1b3a6b", marginLeft: 8 }}>
              Rs. {product.price.toLocaleString()}
            </span>
          </div>

          <div style={{
            background: "#f8faff", borderRadius: 12, padding: "16px 18px",
            marginBottom: 28, flex: 1,
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1b3a6b", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Description
            </div>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.75, margin: 0 }}>
              {product.description}
            </p>
          </div>

          <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 20 }}>
            <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 14 }}>
              📦 Order via WhatsApp — fast, easy, no complicated checkout
            </p>
            <button
              onClick={handleWhatsApp}
              disabled={!product.inStock}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
                background: product.inStock ? "#25D366" : "#94a3b8",
                color: "#fff", border: "none", cursor: product.inStock ? "pointer" : "not-allowed",
                padding: "16px 24px", borderRadius: 100,
                fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif",
                boxShadow: product.inStock ? "0 4px 16px rgba(37,211,102,0.4)" : "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { if (product.inStock) { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.background = "#20c45e"; }}}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "none"; (e.currentTarget as HTMLButtonElement).style.background = product.inStock ? "#25D366" : "#94a3b8"; }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Order via WhatsApp
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @media (max-width: 640px) {
          .modal-inner { flex-direction: column !important; max-height: 95vh !important; }
          .modal-inner > div:first-child { flex: 0 0 220px !important; min-height: 220px !important; }
          .modal-inner > div:last-child { padding: 20px 18px !important; }
        }
      `}</style>
    </div>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = encodeURIComponent(
      `Hello Teshira Furniture! 🛋️\n\nI'm interested in ordering:\n*${product.name}*\nPrice: Rs. ${product.price.toLocaleString()}\n\nCould you please confirm availability and provide any additional details?\n\nThank you!`
    );
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const url = isMobile
      ? `https://wa.me/${WHATSAPP_NUMBERS[0]}?text=${message}`
      : `whatsapp://send?phone=${WHATSAPP_NUMBERS[0]}&text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {showModal && <ProductModal product={product} onClose={() => setShowModal(false)} />}
      <div
        onClick={() => setShowModal(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#fff", borderRadius: 16, overflow: "hidden", cursor: "pointer",
          boxShadow: hovered
            ? "0 16px 48px rgba(27,58,107,0.15), 0 0 0 2px rgba(201,160,37,0.3)"
            : "0 2px 16px rgba(27,58,107,0.08)",
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-4px)" : "none",
          fontFamily: "'Outfit', sans-serif",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", paddingTop: "66%", background: "#f4f6fb", overflow: "hidden" }}>
          {!imgError && product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              onError={() => setImgError(true)}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", transition: "transform 0.4s ease",
                transform: hovered ? "scale(1.05)" : "scale(1)",
              }}
            />
          ) : (
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg, #eff4ff, #dce8ff)",
            }}>
              <Package size={48} color="rgba(27,58,107,0.3)" />
            </div>
          )}
          <div style={{
            position: "absolute", top: 12, left: 12,
            background: categoryColors[product.category] || "#1b3a6b",
            color: "#fff", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 600,
          }}>
            {product.category}
          </div>
          <div style={{
            position: "absolute", top: 12, right: 12,
            background: product.inStock ? "rgba(34,197,94,0.9)" : "rgba(239,68,68,0.9)",
            color: "#fff", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 600,
          }}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </div>
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
            background: "linear-gradient(90deg, #c9a025, #f0d080, #c9a025)",
            opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
          }} />
        </div>

        {/* Content */}
        <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1a1a2e", marginBottom: 6, lineHeight: 1.3 }}>
            {product.name}
          </h3>
          <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 16, flex: 1, lineHeight: 1.5 }}>
            Click to view details
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#1b3a6b" }}>
              Rs. {product.price.toLocaleString()}
            </div>
            <button
              onClick={handleWhatsApp}
              disabled={!product.inStock}
              title="Order via WhatsApp"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                background: product.inStock ? "#25D366" : "#94a3b8",
                color: "#fff", border: "none", cursor: product.inStock ? "pointer" : "not-allowed",
                width: 48, height: 48, borderRadius: "50%",
                transition: "all 0.2s", flexShrink: 0,
                boxShadow: product.inStock ? "0 4px 12px rgba(37,211,102,0.35)" : "none",
              }}
              onMouseEnter={e => { if (product.inStock) { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 16px rgba(37,211,102,0.5)"; }}}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = product.inStock ? "0 4px 12px rgba(37,211,102,0.35)" : "none"; }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
