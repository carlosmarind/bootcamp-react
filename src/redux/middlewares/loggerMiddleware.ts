/*
  Archivo: middleware.ts
  Contenido: middlewares reutilizables para el store.
  - loggerMiddleware: registra acciones y estados antes/después del reducer (útil para devs).
  */

import type { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "../rootReducer";

// ------------------ Logger Middleware ------------------
// Registro simple que muestra la acción y el estado antes y después del reducer.
// Útil para debugging y para aprender el flujo de Redux.
export const loggerMiddleware: Middleware<unknown, RootState> = (storeApi) => (next) => (action) => {
    // Estado antes de aplicar la acción
    const prevState = storeApi.getState();
    console.log("[Logger Middleware] Antes -> action:", action);
    console.log("[Logger Middleware] Antes -> state:", prevState);

    // Dejar que la acción siga su curso
    next(action);

    // Estado después de aplicar la acción
    const nextState = storeApi.getState();
    console.log("[Logger Middleware] Después -> state:", nextState);
};
