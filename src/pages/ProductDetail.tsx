import { useParams } from "react-router"

function ProductDetail() {

    const { productId } = useParams();

    // llamar al backend para traer el detalle del producto con id = productId

    // pintar detalle con la informacion que me paso el backend.

    return (
        <>
            <h1>Detalle de producto</h1>
            <h2>Detalle de el producto con id {productId}</h2>
        </>
    )
}

export { ProductDetail }