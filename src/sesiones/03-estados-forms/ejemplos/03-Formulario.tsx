import type React from "react";
import { useState } from "react";

export function EjemploFormulario() {

    const [nombre, setNombre] = useState("")
    const [direccion, setDireccion] = useState("")
    const [correo, setCorreo] = useState("")

    function enviarFormulario() {
        console.log("nombre:", nombre)
        console.log("direccion:", direccion)
        console.log("correo:", correo)
        console.log("formulario enviado");
        //  y quizas luego enviarBackend({ nombre, direccion, correo })
    }

    function cambioInput(evento: React.ChangeEvent<HTMLInputElement>) {

        //console.log("cambio el :", evento.target.name)
        //console.log("y el valor es:", evento.target.value)
        if (evento.target.name === "nombre") {
            setNombre(evento.target.value)
        } else if (evento.target.name === "direccion") {
            setDireccion(evento.target.value)
        } else if (evento.target.name === "correo") {
            setCorreo(evento.target.value)
        }
    }

    return (
        <>
            <section className="lesson" id="formulario">
                <header className="lesson-heading">
                    <span className="lesson-number">03</span>
                    <h2 id="formulario-title">Controlar un formulario pequeño</h2>
                </header>
                <p>Los campos de texto, select y textarea usan <code>value</code>. Un checkbox usa <code>checked</code>. Todos actualizan su estado con <code>onChange</code>.</p>
                <pre><code>{"const [correo, setCorreo] = useState('')\nconst [aceptaCondiciones, setAceptaCondiciones] = useState(false)\n\n<input type=\"email\" value={correo} onChange={(evento) => setCorreo(evento.target.value)} />\n<input type=\"checkbox\" checked={aceptaCondiciones} onChange={(evento) => setAceptaCondiciones(evento.target.checked)} />"}</code></pre>

                <form className="card" onSubmit={enviarFormulario}>
                    <p>
                        <label>
                            Nombre<br />
                            <input required name="nombre" onChange={cambioInput} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Dirección<br />
                            <input required name="direccion" onChange={cambioInput} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Correo<br />
                            <input type="email" name="correo" onChange={cambioInput} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Curso<br />
                            <select >
                                <option>React</option>
                                <option>JavaScript</option>
                            </select>
                        </label>
                    </p>
                    <fieldset>
                        <legend>Jornada</legend>
                        <label><input type="radio" name="jornada" value="Mañana" /> Mañana</label><br />
                        <label><input type="radio" name="jornada" value="Tarde" /> Tarde</label><br />
                        <label><input type="radio" name="jornada" value="Ambas" /> Ambas</label>
                    </fieldset>
                    <p>
                        <label>
                            Comentario opcional<br />
                            <textarea rows={3} />
                        </label>
                    </p>
                    <p>
                        <label>
                            <input name="condiciones" type="checkbox" /> Acepto las condiciones
                        </label>
                    </p>
                    <button className="button" type="button" onClick={enviarFormulario}>Inscribirme</button>
                </form>

            </section >
        </>
    )
}