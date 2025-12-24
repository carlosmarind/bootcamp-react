import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import style from './Header.module.css'
import type { RootState } from "../../redux/rootReducer";
function Header() {

    const listaCarrito = useSelector((state: RootState) => state.products)

    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        if (isLogged) {
            //ir ruta de productos
            navigate("/products")
        } else {
            //ir ruta de login
            navigate("/login")
        }
    }

    const handleHacerLogin = () => {
        setIsLogged(!isLogged);
    }

    return (
        <header className={style.header}>
            <div className={style.headerContent}>
                <h1>Header {isLogged ? "logeado" : "no logeado"}</h1>
                <div className={style.formProduct}>
                    <button onClick={handleLoginClick}>
                        Login
                    </button>
                    <button onClick={handleHacerLogin}>
                        Cambiar estado
                        <span> T: {listaCarrito.total}, C:{listaCarrito.productList.length}</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export { Header };