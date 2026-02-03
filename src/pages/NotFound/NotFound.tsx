import { Link } from "react-router";
import styles from "./NotFound.module.css";

function NotFound() {
    return (
        <>
            <h1 className={styles.title}>404 - Página no encontrada</h1>
            <p className={styles.text}>
                La ruta que intentas visitar no existe o fue movida. Usa el botón para volver al inicio.
            </p>
            <Link to="/" className={styles.button}>
                Volver al inicio
            </Link>
        </>
    );
}
export { NotFound }