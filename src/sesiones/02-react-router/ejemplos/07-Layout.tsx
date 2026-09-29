export function EjemploLayout() {
  return (
    <section className="lesson" id="router-estructura" aria-labelledby="router-estructura-title">
      <header className="lesson-heading">
        <span className="lesson-number">07</span><h2 id="router-estructura-title">Compartir el menú y cambiar el contenido</h2>
      </header>
      <p>Al final agrupamos las páginas bajo una ruta padre. MainLayout reúne Header, Footer, Sidebar y Body en la carpeta Layout. Body contiene <code>Outlet</code>, el lugar donde React Router muestra la ruta hija.</p>
      <pre><code>{'// Fragmento de la estructura final de App:\n<Routes>\n  <Route path="/" element={<MainLayout />}>\n    <Route index element={<Inicio />} />\n    <Route path="cursos" element={<Cursos />} />\n    <Route path="cursos/:cursoId" element={<DetalleCurso />} />\n  </Route>\n</Routes>\n\n// Dentro de Body, que MainLayout coloca junto a Sidebar:\n<main id="contenido" tabIndex={-1}>\n  <Outlet />\n</main>'}</code></pre>
      <p><code>index</code> elige la página inicial del padre. Las rutas hijas completan su dirección: <code>/</code> + <code>cursos</code> produce <code>/cursos</code>.</p>
      <p>Con children el contenido lo entregábamos entre las etiquetas del componente. Con Outlet, el router elige el contenido según las rutas hijas que declaramos. Si falta Outlet, veremos el menú pero no la página hija.</p>
      <p className="prompt">Revisa App.tsx, Layout/MainLayout.tsx y Layout/Body.tsx. Identifica qué parte permanece al cambiar de Inicio a Cursos y qué parte se reemplaza.</p>
    </section>
  )
}
