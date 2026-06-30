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

/**
 * Shared, polished page header used across screens.
 * - logo glints, title gets a soft gradient underline
 * - bell button has a notification pulse
 */
export function PageHeader({ title, subtitle, showBell = true, badge = 12 }) {
  return (
    <div className="px-5 pt-4 flex items-center justify-between relative">
      <div className="flex items-center gap-3 fade-up">
        <div className="relative">
          <Logo size={38} />
          <div className="absolute -inset-1 rounded-full bg-emerald-400/10 blur-md -z-10" />
        </div>
        <div>
          {subtitle && <p className="text-xs text-white/55">{subtitle}</p>}
          <p className="font-bold text-white text-lg leading-tight">{title}</p>
          <div className="h-[3px] w-8 rounded-full mt-0.5" style={{ background: "linear-gradient(90deg,#e8b840,#34d399)" }} />
        </div>
      </div>
      {showBell && (
        <button className="relative active:scale-90 transition-transform" aria-label="ການແຈ້ງເຕືອນ">
          <span className="absolute inset-0 -m-2 rounded-full bg-violet-500/10 pulse-ring" />
          <Bell size={22} className="text-white/80 relative" />
          {badge > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {badge}
            </span>
          )}
        </button>
      )}
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
