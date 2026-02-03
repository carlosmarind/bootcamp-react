// Archivo: AppRoutes.tsx
// Propósito: Configurar las rutas (URLs) de la aplicación usando React Router.
// Cada ruta define qué componente se renderiza cuando el usuario visita una URL específica.

// Importaciones de React Router
// ------------------------------
// - `Routes`: Componente contenedor que engloba todas las rutas de la app.
// - `Route`: Define una ruta individual (URL → Componente).
import { Route, Routes } from "react-router";

// Importaciones de componentes de la app
// ---------------------------------------
// - ProtectedComponent: envuelve componentes que requieren autenticación/autorización.
// - Páginas (Home, Login, Products, etc.): componentes que se muestran en cada ruta.
// - Layouts: componentes que envuelven grupos de rutas para compartir estructura (header, footer, etc.).
import { BootstrapDemo } from "../pages/BootstrapDemo";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login/Login";
import { ProductDetail } from "../pages/Products/ProductDetail";
import { Products } from "../pages/Products/Products";
import { LoginLayout } from "../layout/LoginLayout";
import { MainLayout } from "../layout/MainLayout";
import { NotFoundLayout } from "../layout/NotFoundLayout";

// Componente principal de enrutamiento
// -------------------------------------
export function AppRoutes() {
    return (
        // `Routes`: contenedor principal que evalúa qué ruta coincide con la URL actual.
        <Routes>
            {/* Grupo de rutas con layout compartido (MainLayout) */}
            {/* Este <Route> sin `path` actúa como "layout route": 
                todas las rutas hijas heredan este layout. */}
            <Route element={<MainLayout />}>

                {/* Ruta raíz "/" (index) → muestra el componente Home */}
                {/* `index` indica que esta es la ruta por defecto del layout padre */}
                <Route index element={<Home />}></Route>

                {/* Ruta "/products" → muestra Products, pero protegida por autenticación */}
                {/* ProtectedComponent verifica que el usuario tenga rol "user" o "admin" */}
                <Route
                    path="products"
                    element={<Products />}>
                </Route>

                {/* Ruta "/products/:productId" → muestra detalle de un producto */}
                {/* ":productId" es un parámetro dinámico; ej: /products/123 */}
                <Route path="products/:productId" element={<ProductDetail />}></Route>

                {/* Ruta "/bootstrap" → página de demostración de Bootstrap */}
                <Route path="bootstrap" element={<BootstrapDemo />}></Route>
            </Route>

            {/* Grupo de rutas con layout de login (LoginLayout) */}
            {/* Este layout envuelve solo la página de login */}
            <Route element={<LoginLayout />}>
                {/* Ruta "/login" → muestra el formulario de login */}
                <Route path="login" element={<Login />} />
            </Route>
            {/* Ruta comodín "*" → muestra NotFoundLayout para URLs no definidas */}
            <Route path="*" element={<NotFoundLayout />} />
        </Routes>
    )
}

/*
    Notas didácticas para desarrolladores
    ---------------------------------------------
    1. ¿Qué es React Router?
       - Es una librería que permite navegar entre diferentes páginas/vistas
         en una aplicación React sin recargar el navegador (SPA - Single Page Application).

    2. ¿Qué es un Layout Route?
       - Un <Route> sin `path` que tiene un `element` (layout) y rutas hijas.
       - Todas las rutas hijas se renderizan DENTRO del layout padre.
       - Útil para compartir header, footer, sidebar entre múltiples páginas.

    3. ¿Qué es `index`?
       - Indica que esa ruta es la predeterminada del padre.
       - Ejemplo: si el padre es "/", `index` renderiza en "/" exactamente.

    4. ¿Qué son los parámetros de ruta (`:productId`)?
       - Segmentos dinámicos de la URL que cambian según el contenido.
       - Se acceden dentro del componente usando `useParams()` de React Router.
       - Ejemplo: /products/42 → productId = "42"

    5. ¿Qué hace ProtectedComponent?
       - Envuelve componentes que requieren autenticación.
       - Verifica si el usuario está logueado y tiene los roles permitidos.
       - Si no cumple, redirige al login o muestra error.

    6. Flujo típico de navegación:
       - Usuario visita "/" → React Router renderiza <Home /> dentro de <LayoutTresColumnas />
       - Usuario hace clic en "Products" → navega a "/products" → verifica auth → muestra <Products />
       - Usuario hace clic en un producto → navega a "/products/123" → muestra <ProductDetail /> con id=123
*/