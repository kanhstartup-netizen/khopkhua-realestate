import { NavLink, useNavigate } from "react-router-dom";
import { Home, Building2, Bot, Menu, Plus } from "lucide-react";

export function PhoneShell({ children }) {
  return (
    <div className="app-bg min-h-screen flex justify-center">
      <div className="w-full max-w-[440px] min-h-screen relative pb-24">
        {children}
      </div>
    </div>
  );
}

export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 text-xs text-white/70">
      <span className="font-semibold">9:41</span>
      <div className="flex items-center gap-1.5">
        <span>●●●</span>
        <span>📶</span>
        <span>🔋</span>
      </div>
    </div>
  );
}

export function BottomNav() {
  const navigate = useNavigate();
  const base =
    "flex flex-col items-center gap-1 text-[11px] transition-colors";
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-40">
      <div className="glass mx-3 mb-3 rounded-2xl px-2 py-2 flex items-center justify-around relative">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${base} ${isActive ? "text-brand-400" : "text-white/55"}`
          }
        >
          <Home size={20} />
          ໜ້າຫລັກ
        </NavLink>
        <NavLink
          to="/properties"
          className={({ isActive }) =>
            `${base} ${isActive ? "text-brand-400" : "text-white/55"}`
          }
        >
          <Building2 size={20} />
          ຊັບສິນ
        </NavLink>

        <button
          onClick={() => navigate("/add")}
          aria-label="ເພີ່ມຊັບສິນ"
          className="gradient-btn w-12 h-12 rounded-full flex items-center justify-center -mt-6 shadow-glow pulse-ring"
        >
          <Plus size={24} className="text-white" />
        </button>

        <NavLink
          to="/staff"
          className={({ isActive }) =>
            `${base} ${isActive ? "text-violet-500" : "text-white/55"}`
          }
        >
          <Bot size={20} />
          AI Staff
        </NavLink>
        <NavLink
          to="/more"
          className={({ isActive }) =>
            `${base} ${isActive ? "text-brand-400" : "text-white/55"}`
          }
        >
          <Menu size={20} />
          ເພີ່ມເຕີມ
        </NavLink>
      </div>
    </div>
  );
}
