import { useState, useRef, useEffect } from "react";
import { Lock, X, Eye, EyeOff, ShieldCheck } from "lucide-react";

interface AdminLockProps {
  onUnlock: () => void;
}

const ADMIN_USERNAME = "Teshira";
const ADMIN_PASSWORD = "1234tttt";

export function AdminLock({ onUnlock }: AdminLockProps) {
  const [pos, setPos] = useState({ x: -1, y: -1 }); // -1 means unset — positioned after mount
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const moved = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const isDragging = useRef(false);

  // Set initial position after mount so window dimensions are correct
  useEffect(() => {
    setPos({ x: window.innerWidth - 72, y: window.innerHeight - 120 });
    const onResize = () => {
      setPos(p => ({
        x: Math.min(p.x, window.innerWidth - 60),
        y: Math.min(p.y, window.innerHeight - 60),
      }));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    moved.current = false;
    isDragging.current = true;
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - dragStart.current.mx;
      const dy = ev.clientY - dragStart.current.my;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) moved.current = true;
      setPos({
        x: Math.max(8, Math.min(window.innerWidth - 58, dragStart.current.px + dx)),
        y: Math.max(8, Math.min(window.innerHeight - 58, dragStart.current.py + dy)),
      });
    };
    const onUp = () => {
      isDragging.current = false;
      if (!moved.current) setShowModal(true);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    moved.current = false;
    dragStart.current = { mx: t.clientX, my: t.clientY, px: pos.x, py: pos.y };
    const onMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      const dx = touch.clientX - dragStart.current.mx;
      const dy = touch.clientY - dragStart.current.my;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) moved.current = true;
      setPos({
        x: Math.max(8, Math.min(window.innerWidth - 58, dragStart.current.px + dx)),
        y: Math.max(8, Math.min(window.innerHeight - 58, dragStart.current.py + dy)),
      });
    };
    const onEnd = () => {
      if (!moved.current) setShowModal(true);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onEnd);
  };

  const handleLogin = async () => {
    setError("");
    if (!username || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setLoading(false);
      setShowModal(false);
      setUsername(""); setPassword("");
      onUnlock();
    } else {
      setLoading(false);
      setError("Invalid username or password.");
    }
  };

  // Don't render until position is calculated
  if (pos.x === -1) return null;

  return (
    <>
      {/* Draggable lock button */}
      <div
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        title="Admin Access"
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          zIndex: 9999,
          width: 50, height: 50,
          borderRadius: "50%",
          background: "rgba(27,58,107,0.88)",
          backdropFilter: "blur(10px)",
          border: "1.5px solid rgba(201,160,37,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "grab",
          boxShadow: "0 4px 20px rgba(27,58,107,0.40), 0 0 0 4px rgba(201,160,37,0.08)",
          userSelect: "none",
          animation: "lockFloat 3s ease-in-out infinite",
          touchAction: "none",
        }}
      >
        <Lock size={18} color="#c9a025" />
      </div>

      {/* Login modal */}
      {showModal && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) { setShowModal(false); setError(""); } }}
          style={{
            position: "fixed", inset: 0, zIndex: 10000,
            background: "rgba(15,34,68,0.72)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Outfit', sans-serif",
            animation: "fadeIn 0.25s ease",
          }}
        >
          <div style={{
            background: "#fff", borderRadius: 20, padding: "40px 40px 36px",
            width: "100%", maxWidth: 380, margin: "0 16px",
            boxShadow: "0 40px 100px rgba(15,34,68,0.30)",
            border: "1px solid rgba(201,160,37,0.18)",
            animation: "scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 11,
                  background: "linear-gradient(135deg, #1b3a6b, #2d5aa8)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 14px rgba(27,58,107,0.30)",
                }}>
                  <ShieldCheck size={20} color="#c9a025" />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e" }}>Admin Access</div>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 1 }}>Teshira Furniture</div>
                </div>
              </div>
              <button onClick={() => { setShowModal(false); setError(""); setUsername(""); setPassword(""); }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 4 }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#1b3a6b", marginBottom: 7, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                Username
              </label>
              <input
                type="text" value={username} autoFocus
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter username"
                style={{
                  width: "100%", padding: "11px 14px", borderRadius: 9,
                  border: "1.5px solid rgba(27,58,107,0.15)", fontSize: 15,
                  color: "#1a1a2e", background: "#f8faff", outline: "none",
                  fontFamily: "'Outfit', sans-serif", boxSizing: "border-box",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={e => { e.target.style.borderColor = "#1b3a6b"; e.target.style.boxShadow = "0 0 0 3px rgba(27,58,107,0.08)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(27,58,107,0.15)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            <div style={{ marginBottom: 10 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#1b3a6b", marginBottom: 7, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Enter password"
                  style={{
                    width: "100%", padding: "11px 44px 11px 14px", borderRadius: 9,
                    border: "1.5px solid rgba(27,58,107,0.15)", fontSize: 15,
                    color: "#1a1a2e", background: "#f8faff", outline: "none",
                    fontFamily: "'Outfit', sans-serif", boxSizing: "border-box",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onFocus={e => { e.target.style.borderColor = "#1b3a6b"; e.target.style.boxShadow = "0 0 0 3px rgba(27,58,107,0.08)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(27,58,107,0.15)"; e.target.style.boxShadow = "none"; }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 2 }}>
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ color: "#ef4444", fontSize: 13, marginBottom: 10, padding: "9px 12px", background: "#fef2f2", borderRadius: 8, border: "1px solid #fecaca", animation: "shake 0.35s ease" }}>
                {error}
              </div>
            )}

            <button onClick={handleLogin} disabled={loading} style={{
              width: "100%", marginTop: 10,
              background: loading ? "#94a3b8" : "linear-gradient(135deg, #1b3a6b, #2d5aa8)",
              color: "#fff", border: "none", cursor: loading ? "wait" : "pointer",
              padding: "13px 0", borderRadius: 10, fontSize: 15, fontWeight: 700,
              fontFamily: "'Outfit', sans-serif",
              boxShadow: loading ? "none" : "0 4px 18px rgba(27,58,107,0.30)",
              transition: "all 0.25s",
              letterSpacing: "0.2px",
            }}
              onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "none"; }}
            >
              {loading ? "Verifying…" : "Sign In"}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes lockFloat {
          0%, 100% { transform: translateY(0px); box-shadow: 0 4px 20px rgba(27,58,107,0.40), 0 0 0 4px rgba(201,160,37,0.08); }
          50% { transform: translateY(-5px); box-shadow: 0 10px 28px rgba(27,58,107,0.35), 0 0 0 6px rgba(201,160,37,0.12); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </>
  );
}
