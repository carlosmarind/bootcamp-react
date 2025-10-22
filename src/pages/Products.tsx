import { useDispatch, useSelector } from "react-redux";
//import jsonProductos from "../data/productos.json"
import type { Product } from "../types/Product"
import type { RootType } from "../redux/store";
import { addProduct, emptyProducts, removeProduct } from '../redux/productSlice'
import { useEffect, useState } from "react";

function Products() {

    //const listaProductos: Product[] = jsonProductos as Product[];
    const listaCarrito = useSelector((state: RootType) => state.products);
    const [listaProductos, setListaProductos] = useState<Product[]>([])
    const dispatch = useDispatch();

    //useEffect(() => {
    //    fetch("http://localhost:3000/productos").then(
    //        (response) => {
    //            if (!response.ok) {
    //                return Promise.reject("El servicio no respondio ok");
    //            }
    //            //return response.text();
    //            return response.json() as Promise<Product[]>;
    //        }
    //    ).then((json) => {
    //        setListaProductos(json);
    //    }).catch((error) => {
    //        console.log("el servicio dio error, y el error fue", error)
    //        setListaProductos([]);
    //    }).finally(() => {
    //        console.log("ya termine la consulta http")
    //    })
    //}, []);

    useEffect(() => {

        const callJsonServer = async () => {
            try {
                //voy a intentar ejecutar este codigo
                const response = await fetch("http://localhost:3000/productos");
                if (!response.ok) { return Promise.reject("El servicio no responde") }
                const jsonResponse = await response.json() as Product[];
                setListaProductos(jsonResponse)
            } catch (error) {
                //logica que se ejecuta si en el intento hay un error
                console.log(error);
            }
        }
        callJsonServer();
    }, []);

    function handleAddProduct(producto: Product) {
        dispatch(addProduct(producto));
        return
    }
    function handleEmptyProducts() {
        dispatch(emptyProducts())
    }

    function handleRemoveProduct(id: number) {
        dispatch(removeProduct(id));
    }

    return (
        <>
            <div>
                <h2>Pagina de Products</h2>

                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>nombre</th>
                            <th>valor</th>
                            <th>stock</th>
                            <th>agregar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaProductos.length > 0 &&
                            listaProductos.map((producto) => {
                                return (
                                    <tr key={producto.id}>
                                        <td>{producto.id}</td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.valor}</td>
                                        <td>{producto.stock}</td>
                                        <td>
                                            <button onClick={() => handleAddProduct(producto)}>Agregar</button>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                    <tfoot></tfoot>
                </table>


                <h2>Lista carrito</h2>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>nombre</th>
                            <th>valor</th>
                            <th>stock</th>
                            <th>cantidad</th>
                            <th>controles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaCarrito.productList.map((producto) => {
                            return (
                                <tr key={producto.id}>
                                    <td>{producto.id}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.valor}</td>
                                    <td>{producto.stock}</td>
                                    <td>{producto.cantidad}</td>
                                    <td>
                                        <button onClick={() => handleRemoveProduct(producto.id)}>quitar</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                Total Carrito : {listaCarrito.total}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={handleEmptyProducts}>Limpiar carrito</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}
export { Products }