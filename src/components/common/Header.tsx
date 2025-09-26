import { useState } from "react";
import { useNavigate } from "react-router";

function Header() {

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
        <>
            <header style={{
                backgroundColor: '#888',
                color: 'white',
                padding: '20px',
                borderRadius: '10px 10px 0 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1 style={{ fontSize: '2em', fontWeight: 'normal', margin: 0 }} >Header {isLogged ? "logeado" : "no logeado"}</h1>
                <button onClick={handleLoginClick} style={{
                    backgroundColor: '#ffa500',
                    color: 'white',
                    padding: '15px 30px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1.2em',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}>
                    Login
                </button>
                <button onClick={handleHacerLogin} style={{
                    backgroundColor: '#ffa500',
                    color: 'white',
                    padding: '15px 30px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1.2em',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}>
                    Cambiar estado
                </button>
            </header>
        </>
    )
}

export { Header };