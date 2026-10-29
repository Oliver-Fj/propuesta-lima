/* Datos editables: empresa, contacto y precios de referencia (S/). */
"use strict";

/* ====== Datos de la empresa y del profesional ====== */
const CONFIG = {
  empresa: "GRUPO FORESTAL LIMA JL S.A.C.",
  marca: "Grupo Forestal Lima JL",
  ruc: "20612306720",
  dominio: "www.grupoforestallimajl.com.pe",
  profesional: "@oliver",
  profesionalUrl: "https://github.com/Oliver-Fj",
  fecha: "28 de octubre de 2026",
  vigencia: "20 días",
  contacto: "[SU WHATSAPP O CORREO]",
  // Su número con código de país, ej. "51987654321". Si lo completa, aparece el botón «Enviar por WhatsApp».
  miWhatsapp: "",
  anio: "2026",
  ubicacion: "[UBICACIÓN]",
  telefono: "[TELÉFONO]",
  whatsapp: "[WHATSAPP]",
  direccion: "[DIRECCIÓN]",
  horario: "[HORARIO DE ATENCIÓN]",
};

/* ====== Precios de referencia (S/). Ajústelos a sus tarifas. ====== */
const PKG = {
  basico: {
    name: "Básico",
    price: 1600,
    range: "S/ 1,200 – 2,000",
    time: "3 a 4 semanas",
    prods: 15,
  },
  comercial: {
    name: "Comercial",
    price: 3500,
    range: "S/ 2,800 – 4,500",
    time: "6 a 8 semanas",
    prods: 40,
  },
  avanzado: {
    name: "Avanzado",
    price: 9000,
    range: "S/ 6,000 – 12,000",
    time: "10 a 14 semanas",
    prods: 80,
  },
};
const LOGO = [
  { k: "none", label: "Usar la imagen actual (sin costo)", price: 0 },
  { k: "vector", label: "Reconstrucción vectorial del logotipo", price: 80 },
  { k: "kit", label: "Reconstrucción + identidad de marca", price: 120 },
];
const LOGO_DEFAULT = "kit";
const ADDONS = [
  { k: "foto", label: "Fotografía profesional de productos", sub: "Una sesión", price: 800 },
  {
    k: "texto",
    label: "Redacción de contenido comercial",
    sub: "Textos de la web y fichas",
    price: 600,
  },
  {
    k: "gbp",
    label: "Perfil de Empresa en Google",
    sub: "Configuración y optimización",
    price: 180,
  },
  {
    k: "correo",
    label: "Correo corporativo",
    sub: "Configuración; licencias según proveedor",
    price: 140,
  },
];
const PER_PRODUCT = 10;
const YEARLY = { dominio: 130, hosting: 350 };
const MONTHLY = [
  {
    k: "mant",
    label: "Mantenimiento técnico",
    sub: "Copias, seguridad, fallas",
    price: 150,
    on: true,
  },
  {
    k: "cat",
    label: "Administración del catálogo",
    sub: "Altas, bajas, precios, fotos",
    price: 250,
  },
  { k: "seo", label: "Posicionamiento SEO continuo", sub: "Trabajo mensual en Google", price: 800 },
  {
    k: "ads",
    label: "Gestión de campañas publicitarias",
    sub: "La inversión en anuncios se paga aparte",
    price: 500,
  },
];
