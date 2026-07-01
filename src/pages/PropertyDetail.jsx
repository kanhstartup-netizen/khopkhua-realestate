import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Share2,
  Facebook,
  Send,
  Copy,
  Check,
  Droplet,
  Tag,
} from "lucide-react";
import { useStore } from "../context/Store";
import { fmtLAK } from "../data/seed";

const PHONES = ["020 55355 347", "020 9169 4499"];

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties } = useStore();
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const p = properties.find((x) => x.id === id);

  if (!p) {
    return (
      <div className="fade-up pt-3 px-5">
        <button onClick={() => navigate(-1)} className="text-white/70 flex items-center gap-1 mt-4">
          <ChevronLeft size={20} /> ກັບຄືນ
        </button>
        <p className="text-white/50 text-center mt-20">ບໍ່ພົບຊັບສິນນີ້</p>
      </div>
    );
  }

  const typeLabel =
    p.type === "land" ? "ດິນ" : p.type === "house" ? "ເຮືອນ" : p.type === "building" ? "ອາຄານ" : "ອື່ນໆ";

  // Full share text with all info
  const shareText = `🏠 ${p.name}
📍 ${p.location}
💰 ${fmtLAK(p.price)}
📐 ${p.area} m²${p.beds ? `\n🛏 ${p.beds} ຫ້ອງນອນ` : ""}${p.baths ? `\n🚿 ${p.baths} ຫ້ອງນ້ຳ` : ""}
${p.desc ? `\n${p.desc}` : ""}
${p.mapUrl ? `\n🗺 ${p.mapUrl}` : ""}

📞 ຕິດຕໍ່: ${PHONES.join(" , ")}
🏢 ຄອບຄົວ ອະສັງຫາ / Khopkhua Real estate`;

  const doShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: p.name, text: shareText });
        return;
      } catch {
        /* fall through to menu */
      }
    }
    setShareOpen((v) => !v);
  };

  const copyText = () => {
    navigator.clipboard?.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const enc = encodeURIComponent(shareText);
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    p.mapUrl || "https://khopkhua.la"
  )}&quote=${enc}`;
  const waUrl = `https://wa.me/?text=${enc}`;
  const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(
    p.mapUrl || "https://khopkhua.la"
  )}&text=${enc}`;

  return (
    <div className="fade-up pt-3 pb-4">
      {/* Hero image */}
      <div className="relative">
        <img src={p.img} alt={p.name} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/30" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 rounded-full glass flex items-center justify-center active:scale-90 transition-transform"
          aria-label="ກັບຄືນ"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <button
          onClick={doShare}
          className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center active:scale-90 transition-transform"
          aria-label="ແຊຣ໌"
        >
          <Share2 size={18} className="text-white" />
        </button>
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <span className="glass px-3 py-1 rounded-full text-[11px] text-white flex items-center gap-1">
            <Tag size={11} className="text-gold" /> {typeLabel}
          </span>
        </div>
        <div className="absolute bottom-3 left-4 right-4">
          <span className="bg-brand-600/80 text-white text-[11px] px-2.5 py-1 rounded-lg">
            {p.status}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 -mt-3 relative">
        <h1 className="text-xl font-bold text-white">{p.name}</h1>
        <p className="text-sm text-white/60 flex items-center gap-1 mt-1">
          <MapPin size={14} className="text-brand-400" /> {p.location}
        </p>
        <p className="text-2xl gold-text font-extrabold mt-2">{fmtLAK(p.price)}</p>

        {/* stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="card p-3 flex flex-col items-center">
            <Maximize size={18} className="text-brand-400" />
            <p className="text-white font-semibold text-sm mt-1">{p.area}</p>
            <p className="text-[10px] text-white/45">m²</p>
          </div>
          <div className="card p-3 flex flex-col items-center">
            <Bed size={18} className="text-violet-400" />
            <p className="text-white font-semibold text-sm mt-1">{p.beds || "-"}</p>
            <p className="text-[10px] text-white/45">ຫ້ອງນອນ</p>
          </div>
          <div className="card p-3 flex flex-col items-center">
            <Bath size={18} className="text-cyan-400" />
            <p className="text-white font-semibold text-sm mt-1">{p.baths || "-"}</p>
            <p className="text-[10px] text-white/45">ຫ້ອງນ້ຳ</p>
          </div>
        </div>

        {/* description */}
        {p.desc && (
          <div className="card p-4 mt-4">
            <p className="text-xs text-white/55 mb-1">ລາຍລະອຽດ</p>
            <p className="text-sm text-white/85 leading-relaxed">{p.desc}</p>
          </div>
        )}

        {/* map */}
        {p.mapUrl && (
          <a
            href={p.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="card p-3 mt-4 flex items-center gap-3 active:scale-[0.98] transition hover:border-brand-400/40"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center">
              <MapPin size={20} className="text-brand-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white font-medium">ເບິ່ງແຜນທີ່ຕຳແໜ່ງ</p>
              <p className="text-[11px] text-white/50">ເປີດໃນ Google Maps</p>
            </div>
            <ChevronLeft size={18} className="text-white/40 rotate-180" />
          </a>
        )}

        {/* contact */}
        <div className="card p-4 mt-4">
          <p className="text-xs text-white/55 mb-2">ຕິດຕໍ່ສອບຖາມ</p>
          {PHONES.map((ph) => (
            <a
              key={ph}
              href={`tel:${ph.replace(/\s/g, "")}`}
              className="flex items-center gap-2 py-1.5 text-brand-400 font-medium"
            >
              📞 {ph}
            </a>
          ))}
          <p className="text-[11px] text-white/45 mt-1">
            ຄອບຄົວ ອະສັງຫາ • Khopkhua Real estate
          </p>
        </div>

        {/* actions */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={() => navigate("/watermark")}
            className="card py-3 flex items-center justify-center gap-2 text-white font-medium active:scale-95 transition hover:border-white/25"
          >
            <Droplet size={18} className="text-brand-400" /> ໃສ່ລາຍນ້ຳ
          </button>
          <button
            onClick={doShare}
            className="gradient-btn py-3 rounded-2xl flex items-center justify-center gap-2 text-white font-semibold active:scale-95 hover:brightness-110 transition shadow-glow"
          >
            <Share2 size={18} /> ແຊຣ໌
          </button>
        </div>
      </div>

      {/* Share sheet */}
      {shareOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
          onClick={() => setShareOpen(false)}
        >
          <div
            className="w-full max-w-[440px] glass rounded-t-3xl p-5 fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-white/25 mx-auto mb-4" />
            <p className="text-white font-semibold mb-4">ແຊຣ໌ໄປທີ່</p>
            <div className="grid grid-cols-4 gap-3">
              <a href={fbUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1.5">
                <span className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center">
                  <Facebook size={24} className="text-blue-400" />
                </span>
                <span className="text-[10px] text-white/70">Facebook</span>
              </a>
              <a href={waUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1.5">
                <span className="w-14 h-14 rounded-2xl bg-green-600/20 flex items-center justify-center">
                  <Send size={22} className="text-green-400" />
                </span>
                <span className="text-[10px] text-white/70">WhatsApp</span>
              </a>
              <a href={tgUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1.5">
                <span className="w-14 h-14 rounded-2xl bg-sky-600/20 flex items-center justify-center">
                  <Send size={22} className="text-sky-400" />
                </span>
                <span className="text-[10px] text-white/70">Telegram</span>
              </a>
              <button onClick={copyText} className="flex flex-col items-center gap-1.5">
                <span className="w-14 h-14 rounded-2xl bg-violet-600/20 flex items-center justify-center">
                  {copied ? <Check size={22} className="text-brand-400" /> : <Copy size={22} className="text-violet-400" />}
                </span>
                <span className="text-[10px] text-white/70">{copied ? "ສຳເນົາແລ້ວ" : "ສຳເນົາ"}</span>
              </button>
            </div>
            <div className="card p-3 mt-4">
              <p className="text-[11px] text-white/50 whitespace-pre-line leading-relaxed max-h-32 overflow-y-auto">
                {shareText}
              </p>
            </div>
            <button
              onClick={() => setShareOpen(false)}
              className="w-full mt-4 py-3 rounded-2xl card text-white/80 font-medium active:scale-95 transition"
            >
              ປິດ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
