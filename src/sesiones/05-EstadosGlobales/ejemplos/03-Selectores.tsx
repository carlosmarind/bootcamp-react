import { useContadorStore } from "../stores/useContadorStore"

export function EjemploSelectores() {

    // selector
    const contador = useContadorStore((estado) => estado.contador)

    // un selector calculado
    const esPar = useContadorStore((estado) => estado.contador % 2 === 0)

    // un selector derivado
    const doble = contador * 2

    const incrementar = useContadorStore((estado) => estado.incrementar)

    return (
        <section className="lesson" id="selectores" aria-labelledby="selectores-title">
            <header className="lesson-heading">
                <span className="lesson-number">03</span>
                <h2 id="selectores-title">Leer con selectores y calcular valores</h2>
            </header>
            <p>La función <code>(estado) =&gt; estado.contador</code> es un selector: elige la parte del store que necesita el componente. Zustand notifica a ese componente cuando cambia el valor seleccionado. Elegimos cada dato o acción por separado para evitar suscribirnos a todo el store.</p>
            <pre><code>{"// Cada selector elige un valor o una acción del store.\nconst contador = useContadorStore((estado) => estado.contador)\nconst incrementar = useContadorStore((estado) => estado.incrementar)\n// Este selector devuelve un booleano, no otro estado guardado.\nconst esPar = useContadorStore((estado) => estado.contador % 2 === 0)\n// Se recalcula al renderizar; no necesita useState ni useEffect.\nconst doble = contador * 2"}</code></pre>
            <p>Un selector también puede devolver un valor calculado, como <code>esPar</code>. El doble se calcula directamente a partir del contador. No necesitamos guardar esos resultados en otro estado ni sincronizarlos con <code>useEffect</code>.</p>
            <article className="card">
                <h3>Datos derivados</h3>
                <p>Contador: {contador}</p>
                <p>Doble: {doble}</p>
                <p>El contador es {esPar ? 'par' : 'impar'}.</p>
                <button className="button" type="button" onClick={incrementar}>Incrementar y recalcular</button>
            </article>
            <p className="prompt">Prueba con cero, uno y dos. ¿Qué valores deben cambiar? Agrega un cálculo del triple sin crear otro campo en el store.</p>
        </section>
    )
}