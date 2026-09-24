/* ==========================================================================
   DATOS DEL APLICATIVO — Mi Primer Negocio
   Fuente única: A1_Informe_Negocios_Adolescente_Macara.md
   Agente A1 — Abastecimiento. Fecha de corte del informe: 2026-05-19

   REGLA DE FIDELIDAD: todo lo que aparece aquí proviene del informe A1.
   Nada se inventa. Donde el informe declara "no verificado" o "a verificar
   por el humano", este archivo lo marca explícitamente y la interfaz lo
   muestra como advertencia visible.
   ========================================================================== */

export const META = {
  app: 'Mi Primer Negocio',
  version: '1.0.0',
  fuenteInforme: 'A1 — Informe de orientación: Ideas de negocio para adolescente (16 años), Macará, Loja',
  agente: 'A1 — Abastecimiento',
  fechaCorte: '2026-05-19',
  estadoInforme: 'BORRADOR para revisión humana',
  zona: 'Macará, provincia de Loja, Ecuador'
};

/* --------------------------------------------------------------------------
   ADVERTENCIA DE ALCANCE (portada del informe)
   -------------------------------------------------------------------------- */
export const ADVERTENCIA_ALCANCE = {
  titulo: 'Lo que este informe NO es',
  metodosNoAplicables: [
    { metodo: 'P-AB1 Normalizar', motivo: 'No hay publicaciones ni catálogos de proveedores aportados.' },
    { metodo: 'P-AB2 Enriquecer', motivo: 'No hay 3 fuentes locales reales con URL por producto. Sin ellas, precio_mercado=null y no se calcula margen.' },
    { metodo: 'P-AB3 Proveedores / puntuación', motivo: 'No hay proveedores, histórico ni rúbrica aprobada. No se emite SCORE_PROVEEDOR ni SCORE_PRODUCTO.' },
    { metodo: 'P-AB4 Demanda comunitaria', motivo: 'No hay exportación autorizada de grupos de Telegram. Sin exportación no hay análisis de demanda.' }
  ],
  consecuencias: [
    'No se emite ningún precio de mercado, margen ni ranking. Cualquier cifra de precio es una hipótesis de trabajo declarada, no una cotización ni un precio verificado.',
    'No hay puntuaciones 1–5 ni top_cinco_muestras ni top_dos_por_linea, porque la rúbrica no está aprobada y no existen candidatos evaluados.',
    'Este informe es orientación para decisión humana, no autorización. No autoriza comprar, contactar, publicar, fijar precios ni registrar nada.'
  ]
};

/* --------------------------------------------------------------------------
   PERFIL DEL CASO (sección 0 del informe)
   -------------------------------------------------------------------------- */
export const PERFIL = {
  edad: 16,
  interesPrincipal: 'Básquetbol; relación frecuente con amigos',
  ciudad: 'Macará',
  provincia: 'Loja',
  pais: 'Ecuador',
  capitalMin: 150,
  capitalMax: 400,
  banca: 'Cuenta propia del adolescente',
  equipo: 'Solo celular con internet estable (sin PC/laptop)',
  poblacionDeclaradaOperador: 18000
};

export const DISCREPANCIA_POBLACION = {
  titulo: 'Discrepancia detectada — requiere verificación humana',
  texto: 'La cifra de ~18 000 habitantes aportada por el operador NO coincide con las fuentes consultadas. El informe no la resuelve.',
  datos: [
    { valor: '12 454 hab.', alcance: 'Macará ciudad (censo 2022)', fuente: 'Wikipedia — Macará', limitacion: 'Fuente secundaria' },
    { valor: '15 235 hab.', alcance: 'Cantón Macará (2022, citando INEC)', fuente: 'Wikipedia — Cantón Macará', limitacion: 'Se contradice con la otra cifra de la misma página' },
    { valor: '25 901 hab.', alcance: 'Cantón Macará (2021)', fuente: 'Wikipedia — Cantón Macará', limitacion: 'Se contradice con la otra cifra de la misma página' }
  ],
  accionHumana: 'Confirmar la población en el INEC (ecuadorencifras.gob.ec) antes de dimensionar el mercado. Mientras tanto, todo cálculo de mercado es hipótesis, no dato.',
  urlInec: 'https://www.ecuadorencifras.gob.ec/'
};

export const SUPUESTOS = [
  'Dispone de al menos 6–8 horas semanales fuera del colegio.',
  'Un adulto responsable acompaña legalmente la actividad.',
  'El celular permite instalar aplicaciones y usar WhatsApp.'
];

/* --------------------------------------------------------------------------
   LAS 9 IDEAS (secciones 1.1 y 1.2)
   `encajeOrden` proviene del ranking de encaje estructural de 3.3
   (NO de rentabilidad — el informe es explícito en esto).
   Los `perfiles` son una ayuda de orientación construida por la app a partir
   de atributos declarados; NO son una rúbrica aprobada del método A1.
   -------------------------------------------------------------------------- */
export const IDEAS = [
  {
    id: 'B5', cat: 'B', emoji: '🥤',
    nombre: 'Snacks y bebidas frías en eventos deportivos',
    resumen: 'Vender snacks y bebidas frías durante los partidos, cuando hay gente concentrada y hace calor.',
    porQueEncaja16: 'Demanda concentrada en partidos; se vende en el momento.',
    riesgoPrincipal: 'Perecederos; margen sensible al desperdicio.',
    encajeOrden: 1,
    encajeMacara: 'Calor >33 °C + concentración de gente en partidos + ticket bajo.',
    faltaVerificar: 'Permiso de venta en espacio público.',
    capitalEstimado: 'bajo', requiereInventario: true,
    perfiles: { deporte: 5, social: 4, tecnologia: 1, servicio: 3, producto: 5, creatividad: 2, dinero: 3, tiempo: 3 }
  },
  {
    id: 'A1', cat: 'A', emoji: '🏀',
    nombre: 'Entrenamientos personalizados a niños de 8–13 años',
    resumen: 'Enseñar básquetbol a niños más chicos, usando la cancha pública como "local".',
    porQueEncaja16: 'Vende lo que ya sabe; el "local" es la cancha pública; cobra por hora.',
    riesgoPrincipal: 'Requiere permiso del adulto responsable y autorización de uso de espacio.',
    encajeOrden: 2,
    encajeMacara: 'Cultura deportiva; canchas públicas; su red social; cero inventario.',
    faltaVerificar: 'Autorización de uso del espacio.',
    capitalEstimado: 'bajo', requiereInventario: false,
    perfiles: { deporte: 5, social: 4, tecnologia: 1, servicio: 5, producto: 1, creatividad: 3, dinero: 3, tiempo: 3 }
  },
  {
    id: 'A2', cat: 'A', emoji: '🏆',
    nombre: 'Organización de "retas" / torneos relámpago de fin de semana',
    resumen: 'Armar torneos cortos de fin de semana y cobrar inscripción por equipo.',
    porQueEncaja16: 'Su red de amigos es literalmente el producto; cobra inscripción por equipo.',
    riesgoPrincipal: 'Manejo de dinero de terceros: debe llevarse registro claro.',
    encajeOrden: 2,
    encajeMacara: 'Cultura deportiva; canchas públicas; su red social; cero inventario.',
    faltaVerificar: 'Autorización de uso del espacio.',
    capitalEstimado: 'bajo', requiereInventario: false,
    perfiles: { deporte: 5, social: 5, tecnologia: 2, servicio: 4, producto: 1, creatividad: 5, dinero: 5, tiempo: 2 }
  },
  {
    id: 'B3', cat: 'B', emoji: '🛵',
    nombre: 'Mandados y diligencias dentro de la ciudad',
    resumen: 'Retirar y entregar paquetes, hacer filas y trámites sencillos por otras personas.',
    porQueEncaja16: 'Cero inventario; su red lo recomienda.',
    riesgoPrincipal: 'Requiere confianza; no manejar pagos ajenos.',
    encajeOrden: 3,
    encajeMacara: 'Ciudad pequeña y compacta; remesas = gente con prisa.',
    faltaVerificar: 'Confianza y seguridad personal.',
    capitalEstimado: 'nulo', requiereInventario: false,
    perfiles: { deporte: 3, social: 5, tecnologia: 2, servicio: 5, producto: 1, creatividad: 2, dinero: 3, tiempo: 3 }
  },
  {
    id: 'A4', cat: 'A', emoji: '🎬',
    nombre: 'Contenido y edición de video deportivo',
    resumen: 'Grabar partidos con el celular y entregar clips editados a compañeros y equipos.',
    porQueEncaja16: 'Solo necesita celular; graba partidos y entrega clips editados.',
    riesgoPrincipal: 'Depende de la calidad del celular.',
    encajeOrden: 4,
    encajeMacara: 'Solo requiere celular; negocios locales necesitan presencia en WhatsApp.',
    faltaVerificar: 'Calidad de cámara del celular.',
    capitalEstimado: 'muy bajo', requiereInventario: false,
    perfiles: { deporte: 5, social: 3, tecnologia: 5, servicio: 4, producto: 2, creatividad: 5, dinero: 3, tiempo: 3 }
  },
  {
    id: 'B1', cat: 'B', emoji: '🎨',
    nombre: 'Diseño simple para negocios del barrio',
    resumen: 'Hacer letreros, menús y flyers para negocios locales y entregarlos por WhatsApp.',
    porQueEncaja16: 'Se aprende en semanas; se entrega por WhatsApp.',
    riesgoPrincipal: 'Competencia con IA gratuita; debe diferenciarse por trato y rapidez.',
    encajeOrden: 4,
    encajeMacara: 'Solo requiere celular; negocios locales necesitan presencia en WhatsApp.',
    faltaVerificar: 'Calidad de cámara del celular.',
    capitalEstimado: 'muy bajo', requiereInventario: false,
    perfiles: { deporte: 1, social: 4, tecnologia: 4, servicio: 4, producto: 2, creatividad: 5, dinero: 4, tiempo: 3 }
  },
  {
    id: 'A3', cat: 'A', emoji: '🧦',
    nombre: 'Venta de accesorios de básquetbol',
    resumen: 'Vender medias deportivas, muñequeras, protectores y botellas.',
    porQueEncaja16: 'Producto barato, ligero, sin talla compleja; compra por unidad.',
    riesgoPrincipal: 'Sin 3 fuentes locales no se puede fijar precio.',
    encajeOrden: 5,
    encajeMacara: 'Ticket bajo y rotación; se transporta en mochila.',
    faltaVerificar: 'Capital de compra y control de stock.',
    capitalEstimado: 'medio', requiereInventario: true,
    perfiles: { deporte: 5, social: 4, tecnologia: 1, servicio: 2, producto: 5, creatividad: 2, dinero: 5, tiempo: 3 }
  },
  {
    id: 'B2', cat: 'B', emoji: '📱',
    nombre: 'Reventa de accesorios de celular',
    resumen: 'Vender forros, micas y cables, transportándolos en la mochila.',
    porQueEncaja16: 'Ticket bajo, alta rotación, se transporta en mochila.',
    riesgoPrincipal: 'Requiere capital de compra y control de stock.',
    encajeOrden: 5,
    encajeMacara: 'Ticket bajo y rotación; se transporta en mochila.',
    faltaVerificar: 'Capital de compra y control de stock.',
    capitalEstimado: 'medio', requiereInventario: true,
    perfiles: { deporte: 1, social: 4, tecnologia: 5, servicio: 2, producto: 5, creatividad: 2, dinero: 5, tiempo: 3 }
  },
  {
    id: 'B4', cat: 'B', emoji: '📚',
    nombre: 'Tutorías a compañeros de cursos inferiores',
    resumen: 'Dar clases de matemáticas o inglés a estudiantes de cursos menores.',
    porQueEncaja16: 'Conocimiento disponible; cero capital.',
    riesgoPrincipal: 'Requiere constancia y paciencia.',
    encajeOrden: null,
    encajeMacara: 'No aparece en el ranking de encaje estructural de la sección 3.3; encaja por conocimiento disponible y cero capital.',
    faltaVerificar: 'Constancia y paciencia; no evaluado en el ranking.',
    capitalEstimado: 'nulo', requiereInventario: false,
    perfiles: { deporte: 1, social: 3, tecnologia: 2, servicio: 5, producto: 1, creatividad: 2, dinero: 2, tiempo: 2 }
  }
];

export const ADVERTENCIA_RUBRICA = {
  titulo: 'Sobre los puntajes de este test',
  texto: 'El informe A1 NO emite puntuaciones 1–5: la rúbrica no está aprobada (punto 5.4 de escalamiento). ' +
         'Este test es una herramienta de orientación construida por la app a partir de los atributos que el informe SÍ declara ' +
         '(capital, si requiere inventario, orden de encaje estructural, riesgo principal). ' +
         'No es un SCORE_PRODUCTO ni un SCORE_PROVEEDOR del método A1, y no mide rentabilidad.'
};

/* --------------------------------------------------------------------------
   CATEGORÍA C — NO RECOMENDADAS (sección 1.3)
   -------------------------------------------------------------------------- */
export const CATEGORIA_C = {
  titulo: 'Categoría C — No recomendadas a esta edad',
  nota: 'Se listan para que la familia las descarte conscientemente, no por omisión.',
  items: [
    { nombre: 'Venta de cosméticos o productos de salud sin registro sanitario', motivo: 'Regulado.' },
    { nombre: 'Dropshipping internacional con tarjeta', motivo: 'Exige tarjeta, contratos y capacidad de asumir devoluciones; un menor no puede obligarse contractualmente.' },
    { nombre: 'Cualquier actividad que exija invertir dinero de amigos o familiares', motivo: 'Riesgo de conflicto y de pérdida de relaciones personales.' },
    { nombre: 'Comercio transfronterizo con Perú por cuenta propia', motivo: 'Ver sección 3.4 del informe: requiere capital mayor, regímenes aduaneros no evaluados y depende de una infraestructura que se ha cerrado antes.' }
  ],
  recomendacionFoco: 'Elegir UN SOLO negocio de Categoría A o B durante 90 días. La causa más común de fracaso a esta edad no es falta de ideas, sino dispersión en varias ideas a la vez.'
};

/* --------------------------------------------------------------------------
   GUÍA GENERAL (secciones 2.1 a 2.4)
   -------------------------------------------------------------------------- */
export const GUIA_GENERAL = {
  legalPrimero: {
    titulo: 'Marco legal — punto crítico que debe resolverse primero',
    intro: 'A los 16 años es menor de edad. Esto no impide emprender, pero SÍ cambia quién firma.',
    items: [
      {
        tema: 'RUC ante el SRI',
        detalle: 'El SRI publica un trámite específico de inscripción y actualización de RUC para menores emancipados y no emancipados, lo que confirma que la vía existe y está reglamentada — pero exige documentación de representación legal.',
        url: 'https://www.sri.gob.ec/o/sri-portlet-biblioteca-alfresco-internet/descargar/f03ef712-76e9-4744-8302-de2018951c55/Fichas%20de%20Requisitos%20para%20inscripci%C3%B3n%20y%20actualizaci%C3%B3n%20para%20menores%20emancipados%20y%20no%20emancipados.pdf',
        noVerificado: true,
        nota: 'PDF no legible por el agente. Se cita como puntero para verificación humana, NO como contenido verificado.'
      },
      {
        tema: 'Patente municipal',
        detalle: 'El Código Municipal de Loja regula permisos de funcionamiento local. Aplicabilidad al cantón Macará y exenciones para menores: verificar en el GAD de Macará.',
        url: 'https://www.loja.gob.ec/files/documentos/2016-01/codificado_municipio_2015.pdf',
        noVerificado: true,
        nota: 'PDF no legible. Aplicabilidad a Macará sin verificar.'
      },
      {
        tema: 'Régimen tributario (RIMPE / emprendedor popular)',
        detalle: 'Existe un régimen simplificado para pequeños contribuyentes con topes de facturación. El informe NO afirma montos ni condiciones.',
        url: 'https://www.sri.gob.ec/',
        noVerificado: true,
        nota: 'Consultar el portal del SRI vigente a la fecha del trámite.'
      },
      {
        tema: 'Cuenta bancaria',
        detalle: 'Usted indicó que el adolescente ya tiene cuenta propia. Eso facilita cobros y registro. Confirme con el banco si la cuenta permite recibir transferencias de terceros sin restricción por edad.',
        url: null, noVerificado: false, nota: ''
      }
    ],
    advertencia: 'Las fuentes oficiales sobre RUC de menores y RIMPE son PDFs que el agente no pudo parsear. Por contrato, no inventa sus contenidos. Todo lo legal es "a verificar por el humano", no una conclusión jurídica. El agente A1 NO certifica cumplimiento legal.'
  },

  presupuesto: {
    titulo: 'Presupuesto de arranque — escenario de asignación por tramos',
    nota: 'Distribución PROPUESTA. No es cotización ni gasto autorizado.',
    rubros: [
      { nombre: 'Inventario inicial', t150: 70, t400: 200, nota: 'Solo si el negocio vende producto' },
      { nombre: 'Materiales/insumos', t150: 20, t400: 50, nota: 'Balones, conos, papelería, según caso' },
      { nombre: 'Reserva para reposición', t150: 30, t400: 90, nota: 'No gastar todo el primer día' },
      { nombre: 'Publicidad (volantes/impresión)', t150: 10, t400: 25, nota: 'Mucho puede ser orgánico por WhatsApp' },
      { nombre: 'Colchón de imprevistos', t150: 20, t400: 35, nota: 'Retenciones, daños, devoluciones' }
    ],
    total150: 150, total400: 400,
    reglaOro: 'Nunca destinar el 100% del capital a inventario. La reserva de reposición es lo que evita que el negocio muera tras la primera venta.'
  },

  registroMinimo: {
    titulo: 'Registro mínimo desde el día 1',
    intro: 'Sin esto no hay negocio, hay dinero que entra y sale sin control.',
    campos: ['Fecha de cada movimiento', 'Qué se vendió o compró', 'Cuánto entró y cuánto salió', 'Saldo de efectivo y de stock al cierre del día'],
    herramienta: 'Google Sheets o Excel en el celular, o una libreta física. Lo importante es la constancia diaria, no la herramienta.'
  },

  precios: {
    titulo: 'Precios: lo que el agente NO puede darle',
    motivo: 'Por contrato, no se pueden fijar precios ni márgenes porque: no hay 3 fuentes locales reales con URL por producto (requisito P-AB2), no hay cotización formal de proveedor, y la rúbrica 1–5 no está aprobada.',
    pasos: [
      'Consultar 3 vendedores distintos (presenciales o en línea) del producto.',
      'Anotar: vendedor, URL o dirección, fecha, modelo, precio, IVA, envío.',
      'Calcular la mediana de los 3 precios.',
      'Comparar con el costo de compra del proveedor.',
      'Recién entonces existe un precio de referencia defendible.'
    ],
    cierre: 'Con esas 3 fuentes por producto, A1 sí puede ejecutar P-AB2/P-AB3 y emitir un informe con margen y puntuación.'
  }
};

/* --------------------------------------------------------------------------
   PLANES POR IDEA — pasos, aprender, herramientas, pros y contras
   -------------------------------------------------------------------------- */
export const PLANES = {
  B5: {
    pros: [
      'Calor >33 °C y 7–8 meses secos: la demanda de hidratación y fresco es estructural, no estacional.',
      'El público ya está concentrado en el partido; no hay que salir a buscarlo.',
      'Ticket bajo: se vende a precio que un adolescente puede pagar sin pensarlo.',
      'Ocupa solo las horas del evento: compatible con el colegio.',
      'Primer lugar en el ranking de encaje estructural de Macará (sección 3.3).'
    ],
    contras: [
      'Perecederos: lo que no se vende se pierde y se come el margen.',
      'Necesita permiso de venta en espacio público — sin verificar en el informe.',
      'Requiere capital de compra por adelantado (inventario).',
      'Depende de que haya partidos; sin eventos, no hay ventas.',
      'El hielo y el transporte del producto son logística real que el informe no cuantifica.'
    ],
    pasos: [
      { t: 'Paso 1 — Confirmar el permiso antes de comprar nada', d: 'Preguntar en el GAD de Macará o a quien administra la cancha si un menor puede vender en el espacio público y qué se necesita. No comprar inventario antes de tener esta respuesta.' },
      { t: 'Paso 2 — Contar la demanda con los ojos, no con la imaginación', d: 'Ir a 3 partidos y contar cuánta gente hay, qué se vende ya y a qué hora se va la gente. Anotarlo en el celular.' },
      { t: 'Paso 3 — Aplicar el comparador de 3 fuentes', d: 'Usar la pestaña "Precios" de esta app: consultar 3 vendedores para cada producto (agua, gaseosa, snack) y calcular la mediana. Sin esto no hay precio defendible.' },
      { t: 'Paso 4 — Calcular el punto de equilibrio', d: 'Usar la pestaña "Cuentas": cuánto cuesta cada unidad, a cuánto se vende y cuántas unidades hay que vender para recuperar lo invertido.' },
      { t: 'Paso 5 — Comprar conservador la primera vez', d: 'Comprar poco y variado. El objetivo de la primera compra no es ganar: es aprender cuánto se vende de verdad en un partido.' },
      { t: 'Paso 6 — Resolver el frío', d: 'El producto frío es el corazón del negocio. Definir cómo se mantiene frío durante el evento (cooler, hielo, ubicación con sombra).' },
      { t: 'Paso 7 — Registrar cada venta el mismo día', d: 'Usar la libreta de la app. Sin registro no se sabe si ganó o perdió.' },
      { t: 'Paso 8 — Decidir con datos al día 90', d: 'Si vendió y el número cierra, continuar y ampliar. Si no, cambiar de idea sin insistir por orgullo.' }
    ],
    aprender: [
      { h: 'Llevar cuentas con constancia', c: 'La habilidad #1 y la menos divertida. Un adolescente que sabe leer sus propios números a los 16 tiene una ventaja que la mayoría de adultos no tiene.' },
      { h: 'Calcular precio, costo y ganancia', c: 'Distinguir "plata que entra" de "ganancia real", incluyendo merma y desperdicio.' },
      { h: 'Controlar merma', c: 'En perecederos, la ganancia se decide por lo que NO se pierde.' },
      { h: 'Hablar con clientes', c: 'Atender 5 personas y anotar qué pidieron.' }
    ],
    herramientas: ['Calculadora de esta app', 'Google Sheets / Excel móvil', 'WhatsApp Business para avisar los partidos', 'Libreta física o registro diario de la app']
  },

  A1: {
    pros: [
      'Vende lo que ya sabe: no requiere aprendizaje técnico nuevo.',
      'El "local" es la cancha pública: no hay arriendo.',
      'Cero inventario: si no funciona, no queda mercadería parada.',
      'Cobra por hora, con pago inmediato y sin cuentas por cobrar.',
      'Segundo lugar en el ranking de encaje estructural de Macará (sección 3.3).',
      'Convierte el capital en aprendizaje, no en producto.'
    ],
    contras: [
      'Requiere permiso del adulto responsable y autorización de uso del espacio público.',
      'Depende del horario escolar y de la disponibilidad de los niños.',
      'Si un niño se lesiona, la responsabilidad recae sobre el adolescente y su representante.',
      'Cobrar a vecinos y conocidos puede volverse incómodo si no se acuerda el precio antes.',
      'Ingreso limitado por horas disponibles: no escala sin más entrenadores.'
    ],
    pasos: [
      { t: 'Paso 1 — Resolver la autorización', d: 'Conversar con el adulto responsable y con quien administra la cancha. Sin autorización de uso del espacio, no se empieza.' },
      { t: 'Paso 2 — Definir exactamente qué enseña y a quién', d: 'Edad (8–13 años), duración de la sesión, cuántos niños por grupo y qué se trabaja en cada sesión.' },
      { t: 'Paso 3 — Aplicar el comparador de 3 fuentes para el precio por hora', d: 'Consultar 3 entrenadores o academias de la zona, anotar precio y condiciones, y calcular la mediana. El precio real sale de consultar, no de inventarlo.' },
      { t: 'Paso 4 — Calcular el punto de equilibrio', d: 'Sumar el costo de balones y conos, y calcular cuántas horas hay que dar para recuperar esa inversión.' },
      { t: 'Paso 5 — Probar con un grupo pequeño', d: 'Empezar con 3 o 4 niños conocidos. Es más fácil aprender con un grupo chico que fracasar con uno grande.' },
      { t: 'Paso 6 — Fijar reglas de seguridad y de pago por escrito', d: 'Un mensaje claro a los padres con el precio, el horario y las reglas. Cumplir lo prometido es la habilidad #4 del informe.' },
      { t: 'Paso 7 — Registrar cada sesión y cada pago el mismo día', d: 'Usar la libreta de la app.' },
      { t: 'Paso 8 — Decidir con datos al día 90', d: 'Evaluar si los niños siguieron viniendo y si el número cerró.' }
    ],
    aprender: [
      { h: 'Enseñar y comunicar', c: 'Explicar un ejercicio a un niño de 8 años es una habilidad de venta y de liderazgo.' },
      { h: 'Cumplir lo prometido', c: 'Fijar una fecha y cumplirla 10 veces. Si no puede, avisar.' },
      { h: 'Llevar cuentas con constancia', c: 'Registrar cada sesión y cada pago.' },
      { h: 'Seguridad y responsabilidad', c: 'Calentar, hidratar, revisar el espacio antes de empezar.' },
      { h: 'Hablar con clientes (los padres)', c: 'Atender 5 personas y anotar qué pidieron.' }
    ],
    herramientas: ['Balones y conos (insumos del presupuesto)', 'Google Sheets / Excel móvil', 'WhatsApp Business para coordinar con los padres', 'Cronómetro del celular']
  },

  A2: {
    pros: [
      'La red de amigos es literalmente el producto: no hay que crear demanda desde cero.',
      'Cero inventario: el capital se convierte en aprendizaje y utilidad.',
      'Cobra inscripción por equipo, en efectivo y por adelantado.',
      'Alta visibilidad: un torneo bien hecho se recomienda solo.',
      'Segundo lugar en el ranking de encaje estructural de Macará (sección 3.3).'
    ],
    contras: [
      'Manejo de dinero de terceros: el informe lo marca como riesgo principal. Exige registro claro y transparente, sin excepción.',
      'Un torneo mal organizado daña la reputación en una ciudad pequeña, y eso no se recupera rápido.',
      'Requiere autorización de uso del espacio.',
      'Depende de que los equipos se inscriban: si faltan, el torneo se cae.',
      'El informe advierte que no se puede depender de que otros pongan dinero.'
    ],
    pasos: [
      { t: 'Paso 1 — Resolver autorización y reglas del espacio', d: 'Hablar con quien administra la cancha y con el adulto responsable. Definir fecha, horas y condiciones.' },
      { t: 'Paso 2 — Escribir el reglamento en una hoja', d: 'Cuántos equipos, cuántos jugadores por equipo, duración de los partidos, qué pasa si un equipo no llega, cómo se define al ganador. Sin reglamento escrito, el torneo se convierte en discusión.' },
      { t: 'Paso 3 — Definir el costo y usar el comparador de 3 fuentes', d: 'Consultar 3 torneos o ligas de la zona para ver cuánto se cobra de inscripción. Calcular la mediana. Nunca inventar el precio.' },
      { t: 'Paso 4 — Calcular el punto de equilibrio', d: 'Sumar premios, arbitraje, agua y publicidad; calcular cuántos equipos deben inscribirse para cubrir esos costos.' },
      { t: 'Paso 5 — Abrir una cuenta o sobre aparte para el dinero del torneo', d: 'Es la habilidad #6: separar el dinero del negocio del propio. Con dinero de terceros esto no es una opción, es obligatorio.' },
      { t: 'Paso 6 — Registrar cada inscripción y cada gasto el mismo día', d: 'Fecha, equipo, monto que entró y monto que salió. Si alguien pregunta, el registro lo respalda.' },
      { t: 'Paso 7 — Publicar el resultado y las cuentas al terminar', d: 'Transparencia es lo que hace que el segundo torneo sea más fácil que el primero.' },
      { t: 'Paso 8 — Decidir con datos al día 90', d: 'Si se inscribieron los equipos necesarios y las cuentas cerraron, repetir. Si no, cambiar de idea.' }
    ],
    aprender: [
      { h: 'Organizar y planificar', c: 'Un torneo es un proyecto con fechas, reglas y responsables.' },
      { h: 'Manejo transparente de dinero de terceros', c: 'La habilidad más delicada de esta lista y la que más confianza construye.' },
      { h: 'Separar el dinero del negocio del propio', c: 'Cuenta o sobre aparte.' },
      { h: 'Liderazgo y resolución de conflictos', c: 'Van a discutir por un arbitraje. Hay que aprender a resolverlo sin perder amigos.' },
      { h: 'Comunicar y vender por WhatsApp', c: 'Publicar el torneo con reglas claras y responder rápido.' }
    ],
    herramientas: ['Reglamento impreso o en PDF', 'Google Sheets / Excel móvil para inscripciones', 'WhatsApp Business para convocar equipos', 'Silbato y planillas de partido']
  },

  B3: {
    pros: [
      'Capital nulo: no se necesita invertir nada para empezar.',
      'Cero inventario: no queda mercadería parada si no funciona.',
      'Ciudad pequeña y compacta: los trayectos son cortos.',
      'Las remesas dinamizan el consumo local: hay gente con prisa y con capacidad de pagar.',
      'Tercer lugar en el ranking de encaje estructural de Macará (sección 3.3).',
      'Su red social lo recomienda: el "marketing" es gratuito.'
    ],
    contras: [
      'El informe advierte: no manejar pagos ajenos. Solo cobrar el servicio propio.',
      'Requiere confianza: se entra a coordinar con desconocidos.',
      'Riesgo de seguridad personal, especialmente fuera de horas de luz.',
      'Ingreso atado al tiempo disponible: hay un techo duro por horas del día.',
      'Depende de la reputación: una entrega mal hecha cuesta clientes rápido.'
    ],
    pasos: [
      { t: 'Paso 1 — Definir el servicio exacto y lo que NO hace', d: 'Escribir qué sí (retirar un paquete, hacer una fila, entregar un sobre) y qué no (nunca transportar dinero de terceros ni objetos sin revisar).' },
      { t: 'Paso 2 — Fijar zonas y horarios seguros', d: 'Acordar con el adulto responsable en qué zonas y hasta qué hora puede trabajar. Esto no es negociable.' },
      { t: 'Paso 3 — Aplicar el comparador de 3 fuentes para el precio del mandado', d: 'Consultar 3 servicios de encomienda o delivery de la zona, anotar precio por trayecto y calcular la mediana.' },
      { t: 'Paso 4 — Calcular el punto de equilibrio', d: 'Con capital nulo, el "costo" es el tiempo y el pasaje. Calcular cuántos mandados al día cubren el pasaje y dejan ganancia.' },
      { t: 'Paso 5 — Avisar en WhatsApp que el servicio existe', d: 'Publicar el catálogo simple con lo que hace y el precio. El informe pide un catálogo de 5 elementos.' },
      { t: 'Paso 6 — Cumplir lo prometido, siempre', d: 'La habilidad #4. Avisar de inmediato si algo se retrasa. La confianza es todo el activo de este negocio.' },
      { t: 'Paso 7 — Registrar cada mandado el mismo día', d: 'Usar la libreta de la app.' },
      { t: 'Paso 8 — Decidir con datos al día 90', d: 'Si hay clientes recurrentes, continuar. Si no, cambiar de idea.' }
    ],
    aprender: [
      { h: 'Hablar con clientes y escuchar', c: 'Entender el pedido antes de aceptarlo evita el 90% de los problemas.' },
      { h: 'Cumplir lo prometido', c: 'Fijar una fecha y cumplirla 10 veces; avisar si no puede.' },
      { h: 'Puntualidad y gestión del tiempo', c: 'Varios mandados al día exigen orden.' },
      { h: 'Límites claros y seguridad personal', c: 'Saber decir que no es una habilidad de negocio.' },
      { h: 'Comunicar y vender por WhatsApp', c: 'Respuesta rápida y precio claro.' }
    ],
    herramientas: ['WhatsApp Business (catálogo y respuestas rápidas)', 'Google Sheets / Excel móvil', 'Google Drive para respaldar fotos de entregas', 'Mapa del celular']
  },

  A4: {
    pros: [
      'Solo requiere el celular que ya tiene: capital muy bajo.',
      'Cero inventario.',
      'Convierte su pasión por el básquetbol en producto entregable.',
      'Cuarto lugar en el ranking de encaje estructural de Macará (sección 3.3).',
      'Habilidad transferible: edición de video sirve para cualquier negocio futuro.'
    ],
    contras: [
      'Depende de la calidad de la cámara del celular: es el riesgo principal declarado.',
      'La edición consume mucho tiempo por cada clip entregado.',
      'Los compañeros pueden esperar que sea gratis por ser amigo.',
      'Requiere aprender edición, que no es un conocimiento que ya tenga.',
      'Competencia con contenido gratuito e IA.'
    ],
    pasos: [
      { t: 'Paso 1 — Probar primero la cámara del celular', d: 'Grabar un partido completo y revisar si el video sirve. Si la calidad no alcanza, este negocio no es viable con el equipo actual y hay que saberlo antes de prometer nada.' },
      { t: 'Paso 2 — Aprender edición con herramientas gratuitas', d: 'El informe lista Khan Academy / YouTube para aprender y Canva para diseño. Dedicar las dos primeras semanas a aprender, no a vender.' },
      { t: 'Paso 3 — Hacer 3 videos gratis para construir portafolio', d: 'La primera entrega es la demostración. Sin portafolio nadie paga.' },
      { t: 'Paso 4 — Aplicar el comparador de 3 fuentes para el precio por video', d: 'Consultar 3 editores o servicios de video de la zona, anotar precio por clip y calcular la mediana.' },
      { t: 'Paso 5 — Calcular el punto de equilibrio', d: 'El costo es el tiempo; calcular cuántos videos al mes justifican las horas invertidas.' },
      { t: 'Paso 6 — Definir el paquete y entregarlo por WhatsApp', d: 'Ejemplo: grabación del partido + 3 clips editados. Precio claro desde el inicio, incluso para amigos.' },
      { t: 'Paso 7 — Registrar cada trabajo el mismo día', d: 'Usar la libreta de la app.' },
      { t: 'Paso 8 — Decidir con datos al día 90', d: 'Si los clientes volvieron a pedir, continuar y subir el precio con el portafolio.' }
    ],
    aprender: [
      { h: 'Edición de video básica', c: 'Cortar, unir, poner música y texto. Se aprende en semanas con YouTube.' },
      { h: 'Composición y encuadre', c: 'Dónde ponerse para grabar el partido. Es la diferencia entre un video útil y uno inservible.' },
      { h: 'Calcular precio, costo y ganancia', c: 'El costo real es el tiempo; hay que valorarlo.' },
      { h: 'Cumplir lo prometido', c: 'Un clip entregado tarde para un partido ya pasado no sirve.' },
      { h: 'Comunicar y vender por WhatsApp', c: 'Entregar por WhatsApp con mensaje claro es parte del servicio.' }
    ],
    herramientas: ['App de edición gratuita en el celular', 'Canva (plan gratuito, con funciones de IA)', 'Google Drive para respaldar los videos', 'WhatsApp Business para entregar y cobrar', 'Khan Academy / YouTube para aprender']
  },

  B1: {
    pros: [
      'Se aprende en semanas: no requiere años de estudio.',
      'Capital muy bajo y cero inventario.',
      'Se entrega 100% por WhatsApp, sin moverse.',
      'Cuarto lugar en el ranking de encaje estructural de Macará (sección 3.3).',
      'Los negocios locales necesitan presencia en WhatsApp y muchos no saben hacerla.'
    ],
    contras: [
      'Competencia con IA gratuita: es el riesgo principal declarado. Cualquiera puede generar un flyer hoy.',
      'Debe diferenciarse por trato y rapidez, no por precio.',
      'Los clientes pueden no valorar el diseño y regatear fuerte.',
      'Requiere paciencia para iterar cuando al cliente "no le gusta".',
      'Ingreso por pieza, con techo bajo si no se arma un paquete.'
    ],
    pasos: [
      { t: 'Paso 1 — Aprender la herramienta antes de vender', d: 'Dedicar dos semanas a Canva (plan gratuito). El informe la lista como herramienta central para flyers, menús y catálogos.' },
      { t: 'Paso 2 — Hacer 3 diseños de muestra gratis', d: 'Elegir 3 negocios del barrio y diseñar su flyer sin que lo pidan. Ese es el portafolio y la puerta de entrada.' },
      { t: 'Paso 3 — Aplicar el comparador de 3 fuentes para el precio por diseño', d: 'Consultar 3 diseñadores o imprentas de la zona, anotar precio por flyer o menú y calcular la mediana.' },
      { t: 'Paso 4 — Calcular el punto de equilibrio', d: 'Con capital casi nulo, calcular cuántos diseños al mes justifican las horas.' },
      { t: 'Paso 5 — Definir un paquete con precio claro', d: 'Ejemplo: flyer + versión para estado de WhatsApp. Precio fijo publicado, sin regateo caso por caso.' },
      { t: 'Paso 6 — Diferenciarse por trato y rapidez', d: 'El informe es explícito: contra la IA gratuita se compite con trato y rapidez. Responder rápido y entregar cuando se prometió.' },
      { t: 'Paso 7 — Registrar cada trabajo el mismo día', d: 'Usar la libreta de la app.' },
      { t: 'Paso 8 — Decidir con datos al día 90', d: 'Si los clientes repiten, continuar. Si no, cambiar de idea.' }
    ],
    aprender: [
      { h: 'Diseño básico', c: 'Contraste, tamaño de letra, que el mensaje se lea en la pantalla del celular.' },
      { h: 'Uso de Canva y de IA de redacción', c: 'El informe lista IA de redacción para descripciones y publicaciones.' },
      { h: 'Hablar con clientes y escuchar', c: 'Preguntar qué quiere promocionar antes de diseñar.' },
      { h: 'Cumplir lo prometido', c: 'La rapidez es la ventaja competitiva declarada.' },
      { h: 'Calcular precio, costo y ganancia', c: 'Saber cuánto vale la hora invertida.' }
    ],
    herramientas: ['Canva (plan gratuito, con funciones de IA)', 'WhatsApp Business para entregar', 'IA de redacción para textos', 'Google Drive para respaldar diseños']
  },

  A3: {
    pros: [
      'Producto barato, ligero y sin talla compleja: fácil de transportar y de reponer.',
      'Compra por unidad: se puede empezar con muy poco.',
      'Se vende dentro de la misma comunidad deportiva que ya frecuenta.',
      'Quinto lugar en el ranking de encaje estructural de Macará (sección 3.3).',
      'Ticket bajo y alta rotación, que es el modelo que el informe recomienda para un mercado pequeño.'
    ],
    contras: [
      'SIN 3 FUENTES LOCALES NO SE PUEDE FIJAR PRECIO. Este es el bloqueo declarado en el informe y aplica directamente aquí.',
      'Requiere capital de compra por adelantado (inventario).',
      'Control de stock: hay que saber qué queda y qué se agotó.',
      'Riesgo de quedar con mercadería parada si el producto no rota.',
      'El informe advierte: nunca destinar el 100% del capital a inventario.'
    ],
    pasos: [
      { t: 'Paso 1 — Elegir 2 o 3 productos, no quince', d: 'Empezar con pocos productos bien elegidos. La dispersión es la causa más común de fracaso declarada en el informe.' },
      { t: 'Paso 2 — OBLIGATORIO: aplicar el comparador de 3 fuentes', d: 'Sin 3 vendedores distintos con URL o dirección, fecha, modelo, precio, IVA y envío, no existe precio de referencia. No comprar antes de completar esta tabla.' },
      { t: 'Paso 3 — Calcular la mediana y comparar con el proveedor', d: 'La mediana de las 3 fuentes contra el costo de compra. Solo ahí aparece un margen defendible.' },
      { t: 'Paso 4 — Calcular el punto de equilibrio', d: 'Usar la pestaña "Cuentas": cuántas unidades hay que vender para recuperar la inversión.' },
      { t: 'Paso 5 — Comprar conservador y dejar reserva', d: 'Aplicar el presupuesto de la app: nunca el 100% a inventario. La reserva de reposición evita que el negocio muera tras la primera venta.' },
      { t: 'Paso 6 — Publicar catálogo por WhatsApp', d: 'Fotos claras, precio claro, respuesta rápida. El informe pide un catálogo simple de 5 productos.' },
      { t: 'Paso 7 — Registrar ventas y stock todos los días', d: 'Usar la libreta de la app: qué entró, qué salió y qué queda.' },
      { t: 'Paso 8 — Decidir con datos al día 90', d: 'Si el producto rotó, reponer ese y dejar los que no rotaron.' }
    ],
    aprender: [
      { h: 'Calcular precio, costo y ganancia', c: 'Recalcular un producto con costo, envío y merma. Es la habilidad #2 del informe.' },
      { h: 'Control de stock', c: 'Saber qué queda y qué se agotó sin adivinar.' },
      { h: 'Llevar cuentas con constancia', c: 'Registrar todo movimiento 30 días seguidos.' },
      { h: 'Comunicar y vender por WhatsApp', c: 'Catálogo simple con 5 productos.' },
      { h: 'Separar el dinero del negocio del propio', c: 'Cuenta o sobre aparte, para no gastar la caja en consumo.' }
    ],
    herramientas: ['Google Sheets / Excel móvil para stock', 'WhatsApp Business (catálogo)', 'Canva para fotos y catálogo', 'Libreta física o registro diario de la app']
  },

  B2: {
    pros: [
      'Ticket bajo y alta rotación: el modelo que el informe recomienda para Macará.',
      'Se transporta en la mochila: no requiere local ni movilidad.',
      'Producto conocido: el adolescente ya entiende de celulares.',
      'Quinto lugar en el ranking de encaje estructural de Macará (sección 3.3).',
      'Demanda constante: los forros y las micas se rompen y se reemplazan.'
    ],
    contras: [
      'Requiere capital de compra y control de stock: riesgo principal declarado.',
      'Riesgo de quedar con modelos de forro que no corresponden a ningún celular del pueblo.',
      'El informe advierte que sin 3 fuentes locales no se puede fijar precio.',
      'Márgenes por unidad muy bajos: exige volumen.',
      'Nunca destinar el 100% del capital a inventario.'
    ],
    pasos: [
      { t: 'Paso 1 — Averiguar qué modelos de celular usa la gente', d: 'Preguntar a 10 personas qué modelo tienen antes de comprar un solo forro. Comprar stock de un modelo que nadie tiene es la forma más rápida de perder el capital.' },
      { t: 'Paso 2 — OBLIGATORIO: aplicar el comparador de 3 fuentes', d: '3 vendedores distintos con URL o dirección, fecha, modelo, precio, IVA y envío. Sin esa tabla no hay precio de referencia ni margen.' },
      { t: 'Paso 3 — Calcular la mediana y comparar con el proveedor', d: 'Mediana de las 3 fuentes contra el costo de compra.' },
      { t: 'Paso 4 — Calcular el punto de equilibrio', d: 'Usar la pestaña "Cuentas" para saber cuántas unidades hay que vender antes de ganar un centavo.' },
      { t: 'Paso 5 — Comprar poco, variado y dejar reserva', d: 'Aplicar el presupuesto de la app. Nunca el 100% a inventario.' },
      { t: 'Paso 6 — Publicar catálogo por WhatsApp', d: 'Fotos claras de cada modelo, precio claro, respuesta rápida.' },
      { t: 'Paso 7 — Registrar ventas y stock todos los días', d: 'Sin esto no se sabe qué modelo rota y cuál se quedó parado.' },
      { t: 'Paso 8 — Decidir con datos al día 90', d: 'Reponer solo lo que rotó.' }
    ],
    aprender: [
      { h: 'Control de stock', c: 'Qué queda, qué se agotó y qué no se movió en 60 días.' },
      { h: 'Calcular precio, costo y ganancia', c: 'Con márgenes bajos, un error de cálculo borra la ganancia de varias ventas.' },
      { h: 'Llevar cuentas con constancia', c: 'Registrar todo movimiento 30 días seguidos.' },
      { h: 'Comunicar y vender por WhatsApp', c: 'Catálogo simple con 5 productos.' },
      { h: 'Separar el dinero del negocio del propio', c: 'Cuenta o sobre aparte.' }
    ],
    herramientas: ['Google Sheets / Excel móvil para stock', 'WhatsApp Business (catálogo)', 'Canva para el catálogo', 'Libreta física o registro diario de la app']
  },

  B4: {
    pros: [
      'Capital nulo y cero inventario: el único costo es el tiempo.',
      'El conocimiento ya lo tiene: matemáticas e inglés del colegio.',
      'Se puede dar en línea o presencial, y desde la casa.',
      'No aparece en el ranking de la sección 3.3, pero cumple el criterio general de encaje: cero capital y operable desde el celular.',
      'Habilidad transferible y bien vista: enseñar ordena lo que uno sabe.'
    ],
    contras: [
      'Requiere constancia y paciencia: es el riesgo principal declarado.',
      'Ingreso por hora bajo comparado con otras ideas.',
      'Depende de que los compañeros quieran pagar por algo que a veces creen que es gratis.',
      'Coordinar horarios con cursos inferiores es complicado.',
      'El informe NO lo incluye en el ranking de encaje estructural de Macará (sección 3.3), así que no hay lectura de mercado sobre esta idea.'
    ],
    pasos: [
      { t: 'Paso 1 — Elegir UNA materia y UN nivel', d: 'Ejemplo: matemáticas de octavo. Enfocarse en un solo tema hace mucho más fácil conseguir los primeros alumnos.' },
      { t: 'Paso 2 — Aplicar el comparador de 3 fuentes para el precio por hora', d: 'Consultar 3 profesores particulares o academias de la zona, anotar precio por hora y calcular la mediana.' },
      { t: 'Paso 3 — Calcular el punto de equilibrio', d: 'Con capital nulo, calcular cuántas horas al mes justifican el tiempo y cuánto se quiere ganar.' },
      { t: 'Paso 4 — Preparar el material antes de la primera clase', d: 'Ejercicios impresos o en el celular. Llegar sin material quema la primera impresión.' },
      { t: 'Paso 5 — Empezar con 2 alumnos conocidos', d: 'Igual que en los entrenamientos: un grupo chico permite aprender sin fracasar en grande.' },
      { t: 'Paso 6 — Fijar horario, precio y reglas por escrito', d: 'Un mensaje claro a los padres o a los alumnos. Cumplir lo prometido es la habilidad #4.' },
      { t: 'Paso 7 — Registrar cada clase y cada pago el mismo día', d: 'Usar la libreta de la app.' },
      { t: 'Paso 8 — Decidir con datos al día 90', d: 'Si los alumnos siguieron viniendo, continuar. Si no, cambiar de idea sin insistir por orgullo.' }
    ],
    aprender: [
      { h: 'Constancia y paciencia', c: 'El riesgo principal declarado. La tutoría premia al que no falta.' },
      { h: 'Explicar con claridad', c: 'Enseñar es la mejor forma de dominar un tema.' },
      { h: 'Cumplir lo prometido', c: 'Fijar una fecha y cumplirla 10 veces.' },
      { h: 'Llevar cuentas con constancia', c: 'Registrar cada clase y cada pago.' },
      { h: 'Calcular precio, costo y ganancia', c: 'Valorar la hora de trabajo.' }
    ],
    herramientas: ['Khan Academy / YouTube para material de apoyo', 'Google Drive para guardar ejercicios', 'WhatsApp para coordinar horarios', 'Google Sheets / Excel móvil para el registro']
  }
};

/* --------------------------------------------------------------------------
   LAS 6 HABILIDADES (sección 4.1)
   -------------------------------------------------------------------------- */
export const HABILIDADES = [
  { n: 1, h: 'Llevar cuentas', q: 'Saber si ganó o perdió, sin engañarse', p: 'Registrar cada movimiento 30 días seguidos', estrella: true },
  { n: 2, h: 'Calcular precio y costo', q: 'Distinguir "plata que entra" de "ganancia real"', p: 'Recalcular un producto con costo + envío + merma' },
  { n: 3, h: 'Hablar con clientes', q: 'Escuchar el problema antes de ofrecer', p: 'Atender 5 personas y anotar qué pidieron' },
  { n: 4, h: 'Cumplir lo prometido', q: 'Entregar a tiempo; avisar si no puede', p: 'Fijar una fecha y cumplirla 10 veces' },
  { n: 5, h: 'Comunicar y vender por WhatsApp', q: 'Fotos claras, precio claro, respuesta rápida', p: 'Publicar un catálogo simple con 5 productos' },
  { n: 6, h: 'Separar el dinero del negocio del propio', q: 'No gastar la caja en consumo', p: 'Abrir una cuenta o sobre aparte' }
];

export const NOTA_HABILIDAD_1 = 'La habilidad #1 es la más importante y la menos divertida. Un adolescente que sabe leer sus propios números a los 16 años tiene una ventaja que la mayoría de adultos no tiene.';

export const CONCEPTO_1_PAGINA = {
  titulo: 'Concepto de negocio en 1 página',
  intro: 'Antes de gastar un dólar, escribir y responder con números:',
  preguntas: [
    { id: 'q1', t: '¿Qué vendo exactamente?', tipo: 'texto' },
    { id: 'q2', t: '¿A quién se lo vendo?', ayuda: 'Personas concretas, no "a todos"', tipo: 'texto' },
    { id: 'q3', t: '¿Cuánto me cuesta?', tipo: 'numero', unidad: 'USD' },
    { id: 'q4', t: '¿A cuánto lo vendo?', tipo: 'numero', unidad: 'USD' },
    { id: 'q5', t: '¿Cuánto gano por unidad?', tipo: 'calculado' },
    { id: 'q6', t: '¿Cuántas unidades debo vender para recuperar lo invertido?', tipo: 'calculado' },
    { id: 'q7', t: '¿Cómo sé si funcionó?', ayuda: 'Una meta medible', tipo: 'texto' }
  ],
  criterio: 'Si no puede llenar la página 6 con un número, todavía no está listo para comprar inventario — y eso es información valiosa, no un fracaso.'
};

/* --------------------------------------------------------------------------
   HERRAMIENTAS GRATUITAS (sección 4.3)
   -------------------------------------------------------------------------- */
export const HERRAMIENTAS = {
  notaVigencia: 'Los planes gratuitos cambian con frecuencia. Verifique límites y condiciones actuales antes de depender de cualquiera de estas herramientas. No se verificaron precios ni planes al detalle.',
  conIA: [
    { nombre: 'ChatGPT / Gemini / Claude (versión gratuita)', para: 'Tutor de negocio y de números', como: '"Explícame como si tuviera 16 años: si compro a 2 USD y vendo a 3, ¿cuánto gano?"' },
    { nombre: 'Asistente de IA para practicar ventas', para: 'Ensayar conversaciones difíciles', como: 'Pedirle que haga de cliente que dice "está caro" y practicar la respuesta' },
    { nombre: 'Canva (plan gratuito, con funciones de IA)', para: 'Diseñar flyers, menús y catálogos', como: 'Crear el catálogo de WhatsApp de su negocio' },
    { nombre: 'IA para redactar textos', para: 'Descripciones de productos y respuestas', como: 'Redactar publicaciones claras para WhatsApp y redes' },
    { nombre: 'IA para generar ideas y planes', para: 'Estructurar el plan de 90 días', como: 'Convertir su idea en pasos semanales' }
  ],
  sinIA: [
    { nombre: 'Google Sheets / Excel móvil', para: 'Registro diario de ingresos, gastos y stock' },
    { nombre: 'Google Drive', para: 'Guardar fotos de productos y respaldos' },
    { nombre: 'WhatsApp Business (gratuito)', para: 'Catálogo, respuestas rápidas, etiquetas de clientes' },
    { nombre: 'Google Trends', para: 'Ver si un producto se busca más o menos con el tiempo' },
    { nombre: 'Khan Academy / YouTube', para: 'Aprender porcentajes, márgenes y costos' }
  ],
  reglaIA: {
    titulo: 'Regla de uso de la IA — importante',
    texto: 'La IA propone, no decide. Si le pide un precio a una IA, la IA inventará un número plausible que puede no tener relación con Macará. La IA sirve para entender el método; el precio real sale de consultar 3 vendedores locales.'
  }
};

/* --------------------------------------------------------------------------
   PLAN DE 90 DÍAS (sección 4.4)
   -------------------------------------------------------------------------- */
export const PLAN_90 = {
  etapas: [
    {
      id: 'aprender', nombre: 'Aprender', dias: '1–15', emoji: '🧠',
      objetivo: 'Entender costo, precio y ganancia',
      entregable: 'Concepto de negocio en 1 página',
      tareas: [
        'Leer las 7 preguntas del concepto de negocio en 1 página',
        'Llenar las preguntas 1 y 2 (qué vendo y a quién)',
        'Calcular costo, precio y ganancia por unidad',
        'Calcular cuántas unidades recuperan la inversión',
        'Escribir una meta medible (pregunta 7)',
        'Repasar las 6 habilidades del informe y elegir en cuál estoy más débil'
      ]
    },
    {
      id: 'validar', nombre: 'Validar', dias: '16–30', emoji: '🔍',
      objetivo: 'Consultar 3 fuentes reales por producto',
      entregable: 'Tabla de 3 precios + mediana',
      tareas: [
        'Elegir los 2 o 3 productos o servicios a consultar',
        'Consultar vendedor 1: anotar vendedor, URL o dirección, fecha, modelo, precio, IVA, envío',
        'Consultar vendedor 2: mismos datos',
        'Consultar vendedor 3: mismos datos',
        'Calcular la mediana con el comparador de esta app',
        'Comparar la mediana con el costo de compra del proveedor',
        'Confirmar el precio de venta final'
      ]
    },
    {
      id: 'probar', nombre: 'Probar', dias: '31–60', emoji: '🚀',
      objetivo: 'Vender a 5–10 clientes reales',
      entregable: 'Registro diario con números',
      tareas: [
        'Publicar el catálogo simple de 5 productos por WhatsApp',
        'Conseguir el primer cliente',
        'Llegar a 5 clientes reales',
        'Llegar a 10 clientes reales',
        'Registrar cada movimiento todos los días, sin saltarse ninguno',
        'Pedir a 3 clientes que recomienden el negocio',
        'Revisar el punto de equilibrio al menos una vez por semana'
      ]
    },
    {
      id: 'decidir', nombre: 'Decidir', dias: '61–90', emoji: '🧭',
      objetivo: 'Evaluar con datos si continúa o cambia',
      entregable: 'Una hoja con el resultado real',
      tareas: [
        'Sumar todos los ingresos de los 90 días',
        'Sumar todos los gastos de los 90 días',
        'Calcular la ganancia real (ingresos menos gastos)',
        'Comparar el resultado con la meta medible de la etapa Aprender',
        'Escribir qué funcionó y qué no',
        'Tomar la decisión: continuar, ajustar o cambiar de idea'
      ]
    }
  ],
  criterioHonesto: 'Si al día 90 no vendió nada, el aprendizaje sigue siendo valioso y debe cambiar de idea — no insistir por orgullo.'
};

/* --------------------------------------------------------------------------
   ESCALAMIENTO (sección 5)
   -------------------------------------------------------------------------- */
export const ESCALAMIENTO = {
  intro: 'Este informe NO autoriza ninguna acción. Requiere revisión humana:',
  filas: [
    { n: 1, motivo: 'Menor de edad: representación legal, RUC y patente municipal', responsable: 'Adulto responsable + asesoría contable' },
    { n: 2, motivo: 'Contradicción en la población de Macará (12 454 / 15 235 / 25 901)', responsable: 'Usted, con datos del INEC' },
    { n: 3, motivo: 'Sin 3 fuentes locales por producto → sin precios ni márgenes', responsable: 'Usted o el adolescente, aportando las fuentes' },
    { n: 4, motivo: 'Rúbrica 1–5 no aprobada → sin puntuaciones', responsable: 'Usted' },
    { n: 5, motivo: 'Actividad transfronteriza con Perú (sección 3.4)', responsable: 'Adulto + asesoría aduanera' },
    { n: 6, motivo: 'Protección de datos de clientes menores y del propio adolescente', responsable: 'Usted' }
  ]
};

export const SIGUIENTE_PASO = {
  titulo: 'Siguiente paso humano concreto',
  subtitulo: 'Una sola acción, esta semana',
  texto: 'Elegir UN negocio de las categorías A o B, y traer a este agente 3 fuentes locales reales con URL (vendedor, fecha, modelo, precio, IVA, envío) para ese producto o servicio.',
  cierre: 'Con esas fuentes, A1 puede ejecutar P-AB2 y P-AB3 correctamente y devolver un informe con precio de referencia, margen estimado y puntuación — es decir, pasar de orientación a análisis real.'
};

/* --------------------------------------------------------------------------
   DATOS FALTANTES (del JSON A1)
   -------------------------------------------------------------------------- */
export const DATOS_FALTANTES = [
  { campo: 'Población verificada de Macará', motivo: 'El operador indica ~18000; las fuentes dan 12454 (ciudad 2022), 15235 y 25901 (cantón, contradictorias entre sí).', como: 'Consultar el censo vigente en el INEC y definir si el mercado objetivo es la ciudad o el cantón.' },
  { campo: 'Rúbrica 1–5 aprobada', motivo: 'Sin rúbrica aprobada el contrato A1 prohíbe inventar puntajes y emitir ranking.', como: 'Que el responsable apruebe los criterios y sus cortes antes de puntuar.' },
  { campo: 'Fuentes locales por producto', motivo: 'Sin 3 fuentes reales con URL por producto no se calcula precio de mercado ni margen.', como: 'Aportar 3 vendedores distintos con URL o dirección, fecha, modelo, precio, IVA y envío.' },
  { campo: 'Cotización formal de proveedor', motivo: 'Requisito previo a cualquier compra o fijación de precio.', como: 'Solicitar cotización escrita al proveedor, con vigencia y condiciones.' },
  { campo: 'Situación legal del menor para facturar', motivo: 'Las fichas oficiales del SRI no pudieron leerse; el alcance real de la representación legal no fue verificado.', como: 'Acudir al SRI o a un contador con la ficha oficial de menores no emancipados.' },
  { campo: 'Permisos municipales en Macará', motivo: 'El código municipal consultado es de Loja y no se verificó su aplicación al cantón Macará.', como: 'Consultar directamente al GAD Municipal de Macará.' },
  { campo: 'Estado actual del paso fronterizo', motivo: 'Hay reportes de cierre y reapertura parcial que afectan la economía local.', como: 'Confirmar con fuentes oficiales o locales antes de depender del comercio transfronterizo.' },
  { campo: 'Capacidad de la cuenta bancaria del adolescente', motivo: 'El operador declara cuenta propia, pero no se verificaron restricciones por edad para recibir transferencias.', como: 'Consultar en el banco emisor.' },
  { campo: 'Horas semanales reales disponibles', motivo: 'Supuesto declarado sin confirmar; determina la capacidad de atención.', como: 'Definir con el adolescente y su representante.' }
];

export const EVIDENCIAS = [
  { id: 'E1', ref: 'Wikipedia — Macará', url: 'https://es.wikipedia.org/wiki/Macar%C3%A1', tipo: 'Enciclopedia', limitacion: 'Fuente secundaria; población 12 454 (2022)' },
  { id: 'E2', ref: 'Wikipedia — Cantón Macará', url: 'https://es.wikipedia.org/wiki/Cant%C3%B3n_Macar%C3%A1', tipo: 'Enciclopedia', limitacion: 'Autocontradictoria (15 235 vs 25 901)' },
  { id: 'E3', ref: 'SRI — Requisitos RUC menores', url: 'https://www.sri.gob.ec/', tipo: 'Oficial', limitacion: 'PDF no legible por el agente; contenido NO verificado' },
  { id: 'E4', ref: 'Código Municipal de Loja', url: 'https://www.loja.gob.ec/files/documentos/2016-01/codificado_municipio_2015.pdf', tipo: 'Oficial', limitacion: 'PDF no legible; aplicabilidad a Macará sin verificar' },
  { id: 'E5', ref: 'El Diario — cierre del puente', url: 'https://www.eldiario.ec/ecuador/habitantes-de-macara-marchan-para-pedir-la-reapertura-del-puente-internacional-con-peru-03072026/', tipo: 'Noticia', limitacion: 'Estado actual del paso sin confirmar' },
  { id: 'E6', ref: 'CORAPE — frontera Loja', url: 'https://radio.corape.org.ec/noticia/item/loja-comunidades-fronterizas-exigen-la-reapertura-total-del-paso-entre-ecuador-y-peru-para-reactivar-la-economia-local-', tipo: 'Noticia', limitacion: 'Fecha exacta no confirmada' },
  { id: 'E7', ref: 'La Hora — Macará frontera abandonada', url: 'https://www.lahora.com.ec/loja/Macara-frontera-abandonada-20221119-0033.html', tipo: 'Noticia', limitacion: 'HTTP 403: no se pudo leer el contenido' }
];

export const CONTEXTO_MACARA = [
  { tema: 'Clima', d: 'Tropical sabana, cálido seco. Temperatura media ~26 °C, máximas sobre 33 °C, picos de sensación térmica >40 °C entre noviembre y abril; insolación >3100 h/año.' },
  { tema: 'Economía', d: 'Agricultura (arroz como cultivo principal, maíz, maní, mango, cítricos, yuca, banano) y comercio de frontera con Perú por el Puente Internacional.' },
  { tema: 'Fiestas comerciales clave', d: '10 de agosto (Feria Comercial de Integración Fronteriza) y 22 de septiembre (Cantonización).' },
  { tema: 'Contexto fronterizo', d: 'Existen reportes de cierre y reapertura parcial del paso fronterizo con impacto económico local. Verificar el estado actual del paso antes de depender de él.' },
  { tema: 'Migración', d: 'Población que emigra a EE.UU. y Europa, con remesas que dinamizan el consumo local.' }
];

export const LECTURA_ESTRATEGICA = [
  'Mercado pequeño y de bajo poder adquisitivo. Con ~12 000–15 000 habitantes en la ciudad, no existe volumen para sostener un negocio de ticket alto. Esto favorece ticket bajo y alta rotación, no productos caros.',
  'El calor es un factor de demanda real y verificable. Con 7–8 meses secos y temperaturas sobre 33 °C, todo lo relacionado con hidratación, fresco y actividad al aire libre tiene demanda estructural.',
  'La frontera es una oportunidad y un riesgo. Genera flujo comercial, pero su cierre (documentado) puede cortar ese flujo sin aviso. No conviene que el negocio dependa exclusivamente de ella.'
];

export const ADVERTENCIA_RANKING = 'Sin datos de demanda local (exportación de grupos, ventas observadas, censo económico) NO se puede afirmar qué es "más rentable". El orden que se muestra es un análisis de encaje estructural con la economía documentada de Macará, ordenado por lógica de causa-efecto — no una proyección de ingresos. Ninguna cifra de rentabilidad se emite.';
