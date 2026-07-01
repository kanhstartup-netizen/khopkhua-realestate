import {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { ChevronLeft, ChevronRight, Download, Check } from "lucide-react";
import { TEMPLATES } from "../data/watermarks";
import { drawWatermark, loadImg, FB_SIZES, FILTERS } from "../lib/watermark";

const LOGO_SRC = `${import.meta.env.BASE_URL}logo.png`;

/**
 * Inline watermark picker.
 * Props:
 *  - images: array of data URLs (uploaded photos)
 *  - mode: "download" (save to device) | "compose" (return watermarked data URLs)
 *  - onComposed: (dataUrls[]) => void  — called in compose mode on template change
 * Ref methods:
 *  - composeNow(): Promise<dataUrls[]>  — compose all images right now (used at save time)
 */
const WatermarkPicker = forwardRef(function WatermarkPicker(
  { images = [], mode = "download", onComposed },
  ref
) {
  const canvasRef = useRef(null);
  const [photos, setPhotos] = useState([]); // HTMLImageElement[]
  const [activeImg, setActiveImg] = useState(0);
  const [tplIdx, setTplIdx] = useState(0);
  const [logo, setLogo] = useState(null);
  const [fontReady, setFontReady] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);
  const [sizeId, setSizeId] = useState("square");
  const [filterId, setFilterId] = useState("none");

  const tpl = TEMPLATES[tplIdx];
  const opts = { size: sizeId, filter: FILTERS.find((f) => f.id === filterId)?.filter };

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

  // load incoming data URLs into image elements
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

  const draw = useCallback(() => {
    if (canvasRef.current && photo) {
      drawWatermark(canvasRef.current, photo, tpl, logo, opts);
    }
  }, [photo, tpl, logo, fontReady, sizeId, filterId]);

  useEffect(() => {
    draw();
  }, [draw]);

  const prevTpl = () => setTplIdx((i) => (i - 1 + TEMPLATES.length) % TEMPLATES.length);
  const nextTpl = () => setTplIdx((i) => (i + 1) % TEMPLATES.length);

  // Generate watermarked data URLs for all photos with the current template
  const composeAll = useCallback(async () => {
    const off = document.createElement("canvas");
    const out = [];
    for (let i = 0; i < photos.length; i++) {
      drawWatermark(off, photos[i], tpl, logo, opts);
      // give the canvas a moment to paint (text + logo) before capturing
      await new Promise((r) => setTimeout(r, 40));
      out.push(off.toDataURL("image/jpeg", 0.92));
    }
    return out;
  }, [photos, tpl, logo, sizeId, filterId]);

  // Expose a compose method the parent can call at save time (guarantees fresh watermark)
  useImperativeHandle(ref, () => ({
    composeNow: async () => {
      if (!photos.length) return [];
      return composeAll();
    },
    hasImages: () => photos.length > 0,
  }));

  // In compose mode, report watermarked images to the parent whenever they change.
  // Wait until BOTH the logo image and Lao font are ready, or the watermark is incomplete.
  useEffect(() => {
    if (mode !== "compose" || !onComposed || !photos.length) return;
    if (!logo || !fontReady) return; // logo/font not ready yet -> skip, will re-run when ready
    let alive = true;
    composeAll().then((urls) => {
      if (alive) onComposed(urls);
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos, tpl, logo, fontReady, mode, sizeId, filterId]);

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

  return (
    <div className="card p-3 mt-3">
      <p className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
        💧 ໃສ່ລາຍນ້ຳ {mode === "compose" ? "ກ່ອນໂພສລົງແອັບ" : "ກ່ອນໂພສ"}
      </p>

      {/* Preview */}
      <div className="rounded-xl overflow-hidden bg-black/30">
        <canvas ref={canvasRef} className="w-full block" style={{ maxHeight: 300, objectFit: "contain" }} />
      </div>

      {/* Image selector (if many) */}
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

      {/* Size preset (Facebook-optimized) */}
      <div className="mt-3">
        <p className="text-[11px] text-white/55 mb-1.5">ຂະໜາດຮູບ (Facebook)</p>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {FB_SIZES.map((sz) => (
            <button
              key={sz.id}
              onClick={() => setSizeId(sz.id)}
              className={`shrink-0 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition active:scale-95 ${
                sizeId === sz.id ? "gradient-btn text-white" : "card text-white/60"
              }`}
            >
              {sz.name}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="mt-2">
        <p className="text-[11px] text-white/55 mb-1.5">ຟິວເຕີ / ປັບແຕ່ງ</p>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterId(f.id)}
              className={`shrink-0 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition active:scale-95 ${
                filterId === f.id ? "bg-brand-600 text-white" : "card text-white/60"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* Template arrows */}
      <div className="flex items-center gap-2 mt-3">
        <button
          onClick={prevTpl}
          className="w-10 h-10 rounded-xl card flex items-center justify-center active:scale-90 transition hover:border-white/25"
          aria-label="ກ່ອນໜ້າ"
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
          onClick={nextTpl}
          className="w-10 h-10 rounded-xl card flex items-center justify-center active:scale-90 transition hover:border-white/25"
          aria-label="ຕໍ່ໄປ"
        >
          <ChevronRight size={18} className="text-white" />
        </button>
      </div>

      {/* Quick template dots */}
      <div className="flex gap-1.5 mt-2 flex-wrap justify-center">
        {TEMPLATES.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setTplIdx(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === tplIdx ? "bg-violet-500 w-4" : "bg-white/20"
            }`}
            aria-label={t.name}
          />
        ))}
      </div>

      {/* Download button (download mode only) */}
      {mode === "download" ? (
        <>
          <button
            onClick={downloadAll}
            disabled={downloading}
            className="w-full gradient-btn py-3 rounded-2xl mt-3 flex items-center justify-center gap-2 text-white font-semibold active:scale-95 hover:brightness-110 transition shadow-glow disabled:opacity-60"
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
                <Download size={18} /> ໃສ່ລາຍນ້ຳ + ດາວໂຫລດ ({photos.length} ຮູບ)
              </>
            )}
          </button>
          <p className="text-center text-[10px] text-white/40 mt-1.5">
            ຮູບຈະບັນທຶກລົງໂທລະສັບ ພ້ອມໂພສ Facebook / TikTok
          </p>
        </>
      ) : (
        <p className="text-center text-[11px] text-brand-400 mt-3">
          ✓ ເລືອກລາຍນ້ຳແລ້ວ — ກົດ "ບັນທຶກຊັບສິນ" ລຸ່ມສຸດ ເພື່ອໂພສລົງແອັບ
        </p>
      )}
    </div>
  );
});

export default WatermarkPicker;
