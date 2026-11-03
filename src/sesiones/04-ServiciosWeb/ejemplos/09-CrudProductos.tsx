import { useEffect, useState, type SubmitEvent } from "react"
import z from "zod"

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

const esquemaFormulario = z.object({
    nombre: z.string().trim().min(1, { error: 'Ingresa el nombre del producto' }),
    descripcion: z.string(),
    fechaIngreso: z.iso.date({ error: 'Ingresa una fecha valida' }),
    etiquetas: z.array(z.enum(["Oferta", "Escolar", "Oficina"]), { error: 'Seleccione una etiquetas' }),
    categoria: z.enum(["Papeleria", "Tecnologia", "Accesorios"], { error: 'Seleccione una categoria' }),
    disponible: z.boolean(),
    condicion: z.enum(["Nuevo", "Usado", "Reacondicionado"], { error: 'Seleccione una condicion' }),
    precio: z.string().trim().min(1, { error: 'Ingresa el precio' })
        .transform(Number)
        .pipe(
            z.number({ error: 'Ingresa una cantidad valida' })
                .nonnegative({ error: 'La cantidad debe ser mayor o igual a cero' }
                )
        ),
    cantidad: z.string().trim().min(1, { error: 'Ingresa el precio' })
        .transform(Number)
        .pipe(
            z.number({ error: 'Ingresa una cantidad valida' })
                .int({ error: 'La cantidad debe ser un numero valido' })
                .nonnegative({ error: 'La cantidad debe ser mayor o igual a cero' }
                )
        ),
})

export function EjemploCrudProductos() {

    const [formulario, setFormulario] = useState(formularioInicial);
    const [productos, setProductos] = useState<Producto[]>([])
    const [resultadoValidacion, setResultadoValidacion] = useState<ReturnType<typeof esquemaFormulario.safeParse> | null>();
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(true)
    const [mensaje, setMensaje] = useState('')
    const [error, setError] = useState('');

    const erroresValidacion = (resultadoValidacion && !resultadoValidacion.success)
        ? z.flattenError(resultadoValidacion.error).fieldErrors
        : {}

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

    async function guardarProducto(evento: SubmitEvent<HTMLFormElement>) {
        evento.preventDefault();
        setError('')
        setMensaje('')

        const validacion = esquemaFormulario.safeParse(formulario);
        setResultadoValidacion(validacion);

        if (!validacion.success) {
            return
        }

        setGuardando(true);
        console.log("producto validado", validacion.data)
        try {
            const respuesta = await fetch(`${URL_PRODUCTOS}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(validacion.data)
            })

            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`)
            }

            const productoGuardado: Producto = await respuesta.json()

            setProductos((productosActuales) => [...productosActuales, productoGuardado])
            setFormulario(formularioInicial)


        } catch (errorPeticion) {
            console.error(`Error en llamada http: ${errorPeticion}`)
            setError('No fue posible guardar el producto en backend')

        } finally {
            setGuardando(false)
        }

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
                            <select name="categoria" value={formulario.categoria} onChange={(evento) => setFormulario({ ...formulario, categoria: evento.target.value })}>
                                <option value="">Selecciona una categoria </option>
                                <option>Papeleria</option>
                                <option>Tecnologia</option>
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
                            <textarea rows={3} value={formulario.descripcion} onChange={(evento) => setFormulario({ ...formulario, descripcion: evento.target.value })} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Fecha Ingreso <br />
                            <input type="date" value={formulario.fechaIngreso} onChange={(evento) => setFormulario({ ...formulario, fechaIngreso: evento.target.value })} />
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
                                                <button type="button" disabled={guardando} onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
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
