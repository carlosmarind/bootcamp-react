import { type Product } from "../types/Product";
import productos from "../data/productos.json"
import { useEffect, useState } from "react";

function Home() {

    const [contador, setContador] = useState(0);
    const [hora, setHora] = useState(new Date())
    const listaProductos: Product[] = productos as Product[];

    // useEffect(funcion, [dependencias]);
    useEffect(() => {

        // logica a ejecutar cuando se monta componente.
        console.log("montando componente");

        return () => {
            // logica a ejecutar cuando se desmota el componente.
            console.log("desmontando componente");
        }
    },
        // arreglo de dependencias
        //[]: Si escribo arreglo vacio, esta logica de useEffect se ejecuta solo una vez... cuando el componente se monta
        //[variable]: Si escribo una o mas variables dentro de arreglo, cuando alguna de estas cambie su valor, se ejecuta el useEffect.
        // No colocar nada: el script de use effect se ejecuta en cada render...
        [contador]
    );

    useEffect(() => {
        const timer = setInterval(() => {
            console.log("actualizando hora")
            setHora(new Date());
        }, 1000);

        return () => {
            console.log("terminando logica de actualizacion de hora")
            clearInterval(timer);
        }
    }, []);

    
    const handleClick = () => {

        //setContador(contador + 1)
        setContador(prevState => prevState + 1);
    }

    return (
        <>
            <h2>Pagina de Home</h2>
            <h3>El valor del contador es :{contador}</h3>
            <h4>La Hora es : {hora.toLocaleTimeString()}</h4>
            <ul>
                {
                    listaProductos.map((producto) => {
                        //esta funcion del map se va a ejecutar por cada "producto"
                        return (

                            <li key={producto.id}> {producto.nombre} - {producto.stock} -  {producto.uuid}</li>
                        )
                    })
                }
            </ul>
            <button onClick={handleClick}> + aumentar contador</button>
        </>
    )
}
export { Home }