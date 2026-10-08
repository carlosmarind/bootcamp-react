import { useState } from "react"
import { z } from "zod"

type Formulario = {
    nombre: string
    direccion: string
    correo: string
    curso: string
    jornada: string
    condiciones: boolean
    comentario: string
}
let listaCursos = ['React', 'JavaScript'];

const esquemaFormulario = z.object({
    nombre: z.string().trim()
        .min(1, { error: 'Ingresa tu nombre' })
        .max(64, { error: 'El nombre no puede tener mas de 64 caracteres' }),
    direccion: z.string().trim()
        .min(1, { error: 'Ingresa tu direccion' })
        .max(128, { error: 'La direccion no puede tener mas de 128 caracteres' }),
    correo: z.email({ error: 'El correo es invalido' }),
    curso: z.enum(listaCursos, { error: 'Selecciona un curso' }),
    jornada: z.enum(['Mañana', 'Tarde', 'Ambas'], { error: 'Selecciona una jornada' }),
    comentario: z.string().trim()
        .max(200, { error: 'El comentario puede tener hasta 200 caracteres' }),
    condiciones: z.literal(true, { error: 'Debes aceptar las condiciones' }),
})

type ResultadoValidacionType = ReturnType<typeof esquemaFormulario.safeParse>

export function EjemploValidacionZod() {

    const [resultadoValidacion, setResultadoValidacion] = useState<ResultadoValidacionType | null>(null);

    const [formulario, setFormulario] = useState<Formulario>({
        nombre: "Jose",
        direccion: "",
        correo: "",
        curso: "",
        jornada: "Mañana",
        condiciones: false,
        comentario: ""
    })

    const errores = resultadoValidacion && !resultadoValidacion.success ? z.flattenError(resultadoValidacion.error).fieldErrors : {}

    function enviarFormulario() {

        console.log("el formulario es:", formulario)
        //aqui deberia existir una validacion
        const validacion = esquemaFormulario.safeParse(formulario)

        setResultadoValidacion(validacion);

        //aqui enviamos el formulario a algun lugar

        console.log("validacion", validacion)

        if (!validacion.success) {
            alert('formulario invalido')
            return;
        }

        const datosValidados = validacion.data;
        console.log('Los datos validados estan listos para ser enviados', datosValidados);
        // enviarBackend(datosValidados)
    }

    function cambioInput(evento: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        setFormulario({
            ...formulario,
            [evento.target.name]: (evento.target instanceof HTMLInputElement && evento.target.type === "checkbox") ?
                evento.target.checked
                :
                evento.target.value
        })
    }
    return (
        <>
            <section className="lesson" id="formulario">
                <header className="lesson-heading">
                    <span className="lesson-number">04</span>
                    <h2 id="formulario-title">Validacion de formulario con Zod</h2>
                </header>
                <p>Los campos de texto, select y textarea usan <code>value</code>. Un checkbox usa <code>checked</code>. Todos actualizan su estado con <code>onChange</code>.</p>
                <pre><code>{"const [correo, setCorreo] = useState('')\nconst [aceptaCondiciones, setAceptaCondiciones] = useState(false)\n\n<input type=\"email\" value={correo} onChange={(evento) => setCorreo(evento.target.value)} />\n<input type=\"checkbox\" checked={aceptaCondiciones} onChange={(evento) => setAceptaCondiciones(evento.target.checked)} />"}</code></pre>

                <form className="card">
                    <p>
                        <label>
                            Nombre<br />
                            <input required name="nombre" value={formulario.nombre} onChange={cambioInput} />
                        </label>
                        {errores.nombre?.map((mensaje) => <p><span key={mensaje}>{mensaje}</span></p>)}
                    </p>
                    <p>
                        <label>
                            Dirección<br />
                            <input required name="direccion" value={formulario.direccion} onChange={cambioInput} />
                        </label>
                        {errores.direccion?.map((mensaje) => <p><span key={mensaje}>{mensaje}</span></p>)}
                    </p>
                    <p>
                        <label>
                            Correo<br />
                            <input type="email" name="correo" onChange={cambioInput} />
                        </label>
                        {errores.correo?.map((mensaje) => <p><span key={mensaje}>{mensaje}</span></p>)}
                    </p>
                    <p>
                        <label>
                            Curso<br />
                            <select name="curso" value={formulario.curso} onChange={cambioInput} >
                                <option value="">Seleccione...</option>
                                {listaCursos.map((curso) => <option key={curso} value={curso}>{curso}</option>)}
                            </select>
                        </label>
                        {errores.curso?.map((mensaje) => <p><span key={mensaje}>{mensaje}</span></p>)}
                    </p>
                    <fieldset>
                        <legend>Jornada</legend>
                        <label><input type="radio" name="jornada" value="Tarde" checked={formulario.jornada === "Tarde"} onChange={cambioInput} /> Tarde</label><br />
                        <label><input type="radio" name="jornada" value="Ambas" checked={formulario.jornada === "Ambas"} onChange={cambioInput} /> Ambas</label><br />
                        <label><input type="radio" name="jornada" value="Mañana" checked={formulario.jornada === "Mañana"} onChange={cambioInput} /> Mañana</label><br />
                    </fieldset>
                    {errores.jornada?.map((mensaje) => <p><span key={mensaje}>{mensaje}</span></p>)}
                    <p>
                        <label>
                            Comentario opcional<br />
                            <textarea rows={3} name="comentario" onChange={cambioInput} />
                        </label>
                        {errores.comentario?.map((mensaje) => <p><span key={mensaje}>{mensaje}</span></p>)}
                    </p>
                    <p>
                        <label>
                            <input name="condiciones" type="checkbox" onChange={cambioInput} /> Acepto las condiciones
                        </label>
                        {errores.condiciones?.map((mensaje) => <p><span key={mensaje}>{mensaje}</span></p>)}
                    </p>
                    <button className="button" type="button" onClick={enviarFormulario}>Inscribirme</button>
                </form>

            </section >
        </>
    )
}