import { useState } from 'react'

type Tarea = {
  mensaje: string
  demora: number
}

const TAREAS: Tarea[] = [
  { mensaje: '1. Cargar perfil', demora: 1200 },
  { mensaje: '2. Cargar cursos', demora: 300 },
  { mensaje: '3. Cargar asistencia', demora: 900 },
  { mensaje: '4. Cargar evaluaciones', demora: 600 },
]

const DEMORA_MAS_LARGA = Math.max(0, ...TAREAS.map((tarea) => tarea.demora))

function iniciarTareaConPromise(tarea: Tarea) {
  return new Promise<string>((resolver) => {
    setTimeout(() => resolver(tarea.mensaje), tarea.demora)
  })
}

export function EjemploAsincronia() {
  const [mensajes, setMensajes] = useState<string[]>([])
  const [esperando, setEsperando] = useState(false)

  function agregarMensaje(mensaje: string) {
    setMensajes((mensajesActuales) => [...mensajesActuales, mensaje])
  }

  function ejecutarSinPromise() {
    setMensajes([])
    setEsperando(true)

    for (const tarea of TAREAS) {
      setTimeout(() => agregarMensaje(tarea.mensaje), tarea.demora)
    }

    setTimeout(() => setEsperando(false), DEMORA_MAS_LARGA)
  }

  function ejecutarConThen() {
    setMensajes([])
    setEsperando(true)
    let promesaActual = Promise.resolve()

    for (const tarea of TAREAS) {
      promesaActual = promesaActual
        .then(() => iniciarTareaConPromise(tarea))
        .then((mensaje) => agregarMensaje(mensaje))
    }

    promesaActual.then(() => setEsperando(false))
  }

  async function ejecutarConAsyncAwait() {
    setMensajes([])
    setEsperando(true)

    for (const tarea of TAREAS) {
      const mensaje = await iniciarTareaConPromise(tarea)
      agregarMensaje(mensaje)
    }

    setEsperando(false)
  }

  return (
    <section className="lesson" id="asincronia" aria-labelledby="asincronia-title">
      <header className="lesson-heading">
        <span className="lesson-number">06</span>
        <h2 id="asincronia-title">Esperar tareas que terminan en distinto orden</h2>
      </header>
      <p>Las cuatro tareas usan los mismos mensajes y distintas demoras. Sin una secuencia, cada mensaje aparece apenas termina su tarea.</p>

      <h3>Sin Promise ni async/await</h3>
      <p>Las cuatro tareas comienzan juntas. Por eso los mensajes aparecen según su demora: <code>2 → 4 → 3 → 1</code>.</p>
      <pre><code>{"for (const tarea of tareas) {\n  setTimeout(() => {\n    console.log(tarea.mensaje)\n  }, tarea.demora)\n}"}</code></pre>

      <h3>Con Promise y then()</h3>
      <p>Cada <code>then()</code> inicia la siguiente tarea cuando termina la anterior. Los mensajes aparecen en la secuencia <code>1 → 2 → 3 → 4</code>.</p>
      <pre><code>{"let promesaActual = Promise.resolve()\n\nfor (const tarea of tareas) {\n  promesaActual = promesaActual\n    .then(() => iniciarTareaConPromise(tarea))\n    .then((mensaje) => console.log(mensaje))\n}"}</code></pre>

      <h3>Con async/await</h3>
      <p><code>await</code> pausa esta función hasta que termina cada tarea. El resultado también aparece como <code>1 → 2 → 3 → 4</code>.</p>
      <pre><code>{"for (const tarea of tareas) {\n  const mensaje = await iniciarTareaConPromise(tarea)\n  console.log(mensaje)\n}"}</code></pre>

      <article className="card">
        <button className="button" type="button" disabled={esperando} onClick={ejecutarSinPromise}>Probar sin Promise</button>{' '}
        <button className="button" type="button" disabled={esperando} onClick={ejecutarConThen}>Probar then()</button>{' '}
        <button className="button" type="button" disabled={esperando} onClick={ejecutarConAsyncAwait}>Probar async/await</button>
        <ul>
          {mensajes.map((mensaje) => <li key={mensaje}>{mensaje}</li>)}
        </ul>
      </article>

      <p className="prompt">Los botones se deshabilitan mientras las tareas están en ejecución. Compara el primer resultado con los otros dos: ¿qué cambia cuando esperamos antes de iniciar la siguiente tarea?</p>
    </section>
  )
}
