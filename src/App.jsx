import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context/Store";
import { PhoneShell, BottomNav } from "./components/Shell";
import SplashScreen from "./components/SplashScreen";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Staff from "./pages/Staff";
import AddProperty from "./pages/AddProperty";
import More from "./pages/More";
import Finder from "./pages/Finder";
import Watermark from "./pages/Watermark";

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
    <StoreProvider>
      <HashRouter>
        <PhoneShell>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/finder" element={<Finder />} />
            <Route path="/watermark" element={<Watermark />} />
            <Route path="/add" element={<AddProperty />} />
            <Route path="/more" element={<More />} />
          </Routes>
          <BottomNav />
        </PhoneShell>
      </HashRouter>
    </StoreProvider>
  );
}
