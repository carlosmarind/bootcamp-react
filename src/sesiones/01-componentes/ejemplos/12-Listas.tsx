const alumnos = [
  { id: 'a1', nombre: 'Ana' },
  { id: 'a2', nombre: 'Diego' },
  { id: 'a3', nombre: 'Sofía' },
]

type TarjetaAlumnoListaProps = {
  nombre: string
}

function TarjetaAlumnoLista({ nombre }: TarjetaAlumnoListaProps) {
  return <article className="card"><h3>{nombre}</h3></article>
}

export function EjemploListaAlumnos() {
  return (
    <section className="lesson" id="listas" aria-labelledby="listas-title">
      <header className="lesson-heading">
        <span className="lesson-number">12</span>
        <h2 id="listas-title">Opcional: listas y key</h2>
      </header>
      <p>map transforma cada objeto del arreglo en un elemento. key permite a React identificarlo entre sus hermanos: usa un id estable y único. key no llega al componente como una prop normal.</p>
      <pre><code>{"const alumnos = [\n  { id: 'a1', nombre: 'Ana' },\n  { id: 'a2', nombre: 'Diego' },\n  { id: 'a3', nombre: 'Sofía' },\n]\n\ntype TarjetaAlumnoListaProps = {\n  nombre: string\n}\n\nfunction TarjetaAlumnoLista({ nombre }: TarjetaAlumnoListaProps) {\n  return <article className=\"card\"><h3>{nombre}</h3></article>\n}\n\n<div className=\"example-grid\">\n        {alumnos.map((alumno) => (\n          <TarjetaAlumnoLista key={alumno.id} nombre={alumno.nombre} />\n        ))}\n      </div>"}</code></pre>
      <div className="example-grid">
        {alumnos.map((alumno) => (
          <TarjetaAlumnoLista key={alumno.id} nombre={alumno.nombre} />
        ))}
      </div>
      <p className="prompt">Añade un alumno con id único. No necesitas copiar una nueva etiqueta de tarjeta.</p>
    </section>
  )
}
