import { Link } from 'react-router'

export function EjemploRutas() {
  return (
    <section className="lesson" id="router-rutas" aria-labelledby="router-rutas-title">
      <header className="lesson-heading">
        <span className="lesson-number">03</span><h2 id="router-rutas-title">Elegir qué componente muestra cada ruta</h2>
      </header>
      <p>Empezamos con rutas simples. <code>path</code> indica la dirección y <code>element</code> recibe el elemento JSX que queremos mostrar. Routes busca la coincidencia.</p>
      <pre><code>{'// Primera versión de App: todavía no usamos rutas anidadas.\n<Routes>\n  <Route path="/" element={<Inicio />} />\n  <Route path="/componentes" element={<SesionComponentes />} />\n  <Route path="/cursos" element={<Cursos />} />\n</Routes>'}</code></pre>
      <p>Una página también es un componente. El capítulo anterior ahora se puede visitar en <code>/componentes</code>; su contenido sigue funcionando.</p>
      <p><Link to="/componentes">Abrir la sesión de componentes</Link></p>
      <p className="prompt">Escribe /cursos en la barra del navegador. Después vuelve con Atrás. ¿Qué componente corresponde a cada dirección?</p>
    </section>
  )
}
