# ວິທີຕັ້ງຄ່າ Firebase (Login ທີມ + ຂໍ້ມູນຮ່ວມກັນ)

ຄູ່ມືນີ້ພາທ່ານຕັ້ງ Firebase ເພື່ອໃຫ້ແອັບ Khopkhua Realestate ມີ **ລະບົບ Login** ແລະ **ຂໍ້ມູນຮ່ວມກັນ** (ທຸກຄົນໃນທີມເຫັນຊັບສິນ/tasks/leads ດຽວກັນ)

> ⏱️ ໃຊ້ເວລາປະມານ 15-20 ນາທີ · ຟຣີ (Firebase Spark plan ພຽງພໍສຳລັບເລີ່ມຕົ້ນ)
>
> ⚠️ ຖ້າ **ບໍ່** ຕັ້ງຄ່າ Firebase ແອັບຈະຍັງເຮັດວຽກໄດ້ຄືເກົ່າ (localStorage, ບໍ່ມີ Login, ຂໍ້ມູນຢູ່ໃນເຄື່ອງແຕ່ລະຄົນ) — ບໍ່ error. ຕັ້ງ Firebase ກໍ່ຕໍ່ເມື່ອຢາກໃຫ້ Login + ຂໍ້ມູນຮ່ວມກັນ.

---

## ຂັ້ນຕອນ 1: ສ້າງ Firebase Project

1. ໄປ [console.firebase.google.com](https://console.firebase.google.com) → login ດ້ວຍ Google
2. ກົດ **Add project** (ຫລື "ສ້າງໂປຣເຈັກ")
3. ຕັ້ງຊື່ ເຊັ່ນ `khopkhua-realestate` → Continue
4. ປິດ Google Analytics ໄດ້ (ບໍ່ຈຳເປັນ) → Create project
5. ລໍຖ້າສ້າງແປບໜຶ່ງ → Continue

---

## ຂັ້ນຕອນ 2: ເປີດໃຊ້ Authentication

1. ເມນູຊ້າຍ → **Build → Authentication** → ກົດ **Get started**
2. ໃນ tab **Sign-in method** ເປີດໃຊ້ 2 ອັນ:
   - **Email/Password** → ກົດ → Enable → Save
   - **Google** → ກົດ → Enable → ເລືອກ support email → Save

---

## ຂັ້ນຕອນ 3: ເປີດໃຊ້ Firestore Database

1. ເມນູຊ້າຍ → **Build → Firestore Database** → ກົດ **Create database**
2. ເລືອກ location ໃກ້ລາວ (ເຊັ່ນ `asia-southeast1` — Singapore) → Next
3. ເລືອກ **Start in production mode** → Create
4. ໄປ tab **Rules** → ວາງ rules ຂ້າງລຸ່ມນີ້ແທນ → Publish

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ຄົນທີ່ login ແລ້ວເທົ່ານັ້ນ ອ່ານ/ຂຽນ ຂໍ້ມູນຮ່ວມກັນໄດ້
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

> 🔒 Rules ນີ້ອະນຸຍາດໃຫ້ **ທຸກຄົນທີ່ login ແລ້ວ** ອ່ານ/ຂຽນໄດ້ — ເໝາະສຳລັບທີມນ້ອຍທີ່ເຊື່ອໃຈກັນ. ຖ້າຕ້ອງການຄວບຄຸມລະອຽດກວ່ານີ້ (ເຊັ່ນ ບາງ collection ແກ້ໄດ້ສະເພາະ admin) ບອກໄດ້ ຈະຊ່ວຍຂຽນ rules ໃຫ້.

---

## ຂັ້ນຕອນ 4: ດຶງ Config ຂອງແອັບ

1. ໃນ Project Overview (ໜ້າຫລັກ) → ກົດໄອຄອນ **`</>`** (Web) ເພື່ອເພີ່ມ web app
2. ຕັ້ງຊື່ app ເຊັ່ນ `khopkhua-web` → **ບໍ່ຕ້ອງ** ຕິກ Firebase Hosting → Register app
3. ຈະເຫັນ code ທີ່ມີ object `firebaseConfig` ໜ້າຕາແບບນີ້:

```js
const firebaseConfig = {
  apiKey: "AIza....",
  authDomain: "khopkhua-realestate.firebaseapp.com",
  projectId: "khopkhua-realestate",
  storageBucket: "khopkhua-realestate.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123..."
};
```

---

## ຂັ້ນຕອນ 5: ໃສ່ Config ເຂົ້າແອັບ

1. ໃນໂຟນເດີໂປຣເຈັກ ກັອບໄຟລ໌ `.env.example` ເປັນ `.env`
   ```bash
   cp .env.example .env
   ```
2. ເປີດ `.env` ແລ້ວໃສ່ຄ່າຈາກ `firebaseConfig` (ຈັບຄູ່ຕາມຊື່):

```
VITE_FIREBASE_API_KEY=AIza....
VITE_FIREBASE_AUTH_DOMAIN=khopkhua-realestate.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=khopkhua-realestate
VITE_FIREBASE_STORAGE_BUCKET=khopkhua-realestate.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abc123...

# ໃສ່ອີເມວທ່ານ (admin) ເພື່ອໃຫ້ເພີ່ມພະນັກງານໄດ້
VITE_ADMIN_EMAILS=your-email@gmail.com
```

3. ບັນທຶກ

---

## ຂັ້ນຕອນ 6: ສ້າງບັນຊີ Admin ຄົນທຳອິດ

ເນື່ອງຈາກມີແຕ່ admin ເພີ່ມພະນັກງານໄດ້ ຕ້ອງສ້າງ admin ຄົນທຳອິດດ້ວຍມືກ່ອນ:

1. ໄປ Firebase Console → **Authentication → Users** → **Add user**
2. ໃສ່ອີເມວ (ອັນດຽວກັບທີ່ໃສ່ໃນ `VITE_ADMIN_EMAILS`) + ລະຫັດຜ່ານ → Add user
3. ຫລັງຈາກນັ້ນ login ເຂົ້າແອັບດ້ວຍບັນຊີນີ້ → ໄປ **ເພີ່ມເຕີມ → ເພີ່ມພະນັກງານ** ເພື່ອສ້າງບັນຊີຄົນອື່ນໄດ້ເລີຍ

> ຫລືຖ້າໃຊ້ Google login: login ດ້ວຍ Google ໃນແອັບ (ຕ້ອງເປັນອີເມວທີ່ຢູ່ໃນ `VITE_ADMIN_EMAILS`)

---

## ຂັ້ນຕອນ 7: ທົດລອງ & Deploy

**ທົດລອງຢູ່ເຄື່ອງ:**
```bash
npm install
npm run dev
```
ຄວນເຫັນໜ້າ Login ຂຶ້ນ → login → ເຫັນຂໍ້ມູນ

**Deploy ຂຶ້ນ GitHub Pages:**

⚠️ ສຳຄັນ: ໄຟລ໌ `.env` **ຈະບໍ່** ຖືກ push ຂຶ້ນ GitHub (ຢູ່ໃນ `.gitignore` ແລ້ວ) — ນັ້ນຖືກຕ້ອງແລ້ວ ເພື່ອຄວາມປອດໄພ. ແຕ່ Vite ຕ້ອງການຄ່າ env ຕອນ build ດັ່ງນັ້ນຕ້ອງໃສ່ໃນ **GitHub Actions Secrets**:

1. ໄປ repo GitHub → **Settings → Secrets and variables → Actions**
2. ກົດ **New repository secret** ເພີ່ມແຕ່ລະຄ່າ (ຊື່ຄືກັນກັບໃນ `.env`):
   `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, ... ຈົນຄົບ 6 ຄ່າ + `VITE_ADMIN_EMAILS`
3. ແກ້ໄຟລ໌ `.github/workflows/deploy.yml` ໃຫ້ສົ່ງ secrets ເຂົ້າຂັ້ນຕອນ build (ເບິ່ງລຸ່ມ)

### ເພີ່ມ env ເຂົ້າ GitHub Actions (deploy.yml)

ໃນ step ທີ່ແລ່ນ `npm run build` ເພີ່ມ `env:` ແບບນີ້:

```yaml
      - name: Build
        run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
          VITE_ADMIN_EMAILS: ${{ secrets.VITE_ADMIN_EMAILS }}
```

4. ໄປ Firebase Console → **Authentication → Settings → Authorized domains** → Add domain
   ໃສ່ domain ຂອງ GitHub Pages ຂອງທ່ານ (ເຊັ່ນ `kanhstartup-netizen.github.io`) ເພື່ອໃຫ້ Google login ເຮັດວຽກ

---

## ⚠️ ຂໍ້ຄວນຮູ້ກ່ຽວກັບຄວາມປອດໄພ

- ຄ່າ Firebase config (`apiKey` ແລະອື່ນໆ) **ບໍ່ແມ່ນຄວາມລັບ** — ມັນປາກົດຢູ່ browser ຂອງທຸກ web app ທີ່ໃຊ້ Firebase ຢູ່ແລ້ວ. ຄວາມປອດໄພຈິງມາຈາກ **Firestore Rules** (ຂັ້ນຕອນ 3) ບໍ່ແມ່ນຈາກການເຊື່ອງ config.
- ດັ່ງນັ້ນ Rules ໃນຂັ້ນຕອນ 3 ສຳຄັນ — ມັນຮັບປະກັນວ່າມີແຕ່ຄົນທີ່ login ແລ້ວເທົ່ານັ້ນທີ່ເຂົ້າເຖິງຂໍ້ມູນໄດ້.
- chats ກັບ AI (ໃນໜ້າ Staff) ຍັງເກັບຢູ່ localStorage ຕໍ່ຜູ້ໃຊ້ (ບໍ່ຮ່ວມກັນ) ເພາະເປັນເລື່ອງສ່ວນຕົວຂອງແຕ່ລະຄົນ.

---

## ຂໍ້ມູນເກົ່າຈະເປັນແນວໃດ?

ຄັ້ງທຳອິດທີ່ admin login ເຂົ້າ (ຕອນ Firestore ຍັງຫວ່າງ) ແອັບຈະ **ຍ້າຍຂໍ້ມູນເກົ່າຈາກ localStorage ຂຶ້ນ Firestore ອັດຕະໂນມັດ** (ຊັບສິນ, tasks, leads ທີ່ເຄີຍເພີ່ມໄວ້). ຫລັງຈາກນັ້ນທຸກຄົນຈະເຫັນຂໍ້ມູນຊຸດດຽວກັນ ແລະ ການປ່ຽນແປງຈະ sync ກັນແບບ realtime.

---

ຖ້າຕິດຂັດຂັ້ນຕອນໃດ ຫລືຢາກໃຫ້ຊ່ວຍແກ້ `deploy.yml` ໃຫ້ ບອກໄດ້ເລີຍ.
