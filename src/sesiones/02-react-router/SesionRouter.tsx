import { EjemploURL } from "./ejemplos/01-URL";
import { EjemploBrowserRouter } from "./ejemplos/02-BrowserRouter";
import { EjemploRutas } from "./ejemplos/03-Rutas";
import { EjemploRutasNoEncontradas } from "./ejemplos/06-RutasNoEncontradas";
import { EjemploLayout } from "./ejemplos/07-Layout";
import { Ejercicio } from "./ejercicio/Ejercicio";

export function SesionRouter() {
    return (
        <>
            <header className="chapter-header" id="router-inicio">
                <p className="eyebrow">Session 2 - React Router</p>
                <h1>Una URL &gt;  Una pantalla</h1>
                <p className="lead">Vamos a transformar esta aplicacion utilizando react router</p>
                <div className="chapter-meta"><span>React Router 8</span><span>En modo declarativo</span></div>
            </header>

            <nav aria-label="Pasos de React Router">
                <ol className="lesson-nav">
                    <li><a href="#router-url">Leer una URL</a></li>
                    <li><a href="#router-browser">Activar BrowserRouter</a></li>
                    <li><a href="#router-rutas">Relacionar rutas y componentes</a></li>
                    <li><a href="#router-enlaces">Navegar con Link y NavLink</a></li>
                    <li><a href="#router-parametros">Leer un parámetro</a></li>
                    <li><a href="#router-errores">Resolver direcciones incorrectas</a></li>
                    <li><a href="#router-estructura">Compartir estructura con Outlet</a></li>
                </ol>
                <a className="exercise-link" href="#router-reto">Ir al ejercicio ↗</a>
            </nav>

            <EjemploURL />

            <EjemploBrowserRouter />

            <EjemploRutas />

            <EjemploRutasNoEncontradas />

            <EjemploLayout />

            <Ejercicio />

        </>
    )
}