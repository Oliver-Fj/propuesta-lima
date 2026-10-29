# Propuesta web · Grupo Forestal Lima JL S.A.C.

Propuesta comercial interactiva para el desarrollo de la página web de **Grupo Forestal Lima JL S.A.C.** (RUC 20612306720).

Incluye una maqueta navegable del sitio (computadora y celular), los servicios, beneficios, paquetes, una calculadora de presupuesto, el cronograma y un formulario de aprobación.

Propuesta presentada por [@oliver](https://github.com/Oliver-Fj).

Es un sitio estático: HTML, CSS y JavaScript, sin frameworks ni proceso de compilación.

## Estructura

```
.
├── index.html            Estructura y textos de la propuesta
├── css/
│   ├── styles.css        Estilos de la propuesta (tokens, modo claro/oscuro, secciones)
│   └── mockup.css        Estilos de la maqueta del sitio (paleta fija)
├── js/
│   ├── config.js         Datos de la empresa, del profesional y precios  ← se edita aquí
│   ├── utils.js          Utilidades: selectores, formato de soles, textura de madera
│   ├── brand.js          Marca: paleta del logo, tipografías y logo vectorial (vista previa)
│   ├── catalog.js        Catálogo: categorías, especies de madera y productos
│   ├── illustrations.js  Dibujos en canvas de puertas, maderas y muebles
│   ├── mockup.js         Navegación y vistas de la maqueta
│   ├── content.js        Textos de servicios, beneficios, paquetes, cronograma, etc.
│   └── proposal.js       Secciones, calculadora y aprobación
├── assets/
│   ├── favicon.svg
│   ├── logo-original.png         Logo actual (baja resolución)
│   └── logo-vector-preview.svg   Boceto de la reconstrucción vectorial
├── .nojekyll             Evita que GitHub Pages procese el sitio con Jekyll
├── .prettierrc.json      Formato del código (Prettier)
├── .editorconfig
└── .gitignore
```

Los scripts se cargan con `defer` y en este orden: `config` → `utils` → `brand` → `catalog` → `illustrations` → `mockup` → `content` → `proposal`. Cada archivo usa lo que definen los anteriores.

## Personalizar

| Qué cambiar | Dónde |
| --- | --- |
| Su nombre, contacto, fecha, vigencia | `js/config.js` → `CONFIG` |
| Dirección, teléfono, WhatsApp y horario de la empresa | `js/config.js` → `CONFIG` |
| Botón «Enviar por WhatsApp» en la aprobación | `js/config.js` → `CONFIG.miWhatsapp` (ej. `"51987654321"`) |
| Precios de paquetes, logotipo, adicionales y mensualidades | `js/config.js` → `PKG`, `LOGO`, `ADDONS`, `YEARLY`, `MONTHLY` |
| Productos, especies y fichas de la maqueta | `js/catalog.js` |
| Textos de servicios, beneficios, cronograma | `js/content.js` |
| Paleta y tipografías de la marca | `js/brand.js` y los bloques `:root` de `css/styles.css` y `.site` de `css/mockup.css` |

Los textos entre corchetes, como `[DIRECCIÓN]`, son datos pendientes.

## Marca

Paleta tomada del logo (valores oficiales en `js/brand.js`):

| Color | HEX | Uso |
| --- | --- | --- |
| Verde bosque | `#2E7D3A` | Botones, títulos, íconos |
| Verde brote | `#8FDB72` | Degradado de los árboles |
| Luz de copa | `#EEF28A` | Brillo de los árboles (solo logo) |
| Café tierra | `#8B6344` | Franja del logo, acentos |
| Nogal | `#5E3F2C` | Letras LIMA, textos |
| Bronce | `#8E6F4B` | Nombre en el logo |
| Arena dorada | `#E8D3A2` | «Desde 1999», detalles sobre oscuro |
| Plata sierra | `#C7CBD0` | Sierra, líneas |
| Crema | `#FBF7EE` | Fondo |
| Carbón | `#2A211B` | Textos largos, pie |

Tipografías: **Cinzel** (palabra LIMA), **Oswald** (títulos) y **Public Sans** (textos).

`assets/logo-vector-preview.svg` es un boceto para la propuesta; la reconstrucción final se entrega aparte.

## Ver en su computadora

Abra `index.html` con doble clic, o levante un servidor local:

```bash
python3 -m http.server 8000
# luego abra http://localhost:8000
```

## Publicar en GitHub Pages

1. Cree un repositorio público (por ejemplo, `grupo-forestal`).
2. Suba todos los archivos y carpetas manteniendo la estructura. Desde la web: **Add file → Upload files** y arrastre el contenido de la carpeta.
3. Vaya a **Settings → Pages**, elija **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarde.
4. En uno o dos minutos estará en `https://SU-USUARIO.github.io/grupo-forestal/`.

Para usar un dominio propio, configúrelo en **Settings → Pages → Custom domain** y cree los registros DNS que indica GitHub.

> El repositorio es público: cualquiera con el enlace puede ver la propuesta y sus precios.

## Notas

- Las imágenes de productos son ilustraciones dibujadas en canvas; se reemplazarán por fotos reales.
- Los usos de cada especie de madera son referenciales y deben validarse con la empresa.
- Los precios son estimaciones orientativas en soles (S/), sin impuestos salvo que se active el IGV en la calculadora.
- La página no guarda ni envía datos: el formulario de aprobación genera un texto para copiar o enviar por WhatsApp.
# propuesta-lima
