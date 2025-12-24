/**
 * ============================================================================
 * COMPONENTE: LoginLayout
 * ============================================================================
 * 
 * QUÉ ES UN LAYOUT:
 * Un layout es un componente que define la estructura y diseño visual común
 * para un conjunto de páginas. Piensa en él como el "marco" o "plantilla"
 * que rodea el contenido específico de cada página.
 * 
 * ANALOGÍA:
 * Si una web es una casa:
 * - Layout = paredes, piso, techo (estructura común)
 * - Páginas/Contenido = muebles, decoración que va dentro
 * 
 * VENTAJAS DE USAR LAYOUTS:
 * 1. Reutilización - No repites la estructura en cada página
 * 2. Consistencia - Todas las páginas usan el mismo diseño
 * 3. Mantenimiento - Cambias el layout en UN lugar para toda la app
 * 4. Separación de responsabilidades - Componentes enfocados en una tarea
 * ============================================================================
 */

import { Outlet } from "react-router";
import styles from "./LoginLayout.module.css";

/**
 * LoginLayout: Layout específico para páginas de autenticación
 * 
 * PROPÓSITO:
 * Proporciona una estructura visual limpia y centrada para el login.
 * Se usa cuando el usuario no está autenticado y necesita iniciar sesión.
 * 
 * CARACTERÍSTICAS:
 * - Fondo neutral y oscuro
 * - Contenido centrado en la pantalla
 * - Card blanca que destaca el formulario
 * - Headers informativos
 * 
 * CUANDO SE USA:
 * - Página de Login (/login)
 * - Cualquier página de autenticación
 * 
 * DIFERENCIA CON MainLayout:
 * - MainLayout: para usuarios autenticados, incluye Header, Main, Footer
 * - LoginLayout: para usuarios sin autenticar, solo un formulario centrado
 */
function LoginLayout() {
    return (
        // <main> es el elemento semántico HTML que contendrá el contenido principal
        <main className={styles.container}>
            {/* 
             * <section> agrupa contenido relacionado
             * className={styles.card} aplica estilos CSS Module para una tarjeta
             * estilizada que destaca el formulario de login
             */}
            <section className={styles.card}>
                {/* 
                 * <header> encabezado del formulario con título y descripción
                 * Proporciona contexto al usuario sobre lo que debe hacer
                 */}
                <header className={styles.header}>
                    <h1 className={styles.title}>Iniciar sesión</h1>
                    <p className={styles.subtitle}>Accede con tus credenciales para continuar.</p>
                </header>

                {/* 
                 * <div className={styles.content}> contenedor del contenido dinámico
                 * 
                 * <Outlet /> es un componente de React Router que funciona como
                 * un "agujero" por donde pasa el contenido específico de cada ruta.
                 * 
                 * IMPORTANTE - QUÉ ES Outlet:
                 * Outlet es un placeholder que dice: "aquí va la página específica"
                 * Sin él, todas las rutas mostrarían exactamente lo mismo.
                 * 
                 * EJEMPLO DE FLUJO CON ROUTES:
                 * 
                 * // En AppRoutes.tsx:
                 * <Route element={<LoginLayout />}>
                 *   <Route path="/login" element={<LoginPage />} />
                 * </Route>
                 * 
                 * Cuando usuario va a /login:
                 * 1. React Router renderiza LoginLayout
                 * 2. Outlet se reemplaza por <LoginPage />
                 * 3. El resultado es: LoginLayout + LoginPage combinados
                 * 
                 * VISUALIZACIÓN:
                 * <LoginLayout>
                 *   <main>
                 *     <section>
                 *       <header>...(título y descripción)</header>
                 *       <div>
                 *         <LoginPage /> ← esto es lo que va en Outlet
                 *       </div>
                 *     </section>
                 *   </main>
                 * </LoginLayout>
                 */}
                <div className={styles.content}>
                    <Outlet />
                </div>
            </section>
        </main>
    );
}
export { LoginLayout }