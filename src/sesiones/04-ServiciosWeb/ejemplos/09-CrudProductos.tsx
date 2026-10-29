import { useEffect, useState, type SubmitEvent } from "react"

const URL_PRODUCTOS = 'http://localhost:3001/productos'

type Producto = {
    id: string
    nombre: string
    precio: number
    cantidad: number
    categoria: string
    disponible: boolean
    condicion: string
    descripcion: string
    fechaIngreso: string
    etiquetas: string[]

}
export function EjemploCrudProductos() {


    const [productos, setProductos] = useState<Producto[]>([])
    const [cargando, setCargando] = useState(true);

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
                            <input type="text" />
                        </label>
                    </p>
                    <p>
                        <label>
                            Precio <br />
                            <input type="number" />
                        </label>
                    </p>
                    <p>
                        <label>
                            Cantidad <br />
                            <input type="number" />
                        </label>
                    </p>
                    <p>
                        <label>
                            Categoria <br />
                            <select name="" id="">
                                <option value="">Selecciona una categoria </option>
                                <option>Papeleria</option>
                                <option>Tecnolgia</option>
                                <option>Accesorios</option>
                            </select>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" /> Disponible para la venta
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
            </div>
        </section>
    )

}