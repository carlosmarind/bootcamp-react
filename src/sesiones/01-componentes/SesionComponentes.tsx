import { EjemploPrimerComponente } from "./ejemplos/01-Componente";
import { EjemploExportacionesNombradas } from "./ejemplos/02-Exportaciones";
import { EjemploReutilizacion } from "./ejemplos/03-Reutilizacion";
import { EjemploProps } from "./ejemplos/04-ComponenteProps";
import { EjemploDesestructuracion } from "./ejemplos/05-Desestructuracion";
import { EjemploPropsOpcionales } from "./ejemplos/06-ValoresPredeterminados";
import { EjemploCondicionales } from "./ejemplos/07-Condicionales";
import { EjemploEventos } from "./ejemplos/08-Eventos";
import { EjemploPropFuncion } from "./ejemplos/09-PropsComoFunciones";
import { EjemploCallbackConArgumentos } from "./ejemplos/10-ArgumentosCallback";
import { EjemploComponentesChildren } from "./ejemplos/11-Children";
import { EjemploListaAlumnos } from "./ejemplos/12-Listas";
import { Ejercicio } from "./ejercicio/Ejercicio";

function SesionComponentes() {
    return (
        <>
            <header className="chapter-header" id="capitulo-01">
                <p className="eyebrow">Capítulo 01 · Fundamentos de React</p>
                <h1>Una pieza.<br />Muchas posibilidades.</h1>
                <p className="lead">Aprende cada concepto antes de usarlo en el siguiente paso. Lee la definición, predice el resultado y modifica el ejemplo.</p>
                <div className="chapter-meta"><span>12 pasos</span><span>React + TypeScript</span></div>
            </header>
            <nav aria-label="Secciones del capítulo 01">
                <ol className="lesson-nav">
                    <li><a href="#componente">Tu primer componente</a></li>
                    <li><a href="#exportaciones">Compartir con exportaciones nombradas</a></li>
                    <li><a href="#reutilizacion">Una definición, varias apariciones</a></li>
                    <li><a href="#props">Leer el objeto props</a></li>
                    <li><a href="#desestructuracion">Desestructurar las mismas props</a></li>
                    <li><a href="#valores">Props opcionales y valores predeterminados</a></li>
                    <li><a href="#condiciones">Elegir contenido según una prop</a></li>
                    <li><a href="#eventos">Esperar un clic antes de ejecutar</a></li>
                    <li><a href="#funciones">El padre entrega una función</a></li>
                    <li><a href="#argumentos">Pasar un argumento al callback</a></li>
                    <li><a href="#children">Elegir el contenido con children</a></li>
                    <li><a href="#listas">Opcional: listas y key</a></li>
                </ol>
                <a className="exercise-link" href="#reto">Ejercicio de cierre ↗</a>
            </nav>
            <EjemploPrimerComponente />
            <EjemploExportacionesNombradas />
            <EjemploReutilizacion />
            <EjemploProps />
            <EjemploDesestructuracion />
            <EjemploPropsOpcionales />
            <EjemploCondicionales />
            <EjemploEventos />
            <EjemploPropFuncion />
            <EjemploCallbackConArgumentos />
            <EjemploComponentesChildren />
            <EjemploListaAlumnos />
            <Ejercicio />
        </>
    );
}
export { SesionComponentes }