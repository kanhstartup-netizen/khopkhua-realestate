// Shared watermark rendering — used by both the Watermark page and Add Property.
import { BRAND } from "../data/watermarks";

export function loadImg(src, crossOrigin) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (crossOrigin) img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Draw photo + watermark template onto a canvas.
export function drawWatermark(canvas, photoArg, tplArg, logo) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const photo = photoArg;
    const tpl = tplArg;

    // Output canvas keeps the photo's native ratio, capped at 1080 wide
    const baseW = 1080;
    const ratio = photo ? photo.height / photo.width : 1;
    const W = baseW;
    const H = photo ? Math.round(baseW * ratio) : Math.round(baseW * 0.66);
    canvas.width = W;
    canvas.height = H;

    // background / photo
    if (photo) {
      ctx.drawImage(photo, 0, 0, W, H);
    } else {
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#0a1428");
      g.addColorStop(1, "#10204a");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.font = `500 ${Math.round(W * 0.03)}px 'Noto Sans Lao', sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("ອັບໂຫລດຮູບ ເພື່ອເບິ່ງຕົວຢ່າງ", W / 2, H / 2);
      ctx.textAlign = "left";
    }

    const s = tpl;
    const pad = Math.round(W * 0.03);
    const phoneText = BRAND.phones.join("  •  ");

    const drawLogo = (x, y, size) => {
      if (logo) ctx.drawImage(logo, x, y, size, size);
    };

    // ---- styles ----
    if (s.style === "bottomBar" || s.style === "topBar") {
      const barH = Math.round(H * 0.16);
      const y = s.style === "bottomBar" ? H - barH : 0;
      ctx.fillStyle = s.bg;
      ctx.fillRect(0, y, W, barH);
      // accent line
      ctx.fillStyle = s.accent;
      ctx.fillRect(0, s.style === "bottomBar" ? y : barH - 6, W, 6);

      const logoSize = barH * 0.66;
      const ly = y + (barH - logoSize) / 2;
      drawLogo(pad, ly, logoSize);

      const tx = pad + logoSize + pad * 0.6;
      ctx.textBaseline = "middle";
      ctx.fillStyle = s.accent;
      ctx.font = `700 ${Math.round(barH * 0.26)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameLao, tx, y + barH * 0.34);
      ctx.fillStyle = s.text;
      ctx.font = `600 ${Math.round(barH * 0.2)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameEn, tx, y + barH * 0.62);
      ctx.font = `500 ${Math.round(barH * 0.18)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText("☎ " + phoneText, tx, y + barH * 0.85);
    }

    if (s.style === "gradientBar") {
      const barH = Math.round(H * 0.16);
      const y = H - barH;
      const g = ctx.createLinearGradient(0, 0, W, 0);
      g.addColorStop(0, "rgba(124,58,237,0.92)");
      g.addColorStop(1, "rgba(217,70,239,0.92)");
      ctx.fillStyle = g;
      ctx.fillRect(0, y, W, barH);
      const logoSize = barH * 0.66;
      drawLogo(pad, y + (barH - logoSize) / 2, logoSize);
      const tx = pad + logoSize + pad * 0.6;
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff";
      ctx.font = `700 ${Math.round(barH * 0.26)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameLao, tx, y + barH * 0.34);
      ctx.font = `600 ${Math.round(barH * 0.2)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameEn, tx, y + barH * 0.62);
      ctx.font = `500 ${Math.round(barH * 0.18)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText("☎ " + phoneText, tx, y + barH * 0.85);
    }

    if (s.style === "cornerCard") {
      const cw = Math.round(W * 0.46);
      const ch = Math.round(H * 0.2);
      const x = W - cw - pad;
      const y = H - ch - pad;
      ctx.fillStyle = s.bg;
      rr(ctx, x, y, cw, ch, 24);
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = s.accent;
      ctx.stroke();
      const logoSize = ch * 0.6;
      drawLogo(x + pad * 0.5, y + (ch - logoSize) / 2, logoSize);
      const tx = x + pad * 0.5 + logoSize + 14;
      ctx.textBaseline = "middle";
      ctx.fillStyle = s.accent;
      ctx.font = `700 ${Math.round(ch * 0.22)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameLao, tx, y + ch * 0.32);
      ctx.fillStyle = "#fff";
      ctx.font = `600 ${Math.round(ch * 0.17)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameEn, tx, y + ch * 0.56);
      ctx.font = `500 ${Math.round(ch * 0.15)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText(BRAND.phones[0], tx, y + ch * 0.78);
      ctx.fillText(BRAND.phones[1], tx + Math.round(cw * 0.42), y + ch * 0.78);
    }

    if (s.style === "topLeftBadge") {
      const cw = Math.round(W * 0.5);
      const ch = Math.round(H * 0.19);
      const x = pad, y = pad;
      ctx.fillStyle = s.bg;
      rr(ctx, x, y, cw, ch, 22);
      ctx.fill();
      ctx.fillStyle = s.accent;
      rr(ctx, x, y, 8, ch, 4);
      ctx.fill();
      const logoSize = ch * 0.62;
      drawLogo(x + 20, y + (ch - logoSize) / 2, logoSize);
      const tx = x + 20 + logoSize + 14;
      ctx.textBaseline = "middle";
      ctx.fillStyle = s.accent;
      ctx.font = `700 ${Math.round(ch * 0.24)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameLao, tx, y + ch * 0.34);
      ctx.fillStyle = "#fff";
      ctx.font = `600 ${Math.round(ch * 0.18)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameEn, tx, y + ch * 0.58);
      ctx.font = `500 ${Math.round(ch * 0.16)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText("☎ " + phoneText, tx, y + ch * 0.82);
    }

    if (s.style === "centerStamp") {
      ctx.globalAlpha = 0.85;
      const logoSize = W * 0.16;
      drawLogo((W - logoSize) / 2, H * 0.32 - logoSize / 2, logoSize);
      ctx.globalAlpha = 1;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = 12;
      ctx.fillStyle = s.accent;
      ctx.font = `700 ${Math.round(W * 0.05)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameLao, W / 2, H * 0.46);
      ctx.font = `600 ${Math.round(W * 0.038)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameEn, W / 2, H * 0.53);
      ctx.font = `500 ${Math.round(W * 0.03)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText("☎ " + phoneText, W / 2, H * 0.6);
      ctx.shadowBlur = 0;
      ctx.textAlign = "left";
    }

    if (s.style === "fullFrame") {
      const m = Math.round(W * 0.02);
      ctx.strokeStyle = s.accent;
      ctx.lineWidth = 8;
      ctx.strokeRect(m, m, W - m * 2, H - m * 2);
      // bottom bar inside frame
      const barH = Math.round(H * 0.13);
      const y = H - m - barH;
      ctx.fillStyle = "rgba(6,16,30,0.78)";
      ctx.fillRect(m + 4, y, W - m * 2 - 8, barH);
      const logoSize = barH * 0.7;
      drawLogo(m + 20, y + (barH - logoSize) / 2, logoSize);
      const tx = m + 20 + logoSize + 16;
      ctx.textBaseline = "middle";
      ctx.fillStyle = s.accent;
      ctx.font = `700 ${Math.round(barH * 0.3)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameLao + "  ", tx, y + barH * 0.36);
      ctx.fillStyle = "#fff";
      ctx.font = `600 ${Math.round(barH * 0.22)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameEn, tx, y + barH * 0.66);
      ctx.font = `500 ${Math.round(barH * 0.2)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.textAlign = "right";
      ctx.fillText("☎ " + phoneText, W - m - 24, y + barH * 0.5);
      ctx.textAlign = "left";
    }

    if (s.style === "bigLogoCenter") {
      // big translucent logo watermark
      ctx.globalAlpha = 0.16;
      const logoSize = W * 0.5;
      drawLogo((W - logoSize) / 2, (H - logoSize) / 2, logoSize);
      ctx.globalAlpha = 1;
      // bottom strip text
      const barH = Math.round(H * 0.12);
      const y = H - barH;
      ctx.fillStyle = "rgba(6,16,30,0.7)";
      ctx.fillRect(0, y, W, barH);
      ctx.fillStyle = s.accent;
      ctx.fillRect(0, y, W, 5);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff";
      ctx.font = `700 ${Math.round(barH * 0.32)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(`${BRAND.nameLao}  |  ${BRAND.nameEn}`, W / 2, y + barH * 0.36);
      ctx.font = `500 ${Math.round(barH * 0.26)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillStyle = s.accent;
      ctx.fillText("☎ " + phoneText, W / 2, y + barH * 0.72);
      ctx.textAlign = "left";
    }

    if (s.style === "proSplit") {
      const barH = Math.round(H * 0.17);
      const y = H - barH;
      ctx.fillStyle = s.bg;
      ctx.fillRect(0, y, W, barH);
      // accent block on left
      ctx.fillStyle = s.accent;
      ctx.fillRect(0, y, Math.round(W * 0.012), barH);
      const logoSize = barH * 0.68;
      drawLogo(pad, y + (barH - logoSize) / 2, logoSize);
      const tx = pad + logoSize + pad * 0.6;
      ctx.textBaseline = "middle";
      ctx.fillStyle = s.accent;
      ctx.font = `700 ${Math.round(barH * 0.28)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameLao, tx, y + barH * 0.36);
      ctx.fillStyle = "#fff";
      ctx.font = `600 ${Math.round(barH * 0.2)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameEn, tx, y + barH * 0.64);
      // phone block on right
      ctx.textAlign = "right";
      ctx.fillStyle = s.accent;
      ctx.font = `700 ${Math.round(barH * 0.2)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText("ໂທ / Tel", W - pad, y + barH * 0.32);
      ctx.fillStyle = "#fff";
      ctx.font = `600 ${Math.round(barH * 0.2)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.phones[0], W - pad, y + barH * 0.58);
      ctx.fillText(BRAND.phones[1], W - pad, y + barH * 0.82);
      ctx.textAlign = "left";
    }

    if (s.style === "sold") {
      // dim the whole photo slightly to make the stamp pop
      ctx.fillStyle = "rgba(0,0,0,0.32)";
      ctx.fillRect(0, 0, W, H);

      // big diagonal SOLD ribbon across the image
      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.rotate(-Math.PI / 9); // ~ -20deg
      const ribbonH = Math.round(H * 0.2);
      const ribbonW = W * 1.4;
      // ribbon background
      const rg = ctx.createLinearGradient(-ribbonW / 2, 0, ribbonW / 2, 0);
      rg.addColorStop(0, "#b91c1c");
      rg.addColorStop(0.5, "#ef4444");
      rg.addColorStop(1, "#b91c1c");
      ctx.fillStyle = rg;
      ctx.fillRect(-ribbonW / 2, -ribbonH / 2, ribbonW, ribbonH);
      // white border lines
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = 4;
      ctx.strokeRect(-ribbonW / 2, -ribbonH / 2 + 8, ribbonW, ribbonH - 16);
      // SOLD text
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff";
      ctx.shadowColor = "rgba(0,0,0,0.4)";
      ctx.shadowBlur = 8;
      ctx.font = `800 ${Math.round(ribbonH * 0.5)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText("ປິດການຂາຍແລ້ວ  •  SOLD", 0, 0);
      ctx.shadowBlur = 0;
      ctx.restore();

      // bottom brand bar (same as bottomBar)
      const barH = Math.round(H * 0.16);
      const y = H - barH;
      ctx.fillStyle = s.bg;
      ctx.fillRect(0, y, W, barH);
      ctx.fillStyle = s.accent;
      ctx.fillRect(0, y, W, 6);
      const logoSize = barH * 0.66;
      drawLogo(pad, y + (barH - logoSize) / 2, logoSize);
      const tx = pad + logoSize + pad * 0.6;
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.fillStyle = "#fff";
      ctx.font = `700 ${Math.round(barH * 0.26)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameLao, tx, y + barH * 0.34);
      ctx.font = `600 ${Math.round(barH * 0.2)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameEn, tx, y + barH * 0.62);
      ctx.font = `500 ${Math.round(barH * 0.18)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText("☎ " + phoneText, tx, y + barH * 0.85);
    }

    // ===== Reusable bottom brand bar for SOLD variants =====
    const brandBar = (barColor = "rgba(6,16,30,0.8)", lineColor = "#e8b840") => {
      const barH = Math.round(H * 0.15);
      const y = H - barH;
      ctx.fillStyle = barColor;
      ctx.fillRect(0, y, W, barH);
      ctx.fillStyle = lineColor;
      ctx.fillRect(0, y, W, 5);
      const logoSize = barH * 0.66;
      drawLogo(pad, y + (barH - logoSize) / 2, logoSize);
      const tx = pad + logoSize + pad * 0.6;
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.fillStyle = "#fff";
      ctx.font = `700 ${Math.round(barH * 0.27)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameLao, tx, y + barH * 0.34);
      ctx.font = `600 ${Math.round(barH * 0.21)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameEn, tx, y + barH * 0.63);
      ctx.font = `500 ${Math.round(barH * 0.19)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText("☎ " + phoneText, tx, y + barH * 0.87);
    };

    // S1/S2/S3 — SOLD ribbon in the CENTER (color from accent), text color from s.text
    if (s.style === "soldCenter") {
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(0, 0, W, H);
      ctx.save();
      ctx.translate(W / 2, H * 0.42);
      ctx.rotate(-Math.PI / 9);
      const ribbonH = Math.round(H * 0.19);
      const ribbonW = W * 1.5;
      ctx.fillStyle = s.accent;
      ctx.fillRect(-ribbonW / 2, -ribbonH / 2, ribbonW, ribbonH);
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.lineWidth = 4;
      ctx.strokeRect(-ribbonW / 2, -ribbonH / 2 + 8, ribbonW, ribbonH - 16);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = s.text;
      ctx.font = `800 ${Math.round(ribbonH * 0.46)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText("ປິດການຂາຍແລ້ວ  •  SOLD", 0, 0);
      ctx.restore();
      brandBar(s.bg, s.accent);
    }

    // S4/S5 — SOLD ribbon in the top-right CORNER
    if (s.style === "soldCorner") {
      const size = W * 0.42;
      ctx.save();
      ctx.beginPath();
      ctx.rect(W - size, 0, size, size);
      ctx.clip();
      ctx.translate(W - size / 2, size / 2);
      ctx.rotate(Math.PI / 4);
      const ribbonH = Math.round(size * 0.26);
      ctx.fillStyle = s.accent;
      ctx.fillRect(-size, -ribbonH / 2, size * 2, ribbonH);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = s.text;
      ctx.font = `800 ${Math.round(ribbonH * 0.5)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText("SOLD ຂາຍແລ້ວ", 0, 0);
      ctx.restore();
      brandBar(s.bg, s.accent);
    }

    // S6/S7 — round SOLD stamp in center
    if (s.style === "soldCircle") {
      ctx.fillStyle = "rgba(0,0,0,0.28)";
      ctx.fillRect(0, 0, W, H);
      const cx = W / 2, cy = H * 0.42, r = Math.min(W, H) * 0.2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-Math.PI / 12);
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = s.accent;
      ctx.fill();
      ctx.lineWidth = 6;
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.82, 0, Math.PI * 2);
      ctx.stroke();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = s.text;
      ctx.font = `800 ${Math.round(r * 0.42)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText("SOLD", 0, -r * 0.15);
      ctx.font = `700 ${Math.round(r * 0.24)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText("ຂາຍແລ້ວ", 0, r * 0.32);
      ctx.restore();
      brandBar(s.bg, s.accent);
    }

    // S8 — full-width red SOLD bar across middle
    if (s.style === "soldFullBar") {
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(0, 0, W, H);
      const barH = Math.round(H * 0.16);
      const y = H * 0.4 - barH / 2;
      ctx.fillStyle = s.bg;
      ctx.fillRect(0, y, W, barH);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.fillRect(0, y, W, 4);
      ctx.fillRect(0, y + barH - 4, W, 4);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff";
      ctx.font = `800 ${Math.round(barH * 0.5)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText("ປິດການຂາຍແລ້ວ  •  SOLD", W / 2, y + barH / 2);
      brandBar("rgba(6,16,30,0.8)", "#e8b840");
    }

    // S9 — outline SOLD stamp (transparent, just red outlined text)
    if (s.style === "soldStampOutline") {
      ctx.save();
      ctx.translate(W / 2, H * 0.4);
      ctx.rotate(-Math.PI / 12);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = 6;
      ctx.strokeStyle = s.accent;
      ctx.font = `800 ${Math.round(W * 0.13)}px 'Noto Sans Lao', sans-serif`;
      ctx.strokeText("SOLD", 0, 0);
      ctx.fillStyle = "rgba(239,68,68,0.25)";
      ctx.fillText("SOLD", 0, 0);
      ctx.font = `700 ${Math.round(W * 0.05)}px 'Noto Sans Lao', sans-serif`;
      ctx.strokeStyle = s.accent;
      ctx.lineWidth = 3;
      ctx.strokeText("ປິດການຂາຍແລ້ວ", 0, W * 0.1);
      ctx.restore();
      brandBar("rgba(6,16,30,0.8)", s.accent);
    }

    // S10 — professional: red badge top-left + brand bar
    if (s.style === "soldPro") {
      const bw = W * 0.34, bh = H * 0.1;
      const x = pad, y = pad;
      ctx.fillStyle = s.accent;
      rr(ctx, x, y, bw, bh, 14);
      ctx.fill();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff";
      ctx.font = `800 ${Math.round(bh * 0.42)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText("ຂາຍແລ້ວ SOLD", x + bw / 2, y + bh / 2);
      ctx.textAlign = "left";
      brandBar(s.bg, s.accent);
    }

    // ===== 10 general styles (portrait + landscape safe) =====

    // corner status badge helper (top-right pill)
    const cornerBadge = (label, color) => {
      ctx.save();
      ctx.font = `800 ${Math.round(W * 0.032)}px 'Noto Sans Lao', sans-serif`;
      const tw = ctx.measureText(label).width;
      const bw = tw + W * 0.06;
      const bh = W * 0.06;
      const x = W - bw - pad;
      const y = pad;
      ctx.fillStyle = color;
      rr(ctx, x, y, bw, bh, bh / 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, x + bw / 2, y + bh / 2 + 1);
      ctx.textAlign = "left";
      ctx.restore();
    };

    if (s.style === "reserved") {
      cornerBadge("ຮັບຈອງແລ້ວ • RESERVED", s.accent);
      brandBar(s.bg, s.accent);
    }

    if (s.style === "hotDeal") {
      cornerBadge("🔥 ດ່ວນ! ລາຄາພິເສດ", s.accent);
      brandBar(s.bg, s.accent);
    }

    if (s.style === "newListing") {
      cornerBadge("ໃໝ່ • NEW", s.accent);
      brandBar(s.bg, s.accent);
    }

    if (s.style === "logoCornerName") {
      // logo top-left + small name; brand bar bottom
      const ls = W * 0.14;
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 10;
      drawLogo(pad, pad, ls);
      ctx.restore();
      brandBar(s.bg, s.accent);
    }

    if (s.style === "sideBarLeft" || s.style === "sideBarRight") {
      const barW = Math.round(W * 0.13);
      const left = s.style === "sideBarLeft";
      const x = left ? 0 : W - barW;
      ctx.fillStyle = s.bg;
      ctx.fillRect(x, 0, barW, H);
      ctx.fillStyle = s.accent;
      ctx.fillRect(left ? barW - 5 : x, 0, 5, H);
      // vertical text
      ctx.save();
      ctx.translate(x + barW / 2, H / 2);
      ctx.rotate(left ? -Math.PI / 2 : Math.PI / 2);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = s.accent;
      ctx.font = `700 ${Math.round(barW * 0.36)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameLao, 0, -barW * 0.16);
      ctx.fillStyle = "#fff";
      ctx.font = `600 ${Math.round(barW * 0.26)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameEn, 0, barW * 0.18);
      ctx.restore();
      // logo + phone at the bottom of the bar
      const ls = barW * 0.6;
      drawLogo(x + (barW - ls) / 2, H - ls - pad, ls);
      ctx.textAlign = "left";
    }

    if (s.style === "minimal") {
      // subtle logo + one-line text bottom-left, no heavy bar
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = 10;
      const ls = W * 0.1;
      const y = H - ls - pad;
      drawLogo(pad, y, ls);
      ctx.fillStyle = "#fff";
      ctx.textBaseline = "middle";
      ctx.font = `700 ${Math.round(W * 0.03)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameLao, pad + ls + 16, y + ls * 0.32);
      ctx.font = `500 ${Math.round(W * 0.024)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText("☎ " + phoneText, pad + ls + 16, y + ls * 0.72);
      ctx.restore();
    }

    if (s.style === "urgentGradient") {
      cornerBadge("ຂາຍດ່ວນ • URGENT", "#dc2626");
      const barH = Math.round(H * 0.15);
      const y = H - barH;
      const g = ctx.createLinearGradient(0, 0, W, 0);
      g.addColorStop(0, "#dc2626");
      g.addColorStop(1, "#f97316");
      ctx.fillStyle = g;
      ctx.fillRect(0, y, W, barH);
      const ls = barH * 0.66;
      drawLogo(pad, y + (barH - ls) / 2, ls);
      const tx = pad + ls + pad * 0.6;
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.fillStyle = "#fff";
      ctx.font = `700 ${Math.round(barH * 0.27)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameLao, tx, y + barH * 0.34);
      ctx.font = `600 ${Math.round(barH * 0.21)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameEn, tx, y + barH * 0.63);
      ctx.font = `500 ${Math.round(barH * 0.19)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText("☎ " + phoneText, tx, y + barH * 0.87);
    }

    if (s.style === "luxuryGold") {
      // thin gold frame + elegant bottom bar
      const m = Math.round(W * 0.022);
      ctx.strokeStyle = s.accent;
      ctx.lineWidth = 3;
      ctx.strokeRect(m, m, W - m * 2, H - m * 2);
      ctx.lineWidth = 1;
      ctx.strokeRect(m + 8, m + 8, W - (m + 8) * 2, H - (m + 8) * 2);
      brandBar("rgba(6,16,30,0.72)", s.accent);
    }

    if (s.style === "contactCard") {
      const cw = Math.round(W * 0.5);
      const ch = Math.round(H * 0.2);
      const x = pad;
      const y = H - ch - pad;
      ctx.fillStyle = s.bg;
      rr(ctx, x, y, cw, ch, 20);
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = s.accent;
      ctx.stroke();
      const ls = ch * 0.58;
      drawLogo(x + 16, y + (ch - ls) / 2, ls);
      const tx = x + 16 + ls + 14;
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.fillStyle = s.accent;
      ctx.font = `700 ${Math.round(ch * 0.2)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText(BRAND.nameLao, tx, y + ch * 0.3);
      ctx.fillStyle = "#fff";
      ctx.font = `500 ${Math.round(ch * 0.16)}px 'Noto Sans Lao', sans-serif`;
      ctx.fillText("☎ " + BRAND.phones[0], tx, y + ch * 0.58);
      ctx.fillText("☎ " + BRAND.phones[1], tx, y + ch * 0.82);
    }
}
