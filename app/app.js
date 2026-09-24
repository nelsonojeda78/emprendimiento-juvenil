/* ==========================================================================
   Mi Primer Negocio — lógica de la aplicación
   Todos los datos personales se guardan SOLO en este dispositivo (localStorage).
   Nada se envía a ningún servidor.
   ========================================================================== */
import * as D from './data.js';

/* ---------------- utilidades ---------------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const usd = n => '$' + (Number(n) || 0).toFixed(2);
const hoy = () => new Date().toISOString().slice(0, 10);
const fmtFecha = f => { try { return new Date(f + 'T12:00:00').toLocaleDateString('es-EC', { day: '2-digit', month: 'short', year: 'numeric' }); } catch { return f; } };

/* ---------------- almacenamiento local ---------------- */
const KEY = 'mpn_v1';
const vacio = () => ({
  test: { respuestas: {}, completo: false, resultado: null },
  elegida: null,
  cuentas: { producto: '', costo: '', precio: '', inversion: '', meta: '' },
  fuentes: {},
  plan: {},
  libreta: [],
  padre: { desbloqueado: false }
});
let S = cargar();
function cargar() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return vacio();
    return Object.assign(vacio(), JSON.parse(raw));
  } catch { return vacio(); }
}
function guardar() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); }
  catch { toast('No se pudo guardar. Revisa el espacio del dispositivo.'); }
}

/* ---------------- navegación ---------------- */
let vistaActual = 'inicio';
function go(v) {
  vistaActual = v;
  $$('.view').forEach(e => e.classList.toggle('active', e.id === 'view-' + v));
  $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.go === v));
  window.scrollTo({ top: 0, behavior: 'instant' });
  const R = {
    inicio: renderInicio, test: renderTest, resultado: renderResultado,
    ideas: renderIdeas, detalle: renderDetalle, cuentas: renderCuentas,
    precios: renderPrecios, plan90: renderPlan90, libreta: renderLibreta,
    habilidades: renderHabilidades, padres: renderPadres, fuentes: renderFuentes
  };
  R[v]?.();
  history.replaceState(null, '', '#' + v);
}
document.addEventListener('click', e => {
  const t = e.target.closest('[data-go]');
  if (t) { e.preventDefault(); go(t.dataset.go); }
});

/* ---------------- aviso / modal ---------------- */
function toast(msg) {
  const b = document.createElement('div');
  b.className = 'aviso info';
  b.style.cssText = 'position:fixed;bottom:calc(96px + var(--safe-b));left:50%;transform:translateX(-50%);z-index:300;max-width:90vw;box-shadow:var(--sh)';
  b.innerHTML = `<span class="aviso-i">ℹ️</span><div>${esc(msg)}</div>`;
  document.body.appendChild(b);
  setTimeout(() => b.remove(), 3200);
}
function modal({ titulo, cuerpo, acciones }) {
  const root = $('#modal-root');
  root.innerHTML = `
    <div class="modal-bg">
      <div class="modal">
        <h3>${titulo}</h3>
        <div>${cuerpo}</div>
        <div class="modal-acts">${acciones.map(a =>
          `<button class="btn ${a.cls || 'btn-ghost'}" data-mact="${a.id}">${a.txt}</button>`).join('')}</div>
      </div>
    </div>`;
  const cerrar = () => (root.innerHTML = '');
  root.querySelector('.modal-bg').addEventListener('click', e => { if (e.target.classList.contains('modal-bg')) cerrar(); });
  acciones.forEach(a => root.querySelector(`[data-mact="${a.id}"]`)?.addEventListener('click', () => { cerrar(); a.fn?.(); }));
  return cerrar;
}

/* ==========================================================================
   TEST DE AFINIDAD
   ========================================================================== */
const PREGUNTAS = [
  {
    id: 'p1', t: '¿Qué te imaginas haciendo un sábado por la tarde con este negocio?',
    ayuda: 'Elige lo que de verdad te gustaría, no lo que suena más serio.',
    opts: [
      { i: '🏀', t: 'Entrenando o jugando con gente', v: { deporte: 3, social: 1 } },
      { i: '📦', t: 'Vendiendo algo que la gente ya quiere comprar', v: { producto: 3, dinero: 1 } },
      { i: '🎨', t: 'Creando algo con el celular', v: { creatividad: 3, tecnologia: 1 } },
      { i: '🤝', t: 'Ayudando a alguien con un problema suyo', v: { servicio: 3, social: 1 } }
    ]
  },
  {
    id: 'p2', t: '¿Cuánto de tu capital (150–400 USD) estás dispuesto a arriesgar?',
    ayuda: 'Piénsalo de verdad. Si el negocio no funciona, ese dinero no vuelve.',
    opts: [
      { i: '🛡️', t: 'Casi nada. Prefiero empezar sin invertir', v: { riesgo: 1 } },
      { i: '⚖️', t: 'Una parte, pero con reserva guardada', v: { riesgo: 2 } },
      { i: '🚀', t: 'Lo que haga falta para arrancar en serio', v: { riesgo: 3 } }
    ]
  },
  {
    id: 'p3', t: 'Si tuvieras que venderle a alguien hoy, ¿a quién le hablarías primero?',
    opts: [
      { i: '🧒', t: 'A niños o chicos más pequeños que yo', v: { deporte: 2, servicio: 1 } },
      { i: '👥', t: 'A mis amigos y a la gente de mi edad', v: { social: 3 } },
      { i: '🏪', t: 'A los negocios del barrio', v: { servicio: 2, creatividad: 1 } },
      { i: '👨‍👩‍👧', t: 'A adultos y familias', v: { producto: 2, dinero: 1 } }
    ]
  },
  {
    id: 'p4', t: '¿Qué tan cómodo te sientes hablando con desconocidos?',
    ayuda: 'Vender casi siempre significa hablar con gente que no conoces.',
    opts: [
      { i: '😬', t: 'Me cuesta, prefiero que me conozcan primero', v: { social: 1 } },
      { i: '🙂', t: 'Normal, si tengo algo claro que decir', v: { social: 2 } },
      { i: '😎', t: 'Bien, se me da fácil conversar', v: { social: 3, servicio: 1 } }
    ]
  },
  {
    id: 'p5', t: '¿Cuántas horas reales a la semana puedes dedicarle?',
    ayuda: 'Cuenta el colegio, la tarea y el básquetbol antes de responder.',
    opts: [
      { i: '⏱️', t: 'Pocas: menos de 5 horas', v: { tiempo: 1 } },
      { i: '🕐', t: 'Entre 6 y 10 horas', v: { tiempo: 2 } },
      { i: '🔥', t: 'Más de 10 horas, le puedo meter duro', v: { tiempo: 3 } }
    ]
  },
  {
    id: 'p6', t: '¿Cómo te gustaría ganar el dinero?',
    opts: [
      { i: '🔁', t: 'Varias ventas pequeñas que se repiten', v: { producto: 3, dinero: 2 } },
      { i: '💵', t: 'Cobrar por mi tiempo o por un trabajo hecho', v: { servicio: 3, tiempo: 1 } },
      { i: '📅', t: 'Un pago más grande por algo armado (un evento, un video)', v: { creatividad: 2, dinero: 2 } }
    ]
  },
  {
    id: 'p7', t: '¿Qué se te da mejor de esta lista?',
    ayuda: 'Sé honesto. Esto pesa más que lo que te gustaría saber hacer.',
    opts: [
      { i: '🏃', t: 'El deporte y explicar cómo se hace algo', v: { deporte: 3 } },
      { i: '📲', t: 'El celular: apps, edición, redes, diseño', v: { tecnologia: 3, creatividad: 1 } },
      { i: '🗣️', t: 'Conversar y organizar gente', v: { social: 3, servicio: 1 } },
      { i: '🧮', t: 'Los números y ser ordenado', v: { dinero: 3 } }
    ]
  },
  {
    id: 'p8', t: '¿Qué harías si un cliente te dice "está muy caro"?',
    opts: [
      { i: '📉', t: 'Le bajo el precio para no perder la venta', v: { riesgo: 1, dinero: 1 } },
      { i: '💬', t: 'Le explico por qué vale eso y qué incluye', v: { servicio: 2, dinero: 2, social: 1 } },
      { i: '🤷', t: 'Lo dejo ir, ya vendrá otro', v: { producto: 2, riesgo: 3 } }
    ]
  },
  {
    id: 'p9', t: 'Al final de los 90 días, ¿qué sería para ti un buen resultado?',
    opts: [
      { i: '🎓', t: 'Haber aprendido algo, aunque no gane mucho', v: { tiempo: 2, servicio: 1 } },
      { i: '💪', t: 'Haber ganado mi primer dinero propio', v: { dinero: 3 } },
      { i: '📈', t: 'Que el negocio siga funcionando y pueda crecer', v: { producto: 2, riesgo: 3 } }
    ]
  }
];

const PESO = { deporte: 1.0, social: 1.0, tecnologia: 1.0, servicio: 1.0, producto: 1.0, creatividad: 1.0, dinero: 1.0, tiempo: 1.0 };

function calcularResultado(respuestas) {
  const perfil = {};
  Object.keys(PESO).forEach(k => (perfil[k] = 0));
  PREGUNTAS.forEach(p => {
    const sel = respuestas[p.id];
    if (sel == null) return;
    const v = p.opts[sel]?.v || {};
    Object.entries(v).forEach(([k, n]) => { perfil[k] = (perfil[k] || 0) + n * (PESO[k] || 1); });
  });

  const maxPorEje = {};
  Object.keys(PESO).forEach(k => {
    let m = 0;
    PREGUNTAS.forEach(p => p.opts.forEach(o => { m += (o.v[k] || 0) * (PESO[k] || 1); }));
    maxPorEje[k] = m || 1;
  });

  const riesgo = perfil.riesgo || 0;               // 3..9 aprox
  const horas = perfil.tiempo || 0;

  const puntuados = D.IDEAS.map(idea => {
    let suma = 0, maxPosible = 0;
    Object.entries(idea.perfiles).forEach(([k, peso]) => {
      const norm = Math.min(1, (perfil[k] || 0) / (maxPorEje[k] || 1));
      suma += norm * peso;
      maxPosible += peso;
    });
    let pct = maxPosible ? (suma / maxPosible) * 100 : 0;

    const ajustes = [];
    // Capital: el informe acota 150-400 USD. Inventario con poca tolerancia al riesgo penaliza.
    if (idea.requiereInventario && riesgo <= 3) { pct -= 9; ajustes.push('Requiere inventario y prefieres arriesgar poco'); }
    if (!idea.requiereInventario && riesgo >= 7) { pct += 3; ajustes.push('Sin inventario: encaja con tu tolerancia al riesgo'); }
    // Tiempo: los negocios de evento/organización exigen más horas.
    if (['A2', 'B5'].includes(idea.id) && horas <= 3) { pct -= 7; ajustes.push('Exige más horas de las que tienes disponibles'); }
    // Encaje estructural declarado en el informe (sección 3.3) — refuerzo leve y explícito.
    if (idea.encajeOrden) { pct += (6 - idea.encajeOrden) * 1.6; }

    return { idea, pct: Math.max(0, Math.min(100, Math.round(pct))), ajustes };
  }).sort((a, b) => b.pct - a.pct);

  return { perfil, maxPorEje, ranking: puntuados, riesgo, horas, fecha: new Date().toISOString() };
}

function renderTest() {
  const r = S.test.respuestas;
  const hechas = PREGUNTAS.filter(p => r[p.id] != null).length;
  $('#test-progress').style.width = (hechas / PREGUNTAS.length * 100) + '%';
  $('#test-progress-label').textContent = `${hechas} / ${PREGUNTAS.length}`;

  const idx = PREGUNTAS.findIndex(p => r[p.id] == null);
  const body = $('#test-body');

  if (idx === -1) {
    body.innerHTML = `
      <div class="card card-ok center">
        <div style="font-size:48px;margin-bottom:10px">✅</div>
        <h2 style="margin-bottom:8px">¡Listo! Respondiste las 9</h2>
        <p class="txt-dim mb">Ahora mira qué ideas encajan mejor contigo.</p>
        <button class="btn btn-primary btn-lg" id="ver-resultado">Ver mi resultado →</button>
        <button class="btn btn-ghost btn-sm mt" id="reiniciar-test">Volver a empezar</button>
      </div>`;
    $('#ver-resultado').onclick = () => {
      S.test.completo = true;
      S.test.resultado = calcularResultado(S.test.respuestas);
      guardar(); go('resultado');
    };
    $('#reiniciar-test').onclick = () => {
      modal({
        titulo: '¿Volver a empezar?', cuerpo: '<p>Se borrarán tus 9 respuestas.</p>',
        acciones: [
          { id: 'no', txt: 'Cancelar' },
          { id: 'si', txt: 'Sí, reiniciar', cls: 'btn-danger', fn: () => { S.test = { respuestas: {}, completo: false, resultado: null }; guardar(); renderTest(); } }
        ]
      });
    };
    return;
  }

  const p = PREGUNTAS[idx];
  body.innerHTML = `
    <div class="card q-card">
      <div class="q-num">Pregunta ${idx + 1} de ${PREGUNTAS.length}</div>
      <div class="q-text">${esc(p.t)}</div>
      ${p.ayuda ? `<div class="q-help">${esc(p.ayuda)}</div>` : '<div style="height:12px"></div>'}
      <div class="opts">
        ${p.opts.map((o, i) => `
          <button class="opt${r[p.id] === i ? ' sel' : ''}" data-opt="${i}">
            <span class="opt-ico">${o.i}</span>
            <span class="opt-tx">${esc(o.t)}</span>
          </button>`).join('')}
      </div>
      <div class="row mt" style="justify-content:space-between">
        ${idx > 0 ? '<button class="btn btn-ghost btn-sm" id="atras">← Atrás</button>' : '<span></span>'}
        <button class="btn btn-ghost btn-sm" id="saltar">Saltar esta</button>
      </div>
    </div>`;

  $$('.opt', body).forEach(b => b.onclick = () => {
    S.test.respuestas[p.id] = Number(b.dataset.opt);
    guardar(); renderTest();
  });
  $('#atras') && ($('#atras').onclick = () => {
    const prev = PREGUNTAS[idx - 1];
    delete S.test.respuestas[prev.id]; guardar(); renderTest();
  });
  $('#saltar').onclick = () => {
    const rest = PREGUNTAS.filter(x => x.id !== p.id && S.test.respuestas[x.id] == null);
    if (!rest.length) { S.test.completo = true; S.test.resultado = calcularResultado(S.test.respuestas); guardar(); go('resultado'); }
    else { S.test.respuestas[p.id] = -1; guardar(); renderTest(); }
  };
}

function renderResultado() {
  const res = S.test.resultado || calcularResultado(S.test.respuestas);
  const body = $('#resultado-body');
  if (!res) { body.innerHTML = '<div class="empty">Todavía no has hecho el test.</div>'; return; }
  const [top, ...resto] = res.ranking;

  body.innerHTML = `
    <div class="res-hero">
      <div class="res-emoji">${top.idea.emoji}</div>
      <div class="res-rank">Tu mejor encaje</div>
      <div class="res-name">${esc(top.idea.nombre)}</div>
      <p class="txt-dim" style="max-width:430px;margin:0 auto">${esc(top.idea.resumen)}</p>
      <div class="res-score"><span class="badge b-ok">${top.pct}% de afinidad</span></div>
    </div>

    <div class="aviso info">
      <span class="aviso-i">ℹ️</span>
      <div><b>${esc(D.ADVERTENCIA_RUBRICA.titulo)}</b><br>${esc(D.ADVERTENCIA_RUBRICA.texto)}</div>
    </div>

    <div class="card card-acc">
      <div class="card-head"><h2>¿Por qué te salió esta?</h2></div>
      <p class="txt-dim mb"><b style="color:var(--txt)">Por qué encaja a los 16:</b> ${esc(top.idea.porQueEncaja16)}</p>
      <p class="txt-dim mb"><b style="color:var(--txt)">Por qué encaja en Macará:</b> ${esc(top.idea.encajeMacara)}</p>
      <div class="aviso warn" style="margin-bottom:0">
        <span class="aviso-i">⚠️</span>
        <div><b>Riesgo principal:</b> ${esc(top.idea.riesgoPrincipal)}<br>
        <b>Qué falta verificar:</b> ${esc(top.idea.faltaVerificar)}</div>
      </div>
    </div>

    <div class="card">
      <div class="card-head"><h2>Tu perfil</h2></div>
      ${Object.entries(res.perfil).filter(([k]) => k !== 'riesgo').map(([k, v]) => {
        const m = res.maxPorEje[k] || 1;
        const pct = Math.min(100, Math.round(v / m * 100));
        const nombres = { deporte: 'Deporte', social: 'Trato con gente', tecnologia: 'Tecnología', servicio: 'Servicio', producto: 'Vender producto', creatividad: 'Creatividad', dinero: 'Números y dinero', tiempo: 'Tiempo disponible' };
        return `<div class="bar-row">
          <div class="bar-lbl"><b>${nombres[k] || k}</b><span>${pct}%</span></div>
          <div class="bar-bg"><div class="bar-fill${pct > 66 ? ' g' : ''}" style="width:${pct}%"></div></div>
        </div>`;
      }).join('')}
    </div>

    <div class="card">
      <div class="card-head"><h2>Ranking completo</h2></div>
      <p class="txt-dim mb">Toca cualquiera para ver su guía paso a paso.</p>
      ${[top, ...resto].map((x, i) => `
        <div class="rank-item${i === 0 ? ' top' : ''}" data-idea="${x.idea.id}">
          <span class="rank-pos">${i + 1}</span>
          <span class="rank-emoji">${x.idea.emoji}</span>
          <span class="rank-tx">
            <span class="rank-nm">${esc(x.idea.nombre)}</span>
            <span class="rank-meta">${x.idea.requiereInventario ? 'Requiere inventario' : 'Sin inventario'} · capital ${esc(x.idea.capitalEstimado)}${x.idea.encajeOrden ? ` · encaje #${x.idea.encajeOrden} en Macará` : ''}</span>
          </span>
          <span class="rank-pct">${x.pct}%</span>
        </div>`).join('')}
    </div>

    <div class="card card-ok">
      <div class="card-head"><h2>¿Y ahora qué?</h2></div>
      <p class="txt-dim mb">${esc(D.CATEGORIA_C.recomendacionFoco)}</p>
      <div class="row">
        <button class="btn btn-primary" data-elegir="${top.idea.id}">Elegir esta y empezar →</button>
        <button class="btn btn-ghost" data-go="ideas">Ver todas las ideas</button>
      </div>
    </div>`;

  $$('[data-idea]', body).forEach(e => e.onclick = () => { verDetalle(e.dataset.idea); });
  $$('[data-elegir]', body).forEach(e => e.onclick = () => elegirIdea(e.dataset.elegir));
}

function elegirIdea(id) {
  const idea = D.IDEAS.find(i => i.id === id);
  S.elegida = id; guardar();
  modal({
    titulo: `¿Elegir "${esc(idea.nombre)}"?`,
    cuerpo: `<p>Vas a enfocarte en <b>un solo negocio durante 90 días</b>. El informe A1 es claro: la causa más común de fracaso a esta edad no es falta de ideas, sino dispersión en varias ideas a la vez.</p>
             <p class="txt-dim">Puedes cambiarla cuando quieras desde la pantalla de inicio.</p>`,
    acciones: [
      { id: 'no', txt: 'Todavía no' },
      { id: 'si', txt: 'Sí, elegir', cls: 'btn-primary', fn: () => { toast('¡Elegida! Ahora sigue los pasos.'); go('detalle'); } }
    ]
  });
}

/* ==========================================================================
   IDEAS
   ========================================================================== */
function renderIdeas() {
  $('#ideas-ranking-note').innerHTML = `
    <div class="aviso warn">
      <span class="aviso-i">⚠️</span>
      <div><b>Advertencia metodológica.</b> ${esc(D.ADVERTENCIA_RANKING)}</div>
    </div>`;
  const orden = [...D.IDEAS].sort((a, b) => (a.encajeOrden || 99) - (b.encajeOrden || 99));
  $('#ideas-list').innerHTML = orden.map(i => `
    <div class="card" style="cursor:pointer" data-idea="${i.id}">
      <div class="row" style="justify-content:space-between;align-items:flex-start">
        <div class="row" style="gap:13px;flex:1;align-items:flex-start">
          <span style="font-size:30px">${i.emoji}</span>
          <div style="flex:1;min-width:0">
            <div style="font-weight:750;font-size:16px;letter-spacing:-.3px">${esc(i.nombre)}</div>
            <div class="txt-dim" style="margin-top:4px">${esc(i.resumen)}</div>
          </div>
        </div>
      </div>
      <div class="row mt" style="gap:7px">
        <span class="badge ${i.cat === 'A' ? 'b-acc' : 'b-dim'}">Categoría ${i.cat}</span>
        ${i.encajeOrden ? `<span class="badge b-ok">Encaje #${i.encajeOrden} en Macará</span>` : '<span class="badge b-dim">Sin ranking</span>'}
        <span class="badge ${i.requiereInventario ? 'b-warn' : 'b-ok'}">${i.requiereInventario ? 'Con inventario' : 'Sin inventario'}</span>
        ${S.elegida === i.id ? '<span class="badge b-ok">✓ Tu elección</span>' : ''}
      </div>
    </div>`).join('');
  $$('[data-idea]', $('#ideas-list')).forEach(e => e.onclick = () => verDetalle(e.dataset.idea));

  $('#catc-title').textContent = '🚫 ' + D.CATEGORIA_C.titulo;
  $('#catc-body').innerHTML = `
    <p class="txt-dim mb">${esc(D.CATEGORIA_C.nota)}</p>
    ${D.CATEGORIA_C.items.map(x => `
      <div class="step" style="border-left-color:var(--bad)">
        <div class="step-t">${esc(x.nombre)}</div>
        <div class="step-d">${esc(x.motivo)}</div>
      </div>`).join('')}
    <div class="aviso info" style="margin-bottom:0">
      <span class="aviso-i">💡</span>
      <div><b>Recomendación de foco:</b> ${esc(D.CATEGORIA_C.recomendacionFoco)}</div>
    </div>`;
}

function verDetalle(id) { S._detalle = id; go('detalle'); }

function renderDetalle() {
  const i = D.IDEAS.find(x => x.id === S._detalle) || D.IDEAS.find(x => x.id === S.elegida);
  const body = $('#detalle-body');
  if (!i) { body.innerHTML = '<div class="empty">Elige una idea primero.</div>'; return; }
  const plan = D.PLANES[i.id];
  const esElegida = S.elegida === i.id;

  body.innerHTML = `
    <div class="page-head">
      <button class="btn-back" data-go="ideas">←</button>
      <div style="flex:1">
        <h1>${i.emoji} ${esc(i.nombre)}</h1>
        <div class="row" style="gap:7px;margin-top:7px">
          <span class="badge ${i.cat === 'A' ? 'b-acc' : 'b-dim'}">Categoría ${i.cat}</span>
          ${i.encajeOrden ? `<span class="badge b-ok">Encaje #${i.encajeOrden} en Macará</span>` : '<span class="badge b-dim">Sin ranking en §3.3</span>'}
          <span class="badge ${i.requiereInventario ? 'b-warn' : 'b-ok'}">${i.requiereInventario ? 'Con inventario' : 'Sin inventario'}</span>
        </div>
      </div>
    </div>

    <div class="card card-acc">
      <p class="txt-dim">${esc(i.resumen)}</p>
      <div class="sep"></div>
      <p class="txt-dim mb"><b style="color:var(--txt)">Por qué encaja a los 16:</b> ${esc(i.porQueEncaja16)}</p>
      <p class="txt-dim mb"><b style="color:var(--txt)">Por qué encaja en Macará:</b> ${esc(i.encajeMacara)}</p>
      <div class="aviso warn" style="margin-bottom:0">
        <span class="aviso-i">⚠️</span>
        <div><b>Riesgo principal:</b> ${esc(i.riesgoPrincipal)}<br><b>Qué falta verificar:</b> ${esc(i.faltaVerificar)}</div>
      </div>
    </div>

    ${!esElegida ? `<button class="btn btn-primary btn-lg mb" data-elegir="${i.id}">Elegir este negocio →</button>`
      : `<div class="aviso ok"><span class="aviso-i">✅</span><div><b>Este es tu negocio elegido.</b> Sigue el plan de 90 días desde la pestaña Plan.</div></div>`}

    <div class="card">
      <div class="card-head"><h2>✅ Pros</h2></div>
      <ul class="plist">${plan.pros.map(p => `<li><span class="pmark p">✓</span><span>${esc(p)}</span></li>`).join('')}</ul>
    </div>

    <div class="card">
      <div class="card-head"><h2>⛔ Contras y riesgos</h2></div>
      <ul class="plist">${plan.contras.map(p => `<li><span class="pmark c">✕</span><span>${esc(p)}</span></li>`).join('')}</ul>
    </div>

    <div class="card">
      <div class="card-head"><h2>📋 Guía paso a paso</h2></div>
      <p class="txt-dim mb">Ocho pasos. El paso 3 siempre es el comparador de 3 precios, porque sin 3 fuentes locales no existe un precio defendible.</p>
      ${plan.pasos.map((p, n) => `
        <div class="step">
          <div class="step-t">${esc(p.t)}</div>
          <div class="step-d">${esc(p.d)}</div>
          ${n === 2 ? `<button class="btn btn-ghost btn-sm mt" data-go="precios">Abrir comparador de precios →</button>` : ''}
          ${n === 3 ? `<button class="btn btn-ghost btn-sm mt" data-go="cuentas">Abrir calculadora →</button>` : ''}
        </div>`).join('')}
    </div>

    <div class="card">
      <div class="card-head"><h2>🧠 Lo que necesitas aprender</h2></div>
      ${plan.aprender.map(a => `
        <div class="step" style="border-left-color:var(--acc2)">
          <div class="step-t">${esc(a.h)}</div>
          <div class="step-d">${esc(a.c)}</div>
        </div>`).join('')}
    </div>

    <div class="card">
      <div class="card-head"><h2>🧰 Herramientas que necesitas</h2></div>
      <ul class="plist">${plan.herramientas.map(h => `<li><span class="pmark p">›</span><span>${esc(h)}</span></li>`).join('')}</ul>
      <button class="btn btn-ghost btn-sm mt" data-go="habilidades">Ver las 6 habilidades y las herramientas gratuitas →</button>
    </div>

    <div class="card card-warn">
      <div class="card-head"><h2>⚠️ Antes de gastar un dólar</h2></div>
      <p class="txt-dim mb">${esc(D.GUIA_GENERAL.legalPrimero.intro)}</p>
      <p class="txt-dim">${esc(D.GUIA_GENERAL.precios.motivo)}</p>
      <button class="btn btn-ghost btn-sm mt" data-go="padres">Ver modo padre / tutor →</button>
    </div>`;

  $$('[data-elegir]', body).forEach(e => e.onclick = () => elegirIdea(e.dataset.elegir));
}

/* ==========================================================================
   CUENTAS — concepto de negocio en 1 página
   ========================================================================== */
function renderCuentas() {
  const c = S.cuentas;
  const costo = parseFloat(c.costo) || 0;
  const precio = parseFloat(c.precio) || 0;
  const inv = parseFloat(c.inversion) || 0;
  const ganancia = precio - costo;
  const margen = precio > 0 ? (ganancia / precio) * 100 : 0;
  const equilibrio = ganancia > 0 ? Math.ceil(inv / ganancia) : null;
  const listo = equilibrio !== null && equilibrio > 0;

  $('#cuentas-body').innerHTML = `
    <div class="aviso info">
      <span class="aviso-i">🧮</span>
      <div>${esc(D.CONCEPTO_1_PAGINA.intro)}</div>
    </div>

    <div class="card">
      <div class="card-head"><h2>1 · ¿Qué vendo exactamente?</h2></div>
      <div class="field">
        <input class="inp" id="c-producto" placeholder="Ej: agua fría y snacks en los partidos" value="${esc(c.producto)}">
      </div>
    </div>

    <div class="card">
      <div class="card-head"><h2>2 · ¿A quién se lo vendo?</h2></div>
      <div class="field">
        <label>Personas concretas, no "a todos" <span class="hint">Ej: a los jugadores y al público del partido del domingo en la cancha central</span></label>
        <input class="inp" id="c-meta" placeholder="¿Quiénes exactamente?" value="${esc(c.meta)}">
      </div>
    </div>

    <div class="card">
      <div class="card-head"><h2>3 y 4 · Costo y precio</h2></div>
      <div class="grid2">
        <div class="field">
          <label>¿Cuánto me cuesta? (USD) <span class="hint">Por unidad, incluyendo envío</span></label>
          <input class="inp" id="c-costo" type="number" inputmode="decimal" step="0.01" min="0" placeholder="0.00" value="${esc(c.costo)}">
        </div>
        <div class="field">
          <label>¿A cuánto lo vendo? (USD) <span class="hint">Precio de venta por unidad</span></label>
          <input class="inp" id="c-precio" type="number" inputmode="decimal" step="0.01" min="0" placeholder="0.00" value="${esc(c.precio)}">
        </div>
      </div>
      <div class="field" style="margin-bottom:0">
        <label>¿Cuánto invertí en total? (USD) <span class="hint">Lo que gastaste en inventario o materiales</span></label>
        <input class="inp" id="c-inversion" type="number" inputmode="decimal" step="0.01" min="0" placeholder="0.00" value="${esc(c.inversion)}">
      </div>
    </div>

    <div class="card ${listo ? 'card-ok' : 'card-warn'}">
      <div class="card-head"><h2>5 y 6 · Lo que gano y lo que necesito vender</h2></div>
      <div class="metrics">
        <div class="metric ${ganancia > 0 ? 'ok' : 'bad'}">
          <div class="metric-v">${usd(ganancia)}</div>
          <div class="metric-l">Ganas por unidad</div>
        </div>
        <div class="metric ${margen >= 30 ? 'ok' : margen > 0 ? 'warn' : 'bad'}">
          <div class="metric-v">${margen.toFixed(1)}%</div>
          <div class="metric-l">Margen sobre el precio</div>
        </div>
        <div class="metric ${listo ? 'acc' : 'bad'}">
          <div class="metric-v">${listo ? equilibrio : '—'}</div>
          <div class="metric-l">Unidades para recuperar lo invertido</div>
        </div>
      </div>
      ${ganancia <= 0
        ? `<div class="aviso bad" style="margin-bottom:0"><span class="aviso-i">🚨</span>
             <div><b>Estás vendiendo al costo o por debajo.</b> Si el precio no supera el costo, cada venta te hace perder dinero. Revisa el precio con el comparador de 3 fuentes.</div></div>`
        : !listo
        ? `<div class="aviso warn" style="margin-bottom:0"><span class="aviso-i">⚠️</span>
             <div><b>Todavía no puedes llenar el paso 6 con un número.</b> Falta la inversión total. ${esc(D.CONCEPTO_1_PAGINA.criterio)}</div></div>`
        : `<div class="aviso ok" style="margin-bottom:0"><span class="aviso-i">✅</span>
             <div><b>Puedes llenar el paso 6 con un número: ${equilibrio} unidades.</b> Hasta vender esas ${equilibrio}, no has recuperado lo invertido. A partir de la ${equilibrio + 1} empiezas a ganar.</div></div>`}
    </div>

    <div class="card">
      <div class="card-head"><h2>7 · ¿Cómo sé si funcionó?</h2></div>
      <div class="field" style="margin-bottom:0">
        <label>Una meta medible <span class="hint">Ej: vender 40 unidades en los 4 partidos de agosto</span></label>
        <input class="inp" id="c-meta2" placeholder="¿Qué número te diría que funcionó?" value="${esc(c.metaMedible || '')}">
      </div>
    </div>

    <div class="card card-warn">
      <div class="card-head"><h2>⚠️ Regla de oro del presupuesto</h2></div>
      <p class="txt-dim mb">${esc(D.GUIA_GENERAL.presupuesto.reglaOro)}</p>
      <div class="scroll-x">
        <table class="tbl">
          <thead><tr><th>Rubro</th><th class="num">150 USD</th><th class="num">400 USD</th><th>Nota</th></tr></thead>
          <tbody>
            ${D.GUIA_GENERAL.presupuesto.rubros.map(r => `
              <tr><td>${esc(r.nombre)}</td><td class="num">${usd(r.t150)}</td><td class="num">${usd(r.t400)}</td>
              <td class="txt-dim" style="font-size:12px">${esc(r.nota)}</td></tr>`).join('')}
            <tr style="background:rgba(91,140,255,.09)">
              <td><b>Total</b></td><td class="num"><b>${usd(150)}</b></td><td class="num"><b>${usd(400)}</b></td><td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="txt-dim mt" style="font-size:12px">${esc(D.GUIA_GENERAL.presupuesto.nota)}</p>
    </div>`;

  const bind = (sel, key, num) => {
    const el = $(sel); if (!el) return;
    el.oninput = () => { S.cuentas[key] = el.value; guardar(); if (num) refrescarCuentas(); };
  };
  bind('#c-producto', 'producto'); bind('#c-meta', 'meta'); bind('#c-meta2', 'metaMedible');
  bind('#c-costo', 'costo', 1); bind('#c-precio', 'precio', 1); bind('#c-inversion', 'inversion', 1);
}

let cuentasTimer = null;
function refrescarCuentas() {
  clearTimeout(cuentasTimer);
  cuentasTimer = setTimeout(() => {
    const act = document.activeElement;
    const id = act?.id, pos = act?.selectionStart;
    renderCuentas();
    if (id) { const el = document.getElementById(id); if (el) { el.focus(); try { el.setSelectionRange(pos, pos); } catch {} } }
  }, 420);
}

/* ==========================================================================
   COMPARADOR DE 3 PRECIOS (mediana)
   ========================================================================== */
function mediana(nums) {
  const v = nums.filter(n => Number.isFinite(n)).sort((a, b) => a - b);
  if (!v.length) return null;
  const m = Math.floor(v.length / 2);
  return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;
}

function renderPrecios() {
  const lista = Object.entries(S.fuentes).map(([id, f]) => ({ id, ...f }));
  const actual = S._fuenteActiva && S.fuentes[S._fuenteActiva] ? S._fuenteActiva : (lista[0]?.id || null);
  const f = actual ? S.fuentes[actual] : null;

  $('#precios-body').innerHTML = `
    <div class="aviso warn">
      <span class="aviso-i">⚠️</span>
      <div><b>${esc(D.GUIA_GENERAL.precios.titulo)}</b><br>${esc(D.GUIA_GENERAL.precios.motivo)}</div>
    </div>

    <div class="card">
      <div class="card-head"><h2>Cómo se hace bien</h2></div>
      <ul class="plist">${D.GUIA_GENERAL.precios.pasos.map((p, n) =>
        `<li><span class="li-num">${n + 1}</span><span>${esc(p)}</span></li>`).join('')}</ul>
      <div class="aviso ok mt" style="margin-bottom:0"><span class="aviso-i">🎯</span><div>${esc(D.GUIA_GENERAL.precios.cierre)}</div></div>
    </div>

    <div class="card">
      <div class="card-head"><h2>Mis productos a comparar</h2></div>
      <div class="row">
        <input class="inp" id="nuevo-prod" placeholder="Nombre del producto o servicio" style="flex:1;min-width:180px">
        <button class="btn btn-primary" id="add-prod">+ Agregar</button>
      </div>
      ${lista.length ? `<div class="row mt" style="gap:7px">${lista.map(x => `
        <button class="badge ${x.id === actual ? 'b-acc' : 'b-dim'}" data-prod="${x.id}" style="cursor:pointer;padding:8px 13px;font-size:12px">
          ${esc(x.nombre)}${x.cerrado ? ' 🔒' : ''}
        </button>`).join('')}</div>` : ''}
    </div>

    ${f ? renderFuenteForm(actual, f) : `<div class="empty"><div class="empty-ico">🔍</div><div>Agrega un producto para empezar a comparar precios.</div></div>`}`;

  $('#add-prod').onclick = () => {
    const n = $('#nuevo-prod').value.trim();
    if (!n) return toast('Escribe el nombre del producto.');
    const id = 'f' + Date.now();
    S.fuentes[id] = { nombre: n, v: [{}, {}, {}], costoProveedor: '', cerrado: false };
    S._fuenteActiva = id; guardar(); renderPrecios();
  };
  $$('[data-prod]').forEach(b => b.onclick = () => { S._fuenteActiva = b.dataset.prod; renderPrecios(); });

  if (f) {
    $$('[data-v]').forEach(inp => inp.oninput = () => {
      const [i, campo] = inp.dataset.v.split('.');
      S.fuentes[actual].v[+i][campo] = inp.value;
      guardar(); actualizarMediana(actual);
    });
    const cp = $('#costo-prov');
    if (cp) cp.oninput = () => { S.fuentes[actual].costoProveedor = cp.value; guardar(); actualizarMediana(actual); };
    const del = $('#del-prod');
    if (del) del.onclick = () => modal({
      titulo: '¿Borrar este producto?',
      cuerpo: `<p>Se borrarán las 3 fuentes de <b>${esc(f.nombre)}</b>.</p>`,
      acciones: [{ id: 'no', txt: 'Cancelar' }, { id: 'si', txt: 'Borrar', cls: 'btn-danger', fn: () => { delete S.fuentes[actual]; S._fuenteActiva = null; guardar(); renderPrecios(); } }]
    });
    const usar = $('#usar-precio');
    if (usar) usar.onclick = () => {
      const med = mediana(f.v.map(x => parseFloat(x.precio)));
      if (med == null) return toast('Completa al menos un precio.');
      S.cuentas.precio = med.toFixed(2); guardar();
      toast('Precio aplicado a tus cuentas: ' + usd(med));
    };
    const usarC = $('#usar-costo');
    if (usarC) usarC.onclick = () => {
      const c = parseFloat(f.costoProveedor);
      if (!Number.isFinite(c)) return toast('Escribe el costo del proveedor.');
      S.cuentas.costo = c.toFixed(2); guardar();
      toast('Costo aplicado a tus cuentas: ' + usd(c));
    };
  }
}

function renderFuenteForm(id, f) {
  const precios = f.v.map(x => parseFloat(x.precio));
  const med = mediana(precios);
  const validos = precios.filter(n => Number.isFinite(n)).length;
  const costo = parseFloat(f.costoProveedor);
  const margenU = Number.isFinite(med) && Number.isFinite(costo) ? med - costo : null;
  const margenP = Number.isFinite(med) && med > 0 && margenU != null ? (margenU / med) * 100 : null;

  return `
    <div class="card card-acc">
      <div class="card-head">
        <h2>${esc(f.nombre)}</h2>
        <button class="btn btn-danger btn-sm" id="del-prod">Borrar</button>
      </div>

      <div class="aviso info">
        <span class="aviso-i">📝</span>
        <div>Anota <b>vendedor, URL o dirección, fecha, modelo, precio, IVA y envío</b> de cada uno. Los 3 deben ser vendedores <b>distintos</b>.</div>
      </div>

      ${f.v.map((v, i) => `
        <div class="card" style="background:var(--card2);margin-bottom:11px">
          <div style="font-weight:750;margin-bottom:11px;font-size:14px">Fuente ${i + 1}</div>
          <div class="grid2">
            <div class="field" style="margin-bottom:11px">
              <label>Vendedor</label>
              <input class="inp" data-v="${i}.vendedor" placeholder="Nombre del negocio" value="${esc(v.vendedor || '')}">
            </div>
            <div class="field" style="margin-bottom:11px">
              <label>URL o dirección</label>
              <input class="inp" data-v="${i}.url" placeholder="https:// o dirección" value="${esc(v.url || '')}">
            </div>
            <div class="field" style="margin-bottom:11px">
              <label>Fecha de consulta</label>
              <input class="inp" type="date" data-v="${i}.fecha" value="${esc(v.fecha || hoy())}">
            </div>
            <div class="field" style="margin-bottom:11px">
              <label>Modelo</label>
              <input class="inp" data-v="${i}.modelo" placeholder="Modelo o presentación" value="${esc(v.modelo || '')}">
            </div>
            <div class="field" style="margin-bottom:11px">
              <label>Precio (USD)</label>
              <input class="inp" type="number" inputmode="decimal" step="0.01" data-v="${i}.precio" placeholder="0.00" value="${esc(v.precio || '')}">
            </div>
            <div class="field" style="margin-bottom:0">
              <label>Envío (USD)</label>
              <input class="inp" type="number" inputmode="decimal" step="0.01" data-v="${i}.envio" placeholder="0.00" value="${esc(v.envio || '')}">
            </div>
          </div>
        </div>`).join('')}

      <div id="mediana-box">${htmlMediana(med, validos, costo, margenU, margenP)}</div>
    </div>

    <div class="card">
      <div class="card-head"><h2>Costo del proveedor</h2></div>
      <div class="field">
        <label>¿A cuánto te lo vende tu proveedor? (USD) <span class="hint">Para comparar contra la mediana del mercado</span></label>
        <input class="inp" id="costo-prov" type="number" inputmode="decimal" step="0.01" placeholder="0.00" value="${esc(f.costoProveedor || '')}">
      </div>
      <div class="row">
        <button class="btn btn-ok btn-sm" id="usar-precio">Usar la mediana como mi precio de venta</button>
        <button class="btn btn-ghost btn-sm" id="usar-costo">Usar el costo del proveedor</button>
      </div>
    </div>`;
}

function htmlMediana(med, validos, costo, margenU, margenP) {
  if (med == null) {
    return `<div class="aviso warn" style="margin-bottom:0"><span class="aviso-i">⏳</span>
      <div>Faltan precios. Llevas <b>${validos} de 3</b>. Sin 3 fuentes reales no hay mediana ni precio defendible.</div></div>`;
  }
  return `
    <div class="metrics" style="margin-bottom:12px">
      <div class="metric ${validos >= 3 ? 'ok' : 'warn'}">
        <div class="metric-v">${usd(med)}</div>
        <div class="metric-l">Mediana del mercado</div>
      </div>
      <div class="metric ${validos >= 3 ? 'ok' : 'warn'}">
        <div class="metric-v">${validos}/3</div>
        <div class="metric-l">Fuentes consultadas</div>
      </div>
      ${margenU != null ? `
        <div class="metric ${margenU > 0 ? 'ok' : 'bad'}">
          <div class="metric-v">${usd(margenU)}</div>
          <div class="metric-l">Ganancia por unidad vs proveedor</div>
        </div>
        <div class="metric ${margenP >= 30 ? 'ok' : margenP > 0 ? 'warn' : 'bad'}">
          <div class="metric-v">${margenP.toFixed(1)}%</div>
          <div class="metric-l">Margen estimado</div>
        </div>` : ''}
    </div>
    ${validos >= 3
      ? `<div class="aviso ok" style="margin-bottom:0"><span class="aviso-i">✅</span>
           <div><b>Tienes las 3 fuentes.</b> La mediana es ${usd(med)}. Con esto A1 sí puede ejecutar P-AB2/P-AB3 y emitir un informe con margen y puntuación.</div></div>`
      : `<div class="aviso warn" style="margin-bottom:0"><span class="aviso-i">⚠️</span>
           <div><b>Mediana provisional.</b> Solo con ${validos} fuente(s). Consulta ${3 - validos} vendedor(es) más antes de fijar el precio.</div></div>`}`;
}

function actualizarMediana(id) {
  const f = S.fuentes[id]; if (!f) return;
  const box = $('#mediana-box'); if (!box) return;
  const precios = f.v.map(x => parseFloat(x.precio));
  const med = mediana(precios);
  const validos = precios.filter(n => Number.isFinite(n)).length;
  const costo = parseFloat(f.costoProveedor);
  const margenU = Number.isFinite(med) && Number.isFinite(costo) ? med - costo : null;
  const margenP = Number.isFinite(med) && med > 0 && margenU != null ? (margenU / med) * 100 : null;
  box.innerHTML = htmlMediana(med, validos, costo, margenU, margenP);
}

/* ==========================================================================
   PLAN DE 90 DÍAS
   ========================================================================== */
function renderPlan90() {
  const body = $('#plan90-body');
  const total = D.PLAN_90.etapas.reduce((a, e) => a + e.tareas.length, 0);
  const hechas = Object.values(S.plan).filter(Boolean).length;
  const pct = Math.round(hechas / total * 100);

  body.innerHTML = `
    ${S.elegida ? `<div class="aviso ok"><span class="aviso-i">🎯</span>
      <div>Tu negocio elegido: <b>${esc(D.IDEAS.find(i => i.id === S.elegida)?.nombre)}</b></div></div>`
      : `<div class="aviso warn"><span class="aviso-i">⚠️</span>
      <div><b>Todavía no has elegido un negocio.</b> Puedes hacer el plan igual, pero funciona mejor con una idea concreta. <button class="btn btn-ghost btn-sm" data-go="test" style="margin-top:8px">Hacer el test</button></div></div>`}

    <div class="card">
      <div class="progress-wrap" style="margin-bottom:10px">
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        <span class="progress-label">${pct}%</span>
      </div>
      <p class="txt-dim">${hechas} de ${total} tareas completadas.</p>
    </div>

    ${D.PLAN_90.etapas.map((e, idx) => {
      const th = e.tareas.filter((_, i) => S.plan[e.id + '_' + i]).length;
      const abierto = S._etapaAbierta === e.id || (S._etapaAbierta == null && idx === 0);
      return `
      <div class="etapa${abierto ? ' open' : ''}" data-etapa="${e.id}">
        <div class="etapa-h">
          <span class="etapa-e">${e.emoji}</span>
          <span class="etapa-tx">
            <span class="etapa-n">${esc(e.nombre)} <span style="color:var(--dim2);font-weight:600;font-size:13px">· Días ${esc(e.dias)}</span></span>
            <span class="etapa-d">${esc(e.objetivo)}</span>
          </span>
          <span class="etapa-pct">${th}/${e.tareas.length}</span>
          <span class="chev">▼</span>
        </div>
        <div class="etapa-body" style="${abierto ? '' : 'display:none'}">
          <div class="aviso info" style="margin-bottom:12px"><span class="aviso-i">📦</span>
            <div><b>Entregable:</b> ${esc(e.entregable)}</div></div>
          ${e.tareas.map((t, i) => {
            const k = e.id + '_' + i, done = !!S.plan[k];
            return `<div class="check${done ? ' done' : ''}" data-task="${k}">
              <span class="cbox">✓</span><span class="check-t">${esc(t)}</span></div>`;
          }).join('')}
        </div>
      </div>`;
    }).join('')}

    <div class="card card-warn">
      <div class="card-head"><h2>⚖️ Criterio de decisión honesto</h2></div>
      <p class="txt-dim">${esc(D.PLAN_90.criterioHonesto)}</p>
    </div>`;

  $$('[data-etapa]').forEach(el => {
    const h = el.querySelector('.etapa-h'), b = el.querySelector('.etapa-body');
    h.onclick = () => {
      const abrir = b.style.display === 'none';
      b.style.display = abrir ? '' : 'none';
      el.classList.toggle('open', abrir);
      S._etapaAbierta = abrir ? el.dataset.etapa : null;
    };
  });
  $$('[data-task]').forEach(el => el.onclick = () => {
    const k = el.dataset.task;
    S.plan[k] = !S.plan[k]; guardar();
    el.classList.toggle('done', !!S.plan[k]);
    const etapa = k.split('_')[0];
    const e = D.PLAN_90.etapas.find(x => x.id === etapa);
    const th = e.tareas.filter((_, i) => S.plan[etapa + '_' + i]).length;
    const cont = $(`[data-etapa="${etapa}"]`);
    cont.querySelector('.etapa-pct').textContent = `${th}/${e.tareas.length}`;
    const tot = D.PLAN_90.etapas.reduce((a, x) => a + x.tareas.length, 0);
    const hh = Object.values(S.plan).filter(Boolean).length;
    const p = Math.round(hh / tot * 100);
    $('.progress-fill', body).style.width = p + '%';
    $('.progress-label', body).textContent = p + '%';
    $('.txt-dim', $('.card', body)).textContent = `${hh} de ${tot} tareas completadas.`;
  });
}

/* ==========================================================================
   LIBRETA DIARIA
   ========================================================================== */
function renderLibreta() {
  const movs = S.libreta;
  const ing = movs.filter(m => m.tipo === 'ingreso').reduce((a, m) => a + m.monto, 0);
  const gas = movs.filter(m => m.tipo === 'gasto').reduce((a, m) => a + m.monto, 0);
  const saldo = ing - gas;
  const caja = parseFloat(S.cuentas.inversion) || 0;
  const efectivo = caja + saldo;

  const porDia = {};
  movs.forEach(m => { porDia[m.fecha] = porDia[m.fecha] || { i: 0, g: 0 }; porDia[m.fecha][m.tipo === 'ingreso' ? 'i' : 'g'] += m.monto; });
  const dias = Object.keys(porDia).sort().reverse();

  $('#libreta-body').innerHTML = `
    <div class="aviso info">
      <span class="aviso-i">⭐</span>
      <div><b>${esc(D.HABILIDADES[0].h)}</b> es la habilidad #1 y la menos divertida. ${esc(D.NOTA_HABILIDAD_1)}</div>
    </div>

    <div class="metrics">
      <div class="metric ok"><div class="metric-v">${usd(ing)}</div><div class="metric-l">Total ingresos</div></div>
      <div class="metric bad"><div class="metric-v">${usd(gas)}</div><div class="metric-l">Total gastos</div></div>
      <div class="metric ${saldo >= 0 ? 'acc' : 'bad'}"><div class="metric-v">${usd(saldo)}</div><div class="metric-l">Ganancia real</div></div>
      <div class="metric"><div class="metric-v">${movs.length}</div><div class="metric-l">Movimientos registrados</div></div>
    </div>

    ${caja > 0 ? `<div class="aviso ${efectivo >= 0 ? 'info' : 'warn'}">
      <span class="aviso-i">💰</span>
      <div>Inversión inicial declarada: <b>${usd(caja)}</b> · Efectivo estimado hoy: <b>${usd(efectivo)}</b>
      <br><span style="font-size:12px;opacity:.85">Es un cálculo de la app a partir de lo que registraste; no es un saldo bancario verificado.</span></div>
    </div>` : ''}

    <div class="card card-acc">
      <div class="card-head"><h2>Registrar movimiento</h2></div>
      <div class="grid2">
        <div class="field">
          <label>Tipo</label>
          <select class="inp" id="l-tipo">
            <option value="ingreso">💵 Entró dinero (venta)</option>
            <option value="gasto">💸 Salió dinero (compra/gasto)</option>
          </select>
        </div>
        <div class="field">
          <label>Monto (USD)</label>
          <input class="inp" id="l-monto" type="number" inputmode="decimal" step="0.01" min="0" placeholder="0.00">
        </div>
      </div>
      <div class="field">
        <label>¿Qué pasó? <span class="hint">Ej: vendí 6 aguas en el partido del domingo</span></label>
        <input class="inp" id="l-desc" placeholder="Describe el movimiento">
      </div>
      <div class="grid2">
        <div class="field">
          <label>Fecha</label>
          <input class="inp" id="l-fecha" type="date" value="${hoy()}">
        </div>
        <div class="field">
          <label>Stock que queda <span class="hint">Opcional</span></label>
          <input class="inp" id="l-stock" type="number" inputmode="numeric" placeholder="Unidades">
        </div>
      </div>
      <button class="btn btn-primary btn-lg" id="l-add">+ Registrar</button>
    </div>

    <div class="card">
      <div class="card-head">
        <h2>Mis movimientos</h2>
        ${movs.length ? '<button class="btn btn-danger btn-sm" id="l-csv">Exportar</button>' : ''}
      </div>
      ${!movs.length
        ? `<div class="empty"><div class="empty-ico">📒</div><div>Tu libreta está vacía. Registra la primera venta o compra.</div></div>`
        : dias.map(d => `
            <div style="margin-bottom:15px">
              <div class="row" style="justify-content:space-between;margin-bottom:8px">
                <b style="font-size:13px;color:var(--dim)">${fmtFecha(d)}</b>
                <span class="txt-dim" style="font-size:12px">
                  ${porDia[d].i ? `+${usd(porDia[d].i)}` : ''}${porDia[d].i && porDia[d].g ? ' · ' : ''}${porDia[d].g ? `−${usd(porDia[d].g)}` : ''}
                </span>
              </div>
              ${movs.filter(m => m.fecha === d).map(m => `
                <div class="mov">
                  <span class="mov-ico">${m.tipo === 'ingreso' ? '💵' : '💸'}</span>
                  <span class="mov-tx">
                    <span class="mov-d">${esc(m.desc || (m.tipo === 'ingreso' ? 'Venta' : 'Gasto'))}</span>
                    <span class="mov-m">${m.tipo === 'ingreso' ? 'Ingreso' : 'Gasto'}${m.stock !== '' && m.stock != null ? ` · stock: ${esc(m.stock)}` : ''}</span>
                  </span>
                  <span class="mov-v ${m.tipo === 'ingreso' ? 'in' : 'out'}">${m.tipo === 'ingreso' ? '+' : '−'}${usd(m.monto)}</span>
                  <button class="mov-x" data-del="${m.id}">✕</button>
                </div>`).join('')}
            </div>`).join('')}
    </div>

    <div class="card">
      <div class="card-head"><h2>Registro mínimo que pide el informe</h2></div>
      <ul class="plist">${D.GUIA_GENERAL.registroMinimo.campos.map(c =>
        `<li><span class="pmark p">✓</span><span>${esc(c)}</span></li>`).join('')}</ul>
      <p class="txt-dim mt">${esc(D.GUIA_GENERAL.registroMinimo.herramienta)}</p>
    </div>

    ${movs.length ? `<button class="btn btn-danger btn-lg" id="l-borrar">Borrar toda la libreta</button>` : ''}`;

  $('#l-add').onclick = () => {
    const monto = parseFloat($('#l-monto').value);
    if (!Number.isFinite(monto) || monto <= 0) return toast('Escribe un monto mayor que cero.');
    const desc = $('#l-desc').value.trim();
    if (!desc) return toast('Escribe qué pasó.');
    S.libreta.push({
      id: 'm' + Date.now(), tipo: $('#l-tipo').value, monto,
      desc, fecha: $('#l-fecha').value || hoy(), stock: $('#l-stock').value
    });
    guardar(); renderLibreta(); toast('Movimiento registrado ✓');
  };
  $$('[data-del]').forEach(b => b.onclick = () => {
    S.libreta = S.libreta.filter(m => m.id !== b.dataset.del); guardar(); renderLibreta();
  });
  const bc = $('#l-borrar');
  if (bc) bc.onclick = () => modal({
    titulo: '¿Borrar toda la libreta?',
    cuerpo: `<p>Se borrarán los <b>${movs.length}</b> movimientos. Esto no se puede deshacer.</p>`,
    acciones: [{ id: 'no', txt: 'Cancelar' }, { id: 'si', txt: 'Borrar todo', cls: 'btn-danger', fn: () => { S.libreta = []; guardar(); renderLibreta(); } }]
  });
  const csv = $('#l-csv');
  if (csv) csv.onclick = () => {
    const filas = [['Fecha', 'Tipo', 'Descripcion', 'Monto', 'Stock']];
    [...movs].sort((a, b) => a.fecha.localeCompare(b.fecha)).forEach(m =>
      filas.push([m.fecha, m.tipo, '"' + (m.desc || '').replace(/"/g, '""') + '"', m.monto.toFixed(2), m.stock || '']));
    filas.push([], ['Total ingresos', '', '', ing.toFixed(2)], ['Total gastos', '', '', gas.toFixed(2)], ['Ganancia real', '', '', saldo.toFixed(2)]);
    const blob = new Blob(['\ufeff' + filas.map(f => f.join(',')).join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `libreta-${hoy()}.csv`; a.click();
    URL.revokeObjectURL(a.href); toast('Libreta exportada.');
  };
}

/* ==========================================================================
   HABILIDADES Y HERRAMIENTAS
   ========================================================================== */
function renderHabilidades() {
  $('#habilidades-body').innerHTML = `
    <div class="card card-acc">
      <div class="card-head"><h2>Las 6 habilidades que importan a los 16</h2></div>
      <p class="txt-dim mb">En orden de prioridad. La primera vale más que las otras cinco juntas.</p>
      ${D.HABILIDADES.map(h => `
        <div class="step" style="border-left-color:${h.estrella ? 'var(--ok)' : 'var(--acc)'}">
          <div class="row" style="justify-content:space-between;margin-bottom:6px">
            <b style="font-size:15px;color:${h.estrella ? '#8ff0b5' : '#cfe0ff'}">${h.n}. ${esc(h.h)}</b>
            ${h.estrella ? '<span class="badge b-ok">La más importante</span>' : ''}
          </div>
          <div class="step-d mb"><b>Qué significa:</b> ${esc(h.q)}</div>
          <div class="step-d"><b>Cómo se practica esta semana:</b> ${esc(h.p)}</div>
        </div>`).join('')}
      <div class="aviso ok" style="margin-bottom:0"><span class="aviso-i">⭐</span><div>${esc(D.NOTA_HABILIDAD_1)}</div></div>
    </div>

    <div class="card card-warn">
      <div class="card-head"><h2>${esc(D.HERRAMIENTAS.reglaIA.titulo)}</h2></div>
      <p class="txt-dim">${esc(D.HERRAMIENTAS.reglaIA.texto)}</p>
    </div>

    <div class="card">
      <div class="card-head"><h2>🤖 Herramientas con IA</h2></div>
      ${D.HERRAMIENTAS.conIA.map(h => `
        <div class="step">
          <div class="step-t">${esc(h.nombre)}</div>
          <div class="step-d mb"><b>Para qué:</b> ${esc(h.para)}</div>
          <div class="step-d"><b>Cómo usarla:</b> ${esc(h.como)}</div>
        </div>`).join('')}
    </div>

    <div class="card">
      <div class="card-head"><h2>🛠️ Herramientas sin IA</h2></div>
      ${D.HERRAMIENTAS.sinIA.map(h => `
        <div class="step" style="border-left-color:var(--acc2)">
          <div class="step-t">${esc(h.nombre)}</div>
          <div class="step-d">${esc(h.para)}</div>
        </div>`).join('')}
      <div class="aviso warn" style="margin-bottom:0"><span class="aviso-i">📅</span><div>${esc(D.HERRAMIENTAS.notaVigencia)}</div></div>
    </div>

    <div class="card">
      <div class="card-head"><h2>📄 Concepto de negocio en 1 página</h2></div>
      <p class="txt-dim mb">${esc(D.CONCEPTO_1_PAGINA.intro)}</p>
      <ul class="plist">${D.CONCEPTO_1_PAGINA.preguntas.map((q, n) =>
        `<li><span class="li-num">${n + 1}</span><span>${esc(q.t)}${q.ayuda ? ` <span style="color:var(--dim2);font-size:12.5px">(${esc(q.ayuda)})</span>` : ''}</span></li>`).join('')}</ul>
      <div class="aviso warn mt" style="margin-bottom:0"><span class="aviso-i">⚠️</span><div>${esc(D.CONCEPTO_1_PAGINA.criterio)}</div></div>
      <button class="btn btn-primary mt" data-go="cuentas">Llenar el concepto en 1 página →</button>
    </div>

    <div class="card">
      <div class="card-head"><h2>Supuestos declarados en el informe</h2></div>
      <p class="txt-dim mb">El informe A1 los marca como <b>a confirmar por usted</b>:</p>
      <ul class="plist">${D.SUPUESTOS.map(s => `<li><span class="pmark p">›</span><span>${esc(s)}</span></li>`).join('')}</ul>
    </div>`;
}

/* ==========================================================================
   MODO PADRE / TUTOR
   ========================================================================== */
function renderPadres() {
  const body = $('#padres-body');

  if (!S.padre.desbloqueado) {
    body.innerHTML = `
      <div class="card card-acc">
        <div class="card-head"><h2>👨‍👩‍👦 Sección para el adulto responsable</h2></div>
        <p class="txt-dim mb">Esta sección contiene la parte legal, las advertencias del informe y las decisiones que <b>solo un adulto puede tomar</b>. No es contenido para el adolescente solo.</p>
        <div class="aviso warn">
          <span class="aviso-i">⚠️</span>
          <div><b>El agente A1 NO certifica cumplimiento legal.</b> Todo lo legal en el informe es "a verificar por el humano", no una conclusión jurídica.</div>
        </div>
        <button class="btn btn-primary btn-lg" id="desbloquear">Mostrar la sección para adultos</button>
      </div>`;
    $('#desbloquear').onclick = () => { S.padre.desbloqueado = true; guardar(); renderPadres(); };
    return;
  }

  const L = D.GUIA_GENERAL.legalPrimero;
  body.innerHTML = `
    <div class="card card-danger">
      <div class="card-head"><h2>🚨 Escalamiento — requiere decisión humana</h2></div>
      <p class="txt-dim mb">${esc(D.ESCALAMIENTO.intro)}</p>
      <div class="scroll-x">
        <table class="tbl">
          <thead><tr><th>#</th><th>Motivo</th><th>Responsable sugerido</th></tr></thead>
          <tbody>${D.ESCALAMIENTO.filas.map(f => `
            <tr><td class="num">${f.n}</td><td>${esc(f.motivo)}</td><td class="txt-dim" style="font-size:12.5px">${esc(f.responsable)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="card card-warn">
      <div class="card-head"><h2>⚖️ ${esc(L.titulo)}</h2></div>
      <p class="txt-dim mb">${esc(L.intro)}</p>
      ${L.items.map(x => `
        <div class="step" style="border-left-color:${x.noVerificado ? 'var(--warn)' : 'var(--ok)'}">
          <div class="row" style="justify-content:space-between;margin-bottom:6px">
            <b style="font-size:14.5px;color:#f6d9a0">${esc(x.tema)}</b>
            ${x.noVerificado ? '<span class="badge b-warn">Sin verificar</span>' : '<span class="badge b-ok">Declarado</span>'}
          </div>
          <div class="step-d mb">${esc(x.detalle)}</div>
          ${x.nota ? `<div class="step-d" style="color:var(--warn)"><b>⚠️ ${esc(x.nota)}</b></div>` : ''}
          ${x.url ? `<div class="fuente"><a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.url)}</a></div>` : ''}
        </div>`).join('')}
      <div class="aviso bad" style="margin-bottom:0"><span class="aviso-i">🚨</span><div>${esc(L.advertencia)}</div></div>
    </div>

    <div class="card card-warn">
      <div class="card-head"><h2>👥 ${esc(D.DISCREPANCIA_POBLACION.titulo)}</h2></div>
      <p class="txt-dim mb">${esc(D.DISCREPANCIA_POBLACION.texto)}</p>
      <div class="scroll-x">
        <table class="tbl">
          <thead><tr><th>Cifra</th><th>Alcance</th><th>Limitación</th></tr></thead>
          <tbody>${D.DISCREPANCIA_POBLACION.datos.map(d => `
            <tr><td class="num">${esc(d.valor)}</td><td>${esc(d.alcance)}</td><td class="txt-dim" style="font-size:12px">${esc(d.limitacion)}</td></tr>`).join('')}
            <tr><td class="num">~18 000</td><td>Indicado por el operador</td><td class="txt-dim" style="font-size:12px">No coincide con ninguna fuente</td></tr>
          </tbody>
        </table>
      </div>
      <div class="aviso warn mt" style="margin-bottom:0"><span class="aviso-i">👉</span>
        <div><b>Acción humana:</b> ${esc(D.DISCREPANCIA_POBLACION.accionHumana)}
        <br><a href="${esc(D.DISCREPANCIA_POBLACION.urlInec)}" target="_blank" rel="noopener noreferrer" style="color:inherit">Abrir INEC →</a></div></div>
    </div>

    <div class="card">
      <div class="card-head"><h2>📊 ${esc(D.ADVERTENCIA_ALCANCE.titulo)}</h2></div>
      <p class="txt-dim mb">Este documento NO es un análisis P-AB1, P-AB2, P-AB3 ni P-AB4:</p>
      <div class="scroll-x">
        <table class="tbl">
          <thead><tr><th>Método</th><th>¿Aplica?</th><th>Motivo</th></tr></thead>
          <tbody>${D.ADVERTENCIA_ALCANCE.metodosNoAplicables.map(m => `
            <tr><td><b>${esc(m.metodo)}</b></td><td><span class="badge b-bad">No</span></td>
            <td class="txt-dim" style="font-size:12.5px">${esc(m.motivo)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <h3 class="sect">Consecuencias vinculantes</h3>
      <ul class="plist">${D.ADVERTENCIA_ALCANCE.consecuencias.map(c =>
        `<li><span class="pmark c">!</span><span>${esc(c)}</span></li>`).join('')}</ul>
    </div>

    <div class="card">
      <div class="card-head"><h2>❓ Datos faltantes para poder decidir</h2></div>
      <p class="txt-dim mb">Estos campos están sin resolver en el informe. Sin ellos no se puede pasar de orientación a análisis real.</p>
      ${D.DATOS_FALTANTES.map((d, n) => `
        <div class="step" style="border-left-color:var(--warn)">
          <div class="step-t">${n + 1}. ${esc(d.campo)}</div>
          <div class="step-d mb"><b>Por qué importa:</b> ${esc(d.motivo)}</div>
          <div class="step-d" style="color:#8ff0b5"><b>Cómo obtenerlo:</b> ${esc(d.como)}</div>
        </div>`).join('')}
    </div>

    <div class="card card-ok">
      <div class="card-head"><h2>🎯 ${esc(D.SIGUIENTE_PASO.titulo)}</h2></div>
      <p style="font-size:12px;font-weight:800;color:var(--ok);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">${esc(D.SIGUIENTE_PASO.subtitulo)}</p>
      <p class="txt-dim mb">${esc(D.SIGUIENTE_PASO.texto)}</p>
      <p class="txt-dim">${esc(D.SIGUIENTE_PASO.cierre)}</p>
      <button class="btn btn-primary mt" data-go="precios">Abrir comparador de 3 precios →</button>
    </div>

    <div class="card">
      <div class="card-head"><h2>🔐 Privacidad de los datos</h2></div>
      <p class="txt-dim mb">Todo lo que se escribe en esta app (respuestas del test, cuentas, libreta, comparador de precios) se guarda <b>únicamente en este dispositivo</b>, en el almacenamiento local del navegador. Nada se envía a internet ni a ningún servidor.</p>
      <p class="txt-dim mb">El informe A1 señala como punto de escalamiento la <b>protección de datos de clientes menores y del propio adolescente</b> (punto 6 de la sección 5). Por eso esta app no pide nombre, cédula, dirección ni ningún dato identificatorio.</p>
      <div class="row">
        <button class="btn btn-ghost btn-sm" id="exp-todo">Exportar todos mis datos (JSON)</button>
        <button class="btn btn-danger btn-sm" id="borrar-todo">Borrar todos los datos</button>
      </div>
    </div>

    <div class="card">
      <div class="card-head"><h2>📍 Contexto de Macará</h2></div>
      ${D.CONTEXTO_MACARA.map(c => `
        <div class="step" style="border-left-color:var(--acc2)">
          <div class="step-t">${esc(c.tema)}</div><div class="step-d">${esc(c.d)}</div>
        </div>`).join('')}
      <h3 class="sect">Lectura estratégica</h3>
      <ul class="plist">${D.LECTURA_ESTRATEGICA.map((l, n) =>
        `<li><span class="li-num">${n + 1}</span><span>${esc(l)}</span></li>`).join('')}</ul>
    </div>

    <div class="card">
      <div class="card-head"><h2>📚 Fuentes y evidencias</h2></div>
      <button class="btn btn-ghost btn-sm mb" data-go="fuentes">Ver las 7 evidencias con sus limitaciones →</button>
      <div class="aviso info" style="margin-bottom:0"><span class="aviso-i">📌</span>
        <div>${esc(D.META.fuenteInforme)}<br><b>Agente:</b> ${esc(D.META.agente)} · <b>Fecha de corte:</b> ${esc(D.META.fechaCorte)} · <b>Estado:</b> ${esc(D.META.estadoInforme)}</div></div>
    </div>`;

  $('#exp-todo').onclick = () => {
    const blob = new Blob([JSON.stringify({ app: D.META.app, version: D.META.version, exportado: new Date().toISOString(), datos: S }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = `mi-primer-negocio-${hoy()}.json`; a.click();
    URL.revokeObjectURL(a.href); toast('Datos exportados.');
  };
  $('#borrar-todo').onclick = () => modal({
    titulo: '¿Borrar todos los datos?',
    cuerpo: '<p>Se borrarán el test, la idea elegida, las cuentas, el comparador de precios, el plan y la libreta. <b>Esto no se puede deshacer.</b></p><p class="txt-dim">Exporta primero si quieres conservar una copia.</p>',
    acciones: [{ id: 'no', txt: 'Cancelar' }, { id: 'si', txt: 'Borrar todo', cls: 'btn-danger', fn: () => { S = vacio(); guardar(); toast('Todos los datos fueron borrados.'); go('inicio'); } }]
  });
}

/* ==========================================================================
   FUENTES
   ========================================================================== */
function renderFuentes() {
  $('#fuentes-body').innerHTML = `
    <div class="card">
      <div class="card-head"><h2>Anexo — Evidencias consultadas</h2></div>
      <p class="txt-dim mb">Cada evidencia se cita con su limitación declarada, tal como aparece en el informe A1.</p>
      <div class="scroll-x">
        <table class="tbl">
          <thead><tr><th>ID</th><th>Referencia</th><th>Tipo</th><th>Limitación</th></tr></thead>
          <tbody>${D.EVIDENCIAS.map(e => `
            <tr>
              <td><b>${esc(e.id)}</b></td>
              <td><a href="${esc(e.url)}" target="_blank" rel="noopener noreferrer" style="color:var(--acc)">${esc(e.ref)}</a></td>
              <td class="txt-dim" style="font-size:12px">${esc(e.tipo)}</td>
              <td class="txt-dim" style="font-size:12px">${esc(e.limitacion)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="card card-warn">
      <div class="card-head"><h2>⚠️ Sobre la vigencia de estos enlaces</h2></div>
      <p class="txt-dim">Los enlaces corresponden a la fecha de corte del informe (${esc(D.META.fechaCorte)}). Los precios, planes y condiciones de las herramientas gratuitas cambian con frecuencia. Verifique el contenido actual antes de depender de cualquiera de ellos.</p>
      <p class="txt-dim mt">El informe declara explícitamente que los PDFs oficiales del SRI (E3) y del Código Municipal de Loja (E4) <b>no pudieron ser leídos</b> por el agente, y que La Hora (E7) devolvió HTTP 403. Se citan como punteros para verificación humana, no como contenido verificado.</p>
    </div>

    <div class="card">
      <div class="card-head"><h2>Advertencia de alcance</h2></div>
      <p class="txt-dim mb">${esc(D.ADVERTENCIA_RANKING)}</p>
      <div class="aviso info" style="margin-bottom:0"><span class="aviso-i">📌</span>
        <div>${esc(D.META.fuenteInforme)}<br><b>Estado:</b> ${esc(D.META.estadoInforme)}</div></div>
    </div>`;
}

/* ==========================================================================
   INICIO
   ========================================================================== */
function renderInicio() {
  const card = $('#home-resume-card'), box = $('#home-resume');
  if (S.elegida) {
    const i = D.IDEAS.find(x => x.id === S.elegida);
    const tot = D.PLAN_90.etapas.reduce((a, e) => a + e.tareas.length, 0);
    const hh = Object.values(S.plan).filter(Boolean).length;
    const pct = Math.round(hh / tot * 100);
    const ing = S.libreta.filter(m => m.tipo === 'ingreso').reduce((a, m) => a + m.monto, 0);
    const gas = S.libreta.filter(m => m.tipo === 'gasto').reduce((a, m) => a + m.monto, 0);
    card.style.display = '';
    box.innerHTML = `
      <div class="row" style="gap:13px;align-items:flex-start;margin-bottom:14px">
        <span style="font-size:34px">${i.emoji}</span>
        <div style="flex:1;min-width:0">
          <div style="font-weight:750;font-size:16px;line-height:1.3">${esc(i.nombre)}</div>
          <div class="txt-dim" style="font-size:12.5px;margin-top:3px">${i.requiereInventario ? 'Con inventario' : 'Sin inventario'} · capital ${esc(i.capitalEstimado)}</div>
        </div>
      </div>
      <div class="bar-lbl"><b>Avance del plan de 90 días</b><span>${hh}/${tot}</span></div>
      <div class="bar-bg mb"><div class="bar-fill g" style="width:${pct}%"></div></div>
      <div class="row">
        <button class="btn btn-primary btn-sm" data-go="detalle">Ver mi guía paso a paso →</button>
        <button class="btn btn-ghost btn-sm" data-go="plan90">Plan de 90 días</button>
        ${S.libreta.length ? `<span class="badge ${ing - gas >= 0 ? 'b-ok' : 'b-bad'}">Ganancia real: ${usd(ing - gas)}</span>` : ''}
      </div>
      <button class="btn btn-ghost btn-sm mt" id="cambiar-idea">Cambiar de negocio</button>`;
    $('#cambiar-idea').onclick = () => modal({
      titulo: '¿Cambiar de negocio?',
      cuerpo: '<p>El informe advierte que la dispersión es la causa más común de fracaso a esta edad. Cambiar está bien, pero hazlo por una razón con datos, no por aburrimiento.</p><p class="txt-dim">Tus cuentas, libreta y plan se conservan.</p>',
      acciones: [{ id: 'no', txt: 'Mejor no' }, { id: 'si', txt: 'Cambiar', cls: 'btn-danger', fn: () => { S.elegida = null; guardar(); go('ideas'); } }]
    });
  } else card.style.display = 'none';

  $('#home-advertencia').innerHTML = `
    <div class="aviso bad">
      <span class="aviso-i">🚨</span>
      <div><b>Este informe es orientación para decisión humana, no autorización.</b> No autoriza comprar, contactar, publicar, fijar precios ni registrar nada.</div>
    </div>
    <div class="aviso warn">
      <span class="aviso-i">⚠️</span>
      <div><b>No se emite ningún precio de mercado, margen ni ranking.</b> Cualquier cifra de precio es una hipótesis de trabajo declarada, no una cotización ni un precio verificado.</div>
    </div>
    <div class="aviso warn">
      <span class="aviso-i">👨‍👩‍👦</span>
      <div><b>A los 16 años es menor de edad.</b> Esto no impide emprender, pero SÍ cambia quién firma. Un adulto responsable debe acompañar la parte legal antes de empezar.</div>
    </div>
    <div class="aviso info" style="margin-bottom:0">
      <span class="aviso-i">🔐</span>
      <div><b>Tus datos se quedan en este dispositivo.</b> Nada de lo que escribas aquí se envía a internet.</div>
    </div>`;
}

/* ==========================================================================
   PWA — registro del service worker y auto-actualización
   ========================================================================== */
function initPWA() {
  const banner = $('#offline-banner');
  const upd = (on) => banner.classList.toggle('hidden', !on);
  upd(!navigator.onLine);
  window.addEventListener('online', () => upd(false));
  window.addEventListener('offline', () => upd(true));

  if (!('serviceWorker' in navigator)) return;
  if (location.protocol === 'file:') return;

  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('./sw.js', { scope: './' });

      const mostrar = (worker) => {
        const t = $('#update-toast');
        t.classList.remove('hidden');
        t.onclick = () => { worker.postMessage({ type: 'SKIP_WAITING' }); t.textContent = 'Actualizando…'; };
      };

      if (reg.waiting && navigator.serviceWorker.controller) mostrar(reg.waiting);

      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) mostrar(nw);
        });
      });

      let recargando = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (recargando) return;
        recargando = true;
        location.reload();
      });

      // Buscar actualizaciones al volver a la app
      document.addEventListener('visibilitychange', () => { if (!document.hidden) reg.update().catch(() => {}); });
      setInterval(() => reg.update().catch(() => {}), 60 * 60 * 1000);
    } catch (e) { console.warn('Service worker no registrado:', e); }
  });
}

/* ==========================================================================
   ARRANQUE
   ========================================================================== */
function init() {
  const hash = location.hash.replace('#', '');
  const validas = ['inicio', 'test', 'ideas', 'cuentas', 'precios', 'plan90', 'libreta', 'habilidades', 'padres', 'fuentes'];
  go(validas.includes(hash) ? hash : 'inicio');
  initPWA();
}
init();
