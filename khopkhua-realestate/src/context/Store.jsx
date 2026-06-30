import { createContext, useContext, useEffect, useState } from "react";
import { seedProperties, seedTasks } from "../data/seed";

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

  useEffect(() => {
    localStorage.setItem("kk_properties", JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem("kk_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addProperty = (p) =>
    setProperties((prev) => [{ ...p, id: "p" + Date.now() }, ...prev]);

  const removeProperty = (id) =>
    setProperties((prev) => prev.filter((p) => p.id !== id));

  const addTask = (t) =>
    setTasks((prev) => [{ ...t, id: "t" + Date.now(), progress: 0 }, ...prev]);

  return (
    <StoreContext.Provider
      value={{ properties, addProperty, removeProperty, tasks, addTask }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
