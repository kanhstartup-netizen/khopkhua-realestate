import { createContext, useContext, useEffect, useState } from "react";
import { seedProperties, seedTasks, seedFoundLeads } from "../data/seed";
import { db, firebaseEnabled } from "../lib/firebase";
import { useAuth } from "./Auth";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  getDocs,
  writeBatch,
} from "firebase/firestore";

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
  const { user } = useAuth();
  // ໃຊ້ Firestore ກໍ່ຕໍ່ເມື່ອຕັ້ງຄ່າ Firebase ແລ້ວ ແລະ login ແລ້ວ
  const cloud = firebaseEnabled && !!user;

  const [properties, setProperties] = useState(() =>
    load("kk_properties", seedProperties)
  );
  const [tasks, setTasks] = useState(() => load("kk_tasks", seedTasks));
  const [leads, setLeads] = useState(() => load("kk_leads", seedFoundLeads));
  // chats ເກັບແຍກຕໍ່ຜູ້ໃຊ້ສະເໝີ (ບໍ່ຮ່ວມກັນ) — ຢູ່ localStorage
  const [chats, setChats] = useState(() => load("kk_chats", {}));

  // ---------- localStorage mode (ບໍ່ໃຊ້ cloud) ----------
  useEffect(() => {
    if (cloud) return;
    localStorage.setItem("kk_properties", JSON.stringify(properties));
  }, [properties, cloud]);
  useEffect(() => {
    if (cloud) return;
    localStorage.setItem("kk_tasks", JSON.stringify(tasks));
  }, [tasks, cloud]);
  useEffect(() => {
    if (cloud) return;
    localStorage.setItem("kk_leads", JSON.stringify(leads));
  }, [leads, cloud]);

  // chats ເກັບ localStorage ສະເໝີ
  useEffect(() => {
    localStorage.setItem("kk_chats", JSON.stringify(chats));
  }, [chats]);

  // ---------- Firestore mode (cloud) ----------
  useEffect(() => {
    if (!cloud) return;

    let migrated = false;
    // ຄັ້ງທຳອິດ: ຖ້າ Firestore ຫວ່າງເປົ່າ ແລະ localStorage ມີຂໍ້ມູນ → ຍ້າຍຂຶ້ນ (migrate)
    const migrateIfNeeded = async () => {
      try {
        const snap = await getDocs(collection(db, "properties"));
        if (!snap.empty) return; // ມີຂໍ້ມູນຢູ່ແລ້ວ ບໍ່ຕ້ອງ migrate
        if (migrated) return;
        migrated = true;

        const localProps = load("kk_properties", null);
        const localTasks = load("kk_tasks", null);
        const localLeads = load("kk_leads", null);

        const batch = writeBatch(db);
        (localProps || seedProperties).forEach((p) =>
          batch.set(doc(db, "properties", String(p.id)), p)
        );
        (localTasks || seedTasks).forEach((t) =>
          batch.set(doc(db, "tasks", String(t.id)), t)
        );
        (localLeads || seedFoundLeads).forEach((l) =>
          batch.set(doc(db, "leads", String(l.id)), l)
        );
        await batch.commit();
      } catch (e) {
        console.error("Migration failed:", e);
      }
    };

    migrateIfNeeded();

    // ຕິດຕາມການປ່ຽນແປງແບບ realtime
    const unsubP = onSnapshot(collection(db, "properties"), (snap) => {
      setProperties(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    const unsubT = onSnapshot(collection(db, "tasks"), (snap) => {
      setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    const unsubL = onSnapshot(collection(db, "leads"), (snap) => {
      setLeads(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubP();
      unsubT();
      unsubL();
    };
  }, [cloud]);

  // ---------- chats (ຕໍ່ຜູ້ໃຊ້, localStorage) ----------
  const getChat = (staffId) => chats[staffId] || [];
  const addChatMessage = (staffId, message) => {
    setChats((prev) => ({
      ...prev,
      [staffId]: [...(prev[staffId] || []), message],
    }));
  };
  const setChatMessages = (staffId, messages) => {
    setChats((prev) => ({ ...prev, [staffId]: messages }));
  };
  const clearChat = (staffId) => {
    setChats((prev) => {
      const next = { ...prev };
      delete next[staffId];
      return next;
    });
  };

  // ---------- properties ----------
  const addProperty = (p) => {
    const id = "p" + Date.now();
    if (cloud) {
      setDoc(doc(db, "properties", id), { ...p, id }).catch((e) =>
        console.error(e)
      );
    } else {
      setProperties((prev) => [{ ...p, id }, ...prev]);
    }
  };

  const removeProperty = (id) => {
    if (cloud) {
      deleteDoc(doc(db, "properties", String(id))).catch((e) =>
        console.error(e)
      );
    } else {
      setProperties((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // ---------- tasks ----------
  const addTask = (t) => {
    const id = "t" + Date.now();
    const rec = { ...t, id, progress: 0 };
    if (cloud) {
      setDoc(doc(db, "tasks", id), rec).catch((e) => console.error(e));
    } else {
      setTasks((prev) => [rec, ...prev]);
    }
  };

  // ---------- leads ----------
  const approveLead = (id) => {
    const lead = leads.find((l) => l.id === id);
    if (!lead) return;
    const { id: _omit, owner, phone, source, sourceUrl, foundAt, ...rest } =
      lead;
    const newId = "p" + Date.now();
    const newProp = { ...rest, id: newId, status: "ກຳລັງຂາຍ" };
    if (cloud) {
      setDoc(doc(db, "properties", newId), newProp)
        .then(() => deleteDoc(doc(db, "leads", String(id))))
        .catch((e) => console.error(e));
    } else {
      setProperties((prev) => [newProp, ...prev]);
      setLeads((prev) => prev.filter((l) => l.id !== id));
    }
  };

  const rejectLead = (id) => {
    if (cloud) {
      deleteDoc(doc(db, "leads", String(id))).catch((e) => console.error(e));
    } else {
      setLeads((prev) => prev.filter((l) => l.id !== id));
    }
  };

  // ---------- ຈຳລອງ AI ຄົ້ນພົບຊັບໃໝ່ ----------
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
    const id = "f" + Date.now();
    const rec = {
      id,
      beds: 0,
      baths: 0,
      owner: "ກຳລັງກວດສອບ...",
      phone: "—",
      sourceUrl: "#",
      foundAt: `ມື້ນີ້ ${hh}:${mm}`,
      desc: "AI ຄົ້ນພົບໃໝ່ — ກຳລັງດຶງຂໍ້ມູນເຈົ້າຂອງ",
      ...s,
    };
    if (cloud) {
      setDoc(doc(db, "leads", id), rec).catch((e) => console.error(e));
    } else {
      setLeads((prev) => [rec, ...prev]);
    }
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
        getChat,
        addChatMessage,
        setChatMessages,
        clearChat,
        cloud,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
