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
                    <h2 id="formulario-title">Controlar un formulario</h2>
                </header>

                <form className="card">
                    <p>
                        <label >
                            Nombre:
                            <input name="nombre" type="text" onChange={cambioInput} />
                        </label>
                    </p>
                    <p>
                        <label >
                            Direccion:
                            <input name="direccion" type="text" onChange={cambioInput} />
                        </label>
                    </p>
                    <p>
                        <label >
                            Correo:
                            <input name="correo" type="text" onChange={cambioInput} />
                        </label>
                    </p>

                    <button className="button" type="button" onClick={enviarFormulario}>Inscribirme</button>
                </form>

            </section >
        </>
    )
}