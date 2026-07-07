// ============================================================
// logicaHaskellPractica.js
// Lógica completa de la app de práctica funcional en Haskell
// ============================================================

// ===== DATOS: BANCO DE EJERCICIOS =====
const bancoEjercicios = [
  {
    id: 'comp1',
    tema: 'composicion',
    titulo: 'Doble incremento',
    dificultad: 'Básico',
    descripcion: 'Definí <code>dobleIncremento</code> usando solo composición <code>(.)</code> y secciones de operadores. Debe incrementar en 1 y luego duplicar. Sin auxiliares.',
    ejemplo: 'dobleIncremento 3  →  8\ndobleIncremento 0  →  2',
    palabrasClave: ['(.)', '(*2)', '(+1)', '.'],
    pistas: [
      'Usá el operador (.) para encadenar funciones',
      'Primero aplica (+1), luego (*2)',
      'dobleIncremento = (*2) . (+1)'
    ],
    solucionReferencia: 'dobleIncremento = (*2) . (+1)'
  },
  {
    id: 'comp2',
    tema: 'composicion',
    titulo: 'Nombre falopa',
    dificultad: 'Parcial',
    descripcion: 'Sin recursión ni funciones auxiliares, definí <code>nombreFalopa</code>. Un nombre es falopa si su última letra es <code>\'i\'</code>.',
    ejemplo: "nombreFalopa \"gachi\"   →  True\nnombreFalopa \"Dorothy\" →  False",
    palabrasClave: ["(=='i')", 'last', '.'],
    pistas: [
      "Necesitás last para obtener el último carácter",
      "Comparalo con 'i' usando (=='i')",
      "nombreFalopa = (=='i') . last"
    ],
    solucionReferencia: "nombreFalopa = (=='i') . last"
  },
  {
    id: 'comp3',
    tema: 'composicion',
    titulo: 'La pasó mal',
    dificultad: 'Parcial',
    descripcion: 'Definí <code>laPasoMal</code> con composición pura. Un animal la pasó mal si alguna visita tuvo más de 30 días de recuperación. Tenés disponibles <code>visitas :: Animal -> [Visita]</code> y <code>diasRecuperacion :: Visita -> Int</code>.',
    ejemplo: '-- animal con visita de 45 días → True\n-- animal con visita de 20 días → False',
    palabrasClave: ['any', '(>30)', 'visitas', 'map diasRecuperacion', '.'],
    pistas: [
      'Usá any con el predicado (>30)',
      'Obtené los días con: map diasRecuperacion . visitas',
      'laPasoMal = any (>30) . map diasRecuperacion . visitas'
    ],
    solucionReferencia: 'laPasoMal = any (>30) . map diasRecuperacion . visitas'
  },
  {
    id: 'rec1',
    tema: 'recursion',
    titulo: 'Longitud de lista',
    dificultad: 'Básico',
    descripcion: 'Definí <code>miLongitud</code> con recursión explícita. Caso base: lista vacía devuelve 0. Caso recursivo: 1 más la longitud del resto.',
    ejemplo: 'miLongitud [1,2,3]  →  3\nmiLongitud []       →  0',
    palabrasClave: ['[]', '= 0', ':xs', '1 + miLongitud'],
    pistas: [
      'Caso base: miLongitud [] = 0',
      'Usá pattern matching con (_:xs)',
      'miLongitud (_:xs) = 1 + miLongitud xs'
    ],
    solucionReferencia: 'miLongitud [] = 0\nmiLongitud (_:xs) = 1 + miLongitud xs'
  },
  {
    id: 'rec2',
    tema: 'recursion',
    titulo: 'Mejora sustentable',
    dificultad: 'Parcial',
    descripcion: 'Con recursión, verificá si una lista de pesos mejora sustentablemente: el peso nunca baja ni sube más de 3 kilos entre pasos consecutivos.',
    ejemplo: '-- [100, 102, 104] → True\n-- [100, 95,  103] → False  (baja)\n-- [100, 104, 105] → False  (sube 4)',
    palabrasClave: ['[]', 'True', 'x < prev', 'x > prev + 3', 'False', 'otherwise'],
    pistas: [
      'Caso base: lista vacía → True',
      'Comparar cada elemento con el anterior',
      'Si x < prev o x > prev+3 → False, sino seguir'
    ],
    solucionReferencia: 'mejoraSustentable [] _ = True\nmejoraSustentable (x:xs) prev\n  | x < prev || x > prev + 3 = False\n  | otherwise = mejoraSustentable xs x'
  },
  {
    id: 'rec3',
    tema: 'recursion',
    titulo: 'Suma de lista',
    dificultad: 'Básico',
    descripcion: 'Definí <code>sumaLista :: [Int] -> Int</code> con recursión. Caso base: 0. Caso recursivo: cabeza más suma del resto.',
    ejemplo: 'sumaLista [1,2,3,4]  →  10\nsumaLista []         →  0',
    palabrasClave: ['sumaLista [] = 0', 'x +', 'sumaLista xs', 'x:xs'],
    pistas: [
      'Caso base: sumaLista [] = 0',
      'Usá pattern matching (x:xs)',
      'sumaLista (x:xs) = x + sumaLista xs'
    ],
    solucionReferencia: 'sumaLista [] = 0\nsumaLista (x:xs) = x + sumaLista xs'
  },
  {
    id: 'os1',
    tema: 'orden-superior',
    titulo: 'Primeros 3 con nombre falopa',
    dificultad: 'Parcial',
    descripcion: 'Solo con funciones de orden superior (sin recursión), obtené los primeros 3 animales con nombre falopa de una lista <code>animales</code>.',
    ejemplo: 'take 3 (filter nombreFalopa animales)',
    palabrasClave: ['take', 'filter', 'nombreFalopa', '3'],
    pistas: [
      'filter para quedarte con los que tienen nombre falopa',
      'take 3 del resultado',
      'take 3 . filter nombreFalopa'
    ],
    solucionReferencia: 'take 3 . filter nombreFalopa'
  },
  {
    id: 'os2',
    tema: 'orden-superior',
    titulo: 'Suma de cargas pares',
    dificultad: 'Básico',
    descripcion: 'Dado una lista de aventureros, sumá la carga total de los que tienen carga par. Solo orden superior.',
    ejemplo: '-- cargas [4, 7, 2, 9, 6] → 12 (4+2+6)',
    palabrasClave: ['sum', 'map carga', 'filter', 'even'],
    pistas: [
      'filter (even . carga) para filtrar',
      'map carga para extraer los valores',
      'sum para sumar'
    ],
    solucionReferencia: 'sum . map carga . filter (even . carga)'
  },
  {
    id: 'os3',
    tema: 'orden-superior',
    titulo: '¿Existe aventurero con nombre largo?',
    dificultad: 'Básico',
    descripcion: 'Determiná si existe algún aventurero cuyo nombre tenga más de 5 letras. Usá solo orden superior.',
    ejemplo: '-- "Frodo" (5 letras) → False\n-- "Aragorn" (7 letras) → True',
    palabrasClave: ['any', '(>5)', 'length', 'nombre'],
    pistas: [
      'any evalúa si algún elemento cumple el predicado',
      'Necesitás saber el largo del nombre',
      'any ((>5) . length . nombre) aventureros'
    ],
    solucionReferencia: 'any ((>5) . length . nombre) aventureros'
  },
  {
    id: 'os4',
    tema: 'orden-superior',
    titulo: 'Listas infinitas y lazy evaluation',
    dificultad: 'Conceptual',
    descripcion: 'Explicá: ¿<code>take 3 (filter nombreFalopa animalesInfinitos)</code> termina? ¿Y <code>length (filter nombreFalopa listaInfinita)</code>? Relacioná con lazy evaluation.',
    ejemplo: '-- Reflexión conceptual, no hay código a corregir',
    palabrasClave: ['lazy', 'take', 'length', 'infinita', 'no termina'],
    pistas: [
      'Haskell evalúa de forma lazy (no estricta)',
      'take 3 solo necesita encontrar 3 resultados',
      'length necesita recorrer toda la lista: no termina'
    ],
    solucionReferencia: 'take 3 termina: Haskell es lazy, evalúa solo lo necesario.\nlength no termina: debe recorrer toda la lista infinita → no computable.'
  },
  {
    id: 'tipos1',
    tema: 'tipos',
    titulo: 'Modelar Animal',
    dificultad: 'Parcial',
    descripcion: 'Definí el tipo <code>Animal</code> con nombre (String), tipo (String), peso (Double), edad (Int) y enfermo (Bool). Usá record syntax.',
    ejemplo: 'data Animal = Animal { nombre :: String, ... } deriving (Show)',
    palabrasClave: ['data Animal', 'Animal {', 'nombre', 'peso', 'edad', 'enfermo', 'String', 'Double', 'Int', 'Bool'],
    pistas: [
      'Usá record syntax con llaves {}',
      'Separar los campos con comas',
      'Agregá deriving (Show) al final'
    ],
    solucionReferencia: 'data Animal = Animal {\n  nombre  :: String,\n  tipo    :: String,\n  peso    :: Double,\n  edad    :: Int,\n  enfermo :: Bool\n} deriving (Show)'
  },
  {
    id: 'tipos2',
    tema: 'tipos',
    titulo: 'Actividad: engorde',
    dificultad: 'Parcial',
    descripcion: 'Definí <code>engorde</code>: recibe kilos (Double) y un Animal, devuelve el animal con peso incrementado en <code>min(kilos, 5)</code>.',
    ejemplo: '-- Dorothy 690kg, engorde 12 → 695kg\n-- Dorothy 690kg, engorde 4  → 694kg',
    palabrasClave: ['engorde', 'min', 'peso a +', 'a {'],
    pistas: [
      'Usá record update syntax: a { peso = ... }',
      'El incremento es min kilos 5',
      'engorde kilos a = a { peso = peso a + min kilos 5 }'
    ],
    solucionReferencia: 'engorde :: Double -> Animal -> Animal\nengorde kilos a = a { peso = peso a + min kilos 5 }'
  },
  {
    id: 'tipos3',
    tema: 'tipos',
    titulo: 'Actividad: festejo cumple',
    dificultad: 'Parcial',
    descripcion: 'Definí <code>festejoCumple</code>: agrega un año de edad y por la emoción el animal pierde 1 kilo de peso.',
    ejemplo: '-- Animal con edad 3, peso 100 → edad 4, peso 99',
    palabrasClave: ['festejoCumple', 'edad a +', '1', 'peso a -', 'a {'],
    pistas: [
      'Modificar dos campos a la vez con record update',
      'edad a + 1 y peso a - 1',
      'festejoCumple a = a { edad = edad a + 1, peso = peso a - 1 }'
    ],
    solucionReferencia: 'festejoCumple :: Animal -> Animal\nfestejoCumple a = a { edad = edad a + 1, peso = peso a - 1 }'
  }
];

// ===== DATOS: BANCO DE EXÁMENES =====
const bancoPreguntasExamen = {
  granja: [
    { numero: 1, tipo: 'Composición', pregunta: 'Definí <code>nombreFalopa</code> usando solo composición y aplicación parcial (sin auxiliares ni recursión). Un nombre es falopa si su última letra es <code>\'i\'</code>.', palabrasClave: ["(=='i')", 'last', '.'] },
    { numero: 2, tipo: 'Tipos', pregunta: 'Definí el tipo <code>Animal</code> con nombre (String), tipo (String), peso (Double), edad (Int) y enfermo (Bool). Usá record syntax.', palabrasClave: ['data Animal', 'nombre', 'peso', 'edad', 'enfermo', 'Bool'] },
    { numero: 3, tipo: 'Composición', pregunta: 'Definí <code>engorde</code>: recibe kilos y un animal, devuelve el animal con peso aumentado en <code>min(kilos, 5)</code>. Sin funciones auxiliares.', palabrasClave: ['engorde', 'min', 'peso', 'a {'] },
    { numero: 4, tipo: 'Recursión', pregunta: 'Definí <code>mejoraSustentable</code> con recursión. El peso nunca puede bajar ni subir más de 3 entre actividades consecutivas.', palabrasClave: ['[]', 'True', 'x < prev', 'x > prev + 3', 'False', 'otherwise'] },
    { numero: 5, tipo: 'Orden superior', pregunta: 'Usando solo funciones de orden superior, obtené los primeros 3 animales con nombre falopa de la lista <code>animales</code>.', palabrasClave: ['take 3', 'filter', 'nombreFalopa'] }
  ],
  aventureros: [
    { numero: 1, tipo: 'Tipos', pregunta: 'Definí el tipo <code>Aventurero</code> con nombre (String), carga (Int), salud (Int) y coraje (Bool).', palabrasClave: ['data Aventurero', 'nombre', 'carga', 'salud', 'coraje', 'Bool'] },
    { numero: 2, tipo: 'Orden superior', pregunta: '¿Existe algún aventurero cuyo nombre tenga más de 5 letras? Resolvé usando solo funciones de orden superior.', palabrasClave: ['any', '(>5)', 'length', 'nombre'] },
    { numero: 3, tipo: 'Orden superior', pregunta: 'Sumá la carga total de aventureros cuya carga sea par. Solo orden superior, sin recursión.', palabrasClave: ['sum', 'map carga', 'filter', 'even'] },
    { numero: 4, tipo: 'Composición', pregunta: 'Definí el encuentro con el Curandero: reduce la carga a la mitad, aumenta la salud en 20%, y todo encuentro descuenta 1 de carga adicional. Sin auxiliares.', palabrasClave: ['carga', '/ 2', 'salud', '* 1.2', '- 1'] },
    { numero: 5, tipo: 'Recursión', pregunta: 'Con recursión, determiná la lista de encuentros que enfrentaría un aventurero: si tras un encuentro no cumple su criterio, se detiene y no evalúa los siguientes.', palabrasClave: ['[]', 'criterio', 'otherwise', 'x:xs'] }
  ],
  magos: [
    { numero: 1, tipo: 'Tipos', pregunta: 'Modelá <code>Mago</code> con nombre (String), edad (Int), salud (Int) y hechizos. Definí también el tipo <code>Hechizo</code> como función <code>Mago -> Mago</code>.', palabrasClave: ['data Mago', 'type Hechizo', 'Mago -> Mago', 'hechizos', 'salud'] },
    { numero: 2, tipo: 'Composición', pregunta: 'Definí <code>poder :: Mago -> Int</code>: es la salud más (edad × cantidad de hechizos). Sin auxiliares.', palabrasClave: ['poder', 'salud', 'edad', 'length hechizos', '*', '+'] },
    { numero: 3, tipo: 'Orden superior', pregunta: '¿Hay algún mago sin hechizos cuyo nombre sea "Rincenwind"? Resolvé sin recursión.', palabrasClave: ['any', 'null', 'hechizos', 'nombre', '"Rincenwind"'] },
    { numero: 4, tipo: 'Composición', pregunta: 'Definí <code>lanzarRayo</code>: si la salud del objetivo es mayor a 10 le hace 10 de daño, si no le quita la mitad. Sin auxiliares ni recursión.', palabrasClave: ['lanzarRayo', 'salud', '> 10', '- 10', 'div 2'] },
    { numero: 5, tipo: 'Orden superior', pregunta: 'Definí <code>noPuedeGanarle</code> sin recursión: el segundo mago no gana si tras aplicarle todos sus hechizos la salud del primero sigue igual.', palabrasClave: ['foldl', 'flip', '($)', 'hechizos', 'salud'] }
  ],
  mixto: []
};

// ===== ESTADO DE LA APLICACIÓN =====
let historialErrores = JSON.parse(localStorage.getItem('hk-errores') || '[]');
let indicePistaPorEjercicio = {};

// ===== NAVEGACIÓN =====

/**
 * Muestra el panel correspondiente al tab seleccionado.
 * @param {string} nombrePanel - Nombre del panel a mostrar
 * @param {HTMLElement} elementoTab - Botón tab clickeado
 */
function mostrarTab(nombrePanel, elementoTab) {
  document.querySelectorAll('.tabNavegacion').forEach(t => t.classList.remove('tabNavegacionActivo'));
  document.querySelectorAll('.panelContenido').forEach(p => p.classList.remove('panelActivo'));

  elementoTab.classList.add('tabNavegacionActivo');
  document.getElementById('panel-' + nombrePanel).classList.add('panelActivo');

  if (nombrePanel === 'errores') renderizarHistorialErrores();
}

// ===== RENDERIZADO DE EJERCICIOS =====

/**
 * Devuelve la clase CSS de dificultad correspondiente.
 * @param {string} dificultad
 * @returns {string}
 */
function obtenerClaseDificultad(dificultad) {
  const mapa = {
    'Básico': 'etiquetaDificultadBasico',
    'Parcial': 'etiquetaDificultadParcial',
    'Conceptual': 'etiquetaDificultadConceptual'
  };
  return mapa[dificultad] || 'etiquetaDificultadBasico';
}

/**
 * Devuelve la clase CSS de tema correspondiente.
 * @param {string} tema
 * @returns {string}
 */
function obtenerClaseTema(tema) {
  const mapa = {
    'composicion': 'etiquetaTemaComposicion',
    'recursion': 'etiquetaTemaRecursion',
    'orden-superior': 'etiquetaTemaOrdenSuperior',
    'tipos': 'etiquetaTemaTipos'
  };
  return mapa[tema] || 'etiquetaTemaComposicion';
}

/**
 * Devuelve el label legible de un tema.
 * @param {string} tema
 * @returns {string}
 */
function obtenerLabelTema(tema) {
  const mapa = {
    'composicion': 'composición',
    'recursion': 'recursión',
    'orden-superior': 'orden superior',
    'tipos': 'tipos'
  };
  return mapa[tema] || tema;
}

/**
 * Genera el HTML de una tarjeta de ejercicio.
 * @param {Object} ejercicio
 * @returns {string}
 */
function generarHTMLTarjetaEjercicio(ejercicio) {
  return `
    <div class="tarjetaEjercicio" id="tarjeta-${ejercicio.id}">
      <div class="tituloTarjeta">
        ${ejercicio.titulo}
        <span class="etiquetaTipo ${obtenerClaseDificultad(ejercicio.dificultad)}">${ejercicio.dificultad}</span>
        <span class="etiquetaTema ${obtenerClaseTema(ejercicio.tema)}">${obtenerLabelTema(ejercicio.tema)}</span>
      </div>
      <div class="descripcionEjercicio">${ejercicio.descripcion}</div>
      <pre class="bloqueCodigoHaskell">${ejercicio.ejemplo}</pre>
      <textarea
        class="campoRespuestaHaskell"
        id="respuesta-${ejercicio.id}"
        placeholder="Escribí tu solución en Haskell..."
      ></textarea>
      <div class="filaAccionesEjercicio">
        <button class="botonPrimario" onclick="verificarRespuesta('${ejercicio.id}')">Verificar</button>
        <button class="botonAccion" onclick="mostrarPista('${ejercicio.id}')">Pista</button>
        <button class="botonAccion" onclick="mostrarSolucion('${ejercicio.id}')">Ver solución</button>
      </div>
      <div class="mensajeFeedback" id="feedback-${ejercicio.id}"></div>
    </div>
  `;
}

/**
 * Filtra y renderiza los ejercicios según el tema seleccionado.
 * @param {string} tema - 'all' o nombre del tema
 * @param {HTMLElement} elementoBoton - Botón de filtro clickeado
 */
function filtrarEjercicios(tema, elementoBoton) {
  document.querySelectorAll('.botonFiltro').forEach(b => b.classList.remove('botonFiltroActivo'));
  elementoBoton.classList.add('botonFiltroActivo');

  const listaFiltrada = tema === 'all'
    ? bancoEjercicios
    : bancoEjercicios.filter(e => e.tema === tema);

  document.getElementById('contenedorEjercicios').innerHTML =
    listaFiltrada.map(generarHTMLTarjetaEjercicio).join('');
}

// ===== VERIFICACIÓN DE RESPUESTAS =====

/**
 * Normaliza el texto para comparación (minúsculas, sin espacios extra ni comentarios).
 * @param {string} texto
 * @returns {string}
 */
function normalizarTextoHaskell(texto) {
  return texto
    .toLowerCase()
    .replace(/--[^\n]*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Verifica la respuesta del alumno para un ejercicio dado.
 * @param {string} idEjercicio
 */
function verificarRespuesta(idEjercicio) {
  const ejercicio = bancoEjercicios.find(e => e.id === idEjercicio);
  const textoRespuesta = document.getElementById('respuesta-' + idEjercicio).value;
  const respuestaNormalizada = normalizarTextoHaskell(textoRespuesta);
  const elementoFeedback = document.getElementById('feedback-' + idEjercicio);

  const palabrasFaltantes = ejercicio.palabrasClave.filter(
    palabra => !respuestaNormalizada.includes(palabra.toLowerCase())
  );
  const puntaje = 1 - palabrasFaltantes.length / ejercicio.palabrasClave.length;

  if (puntaje >= 0.72) {
    elementoFeedback.className = 'mensajeFeedback feedbackCorrecto';
    elementoFeedback.innerHTML = '✓ ¡Muy bien! Tu respuesta incluye los elementos clave.';
  } else {
    elementoFeedback.className = 'mensajeFeedback feedbackIncorrecto';
    const descripcionFaltantes = palabrasFaltantes.slice(0, 3)
      .map(p => `<code>${p}</code>`)
      .join(', ');
    elementoFeedback.innerHTML = `✗ Faltan elementos importantes: ${descripcionFaltantes}`;
    registrarError(ejercicio, palabrasFaltantes);
  }
}

/**
 * Muestra la siguiente pista disponible para un ejercicio.
 * @param {string} idEjercicio
 */
function mostrarPista(idEjercicio) {
  const ejercicio = bancoEjercicios.find(e => e.id === idEjercicio);
  indicePistaPorEjercicio[idEjercicio] = indicePistaPorEjercicio[idEjercicio] || 0;
  const indicePista = indicePistaPorEjercicio[idEjercicio] % ejercicio.pistas.length;
  const elementoFeedback = document.getElementById('feedback-' + idEjercicio);

  elementoFeedback.className = 'mensajeFeedback feedbackPista';
  elementoFeedback.innerHTML = '💡 ' + ejercicio.pistas[indicePista];
  indicePistaPorEjercicio[idEjercicio]++;
}

/**
 * Muestra la solución de referencia para un ejercicio.
 * @param {string} idEjercicio
 */
function mostrarSolucion(idEjercicio) {
  const ejercicio = bancoEjercicios.find(e => e.id === idEjercicio);
  const elementoFeedback = document.getElementById('feedback-' + idEjercicio);

  elementoFeedback.className = 'mensajeFeedback feedbackPista';
  elementoFeedback.innerHTML =
    '✅ Solución de referencia:<br>' +
    `<span style="font-family:'JetBrains Mono',monospace; font-size:12px;">${ejercicio.solucionReferencia.replace(/\n/g, '<br>')}</span>`;
}

// ===== GESTIÓN DE ERRORES =====

/**
 * Registra o actualiza un error en el historial.
 * @param {Object} ejercicio - Ejercicio con error
 * @param {string[]} palabrasFaltantes - Palabras clave no encontradas
 */
function registrarError(ejercicio, palabrasFaltantes) {
  const indiceExistente = historialErrores.findIndex(e => e.id === ejercicio.id);
  const entradaError = {
    id: ejercicio.id,
    titulo: ejercicio.titulo,
    tema: ejercicio.tema,
    palabrasFaltantes,
    cantidad: 1,
    ultimaFecha: new Date().toLocaleDateString('es-AR')
  };

  if (indiceExistente >= 0) {
    historialErrores[indiceExistente].cantidad++;
    historialErrores[indiceExistente].palabrasFaltantes = palabrasFaltantes;
    historialErrores[indiceExistente].ultimaFecha = entradaError.ultimaFecha;
  } else {
    historialErrores.push(entradaError);
  }

  localStorage.setItem('hk-errores', JSON.stringify(historialErrores));
}

/**
 * Renderiza el panel de historial de errores.
 */
function renderizarHistorialErrores() {
  const contenedor = document.getElementById('contenedorHistorialErrores');

  if (historialErrores.length === 0) {
    contenedor.innerHTML = `
      <div class="estadoVacio">
        <div class="iconoEstadoVacio">△</div>
        <p>Sin errores registrados todavía.<br>Completá ejercicios para ver tu historial aquí.</p>
      </div>`;
    return;
  }

  const totalEjercicios = bancoEjercicios.length;
  const porcentajeProgreso = Math.round((totalEjercicios - historialErrores.length) / totalEjercicios * 100);
  const totalErrores = historialErrores.reduce((suma, e) => suma + e.cantidad, 0);

  const errorEsPorTema = {};
  historialErrores.forEach(e => {
    errorEsPorTema[e.tema] = (errorEsPorTema[e.tema] || 0) + e.cantidad;
  });
  const temaMasProblematico = Object.entries(errorEsPorTema).sort((a, b) => b[1] - a[1])[0];

  const listaOrdenada = [...historialErrores].sort((a, b) => b.cantidad - a.cantidad);

  contenedor.innerHTML = `
    <div class="contenedorBarraProgreso">
      <div class="filaEtiquetaProgreso">
        <span>Progreso de ejercicios</span>
        <span>${porcentajeProgreso}%</span>
      </div>
      <div class="barraProgreso">
        <div class="rellenoBarraProgreso" style="width: ${porcentajeProgreso}%"></div>
      </div>
    </div>

    <div class="gridEstadisticasError">
      <div class="tarjetaEstadistica">
        <div class="etiquetaEstadistica">Total errores</div>
        <div class="valorEstadistica">${totalErrores}</div>
      </div>
      <div class="tarjetaEstadistica">
        <div class="etiquetaEstadistica">Tema más problemático</div>
        <div class="valorEstadisticaChico">${temaMasProblematico ? obtenerLabelTema(temaMasProblematico[0]) : '—'}</div>
      </div>
      <div class="tarjetaEstadistica">
        <div class="etiquetaEstadistica">Ejercicios con error</div>
        <div class="valorEstadistica">${historialErrores.length}/${totalEjercicios}</div>
      </div>
    </div>

    <div class="tarjetaHistorialErrores">
      <div class="tituloHistorialErrores">Historial detallado</div>
      <ul class="listaErrores">
        ${listaOrdenada.map(e => `
          <li class="itemError">
            <span class="contadorError">${e.cantidad}×</span>
            <div>
              <div class="nombreEjercicioError">${e.titulo}</div>
              <div class="metadatoError">Tema: ${obtenerLabelTema(e.tema)} · Último error: ${e.ultimaFecha}</div>
              <div class="metadatoError">
                Faltó: ${e.palabrasFaltantes.slice(0, 3).map(p => `<code>${p}</code>`).join(', ')}
              </div>
            </div>
          </li>`).join('')}
      </ul>
    </div>

    <div class="filaAccionesHistorial">
      <button class="botonSecundario" onclick="limpiarHistorialErrores()">🗑 Limpiar historial</button>
    </div>
  `;
}

/**
 * Limpia el historial de errores del localStorage.
 */
function limpiarHistorialErrores() {
  if (!confirm('¿Limpiar todo el historial de errores?')) return;
  historialErrores = [];
  localStorage.setItem('hk-errores', JSON.stringify(historialErrores));
  renderizarHistorialErrores();
}

// ===== EXAMEN SIMULADO =====

/**
 * Genera y renderiza un examen del modo seleccionado.
 */
function generarExamen() {
  const modoSeleccionado = document.getElementById('selectorModoExamen').value;

  if (modoSeleccionado === 'mixto') {
    const todasLasPreguntas = [
      ...bancoPreguntasExamen.granja,
      ...bancoPreguntasExamen.aventureros,
      ...bancoPreguntasExamen.magos
    ];
    bancoPreguntasExamen.mixto = todasLasPreguntas
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
      .map((pregunta, indice) => ({ ...pregunta, numero: indice + 1 }));
  }

  const preguntasExamen = bancoPreguntasExamen[modoSeleccionado];
  document.getElementById('contenedorResultadoExamen').innerHTML = '';

  document.getElementById('contenedorExamen').innerHTML =
    preguntasExamen.map(generarHTMLPreguntaExamen).join('') +
    `<div class="filaAccionesEjercicio">
      <button class="botonPrimario" onclick="corregirExamen('${modoSeleccionado}')">Entregar examen →</button>
    </div>`;
}

/**
 * Genera el HTML de una pregunta de examen.
 * @param {Object} pregunta
 * @returns {string}
 */
function generarHTMLPreguntaExamen(pregunta) {
  return `
    <div class="preguntaExamen">
      <div class="etiquetaPreguntaExamen">Ejercicio ${pregunta.numero} — ${pregunta.tipo}</div>
      <div class="descripcionPreguntaExamen">${pregunta.pregunta}</div>
      <textarea
        class="campoRespuestaHaskell"
        id="respuestaExamen-${pregunta.numero}"
        placeholder="Tu respuesta..."
      ></textarea>
    </div>
  `;
}

/**
 * Corrige el examen y muestra el resultado.
 * @param {string} modoExamen
 */
function corregirExamen(modoExamen) {
  const preguntasExamen = bancoPreguntasExamen[modoExamen];
  let puntajeTotal = 0;

  const resultadosPorPregunta = preguntasExamen.map(pregunta => {
    const textoRespuesta = normalizarTextoHaskell(
      document.getElementById('respuestaExamen-' + pregunta.numero)?.value || ''
    );
    const palabrasFaltantes = pregunta.palabrasClave.filter(
      palabra => !textoRespuesta.includes(palabra.toLowerCase())
    );
    const puntaje = Math.round((1 - palabrasFaltantes.length / pregunta.palabrasClave.length) * 2 * 10) / 10;
    puntajeTotal += puntaje;

    if (puntaje < 1.5) {
      registrarErrorExamen(modoExamen, pregunta, palabrasFaltantes);
    }

    return { pregunta, puntaje, palabrasFaltantes, esCorrecta: puntaje >= 1.5 };
  });

  const notaFinal = Math.min(10, Math.round(puntajeTotal / preguntasExamen.length * 10 * 10) / 10);
  renderizarResultadoExamen(notaFinal, resultadosPorPregunta);
}

/**
 * Registra un error de examen en el historial.
 * @param {string} modo
 * @param {Object} pregunta
 * @param {string[]} palabrasFaltantes
 */
function registrarErrorExamen(modo, pregunta, palabrasFaltantes) {
  const idError = `examen-${modo}-${pregunta.numero}`;
  const entradaError = {
    id: idError,
    titulo: `Examen · ${pregunta.tipo}`,
    tema: pregunta.tipo.toLowerCase().replace(' ', '-'),
    palabrasFaltantes,
    cantidad: 1,
    ultimaFecha: new Date().toLocaleDateString('es-AR')
  };

  const indiceExistente = historialErrores.findIndex(e => e.id === idError);
  if (indiceExistente >= 0) {
    historialErrores[indiceExistente].cantidad++;
    historialErrores[indiceExistente].palabrasFaltantes = palabrasFaltantes;
    historialErrores[indiceExistente].ultimaFecha = entradaError.ultimaFecha;
  } else {
    historialErrores.push(entradaError);
  }

  localStorage.setItem('hk-errores', JSON.stringify(historialErrores));
}

/**
 * Renderiza el resultado final del examen.
 * @param {number} notaFinal
 * @param {Array} resultados
 */
function renderizarResultadoExamen(notaFinal, resultados) {
  let claseEstado, textoEstado;
  if (notaFinal >= 7) {
    claseEstado = 'estadoAprobado';
    textoEstado = '✓ Aprobado';
  } else if (notaFinal >= 4) {
    claseEstado = 'estadoRevisar';
    textoEstado = '↻ A revisar';
  } else {
    claseEstado = 'estadoDesaprobado';
    textoEstado = '✗ Seguir practicando';
  }

  const contenedor = document.getElementById('contenedorResultadoExamen');
  contenedor.innerHTML = `
    <div class="tarjetaResultadoExamen">
      <div class="etiquetaResultadoExamen">Resultado</div>
      <div class="puntajeExamen">${notaFinal}<span class="subtituloPuntaje">/10</span></div>
      <div class="${claseEstado}">${textoEstado}</div>
      ${resultados.map(({ pregunta, puntaje, palabrasFaltantes, esCorrecta }) => `
        <div class="itemResultadoPregunta ${esCorrecta ? 'itemResultadoCorrecto' : 'itemResultadoIncorrecto'}">
          <strong>Ej ${pregunta.numero} — ${pregunta.tipo}: ${puntaje}/2</strong>
          ${esCorrecta
            ? ' ✓'
            : ' · Faltó: ' + palabrasFaltantes.slice(0, 2).map(p => `<code>${p}</code>`).join(', ')
          }
        </div>`).join('')}
      <div class="notaResultadoExamen">Los errores fueron guardados en "Mis errores".</div>
    </div>
  `;
  contenedor.scrollIntoView({ behavior: 'smooth' });
}

// ===== INICIALIZACIÓN =====
filtrarEjercicios('all', document.querySelector('.botonFiltroActivo'));
