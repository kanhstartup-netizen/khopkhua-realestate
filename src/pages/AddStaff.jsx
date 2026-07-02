import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  UserPlus,
  Mail,
  Lock,
  Loader2,
  Check,
  AlertTriangle,
  Copy,
} from "lucide-react";
import { initializeApp, deleteApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/Auth";
import { firebaseEnabled, app } from "../lib/firebase";

// ສ້າງບັນຊີພະນັກງານ ໂດຍໃຊ້ Firebase app ຮອງ (secondary) 
// ເພື່ອບໍ່ໃຫ້ admin ຖືກ logout ອອກ (createUser ຈະ sign-in ເປັນ user ໃໝ່)
function laoError(code) {
  const map = {
    "auth/email-already-in-use": "ອີເມວນີ້ຖືກໃຊ້ແລ້ວ",
    "auth/invalid-email": "ຮູບແບບອີເມວບໍ່ຖືກຕ້ອງ",
    "auth/weak-password": "ລະຫັດຜ່ານອ່ອນເກີນໄປ (ຕ້ອງ 6 ຕົວຂຶ້ນໄປ)",
    "auth/network-request-failed": "ເຊື່ອມຕໍ່ອິນເຕີເນັດບໍ່ໄດ້",
  };
  return map[code] || "ສ້າງບັນຊີບໍ່ສຳເລັດ, ລອງໃໝ່ອີກຄັ້ງ";
}

export default function AddStaff() {
  const navigate = useNavigate();
  const { admin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState(null); // { email, password }
  const [copied, setCopied] = useState(false);

  if (!firebaseEnabled) {
    return (
      <div className="fade-up pt-3 px-5">
        <BackHeader navigate={navigate} />
        <div className="card p-4 mt-4">
          <p className="text-sm text-white/70">
            ໜ້ານີ້ໃຊ້ໄດ້ກໍ່ຕໍ່ເມື່ອຕັ້ງຄ່າ Firebase ແລ້ວ. ເບິ່ງ
            <span className="text-brand-400"> FIREBASE_SETUP.md</span> ໃນໂຟນເດີໂປຣເຈັກ.
          </p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="fade-up pt-3 px-5">
        <BackHeader navigate={navigate} />
        <div className="card p-4 mt-4 flex items-center gap-3">
          <AlertTriangle size={18} className="text-amber-400 shrink-0" />
          <p className="text-sm text-white/70">
            ສະເພາະ admin ເທົ່ານັ້ນທີ່ເພີ່ມພະນັກງານໄດ້.
          </p>
        </div>
      </div>
    );
  }

  const genPassword = () => {
    const chars = "abcdefghjkmnpqrstuvwxyz23456789";
    let p = "";
    for (let i = 0; i < 10; i++)
      p += chars[Math.floor(Math.random() * chars.length)];
    setPassword(p);
  };

  const submit = async () => {
    if (!email.trim() || !password || busy) return;
    setError("");
    setBusy(true);

    // ໃຊ້ app ຮອງ ເພື່ອບໍ່ໃຫ້ session ຂອງ admin ຖືກແທນ
    let secondary = null;
    try {
      secondary = initializeApp(app.options, "staff-creator-" + Date.now());
      const secondaryAuth = getAuth(secondary);
      await createUserWithEmailAndPassword(secondaryAuth, email.trim(), password);
      setCreated({ email: email.trim(), password });
      setEmail("");
      setPassword("");
    } catch (e) {
      setError(laoError(e.code));
    } finally {
      if (secondary) {
        try {
          await deleteApp(secondary);
        } catch {
          /* ignore */
        }
      }
      setBusy(false);
    }
  };

  const copyCreds = () => {
    if (!created) return;
    navigator.clipboard
      ?.writeText(`ອີເມວ: ${created.email}\nລະຫັດຜ່ານ: ${created.password}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => {});
  };

  return (
    <div className="fade-up pt-3">
      <BackHeader navigate={navigate} />

      {/* ບັນຊີທີ່ຫາກໍ່ສ້າງ */}
      {created && (
        <div className="px-5 mt-4 fade-up">
          <div className="card p-4 border-emerald-400/30">
            <div className="flex items-center gap-2 mb-2">
              <Check size={16} className="text-emerald-400" />
              <p className="text-sm font-semibold text-white">ສ້າງບັນຊີສຳເລັດ!</p>
            </div>
            <p className="text-[11px] text-white/55 mb-3">
              ບັນທຶກ ຫລືສົ່ງຂໍ້ມູນນີ້ໃຫ້ພະນັກງານ (ລະຫັດຜ່ານຈະບໍ່ສະແດງອີກ):
            </p>
            <div className="bg-white/5 rounded-xl p-3 text-xs text-white/80 font-mono space-y-1">
              <p>ອີເມວ: {created.email}</p>
              <p>ລະຫັດ: {created.password}</p>
            </div>
            <button
              onClick={copyCreds}
              className="mt-3 w-full text-xs py-2 rounded-xl bg-white/8 hover:bg-white/12 text-white/85 font-medium flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "ຄັດລອກແລ້ວ" : "ຄັດລອກຂໍ້ມູນ"}
            </button>
          </div>
        </div>
      )}

      <div className="px-5 mt-4">
        <div className="card p-5 space-y-4">
          {error && (
            <div className="flex items-start gap-2 rounded-xl bg-rose-500/12 px-3 py-2.5">
              <AlertTriangle size={15} className="text-rose-400 shrink-0 mt-0.5" />
              <p className="text-xs text-rose-300">{error}</p>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-white/70">ອີເມວພະນັກງານ</label>
            <div className="relative mt-1.5">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@example.com"
                className="w-full bg-white/5 rounded-xl pl-9 pr-3 py-2.5 text-sm outline-none text-white placeholder:text-white/30"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-white/70">ລະຫັດຜ່ານ</label>
              <button
                onClick={genPassword}
                className="text-[10px] text-brand-400 hover:underline"
              >
                ສຸ່ມລະຫັດໃຫ້
              </button>
            </div>
            <div className="relative mt-1.5">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ຢ່າງໜ້ອຍ 6 ຕົວ"
                className="w-full bg-white/5 rounded-xl pl-9 pr-3 py-2.5 text-sm outline-none text-white placeholder:text-white/30 font-mono"
              />
            </div>
          </div>

          <button
            onClick={submit}
            disabled={!email.trim() || !password || busy}
            className="w-full gradient-btn py-2.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-40 disabled:active:scale-100"
          >
            {busy ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
            ສ້າງບັນຊີພະນັກງານ
          </button>
        </div>

        <p className="text-[11px] text-white/40 text-center mt-4 leading-relaxed">
          ພະນັກງານຈະ login ດ້ວຍອີເມວ+ລະຫັດນີ້ ຫລືປ່ຽນໄປໃຊ້ Google ທີ່ມີອີເມວດຽວກັນກໍ່ໄດ້.
        </p>
      </div>
    </div>
  );
}

function BackHeader({ navigate }) {
  return (
    <div className="px-5 pt-4 flex items-center gap-3">
      <button
        onClick={() => navigate(-1)}
        aria-label="ກັບຄືນ"
        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"
      >
        <ChevronLeft size={20} className="text-white/80" />
      </button>
      <div className="text-center flex-1">
        <h1 className="text-lg font-bold text-white">ເພີ່ມພະນັກງານ</h1>
        <p className="text-[11px] text-white/50">ສະເພາະ Admin</p>
      </div>
      <div className="w-8" />
    </div>
  );
}
