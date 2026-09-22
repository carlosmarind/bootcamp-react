import { EjemploPrimerComponente } from "./ejemplos/01-Componente";
import { EjemploExportacionesNombradas } from "./ejemplos/02-Exportaciones";
import { EjemploReutilizacion } from "./ejemplos/03-Reutilizacion";
import { EjemploProps } from "./ejemplos/04-ComponenteProps";
import { EjemploDesestructuracion } from "./ejemplos/05-Desestructuracion";
import { EjemploPropsOpcionales } from "./ejemplos/06-ValoresPredeterminados";

function SesionComponentes() {
    return (
        <>
            <header className="chapter-header" id="capitulo-01">
                <p className="eyebrow">Capítulo 01 · Fundamentos de React</p>
                <h1>Una pieza.<br />Muchas posibilidades.</h1>
                <p className="lead">Aprende cada concepto antes de usarlo en el siguiente paso. Lee la definición, predice el resultado y modifica el ejemplo.</p>
                <div className="chapter-meta"><span>12 pasos</span><span>React + TypeScript</span></div>
            </header>
            <EjemploPrimerComponente />
            <EjemploExportacionesNombradas />
            <EjemploReutilizacion />
            <EjemploProps />
            <EjemploDesestructuracion />
            <EjemploPropsOpcionales />
        </>
    );
}
export { SesionComponentes }