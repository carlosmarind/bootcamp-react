import { Link } from "react-router"
import { useCarritoStore } from "../sesiones/05-EstadosGlobales/stores/useCarritoStore"

const formatoMoneda = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
})
export function Header() {
    const cantidadProductos = useCarritoStore((estado) =>
        estado.items.reduce((total, item) => total + item.cantidad, 0)
    )

    const montoCarrito = useCarritoStore((estado) =>
        estado.items.reduce((total, item) => total + (item.cantidad * item.producto.precio), 0)
    )

    return (
        <header className="site-header">
            <Link to="/">Bootcamp de React</Link>
            <span className="badge" role="status" >Carrito: {cantidadProductos} - Monto: {formatoMoneda.format(montoCarrito)}</span>
        </header>
    )
}
