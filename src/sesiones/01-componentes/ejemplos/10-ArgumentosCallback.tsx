
type TarjetaAlumnoConActionProps = {
    nombre: string
    onSaludar: (nombre: string) => void
}

function TarjetaAlumnoConAction({ nombre, onSaludar }: TarjetaAlumnoConActionProps) {
    return (
        <article className="card">
            <h3>{nombre}</h3>
            <button className="button" type="button" onClick={() => onSaludar(nombre)}>
                saludar a {nombre}
            </button>
        </article>
    )
}

function saludarAlumno(nombre: string) {
    alert(`Hola!, ${nombre} bienvenido a la clase del bootcamp`)
}

export function EjemploCallbackConArgumentos() {
    return (
        <section className="lesson" id="argumentos" aria-labelledby="argumentos-title">
            <header className="lesson-heading">
                <span className="lesson-number">10</span>
                <h2 id="argumentos-title">Pasar un argumento al callback</h2>
            </header>
            <p>La función flecha crea un manejador que espera al clic. Cuando ocurre, llama a onSaludar con nombre. El callback recibe un string; no recibe el evento del botón.</p>
            <pre><code>{"type TarjetaAlumnoAccionProps = {\n  nombre: string\n  onSaludar: (nombre: string) => void\n}\n\nfunction TarjetaAlumnoConAccion({ nombre, onSaludar }: TarjetaAlumnoAccionProps) {\n  return (\n    <article className=\"card\">\n      <h3>{nombre}</h3>\n      <button className=\"button\" type=\"button\" onClick={() => onSaludar(nombre)}>\n        Saludar a {nombre}\n      </button>\n    </article>\n  )\n}\n\nfunction saludarAlumno(nombre: string) {\n  alert(`¡Hola, ${nombre}! Bienvenido a la clase.`)\n}\n\n<div className=\"example-grid\">\n        <TarjetaAlumnoConAccion nombre=\"Ana\" onSaludar={saludarAlumno} />\n        <TarjetaAlumnoConAccion nombre=\"Diego\" onSaludar={saludarAlumno} />\n      </div>"}</code></pre>
            <div className="example-grid">

                <TarjetaAlumnoConAction nombre="Ana" onSaludar={saludarAlumno} />
                <TarjetaAlumnoConAction nombre="Diego" onSaludar={saludarAlumno} />

            </div>
            <p className="prompt">Predice el argumento que recibirá saludarAlumno con cada botón. Luego compruébalo.</p>
        </section>
    )
}