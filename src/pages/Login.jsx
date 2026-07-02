import { useState } from "react";
import { Mail, Lock, Loader2, LogIn, AlertTriangle } from "lucide-react";
import { useAuth } from "../context/Auth";
import Logo from "../components/Logo";

// ແປ error code ຂອງ Firebase ເປັນພາສາລາວ
function laoError(code) {
  const map = {
    "auth/invalid-email": "ຮູບແບບອີເມວບໍ່ຖືກຕ້ອງ",
    "auth/user-disabled": "ບັນຊີນີ້ຖືກລະງັບ",
    "auth/user-not-found": "ບໍ່ພົບບັນຊີນີ້ — ຕິດຕໍ່ admin ເພື່ອເພີ່ມບັນຊີ",
    "auth/wrong-password": "ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ",
    "auth/invalid-credential": "ອີເມວ ຫລືລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ",
    "auth/too-many-requests": "ລອງຫລາຍຄັ້ງເກີນໄປ ກະລຸນາລໍຖ້າ",
    "auth/popup-closed-by-user": "ປິດໜ້າຕ່າງ login ກ່ອນສຳເລັດ",
    "auth/network-request-failed": "ເຊື່ອມຕໍ່ອິນເຕີເນັດບໍ່ໄດ້",
  };
  return map[code] || "ເຂົ້າສູ່ລະບົບບໍ່ສຳເລັດ, ລອງໃໝ່ອີກຄັ້ງ";
}

export default function Login() {
  const { loginEmail, loginGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!email.trim() || !password || busy) return;
    setError("");
    setBusy(true);
    try {
      await loginEmail(email, password);
      // onAuthStateChanged ໃນ Auth context ຈະພາໄປໜ້າຫລັກເອງ
    } catch (e) {
      setError(laoError(e.code));
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    if (busy) return;
    setError("");
    setBusy(true);
    try {
      await loginGoogle();
    } catch (e) {
      setError(laoError(e.code));
    } finally {
      setBusy(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") submit();
  };

  return (
    <div className="fade-up min-h-full flex flex-col justify-center px-6 py-10">
      <div className="flex flex-col items-center text-center mb-8">
        <Logo size={80} glow />
        <h1 className="text-2xl font-bold text-white mt-4">Khopkhua Realestate</h1>
        <p className="text-sm text-white/50 mt-1">ເຂົ້າສູ່ລະບົບ ສຳລັບທີມງານ</p>
      </div>

      <div className="card p-5 space-y-4">
        {error && (
          <div className="flex items-start gap-2 rounded-xl bg-rose-500/12 px-3 py-2.5">
            <AlertTriangle size={15} className="text-rose-400 shrink-0 mt-0.5" />
            <p className="text-xs text-rose-300 leading-relaxed">{error}</p>
          </div>
        )}

        <div>
          <label className="text-xs font-medium text-white/70">ອີເມວ</label>
          <div className="relative mt-1.5">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="you@example.com"
              autoComplete="username"
              className="w-full bg-white/5 rounded-xl pl-9 pr-3 py-2.5 text-sm outline-none text-white placeholder:text-white/30"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-white/70">ລະຫັດຜ່ານ</label>
          <div className="relative mt-1.5">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full bg-white/5 rounded-xl pl-9 pr-3 py-2.5 text-sm outline-none text-white placeholder:text-white/30"
            />
          </div>
        </div>

        <button
          onClick={submit}
          disabled={!email.trim() || !password || busy}
          className="w-full gradient-btn py-2.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-40 disabled:active:scale-100"
        >
          {busy ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
          ເຂົ້າສູ່ລະບົບ
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[10px] text-white/35">ຫລື</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <button
          onClick={google}
          disabled={busy}
          className="w-full bg-white/8 hover:bg-white/12 py-2.5 rounded-xl font-medium text-white text-sm flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-40"
        >
          <GoogleIcon />
          ເຂົ້າສູ່ລະບົບດ້ວຍ Google
        </button>
      </div>

      <p className="text-[11px] text-white/40 text-center mt-5 leading-relaxed">
        ຍັງບໍ່ມີບັນຊີ? ຕິດຕໍ່ admin ຂອງທ່ານ ເພື່ອເພີ່ມບັນຊີພະນັກງານ.
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22 22-9.8 22-22c0-1.5-.2-2.6-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 4.1 29.6 2 24 2 15.9 2 8.8 6.6 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 46c5.5 0 10.4-2.1 14.1-5.5l-6.5-5.5c-2 1.5-4.7 2.5-7.6 2.5-5.2 0-9.6-3.3-11.3-7.9l-6.6 5.1C8.8 41.4 15.8 46 24 46z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.5l6.5 5.5C40.9 36.3 46 30.8 46 24c0-1.5-.2-2.6-.4-3.5z" />
    </svg>
  );
}
