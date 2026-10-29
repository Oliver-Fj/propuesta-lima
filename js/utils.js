/* Utilidades compartidas: selectores, formato de moneda, generador aleatorio con semilla y textura de madera en canvas. */
"use strict";

/* ====== utilidades ====== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const money = (n) =>
  "S/ " +
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const esc = (s) =>
  String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]
  );
$$("[data-f]").forEach((el) => {
  el.textContent = CONFIG[el.dataset.f] || "";
});

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function prep(cv) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.max(1, cv.clientWidth),
    h = Math.max(1, cv.clientHeight);
  cv.width = Math.round(w * dpr);
  cv.height = Math.round(h * dpr);
  const ctx = cv.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h };
}
function grain(ctx, x, y, w, h, o) {
  const r = rng(o.seed || 7);
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.fillStyle = o.base;
  ctx.fillRect(x, y, w, h);
  const vert = !!o.vertical,
    L = vert ? h : w,
    S = vert ? w : h;
  const n = Math.max(8, Math.round(S / (o.spacing || 4.5)));
  ctx.strokeStyle = o.line || "#5a3417";
  for (let i = 0; i < n; i++) {
    const off = ((i + r() * 0.7) * S) / n;
    const a1 = 1 + r() * (o.wave || 5),
      f1 = 0.004 + r() * 0.012,
      p1 = r() * 6.28,
      a2 = r() * 1.6,
      f2 = 0.02 + r() * 0.05,
      p2 = r() * 6.28;
    ctx.beginPath();
    for (let t = -4; t <= L + 4; t += 4) {
      const d = off + a1 * Math.sin(t * f1 + p1) + a2 * Math.sin(t * f2 + p2);
      if (vert) {
        t === -4 ? ctx.moveTo(x + d, y + t) : ctx.lineTo(x + d, y + t);
      } else {
        t === -4 ? ctx.moveTo(x + t, y + d) : ctx.lineTo(x + t, y + d);
      }
    }
    ctx.globalAlpha = 0.06 + r() * (o.strength || 0.22);
    ctx.lineWidth = 0.5 + r() * 1.6;
    ctx.stroke();
  }
  if (o.knot) {
    const kx = x + w * (0.25 + r() * 0.5),
      ky = y + h * (0.25 + r() * 0.5);
    for (let k = 1; k < 7; k++) {
      ctx.globalAlpha = 0.18;
      ctx.beginPath();
      ctx.ellipse(kx, ky, k * (vert ? 2.2 : 5), k * (vert ? 5 : 2.2), 0, 0, 6.29);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;
  ctx.restore();
}
