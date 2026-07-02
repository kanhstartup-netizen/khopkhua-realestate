import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth, firebaseEnabled, isAdmin } from "../lib/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(firebaseEnabled); // ຖ້າບໍ່ໃຊ້ Firebase ບໍ່ຕ້ອງລໍຖ້າ

  useEffect(() => {
    if (!firebaseEnabled) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const loginEmail = async (email, password) => {
    return signInWithEmailAndPassword(auth, email.trim(), password);
  };

  const registerEmail = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email.trim(), password);
  };

  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = async () => {
    if (firebaseEnabled) await signOut(auth);
    setUser(null);
  };

  const value = {
    user,
    loading,
    firebaseEnabled,
    admin: isAdmin(user),
    loginEmail,
    registerEmail,
    loginGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
