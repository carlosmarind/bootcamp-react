import React, { useState } from "react"
import type { MetaDataAuth } from "../../types/MetaDataAuth";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import styles from "./Login.module.css";


function Login() {

    const LOGIN_TYPE = 'JWT'
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
        if (LOGIN_TYPE === "JWT") {
            jwtLogin()
        } else {
            basicLogin();
        }
    }

    const basicLogin = () => {
        fetch("http://localhost:3001/login", {
            method: "POST",
            body: JSON.stringify({ username: form.user, password: form.password }),
            headers: {
                "Content-Type": 'application/json'
            }
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
        <main className={styles.page}>
            <section className={styles.card}>
                <h1 className={styles.title}>Iniciar sesión</h1>
                <p className={styles.helper}>Ingresa tus credenciales para continuar.</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.label}>
                        Usuario
                        <input
                            className={styles.input}
                            name="user"
                            type="text"
                            value={form.user}
                            onChange={handleChange}
                            autoComplete="username"
                        />
                    </label>

                    <label className={styles.label}>
                        Contraseña
                        <input
                            className={styles.input}
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />
                    </label>

                    {loginFailure && <p className={styles.error}>Error en la contraseña</p>}

                    <button className={styles.button} type="submit">
                        Enviar
                    </button>
                    <button className={styles.button} type="button" onClick={() => navigate("/")}>
                        Volver
                    </button>
                </form>
            </section>
        </main>
    )
}
export { Login }