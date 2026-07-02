import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as Icons from "lucide-react";
import {
  ChevronLeft,
  Send,
  Bot,
  User,
  KeyRound,
  Loader2,
  Trash2,
  AlertTriangle,
  Paperclip,
  FileText,
  X,
} from "lucide-react";
import { useStore } from "../context/Store";
import { aiStaff } from "../data/seed";
import { hasApiKey, sendToClaude } from "../lib/ai";

function Bubble({ role, content, color, pending, attachment }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} gap-2`}>
      {!isUser && (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: `${color}33` }}
        >
          <Bot size={14} style={{ color }} />
        </div>
      )}
      <div
        className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? "bg-brand-600 text-white rounded-br-md"
            : "card text-white/90 rounded-bl-md"
        }`}
      >
        {attachment && (
          <div
            className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 mb-2 text-[11px] ${
              isUser ? "bg-white/15" : "bg-white/5"
            }`}
          >
            <FileText size={13} className="shrink-0" />
            <span className="truncate">{attachment}</span>
          </div>
        )}
        {pending ? (
          <span className="flex items-center gap-1.5 text-white/50">
            <Loader2 size={13} className="animate-spin" /> ກຳລັງພິມ...
          </span>
        ) : (
          content
        )}
      </div>
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
          <User size={14} className="text-white/70" />
        </div>
      )}
    </div>
  );
}

export default function Chat() {
  const navigate = useNavigate();
  const { staffId } = useParams();
  const { getChat, addChatMessage, setChatMessages, clearChat } = useStore();
  const staff = aiStaff.find((s) => s.id === staffId);

  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  const [pendingFile, setPendingFile] = useState(null); // { name, text, pages, type }
  const [extracting, setExtracting] = useState(false);
  const [fileError, setFileError] = useState("");
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);
  const keyReady = hasApiKey();
  const supportsUpload = staff?.id === "legal";

  const history = staff ? getChat(staff.id) : [];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history, sending]);

  if (!staff) {
    return (
      <div className="fade-up pt-3 px-5">
        <p className="text-white/70">ບໍ່ພົບໜ່ວຍງານ AI ນີ້.</p>
        <button onClick={() => navigate("/staff")} className="mt-3 text-brand-400 text-sm">
          ← ກັບຄືນ
        </button>
      </div>
    );
  }

  const Icon = Icons[staff.icon] || Bot;

  const onFileSelected = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // ໃຫ້ເລືອກໄຟລ໌ດຽວກັນຊ້ຳໄດ້
    if (!file) return;
    setFileError("");
    setExtracting(true);
    try {
      const { extractDocument } = await import("../lib/docParser");
      const doc = await extractDocument(file);
      if (!doc.text) {
        setFileError("ອ່ານເອກະສານນີ້ບໍ່ພົບຂໍ້ຄວາມ (ອາດເປັນຮູບສະແກນ).");
      } else {
        setPendingFile(doc);
      }
    } catch (err) {
      if (err.code === "UNSUPPORTED_DOC") {
        setFileError("ໄຟລ໌ .doc ເກົ່າຍັງບໍ່ຮອງຮັບ — ກະລຸນາໃຊ້ .docx ຫລື .pdf");
      } else if (err.code === "UNSUPPORTED_TYPE") {
        setFileError("ຮອງຮັບສະເພາະໄຟລ໌ PDF, Word (.docx), ຫລື .txt");
      } else {
        setFileError("ອ່ານໄຟລ໌ບໍ່ສຳເລັດ, ລອງໄຟລ໌ອື່ນ.");
      }
    } finally {
      setExtracting(false);
    }
  };

  const removePendingFile = () => setPendingFile(null);

  const submit = async () => {
    const text = input.trim();
    if ((!text && !pendingFile) || sending) return;

    if (!hasApiKey()) {
      setError("NO_KEY");
      return;
    }

    setError("");
    const attachment = pendingFile;
    const userVisibleText = text || `ກະລຸນາອ່ານ ແລະ ວິເຄາະເອກະສານນີ້: ${attachment?.name}`;

    // ຂໍ້ຄວາມສົ່ງໄປ API ຈະລວມເນື້ອຫາເອກະສານ (ຖ້າມີ) ແຕ່ bubble ໃນຈໍສະແດງພຽງຄຳຖາມ
    const apiText = attachment
      ? `${userVisibleText}\n\n[ເອກະສານ: ${attachment.name}]\n${attachment.text}`
      : userVisibleText;

    const userMsg = {
      role: "user",
      content: userVisibleText,
      apiContent: apiText,
      attachment: attachment?.name,
      ts: Date.now(),
    };
    addChatMessage(staff.id, userMsg);
    setInput("");
    setPendingFile(null);
    setSending(true);

    try {
      const nextHistory = [...history, userMsg];
      const reply = await sendToClaude(
        nextHistory.map((m) => ({ role: m.role, content: m.apiContent || m.content })),
        staff.systemPrompt
      );
      addChatMessage(staff.id, { role: "assistant", content: reply, ts: Date.now() });
    } catch (e) {
      let msg = "ເກີດຂໍ້ຜິດພາດ, ລອງໃໝ່ອີກຄັ້ງ.";
      if (e.code === "NO_API_KEY") msg = "ຍັງບໍ່ໄດ້ໃສ່ API key.";
      else if (e.code === "BAD_KEY") msg = "API key ບໍ່ຖືກຕ້ອງ ຫລືໝົດອາຍຸ.";
      else if (e.message) msg = e.message;
      addChatMessage(staff.id, { role: "assistant", content: `⚠️ ${msg}`, ts: Date.now(), isError: true });
    } finally {
      setSending(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const doClear = () => {
    clearChat(staff.id);
    setConfirmClear(false);
  };

  return (
    <div className="fade-up pt-3 flex flex-col" style={{ minHeight: "calc(100vh - 96px)" }}>
      {/* Header */}
      <div className="px-5 pt-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          aria-label="ກັບຄືນ"
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"
        >
          <ChevronLeft size={20} className="text-white/80" />
        </button>
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${staff.color}22` }}
          >
            <Icon size={18} style={{ color: staff.color }} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">{staff.name}</p>
            <p className="text-[10px] text-white/50 flex items-center gap-1">
              <span
                className={`w-1.5 h-1.5 rounded-full ${keyReady ? "bg-emerald-400 animate-pulse" : "bg-white/30"}`}
              />
              {keyReady ? "ພ້ອມຕອບ" : "ຍັງບໍ່ໄດ້ຕັ້ງຄ່າ"}
            </p>
          </div>
        </div>
        {history.length > 0 && (
          <button
            onClick={() => setConfirmClear(true)}
            aria-label="ລຶບການສົນທະນາ"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"
          >
            <Trash2 size={16} className="text-white/50" />
          </button>
        )}
      </div>

      {/* Clear confirm */}
      {confirmClear && (
        <div className="px-5 mt-3 fade-up">
          <div className="card p-3.5 flex items-center gap-3">
            <AlertTriangle size={18} className="text-amber-400 shrink-0" />
            <p className="text-xs text-white/75 flex-1">ລຶບການສົນທະນານີ້ທັງໝົດ?</p>
            <button
              onClick={() => setConfirmClear(false)}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-white/10 text-white/70"
            >
              ບໍ່
            </button>
            <button
              onClick={doClear}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-rose-500/80 text-white font-medium"
            >
              ລຶບ
            </button>
          </div>
        </div>
      )}

      {/* No API key banner */}
      {!keyReady && (
        <div className="px-5 mt-3">
          <Link
            to="/settings"
            className="card p-3.5 flex items-center gap-3 active:scale-[0.98] transition-all border-amber-400/30"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-400/15 flex items-center justify-center shrink-0">
              <KeyRound size={17} className="text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-white">ຕັ້ງຄ່າ API key ກ່ອນ</p>
              <p className="text-[10px] text-white/50">ຕ້ອງໃສ່ Claude API key ເພື່ອໃຫ້ AI ຕອບໄດ້</p>
            </div>
            <ChevronLeft size={16} className="text-white/40 rotate-180" />
          </Link>
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 px-5 mt-4 space-y-3 overflow-y-auto pb-2">
        {/* Greeting bubble always shown first */}
        <Bubble role="assistant" content={staff.greeting} color={staff.color} />
        {history.map((m, i) => (
          <Bubble key={i} role={m.role} content={m.content} color={staff.color} attachment={m.attachment} />
        ))}
        {sending && <Bubble role="assistant" content="" color={staff.color} pending />}
      </div>

      {/* Pending file preview */}
      {supportsUpload && (pendingFile || extracting || fileError) && (
        <div className="px-5 pb-1 fade-up">
          {extracting && (
            <div className="glass rounded-xl px-3 py-2.5 flex items-center gap-2 text-xs text-white/60">
              <Loader2 size={14} className="animate-spin" /> ກຳລັງອ່ານເອກະສານ...
            </div>
          )}
          {pendingFile && !extracting && (
            <div className="glass rounded-xl px-3 py-2.5 flex items-center gap-2">
              <FileText size={15} className="text-brand-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/85 truncate">{pendingFile.name}</p>
                <p className="text-[10px] text-white/45">
                  {pendingFile.pages ? `${pendingFile.pages} ໜ້າ · ` : ""}ພ້ອມສົ່ງ
                </p>
              </div>
              <button
                onClick={removePendingFile}
                aria-label="ເອົາໄຟລ໌ອອກ"
                className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all shrink-0"
              >
                <X size={13} className="text-white/50" />
              </button>
            </div>
          )}
          {fileError && !extracting && (
            <p className="text-[10px] text-rose-400 mt-1.5 px-1">{fileError}</p>
          )}
        </div>
      )}

      {/* Input bar */}
      <div className="px-5 pt-3 pb-1 sticky bottom-0">
        <div className="glass rounded-2xl p-2 flex items-end gap-2">
          {supportsUpload && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                onChange={onFileSelected}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={extracting}
                aria-label="ອັບໂຫລດເອກະສານ"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 active:scale-90 transition-all hover:bg-white/10 disabled:opacity-40"
              >
                <Paperclip size={17} className="text-white/60" />
              </button>
            </>
          )}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder={`ພິມຂໍ້ຄວາມຫາ ${staff.name}...`}
            className="flex-1 bg-transparent resize-none outline-none text-sm text-white placeholder:text-white/35 px-2 py-2 max-h-24"
          />
          <button
            onClick={submit}
            disabled={(!input.trim() && !pendingFile) || sending}
            aria-label="ສົ່ງ"
            className="w-10 h-10 rounded-xl gradient-btn flex items-center justify-center shrink-0 active:scale-90 transition-all disabled:opacity-40 disabled:active:scale-100"
          >
            {sending ? (
              <Loader2 size={17} className="text-white animate-spin" />
            ) : (
              <Send size={16} className="text-white" />
            )}
          </button>
        </div>
        {error === "NO_KEY" && (
          <p className="text-[10px] text-amber-400 mt-1.5 px-1">
            ຍັງບໍ່ໄດ້ໃສ່ API key —{" "}
            <Link to="/settings" className="underline">
              ຕັ້ງຄ່າດຽວນີ້
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
