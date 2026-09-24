# Mi Primer Negocio 🚀

Aplicativo web para que un adolescente de 16 años en **Macará, Loja (Ecuador)** decida
qué idea de negocio se ajusta mejor a sus expectativas, y a partir de esa decisión reciba
una **guía paso a paso** con lo que necesita desarrollar, aprender y las herramientas
necesarias, junto con sus **pros y contras**.

Todo el contenido proviene del informe **A1 — Informe de orientación: Ideas de negocio
para adolescente (16 años), Macará, Loja** (agente A1 — Abastecimiento, fecha de corte
2026-05-19). La app no inventa datos: donde el informe declara algo como *no verificado*
o *a verificar por el humano*, la interfaz lo muestra como advertencia visible.

**App en línea:** https://nelsonojeda78.github.io/emprendimiento-juvenil/

---

## Qué hace la aplicación

| Módulo | Para qué sirve |
|---|---|
| 🎯 **Test de afinidad** | 9 preguntas que calculan qué idea encaja con el adolescente y devuelven un ranking con porcentaje |
| 💡 **Las 9 ideas** | Las 8 ideas de Categoría A y B del informe (más tutorías), ordenadas por encaje estructural con Macará |
| 📋 **Guía paso a paso** | 8 pasos concretos por idea, más lo que necesita aprender y las herramientas |
| ⚖️ **Pros y contras** | Ventajas y riesgos reales de cada idea, tomados del informe |
| 🧮 **Tus cuentas** | El "concepto de negocio en 1 página": costo, precio, ganancia, margen y **punto de equilibrio** |
| 🔍 **3 precios** | Comparador de 3 fuentes que calcula la **mediana** del mercado, tal como exige el informe |
| 🗓️ **Plan de 90 días** | Aprender · Validar · Probar · Decidir, con 26 tareas y seguimiento de progreso |
| 📒 **Libreta diaria** | Registro de ingresos, gastos y stock con ganancia real y exportación a CSV |
| 🧠 **6 habilidades** | Las habilidades que importan a los 16, con herramientas gratuitas con y sin IA |
| 👨‍👩‍👦 **Modo padre/tutor** | Parte legal, advertencia de alcance, escalamiento y datos faltantes |

---

## Cómo se usa

### En el celular
1. Abrir https://nelsonojeda78.github.io/emprendimiento-juvenil/ en Chrome o Safari.
2. Menú del navegador → **"Agregar a pantalla de inicio"** / **"Instalar app"**.
3. Queda como una app más del teléfono, con su propio icono, y **funciona sin conexión**.

### En PC
Abrir el mismo enlace en cualquier navegador. También se puede instalar desde el icono
de instalación de la barra de direcciones (Chrome/Edge).

---

## Actualización automática

El repositorio está conectado a **GitHub Pages** mediante GitHub Actions
(`.github/workflows/deploy-pages.yml`):

- Cada `push` a la rama `main` compila y publica automáticamente.
- El *service worker* (`app/sw.js`) detecta la versión nueva en segundo plano.
- La app muestra un aviso **"Hay una versión nueva · Actualizar"**.
- Al tocarlo, se activa la versión nueva y la app se recarga sola.

No hay que reinstalar nada en los dispositivos: se actualizan solos al abrir la app
con conexión.

---

## Privacidad — importante

**Ningún dato personal sale del dispositivo.**

- El test, la idea elegida, las cuentas, el comparador de precios, el plan y la libreta
  se guardan **únicamente en el `localStorage` del navegador**.
- La app **no tiene backend, no hace peticiones a servidores propios y no usa analítica**.
- No pide nombre, cédula, dirección ni ningún dato identificatorio.
- El informe A1 señala como punto de escalamiento la **protección de datos de clientes
  menores y del propio adolescente** (sección 5, punto 6). Esta app lo respeta por diseño.
- El `.gitignore` bloquea exportaciones (`.csv`, `.json`) para que no se suban al
  repositorio por error.

> ⚠️ El repositorio y el sitio de GitHub Pages son públicos. **El código es público,
> los datos del adolescente no.**

---

## Estructura

```
├── app/                          ← sitio publicado
│   ├── index.html                ← estructura de la app
│   ├── styles.css                ← tema visual
│   ├── app.js                    ← lógica (test, guías, calculadora, libreta)
│   ├── data.js                   ← contenido del informe A1 (fuente única)
│   ├── sw.js                     ← service worker con auto-actualización
│   ├── manifest.webmanifest      ← configuración PWA
│   └── icon-*.png                ← iconos
├── .github/workflows/
│   └── deploy-pages.yml          ← despliegue automático a Pages
└── README.md
```

---

## Cómo hacer cambios

```bash
git clone https://github.com/nelsonojeda78/emprendimiento-juvenil.git
cd emprendimiento-juvenil
# editar archivos de app/
git add .
git commit -m "Describe el cambio"
git push
```

En 1–2 minutos GitHub Pages publica la versión nueva, y los dispositivos la reciben
solos. Para cambios en el contenido de las ideas, planes o textos legales, basta con
editar `app/data.js`.

Para probar localmente hace falta un servidor (el service worker no funciona con
`file://`):

```bash
python3 -m http.server 8899 --directory app
# abrir http://127.0.0.1:8899/
```

---

## Advertencias del informe que la app mantiene visibles

- **Este informe es orientación para decisión humana, no autorización.** No autoriza
  comprar, contactar, publicar, fijar precios ni registrar nada.
- **No se emite ningún precio de mercado, margen ni ranking.** Cualquier cifra de precio
  es una hipótesis de trabajo declarada, no una cotización verificada.
- **No corresponde a P-AB1, P-AB2, P-AB3 ni P-AB4.** No hay rúbrica 1–5 aprobada, por
  eso la app **no emite SCORE_PRODUCTO ni SCORE_PROVEEDOR**. El test de afinidad es una
  herramienta de orientación construida por la app, no una puntuación del método A1.
- **A los 16 años es menor de edad.** Esto no impide emprender, pero cambia quién firma:
  RUC, patente municipal y representación legal deben verificarse con un adulto.
- **El agente A1 no certifica cumplimiento legal.** Los PDFs oficiales del SRI y del
  Código Municipal de Loja no pudieron ser leídos; se citan como punteros para
  verificación humana.
- **Discrepancia de población sin resolver:** 12 454 (ciudad, 2022) / 15 235 / 25 901
  (cantón, contradictorias) frente a los ~18 000 indicados por el operador.

### Siguiente paso humano concreto

> Elegir **un** negocio de las categorías A o B, y traer **3 fuentes locales reales con
> URL** (vendedor, fecha, modelo, precio, IVA, envío) para ese producto o servicio.
> Con esas fuentes se puede ejecutar P-AB2 y P-AB3 y pasar de orientación a análisis real.

---

**Fuente:** A1 — Informe de orientación: Ideas de negocio para adolescente (16 años),
Macará, Loja · Agente A1 — Abastecimiento · Fecha de corte 2026-05-19 · Estado: BORRADOR
para revisión humana.
