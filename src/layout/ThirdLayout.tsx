import { Cursos } from "../sesiones/01-componentes/ejercicio/Cursos";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function ThirdLayout() {
    return (
        <>
            <a className="skip-link" href="#contenido">Saltar al contenido</a>
            <Header />
            <div className="app-layout">
                <Sidebar />
                <main id="contenido" tabIndex={-1}>
                    <Cursos />
                </main>
            </div>
            <Footer />
        </>
    )
}