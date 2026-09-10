
type TarjetaAlumnoDesestructuradaType = {
    nombre: string
    curso: string
}
// paso 3 seria este
//function TarjetaAlumnoDesestructurada(props: TarjetaAlumnoDesestructuradaType) {
function TarjetaAlumnoDesestructurada({ nombre, curso }: TarjetaAlumnoDesestructuradaType) {
    //paso 1, seria algo asi
    //const nombreAlumno = props.nombre;
    //const cursoAlumno = props.curso;

    // paso 2, seria algo asi:
    //let { nombre, curso } = props;

    // desestructuracion con arreglos
    let misNotas = [1.0, 7.0, 7.0, 1.0, 5.0, 7.0];

    // podria asignar valores a variables asi:
    //let primeraNota = misNotas[0];
    //let segundaNota = misNotas[1];
    //let terceraNota = misNotas[2];

    // o de forma desestructurada con la siguiente notacion:
    let [notaExamen, notaParcial, terceraNota, ...resto] = misNotas

    //en ambos casos anteriores hicimos lo mismo.
    console.log(notaExamen, notaParcial, terceraNota, resto)

    // de aca

    let alumno = {
        nombre: "juan",
        curso: 5,
        presente: true,
        notas: [1.0, 7.0, 7.0],
        direccion: {
            calle: "Los trapenses",
            numero: 55
        }
    }

    // copia profunda de un objeto a otro ( valores y no referencia)
    let alumnoTres = structuredClone(alumno);
    // validamos que el objeto direccion se reasigna en su valor y no en su referencia.
    alumnoTres.direccion.calle = "El olivo"

    // operador spread para copiar objetos 
    let nuevoAlumno = { ...alumno, curso }

    // validacion de copia por referencia de alumno a nuevo Alumno
    // como la copia es en el primer nivel del objeto, los objetos internos solo se referencian.
    // por eso direccion en alumno y nuevoAlumno es la misma referencia o lugar en la memoria ( la misma cosa)
    alumno.direccion.calle = "Rancagua"

    console.log("alumno original", alumno)
    console.log("nuevo alumno", nuevoAlumno)
    console.log("alumno tres", alumnoTres)


    // estoy creando una variable, que se llama igual que el atributo
    // del objeto nombre, asi lo entiendo javascript, por eso 
    // no escribo el nombre del atributo en el objeto (alumno.nombre)
    //let { nombre } = alumno;    // = let nombre = alumno.nombre
    //let { notas } = alumno;     // = let notas = alumno.notas
    //let { direccion } = alumno; // = let direccion = alumno.direccion

    let { direccion: miNuevaDireccion, notas } = alumno; // aca lo en un solo paso

    console.log(nombre, notas, miNuevaDireccion)

    //let { nombre, presente, notas, curso, direccion } = alumno;
    //let [nota1, nota2, nota3] = notas;




    return (
        <article className="card">
            <h3>{nombre}</h3>
            <p>Estudiante de {curso}</p>
        </article>
    )

}
function EjemploDesestructuracion() {
    return (
        <section className="lesson" id="desestructuracion" aria-labelledby="desestructuracion-title">
            <header className="lesson-heading">
                <span className="lesson-number">05</span>
                <h2 id="desestructuracion-title">Desestructurar las mismas props</h2>
            </header>
            <p>La desestructuración extrae propiedades del objeto. Es sintaxis de JavaScript: seguimos recibiendo un objeto, pero ahora usamos nombre y curso directamente.</p>
            <pre><code>{"type TarjetaAlumnoProps = {\n  nombre: string\n  curso: string\n}\n\nfunction TarjetaAlumnoDesestructurada({ nombre, curso }: TarjetaAlumnoProps) {\n  return (\n    <article className=\"card\">\n      <h3>{nombre}</h3>\n      <p>Estudiante de {curso}</p>\n    </article>\n  )\n}\n\n<TarjetaAlumnoDesestructurada nombre=\"Ana\" curso=\"React\" />"}</code></pre>
            <TarjetaAlumnoDesestructurada nombre="Ana" curso="React" />
            <p className="prompt">Compara con el paso 04. La forma de leer los datos cambia; el resultado de Ana es el mismo.</p>
        </section>
    );
}
export { EjemploDesestructuracion }