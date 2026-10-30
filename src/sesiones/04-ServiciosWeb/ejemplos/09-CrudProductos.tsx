import { useEffect, useState, type SubmitEvent } from "react"
import { tr } from "zod/locales"

const URL_PRODUCTOS = 'http://localhost:3001/productos'

type Formulario = {
    nombre: string
    precio: string
    cantidad: string
    categoria: string
    disponible: boolean
    condicion: string
    descripcion: string
    fechaIngreso: string
    etiquetas: string[]
}

type Producto = Omit<Formulario, 'precio' | 'cantidad'> & {
    id: string
    precio: number
    cantidad: number
}

const formularioInicial: Formulario = {
    nombre: '',
    precio: '',
    cantidad: '',
    categoria: '',
    disponible: true,
    condicion: 'Nuevo',
    descripcion: '',
    fechaIngreso: '',
    etiquetas: []

}

export function EjemploCrudProductos() {

    const [formulario, setFormulario] = useState(formularioInicial);
    const [productos, setProductos] = useState<Producto[]>([])
    const [cargando, setCargando] = useState(true);
    const [mensaje, setMensaje] = useState('')

    useEffect(() => {

        const controlador = new AbortController()

        async function cargarProductos() {
            try {

                const response = await fetch(URL_PRODUCTOS, {
                    method: 'GET',
                    signal: controlador.signal,
                    headers: {
                        'Content-type': 'application/json'
                    }
                })

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`)
                }

                const datos: Producto[] = await response.json()
                setProductos(datos)

            } catch (errorPeticion) {
                console.log('Error en solicitud http', errorPeticion)
            } finally {
                setCargando(false);
            }

        }

        cargarProductos();
        return () => controlador.abort();
    }, [])

    function guardarProducto(evento: SubmitEvent<HTMLFormElement>) {
        evento.preventDefault();

    }

    async function eliminarProducto(id: string) {
        try {

            const response = await fetch(`${URL_PRODUCTOS}/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`)
            }
            setProductos(
                (productosActuales) => productosActuales.filter((producto) => producto.id !== id)
            );
            setMensaje(`El producto con id ${id} fue eliminado`)
        } catch (errorPeticion) {
            console.log('Error en solicitud http', errorPeticion)
        } finally {
            setCargando(false);
        }



    }

    return (
        <section className="lesson" id="crud-productos">
            <header className="lesson-heading">
                <span className="lesson-number">09</span>
                <h2 id="crud-productos-title">CRUD (Create, Read, Update, Delete) de productos con json server</h2>
            </header>

            <div className="example-grid">

                <form onSubmit={guardarProducto}>
                    <p>
                        <label>
                            Nombre del producto <br />
                            <input type="text" value={formulario.nombre} onChange={(evento) => setFormulario({ ...formulario, nombre: evento.target.value })} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Precio <br />
                            <input type="number" value={formulario.precio} onChange={(evento) => setFormulario({ ...formulario, precio: evento.target.value })} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Cantidad <br />
                            <input type="number" value={formulario.cantidad} onChange={(evento) => setFormulario({ ...formulario, cantidad: evento.target.value })} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Categoria <br />
                            <select name="categoria" value={formulario.cantidad} onChange={(evento) => setFormulario({ ...formulario, cantidad: evento.target.value })}>
                                <option value="">Selecciona una categoria </option>
                                <option>Papeleria</option>
                                <option>Tecnolgia</option>
                                <option>Accesorios</option>
                            </select>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" checked={formulario.disponible} onChange={(evento) => setFormulario({ ...formulario, disponible: evento.target.checked })} /> Disponible para la venta
                        </label>
                    </p>
                    <p>
                        <fieldset>
                            <legend>Condicion del producto</legend>
                            <label><input type="radio" name="condicion" value="Nuevo" /> Nuevo</label>
                            <label><input type="radio" name="condicion" value="Usado" /> Usado</label>
                            <label><input type="radio" name="condicion" value="Reacondicionado" /> Reacondicionado</label>
                        </fieldset>
                    </p>
                    <p>
                        <label>
                            Descripcion opcional <br />
                            <textarea rows={3} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Fecha Ingreso <br />
                            <input type="date" />
                        </label>
                    </p>
                    <p>
                        <label>
                            Etiquetas <br />
                            <select multiple size={3} name="etiquetas" id="">
                                <option>Oferta</option>
                                <option>Escolar</option>
                                <option>Oficina</option>
                            </select>
                        </label>
                    </p>
                    <button className="button" type="submit">
                        Agregar Producto
                    </button>
                </form>

                <article className="card">
                    <h3>Lista de productos</h3>
                    {cargando ? <p role="status">Cargando productos....</p> : productos.length === 0 ? <p>Todavia no hay productos, agrega uno en el formulario primero</p> : (
                        <div className="table-scroll">
                            <table>
                                <caption>Productos de JSON server</caption>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Precio</th>
                                        <th>cantidad</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map((producto) => (
                                        <tr key={producto.id}>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.precio}</td>
                                            <td>{producto.cantidad}</td>
                                            <td>
                                                <button type="button" >Editar</button>
                                                <button type="button" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    )}

                </article>
            </div>

            {mensaje ? <p role="status">{mensaje}</p> : null}
        </section>
    )

}