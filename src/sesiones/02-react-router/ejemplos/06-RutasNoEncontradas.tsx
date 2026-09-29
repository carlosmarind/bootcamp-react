import { Link } from 'react-router'

export function EjemploRutasNoEncontradas() {
  return (
    <section className="lesson" id="router-errores" aria-labelledby="router-errores-title">
      <header className="lesson-heading">
        <span className="lesson-number">06</span><h2 id="router-errores-title">Una ruta desconocida y un curso que no existe</h2>
      </header>
      <p><code>/no-existe</code> no coincide con una página. En cambio, <code>/cursos/no-existe</code> sí coincide con la ruta del detalle, pero no encontramos ese curso en el arreglo.</p>
      <pre><code>{'// En App, para una ruta desconocida:\n<Route path="*" element={<PaginaNoEncontrada />} />\n\n// En DetalleCurso, antes de leer titulo, horario o sala:\nif (!curso) {\n  return (\n    <section>\n      <h1>Curso no encontrado</h1>\n      <Link to="/cursos">Volver a los cursos</Link>\n    </section>\n  )\n}'}</code></pre>
      <p><Link to="/no-existe">Probar una página desconocida</Link> · <Link to="/cursos/no-existe">Probar un curso inexistente</Link></p>
      <p className="prompt">Predice qué mensaje corresponde a cada enlace. Luego abre los dos. ¿Por qué la ruta * no resuelve el curso inexistente?</p>
    </section>
  )
}
