import type React from "react";
import { useState } from "react";

type Formulario = {
    nombre: string
    direccion: string
    correo: string
    curso: string
    jornada: string
    aceptaCondiciones: boolean
    comentario: string
}

export function EjemploFormulario() {

    let initValue = {
        nombre: "Jose",
        direccion: "",
        correo: "",
        curso: "",
        jornada: "Mañana",
        aceptaCondiciones: false,
        comentario: ""
    }

    const [formulario, setFormulario] = useState<Formulario>(initValue)

    //const [nombre, setNombre] = useState("")
    //const [direccion, setDireccion] = useState("")
    //const [correo, setCorreo] = useState("")
    //const [curso, setCurso] = useState("")


    function enviarFormulario() {
        console.log("nombre:", formulario)

        // antes del backend, deberiamos validarla

        let errorFormulario = false;

        if (formulario.nombre && formulario.nombre.trim().length > 2 && formulario.nombre.trim().length < 64) {
            errorFormulario = true;
        }

        if (formulario.direccion && formulario.direccion.trim().length > 2 && formulario.direccion.trim().length < 64) {
            errorFormulario = true;
        }

        if (!errorFormulario) {
            //  y quizas luego enviarBackend({ nombre, direccion, correo })
        }


    }

    function cambioInput(evento: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {

        //console.log("cambio el :", evento.target.name)
        //console.log("y el valor es:", evento.target.value)
        //if (evento.target.name === "nombre") {
        //    setNombre(evento.target.value)
        //} else if (evento.target.name === "direccion") {
        //    setDireccion(evento.target.value)
        //} else if (evento.target.name === "correo") {
        //    setCorreo(evento.target.value)
        //} else if (evento.target.name === "curso") {
        //    setCurso(evento.target.value)
        //}

        //const nombre = "Pepe"
        //
        //let persona = {
        //    nombre: "alicia",
        //    edad: 26
        //}
        //
        //persona = {
        //    nombre,
        //    edad: 28
        //}

        //console.log("name", evento.target.name)
        //console.log("value", evento.target.value)
        //console.log("value", evento.target.checked)
        //
        setFormulario({
            ...formulario,
            [evento.target.name]: (evento.target instanceof HTMLInputElement && evento.target.type === "checkbox") ?
                evento.target.checked
                :
                evento.target.value
        })

        //if (name === "nombre") {
        //    setFormulario({
        //        nombre: value,
        //        direccion: formulario.direccion,
        //        correo: formulario.correo,
        //        curso: formulario.curso,
        //        jornada: formulario.jornada,
        //        aceptaCondiciones: formulario.aceptaCondiciones,
        //        comentario: formulario.comentario
        //    });
        //} else if (name === "direccion") {
        //    setFormulario({
        //        nombre: formulario.nombre,
        //        direccion: value,
        //        correo: formulario.correo,
        //        curso: formulario.curso,
        //        jornada: formulario.jornada,
        //        aceptaCondiciones: formulario.aceptaCondiciones,
        //        comentario: formulario.comentario
        //    });
        //}
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

                <form className="card">
                    <p>
                        <label>
                            Nombre<br />
                            <input required name="nombre" value={formulario.nombre} onChange={cambioInput} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Dirección<br />
                            <input required name="direccion" value={formulario.direccion} onChange={cambioInput} />
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
                            <select name="curso" value={formulario.curso} onChange={cambioInput} >
                                <option value="">Seleccione...</option>
                                <option value="React">React</option>
                                <option value="JavaScript">JavaScript</option>
                            </select>
                        </label>
                    </p>
                    <fieldset>
                        <legend>Jornada</legend>
                        <label><input type="radio" name="jornada" value="Tarde" checked={formulario.jornada === "Tarde"} onChange={cambioInput} /> Tarde</label><br />
                        <label><input type="radio" name="jornada" value="Ambas" checked={formulario.jornada === "Ambas"} onChange={cambioInput} /> Ambas</label><br />
                        <label><input type="radio" name="jornada" value="Mañana" checked={formulario.jornada === "Mañana"} onChange={cambioInput} /> Mañana</label><br />
                    </fieldset>
                    <p>
                        <label>
                            Comentario opcional<br />
                            <textarea rows={3} name="comentario" onChange={cambioInput} />
                        </label>
                    </p>
                    <p>
                        <label>
                            <input name="condiciones" type="checkbox" onChange={cambioInput} /> Acepto las condiciones
                        </label>
                    </p>
                    <button className="button" type="button" onClick={enviarFormulario}>Inscribirme</button>
                </form>

            </section >
        </>
    )
}