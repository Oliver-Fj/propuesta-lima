/* Maqueta navegable del sitio: vistas, navegación, WhatsApp de demostración y formulario de cotización. */
"use strict";

/* ====== maqueta del sitio ====== */
const WA_ICON =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z"/></svg>';
$(".s-fab").innerHTML = WA_ICON;
const site = $("#site"),
  device = $("#device");
const S = { view: "home", arg: null, quote: [], menu: false, sent: null };
const ph = (k) => `<span class="s-ph">${esc(CONFIG[k])}</span>`;

function header() {
  const n = S.quote.length,
    cur = S.view === "catalogo" && S.arg ? "catalogo:" + S.arg : S.view;
  const nav = [
    ["home", "Inicio"],
    ["catalogo:madera", "Maderas"],
    ["catalogo:puertas", "Puertas"],
    ["catalogo:muebles", "Muebles"],
    ["nosotros", "Nosotros"],
    ["cotizar", "Cotizar"],
    ["contacto", "Contacto"],
  ];
  return `<header class="s-head ${S.menu ? "open" : ""}">
    <button class="s-brand" data-go="home"><span class="s-logo">${logoSVG("hd-")}</span><span class="s-bn"><span class="s-name">${esc(CONFIG.marca)}</span><small>Desde 1999 · Fabricantes</small></span></button>
    <button class="s-burger" data-menu>${S.menu ? "Cerrar" : "Menú"}</button>
    <nav class="s-nav">${nav.map(([gg, t]) => `<button data-go="${gg}" class="${cur === gg ? "on" : ""} ${gg === "cotizar" ? "s-cart" : ""}">${t}${gg === "cotizar" && n ? `<b>${n}</b>` : ""}</button>`).join("")}</nav>
    <button class="s-wa" data-wa="general">${WA_ICON}WhatsApp</button>
  </header>`;
}
const banner = `<div class="s-banner">Maqueta de propuesta · imágenes ilustrativas, se reemplazan por fotos reales</div>`;
const footer = () =>
  `<footer class="s-foot"><span>© ${esc(CONFIG.anio)} ${esc(CONFIG.empresa)} · RUC ${esc(CONFIG.ruc)}</span><span>Fabricantes · venta por mayor · atención a nivel nacional</span></footer>`;
const priceTxt = (p) =>
  p.unit === "serv"
    ? "Cotización a pedido"
    : p.unit === "pt"
      ? "Precio por pie tablar · consultar"
      : "Consultar precio";

function card(p) {
  return `<article class="s-card"><div class="img" data-go="ficha:${p.id}"><canvas data-prod="${p.id}"></canvas><span class="s-ex">Ilustración</span></div>
    <div class="b"><h4>${esc(p.name)}</h4><span class="s-dim">${esc(p.dim)}</span><span class="s-price">${priceTxt(p)}</span>
    <div class="acts"><button class="s-ficha-btn" data-go="ficha:${p.id}">Ver ficha</button><button class="s-wa-sm" data-wa="${p.id}">WhatsApp</button></div></div></article>`;
}

const VIEWS = {
  home() {
    return `<section class="s-hero"><canvas id="sHeroCv"></canvas><div class="in">
      <span class="s-kick">Desde 1999 · ${esc(CONFIG.empresa)}</span>
      <h1>Madera, puertas y muebles de fabricación propia</h1>
      <p>Somos fabricantes. Venta de madera por mayor, puertas y muebles para hogares, empresas e instituciones públicas y privadas, a nivel nacional.</p>
      <div class="s-btns"><button class="s-btn" data-go="catalogo">Ver catálogo</button><button class="s-btn l" data-go="cotizar:inst">Cotización por mayor</button></div></div></section>
      <div class="s-strip"><span><b>Fabricantes</b></span><span><b>Venta por mayor</b></span><span><b>Atención a nivel nacional</b></span><span>Teléfono ${esc(CONFIG.telefono)}</span></div>
      <div class="s-sec"><h2 class="s-h">Nuestras líneas</h2><p class="s-sub">Elija una categoría para ver productos y medidas.</p>
      <div class="s-cats">${Object.entries(CATS)
        .map(
          ([k, c]) =>
            `<button class="s-cat" data-go="catalogo:${k}"><canvas data-cat="${k}"></canvas><span>${c.name}<small>${c.sub}</small></span></button>`
        )
        .join("")}</div></div>
      <div class="s-sec s-sec-flush"><h2 class="s-h">Maderas que trabajamos</h2><p class="s-sub">Venta por pie tablar, en piezas estándar o habilitadas a pedido.</p>
      <div class="s-species">${SPECIES.map(([k, n, c]) => `<button data-go="ficha:m-${k}"><i style="--c:${c}"></i>${n}</button>`).join("")}</div></div>
      <div class="s-sec s-sec-flush"><h2 class="s-h">Destacados</h2><p class="s-sub">Una muestra de lo que fabricamos y vendemos.</p>
      <div class="s-grid">${["d-tallada", "f-comedor", "m-cedro", "e-escolar"].map((id) => card(byId(id))).join("")}</div></div>
      <section class="s-inst"><div class="s-sec"><h2 class="s-h">Proveedor de instituciones públicas y privadas</h2>
      <p class="s-sub">Atendemos pedidos por volumen para colegios, hospitales, condominios y empresas, con envíos a nivel nacional. RUC ${esc(CONFIG.ruc)}.</p>
      <div class="s-instg"><button data-go="ficha:d-inst"><b>Puertas para colegios y hospitales</b><span>Medidas según requerimiento o expediente</span></button><button data-go="ficha:e-escolar"><b>Mobiliario escolar</b><span>Carpetas, mesas y sillas por volumen</span></button><button data-go="ficha:d-condo"><b>Puertas para condominios</b><span>Ingresos y áreas comunes</span></button></div>
      <div class="s-btns s-mt"><button class="s-btn" data-go="cotizar:inst">Solicitar cotización institucional</button></div></div></section>
      <div class="s-sec"><h2 class="s-h">Trabajos realizados</h2><p class="s-sub">Aquí irán fotos reales de altares, puertas talladas y restauraciones hechas por la empresa.</p>
      <div class="s-gal">${[
        ["s-altar", "Altar tallado"],
        ["d-tallada", "Puerta tallada de ingreso"],
        ["s-rest", "Restauración"],
      ]
        .map(
          ([id, t]) =>
            `<figure data-go="ficha:${id}"><canvas data-prod="${id}"></canvas><figcaption>${t} <span class="s-ph">[foto real]</span></figcaption></figure>`
        )
        .join("")}</div></div>
      <div class="s-sec s-sec-flush"><h2 class="s-h">Cotice en 3 pasos</h2><p class="s-sub">Por unidad o por mayor.</p>
      <div class="s-steps"><div><b>Elija el producto</b><br>Revise especies, modelos y medidas en el catálogo.</div><div><b>Indique cantidades</b><br>Pies tablares, unidades o juegos, y el lugar de entrega.</div><div><b>Reciba su cotización</b><br>Le respondemos por WhatsApp o correo con precio y plazo.</div></div></div>
      ${footer()}`;
  },
  catalogo(cat) {
    const list = PRODUCTS.filter((p) => !cat || p.cat === cat);
    return `<div class="s-sec"><h2 class="s-h">${cat ? CATS[cat].name : "Catálogo"}</h2><p class="s-sub">${list.length} productos · precios por WhatsApp o cotización.</p>
      <div class="s-chips"><button class="${!cat ? "on" : ""}" data-go="catalogo">Todos</button>${Object.entries(
        CATS
      )
        .map(
          ([k, c]) =>
            `<button class="${cat === k ? "on" : ""}" data-go="catalogo:${k}">${c.name}</button>`
        )
        .join("")}</div>
      <div class="s-grid">${list.map(card).join("")}</div></div>${footer()}`;
  },
  ficha(id) {
    const p = byId(id),
      isPt = p.unit === "pt",
      serv = p.unit === "serv";
    return `<div class="s-sec"><div class="s-crumb"><button data-go="catalogo">Catálogo</button> / <button data-go="catalogo:${p.cat}">${CATS[p.cat].name}</button> / ${esc(p.name)}</div>
      <div class="s-ficha"><canvas data-prod="${p.id}" data-big="1"></canvas>
      <div><h2 class="s-h">${esc(p.name)}</h2><span class="s-dim">${esc(p.dim)}</span>
      <table class="s-specs">${p.specs.map(([a, b]) => `<tr><td>${a}</td><td>${esc(b)}</td></tr>`).join("")}<tr><td>Precio</td><td>${serv ? "Según evaluación" : "Consultar · se publica si la empresa lo autoriza"}</td></tr></table>
      ${serv ? "" : `<div class="s-qty"><label for="sQty"><b>${isPt ? "Pies tablares" : p.unit === "juego" ? "Juegos" : "Cantidad"}</b></label><input id="sQty" type="number" min="1" value="${isPt ? 100 : 1}"> <span class="s-pt" id="sPt"></span></div>`}
      <div class="s-btns"><button class="s-btn s-btn-wa" data-wa="${p.id}">Consultar por WhatsApp</button><button class="s-btn o" data-add="${p.id}">Agregar a cotización</button></div>
      <p class="s-sub s-share">Enlace para compartir: ${esc(CONFIG.dominio)}/${p.id}</p></div></div></div>${footer()}`;
  },
  cotizar(arg) {
    if (S.sent)
      return `<div class="s-sec"><div class="s-ok"><b>Solicitud recibida (demostración)</b><p class="s-ok-sub">Así le llegaría a la empresa por correo o WhatsApp:</p><pre>${esc(S.sent)}</pre></div>
      <div class="s-btns s-mt"><button class="s-btn o" data-reset>Nueva cotización</button><button class="s-btn" data-go="catalogo">Seguir viendo productos</button></div></div>${footer()}`;
    const inst = arg === "inst";
    const rows = S.quote
      .map((q, i) => {
        const p = byId(q.id);
        return `<div class="s-qrow"><span><b>${esc(p.name)}</b><br><span class="s-dim">${p.unit === "pt" ? "pies tablares" : p.unit === "serv" ? "a evaluar" : esc(p.dim)}</span></span>${p.unit === "serv" ? "<span></span>" : `<input type="number" min="1" value="${q.qty}" data-qi="${i}" aria-label="Cantidad">`}<button type="button" data-qrm="${i}" aria-label="Quitar">✕</button></div>`;
      })
      .join("");
    const tipos = ["Persona natural", "Empresa", "Institución pública", "Institución privada"];
    return `<div class="s-sec"><h2 class="s-h">${inst ? "Cotización institucional y por mayor" : "Solicitar cotización"}</h2><p class="s-sub">Indique productos, cantidades y lugar de entrega. Le respondemos con precio y plazo.</p>
      <form class="s-form" id="sForm">
        <label>Tipo de cliente<select id="sTipo">${tipos.map((t) => `<option ${inst && t === "Institución pública" ? "selected" : ""}>${t}</option>`).join("")}</select></label>
        <label>RUC o DNI<input id="sRuc" inputmode="numeric" value="${inst ? "20XXXXXXXXX (ejemplo)" : ""}" placeholder="Opcional"></label>
        <div class="full">${rows || `<p class="s-sub s-flush">Aún no agregó productos. Elija uno aquí o desde el catálogo.</p>`}
          <div class="s-addrow"><select id="sAddSel">${Object.entries(CATS)
            .map(
              ([k, c]) =>
                `<optgroup label="${c.name}">${PRODUCTS.filter((p) => p.cat === k)
                  .map((p) => `<option value="${p.id}">${esc(p.name)}</option>`)
                  .join("")}</optgroup>`
            )
            .join(
              ""
            )}</select><button type="button" class="s-btn o" id="sAddBtn">Agregar</button></div></div>
        <label class="full">Detalle del pedido<textarea id="sMed" rows="2" placeholder="Medidas, especie, acabado, plazos o especificaciones técnicas">${inst ? "Ej.: 40 puertas para aulas de 0.90 × 2.10 m con visor" : ""}</textarea></label>
        <label>${inst ? "Institución o empresa" : "Nombre"}<input id="sNom" value="${inst ? "I.E. Ejemplo (demostración)" : "Juan Pérez (ejemplo)"}"></label>
        <label>Celular<input id="sCel" value="987 654 321"></label>
        <label>Ciudad o distrito de entrega<input id="sDis" value="${inst ? "Arequipa (ejemplo)" : "Lima (ejemplo)"}"></label>
        <label>¿Cómo prefiere la respuesta?<select id="sPref"><option>WhatsApp</option><option>Correo</option><option>Llamada</option></select></label>
        <div class="full"><button class="s-btn" type="submit">Enviar solicitud</button></div>
      </form></div>${footer()}`;
  },
  contacto() {
    return `<div class="s-sec"><h2 class="s-h">Contacto y ubicación</h2><p class="s-sub">Atención a nivel nacional.</p>
      <div class="s-contact"><div class="s-map"><canvas id="sMap"></canvas></div>
      <div><dl class="s-dl"><dt>Empresa</dt><dd>${esc(CONFIG.empresa)}</dd><dt>RUC</dt><dd>${esc(CONFIG.ruc)}</dd><dt>Dirección</dt><dd>${ph("direccion")}</dd><dt>Teléfono</dt><dd>${ph("telefono")}</dd><dt>WhatsApp</dt><dd>${ph("whatsapp")}</dd><dt>Horario</dt><dd>${ph("horario")}</dd></dl>
      <div class="s-btns s-mt"><button class="s-btn s-btn-wa" data-wa="general">Escribir por WhatsApp</button><button class="s-btn o">Cómo llegar</button></div></div></div></div>${footer()}`;
  },
  nosotros() {
    return `<div class="s-sec s-nos"><h2 class="s-h">Nosotros</h2>
      <p><b>${esc(CONFIG.empresa)}</b> es una empresa fabricante que, desde 1999, se dedica a la venta de madera y a la fabricación de muebles y puertas.</p>
      <p>Proveemos a instituciones públicas y privadas a nivel nacional y atendemos ventas por mayor: maderas como cedro, tornillo, ishpingo, moena, copaiba, huayruru, cumala, nogal y roble; puertas talladas, institucionales y contraplacadas; muebles de comedor, dormitorio, sala y melamina; mobiliario escolar; fabricación de altares y restauración.</p>
      <div class="s-facts"><div><small>Desde</small><b>1999</b></div><div><small>RUC</small><b>${esc(CONFIG.ruc)}</b></div><div><small>Actividades</small><b>Silvicultura y extracción de madera · Fabricación de muebles</b></div><div><small>Alcance</small><b>Nacional</b></div></div>
      <p><span class="s-ph">[Historia de la empresa desde 1999, si desea incluirla]</span></p>
      <div class="s-btns"><button class="s-btn" data-go="catalogo">Ver productos</button><button class="s-btn o" data-go="cotizar:inst">Cotización por mayor</button></div></div>${footer()}`;
  },
};

function render() {
  site.innerHTML = header() + banner + `<main>${VIEWS[S.view](S.arg)}</main>`;
  paintSite();
  if (S.view === "ficha") updPt();
}
function paintSite() {
  $$("canvas[data-prod]", site).forEach((cv) => drawProduct(cv, byId(cv.dataset.prod)));
  const catImg = {
    madera: "m-cedro",
    puertas: "d-tallada",
    muebles: "f-comedor",
    escolar: "e-escolar",
    servicios: "s-altar",
  };
  $$("canvas[data-cat]", site).forEach((cv) => drawProduct(cv, byId(catImg[cv.dataset.cat])));
  const hc = $("#sHeroCv", site);
  if (hc) {
    const { ctx, w, h } = prep(hc);
    const bh = h / 5;
    for (let i = 0; i < 5; i++)
      grain(ctx, 0, i * bh, w, bh - 2, {
        base: ["#7A4A26", "#8B5730", "#6E4220", "#946035", "#7F4E2A"][i],
        line: "#2c1608",
        seed: 100 + i,
        spacing: 3.5,
        strength: 0.3,
        knot: i === 2,
      });
  }
  const mp = $("#sMap", site);
  if (mp) {
    const { ctx, w, h } = prep(mp);
    ctx.fillStyle = "#EAE6DE";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 10;
    [
      [0, h * 0.35, w, h * 0.3],
      [w * 0.3, 0, w * 0.38, h],
      [0, h * 0.75, w, h * 0.8],
    ].forEach(([a, b, c, d]) => {
      ctx.beginPath();
      ctx.moveTo(a, b);
      ctx.lineTo(c, d);
      ctx.stroke();
    });
    ctx.lineWidth = 4;
    for (let i = 1; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo((i * w) / 8, 0);
      ctx.lineTo((i * w) / 8 + 20, h);
      ctx.stroke();
    }
    ctx.fillStyle = "#CFE3C8";
    ctx.fillRect(w * 0.62, h * 0.45, w * 0.2, h * 0.2);
    const px = w * 0.5,
      py = h * 0.52;
    ctx.fillStyle = "#B86F30";
    ctx.beginPath();
    ctx.arc(px, py - 16, 11, Math.PI, 0);
    ctx.lineTo(px, py);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(px, py - 16, 4, 0, 6.29);
    ctx.fill();
    ctx.fillStyle = "#555";
    ctx.font = "12px sans-serif";
    ctx.fillText("Mapa de ubicación (Google Maps)", 12, h - 12);
  }
}
function qtyFor(id) {
  const p = byId(id),
    q = $("#sQty", site);
  return S.view === "ficha" && S.arg === id && q
    ? Math.max(1, +q.value || 1)
    : p.unit === "pt"
      ? 100
      : 1;
}
function updPt() {
  const p = byId(S.arg),
    out = $("#sPt", site);
  if (!out) return;
  out.textContent = p.unit === "pt" ? `≈ ${(qtyFor(p.id) * PT_M3).toFixed(2)} m³` : "";
}
function go(target) {
  const [v, a] = target.split(":");
  S.view = v;
  S.arg = a || null;
  S.menu = false;
  if (v !== "cotizar") S.sent = null;
  render();
  site.scrollTop = 0;
}
function waMsg(id) {
  if (id === "general") return `Hola, ${CONFIG.marca}. Quisiera información sobre sus productos.`;
  const p = byId(id),
    q = qtyFor(id);
  if (p.unit === "serv")
    return `Hola, quisiera información sobre ${p.name.toLowerCase()}. ¿Podemos coordinar una evaluación?`;
  if (p.unit === "pt")
    return `Hola, quisiera cotizar ${q} pies tablares de ${p.name.toLowerCase()}. ¿Tienen disponibilidad?`;
  const u = p.unit === "juego" ? (q > 1 ? "juegos" : "juego") : q > 1 ? "unidades" : "unidad";
  return `Hola, quisiera cotizar ${q} ${u} de ${p.name.toLowerCase()}. ¿Me envían precio y plazo de entrega?`;
}
function showWA(id) {
  const ov = $("#waOv");
  ov.innerHTML = `<div class="wa-box" role="dialog" aria-label="Vista previa de WhatsApp"><div class="wa-top"><span class="av">${logoSVG("wa-")}</span><div>${esc(CONFIG.marca)}<small>${esc(CONFIG.whatsapp)}</small></div><button id="waX" aria-label="Cerrar">×</button></div>
    <div class="wa-body"><div class="wa-note">Mensaje preparado automáticamente por la web</div><div class="wa-msg">${esc(waMsg(id))}</div><div class="wa-note">Demostración: en la web real se abre WhatsApp con este texto y el cliente decide enviarlo.</div></div>
    <div class="wa-in"><span>Escribe un mensaje</span><i></i></div></div>`;
  ov.hidden = false;
  $("#waX").focus();
}
device.addEventListener("click", (e) => {
  const t = e.target.closest(
    "[data-go],[data-wa],[data-add],[data-menu],[data-qrm],[data-reset],#sAddBtn,#waX"
  );
  if (e.target.id === "waOv" || (t && t.id === "waX")) {
    $("#waOv").hidden = true;
    return;
  }
  if (!t) return;
  if (t.dataset.go) {
    go(t.dataset.go);
  } else if (t.dataset.wa) {
    showWA(t.dataset.wa);
  } else if (t.dataset.add) {
    const q = qtyFor(t.dataset.add);
    const ex = S.quote.find((x) => x.id === t.dataset.add);
    ex ? (ex.qty += q) : S.quote.push({ id: t.dataset.add, qty: q });
    go("cotizar");
  } else if (t.hasAttribute("data-menu")) {
    S.menu = !S.menu;
    render();
  } else if (t.dataset.qrm) {
    S.quote.splice(+t.dataset.qrm, 1);
    render();
  } else if (t.hasAttribute("data-reset")) {
    S.sent = null;
    S.quote = [];
    render();
  } else if (t.id === "sAddBtn") {
    const id = $("#sAddSel", site).value,
      p = byId(id);
    const ex = S.quote.find((x) => x.id === id);
    ex
      ? (ex.qty += p.unit === "pt" ? 100 : 1)
      : S.quote.push({ id, qty: p.unit === "pt" ? 100 : 1 });
    render();
  }
});
site.addEventListener("input", (e) => {
  if (e.target.id === "sQty") updPt();
  if (e.target.dataset.qi) S.quote[+e.target.dataset.qi].qty = Math.max(1, +e.target.value || 1);
});
site.addEventListener("submit", (e) => {
  e.preventDefault();
  const v = (id) => ($("#" + id, site)?.value || "").trim();
  const lines = S.quote.map((q) => {
    const p = byId(q.id);
    return p.unit === "pt"
      ? `• ${q.qty} pies tablares de ${p.name.toLowerCase()} (≈ ${(q.qty * PT_M3).toFixed(2)} m³)`
      : p.unit === "serv"
        ? `• ${p.name} (a evaluar)`
        : `• ${q.qty} × ${p.name}`;
  });
  if (v("sMed")) lines.push(`• Detalle: ${v("sMed")}`);
  S.sent = `NUEVA SOLICITUD DE COTIZACIÓN\nTipo de cliente: ${v("sTipo")}${v("sRuc") ? "\nRUC/DNI: " + v("sRuc") : ""}\nCliente: ${v("sNom")}\nCelular: ${v("sCel")}\nEntrega: ${v("sDis")}\nResponder por: ${v("sPref")}\n\n${lines.length ? lines.join("\n") : "• (sin productos indicados)"}`;
  render();
  site.scrollTop = 0;
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") $("#waOv").hidden = true;
});
function setMode(m) {
  device.dataset.mode = m;
  $("#mDesk").setAttribute("aria-pressed", m === "desktop");
  $("#mMob").setAttribute("aria-pressed", m === "mobile");
  S.menu = false;
  setTimeout(render, 380);
  render();
}
$("#mDesk").onclick = () => setMode("desktop");
$("#mMob").onclick = () => setMode("mobile");
$$("[data-tour]").forEach(
  (b) =>
    (b.onclick = () => {
      const [v, a] = b.dataset.tour.split(":");
      if (v === "wa") {
        go("ficha:" + a);
        showWA(a);
      } else go(b.dataset.tour);
      device.scrollIntoView({ behavior: "smooth", block: "nearest" });
    })
);
let rT;
new ResizeObserver(() => {
  clearTimeout(rT);
  rT = setTimeout(paintSite, 120);
}).observe(site);
if (window.matchMedia && matchMedia("(max-width: 700px)").matches) {
  device.dataset.mode = "mobile";
  $("#mDesk").setAttribute("aria-pressed", "false");
  $("#mMob").setAttribute("aria-pressed", "true");
}
render();
