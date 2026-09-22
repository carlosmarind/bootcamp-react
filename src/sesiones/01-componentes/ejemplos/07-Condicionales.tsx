type TarjetaAlumnoConEstadoProps = {
    nombre: string
    activo: boolean
}

function TarjetaAlumnoConEstado({ nombre, activo }: TarjetaAlumnoConEstadoProps) {
    return (
        <article>
            <h3>{nombre}</h3>
            {/*  "En curso" activo = true o "Pendiente" activo = false */}
            <span className="badge">{
                activo ?
                    <strong>"En curso"</strong>
                    :
                    nombre === "Ruth" ? "Pendiente" : "No hay cursos"
            }</span>
        </article>
    )
}

export function EjemploCondicionales() {
    return (
        <section className="lesson" id="condiciones" aria-labelledby="condiciones-title">
            <header className="lesson-heading">
                <span className="lesson-number">07</span>
                <h2 id="condiciones-title">Elegir contenido según una prop</h2>
            </header>
            <p>Una prop también puede ser un booleano. Las llaves permiten escribir false como valor de JavaScript. El operador ternario elige un texto según activo.</p>
            <pre><code>{"type TarjetaAlumnoEstadoProps = {\n  nombre: string\n  activo: boolean\n}\n\nfunction TarjetaAlumnoConEstado({ nombre, activo }: TarjetaAlumnoEstadoProps) {\n  return (\n    <article className=\"card\">\n      <h3>{nombre}</h3>\n      <span className=\"badge\">{activo ? 'En curso' : 'Pendiente'}</span>\n    </article>\n  )\n}\n\n<div className=\"example-grid\">\n        <TarjetaAlumnoConEstado nombre=\"Ana\" activo={true} />\n        <TarjetaAlumnoConEstado nombre=\"Diego\" activo={false} />\n      </div>"}</code></pre>
            <div className="example-grid">

                <TarjetaAlumnoConEstado nombre="Ana" activo={true} />
                <TarjetaAlumnoConEstado nombre="Diego" activo={false} />
            </div>
            <p className="prompt">Cambia false por true. ¿Qué texto cambia? No uses el texto "false": no es un booleano.</p>
        </section>
    )
}