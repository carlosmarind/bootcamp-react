import { type Product } from "../types/product";
import productos from "../data/productos.json"

function Home() {

    const listaProductos: Product[] = productos as Product[];

    return (
        <>
            <h2>Pagina de Home</h2>
            <ul>
                {
                    listaProductos.map((producto) => {
                        //esta funcion del map se va a ejecutar por cada "producto"
                        return (
                            <>
                                <li key={producto.id}> {producto.nombre} - {producto.stock} -  {producto.uuid}</li>
                            </>
                        )
                    })
                }
            </ul>
        </>
    )
}
export { Home }