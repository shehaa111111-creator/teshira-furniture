import { useState, useEffect, useRef } from "react";
import {
  collection, addDoc, updateDoc, deleteDoc, doc,
  onSnapshot, query, serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../../firebase/config";

const CLOUDINARY_CLOUD_NAME = "duo1tzgrb";
const CLOUDINARY_UPLOAD_PRESET = "teshira_upload";

import {
  X, Plus, Edit2, Trash2, Save, Upload, ImageIcon,
  Package, AlertTriangle, CheckCircle, LogOut,
} from "lucide-react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  imageUrls?: string[];
  inStock: boolean;
  featured?: boolean;
  createdAt?: unknown;
}

const CATEGORIES = ["Living Room", "Bedroom", "Dining", "Office", "Outdoor", "Other"];

const EMPTY_FORM = {
  name: "", description: "", price: "", category: "Living Room",
  imageUrl: "", imageUrls: [] as string[], inStock: true, featured: false,
};

const LS_KEY = "teshira_products";
function lsGet(): Product[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); } catch { return []; }
}
function lsSave(products: Product[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(products));
}

interface AdminPanelProps {
  onClose: () => void;
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [tab, setTab] = useState<"list" | "add">("list");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    if (isFirebaseConfigured) {
      const q = query(collection(db, "products"));
      const unsub = onSnapshot(q, (snap) => {
        setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product)));
      });
      return () => unsub();
    } else {
      setProducts(lsGet());
    }
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    const uploadedUrls: string[] = [];
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );
        const data = await res.json();
        if (data.secure_url) uploadedUrls.push(data.secure_url);
      }
      if (uploadedUrls.length > 0) {
        setForm((f) => ({
          ...f,
          imageUrls: [...f.imageUrls, ...uploadedUrls],
          imageUrl: f.imageUrl || uploadedUrls[0],
        }));
        showToast(`${uploadedUrls.length} image(s) uploaded!`);
      } else {
        showToast("Upload failed. Try pasting an image URL instead.", "error");
      }
    } catch {
      showToast("Upload failed. Please use an image URL instead.", "error");
    } finally {
      setUploading(false);
    }
  };

  const addImageUrl = (url: string) => {
    if (!url.trim()) return;
    setForm((f) => ({
      ...f,
      imageUrls: [...f.imageUrls, url.trim()],
      imageUrl: f.imageUrl || url.trim(),
    }));
  };

  const removeImage = (index: number) => {
    setForm((f) => {
      const newUrls = f.imageUrls.filter((_, i) => i !== index);
      return { ...f, imageUrls: newUrls, imageUrl: newUrls[0] || "" };
    });
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) { showToast("Product name is required.", "error"); return; }
    if (!form.price || isNaN(Number(form.price))) { showToast("Enter a valid price.", "error"); return; }
    setLoading(true);

    const data = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category: form.category,
      imageUrl: form.imageUrls[0] || form.imageUrl.trim(),
      imageUrls: form.imageUrls.length > 0 ? form.imageUrls : form.imageUrl.trim() ? [form.imageUrl.trim()] : [],
      inStock: form.inStock,
      featured: form.featured,
    };

    try {
      if (isFirebaseConfigured) {
        if (editingId) {
          await updateDoc(doc(db, "products", editingId), data);
        } else {
          await addDoc(collection(db, "products"), { ...data, createdAt: serverTimestamp() });
        }
      } else {
        const saved = lsGet();
        if (editingId) {
          const idx = saved.findIndex((p) => p.id === editingId);
          if (idx !== -1) saved[idx] = { ...saved[idx], ...data };
          lsSave(saved);
          setProducts(saved);
        } else {
          const newProduct = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() };
          const updated = [newProduct, ...saved];
          lsSave(updated);
          setProducts(updated);
        }
      }
      showToast(editingId ? "Product updated!" : "Product added!");
      setForm(EMPTY_FORM);
      setEditingId(null);
      setTab("list");
    } catch {
      showToast("Failed to save product.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      category: product.category,
      imageUrl: product.imageUrl,
      imageUrls: product.imageUrls || (product.imageUrl ? [product.imageUrl] : []),
      inStock: product.inStock,
      featured: product.featured || false,
    });
    setEditingId(product.id);
    setTab("add");
  };

  const handleDelete = async (id: string) => {
    try {
      if (isFirebaseConfigured) {
        await deleteDoc(doc(db, "products", id));
      } else {
        const saved = lsGet().filter((p) => p.id !== id);
        lsSave(saved);
        setProducts(saved);
      }
      showToast("Product deleted.");
      setDeleteConfirm(null);
    } catch {
      showToast("Failed to delete.", "error");
    }
  };

  const inp = (placeholder: string, value: string, onChange: (v: string) => void, type = "text", textarea = false) => {
    const style: React.CSSProperties = {
      width: "100%", padding: "10px 13px",
      border: "1.5px solid rgba(27,58,107,0.15)", borderRadius: 8,
      fontSize: 14, color: "#1a1a2e", background: "#f8faff",
      outline: "none", fontFamily: "'Outfit', sans-serif",
      boxSizing: "border-box", resize: "vertical",
      transition: "border-color 0.2s",
    };
    if (textarea) return (
      <textarea placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} rows={3} style={style}
        onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = "#1b3a6b"; }}
        onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(27,58,107,0.15)"; }}
      />
    );
    return (
      <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} style={style}
        onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "#1b3a6b"; }}
        onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(27,58,107,0.15)"; }}
      />
    );
  };

  // URL paste state
  const [pasteUrl, setPasteUrl] = useState("");

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(15,34,68,0.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "stretch", justifyContent: "flex-end", fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 680, background: "#fff", height: "100%", display: "flex", flexDirection: "column", boxShadow: "-20px 0 60px rgba(15,34,68,0.2)" }}>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #1b3a6b, #2d5aa8)", padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>Admin Panel</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>
              Teshira Furniture — Product Management
              {!isFirebaseConfigured && <span style={{ marginLeft: 8, fontSize: 11, color: "#fcd34d", background: "rgba(252,211,77,0.15)", padding: "2px 8px", borderRadius: 4 }}>⚡ Local mode</span>}
            </div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.12)", border: "none", cursor: "pointer", borderRadius: 8, padding: 8, color: "#fff" }}>
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1.5px solid rgba(27,58,107,0.1)", flexShrink: 0, padding: "0 28px" }}>
          {[{ key: "list", label: `All Products (${products.length})` }, { key: "add", label: editingId ? "Edit Product" : "Add Product" }].map(({ key, label }) => (
            <button key={key} onClick={() => { setTab(key as "list" | "add"); if (key === "list") { setEditingId(null); setForm(EMPTY_FORM); } }}
              style={{ padding: "14px 0", marginRight: 24, background: "none", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif", color: tab === key ? "#1b3a6b" : "#94a3b8", borderBottom: tab === key ? "2px solid #1b3a6b" : "2px solid transparent", transition: "all 0.2s" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

          {/* Product list */}
          {tab === "list" && (
            <div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
                <button onClick={() => { setTab("add"); setEditingId(null); setForm(EMPTY_FORM); }}
                  style={{ display: "flex", alignItems: "center", gap: 8, background: "#1b3a6b", color: "#fff", border: "none", cursor: "pointer", padding: "10px 18px", borderRadius: 9, fontSize: 14, fontWeight: 600, fontFamily: "'Outfit', sans-serif", boxShadow: "0 2px 10px rgba(27,58,107,0.25)" }}>
                  <Plus size={16} />Add Product
                </button>
              </div>
              {products.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>
                  <Package size={48} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
                  <p>No products yet. Add your first product!</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {products.map((product) => (
                    <div key={product.id} style={{ border: "1.5px solid rgba(27,58,107,0.1)", borderRadius: 12, padding: "14px 16px", display: "flex", gap: 14, alignItems: "center", background: "#fff" }}>
                      <div style={{ width: 60, height: 60, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: "#f4f6fb" }}>
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><ImageIcon size={22} color="rgba(27,58,107,0.25)" /></div>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                          <span style={{ fontSize: 12, color: "#64748b" }}>{product.category}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#1b3a6b" }}>Rs. {product.price.toLocaleString()}</span>
                          <span style={{ fontSize: 11, padding: "2px 7px", borderRadius: 5, background: product.inStock ? "#dcfce7" : "#fee2e2", color: product.inStock ? "#16a34a" : "#ef4444", fontWeight: 600 }}>{product.inStock ? "In Stock" : "Out of Stock"}</span>
                          {product.imageUrls && product.imageUrls.length > 1 && (
                            <span style={{ fontSize: 11, padding: "2px 7px", borderRadius: 5, background: "#eff4ff", color: "#1b3a6b", fontWeight: 600 }}>📷 {product.imageUrls.length} photos</span>
                          )}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                        <button onClick={() => handleEdit(product)} style={{ background: "#eff4ff", border: "none", cursor: "pointer", borderRadius: 7, padding: "8px", color: "#1b3a6b" }} title="Edit"><Edit2 size={14} /></button>
                        {deleteConfirm === product.id ? (
                          <div style={{ display: "flex", gap: 4 }}>
                            <button onClick={() => handleDelete(product.id)} style={{ background: "#fee2e2", border: "none", cursor: "pointer", borderRadius: 7, padding: "6px 10px", color: "#ef4444", fontSize: 12, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Delete</button>
                            <button onClick={() => setDeleteConfirm(null)} style={{ background: "#f4f6fb", border: "none", cursor: "pointer", borderRadius: 7, padding: "6px 10px", color: "#64748b", fontSize: 12, fontFamily: "'Outfit', sans-serif" }}>Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(product.id)} style={{ background: "#fee2e2", border: "none", cursor: "pointer", borderRadius: 7, padding: "8px", color: "#ef4444" }} title="Delete"><Trash2 size={14} /></button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Add/Edit form */}
          {tab === "add" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1b3a6b", marginBottom: 6 }}>Product Name *</label>
                {inp("e.g. Milano L-Shaped Sofa", form.name, (v) => setForm(f => ({ ...f, name: v })))}
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1b3a6b", marginBottom: 6 }}>Description</label>
                {inp("Describe the product — material, dimensions, features…", form.description, (v) => setForm(f => ({ ...f, description: v })), "text", true)}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1b3a6b", marginBottom: 6 }}>Price (Rs.) *</label>
                  {inp("e.g. 85000", form.price, (v) => setForm(f => ({ ...f, price: v })), "number")}
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1b3a6b", marginBottom: 6 }}>Category</label>
                  <select value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
                    style={{ width: "100%", padding: "10px 13px", border: "1.5px solid rgba(27,58,107,0.15)", borderRadius: 8, fontSize: 14, color: "#1a1a2e", background: "#f8faff", outline: "none", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" }}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Multi-image section */}
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1b3a6b", marginBottom: 6 }}>
                  Product Images ({form.imageUrls.length} added)
                </label>

                {/* Upload button */}
                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <button onClick={() => fileRef.current?.click()} disabled={uploading}
                    style={{ display: "flex", alignItems: "center", gap: 6, background: uploading ? "#94a3b8" : "#1b3a6b", color: "#fff", border: "none", cursor: uploading ? "wait" : "pointer", padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>
                    <Upload size={14} />
                    {uploading ? "Uploading…" : "Upload Photos"}
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: "none" }} />
                  <span style={{ fontSize: 12, color: "#94a3b8", alignSelf: "center" }}>You can select multiple photos at once</span>
                </div>

                {/* Paste URL */}
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <input
                    type="text" placeholder="Or paste an image URL and press Add"
                    value={pasteUrl} onChange={(e) => setPasteUrl(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && pasteUrl.trim()) { addImageUrl(pasteUrl); setPasteUrl(""); } }}
                    style={{ flex: 1, padding: "10px 13px", border: "1.5px solid rgba(27,58,107,0.15)", borderRadius: 8, fontSize: 14, color: "#1a1a2e", background: "#f8faff", outline: "none", fontFamily: "'Outfit', sans-serif" }}
                  />
                  <button onClick={() => { if (pasteUrl.trim()) { addImageUrl(pasteUrl); setPasteUrl(""); } }}
                    style={{ background: "#eff4ff", color: "#1b3a6b", border: "1.5px solid rgba(27,58,107,0.2)", cursor: "pointer", padding: "10px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>
                    Add
                  </button>
                </div>

                {/* Image previews */}
                {form.imageUrls.length > 0 && (
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {form.imageUrls.map((url, i) => (
                      <div key={i} style={{ position: "relative", width: 72, height: 60, borderRadius: 8, overflow: "hidden", border: i === 0 ? "2px solid #1b3a6b" : "2px solid rgba(27,58,107,0.15)" }}>
                        <img src={url} alt={`Image ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <button onClick={() => removeImage(i)}
                          style={{ position: "absolute", top: 2, right: 2, width: 18, height: 18, borderRadius: "50%", background: "rgba(239,68,68,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                          <X size={10} />
                        </button>
                        {i === 0 && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(27,58,107,0.8)", fontSize: 9, color: "#fff", textAlign: "center", padding: "2px 0" }}>Main</div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div style={{ display: "flex", gap: 24 }}>
                {[{ key: "inStock", label: "In Stock" }, { key: "featured", label: "Featured" }].map(({ key, label }) => (
                  <label key={key} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#1a1a2e" }}>
                    <div onClick={() => setForm(f => ({ ...f, [key]: !f[key as keyof typeof f] }))}
                      style={{ width: 44, height: 24, borderRadius: 100, background: form[key as keyof typeof form] ? "#1b3a6b" : "#e2e8f0", position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0 }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: form[key as keyof typeof form] ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
                    </div>
                    {label}
                  </label>
                ))}
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: 12, paddingTop: 8 }}>
                <button onClick={handleSubmit} disabled={loading}
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: loading ? "#94a3b8" : "#1b3a6b", color: "#fff", border: "none", cursor: loading ? "wait" : "pointer", padding: "13px 0", borderRadius: 10, fontSize: 15, fontWeight: 700, fontFamily: "'Outfit', sans-serif", boxShadow: loading ? "none" : "0 4px 16px rgba(27,58,107,0.25)" }}>
                  <Save size={16} />
                  {loading ? "Saving…" : editingId ? "Save Changes" : "Add Product"}
                </button>
                <button onClick={() => { setTab("list"); setEditingId(null); setForm(EMPTY_FORM); }}
                  style={{ background: "#f4f6fb", color: "#64748b", border: "none", cursor: "pointer", padding: "13px 20px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid rgba(27,58,107,0.08)", padding: "16px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>{isFirebaseConfigured ? "🔥 Firebase connected" : "💾 Local storage mode"}</span>
          <button onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1.5px solid rgba(27,58,107,0.15)", cursor: "pointer", padding: "7px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#64748b", fontFamily: "'Outfit', sans-serif" }}>
            <LogOut size={14} />Close Panel
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: toast.type === "success" ? "#1b3a6b" : "#ef4444", color: "#fff", borderRadius: 10, padding: "12px 20px", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.2)", zIndex: 10001, fontFamily: "'Outfit', sans-serif", animation: "slideUp 0.3s ease" }}>
          {toast.type === "success" ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
          {toast.msg}
        </div>
      )}

      <style>{`@keyframes slideUp { from { opacity: 0; transform: translateX(-50%) translateY(12px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }`}</style>
    </div>
  );
}
