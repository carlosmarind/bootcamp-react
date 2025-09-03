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
        console.log("enviado datos de formulario", formulario);
        let errorFormulario = false;

        if (!formulario.nombre) {
            errorFormulario = true;
        }
        if (formulario.nombre.length < 3) {
            errorFormulario = true;
        }

        // ^ : inicio de cadena
        // $ : termino de cadena
        // . : Cualquier caracter
        // [] : Conjunto de caracteres
        // {3,8} : repeticiones, minimo y maximo
        // \d : digito
        // \s : espacio
        const regNombre = /^[a-zA-Z\s]{3,16}$/;
        const miMensaje = "Ana Maria";

        if (regNombre.test(miMensaje)) {
            console.log("La expresion cumple")
        } else {
            console.error("La expresion no cumple")
        }


        if (errorFormulario) {
            console.error("error en formulario")
        } else {
            console.log("formulario enviado")
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormulario({ ...formulario, [name]: value });
        //setFormulario((valorActual) => {
        //    console.log(valorActual)
        //    return { ...formulario, [name]: value }
        //})
        //const lista = [1, 2, 3, 4, 5];
        //const [primero, segundo] = lista;
        //const { mail, nombre } = formulario;
        //const apellido = "Gonzalez",
        //const persona = {
        //    nombre: "Ana Maria",
        //    apellido,
        //}
        //
        //console.log(mail);
    }
    return (
        <>
            <h1>Mi Formulario {formulario.nombre}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" name="nombre" id="nombre" value={formulario.nombre} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="mail">Mail</label>
                    <input type="text" name="mail" id="mail" value={formulario.mail} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="mensaje">Mensaje</label>
                    <input type="text" name="mensaje" id="mensaje" value={formulario.mensaje} onChange={handleChange} />
                </div>
                <div>
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </>
    )
}
export { Formulario }