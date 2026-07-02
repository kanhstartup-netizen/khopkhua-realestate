import { useState } from "react";
import { ChevronLeft, Plus, Bot, Search, ChevronRight, MessageCircle, Droplet, Paperclip } from "lucide-react";
import * as Icons from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/Store";
import { aiStaff } from "../data/seed";
import { hasApiKey } from "../lib/ai";

function ProgressRow({ title, progress, color }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1.5">
        <span className="text-white/80">{title}</span>
        <span className="text-white/60 text-xs">{progress}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${color}, #d946ef)`,
          }}
        />
      </div>
    </div>
  );
}

export default function Staff() {
  const navigate = useNavigate();
  const { tasks, addTask } = useStore();
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [staff, setStaff] = useState("finder");
  const hasKey = hasApiKey();

  const staffName = (id) => aiStaff.find((s) => s.id === id)?.name || "AI";
  const staffColor = (id) => aiStaff.find((s) => s.id === id)?.color || "#8b5cf6";

  const submit = () => {
    if (!title.trim()) return;
    addTask({ title, staff });
    setTitle("");
    setAdding(false);
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
          <h1 className="text-lg font-bold text-white">Staff AI</h1>
          <p className="text-[11px] text-white/45 flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" /> ຄຸຍໄດ້ທຸກເວລາທີ່ເປີດແອັບ
          </p>
        </div>
        <div className="w-8" />
      </div>

      {/* Robot hero */}
      <div className="px-5 mt-4">
        <div className="card p-5 flex flex-col items-center text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(300px 200px at 50% 0%, rgba(124,58,237,0.4), transparent)",
            }}
          />
          <div className="animate-float relative">
            <div className="w-24 h-24 rounded-full gradient-btn flex items-center justify-center shadow-glow">
              <Bot size={52} className="text-white" />
            </div>
          </div>
          <p className="mt-4 text-white font-medium relative">
            ຜູ້ຊ່ວຍ AI ຂອງທ່ານ
            <br />
            ພ້ອມຄຸຍນຳທຸກເວລາທີ່ທ່ານເປີດແອັບ
          </p>
          {!hasKey && (
            <button
              onClick={() => navigate("/settings")}
              className="mt-3 relative text-[11px] px-3 py-1.5 rounded-full bg-amber-400/15 text-amber-300 font-medium active:scale-95 transition-transform"
            >
              ⚡ ຕັ້ງຄ່າ API key ເພື່ອເລີ່ມຄຸຍກັບ AI Staff
            </button>
          )}
        </div>
      </div>

      {/* New task button */}
      <div className="px-5 mt-4">
        <button
          onClick={() => setAdding((v) => !v)}
          className="w-full gradient-btn py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold text-white shadow-glow active:scale-95 hover:brightness-110 transition-all"
        >
          <Plus size={20} className={`transition-transform ${adding ? "rotate-45" : ""}`} /> ສ້າງໜ້າວຽກໃໝ່
        </button>
      </div>

      {adding && (
        <div className="px-5 mt-3 fade-up">
          <div className="card p-4 space-y-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ຊື່ໜ້າວຽກ..."
              className="w-full bg-white/5 rounded-xl px-3 py-2.5 text-sm outline-none text-white placeholder:text-white/40"
            />
            <select
              value={staff}
              onChange={(e) => setStaff(e.target.value)}
              className="w-full bg-white/5 rounded-xl px-3 py-2.5 text-sm outline-none text-white"
            >
              {aiStaff.map((s) => (
                <option key={s.id} value={s.id} className="bg-panel">
                  {s.name} ({s.role})
                </option>
              ))}
            </select>
            <button
              onClick={submit}
              className="w-full bg-brand-600 py-2.5 rounded-xl font-semibold text-white text-sm"
            >
              ມອບໝາຍໃຫ້ AI
            </button>
          </div>
        </div>
      )}

      {/* Property Finder shortcut */}
      <div className="px-5 mt-3">
        <button
          onClick={() => navigate("/finder")}
          className="w-full card p-3.5 flex items-center gap-3 active:scale-[0.98] hover:border-brand-400/40 transition-all text-left"
        >
          <div className="w-11 h-11 rounded-2xl bg-brand-500/15 flex items-center justify-center">
            <Search size={22} className="text-brand-400" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">ທີມຄົ້ນຫາຊັບສິນ</p>
            <p className="text-[11px] text-white/55">ເບິ່ງຊັບທີ່ AI ຄົ້ນພົບ ແລະ ອະນຸມັດເຂົ້າແອັບ</p>
          </div>
          <ChevronRight size={18} className="text-white/40" />
        </button>
      </div>

      {/* Task progress */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-white">ຄວາມຄືບໜ້າວຽກ AI</p>
        </div>
        <div className="card p-4 space-y-4">
          {tasks.map((t) => (
            <ProgressRow
              key={t.id}
              title={t.title}
              progress={t.progress}
              color={staffColor(t.staff)}
            />
          ))}
        </div>
      </div>

      {/* AI Staff departments */}
      <div className="px-5 mt-5">
        <p className="font-semibold text-white mb-3">ໜ່ວຍງານ AI</p>
        <div className="grid grid-cols-2 gap-3">
          {aiStaff.map((s, i) => {
            const Icon = Icons[s.icon] || Bot;
            return (
              <div
                key={s.id}
                style={{ animationDelay: `${i * 50}ms` }}
                className="card p-3 fade-up hover:-translate-y-0.5 hover:border-white/20 transition-all duration-200 group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ background: `${s.color}22` }}
                  >
                    <Icon size={18} style={{ color: s.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {s.name}
                    </p>
                    <p className="text-[10px] text-white/45">{s.role}</p>
                  </div>
                </div>
                <ul className="space-y-1">
                  {s.tasks.map((task, i) => (
                    <li key={i} className="text-[10px] text-white/55 flex gap-1">
                      <span style={{ color: s.color }}>•</span> {task}
                    </li>
                  ))}
                </ul>
                {s.id === "legal" && (
                  <p className="mt-1.5 text-[9px] text-emerald-400/80 flex items-center gap-1">
                    <Paperclip size={9} /> ອັບໂຫລດ PDF/Word ໄດ້
                  </p>
                )}
                <div className="mt-2.5 flex gap-1.5">
                  {s.id === "designer" ? (
                    <button
                      onClick={() => navigate("/watermark")}
                      className="flex-1 text-[11px] py-1.5 rounded-lg font-medium text-white active:scale-95 transition-transform hover:brightness-125 flex items-center justify-center gap-1"
                      style={{ background: `${s.color}33` }}
                    >
                      <Droplet size={11} /> ໃສ່ລາຍນ້ຳ
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => navigate(`/staff/${s.id}/chat`)}
                        className="flex-1 text-[11px] py-1.5 rounded-lg font-medium text-white active:scale-95 transition-transform hover:brightness-125 flex items-center justify-center gap-1"
                        style={{ background: `${s.color}33` }}
                      >
                        <MessageCircle size={11} /> ຄຸຍນຳ
                      </button>
                      {s.id === "finder" && (
                        <button
                          onClick={() => navigate("/finder")}
                          aria-label="ເບິ່ງຊັບທີ່ຄົ້ນພົບ"
                          className="w-8 shrink-0 rounded-lg bg-white/5 flex items-center justify-center active:scale-90 transition-transform hover:bg-white/10"
                        >
                          <ChevronRight size={14} className="text-white/50" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* n8n / integration note */}
      <div className="px-5 mt-5">
        <div className="card p-4">
          <p className="text-xs text-white/55 leading-relaxed">
            🔗 ການຄົ້ນຫາອັດຕະໂນມັດ 24/7 (Facebook/TikTok scraping, ຫານາຍທຶນ,
            ໂພສເພຈອັດຕະໂນມັດ, ຕັດຕໍ່ວິດີໂອຈິງ) ຕ້ອງການລະບົບແຍກຕ່າງຫາກ ເຊັ່ນ{" "}
            <span className="text-brand-400">n8n</span> ທີ່ແລ່ນຢູ່ server
            ຕະຫລອດເວລາ — ອ່ານແຜນການຕັ້ງຄ່າໄດ້ໃນ{" "}
            <span className="text-brand-400">N8N_AUTOMATION_PLAN.md</span> ໃນ
            ໂຟນເດີໂປຣເຈັກ.
          </p>
        </div>
      </div>

      <div className="h-6" />
    </div>
  );
}
