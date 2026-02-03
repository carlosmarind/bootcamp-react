import { useState } from "react";
import type { User } from "../../types/User";

function Login() {

    const InitialState: User = {
        username: "",
        loginDate: new Date(),
        mail: ""
    }

    const [user, setUser] = useState<User>(InitialState)

    function handleInitSession() {

        // uso del localStorage
        // guardamos en el localstorage usando una llave (string) y un valor (string)
        // si la llave existe, se sobre escribe el valor.
        localStorage.setItem("randomNumber", Math.random().toLocaleString());

        // transformar objeto javascript en json string
        // JSON.stringify recibe un objeto javascript y lo transforma a string
        localStorage.setItem("login", JSON.stringify({
            username: "cmd",
            loginDate: new Date(),
            mail: "carlosmarind@gmail.com"
        }));
    }

    function handleLogout() {
        // uso del localStorage
        // eliminamos del storage usando la llave (string)
        // si la llave no existe no pasa nada.
        localStorage.removeItem("login");
    }

    function handleClean() {
        // uso del localStorage
        // limpiamos TODO el storage
        localStorage.clear();
    }

    function handleSearch() {
        // uso del localStorage
        // buscamos un item por su llave. Si existe devuelve el string, sino devuelve null
        const login = localStorage.getItem("login")

        // validamos si encontramos algo en el storage y hacemos algo con ello
        if (login) {
            // Como encontramos algo, login debe ser transformado a un objeto javascript
            const objetoJs: User = JSON.parse(login) as User;
            setUser(objetoJs);
        }
        // En caso de que no encontramos la llave en el storage
        else {
            setUser(InitialState);
        }
    }
    return (
        <div>
            <h2>Pagina de Login {user.username}</h2>
            <div>
                <button onClick={handleInitSession}>Iniciar Sesion</button>
                <button onClick={handleLogout}>Cerrar Sesion</button>
                <button onClick={handleClean}>Limpiar Sesion</button>
                <button onClick={handleSearch}>Buscar Sesion</button>
            </div>
        </div>
    )
}
export { Login }