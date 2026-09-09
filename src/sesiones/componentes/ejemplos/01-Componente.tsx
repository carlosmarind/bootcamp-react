function TarjetaAlumnoEstatica() {
    let nombre = 'Ana'
    return (
        <article>
            {/* aca un comenario*/}
            <h3>{nombre}</h3>
            <p>Estudiante de React</p>
        </article>
    )
}

export function Componente() {
    return (
        <section>
            <header>
                <span>01</span>
                <h2>Mi primer componente</h2>
            </header>
            <p>Un componente es una funcion que devuelve un elemento JSX. Su nombre comienza en Mayuscula.</p>
            <TarjetaAlumnoEstatica />
        </section>
    )

}

