import { useDispatch, useSelector } from "react-redux";
//import jsonProductos from "../data/productos.json"
import type { Product } from "../types/Product"
import { addProduct, emptyProducts, removeProduct } from '../redux/slices/productSlice'
import React, { useEffect, useState } from "react";
import style from './Products.module.css'
import type { RootState } from "../redux/rootReducer";
import type { AppDispatch } from "../redux/store";
function Products() {

    //const listaProductos: Product[] = jsonProductos as Product[];
    const listaCarrito = useSelector((state: RootState) => state.products);
    const [listaProductos, setListaProductos] = useState<Product[]>([])
    const dispatch = useDispatch<AppDispatch>();
    const [product, setProduct] = useState<Product>({ nombre: "", valor: 0, stock: 0 });
    const [refresh, setRefresh] = useState(0);

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
                const response = await fetch("http://localhost:3000/productos", {
                    method: "GET", // "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS"
                });
                if (!response.ok) { return Promise.reject("El servicio no responde") }
                const jsonResponse = await response.json() as Product[];
                setListaProductos(jsonResponse)
            } catch (error) {
                //logica que se ejecuta si en el intento hay un error
                console.log(error);
            }
        }
        callJsonServer();
    }, [refresh]);

    function handleAddProduct(producto: Product) {
        dispatch(addProduct(producto));
        return
    }
    function handleEmptyProducts() {
        dispatch(emptyProducts())
    }
    function handleRemoveProduct(id: number | undefined) {
        if (id) { dispatch(removeProduct(id)) }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (product.nombre === "") {
            return;
        }

        if (product.valor === 0) {
            return;
        }
        if (product.stock === 0) {
            return;
        }

        crearProducto(product);
        setProduct({ nombre: "", valor: 0, stock: 0 });


    }

    function handleDelProduct(id: number) {
        //     http://localhost:3000/productos/c55c
        fetch(`http://localhost:3000/productos/${id}`, {
            method: 'DELETE'
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`La respuesta del servidor al borrar fue con error (${response.status})`);
                }

                setRefresh(prev => prev + 1)
            })
            .catch((error) => {
                const mensaje = error instanceof Error ? error.message : "Ocurrion un error desconocido";
                console.log(mensaje);
            });


    }

    function crearProducto(newProduct: Product) {
        fetch("http://localhost:3000/productos", {
            method: 'POST',
            body: JSON.stringify(newProduct),
            headers: {
                'Content-type': 'application/json',
            }
        }).then((response) => {

            if (!response.ok) {
                throw new Error(`La respuesta del servidor al agregar fue con error (${response.status})`);
            }

            setRefresh(prev => prev + 1)

        }).catch((error) => {
            const mensaje = error instanceof Error ? error.message : "Ocurrion un error desconocido";
            console.log(mensaje);
        });
    }

    return (
        <>
            <div>
                <h2>Crear Producto</h2>
                <div>
                    <form className={style.formProduct} onSubmit={handleSubmit}>
                        <label >
                            Nombre:
                            <input type="text"
                                value={product?.nombre}
                                onChange={(event) => setProduct({ ...product, nombre: event.target.value })}
                                name="nombre" />
                        </label>
                        <label >
                            Valor:
                            <input type="number"
                                value={product?.valor}
                                onChange={(event) => setProduct({ ...product, valor: +event.target.value })}
                                name="valor" />
                        </label>
                        <label >
                            Stock:
                            <input type="number"
                                value={product?.stock}
                                onChange={(event) => setProduct({ ...product, stock: +event.target.value })}
                                name="stock" />
                        </label>
                        <button type="submit">Crear</button>
                    </form>
                </div>

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
                                            <button onClick={() => handleAddProduct(producto)}>Agregar al carrito</button>
                                            <button onClick={() => handleDelProduct(producto.id!)}>Eliminar</button>
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
            </div >
        </>
    )
}
export { Products }