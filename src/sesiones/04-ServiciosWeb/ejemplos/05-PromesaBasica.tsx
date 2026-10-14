import { useState } from "react"
import { setErrorMap } from "zod/v3"

function crearPromesa(probarConError: boolean) {
    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            if (probarConError) {
                reject(new Error('No fue posible cargar los datos'))
                return
            }
            resolve('Datos recibido')
        }, 1000)
    })
}

export function EjemploPromesaBasica() {

    const [mensajes, setMensajes] = useState<string[]>([])
    const [ejecutando, setEjecutando] = useState(false);

    function agregarMensajes(mensaje: string) {
        setMensajes((mensajes) => [...mensajes, mensaje]);
    }

    function probarPromesa(probarConError: boolean) {
        setMensajes(["Promesa creada: pendiente"])
        setEjecutando(true);
        crearPromesa(probarConError)
            .then((resultado) => {
                agregarMensajes(`then: completada - ${resultado}`)
            }).catch((error: Error) => {
                agregarMensajes(`catch: rechazada - ${error.message}`)
            }).finally(() => {
                agregarMensajes(`finally: la promesa termino`)
                setEjecutando(false);
            })
        console.log("Termine de llamar a las promesas");
    }

    return (
        <section className="lesson" id="promesa-basica" aria-labelledby="promesa-basica-title">
            <header className="lesson-heading">
                <span className="lesson-number">05</span>
                <h2 id="promesa-basica-title">Resolver o rechazar una Promise</h2>
            </header>
            <p>Una Promise representa un resultado que estará disponible más adelante. Mientras esperamos, su estado es <code>pending</code>.</p>
            <p><code>resolve</code> y <code>reject</code> son funciones entregadas por el constructor de la Promise. <code>resolve</code> indica que la tarea terminó correctamente y <code>reject</code> indica que ocurrió un error.</p>
            <pre><code>{"function crearPromesa(conError) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      if (conError) {\n        reject(new Error('No fue posible cargar los datos'))\n        return\n      }\n\n      resolve('Datos recibidos')\n    }, 1000)\n  })\n}"}</code></pre>
            <p>Luego consumimos la Promise:</p>
            <ul>
                <li><code>then()</code> recibe el resultado cuando queda <code>fulfilled</code>.</li>
                <li><code>catch()</code> recibe el error cuando queda <code>rejected</code>.</li>
                <li><code>finally()</code> se ejecuta en ambos casos.</li>
            </ul>
            <pre><code>{"crearPromesa(conError)\n  .then((resultado) => {\n    console.log('fulfilled:', resultado)\n  })\n  .catch((error) => {\n    console.log('rejected:', error.message)\n  })\n  .finally(() => {\n    console.log('La Promise terminó')\n  })"}</code></pre>

            <article className="card">
                <button type="button" className="button" disabled={ejecutando} onClick={() => probarPromesa(false)}>Probar resolve</button>
                <button type="button" className="button" disabled={ejecutando} onClick={() => probarPromesa(true)}>Probar rejected</button>
                <ul>
                    {mensajes.map((mensaje) => <li key={mensaje}>{mensaje}</li>)}
                </ul>
            </article>
            <p className="prompt">Prueba primero <code>resolve</code> y después <code>reject</code>. ¿Qué función se ejecuta solamente en el camino correcto, cuál solamente en el error y cuál aparece siempre?</p>
        </section>
    )
}