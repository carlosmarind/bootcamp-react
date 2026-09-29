export function Sidebar() {
    return (
        <aside className="sidebar">
            <nav aria-label="Navegación principal">
                <p className="eyebrow">El recorrido</p>
                {/* NavLink agrega aria-current="page" al enlace que está activo. */}
                <a className="chapter-link" href="/" >Inicio</a>
                <a className="chapter-link" href="/componentes">01 · Componentes y props</a>
                <a className="chapter-link" href="/router">02 · React Router</a>
                {/* Sin end, Cursos también queda activo al visitar /cursos/react. */}
                <a className="chapter-link" href="/cursos">Cursos</a>
            </nav>
            <p className="sidebar-note">Lee el ejemplo.<br />Predice el resultado.<br />Cambia una cosa y observa.</p>
        </aside>
    )
}