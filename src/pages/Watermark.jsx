import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  UploadCloud,
  Download,
  ImageIcon,
  Check,
  X,
} from "lucide-react";
import { TEMPLATES } from "../data/watermarks";
import { useStore } from "../context/Store";
import { drawWatermark, loadImg } from "../lib/watermark";

const LOGO_SRC = `${import.meta.env.BASE_URL}logo.png`;

export default function Watermark() {
  const navigate = useNavigate();
  const { pendingImages, setPendingImages } = useStore();
  const canvasRef = useRef(null);
  const [photos, setPhotos] = useState([]); // HTMLImageElement[]
  const [activeIdx, setActiveIdx] = useState(0);
  const [logo, setLogo] = useState(null);
  const [tpl, setTpl] = useState(TEMPLATES[0]);
  const [downloaded, setDownloaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [fontReady, setFontReady] = useState(false);
  const [cat, setCat] = useState("all"); // template category filter

  // categorize templates by id prefix / style
  const catOf = (t) => {
    if (t.style === "sold" || /^s\d/.test(t.id) || /SOLD|ຂາຍແລ້ວ|ປິດການຂາຍ/.test(t.name))
      return "sold";
    if (/^c\d/.test(t.id) || (t.style && t.style.startsWith("center"))) return "center";
    return "general";
  };
  const CATS = [
    { id: "all", label: "ທັງໝົດ" },
    { id: "general", label: "ທົ່ວໄປ" },
    { id: "sold", label: "ຂາຍແລ້ວ/SOLD" },
    { id: "center", label: "ກາງຮູບ" },
  ];
  const visibleTemplates = TEMPLATES.filter(
    (t) => cat === "all" || catOf(t) === cat
  );

  const photo = photos[activeIdx] || null;

  // preload logo
  useEffect(() => {
    loadImg(LOGO_SRC).then(setLogo).catch(() => {});
  }, []);

  // If images were sent from "Add Property", load them here then clear
  useEffect(() => {
    if (pendingImages && pendingImages.length) {
      Promise.all(pendingImages.map((src) => loadImg(src))).then((imgs) => {
        setPhotos((prev) => [...prev, ...imgs]);
        setPendingImages([]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ensure Noto Sans Lao is loaded before drawing on canvas
  useEffect(() => {
    let alive = true;
    const fams = [
      "400 48px 'Noto Sans Lao'",
      "600 48px 'Noto Sans Lao'",
      "700 48px 'Noto Sans Lao'",
    ];
    if (document.fonts && document.fonts.load) {
      Promise.all(fams.map((f) => document.fonts.load(f)))
        .then(() => document.fonts.ready)
        .then(() => alive && setFontReady(true))
        .catch(() => alive && setFontReady(true));
    } else {
      setFontReady(true);
    }
    return () => {
      alive = false;
    };
  }, []);

  const onUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    Promise.all(
      files.map((file) => {
        const url = URL.createObjectURL(file);
        return loadImg(url).then((img) => {
          URL.revokeObjectURL(url);
          return img;
        });
      })
    ).then((imgs) => {
      setPhotos((prev) => [...prev, ...imgs]);
    });
    e.target.value = "";
  };

  const removePhoto = (idx) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
    setActiveIdx((cur) => (cur >= idx && cur > 0 ? cur - 1 : cur));
  };

  // Render a given photo + template onto a given canvas. Reused for preview & export.
  const renderCanvas = useCallback(
    (canvas, photoArg, tplArg) => {
      drawWatermark(canvas, photoArg, tplArg, logo);
    },
    [logo]
  );

  // preview the active photo
  useEffect(() => {
    renderCanvas(canvasRef.current, photo, tpl);
  }, [renderCanvas, photo, tpl, fontReady]);

  // download the currently previewed image
  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(
      (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `khopkhua-${tpl.id}-${Date.now()}.jpg`;
        a.click();
        URL.revokeObjectURL(url);
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 1500);
      },
      "image/jpeg",
      0.92
    );
  };

  // apply the chosen template to ALL photos and download each
  const downloadAll = async () => {
    if (!photos.length) return;
    setDownloading(true);
    const off = document.createElement("canvas");
    for (let i = 0; i < photos.length; i++) {
      renderCanvas(off, photos[i], tpl);
      // wait a frame so canvas is painted
      await new Promise((r) => setTimeout(r, 60));
      const blob = await new Promise((res) =>
        off.toBlob(res, "image/jpeg", 0.92)
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `khopkhua-${tpl.id}-${i + 1}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
      await new Promise((r) => setTimeout(r, 250)); // stagger downloads
    }
    setDownloading(false);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 1500);
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
        <div className="text-center flex-1">
          <h1 className="text-lg font-bold text-white">ໃສ່ລາຍນ້ຳ (Watermark)</h1>
          <p className="text-[11px] text-brand-400">{TEMPLATES.length} ຮູບແບບ ໃຫ້ເລືອກໃຊ້</p>
        </div>
        <div className="w-8" />
      </div>

      {/* Preview */}
      <div className="px-5 mt-4">
        <div className="card p-2 overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full rounded-xl block"
            style={{ maxHeight: 360, objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Thumbnails (multi image) */}
      {photos.length > 0 && (
        <div className="px-5 mt-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] text-white/60">
              {photos.length} ຮູບ • ກົດເລືອກເພື່ອເບິ່ງຕົວຢ່າງ
            </p>
            <button
              onClick={() => {
                setPhotos([]);
                setActiveIdx(0);
              }}
              className="text-[11px] text-rose-400/80"
            >
              ລຶບທັງໝົດ
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {photos.map((ph, i) => (
              <div key={i} className="relative shrink-0">
                <img
                  src={ph.src}
                  alt=""
                  onClick={() => setActiveIdx(i)}
                  className={`w-16 h-16 rounded-xl object-cover cursor-pointer transition-all ${
                    activeIdx === i
                      ? "ring-2 ring-violet-500 scale-105"
                      : "opacity-70 hover:opacity-100"
                  }`}
                />
                <button
                  onClick={() => removePhoto(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center"
                  aria-label="ລຶບຮູບ"
                >
                  <X size={11} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload */}
      <div className="px-5 mt-3">
        <label className="card border-dashed border-2 border-line py-4 flex items-center justify-center gap-2 text-white/70 hover:border-violet-500/50 transition-colors cursor-pointer">
          <UploadCloud size={20} className="text-violet-500" />
          <span className="text-sm font-medium">
            {photos.length ? "ເພີ່ມຮູບ (ໄດ້ຫລາຍຮູບ)" : "ອັບໂຫລດຮູບຊັບສິນ (ໄດ້ຫລາຍຮູບ)"}
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Templates */}
      <div className="px-5 mt-4">
        <p className="font-semibold text-white mb-3 flex items-center gap-2">
          <ImageIcon size={16} className="text-gold" /> ເລືອກຮູບແບບລາຍນ້ຳ
        </p>

        {/* Category tabs (folders) */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
          {CATS.map((c) => {
            const count =
              c.id === "all"
                ? TEMPLATES.length
                : TEMPLATES.filter((t) => catOf(t) === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition active:scale-95 ${
                  cat === c.id ? "gradient-btn text-white" : "card text-white/60"
                }`}
              >
                {c.label} <span className="opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {visibleTemplates.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setTpl(t)}
              className={`card p-3 text-left transition-all duration-200 active:scale-95 relative ${
                tpl.id === t.id ? "border-violet-500 ring-1 ring-violet-500/50" : "hover:border-white/20"
              }`}
            >
              {tpl.id === t.id && (
                <span className="absolute top-2 right-2 w-5 h-5 rounded-full gradient-btn flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </span>
              )}
              <div
                className="w-full h-10 rounded-lg mb-2 flex items-end p-1"
                style={{ background: `linear-gradient(135deg, ${t.accent}33, ${t.accent}11)` }}
              >
                <div className="w-full h-2.5 rounded" style={{ background: t.accent, opacity: 0.85 }} />
              </div>
              <p className="text-[11px] text-white/80 font-medium">{t.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Download */}
      <div className="px-5 mt-5 space-y-2">
        {photos.length > 1 && (
          <button
            onClick={downloadAll}
            disabled={downloading}
            className="w-full gradient-btn py-3.5 rounded-2xl font-semibold text-white shadow-glow flex items-center justify-center gap-2 active:scale-95 hover:brightness-110 transition-all disabled:opacity-60"
          >
            {downloading ? (
              <>
                <Download size={20} className="animate-bounce" /> ກຳລັງດາວໂຫລດ...
              </>
            ) : (
              <>
                <Download size={20} /> ດາວໂຫລດທັງໝົດ ({photos.length} ຮູບ)
              </>
            )}
          </button>
        )}
        <button
          onClick={download}
          disabled={!photo}
          className={`w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50 ${
            photos.length > 1
              ? "card text-white hover:border-white/25"
              : "gradient-btn text-white shadow-glow hover:brightness-110"
          }`}
        >
          {downloaded ? (
            <>
              <Check size={20} /> ດາວໂຫລດສຳເລັດ!
            </>
          ) : (
            <>
              <Download size={20} /> ດາວໂຫລດຮູບນີ້
            </>
          )}
        </button>
        <p className="text-center text-[11px] text-white/40">
          {photos.length
            ? "ຮູບຈະບັນທຶກລົງໂທລະສັບ ພ້ອມໂພສ Facebook / TikTok"
            : "ກະລຸນາອັບໂຫລດຮູບກ່ອນ"}
        </p>
      </div>

      <div className="h-6" />
    </div>
  );
}
