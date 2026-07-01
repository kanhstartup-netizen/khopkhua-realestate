import {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Check,
  Crop,
  Sparkles,
  Layout,
  Wand2,
} from "lucide-react";
import { TEMPLATES } from "../data/watermarks";
import {
  drawWatermark,
  loadImg,
  FB_SIZES,
  FILTERS,
  bestSizeFor,
} from "../lib/watermark";

const LOGO_SRC = `${import.meta.env.BASE_URL}logo.png`;

/**
 * Inline watermark editor with clear zones.
 * Props: images (data URLs), mode ("download"|"compose"), onComposed
 * Ref: composeNow()
 */
const WatermarkPicker = forwardRef(function WatermarkPicker(
  { images = [], mode = "download", onComposed },
  ref
) {
  const canvasRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [activeImg, setActiveImg] = useState(0);
  const [tplIdx, setTplIdx] = useState(0);
  const [logo, setLogo] = useState(null);
  const [fontReady, setFontReady] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);
  const [sizeId, setSizeId] = useState("square");
  const [autoSize, setAutoSize] = useState(true);
  const [filterId, setFilterId] = useState("none");
  const [focusX, setFocusX] = useState(0.5);
  const [focusY, setFocusY] = useState(0.5);
  const [step, setStep] = useState(1); // 1=size, 2=filter, 3=watermark

  const tpl = TEMPLATES[tplIdx];
  const preset = FB_SIZES.find((s) => s.id === sizeId);
  const needsCrop = preset && preset.w && preset.h; // fixed-size => croppable
  const opts = {
    size: sizeId,
    filter: FILTERS.find((f) => f.id === filterId)?.filter,
    focusX,
    focusY,
  };

  useEffect(() => {
    loadImg(LOGO_SRC).then(setLogo).catch(() => {});
  }, []);

  useEffect(() => {
    if (document.fonts && document.fonts.load) {
      Promise.all([
        document.fonts.load("400 48px 'Noto Sans Lao'"),
        document.fonts.load("700 48px 'Noto Sans Lao'"),
      ])
        .then(() => document.fonts.ready)
        .then(() => setFontReady(true))
        .catch(() => setFontReady(true));
    } else setFontReady(true);
  }, []);

  // load incoming data URLs
  useEffect(() => {
    if (!images.length) {
      setPhotos([]);
      return;
    }
    Promise.all(images.map((src) => loadImg(src))).then((imgs) => {
      setPhotos(imgs);
      setActiveImg(0);
    });
  }, [images]);

  const photo = photos[activeImg] || null;

  // auto-pick best size when a new active photo loads (if autoSize on)
  useEffect(() => {
    if (autoSize && photo) {
      setSizeId(bestSizeFor(photo));
      setFocusX(0.5);
      setFocusY(0.5);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo, autoSize]);

  const draw = useCallback(() => {
    if (canvasRef.current && photo) {
      drawWatermark(canvasRef.current, photo, tpl, logo, opts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo, tpl, logo, fontReady, sizeId, filterId, focusX, focusY]);

  useEffect(() => {
    draw();
  }, [draw]);

  const composeAll = useCallback(async () => {
    const off = document.createElement("canvas");
    const out = [];
    for (let i = 0; i < photos.length; i++) {
      drawWatermark(off, photos[i], tpl, logo, opts);
      await new Promise((r) => setTimeout(r, 40));
      out.push(off.toDataURL("image/jpeg", 0.92));
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos, tpl, logo, sizeId, filterId, focusX, focusY]);

  useImperativeHandle(ref, () => ({
    composeNow: async () => (photos.length ? composeAll() : []),
    hasImages: () => photos.length > 0,
  }));

  useEffect(() => {
    if (mode !== "compose" || !onComposed || !photos.length) return;
    if (!logo || !fontReady) return;
    let alive = true;
    composeAll().then((urls) => alive && onComposed(urls));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos, tpl, logo, fontReady, mode, sizeId, filterId, focusX, focusY]);

  const downloadAll = async () => {
    if (!photos.length) return;
    setDownloading(true);
    const off = document.createElement("canvas");
    for (let i = 0; i < photos.length; i++) {
      drawWatermark(off, photos[i], tpl, logo, opts);
      await new Promise((r) => setTimeout(r, 60));
      const blob = await new Promise((res) => off.toBlob(res, "image/jpeg", 0.92));
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `khopkhua-${tpl.id}-${i + 1}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
      await new Promise((r) => setTimeout(r, 250));
    }
    setDownloading(false);
    setDone(true);
    setTimeout(() => setDone(false), 1500);
  };

  if (!images.length) return null;

  const StepTab = ({ n, icon: Icon, label }) => (
    <button
      onClick={() => setStep(n)}
      className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition ${
        step === n ? "gradient-btn text-white" : "card text-white/55"
      }`}
    >
      <Icon size={16} />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );

  return (
    <div className="card p-3 mt-3">
      <p className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
        <Wand2 size={16} className="text-brand-400" /> ໃສ່ລາຍນ້ຳ{" "}
        {mode === "compose" ? "ກ່ອນໂພສລົງແອັບ" : "ກ່ອນໂພສ"}
      </p>

      {/* Preview */}
      <div className="rounded-xl overflow-hidden bg-black/40 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="max-w-full block"
          style={{ maxHeight: 320, objectFit: "contain" }}
        />
      </div>

      {/* Multi-image selector */}
      {photos.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              onClick={() => setActiveImg(i)}
              className={`w-12 h-12 rounded-lg object-cover cursor-pointer shrink-0 transition-all ${
                activeImg === i ? "ring-2 ring-violet-500 scale-105" : "opacity-60"
              }`}
            />
          ))}
        </div>
      )}

      {/* Step tabs */}
      <div className="flex gap-2 mt-3">
        <StepTab n={1} icon={Layout} label="1. ຂະໜາດ" />
        <StepTab n={2} icon={Sparkles} label="2. ຟິວເຕີ" />
        <StepTab n={3} icon={Wand2} label="3. ລາຍນ້ຳ" />
      </div>

      {/* ZONE 1: SIZE + CROP */}
      {step === 1 && (
        <div className="mt-3 fade-up">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-white/70">ຂະໜາດຮູບ (Facebook)</p>
            <label className="flex items-center gap-1.5 text-[11px] text-white/60">
              <input
                type="checkbox"
                checked={autoSize}
                onChange={(e) => setAutoSize(e.target.checked)}
                className="accent-violet-500"
              />
              ເລືອກອັດຕະໂນມັດ
            </label>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {FB_SIZES.map((sz) => (
              <button
                key={sz.id}
                onClick={() => {
                  setAutoSize(false);
                  setSizeId(sz.id);
                }}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-left transition active:scale-[0.98] ${
                  sizeId === sz.id
                    ? "gradient-btn text-white"
                    : "card text-white/70"
                }`}
              >
                <span className="text-xs font-medium">{sz.name}</span>
                <span className="text-[10px] opacity-70">{sz.note}</span>
              </button>
            ))}
          </div>

          {/* Crop position (only for fixed sizes) */}
          {needsCrop && (
            <div className="mt-3 card p-3">
              <p className="text-[11px] text-white/60 mb-2 flex items-center gap-1">
                <Crop size={12} /> ປັບຕຳແໜ່ງຮູບ (ຖ້າຕັດບໍ່ພໍໃຈ)
              </p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] text-white/50 w-10">ຊ້າຍ-ຂວາ</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={focusX}
                  onChange={(e) => setFocusX(parseFloat(e.target.value))}
                  className="flex-1 accent-violet-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/50 w-10">ເທິງ-ລຸ່ມ</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={focusY}
                  onChange={(e) => setFocusY(parseFloat(e.target.value))}
                  className="flex-1 accent-violet-500"
                />
              </div>
              <button
                onClick={() => {
                  setFocusX(0.5);
                  setFocusY(0.5);
                }}
                className="text-[10px] text-brand-400 mt-1"
              >
                ↺ ຣີເຊັດເປັນກາງ
              </button>
            </div>
          )}
        </div>
      )}

      {/* ZONE 2: FILTERS */}
      {step === 2 && (
        <div className="mt-3 fade-up">
          <p className="text-xs text-white/70 mb-2">ຟິວເຕີ / ປັບແຕ່ງແສງສີ</p>
          <div className="grid grid-cols-2 gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterId(f.id)}
                className={`px-3 py-2.5 rounded-xl text-xs font-medium transition active:scale-95 ${
                  filterId === f.id ? "bg-brand-600 text-white" : "card text-white/65"
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ZONE 3: WATERMARK TEMPLATE */}
      {step === 3 && (
        <div className="mt-3 fade-up">
          <p className="text-xs text-white/70 mb-2">ເລືອກຮູບແບບລາຍນ້ຳ</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTplIdx((i) => (i - 1 + TEMPLATES.length) % TEMPLATES.length)}
              className="w-10 h-10 rounded-xl card flex items-center justify-center active:scale-90 transition"
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            <div className="flex-1 text-center">
              <p className="text-sm text-white font-medium">{tpl.name}</p>
              <p className="text-[10px] text-white/45">
                ແບບ {tplIdx + 1} / {TEMPLATES.length}
              </p>
            </div>
            <button
              onClick={() => setTplIdx((i) => (i + 1) % TEMPLATES.length)}
              className="w-10 h-10 rounded-xl card flex items-center justify-center active:scale-90 transition"
            >
              <ChevronRight size={18} className="text-white" />
            </button>
          </div>
          {/* template grid */}
          <div className="grid grid-cols-4 gap-1.5 mt-3 max-h-40 overflow-y-auto">
            {TEMPLATES.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setTplIdx(i)}
                className={`aspect-square rounded-lg flex items-center justify-center text-[8px] text-center px-0.5 leading-tight transition ${
                  i === tplIdx
                    ? "gradient-btn text-white"
                    : "card text-white/55"
                }`}
                title={t.name}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ACTION */}
      {mode === "download" ? (
        <button
          onClick={downloadAll}
          disabled={downloading}
          className="w-full gradient-btn py-3 rounded-2xl mt-4 flex items-center justify-center gap-2 text-white font-semibold active:scale-95 hover:brightness-110 transition shadow-glow disabled:opacity-60"
        >
          {done ? (
            <>
              <Check size={18} /> ດາວໂຫລດສຳເລັດ!
            </>
          ) : downloading ? (
            <>
              <Download size={18} className="animate-bounce" /> ກຳລັງດາວໂຫລດ...
            </>
          ) : (
            <>
              <Download size={18} /> ດາວໂຫລດ ({photos.length} ຮູບ)
            </>
          )}
        </button>
      ) : (
        <p className="text-center text-[11px] text-brand-400 mt-3">
          ✓ ຕັ້ງຄ່າແລ້ວ — ກົດ "ບັນທຶກຊັບສິນ" ລຸ່ມສຸດ ເພື່ອໂພສລົງແອັບ
        </p>
      )}
    </div>
  );
});

export default WatermarkPicker;
