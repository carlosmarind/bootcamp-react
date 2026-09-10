type TarjetaAlumnoProp = {
    nombre: string,
    curso: string
    letra: string
    ranking: number
    color?: string
}

function TarjetaAlumno(props: TarjetaAlumnoProp) {
    return (
        <article className="card">
            <h3>{props.nombre}</h3>
            <p>Estudiante de {props.curso} y color {props.color}</p>
        </article>
    )
}

export function EjemploProps() {
    return (
        <section className="lesson" id="props" aria-labelledby="props-title">
            <header className="lesson-heading">
                <span className="lesson-number">04</span>
                <h2 id="props-title">Leer el objeto props</h2>
            </header>
            <p>El padre entrega datos mediante props. El hijo recibe un objeto y lee sus propiedades. El tipo de TypeScript describe los textos esperados; no valida datos en ejecución. Las props son de solo lectura.</p>
            <pre><code>{"type TarjetaAlumnoProps = {\n  nombre: string\n  curso: string\n}\n\nfunction TarjetaAlumnoConProps(props: TarjetaAlumnoProps) {\n  return (\n    <article className=\"card\">\n      <h3>{props.nombre}</h3>\n      <p>Estudiante de {props.curso}</p>\n    </article>\n  )\n}\n\n<div className=\"example-grid\">\n        <TarjetaAlumnoConProps nombre=\"Ana\" curso=\"React\" />\n        <TarjetaAlumnoConProps nombre=\"Diego\" curso=\"TypeScript\" />\n      </div>"}</code></pre>
            <div className="example-grid">
                <TarjetaAlumno nombre="Ana" curso="React" letra="A" ranking={1} color="blue" />
                <TarjetaAlumno nombre="Alicia" curso="Web" letra="B" ranking={2} />
            </div>
            <p className="prompt">Cambia solo el curso de Diego. ¿Qué tarjeta cambia? El parámetro props es un objeto, no el nombre directamente.</p>
        </section>
    )
}

