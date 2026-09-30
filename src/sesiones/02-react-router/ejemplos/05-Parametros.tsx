import { Link } from 'react-router'

export function EjemploParametros() {
  return (
    <section className="lesson" id="router-parametros" aria-labelledby="router-parametros-title">
      <header className="lesson-heading">
        <span className="lesson-number">05</span><h2 id="router-parametros-title">Una misma página, distintos cursos</h2>
      </header>
      <p>En <code>/cursos/:cursoId</code>, la parte que empieza con dos puntos es variable. La dirección <code>/cursos/react</code> entrega el texto <code>react</code> como cursoId.</p>
      <pre><code>{'<Route path="/cursos/:cursoId" element={<DetalleCurso />} />\n\n// Dentro de DetalleCurso:\nconst { cursoId } = useParams()\n// /cursos/react → cursoId vale "react"\n// /cursos/javascript → cursoId vale "javascript"'}</code></pre>
      <p>useParams es nuestro primer hook: una función de React Router que nos da información de la ruta. Lo llamamos al comienzo del componente, fuera de condiciones y ciclos. El nombre cursoId debe coincidir con el que escribimos en Route.</p>
      <p>Primero practicamos la búsqueda con un texto fijo. <code>find</code> es JavaScript: devuelve el primer objeto que cumple la condición, o undefined si ninguno coincide.</p>
      <pre><code>{'// Primero, sin usar el router:\nconst curso = cursos.find((curso) => curso.id === "react")\n\n// Después reemplazamos el texto fijo por el dato de la URL:\nconst curso = cursos.find((curso) => curso.id === cursoId)\n\n// Son dos versiones del mismo paso: no declares const curso dos veces.'}</code></pre>
      <p><Link to="/cursos/react">Abrir Introducción a React</Link> · <Link to="/cursos/javascript">Abrir JavaScript básico</Link></p>
      <p className="prompt">Abre un detalle y cambia el último segmento de la URL por html-css. ¿Por qué cambia la información si seguimos usando DetalleCurso?</p>
    </section>
  )
}
