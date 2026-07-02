// ເລີ່ມຕົ້ນ Firebase (Auth + Firestore)
// ຖ້າຍັງບໍ່ໄດ້ຕັ້ງຄ່າ env (VITE_FIREBASE_*) ແອັບຈະເຮັດວຽກແບບ localStorage ຄືເກົ່າ
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// ອີເມວຂອງ admin (ຄັ່ນດ້ວຍ comma ໃນ env). admin ເທົ່ານັ້ນທີ່ເພີ່ມພະນັກງານໄດ້
export const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

// ກວດວ່າຕັ້ງຄ່າ Firebase ຄົບບໍ່
export const firebaseEnabled = Boolean(
  config.apiKey && config.projectId && config.appId
);

let app = null;
let auth = null;
let db = null;

if (firebaseEnabled) {
  try {
    app = initializeApp(config);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (e) {
    console.error("Firebase init failed:", e);
  }
}

export { app, auth, db };

export function isAdmin(user) {
  if (!user?.email) return false;
  // ຖ້າບໍ່ໄດ້ຕັ້ງລາຍຊື່ admin ໄວ້ ໃຫ້ຖືວ່າທຸກຄົນທີ່ login ເປັນ admin (ສະດວກຕອນເລີ່ມ)
  if (ADMIN_EMAILS.length === 0) return true;
  return ADMIN_EMAILS.includes(user.email.toLowerCase());
}
