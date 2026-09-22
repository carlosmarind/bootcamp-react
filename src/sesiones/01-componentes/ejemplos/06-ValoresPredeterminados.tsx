type TarjetaAlumnoConCursoProps = {
    nombre: string,
    curso?: string

}
function TarjetaAlumnoConCurso({ nombre, curso = "React" }: TarjetaAlumnoConCursoProps) {
    return (
        <article className="card">
            <h3>{nombre}</h3>
            <p>Estudiante del {curso}</p>
        </article>
    )
}

export function EjemploPropsOpcionales() {
    return (
        <section className="lesson" id="valores" aria-labelledby="valores-title">
            <header className="lesson-heading">
                <span className="lesson-number">06</span>
                <h2 id="valores-title">Props opcionales y valores predeterminados</h2>
            </header>
            <p>El signo ? declara curso como opcional en TypeScript. El valor React se utiliza si curso se omite o es undefined. No reemplaza un texto vacío ni null.</p>
            <pre><code>{"type TarjetaAlumnoOpcionalProps = {\n  nombre: string\n  curso?: string\n}\n\nfunction TarjetaAlumnoConCurso({ nombre, curso = 'React' }: TarjetaAlumnoOpcionalProps) {\n  return (\n    <article className=\"card\">\n      <h3>{nombre}</h3>\n      <p>Estudiante de {curso}</p>\n    </article>\n  )\n}\n\n<div className=\"example-grid\">\n        <TarjetaAlumnoConCurso nombre=\"Sofía\" />\n        <TarjetaAlumnoConCurso nombre=\"Diego\" curso=\"TypeScript\" />\n      </div>"}</code></pre>
            <div className="example-grid">

                <TarjetaAlumnoConCurso nombre="Sofia" />
                <TarjetaAlumnoConCurso nombre="Diego" curso="Typescript" />

            </div>
            <p className="prompt">Predice qué curso mostrará Sofía. Después añade una prop curso y observa el cambio.</p>
        </section >
    )
}

