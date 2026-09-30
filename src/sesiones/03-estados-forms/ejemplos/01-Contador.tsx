import { useState } from 'react'

export function EjemploContador() {

    const [contador, setContador] = useState(0)

    function incrementar() {
        //podemos llamar a la funciona de actualizacion de estado pasandole un valor
        setContador(contador + 1)
        // o con una funcion de callback de tipo (valorActual) => { return valorNuevo }
        // setContador((valorActual) => valorActual + 1)
    }

    return (
        <section className="lesson" id="contador" aria-labelledby="contador-title">
            <header className="lesson-heading">
                <span className="lesson-number">01</span>
                <h2 id="contador-title">Guardar un número con useState</h2>
            </header>
            <p><code>useState(0)</code> entrega el valor actual y una función para actualizarlo. Cuando cambia el contador, React vuelve a renderizar el componente.</p>
            <pre><code>{"const [contador, setContador] = useState(0)\n\nfunction incrementar() {\n  setContador((valorActual) => valorActual + 1)\n}"}</code></pre>
            <article className="card">
                <h3>Contador: {contador}</h3>
                <button className="button" type="button" onClick={incrementar}>Incrementar</button>
            </article>
            <p className="prompt">Pulsa varias veces. ¿Qué valor conserva React entre un renderizado y el siguiente?</p>
        </section>
    )
}
