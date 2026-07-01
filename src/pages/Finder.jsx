import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Search,
  Check,
  X,
  Facebook,
  Bed,
  Bath,
  MapPin,
  User,
  Phone,
  Clock,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useStore } from "../context/Store";
import { fmtLAK } from "../data/seed";

function SourceBadge({ source }) {
  const isFb = source === "Facebook";
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium"
      style={{
        background: isFb ? "rgba(59,130,246,0.18)" : "rgba(236,72,153,0.18)",
        color: isFb ? "#60a5fa" : "#f472b6",
      }}
    >
      {isFb ? <Facebook size={10} /> : <span className="font-bold">TT</span>}
      {source}
    </span>
  );
}

export default function Finder() {
  const navigate = useNavigate();
  const { leads, approveLead, rejectLead, simulateFind } = useStore();
  const [searching, setSearching] = useState(false);
  const [justAdded, setJustAdded] = useState(null);

  const runSearch = () => {
    setSearching(true);
    setTimeout(() => {
      simulateFind();
      setSearching(false);
    }, 1600);
  };

  const onApprove = (id) => {
    setJustAdded(id);
    setTimeout(() => approveLead(id), 350);
  };

  return (
    <div className="fade-up pt-3">
      {/* Header */}
      <div className="px-5 pt-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          aria-label="ກັບຄືນ"
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"
        >
          <ChevronLeft size={20} className="text-white/80" />
        </button>
        <div className="text-center flex-1">
          <h1 className="text-lg font-bold text-white">ທີມຄົ້ນຫາຊັບສິນ</h1>
          <p className="text-[11px] text-brand-400 flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            AI ກຳລັງຄົ້ນຫາ 24/7
          </p>
        </div>
        <div className="w-8" />
      </div>

      {/* Hero / stats */}
      <div className="px-5 mt-4">
        <div className="card p-4 relative overflow-hidden">
          <div
            className="absolute -top-12 -right-12 w-36 h-36 rounded-full opacity-25 blur-2xl"
            style={{ background: "radial-gradient(circle, #10b981, transparent 70%)" }}
          />
          <div className="flex items-center gap-3 relative">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/15 flex items-center justify-center">
              <Search size={24} className="text-brand-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">ຊັບທີ່ຄົ້ນພົບມື້ນີ້</p>
              <p className="text-[11px] text-white/55">
                ຈາກ Facebook & TikTok ໂດຍ AI
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold gold-text leading-none">{leads.length}</p>
              <p className="text-[10px] text-white/45">ລໍອະນຸມັດ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search button */}
      <div className="px-5 mt-4">
        <button
          onClick={runSearch}
          disabled={searching}
          className="w-full gradient-btn py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold text-white shadow-glow active:scale-95 hover:brightness-110 transition-all disabled:opacity-70"
        >
          {searching ? (
            <>
              <RefreshCw size={18} className="animate-spin" /> ກຳລັງຄົ້ນຫາ...
            </>
          ) : (
            <>
              <Sparkles size={18} /> ໃຫ້ AI ຄົ້ນຫາຊັບໃໝ່
            </>
          )}
        </button>
        <p className="text-center text-[11px] text-white/40 mt-2">
          ເປົ້າໝາຍ: 5–10 ຊັບສິນ/ມື້ • ລາຍງານເຂົ້າກຸ່ມອັດຕະໂນມັດ
        </p>
      </div>

      {/* Leads list */}
      <div className="px-5 mt-5">
        <p className="font-semibold text-white mb-3">ລໍຖ້າອະນຸມັດເຂົ້າແອັບ</p>

        {leads.length === 0 && (
          <div className="card p-8 text-center text-white/45 text-sm">
            ຍັງບໍ່ມີຊັບໃໝ່ — ກົດ "ໃຫ້ AI ຄົ້ນຫາຊັບໃໝ່" ດ້ານເທິງ
          </div>
        )}

        <div className="space-y-3">
          {leads.map((l, i) => (
            <div
              key={l.id}
              style={{ animationDelay: `${i * 50}ms` }}
              className={`card overflow-hidden fade-up transition-all duration-300 ${
                justAdded === l.id ? "opacity-0 scale-95" : ""
              }`}
            >
              <div className="relative">
                <img src={l.img} alt={l.name} className="w-full h-36 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-2 left-2 flex gap-1.5">
                  <SourceBadge source={l.source} />
                </div>
                <div className="absolute bottom-2 left-3 right-3">
                  <p className="text-white font-semibold text-sm drop-shadow">{l.name}</p>
                  <p className="text-white/80 text-[11px] flex items-center gap-1">
                    <MapPin size={10} /> {l.location}
                  </p>
                </div>
              </div>

              <div className="p-3">
                <div className="flex items-center justify-between">
                  <p className="gold-text font-bold">{fmtLAK(l.price)}</p>
                  <div className="flex items-center gap-3 text-[11px] text-white/55">
                    {l.beds > 0 && (
                      <span className="flex items-center gap-1">
                        <Bed size={12} /> {l.beds}
                      </span>
                    )}
                    {l.baths > 0 && (
                      <span className="flex items-center gap-1">
                        <Bath size={12} /> {l.baths}
                      </span>
                    )}
                    <span>{l.area} m²</span>
                  </div>
                </div>

                <p className="text-[11px] text-white/55 mt-2 leading-relaxed">{l.desc}</p>

                <div className="flex items-center gap-3 mt-2 text-[11px] text-white/50">
                  <span className="flex items-center gap-1">
                    <User size={11} /> {l.owner}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={11} /> {l.phone}
                  </span>
                </div>
                <p className="text-[10px] text-white/35 flex items-center gap-1 mt-1">
                  <Clock size={10} /> ຄົ້ນພົບ {l.foundAt}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => onApprove(l.id)}
                    className="flex-1 bg-brand-600 hover:bg-brand-500 py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-sm font-semibold text-white active:scale-95 transition-all"
                  >
                    <Check size={16} /> ເອົາເຂົ້າແອັບ
                  </button>
                  <button
                    onClick={() => rejectLead(l.id)}
                    className="px-4 card hover:border-rose-500/40 rounded-xl flex items-center justify-center text-rose-400 active:scale-95 transition-all"
                    aria-label="ປະຕິເສດ"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* n8n note */}
      <div className="px-5 mt-5">
        <div className="card p-4">
          <p className="text-xs text-white/55 leading-relaxed">
            🔗 ເຊື່ອມ <span className="text-brand-400">n8n + AI</span> ໃຫ້ດຶງຊັບຈາກ
            Facebook / TikTok ອັດຕະໂນມັດ. ເມື່ອ AI ເຈີຊັບໃໝ່ ມັນຈະສົ່ງເຂົ້າມາ
            ໃນໜ້ານີ້ ແລະ ແຈ້ງເຕືອນເຂົ້າກຸ່ມ. ກວດແລ້ວກົດ "ເອົາເຂົ້າແອັບ"
            ເພື່ອບັນທຶກເປັນຊັບສິນ.
          </p>
        </div>
      </div>

      <div className="h-6" />
    </div>
  );
}
