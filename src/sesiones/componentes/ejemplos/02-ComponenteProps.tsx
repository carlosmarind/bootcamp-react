type TarjetaAlumnoProp = {
    nombre: string,
    curso: string
    letra: string
    ranking: number
    color?: string
}

function TarjetaAlumno(props: TarjetaAlumnoProp) {
    return (
        <article>
            <h3>{props.nombre}</h3>
            <p>Estudiante de {props.curso} y color {props.color}</p>
        </article>
    )
}

function ComponenteProps() {
    return (
        <>
            <section>
                <header>
                    <span>02</span>
                    <h2>Leer objeto de las props</h2>
                </header>
                <p>El elemento padre entrega datos mediante Props. el Hijo, recibe un objeto y lee sus propiedades</p>
                <div>
                    <TarjetaAlumno nombre="Ana" curso="React" letra="A" ranking={1} color="blue" />
                    <TarjetaAlumno nombre="Alicia" curso="Web" letra="B" ranking={2} />
                </div>
            </section>
        </>
    )
}

export { ComponenteProps }