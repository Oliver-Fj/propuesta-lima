/* Renderizado de las secciones de la propuesta, calculadora de presupuesto, retorno de la inversión y aprobación. */
"use strict";

/* ====== hero grano ====== */
function heroGrain() {
  const cv = $("#heroGrain");
  const { ctx, w, h } = prep(cv);
  grain(ctx, 0, 0, w, h, {
    base: "rgba(0,0,0,0)",
    line: "#E9C89E",
    seed: 3,
    spacing: 7,
    wave: 14,
    strength: 0.5,
  });
}
heroGrain();
let hT;
window.addEventListener("resize", () => {
  clearTimeout(hT);
  hT = setTimeout(heroGrain, 150);
});

/* ====== oportunidad ====== */

$("#oppList").innerHTML = OPP.map(
  ([a, b]) =>
    `<div><span class="a">${a}</span><span class="arrow" aria-hidden="true">→</span><span class="b">${b}</span></div>`
).join("");

/* ====== servicios ====== */

$("#svcList").innerHTML = SVC.map(
  (
    s,
    i
  ) => `<details><summary><span class="n">5.${i + 1}</span><b>${s[0]}</b><span class="pm" aria-hidden="true">+</span><span class="short">${s[1]}</span></summary>
  <dl><div><dt>Trabajo profesional</dt><dd>${s[2]}</dd></div><div><dt>Qué recibe</dt><dd>${s[3]}</dd></div><div><dt>Beneficio</dt><dd>${s[4]}</dd></div></dl></details>`
).join("");

/* ====== beneficios ====== */

function renderBen(f) {
  $("#benList").innerHTML = BEN.filter((b) => f === "all" || b[1] === f)
    .map(
      (b) =>
        `<article><header><h3>${b[0]}</h3><span class="tag ${b[1] === "d" ? "direct" : "opp"}">${b[1] === "d" ? "Directo" : "Oportunidad"}</span></header><p>${b[2]}</p><p class="res"><b>Resultado razonable</b>${b[3]}</p></article>`
    )
    .join("");
}
$$("[data-bf]").forEach(
  (b) =>
    (b.onclick = () => {
      $$("[data-bf]").forEach((x) => x.setAttribute("aria-pressed", x === b));
      renderBen(b.dataset.bf);
    })
);
renderBen("all");

/* ====== logo: comparación, paleta y tipografías ====== */
$("#logoVec").innerHTML = logoSVG("demo-");
function zoomLogo() {
  const z = +$("#zoomR").value;
  $("#zoomO").textContent = z + "×";
  const width = 150 * z + "px";
  $("#logoRaster").style.width = width;
  $("#logoVec").style.width = width;
}
$("#zoomR").addEventListener("input", zoomLogo);
zoomLogo();

$("#palette").innerHTML = BRAND.palette
  .map(
    (c) => `<div class="swatch"><div class="chip" style="--c:${c.hex}"></div><div class="meta">
      <b>${c.name}</b><code>${c.hex}</code><code>RGB ${c.rgb}</code><code>CMYK ${c.cmyk}</code>
      <span class="use">${c.use}</span></div></div>`
  )
  .join("");
$("#fonts").innerHTML = BRAND.fonts
  .map(
    (
      f
    ) => `<div class="font-card"><span class="sample" style="font-family:${f.family};font-weight:${f.weight}">${f.sample}</span>
      <b>${f.name}</b><small>${f.use}</small></div>`
  )
  .join("");

/* ====== paquetes ====== */

$("#pkList").innerHTML = Object.entries(PKG)
  .map(
    ([
      k,
      p,
    ]) => `<article class="${k === "comercial" ? "rec" : ""}">${k === "comercial" ? '<span class="rib">Recomendado</span>' : ""}
  <h3>${p.name}</h3><p class="obj-t">${PK_DETAIL[k].obj}</p><p class="pr">${p.range}<small>precio estimado · pago único</small></p>
  <ul>${PK_DETAIL[k].inc.map((x) => `<li>${x}</li>`).join("")}${PK_DETAIL[k].exc.map((x) => `<li class="no">No incluye: ${x}</li>`).join("")}</ul>
  <div class="meta"><span>Plazo: ${p.time}</span><span>Logo, fotos, dominio y hosting aparte</span></div>
  <button class="btn ${k === "comercial" ? "wood" : "ghost"}" data-pick="${k}">Elegir ${p.name}</button></article>`
  )
  .join("");

const cell = (v) =>
  v === "y" ? '<span class="y">Sí</span>' : v === "n" ? '<span class="x">No</span>' : v;
$("#cmpTable").innerHTML =
  `<thead><tr><th>Incluye</th><th>Básico</th><th class="hi">Comercial</th><th>Avanzado</th></tr></thead><tbody>${CMP.map((r) => `<tr><td>${r[0]}</td><td>${cell(r[1])}</td><td class="hi">${cell(r[2])}</td><td>${cell(r[3])}</td></tr>`).join("")}</tbody>`;

/* ====== calculadora ====== */
$("#pkPick").innerHTML = Object.entries(PKG)
  .map(
    ([k, p]) =>
      `<label><input type="radio" name="pkg" value="${k}" ${k === "comercial" ? "checked" : ""}><b>${p.name}</b><span>${money(p.price)}</span></label>`
  )
  .join("");
$("#logoSel").innerHTML = LOGO.map(
  (l) =>
    `<option value="${l.k}" ${l.k === LOGO_DEFAULT ? "selected" : ""}>${l.label}${l.price ? " · " + money(l.price) : ""}</option>`
).join("");
$("#addonList").innerHTML = ADDONS.map(
  (a) =>
    `<label class="line"><input type="checkbox" class="addon" value="${a.k}"><span class="tx">${a.label}<small>${a.sub}</small></span><span class="am">${money(a.price)}</span></label>`
).join("");
$("#monthlyList").innerHTML = MONTHLY.map(
  (m) =>
    `<label class="line"><input type="checkbox" class="monthly" value="${m.k}" ${m.on ? "checked" : ""}><span class="tx">${m.label}<small>${m.sub}</small></span><span class="am">${money(m.price)}/mes</span></label>`
).join("");
$("#domAm").textContent = money(YEARLY.dominio) + "/año";
$("#hostAm").textContent = money(YEARLY.hosting) + "/año";
const CALC = {};
function calc() {
  const pk = $("input[name=pkg]:checked").value,
    lg = LOGO.find((l) => l.k === $("#logoSel").value);
  const adds = $$(".addon:checked").map((c) => ADDONS.find((a) => a.k === c.value));
  const extra = Math.max(0, Math.floor(+$("#extraProd").value || 0));
  const mons = $$(".monthly:checked").map((c) => MONTHLY.find((m) => m.k === c.value));
  const igv = $("input[name=tax]:checked").value === "igv" ? 1.18 : 1;
  $("#extraAm").textContent = money(extra * PER_PRODUCT);
  const once = [["Paquete " + PKG[pk].name, PKG[pk].price]];
  if (lg.price) once.push([lg.label, lg.price]);
  adds.forEach((a) => once.push([a.label, a.price]));
  if (extra) once.push([`${extra} productos adicionales`, extra * PER_PRODUCT]);
  const onceT = once.reduce((s, x) => s + x[1], 0) * igv;
  const yearT = YEARLY.dominio + YEARLY.hosting;
  const monT = mons.reduce((s, m) => s + m.price, 0) * igv;
  const first = onceT + yearT + monT * 12;
  Object.assign(CALC, {
    pk,
    lg,
    adds,
    extra,
    mons,
    igv,
    onceT,
    yearT,
    monT,
    first,
    next: yearT + monT * 12,
  });
  $("#items").innerHTML =
    `<div class="grp">Pago único</div>${once.map(([a, b]) => `<div><span>${a}</span><span>${money(b)}</span></div>`).join("")}
    <div class="grp">Anual (proveedores)</div><div><span>Dominio</span><span>${money(YEARLY.dominio)}</span></div><div><span>Hosting</span><span>${money(YEARLY.hosting)}</span></div>
    ${mons.length ? `<div class="grp">Mensual</div>${mons.map((m) => `<div><span>${m.label}</span><span>${money(m.price)}</span></div>`).join("")}` : ""}
    ${igv > 1 ? `<div class="grp">Impuestos</div><div><span>IGV 18 % sobre servicios profesionales</span><span>incluido</span></div>` : ""}`;
  $("#tOnce").textContent = money(onceT);
  $("#tYear").textContent = money(yearT) + "/año";
  $("#tMonth").textContent = money(monT) + "/mes";
  $("#tFirst").textContent = money(first);
  $("#tNext").textContent = money(CALC.next) + "/año";
  roi();
  approveSum();
}
$("#presupuesto").addEventListener("input", calc);
$("#presupuesto").addEventListener("change", calc);
$$("[data-pick]").forEach(
  (b) =>
    (b.onclick = () => {
      $(`input[name=pkg][value=${b.dataset.pick}]`).checked = true;
      calc();
      $("#presupuesto").scrollIntoView({ behavior: "smooth" });
    })
);

/* ====== servicios adicionales ====== */

$("#addTable").innerHTML =
  `<thead><tr><th>Servicio</th><th>Qué aporta</th><th>Cuándo conviene</th><th>Tipo</th><th class="r">Rango orientativo</th></tr></thead><tbody>${ADD.map((r) => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td><span class="costtype ${CT[r[3]][0]}">${CT[r[3]][1]}</span></td><td class="r num">${r[4]}</td></tr>`).join("")}</tbody>`;

$$("table.stack").forEach((t) => {
  const hs = $$("thead th", t).map((th) => th.textContent);
  $$("tbody tr", t).forEach((tr) =>
    [...tr.children].forEach((td, i) => (td.dataset.l = hs[i] || ""))
  );
});

/* ====== cronograma ====== */

$("#gantt").innerHTML =
  `<div></div><div class="axis">${[1, 2, 3, 4, 5, 6].map((n) => `<span>Sem. ${n}</span>`).join("")}</div>` +
  GANTT.map(
    (g, i) =>
      `<div class="lbl"><i>${String(i + 1).padStart(2, "0")}</i><span>${g[0]}<em class="dd"> · ${g[2]} d</em></span></div><div class="trk"><div class="bar ${g[3] === "cl" ? "cl" : g[3] === "both" ? "both" : ""}" style="left:${(g[1] / GMAX) * 100}%;width:${(g[2] / GMAX) * 100}%">${g[2]} d</div></div>`
  ).join("");

/* ====== ROI ====== */

$("#roiInputs").innerHTML = RI.map(
  (r) =>
    `<div class="sl"><div class="top"><label for="ri_${r.k}">${r.label}</label><output id="ro_${r.k}">${r.f(r.v)}</output></div><input type="range" id="ri_${r.k}" min="${r.min}" max="${r.max}" step="${r.step}" value="${r.v}"></div>`
).join("");
$("#roiInputs").addEventListener("input", roi);
function roi() {
  const g = (k) => +$("#ri_" + k).value;
  RI.forEach((r) => ($("#ro_" + r.k).textContent = r.f(g(r.k))));
  const sales = (g("q") * g("c")) / 100,
    ingresos = sales * g("t") * 12,
    margen = (ingresos * g("m")) / 100,
    ahorro = g("h") * g("w") * 12;
  const ben = margen + ahorro,
    cost = CALC.first || 0,
    net = ben - cost,
    pct = cost ? (net / cost) * 100 : 0;
  const el = $("#roiPct");
  el.textContent = (pct > 0 ? "+" : "") + Math.round(pct) + " %";
  el.className = pct >= 0 ? "pos" : "neg";
  const mx = Math.max(ben, cost, 1);
  $("#barCost").style.width = (cost / mx) * 100 + "%";
  $("#barCost").textContent = money(cost);
  $("#barBen").style.width = (ben / mx) * 100 + "%";
  $("#barBen").textContent = money(ben);
  $("#roiKv").innerHTML =
    `<span>Ventas atribuibles al mes</span><b>${sales.toFixed(1)}</b><span>Ingresos atribuibles al año</span><b>${money(ingresos)}</b><span>Ganancia (margen) al año</span><b>${money(margen)}</b><span>Ahorro de tiempo al año</span><b>${money(ahorro)}</b><span>Resultado neto primer año</span><b>${money(net)}</b>`;
  const perSale = (g("t") * g("m")) / 100;
  $("#roiBE").textContent =
    perSale > 0
      ? `Cada venta deja ${money(perSale)} de margen: el costo del primer año se cubriría con unas ${Math.ceil(cost / perSale)} ventas atribuibles a la web en el año, sin contar el ahorro de tiempo.`
      : "";
}

/* ====== condiciones ====== */

$("#condList").innerHTML = COND.map(
  (c) => `<div><b>${c[0]}</b><p>${c[1]}</p><span><span class="ph">${c[2]}</span></span></div>`
).join("");

/* ====== aprobación ====== */
function approveSum() {
  if (!CALC.pk) return;
  const v = (id) => ($("#" + id).value || "").trim();
  const extras = [
    CALC.lg.price ? CALC.lg.label : null,
    ...CALC.adds.map((a) => a.label),
    CALC.extra ? CALC.extra + " productos adicionales" : null,
  ].filter(Boolean);
  $("#aSum").textContent = `CONFIRMACIÓN DE PROPUESTA WEB
Cliente: ${v("aNombre") || "[NOMBRE DEL CLIENTE]"}
Empresa: ${v("aEmpresa") || CONFIG.empresa}
RUC: ${v("aRuc") || "[RUC]"}

Paquete seleccionado: ${PKG[CALC.pk].name}
Servicios adicionales autorizados: ${extras.length ? extras.join("; ") : "ninguno"}
Servicios mensuales: ${CALC.mons.length ? CALC.mons.map((m) => m.label).join("; ") : "ninguno"}

Inversión inicial: ${money(CALC.onceT)}${CALC.igv > 1 ? " (incluye IGV)" : " (sin impuestos)"}
Anual a proveedores: ${money(CALC.yearT)}
Mensual: ${money(CALC.monT)}
Total primer año: ${money(CALC.first)}
${v("aCom") ? "\nComentarios: " + v("aCom") + "\n" : ""}
Fecha: ${new Date().toLocaleDateString("es-PE")}
Acepto la propuesta: ____________________`;
  const wa = $("#aWa");
  if (CONFIG.miWhatsapp) {
    wa.href =
      "https://wa.me/" +
      CONFIG.miWhatsapp.replace(/\D/g, "") +
      "?text=" +
      encodeURIComponent($("#aSum").textContent);
    wa.hidden = false;
  }
}
$("#aForm").addEventListener("input", approveSum);
$("#aForm").addEventListener("submit", (e) => {
  e.preventDefault();
  approveSum();
  $("#aSum").scrollIntoView({ behavior: "smooth", block: "center" });
});
$("#aCopy").onclick = () => {
  const txt = $("#aSum").textContent,
    msg = $("#aCopied");
  const sel = () => {
    const r = document.createRange();
    r.selectNodeContents($("#aSum"));
    const s = getSelection();
    s.removeAllRanges();
    s.addRange(r);
    msg.textContent = "Texto seleccionado: cópielo con Ctrl+C.";
  };
  try {
    navigator.clipboard.writeText(txt).then(() => (msg.textContent = "Copiado."), sel);
  } catch (_) {
    sel();
  }
};
calc();
