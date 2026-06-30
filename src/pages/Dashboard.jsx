import { useNavigate } from "react-router-dom";
import {
  Building2,
  Users,
  CheckSquare,
  TrendingUp,
  TrendingDown,
  Bot,
  Megaphone,
  BarChart3,
  Calendar,
  ChevronRight,
  Sparkles,
  Search,
  Droplet,
} from "lucide-react";
import { StatusBar, PageHeader } from "../components/Shell";
import { useStore } from "../context/Store";
import { fmtLAK } from "../data/seed";

function Stat({ value, label, delta, up = true }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-[11px] text-white/55">{label}</div>
      <div
        className={`flex items-center justify-center gap-0.5 text-[11px] mt-0.5 ${
          up ? "text-brand-400" : "text-rose-400"
        }`}
      >
        {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {delta}
      </div>
    </div>
  );
}

const quick = [
  { icon: Building2, label: "ຊັບສິນ", to: "/properties", color: "#10b981" },
  { icon: Search, label: "ຄົ້ນຫາຊັບ", to: "/finder", color: "#06b6d4" },
  { icon: CheckSquare, label: "ໜ້າວຽກ", to: "/staff", color: "#f59e0b" },
  { icon: Users, label: "ລູກຄ້າ", to: "/more", color: "#ec4899" },
  { icon: Bot, label: "Staff AI", to: "/staff", color: "#8b5cf6", badge: 40 },
  { icon: Megaphone, label: "ການຕະຫລາດ", to: "/staff", color: "#ef4444" },
  { icon: Droplet, label: "ໃສ່ລາຍນ້ຳ", to: "/watermark", color: "#22c55e" },
  { icon: Calendar, label: "ປະຕິທິນ", to: "/more", color: "#3b82f6" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { properties } = useStore();
  const recent = properties[0];

  return (
    <div className="fade-up">
      <StatusBar />
      <PageHeader subtitle="ຍິນດີຕ້ອນຮັບກັບມາ," title="ທີມ Khopkhua 👋" />

      {/* Overview */}
      <div className="px-5 mt-4">
        <div className="card p-4 relative overflow-hidden">
          <div
            className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl"
            style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }}
          />
          <p className="text-xs text-white/55 mb-3 relative flex items-center gap-1.5">
            <Sparkles size={12} className="text-gold" /> ພາບລວມ
          </p>
          <div className="grid grid-cols-4 gap-2 relative">
            <Stat value={properties.length} label="ຊັບສິນ" delta="12%" />
            <Stat value="196" label="Leads" delta="8%" />
            <Stat value="84" label="ດີລ" delta="16%" />
            <Stat value="32" label="ໜ້າວຽກ" delta="3%" up={false} />
          </div>
        </div>
      </div>

      {/* Quick access */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-white">ເຂົ້າເຖິງດ່ວນ</p>
          <button className="text-xs text-brand-400">ແກ້ໄຂ</button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {quick.map((q, i) => (
            <button
              key={i}
              onClick={() => navigate(q.to)}
              style={{ animationDelay: `${i * 45}ms` }}
              className="card py-3 flex flex-col items-center gap-2 relative active:scale-90 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 fade-up group"
            >
              {q.badge && (
                <span className="absolute top-1.5 right-1.5 bg-violet-600 text-[8px] px-1.5 rounded-full">
                  {q.badge}
                </span>
              )}
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95"
                style={{ background: `${q.color}1f` }}
              >
                <q.icon size={19} style={{ color: q.color }} />
              </span>
              <span className="text-[10px] text-white/70">{q.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent property */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-white">ຊັບສິນລ່າສຸດ</p>
          <button
            onClick={() => navigate("/properties")}
            className="text-xs text-brand-400"
          >
            ເບິ່ງທັງໝົດ
          </button>
        </div>
        {recent && (
          <button
            onClick={() => navigate("/properties")}
            className="card p-3 w-full flex items-center gap-3 text-left active:scale-[0.98] transition hover:border-white/20"
          >
            <img
              src={recent.img}
              alt={recent.name}
              className="w-20 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold text-white text-sm">{recent.name}</p>
              <p className="text-[11px] text-white/55">{recent.location}</p>
              <p className="text-[11px] text-white/55">{recent.area} m²</p>
              <p className="text-sm gold-text font-bold mt-1">
                {fmtLAK(recent.price)}
              </p>
            </div>
            <span className="self-start bg-brand-600/20 text-brand-400 text-[10px] px-2 py-1 rounded-lg">
              {recent.status}
            </span>
            <ChevronRight size={18} className="text-white/40" />
          </button>
        )}
      </div>

      <div className="h-6" />
    </div>
  );
}
