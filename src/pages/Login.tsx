function Login() {
    return (
        <div>
            <form>
                <label>
                    Usuario:
                    <input name="user" type="text" />
                </label>
                <label>
                    Contraseña:
                    <input name="password" type="password" />
                </label>

            </form>
        </div>
    )
}

export { Login }