import React, { useState } from "react"

function Login() {

    const [form, setForm] = useState({ user: '', password: '' });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}
export { Login }