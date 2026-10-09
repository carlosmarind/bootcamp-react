import { useEffect, useState } from "react"

function Temporizador() {

    const [segundos, setSegundos] = useState(0);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setSegundos((valorActual) => valorActual + 1)
            console.log("segundos", segundos)
        }, 1000)
    }, [])

    return <p>Segundos transcurridos: {segundos}</p>
}

export function EjemploLimpieza() {
    const [mostrarTemporizador, setMostrarTemporizador] = useState(true)
    return (
        <section className="lesson" id="use-effect-limpieza" aria-labelledby="use-effect-limpieza-title">
            <header className="lesson-heading">
                <span className="lesson-number">04</span>
                <h2 id="use-effect-limpieza-title">Limpiar un efecto al desmontar</h2>
            </header>
            <p>Un efecto puede retornar una función de limpieza. React la ejecuta cuando el componente se desmonta y también antes de volver a ejecutar el efecto si cambian sus dependencias.</p>
            <p>En desarrollo React puede realizar una limpieza adicional para comprobar que el efecto puede iniciarse y detenerse correctamente.</p>
            <pre><code>{"useEffect(() => {\n  const intervalo = setInterval(() => {\n    setSegundos((valorActual) => valorActual + 1)\n  }, 1000)\n\n  return () => {\n    clearInterval(intervalo)\n  }\n}, [])"}</code></pre>

            <article className="card">

                {mostrarTemporizador ?
                    <Temporizador />
                    :
                    <p>El temporizador esta desmontado</p>
                }
                <button className="button" type="button" onClick={() => setMostrarTemporizador(!mostrarTemporizador)}>
                    {mostrarTemporizador ? 'Desmontar temporizador' : 'Montar Temporizado'}
                </button>
            </article>

            <p className="prompt">Desmonta el temporizador y revisa la consola. ¿Qué problema evitaría <code>clearInterval</code>?</p>
        </section>
    )
}