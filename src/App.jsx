import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/Auth";
import { StoreProvider } from "./context/Store";
import { PhoneShell, BottomNav } from "./components/Shell";
import SplashScreen from "./components/SplashScreen";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Staff from "./pages/Staff";
import AddProperty from "./pages/AddProperty";
import More from "./pages/More";
import Finder from "./pages/Finder";
import Watermark from "./pages/Watermark";
import PropertyDetail from "./pages/PropertyDetail";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import AddStaff from "./pages/AddStaff";
import { Loader2 } from "lucide-react";

// ພາຍໃນ: ຕັດສິນໃຈວ່າຈະສະແດງ Login ຫລືແອັບຫລັກ
function Gate() {
  const { user, loading, firebaseEnabled } = useAuth();

  // ກຳລັງກວດສະຖານະ login (ສະເພາະເມື່ອໃຊ້ Firebase)
  if (loading) {
    return (
      <PhoneShell>
        <div className="min-h-full flex items-center justify-center">
          <Loader2 size={28} className="text-brand-400 animate-spin" />
        </div>
      </PhoneShell>
    );
  }

  // ຖ້າໃຊ້ Firebase ແລະ ຍັງບໍ່ໄດ້ login → ສະແດງໜ້າ Login
  if (firebaseEnabled && !user) {
    return (
      <PhoneShell>
        <Login />
      </PhoneShell>
    );
  }

  // login ແລ້ວ (ຫລືບໍ່ໃຊ້ Firebase) → ແອັບຫລັກ
  return (
    <StoreProvider>
      <HashRouter>
        <PhoneShell>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/staff/:staffId/chat" element={<Chat />} />
            <Route path="/finder" element={<Finder />} />
            <Route path="/watermark" element={<Watermark />} />
            <Route path="/add" element={<AddProperty />} />
            <Route path="/more" element={<More />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/add-staff" element={<AddStaff />} />
          </Routes>
          <BottomNav />
        </PhoneShell>
      </HashRouter>
    </StoreProvider>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <PhoneShell>
        <SplashScreen onDone={() => setLoading(false)} />
      </PhoneShell>
    );
  }

  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}
