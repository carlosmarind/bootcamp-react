import { SesionRouter } from "../sesiones/02-react-router/SesionRouter";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function SecondLayout() {
    return (
        <>
            <a className="skip-link" href="#contenido">Saltar al contenido</a>
            <Header />
            <div className="app-layout">
                <Sidebar />
                <main id="contenido" tabIndex={-1}>
                    <SesionRouter />
                </main>
            </div>
            <Footer />
        </>
    )
}