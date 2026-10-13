import { useEffect, useState } from "react"

export function DependenciasVacias() {
    const [contador, setContador] = useState(0)

    // un useEffect con segundo parametro como arreglo vacio ( useEffect( ()=>{}, [] ) ), significa que lo que esta en la funcion del
    // primer parametro se ejecutara solo al pintar por primera vez que el componente y nunca mas. 
    useEffect(() => {
        console.log("El efecto (useEffect) con dependencias Vacias, se ejecuto", { contador })
    }, [])

    return (
        <section className="lesson" id="use-effect-dependencias-vacias" aria-labelledby="use-effect-dependencias-vacias-title">
            <header className="lesson-heading">
                <span className="lesson-number">02</span>
                <h2 id="use-effect-dependencias-vacias-title">Un efecto con dependencias vacías</h2>
            </header>
            <p>El arreglo vacío <code>[]</code> indica que el efecto no depende de ningún estado ni prop. Se ejecuta cuando el componente aparece y no se repite por los cambios del contador.</p>
            <pre><code>{"useEffect(() => {\n  console.log('El componente apareció')\n}, [])"}</code></pre>

            < article className="card" >
                <h2>Contador: {contador}</h2>
                <button className="button" type="button" onClick={() => setContador((valorActual) => valorActual + 1)}>Incrementar</button>
            </article >
        </section>
    )
}