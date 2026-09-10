import { TarjetaAlumnoExportada } from '../componentes/TarjetaAlumnoExportada'

// En este archivo importamos el componente del archivo vecino.
// Su definición comienza con: export function TarjetaAlumnoExportada()
// O podria estar exportado al final como objeto via export { TarjetaAlumnoExportada }

export function EjemploExportacionesNombradas() {
    return (
        <section className="lesson" id="exportaciones" aria-labelledby="exportaciones-title">
            <header className="lesson-heading">
                <span className="lesson-number">02</span>
                <h2 id="exportaciones-title">Compartir con exportaciones nombradas</h2>
            </header>
            <p>export permite importar la función desde otro archivo. Conservamos su nombre y usamos llaves al importar. El ejemplo anterior también exporta su sección para que el capítulo pueda montarla.</p>
            <pre><code>{"// TarjetaAlumnoExportada.tsx\nexport function TarjetaAlumnoExportada() {\n  return (\n    <article className=\"card\">\n      <h3>Ana</h3>\n      <p>Estudiante de React</p>\n    </article>\n  )\n}\n\n// 02-ExportacionesNombradas.tsx\nimport { TarjetaAlumnoExportada } from '../TarjetaAlumnoExportada'\n\n<TarjetaAlumnoExportada />"}</code></pre>
            <TarjetaAlumnoExportada />
            <p className="prompt">Abre TarjetaAlumnoExportada.tsx y este archivo. Sigue el mismo nombre desde export hasta su etiqueta.</p>
        </section>
    )
}
