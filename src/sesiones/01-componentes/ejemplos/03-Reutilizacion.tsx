import { TarjetaAlumnoExportada } from '../componentes/TarjetaAlumnoExportada'

// La definición está en TarjetaAlumnoExportada.tsx, presentada en el paso 02.

export function EjemploReutilizacion() {
    return (
        <section className="lesson" id="reutilizacion" aria-labelledby="reutilizacion-title">
            <header className="lesson-heading">
                <span className="lesson-number">03</span>
                <h2 id="reutilizacion-title">Una definición, varias apariciones</h2>
            </header>
            <p>Importamos el componente del paso anterior y lo usamos tres veces. Todavía no recibe datos: todas las tarjetas muestran lo mismo.</p>
            <pre><code>{"// La definición está en TarjetaAlumnoExportada.tsx, presentada en el paso 02.\n\n<div className=\"example-grid\">\n        <TarjetaAlumnoExportada />\n        <TarjetaAlumnoExportada />\n        <TarjetaAlumnoExportada />\n      </div>"}</code></pre>
            <div className="example-grid">
                <TarjetaAlumnoExportada />
                <TarjetaAlumnoExportada />
                <TarjetaAlumnoExportada />
            </div>
            <p className="prompt">Cambia el texto en TarjetaAlumnoExportada.tsx. ¿Cuántas tarjetas cambian?</p>
        </section>
    )
}
