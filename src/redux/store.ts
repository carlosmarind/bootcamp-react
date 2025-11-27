/*
    Archivo: store.ts
    Propósito: configurar el store de Redux Toolkit para la aplicación,
    agregar middleware personalizado y exportar tipos útiles.

    - Piensa en el "store" como la caja fuerte donde guardamos el estado de la app.
    - Una "action" es una carta que le mandamos al store para que actualice el estado.
    - El "reducer" es quien abre la carta (action) y modifica el estado según su contenido.
    - Un "middleware" es como una oficina de correos que inspecciona las cartas antes y/o
        después de que lleguen al responsable (reducer). Allí puedes: registrar, validar,
        transformar (con cuidado) o disparar efectos secundarios (p.ej. persistencia).

    Ejemplo simple: queremos guardar el carrito en localStorage cada vez que cambie.
    Esta lógica se puede ejecutar desde un middleware que detecte las acciones del slice
    `products` y persista el estado.
*/
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";
import { productPersistenceMiddleware } from "./middlewares/productPersistenceMiddleware";


/**
 * Middlewares incluidos:
 * - loggerMiddleware: registra el estado antes y después de las acciones.
 * - productPersistenceMiddleware: persiste el slice `products` en localStorage
 *   cuando se detectan acciones que lo afectan.
 *
 * Estos middlewares están en `./middleware.ts` para mantener este archivo limpio y
 * facilitar la reutilización/ pruebas.
 */



// Eliminamos myMiddleware en favor de middlewares especializados
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefault) => getDefault().concat(loggerMiddleware, productPersistenceMiddleware),
});

/*
        Configuración del store
        - `reducer`: combinamos los slices en `rootReducer` para que Redux los conozca.
        - `middleware`: dejamos los middleware por defecto y añadimos middlewares custom
            (`loggerMiddleware`, `productPersistenceMiddleware`) usando `getDefault().concat(...)`.
        Nota:
        - `getDefault()` recupera middlewares útiles (thunk, serializable check, etc.).
        - Con `.concat()` agregamos nuestros middlewares al final de la cadena.
*/
// Tipos útiles para usar en componentes y hooks
// AppDispatch: tipo del dispatch del store (útil con `useDispatch<AppDispatch>()`)
// Tipo útil para usar en componentes: `useDispatch<AppDispatch>()` para tener autocompletado
export type AppDispatch = typeof store.dispatch;
