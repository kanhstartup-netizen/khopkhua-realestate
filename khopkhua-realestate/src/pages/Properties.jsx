import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, Bell, ChevronRight, Bed, Bath, Trash2 } from "lucide-react";
import { StatusBar } from "../components/Shell";
import { useStore } from "../context/Store";
import { fmtLAK } from "../data/seed";

const tabs = [
  { key: "all", label: "ທັງໝົດ" },
  { key: "land", label: "ດິນ" },
  { key: "house", label: "ເຮືອນ" },
  { key: "building", label: "ອາຄານ" },
];

export default function Properties() {
  const navigate = useNavigate();
  const { properties, removeProperty } = useStore();
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");

  const filtered = properties.filter((p) => {
    const matchTab = tab === "all" || p.type === tab;
    const matchQ =
      !q ||
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.location.toLowerCase().includes(q.toLowerCase());
    return matchTab && matchQ;
  });

  const count = (t) =>
    t === "all" ? properties.length : properties.filter((p) => p.type === t).length;

  return (
    <div className="fade-up">
      <StatusBar />
      <div className="px-5 pt-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">ຊັບສິນ</h1>
        <button className="relative" aria-label="ການແຈ້ງເຕືອນ">
          <Bell size={20} className="text-white/80" />
          <span className="absolute -top-1 -right-1 bg-rose-500 w-2.5 h-2.5 rounded-full" />
        </button>
      </div>

      {/* Search */}
      <div className="px-5 mt-4 flex gap-2">
        <div className="card flex-1 flex items-center gap-2 px-3">
          <Search size={18} className="text-white/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ຄົ້ນຫາ ທຳເລ, ເຈົ້າຂອງ, ປະເພດ..."
            className="bg-transparent py-3 text-sm w-full outline-none text-white placeholder:text-white/40"
          />
        </div>
        <button className="gradient-btn w-11 rounded-2xl flex items-center justify-center" aria-label="ກັ່ນຕອງ">
          <SlidersHorizontal size={18} className="text-white" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-5 mt-4 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition ${
              tab === t.key
                ? "gradient-btn text-white"
                : "card text-white/60"
            }`}
          >
            {t.label} ({count(t.key)})
          </button>
        ))}
      </div>

      {/* List */}
      <div className="px-5 mt-4 space-y-3">
        {filtered.map((p) => (
          <div key={p.id} className="card p-3 flex gap-3">
            <img
              src={p.img}
              alt={p.name}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <p className="font-semibold text-white text-sm truncate">{p.name}</p>
                <ChevronRight size={16} className="text-white/30 shrink-0" />
              </div>
              <p className="text-[11px] text-white/55 truncate">{p.location}</p>
              {p.type === "house" || p.type === "building" ? (
                <div className="flex items-center gap-3 text-[11px] text-white/55 mt-1">
                  {p.beds > 0 && (
                    <span className="flex items-center gap-1">
                      <Bed size={12} /> {p.beds}
                    </span>
                  )}
                  {p.baths > 0 && (
                    <span className="flex items-center gap-1">
                      <Bath size={12} /> {p.baths}
                    </span>
                  )}
                  <span>{p.area} m²</span>
                </div>
              ) : (
                <p className="text-[11px] text-white/55 mt-1">{p.area} m²</p>
              )}
              <div className="flex items-center justify-between mt-1.5">
                <p className="text-sm gold-text font-bold">{fmtLAK(p.price)}</p>
                <span className="bg-brand-600/20 text-brand-400 text-[9px] px-2 py-0.5 rounded-md">
                  {p.status}
                </span>
              </div>
              <button
                onClick={() => removeProperty(p.id)}
                className="text-[10px] text-rose-400/70 flex items-center gap-1 mt-1"
              >
                <Trash2 size={11} /> ລຶບ
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-white/40 text-sm py-12">
            ບໍ່ພົບຊັບສິນ — ກົດ ➕ ເພື່ອເພີ່ມຊັບໃໝ່
          </div>
        )}
      </div>
      <div className="h-6" />
    </div>
  );
}
