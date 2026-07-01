import { createContext, useContext, useEffect, useState } from "react";
import { seedProperties, seedTasks, seedFoundLeads } from "../data/seed";

const StoreContext = createContext(null);

const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [properties, setProperties] = useState(() =>
    load("kk_properties", seedProperties)
  );
  const [tasks, setTasks] = useState(() => load("kk_tasks", seedTasks));
  const [leads, setLeads] = useState(() => load("kk_leads", seedFoundLeads));
  // images passed to the Watermark page (not persisted)
  const [pendingImages, setPendingImages] = useState([]);

  useEffect(() => {
    localStorage.setItem("kk_properties", JSON.stringify(properties));
  }, [properties]);
  useEffect(() => {
    localStorage.setItem("kk_tasks", JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem("kk_leads", JSON.stringify(leads));
  }, [leads]);

  const addProperty = (p) =>
    setProperties((prev) => [{ ...p, id: "p" + Date.now() }, ...prev]);

  const removeProperty = (id) =>
    setProperties((prev) => prev.filter((p) => p.id !== id));

  const addTask = (t) =>
    setTasks((prev) => [{ ...t, id: "t" + Date.now(), progress: 0 }, ...prev]);

  // ອະນຸມັດ lead -> ຍ້າຍເຂົ້າເປັນຊັບສິນຈິງ ໃນແອັບ
  const approveLead = (id) => {
    const lead = leads.find((l) => l.id === id);
    if (!lead) return;
    const { id: _omit, owner, phone, source, sourceUrl, foundAt, ...rest } = lead;
    setProperties((prev) => [
      { ...rest, id: "p" + Date.now(), status: "ກຳລັງຂາຍ" },
      ...prev,
    ]);
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  // ປະຕິເສດ lead
  const rejectLead = (id) =>
    setLeads((prev) => prev.filter((l) => l.id !== id));

  // ຈຳລອງ AI ຄົ້ນພົບຊັບໃໝ່
  const simulateFind = () => {
    const samples = [
      { type: "land", name: "ດິນຕອນໃໝ່ ໂນນຄໍ້", location: "ໂນນຄໍ້, ໄຊທານີ", price: 1200000000, area: 560, source: "Facebook", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=70" },
      { type: "house", name: "ເຮືອນຊັ້ນດຽວ ໂພນສະຫວ່າງ", location: "ໂພນສະຫວ່າງ, ສີໂຄດ", price: 1950000000, area: 180, beds: 2, baths: 1, source: "TikTok", img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=70" },
      { type: "land", name: "ດິນຕິດແມ່ນ້ຳ ປາກງື່ມ", location: "ປາກງື່ມ, ນະຄອນຫລວງ", price: 3400000000, area: 1100, source: "Facebook", img: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600&q=70" },
    ];
    const s = samples[Math.floor(Math.random() * samples.length)];
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    setLeads((prev) => [
      {
        id: "f" + Date.now(),
        beds: 0,
        baths: 0,
        owner: "ກຳລັງກວດສອບ...",
        phone: "—",
        sourceUrl: "#",
        foundAt: `ມື້ນີ້ ${hh}:${mm}`,
        desc: "AI ຄົ້ນພົບໃໝ່ — ກຳລັງດຶງຂໍ້ມູນເຈົ້າຂອງ",
        ...s,
      },
      ...prev,
    ]);
  };

  return (
    <StoreContext.Provider
      value={{
        properties,
        addProperty,
        removeProperty,
        tasks,
        addTask,
        leads,
        approveLead,
        rejectLead,
        simulateFind,
        pendingImages,
        setPendingImages,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
