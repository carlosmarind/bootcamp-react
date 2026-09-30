import { NavLink } from 'react-router'

export function EjemploNavegacion() {
  return (
    <section className="lesson" id="router-enlaces" aria-labelledby="router-enlaces-title">
      <header className="lesson-heading">
        <span className="lesson-number">04</span><h2 id="router-enlaces-title">Navegar y reconocer la página activa</h2>
      </header>
      <p>Link genera un enlace y permite cambiar de ruta sin recargar todo el documento. Usamos <code>to</code> para indicar el destino. NavLink añade la información de si ese enlace está activo.</p>
      <pre><code>{'<Link to="/cursos">Ver cursos</Link>\n\n<NavLink to="/cursos">Cursos</NavLink>\n\n// Con end, /cursos/react ya no mantiene activo este enlace:\n<NavLink to="/cursos" end>Cursos</NavLink>'}</code></pre>
      <nav aria-label="Demostración de NavLink">
        <NavLink className="chapter-link" to="/router" end>Router</NavLink>
        <NavLink className="chapter-link" to="/router/navlink-cursos" end>Cursos</NavLink>
      </nav>
      <p>Estas dos direcciones muestran la misma lección, así los enlaces permanecen visibles mientras cambia cuál está activo. En nuestro CSS usamos <code>aria-current="page"</code>, que NavLink agrega automáticamente, para destacarlo.</p>
      <p className="prompt">Alterna entre Router y Cursos. Observa la URL, el fondo destacado y prueba también Atrás y Adelante.</p>

      <h3>NavLink también puede recibir funciones</h3>
      <p>En children, className y style podemos entregar una función. NavLink la llama y le pasa un objeto con información del enlace. La propiedad <code>isActive</code> vale true si el enlace está activo y false si no lo está.</p>
      <pre><code>{'// Sin desestructurar, recibimos el objeto completo:\n(estado) => estado.isActive\n\n// Con desestructuración, sacamos la propiedad que necesitamos:\n({ isActive }) => isActive\n\n// Son dos formas de leer el mismo dato.'}</code></pre>
      <p>Estas funciones calculan cómo se ve el enlace. No son eventos onClick: NavLink las evalúa al renderizar, incluso antes de que hagamos clic.</p>
      <p>Los tres ejemplos siguientes usan las mismas dos direcciones. Al pulsar un enlace, podrás observar al mismo tiempo cómo reaccionan children, className y style.</p>

      <h3>1. children: cambiar el contenido del enlace</h3>
      <p>En lugar de escribir un texto fijo entre las etiquetas, colocamos una función que devuelve texto o JSX.</p>
      <pre><code>{'<NavLink to="/router" end>\n  {({ isActive }) => isActive ? "Estás en Router" : "Ir a Router"}\n</NavLink>'}</code></pre>
      <nav aria-label="Ejemplo de children en NavLink">
        <p>
          <NavLink to="/router" end>
            {/* isActive viene del objeto que entrega NavLink; no es una variable global. */}
            {({ isActive }) => isActive ? 'Estás en Router' : 'Ir a Router'}
          </NavLink>
        </p>
        <p>
          <NavLink to="/router/navlink-cursos" end>
            {({ isActive }) => isActive ? 'Estás en Cursos' : 'Ir a Cursos'}
          </NavLink>
        </p>
      </nav>
      <p className="prompt">Pulsa ambos enlaces: ¿qué texto devuelve la función cuando isActive cambia entre true y false?</p>

      <h3>2. className: elegir las clases CSS</h3>
      <p>Esta función devuelve un string con los nombres de las clases. Reutilizamos badge y badge-muted, que ya existen en nuestro CSS.</p>
      <pre><code>{'<NavLink\n  to="/router"\n  end\n  className={({ isActive }) => isActive ? "badge" : "badge badge-muted"}\n>\n  Router\n</NavLink>'}</code></pre>
      <nav aria-label="Ejemplo de className en NavLink">
        <p>
          <NavLink
            to="/router"
            end
            // Si está activo usamos badge; si no, agregamos badge-muted para atenuarlo.
            className={({ isActive }) => isActive ? 'badge' : 'badge badge-muted'}
          >
            Router
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/router/navlink-cursos"
            end
            className={({ isActive }) => isActive ? 'badge' : 'badge badge-muted'}
          >
            Cursos
          </NavLink>
        </p>
      </nav>
      <p className="prompt">El texto de estos enlaces es fijo. ¿Qué cambia ahora? Inspecciona su atributo class en el navegador.</p>

      <h3>3. style: devolver un objeto de estilos</h3>
      <p>La función de style devuelve un objeto. Usamos nombres de propiedades como fontWeight y color; los valores pueden depender de isActive.</p>
      <pre><code>{'<NavLink\n  to="/router"\n  end\n  style={({ isActive }) => ({\n    fontWeight: isActive ? 700 : 400,\n    color: isActive ? "var(--color-accent)" : "var(--color-muted)",\n  })}\n>\n  Router\n</NavLink>'}</code></pre>
      <nav aria-label="Ejemplo de style en NavLink">
        <p>
          <NavLink
            to="/router"
            end
            // Los paréntesis después de => permiten devolver el objeto directamente.
            style={({ isActive }) => ({
              fontWeight: isActive ? 700 : 400,
              color: isActive ? 'var(--color-accent)' : 'var(--color-muted)',
            })}
          >
            Router
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/router/navlink-cursos"
            end
            style={({ isActive }) => ({
              fontWeight: isActive ? 700 : 400,
              color: isActive ? 'var(--color-accent)' : 'var(--color-muted)',
            })}
          >
            Cursos
          </NavLink>
        </p>
      </nav>
      <p className="prompt">Compara Router y Cursos: uno tiene peso 700 y el otro 400. ¿Qué valor de isActive recibió cada función?</p>
      <p>En los tres casos recibimos el mismo tipo de objeto, pero devolvemos cosas distintas: contenido para children, un string para className y un objeto para style. También podemos combinar las tres funciones en un mismo NavLink.</p>
      <p>NavLink también ofrece isPending para una navegación pendiente en los modos Data y Framework. Esta clase usa BrowserRouter en modo declarativo, por eso aquí practicamos con isActive.</p>
    </section>
  )
}
