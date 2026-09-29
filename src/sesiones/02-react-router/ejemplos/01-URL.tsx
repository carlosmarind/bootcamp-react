export function EjemploURL() {
  return (
    <section className="lesson" id="router-url" aria-labelledby="router-url-title">
      <header className="lesson-heading">
        <span className="lesson-number">01</span><h2 id="router-url-title">Una dirección nos dice dónde estamos</h2>
      </header>
      <p>Hasta ahora usamos anclas como <code>#props</code> para movernos dentro de una página. Ahora usaremos rutas como <code>/cursos</code> para elegir una página de la aplicación.</p>
      <pre><code>{'http://localhost:5173/cursos/react\n                     └──────────┘\n                     ruta de la página\n\n/componentes#props\n            └────┘\n            sección dentro de esa página'}</code></pre>
      <p><a href="#router-browser">Este enlace baja al siguiente paso de la misma página</a>.</p>
      <p className="prompt">Predice qué cambiará: al visitar /cursos, ¿bajaremos dentro de esta página o veremos otro contenido?</p>
    </section>
  )
}
