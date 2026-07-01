import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  UploadCloud,
  Check,
  MapPin,
  LocateFixed,
  Link2,
  Loader2,
  X,
} from "lucide-react";
import { useStore } from "../context/Store";

const types = [
  { key: "land", label: "ດິນ" },
  { key: "house", label: "ເຮືອນ" },
  { key: "building", label: "ອາຄານ" },
  { key: "other", label: "ອື່ນໆ" },
];

const sampleImgs = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&q=60",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=300&q=60",
  "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=300&q=60",
];

// Extract lat,lng from a pasted Google Maps URL if present
function parseLatLng(url) {
  if (!url) return null;
  const at = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (at) return { lat: parseFloat(at[1]), lng: parseFloat(at[2]) };
  const q = url.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (q) return { lat: parseFloat(q[1]), lng: parseFloat(q[2]) };
  const ll = url.match(/(-?\d{1,3}\.\d+),\s*(-?\d{1,3}\.\d+)/);
  if (ll) return { lat: parseFloat(ll[1]), lng: parseFloat(ll[2]) };
  return null;
}

export default function AddProperty() {
  const navigate = useNavigate();
  const { addProperty } = useStore();
  const [type, setType] = useState("land");
  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    area: "",
    beds: "",
    baths: "",
    desc: "",
    mapUrl: "",
  });
  const [coords, setCoords] = useState(null); // {lat,lng}
  const [locating, setLocating] = useState(false);
  const [done, setDone] = useState(false);
  const [images, setImages] = useState([]); // data URLs of uploaded photos

  const onPickImages = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removeImage = (idx) =>
    setImages((prev) => prev.filter((_, i) => i !== idx));

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onMapUrl = (e) => {
    const val = e.target.value;
    setForm((f) => ({ ...f, mapUrl: val }));
    const parsed = parseLatLng(val);
    if (parsed) setCoords(parsed);
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("ອຸປະກອນບໍ່ຮອງຮັບການລະບຸຕຳແໜ່ງ");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });
        setForm((f) => ({
          ...f,
          mapUrl: `https://www.google.com/maps?q=${lat},${lng}`,
        }));
        setLocating(false);
      },
      () => {
        setLocating(false);
        alert("ບໍ່ສາມາດເຂົ້າເຖິງຕຳແໜ່ງໄດ້ — ກະລຸນາອະນຸຍາດສິດ ຫລື ວາງລິ້ງ Google Maps");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const mapSrc = coords
    ? `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`
    : null;

  const save = () => {
    if (!form.name.trim()) return;
    addProperty({
      type,
      name: form.name,
      location: form.location,
      price: Number(form.price) || 0,
      area: Number(form.area) || 0,
      beds: Number(form.beds) || 0,
      baths: Number(form.baths) || 0,
      desc: form.desc,
      mapUrl: form.mapUrl,
      coords,
      status: "ກຳລັງຂາຍ",
      images: images,
      img:
        images[0] ||
        sampleImgs[Math.floor(Math.random() * sampleImgs.length)],
    });
    setDone(true);
    setTimeout(() => navigate("/properties"), 900);
  };

  return (
    <div className="fade-up pt-3">
      <div className="px-5 pt-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          aria-label="ກັບຄືນ"
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"
        >
          <ChevronLeft size={20} className="text-white/80" />
        </button>
        <h1 className="text-lg font-bold text-white flex-1 text-center">
          ເພີ່ມຊັບສິນໃໝ່
        </h1>
        <div className="w-8" />
      </div>

      {/* Type tabs */}
      <div className="px-5 mt-4 flex gap-2">
        {types.map((t) => (
          <button
            key={t.key}
            onClick={() => setType(t.key)}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all active:scale-95 ${
              type === t.key ? "gradient-btn text-white shadow-glow" : "card text-white/60"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Upload */}
      <div className="px-5 mt-4">
        <label className="card border-dashed border-2 border-line py-7 flex flex-col items-center text-white/60 hover:border-violet-500/50 transition-colors cursor-pointer">
          <UploadCloud size={30} className="text-violet-500 mb-2" />
          <p className="text-sm font-medium text-white">ອັບໂຫລດຮູບພາບ</p>
          <p className="text-[11px]">ກົດເພື່ອອັບໂຫລດ (ໄດ້ຫລາຍຮູບ)</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onPickImages}
            className="hidden"
          />
        </label>

        {/* Preview thumbnails */}
        {images.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {images.map((src, i) => (
              <div key={i} className="relative">
                <img
                  src={src}
                  alt=""
                  className="w-16 h-16 rounded-xl object-cover"
                />
                {i === 0 && (
                  <span className="absolute bottom-0 left-0 right-0 bg-brand-600/80 text-[8px] text-white text-center rounded-b-xl">
                    ຮູບຫລັກ
                  </span>
                )}
                <button
                  onClick={() => removeImage(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center"
                  aria-label="ລຶບຮູບ"
                >
                  <X size={11} className="text-white" />
                </button>
              </div>
            ))}
            <label className="w-16 h-16 rounded-xl card flex items-center justify-center text-xs text-white/50 cursor-pointer hover:border-violet-500/50">
              +
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={onPickImages}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      {/* Form */}
      <div className="px-5 mt-4 space-y-3">
        <Field label="ຊື່ຊັບສິນ">
          <input value={form.name} onChange={set("name")} placeholder="ດິນຢູ່ ໄຊທານີ" className={inp} />
        </Field>
        <Field label="ທຳເລ">
          <input value={form.location} onChange={set("location")} placeholder="ໃກ້ທາດຫລວງ, ໄຊທານີ" className={inp} />
        </Field>

        {/* Map Location */}
        <div>
          <label className="text-xs text-white/55 mb-1 flex items-center gap-1">
            <MapPin size={12} className="text-brand-400" /> ຕຳແໜ່ງແຜນທີ່ (Map Location)
          </label>
          <div className="flex gap-2">
            <div className={`${inp} flex items-center gap-2 flex-1 !py-0`}>
              <Link2 size={16} className="text-white/40 shrink-0" />
              <input
                value={form.mapUrl}
                onChange={onMapUrl}
                placeholder="ວາງລິ້ງ Google Maps ທີ່ນີ້..."
                className="bg-transparent py-2.5 text-sm w-full outline-none text-white placeholder:text-white/35"
              />
            </div>
            <button
              onClick={useCurrentLocation}
              disabled={locating}
              className="gradient-btn px-3 rounded-xl flex items-center justify-center text-white active:scale-95 transition-transform shrink-0 disabled:opacity-70"
              aria-label="ໃຊ້ຕຳແໜ່ງປັດຈຸບັນ"
            >
              {locating ? <Loader2 size={18} className="animate-spin" /> : <LocateFixed size={18} />}
            </button>
          </div>
          <button
            onClick={useCurrentLocation}
            disabled={locating}
            className="text-[11px] text-brand-400 mt-1.5 flex items-center gap-1 active:scale-95 transition-transform"
          >
            <LocateFixed size={12} />
            {locating ? "ກຳລັງຄົ້ນຫາຕຳແໜ່ງ..." : "ໃຊ້ຕຳແໜ່ງ GPS ປັດຈຸບັນ"}
          </button>

          {/* Map preview */}
          {mapSrc && (
            <div className="mt-3 rounded-xl overflow-hidden border border-line fade-up">
              <iframe
                title="map-preview"
                src={mapSrc}
                className="w-full h-44 border-0"
                loading="lazy"
              />
              <div className="bg-panel2 px-3 py-2 text-[11px] text-white/60 flex items-center gap-1">
                <MapPin size={11} className="text-brand-400" />
                {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="ລາຄາ (LAK)">
            <input value={form.price} onChange={set("price")} type="number" placeholder="2800000000" className={inp} />
          </Field>
          <Field label="ເນື້ອທີ່ (m²)">
            <input value={form.area} onChange={set("area")} type="number" placeholder="1024" className={inp} />
          </Field>
        </div>
        {(type === "house" || type === "building") && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="ຫ້ອງນອນ">
              <input value={form.beds} onChange={set("beds")} type="number" placeholder="4" className={inp} />
            </Field>
            <Field label="ຫ້ອງນ້ຳ">
              <input value={form.baths} onChange={set("baths")} type="number" placeholder="3" className={inp} />
            </Field>
          </div>
        )}
        <Field label="ລາຍລະອຽດ">
          <textarea value={form.desc} onChange={set("desc")} rows={2} placeholder="ດິນສວຍ ທຳເລດີ ໃກ້ທາງໃຫຍ່..." className={inp} />
        </Field>
      </div>

      <div className="px-5 mt-5">
        <button
          onClick={save}
          className="w-full gradient-btn py-3.5 rounded-2xl font-semibold text-white shadow-glow flex items-center justify-center gap-2 active:scale-95 hover:brightness-110 transition-all"
        >
          {done ? (
            <>
              <Check size={20} /> ບັນທຶກສຳເລັດ!
            </>
          ) : (
            "ບັນທຶກຊັບສິນ"
          )}
        </button>
      </div>
      <div className="h-6" />
    </div>
  );
}

const inp =
  "w-full bg-white/5 rounded-xl px-3 py-2.5 text-sm outline-none text-white placeholder:text-white/35 border border-line focus:border-violet-500";

function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs text-white/55 mb-1 block">{label}</label>
      {children}
    </div>
  );
}
