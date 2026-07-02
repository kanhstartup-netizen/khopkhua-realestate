# 🏠 Khopkhua Realestate — ຄອບຄົວ ອະສັງຫາ

ແອັບຈັດການອະສັງຫາ (ດິນ & ເຮືອນ) ສຳລັບເກັບກຳຊັບສິນ ກຽມໄວ້ຂາຍ
ພ້ອມເມນູ **Staff AI** ທີ່ເຮັດວຽກແທນທ່ານ 24 ຊົ່ວໂມງ.

ສ້າງດ້ວຍ **React + Vite + Tailwind CSS**. ຂໍ້ມູນຖືກບັນທຶກໄວ້ໃນ browser (localStorage).

## ✨ ຄຸນສົມບັດ

- 📊 **ໜ້າຫລັກ (Dashboard)** — ພາບລວມຊັບສິນ, Leads, ດີລ, ໜ້າວຽກ
- 🏘️ **ຈັດການຊັບສິນ** — ເພີ່ມ / ຄົ້ນຫາ / ກັ່ນຕອງ / ລຶບ (ດິນ, ເຮືອນ, ອາຄານ)
- 🤖 **Staff AI** — ໜ່ວຍງານ AI 7 ໜ່ວຍ:
  - ຄົ້ນຫາຊັບສິນ (Facebook / TikTok)
  - ຄົ້ນຫານາຍທຶນ
  - ອອກແບບຮູບພາບ + ໃສ່ລາຍນ້ຳ
  - ຕັດຕໍ່ຄລິບ
  - ປິດການຂາຍ
  - ການຕະຫລາດ (ຂຽນ Content, ວາງແຜນຕາຕະລາງໂພສ, Infographic prompt)
  - ກົດໝາຍນາຍໜ້າ (ອັບໂຫລດເອກະສານໄດ້)
- 💬 **AI Staff Chat** — ຄຸຍໂຕ້ຕອບກັບ AI staff ແຕ່ລະໜ່ວຍງານໄດ້ຈິງ (ຕໍ່ກັບ Claude API ໂດຍກົງ, ໃຊ້ API key ຂອງທ່ານເອງ)
- 🔐 **Login ທີມ + ຂໍ້ມູນຮ່ວມກັນ** (Firebase) — ທາງເລືອກ: ເປີດ Login (ອີເມວ/Google) ແລະ ໃຫ້ທຸກຄົນເຫັນຂໍ້ມູນຊຸດດຽວກັນ. ເບິ່ງ `FIREBASE_SETUP.md`
- ✍️ **AI ຂຽນແຄັບຊັ່ນ** — ໃນໜ້າ "ເພີ່ມຊັບສິນ" ກົດ "ໃຫ້ AI ຂຽນໃຫ້" → AI ສະຫລຸບຂໍ້ມູນ ແລ້ວຂຽນແຄັບຊັ່ນ Facebook ພ້ອມອີໂມຈິ + hashtag ພ້ອມ copy ໄປໂພສ
- 📈 **ລາຍງານ & ສະຖິຕິ** — ກຣາຟຜົນງານລາຍເດືອນ
- 🔗 **ແຜນເຊື່ອມ n8n ສຳລັບ 24/7 automation** — ເບິ່ງ `N8N_AUTOMATION_PLAN.md`

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

Claude ເປັນ AI ພາສາ (ອ່ານ/ຂຽນ/ວິເຄາະຂໍ້ຄວາມ) ບໍ່ແມ່ນເຄື່ອງມືຄົ້ນຫາອິນເຕີເນັດ, ຕັດຕໍ່ວິດີໂອ, ຫລືໂພສ Facebook ໂດຍກົງ — ດັ່ງນັ້ນແຕ່ລະໜ່ວຍງານມີຄວາມສາມາດຕ່າງກັນ:

| ໜ່ວຍງານ | ເຮັດຫຍັງໄດ້ຈິງ (ດຽວນີ້) | ຕ້ອງການ n8n ສຳລັບ |
|---|---|---|
| 🔍 ຄົ້ນຫາຊັບສິນ | ຄຸຍ/ວິເຄາະຂໍ້ມູນຊັບສິນທີ່ນຳມາໃຫ້ | ຄົ້ນຫາ Facebook/TikTok ອັດຕະໂນມັດ 24/7 |
| 💰 ຄົ້ນຫານາຍທຶນ | ຄຸຍ/ວິເຄາະ, ຮ່າງຂໍ້ຄວາມ pitch, ວາງແຜນນຳສະເໜີ | ຄົ້ນຫາລາຍຊື່ນາຍທຶນອັດຕະໂນມັດ |
| 🎨 ອອກແບບຮູບພາບ | ໃສ່ລາຍນ້ຳ (Watermark) — ໃຊ້ໜ້າ "ໃສ່ລາຍນ້ຳ" ໂດຍກົງ | — |
| 🎬 ຕັດຕໍ່ຄລິບ | ຄຸຍວາງແຜນ script/storyboard/ຈຸດຕັດເທົ່ານັ້ນ | ຕັດຕໍ່ວິດີໂອຈິງ (ໂຢນສຽງ+footage → ໄດ້ວິດີໂອ) |
| 🤝 ປິດການຂາຍ | ຄຸຍ, ຮ່າງຂໍ້ຄວາມຕິດຕາມລູກຄ້າ, ເຕັກນິກເຈລະຈາ | — |
| 📣 ການຕະຫລາດ | ຄຸຍ, ຂຽນ Content/Caption, ວາງແຜນຕາຕະລາງໂພສ, ຂຽນ Infographic prompt | ໂພສ Facebook Page ອັດຕະໂນມັດ |
| ⚖️ ກົດໝາຍນາຍໜ້າ | ຄຸຍ **+ ອັບໂຫລດເອກະສານ PDF/Word ໃຫ້ AI ອ່ານ ວິເຄາະ ຕອບຄຳຖາມໄດ້ຈິງ** | — |

> 📄 **ອ່ານແຜນການລະອຽດສຳລັບການເຊື່ອມ n8n (24/7 automation) ໄດ້ໃນໄຟລ໌ `N8N_AUTOMATION_PLAN.md`** — ຄອບຄຸມ workflow ຄົ້ນຫາຊັບສິນ, ຄົ້ນຫານາຍທຶນ, ໂພສອັດຕະໂນມັດ, ແລະ ຕັດຕໍ່ວິດີໂອຈິງ ພ້ອມລາຄາປະມານ ແລະ ຂັ້ນຕອນຕັ້ງຄ່າ

### 📄 ວິທີໃຊ້ "ທີມກົດໝາຍນາຍໜ້າ" ອັບໂຫລດເອກະສານ

1. ໄປ **Staff AI → ກົດໝາຍນາຍໜ້າ → ຄຸຍນຳ**
2. ກົດໄອຄອນ 📎 (clip) ຢູ່ຂ້າງຊ່ອງພິມຂໍ້ຄວາມ
3. ເລືອກໄຟລ໌ PDF, Word (.docx), ຫລື .txt (ໄຟລ໌ .doc ເກົ່າຍັງບໍ່ຮອງຮັບ)
4. ລໍຖ້າອ່ານເອກະສານແປບໜຶ່ງ → ພິມຄຳຖາມ (ຫລືປ່ອຍວ່າງ) → ກົດສົ່ງ
5. AI ຈະອ່ານເນື້ອຫາໃນເອກະສານ ແລ້ວຕອບຕາມທີ່ຖາມ (ກວດຄວາມສ່ຽງ, ຮ່າງສັນຍາ, ອະທິບາຍຂໍ້ກຳນົດ ແລະ ອື່ນໆ)

> ໝາຍເຫດ: ການອ່ານໄຟລ໌ເຮັດຢູ່ໃນ browser ຂອງທ່ານເອງ (ບໍ່ອັບໂຫລດຂຶ້ນ server ໃດໆ) ຈາກນັ້ນເນື້ອຫາຂໍ້ຄວາມ (ບໍ່ແມ່ນຕົວໄຟລ໌) ຈະຖືກສົ່ງໄປຫາ Anthropic API ພ້ອມກັບຄຳຖາມຂອງທ່ານ. ເອກະສານທີ່ຍາວຫລາຍຈະຖືກຕັດ (~60,000 ຕົວອັກສອນ). ໄຟລ໌ PDF ທີ່ເປັນຮູບສະແກນ (ບໍ່ມີຂໍ້ຄວາມຄົ້ນຫາໄດ້) ຈະອ່ານບໍ່ອອກ.

---

## 🔐 Login ທີມ + ຂໍ້ມູນຮ່ວມກັນ (Firebase — ທາງເລືອກ)

ໂດຍຄ່າເລີ່ມຕົ້ນ ແອັບເກັບຂໍ້ມູນຢູ່ `localStorage` (ແຍກຕໍ່ເຄື່ອງ/browser, ບໍ່ມີ Login). ຖ້າຢາກໃຫ້:
- ພະນັກງານ **Login** (ອີເມວ+ລະຫັດ ຫລື Google)
- ທຸກຄົນ **ເຫັນຂໍ້ມູນຊຸດດຽວກັນ** (ຊັບສິນ/tasks/leads sync realtime)
- ມີແຕ່ **admin** ເພີ່ມພະນັກງານໄດ້

→ ຕັ້ງຄ່າ Firebase ຕາມຄູ່ມື **[`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md)** (ໃຊ້ເວລາ ~15 ນາທີ, ຟຣີ)

> ຖ້າບໍ່ຕັ້ງ Firebase ແອັບຍັງເຮັດວຽກໄດ້ປົກກະຕິແບບ localStorage — ບໍ່ error. Login ຈະປາກົດກໍ່ຕໍ່ເມື່ອຕັ້ງຄ່າ Firebase ແລ້ວ.

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

## 🔌 ການເຊື່ອມຕໍ່ n8n ສຳລັບ 24/7 Automation

ແອັບປັດຈຸບັນເປັນ static site (ບໍ່ມີ backend/server) — ວຽກ "ຄົ້ນຫາຊັບສິນ 24/7", "ຄົ້ນຫານາຍທຶນ", "ໂພສເພຈອັດຕະໂນມັດ", ແລະ "ຕັດຕໍ່ວິດີໂອຈິງ" ຕ້ອງການລະບົບແຍກຕ່າງຫາກທີ່ແລ່ນຢູ່ server ຕະຫລອດເວລາ

📄 **ອ່ານແຜນການລະອຽດເຕັມທີ່ໄດ້ໃນ [`N8N_AUTOMATION_PLAN.md`](./N8N_AUTOMATION_PLAN.md)** — ຄອບຄຸມ:
- Workflow node-by-node ສຳລັບແຕ່ລະໜ່ວຍງານ
- ບໍລິການພາຍນອກທີ່ຕ້ອງໃຊ້ (Apify, Shotstack, Facebook Graph API)
- ຂັ້ນຕອນຕັ້ງຄ່າ Facebook App ສຳລັບໂພສອັດຕະໂນມັດ
- ລາຄາປະມານລວມ ແລະ ລຳດັບການເຮັດທີ່ແນະນຳ

