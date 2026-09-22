
type TarjetaAlumnoProps = {
    nombre: string
    curso: string
}
// asi se llamaria normalmente:
// function TarjetaAlumnoDesestructurada(props: TarjetaAlumnoProps) {
// y asi podemos desestructurar inmediatamente los datos del objeto en variables separadas
// seria equivalente a let { nombre, curso } = props;
function TarjetaAlumnoDesestructurada({ nombre, curso }: TarjetaAlumnoProps) {

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
            <p>Abre la consola del navegador, presiona el botón y compara cada resultado con los comentarios de la función.</p>
            <button type="button" onClick={otrosEjemplos}>Ver más ejemplos en la consola</button>
        </section>
    );
}

function otrosEjemplos() {
    const alumno = {
        nombre: "juan",
        curso: 5,
        presente: true,
        notas: [1.0, 7.0, 7.0],
        direccion: {
            calle: "Los trapenses",
            numero: 55
        }
    }

    // 1. sin desestructurar, tomamos cada dato por separado.
    const nombreNormal = alumno.nombre
    const cursoNormal = alumno.curso
    console.log("sin desestructurar:", nombreNormal, cursoNormal) // "juan", 5

    // con llaves {} hacemos lo mismo en una sola linea.
    // el nombre de cada variable debe coincidir con la propiedad del objeto.
    const { nombre, curso } = alumno
    console.log("con desestructuracion:", nombre, curso) // "juan", 5

    // 2. si queremos otro nombre para la variable, usamos propiedad: nuevoNombre.
    // alumno sigue teniendo la propiedad nombre; aqui la variable se llama nombreAlumno.
    const { nombre: nombreAlumno, presente: estaPresente } = alumno
    console.log("otros nombres:", nombreAlumno, estaPresente) // "juan", true

    // 3. si una propiedad no existe o vale undefined, podemos darle un valor por defecto.
    // si ya tiene un valor, se conserva ese valor.
    const { apellido = "sin apellido" } = { apellido: undefined }
    const { nombre: nombreConValor = "sin nombre" } = alumno
    console.log("valores por defecto:", apellido, nombreConValor) // "sin apellido", "juan"

    // 4. tambien podemos entrar a un objeto que esta dentro de otro.
    // esto equivale a: const calle = alumno.direccion.calle
    const { direccion: { calle, numero } } = alumno
    console.log("direccion:", calle, numero) // "Los trapenses", 55

    // las llaves extraen propiedades de objetos; los corchetes [] extraen posiciones de arreglos.
    const misNotas = [1.0, 7.0, 7.0, 1.0, 5.0, 7.0]

    // 5. sin desestructurar, leemos cada posicion por su numero (empezando en 0).
    const primeraNotaNormal = misNotas[0]
    console.log("primera nota:", primeraNotaNormal) // 1

    // con corchetes, los nombres los elegimos nosotros; importa el orden de las posiciones.
    const [notaExamen, notaParcial, terceraNota] = misNotas
    console.log("tres notas:", notaExamen, notaParcial, terceraNota) // 1, 7, 7

    // 6. dejamos una posicion vacia entre comas para saltarnos esa nota.
    const [, segundaNota, , cuartaNota] = misNotas
    console.log("notas elegidas:", segundaNota, cuartaNota) // 7, 1

    // 7. los tres puntos guardan las notas que quedan en otro arreglo.
    const [primeraNota, ...restoDeNotas] = misNotas
    console.log("primera y resto:", primeraNota, restoDeNotas) // 1, [7, 7, 1, 5, 7]

    // 8. podemos combinar ambos: sacamos el arreglo notas del objeto y luego su primera nota.
    const { notas } = alumno
    const [primeraNotaDelAlumno] = notas
    console.log("primera nota de alumno:", primeraNotaDelAlumno) // 1
}

export { EjemploDesestructuracion }
