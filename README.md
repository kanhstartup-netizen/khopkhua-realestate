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
- 💬 **AI Staff Chat** — ຄຸຍໂຕ້ຕອບກັບ AI staff ແຕ່ລະໜ່ວຍງານໄດ້ຈິງ (ຕໍ່ກັບ Claude API ໂດຍກົງ, ໃຊ້ API key ຂອງທ່ານເອງ)
- 📈 **ລາຍງານ & ສະຖິຕິ** — ກຣາຟຜົນງານລາຍເດືອນ
- 🔗 **ພ້ອມເຊື່ອມ n8n + AI** ສຳລັບ automation

---

## 💬 ວິທີໃຊ້ AI Staff Chat

ໜ້າ "Staff AI" ໃນແອັບ ຕໍ່ນີ້ໄປສາມາດ **ຄຸຍໂຕ້ຕອບກັບ AI staff ຈິງໆໄດ້ແລ້ວ** ໂດຍໃຊ້ Claude API ໂດຍກົງຈາກ browser (ບໍ່ຕ້ອງມີ backend/server).

### ຂັ້ນຕອນ

1. ສ້າງ Anthropic API key ທີ່ https://console.anthropic.com/settings/keys
2. ເປີດແອັບ → **ເພີ່ມເຕີມ → ການຕັ້ງຄ່າ**
3. ວາງ API key ໃສ່ ແລ້ວກົດ **ບັນທຶກ**
4. ໄປໜ້າ **Staff AI** → ເລືອກໜ່ວຍງານ AI ໃດໜຶ່ງ → ກົດ **"ຄຸຍນຳ"**
5. ພິມຂໍ້ຄວາມ ແລະ ລໍຖ້າ AI ຕອບ

### ຂໍ້ຄວນຮູ້

- API key ຖືກເກັບໄວ້ໃນ browser (`localStorage`) ຂອງທ່ານເທົ່ານັ້ນ — ບໍ່ຖືກສົ່ງໄປບ່ອນອື່ນນອກຈາກ Anthropic API ໂດຍກົງ
- ຖ້າໃຊ້ຫລາຍເຄື່ອງ/browser ຕ້ອງໃສ່ API key ແຍກກັນແຕ່ລະບ່ອນ
- ການສົນທະນາແຕ່ລະໜ່ວຍງານ AI ຈະຖືກບັນທຶກໄວ້ໃນເຄື່ອງ ແລະ ສາມາດລຶບໄດ້ຈາກໜ້າ chat (ໄອຄອນຖັງຂີ້ເຫຍື້ອ)
- ການໃຊ້ Claude API ມີຄ່າໃຊ້ຈ່າຍຕາມການໃຊ້ງານ (pay-as-you-go) ຕາມລາຄາຂອງ Anthropic
- **Login ຫລາຍຄົນ / ຂໍ້ມູນຮ່ວມກັນ**: ຍັງບໍ່ໄດ້ເຮັດ — ຈະຕ້ອງມີ backend ແທ້ (ເຊັ່ນ Firebase) ໃນຂັ້ນຕໍ່ໄປ ຖ້າຢາກໃຫ້ທີມຫລາຍຄົນເຫັນຂໍ້ມູນດຽວກັນ

### ⚠️ ຂໍ້ຈຳກັດ — ແຕ່ລະໜ່ວຍງານເຮັດຫຍັງໄດ້ຈິງ

Claude ເປັນ AI ພາສາ (ອ່ານ/ຂຽນ/ວິເຄາະຂໍ້ຄວາມ) ບໍ່ແມ່ນເຄື່ອງມືຕັດຕໍ່ວິດີໂອ ຫລືອອກແບບຮູບພາບໂດຍກົງ ດັ່ງນັ້ນແຕ່ລະໜ່ວຍງານມີຄວາມສາມາດຕ່າງກັນ:

| ໜ່ວຍງານ | ເຮັດຫຍັງໄດ້ຈິງ |
|---|---|
| 🔍 ຄົ້ນຫາຊັບສິນ | ຄຸຍ/ວິເຄາະຂໍ້ມູນຊັບສິນ (ການຄົ້ນຫາ FB/TikTok ຈິງຍັງຕ້ອງການ n8n ແຍກຕ່າງຫາກ) |
| 🎨 ອອກແບບຮູບພາບ | ໃສ່ລາຍນ້ຳ (Watermark) — ໃຊ້ໜ້າ "ໃສ່ລາຍນ້ຳ" ໂດຍກົງ ບໍ່ມີ chat (ຍັງບໍ່ສ້າງຮູບໃໝ່ໄດ້) |
| 🎬 ຕັດຕໍ່ຄລິບ | ຄຸຍວາງແຜນ script/storyboard/ຈຸດຕັດເທົ່ານັ້ນ — **ຍັງບໍ່ຕັດຕໍ່ວິດີໂອຈິງ** (ລໍຖ້າເຊື່ອມບໍລິການຕັດຕໍ່ໃນອະນາຄົດ) |
| 🤝 ປິດການຂາຍ | ຄຸຍ, ຮ່າງຂໍ້ຄວາມຕິດຕາມລູກຄ້າ, ເຕັກນິກເຈລະຈາ |
| 📣 ການຕະຫລາດ | ຄຸຍ, ຂຽນ caption/ແຄມເປນ |
| ⚖️ ກົດໝາຍນາຍໜ້າ | ຄຸຍ **+ ອັບໂຫລດເອກະສານ PDF/Word ໃຫ້ AI ອ່ານ ວິເຄາະ ຕອບຄຳຖາມໄດ້ຈິງ** |

### 📄 ວິທີໃຊ້ "ທີມກົດໝາຍນາຍໜ້າ" ອັບໂຫລດເອກະສານ

1. ໄປ **Staff AI → ກົດໝາຍນາຍໜ້າ → ຄຸຍນຳ**
2. ກົດໄອຄອນ 📎 (clip) ຢູ່ຂ້າງຊ່ອງພິມຂໍ້ຄວາມ
3. ເລືອກໄຟລ໌ PDF, Word (.docx), ຫລື .txt (ໄຟລ໌ .doc ເກົ່າຍັງບໍ່ຮອງຮັບ)
4. ລໍຖ້າອ່ານເອກະສານແປບໜຶ່ງ → ພິມຄຳຖາມ (ຫລືປ່ອຍວ່າງ) → ກົດສົ່ງ
5. AI ຈະອ່ານເນື້ອຫາໃນເອກະສານ ແລ້ວຕອບຕາມທີ່ຖາມ (ກວດຄວາມສ່ຽງ, ຮ່າງສັນຍາ, ອະທິບາຍຂໍ້ກຳນົດ ແລະ ອື່ນໆ)

> ໝາຍເຫດ: ການອ່ານໄຟລ໌ເຮັດຢູ່ໃນ browser ຂອງທ່ານເອງ (ບໍ່ອັບໂຫລດຂຶ້ນ server ໃດໆ) ຈາກນັ້ນເນື້ອຫາຂໍ້ຄວາມ (ບໍ່ແມ່ນຕົວໄຟລ໌) ຈະຖືກສົ່ງໄປຫາ Anthropic API ພ້ອມກັບຄຳຖາມຂອງທ່ານ. ເອກະສານທີ່ຍາວຫລາຍຈະຖືກຕັດ (~60,000 ຕົວອັກສອນ). ໄຟລ໌ PDF ທີ່ເປັນຮູບສະແກນ (ບໍ່ມີຂໍ້ຄວາມຄົ້ນຫາໄດ້) ຈະອ່ານບໍ່ອອກ.

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
