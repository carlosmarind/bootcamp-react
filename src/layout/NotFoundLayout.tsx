/**
 * ============================================================================
 * COMPONENTE: NotFoundLayout
 * ============================================================================
 * 
 * NotFoundLayout es el layout especial para páginas que no existen (Error 404).
 * 
 * CUÁNDO SE USA:
 * - Usuario intenta acceder a una ruta que no existe (ej: /pagina-inexistente)
 * - Usuario ingresa una URL manual inválida
 * - Se usa en la ruta wildcard de React Router: <Route path="*" />
 * 
 * DIFERENCIA CON OTROS LAYOUTS:
 * - LoginLayout: para autenticación
 * - MainLayout: para usuarios logueados
 * - NotFoundLayout: para rutas inválidas (no autenticados ni logueados)
 * 
 * ESTRUCTURA:
 * Similar a LoginLayout (simple y centrada), pero sin form.
 * Solo muestra un mensaje de error y opciones de navegación.
 */

import styles from "./NotFoundLayout.module.css";
import { NotFound } from "../pages/NotFound/NotFound";

function NotFoundLayout() {
    return (
        // <main> elemento semántico HTML para contenido principal
        // styles.container centra el contenido en la pantalla
        <main className={styles.container}>
            {/* 
             * <section> agrupa el contenido relacionado a la página 404
             * styles.card lo envuelve en una tarjeta visual destacada
             */}
            <section className={styles.card}>
                {/* 
                 * <NotFound /> componente que renderiza el contenido 404
                 * 
                 * TÍPICAMENTE CONTIENE:
                 * - Número "404" grande y destacado
                 * - Mensaje como "Página no encontrada"
                 * - Breve descripción del error
                 * - Botones de acción (Volver al inicio, Contactar soporte)
                 * 
                 * OBSERVACIÓN IMPORTANTE:
                 * Este layout NO usa <Outlet /> como los otros porque
                 * la página 404 es un componente fijo, no dinámico.
                 * 
                 * COMPARATIVA:
                 * LoginLayout + MainLayout: usan Outlet para contenido dinámico
                 * NotFoundLayout: no usa Outlet, importa el componente directo
                 */}
                <NotFound />
            </section>
        </main>
    );
}

export { NotFoundLayout };