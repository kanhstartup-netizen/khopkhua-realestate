# ແຜນການຕັ້ງຄ່າ n8n ສຳລັບ AI Staff ອັດຕະໂນມັດ 24/7

ເອກະສານນີ້ອະທິບາຍວິທີຕໍ່ຍອດແອັບ Khopkhua Realestate ໃຫ້ເຮັດວຽກອັດຕະໂນມັດຕະຫລອດ 24 ຊົ່ວໂມງ ໂດຍໃຊ້ [n8n](https://n8n.io) (ເຄື່ອງມື automation ແບບ open-source, ຕັ້ງເອງໄດ້ ຫລືໃຊ້ n8n Cloud)

> ⚠️ **ສຳຄັນ**: ນີ້ແມ່ນ **ແຜນການ + ຄຳແນະນຳ** ບໍ່ແມ່ນລະບົບທີ່ຕັ້ງໃຫ້ແລ້ວ. Claude (AI ນີ້) ບໍ່ສາມາດຕັ້ງ n8n instance, ສ້າງ Facebook App, ຫລືສະໝັກບໍລິການພາຍນອກແທນທ່ານໄດ້ — ເພາະຕ້ອງການບັນຊີ, ການຢືນຢັນຕົວຕົນ, ແລະ ການຈ່າຍເງິນຂອງທ່ານເອງ. ເອກະສານນີ້ໃຫ້ທ່ານ (ຫລືທີມ dev) ເອົາໄປເຮັດຕາມທີລະຂັ້ນຕອນໄດ້.

---

## ພາບລວມ: ເປັນຫຍັງຕ້ອງມີ n8n

ແອັບ Khopkhua Realestate ປັດຈຸບັນເປັນ **static site** (HTML/JS ລ້ວນໆ, ບໍ່ມີ server ຂອງຕົນເອງ) ທີ່ host ຢູ່ GitHub Pages. ມັນເຮັດວຽກໄດ້ກໍ່ຕໍ່ເມື່ອມີຄົນເປີດ browser ຄ້າງໄວ້. ວຽກແບບ "ຄົ້ນຫາ 24/7", "ໂພສອັດຕະໂນມັດຕາມເວລາ", ຫລື "ຕັດຕໍ່ວິດີໂອຈິງ" ຕ້ອງການ **ໂຄງການທີ່ແລ່ນຢູ່ server ຕະຫລອດເວລາ ໂດຍບໍ່ຕ້ອງມີຄົນເປີດ browser** — ນີ້ຄືສິ່ງທີ່ n8n ເຮັດ

```
[ໂຕຈັບເວລາ/Trigger] → [ດຶງຂໍ້ມູນ] → [ປະມວນຜົນ/AI] → [ບັນທຶກ/ແຈ້ງເຕືອນ/ໂພສ]
        (ແລ່ນເອງທຸກໆ X ຊົ່ວໂມງ ໂດຍບໍ່ຕ້ອງມີໃຜກົດຫຍັງ)
```

### ທາງເລືອກໃນການຕັ້ງ n8n

| ວິທີ | ລາຄາ | ເໝາະສຳລັບ |
|---|---|---|
| **n8n Cloud** (n8n.io) | ເລີ່ມ ~$20-24/ເດືອນ | ເລີ່ມໄວ ບໍ່ຕ້ອງເບິ່ງແຍງ server |
| **Self-host** (VPS ເຊັ່ນ DigitalOcean, Vultr) | ~$5-10/ເດືອນ (server) + ຟຣີ (n8n ເປັນ open-source) | ຄຸ້ມຄ່າກວ່າໃນໄລຍະຍາວ, ຕ້ອງມີຄວາມຮູ້ server ນິດໜຶ່ງ |

ແນະນຳໃຫ້ເລີ່ມດ້ວຍ **n8n Cloud** ກ່ອນເພື່ອທົດລອງ, ຄ່ອຍຍ້າຍໄປ self-host ພາຍຫລັງຖ້າໃຊ້ຫລາຍ

---

## Workflow 1: ຄົ້ນຫາຊັບສິນອັດຕະໂນມັດ (Facebook/TikTok)

### ບັນຫາ
Facebook ແລະ TikTok **ບໍ່ອະນຸຍາດ scraping ໂດຍກົງ** ຜ່ານ API ສາທາລະນະ (ຂັດ Terms of Service) — ຕ້ອງໃຊ້ບໍລິການ scraping ຂອງພາຍນອກ ເຊັ່ນ [Apify](https://apify.com) ເຊິ່ງມີ Actor ສຳເລັດຮູບສຳລັບ Facebook Marketplace / Groups ແລະ TikTok

### Node ທີ່ຕ້ອງໃຊ້ໃນ n8n

```
1. Schedule Trigger
   └─ ຕັ້ງໃຫ້ແລ່ນທຸກ 2-4 ຊົ່ວໂມງ

2. HTTP Request → Apify API
   └─ ເອີ້ນ Apify Actor "Facebook Marketplace Scraper" ຫລື 
      "TikTok Scraper" ດ້ວຍ keyword ເຊັ່ນ "ຂາຍດິນ", "ຂາຍເຮືອນ ວຽງຈັນ"

3. Filter Node
   └─ ກອງເອົາສະເພາະໂພສທີ່ມີຄຳວ່າ "ຂາຍ", ລາຄາ, ພື້ນທີ່ (regex/keyword match)

4. HTTP Request → Claude API (Anthropic)
   └─ ສົ່ງແຕ່ລະໂພສໃຫ້ Claude ວິເຄາະ: ແມ່ນຊັບສິນແທ້ບໍ່? ລາຄາ/ທຳເລ/
      ພື້ນທີ່ເທົ່າໃດ? ໃຫ້ Claude ຕອບເປັນ JSON ໂຄງສ້າງ

5. Code Node (JavaScript)
   └─ ຈັດຮູບແບບຂໍ້ມູນທີ່ Claude ວິເຄາະໃຫ້ກົງກັບໂຄງສ້າງ 
      seedFoundLeads ໃນແອັບ (id, type, name, location, price, ...)

6. HTTP Request → ບັນທຶກຂໍ້ມູນ
   └─ ສົ່ງໄປຫາ backend/database ຂອງທ່ານ (ເບິ່ງພາກ "ຕ້ອງການ backend" ລຸ່ມ)

7. (ທາງເລືອກ) Telegram/Discord/Line Node
   └─ ແຈ້ງເຕືອນທີມງານວ່າມີຊັບໃໝ່ພົບແລ້ວ X ລາຍການ
```

### ຂໍ້ຈຳກັດທີ່ຄວນຮູ້
- Apify ຄິດຄ່າໃຊ້ຈ່າຍຕາມ compute units — scraping ຫລາຍໆຄັ້ງຕໍ່ມື້ຈະມີຄ່າໃຊ້ຈ່າຍ
- Facebook ມີການປ້ອງກັນ bot ເຂັ້ມງວດ, scraper ອາດຖືກບລັອກໄດ້ເປັນບາງຄັ້ງ
- ຜົນທີ່ໄດ້ຄວນ **ໃຫ້ຄົນກວດກ່ອນ** (ອະນຸມັດ) ຄືທີ່ໜ້າ "ຄົ້ນຫາຊັບສິນ" ໃນແອັບເຮັດຢູ່ແລ້ວ — ຢ່າ auto-approve

---

## Workflow 2: ຄົ້ນຫານາຍທຶນອັດຕະໂນມັດ

### ແນວຄິດ
ຫານາຍທຶນອັດຕະໂນມັດຍາກກວ່າ scrape ຊັບສິນ ເພາະບໍ່ມີແຫລ່ງຂໍ້ມູນສາທາລະນະທີ່ຊັດເຈນຄື Marketplace. ວິທີທີ່ໃຊ້ໄດ້ຈິງ:

```
1. Schedule Trigger (ທຸກອາທິດ)

2. HTTP Request → LinkedIn Sales Navigator API ຫລື Apify LinkedIn Scraper
   └─ ຄົ້ນຫາ profile ທີ່ມີ keyword: "real estate investor", 
      "property investment Laos", "ນັກລົງທຶນອະສັງຫາລິມະຊັບ"

3. HTTP Request → Claude API
   └─ ໃຫ້ Claude ວິເຄາະ profile ວ່າເໝາະສົມກັບໂຄງການປະເພດໃດ

4. Code Node
   └─ ຈັດ format ເປັນລາຍຊື່ ພ້ອມຄະແນນຄວາມເໝາະສົມ

5. Google Sheets Node / Airtable Node
   └─ ບັນທຶກລາຍຊື່ນາຍທຶນທີ່ພົບ ໃຫ້ທີມ sales ເບິ່ງ ແລະ ຕິດຕໍ່ເອງ
```

### ຂໍ້ຄວນລະວັງ
- LinkedIn ມີການປ້ອງກັນ scraping ເຂັ້ມງວດຫລາຍກວ່າ Facebook — ມີຄວາມສ່ຽງບັນຊີຖືກລ໋ອກ
- ແນະນຳໃຫ້ໃຊ້ວິທີນີ້ເປັນ "ຊ່ວຍຄົ້ນຫາລາຍຊື່ເບື້ອງຕົ້ນ" ແລ້ວໃຫ້ຄົນຕິດຕໍ່ເອງ ບໍ່ແມ່ນສົ່ງຂໍ້ຄວາມອັດຕະໂນມັດ (ອາດຖືກມອງເປັນ spam)

---

## Workflow 3: ໂພສເພຈ Facebook ອັດຕະໂນມັດ

### ຂັ້ນຕອນຕັ້ງຄ່າ Facebook (ເຮັດຄັ້ງດຽວ)

1. ໄປ [Meta for Developers](https://developers.facebook.com) → ສ້າງ App ໃໝ່ (ປະເພດ "Business")
2. ໃນ App Dashboard → Settings → Basic → ໃສ່ Privacy Policy URL (ບັງຄັບ) → Save
3. ສະຫລັບ App Mode ຈາກ "Development" ເປັນ "Live"
4. ໄປ Tools → Graph API Explorer → ເລືອກ App ຂອງທ່ານ → ເລືອກ Page → ຂໍ permission `pages_manage_posts` ແລະ `pages_read_engagement`
5. Generate **Page Access Token** (ບໍ່ແມ່ນ User Token) → ໃຊ້ Access Token Debugger ແປງເປັນ long-lived token (60 ວັນ) — ຕ້ອງມີລະບົບ refresh token ອັດຕະໂນມັດສຳລັບໃຊ້ຈິງໄລຍະຍາວ
6. ໃນ n8n → ສ້າງ credential "Facebook Graph API" → ວາງ token

### Node ໃນ n8n

```
1. Schedule Trigger
   └─ ຕັ້ງຕາມຕາຕະລາງທີ່ AI ວາງແຜນໄວ້ (ເຊັ່ນ ທຸກມື້ 9:00 ໂມງ)

2. Google Sheets Node (ອ່ານຕາຕະລາງໂພສ)
   └─ ອ່ານແຖວທີ່ຍັງບໍ່ໄດ້ໂພສ ຈາກ Sheet ທີ່ AI ການຕະຫລາດ 
      (ໃນແອັບ) ຮ່າງເນື້ອຫາໄວ້

3. Facebook Graph API Node
   └─ Node: <page-id>/feed (ສຳລັບຂໍ້ຄວາມ) 
      ຫລື <page-id>/photos (ສຳລັບຮູບ)
   └─ Edge: feed / photos
   └─ ໃສ່ message = ເນື້ອຫາຈາກ Sheet

4. Google Sheets Node (ອັບເດດສະຖານະ)
   └─ ຫມາຍແຖວນັ້ນວ່າ "ໂພສແລ້ວ"

5. (ທາງເລືອກ) Telegram/Line Node
   └─ ແຈ້ງທີມງານວ່າໂພສສຳເລັດແລ້ວ
```

> ນີ້ຄື workflow ທີ່ **ຮ່ວມກັບ AI ການຕະຫລາດໃນແອັບໄດ້ດີ**: AI ໃນແອັບຂຽນ content + ວາງແຜນຕາຕະລາງ → copy ໃສ່ Google Sheet → n8n ອ່ານ Sheet ແລ້ວໂພສຕາມເວລາ

---

## Workflow 4: ຕັດຕໍ່ວິດີໂອຈິງ (ໂຢນສຽງ+Footage → ໄດ້ວິດີໂອ)

### ຄວາມຈິງກ່ຽວກັບລາຄາ (ອັບເດດ 2026)

| ບໍລິການ | ລາຄາ | ໝາຍເຫດ |
|---|---|---|
| **Shotstack** | $0.20–0.30 / ນາທີວິດີໂອ (subscription ເລີ່ມ $39/ເດືອນ) ຫລື $0.40/ນາທີແບບ pay-as-you-go | ນິຍົມທີ່ສຸດ, JSON-based timeline, ຮອງຮັບ template |
| **JSON2Video** | ຄ້າຍ Shotstack, ມີ AI voice/image ລວມມາໃນລາຄາ | ທາງເລືອກທີ່ໃໝ່ກວ່າ, ຄິດໄລ່ເວລາອັດຕະໂນມັດ |
| **Plainly** | ເລີ່ມ $69/ເດືອນ (50 ນາທີ render) | ເໝາະສຳລັບວິດີໂອຈາກ template ຄົງທີ່ |

**ຕົວຢ່າງ**: ຖ້າຕັດຕໍ່ 20 ຄລິບ/ເດືອນ ຄລິບລະ 1 ນາທີ = 20 ນາທີ ≈ $6-8/ເດືອນ (Shotstack pay-as-you-go) — ບໍ່ແພງຫລາຍສຳລັບປະລິມານນ້ອຍ ແຕ່ຈະເພີ່ມຂຶ້ນໄວຖ້າວິດີໂອຍາວ ຫລືປະລິມານຫລາຍ

### ຂໍ້ຈຳກັດສຳຄັນ: ນີ້ບໍ່ແມ່ນ "ຕັດຕໍ່ຄືມືໂປຮ"

Shotstack/JSON2Video ເປັນ **template-based rendering** — ໝາຍຄວາມວ່າ:
- ✅ ເຮັດໄດ້ດີ: ຕໍ່ຄລິບເຂົ້າກັນຕາມລຳດັບ, ໃສ່ຕົວໜັງສື/ໂລໂກ້, crossfade, ໃສ່ເພງພື້ນຫລັງ, sync ກັບສຽງ voiceover
- ❌ ເຮັດບໍ່ໄດ້ (ຫລືຍາກ): ຕັດສິນໃຈເລືອກ "ຈຸດທີ່ດີທີ່ສຸດ" ຈາກ footage ຍາວໆເອງແບບມືຕັດຕໍ່ Studio, ຄວາມຄິດສ້າງສັນລະດັບ motion design ຊັບຊ້ອນ (ຄື After Effects)

ດັ່ງນັ້ນ workflow ທີ່ໃຊ້ໄດ້ຈິງແມ່ນ: **AI ຊ່ວຍວາງແຜນ (script/storyboard/ຈຸດຕັດ) → ຄົນເລືອກຄລິບຕາມແຜນ → n8n ສົ່ງໄປ render ອັດຕະໂນມັດຕາມ template**

### Node ໃນ n8n

```
1. Webhook Trigger
   └─ ຮັບ request ຈາກແອັບ (ຫລືຟອມ) ພ້ອມ:
      - ລິ້ງໄຟລ໌ສຽງ (ອັບໂຫລດຂຶ້ນ Google Drive/S3 ກ່ອນ)
      - ລິ້ງໄຟລ໌ footage (ຫລາຍໄຟລ໌)
      - script/ລຳດັບຄລິບ (ຈາກ AI ຕັດຕໍ່ຄລິບໃນແອັບ)

2. Code Node
   └─ ປະກອບ JSON timeline ຕາມ format ຂອງ Shotstack:
      {
        "timeline": {
          "tracks": [
            { "clips": [ {asset, start, length}, ... ] }
          ]
        },
        "output": { "format": "mp4", "resolution": "hd" }
      }

3. HTTP Request → Shotstack Render API (POST /render)
   └─ ສົ່ງ timeline ໄປ render

4. Wait Node / Webhook (ຖ້າໃຊ້ Shotstack webhook callback)
   └─ ລໍຖ້າຈົນ render ສຳເລັດ (ອາດໃຊ້ເວລາຫລາຍນາທີ)

5. HTTP Request → ດາວໂຫລດວິດີໂອທີ່ render ແລ້ວ

6. Google Drive Node / S3 Node
   └─ ບັນທຶກໄຟລ໌ວິດີໂອສຳເລັດ

7. Telegram/Line Node
   └─ ສົ່ງລິ້ງວິດີໂອໃຫ້ທີມງານກວດ ກ່ອນເອົາໄປໂພສ
```

---

## ສິ່ງທີ່ຕ້ອງມີກ່ອນເລີ່ມ (Backend/Database)

Workflow ຫລາຍອັນຂ້າງເທິງຕ້ອງການບ່ອນເກັບຂໍ້ມູນທີ່ **ຫລາຍຄົນເຫັນຮ່ວມກັນ** (ບໍ່ແມ່ນ localStorage ຂອງແອັບປັດຈຸບັນ ເຊິ່ງເກັບສະເພາະໃນເຄື່ອງຕົນເອງ) ທາງເລືອກທີ່ແນະນຳ:

| ທາງເລືອກ | ເໝາະສຳລັບ |
|---|---|
| **Google Sheets** | ເລີ່ມຕົ້ນໄວ, ບໍ່ຕ້ອງຂຽນ code ຫລາຍ, n8n ຮອງຮັບດີ |
| **Firebase (Firestore)** | ຖ້າຢາກເຊື່ອມກັບແອັບ React ໂດຍກົງ + Login ຫລາຍຄົນ (ຕາມທີ່ລົມກັນໄວ້ກ່ອນໜ້ານີ້) |
| **Airtable** | ຄ້າຍ Google Sheets ແຕ່ມີ UI ດີກວ່າສຳລັບຈັດການຂໍ້ມູນສະລັບຊັບຊ້ອນ |

**ຄຳແນະນຳ**: ຖ້າຈະເຮັດ Login ທີມ (ຕາມແຜນທີ່ລົມກັນໄວ້ກ່ອນໜ້ານີ້) ແນະນຳໃຫ້ໃຊ້ **Firebase** ເລີຍ ເພາະຈະໃຊ້ເປັນທັງ database ຂອງແອັບ ແລະ ບ່ອນທີ່ n8n ຂຽນຂໍ້ມູນເຂົ້າໄດ້ໃນທີ່ດຽວ — ຫລີກລ້ຽງການມີ 2 ລະບົບແຍກກັນ

---

## ລຳດັບການເຮັດທີ່ແນະນຳ (Roadmap)

1. **ຂັ້ນ 1**: ຕັ້ງ Firebase (Auth + Firestore) → ເຮັດ Login ທີມ + ຂໍ້ມູນຮ່ວມກັນ
2. **ຂັ້ນ 2**: ຕັ້ງ n8n Cloud (ບັນຊີ) → ລອງ Workflow 3 (ໂພສ Facebook) ກ່ອນ ເພາະງ່າຍທີ່ສຸດ ແລະ ໃຊ້ Google Sheets ໄດ້ໂດຍບໍ່ຕ້ອງລໍຖ້າ Firebase
3. **ຂັ້ນ 3**: Workflow 1 (ຄົ້ນຫາຊັບສິນ) — ຕັ້ງ Apify + ທົດລອງກັບ keyword ຈຳກັດກ່ອນ ເບິ່ງຄຸນນະພາບຜົນລັບ
4. **ຂັ້ນ 4**: Workflow 4 (ຕັດຕໍ່ວິດີໂອ) — ລົງທຶນຫລັງສຸດ ເພາະມີຄ່າໃຊ້ຈ່າຍສູງສຸດ ແລະ ຊັບຊ້ອນສຸດ
5. **ຂັ້ນ 5**: Workflow 2 (ຄົ້ນຫານາຍທຶນ) — ຄວນເຮັດຫລັງສຸດ ເພາະຄວາມສ່ຽງດ້ານ LinkedIn ສູງ ແລະ ຄຸນນະພາບຜົນລັບຍາກຄາດເດົາ

---

## ຄ່າໃຊ້ຈ່າຍລວມໂດຍປະມານ (ຕໍ່ເດືອນ)

| ລາຍການ | ລາຄາປະມານ |
|---|---|
| n8n Cloud (starter) | $20-24 |
| Claude API (ຕາມການໃຊ້ງານ) | $10-50+ (ຂຶ້ນກັບປະລິມານ) |
| Apify (scraping) | $10-49+ |
| Shotstack (ຕັດຕໍ່ວິດີໂອ, ປະລິມານນ້ອຍ) | $10-40+ |
| Firebase (Blaze plan, ປະລິມານນ້ອຍ) | $0-25 |
| **ລວມປະມານ** | **$50-190+/ເດືອນ** ຂຶ້ນກັບປະລິມານການໃຊ້ງານ |

> ຕົວເລກນີ້ເປັນການປະມານເບື້ອງຕົ້ນເທົ່ານັ້ນ, ລາຄາຈິງຂຶ້ນກັບປະລິມານການໃຊ້ງານແທ້ — ຄວນເລີ່ມນ້ອຍໆ ແລ້ວຂະຫຍາຍຕາມຄວາມຈຳເປັນ

---

## ສະຫລຸບ

ການ "ເຮັດວຽກ 24/7" ບໍ່ແມ່ນການປ່ຽນ code ໃນແອັບ React ແຕ່ແມ່ນການ **ຕໍ່ລະບົບໃໝ່ (n8n) ເຂົ້າມາຄຽງຄູ່** ໂດຍໃຊ້ແອັບປັດຈຸບັນເປັນບ່ອນສະແດງຜົນ/ຄວບຄຸມ ຂັ້ນຕອນນີ້ຕ້ອງການ:
- ບັນຊີ n8n (Cloud ຫລື self-host)
- ບັນຊີບໍລິການພາຍນອກ (Apify, Shotstack, ແລະອື່ນໆ) ພ້ອມການຈ່າຍເງິນ
- Facebook Developer App (ສຳລັບໂພສອັດຕະໂນມັດ)
- Backend ຮ່ວມກັນ (ແນະນຳ Firebase)

ຖ້າພ້ອມເລີ່ມສ່ວນໃດ ບອກໄດ້ — ຂ້ອຍຊ່ວຍ:
- ຂຽນ JSON workflow ຕົວຢ່າງໃຫ້ import ເຂົ້າ n8n ໂດຍກົງ
- ຂຽນ Cloud Function / API endpoint ທີ່ n8n ຈະເອີ້ນ
- ຕັ້ງ Firebase Auth + Firestore ໃຫ້ແອັບ React (ຂັ້ນຕອນນີ້ເຮັດຢູ່ໃນ code ຂອງແອັບໄດ້ໂດຍກົງ)
