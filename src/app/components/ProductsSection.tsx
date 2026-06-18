import { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db, isFirebaseConfigured } from "../../firebase/config";
import { ProductCard, type Product } from "./ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { useReveal } from "./useReveal";

const STATIC_PRODUCTS: Product[] = [];

const CATEGORIES = ["All", "Living Room", "Bedroom", "Dining", "Office", "Outdoor", "Other"];

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>(STATIC_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { ref: headerRef, visible: headerVisible } = useReveal(0.2);
  const { ref: gridRef, visible: gridVisible } = useReveal(0.05);

  useEffect(() => {
    console.log("Firebase configured:", isFirebaseConfigured);
    if (!isFirebaseConfigured) return;
    setLoading(true);
    const q = query(collection(db, "products"));
    const unsub = onSnapshot(q, (snap) => {
      console.log("Snapshot received, docs count:", snap.docs.length);
      const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
      console.log("Products loaded:", items);
      setProducts(items);
      setLoading(false);
    }, (err) => { console.error("Firestore error:", err); setLoading(false); });
    return () => unsub();
  }, []);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="products" style={{ background: "#f8faff", padding: "100px 0 88px", fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          style={{
            textAlign: "center", marginBottom: 60,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(28px)",
            transition: "opacity 0.75s ease, transform 0.75s ease",
          }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(201,160,37,0.10)", border: "1px solid rgba(201,160,37,0.28)",
            borderRadius: 100, padding: "5px 18px", marginBottom: 18,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c9a025" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#c9a025", letterSpacing: "2px", textTransform: "uppercase" }}>Our Collection</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.5px", marginBottom: 14 }}>
            Premium Furniture for Every Room
          </h2>
          <p style={{ color: "#64748b", fontSize: 17, maxWidth: 520, margin: "0 auto", lineHeight: 1.65 }}>
            Browse our handpicked collection of quality furniture. Order easily via WhatsApp — no complicated checkout.
          </p>
        </div>

        {/* Filters */}
        <div style={{
          display: "flex", gap: 16, alignItems: "center", marginBottom: 40,
          flexWrap: "wrap", justifyContent: "space-between",
          opacity: headerVisible ? 1 : 0,
          transition: "opacity 0.7s ease 0.2s",
        }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: "8px 18px", borderRadius: 100,
                border: activeCategory === cat ? "none" : "1.5px solid rgba(27,58,107,0.18)",
                background: activeCategory === cat ? "#1b3a6b" : "#fff",
                color: activeCategory === cat ? "#fff" : "#1b3a6b",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
                transition: "all 0.22s ease",
                boxShadow: activeCategory === cat ? "0 3px 12px rgba(27,58,107,0.28)" : "none",
                transform: activeCategory === cat ? "scale(1.03)" : "scale(1)",
              }}>
                {cat}
              </button>
            ))}
          </div>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
            <input
              type="text" placeholder="Search furniture…" value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                paddingLeft: 36, paddingRight: 16, paddingTop: 9, paddingBottom: 9,
                border: "1.5px solid rgba(27,58,107,0.14)", borderRadius: 100,
                fontSize: 13, color: "#1a1a2e", background: "#fff", outline: "none",
                fontFamily: "'Outfit', sans-serif", minWidth: 200,
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => { e.target.style.borderColor = "#1b3a6b"; e.target.style.boxShadow = "0 0 0 3px rgba(27,58,107,0.07)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(27,58,107,0.14)"; e.target.style.boxShadow = "none"; }}
            />
          </div>
        </div>

        {/* Products grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
            <div style={{ width: 36, height: 36, border: "3px solid #eff4ff", borderTopColor: "#1b3a6b", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
            Loading products…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "70px 0", color: "#94a3b8" }}>
            <SlidersHorizontal size={44} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
            <p style={{ fontSize: 16 }}>No products found. Try a different category or search.</p>
          </div>
        ) : (
          <div
            ref={gridRef as React.RefObject<HTMLDivElement>}
            className="products-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28 }}
          >
            {filtered.map((product, i) => (
              <div key={product.id} style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? "none" : "translateY(32px)",
                transition: `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`,
              }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Mobile: 2-column equal grid */
        @media (max-width: 640px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
