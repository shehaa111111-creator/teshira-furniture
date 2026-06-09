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
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                background: product.inStock ? "#25D366" : "#94a3b8",
                color: "#fff", border: "none", cursor: product.inStock ? "pointer" : "not-allowed",
                padding: "15px 24px", borderRadius: 12,
                fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif",
                boxShadow: product.inStock ? "0 4px 16px rgba(37,211,102,0.4)" : "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { if (product.inStock) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "none"; }}
            >
              <MessageCircle size={20} />
              Order via WhatsApp
              <ChevronRight size={18} />
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
          .modal-inner { flex-direction: column !important; }
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
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: product.inStock ? "#25D366" : "#94a3b8",
                color: "#fff", border: "none", cursor: product.inStock ? "pointer" : "not-allowed",
                padding: "11px 18px", borderRadius: 9,
                fontSize: 14, fontWeight: 700, fontFamily: "'Outfit', sans-serif",
                transition: "all 0.2s", whiteSpace: "nowrap",
                boxShadow: product.inStock ? "0 4px 12px rgba(37,211,102,0.35)" : "none",
              }}
            >
              <MessageCircle size={16} />
              Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
