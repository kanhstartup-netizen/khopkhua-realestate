import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, UploadCloud, Check } from "lucide-react";
import { StatusBar } from "../components/Shell";
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
  });
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

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
      status: "ກຳລັງຂາຍ",
      img: sampleImgs[Math.floor(Math.random() * sampleImgs.length)],
    });
    setDone(true);
    setTimeout(() => navigate("/properties"), 900);
  };

  return (
    <div className="fade-up">
      <StatusBar />
      <div className="px-5 pt-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} aria-label="ກັບຄືນ">
          <ChevronLeft size={22} className="text-white/80" />
        </button>
        <h1 className="text-lg font-bold text-white flex-1 text-center">
          ເພີ່ມຊັບສິນໃໝ່
        </h1>
        <div className="w-6" />
      </div>

      {/* Type tabs */}
      <div className="px-5 mt-4 flex gap-2">
        {types.map((t) => (
          <button
            key={t.key}
            onClick={() => setType(t.key)}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition ${
              type === t.key ? "gradient-btn text-white" : "card text-white/60"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Upload */}
      <div className="px-5 mt-4">
        <div className="card border-dashed border-2 border-line py-7 flex flex-col items-center text-white/60">
          <UploadCloud size={30} className="text-violet-500 mb-2" />
          <p className="text-sm font-medium text-white">ອັບໂຫລດຮູບພາບ</p>
          <p className="text-[11px]">ກົດເພື່ອອັບໂຫລດ ຫລື ລາກວາງ</p>
        </div>
        <div className="flex gap-2 mt-3">
          {sampleImgs.map((s, i) => (
            <img key={i} src={s} alt="" className="w-16 h-16 rounded-xl object-cover" />
          ))}
          <div className="w-16 h-16 rounded-xl card flex items-center justify-center text-xs text-white/50">
            +8
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-5 mt-4 space-y-3">
        <Field label="ຊື່ຊັບສິນ">
          <input value={form.name} onChange={set("name")} placeholder="ດິນຢູ່ ໄຊທານີ" className={inp} />
        </Field>
        <Field label="ທຳເລ">
          <input value={form.location} onChange={set("location")} placeholder="ໃກ້ທາດຫລວງ, ໄຊທານີ" className={inp} />
        </Field>
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
          className="w-full gradient-btn py-3.5 rounded-2xl font-semibold text-white shadow-glow flex items-center justify-center gap-2"
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
