/*
  Archivo: middleware.ts
  Contenido: middlewares reutilizables para el store.
  - productPersistenceMiddleware: persiste el slice `products` en localStorage cuando cambie.
  */

import type { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "../rootReducer";

// ------------------ Product Persistence Middleware ------------------
// Guarda el slice `products` en localStorage cuando detecta acciones que lo afectan.
export const productPersistenceMiddleware: Middleware<unknown, RootState> = (storeApi) => (next) => (action) => {
    // Pasamos la acción al siguiente middleware/reducer para actualizar el estado con el reducer
    next(action);

    // Tras aplicar la acción, obtenemos el estado actualizado
    const state = storeApi.getState();
    // Extraemos el estado slice de productos.
    const products = state.products;

    // Si la acción tiene `type` y es del slice 'products' entonces persistimos
    // Esto tenemos que validar lo anterior, por que este middleware se ejecutara 
    // para todos los cambios en cualquier slice realizados por cualquier reducer.
    if (typeof action === 'object' && action !== null && 'type' in action) {
        const a = action as { type?: unknown };
        const t = typeof a.type === 'string' ? a.type : '';
        // validamos si el tipo de accion parte con "products" por que asi se llama nuestra slice de productos
        // name: "products"
        // y el tipo (t) generalmente se construye con la estructura "nombreSlice/nombreReducer"
        // es decir, que t.startsWith()  valida que "t" tenga una estructura de tipo"productos/*"

        if (t.startsWith('products')) {
            try {
                localStorage.setItem('carrito', JSON.stringify(products));
            } catch (e) {
                // No queremos que fallen las operaciones de persistencia rompan la app
                console.warn('[productPersistenceMiddleware] No se pudo persistir carrito:', e);
            }
        }
    }
};
