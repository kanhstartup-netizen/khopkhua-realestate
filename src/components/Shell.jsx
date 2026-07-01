import { NavLink, useNavigate } from "react-router-dom";
import { Home, Building2, Bot, Menu, Plus, Bell } from "lucide-react";
import Logo from "./Logo";

export function PhoneShell({ children }) {
  return (
    <div className="app-bg min-h-screen flex justify-center">
      <div className="w-full max-w-[440px] min-h-screen relative pb-24 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}

/**
 * Shared, polished page header used across screens.
 * - logo glints, title gets a soft gradient underline
 * - bell button has a notification pulse
 */
export function PageHeader({ title, subtitle, showBell = true, badge = 12 }) {
  return (
    <div className="px-4 pt-3">
      <div className="header-wrap glass px-4 py-3 flex items-center justify-between">
        {/* animated background layer (behind content) */}
        <div className="absolute inset-0 -z-0 pointer-events-none">
          <div
            className="header-orb orb-a"
            style={{ width: 120, height: 120, left: -20, top: -40, background: "radial-gradient(circle,#7c3aed,transparent 70%)" }}
          />
          <div
            className="header-orb orb-b"
            style={{ width: 110, height: 110, right: -10, top: -30, background: "radial-gradient(circle,#10b981,transparent 70%)" }}
          />
          <div className="header-shimmer" />
        </div>

        {/* content */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="relative">
            <div className="logo-glow absolute -inset-1.5 rounded-full bg-emerald-400/20 blur-md -z-10" />
            <Logo size={40} />
          </div>
          <div>
            {subtitle && <p className="text-xs text-white/60">{subtitle}</p>}
            <p className="font-bold text-white text-lg leading-tight">{title}</p>
            <div
              className="h-[3px] w-9 rounded-full mt-0.5"
              style={{ background: "linear-gradient(90deg,#e8b840,#34d399)" }}
            />
          </div>
        </div>

        {showBell && (
          <button
            className="relative z-10 active:scale-90 transition-transform w-10 h-10 rounded-full glass flex items-center justify-center"
            aria-label="ການແຈ້ງເຕືອນ"
          >
            <span className="absolute inset-0 rounded-full bg-violet-500/10 pulse-ring" />
            <Bell size={20} className="text-white/85 relative" />
            {badge > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-[9px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center font-bold">
                {badge}
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

const navItems = [
  { to: "/", end: true, icon: Home, label: "ໜ້າຫລັກ" },
  { to: "/properties", icon: Building2, label: "ຊັບສິນ" },
];
const navItems2 = [
  { to: "/staff", icon: Bot, label: "AI Staff" },
  { to: "/more", icon: Menu, label: "ເພີ່ມເຕີມ" },
];

function NavBtn({ to, end, icon: Icon, label }) {
  return (
    <NavLink to={to} end={end} className="relative flex flex-col items-center gap-1 text-[11px] py-1 px-2 group">
      {({ isActive }) => (
        <>
          <span
            className={`absolute -top-1 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              isActive ? "bg-brand-400 opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          />
          <Icon
            size={20}
            className={`transition-all duration-300 ${
              isActive ? "text-brand-400 -translate-y-0.5 scale-110" : "text-white/50 group-active:scale-90"
            }`}
          />
          <span className={`transition-colors duration-300 ${isActive ? "text-brand-400 font-medium" : "text-white/50"}`}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}

export function BottomNav() {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-40">
      <div className="glass mx-3 mb-3 rounded-[26px] px-2 py-2 flex items-center justify-around relative shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
        {navItems.map((n) => (
          <NavBtn key={n.to} {...n} />
        ))}

        <button
          onClick={() => navigate("/add")}
          aria-label="ເພີ່ມຊັບສິນ"
          className="gradient-btn w-13 h-13 rounded-full flex items-center justify-center -mt-7 shadow-glow pulse-ring active:scale-90 transition-transform"
          style={{ width: 52, height: 52 }}
        >
          <Plus size={24} className="text-white" />
        </button>

        {navItems2.map((n) => (
          <NavBtn key={n.to} {...n} />
        ))}
      </div>
    </div>
  );
}
