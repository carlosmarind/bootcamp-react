import { EjemploContador } from "./ejemplos/01-Contador";

export function SesionEstadosForms() {
    return (
        <>
            <header className="chapter-header" id="estados-inicio">
                <p className="eyebrow">Sesión 3 · Estados y formularios</p>
                <h1>La interfaz puede cambiar.</h1>
                <p className="lead">Usaremos useState para recordar valores entre renderizados y responder a las acciones de la persona usuaria.</p>
                <div className="chapter-meta"><span>3 pasos</span><span>React + TypeScript</span></div>
            </header>

            <nav aria-label="Pasos de estados y formularios">
                <ol className="lesson-nav">
                    <li><a href="#contador">Guardar un número</a></li>
                    <li><a href="#disponibilidad">Cambiar un valor booleano</a></li>
                    <li><a href="#formulario">Controlar un formulario pequeño</a></li>
                </ol>
            </nav>

            <EjemploContador />
        </>
    )

}