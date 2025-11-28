import React, { useState } from "react"
import type { MetaDataAuth } from "../types/MetaDataAuth";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";


function Login() {

    const [form, setForm] = useState({ user: '', password: '' });
    const [loginFailure, setLoginFailure] = useState(false)
    const navigate = useNavigate()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
        setLoginFailure(false)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        jwtLogin()
    }

    const basicLogin = () => {
        fetch("http://localhost:3001/login", {
            method: "POST",
            body: JSON.stringify({ username: form.user, password: form.password }),
            headers: {
                "Content-Type": 'application/json'
            }
            /*{
                "username": form.user
                "password": form.password
            }*/
        }).then((response) => {

            if (!response.ok) {
                setLoginFailure(true)
                return
            }

            return response.json();
        }).then((json) => {

            if (!json || !json.metadata || !json.metadata.isAuthenticated) {
                setLoginFailure(true)
                return
            }

            const metadataUsuario: MetaDataAuth = json.metadata

            localStorage.setItem("auth", JSON.stringify(metadataUsuario))
            navigate("/products")
        })
    }

    const jwtLogin = () => {

        fetch("http://localhost:3001/auth/login", {
            method: "POST",
            body: JSON.stringify({ username: form.user, password: form.password }),
            headers: {
                "Content-Type": 'application/json'
            }
            /*{
                "username": form.user
                "password": form.password
            }*/
        }).then((response) => {

            if (!response.ok) {
                setLoginFailure(true)
                return
            }

            return response.json();
        }).then((json) => {
            if (!json?.token) {
                setLoginFailure(true)
                return
            }

            const payload = jwtDecode(json.token);

            localStorage.setItem("token", JSON.stringify(payload))
            navigate("/products")
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Usuario:
                    <input name="user" type="text" value={form.user} onChange={handleChange} />
                </label>
                <label>
                    Contraseña:
                    <input name="password" type="password" value={form.password} onChange={handleChange} />
                </label>
                {loginFailure && <p>Error en la contraseña</p>}
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}
export { Login }