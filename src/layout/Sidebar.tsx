export function Sidebar() {
    return (
        <aside className="sidebar">
            <nav aria-label="Capítulos">
                <p className="eyebrow">El recorrido</p>
                <a className="chapter-link" href="#capitulo-01" aria-current="page">01 · Componentes y props</a>
            </nav>
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
            <p className="sidebar-note">Lee el ejemplo.<br />Predice el resultado.<br />Cambia una cosa y observa.</p>
        </aside>
    )
}