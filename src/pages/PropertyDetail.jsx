import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
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
  Pencil,
  Trash2,
  X,
  Phone,
} from "lucide-react";
import { useStore } from "../context/Store";
import { fmtMoney, CURRENCIES } from "../data/seed";

const PHONES = ["020 55355 347", "020 9169 4499"];
const typeLabels = { land: "ດິນ", house: "ເຮືອນ", building: "ອາຄານ", other: "ອື່ນໆ" };

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, updateProperty, removeProperty } = useStore();
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [editing, setEditing] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  const p = properties.find((x) => x.id === id);
  const gallery = p && p.images && p.images.length ? p.images : p ? [p.img] : [];

  const [form, setForm] = useState(() =>
    p
      ? {
          name: p.name || "",
          location: p.location || "",
          price: p.price || "",
          currency: p.currency || "LAK",
          area: p.area || "",
          beds: p.beds || "",
          baths: p.baths || "",
          desc: p.desc || "",
          status: p.status || "ກຳລັງຂາຍ",
        }
      : {}
  );

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

  const typeLabel = typeLabels[p.type] || "ອື່ນໆ";

  const shareText = `🏠 ${p.name}
📍 ${p.location}
💰 ${fmtMoney(p.price, p.currency)}
📐 ${p.area} m²${p.beds ? `\n🛏 ${p.beds} ຫ້ອງນອນ` : ""}${p.baths ? `\n🚿 ${p.baths} ຫ້ອງນ້ຳ` : ""}
${p.desc ? `\n${p.desc}` : ""}
${p.mapUrl ? `\n🗺 ${p.mapUrl}` : ""}

📞 ${PHONES.join(" , ")}
🏢 ຄອບຄົວ ອະສັງຫາ / Khopkhua Real estate`;

  const doShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: p.name, text: shareText });
        return;
      } catch {
        /* menu */
      }
    }
    setShareOpen((v) => !v);
  };

  const copyText = () => {
    navigator.clipboard?.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const saveEdit = () => {
    updateProperty(p.id, {
      name: form.name,
      location: form.location,
      price: Number(form.price) || 0,
      currency: form.currency,
      area: Number(form.area) || 0,
      beds: Number(form.beds) || 0,
      baths: Number(form.baths) || 0,
      desc: form.desc,
      status: form.status,
    });
    setEditing(false);
  };

  const enc = encodeURIComponent(shareText);
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    p.mapUrl || "https://khopkhua.la"
  )}&quote=${enc}`;
  const waUrl = `https://wa.me/?text=${enc}`;
  const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(
    p.mapUrl || "https://khopkhua.la"
  )}&text=${enc}`;

  const nextImg = () => setActiveImg((i) => (i + 1) % gallery.length);
  const prevImg = () => setActiveImg((i) => (i - 1 + gallery.length) % gallery.length);
  const inp =
    "w-full bg-white/5 rounded-xl px-3 py-2.5 text-sm outline-none text-white placeholder:text-white/35 border border-line focus:border-violet-500";

  return (
    <div className="fade-up pb-6">
      {/* ===== Hero / gallery ===== */}
      <div className="relative">
        <img
          src={gallery[activeImg] || p.img}
          alt={p.name}
          onClick={() => setZoom(true)}
          className="w-full h-72 object-cover cursor-zoom-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/40 pointer-events-none" />

        {/* top controls */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 rounded-full glass flex items-center justify-center active:scale-90 transition"
          aria-label="ກັບຄືນ"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setEditing(true)}
            className="w-9 h-9 rounded-full glass flex items-center justify-center active:scale-90 transition"
            aria-label="ແກ້ໄຂ"
          >
            <Pencil size={17} className="text-white" />
          </button>
          <button
            onClick={doShare}
            className="w-9 h-9 rounded-full glass flex items-center justify-center active:scale-90 transition"
            aria-label="ແຊຣ໌"
          >
            <Share2 size={17} className="text-white" />
          </button>
        </div>

        {/* type badge */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <span className="glass px-3 py-1 rounded-full text-[11px] text-white flex items-center gap-1">
            <Tag size={11} className="text-gold" /> {typeLabel}
          </span>
        </div>

        {/* gallery arrows */}
        {gallery.length > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute top-1/2 left-3 -translate-y-1/2 w-8 h-8 rounded-full glass flex items-center justify-center active:scale-90"
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            <button
              onClick={nextImg}
              className="absolute top-1/2 right-3 -translate-y-1/2 w-8 h-8 rounded-full glass flex items-center justify-center active:scale-90"
            >
              <ChevronRight size={18} className="text-white" />
            </button>
            {/* dots + counter */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {gallery.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    activeImg === i ? "bg-white w-5" : "bg-white/40 w-1.5"
                  }`}
                />
              ))}
            </div>
            <span className="absolute bottom-16 right-4 glass px-2 py-0.5 rounded-full text-[10px] text-white">
              {activeImg + 1}/{gallery.length}
            </span>
          </>
        )}

        {/* status */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-brand-600/85 text-white text-[11px] px-2.5 py-1 rounded-lg">
            {p.status}
          </span>
        </div>
      </div>

      {/* thumbnail strip */}
      {gallery.length > 1 && (
        <div className="flex gap-2 px-5 mt-3 overflow-x-auto pb-1">
          {gallery.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              onClick={() => setActiveImg(i)}
              className={`w-16 h-16 rounded-xl object-cover cursor-pointer shrink-0 transition ${
                activeImg === i ? "ring-2 ring-brand-400 scale-105" : "opacity-60"
              }`}
            />
          ))}
        </div>
      )}

      {/* ===== Info card ===== */}
      <div className="px-5 mt-4">
        <div className="card p-4">
          <h1 className="text-xl font-bold text-white leading-tight">{p.name}</h1>
          <p className="text-sm text-white/60 flex items-center gap-1 mt-1.5">
            <MapPin size={14} className="text-brand-400" /> {p.location || "—"}
          </p>
          <div className="flex items-end justify-between mt-3">
            <p className="text-2xl gold-text font-extrabold">{fmtMoney(p.price, p.currency)}</p>
            <span className="text-[11px] text-white/40">ລະຫັດ #{p.id.slice(-5)}</span>
          </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-3 gap-3 mt-3">
          <div className="card p-3 flex flex-col items-center">
            <Maximize size={18} className="text-brand-400" />
            <p className="text-white font-semibold text-sm mt-1">{p.area || "-"}</p>
            <p className="text-[10px] text-white/45">ຕາລາງແມັດ</p>
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
          <div className="card p-4 mt-3">
            <p className="text-xs text-white/55 mb-1">ລາຍລະອຽດ</p>
            <p className="text-sm text-white/85 leading-relaxed whitespace-pre-wrap">{p.desc}</p>
          </div>
        )}

        {/* map */}
        {p.mapUrl && (
          <a
            href={p.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="card p-3 mt-3 flex items-center gap-3 active:scale-[0.98] transition hover:border-brand-400/40"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center">
              <MapPin size={20} className="text-brand-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white font-medium">ເບິ່ງແຜນທີ່ຕຳແໜ່ງ</p>
              <p className="text-[11px] text-white/50">ເປີດໃນ Google Maps</p>
            </div>
            <ChevronRight size={18} className="text-white/40" />
          </a>
        )}

        {/* contact */}
        <div className="card p-4 mt-3">
          <p className="text-xs text-white/55 mb-2">ຕິດຕໍ່ສອບຖາມ</p>
          {PHONES.map((ph) => (
            <a
              key={ph}
              href={`tel:${ph.replace(/\s/g, "")}`}
              className="flex items-center gap-2 py-1.5 text-brand-400 font-medium"
            >
              <Phone size={15} /> {ph}
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
            <Share2 size={18} /> ແຊຣ໌ໂພສ
          </button>
        </div>

        {/* edit / delete row */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <button
            onClick={() => setEditing(true)}
            className="card py-2.5 flex items-center justify-center gap-2 text-white/80 text-sm active:scale-95 transition"
          >
            <Pencil size={16} /> ແກ້ໄຂຂໍ້ມູນ
          </button>
          <button
            onClick={() => setConfirmDel(true)}
            className="card py-2.5 flex items-center justify-center gap-2 text-rose-400 text-sm active:scale-95 transition hover:border-rose-500/40"
          >
            <Trash2 size={16} /> ລຶບຊັບສິນ
          </button>
        </div>
      </div>

      {/* ===== Fullscreen zoom ===== */}
      {zoom && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
          onClick={() => setZoom(false)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full glass flex items-center justify-center z-10"
            onClick={() => setZoom(false)}
          >
            <X size={22} className="text-white" />
          </button>
          <img
            src={gallery[activeImg] || p.img}
            alt={p.name}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {gallery.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImg(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center"
              >
                <ChevronLeft size={22} className="text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImg(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center"
              >
                <ChevronRight size={22} className="text-white" />
              </button>
              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded-full text-xs text-white">
                {activeImg + 1} / {gallery.length}
              </span>
            </>
          )}
        </div>
      )}

      {/* ===== Edit sheet ===== */}
      {editing && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60" onClick={() => setEditing(false)}>
          <div
            className="w-full max-w-[440px] glass rounded-t-3xl p-5 fade-up max-h-[88vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-white/25 mx-auto mb-4" />
            <p className="text-white font-semibold mb-4">ແກ້ໄຂຂໍ້ມູນຊັບສິນ</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-white/55 mb-1 block">ຊື່ຊັບສິນ</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inp} />
              </div>
              <div>
                <label className="text-xs text-white/55 mb-1 block">ທຳເລ</label>
                <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inp} />
              </div>
              <div>
                <label className="text-xs text-white/55 mb-1 block">ສະກຸນເງິນ</label>
                <div className="flex gap-2">
                  {CURRENCIES.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => setForm({ ...form, currency: c.code })}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium transition active:scale-95 ${
                        form.currency === c.code ? "gradient-btn text-white" : "card text-white/60"
                      }`}
                    >
                      {c.symbol} {c.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/55 mb-1 block">ລາຄາ ({form.currency})</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inp} />
                </div>
                <div>
                  <label className="text-xs text-white/55 mb-1 block">ເນື້ອທີ່ (m²)</label>
                  <input type="number" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className={inp} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/55 mb-1 block">ຫ້ອງນອນ</label>
                  <input type="number" value={form.beds} onChange={(e) => setForm({ ...form, beds: e.target.value })} className={inp} />
                </div>
                <div>
                  <label className="text-xs text-white/55 mb-1 block">ຫ້ອງນ້ຳ</label>
                  <input type="number" value={form.baths} onChange={(e) => setForm({ ...form, baths: e.target.value })} className={inp} />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/55 mb-1 block">ສະຖານະ</label>
                <div className="flex gap-2">
                  {["ກຳລັງຂາຍ", "ຈອງແລ້ວ", "ຂາຍແລ້ວ"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setForm({ ...form, status: st })}
                      className={`flex-1 py-2 rounded-xl text-xs font-medium transition ${
                        form.status === st ? "gradient-btn text-white" : "card text-white/60"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-white/55 mb-1 block">ລາຍລະອຽດ</label>
                <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={3} className={inp} />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setEditing(false)} className="flex-1 card py-3 rounded-2xl text-white/80 font-medium active:scale-95 transition">
                ຍົກເລີກ
              </button>
              <button onClick={saveEdit} className="flex-1 gradient-btn py-3 rounded-2xl text-white font-semibold active:scale-95 hover:brightness-110 transition shadow-glow">
                ບັນທຶກ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Delete confirm ===== */}
      {confirmDel && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-8" onClick={() => setConfirmDel(false)}>
          <div className="w-full max-w-xs glass rounded-3xl p-5 fade-up text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full bg-rose-500/15 flex items-center justify-center mx-auto mb-3">
              <Trash2 size={22} className="text-rose-400" />
            </div>
            <p className="text-white font-semibold">ລຶບຊັບສິນນີ້?</p>
            <p className="text-xs text-white/55 mt-1">ການລຶບແລ້ວບໍ່ສາມາດກູ້ຄືນໄດ້</p>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setConfirmDel(false)} className="flex-1 card py-2.5 rounded-2xl text-white/80 text-sm active:scale-95">
                ຍົກເລີກ
              </button>
              <button
                onClick={() => { removeProperty(p.id); navigate("/properties"); }}
                className="flex-1 bg-rose-600 hover:bg-rose-500 py-2.5 rounded-2xl text-white text-sm font-semibold active:scale-95 transition"
              >
                ລຶບ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Share sheet ===== */}
      {shareOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={() => setShareOpen(false)}>
          <div className="w-full max-w-[440px] glass rounded-t-3xl p-5 fade-up" onClick={(e) => e.stopPropagation()}>
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
              <p className="text-[11px] text-white/50 whitespace-pre-line leading-relaxed max-h-32 overflow-y-auto">{shareText}</p>
            </div>
            <button onClick={() => setShareOpen(false)} className="w-full mt-4 py-3 rounded-2xl card text-white/80 font-medium active:scale-95 transition">
              ປິດ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
