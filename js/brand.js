/* Marca de Grupo Forestal Lima JL: paleta tomada del logo, tipografías y logo vectorial (vista previa). */
"use strict";

const BRAND = {
  palette: [
    {
      name: "Verde bosque",
      hex: "#2E7D3A",
      rgb: "46, 125, 58",
      cmyk: "63, 0, 54, 51",
      use: "Botones, títulos de sección, íconos",
    },
    {
      name: "Verde brote",
      hex: "#8FDB72",
      rgb: "143, 219, 114",
      cmyk: "35, 0, 48, 14",
      use: "Degradado de los árboles, detalles",
    },
    {
      name: "Luz de copa",
      hex: "#EEF28A",
      rgb: "238, 242, 138",
      cmyk: "2, 0, 43, 5",
      use: "Brillo de los árboles (solo en el logo)",
    },
    {
      name: "Café tierra",
      hex: "#8B6344",
      rgb: "139, 99, 68",
      cmyk: "0, 29, 51, 45",
      use: "Franja del logo, bordes y acentos",
    },
    {
      name: "Nogal",
      hex: "#5E3F2C",
      rgb: "94, 63, 44",
      cmyk: "0, 33, 53, 63",
      use: "Letras LIMA y textos sobre fondo claro",
    },
    {
      name: "Bronce",
      hex: "#8E6F4B",
      rgb: "142, 111, 75",
      cmyk: "0, 22, 47, 44",
      use: "Nombre de la empresa en el logo",
    },
    {
      name: "Arena dorada",
      hex: "#E8D3A2",
      rgb: "232, 211, 162",
      cmyk: "0, 9, 30, 9",
      use: "«Desde 1999», detalles sobre fondo oscuro",
    },
    {
      name: "Plata sierra",
      hex: "#C7CBD0",
      rgb: "199, 203, 208",
      cmyk: "4, 2, 0, 18",
      use: "Sierra del logo, líneas y separadores",
    },
    {
      name: "Crema",
      hex: "#FBF7EE",
      rgb: "251, 247, 238",
      cmyk: "0, 2, 5, 2",
      use: "Fondo principal",
    },
    {
      name: "Carbón",
      hex: "#2A211B",
      rgb: "42, 33, 27",
      cmyk: "0, 21, 36, 84",
      use: "Textos largos y pie de página",
    },
  ],
  fonts: [
    {
      name: "Cinzel",
      family: "'Cinzel', serif",
      weight: 900,
      sample: "LIMA",
      use: "Solo para la palabra LIMA del logo",
    },
    {
      name: "Oswald",
      family: "'Oswald', sans-serif",
      weight: 700,
      sample: "Puertas talladas",
      use: "Títulos, como el nombre en el logo",
    },
    {
      name: "Public Sans",
      family: "'Public Sans', sans-serif",
      weight: 400,
      sample: "Venta de madera por mayor",
      use: "Textos y descripciones",
    },
  ],
};

/* Devuelve el SVG del logo. `prefix` evita choques de id entre varias copias en la misma página. */
function logoSVG(prefix = "lg-") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 222" role="img" aria-label="Logotipo Grupo Forestal Lima JL S.A.C., desde 1999">
<defs>
<linearGradient id="__P__leaf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FDB72"/><stop offset=".45" stop-color="#EEF28A"/><stop offset=".78" stop-color="#8EDC86"/><stop offset="1" stop-color="#4FAE5E"/></linearGradient>
<linearGradient id="__P__trunk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5DB876"/><stop offset="1" stop-color="#2E7D3A"/></linearGradient>
<linearGradient id="__P__earth" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A47A55"/><stop offset="1" stop-color="#7C5638"/></linearGradient>
<linearGradient id="__P__lima" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A88670"/><stop offset=".5" stop-color="#7E5A44"/><stop offset="1" stop-color="#9C7A62"/></linearGradient>
<linearGradient id="__P__steel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F1F2F4"/><stop offset=".55" stop-color="#C7CBD0"/><stop offset="1" stop-color="#9EA4AB"/></linearGradient>
<linearGradient id="__P__bronze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B39463"/><stop offset=".55" stop-color="#8E6F4B"/><stop offset="1" stop-color="#6F5536"/></linearGradient>
</defs>
<g id="arboles"><path d="M106.0 63.0 L110.8 68.0 L108.2 67.6 L108.9 69.8 L111.9 73.0 L108.6 72.5 L109.4 74.8 L112.9 78.0 L109.1 77.5 L109.9 79.8 L114.0 83.0 L109.6 82.5 L110.5 84.8 L115.0 87.9 L107.6 87.9 L104.4 87.9 L97.0 87.9 L101.5 84.8 L102.4 82.5 L98.0 83.0 L102.1 79.8 L102.9 77.5 L99.1 78.0 L102.6 74.8 L103.4 72.5 L100.1 73.0 L103.1 69.8 L103.8 67.6 L101.2 68.0 Z" fill="url(#__P__leaf)"/><rect x="104.9" y="87.4" width="2.2" height="4.9" fill="url(#__P__trunk)"/><path d="M129.0 28.0 L139.7 39.0 L133.8 38.0 L135.5 43.0 L142.0 50.0 L134.9 49.1 L136.6 54.0 L144.4 61.0 L135.9 60.1 L137.8 65.0 L146.7 72.0 L137.0 71.1 L138.9 76.0 L149.0 83.0 L132.6 83.0 L125.4 83.0 L109.0 83.0 L119.1 76.0 L121.0 71.1 L111.3 72.0 L120.2 65.0 L122.1 60.1 L113.6 61.0 L121.4 54.0 L123.1 49.1 L116.0 50.0 L122.5 43.0 L124.2 38.0 L118.3 39.0 Z" fill="url(#__P__leaf)"/><rect x="127.4" y="81.8" width="3.2" height="10.9" fill="url(#__P__trunk)"/><path d="M163.0 4.0 L177.5 19.1 L169.5 17.8 L171.7 24.6 L180.6 34.3 L170.9 33.0 L173.3 39.7 L183.7 49.4 L172.3 48.1 L174.8 54.9 L186.9 64.5 L173.7 63.2 L176.4 70.0 L190.0 79.7 L167.9 79.7 L158.1 79.7 L136.0 79.7 L149.6 70.0 L152.3 63.2 L139.1 64.5 L151.2 54.9 L153.7 48.1 L142.3 49.4 L152.7 39.7 L155.1 33.0 L145.4 34.3 L154.3 24.6 L156.5 17.8 L148.5 19.1 Z" fill="url(#__P__leaf)"/><rect x="160.8" y="77.9" width="4.3" height="15.0" fill="url(#__P__trunk)"/><path d="M197.0 37.0 L207.2 46.5 L201.6 45.6 L203.1 49.9 L209.4 55.9 L202.6 55.1 L204.2 59.3 L211.6 65.4 L203.6 64.6 L205.3 68.8 L213.8 74.8 L204.6 74.0 L206.4 78.2 L216.0 84.3 L200.4 84.3 L193.6 84.3 L178.0 84.3 L187.6 78.2 L189.4 74.0 L180.2 74.8 L188.7 68.8 L190.4 64.6 L182.4 65.4 L189.8 59.3 L191.4 55.1 L184.6 55.9 L190.9 49.9 L192.4 45.6 L186.8 46.5 Z" fill="url(#__P__leaf)"/><rect x="195.5" y="83.2" width="3.0" height="9.4" fill="url(#__P__trunk)"/><path d="M216.0 53.0 L223.0 59.7 L219.1 59.1 L220.2 62.1 L224.5 66.4 L219.8 65.8 L220.9 68.8 L226.0 73.1 L220.5 72.5 L221.7 75.5 L227.5 79.8 L221.2 79.2 L222.4 82.2 L229.0 86.5 L218.3 86.5 L213.7 86.5 L203.0 86.5 L209.6 82.2 L210.8 79.2 L204.5 79.8 L210.3 75.5 L211.5 72.5 L206.0 73.1 L211.1 68.8 L212.2 65.8 L207.5 66.4 L211.8 62.1 L212.9 59.1 L209.0 59.7 Z" fill="url(#__P__leaf)"/><rect x="214.9" y="85.8" width="2.2" height="6.6" fill="url(#__P__trunk)"/><path d="M231.0 65.0 L235.8 69.6 L233.2 69.2 L233.9 71.3 L236.9 74.3 L233.6 73.9 L234.4 76.0 L237.9 78.9 L234.1 78.5 L234.9 80.6 L239.0 83.6 L234.6 83.2 L235.5 85.2 L240.0 88.2 L232.6 88.2 L229.4 88.2 L222.0 88.2 L226.5 85.2 L227.4 83.2 L223.0 83.6 L227.1 80.6 L227.9 78.5 L224.1 78.9 L227.6 76.0 L228.4 73.9 L225.1 74.3 L228.1 71.3 L228.8 69.2 L226.2 69.6 Z" fill="url(#__P__leaf)"/><rect x="229.9" y="87.7" width="2.2" height="4.6" fill="url(#__P__trunk)"/></g>
<path id="tierra" d="M34 106 Q165 78 298 106 Q165 113 34 106 Z" fill="url(#__P__earth)"/>
<text x="165" y="102.5" text-anchor="middle" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="500" font-size="9" letter-spacing="1.2" fill="#E8D3A2">DESDE 1999</text>
<path d="M44 108.5 H286" stroke="#C7CBD0" stroke-width=".8"/>
<g id="sierra"><path d="M203.0 148.0 L211.9 151.1 L210.8 158.7 L201.4 159.3 L200.5 162.0 L207.8 168.0 L204.2 174.8 L195.2 172.1 L193.4 174.4 L198.2 182.5 L192.5 187.6 L184.9 182.0 L182.5 183.5 L184.2 192.8 L177.1 195.7 L171.9 187.8 L169.1 188.4 L167.6 197.7 L159.9 198.0 L157.7 188.8 L154.9 188.4 L150.2 196.6 L142.9 194.2 L144.0 184.9 L141.5 183.5 L134.3 189.6 L128.3 184.9 L132.5 176.5 L130.6 174.4 L121.8 177.7 L117.7 171.2 L124.5 164.7 L123.5 162.0 L114.0 162.1 L112.4 154.6 L121.1 150.9 L121.0 148.0 Z" fill="url(#__P__steel)" stroke="#9EA4AB" stroke-width=".6"/><circle cx="162" cy="148" r="15" fill="#FFFFFF"/><circle cx="162" cy="148" r="15" fill="none" stroke="#B9BEC4" stroke-width="1.2"/></g>
<path id="alas" d="M38 141 Q160 138 292 141 Q200 148 160 156 Q120 148 38 141 Z" fill="url(#__P__steel)"/>
<text x="54" y="137" textLength="222" lengthAdjust="spacingAndGlyphs" font-family="Cinzel, 'Trajan Pro', Georgia, serif" font-weight="900" font-size="38" fill="url(#__P__lima)" stroke="#5E3F2C" stroke-width="2.4" paint-order="stroke">LIMA</text>
<text x="54" y="137" textLength="222" lengthAdjust="spacingAndGlyphs" font-family="Cinzel, 'Trajan Pro', Georgia, serif" font-weight="900" font-size="38" fill="none" stroke="#F4EDE6" stroke-width=".7">LIMA</text>
<text x="165" y="212" text-anchor="middle" textLength="238" lengthAdjust="spacingAndGlyphs" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="700" font-size="24" fill="url(#__P__bronze)">GRUPO FORESTAL LIMA JL S.A.C</text>
</svg>`.replaceAll("__P__", prefix);
}
