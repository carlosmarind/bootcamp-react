import { useNavigate, useParams } from "react-router";
import styles from './Products.module.css';
import { type Product } from "../../types/Product";
import { useDispatch } from "react-redux";
import { config } from "../../configuration/config";
import { useFetch } from "../../hooks/useFetch";
import { addToCart } from "../../redux/slices/cartSlice";

function ProductDetail() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: producto, error, cargando } = useFetch<Product>(
        config.apiBaseUrl + '/products/' + id
    );

    if (cargando) {
        return (
            <div className={styles.container}>
                <p>Cargando producto...</p>
            </div>
        );
    }

    if (error || !producto) {
        return (
            <div className={styles.container}>
                <button className={styles.backButton} onClick={() => navigate('/products')}>
                    ← Volver
                </button>
                <p style={{ color: 'red' }}>Error: {error || 'Producto no encontrado'}</p>
            </div>
        );
    }


    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={() => navigate('/products')}>
                ← Volver
            </button>

            <div className={styles.detailContainer}>
                <div className={styles.imageSection}>
                    <img src={producto.imagen} alt={producto.nombre} style={{ width: '100%', borderRadius: '12px' }} />
                </div>

                <div className={styles.infoSection}>
                    <h1>{producto.nombre}</h1>
                    <p className={styles.price}>${producto.precio.toFixed(2)}</p>
                    <p className={styles.description}>
                        {producto.descripcion}
                    </p>
                    <div className={styles.details}>
                        <p><strong>ID:</strong> {producto.id}</p>
                        <p><strong>Stock:</strong> {producto.stock} unidades</p>
                        <p><strong>Categoría:</strong> {producto.categoria}</p>
                        <p><strong>Rating:</strong> {producto.rating} ⭐</p>
                    </div>
                    <button className={styles.addButton} disabled={producto.stock === 0} onClick={() => dispatch(addToCart(producto))}>
                        {producto.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
                    </button>
                </div>
            </div>
        </div>
    );
}
export { ProductDetail }