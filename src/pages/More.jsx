import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Building2,
  Users,
  CheckSquare,
  FileText,
  BarChart3,
  Calendar,
  Bell,
  CloudUpload,
  Smartphone,
  Settings,
  Droplet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatusBar, PageHeader } from "../components/Shell";
import { perfData } from "../data/seed";

const features = [
  { icon: Building2, label: "ຈັດການຊັບສິນ", color: "#8b5cf6", to: "/properties" },
  { icon: Droplet, label: "ໃສ່ລາຍນ້ຳ", color: "#22c55e", to: "/watermark" },
  { icon: Users, label: "ລູກຄ້າ & Leads", color: "#06b6d4" },
  { icon: CheckSquare, label: "ຈັດການໜ້າວຽກ", color: "#22c55e", to: "/staff" },
  { icon: FileText, label: "ເອກະສານກົດໝາຍ", color: "#a78bfa" },
  { icon: BarChart3, label: "ລາຍງານ & ສະຖິຕິ", color: "#f59e0b" },
  { icon: Calendar, label: "ປະຕິທິນ", color: "#3b82f6" },
  { icon: Bell, label: "ການແຈ້ງເຕືອນ", color: "#ef4444", badge: 12 },
  { icon: CloudUpload, label: "Backup & Sync", color: "#06b6d4" },
  { icon: Smartphone, label: "Mobile Access", color: "#10b981" },
  { icon: Settings, label: "ການຕັ້ງຄ່າ", color: "#94a3b8" },
];

export default function More() {
  const navigate = useNavigate();
  return (
    <div className="fade-up">
      <StatusBar />
      <PageHeader subtitle="Khopkhua Realestate" title="ເພີ່ມເຕີມ" badge={0} />

      {/* Performance */}
      <div className="px-5 mt-4">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-white text-sm">ພາບລວມຜົນງານ</p>
            <span className="text-[11px] text-white/50 bg-white/5 px-2 py-1 rounded-lg">
              ລາຍເດືອນ
            </span>
          </div>
          <div className="flex gap-4 mb-2 text-[11px]">
            <span className="flex items-center gap-1.5 text-white/70">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500" /> ຊັບສິນ
            </span>
            <span className="flex items-center gap-1.5 text-white/70">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-400" /> ດີລ
            </span>
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={perfData} margin={{ left: -20, right: 6, top: 6 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#8b5cf6" stopOpacity={0.6} />
                  <stop offset="1" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#34d399" stopOpacity={0.6} />
                  <stop offset="1" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#23304f" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#7c89a8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#7c89a8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "#161d33",
                  border: "1px solid #23304f",
                  borderRadius: 12,
                  color: "#fff",
                }}
              />
              <Area type="monotone" dataKey="properties" stroke="#8b5cf6" fill="url(#g1)" strokeWidth={2} />
              <Area type="monotone" dataKey="deals" stroke="#34d399" fill="url(#g2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick features */}
      <div className="px-5 mt-5">
        <p className="font-semibold text-white mb-3">ຄຸນສົມບັດດ່ວນ</p>
        <div className="grid grid-cols-2 gap-3">
          {features.map((f, i) => (
            <button
              key={i}
              onClick={() => f.to && navigate(f.to)}
              style={{ animationDelay: `${i * 40}ms` }}
              className="card p-3.5 flex items-center gap-3 relative active:scale-95 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 fade-up group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3"
                style={{ background: `${f.color}22` }}
              >
                <f.icon size={20} style={{ color: f.color }} />
              </div>
              <span className="text-xs text-white/80 text-left">{f.label}</span>
              {f.badge && (
                <span className="absolute top-2 right-2 bg-rose-500 text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {f.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 mt-6 text-center">
        <p className="text-[11px] text-white/35">Khopkhua Realestate v1.0</p>
        <p className="text-[10px] text-white/25 mt-1">ລະບົບຈັດການອະສັງຫາ ອັດສະລິຍະ</p>
      </div>
      <div className="h-6" />
    </div>
  );
}
