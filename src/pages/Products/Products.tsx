import styles from "./Products.module.css";
import { Link } from "react-router";
import { type Product } from "../../types/Product";
import { useFetch } from "../../hooks/useFetch";
import { config } from "../../configuration/config";

function Products() {

    const { data: productos, error, cargando } = useFetch<Product[]>(
        config.apiBaseUrl + '/products'
    );

    if (cargando) {
        return (
            <div className={styles.container}>
                <h1>Productos</h1>
                <p>Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <h1>Productos</h1>
                <p style={{ color: 'red' }}>Error: {error}</p>
            </div>
        );
    }
    return (
        <div className={styles.container}>
            <h1>Productos</h1>
            <p>Lista de productos disponibles</p>
            <div className={styles.productList}>
                {productos?.map((producto) => (
                    <Link key={producto.id} to={`/products/${producto.id}`} style={{ textDecoration: 'none' }}>
                        <div className={styles.productCard}>
                            <img
                                src={producto.imagen}
                                alt={producto.nombre}
                                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
                            />
                            <h3>{producto.nombre}</h3>
                            <p>{producto.descripcion.substring(0, 60)}...</p>
                            <p className={styles.price}>${producto.precio.toFixed(2)}</p>
                            <p style={{ fontSize: '0.85rem', color: '#666' }}>
                                {producto.stock > 0 ? `${producto.stock} en stock` : 'Agotado'} | ⭐ {producto.rating}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
export { Products }