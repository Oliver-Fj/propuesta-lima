/* Ilustraciones en canvas de los productos (puertas, maderas, muebles, altares). */
"use strict";

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const c = (v) => Math.max(0, Math.min(255, v + amt));
  return `rgb(${c(n >> 16)},${c((n >> 8) & 255)},${c(n & 255)})`;
}
function wood(ctx, x, y, w, h, base, seed, vert, o = {}) {
  grain(
    ctx,
    x,
    y,
    w,
    h,
    Object.assign({ base, seed, vertical: vert, spacing: 3.2, wave: 3, strength: 0.18 }, o)
  );
  ctx.strokeStyle = "rgba(55,28,10,.45)";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
}
function panel(ctx, x, y, w, h) {
  ctx.lineWidth = 1.4;
  ctx.strokeStyle = "rgba(50,24,8,.55)";
  ctx.strokeRect(x, y, w, h);
  ctx.strokeStyle = "rgba(255,235,205,.35)";
  ctx.strokeRect(x + 3, y + 3, w - 6, h - 6);
}
function drawDoor(ctx, x, y, dw, dh, o) {
  const leaf = (lx, lw, s, handleLeft) => {
    wood(ctx, lx, y, lw, dh, o.base, s, true);
    if (o.v === "canales") {
      ctx.strokeStyle = "rgba(60,30,10,.45)";
      ctx.lineWidth = 2;
      [0.28, 0.5, 0.72].forEach((f) => {
        ctx.beginPath();
        ctx.moveTo(lx + lw * 0.14, y + dh * f);
        ctx.lineTo(lx + lw * 0.86, y + dh * f);
        ctx.stroke();
      });
    }
    if (o.v === "tablero" || o.v === "doble") {
      const px = lw * 0.14,
        pw = (lw - px * 3) / 2;
      [
        [0.06, 0.27],
        [0.38, 0.27],
        [0.7, 0.24],
      ].forEach(([fy, fh]) => {
        panel(ctx, lx + px, y + dh * fy, pw, dh * fh);
        panel(ctx, lx + px * 2 + pw, y + dh * fy, pw, dh * fh);
      });
    }
    if (o.v === "tallada") {
      const px = lw * 0.12;
      panel(ctx, lx + px, y + dh * 0.06, lw - px * 2, dh * 0.52);
      panel(ctx, lx + px, y + dh * 0.64, lw - px * 2, dh * 0.3);
      ctx.strokeStyle = "rgba(45,20,6,.6)";
      ctx.lineWidth = 1.3;
      const cx = lx + lw / 2,
        cy = y + dh * 0.32;
      for (let k = 0; k < 3; k++) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, lw * (0.26 - k * 0.07), dh * (0.17 - k * 0.045), 0, 0, 6.29);
        ctx.stroke();
      }
      for (let k = 0; k < 8; k++) {
        const a = (k / 8) * 6.283;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * lw * 0.1, cy + Math.sin(a) * dh * 0.065);
        ctx.quadraticCurveTo(
          cx + Math.cos(a + 0.4) * lw * 0.2,
          cy + Math.sin(a + 0.4) * dh * 0.12,
          cx + Math.cos(a) * lw * 0.26,
          cy + Math.sin(a) * dh * 0.17
        );
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(lx + px + 6, y + dh * 0.79);
      for (let t = 0; t <= 1; t += 0.05)
        ctx.lineTo(lx + px + 6 + t * (lw - px * 2 - 12), y + dh * 0.79 + Math.sin(t * 18) * 5);
      ctx.stroke();
    }
    if (o.v === "visor") {
      ctx.fillStyle = "#CFE0E6";
      ctx.fillRect(lx + lw * 0.38, y + dh * 0.14, lw * 0.24, dh * 0.26);
      ctx.strokeStyle = "rgba(40,40,40,.55)";
      ctx.lineWidth = 2;
      ctx.strokeRect(lx + lw * 0.38, y + dh * 0.14, lw * 0.24, dh * 0.26);
      ctx.fillStyle = "#A9ADB0";
      ctx.fillRect(lx + 2, y + dh * 0.9, lw - 4, dh * 0.08);
    }
    const hx = handleLeft ? lx + lw * 0.14 : lx + lw * 0.86,
      hy = y + dh * 0.52;
    ctx.fillStyle = o.v === "tallada" ? "#B8933F" : "#6f6a62";
    ctx.beginPath();
    ctx.arc(hx, hy, Math.max(2.5, lw * 0.03), 0, 6.29);
    ctx.fill();
    ctx.fillRect(handleLeft ? hx : hx - lw * 0.1, hy - 1.5, lw * 0.1, 3);
  };
  ctx.fillStyle = "rgba(0,0,0,.18)";
  ctx.fillRect(x + 6, y + 6, dw, dh);
  if (o.v === "doble") {
    leaf(x, dw / 2, o.seed, false);
    leaf(x + dw / 2, dw / 2, o.seed + 3, true);
  } else leaf(x, dw, o.seed, false);
  if (o.v === "tallada") {
    ctx.strokeStyle = "rgba(40,18,5,.7)";
    ctx.lineWidth = 3;
    ctx.strokeRect(x - 2, y - 2, dw + 4, dh + 4);
  }
}
function drawProduct(cv, p) {
  const { ctx, w, h } = prep(cv),
    o = p.img,
    g = h * 0.84;
  ctx.fillStyle = "#EFE8DC";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(0,0,0,.05)";
  ctx.fillRect(0, g, w, h - g);
  const dark = "#3B2A1E";
  if (o.t === "door") {
    const dh = h * 0.8,
      dw = Math.min(w * 0.8, dh * (o.w / 2.1)),
      x = (w - dw) / 2,
      y = h * 0.06;
    drawDoor(ctx, x, y, dw, dh, o);
  } else if (o.t === "lumber") {
    const n = o.n || 3,
      bh = o.flat ? h * 0.11 : h * 0.16,
      gap = 4;
    const total = n * bh + (n - 1) * gap,
      y0 = h * 0.48 - total / 2,
      x0 = w * 0.08,
      bw = w * 0.7,
      ew = Math.min(bh * (o.flat ? 2.4 : 1.4), w * 0.14);
    for (let i = 0; i < n; i++) {
      const y = y0 + i * (bh + gap),
        sx = x0 + (i % 2) * 8;
      grain(ctx, sx, y, bw, bh, {
        base: o.base,
        seed: o.seed + i,
        spacing: o.smooth ? 2.4 : 3,
        strength: o.smooth ? 0.14 : 0.24,
        knot: i === 1,
      });
      ctx.strokeStyle = "rgba(60,30,10,.35)";
      ctx.lineWidth = 1;
      ctx.strokeRect(sx + 0.5, y + 0.5, bw - 1, bh - 1);
      const ex = sx + bw;
      ctx.fillStyle = shade(o.base, -18);
      ctx.fillRect(ex, y, ew, bh);
      ctx.save();
      ctx.beginPath();
      ctx.rect(ex, y, ew, bh);
      ctx.clip();
      ctx.strokeStyle = "rgba(70,35,12,.35)";
      for (let k = 1; k < 9; k++) {
        ctx.beginPath();
        ctx.arc(ex - bh * 0.8, y + bh * 1.6, k * bh * 0.32, 0, 6.29);
        ctx.stroke();
      }
      ctx.restore();
    }
  } else if (o.t === "dining") {
    const tx = w * 0.26,
      tw = w * 0.48,
      ty = h * 0.44;
    const chair = (cx, flip) => {
      const bw = w * 0.08,
        sh = h * 0.2;
      wood(ctx, cx, ty - h * 0.18, bw * 0.35, h * 0.18 + sh + h * 0.2, o.base, o.seed + 9, true);
      ctx.fillStyle = shade(o.base, -25);
      ctx.fillRect(flip ? cx - bw : cx, ty + h * 0.12, bw + bw * 0.35, h * 0.035);
      ctx.fillRect(flip ? cx - bw : cx + bw, ty + h * 0.12, 4, g - ty - h * 0.12);
    };
    chair(w * 0.12, false);
    chair(w * 0.84, true);
    wood(ctx, tx, ty, tw, h * 0.055, o.base, o.seed, false);
    ctx.fillStyle = shade(o.base, -30);
    ctx.fillRect(tx + 6, ty + h * 0.055, tw - 12, h * 0.04);
    [tx + 10, tx + tw - 20].forEach((lx) =>
      wood(ctx, lx, ty + h * 0.09, 10, g - ty - h * 0.09, o.base, o.seed + 2, true)
    );
  } else if (o.t === "bed") {
    const bx = w * 0.2,
      bw = w * 0.6;
    wood(ctx, bx, h * 0.2, bw, h * 0.42, o.base, o.seed, true);
    panel(ctx, bx + bw * 0.08, h * 0.26, bw * 0.84, h * 0.2);
    ctx.fillStyle = "#EEE6DA";
    ctx.fillRect(bx + 8, h * 0.5, bw - 16, h * 0.16);
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.roundRect
      ? ctx.roundRect(bx + bw * 0.12, h * 0.46, bw * 0.3, h * 0.08, 8)
      : ctx.rect(bx + bw * 0.12, h * 0.46, bw * 0.3, h * 0.08);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect
      ? ctx.roundRect(bx + bw * 0.58, h * 0.46, bw * 0.3, h * 0.08, 8)
      : ctx.rect(bx + bw * 0.58, h * 0.46, bw * 0.3, h * 0.08);
    ctx.fill();
    wood(ctx, bx - 4, h * 0.65, bw + 8, h * 0.1, o.base, o.seed + 1, false);
    ctx.fillStyle = dark;
    ctx.fillRect(bx, h * 0.75, 8, g - h * 0.75);
    ctx.fillRect(bx + bw - 8, h * 0.75, 8, g - h * 0.75);
    [w * 0.04, w * 0.84].forEach((nx) => {
      wood(ctx, nx, h * 0.56, w * 0.12, h * 0.24, o.base, o.seed + 4, false);
      ctx.strokeStyle = "rgba(50,24,8,.5)";
      ctx.beginPath();
      ctx.moveTo(nx + 4, h * 0.68);
      ctx.lineTo(nx + w * 0.12 - 4, h * 0.68);
      ctx.stroke();
    });
  } else if (o.t === "sofa") {
    const sx = w * 0.14,
      sw = w * 0.72,
      fab = "#7C8B7A";
    ctx.fillStyle = shade("#7C8B7A", -15);
    ctx.fillRect(sx + w * 0.05, h * 0.3, sw - w * 0.1, h * 0.28);
    ctx.fillStyle = fab;
    ctx.fillRect(sx + w * 0.07, h * 0.52, (sw - w * 0.14) / 2 - 3, h * 0.12);
    ctx.fillRect(sx + sw / 2 + 1, h * 0.52, (sw - w * 0.14) / 2 - 3, h * 0.12);
    wood(ctx, sx, h * 0.4, w * 0.06, h * 0.3, o.base, o.seed, true);
    wood(ctx, sx + sw - w * 0.06, h * 0.4, w * 0.06, h * 0.3, o.base, o.seed + 1, true);
    wood(ctx, sx, h * 0.64, sw, h * 0.07, o.base, o.seed + 2, false);
    ctx.fillStyle = dark;
    [sx + 6, sx + sw - 14].forEach((lx) => ctx.fillRect(lx, h * 0.71, 8, g - h * 0.71));
  } else if (o.t === "mela") {
    const mx = w * 0.24,
      mw = w * 0.52,
      my = h * 0.08,
      mh = g - my - 4;
    ctx.fillStyle = "rgba(0,0,0,.15)";
    ctx.fillRect(mx + 6, my + 6, mw, mh);
    ctx.fillStyle = "#ECE8E1";
    ctx.fillRect(mx, my, mw, mh);
    const dw2 = (mw - 12) / 2;
    grain(ctx, mx + 4, my + 4, dw2, mh * 0.62, {
      base: o.base,
      seed: o.seed,
      vertical: true,
      spacing: 2.6,
      wave: 1.5,
      strength: 0.1,
    });
    grain(ctx, mx + 8 + dw2, my + 4, dw2, mh * 0.62, {
      base: o.base,
      seed: o.seed + 1,
      vertical: true,
      spacing: 2.6,
      wave: 1.5,
      strength: 0.1,
    });
    ctx.fillStyle = "#F7F5F1";
    [0, 1].forEach((r) => ctx.fillRect(mx + 4, my + mh * 0.66 + r * mh * 0.17, mw - 8, mh * 0.15));
    ctx.strokeStyle = "rgba(0,0,0,.25)";
    ctx.lineWidth = 1;
    ctx.strokeRect(mx + 0.5, my + 0.5, mw - 1, mh - 1);
    ctx.fillStyle = "#555";
    ctx.fillRect(mx + dw2 - 4, my + mh * 0.3, 3, mh * 0.1);
    ctx.fillRect(mx + dw2 + 13, my + mh * 0.3, 3, mh * 0.1);
    [0, 1].forEach((r) => ctx.fillRect(mx + mw / 2 - 14, my + mh * 0.73 + r * mh * 0.17, 28, 3));
  } else if (o.t === "desk") {
    const steel = "#3A4045";
    const one = (x0, s) => {
      const dw = w * 0.3;
      wood(ctx, x0, h * 0.36, dw, h * 0.05, o.base, o.seed + s, false);
      ctx.strokeStyle = steel;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x0 + 8, h * 0.41);
      ctx.lineTo(x0 + 8, g);
      ctx.moveTo(x0 + dw - 8, h * 0.41);
      ctx.lineTo(x0 + dw - 8, g);
      ctx.moveTo(x0 + 8, h * 0.72);
      ctx.lineTo(x0 + dw - 8, h * 0.72);
      ctx.stroke();
      wood(ctx, x0 + dw * 0.2, h * 0.58, dw * 0.6, h * 0.045, o.base, o.seed + s + 1, false);
      wood(ctx, x0 + dw * 0.22, h * 0.44, dw * 0.56, h * 0.09, o.base, o.seed + s + 2, false);
      ctx.beginPath();
      ctx.moveTo(x0 + dw * 0.25, h * 0.62);
      ctx.lineTo(x0 + dw * 0.25, g);
      ctx.moveTo(x0 + dw * 0.75, h * 0.62);
      ctx.lineTo(x0 + dw * 0.75, g);
      ctx.stroke();
    };
    one(w * 0.14, 0);
    one(w * 0.56, 5);
  } else if (o.t === "altar") {
    const ax = w * 0.25,
      aw = w * 0.5;
    [
      [0.04, 0.76, 0.08],
      [0.0, 0.68, 0.08],
    ].forEach(([dx, fy, fh], i) =>
      wood(ctx, w * (0.12 + dx), h * fy, w * (0.76 - dx * 2), h * fh, o.base, o.seed + i, false)
    );
    wood(ctx, ax - w * 0.06, h * 0.5, aw + w * 0.12, h * 0.18, o.base, o.seed + 3, false);
    panel(ctx, ax, h * 0.53, aw, h * 0.12);
    const ac = Math.min(h * 0.4, Math.max(h * 0.2, aw / 2 + 8));
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(ax, h * 0.5);
    ctx.lineTo(ax, ac);
    ctx.arc(w / 2, ac, aw / 2, Math.PI, 0);
    ctx.lineTo(ax + aw, h * 0.5);
    ctx.closePath();
    ctx.clip();
    grain(ctx, ax, ac - aw / 2, aw, h * 0.5 - ac + aw / 2, {
      base: o.base,
      seed: o.seed + 5,
      vertical: true,
      spacing: 3,
      strength: 0.2,
    });
    ctx.restore();
    ctx.strokeStyle = "rgba(45,20,6,.6)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(ax + aw * 0.2, h * 0.5);
    ctx.lineTo(ax + aw * 0.2, ac + 4);
    ctx.arc(w / 2, ac + 4, aw * 0.3, Math.PI, 0);
    ctx.lineTo(ax + aw * 0.8, h * 0.5);
    ctx.stroke();
    ctx.fillStyle = "#B8933F";
    [ax + 4, ax + aw - 10].forEach((cx) => ctx.fillRect(cx, ac, 6, h * 0.5 - ac));
  } else if (o.t === "restore") {
    const dh = h * 0.8,
      dw = dh * 0.42,
      x = (w - dw) / 2,
      y = h * 0.06;
    ctx.fillStyle = "rgba(0,0,0,.18)";
    ctx.fillRect(x + 6, y + 6, dw, dh);
    grain(ctx, x, y, dw / 2, dh, {
      base: "#8F877B",
      line: "#4a443c",
      seed: o.seed,
      vertical: true,
      spacing: 3,
      strength: 0.4,
    });
    grain(ctx, x + dw / 2, y, dw / 2, dh, {
      base: o.base,
      seed: o.seed + 1,
      vertical: true,
      spacing: 3,
      strength: 0.18,
    });
    const px = dw * 0.12;
    panel(ctx, x + px, y + dh * 0.08, dw - px * 2, dh * 0.4);
    panel(ctx, x + px, y + dh * 0.54, dw - px * 2, dh * 0.38);
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(x + dw / 2, y - 6);
    ctx.lineTo(x + dw / 2, y + dh + 6);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = "600 11px sans-serif";
    ctx.fillStyle = "#5A5148";
    ctx.textAlign = "right";
    ctx.fillText("Antes", x - 8, y + 16);
    ctx.textAlign = "left";
    ctx.fillText("Después", x + dw + 8, y + 16);
  }
}
