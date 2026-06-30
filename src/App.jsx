import { HashRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context/Store";
import { PhoneShell, BottomNav } from "./components/Shell";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Staff from "./pages/Staff";
import AddProperty from "./pages/AddProperty";
import More from "./pages/More";

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <PhoneShell>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/add" element={<AddProperty />} />
            <Route path="/more" element={<More />} />
          </Routes>
          <BottomNav />
        </PhoneShell>
      </HashRouter>
    </StoreProvider>
  );
}
