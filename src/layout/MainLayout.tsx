/**
 * ============================================================================
 * COMPONENTE: MainLayout
 * ============================================================================
 * 
 * MainLayout es el layout "por defecto" para la mayoría de páginas de la app.
 * Se usa cuando el usuario YA ESTÁ AUTENTICADO.
 * 
 * ESTRUCTURA VISUAL:
 * ┌──────────────────────────────────────┐
 * │      HEADER (Navegación)        │  ← Header.tsx (logo, menú, usuario)
 * ├──────────────────────────────────────┤
 * │                                 │
 * │         MAIN CONTENT            │  ← <Outlet /> (contenido de página)
 * │    (Páginas dinámicas aquí)     │
 * │                                 │
 * ├──────────────────────────────────────┤
 * │      FOOTER (Información)       │  ← Footer.tsx (derechos, links)
 * └──────────────────────────────────────┘
 * 
 * CUÁNDO USARLO:
 * - Home page
 * - Páginas de productos
 * - Dashboard
 * - Cualquier página post-login
 * 
 * NO SE USA EN:
 * - Página de login (usa LoginLayout)
 * - Página de 404 (usa NotFoundLayout)
 */

import { Footer } from '../components/common/Footer'
import { Header } from "../components/common/Header";
import { Main } from "../components/common/Main";
import { Outlet } from "react-router";
import styles from "./MainLayout.module.css";

function MainLayout() {
    return (
        // <div className={styles.wrapper}> es el contenedor más externo
        // Occupa 100% del viewport (toda la pantalla)
        // styles.wrapper proporciona flex display para alinear todo verticalmente
        <div className={styles.wrapper}>
            {/* 
             * <div className={styles.container}> es el contenedor interno
             * Agrupa los tres componentes: Header, Main, Footer
             * styles.container proporciona el layout flex vertical
             */}
            <div className={styles.container}>
                {/* 
                 * <Header /> - Componente común que aparece en TODAS las páginas
                 * 
                 * QUÉ CONTIENE:
                 * - Logo/Nombre de la app
                 * - Barra de navegación (menú principal)
                 * - Información del usuario autenticado
                 * - Botón de logout
                 * 
                 * VENTAJA:
                 * Al estar en el Layout, NO necesitas incluirlo en cada página.
                 * Una vez en el layout, aparece automáticamente.
                 * 
                 * COMPARATIVA:
                 * ❌ MAL - Repetir en cada página:
                 * function Home() {
                 *   return <>
                 *     <Header />      ← repetido
                 *     <HomeContent />
                 *     <Footer />      ← repetido
                 *   </>;
                 * }
                 * 
                 * ✅ BIEN - Una sola vez en el Layout:
                 * function MainLayout() {
                 *   return <>
                 *     <Header />     ← aquí una sola vez
                 *     <Outlet />
                 *     <Footer />     ← aquí una sola vez
                 *   </>;
                 * }
                 */}
                <Header />

                {/* 
                 * <Main> - Componente envoltorio para el contenido principal
                 * 
                 * QUÉ ES:
                 * Es un componente personalizado (en components/common/Main.tsx)
                 * que probablemente envuelve el contenido con estilos y padding
                 * 
                 * POR QUÉ:
                 * - Aplica estilos consistentes al contenido principal
                 * - Proporciona márgenes/espaciado apropiado
                 * - Mejora la semántica HTML
                 * 
                 * CHILDREN - this.props.children:
                 * <Main> acepta children, que es <Outlet /> en este caso.
                 * Dentro del componente Main.tsx se renderiza así:
                 * function Main({ children }) {
                 *   return <main className={styles.main}>{children}</main>;
                 * }
                 */}
                <Main>
                    {/* 
                     * <Outlet /> - El "agujero" donde va el contenido dinámico
                     * 
                     * EXPLICACIÓN DETALLADA:
                     * Cada ruta de la app renderiza una página diferente,
                     * pero todas dentro de MainLayout.
                     * 
                     * EJEMPLO DE RUTAS (en AppRoutes.tsx):
                     * <Route element={<MainLayout />}>
                     *   <Route path="/" element={<Home />} />
                     *   <Route path="/productos" element={<Products />} />
                     *   <Route path="/admin" element={<ProductAdmin />} />
                     * </Route>
                     * 
                     * FLUJO CUANDO USUARIO VA A "/productos":
                     * 1. React Router ve que la ruta es "/productos"
                     * 2. Busca el elemento: <Products />
                     * 3. Pero está dentro de <Route element={<MainLayout />}>
                     * 4. Entonces renderiza MainLayout
                     * 5. El <Outlet /> se reemplaza por <Products />
                     * 6. Resultado final:
                     *    <div className="wrapper">
                     *      <Header />
                     *      <Main>
                     *        <Products /> ← viene de Outlet
                     *      </Main>
                     *      <Footer />
                     *    </div>
                     * 
                     * VENTAJA:
                     * El Header y Footer se mantienen iguales,
                     * solo cambia el contenido del medio.
                     */}
                    <Outlet />
                </Main>

                {/* 
                 * <Footer /> - Componente común que aparece al final
                 * 
                 * QUÉ CONTIENE (típicamente):
                 * - Información de la empresa
                 * - Links de navegación secundarios
                 * - Derechos de autor
                 * - Links a redes sociales
                 * - Contacto
                 * 
                 * RAZÓN DE UBICACIÓN:
                 * Al igual que Header, está en el layout para que
                 * aparezca en TODAS las páginas sin repetir código.
                 */}
                <Footer />
            </div>
        </div>
    )
}
export { MainLayout }