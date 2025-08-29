import type React from "react";
import { useState } from "react";

function Formulario() {

    const [formulario, setFormulario] = useState(
        {
            nombre: "",
            mail: "",
            mensaje: ""
        }
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("enviado datos de formulario", formulario)
    }

    const handleChangeNombre = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nuevoEstadoFormulario = {
            nombre: event.target.value,
            mail: formulario.mail,
            mensaje: formulario.mensaje
        };
        setFormulario(nuevoEstadoFormulario);
    }

    const handleChangeMail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nuevoEstadoFormulario = {
            nombre: formulario.nombre,
            mail: event.target.value,
            mensaje: formulario.mensaje
        };
        setFormulario(nuevoEstadoFormulario);
    }

    const handleChangeMensaje = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        //event.target.name
        //event.target.value

        const nuevoEstadoFormulario = {
            nombre: formulario.nombre,
            mail: formulario.mail,
            mensaje: event.target.value
        };
        setFormulario(nuevoEstadoFormulario);
    }
    return (
        <>
            <h1>Mi Formulario {formulario.nombre}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" name="nombre" id="nombre" onChange={handleChangeNombre} />
                </div>
                <div>
                    <label htmlFor="mail">Mail</label>
                    <input type="text" name="mail" id="mail" onChange={handleChangeMail} />
                </div>
                <div>
                    <label htmlFor="mensaje">Mensaje</label>
                    <input type="text" name="mensaje" id="mensaje" onChange={handleChangeMensaje} />
                </div>
                <div>
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </>
    )
}
export { Formulario }