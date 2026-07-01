import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  KeyRound,
  Eye,
  EyeOff,
  Check,
  Trash2,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { getApiKey, setApiKey, hasApiKey } from "../lib/ai";

export default function Settings() {
  const navigate = useNavigate();
  const [key, setKey] = useState(() => getApiKey());
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setApiKey(key);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const clearKey = () => {
    setApiKey("");
    setKey("");
  };

  const masked = key ? key.slice(0, 8) + "•".repeat(Math.max(0, key.length - 12)) + key.slice(-4) : "";

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
          <h1 className="text-lg font-bold text-white">ການຕັ້ງຄ່າ</h1>
          <p className="text-[11px] text-white/50">Claude API key ສຳລັບ AI Staff</p>
        </div>
        <div className="w-8" />
      </div>

      {/* Status card */}
      <div className="px-5 mt-4">
        <div className="card p-4 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: hasApiKey() ? "rgba(52,211,153,0.15)" : "rgba(148,163,184,0.15)" }}
          >
            <KeyRound size={19} className={hasApiKey() ? "text-emerald-400" : "text-white/50"} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">
              {hasApiKey() ? "API key ຕັ້ງແລ້ວ" : "ຍັງບໍ່ໄດ້ຕັ້ງ API key"}
            </p>
            <p className="text-[11px] text-white/50">
              {hasApiKey() ? "AI Staff Chat ພ້ອມໃຊ້ງານ" : "ຕ້ອງໃສ່ key ກ່ອນຈຶ່ງຈະຄຸຍກັບ AI Staff ໄດ້"}
            </p>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="px-5 mt-4">
        <div className="card p-4 space-y-3">
          <label className="text-xs font-medium text-white/70">Anthropic API Key</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="sk-ant-api03-..."
              className="w-full bg-white/5 rounded-xl pl-3 pr-10 py-2.5 text-sm outline-none text-white placeholder:text-white/30 font-mono"
              autoComplete="off"
              spellCheck={false}
            />
            <button
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "ເຊື່ອງ key" : "ສະແດງ key"}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={save}
              disabled={!key.trim()}
              className="flex-1 gradient-btn py-2.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all disabled:opacity-40 disabled:active:scale-100"
            >
              {saved ? (
                <>
                  <Check size={16} /> ບັນທຶກແລ້ວ
                </>
              ) : (
                "ບັນທຶກ"
              )}
            </button>
            {hasApiKey() && (
              <button
                onClick={clearKey}
                aria-label="ລຶບ key"
                className="w-11 rounded-xl bg-rose-500/15 flex items-center justify-center active:scale-90 transition-all"
              >
                <Trash2 size={16} className="text-rose-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Where to get a key */}
      <div className="px-5 mt-4">
        <a
          href="https://console.anthropic.com/settings/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="card p-3.5 flex items-center gap-3 active:scale-[0.98] hover:border-brand-400/40 transition-all"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-500/15 flex items-center justify-center shrink-0">
            <ExternalLink size={16} className="text-brand-400" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-white">ສ້າງ API key ໄດ້ທີ່ Anthropic Console</p>
            <p className="text-[10px] text-white/50">console.anthropic.com/settings/keys</p>
          </div>
        </a>
      </div>

      {/* Privacy note */}
      <div className="px-5 mt-4">
        <div className="card p-4 flex gap-3">
          <ShieldCheck size={18} className="text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-white/55 leading-relaxed">
            API key ຂອງທ່ານຖືກເກັບໄວ້ໃນ browser ຂອງທ່ານເທົ່ານັ້ນ (localStorage) ແລະ
            ຖືກນຳໃຊ້ເພື່ອສົ່ງຂໍ້ຄວາມກົງໄປຫາ Anthropic API ໂດຍກົງ. ແອັບນີ້ບໍ່ມີ server
            ຂອງຕົນເອງ ດັ່ງນັ້ນ key ຈະບໍ່ຖືກສົ່ງໄປບ່ອນອື່ນ. ຢ່າແບ່ງປັນ key ນີ້ໃຫ້ຄົນອື່ນ.
          </p>
        </div>
      </div>

      <div className="h-6" />
    </div>
  );
}
