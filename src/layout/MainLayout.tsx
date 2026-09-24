import { Footer } from "./Footer";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Body } from "./Body";

export function MainLayout() {
    return (
        <>
            <a className="skip-link" href="#contenido">Saltar al contenido</a>
            <Header />
            <div className="app-layout">
                <Sidebar />
                <Body />
            </div>
            <Footer />
        </>
    )
}