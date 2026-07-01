# 🏠 Khopkhua Realestate — ຄອບຄົວ ອະສັງຫາ

ແອັບຈັດການອະສັງຫາ (ດິນ & ເຮືອນ) ສຳລັບເກັບກຳຊັບສິນ ກຽມໄວ້ຂາຍ
ພ້ອມເມນູ **Staff AI** ທີ່ເຮັດວຽກແທນທ່ານ 24 ຊົ່ວໂມງ.

ສ້າງດ້ວຍ **React + Vite + Tailwind CSS**. ຂໍ້ມູນຖືກບັນທຶກໄວ້ໃນ browser (localStorage).

## ✨ ຄຸນສົມບັດ

- 📊 **ໜ້າຫລັກ (Dashboard)** — ພາບລວມຊັບສິນ, Leads, ດີລ, ໜ້າວຽກ
- 🏘️ **ຈັດການຊັບສິນ** — ເພີ່ມ / ຄົ້ນຫາ / ກັ່ນຕອງ / ລຶບ (ດິນ, ເຮືອນ, ອາຄານ)
- 🤖 **Staff AI** — ໜ່ວຍງານ AI 6 ໜ່ວຍ:
  - ຄົ້ນຫາຊັບສິນ (Facebook / TikTok)
  - ອອກແບບຮູບພາບ + ໃສ່ລາຍນ້ຳ
  - ຕັດຕໍ່ຄລິບ
  - ປິດການຂາຍ
  - ການຕະຫລາດ
  - ກົດໝາຍນາຍໜ້າ
- 📈 **ລາຍງານ & ສະຖິຕິ** — ກຣາຟຜົນງານລາຍເດືອນ
- 🔗 **ພ້ອມເຊື່ອມ n8n + AI** ສຳລັບ automation

---

## 🚀 ວິທີອັບຂຶ້ນ GitHub (ລະອຽດ)

### ✅ ສິ່ງທີ່ຕ້ອງມີກ່ອນ
1. ບັນຊີ GitHub → https://github.com/signup
2. ຕິດຕັ້ງ **Git** → https://git-scm.com/downloads
3. ຕິດຕັ້ງ **Node.js** (ເວີຊັນ 18 ຂຶ້ນໄປ) → https://nodejs.org

---

### ວິທີທີ 1 — ໃຊ້ເວັບ GitHub (ງ່າຍທີ່ສຸດ, ບໍ່ຕ້ອງໃຊ້ command)

1. ເຂົ້າ https://github.com ແລ້ວ login
2. ກົດປຸ່ມ **+** (ມຸມຂວາເທິງ) → **New repository**
3. ຕັ້ງຊື່ repository ເປັນ `khopkhua-realestate`
4. ເລືອກ **Public** (ຫລື Private ກໍໄດ້) → ກົດ **Create repository**
5. ໃນໜ້າ repo ໃໝ່ ກົດ **uploading an existing file**
6. ລາກ **ທຸກໄຟລ໌ໃນໂຟນເດີ້ນີ້** (ຍົກເວັ້ນ `node_modules` ແລະ `dist`) ເຂົ້າໄປ
7. ກົດ **Commit changes**

> ⚠️ **ຢ່າອັບໂຟນເດີ້ `node_modules`** — ມັນໃຫຍ່ຫລາຍ. ໄຟລ໌ `.gitignore` ໄດ້ກັນໄວ້ແລ້ວ.

---

### ວິທີທີ 2 — ໃຊ້ Command Line (ແນະນຳ)

ເປີດ Terminal / Command Prompt ໃນໂຟນເດີ້ໂປຣເຈັກນີ້ ແລ້ວພິມ:

```bash
# 1. ເລີ່ມ git
git init

# 2. ເພີ່ມໄຟລ໌ທັງໝົດ
git add .

# 3. ບັນທຶກ (commit) ຄັ້ງທຳອິດ
git commit -m "ສ້າງແອັບ Khopkhua Realestate"

# 4. ຕັ້ງ branch ເປັນ main
git branch -M main

# 5. ເຊື່ອມກັບ repo ໃນ GitHub
#    (ປ່ຽນ YOUR_USERNAME ເປັນຊື່ບັນຊີ GitHub ຂອງທ່ານ)
git remote add origin https://github.com/YOUR_USERNAME/khopkhua-realestate.git

# 6. ອັບຂຶ້ນ GitHub
git push -u origin main
```

ຖ້າຖາມ username/password:
- **Username** = ຊື່ບັນຊີ GitHub
- **Password** = ໃຊ້ **Personal Access Token** (ບໍ່ແມ່ນລະຫັດຜ່ານ)
  - ສ້າງ token ໄດ້ທີ່: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token → ຕິກ `repo` → Generate

---

## 🌐 ເຮັດໃຫ້ແອັບອອນລາຍ ຟຣີ (GitHub Pages)

ໂປຣເຈັກນີ້ມີ **GitHub Actions** ຕັ້ງໄວ້ແລ້ວ (`.github/workflows/deploy.yml`).
ຫລັງຈາກ push ຂຶ້ນ GitHub:

1. ເຂົ້າ repo → **Settings** → **Pages**
2. ໃນ **Build and deployment** → **Source** ເລືອກ **GitHub Actions**
3. ລໍຖ້າ 1–2 ນາທີ → ແອັບຈະ online ທີ່:
   ```
   https://YOUR_USERNAME.github.io/khopkhua-realestate/
   ```

ທຸກຄັ້ງທີ່ທ່ານ `git push` ໃໝ່ ແອັບຈະ update ໂດຍອັດຕະໂນມັດ.

---

## 💻 ການແລ່ນຢູ່ເຄື່ອງຕົນເອງ (Development)

```bash
npm install      # ຕິດຕັ້ງ package
npm run dev      # ເປີດ http://localhost:5173
npm run build    # build ສຳລັບ production (ໄຟລ໌ຢູ່ໃນ dist/)
npm run preview  # ເບິ່ງ production build
```

---

## 📁 ໂຄງສ້າງໄຟລ໌

```
khopkhua-realestate/
├── public/              # logo, favicon
├── src/
│   ├── components/       # Logo, Shell (nav)
│   ├── context/         # Store (ບັນທຶກຂໍ້ມູນ)
│   ├── data/            # ຂໍ້ມູນຕົວຢ່າງ
│   ├── pages/           # Dashboard, Properties, Staff, AddProperty, More
│   ├── App.jsx          # router
│   └── main.jsx
├── .github/workflows/   # auto-deploy
├── package.json
└── README.md
```

---

## 🔌 ການເຊື່ອມຕໍ່ n8n + AI (ຂັ້ນຕໍ່ໄປ)

ໜ່ວຍງານ "ຄົ້ນຫາຊັບສິນ" ອອກແບບໄວ້ໃຫ້ເຊື່ອມກັບ n8n:
1. ສ້າງ workflow ໃນ n8n ທີ່ scrape Facebook/TikTok
2. ໃຫ້ມັນສົ່ງຂໍ້ມູນຊັບໃໝ່ໄປ webhook ຂອງແອັບ
3. ໃນ 1 ມື້ຄວນມີລາຍງານ 5–10 ຊັບສິນ

> ສ່ວນນີ້ຕ້ອງມີ backend/server. ປະຈຸບັນແອັບເກັບຂໍ້ມູນຢູ່ browser.
> ຖ້າຕ້ອງການ backend ຈິງ ສາມາດເພີ່ມ Firebase / Supabase ໄດ້ພາຍຫລັງ.
